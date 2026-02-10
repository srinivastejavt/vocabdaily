// VocabDaily — Dictionary API client with fallback to built-in word list

window.DictionaryAPI = {
    API_BASE: 'https://api.dictionaryapi.dev/api/v2/entries/en/',

    async lookup(word) {
        try {
            const response = await fetch(this.API_BASE + encodeURIComponent(word));
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            const normalized = this._normalizeApiResponse(data[0]);
            // Merge built-in context if available
            const builtIn = this._findInBuiltIn(word);
            if (builtIn && builtIn.context) {
                normalized.context = builtIn.context;
            }
            return normalized;
        } catch {
            const builtIn = this._findInBuiltIn(word);
            if (builtIn) return { ...builtIn, audioUrl: null };
            throw new Error(`Word "${word}" not found`);
        }
    },

    async getWordsOfTheDay(date = new Date(), count = 5) {
        const dateStr = date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0');

        const indices = this._getDailyIndices(dateStr, count);
        const words = indices.map(i => WORD_LIST[i]);

        // Try to enrich each word with API data (in parallel, with fallback)
        const results = await Promise.all(
            words.map(async (baseWord) => {
                try {
                    const apiData = await this.lookup(baseWord.word);
                    apiData.context = apiData.context || baseWord.context;
                    return apiData;
                } catch {
                    return { ...baseWord, audioUrl: null };
                }
            })
        );

        return results;
    },

    async getRandomWord() {
        const index = Math.floor(Math.random() * WORD_LIST.length);
        const baseWord = WORD_LIST[index];
        try {
            const apiData = await this.lookup(baseWord.word);
            apiData.context = apiData.context || baseWord.context;
            return apiData;
        } catch {
            return { ...baseWord, audioUrl: null };
        }
    },

    _getDailyIndices(dateStr, count) {
        const indices = [];
        const totalWords = WORD_LIST.length;

        for (let i = 0; i < count; i++) {
            const seed = dateStr + ':' + i;
            let hash = 0;
            for (let j = 0; j < seed.length; j++) {
                const char = seed.charCodeAt(j);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            let idx = Math.abs(hash) % totalWords;
            // Avoid duplicates
            while (indices.includes(idx)) {
                idx = (idx + 1) % totalWords;
            }
            indices.push(idx);
        }
        return indices;
    },

    _normalizeApiResponse(apiEntry) {
        let audioUrl = null;
        if (apiEntry.phonetics) {
            const audioEntry = apiEntry.phonetics.find(p => p.audio && p.audio.length > 0);
            if (audioEntry) audioUrl = audioEntry.audio;
        }

        const meanings = (apiEntry.meanings || []).map(m => ({
            partOfSpeech: m.partOfSpeech,
            definitions: (m.definitions || []).slice(0, 3).map(d => ({
                definition: d.definition,
                example: d.example || null
            })),
            synonyms: [...new Set([
                ...(m.synonyms || []),
                ...(m.definitions || []).flatMap(d => d.synonyms || [])
            ])].slice(0, 5),
            antonyms: [...new Set([
                ...(m.antonyms || []),
                ...(m.definitions || []).flatMap(d => d.antonyms || [])
            ])].slice(0, 5)
        }));

        return {
            word: apiEntry.word,
            phonetic: apiEntry.phonetic || (apiEntry.phonetics && apiEntry.phonetics[0] && apiEntry.phonetics[0].text) || null,
            audioUrl,
            meanings,
            context: null,
            sourceUrls: apiEntry.sourceUrls || []
        };
    },

    _findInBuiltIn(word) {
        return WORD_LIST.find(w => w.word.toLowerCase() === word.toLowerCase()) || null;
    }
};
