// VocabDaily — Accent Tutor: Duolingo-style US & UK Pronunciation Practice
// Uses TTS (tts.js) and VoiceInput (voice-input.js) for speaking exercises

window.AccentTutor = {

    // === STATE ===
    currentDrill: 0,
    currentSentence: 0,
    currentAccent: 'us',
    quizScore: 0,
    quizTotal: 0,
    sessionScores: [],
    _quizRound: [],
    _quizCurrent: 0,
    _quizAnswers: [],

    // =========================================================================
    // PRONUNCIATION DRILLS — 60 items across 6 categories
    // =========================================================================
    drills: [
        // --- Rhotic R (10) ---
        { id: "rr-1", category: "Rhotic R", difficulty: 1, word: "car", usPhonetic: "/kɑːr/", ukPhonetic: "/kɑː/", usTip: "Strong R at the end — 'karr'", ukTip: "Drop the R — say 'cah'", sentence: "I parked the car near the bar." },
        { id: "rr-2", category: "Rhotic R", difficulty: 1, word: "water", usPhonetic: "/ˈwɑːtər/", ukPhonetic: "/ˈwɔːtə/", usTip: "Flapped T + strong R — 'wah-der'", ukTip: "Clear T, no final R — 'waw-tuh'", sentence: "Can I have a glass of water please?" },
        { id: "rr-3", category: "Rhotic R", difficulty: 1, word: "letter", usPhonetic: "/ˈlɛtər/", ukPhonetic: "/ˈlɛtə/", usTip: "Flapped T + final R — 'ledder'", ukTip: "Glottal T, no R — 'le-uh'", sentence: "I wrote a letter to my friend." },
        { id: "rr-4", category: "Rhotic R", difficulty: 1, word: "park", usPhonetic: "/pɑːrk/", ukPhonetic: "/pɑːk/", usTip: "Pronounced R before K — 'parrk'", ukTip: "Long A, silent R — 'pahk'", sentence: "Let's take a walk in the park." },
        { id: "rr-5", category: "Rhotic R", difficulty: 2, word: "far", usPhonetic: "/fɑːr/", ukPhonetic: "/fɑː/", usTip: "Hold the R sound — 'farrr'", ukTip: "Long vowel, no R — 'fah'", sentence: "How far is it from here?" },
        { id: "rr-6", category: "Rhotic R", difficulty: 2, word: "heart", usPhonetic: "/hɑːrt/", ukPhonetic: "/hɑːt/", usTip: "R before T — 'harrt'", ukTip: "No R — 'haht'", sentence: "She has a kind heart." },
        { id: "rr-7", category: "Rhotic R", difficulty: 2, word: "garden", usPhonetic: "/ˈɡɑːrdən/", ukPhonetic: "/ˈɡɑːdən/", usTip: "R in first syllable — 'garr-den'", ukTip: "No R — 'gah-den'", sentence: "The garden looks beautiful today." },
        { id: "rr-8", category: "Rhotic R", difficulty: 3, word: "mirror", usPhonetic: "/ˈmɪrər/", ukPhonetic: "/ˈmɪrə/", usTip: "Both R sounds — 'mirr-er'", ukTip: "Only first R, drop last — 'mi-ruh'", sentence: "Look at yourself in the mirror." },
        { id: "rr-9", category: "Rhotic R", difficulty: 3, word: "particular", usPhonetic: "/pərˈtɪkjələr/", ukPhonetic: "/pəˈtɪkjələ/", usTip: "All R sounds present", ukTip: "Drop the final R", sentence: "Is there a particular reason?" },
        { id: "rr-10", category: "Rhotic R", difficulty: 3, word: "quarter", usPhonetic: "/ˈkwɔːrtər/", ukPhonetic: "/ˈkwɔːtə/", usTip: "Strong R sounds — 'kworr-ter'", ukTip: "No R sounds — 'kwaw-tuh'", sentence: "It's a quarter past three." },

        // --- Flat A vs Broad A (10) ---
        { id: "aa-1", category: "Flat A vs Broad A", difficulty: 1, word: "bath", usPhonetic: "/bæθ/", ukPhonetic: "/bɑːθ/", usTip: "Short A like 'cat' — 'bath'", ukTip: "Long A like 'father' — 'bahth'", sentence: "I'm going to take a bath." },
        { id: "aa-2", category: "Flat A vs Broad A", difficulty: 1, word: "dance", usPhonetic: "/dæns/", ukPhonetic: "/dɑːns/", usTip: "Short A — 'danss'", ukTip: "Long A — 'dahnce'", sentence: "Would you like to dance?" },
        { id: "aa-3", category: "Flat A vs Broad A", difficulty: 1, word: "can't", usPhonetic: "/kænt/", ukPhonetic: "/kɑːnt/", usTip: "Short A — rhymes with 'rant'", ukTip: "Long A — 'kahnt'", sentence: "I can't believe it happened." },
        { id: "aa-4", category: "Flat A vs Broad A", difficulty: 1, word: "glass", usPhonetic: "/ɡlæs/", ukPhonetic: "/ɡlɑːs/", usTip: "Short A like 'gas'", ukTip: "Long A like 'grass' (UK)", sentence: "Could I have a glass of water?" },
        { id: "aa-5", category: "Flat A vs Broad A", difficulty: 2, word: "laugh", usPhonetic: "/læf/", ukPhonetic: "/lɑːf/", usTip: "Short A — 'laff'", ukTip: "Long A — 'lahf'", sentence: "That joke made me laugh." },
        { id: "aa-6", category: "Flat A vs Broad A", difficulty: 2, word: "path", usPhonetic: "/pæθ/", ukPhonetic: "/pɑːθ/", usTip: "Short A like 'math'", ukTip: "Long A — 'pahth'", sentence: "Follow the path through the woods." },
        { id: "aa-7", category: "Flat A vs Broad A", difficulty: 2, word: "ask", usPhonetic: "/æsk/", ukPhonetic: "/ɑːsk/", usTip: "Short A — 'ask'", ukTip: "Long A — 'ahsk'", sentence: "I need to ask you something." },
        { id: "aa-8", category: "Flat A vs Broad A", difficulty: 3, word: "class", usPhonetic: "/klæs/", ukPhonetic: "/klɑːs/", usTip: "Short A like 'mass'", ukTip: "Long A — 'klahs'", sentence: "My class starts at nine." },
        { id: "aa-9", category: "Flat A vs Broad A", difficulty: 3, word: "fast", usPhonetic: "/fæst/", ukPhonetic: "/fɑːst/", usTip: "Short A — 'fast'", ukTip: "Long A — 'fahst'", sentence: "That car is going too fast." },
        { id: "aa-10", category: "Flat A vs Broad A", difficulty: 3, word: "grass", usPhonetic: "/ɡræs/", ukPhonetic: "/ɡrɑːs/", usTip: "Short A like 'mass'", ukTip: "Long A — 'grahs'", sentence: "The grass needs cutting." },

        // --- Flapped T (10) ---
        { id: "ft-1", category: "Flapped T", difficulty: 1, word: "better", usPhonetic: "/ˈbɛɾər/", ukPhonetic: "/ˈbɛtə/", usTip: "T sounds like D — 'bedder'", ukTip: "Clear T sound — 'bet-uh'", sentence: "This one is much better." },
        { id: "ft-2", category: "Flapped T", difficulty: 1, word: "butter", usPhonetic: "/ˈbʌɾər/", ukPhonetic: "/ˈbʌtə/", usTip: "T sounds like D — 'budder'", ukTip: "Clear or glottal T — 'but-uh'", sentence: "Pass the butter please." },
        { id: "ft-3", category: "Flapped T", difficulty: 1, word: "little", usPhonetic: "/ˈlɪɾəl/", ukPhonetic: "/ˈlɪtəl/", usTip: "T sounds like D — 'liddle'", ukTip: "Glottal stop — 'li-ul'", sentence: "Just a little bit more." },
        { id: "ft-4", category: "Flapped T", difficulty: 1, word: "city", usPhonetic: "/ˈsɪɾi/", ukPhonetic: "/ˈsɪti/", usTip: "T sounds like D — 'siddy'", ukTip: "Clear T — 'sit-ee'", sentence: "New York is a big city." },
        { id: "ft-5", category: "Flapped T", difficulty: 2, word: "pretty", usPhonetic: "/ˈprɪɾi/", ukPhonetic: "/ˈprɪti/", usTip: "T sounds like D — 'priddy'", ukTip: "Clear T — 'prit-ee'", sentence: "That's a pretty good idea." },
        { id: "ft-6", category: "Flapped T", difficulty: 2, word: "matter", usPhonetic: "/ˈmæɾər/", ukPhonetic: "/ˈmætə/", usTip: "T sounds like D — 'madder'", ukTip: "Clear T — 'mat-uh'", sentence: "It doesn't matter at all." },
        { id: "ft-7", category: "Flapped T", difficulty: 2, word: "metal", usPhonetic: "/ˈmɛɾəl/", ukPhonetic: "/ˈmɛtəl/", usTip: "T like D — 'meddal'", ukTip: "Clear T — 'met-ul'", sentence: "That gate is made of metal." },
        { id: "ft-8", category: "Flapped T", difficulty: 3, word: "forty", usPhonetic: "/ˈfɔːrɾi/", ukPhonetic: "/ˈfɔːti/", usTip: "T sounds like D — 'fordy'", ukTip: "Clear T — 'faw-tee'", sentence: "She just turned forty." },
        { id: "ft-9", category: "Flapped T", difficulty: 3, word: "photography", usPhonetic: "/fəˈtɑːɡrəfi/", ukPhonetic: "/fəˈtɒɡrəfi/", usTip: "Stress 2nd syllable, flap the T", ukTip: "Rounded O, clear T", sentence: "Photography is my hobby." },
        { id: "ft-10", category: "Flapped T", difficulty: 3, word: "automatic", usPhonetic: "/ˌɔːɾəˈmæɾɪk/", ukPhonetic: "/ˌɔːtəˈmætɪk/", usTip: "Both T's become D — 'aw-duh-madick'", ukTip: "Clear T's — 'aw-tuh-mat-ick'", sentence: "The door is automatic." },

        // --- Glottal Stop (10) ---
        { id: "gs-1", category: "Glottal Stop", difficulty: 1, word: "bottle", usPhonetic: "/ˈbɑːɾəl/", ukPhonetic: "/ˈbɒʔəl/", usTip: "Flapped T — 'boddal'", ukTip: "Glottal stop — 'bo-ul'", sentence: "Open the bottle carefully." },
        { id: "gs-2", category: "Glottal Stop", difficulty: 1, word: "button", usPhonetic: "/ˈbʌɾən/", ukPhonetic: "/ˈbʌʔən/", usTip: "Flapped T — 'budden'", ukTip: "Glottal stop — 'buh-un'", sentence: "Press the button to start." },
        { id: "gs-3", category: "Glottal Stop", difficulty: 1, word: "kitten", usPhonetic: "/ˈkɪɾən/", ukPhonetic: "/ˈkɪʔən/", usTip: "Flapped T — 'kidden'", ukTip: "Glottal stop — 'ki-un'", sentence: "The kitten is so cute." },
        { id: "gs-4", category: "Glottal Stop", difficulty: 1, word: "Britain", usPhonetic: "/ˈbrɪɾən/", ukPhonetic: "/ˈbrɪʔən/", usTip: "Flapped T — 'Briddin'", ukTip: "Glottal stop — 'Bri-un'", sentence: "Great Britain is an island nation." },
        { id: "gs-5", category: "Glottal Stop", difficulty: 2, word: "mountain", usPhonetic: "/ˈmaʊntən/", ukPhonetic: "/ˈmaʊnʔən/", usTip: "Reduced T — 'moun-in'", ukTip: "Glottal stop — 'moun-un'", sentence: "We climbed the mountain yesterday." },
        { id: "gs-6", category: "Glottal Stop", difficulty: 2, word: "curtain", usPhonetic: "/ˈkɜːrtən/", ukPhonetic: "/ˈkɜːʔən/", usTip: "R + soft T — 'curr-tin'", ukTip: "No R + glottal — 'cuh-un'", sentence: "Close the curtain please." },
        { id: "gs-7", category: "Glottal Stop", difficulty: 2, word: "written", usPhonetic: "/ˈrɪɾən/", ukPhonetic: "/ˈrɪʔən/", usTip: "Flapped T — 'ridden'", ukTip: "Glottal — 'ri-un'", sentence: "It was written in pencil." },
        { id: "gs-8", category: "Glottal Stop", difficulty: 3, word: "important", usPhonetic: "/ɪmˈpɔːrtənt/", ukPhonetic: "/ɪmˈpɔːʔənt/", usTip: "R + clear T", ukTip: "No R, glottal T — 'impaw-unt'", sentence: "This meeting is very important." },
        { id: "gs-9", category: "Glottal Stop", difficulty: 3, word: "internet", usPhonetic: "/ˈɪntərˌnɛt/", ukPhonetic: "/ˈɪntəˌnɛʔ/", usTip: "Clear T's, R present", ukTip: "Glottal final T — 'in-tuh-ne'", sentence: "The internet is down again." },
        { id: "gs-10", category: "Glottal Stop", difficulty: 3, word: "football", usPhonetic: "/ˈfʊtˌbɔːl/", ukPhonetic: "/ˈfʊʔbɔːl/", usTip: "Clear T — 'foot-ball'", ukTip: "Glottal T — 'fu-bawl'", sentence: "Do you want to play football?" },

        // --- O Sound (10) ---
        { id: "os-1", category: "O Sound", difficulty: 1, word: "hot", usPhonetic: "/hɑːt/", ukPhonetic: "/hɒt/", usTip: "Open A sound — 'haht'", ukTip: "Short rounded O — 'hot'", sentence: "It's really hot today." },
        { id: "os-2", category: "O Sound", difficulty: 1, word: "lot", usPhonetic: "/lɑːt/", ukPhonetic: "/lɒt/", usTip: "Open A — 'laht'", ukTip: "Rounded O — 'lot'", sentence: "There's a lot to do." },
        { id: "os-3", category: "O Sound", difficulty: 1, word: "dog", usPhonetic: "/dɔːɡ/", ukPhonetic: "/dɒɡ/", usTip: "Long AW sound — 'dawg'", ukTip: "Short rounded O — 'dog'", sentence: "That's a friendly dog." },
        { id: "os-4", category: "O Sound", difficulty: 1, word: "box", usPhonetic: "/bɑːks/", ukPhonetic: "/bɒks/", usTip: "Open A — 'bahks'", ukTip: "Rounded O — 'boks'", sentence: "Put it in the box." },
        { id: "os-5", category: "O Sound", difficulty: 2, word: "body", usPhonetic: "/ˈbɑːdi/", ukPhonetic: "/ˈbɒdi/", usTip: "Open A — 'bah-dee'", ukTip: "Rounded O — 'bod-ee'", sentence: "Listen to your body." },
        { id: "os-6", category: "O Sound", difficulty: 2, word: "top", usPhonetic: "/tɑːp/", ukPhonetic: "/tɒp/", usTip: "Open A — 'tahp'", ukTip: "Rounded O — 'top'", sentence: "It's on the top shelf." },
        { id: "os-7", category: "O Sound", difficulty: 2, word: "clock", usPhonetic: "/klɑːk/", ukPhonetic: "/klɒk/", usTip: "Open A — 'klahk'", ukTip: "Rounded O — 'klok'", sentence: "Check the clock on the wall." },
        { id: "os-8", category: "O Sound", difficulty: 3, word: "possible", usPhonetic: "/ˈpɑːsəbəl/", ukPhonetic: "/ˈpɒsəbəl/", usTip: "Open A — 'pah-sible'", ukTip: "Rounded O — 'pos-ible'", sentence: "Is that even possible?" },
        { id: "os-9", category: "O Sound", difficulty: 3, word: "knowledge", usPhonetic: "/ˈnɑːlɪdʒ/", ukPhonetic: "/ˈnɒlɪdʒ/", usTip: "Open A — 'nah-lidge'", ukTip: "Rounded O — 'nol-idge'", sentence: "Knowledge is power." },
        { id: "os-10", category: "O Sound", difficulty: 3, word: "honestly", usPhonetic: "/ˈɑːnɪstli/", ukPhonetic: "/ˈɒnɪstli/", usTip: "Open A — 'ah-nistly'", ukTip: "Rounded O — 'on-istly'", sentence: "Honestly, I don't know." },

        // --- Vowel Shifts / Key Differences (10) ---
        { id: "vs-1", category: "Vowel Shifts", difficulty: 1, word: "tomato", usPhonetic: "/təˈmeɪtoʊ/", ukPhonetic: "/təˈmɑːtəʊ/", usTip: "MAY-toe — 'tuh-may-toe'", ukTip: "MAH-toe — 'tuh-mah-toe'", sentence: "Pass me that tomato please." },
        { id: "vs-2", category: "Vowel Shifts", difficulty: 1, word: "schedule", usPhonetic: "/ˈskɛdʒuːl/", ukPhonetic: "/ˈʃɛdjuːl/", usTip: "SK at start — 'SKED-jool'", ukTip: "SH at start — 'SHED-yool'", sentence: "What's your schedule this week?" },
        { id: "vs-3", category: "Vowel Shifts", difficulty: 1, word: "herb", usPhonetic: "/ɜːrb/", ukPhonetic: "/hɜːb/", usTip: "Silent H — 'erb'", ukTip: "Pronounce the H — 'herb'", sentence: "Add a fresh herb to the dish." },
        { id: "vs-4", category: "Vowel Shifts", difficulty: 1, word: "garage", usPhonetic: "/ɡəˈrɑːʒ/", ukPhonetic: "/ˈɡærɪdʒ/", usTip: "Stress on 2nd syllable — 'guh-RAZH'", ukTip: "Stress on 1st — 'GA-ridge'", sentence: "Park the car in the garage." },
        { id: "vs-5", category: "Vowel Shifts", difficulty: 2, word: "advertisement", usPhonetic: "/ˌædvərˈtaɪzmənt/", ukPhonetic: "/ədˈvɜːtɪsmənt/", usTip: "ad-ver-TIZE-ment", ukTip: "ad-VER-tis-ment", sentence: "I saw an advertisement online." },
        { id: "vs-6", category: "Vowel Shifts", difficulty: 2, word: "leisure", usPhonetic: "/ˈliːʒər/", ukPhonetic: "/ˈlɛʒə/", usTip: "LEE-zher", ukTip: "LEH-zhuh", sentence: "What do you do in your leisure time?" },
        { id: "vs-7", category: "Vowel Shifts", difficulty: 2, word: "privacy", usPhonetic: "/ˈpraɪvəsi/", ukPhonetic: "/ˈprɪvəsi/", usTip: "PRY-vuh-see", ukTip: "PRIV-uh-see", sentence: "I value my privacy." },
        { id: "vs-8", category: "Vowel Shifts", difficulty: 3, word: "lieutenant", usPhonetic: "/luːˈtɛnənt/", ukPhonetic: "/lɛfˈtɛnənt/", usTip: "loo-TEN-ent", ukTip: "lef-TEN-ent", sentence: "The lieutenant gave the orders." },
        { id: "vs-9", category: "Vowel Shifts", difficulty: 3, word: "controversy", usPhonetic: "/ˈkɑːntrəvɜːrsi/", ukPhonetic: "/kənˈtrɒvəsi/", usTip: "CON-truh-ver-see", ukTip: "con-TROV-uh-see", sentence: "The decision caused controversy." },
        { id: "vs-10", category: "Vowel Shifts", difficulty: 3, word: "laboratory", usPhonetic: "/ˈlæbrəˌtɔːri/", ukPhonetic: "/ləˈbɒrətri/", usTip: "LAB-ruh-tory (4 syllables)", ukTip: "luh-BOR-uh-tree (4 syllables)", sentence: "The results came from the laboratory." }
    ],

    // =========================================================================
    // SENTENCE SHADOWING — 30 items across 6 categories
    // =========================================================================
    sentences: [
        // --- Greetings (5) ---
        { id: "s-greet-1", category: "Greetings", us: "Hey, what's up? How's it going?", uk: "Hiya! You alright?", context: "Casual greeting between friends", difficulty: 1 },
        { id: "s-greet-2", category: "Greetings", us: "Good to see you! It's been a while.", uk: "Lovely to see you! It's been ages.", context: "Meeting a friend you haven't seen", difficulty: 1 },
        { id: "s-greet-3", category: "Greetings", us: "I gotta run. Catch you later!", uk: "Right, I'm off. Cheers, see ya!", context: "Saying goodbye casually", difficulty: 2 },
        { id: "s-greet-4", category: "Greetings", us: "What are you up to this weekend?", uk: "What are you getting up to this weekend?", context: "Asking about weekend plans", difficulty: 2 },
        { id: "s-greet-5", category: "Greetings", us: "Take it easy, man. Talk to you soon.", uk: "Take care, mate. Speak to you soon.", context: "Casual farewell", difficulty: 3 },

        // --- Ordering Food (5) ---
        { id: "s-food-1", category: "Ordering Food", us: "Can I get a large coffee with cream?", uk: "Could I have a large white coffee please?", context: "Ordering at a coffee shop", difficulty: 1 },
        { id: "s-food-2", category: "Ordering Food", us: "I'll have the burger with fries on the side.", uk: "I'll have the burger with chips on the side, please.", context: "Ordering lunch at a restaurant", difficulty: 1 },
        { id: "s-food-3", category: "Ordering Food", us: "Could I see the check when you get a chance?", uk: "Could I have the bill when you're ready?", context: "Asking for the bill at a restaurant", difficulty: 2 },
        { id: "s-food-4", category: "Ordering Food", us: "I'm good with water, thanks. No appetizers for me.", uk: "Just water for me, ta. No starters for me.", context: "Declining appetizers politely", difficulty: 2 },
        { id: "s-food-5", category: "Ordering Food", us: "That was awesome! Everything was on point.", uk: "That was lovely! Everything was spot on.", context: "Complimenting the meal", difficulty: 3 },

        // --- Giving Directions (5) ---
        { id: "s-dir-1", category: "Giving Directions", us: "Go straight for two blocks, then take a left.", uk: "Go straight on, then take the second left.", context: "Simple street directions", difficulty: 1 },
        { id: "s-dir-2", category: "Giving Directions", us: "It's right across from the gas station.", uk: "It's just opposite the petrol station.", context: "Pointing out a location", difficulty: 1 },
        { id: "s-dir-3", category: "Giving Directions", us: "Take the freeway north for about ten miles.", uk: "Take the motorway north for about ten miles.", context: "Highway directions", difficulty: 2 },
        { id: "s-dir-4", category: "Giving Directions", us: "You can't miss it. It's right next to the parking lot.", uk: "You can't miss it. It's right next to the car park.", context: "Helping someone find a place", difficulty: 2 },
        { id: "s-dir-5", category: "Giving Directions", us: "If you hit the intersection, you've gone too far.", uk: "If you reach the roundabout, you've gone too far.", context: "Warning about overshooting", difficulty: 3 },

        // --- Small Talk (5) ---
        { id: "s-talk-1", category: "Small Talk", us: "Man, this weather is crazy. It was eighty degrees yesterday!", uk: "Goodness, this weather's mad. It was twenty-six degrees yesterday!", context: "Talking about the weather", difficulty: 1 },
        { id: "s-talk-2", category: "Small Talk", us: "Did you catch the game last night? It was insane!", uk: "Did you see the match last night? It was brilliant!", context: "Discussing sports", difficulty: 1 },
        { id: "s-talk-3", category: "Small Talk", us: "I'm thinking about taking a vacation next month.", uk: "I'm thinking about going on holiday next month.", context: "Discussing travel plans", difficulty: 2 },
        { id: "s-talk-4", category: "Small Talk", us: "My apartment's on the third floor with no elevator.", uk: "My flat's on the second floor with no lift.", context: "Describing where you live", difficulty: 2 },
        { id: "s-talk-5", category: "Small Talk", us: "I stood in line for an hour at the DMV. Total nightmare.", uk: "I queued for an hour at the DVLA. Absolute nightmare.", context: "Complaining about bureaucracy", difficulty: 3 },

        // --- Work Chat (5) ---
        { id: "s-work-1", category: "Work Chat", us: "Let's circle back on this after the meeting.", uk: "Let's come back to this after the meeting.", context: "Deferring a topic at work", difficulty: 1 },
        { id: "s-work-2", category: "Work Chat", us: "I'll shoot you an email with the details.", uk: "I'll send you an email with the details.", context: "Promising to follow up", difficulty: 1 },
        { id: "s-work-3", category: "Work Chat", us: "Can we push the deadline to Friday? I'm swamped.", uk: "Can we move the deadline to Friday? I'm absolutely snowed under.", context: "Requesting a deadline extension", difficulty: 2 },
        { id: "s-work-4", category: "Work Chat", us: "That presentation was solid. Really well put together.", uk: "That presentation was brilliant. Really well done.", context: "Praising a colleague", difficulty: 2 },
        { id: "s-work-5", category: "Work Chat", us: "I'm gonna head out early. I've got a doctor's appointment.", uk: "I'm going to head off early. I've got a doctor's appointment.", context: "Leaving work early", difficulty: 3 },

        // --- Expressing Opinions (5) ---
        { id: "s-opin-1", category: "Expressing Opinions", us: "Honestly, I think that's a great idea.", uk: "To be honest, I think that's a brilliant idea.", context: "Agreeing with someone", difficulty: 1 },
        { id: "s-opin-2", category: "Expressing Opinions", us: "I'm not sure I'm on board with that plan.", uk: "I'm not sure I'm keen on that plan.", context: "Politely disagreeing", difficulty: 1 },
        { id: "s-opin-3", category: "Expressing Opinions", us: "That movie was super overrated. Total waste of time.", uk: "That film was massively overrated. Complete waste of time.", context: "Giving a negative review", difficulty: 2 },
        { id: "s-opin-4", category: "Expressing Opinions", us: "I feel like we should try a different approach.", uk: "I reckon we should try a different approach.", context: "Suggesting an alternative", difficulty: 2 },
        { id: "s-opin-5", category: "Expressing Opinions", us: "You know what, that's actually a really solid point.", uk: "You know what, that's actually a really fair point.", context: "Conceding someone is right", difficulty: 3 }
    ],

    // =========================================================================
    // ACCENT QUIZZES — 30 items for accent identification
    // =========================================================================
    quizzes: [
        { id: "q-1", word: "schedule", usPronunciation: "SKED-jool", ukPronunciation: "SHED-yool", hint: "The first consonant sound differs", category: "Classic Differences" },
        { id: "q-2", word: "tomato", usPronunciation: "tuh-MAY-toe", ukPronunciation: "tuh-MAH-toe", hint: "The middle vowel is different", category: "Classic Differences" },
        { id: "q-3", word: "garage", usPronunciation: "guh-RAZH", ukPronunciation: "GA-ridge", hint: "The stress pattern and ending differ", category: "Classic Differences" },
        { id: "q-4", word: "herb", usPronunciation: "erb (silent H)", ukPronunciation: "herb (H pronounced)", hint: "One accent drops the H", category: "Classic Differences" },
        { id: "q-5", word: "water", usPronunciation: "WAH-der", ukPronunciation: "WAW-tuh", hint: "Listen for the T and R sounds", category: "R and T Sounds" },
        { id: "q-6", word: "butter", usPronunciation: "BUH-der", ukPronunciation: "BUH-tuh", hint: "The T sounds very different", category: "R and T Sounds" },
        { id: "q-7", word: "car", usPronunciation: "karr", ukPronunciation: "kah", hint: "Listen for the R at the end", category: "R and T Sounds" },
        { id: "q-8", word: "letter", usPronunciation: "LEH-der", ukPronunciation: "LEH-tuh", hint: "Both the T and final R differ", category: "R and T Sounds" },
        { id: "q-9", word: "bath", usPronunciation: "bath (short A)", ukPronunciation: "bahth (long A)", hint: "The vowel length differs", category: "Vowel Differences" },
        { id: "q-10", word: "dance", usPronunciation: "danss (short A)", ukPronunciation: "dahnce (long A)", hint: "The A sound is key", category: "Vowel Differences" },
        { id: "q-11", word: "hot", usPronunciation: "haht (open A)", ukPronunciation: "hot (rounded O)", hint: "The O/A vowel quality differs", category: "Vowel Differences" },
        { id: "q-12", word: "privacy", usPronunciation: "PRY-vuh-see", ukPronunciation: "PRIV-uh-see", hint: "The first vowel is different", category: "Stress and Vowels" },
        { id: "q-13", word: "advertisement", usPronunciation: "ad-ver-TIZE-ment", ukPronunciation: "ad-VER-tis-ment", hint: "The stress falls on different syllables", category: "Stress and Vowels" },
        { id: "q-14", word: "leisure", usPronunciation: "LEE-zher", ukPronunciation: "LEH-zhuh", hint: "The first vowel is different", category: "Stress and Vowels" },
        { id: "q-15", word: "route", usPronunciation: "rowt", ukPronunciation: "root", hint: "The vowel sound completely changes", category: "Classic Differences" },
        { id: "q-16", word: "vase", usPronunciation: "vayss", ukPronunciation: "vahz", hint: "Both the vowel and final consonant change", category: "Classic Differences" },
        { id: "q-17", word: "either", usPronunciation: "EE-ther", ukPronunciation: "EYE-ther", hint: "The first vowel sound differs", category: "Vowel Differences" },
        { id: "q-18", word: "vitamin", usPronunciation: "VY-tuh-min", ukPronunciation: "VIT-uh-min", hint: "The first syllable differs", category: "Stress and Vowels" },
        { id: "q-19", word: "aluminium", usPronunciation: "ah-LOO-min-um", ukPronunciation: "al-yoo-MIN-ee-um", hint: "Different number of syllables!", category: "Classic Differences" },
        { id: "q-20", word: "data", usPronunciation: "DAY-tuh", ukPronunciation: "DAH-tuh", hint: "The first vowel differs", category: "Vowel Differences" },
        { id: "q-21", word: "mobile", usPronunciation: "MOH-bull", ukPronunciation: "MOH-bye-ul", hint: "The number of syllables may differ", category: "Stress and Vowels" },
        { id: "q-22", word: "zebra", usPronunciation: "ZEE-bruh", ukPronunciation: "ZEB-ruh", hint: "The first vowel is different", category: "Vowel Differences" },
        { id: "q-23", word: "niche", usPronunciation: "nitch", ukPronunciation: "neesh", hint: "Completely different pronunciation!", category: "Classic Differences" },
        { id: "q-24", word: "basil", usPronunciation: "BAY-zul", ukPronunciation: "BAZ-ul", hint: "The first vowel sound differs", category: "Vowel Differences" },
        { id: "q-25", word: "controversy", usPronunciation: "CON-truh-ver-see", ukPronunciation: "con-TROV-er-see", hint: "The stress pattern is different", category: "Stress and Vowels" },
        { id: "q-26", word: "missile", usPronunciation: "MISS-ul", ukPronunciation: "MISS-eye-ul", hint: "The ending is pronounced differently", category: "Stress and Vowels" },
        { id: "q-27", word: "bottle", usPronunciation: "BAH-dul", ukPronunciation: "BO-ul", hint: "T sounds completely different", category: "R and T Sounds" },
        { id: "q-28", word: "clerk", usPronunciation: "klerk", ukPronunciation: "klahk", hint: "The vowel and R handling differ", category: "R and T Sounds" },
        { id: "q-29", word: "lieutenant", usPronunciation: "loo-TEN-ent", ukPronunciation: "lef-TEN-ent", hint: "The beginning is very different!", category: "Classic Differences" },
        { id: "q-30", word: "oregano", usPronunciation: "oh-REG-uh-no", ukPronunciation: "or-eh-GAH-no", hint: "The stress and vowels shift", category: "Stress and Vowels" }
    ],

    // =========================================================================
    // RENDER: Learn Tab — Accent Guide Reference
    // =========================================================================
    renderLearn: function(container) {
        var self = this;
        var guide = (typeof SLANG_DATA !== 'undefined' && SLANG_DATA.accentGuide) ? SLANG_DATA.accentGuide : null;
        var ttsAvailable = typeof TTS !== 'undefined' && TTS.isAvailable();
        var accent = this.currentAccent;
        var data = guide ? guide[accent] : null;

        var html = '<div class="accent-learn-section">';

        // Accent toggle
        html += '<div class="accent-toggle">' +
            '<button class="accent-toggle-btn' + (accent === 'us' ? ' active' : '') + '" data-accent="us">US American</button>' +
            '<button class="accent-toggle-btn' + (accent === 'uk' ? ' active' : '') + '" data-accent="uk">UK British</button>' +
            '</div>';

        // Progress stats
        var progress = this._getProgress();
        if (progress.totalSessions > 0) {
            html += '<div class="learn-stats-bar">' +
                '<span>Sessions: <strong>' + progress.totalSessions + '</strong></span>' +
                (progress.quizHighScore > 0 ? ' &middot; <span>Quiz Best: <strong>' + progress.quizHighScore + '%</strong></span>' : '') +
                '</div>';
        }

        if (data) {
            html += '<h3>' + data.name + '</h3>';
            for (var i = 0; i < data.features.length; i++) {
                var feat = data.features[i];
                html += '<div class="accent-feature-card">';
                html += '<h4>' + feat.feature + '</h4>';
                html += '<p>' + feat.description + '</p>';
                html += '<div class="feature-examples">';
                for (var j = 0; j < feat.examples.length; j++) {
                    var ex = feat.examples[j];
                    var word = ex.split('→')[0].split(' ')[0].trim();
                    html += '<span class="feature-example">' + ex;
                    if (ttsAvailable) {
                        html += ' <button class="btn-tts-sm" data-word="' + word + '" data-accent="' + accent + '" title="Listen">&#128266;</button>';
                    }
                    html += '</span>';
                }
                html += '</div></div>';
            }
        } else {
            html += '<p>Accent guide data not available.</p>';
        }

        html += '</div>';
        container.innerHTML = html;

        // Bind accent toggle
        var toggleBtns = container.querySelectorAll('.accent-toggle-btn');
        for (var ti = 0; ti < toggleBtns.length; ti++) {
            toggleBtns[ti].addEventListener('click', function() {
                self.currentAccent = this.getAttribute('data-accent');
                self.renderLearn(container);
            });
        }

        // Bind TTS buttons
        if (ttsAvailable) {
            var ttsBtns = container.querySelectorAll('.btn-tts-sm');
            for (var bi = 0; bi < ttsBtns.length; bi++) {
                ttsBtns[bi].addEventListener('click', function(e) {
                    e.stopPropagation();
                    TTS.speakWord(this.getAttribute('data-word'), this.getAttribute('data-accent'));
                });
            }
        }
    },

    // =========================================================================
    // RENDER: Speak Tab — Listen & Repeat Drills
    // =========================================================================
    renderSpeak: function(container) {
        var self = this;
        var drills = this.drills;
        var idx = this.currentDrill;
        var accent = this.currentAccent;
        var ttsAvailable = typeof TTS !== 'undefined' && TTS.isAvailable();
        var voiceAvailable = typeof VoiceInput !== 'undefined' && VoiceInput.isAvailable();

        // Session complete
        if (idx >= drills.length) {
            this._renderSessionSummary(container, this.sessionScores, 'drill');
            return;
        }

        var drill = drills[idx];
        var phonetic = accent === 'us' ? drill.usPhonetic : drill.ukPhonetic;
        var tip = accent === 'us' ? drill.usTip : drill.ukTip;
        var progressPct = Math.round((idx / drills.length) * 100);

        var html = '<div class="drill-section">';

        // Progress
        html += '<div class="tutor-progress-text">' + (idx + 1) + ' of ' + drills.length + '</div>';
        html += '<div class="tutor-progress"><div class="tutor-progress-fill" style="width:' + progressPct + '%"></div></div>';

        // Accent toggle
        html += '<div style="text-align:center;">' +
            '<div class="accent-toggle">' +
            '<button class="accent-toggle-btn' + (accent === 'us' ? ' active' : '') + '" data-accent="us">US</button>' +
            '<button class="accent-toggle-btn' + (accent === 'uk' ? ' active' : '') + '" data-accent="uk">UK</button>' +
            '</div></div>';

        // Drill card
        html += '<div class="drill-card">';
        html += '<div class="drill-category">' + drill.category + ' &middot; Level ' + drill.difficulty + '</div>';
        html += '<div class="drill-word">' + drill.word + '</div>';
        html += '<div class="drill-phonetic">' + phonetic + '</div>';
        html += '<div class="drill-tip">' + tip + '</div>';

        if (ttsAvailable) {
            html += '<button class="drill-listen-btn" id="drill-listen-btn">&#128266; Listen</button>';
        }

        html += '<div class="drill-sentence">"' + drill.sentence + '"</div>';
        html += '</div>';

        // Mic area
        if (voiceAvailable) {
            html += '<div class="tutor-mic-area">' +
                '<button class="tutor-mic-btn" id="drill-mic-btn"><span>&#127908;</span></button>' +
                '<div class="tutor-mic-label">Tap to speak</div>' +
                '</div>';
        } else {
            html += '<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;">Voice input not supported in this browser. Try Chrome.</p>';
        }

        // Result area
        html += '<div class="tutor-result hidden" id="drill-result"></div>';

        // Actions
        html += '<div class="tutor-actions">' +
            '<button class="tutor-btn tutor-btn-secondary" id="drill-skip-btn">Skip</button>' +
            '</div>';

        html += '</div>';
        container.innerHTML = html;

        // --- Bind events ---
        // Accent toggle
        var accentBtns = container.querySelectorAll('.accent-toggle-btn');
        for (var ai = 0; ai < accentBtns.length; ai++) {
            accentBtns[ai].addEventListener('click', function() {
                self.currentAccent = this.getAttribute('data-accent');
                self.renderSpeak(container);
            });
        }

        // Listen button
        var listenBtn = container.querySelector('#drill-listen-btn');
        if (listenBtn && ttsAvailable) {
            listenBtn.addEventListener('click', function() {
                TTS.speakWord(drill.word, accent);
            });
        }

        // Skip button
        var skipBtn = container.querySelector('#drill-skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', function() {
                self.currentDrill++;
                self.renderSpeak(container);
            });
        }

        // Mic button
        var micBtn = container.querySelector('#drill-mic-btn');
        if (micBtn && voiceAvailable) {
            micBtn.addEventListener('click', function() {
                var resultEl = container.querySelector('#drill-result');
                var micLabel = container.querySelector('.tutor-mic-label');
                micBtn.classList.add('listening');
                if (micLabel) micLabel.textContent = 'Listening...';
                if (resultEl) resultEl.classList.add('hidden');

                VoiceInput.startListening(accent, function(results) {
                    var currentMic = container.querySelector('#drill-mic-btn');
                    var currentLabel = container.querySelector('.tutor-mic-label');
                    if (currentMic) currentMic.classList.remove('listening');
                    if (currentLabel) currentLabel.textContent = 'Tap to speak';

                    var best = results[0];
                    var comparison = VoiceInput.comparePronunciation(drill.word, best.transcript);
                    var scorePct = Math.round(comparison.similarity * 100);

                    self.sessionScores.push({ word: drill.word, score: scorePct, spoken: best.transcript });

                    var resultClass = comparison.match ? 'correct' : (comparison.similarity >= 0.6 ? 'close' : 'incorrect');

                    var currentResult = container.querySelector('#drill-result');
                    if (currentResult) {
                        currentResult.classList.remove('hidden');
                        currentResult.className = 'tutor-result ' + resultClass;
                        currentResult.innerHTML =
                            '<div class="result-heard">You said: "<strong>' + best.transcript + '</strong>"</div>' +
                            '<div class="result-score">' + scorePct + '%</div>' +
                            '<div class="result-feedback">' + comparison.feedback + '</div>';
                    }

                    // Show next button
                    var actions = container.querySelector('.tutor-actions');
                    if (actions) {
                        actions.innerHTML =
                            '<button class="tutor-btn tutor-btn-secondary" id="drill-retry-btn">Try Again</button>' +
                            '<button class="tutor-btn tutor-btn-primary" id="drill-next-btn">Next &#8594;</button>';

                        container.querySelector('#drill-retry-btn').addEventListener('click', function() {
                            var res = container.querySelector('#drill-result');
                            if (res) res.classList.add('hidden');
                            self.sessionScores.pop();
                            actions.innerHTML = '<button class="tutor-btn tutor-btn-secondary" id="drill-skip-btn">Skip</button>';
                            container.querySelector('#drill-skip-btn').addEventListener('click', function() {
                                self.currentDrill++;
                                self.renderSpeak(container);
                            });
                        });

                        container.querySelector('#drill-next-btn').addEventListener('click', function() {
                            self.currentDrill++;
                            self.renderSpeak(container);
                        });
                    }
                }, function(err) {
                    var currentMic = container.querySelector('#drill-mic-btn');
                    var currentLabel = container.querySelector('.tutor-mic-label');
                    if (currentMic) currentMic.classList.remove('listening');
                    if (currentLabel) currentLabel.textContent = 'Tap to speak';

                    var currentResult = container.querySelector('#drill-result');
                    if (currentResult) {
                        currentResult.classList.remove('hidden');
                        currentResult.className = 'tutor-result incorrect';
                        currentResult.textContent = err === 'no-speech' ? 'No speech detected. Tap the mic and try again.' : 'Error: ' + err;
                    }
                });
            });
        }
    },

    // =========================================================================
    // RENDER: Shadow Tab — Sentence Practice
    // =========================================================================
    renderShadow: function(container) {
        var self = this;
        var sentences = this.sentences;
        var idx = this.currentSentence;
        var accent = this.currentAccent;
        var ttsAvailable = typeof TTS !== 'undefined' && TTS.isAvailable();
        var voiceAvailable = typeof VoiceInput !== 'undefined' && VoiceInput.isAvailable();

        // Session complete
        if (idx >= sentences.length) {
            this._renderSessionSummary(container, this.sessionScores, 'shadow');
            return;
        }

        var sent = sentences[idx];
        var sentenceText = accent === 'us' ? sent.us : sent.uk;
        var progressPct = Math.round((idx / sentences.length) * 100);

        var html = '<div class="shadow-section">';

        // Progress
        html += '<div class="tutor-progress-text">' + (idx + 1) + ' of ' + sentences.length + '</div>';
        html += '<div class="tutor-progress"><div class="tutor-progress-fill" style="width:' + progressPct + '%"></div></div>';

        // Accent toggle
        html += '<div style="text-align:center;">' +
            '<div class="accent-toggle">' +
            '<button class="accent-toggle-btn' + (accent === 'us' ? ' active' : '') + '" data-accent="us">US</button>' +
            '<button class="accent-toggle-btn' + (accent === 'uk' ? ' active' : '') + '" data-accent="uk">UK</button>' +
            '</div></div>';

        // Sentence display
        html += '<div class="shadow-context">' + sent.context + ' &middot; ' + sent.category + '</div>';
        html += '<div class="shadow-sentence">' + sentenceText + '</div>';

        // Play buttons
        if (ttsAvailable) {
            html += '<div class="shadow-speed-btns">' +
                '<button class="tutor-btn tutor-btn-secondary" id="shadow-play-btn">&#128266; Play</button>' +
                '<button class="tutor-btn tutor-btn-secondary" id="shadow-slow-btn">&#128034; Slow</button>' +
                '</div>';
        }

        // Mic area
        if (voiceAvailable) {
            html += '<div class="tutor-mic-area">' +
                '<button class="tutor-mic-btn" id="shadow-mic-btn"><span>&#127908;</span></button>' +
                '<div class="tutor-mic-label">Tap to speak the sentence</div>' +
                '</div>';
        } else {
            html += '<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;">Voice input not supported. Try Chrome.</p>';
        }

        // Result area
        html += '<div class="tutor-result hidden" id="shadow-result"></div>';

        // Actions
        html += '<div class="tutor-actions">' +
            '<button class="tutor-btn tutor-btn-secondary" id="shadow-other-accent-btn">Try ' + (accent === 'us' ? 'UK' : 'US') + '</button>' +
            '<button class="tutor-btn tutor-btn-secondary" id="shadow-skip-btn">Skip</button>' +
            '</div>';

        html += '</div>';
        container.innerHTML = html;

        // --- Bind events ---
        // Accent toggle
        var accentBtns = container.querySelectorAll('.accent-toggle-btn');
        for (var ai = 0; ai < accentBtns.length; ai++) {
            accentBtns[ai].addEventListener('click', function() {
                self.currentAccent = this.getAttribute('data-accent');
                self.renderShadow(container);
            });
        }

        // Play
        var playBtn = container.querySelector('#shadow-play-btn');
        if (playBtn && ttsAvailable) {
            playBtn.addEventListener('click', function() { TTS.speakSentence(sentenceText, accent); });
        }

        // Slow
        var slowBtn = container.querySelector('#shadow-slow-btn');
        if (slowBtn && ttsAvailable) {
            slowBtn.addEventListener('click', function() { TTS.speak(sentenceText, accent, 0.6); });
        }

        // Other accent
        var otherBtn = container.querySelector('#shadow-other-accent-btn');
        if (otherBtn) {
            otherBtn.addEventListener('click', function() {
                self.currentAccent = self.currentAccent === 'us' ? 'uk' : 'us';
                self.renderShadow(container);
            });
        }

        // Skip
        var skipBtn = container.querySelector('#shadow-skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', function() { self.currentSentence++; self.renderShadow(container); });
        }

        // Mic
        var micBtn = container.querySelector('#shadow-mic-btn');
        if (micBtn && voiceAvailable) {
            micBtn.addEventListener('click', function() {
                var micLabel = container.querySelector('.tutor-mic-label');
                micBtn.classList.add('listening');
                if (micLabel) micLabel.textContent = 'Listening...';
                var resultEl = container.querySelector('#shadow-result');
                if (resultEl) resultEl.classList.add('hidden');

                VoiceInput.startListening(accent, function(results) {
                    var currentMic = container.querySelector('#shadow-mic-btn');
                    var currentLabel = container.querySelector('.tutor-mic-label');
                    if (currentMic) currentMic.classList.remove('listening');
                    if (currentLabel) currentLabel.textContent = 'Tap to speak the sentence';

                    var best = results[0];
                    var wordComparison = self._compareWords(sentenceText, best.transcript);
                    var matchCount = 0;
                    for (var wi = 0; wi < wordComparison.length; wi++) { if (wordComparison[wi].match) matchCount++; }
                    var scorePct = wordComparison.length > 0 ? Math.round((matchCount / wordComparison.length) * 100) : 0;

                    self.sessionScores.push({ sentence: sentenceText, score: scorePct, spoken: best.transcript });

                    // Word-by-word display
                    var wordsHtml = '';
                    for (var wj = 0; wj < wordComparison.length; wj++) {
                        var wc = wordComparison[wj];
                        wordsHtml += '<span class="shadow-word ' + (wc.match ? 'match' : 'mismatch') + '">' + wc.word + '</span> ';
                    }

                    var resultClass = scorePct >= 80 ? 'correct' : (scorePct >= 50 ? 'close' : 'incorrect');
                    var currentResult = container.querySelector('#shadow-result');
                    if (currentResult) {
                        currentResult.classList.remove('hidden');
                        currentResult.className = 'tutor-result ' + resultClass;
                        currentResult.innerHTML =
                            '<div class="result-score">' + scorePct + '% match</div>' +
                            '<div style="margin:10px 0;line-height:2;">' + wordsHtml + '</div>' +
                            '<div class="result-heard">You said: "<em>' + best.transcript + '</em>"</div>';
                    }

                    // Update actions
                    var actions = container.querySelector('.tutor-actions');
                    if (actions) {
                        actions.innerHTML =
                            '<button class="tutor-btn tutor-btn-secondary" id="shadow-retry-btn">Try Again</button>' +
                            '<button class="tutor-btn tutor-btn-primary" id="shadow-next-btn">Next &#8594;</button>';
                        container.querySelector('#shadow-retry-btn').addEventListener('click', function() {
                            var res = container.querySelector('#shadow-result');
                            if (res) res.classList.add('hidden');
                            self.sessionScores.pop();
                        });
                        container.querySelector('#shadow-next-btn').addEventListener('click', function() {
                            self.currentSentence++;
                            self.renderShadow(container);
                        });
                    }
                }, function(err) {
                    var currentMic = container.querySelector('#shadow-mic-btn');
                    var currentLabel = container.querySelector('.tutor-mic-label');
                    if (currentMic) currentMic.classList.remove('listening');
                    if (currentLabel) currentLabel.textContent = 'Tap to speak the sentence';
                    var currentResult = container.querySelector('#shadow-result');
                    if (currentResult) {
                        currentResult.classList.remove('hidden');
                        currentResult.className = 'tutor-result incorrect';
                        currentResult.textContent = err === 'no-speech' ? 'No speech detected. Try again.' : 'Error: ' + err;
                    }
                });
            });
        }
    },

    // =========================================================================
    // RENDER: Quiz Tab — Accent Identification
    // =========================================================================
    renderQuiz: function(container) {
        var self = this;
        var roundSize = 10;
        var ttsAvailable = typeof TTS !== 'undefined' && TTS.isAvailable();

        // Start new round if needed
        if (this._quizRound.length === 0 || this._quizCurrent >= this._quizRound.length) {
            if (this._quizCurrent >= this._quizRound.length && this._quizRound.length > 0) {
                this._renderQuizResults(container);
                return;
            }
            this._startQuizRound(roundSize);
        }

        var qIdx = this._quizCurrent;
        var q = this._quizRound[qIdx];
        var progressPct = Math.round((qIdx / this._quizRound.length) * 100);

        var html = '<div class="quiz-section">';

        // Progress
        html += '<div class="tutor-progress-text">Question ' + (qIdx + 1) + ' of ' + this._quizRound.length + '</div>';
        html += '<div class="tutor-progress"><div class="tutor-progress-fill" style="width:' + progressPct + '%"></div></div>';

        // Score
        html += '<div class="quiz-streak">Score: <strong>' + this.quizScore + '</strong> / <strong>' + this.quizTotal + '</strong></div>';

        // Question card
        html += '<div class="drill-card" style="margin-bottom:16px;">';
        html += '<p style="color:var(--text-secondary);margin-bottom:12px;">Listen and identify the accent:</p>';
        html += '<div class="drill-word">' + q.quiz.word + '</div>';

        if (ttsAvailable) {
            html += '<button class="drill-listen-btn" id="quiz-play-btn">&#128266; Play Pronunciation</button>';
        }
        html += '<p style="font-size:0.82rem;color:var(--text-muted);font-style:italic;">Hint: ' + q.quiz.hint + '</p>';
        html += '</div>';

        // Answer buttons
        html += '<div class="quiz-accent-choices">' +
            '<button class="quiz-accent-btn" id="quiz-btn-us" data-answer="us">&#127482;&#127480; American</button>' +
            '<button class="quiz-accent-btn" id="quiz-btn-uk" data-answer="uk">&#127468;&#127463; British</button>' +
            '</div>';

        // Feedback area
        html += '<div class="tutor-result hidden" id="quiz-feedback"></div>';

        html += '</div>';
        container.innerHTML = html;

        // --- Bind events ---
        var playBtn = container.querySelector('#quiz-play-btn');
        if (playBtn && ttsAvailable) {
            playBtn.addEventListener('click', function() { TTS.speakWord(q.quiz.word, q.accent); });
            // Auto-play
            setTimeout(function() { if (typeof TTS !== 'undefined' && TTS.isAvailable()) TTS.speakWord(q.quiz.word, q.accent); }, 400);
        }

        // Answer buttons
        var answerBtns = container.querySelectorAll('.quiz-accent-btn');
        for (var ai = 0; ai < answerBtns.length; ai++) {
            answerBtns[ai].addEventListener('click', function() {
                var chosen = this.getAttribute('data-answer');
                var isCorrect = chosen === q.accent;

                self.quizTotal++;
                if (isCorrect) self.quizScore++;

                self._quizAnswers.push({ word: q.quiz.word, correctAccent: q.accent, chosen: chosen, correct: isCorrect });

                // Disable and highlight buttons
                var allBtns = container.querySelectorAll('.quiz-accent-btn');
                for (var bi = 0; bi < allBtns.length; bi++) {
                    allBtns[bi].disabled = true;
                    if (allBtns[bi].getAttribute('data-answer') === q.accent) allBtns[bi].classList.add('correct');
                    if (!isCorrect && allBtns[bi].getAttribute('data-answer') === chosen) allBtns[bi].classList.add('wrong');
                }

                // Show feedback
                var feedbackEl = container.querySelector('#quiz-feedback');
                if (feedbackEl) {
                    feedbackEl.classList.remove('hidden');
                    var accentLabel = q.accent === 'us' ? 'American' : 'British';
                    feedbackEl.className = 'tutor-result ' + (isCorrect ? 'correct' : 'incorrect');
                    feedbackEl.innerHTML =
                        '<div class="result-score">' + (isCorrect ? 'Correct!' : 'Not quite!') + '</div>' +
                        '<div class="result-feedback">That was the <strong>' + accentLabel + '</strong> pronunciation.</div>' +
                        '<div class="quiz-explanation">' +
                        '&#127482;&#127480; US: <strong>' + q.quiz.usPronunciation + '</strong><br>' +
                        '&#127468;&#127463; UK: <strong>' + q.quiz.ukPronunciation + '</strong></div>' +
                        '<div class="tutor-actions"><button class="tutor-btn tutor-btn-primary" id="quiz-next-btn">Next &#8594;</button></div>';

                    container.querySelector('#quiz-next-btn').addEventListener('click', function() {
                        self._quizCurrent++;
                        self.renderQuiz(container);
                    });
                }

                // Update score
                var scoreEl = container.querySelector('.quiz-streak');
                if (scoreEl) scoreEl.innerHTML = 'Score: <strong>' + self.quizScore + '</strong> / <strong>' + self.quizTotal + '</strong>';
            });
        }
    },

    // =========================================================================
    // Quiz Helpers
    // =========================================================================
    _startQuizRound: function(size) {
        var shuffled = this.quizzes.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
        }
        this._quizRound = [];
        var selected = shuffled.slice(0, Math.min(size, shuffled.length));
        for (var k = 0; k < selected.length; k++) {
            this._quizRound.push({ quiz: selected[k], accent: Math.random() < 0.5 ? 'us' : 'uk' });
        }
        this._quizCurrent = 0;
        this._quizAnswers = [];
        this.quizScore = 0;
        this.quizTotal = 0;
    },

    _renderQuizResults: function(container) {
        var self = this;
        var scorePct = this.quizTotal > 0 ? Math.round((this.quizScore / this.quizTotal) * 100) : 0;
        var colorClass = scorePct >= 80 ? 'excellent' : (scorePct >= 60 ? 'good' : 'needs-work');

        // Save high score
        var progress = this._getProgress();
        if (scorePct > (progress.quizHighScore || 0)) {
            progress.quizHighScore = scorePct;
            this._saveProgressData(progress);
        }

        // Review
        var reviewHtml = '';
        for (var ri = 0; ri < this._quizAnswers.length; ri++) {
            var a = this._quizAnswers[ri];
            var icon = a.correct ? '&#9989;' : '&#10060;';
            var label = a.correctAccent === 'us' ? '&#127482;&#127480; US' : '&#127468;&#127463; UK';
            reviewHtml += '<div style="padding:6px 0;border-bottom:1px solid var(--border);font-size:0.88rem;">' +
                icon + ' <strong>' + a.word + '</strong> &mdash; ' + label + '</div>';
        }

        container.innerHTML =
            '<div style="text-align:center;">' +
            '<h3>Quiz Complete!</h3>' +
            '<div class="score-circle ' + colorClass + '">' +
            '<span class="score-pct">' + scorePct + '%</span>' +
            '<span class="score-label">Score</span></div>' +
            '<p style="margin:12px 0;color:var(--text-secondary);">' + this.quizScore + ' out of ' + this.quizTotal + ' correct</p>' +
            '<div style="text-align:left;margin:16px 0;">' + reviewHtml + '</div>' +
            '<button class="tutor-btn tutor-btn-primary" id="quiz-again-btn">Play Again</button>' +
            '</div>';

        container.querySelector('#quiz-again-btn').addEventListener('click', function() {
            self._quizRound = [];
            self._quizCurrent = 0;
            self.renderQuiz(container);
        });
    },

    // =========================================================================
    // Session Summary — shared by Speak and Shadow
    // =========================================================================
    _renderSessionSummary: function(container, scores, mode) {
        var self = this;

        if (!scores || scores.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:40px 0;">' +
                '<h3>No Results Yet</h3><p>Complete some exercises to see your summary.</p>' +
                '<button class="tutor-btn tutor-btn-primary" id="summary-restart">Start Over</button></div>';
            container.querySelector('#summary-restart').addEventListener('click', function() {
                self._resetSession(mode);
                if (mode === 'drill') self.renderSpeak(container); else self.renderShadow(container);
            });
            return;
        }

        var totalScore = 0, bestScore = 0, bestItem = '', worstScore = 100, worstItem = '';
        for (var i = 0; i < scores.length; i++) {
            var s = scores[i];
            totalScore += s.score;
            if (s.score > bestScore) { bestScore = s.score; bestItem = s.word || s.sentence || ''; }
            if (s.score < worstScore) { worstScore = s.score; worstItem = s.word || s.sentence || ''; }
        }
        var avg = Math.round(totalScore / scores.length);
        var colorClass = avg >= 80 ? 'excellent' : (avg >= 60 ? 'good' : 'needs-work');
        if (bestItem.length > 25) bestItem = bestItem.substring(0, 22) + '...';
        if (worstItem.length > 25) worstItem = worstItem.substring(0, 22) + '...';

        this._saveProgress();

        container.innerHTML =
            '<div style="text-align:center;">' +
            '<h3>Session Complete!</h3>' +
            '<div class="score-circle ' + colorClass + '">' +
            '<span class="score-pct">' + avg + '%</span>' +
            '<span class="score-label">Average</span></div>' +
            '<div class="summary-stats">' +
            '<div class="summary-stat"><div class="stat-num">' + scores.length + '</div><div class="stat-lbl">' + (mode === 'drill' ? 'Words' : 'Sentences') + '</div></div>' +
            '<div class="summary-stat"><div class="stat-num">' + avg + '%</div><div class="stat-lbl">Average</div></div>' +
            '<div class="summary-stat"><div class="stat-num">' + bestScore + '%</div><div class="stat-lbl">Best</div></div>' +
            '<div class="summary-stat"><div class="stat-num">' + worstScore + '%</div><div class="stat-lbl">Needs Work</div></div>' +
            '</div>' +
            '<button class="tutor-btn tutor-btn-primary" id="summary-restart">Practice Again</button>' +
            '</div>';

        container.querySelector('#summary-restart').addEventListener('click', function() {
            self._resetSession(mode);
            if (mode === 'drill') self.renderSpeak(container); else self.renderShadow(container);
        });
    },

    // =========================================================================
    // Word Comparison (for sentence shadowing)
    // =========================================================================
    _compareWords: function(target, spoken) {
        var tWords = target.toLowerCase().replace(/[^a-z0-9\s']/g, '').split(/\s+/).filter(function(w) { return w.length > 0; });
        var sWords = spoken.toLowerCase().replace(/[^a-z0-9\s']/g, '').split(/\s+/).filter(function(w) { return w.length > 0; });
        var result = [];
        for (var i = 0; i < tWords.length; i++) {
            result.push({ word: tWords[i], match: sWords.indexOf(tWords[i]) !== -1 });
        }
        return result;
    },

    // =========================================================================
    // Session Reset
    // =========================================================================
    _resetSession: function(mode) {
        this.sessionScores = [];
        if (mode === 'drill') this.currentDrill = 0;
        else if (mode === 'shadow') this.currentSentence = 0;
    },

    // =========================================================================
    // Progress Persistence
    // =========================================================================
    _saveProgress: function() {
        var progress = this._getProgress();
        progress.totalSessions++;
        progress.lastSession = new Date().toISOString();
        this._saveProgressData(progress);
    },

    _saveProgressData: function(progress) {
        var key = (typeof Storage !== 'undefined' && Storage.KEYS && Storage.KEYS.ACCENT_TUTOR) ? Storage.KEYS.ACCENT_TUTOR : 'vocabDaily_accentTutor';
        if (typeof Storage !== 'undefined' && typeof Storage._set === 'function') {
            Storage._set(key, progress);
        } else {
            try { localStorage.setItem(key, JSON.stringify(progress)); } catch (e) {}
        }
    },

    _getProgress: function() {
        var key = (typeof Storage !== 'undefined' && Storage.KEYS && Storage.KEYS.ACCENT_TUTOR) ? Storage.KEYS.ACCENT_TUTOR : 'vocabDaily_accentTutor';
        var defaults = { drillsCompleted: [], sentencesCompleted: [], quizHighScore: 0, totalSessions: 0, lastSession: null };
        if (typeof Storage !== 'undefined' && typeof Storage._get === 'function') {
            return Storage._get(key, defaults);
        }
        try { var d = localStorage.getItem(key); return d ? JSON.parse(d) : defaults; } catch (e) { return defaults; }
    }
};
