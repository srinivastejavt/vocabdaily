// VocabDaily — Quiz Engine with 3 quiz types

window.QuizEngine = {
    currentQuiz: null,
    currentIndex: 0,
    score: 0,
    answered: false,

    generate(type, questionCount = 5) {
        this.score = 0;
        this.currentIndex = 0;
        this.answered = false;

        const pool = this._getWordPool(type === 'match' ? questionCount : questionCount * 4);
        let questions;

        switch (type) {
            case 'multiple-choice':
                questions = this._generateMultipleChoice(pool, questionCount);
                break;
            case 'fill-blank':
                questions = this._generateFillBlank(pool, questionCount);
                break;
            case 'match':
                questions = [this._generateMatch(pool, questionCount)];
                break;
            default:
                questions = this._generateMultipleChoice(pool, questionCount);
        }

        this.currentQuiz = { type, questions, totalQuestions: type === 'match' ? questionCount : questionCount };
        return this.currentQuiz;
    },

    getCurrentQuestion() {
        if (!this.currentQuiz) return null;
        return this.currentQuiz.questions[this.currentIndex] || null;
    },

    submitAnswer(answer) {
        if (this.answered) return null;
        this.answered = true;

        const q = this.getCurrentQuestion();
        if (!q) return null;

        const correct = answer === q.correctAnswer;
        if (correct) this.score++;

        return { correct, correctAnswer: q.correctAnswer, explanation: q.explanation };
    },

    nextQuestion() {
        this.answered = false;
        this.currentIndex++;
        return this.getCurrentQuestion();
    },

    getResults() {
        const total = this.currentQuiz.totalQuestions;
        const percentage = total > 0 ? Math.round((this.score / total) * 100) : 0;
        let message;
        if (percentage === 100) message = 'Perfect score! Outstanding!';
        else if (percentage >= 80) message = 'Great job! Keep it up!';
        else if (percentage >= 60) message = 'Good effort! Practice makes perfect.';
        else if (percentage >= 40) message = 'Not bad! Review the words and try again.';
        else message = 'Keep learning! Review today\'s words and try again.';

        return { score: this.score, total, percentage, message };
    },

    // --- Question Generators ---

    _generateMultipleChoice(pool, count) {
        const questions = [];
        const used = new Set();

        for (let i = 0; i < count && i < pool.length; i++) {
            const wordData = pool[i];
            if (used.has(wordData.word)) continue;
            used.add(wordData.word);

            const correctDef = wordData.meanings[0].definitions[0].definition;

            const distractors = pool
                .filter(w => w.word !== wordData.word)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => w.meanings[0].definitions[0].definition);

            // Ensure we have exactly 3 distractors
            while (distractors.length < 3) {
                distractors.push('A common English word with various meanings.');
            }

            const options = this._shuffle([correctDef, ...distractors]);

            questions.push({
                type: 'multiple-choice',
                prompt: `What is the meaning of "${wordData.word}"?`,
                correctAnswer: correctDef,
                options,
                word: wordData.word,
                explanation: `${wordData.word}: ${correctDef}`
            });
        }

        return questions;
    },

    _generateFillBlank(pool, count) {
        const questions = [];
        const used = new Set();

        for (let i = 0; i < pool.length && questions.length < count; i++) {
            const wordData = pool[i];
            if (used.has(wordData.word)) continue;
            used.add(wordData.word);

            let sentence = null;
            for (const meaning of wordData.meanings) {
                for (const def of meaning.definitions) {
                    if (def.example && def.example.toLowerCase().includes(wordData.word.toLowerCase())) {
                        const regex = new RegExp(wordData.word, 'gi');
                        sentence = def.example.replace(regex, '______');
                        break;
                    }
                }
                if (sentence) break;
            }

            if (!sentence) {
                const templates = [
                    `The professor described the concept as truly ______ in its implications.`,
                    `Her approach was remarkably ______ and impressed everyone.`,
                    `They found the situation to be quite ______ upon further investigation.`,
                    `The article used the word ______ to describe the phenomenon.`,
                    `Many considered the decision to be deeply ______ in nature.`
                ];
                sentence = templates[Math.floor(Math.random() * templates.length)];
            }

            const pos = wordData.meanings[0].partOfSpeech;
            const distractors = pool
                .filter(w => w.word !== wordData.word && w.meanings[0].partOfSpeech === pos)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => w.word);

            while (distractors.length < 3) {
                const random = pool[Math.floor(Math.random() * pool.length)];
                if (random.word !== wordData.word && !distractors.includes(random.word)) {
                    distractors.push(random.word);
                }
            }

            const options = this._shuffle([wordData.word, ...distractors.slice(0, 3)]);

            questions.push({
                type: 'fill-blank',
                prompt: 'Fill in the blank:',
                sentence,
                correctAnswer: wordData.word,
                options,
                word: wordData.word,
                explanation: `${wordData.word}: ${wordData.meanings[0].definitions[0].definition}`
            });
        }

        return questions;
    },

    _generateMatch(pool, count) {
        const selected = pool.slice(0, count);
        const pairs = selected.map(w => ({
            word: w.word,
            definition: w.meanings[0].definitions[0].definition
        }));

        return {
            type: 'match',
            prompt: 'Match each word with its correct definition:',
            pairs,
            shuffledDefs: this._shuffle([...pairs]),
            totalPairs: pairs.length
        };
    },

    // --- Word Pool ---

    _getWordPool(minSize) {
        const learned = Storage.getLearnedWords();
        const bookmarks = Storage.getBookmarks().map(b => b.word);
        const history = Storage.getHistory().flatMap(h => h.words || []);

        const priorityWordNames = [...new Set([...learned, ...bookmarks, ...history])];
        const priorityWords = priorityWordNames
            .map(w => WORD_LIST.find(wl => wl.word === w))
            .filter(Boolean);

        const shuffledPriority = this._shuffle([...priorityWords]);
        const shuffledAll = this._shuffle([...WORD_LIST]);

        const pool = [];
        const usedWords = new Set();

        for (const w of shuffledPriority) {
            if (pool.length >= minSize) break;
            if (!usedWords.has(w.word)) {
                pool.push(w);
                usedWords.add(w.word);
            }
        }

        for (const w of shuffledAll) {
            if (pool.length >= minSize) break;
            if (!usedWords.has(w.word)) {
                pool.push(w);
                usedWords.add(w.word);
            }
        }

        return this._shuffle(pool);
    },

    // --- Render Methods ---

    renderQuestion(container) {
        const q = this.getCurrentQuestion();
        if (!q) return;

        if (q.type === 'match') {
            this._renderMatch(container, q);
            return;
        }

        const total = this.currentQuiz.questions.length;

        let html = `
            <div class="quiz-header">
                <span class="quiz-progress">Question ${this.currentIndex + 1} of ${total}</span>
                <span class="quiz-score">Score: ${this.score}/${total}</span>
            </div>
            <div class="quiz-question">
                <p class="quiz-prompt">${q.prompt}</p>
                ${q.sentence ? `<p class="quiz-sentence">"${q.sentence}"</p>` : ''}
                <div class="quiz-options">
        `;

        q.options.forEach((opt, idx) => {
            const displayText = q.type === 'fill-blank' ? opt : opt;
            html += `<button class="quiz-option" data-index="${idx}" data-answer="${this._escapeHtml(opt)}">${this._escapeHtml(displayText)}</button>`;
        });

        html += `
                </div>
                <div id="quiz-feedback" class="quiz-feedback" style="display:none;"></div>
                <button id="quiz-next" class="quiz-next-btn" style="display:none;">Next Question</button>
            </div>
        `;

        container.innerHTML = html;

        // Attach click handlers
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => this._handleOptionClick(btn, container));
        });

        const nextBtn = container.querySelector('#quiz-next');
        nextBtn.addEventListener('click', () => {
            const next = this.nextQuestion();
            if (next) {
                this.renderQuestion(container);
            } else {
                this.renderResults(container);
            }
        });
    },

    _handleOptionClick(btn, container) {
        if (this.answered) return;

        const answer = btn.getAttribute('data-answer');
        const result = this.submitAnswer(answer);
        if (!result) return;

        // Disable all options
        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.add('disabled');
            if (opt.getAttribute('data-answer') === result.correctAnswer) {
                opt.classList.add('correct-answer');
            }
        });

        if (result.correct) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }

        // Show feedback
        const feedback = container.querySelector('#quiz-feedback');
        feedback.style.display = 'block';
        feedback.className = 'quiz-feedback ' + (result.correct ? 'correct' : 'incorrect');
        feedback.textContent = result.correct
            ? 'Correct! ' + result.explanation
            : 'Incorrect. ' + result.explanation;

        // Update score display
        const scoreEl = container.querySelector('.quiz-score');
        if (scoreEl) {
            scoreEl.textContent = `Score: ${this.score}/${this.currentQuiz.questions.length}`;
        }

        // Show next button
        container.querySelector('#quiz-next').style.display = 'inline-block';
    },

    _renderMatch(container, question) {
        this.matchState = {
            selectedWord: null,
            matchedPairs: 0,
            totalPairs: question.pairs.length,
            correctMap: {}
        };

        question.pairs.forEach(p => {
            this.matchState.correctMap[p.word] = p.definition;
        });

        const shuffledWords = this._shuffle([...question.pairs]);
        const shuffledDefs = this._shuffle([...question.pairs]);

        let html = `
            <div class="quiz-header">
                <span class="quiz-progress">Match the words</span>
                <span class="quiz-score">Matched: ${this.matchState.matchedPairs}/${this.matchState.totalPairs}</span>
            </div>
            <div class="quiz-question">
                <p class="quiz-prompt">${question.prompt}</p>
                <div class="match-container">
                    <div class="match-column">
                        <div class="match-column-title">Words</div>
                        ${shuffledWords.map(p =>
                            `<div class="match-item match-word" data-word="${this._escapeHtml(p.word)}">${this._escapeHtml(p.word)}</div>`
                        ).join('')}
                    </div>
                    <div class="match-column">
                        <div class="match-column-title">Definitions</div>
                        ${shuffledDefs.map(p =>
                            `<div class="match-item match-def" data-def="${this._escapeHtml(p.definition)}">${this._escapeHtml(p.definition)}</div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        container.querySelectorAll('.match-word').forEach(el => {
            el.addEventListener('click', () => this._handleMatchWordClick(el, container));
        });

        container.querySelectorAll('.match-def').forEach(el => {
            el.addEventListener('click', () => this._handleMatchDefClick(el, container));
        });
    },

    _handleMatchWordClick(el, container) {
        if (el.classList.contains('matched')) return;

        container.querySelectorAll('.match-word').forEach(w => w.classList.remove('selected'));
        el.classList.add('selected');
        this.matchState.selectedWord = el.getAttribute('data-word');
    },

    _handleMatchDefClick(el, container) {
        if (el.classList.contains('matched') || !this.matchState.selectedWord) return;

        const word = this.matchState.selectedWord;
        const def = el.getAttribute('data-def');
        const correct = this.matchState.correctMap[word] === def;

        if (correct) {
            this.matchState.matchedPairs++;
            this.score++;

            const wordEl = container.querySelector(`.match-word[data-word="${CSS.escape(word)}"]`);
            if (wordEl) {
                wordEl.classList.remove('selected');
                wordEl.classList.add('matched');
            }
            el.classList.add('matched');

            // Update score
            const scoreEl = container.querySelector('.quiz-score');
            if (scoreEl) {
                scoreEl.textContent = `Matched: ${this.matchState.matchedPairs}/${this.matchState.totalPairs}`;
            }

            this.matchState.selectedWord = null;

            // Check if all matched
            if (this.matchState.matchedPairs === this.matchState.totalPairs) {
                this.currentQuiz.totalQuestions = this.matchState.totalPairs;
                setTimeout(() => this.renderResults(container), 600);
            }
        } else {
            el.classList.add('wrong');
            setTimeout(() => el.classList.remove('wrong'), 400);
        }
    },

    renderResults(container) {
        const results = this.getResults();
        Storage.recordQuizResult(results.score, results.total);

        container.innerHTML = `
            <div class="quiz-results">
                <div class="quiz-results-score">${results.score}/${results.total}</div>
                <div class="quiz-results-label">${results.percentage}% Correct</div>
                <p class="quiz-results-message">${results.message}</p>
                <button class="quiz-back-btn" id="quiz-back">Try Another Quiz</button>
            </div>
        `;

        container.querySelector('#quiz-back').addEventListener('click', () => {
            container.style.display = 'none';
            document.getElementById('quiz-type-selector').style.display = 'grid';
            // Refresh stats if on stats tab
            if (typeof App !== 'undefined') App.renderStats();
        });
    },

    // --- Helpers ---

    _shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};
