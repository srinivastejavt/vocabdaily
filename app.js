// VocabDaily — Main App Orchestrator (v2 — all 20 improvements)

window.App = {
    currentTab: 'wotd',
    todayWords: [],
    touchStartX: 0,
    tabOrder: ['wotd', 'practice', 'ukus', 'chatpractice', 'challenge', 'mywords', 'stats', 'settings'],

    async init() {
        this.initTheme();
        this.initNavigation();
        this.initSubTabs();
        this.initUKUSSubTabs();
        this.initQuizSelector();
        this.initModal();
        this.initSearch();
        this.initSwipe();       // #10
        this.initOfflineIndicator(); // #7
        this.updateStreakOnVisit();
        this.renderStreakBadge();
        TTS.init();
        await this.loadWordsOfTheDay();
        // Check achievements after load
        setTimeout(() => { if (typeof Achievements !== 'undefined') Achievements.checkAndNotify(); }, 2000);
    },

    // --- Theme (with auto-detect #20) ---
    initTheme() {
        const theme = Storage.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        this._updateThemeIcon(theme);
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        // Listen for system theme changes (#20)
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const stored = localStorage.getItem('vocabDaily_theme');
                if (!stored) { // Only auto-switch if user hasn't manually set
                    const t = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', t);
                    this._updateThemeIcon(t);
                }
            });
        }
    },
    toggleTheme() {
        const current = Storage.getTheme();
        const next = current === 'light' ? 'dark' : 'light';
        Storage.setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        this._updateThemeIcon(next);
    },
    _updateThemeIcon(theme) { document.getElementById('theme-icon').textContent = theme === 'dark' ? '\u2600' : '\u263E'; },

    // --- Navigation ---
    initNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.getAttribute('data-tab')));
        });
    },
    switchTab(tabName) {
        this.currentTab = tabName;
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName));
        document.querySelectorAll('.tab-section').forEach(s => s.classList.toggle('active', s.id === tabName));
        if (tabName === 'practice') this.renderSRSReview();
        if (tabName === 'mywords') this.renderMyWords();
        if (tabName === 'stats') this.renderStats();
        if (tabName === 'ukus') { const active = document.querySelector('.ukus-sub-btn.active'); this.renderUKUS(active ? active.getAttribute('data-ukus-tab') : 'us-slang'); }
        if (tabName === 'chatpractice') this.renderChatPractice();
        if (tabName === 'challenge') this.renderChallenge();
        if (tabName === 'settings') this.renderSettings();
    },

    // --- Swipe Navigation (#10) ---
    initSwipe() {
        const content = document.querySelector('.content');
        if (!content) return;
        content.addEventListener('touchstart', (e) => { this.touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        content.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - this.touchStartX;
            if (Math.abs(diff) < 80) return;
            const idx = this.tabOrder.indexOf(this.currentTab);
            if (diff > 0 && idx > 0) this.switchTab(this.tabOrder[idx - 1]);
            else if (diff < 0 && idx < this.tabOrder.length - 1) this.switchTab(this.tabOrder[idx + 1]);
        }, { passive: true });
    },

    // --- Search (#6) ---
    initSearch() {
        const btn = document.getElementById('search-btn');
        if (btn) btn.addEventListener('click', () => Search.renderSearchModal(''));
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); Search.renderSearchModal(''); }
        });
    },

    // --- Offline Indicator (#7) ---
    initOfflineIndicator() {
        const updateStatus = () => {
            let banner = document.getElementById('offline-banner');
            if (!navigator.onLine) {
                if (!banner) {
                    banner = document.createElement('div');
                    banner.id = 'offline-banner';
                    banner.className = 'offline-banner';
                    banner.textContent = '📡 You\'re offline — using cached data';
                    document.body.prepend(banner);
                }
            } else if (banner) { banner.remove(); }
        };
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        updateStatus();
    },

    // --- Sub Tabs (My Words) ---
    initSubTabs() {
        document.querySelectorAll('#mywords .sub-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const subtab = btn.getAttribute('data-subtab');
                document.querySelectorAll('#mywords .sub-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('#mywords .sub-tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(subtab + '-list').classList.add('active');
            });
        });
    },

    // --- Quiz Selector ---
    initQuizSelector() {
        document.querySelectorAll('.quiz-type-btn').forEach(btn => {
            btn.addEventListener('click', () => this.startQuiz(btn.getAttribute('data-quiz')));
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
        const close = () => { modal.style.display = 'none'; };
        modal.querySelector('.modal-overlay').addEventListener('click', close);
        document.getElementById('modal-close').addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    },
    showWordModal(wordEntry) {
        const modal = document.getElementById('word-modal');
        const body = document.getElementById('modal-body');
        body.innerHTML = this._renderWordCardHTML(wordEntry, false);
        modal.style.display = 'flex';
        this._attachCardActions(body, wordEntry);
        // Voice practice in modal (#16)
        if (typeof VoiceInput !== 'undefined' && VoiceInput.isAvailable()) {
            const voiceDiv = document.createElement('div');
            voiceDiv.style.marginTop = '16px';
            body.appendChild(voiceDiv);
            VoiceInput.renderPracticeUI(voiceDiv, wordEntry.word, 'us');
        }
    },

    // --- Words of the Day ---
    async loadWordsOfTheDay() {
        const loading = document.getElementById('wotd-loading');
        const cardsContainer = document.getElementById('wotd-cards');
        const dateEl = document.getElementById('wotd-date');
        loading.style.display = 'block';
        cardsContainer.innerHTML = '';
        const today = new Date();
        dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        try { this.todayWords = await DictionaryAPI.getWordsOfTheDay(today, 5); }
        catch { this.todayWords = WORD_LIST.slice(0, 5).map(w => ({ ...w, audioUrl: null })); }
        loading.style.display = 'none';

        // SRS due words banner
        if (typeof SpacedRepetition !== 'undefined') {
            const due = SpacedRepetition.getWordsToReview();
            if (due.length > 0) {
                const banner = document.createElement('div');
                banner.className = 'srs-due-banner';
                banner.innerHTML = `<span>📝 ${due.length} word${due.length>1?'s':''} due for review</span><button class="btn-sm" id="srs-review-btn">Review Now</button>`;
                cardsContainer.appendChild(banner);
                banner.querySelector('#srs-review-btn').addEventListener('click', () => this.switchTab('practice'));
            }
        }

        this.todayWords.forEach((wordEntry, idx) => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.style.animationDelay = (idx * 0.08) + 's';
            card.innerHTML = this._renderWordCardHTML(wordEntry, true);
            cardsContainer.appendChild(card);
            this._attachCardActions(card, wordEntry);
        });

        const todayISO = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        Storage.addToHistory(todayISO, this.todayWords.map(w => w.word));
    },

    _renderWordCardHTML(wordEntry, showActions) {
        const w = wordEntry;
        let html = '<div class="word-card-header"><div>';
        html += `<span class="word-title">${this._esc(w.word)}</span>`;
        if (w.phonetic) html += `<span class="word-phonetic">${this._esc(w.phonetic)}</span>`;
        if (w.audioUrl) html += `<button class="btn-audio" data-audio="${this._esc(w.audioUrl)}" title="Play pronunciation" aria-label="Play pronunciation">&#x1F50A;</button>`;
        else html += `<button class="btn-tts" data-text="${this._esc(w.word)}" data-accent="us" title="Listen to pronunciation" aria-label="Listen to pronunciation">&#x1F50A;</button>`;
        html += '</div>';
        if (showActions) {
            const isLearned = Storage.isLearned(w.word);
            const isBookmarked = Storage.isBookmarked(w.word);
            html += `<div class="word-actions">
                <button class="btn-sm btn-learned ${isLearned ? 'active' : ''}" data-word="${this._esc(w.word)}" aria-label="${isLearned?'Unmark':'Mark'} learned">${isLearned ? 'Learned' : 'Mark Learned'}</button>
                <button class="btn-sm btn-bookmark ${isBookmarked ? 'active' : ''}" data-word="${this._esc(w.word)}" aria-label="${isBookmarked?'Remove':'Add'} bookmark">${isBookmarked ? 'Bookmarked' : 'Bookmark'}</button>
            </div>`;
        }
        html += '</div>';
        if (w.meanings && w.meanings.length > 0) {
            html += '<div>'; w.meanings.forEach(m => { html += `<span class="pos-badge">${this._esc(m.partOfSpeech)}</span>`; }); html += '</div>';
        }
        html += '<div class="word-definitions">';
        if (w.meanings) w.meanings.forEach(m => m.definitions.forEach(d => {
            html += `<div class="definition-item"><div class="definition-text">${this._esc(d.definition)}</div>${d.example ? `<div class="definition-example">"${this._esc(d.example)}"</div>` : ''}</div>`;
        }));
        html += '</div>';
        const allSynonyms = (w.meanings || []).flatMap(m => m.synonyms || []).slice(0, 5);
        const allAntonyms = (w.meanings || []).flatMap(m => m.antonyms || []).slice(0, 5);
        if (allSynonyms.length > 0 || allAntonyms.length > 0) {
            html += '<div class="word-meta">';
            if (allSynonyms.length > 0) html += `<div class="meta-group"><span class="meta-label">Synonyms</span><span class="meta-value">${allSynonyms.map(s => this._esc(s)).join(', ')}</span></div>`;
            if (allAntonyms.length > 0) html += `<div class="meta-group"><span class="meta-label">Antonyms</span><span class="meta-value">${allAntonyms.map(s => this._esc(s)).join(', ')}</span></div>`;
            html += '</div>';
        }
        if (w.context) html += `<div class="word-context"><div class="word-context-label">How &amp; Where to Use</div>${this._esc(w.context)}</div>`;
        return html;
    },

    _attachCardActions(container, wordEntry) {
        this._attachTTSButtons(container);
        container.querySelectorAll('.btn-audio').forEach(btn => {
            btn.addEventListener('click', (e) => { e.stopPropagation(); const url = btn.getAttribute('data-audio'); if (url) new Audio(url).play().catch(() => {}); });
        });
        container.querySelectorAll('.btn-learned').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = btn.getAttribute('data-word');
                if (Storage.isLearned(word)) {
                    // Confirmation (#8)
                    if (!confirm(`Remove "${word}" from learned words?`)) return;
                    Storage.removeLearnedWord(word);
                    btn.classList.remove('active'); btn.textContent = 'Mark Learned';
                } else {
                    Storage.addLearnedWord(word);
                    btn.classList.add('active'); btn.textContent = 'Learned';
                    this._showToast(`"${word}" marked as learned!`);
                }
                if (typeof Achievements !== 'undefined') Achievements.checkAndNotify();
            });
        });
        container.querySelectorAll('.btn-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const word = btn.getAttribute('data-word');
                if (Storage.isBookmarked(word)) {
                    if (!confirm(`Remove "${word}" from bookmarks?`)) return;
                    Storage.removeBookmark(word);
                    btn.classList.remove('active'); btn.textContent = 'Bookmark';
                } else {
                    Storage.addBookmark(wordEntry);
                    btn.classList.add('active'); btn.textContent = 'Bookmarked';
                    this._showToast(`"${word}" bookmarked!`);
                }
            });
        });
    },

    _showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast-msg';
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2500);
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

        learnedList.innerHTML = '';
        learnedWords.forEach(wordStr => {
            const wordData = WORD_LIST.find(w => w.word === wordStr) || (typeof DataManager !== 'undefined' ? DataManager.getCustomWords().find(w => w.word === wordStr) : null);
            if (!wordData) return;
            learnedList.appendChild(this._createWordListItem(wordData, 'learned'));
        });

        bookmarkedList.innerHTML = '';
        bookmarks.forEach(wordData => bookmarkedList.appendChild(this._createWordListItem(wordData, 'bookmarked')));

        const activeSubTab = document.querySelector('#mywords .sub-tab-btn.active');
        const subtab = activeSubTab ? activeSubTab.getAttribute('data-subtab') : 'learned';
        const currentList = subtab === 'learned' ? learnedWords : bookmarks;
        emptyState.style.display = currentList.length === 0 ? 'block' : 'none';
    },

    _createWordListItem(wordData, type) {
        const item = document.createElement('div');
        item.className = 'word-list-item';
        const pos = wordData.meanings?.[0]?.partOfSpeech || '';
        const def = wordData.meanings?.[0]?.definitions?.[0]?.definition || '';
        item.innerHTML = `<div class="word-list-item-info"><span class="word-list-item-word">${this._esc(wordData.word)}</span><span class="word-list-item-pos">${this._esc(pos)}</span><div class="word-list-item-def">${this._esc(def)}</div></div>
            <button class="btn-remove" title="Remove" data-word="${this._esc(wordData.word)}" data-type="${type}" aria-label="Remove ${wordData.word}">&times;</button>`;
        item.querySelector('.word-list-item-info').addEventListener('click', () => this.showWordModal(wordData));
        item.querySelector('.btn-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            const word = e.currentTarget.getAttribute('data-word');
            const t = e.currentTarget.getAttribute('data-type');
            if (!confirm(`Remove "${word}" from ${t} list?`)) return; // #8
            if (t === 'learned') Storage.removeLearnedWord(word); else Storage.removeBookmark(word);
            this.renderMyWords();
        });
        return item;
    },

    // --- Stats (with Weekly Summary #18 & Achievements #11) ---
    renderStats() {
        const streak = Storage.getStreak();
        const learned = Storage.getLearnedWords();
        const bookmarks = Storage.getBookmarks();
        const quizStats = Storage.getQuizStats();
        const history = Storage.getHistory();
        const weekly = Storage.getWeeklySummary();

        document.getElementById('stat-learned').textContent = learned.length;
        document.getElementById('stat-streak').textContent = streak.current;
        document.getElementById('stat-longest').textContent = streak.longest;
        document.getElementById('stat-quizzes').textContent = quizStats.totalQuizzes;
        document.getElementById('stat-bookmarks').textContent = bookmarks.length;
        const accuracy = quizStats.totalQuestions > 0 ? Math.round((quizStats.totalCorrect / quizStats.totalQuestions) * 100) : 0;
        document.getElementById('stat-accuracy').textContent = accuracy + '%';

        // Weekly Summary (#18)
        const weeklyEl = document.getElementById('weekly-summary');
        if (weeklyEl) {
            weeklyEl.innerHTML = `<div class="weekly-grid">
                <div class="weekly-item"><span class="weekly-val">${weekly.daysActive}</span><span class="weekly-label">Days Active</span></div>
                <div class="weekly-item"><span class="weekly-val">${weekly.wordsLearned}</span><span class="weekly-label">New Words</span></div>
                <div class="weekly-item"><span class="weekly-val">${weekly.accuracy}%</span><span class="weekly-label">Quiz Accuracy</span></div>
            </div>`;
        }

        // Achievements (#11)
        const achieveEl = document.getElementById('achievements-grid');
        if (achieveEl && typeof Achievements !== 'undefined') {
            const all = Achievements.getAll();
            achieveEl.innerHTML = all.map(b => `<div class="achievement-card ${b.earned ? 'earned' : 'locked'}" title="${b.desc}">
                <span class="achievement-icon">${b.earned ? b.icon : '🔒'}</span>
                <span class="achievement-title">${b.title}</span>
            </div>`).join('');
        }

        // SRS stats
        const srsEl = document.getElementById('srs-stats');
        if (srsEl && typeof SpacedRepetition !== 'undefined') {
            const srs = SpacedRepetition.getAllStats();
            srsEl.innerHTML = `<div class="srs-mini-stats"><span>📚 ${srs.totalWords} tracked</span><span>🏆 ${srs.mastered} mastered</span><span>📝 ${srs.dueToday} due</span><span>📊 ${SpacedRepetition.getMasteryPercentage()}%</span></div>`;
        }

        // History
        const historyEl = document.getElementById('wotd-history');
        const historyEmpty = document.getElementById('history-empty');
        if (history.length === 0) { historyEl.innerHTML = ''; historyEmpty.style.display = 'block'; }
        else {
            historyEmpty.style.display = 'none';
            historyEl.innerHTML = history.slice(0, 30).map(entry => {
                const words = Array.isArray(entry.words) ? entry.words : [entry.words];
                const date = new Date(entry.date + 'T00:00:00');
                const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return `<div class="history-item"><span class="history-date">${this._esc(dateStr)}</span><div class="history-words">${words.map(w => `<span class="history-word-tag">${this._esc(w)}</span>`).join('')}</div></div>`;
            }).join('');
        }
    },

    // --- Streak ---
    updateStreakOnVisit() { Storage.updateStreak(); },
    renderStreakBadge() { document.getElementById('streak-count').textContent = Storage.getStreak().current; },

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
            case 'idioms': this._renderIdioms(container); break;
            case 'phrasal': this._renderPhrasalVerbs(container); break;
            case 'collocations': this._renderCollocations(container); break;
            case 'compare': this._renderSlangCompare(container); break;
            case 'realtalk': this._renderRealTalk(container); break;
        }
    },

    _renderSlangList(container, slangArr, region) {
        const flag = region === 'uk' ? '\uD83C\uDDEC\uD83C\uDDE7' : '\uD83C\uDDFA\uD83C\uDDF8';
        const accent = region === 'uk' ? 'uk' : 'us';
        const label = region === 'uk' ? 'UK' : 'US';
        container.innerHTML = slangArr.map(s => `<div class="slang-card"><div class="slang-word-row"><div class="slang-word">${flag} ${this._esc(s.word)}</div><button class="btn-tts" data-text="${this._esc(s.word)}" data-accent="${accent}" title="Listen" aria-label="Listen to ${s.word}">&#x1F50A;</button></div>
            <div class="slang-meaning">${this._esc(s.meaning)}</div><div class="slang-example-row"><div class="slang-example">"${this._esc(s.example)}"</div><button class="btn-tts btn-tts-sm" data-text="${this._esc(s.example)}" data-accent="${accent}" title="Listen" aria-label="Listen to example">&#x1F50A;</button></div>
            <div class="slang-meta"><span class="slang-tag ${region}">${label} Slang</span>${s.level ? `<span class="slang-tag">${this._esc(s.level)}</span>` : ''}</div>
            ${s.origin ? `<div class="slang-origin"><strong>Origin:</strong> ${this._esc(s.origin)}</div>` : ''}${s.usage ? `<div class="slang-usage">\uD83D\uDCA1 ${this._esc(s.usage)}</div>` : ''}</div>`).join('');
        this._attachTTSButtons(container);
    },

    _renderVocabDiff(container) {
        const diffs = SLANG_DATA.vocabularyDifferences;
        container.innerHTML = `<table class="diff-table"><thead><tr><th>\uD83C\uDDEC\uD83C\uDDE7 British</th><th>\uD83C\uDDFA\uD83C\uDDF8 American</th><th>Meaning</th></tr></thead><tbody>` +
            diffs.map(d => `<tr><td class="uk-col">${this._esc(d.uk)}<span class="diff-example">${this._esc(d.example_uk)}</span></td><td class="us-col">${this._esc(d.us)}<span class="diff-example">${this._esc(d.example_us)}</span></td><td>${this._esc(d.meaning)}</td></tr>`).join('') + '</tbody></table>';
    },

    _renderSpellingDiff(container) {
        const diffs = SLANG_DATA.spellingDifferences;
        container.innerHTML = `<table class="diff-table"><thead><tr><th>\uD83C\uDDEC\uD83C\uDDE7 British</th><th>\uD83C\uDDFA\uD83C\uDDF8 American</th><th>Rule</th></tr></thead><tbody>` +
            diffs.map(d => `<tr><td class="uk-col">${this._esc(d.uk)}</td><td class="us-col">${this._esc(d.us)}</td><td>${this._esc(d.rule)}</td></tr>`).join('') + '</tbody></table>';
    },

    _renderAccentGuide(container) {
        const guide = SLANG_DATA.accentGuide;
        container.innerHTML = ['us','uk'].map(r => {
            const g = guide[r]; const flag = r==='us'?'\uD83C\uDDFA\uD83C\uDDF8':'\uD83C\uDDEC\uD83C\uDDE7';
            return `<div class="accent-section"><div class="accent-title"><span class="accent-flag">${flag}</span> ${this._esc(g.name)}</div>` +
                g.features.map(f => `<div class="accent-feature"><div class="accent-feature-name">${this._esc(f.feature)}</div><div class="accent-feature-desc">${this._esc(f.description)}</div><div class="accent-examples">${f.examples.map(e => `<span class="accent-example-tag">${this._esc(e)}</span>`).join('')}</div></div>`).join('') + '</div>';
        }).join('');
    },

    _renderPhrases(container) {
        container.innerHTML = SLANG_DATA.commonPhrases.map(p => `<div class="phrase-card"><div class="phrase-situation">${this._esc(p.situation)}</div><div class="phrase-row"><div><div class="phrase-label uk">\uD83C\uDDEC\uD83C\uDDE7 British <button class="btn-tts btn-tts-inline" data-text="${this._esc(p.uk)}" data-accent="uk" title="Listen UK" aria-label="Listen UK">&#x1F50A;</button></div><div class="phrase-text">${this._esc(p.uk)}</div></div><div><div class="phrase-label us">\uD83C\uDDFA\uD83C\uDDF8 American <button class="btn-tts btn-tts-inline" data-text="${this._esc(p.us)}" data-accent="us" title="Listen US" aria-label="Listen US">&#x1F50A;</button></div><div class="phrase-text">${this._esc(p.us)}</div></div></div>${p.note ? `<div class="phrase-note">${this._esc(p.note)}</div>` : ''}</div>`).join('');
        this._attachTTSButtons(container);
    },

    // --- Idioms, Phrasal Verbs, Collocations (#13) ---
    _renderIdioms(container) {
        if (typeof IDIOMS_DATA === 'undefined') { container.innerHTML = '<p>Loading...</p>'; return; }
        const cats = [...new Set(IDIOMS_DATA.idioms.map(i => i.category))];
        container.innerHTML = cats.map(cat => `<h4 style="margin:16px 0 8px;text-transform:capitalize">${cat}</h4>` +
            IDIOMS_DATA.idioms.filter(i => i.category === cat).map(i => `<div class="slang-card"><div class="slang-word">${this._esc(i.phrase)}</div><div class="slang-meaning">${this._esc(i.meaning)}</div><div class="slang-example">"${this._esc(i.example)}"</div></div>`).join('')).join('');
    },
    _renderPhrasalVerbs(container) {
        if (typeof IDIOMS_DATA === 'undefined') { container.innerHTML = '<p>Loading...</p>'; return; }
        container.innerHTML = IDIOMS_DATA.phrasalVerbs.map(p => `<div class="slang-card"><div class="slang-word-row"><div class="slang-word">${this._esc(p.verb)}</div><span class="slang-tag">${p.separable?'Separable':'Inseparable'}</span></div><div class="slang-meaning">${this._esc(p.meaning)}</div><div class="slang-example">"${this._esc(p.example)}"</div></div>`).join('');
    },
    _renderCollocations(container) {
        if (typeof IDIOMS_DATA === 'undefined') { container.innerHTML = '<p>Loading...</p>'; return; }
        const cats = [...new Set(IDIOMS_DATA.collocations.map(c => c.category))];
        container.innerHTML = cats.map(cat => `<h4 style="margin:16px 0 8px">${cat}</h4>` +
            IDIOMS_DATA.collocations.filter(c => c.category === cat).map(c => `<div class="slang-card"><div class="slang-word">${this._esc(c.words)}</div><div class="slang-meaning">${this._esc(c.meaning)}</div><div class="slang-example">"${this._esc(c.example)}"</div></div>`).join('')).join('');
    },

    // --- Side-by-Side US vs UK Slang Compare ---
    _renderSlangCompare(container) {
        if (typeof SLANG_DATA === 'undefined' || !SLANG_DATA.slangComparisons) { container.innerHTML = '<p>Loading...</p>'; return; }
        container.innerHTML = '<div class="compare-intro"><p>Same concept, different slang — see how US and UK express the same ideas!</p></div>' +
            SLANG_DATA.slangComparisons.map(c => `<div class="compare-card">
                <div class="compare-concept">${this._esc(c.concept)}</div>
                <div class="compare-grid">
                    <div class="compare-col compare-us"><div class="compare-region">\uD83C\uDDFA\uD83C\uDDF8 American</div>
                        <div class="compare-terms">${this._esc(c.us.terms)}</div>
                        <div class="compare-example">"${this._esc(c.us.example)}"</div>
                        <button class="btn-tts btn-tts-sm" data-text="${this._esc(c.us.example)}" data-accent="us" aria-label="Listen US">&#x1F50A;</button></div>
                    <div class="compare-col compare-uk"><div class="compare-region">\uD83C\uDDEC\uD83C\uDDE7 British</div>
                        <div class="compare-terms">${this._esc(c.uk.terms)}</div>
                        <div class="compare-example">"${this._esc(c.uk.example)}"</div>
                        <button class="btn-tts btn-tts-sm" data-text="${this._esc(c.uk.example)}" data-accent="uk" aria-label="Listen UK">&#x1F50A;</button></div>
                </div>
                ${c.note ? `<div class="compare-note">\uD83D\uDCA1 ${this._esc(c.note)}</div>` : ''}
            </div>`).join('');
        this._attachTTSButtons(container);
    },

    // --- Real Talk: Everyday Conversation Examples ---
    _renderRealTalk(container) {
        if (typeof SLANG_DATA === 'undefined' || !SLANG_DATA.conversationExamples) { container.innerHTML = '<p>Loading...</p>'; return; }
        container.innerHTML = '<div class="realtalk-intro"><p>Real sentences you can use in everyday conversations — copy, practice, and sound natural!</p></div>' +
            SLANG_DATA.conversationExamples.map(ex => `<div class="realtalk-card">
                <div class="realtalk-header">
                    <div class="realtalk-scenario">${this._esc(ex.scenario)}</div>
                    <div class="realtalk-context">${this._esc(ex.context)}</div>
                    <span class="slang-tag">${this._esc(ex.category)}</span>
                </div>
                <div class="realtalk-exchanges">${ex.exchanges.map(e => `
                    <div class="realtalk-line ${e.speaker === 'You' ? 'realtalk-you' : 'realtalk-other'}">
                        <div class="realtalk-speaker">${this._esc(e.speaker)}</div>
                        <div class="realtalk-bubble">
                            <div class="realtalk-text">"${this._esc(e.text)}"</div>
                            <button class="btn-tts btn-tts-sm" data-text="${this._esc(e.text)}" data-accent="us" aria-label="Listen">&#x1F50A;</button>
                        </div>
                        ${e.note ? `<div class="realtalk-note">${this._esc(e.note)}</div>` : ''}
                    </div>`).join('')}
                </div>
                <div class="realtalk-vocab">${ex.vocabHighlights.map(v => `<span class="realtalk-tag">${this._esc(v)}</span>`).join('')}</div>
            </div>`).join('');
        this._attachTTSButtons(container);
    },

    // --- Daily Challenge (#14) ---
    renderChallenge() {
        const container = document.getElementById('challenge-container');
        if (container && typeof DailyChallenge !== 'undefined') DailyChallenge.startChallenge(container);
    },

    // --- Settings / Data Manager (#15, #17) ---
    renderSettings() {
        const container = document.getElementById('settings-container');
        if (container && typeof DataManager !== 'undefined') DataManager.renderSettingsUI(container);
    },

    // --- SRS Review in Practice Tab (#5) ---
    renderSRSReview() {
        const area = document.getElementById('srs-review-area');
        if (area && typeof SpacedRepetition !== 'undefined') {
            SpacedRepetition.renderReviewCard(area);
        }
    },

    // --- Chat Practice ---
    renderChatPractice() {
        const container = document.getElementById('chat-container');
        if (container) ChatPractice.renderScenarioSelector(container);
    },

    _attachTTSButtons(container) {
        if (!container) return;
        container.querySelectorAll('.btn-tts').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-text');
                const accent = btn.getAttribute('data-accent') || 'us';
                if (TTS.isAvailable()) TTS.speak(text, accent, text.split(' ').length > 3 ? 0.9 : 0.7);
            });
        });
    },

    // --- Helpers ---
    _esc(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
