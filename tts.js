// VocabDaily — Text-to-Speech Engine using Web Speech API
// Provides pronunciation for all words, slang, and accent examples
// Supports UK and US accents using browser built-in voices

window.TTS = {
    voices: [],
    usVoice: null,
    ukVoice: null,
    ready: false,

    init() {
        if (!('speechSynthesis' in window)) {
            console.warn('TTS: Speech synthesis not supported in this browser');
            return;
        }

        // Voices load async in some browsers
        const loadVoices = () => {
            this.voices = speechSynthesis.getVoices();
            if (this.voices.length > 0) {
                this._selectBestVoices();
                this.ready = true;
            }
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    },

    _selectBestVoices() {
        // Preferred US voices (in order of preference)
        const usPreferred = ['Samantha', 'Alex', 'Google US English', 'Microsoft Zira', 'Microsoft David'];
        // Preferred UK voices
        const ukPreferred = ['Daniel', 'Kate', 'Google UK English', 'Microsoft Hazel', 'Microsoft George'];

        // Find US voice
        this.usVoice = this._findVoice(usPreferred, 'en-US') ||
                       this._findVoice(usPreferred, 'en_US') ||
                       this.voices.find(v => v.lang && (v.lang.startsWith('en-US') || v.lang.startsWith('en_US'))) ||
                       this.voices.find(v => v.lang && v.lang.startsWith('en'));

        // Find UK voice
        this.ukVoice = this._findVoice(ukPreferred, 'en-GB') ||
                       this._findVoice(ukPreferred, 'en_GB') ||
                       this.voices.find(v => v.lang && (v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB'))) ||
                       this.usVoice; // Fallback to US voice
    },

    _findVoice(preferredNames, langPrefix) {
        for (const name of preferredNames) {
            const v = this.voices.find(voice =>
                voice.name.includes(name) && voice.lang && voice.lang.replace('_', '-').startsWith(langPrefix.replace('_', '-'))
            );
            if (v) return v;
        }
        return null;
    },

    /**
     * Speak text with specified accent
     * @param {string} text - Text to speak
     * @param {'us'|'uk'} accent - Accent to use (default: 'us')
     * @param {number} rate - Speech rate 0.5-2.0 (default: 0.9 for clarity)
     */
    speak(text, accent = 'us', rate = 0.9) {
        if (!this.ready && !('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Set voice based on accent
        const voice = accent === 'uk' ? this.ukVoice : this.usVoice;
        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
        } else {
            utterance.lang = accent === 'uk' ? 'en-GB' : 'en-US';
        }

        speechSynthesis.speak(utterance);
        return utterance;
    },

    /**
     * Speak a word slowly for pronunciation practice
     */
    speakWord(word, accent = 'us') {
        return this.speak(word, accent, 0.7);
    },

    /**
     * Speak an example sentence at normal pace
     */
    speakSentence(sentence, accent = 'us') {
        return this.speak(sentence, accent, 0.9);
    },

    /**
     * Speak text in both accents for comparison
     */
    speakBothAccents(text, delay = 1500) {
        this.speak(text, 'us', 0.75);

        // Queue UK version after delay
        setTimeout(() => {
            this.speak(text, 'uk', 0.75);
        }, delay);
    },

    /**
     * Stop any current speech
     */
    stop() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    },

    /**
     * Check if TTS is available
     */
    isAvailable() {
        return 'speechSynthesis' in window;
    },

    /**
     * Get list of available English voices for debugging
     */
    getEnglishVoices() {
        return this.voices.filter(v => v.lang && v.lang.startsWith('en'));
    }
};
