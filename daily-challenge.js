// VocabDaily — Daily Challenge System
window.DailyChallenge = {
    STORAGE_KEY: 'vocabDaily_challenges',
    timerInterval: null,

    _hash(str) { let h=0; for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i); h&=h;} return Math.abs(h); },
    _today() { const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); },
    _dayOfWeek() { return new Date().getDay(); }, // 0=Sun

    getChallengeForToday() {
        const day = this._dayOfWeek();
        const types = ['word-detective','speed-round','slang-challenge','idiom-match','spelling-bee','mixed-bag','phrasal-fill'];
        const type = types[day];
        const seed = this._hash(this._today() + ':challenge');
        return { type, date: this._today(), timeLimit: type === 'speed-round' ? 60 : 120, questionCount: type === 'speed-round' ? 10 : 5, seed };
    },

    hasCompletedToday() {
        const data = this._getData();
        return !!data[this._today()];
    },

    getTodayResult() { return this._getData()[this._today()] || null; },
    _getData() { try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {}; } catch { return {}; } },
    _saveResult(result) { const d = this._getData(); d[this._today()] = result; try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(d)); } catch {} },

    getHistory() {
        const d = this._getData();
        return Object.entries(d).map(([date, r]) => ({ date, ...r })).sort((a,b) => b.date.localeCompare(a.date)).slice(0, 30);
    },

    startChallenge(container) {
        const challenge = this.getChallengeForToday();
        if (this.hasCompletedToday()) {
            const r = this.getTodayResult();
            container.innerHTML = `<div class="challenge-done"><div style="font-size:2.5rem;margin-bottom:10px;">✅</div><h3>Today's Challenge Complete!</h3><p>You scored <strong>${r.score}/${r.total}</strong> (${r.percentage}%)</p><p>Come back tomorrow for a new challenge!</p></div>`;
            return;
        }
        this._generateQuestions(challenge);
        this.currentChallenge = challenge;
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this._renderChallengeUI(container);
    },

    _generateQuestions(challenge) {
        const questions = [];
        const words = typeof WORD_LIST !== 'undefined' ? WORD_LIST : [];
        const shuffle = (a) => { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=(challenge.seed+i)%b.length;[b[i],b[j]]=[b[j],b[i]];} return b; };
        const pool = shuffle(words);

        switch(challenge.type) {
            case 'speed-round':
            case 'mixed-bag':
                for (let i=0; i<challenge.questionCount && i<pool.length; i++) {
                    const w = pool[i];
                    const correctDef = w.meanings[0].definitions[0].definition;
                    const dists = pool.filter(x=>x.word!==w.word).slice(0,3).map(x=>x.meanings[0].definitions[0].definition);
                    while(dists.length<3) dists.push('A common English word.');
                    const opts = shuffle([correctDef,...dists]);
                    questions.push({ prompt: `What does "${w.word}" mean?`, options: opts, correctAnswer: correctDef, word: w.word });
                }
                break;
            case 'slang-challenge':
                const slang = typeof SLANG_DATA!=='undefined' ? shuffle([...SLANG_DATA.usSlang,...SLANG_DATA.ukSlang]) : [];
                for(let i=0;i<challenge.questionCount&&i<slang.length;i++){
                    const s=slang[i]; const dists=slang.filter(x=>x.word!==s.word).slice(0,3).map(x=>x.meaning);
                    while(dists.length<3) dists.push('A common expression.');
                    const opts=shuffle([s.meaning,...dists]);
                    questions.push({ prompt:`What does "${s.word}" mean?`, options:opts, correctAnswer:s.meaning, word:s.word });
                }
                break;
            case 'idiom-match':
                const idioms = typeof IDIOMS_DATA!=='undefined' ? shuffle([...IDIOMS_DATA.idioms]) : [];
                for(let i=0;i<challenge.questionCount&&i<idioms.length;i++){
                    const id=idioms[i]; const dists=idioms.filter(x=>x.phrase!==id.phrase).slice(0,3).map(x=>x.meaning);
                    while(dists.length<3) dists.push('An uncommon expression.');
                    const opts=shuffle([id.meaning,...dists]);
                    questions.push({ prompt:`"${id.phrase}" means:`, options:opts, correctAnswer:id.meaning, word:id.phrase });
                }
                break;
            case 'spelling-bee':
                const spellings = typeof SLANG_DATA!=='undefined' ? shuffle([...SLANG_DATA.spellingDifferences]) : [];
                for(let i=0;i<challenge.questionCount&&i<spellings.length;i++){
                    const s=spellings[i];
                    const opts=shuffle([s.us, s.uk, s.us+'e', s.uk.replace(/our/,'or')+'s'].slice(0,4));
                    questions.push({ prompt:`American spelling of "${s.uk}":`, options:opts.length>=4?opts:[s.us,s.uk,s.us+'s',s.uk+'s'], correctAnswer:s.us, word:s.uk });
                }
                break;
            case 'phrasal-fill':
                const pvs = typeof IDIOMS_DATA!=='undefined' ? shuffle([...IDIOMS_DATA.phrasalVerbs]) : [];
                for(let i=0;i<challenge.questionCount&&i<pvs.length;i++){
                    const p=pvs[i]; const dists=pvs.filter(x=>x.verb!==p.verb).slice(0,3).map(x=>x.verb);
                    while(dists.length<3) dists.push('take over');
                    const opts=shuffle([p.verb,...dists]);
                    questions.push({ prompt:`"${p.meaning}" = which phrasal verb?`, options:opts, correctAnswer:p.verb, word:p.verb });
                }
                break;
            case 'word-detective':
            default:
                for(let i=0;i<challenge.questionCount&&i<pool.length;i++){
                    const w=pool[i]; const syns=(w.meanings[0].synonyms||[]).slice(0,2).join(', ')||'no synonyms';
                    const pos=w.meanings[0].partOfSpeech;
                    const dists=pool.filter(x=>x.word!==w.word).slice(0,3).map(x=>x.word);
                    const opts=shuffle([w.word,...dists]);
                    questions.push({ prompt:`Clue: ${pos}, synonyms: ${syns}`, options:opts, correctAnswer:w.word, word:w.word });
                }
        }
        challenge.questions = questions;
    },

    _renderChallengeUI(container) {
        const ch = this.currentChallenge;
        const typeNames = {'speed-round':'⚡ Speed Round','slang-challenge':'🗣️ Slang Challenge','idiom-match':'💬 Idiom Match','spelling-bee':'📝 Spelling Bee','mixed-bag':'🎲 Mixed Bag','phrasal-fill':'🔗 Phrasal Verbs','word-detective':'🔍 Word Detective'};
        container.innerHTML = `
            <div class="challenge-ui">
                <div class="challenge-header">
                    <span class="challenge-type">${typeNames[ch.type]||ch.type}</span>
                    <span class="challenge-timer" id="ch-timer">${ch.timeLimit}s</span>
                    <span class="quiz-score" id="ch-score">0/${ch.questionCount}</span>
                </div>
                <div id="ch-question-area"></div>
            </div>`;
        this.timeLeft = ch.timeLimit;
        this._startTimer(container);
        this._renderQuestion(container);
    },

    _startTimer(container) {
        clearInterval(this.timerInterval);
        const el = container.querySelector('#ch-timer');
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            if (el) el.textContent = this.timeLeft + 's';
            if (el) el.style.color = this.timeLeft <= 10 ? 'var(--error)' : '';
            if (this.timeLeft <= 0) { clearInterval(this.timerInterval); this._finishChallenge(container); }
        }, 1000);
    },

    _renderQuestion(container) {
        const area = container.querySelector('#ch-question-area');
        const q = this.currentChallenge.questions[this.currentIndex];
        if (!q) { this._finishChallenge(container); return; }
        this.answered = false;
        area.innerHTML = `
            <div class="quiz-question"><p class="quiz-prompt">${q.prompt}</p>
            <div class="quiz-options">${q.options.map((o,i) => `<button class="quiz-option" data-idx="${i}" data-answer="${o.replace(/"/g,'&quot;')}">${o}</button>`).join('')}</div>
            <div id="ch-feedback" class="quiz-feedback" style="display:none;"></div></div>`;
        area.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                if(this.answered) return;
                this.answered = true;
                const ans = btn.getAttribute('data-answer');
                const correct = ans === q.correctAnswer;
                if(correct) this.score++;
                area.querySelectorAll('.quiz-option').forEach(b => {
                    b.classList.add('disabled');
                    if(b.getAttribute('data-answer')===q.correctAnswer) b.classList.add('correct-answer');
                });
                btn.classList.add(correct?'correct':'incorrect');
                container.querySelector('#ch-score').textContent = `${this.score}/${this.currentChallenge.questionCount}`;
                setTimeout(() => { this.currentIndex++; this._renderQuestion(container); }, 1200);
            });
        });
    },

    _finishChallenge(container) {
        clearInterval(this.timerInterval);
        const total = this.currentChallenge.questionCount;
        const pct = total>0 ? Math.round((this.score/total)*100) : 0;
        this._saveResult({ score: this.score, total, percentage: pct, type: this.currentChallenge.type, timeUsed: this.currentChallenge.timeLimit - this.timeLeft });
        const emoji = pct===100?'🌟':pct>=70?'🔥':pct>=40?'💪':'📚';
        container.innerHTML = `<div class="quiz-results"><div style="font-size:3rem">${emoji}</div>
            <div class="quiz-results-score">${this.score}/${total}</div>
            <div class="quiz-results-label">${pct}% — Daily Challenge</div>
            <p class="quiz-results-message">${pct===100?'Perfect daily challenge!':pct>=70?'Great job today!':'Keep practicing!'}</p>
            <p style="color:var(--text-muted);margin-top:8px">Come back tomorrow for a new challenge!</p></div>`;
        if (typeof Achievements !== 'undefined') Achievements.checkAndNotify();
    }
};
