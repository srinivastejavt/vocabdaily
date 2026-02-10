// VocabDaily — Main App Orchestrator

window.App = {
    currentTab: 'wotd',
    todayWords: [],

    async init() {
        this.initTheme();
        this.initNavigation();
        this.initSubTabs();
        this.initUKUSSubTabs();
        this.initQuizSelector();
        this.initModal();
        this.updateStreakOnVisit();
        this.renderStreakBadge();
        TTS.init();
        await this.loadWordsOfTheDay();
    },

    // --- Theme ---
    initTheme() {
        const theme = Storage.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        this._updateThemeIcon(theme);

        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    },

    toggleTheme() {
        const current = Storage.getTheme();
        const next = current === 'light' ? 'dark' : 'light';
        Storage.setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        this._updateThemeIcon(next);
    },

    _updateThemeIcon(theme) {
        document.getElementById('theme-icon').textContent = theme === 'dark' ? '\u2600' : '\u263E';
    },

    // --- Navigation ---
    initNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });
    },

    switchTab(tabName) {
        this.currentTab = tabName;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });

        document.querySelectorAll('.tab-section').forEach(section => {
            section.classList.toggle('active', section.id === tabName);
        });

        // Lazy render tab content
        if (tabName === 'mywords') this.renderMyWords();
        if (tabName === 'stats') this.renderStats();
        if (tabName === 'ukus') this.renderUKUS('us-slang');
        if (tabName === 'chatpractice') this.renderChatPractice();
    },

    // --- Sub Tabs (My Words) ---
    initSubTabs() {
        document.querySelectorAll('.sub-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const subtab = btn.getAttribute('data-subtab');

                document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                document.querySelectorAll('.sub-tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(subtab + '-list').classList.add('active');
            });
        });
    },

    // --- Quiz Selector ---
    initQuizSelector() {
        document.querySelectorAll('.quiz-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-quiz');
                this.startQuiz(type);
            });
        });
    },

    startQuiz(type) {
        const container = document.getElementById('quiz-container');
        const selector = document.getElementById('quiz-type-selector');

        QuizEngine.generate(type);
        selector.style.display = 'none';
        container.style.display = 'block';
        QuizEngine.renderQuestion(container);
    },

    // --- Modal ---
    initModal() {
        const modal = document.getElementById('word-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = document.getElementById('modal-close');

        const close = () => { modal.style.display = 'none'; };
        overlay.addEventListener('click', close);
        closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    },

    showWordModal(wordEntry) {
        const modal = document.getElementById('word-modal');
        const body = document.getElementById('modal-body');
        body.innerHTML = this._renderWordCardHTML(wordEntry, false);
        modal.style.display = 'flex';
        this._attachCardActions(body, wordEntry);
    },

    // --- Words of the Day ---
    async loadWordsOfTheDay() {
        const loading = document.getElementById('wotd-loading');
        const cardsContainer = document.getElementById('wotd-cards');
        const dateEl = document.getElementById('wotd-date');

        loading.style.display = 'block';
        cardsContainer.innerHTML = '';

        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        dateEl.textContent = dateStr;

        try {
            this.todayWords = await DictionaryAPI.getWordsOfTheDay(today, 5);
        } catch {
            this.todayWords = WORD_LIST.slice(0, 5).map(w => ({ ...w, audioUrl: null }));
        }

        loading.style.display = 'none';

        this.todayWords.forEach((wordEntry, idx) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.style.animationDelay = (idx * 0.08) + 's';
            card.innerHTML = this._renderWordCardHTML(wordEntry, true);
            cardsContainer.appendChild(card);
            this._attachCardActions(card, wordEntry);
        });

        // Record in history
        const todayISO = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');
        const wordNames = this.todayWords.map(w => w.word);
        Storage.addToHistory(todayISO, wordNames);
    },

    _renderWordCardHTML(wordEntry, showActions) {
        const w = wordEntry;
        let html = '<div class="word-card-header"><div>';
        html += `<span class="word-title">${this._esc(w.word)}</span>`;
        if (w.phonetic) {
            html += `<span class="word-phonetic">${this._esc(w.phonetic)}</span>`;
        }
        if (w.audioUrl) {
            html += `<button class="btn-audio" data-audio="${this._esc(w.audioUrl)}" title="Play pronunciation">&#x1F50A;</button>`;
        } else {
            html += `<button class="btn-tts" data-text="${this._esc(w.word)}" data-accent="us" title="Listen to pronunciation">&#x1F50A;</button>`;
        }
        html += '</div>';

        if (showActions) {
            const isLearned = Storage.isLearned(w.word);
            const isBookmarked = Storage.isBookmarked(w.word);
            html += `<div class="word-actions">
                <button class="btn-sm btn-learned ${isLearned ? 'active' : ''}" data-word="${this._esc(w.word)}">${isLearned ? 'Learned' : 'Mark Learned'}</button>
                <button class="btn-sm btn-bookmark ${isBookmarked ? 'active' : ''}" data-word="${this._esc(w.word)}">${isBookmarked ? 'Bookmarked' : 'Bookmark'}</button>
            </div>`;
        }
        html += '</div>';

        // Parts of speech badges
        if (w.meanings && w.meanings.length > 0) {
            html += '<div>';
            w.meanings.forEach(m => {
                html += `<span class="pos-badge">${this._esc(m.partOfSpeech)}</span>`;
            });
            html += '</div>';
        }

        // Definitions
        html += '<div class="word-definitions">';
        if (w.meanings) {
            w.meanings.forEach(m => {
                m.definitions.forEach(d => {
                    html += '<div class="definition-item">';
                    html += `<div class="definition-text">${this._esc(d.definition)}</div>`;
                    if (d.example) {
                        html += `<div class="definition-example">"${this._esc(d.example)}"</div>`;
                    }
                    html += '</div>';
                });
            });
        }
        html += '</div>';

        // Synonyms / Antonyms
        const allSynonyms = (w.meanings || []).flatMap(m => m.synonyms || []).slice(0, 5);
        const allAntonyms = (w.meanings || []).flatMap(m => m.antonyms || []).slice(0, 5);

        if (allSynonyms.length > 0 || allAntonyms.length > 0) {
            html += '<div class="word-meta">';
            if (allSynonyms.length > 0) {
                html += `<div class="meta-group"><span class="meta-label">Synonyms</span><span class="meta-value">${allSynonyms.map(s => this._esc(s)).join(', ')}</span></div>`;
            }
            if (allAntonyms.length > 0) {
                html += `<div class="meta-group"><span class="meta-label">Antonyms</span><span class="meta-value">${allAntonyms.map(s => this._esc(s)).join(', ')}</span></div>`;
            }
            html += '</div>';
        }

        // Context
        if (w.context) {
            html += `<div class="word-context"><div class="word-context-label">How &amp; Where to Use</div>${this._esc(w.context)}</div>`;
        }

        return html;
    },

    _attachCardActions(container, wordEntry) {
        // TTS buttons (fallback when no API audio)
        this._attachTTSButtons(container);

        // Audio
        container.querySelectorAll('.btn-audio').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = btn.getAttribute('data-audio');
                if (url) {
                    const audio = new Audio(url);
                    audio.play().catch(() => {});
                }
            });
        });

        // Learned button
        container.querySelectorAll('.btn-learned').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = btn.getAttribute('data-word');
                if (Storage.isLearned(word)) {
                    Storage.removeLearnedWord(word);
                    btn.classList.remove('active');
                    btn.textContent = 'Mark Learned';
                } else {
                    Storage.addLearnedWord(word);
                    btn.classList.add('active');
                    btn.textContent = 'Learned';
                }
            });
        });

        // Bookmark button
        container.querySelectorAll('.btn-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = btn.getAttribute('data-word');
                if (Storage.isBookmarked(word)) {
                    Storage.removeBookmark(word);
                    btn.classList.remove('active');
                    btn.textContent = 'Bookmark';
                } else {
                    Storage.addBookmark(wordEntry);
                    btn.classList.add('active');
                    btn.textContent = 'Bookmarked';
                }
            });
        });
    },

    // --- My Words ---
    renderMyWords() {
        const learnedList = document.getElementById('learned-list');
        const bookmarkedList = document.getElementById('bookmarked-list');
        const emptyState = document.getElementById('mywords-empty');

        const learnedWords = Storage.getLearnedWords();
        const bookmarks = Storage.getBookmarks();

        document.getElementById('learned-count').textContent = learnedWords.length;
        document.getElementById('bookmarked-count').textContent = bookmarks.length;

        // Learned list
        learnedList.innerHTML = '';
        learnedWords.forEach(wordStr => {
            const wordData = WORD_LIST.find(w => w.word === wordStr);
            if (!wordData) return;
            learnedList.appendChild(this._createWordListItem(wordData, 'learned'));
        });

        // Bookmarked list
        bookmarkedList.innerHTML = '';
        bookmarks.forEach(wordData => {
            bookmarkedList.appendChild(this._createWordListItem(wordData, 'bookmarked'));
        });

        // Show empty state if both empty
        const activeSubTab = document.querySelector('.sub-tab-btn.active');
        const subtab = activeSubTab ? activeSubTab.getAttribute('data-subtab') : 'learned';
        const currentList = subtab === 'learned' ? learnedWords : bookmarks;
        emptyState.style.display = currentList.length === 0 ? 'block' : 'none';
    },

    _createWordListItem(wordData, type) {
        const item = document.createElement('div');
        item.className = 'word-list-item';

        const pos = wordData.meanings && wordData.meanings[0] ? wordData.meanings[0].partOfSpeech : '';
        const def = wordData.meanings && wordData.meanings[0] && wordData.meanings[0].definitions[0]
            ? wordData.meanings[0].definitions[0].definition : '';

        item.innerHTML = `
            <div class="word-list-item-info">
                <span class="word-list-item-word">${this._esc(wordData.word)}</span>
                <span class="word-list-item-pos">${this._esc(pos)}</span>
                <div class="word-list-item-def">${this._esc(def)}</div>
            </div>
            <button class="btn-remove" title="Remove" data-word="${this._esc(wordData.word)}" data-type="${type}">&times;</button>
        `;

        // Click to show detail modal
        item.querySelector('.word-list-item-info').addEventListener('click', () => {
            this.showWordModal(wordData);
        });

        // Remove button
        item.querySelector('.btn-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            const word = e.currentTarget.getAttribute('data-word');
            const t = e.currentTarget.getAttribute('data-type');
            if (t === 'learned') Storage.removeLearnedWord(word);
            else Storage.removeBookmark(word);
            this.renderMyWords();
        });

        return item;
    },

    // --- Stats ---
    renderStats() {
        const streak = Storage.getStreak();
        const learned = Storage.getLearnedWords();
        const bookmarks = Storage.getBookmarks();
        const quizStats = Storage.getQuizStats();
        const history = Storage.getHistory();

        document.getElementById('stat-learned').textContent = learned.length;
        document.getElementById('stat-streak').textContent = streak.current;
        document.getElementById('stat-longest').textContent = streak.longest;
        document.getElementById('stat-quizzes').textContent = quizStats.totalQuizzes;
        document.getElementById('stat-bookmarks').textContent = bookmarks.length;

        const accuracy = quizStats.totalQuestions > 0
            ? Math.round((quizStats.totalCorrect / quizStats.totalQuestions) * 100)
            : 0;
        document.getElementById('stat-accuracy').textContent = accuracy + '%';

        // Word History
        const historyEl = document.getElementById('wotd-history');
        const historyEmpty = document.getElementById('history-empty');

        if (history.length === 0) {
            historyEl.innerHTML = '';
            historyEmpty.style.display = 'block';
        } else {
            historyEmpty.style.display = 'none';
            historyEl.innerHTML = history.slice(0, 30).map(entry => {
                const words = Array.isArray(entry.words) ? entry.words : [entry.words];
                const date = new Date(entry.date + 'T00:00:00');
                const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return `
                    <div class="history-item">
                        <span class="history-date">${this._esc(dateStr)}</span>
                        <div class="history-words">
                            ${words.map(w => `<span class="history-word-tag">${this._esc(w)}</span>`).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }
    },

    // --- Streak ---
    updateStreakOnVisit() {
        Storage.updateStreak();
    },

    renderStreakBadge() {
        const streak = Storage.getStreak();
        document.getElementById('streak-count').textContent = streak.current;
    },

    // --- UK vs US Section ---
    initUKUSSubTabs() {
        document.querySelectorAll('.ukus-sub-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-ukus-tab');
                document.querySelectorAll('.ukus-sub-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderUKUS(tab);
            });
        });
    },

    renderUKUS(tab) {
        const container = document.getElementById('ukus-content');
        if (!container) return;

        switch (tab) {
            case 'us-slang': this._renderSlangList(container, SLANG_DATA.usSlang, 'us'); break;
            case 'uk-slang': this._renderSlangList(container, SLANG_DATA.ukSlang, 'uk'); break;
            case 'vocab-diff': this._renderVocabDiff(container); break;
            case 'spelling-diff': this._renderSpellingDiff(container); break;
            case 'accent-guide': this._renderAccentGuide(container); break;
            case 'phrases': this._renderPhrases(container); break;
        }
    },

    _renderSlangList(container, slangArr, region) {
        const regionLabel = region === 'uk' ? 'UK' : 'US';
        const flag = region === 'uk' ? '\uD83C\uDDEC\uD83C\uDDE7' : '\uD83C\uDDFA\uD83C\uDDF8';
        const accent = region === 'uk' ? 'uk' : 'us';

        container.innerHTML = slangArr.map(s => `
            <div class="slang-card">
                <div class="slang-word-row">
                    <div class="slang-word">${flag} ${this._esc(s.word)}</div>
                    <button class="btn-tts" data-text="${this._esc(s.word)}" data-accent="${accent}" title="Listen to pronunciation">&#x1F50A;</button>
                </div>
                <div class="slang-meaning">${this._esc(s.meaning)}</div>
                <div class="slang-example-row">
                    <div class="slang-example">"${this._esc(s.example)}"</div>
                    <button class="btn-tts btn-tts-sm" data-text="${this._esc(s.example)}" data-accent="${accent}" title="Listen to example">&#x1F50A;</button>
                </div>
                <div class="slang-meta">
                    <span class="slang-tag ${region}">${regionLabel} Slang</span>
                    ${s.level ? `<span class="slang-tag">${this._esc(s.level)}</span>` : ''}
                </div>
                ${s.origin ? `<div class="slang-origin"><strong>Origin:</strong> ${this._esc(s.origin)}</div>` : ''}
                ${s.usage ? `<div class="slang-usage">\uD83D\uDCA1 ${this._esc(s.usage)}</div>` : ''}
            </div>
        `).join('');

        this._attachTTSButtons(container);
    },

    _renderVocabDiff(container) {
        const diffs = SLANG_DATA.vocabularyDifferences;
        let html = `<table class="diff-table">
            <thead><tr><th>\uD83C\uDDEC\uD83C\uDDE7 British</th><th>\uD83C\uDDFA\uD83C\uDDF8 American</th><th>Meaning</th></tr></thead><tbody>`;

        diffs.forEach(d => {
            html += `<tr>
                <td class="uk-col">${this._esc(d.uk)}<span class="diff-example">${this._esc(d.example_uk)}</span></td>
                <td class="us-col">${this._esc(d.us)}<span class="diff-example">${this._esc(d.example_us)}</span></td>
                <td>${this._esc(d.meaning)}</td>
            </tr>`;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    },

    _renderSpellingDiff(container) {
        const diffs = SLANG_DATA.spellingDifferences;
        let html = `<table class="diff-table">
            <thead><tr><th>\uD83C\uDDEC\uD83C\uDDE7 British</th><th>\uD83C\uDDFA\uD83C\uDDF8 American</th><th>Rule</th></tr></thead><tbody>`;

        diffs.forEach(d => {
            html += `<tr>
                <td class="uk-col">${this._esc(d.uk)}</td>
                <td class="us-col">${this._esc(d.us)}</td>
                <td>${this._esc(d.rule)}</td>
            </tr>`;
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    },

    _renderAccentGuide(container) {
        const guide = SLANG_DATA.accentGuide;
        let html = '';

        // US Accent
        html += `<div class="accent-section">
            <div class="accent-title"><span class="accent-flag">\uD83C\uDDFA\uD83C\uDDF8</span> ${this._esc(guide.us.name)}</div>`;
        guide.us.features.forEach(f => {
            html += `<div class="accent-feature">
                <div class="accent-feature-name">${this._esc(f.feature)}</div>
                <div class="accent-feature-desc">${this._esc(f.description)}</div>
                <div class="accent-examples">${f.examples.map(e => `<span class="accent-example-tag">${this._esc(e)}</span>`).join('')}</div>
            </div>`;
        });
        html += '</div>';

        // UK Accent
        html += `<div class="accent-section">
            <div class="accent-title"><span class="accent-flag">\uD83C\uDDEC\uD83C\uDDE7</span> ${this._esc(guide.uk.name)}</div>`;
        guide.uk.features.forEach(f => {
            html += `<div class="accent-feature">
                <div class="accent-feature-name">${this._esc(f.feature)}</div>
                <div class="accent-feature-desc">${this._esc(f.description)}</div>
                <div class="accent-examples">${f.examples.map(e => `<span class="accent-example-tag">${this._esc(e)}</span>`).join('')}</div>
            </div>`;
        });
        html += '</div>';

        container.innerHTML = html;
    },

    _renderPhrases(container) {
        const phrases = SLANG_DATA.commonPhrases;
        container.innerHTML = phrases.map(p => `
            <div class="phrase-card">
                <div class="phrase-situation">${this._esc(p.situation)}</div>
                <div class="phrase-row">
                    <div>
                        <div class="phrase-label uk">\uD83C\uDDEC\uD83C\uDDE7 British <button class="btn-tts btn-tts-inline" data-text="${this._esc(p.uk)}" data-accent="uk" title="Listen UK">&#x1F50A;</button></div>
                        <div class="phrase-text">${this._esc(p.uk)}</div>
                    </div>
                    <div>
                        <div class="phrase-label us">\uD83C\uDDFA\uD83C\uDDF8 American <button class="btn-tts btn-tts-inline" data-text="${this._esc(p.us)}" data-accent="us" title="Listen US">&#x1F50A;</button></div>
                        <div class="phrase-text">${this._esc(p.us)}</div>
                    </div>
                </div>
                ${p.note ? `<div class="phrase-note">${this._esc(p.note)}</div>` : ''}
            </div>
        `).join('');

        this._attachTTSButtons(container);
    },

    _attachTTSButtons(container) {
        container.querySelectorAll('.btn-tts').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-text');
                const accent = btn.getAttribute('data-accent') || 'us';
                if (TTS.isAvailable()) {
                    TTS.speak(text, accent, text.split(' ').length > 3 ? 0.9 : 0.7);
                }
            });
        });
    },

    // --- Chat Practice ---
    renderChatPractice() {
        const container = document.getElementById('chat-container');
        if (container) ChatPractice.renderScenarioSelector(container);
    },

    // --- Helpers ---
    _esc(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
