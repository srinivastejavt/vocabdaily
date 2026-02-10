// VocabDaily — Slang Chat Practice: Interactive Conversation Simulator
// Practice using UK and US slang in realistic dialogue scenarios

window.ChatPractice = {

    currentScenario: null,
    currentStep: 0,
    score: 0,
    totalAnswered: 0,
    chatHistory: [],

    // === Conversation Scenarios ===
    scenarios: [
        // --- US Slang Scenarios ---
        {
            id: 'us-party',
            title: 'Weekend Party Plans',
            accent: 'us',
            description: 'Your friend is telling you about an amazing party. Use US slang to respond!',
            steps: [
                {
                    speaker: 'friend',
                    message: "Yo! Did you go to Jake's party last night?",
                    prompt: "Tell your friend the party was amazing using slang:",
                    options: [
                        { text: "Dude, that party was so lit! The DJ was insane!", correct: true, feedback: "'Lit' = exciting/amazing. Perfect party slang!" },
                        { text: "Yes, the party was very nice and I enjoyed it.", correct: false, feedback: "That's correct English but too formal! Try 'lit', 'fire', or 'slaps' for party vibes." },
                        { text: "It was acceptable entertainment.", correct: false, feedback: "Way too formal! In casual American English, you'd say it was 'lit' or 'fire'." },
                        { text: "Bro, it was mid honestly. Nothing special.", correct: true, feedback: "'Mid' = mediocre/average. Also valid slang! 'Bro' is casual address." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "No cap? I heard the food was amazing too!",
                    prompt: "Agree that the food was incredible using slang:",
                    options: [
                        { text: "The tacos were bussin! No cap, best I've ever had.", correct: true, feedback: "'Bussin' = really good (especially food). 'No cap' = no lie. Nailed it!" },
                        { text: "Yes, the food was delicious and well-prepared.", correct: false, feedback: "Grammatically perfect but not slangy! 'Bussin' or 'slaps' would fit better here." },
                        { text: "Fr fr, the food slapped! I went back for seconds.", correct: true, feedback: "'Fr fr' = for real for real. 'Slapped' = was really good. Great slang usage!" },
                        { text: "The food was adequate for the occasion.", correct: false, feedback: "Too formal! You're at a party, not writing a review. Try 'bussin' or 'fire'." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "I'm lowkey jealous I missed it. Wanna hang out this weekend?",
                    prompt: "Agree enthusiastically using slang:",
                    options: [
                        { text: "Bet! I'm down. Let's link up Saturday.", correct: true, feedback: "'Bet' = sounds good. 'I'm down' = I'm in. 'Link up' = meet up. Perfect!" },
                        { text: "I would be amenable to meeting this weekend.", correct: false, feedback: "Sounds like a business email! Try 'Bet', 'I'm down', or 'For sure'." },
                        { text: "Say less! Saturday works. It's gonna be fire.", correct: true, feedback: "'Say less' = I'm in, no need to convince me. 'Fire' = amazing. Great!" },
                        { text: "Yes, that would be acceptable.", correct: false, feedback: "Way too stiff for chatting with friends. 'Bet' or 'I'm down' is the vibe." }
                    ]
                }
            ]
        },
        {
            id: 'us-work',
            title: 'Office Chat',
            accent: 'us',
            description: 'Casual workplace conversation with a coworker. Mix professional and casual!',
            steps: [
                {
                    speaker: 'coworker',
                    message: "Hey, did you see the new guy's presentation? What did you think?",
                    prompt: "Share your honest opinion casually:",
                    options: [
                        { text: "Honestly? It was kinda sus. Some of his data didn't add up.", correct: true, feedback: "'Sus' = suspicious/questionable. Perfect for expressing doubt casually." },
                        { text: "I thought it was mid. Like, the content was fine but the delivery? Not it.", correct: true, feedback: "'Mid' = mediocre. 'Not it' = not good. Natural casual criticism!" },
                        { text: "The presentation was below satisfactory standards.", correct: false, feedback: "Too corporate! Even at work, casual conversation uses relaxed language." },
                        { text: "I found it neither compelling nor informative.", correct: false, feedback: "Sounds like a formal review. Try something more natural like 'it was mid' or 'sus'." }
                    ]
                },
                {
                    speaker: 'coworker',
                    message: "Right?! And then he tried to flex about his old company's numbers.",
                    prompt: "Respond about his showing off:",
                    options: [
                        { text: "Total flex. Like, we get it dude, you worked at Google.", correct: true, feedback: "'Flex' = showing off. 'We get it' = stop bragging. Natural response!" },
                        { text: "His self-promotion was quite excessive and unnecessary.", correct: false, feedback: "Too formal for a casual coworker chat. 'Flexing' captures it better." },
                        { text: "Weird flex but ok. Nobody asked though.", correct: true, feedback: "'Weird flex but ok' = strange thing to brag about. Very popular expression!" },
                        { text: "He was being a bit of a simp for his old company, ngl.", correct: true, feedback: "'Ngl' = not gonna lie. Using slang naturally in context. Good!" }
                    ]
                },
                {
                    speaker: 'coworker',
                    message: "Anyway, the real tea is that Sarah got promoted! Have you heard?",
                    prompt: "React to the gossip:",
                    options: [
                        { text: "No way! Good for her though. She's been putting in work, she deserves it.", correct: true, feedback: "'Putting in work' = working hard. Supportive and casual. Nice!" },
                        { text: "Spill the tea! When did this happen? I'm shook!", correct: true, feedback: "'Spill the tea' = tell me the gossip. 'Shook' = shocked. Great slang combo!" },
                        { text: "I was not previously made aware of this personnel change.", correct: false, feedback: "You sound like a robot HR email! Keep it casual." },
                        { text: "That information has not reached me yet.", correct: false, feedback: "Way too formal. Try 'I'm shook' or 'No way!' for a natural reaction." }
                    ]
                }
            ]
        },
        {
            id: 'us-dating',
            title: 'Dating Stories',
            accent: 'us',
            description: 'Your friend is telling you about their dating life. Respond with the right slang!',
            steps: [
                {
                    speaker: 'friend',
                    message: "So... Marcus finally texted me back after THREE days. Should I reply?",
                    prompt: "Give your friend dating advice using slang:",
                    options: [
                        { text: "Girl, he ghosted you for 3 days and now expects a reply? That's toxic.", correct: true, feedback: "'Ghosted' = ignored without explanation. 'Toxic' = harmful behavior. Perfect dating slang!" },
                        { text: "Three days without communication is quite disrespectful.", correct: false, feedback: "True, but too formal. Use 'ghosted', 'red flag', or 'toxic' in dating talk." },
                        { text: "Nah, don't text back. That's a major red flag. You deserve better, queen.", correct: true, feedback: "'Red flag' = warning sign. 'Queen' = term of empowerment. Great supportive response!" },
                        { text: "His delayed response merits careful consideration.", correct: false, feedback: "This is a friend chat, not a business memo! Try 'red flag' or 'ghosted'." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "You're right. Ugh, why are all the good ones taken? I just want someone who's not gonna ghost me!",
                    prompt: "Cheer your friend up:",
                    options: [
                        { text: "Your glow up has been insane lately! The right person will come, no cap.", correct: true, feedback: "'Glow up' = positive transformation. 'No cap' = for real. Supportive and slangy!" },
                        { text: "Don't stress. Your vibe attracts your tribe. The right one won't leave you on read.", correct: true, feedback: "'Vibe attracts your tribe' = you attract similar energy. 'Left on read' = seen but not replied to." },
                        { text: "Patience is a virtue in matters of the heart.", correct: false, feedback: "Sounds like a greeting card! Use casual, empowering slang instead." },
                        { text: "Statistical probability suggests a suitable partner exists.", correct: false, feedback: "Are you a robot? 😄 Try 'glow up', 'vibe', or 'no cap' for friend support." }
                    ]
                }
            ]
        },
        // --- UK Slang Scenarios ---
        {
            id: 'uk-pub',
            title: 'After-Work Pub Chat',
            accent: 'uk',
            description: 'You\'re at a pub with British mates after work. Use UK slang naturally!',
            steps: [
                {
                    speaker: 'mate',
                    message: "Alright? How was your day at work then?",
                    prompt: "Tell your mate about your tiring day:",
                    options: [
                        { text: "Absolutely knackered, mate. Been at it since 7am. Could murder a pint.", correct: true, feedback: "'Knackered' = exhausted. 'Could murder a pint' = really want a beer. Classic British pub talk!" },
                        { text: "I am extremely fatigued from today's professional obligations.", correct: false, feedback: "Nobody talks like that in a pub! Try 'knackered', 'shattered', or 'cream crackered'." },
                        { text: "My day was quite tiring, thank you for asking.", correct: false, feedback: "Too polite for mates at a pub! British friends are much more casual." },
                        { text: "Mate, it was proper mental today. Boss had us running around like headless chickens.", correct: true, feedback: "'Proper mental' = really crazy. 'Headless chickens' = running around chaotically. Perfect!" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Tell me about it! Fancy a cheeky Nando's after this pint?",
                    prompt: "Respond about getting food:",
                    options: [
                        { text: "Mate, I'm well up for that. I'm absolutely starving!", correct: true, feedback: "'Well up for that' = very keen. 'Starving' used more casually in British English. Spot on!" },
                        { text: "I would prefer a more upscale dining establishment.", correct: false, feedback: "It's a cheeky Nando's, not fine dining! Be casual with your mates." },
                        { text: "Go on then! Could smash a cheeky chicken right about now.", correct: true, feedback: "'Go on then' = British agreement. 'Smash' = eat enthusiastically. Very natural!" },
                        { text: "Yes, that dining suggestion is acceptable.", correct: false, feedback: "You sound like you're accepting a business proposal! Try 'Go on then' or 'I'm well up for it'." }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Brilliant! Oh, did you hear about Tom? He got the sack last week!",
                    prompt: "React to the news about Tom being fired:",
                    options: [
                        { text: "You're having a laugh! What happened? Gutted for him.", correct: true, feedback: "'Having a laugh' = you must be joking. 'Gutted' = devastated. Perfect British reaction!" },
                        { text: "Oh no, that is unfortunate news about Thomas's employment.", correct: false, feedback: "Way too formal. And no Brit would say the full name 'Thomas' here. Try 'gutted' or 'blimey'." },
                        { text: "Blimey! Poor bloke. Was he proper upset about it?", correct: true, feedback: "'Blimey' = surprise. 'Poor bloke' = poor guy. 'Proper upset' = really upset. Textbook British!" },
                        { text: "That is quite surprising and unfortunate information.", correct: false, feedback: "You sound like a news anchor! Use 'gutted', 'blimey', or 'crikey' for surprise." }
                    ]
                }
            ]
        },
        {
            id: 'uk-flatmate',
            title: 'Flatmate Problems',
            accent: 'uk',
            description: 'Chatting with a friend about your annoying flatmate. Pure British banter!',
            steps: [
                {
                    speaker: 'friend',
                    message: "How's the new flatmate working out then?",
                    prompt: "Complain about your messy flatmate:",
                    options: [
                        { text: "Don't even get me started! He's an absolute muppet. Leaves the kitchen looking like a bomb's hit it.", correct: true, feedback: "'Muppet' = idiot (mild, funny insult). 'Bomb's hit it' = total mess. Classic British complaining!" },
                        { text: "My cohabitant is not meeting the expected standards of cleanliness.", correct: false, feedback: "Nobody says 'cohabitant' in real life! Try 'muppet', 'doing my head in', or 'taking the mick'." },
                        { text: "He's doing my head in, honestly. Proper messy. Can't even be arsed to wash up.", correct: true, feedback: "'Doing my head in' = driving me crazy. 'Can't be arsed' = can't be bothered. Very natural!" },
                        { text: "The living situation is suboptimal at present.", correct: false, feedback: "This is a chat with a mate, not a tenant's complaint form! Keep it casual." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Sounds like a nightmare! Have you had a word with him about it?",
                    prompt: "Explain that you tried talking to him:",
                    options: [
                        { text: "Yeah, I had a word but he just faffed about making excuses. Taking the mick, honestly.", correct: true, feedback: "'Had a word' = talked to him. 'Faffed about' = wasted time. 'Taking the mick' = being disrespectful." },
                        { text: "I attempted to communicate my concerns but he was dismissive.", correct: false, feedback: "Too formal for mate chat! Use 'had a word', 'faffed about', or 'took the mick'." },
                        { text: "I tried but he's not bothered, is he? Just shrugged it off. Cheeky sod.", correct: true, feedback: "'Not bothered' = doesn't care. 'Cheeky sod' = audacious person. Very British!" },
                        { text: "I've expressed my dissatisfaction through proper channels.", correct: false, feedback: "This is your flatmate, not HR! Try being more casual and British." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "What a numpty. You should sort it out before it gets worse, innit?",
                    prompt: "Agree and say what you'll do:",
                    options: [
                        { text: "Yeah, you're right. I'll get it sorted this weekend. Can't be dealing with it anymore.", correct: true, feedback: "'Get it sorted' = fix it. 'Can't be dealing with it' = can't put up with it. Natural!" },
                        { text: "Too right. If he doesn't sort himself out, he can do one.", correct: true, feedback: "'Too right' = absolutely. 'Sort himself out' = fix his behavior. 'Do one' = leave. Proper British!" },
                        { text: "I shall address this matter at the earliest convenience.", correct: false, feedback: "You sound like a solicitor's letter! 'Get it sorted' is the British way." },
                        { text: "I will escalate the issue through appropriate measures.", correct: false, feedback: "Way too corporate! Just say you'll 'get it sorted' or he can 'do one'." }
                    ]
                }
            ]
        },
        {
            id: 'uk-football',
            title: 'Football Match Chat',
            accent: 'uk',
            description: 'Discussing last night\'s football match with a fellow supporter!',
            steps: [
                {
                    speaker: 'mate',
                    message: "Did you watch the match last night? What a game!",
                    prompt: "Share your excitement about the game:",
                    options: [
                        { text: "Mate, it was absolutely mental! That last-minute goal — I nearly lost it!", correct: true, feedback: "'Mental' = crazy/wild. 'Nearly lost it' = almost went crazy with excitement. Spot on!" },
                        { text: "I was buzzing the whole time! When we scored that winner, I went proper ballistic!", correct: true, feedback: "'Buzzing' = excited. 'Proper ballistic' = went absolutely crazy. Football fan perfection!" },
                        { text: "The sporting event was quite entertaining.", correct: false, feedback: "No football fan talks like this! Use 'mental', 'buzzing', or 'cracking match'." },
                        { text: "It was a satisfactory athletic competition.", correct: false, feedback: "Sounds like a school report! Try 'cracking match', 'mental', or 'what a belter'." }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "The ref was shocking though. That penalty decision was well dodgy!",
                    prompt: "Agree about the bad referee:",
                    options: [
                        { text: "Absolute shambles! The ref was having an absolute mare. Needs his eyes testing!", correct: true, feedback: "'Shambles' = disaster. 'Having a mare' = performing terribly. 'Needs his eyes testing' = classic fan complaint!" },
                        { text: "The referee's decisions were questionable throughout.", correct: false, feedback: "Too calm for a football fan! Use 'shambles', 'having a mare', or 'absolutely dire'." },
                        { text: "Don't get me started on that mug. He was absolutely dire. Should be sacked!", correct: true, feedback: "'Mug' = fool. 'Dire' = terrible. 'Sacked' = fired. Full British football fan mode!" },
                        { text: "I believe the officiating could have been better.", correct: false, feedback: "You sound like a pundit on Match of the Day, not a fan at the pub! Be more passionate!" }
                    ]
                }
            ]
        },
        // --- Mixed Accent Scenarios ---
        {
            id: 'mix-travel',
            title: 'American Meets British',
            accent: 'mix',
            description: 'You\'re an American traveling in London. Navigate the language differences!',
            steps: [
                {
                    speaker: 'londoner',
                    message: "Excuse me, the lift is just round the corner if you need to go up. The loo's on the first floor.",
                    prompt: "You need to understand what they said. What are they telling you?",
                    options: [
                        { text: "Thanks! So the elevator is around the corner and the bathroom is on the second floor, right?", correct: true, feedback: "Correct! 'Lift' = elevator. 'Loo' = bathroom. 'First floor' in UK = second floor in US (ground floor is separate)!" },
                        { text: "Thanks! The light is round the corner?", correct: false, feedback: "'Lift' means elevator, not light! And 'loo' means bathroom/restroom." },
                        { text: "Cheers mate! I'll take the elevator... I mean, the lift!", correct: true, feedback: "'Cheers' = thanks. You're adapting! In the UK: lift = elevator, loo = bathroom." },
                        { text: "I don't understand what you're saying.", correct: false, feedback: "Let's learn! 'Lift' = elevator, 'loo' = bathroom/restroom, 'first floor' in UK = second floor in US." }
                    ]
                },
                {
                    speaker: 'londoner',
                    message: "Are you alright? You look a bit lost. Fancy a cuppa? There's a brilliant cafe just there.",
                    prompt: "Respond to their friendly offer:",
                    options: [
                        { text: "I'm fine, thanks! And yeah, I'd love a cup of tea! That sounds awesome!", correct: true, feedback: "'Are you alright?' is a British greeting (not asking if you're hurt). 'Cuppa' = cup of tea. 'Brilliant' = great." },
                        { text: "Why are you asking if I'm alright? Did something happen?", correct: false, feedback: "'You alright?' in British English is just 'How are you?' — it's a greeting, not concern!" },
                        { text: "Cheers! A cuppa would be lovely, actually. Lead the way!", correct: true, feedback: "Perfect! You used 'cheers' (thanks) and 'lovely' (great) — you're going native! 'Cuppa' = tea." },
                        { text: "No thanks, I need to find the restroom first.", correct: false, feedback: "Not wrong, but you missed the cultural moment! 'Are you alright?' just means 'hey, how are you?'" }
                    ]
                }
            ]
        }
    ],

    // === Render Methods ===

    renderScenarioSelector(container) {
        const usScenarios = this.scenarios.filter(s => s.accent === 'us');
        const ukScenarios = this.scenarios.filter(s => s.accent === 'uk');
        const mixScenarios = this.scenarios.filter(s => s.accent === 'mix');

        let html = `
            <div class="chat-intro">
                <h3>Slang Conversation Practice</h3>
                <p>Practice using slang in realistic conversations. Pick a scenario and respond with the right slang!</p>
            </div>
        `;

        html += '<div class="scenario-section"><h4>🇺🇸 American English Scenarios</h4><div class="scenario-grid">';
        usScenarios.forEach(s => {
            html += this._renderScenarioCard(s);
        });
        html += '</div></div>';

        html += '<div class="scenario-section"><h4>🇬🇧 British English Scenarios</h4><div class="scenario-grid">';
        ukScenarios.forEach(s => {
            html += this._renderScenarioCard(s);
        });
        html += '</div></div>';

        html += '<div class="scenario-section"><h4>🌍 Mixed / Cross-Cultural</h4><div class="scenario-grid">';
        mixScenarios.forEach(s => {
            html += this._renderScenarioCard(s);
        });
        html += '</div></div>';

        container.innerHTML = html;

        // Attach click handlers
        container.querySelectorAll('.scenario-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-scenario');
                this.startScenario(id, container);
            });
        });
    },

    _renderScenarioCard(s) {
        const flag = s.accent === 'us' ? '🇺🇸' : s.accent === 'uk' ? '🇬🇧' : '🌍';
        return `
            <div class="scenario-card" data-scenario="${s.id}">
                <div class="scenario-card-flag">${flag}</div>
                <div class="scenario-card-title">${s.title}</div>
                <div class="scenario-card-desc">${s.description}</div>
                <div class="scenario-card-steps">${s.steps.length} exchanges</div>
            </div>
        `;
    },

    startScenario(id, container) {
        this.currentScenario = this.scenarios.find(s => s.id === id);
        if (!this.currentScenario) return;

        this.currentStep = 0;
        this.score = 0;
        this.totalAnswered = 0;
        this.chatHistory = [];

        this._renderChatStep(container);
    },

    _renderChatStep(container) {
        const scenario = this.currentScenario;
        const step = scenario.steps[this.currentStep];
        if (!step) {
            this._renderChatResults(container);
            return;
        }

        const accent = scenario.accent === 'mix' ? 'uk' : scenario.accent;
        const flag = accent === 'uk' ? '🇬🇧' : '🇺🇸';

        let html = `
            <div class="chat-header">
                <button class="chat-back-btn" id="chat-back">← Back</button>
                <div class="chat-title">${flag} ${scenario.title}</div>
                <div class="chat-score">Score: ${this.score}/${this.totalAnswered}</div>
            </div>
            <div class="chat-window">
        `;

        // Render chat history
        this.chatHistory.forEach(msg => {
            html += this._renderChatBubble(msg.speaker, msg.text, msg.isUser);
        });

        // Current message from the other person
        html += this._renderChatBubble('friend', step.message, false);

        html += '</div>'; // close chat-window

        // Prompt and options
        html += `
            <div class="chat-prompt">
                <div class="chat-prompt-text">${step.prompt}</div>
                <button class="chat-listen-btn" data-text="${this._escAttr(step.message)}" data-accent="${accent}" title="Listen to their message">
                    🔊 Listen
                </button>
            </div>
            <div class="chat-options">
        `;

        step.options.forEach((opt, idx) => {
            html += `<button class="chat-option" data-index="${idx}">
                <span class="chat-option-text">${opt.text}</span>
                <button class="chat-option-listen" data-text="${this._escAttr(opt.text)}" data-accent="${accent === 'uk' && scenario.accent === 'mix' ? 'us' : accent}" title="Listen">🔊</button>
            </button>`;
        });

        html += '</div>';

        container.innerHTML = html;

        // Scroll to bottom of chat
        const chatWindow = container.querySelector('.chat-window');
        if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;

        // Attach handlers
        container.querySelector('#chat-back').addEventListener('click', () => {
            this.renderScenarioSelector(container);
        });

        // Listen buttons
        container.querySelectorAll('.chat-listen-btn, .chat-option-listen').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = btn.getAttribute('data-text');
                const acc = btn.getAttribute('data-accent') || accent;
                if (TTS.isAvailable()) {
                    TTS.speakSentence(text, acc);
                }
            });
        });

        // Option selection
        container.querySelectorAll('.chat-option').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;
                const idx = parseInt(btn.getAttribute('data-index'));
                this._handleChatAnswer(idx, container);
            });
        });
    },

    _handleChatAnswer(idx, container) {
        const step = this.currentScenario.steps[this.currentStep];
        const chosen = step.options[idx];
        this.totalAnswered++;

        // Add both messages to history
        this.chatHistory.push({ speaker: 'friend', text: step.message, isUser: false });
        this.chatHistory.push({ speaker: 'you', text: chosen.text, isUser: true });

        if (chosen.correct) this.score++;

        // Disable all options and show feedback
        container.querySelectorAll('.chat-option').forEach((btn, i) => {
            btn.classList.add('disabled');
            if (i === idx) {
                btn.classList.add(chosen.correct ? 'correct' : 'incorrect');
            }
            if (step.options[i].correct && i !== idx) {
                btn.classList.add('correct-answer');
            }
        });

        // Show feedback
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'chat-feedback ' + (chosen.correct ? 'correct' : 'incorrect');
        feedbackEl.innerHTML = `<strong>${chosen.correct ? '✅ Great!' : '❌ Not quite.'}</strong> ${chosen.feedback}`;
        container.querySelector('.chat-options').after(feedbackEl);

        // Show next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'quiz-next-btn';
        nextBtn.textContent = this.currentStep < this.currentScenario.steps.length - 1 ? 'Continue Chat →' : 'See Results';
        feedbackEl.after(nextBtn);

        nextBtn.addEventListener('click', () => {
            this.currentStep++;
            this._renderChatStep(container);
        });
    },

    _renderChatResults(container) {
        const total = this.totalAnswered;
        const pct = total > 0 ? Math.round((this.score / total) * 100) : 0;
        let message, emoji;

        if (pct === 100) { message = "You're a slang master! Native-level chat skills!"; emoji = "🏆"; }
        else if (pct >= 70) { message = "Great slang usage! You'd fit right in!"; emoji = "🔥"; }
        else if (pct >= 40) { message = "Getting there! Practice more scenarios to level up."; emoji = "💪"; }
        else { message = "Keep practicing! Read through the slang section and try again."; emoji = "📚"; }

        container.innerHTML = `
            <div class="quiz-results">
                <div style="font-size:3rem;">${emoji}</div>
                <div class="quiz-results-score">${this.score}/${total}</div>
                <div class="quiz-results-label">${pct}% — Slang Fluency</div>
                <p class="quiz-results-message">${message}</p>
                <div style="margin-top:20px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="quiz-back-btn" id="chat-retry">Try Again</button>
                    <button class="quiz-back-btn" id="chat-new" style="background:var(--text-secondary);">Pick Another Scenario</button>
                </div>
            </div>
        `;

        container.querySelector('#chat-retry').addEventListener('click', () => {
            this.startScenario(this.currentScenario.id, container);
        });

        container.querySelector('#chat-new').addEventListener('click', () => {
            this.renderScenarioSelector(container);
        });
    },

    _renderChatBubble(speaker, text, isUser) {
        return `
            <div class="chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-other'}">
                <div class="chat-bubble-speaker">${isUser ? 'You' : speaker}</div>
                <div class="chat-bubble-text">${text}</div>
            </div>
        `;
    },

    _escAttr(str) {
        if (!str) return '';
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
};
