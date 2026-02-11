// VocabDaily — Achievements & Milestones System
window.Achievements = {
    STORAGE_KEY: 'vocabDaily_achievements',
    tabsVisited: new Set(),

    badges: [
        { id: 'first-word', title: 'First Steps', desc: 'Learn your first word', icon: '🌱', check: () => Storage.getLearnedWords().length >= 1 },
        { id: 'ten-words', title: 'Getting Started', desc: 'Learn 10 words', icon: '📖', check: () => Storage.getLearnedWords().length >= 10 },
        { id: 'fifty-words', title: 'Vocabulary Builder', desc: 'Learn 50 words', icon: '📚', check: () => Storage.getLearnedWords().length >= 50 },
        { id: 'hundred-words', title: 'Word Wizard', desc: 'Learn 100 words', icon: '🧙', check: () => Storage.getLearnedWords().length >= 100 },
        { id: 'word-master', title: 'Word Master', desc: 'Learn 200 words', icon: '👑', check: () => Storage.getLearnedWords().length >= 200 },
        { id: 'first-quiz', title: 'Quiz Starter', desc: 'Complete your first quiz', icon: '✏️', check: () => Storage.getQuizStats().totalQuizzes >= 1 },
        { id: 'quiz-ten', title: 'Quiz Enthusiast', desc: 'Complete 10 quizzes', icon: '🎯', check: () => Storage.getQuizStats().totalQuizzes >= 10 },
        { id: 'quiz-ace', title: 'Perfect Score', desc: 'Get 100% on a quiz', icon: '💯', check: () => { const s = Storage.getQuizStats(); return s._lastPerfect === true; } },
        { id: 'streak-3', title: 'On a Roll', desc: '3-day learning streak', icon: '🔥', check: () => Storage.getStreak().current >= 3 },
        { id: 'streak-7', title: 'Week Warrior', desc: '7-day learning streak', icon: '⚡', check: () => Storage.getStreak().current >= 7 },
        { id: 'streak-14', title: 'Fortnight Force', desc: '14-day streak', icon: '💪', check: () => Storage.getStreak().current >= 14 },
        { id: 'streak-30', title: 'Monthly Master', desc: '30-day streak', icon: '🏆', check: () => Storage.getStreak().longest >= 30 },
        { id: 'bookworm', title: 'Bookworm', desc: 'Bookmark 10 words', icon: '🔖', check: () => Storage.getBookmarks().length >= 10 },
        { id: 'night-owl', title: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', check: () => new Date().getHours() >= 22 },
        { id: 'early-bird', title: 'Early Bird', desc: 'Study before 7 AM', icon: '🐦', check: () => new Date().getHours() < 7 },
    ],

    _getEarned() {
        try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {}; } catch { return {}; }
    },
    _saveEarned(earned) {
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(earned)); } catch {}
    },

    getAll() {
        const earned = this._getEarned();
        return this.badges.map(b => ({ ...b, earned: !!earned[b.id], earnedDate: earned[b.id] || null }));
    },
    getEarned() { return this.getAll().filter(b => b.earned); },
    getCount() { return Object.keys(this._getEarned()).length; },

    check() {
        const earned = this._getEarned();
        const newlyEarned = [];
        const today = new Date().toISOString();
        this.badges.forEach(b => {
            if (!earned[b.id]) {
                try {
                    if (b.check()) { earned[b.id] = today; newlyEarned.push(b); }
                } catch {}
            }
        });
        if (newlyEarned.length > 0) this._saveEarned(earned);
        return newlyEarned;
    },

    showToast(badge) {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `<span class="achievement-toast-icon">${badge.icon}</span><div><strong>Achievement Unlocked!</strong><br>${badge.title}</div>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 4000);
    },

    checkAndNotify() {
        const newOnes = this.check();
        newOnes.forEach((b, i) => setTimeout(() => this.showToast(b), i * 1500));
        return newOnes;
    }
};
