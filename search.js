// VocabDaily — Global Search across all content
window.Search = {
    search(query) {
        if (!query || query.trim().length < 2) return [];
        const q = query.toLowerCase().trim();
        const results = [];

        // Search WORD_LIST
        if (typeof WORD_LIST !== 'undefined') {
            WORD_LIST.forEach(w => {
                const wordMatch = w.word.toLowerCase();
                if (wordMatch === q) results.push({ type: 'word', data: w, matchField: 'word', relevance: 3 });
                else if (wordMatch.startsWith(q)) results.push({ type: 'word', data: w, matchField: 'word', relevance: 2 });
                else if (wordMatch.includes(q)) results.push({ type: 'word', data: w, matchField: 'word', relevance: 1 });
                else {
                    const defs = (w.meanings||[]).flatMap(m => (m.definitions||[]).map(d => d.definition||'')).join(' ').toLowerCase();
                    if (defs.includes(q)) results.push({ type: 'word', data: w, matchField: 'definition', relevance: 0.5 });
                }
            });
        }

        // Search SLANG_DATA
        if (typeof SLANG_DATA !== 'undefined') {
            [...(SLANG_DATA.usSlang||[]), ...(SLANG_DATA.ukSlang||[])].forEach(s => {
                const wm = s.word.toLowerCase();
                if (wm === q) results.push({ type: 'slang', data: s, matchField: 'word', relevance: 3 });
                else if (wm.includes(q) || s.meaning.toLowerCase().includes(q)) results.push({ type: 'slang', data: s, matchField: 'meaning', relevance: 1 });
            });
        }

        // Search IDIOMS_DATA
        if (typeof IDIOMS_DATA !== 'undefined') {
            (IDIOMS_DATA.idioms||[]).forEach(i => {
                if (i.phrase.toLowerCase().includes(q) || i.meaning.toLowerCase().includes(q))
                    results.push({ type: 'idiom', data: i, matchField: 'phrase', relevance: i.phrase.toLowerCase().includes(q) ? 2 : 1 });
            });
            (IDIOMS_DATA.phrasalVerbs||[]).forEach(p => {
                if (p.verb.toLowerCase().includes(q) || p.meaning.toLowerCase().includes(q))
                    results.push({ type: 'phrasal', data: p, matchField: 'verb', relevance: p.verb.toLowerCase().includes(q) ? 2 : 1 });
            });
            (IDIOMS_DATA.collocations||[]).forEach(c => {
                if (c.words.toLowerCase().includes(q) || c.meaning.toLowerCase().includes(q))
                    results.push({ type: 'collocation', data: c, matchField: 'words', relevance: 1 });
            });
        }

        return results.sort((a, b) => b.relevance - a.relevance).slice(0, 20);
    },

    renderSearchModal(query) {
        this.closeSearch();
        const results = this.search(query);
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.id = 'search-overlay';

        let html = `<div class="search-modal"><div class="search-modal-header">
            <input type="text" class="search-input" id="search-input" value="${query.replace(/"/g,'&quot;')}" placeholder="Search words, slang, idioms..." autofocus>
            <button class="modal-close" id="search-close">&times;</button></div><div class="search-results" id="search-results">`;

        if (results.length === 0) {
            html += `<div class="empty-state"><p>No results for "${query}"</p></div>`;
        } else {
            const types = { word: '📖 Words', slang: '🗣️ Slang', idiom: '💬 Idioms', phrasal: '🔗 Phrasal Verbs', collocation: '🧩 Collocations' };
            const grouped = {};
            results.forEach(r => { if (!grouped[r.type]) grouped[r.type] = []; grouped[r.type].push(r); });
            Object.entries(grouped).forEach(([type, items]) => {
                html += `<div class="search-group"><h4>${types[type]||type}</h4>`;
                items.forEach(r => {
                    if (type === 'word') {
                        const def = r.data.meanings?.[0]?.definitions?.[0]?.definition || '';
                        html += `<div class="search-item" data-type="word" data-word="${r.data.word}"><span class="search-item-word">${r.data.word}</span><span class="search-item-def">${def}</span></div>`;
                    } else if (type === 'slang') {
                        html += `<div class="search-item"><span class="search-item-word">${r.data.word}</span><span class="search-item-def">${r.data.meaning}</span></div>`;
                    } else if (type === 'idiom') {
                        html += `<div class="search-item"><span class="search-item-word">${r.data.phrase}</span><span class="search-item-def">${r.data.meaning}</span></div>`;
                    } else if (type === 'phrasal') {
                        html += `<div class="search-item"><span class="search-item-word">${r.data.verb}</span><span class="search-item-def">${r.data.meaning}</span></div>`;
                    } else {
                        html += `<div class="search-item"><span class="search-item-word">${r.data.words}</span><span class="search-item-def">${r.data.meaning}</span></div>`;
                    }
                });
                html += '</div>';
            });
        }
        html += '</div></div>';
        overlay.innerHTML = html;
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('show'));

        overlay.querySelector('#search-close').addEventListener('click', () => this.closeSearch());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeSearch(); });

        const input = overlay.querySelector('#search-input');
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                const newResults = this.search(input.value);
                // Re-render results inline
                this.closeSearch();
                if (input.value.trim().length >= 2) this.renderSearchModal(input.value);
            }, 300);
        });

        // Word click opens modal
        overlay.querySelectorAll('.search-item[data-type="word"]').forEach(item => {
            item.addEventListener('click', () => {
                const word = item.getAttribute('data-word');
                const wordData = WORD_LIST.find(w => w.word === word);
                if (wordData && typeof App !== 'undefined') { this.closeSearch(); App.showWordModal(wordData); }
            });
        });
    },

    closeSearch() {
        const el = document.getElementById('search-overlay');
        if (el) { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }
    }
};
