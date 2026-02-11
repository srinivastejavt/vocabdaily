// VocabDaily — Voice Input for Pronunciation Practice
window.VoiceInput = {
    recognition: null,
    isListening: false,

    isAvailable() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },

    _createRecognition(accent) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const r = new SR();
        r.lang = accent === 'uk' ? 'en-GB' : 'en-US';
        r.interimResults = false;
        r.maxAlternatives = 3;
        r.continuous = false;
        return r;
    },

    startListening(accent, onResult, onError) {
        if (!this.isAvailable()) { onError?.('Speech recognition not supported'); return; }
        this.stopListening();
        this.recognition = this._createRecognition(accent);
        this.isListening = true;
        this.recognition.onresult = (e) => {
            this.isListening = false;
            const results = [];
            for (let i = 0; i < e.results[0].length; i++) {
                results.push({ transcript: e.results[0][i].transcript.toLowerCase().trim(), confidence: e.results[0][i].confidence });
            }
            onResult?.(results);
        };
        this.recognition.onerror = (e) => { this.isListening = false; onError?.(e.error); };
        this.recognition.onend = () => { this.isListening = false; };
        this.recognition.start();
    },

    stopListening() {
        if (this.recognition) { try { this.recognition.stop(); } catch {} }
        this.isListening = false;
    },

    comparePronunciation(target, spoken) {
        const t = target.toLowerCase().trim();
        const s = spoken.toLowerCase().trim();
        if (t === s) return { match: true, similarity: 1, feedback: 'Perfect pronunciation! 🎉' };
        const dist = this._levenshtein(t, s);
        const maxLen = Math.max(t.length, s.length);
        const similarity = maxLen > 0 ? Math.round(((maxLen - dist) / maxLen) * 100) / 100 : 0;
        let feedback;
        if (similarity >= 0.8) feedback = 'Very close! Almost perfect. 👍';
        else if (similarity >= 0.6) feedback = 'Good try! Keep practicing. 💪';
        else if (similarity >= 0.3) feedback = `I heard "${spoken}" — try again slowly.`;
        else feedback = `I heard "${spoken}" — that's quite different. Listen first, then try again.`;
        return { match: false, similarity, feedback };
    },

    _levenshtein(a, b) {
        const m = a.length, n = b.length;
        const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
        return dp[m][n];
    },

    renderPracticeUI(container, word, accent) {
        if (!this.isAvailable()) {
            container.innerHTML = '<div class="voice-unsupported"><p>🎤 Voice input is not supported in this browser. Try Chrome on desktop or Android.</p></div>';
            return;
        }
        container.innerHTML = `
            <div class="voice-practice">
                <div class="voice-target"><span>Say this word:</span><strong>${word}</strong>
                    <button class="btn-tts" data-text="${word}" data-accent="${accent}" title="Listen first">🔊</button></div>
                <button class="voice-mic-btn" id="voice-mic" title="Tap to speak"><span class="mic-icon">🎤</span><span class="mic-label">Tap to speak</span></button>
                <div class="voice-result hidden" id="voice-result"></div>
                <button class="btn-sm voice-retry hidden" id="voice-retry">Try Again</button>
            </div>`;

        const micBtn = container.querySelector('#voice-mic');
        const resultEl = container.querySelector('#voice-result');
        const retryBtn = container.querySelector('#voice-retry');

        // TTS button
        container.querySelector('.btn-tts')?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof TTS !== 'undefined' && TTS.isAvailable()) TTS.speakWord(word, accent);
        });

        const startRec = () => {
            micBtn.classList.add('listening');
            micBtn.querySelector('.mic-label').textContent = 'Listening...';
            resultEl.classList.add('hidden');
            retryBtn.classList.add('hidden');

            this.startListening(accent, (results) => {
                micBtn.classList.remove('listening');
                micBtn.querySelector('.mic-label').textContent = 'Tap to speak';
                const best = results[0];
                const comparison = this.comparePronunciation(word, best.transcript);
                resultEl.classList.remove('hidden');
                resultEl.className = 'voice-result ' + (comparison.match ? 'correct' : comparison.similarity >= 0.6 ? 'close' : 'incorrect');
                resultEl.innerHTML = `<div class="voice-heard">You said: "<strong>${best.transcript}</strong>"</div>
                    <div class="voice-score">${Math.round(comparison.similarity*100)}% match</div>
                    <div class="voice-feedback">${comparison.feedback}</div>`;
                retryBtn.classList.remove('hidden');
            }, (err) => {
                micBtn.classList.remove('listening');
                micBtn.querySelector('.mic-label').textContent = 'Tap to speak';
                resultEl.classList.remove('hidden');
                resultEl.className = 'voice-result incorrect';
                resultEl.textContent = err === 'no-speech' ? 'No speech detected. Try again.' : 'Error: ' + err;
                retryBtn.classList.remove('hidden');
            });
        };

        micBtn.addEventListener('click', startRec);
        retryBtn.addEventListener('click', () => { resultEl.classList.add('hidden'); retryBtn.classList.add('hidden'); startRec(); });
    }
};
