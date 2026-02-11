// VocabDaily — Data Export/Import & Custom Word Lists
window.DataManager = {
    CUSTOM_KEY: 'vocabDaily_customWords',

    // === Export/Import ===
    exportAll() {
        const data = { version: 2, exportDate: new Date().toISOString(), app: 'VocabDaily' };
        const keys = Object.keys(localStorage).filter(k => k.startsWith('vocabDaily_'));
        keys.forEach(k => { try { data[k] = JSON.parse(localStorage.getItem(k)); } catch { data[k] = localStorage.getItem(k); } });
        return data;
    },

    downloadExport() {
        const data = this.exportAll();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const today = new Date().toISOString().split('T')[0];
        a.href = url; a.download = `vocabdaily-backup-${today}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    getImportSummary(jsonData) {
        if (!jsonData || jsonData.app !== 'VocabDaily') return null;
        const counts = {};
        if (jsonData.vocabDaily_learned) counts.learnedWords = jsonData.vocabDaily_learned.length;
        if (jsonData.vocabDaily_bookmarks) counts.bookmarks = jsonData.vocabDaily_bookmarks.length;
        if (jsonData.vocabDaily_history) counts.historyDays = jsonData.vocabDaily_history.length;
        if (jsonData.vocabDaily_quizStats) counts.quizzes = jsonData.vocabDaily_quizStats.totalQuizzes;
        if (jsonData.vocabDaily_customWords) counts.customWords = jsonData.vocabDaily_customWords.length;
        if (jsonData.vocabDaily_achievements) counts.achievements = Object.keys(jsonData.vocabDaily_achievements).length;
        if (jsonData.vocabDaily_srs) counts.srsWords = Object.keys(jsonData.vocabDaily_srs).length;
        return counts;
    },

    importAll(jsonData) {
        if (!jsonData || jsonData.app !== 'VocabDaily') return { success: false, message: 'Invalid backup file' };
        let count = 0;
        Object.entries(jsonData).forEach(([key, value]) => {
            if (key.startsWith('vocabDaily_') && value != null) {
                try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); count++; } catch {}
            }
        });
        return { success: true, message: `Imported ${count} data categories successfully!` };
    },

    resetAll() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('vocabDaily_'));
        keys.forEach(k => localStorage.removeItem(k));
        return keys.length;
    },

    getStorageUsage() {
        let used = 0;
        Object.keys(localStorage).filter(k => k.startsWith('vocabDaily_')).forEach(k => {
            used += (localStorage.getItem(k) || '').length;
        });
        return { used, usedKB: Math.round(used / 1024), maxKB: 5120, percentage: Math.round((used / (5 * 1024 * 1024)) * 100) };
    },

    // === Custom Word Lists ===
    getCustomWords() { try { return JSON.parse(localStorage.getItem(this.CUSTOM_KEY)) || []; } catch { return []; } },
    _saveCustom(words) { try { localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(words)); } catch {} },

    addCustomWord(wordObj) {
        const words = this.getCustomWords();
        if (words.some(w => w.word.toLowerCase() === wordObj.word.toLowerCase())) return false;
        words.push({
            word: wordObj.word, meaning: wordObj.meaning || '', example: wordObj.example || '',
            addedDate: new Date().toISOString().split('T')[0],
            meanings: [{ partOfSpeech: wordObj.pos || 'noun', definitions: [{ definition: wordObj.meaning, example: wordObj.example || null }], synonyms: [], antonyms: [] }],
            context: wordObj.context || 'Custom word added by user.'
        });
        this._saveCustom(words);
        return true;
    },

    removeCustomWord(word) {
        const words = this.getCustomWords().filter(w => w.word !== word);
        this._saveCustom(words);
    },

    renderSettingsUI(container) {
        const usage = this.getStorageUsage();
        container.innerHTML = `
            <div class="settings-section">
                <h3>📊 Storage</h3>
                <div class="storage-bar"><div class="storage-fill" style="width:${Math.min(100,usage.percentage)}%"></div></div>
                <p class="section-desc">${usage.usedKB} KB / ${usage.maxKB} KB used (${usage.percentage}%)</p>
            </div>
            <div class="settings-section">
                <h3>💾 Backup & Restore</h3>
                <div class="settings-actions">
                    <button class="btn-sm" id="dm-export">📥 Download Backup</button>
                    <label class="btn-sm" id="dm-import-label" style="cursor:pointer">📤 Import Backup<input type="file" id="dm-import" accept=".json" style="display:none"></label>
                </div>
                <div id="dm-import-status"></div>
            </div>
            <div class="settings-section">
                <h3>➕ Add Custom Word</h3>
                <div class="custom-word-form">
                    <input type="text" id="cw-word" placeholder="Word" class="form-input">
                    <input type="text" id="cw-meaning" placeholder="Meaning/Definition" class="form-input">
                    <input type="text" id="cw-example" placeholder="Example sentence (optional)" class="form-input">
                    <button class="btn-sm" id="cw-add" style="background:var(--accent);color:white;">Add Word</button>
                </div>
                <div id="cw-list"></div>
            </div>
            <div class="settings-section">
                <h3>⚠️ Danger Zone</h3>
                <button class="btn-sm" id="dm-reset" style="border-color:var(--error);color:var(--error);">Reset All Data</button>
            </div>`;

        // Export
        container.querySelector('#dm-export').addEventListener('click', () => this.downloadExport());

        // Import
        container.querySelector('#dm-import').addEventListener('change', (e) => {
            const file = e.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const jsonData = JSON.parse(ev.target.result);
                    const summary = this.getImportSummary(jsonData);
                    if (!summary) { container.querySelector('#dm-import-status').innerHTML = '<p style="color:var(--error)">Invalid file!</p>'; return; }
                    const result = this.importAll(jsonData);
                    container.querySelector('#dm-import-status').innerHTML = `<p style="color:var(--success)">${result.message}</p>`;
                } catch { container.querySelector('#dm-import-status').innerHTML = '<p style="color:var(--error)">Failed to parse file.</p>'; }
            };
            reader.readAsText(file);
        });

        // Custom word
        container.querySelector('#cw-add').addEventListener('click', () => {
            const word = container.querySelector('#cw-word').value.trim();
            const meaning = container.querySelector('#cw-meaning').value.trim();
            const example = container.querySelector('#cw-example').value.trim();
            if (!word || !meaning) return;
            this.addCustomWord({ word, meaning, example });
            container.querySelector('#cw-word').value = '';
            container.querySelector('#cw-meaning').value = '';
            container.querySelector('#cw-example').value = '';
            this._renderCustomList(container.querySelector('#cw-list'));
        });

        // Reset
        container.querySelector('#dm-reset').addEventListener('click', () => {
            if (confirm('Are you sure? This will delete ALL your progress, streaks, and data. This cannot be undone!')) {
                this.resetAll();
                location.reload();
            }
        });

        this._renderCustomList(container.querySelector('#cw-list'));
    },

    _renderCustomList(el) {
        const words = this.getCustomWords();
        if (words.length === 0) { el.innerHTML = '<p class="section-desc" style="margin-top:8px">No custom words yet.</p>'; return; }
        el.innerHTML = '<div class="custom-word-list">' + words.map(w => `
            <div class="word-list-item"><div class="word-list-item-info"><span class="word-list-item-word">${w.word}</span>
            <div class="word-list-item-def">${w.meaning}</div></div>
            <button class="btn-remove" data-word="${w.word}" title="Remove">&times;</button></div>`).join('') + '</div>';
        el.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => { this.removeCustomWord(btn.getAttribute('data-word')); this._renderCustomList(el); });
        });
    }
};
