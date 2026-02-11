// VocabDaily — Dictionary API client with fallback to built-in word list

window.DictionaryAPI = {
    API_BASE: 'https://api.dictionaryapi.dev/api/v2/entries/en/',

    // Extended word pool — just word strings; the API provides full definitions
    EXTRA_WORDS: [
        "abandon","abbreviate","abolish","absurd","accelerate","accommodate","accumulate","acquaint","adequate","adjacent",
        "admonish","adversary","advocate","affinity","aggravate","agile","alchemy","allegory","aloof","altruistic",
        "amalgamate","ambivalent","amiable","analogous","anarchy","antagonist","anticipate","apathy","appease","arbitrary",
        "archaic","arduous","articulate","ascertain","aspire","assertive","astute","atrocity","augment","auspicious",
        "austere","autonomous","aversion","banal","belligerent","benign","berate","bewilder","blasphemy","blatant",
        "boisterous","brevity","bureaucracy","calamity","calibrate","callous","capitulate","catalyst","censor","chronicle",
        "circumvent","clandestine","coalesce","coerce","coherent","collaborate","collateral","commemorate","complacent","comply",
        "comprehensive","conceive","condemn","condone","confiscate","congregate","conjecture","conscientious","consensus","consolidate",
        "conspicuous","constitute","constrain","contend","contentious","contradict","conventional","converge","convey","copious",
        "correlate","corrode","counterfeit","culminate","curtail","cynical","debacle","debilitate","decadent","decipher",
        "dedicate","defamation","defer","deficit","degrade","delegate","delinquent","denounce","depict","deplete",
        "deplorable","derive","designate","desolate","deteriorate","deviate","devout","diatribe","dichotomy","diffuse",
        "digress","dilapidated","discern","disclose","discourse","discrepancy","discretion","disdain","disenchanted","disparity",
        "disseminate","dissolve","diverge","doctrine","doleful","dormant","dubious","dwindle","eccentric","edifice",
        "efficacy","elicit","elude","emancipate","embark","embellish","eminent","emit","empirical","encompass",
        "endorse","engender","enigma","enmity","ensemble","enterprise","enumerate","envision","erode","erratic",
        "escalate","espionage","estrange","ethereal","evade","evoke","exasperate","excerpt","exemplify","exempt",
        "exhilarate","exile","expedite","exploit","exponential","exquisite","extravagant","exuberant","fabricate","facet",
        "fallacy","fanatical","fastidious","fathom","fervent","fiasco","fidelity","figurative","finite","flagrant",
        "fluctuate","forbid","formidable","fortify","foster","frivolous","fundamental","futility","galvanize","garner",
        "gauge","grandiose","gratify","gratuitous","grieve","grueling","habitat","hamper","haphazard","harrowing",
        "haughty","hegemony","heresy","hierarchy","homogeneous","hospitable","hostile","humility","hypothetical","idiosyncrasy",
        "illuminate","illustrate","immaculate","immerse","impair","impeccable","impediment","imperative","implausible","implicit",
        "impose","impoverish","improvise","inadvertent","inaugurate","incentive","incite","inclination","inconspicuous","incorporate",
        "increment","indifferent","indigenous","indignant","indispensable","induce","inert","inevitable","infamous","infer",
        "infiltrate","influx","ingenious","inhibit","innate","innocuous","insatiable","insidious","insinuate","instigate",
        "integrate","integrity","intermittent","intimidate","intricate","intrinsic","inundate","invoke","irrational","irrelevant",
        "irreversible","isolate","jeopardize","jubilant","jurisdiction","justify","keen","laborious","lament","latent",
        "legitimate","lenient","lethal","liable","liberate","linger","literacy","livelihood","loathe","lofty",
        "magnify","malicious","mandate","manifest","manipulate","mediocre","melancholy","meager","menace","mercenary",
        "merit","methodical","militant","minuscule","misconception","misnomer","moderate","monopolize","morale","morbid",
        "moratorium","naive","negate","negligible","nomadic","nominal","nonchalance","notorious","nurture","oblivious",
        "obscure","obstinate","ominous","opaque","optimistic","orchestrate","ornate","orthodox","oscillate","ostracize",
        "overwhelm","pacify","painstaking","palpable","paradox","paralyze","partisan","passive","peculiar","penetrate",
        "perceive","perilous","peripheral","perpetuate","perplexing","pessimistic","phenomenon","piety","pinnacle","placate",
        "plethora","ponder","potent","pragmatic","precede","precipitate","predominant","preliminary","premise","prestigious",
        "presume","prevail","pristine","procrastinate","prodigious","profound","prohibit","proliferate","prominent","propagate",
        "propensity","prosperity","prototype","provoke","prudent","pursue","quaint","qualitative","quantify","quarantine",
        "querulous","radicalize","ramification","ratify","rebuke","recede","reckless","reconcile","rectify","refurbish",
        "refute","rehabilitate","reign","reiterate","relentless","relinquish","reluctant","remedy","reminisce","remnant",
        "renaissance","renounce","repeal","replenish","reprehensible","reproduce","repudiate","requisite","resemble","resent",
        "residual","resilient","resolve","restitution","restrain","resurgence","retain","retaliate","retract","retrieve",
        "retrograde","revelation","revenue","reverence","revitalize","rhetoric","rigorous","robust","rudimentary","ruthless",
        "sabotage","safeguard","sanction","saturate","savvy","scarcity","segregate","semblance","sentiment","simultaneously",
        "skeptical","solemn","solidarity","solitary","sophisticated","sovereignty","speculate","sporadic","squander","stagnation",
        "staunch","stereotype","stimulate","stipulate","subordinate","subsidize","substantiate","subversive","suffice","superficial",
        "supplement","suppress","surmount","surplus","susceptible","sustain","symmetry","synthesis","taboo","tactful",
        "tangent","tedious","tentative","terminate","testimony","threshold","tolerance","trajectory","transcend","transgression",
        "transient","transparent","traumatic","tumultuous","turbulent","tyranny","ubiquitous","ulterior","unambiguous","undermine",
        "unilateral","unprecedented","unscrupulous","uphold","utilitarian","validate","vanquish","variable","vehement","venerable",
        "venture","verify","viable","vigilant","vindictive","virtuoso","vocation","volatile","voluminous","vulnerable",
        "warrant","whimsical","wield","withstand","yearn","zenith",
        // Batch 2 — Common & Intermediate
        "abide","abnormal","abolition","abound","abrasive","abrupt","absolve","abstain","abstract","abundance",
        "abyss","acclaim","accord","accountable","accrue","acme","acquiesce","acrid","acute","adamant",
        "adept","adhere","adjourn","adorn","adrift","advent","affable","afflict","affluent","aftermath",
        "aggression","agitate","agonize","ajar","akin","alcove","allegiance","alleviation","allot","allure",
        "altercation","amateur","ambiance","ample","anew","annex","annihilate","annotate","anomaly","anthem",
        "antidote","apex","apparel","apprehend","apprentice","apt","arable","arcade","ardent","arid",
        "armistice","array","arson","ascend","aspiration","assail","assemble","assert","assess","asset",
        "assign","assimilate","astonish","astray","asylum","atone","attest","audacious","audit","augmentation",
        "aura","avail","avalanche","avid","axiom","babble","backdrop","backlash","badge","baffle",
        "bait","ballad","balm","bamboozle","banish","bargain","barrage","barren","bastion","beacon",
        "beguile","behold","benchmark","bestow","betray","bevy","bias","bicker","bizarre","blaze",
        "blemish","blend","blight","bliss","blockade","bloom","blunder","blur","boast","bold",
        "bolster","bombard","bonanza","bondage","boon","boost","botch","bounty","brandish","brash",
        "brazen","breach","breakthrough","breed","brew","bribe","brink","bristle","brittle","brood",
        "browse","brunt","buckle","buffer","bulk","bully","bumble","buoyant","burden","burgeon",
        "burnish","bustle","bypass","cache","cadence","cajole","calculated","caliber","camouflage","candor",
        "canopy","capable","captivate","cardinal","careen","cascade","casualty","catastrophe","cease","celestial",
        "censure","chaotic","characterize","charisma","charitable","cherish","chronic","circa","cite","civic",
        "clad","clamor","clarity","clash","clause","cleanse","clemency","cliche","climax","cling",
        "cloak","cluster","coax","codify","coexist","cognition","coincide","collaborate","collide","colonize",
        "colossal","combat","commence","commend","commerce","commission","commit","commodity","communal","compact",
        "companion","compel","compensate","competent","compile","complement","complexity","compliant","component","compose",
        "compound","comprise","compulsory","conceal","concede","concept","conclude","concurrent","condemn","condense",
        "conduct","confer","confide","confine","confirm","conflict","conform","confront","confuse","congregate",
        "conquer","conscience","consecutive","consent","conserve","consist","console","conspire","constant","construct",
        "consult","consume","contagious","contain","contempt","contend","contest","context","contiguous","contingent",
        "contract","contribute","controversy","convene","convention","converse","convert","convict","cooperate","coordinate",
        "cope","copyright","core","corporate","correspond","corroborate","corrupt","cosmic","counsel","counterpart",
        "countless","courage","courteous","covenant","covet","craft","craze","credentials","creed","crisis",
        "criterion","critique","crucial","crude","crusade","cultivate","cumulative","cunning","curb","curiosity",
        "currency","custody","customary","cycle","cynicism","daft","daring","dawn","dazzle","deadline",
        "deadly","debris","debut","decay","deceive","decent","decisive","declare","decline","decode",
        "decorate","decree","deem","default","defect","defend","defiance","deficient","define","deflect",
        "defy","degenerate","delicate","deliver","deluge","delusion","demand","demolish","demonstrate","demote",
        "dense","deny","depart","depend","deprive","derelict","descent","designate","desire","despair",
        "desperate","despise","destiny","destruction","detach","detect","determine","devastate","devote","diagnose",
        "dilemma","dimension","diminutive","diplomacy","dire","disable","disadvantage","disapprove","discard","discipline",
        "disconnect","discontinue","discord","discount","discover","discrete","discriminate","disdainful","disguise","dishearten",
        "dismantle","dismiss","disorder","dispatch","dispel","dispense","display","dispose","dispute","disregard",
        "disrupt","dissent","dissolute","distinct","distinguish","distort","distract","distribute","disturb","diverse",
        "divine","dizzy","docile","document","domestic","dominate","doom","dormancy","dosage","double",
        "downfall","draft","drain","dramatic","drastic","drawback","dread","drench","drift","drought",
        "dubious","duel","dull","durable","duration","dust","duty","dynamic","eager","earn",
        "ebb","eclipse","ecology","edge","educate","eerie","effective","efficient","ego","elaborate",
        "elapse","elegant","elevate","eliminate","elite","eloquence","embody","embrace","emerge","emigrate",
        "emission","emotion","emphasize","empower","enable","enchant","encounter","endanger","endeavor","endorse",
        "endurance","enforce","engage","enhance","enlighten","enormous","enrich","enroll","ensure","entail",
        "enthusiasm","entire","entitle","entity","entrepreneur","epidemic","equip","equivalent","erase","erode",
        "error","erupt","essence","establish","estate","esteem","eternal","ethical","evaluate","eventual",
        "evidence","evident","evil","evolve","exact","exaggerate","examine","exceed","excel","exceptional",
        "excessive","exchange","exclaim","exclude","execute","exemplify","exhaust","exhibit","expand","expect",
        "expense","experiment","expertise","explicit","explosive","expose","extend","extensive","external","extinct",
        "extract","extreme","fable","fabric","facilitate","faction","faculty","fade","faint","faith",
        "famine","fancy","fantasy","fascinate","fashion","fate","fatigue","fault","favorable","feast",
        "feat","feature","feeble","feign","fellow","ferocious","fertile","festive","feud","fiction",
        "fierce","filament","filter","final","finance","flaw","flee","fleet","flexible","flicker",
        "flinch","flock","flourish","fluid","flush","focal","fold","folk","fond","forbearance",
        "forecast","forge","forgive","format","formula","fortitude","fortune","fossil","foundation","fraction",
        "fragile","fragment","framework","franchise","frank","fraud","freight","frenzy","friction","frontier",
        "fruitful","frustrate","fulfill","function","fury","futility","gain","gamble","garment","garrison",
        "gasp","gender","generate","generous","genius","gentle","gesture","glare","gleam","glimpse",
        "global","gloom","glorify","glossary","glow","glue","gorge","govern","grace","gradient",
        "gradual","graft","grand","grant","grasp","grateful","gravity","greed","grim","grind",
        "grip","gross","grove","growth","grudge","guarantee","guardian","guise","gullible","habitual",
        "hallmark","halt","handcraft","handicap","handle","harbor","hardship","hardy","harmony","harness",
        "harsh","harvest","hasten","haven","hazard","headway","heal","heap","hearth","heartfelt",
        "heed","hefty","heritage","heroic","hesitate","highlight","hinge","historic","hoard","hollow",
        "homage","honorable","horizon","horrify","hospice","hover","hub","humble","humid","hunger",
        "hurdle","hustle","hybrid","hypocrite","hypothesis","ideal","identity","idle","ignite","illicit",
        "illusion","illustrious","imagery","imaginary","immense","immune","impact","impartial","impasse","impatient",
        "impend","implement","implication","import","imposing","impress","imprint","improper","impulse","inability",
        "inaccessible","inaccurate","inactive","inadequate","incapable","incidence","incline","inclusive","income","inconvenient",
        "incredible","incur","indicate","indirect","individual","industrial","inequality","infant","infinite","inflate",
        "influence","inform","infrastructure","infringe","ingredient","inhabit","initial","initiate","inject","inland",
        "innocent","innovate","input","inquire","insane","inscribe","insight","insist","inspect","inspire",
        "install","instance","instant","instinct","institute","instruct","instrument","insult","insure","intact",
        "intellect","intend","intense","intent","interact","intercept","interest","interfere","interior","internal",
        "interpret","intervene","intimate","intrigue","introduce","intrude","invade","invalid","invasion","invest",
        "investigate","invisible","involve","ironic","irrigate","irritate","isolate","issue","itemize","iterate",
        "ivory","jargon","jealous","jest","journey","jovial","judge","junction","junior","justice",
        "juvenile","keen","kernel","keynote","kindle","kinship","knack","kneel","knowledge","label",
        "labor","lack","lag","landmark","landscape","lapse","lateral","latitude","latter","launch",
        "lavish","layer","layout","leadership","league","lean","legacy","legend","legislate","leisure",
        "lesser","lesson","levy","liberal","liberty","license","likelihood","limb","limit","linen",
        "link","liquid","literal","litter","livid","loan","lobby","locale","lodge","logic",
        "longevity","longitude","loophole","lore","loyal","lucid","lull","luminous","lunar","lure",
        "luxury","lyric","magnate","magnificent","magnitude","maiden","mainstream","maintain","majestic","majority",
        "malady","malice","manage","mandatory","maneuver","manifest","manipulate","manner","manuscript","margin",
        "maritime","marvel","massive","master","material","mature","maximize","meadow","meandering","measure",
        "mechanism","mediate","medium","mellow","memoir","memorial","menace","mentor","merchant","mercy",
        "mere","merge","metaphor","method","migrate","milestone","mimic","mingle","miniature","minimal",
        "minister","minority","miracle","mischief","misery","mislead","mission","mobility","mock","moderate",
        "modest","modify","momentum","monarch","monitor","monopoly","monotone","monument","mood","moral",
        "moreover","mortgage","motive","mount","mourn","muddle","multiple","municipal","muster","mutual",
        "myriad","mystery","myth","naive","narrate","narrow","native","navigate","necessary","neglect",
        "negotiate","nerve","neutral","nevertheless","niche","noble","nocturnal","norm","notable","notify",
        "notion","novel","novice","nucleus","nullify","numerous","oath","obedient","object","obligate",
        "oblige","obscene","observe","obsess","obstacle","obtain","occasion","occupy","occur","offend",
        "offset","offspring","omit","onset","opacity","operate","opinion","opponent","opportunity","oppose",
        "oppress","option","orbit","ordeal","ordinary","organic","orient","origin","ornament","outburst",
        "outcome","outdoor","outlaw","outline","output","outrage","outreach","outset","outstanding","overall",
        "overcome","overflow","overlap","overlook","oversee","overturn","overview","owe","pace","pact",
        "panic","panorama","paradoxical","parallel","parasite","parcel","pardon","parlor","partial","passion",
        "patent","patience","patriot","patrol","patron","pause","pave","peak","peculiar","penalty",
        "pending","pension","perceive","perfect","peril","permanent","permit","persist","personal","perspective",
        "persuade","petition","phase","philosophy","physical","pierce","pilgrim","pilot","pioneer","pitch",
        "pivot","plague","plain","platform","plea","pledge","plot","ploy","plunge","plural",
        "poignant","poison","polarize","policy","polish","politics","pollute","ponder","popular","portrait",
        "pose","possess","posterior","postpone","potency","potential","poverty","practical","praise","preach",
        "precaution","precise","predicament","predict","predominate","prefer","prejudice","premature","premium","prepare",
        "presence","preserve","preside","pressure","pretend","prevailing","prevent","previous","pride","primary",
        "primitive","principal","principle","prior","priority","prison","private","privilege","probable","probe",
        "proceed","proclaim","produce","profess","profile","profound","program","progress","project","prolong",
        "prominent","promise","promote","prompt","prone","pronounce","proof","propel","proper","proportion",
        "propose","prospect","protect","protest","proud","provide","province","proviso","proximity","public",
        "punctual","punish","purchase","purge","purpose","puzzle","qualify","quarrel","quest","quota",
        "radical","rage","rally","random","range","rank","rapid","rare","rash","ratio",
        "raw","realm","reap","reason","rebel","rebuild","recall","recapture","recede","receipt",
        "recognize","recommend","reconcile","reconsider","record","recover","recruit","reduce","referee","reflect",
        "reform","refuge","refuse","regain","regard","regime","region","register","regret","regular",
        "regulate","rehearse","reinforce","reject","relate","release","relevant","relief","relish","relocate",
        "remain","remark","remedy","remind","remote","remove","render","renew","renovate","rent",
        "repair","repeat","replace","replica","represent","reproduce","republic","reputation","request","require",
        "rescue","research","reserve","reside","resign","resist","resource","respond","restore","restrict",
        "result","resume","retail","retire","retreat","reveal","revenge","reverse","revise","revive",
        "revolt","revolution","reward","rhythm","rigid","rigor","ripe","risk","ritual","rival",
        "robust","romance","rotate","rough","route","routine","royal","ruin","rumor","rupture",
        "rural","sacred","sacrifice","sage","salary","salvation","sample","sanctuary","sane","satellite",
        "satisfy","savage","scale","scandal","scarce","scatter","scenario","scene","schedule","scheme",
        "scholar","scope","scorch","scout","scramble","scratch","screen","script","sculpture","seal",
        "search","sector","secure","segment","seize","select","senate","senior","sense","sensitive",
        "separate","sequence","serene","series","serious","serve","session","settle","severe","shadow",
        "shallow","shame","shape","shelter","shield","shift","shock","shore","shortage","shred",
        "shrewd","shrink","shuffle","siege","signal","significant","silence","similar","simplify","simulate",
        "sincere","singular","situate","skeleton","sketch","skill","slander","slaughter","slogan","slope",
        "smolder","smuggle","soar","sober","sole","solicit","solution","solve","somber","source",
        "span","sparse","spatial","spawn","species","specify","spectacle","spectrum","sphere","spine",
        "spiral","spite","splendid","sponsor","sprawl","spread","spur","stable","stake","stale",
        "stance","standard","stark","statute","steady","steep","steer","stem","stern","steward",
        "stifle","stigma","stimulus","stir","stock","storage","strain","strategy","streak","strength",
        "stress","stretch","stride","strike","strip","strive","stroke","structure","struggle","stubborn",
        "studio","stumble","sturdy","subject","submit","subscribe","subsequent","substance","substitute","subtle",
        "suburb","succeed","succumb","sufficient","suggest","suitable","summit","summon","superb","superficial",
        "superior","supervise","supplement","supply","support","supreme","surface","surge","surmise","surpass",
        "surprise","surrender","surround","survey","survive","suspect","suspend","sustain","swallow","sway",
        "sweep","swift","symbol","sympathy","symptom","syndrome","tactic","talent","tangle","target",
        "tariff","temper","temple","temporary","tender","tense","tenure","terminal","terrain","territory",
        "testify","texture","theme","theory","therapy","thesis","thorough","threat","thrill","throne",
        "thrust","tide","timid","tissue","token","tolerate","torment","tour","toxic","trace",
        "tradition","trail","trait","transfer","transform","transition","translate","transmit","trap","trauma",
        "traverse","treasure","treaty","tremendous","trend","trial","tribute","trigger","triumph","tropic",
        "trouble","truce","turmoil","tutor","twilight","twist","typical","ultimate","undergo","undermine",
        "undertake","unfold","uniform","unique","unite","universal","unlock","unveil","upbeat","update",
        "upgrade","upheaval","upright","urban","urgent","usage","utmost","utter","vacant","vague",
        "valid","valley","valor","valuable","vanish","variety","vast","vault","venture","verdict",
        "verify","version","vessel","veteran","veto","vibrant","victim","vigorous","villain","vintage",
        "violate","virtue","vision","visual","vital","vivid","vocal","void","volume","voluntary",
        "vow","voyage","vulnerable","wage","wane","warfare","warrant","warranty","wary","wealth",
        "weapon","weary","weave","wedge","welfare","whereas","widespread","will","wisdom","withdraw",
        "witness","wonder","worship","worthy","wound","wreck","yield","youth","zone","zeal"
    ],

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

        // Combine curated words + extended pool for a massive daily rotation
        const allWords = [...WORD_LIST.map(w => w.word), ...this.EXTRA_WORDS];
        const uniqueWords = [...new Set(allWords)];
        const indices = this._getDailyIndicesFromPool(dateStr, count, uniqueWords.length);
        const selectedWords = indices.map(i => uniqueWords[i]);

        // Try to enrich each word with API data (in parallel, with fallback)
        const results = await Promise.all(
            selectedWords.map(async (wordStr) => {
                const builtIn = this._findInBuiltIn(wordStr);
                try {
                    const apiData = await this.lookup(wordStr);
                    apiData.context = apiData.context || (builtIn && builtIn.context) || null;
                    return apiData;
                } catch {
                    if (builtIn) return { ...builtIn, audioUrl: null };
                    // For EXTRA_WORDS with no API and no built-in, return a minimal entry
                    return { word: wordStr, phonetic: null, audioUrl: null, meanings: [{ partOfSpeech: "word", definitions: [{ definition: "Look up this word to learn its meaning!", example: null }], synonyms: [], antonyms: [] }], context: null };
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

    _getDailyIndicesFromPool(dateStr, count, poolSize) {
        const indices = [];
        for (let i = 0; i < count; i++) {
            const seed = dateStr + ':' + i;
            let hash = 0;
            for (let j = 0; j < seed.length; j++) { hash = ((hash << 5) - hash) + seed.charCodeAt(j); hash = hash & hash; }
            let idx = Math.abs(hash) % poolSize;
            while (indices.includes(idx)) { idx = (idx + 1) % poolSize; }
            indices.push(idx);
        }
        return indices;
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
