// VocabDaily — localStorage wrapper for progress tracking (v2 — improved error handling)

window.Storage = {
    KEYS: {
        LEARNED: 'vocabDaily_learned',
        BOOKMARKS: 'vocabDaily_bookmarks',
        STREAK: 'vocabDaily_streak',
        HISTORY: 'vocabDaily_history',
        QUIZ_STATS: 'vocabDaily_quizStats',
        THEME: 'vocabDaily_theme',
        LAST_VISIT: 'vocabDaily_lastVisit'
    },

    // --- Helpers ---
    _get(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.warn('Storage read error:', key, e);
            return fallback;
        }
    },

    _set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage write error (may be full):', key, e);
            return false;
        }
    },

    // --- Learned Words ---
    getLearnedWords() { return this._get(this.KEYS.LEARNED, []); },
    addLearnedWord(word) {
        if (!word) return [];
        const words = this.getLearnedWords();
        if (!words.includes(word)) {
            words.push(word);
            this._set(this.KEYS.LEARNED, words);
            // Auto-add to spaced repetition
            if (typeof SpacedRepetition !== 'undefined') SpacedRepetition.addWord(word);
        }
        return words;
    },
    removeLearnedWord(word) {
        let words = this.getLearnedWords().filter(w => w !== word);
        this._set(this.KEYS.LEARNED, words);
        return words;
    },
    isLearned(word) { return this.getLearnedWords().includes(word); },

    // --- Bookmarks ---
    getBookmarks() { return this._get(this.KEYS.BOOKMARKS, []); },
    addBookmark(wordEntry) {
        if (!wordEntry || !wordEntry.word) return [];
        const bookmarks = this.getBookmarks();
        if (!bookmarks.some(b => b.word === wordEntry.word)) {
            bookmarks.push(wordEntry);
            this._set(this.KEYS.BOOKMARKS, bookmarks);
        }
        return bookmarks;
    },
    removeBookmark(word) {
        let bookmarks = this.getBookmarks().filter(b => b.word !== word);
        this._set(this.KEYS.BOOKMARKS, bookmarks);
        return bookmarks;
    },
    isBookmarked(word) { return this.getBookmarks().some(b => b.word === word); },

    // --- Streak ---
    getStreak() { return this._get(this.KEYS.STREAK, { current: 0, longest: 0, lastDate: null }); },
    updateStreak() {
        const streak = this.getStreak();
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        if (streak.lastDate === todayStr) return streak;
        const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0');
        streak.current = (streak.lastDate === yesterdayStr) ? streak.current + 1 : 1;
        if (streak.current > streak.longest) streak.longest = streak.current;
        streak.lastDate = todayStr;
        this._set(this.KEYS.STREAK, streak);
        return streak;
    },

    // --- History ---
    getHistory() { return this._get(this.KEYS.HISTORY, []); },
    addToHistory(date, words) {
        const history = this.getHistory();
        if (!history.some(h => h.date === date)) {
            history.unshift({ date, words });
            this._set(this.KEYS.HISTORY, history);
        }
        return history;
    },

    // --- Quiz Stats ---
    getQuizStats() { return this._get(this.KEYS.QUIZ_STATS, { totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0, _lastPerfect: false }); },
    recordQuizResult(correct, total) {
        const stats = this.getQuizStats();
        stats.totalQuizzes += 1;
        stats.totalCorrect += correct;
        stats.totalQuestions += total;
        stats._lastPerfect = (correct === total && total > 0);
        this._set(this.KEYS.QUIZ_STATS, stats);
        return stats;
    },

    // --- Theme ---
    getTheme() {
        const stored = this._get(this.KEYS.THEME, null);
        if (stored) return stored;
        // Auto-detect system preference (#20)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    },
    setTheme(theme) { this._set(this.KEYS.THEME, theme); },

    // --- Weekly Summary Helper (#18) ---
    getWeeklySummary() {
        const today = new Date();
        const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.getFullYear() + '-' + String(weekAgo.getMonth() + 1).padStart(2, '0') + '-' + String(weekAgo.getDate()).padStart(2, '0');
        const history = this.getHistory().filter(h => h.date >= weekAgoStr);
        const wordsThisWeek = history.flatMap(h => h.words || []);
        const stats = this.getQuizStats();
        const streak = this.getStreak();
        return {
            daysActive: history.length,
            wordsLearned: wordsThisWeek.length,
            uniqueWords: [...new Set(wordsThisWeek)].length,
            totalLearned: this.getLearnedWords().length,
            streak: streak.current,
            longestStreak: streak.longest,
            quizzesTaken: stats.totalQuizzes,
            accuracy: stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0
        };
    }
};
