#!/bin/bash
# ============================================
# VocabDaily — One-Time Setup & Deploy Script
# ============================================
# This script sets up Firebase + GitHub for
# automatic deploys. Run it once, and every
# future "git push" will auto-deploy your app.
# ============================================

set -e
cd "$(dirname "$0")"

echo ""
echo "🎓 VocabDaily — Setup & Deploy"
echo "==============================="
echo ""

# --- Step 1: Install GitHub CLI if missing ---
if ! command -v gh &> /dev/null; then
    echo "📦 Installing GitHub CLI..."
    brew install gh
    echo "✅ GitHub CLI installed"
else
    echo "✅ GitHub CLI already installed"
fi

# --- Step 2: GitHub Login ---
if ! gh auth status &> /dev/null 2>&1; then
    echo ""
    echo "🔑 Logging into GitHub..."
    gh auth login
fi
echo "✅ GitHub authenticated"

# --- Step 3: Firebase Login ---
if ! firebase projects:list &> /dev/null 2>&1; then
    echo ""
    echo "🔥 Logging into Firebase..."
    firebase login
fi
echo "✅ Firebase authenticated"

# --- Step 4: Create Firebase Project ---
echo ""
echo "🆕 Creating Firebase project..."
PROJECT_ID="vocabdaily-$(date +%s | tail -c 7)"
firebase projects:create "$PROJECT_ID" --display-name "VocabDaily" 2>/dev/null || true

# Link project
echo "{\"projects\":{\"default\":\"$PROJECT_ID\"}}" > .firebaserc
echo "✅ Firebase project: $PROJECT_ID"

# --- Step 5: Create GitHub Repo ---
echo ""
echo "📂 Creating GitHub repository..."
git add -A
git commit -m "Initial commit: VocabDaily vocabulary learning app" 2>/dev/null || true
gh repo create vocabdaily --public --source=. --push 2>/dev/null || {
    echo "ℹ️  Repo may already exist. Pushing..."
    git remote add origin "$(gh repo view vocabdaily --json url -q .url).git" 2>/dev/null || true
    git push -u origin main
}
echo "✅ GitHub repo created"

# --- Step 6: Set up Firebase Service Account for GitHub Actions ---
echo ""
echo "🔐 Setting up auto-deploy..."

# Create service account key
SA_EMAIL="github-actions@$PROJECT_ID.iam.gserviceaccount.com"
gcloud iam service-accounts create github-actions \
    --project="$PROJECT_ID" \
    --display-name="GitHub Actions" 2>/dev/null || true

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SA_EMAIL" \
    --role="roles/firebasehosting.admin" 2>/dev/null || true

KEY_FILE="/tmp/firebase-sa-key.json"
gcloud iam service-accounts keys create "$KEY_FILE" \
    --iam-account="$SA_EMAIL" 2>/dev/null || true

if [ -f "$KEY_FILE" ]; then
    gh secret set FIREBASE_SERVICE_ACCOUNT < "$KEY_FILE"
    gh secret set FIREBASE_PROJECT_ID --body "$PROJECT_ID"
    rm "$KEY_FILE"
    echo "✅ Auto-deploy configured"
else
    echo ""
    echo "⚠️  Couldn't auto-create service account."
    echo "   You can set this up manually later (see instructions below)."
fi

# --- Step 7: First Deploy ---
echo ""
echo "🚀 Deploying to Firebase..."
firebase deploy --only hosting --project "$PROJECT_ID"

echo ""
echo "==============================="
echo "🎉 DONE! Your app is live at:"
echo ""
echo "   https://$PROJECT_ID.web.app"
echo ""
echo "From now on, every 'git push' to main"
echo "will auto-deploy your app!"
echo "==============================="
