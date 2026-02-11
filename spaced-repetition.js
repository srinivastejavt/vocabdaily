// VocabDaily — Spaced Repetition System (Leitner Box Method)
window.SpacedRepetition = {
    STORAGE_KEY: 'vocabDaily_srs',
    INTERVALS: { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 }, // box: days until next review

    _getData() { try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {}; } catch { return {}; } },
    _saveData(d) { try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(d)); } catch {} },
    _today() { const d = new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); },
    _daysBetween(d1, d2) { return Math.floor((new Date(d2+'T00:00:00') - new Date(d1+'T00:00:00')) / 86400000); },

    addWord(word) {
        const data = this._getData();
        if (!data[word]) {
            data[word] = { box: 1, lastReview: this._today(), addedDate: this._today() };
            this._saveData(data);
        }
    },
    removeWord(word) {
        const data = this._getData();
        delete data[word];
        this._saveData(data);
    },

    recordReview(word, correct) {
        const data = this._getData();
        if (!data[word]) this.addWord(word);
        const entry = data[word] || { box: 1 };
        if (correct) {
            entry.box = Math.min(5, entry.box + 1);
        } else {
            entry.box = 1;
        }
        entry.lastReview = this._today();
        data[word] = entry;
        this._saveData(data);
    },

    getWordStatus(word) {
        const data = this._getData();
        const entry = data[word];
        if (!entry) return null;
        const interval = this.INTERVALS[entry.box];
        const daysSince = this._daysBetween(entry.lastReview, this._today());
        const nextDate = new Date(entry.lastReview + 'T00:00:00');
        nextDate.setDate(nextDate.getDate() + interval);
        const nextReview = nextDate.getFullYear()+'-'+String(nextDate.getMonth()+1).padStart(2,'0')+'-'+String(nextDate.getDate()).padStart(2,'0');
        return { box: entry.box, lastReview: entry.lastReview, nextReview, isDue: daysSince >= interval, mastery: Math.round((entry.box / 5) * 100) };
    },

    getWordsToReview() {
        const data = this._getData();
        const due = [];
        Object.entries(data).forEach(([word, entry]) => {
            const interval = this.INTERVALS[entry.box];
            const daysSince = this._daysBetween(entry.lastReview, this._today());
            if (daysSince >= interval) due.push({ word, ...entry, daysSince, overdue: daysSince - interval });
        });
        return due.sort((a, b) => b.overdue - a.overdue); // most overdue first
    },

    getAllStats() {
        const data = this._getData();
        const words = Object.values(data);
        const dueToday = this.getWordsToReview();
        return {
            totalWords: words.length,
            mastered: words.filter(w => w.box === 5).length,
            inProgress: words.filter(w => w.box < 5).length,
            dueToday: dueToday.length,
            byBox: [1,2,3,4,5].map(b => words.filter(w => w.box === b).length)
        };
    },
    getMasteryPercentage() {
        const data = this._getData();
        const words = Object.values(data);
        if (words.length === 0) return 0;
        const total = words.reduce((sum, w) => sum + w.box, 0);
        return Math.round((total / (words.length * 5)) * 100);
    },

    renderReviewCard(container) {
        const due = this.getWordsToReview();
        const stats = this.getAllStats();
        if (due.length === 0) {
            container.innerHTML = `<div class="srs-empty"><div style="font-size:2.5rem;margin-bottom:10px;">✅</div><h3>All caught up!</h3><p>No words to review right now. Come back later or learn new words.</p><div class="srs-mini-stats"><span>📚 ${stats.totalWords} tracked</span><span>🏆 ${stats.mastered} mastered</span><span>📊 ${this.getMasteryPercentage()}% mastery</span></div></div>`;
            return;
        }
        container.innerHTML = `<div class="srs-header"><h3>📝 Review Time</h3><p>${due.length} word${due.length>1?'s':''} to review</p><div class="srs-mini-stats"><span>📚 ${stats.totalWords} tracked</span><span>🏆 ${stats.mastered} mastered</span><span>📊 ${this.getMasteryPercentage()}% mastery</span></div></div><div id="srs-card-area"></div>`;
        this._showReviewWord(container, due, 0, 0);
    },

    _showReviewWord(container, due, index, correctCount) {
        const area = container.querySelector('#srs-card-area');
        if (!area || index >= due.length) {
            this._showReviewResults(container, correctCount, due.length);
            return;
        }
        const w = due[index];
        const wordData = (typeof WORD_LIST !== 'undefined') ? WORD_LIST.find(wl => wl.word === w.word) : null;
        const def = wordData?.meanings?.[0]?.definitions?.[0]?.definition || 'Definition not available';
        const box = w.box;
        area.innerHTML = `
            <div class="srs-review-card">
                <div class="srs-progress">Word ${index+1} of ${due.length} • Box ${box}/5</div>
                <div class="srs-box-indicator">${'🟩'.repeat(box)}${'⬜'.repeat(5-box)}</div>
                <div class="srs-word">${w.word}</div>
                <button class="btn-sm srs-reveal-btn" id="srs-reveal">Show Definition</button>
                <div class="srs-definition hidden" id="srs-def"><p>${def}</p></div>
                <div class="srs-actions hidden" id="srs-actions">
                    <button class="srs-btn srs-btn-wrong" id="srs-wrong">❌ Didn't Know</button>
                    <button class="srs-btn srs-btn-right" id="srs-right">✅ Got It!</button>
                </div>
            </div>`;
        area.querySelector('#srs-reveal').addEventListener('click', () => {
            area.querySelector('#srs-def').classList.remove('hidden');
            area.querySelector('#srs-actions').classList.remove('hidden');
            area.querySelector('#srs-reveal').style.display = 'none';
        });
        area.querySelector('#srs-wrong').addEventListener('click', () => {
            this.recordReview(w.word, false);
            this._showReviewWord(container, due, index+1, correctCount);
        });
        area.querySelector('#srs-right').addEventListener('click', () => {
            this.recordReview(w.word, true);
            this._showReviewWord(container, due, index+1, correctCount+1);
        });
    },

    _showReviewResults(container, correct, total) {
        const pct = total > 0 ? Math.round((correct/total)*100) : 0;
        const emoji = pct === 100 ? '🌟' : pct >= 70 ? '💪' : pct >= 40 ? '📖' : '🔄';
        container.querySelector('#srs-card-area').innerHTML = `
            <div class="quiz-results"><div style="font-size:3rem">${emoji}</div>
            <div class="quiz-results-score">${correct}/${total}</div>
            <div class="quiz-results-label">${pct}% Recalled</div>
            <p class="quiz-results-message">${pct===100?'Perfect recall!':pct>=70?'Great memory!':'Keep reviewing — repetition is key!'}</p></div>`;
    }
};
