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
        // --- NEW US Scenarios ---
        {
            id: 'us-roadtrip',
            title: 'Road Trip Plans',
            accent: 'us',
            description: 'Planning an epic road trip with your bestie. Use casual American English!',
            steps: [
                {
                    speaker: 'bestie',
                    message: "Dude, spring break is coming up. We NEED to do a road trip.",
                    prompt: "Agree enthusiastically about the trip:",
                    options: [
                        { text: "I'm so down! Let's send it. Where should we hit up?", correct: true, feedback: "'I'm down' = I'm in. 'Send it' = go for it/do it. 'Hit up' = visit. Natural excitement!" },
                        { text: "That would be a lovely vacation opportunity.", correct: false, feedback: "Too formal! Your bestie is hyped — match their energy with 'I'm down' or 'let's go!'" },
                        { text: "I concur, a vehicular excursion would be delightful.", correct: false, feedback: "Are you a Victorian gentleman? Try 'I'm so down' or 'that sounds fire!'" },
                        { text: "Ugh, finally! I've been cooped up for ages. Let's do it!", correct: true, feedback: "'Cooped up' = stuck inside. 'Let's do it' = enthusiastic agreement. Great!" }
                    ]
                },
                {
                    speaker: 'bestie',
                    message: "What if we drive down the coast? I heard this one beach town is super underrated.",
                    prompt: "React to the suggestion:",
                    options: [
                        { text: "Ooh, a hidden gem? I'm about it. Low-key that sounds perfect.", correct: true, feedback: "'Hidden gem' = undiscovered great place. 'I'm about it' = I like it. 'Low-key' = somewhat/secretly." },
                        { text: "The coastal route would be a reasonable choice.", correct: false, feedback: "Reasonable? You're planning a fun trip, not a business route! Try 'I'm about it' or 'sounds fire.'" },
                        { text: "Yesss! Beach vibes all the way. Plus the drive would be scenic af.", correct: true, feedback: "'Vibes' = atmosphere/feeling. 'AF' = as f*** (very). 'Scenic' used casually. Perfect road trip energy!" },
                        { text: "I have no strong preference regarding the destination.", correct: false, feedback: "Way too neutral! Show some excitement — 'I'm about it!' or 'that sounds fire!'" }
                    ]
                },
                {
                    speaker: 'bestie',
                    message: "I already found this sick Airbnb right on the water. It's only like $80 a night split.",
                    prompt: "React to the deal:",
                    options: [
                        { text: "Bro, that's a steal! Book it before someone snags it.", correct: true, feedback: "'A steal' = great deal. 'Snags it' = takes it. Showing urgency — great!" },
                        { text: "No cap? That's insanely cheap. We're literally winning.", correct: true, feedback: "'No cap' = really? 'Insanely cheap' = very affordable. 'We're winning' = things are going our way!" },
                        { text: "The pricing seems reasonable for the accommodation.", correct: false, feedback: "Sounds like a hotel review! Try 'that's a steal' or 'no cap that's cheap!'" },
                        { text: "I shall review the listing before committing.", correct: false, feedback: "You're on a group chat, not signing a lease! Be casual." }
                    ]
                },
                {
                    speaker: 'bestie',
                    message: "Bet! I'll book it rn. This trip is gonna be legendary.",
                    prompt: "Hype up the trip:",
                    options: [
                        { text: "LETS GOOOO! I'm already packing. This is gonna hit different.", correct: true, feedback: "'LET'S GO' = pure excitement. 'Hit different' = be uniquely special. Maximum hype!" },
                        { text: "I anticipate it will be an enjoyable excursion.", correct: false, feedback: "Your friend said 'legendary' and you said 'enjoyable excursion'?! Match the energy!" },
                        { text: "Can't wait! About to start a countdown. Main character energy this spring break!", correct: true, feedback: "'Main character energy' = living your best life. 'Countdown' = excited anticipation. Perfect!" },
                        { text: "Acknowledged. I look forward to the journey.", correct: false, feedback: "Sounds like a robot! Try 'LET'S GO' or 'this is gonna be fire!'" }
                    ]
                }
            ]
        },
        {
            id: 'us-gym',
            title: 'Gym Bro Talk',
            accent: 'us',
            description: 'Working out with a buddy. Master casual gym and fitness slang!',
            steps: [
                {
                    speaker: 'gym buddy',
                    message: "Bro, you've been putting in work! Looking jacked lately.",
                    prompt: "Respond to the compliment humbly:",
                    options: [
                        { text: "Thanks, man! Been grinding for like 6 months straight. Finally seeing gains.", correct: true, feedback: "'Grinding' = working hard consistently. 'Gains' = muscle growth/progress. Classic gym talk!" },
                        { text: "I appreciate the observation regarding my physical development.", correct: false, feedback: "Nobody at the gym talks like that! Say 'thanks bro' and mention your 'gains.'" },
                        { text: "Nah bro, I still got a long way to go. But I appreciate the hype!", correct: true, feedback: "'Long way to go' = much more to achieve. 'Appreciate the hype' = thanks for the encouragement. Humble and natural!" },
                        { text: "My exercise routine has produced satisfactory results.", correct: false, feedback: "Way too clinical. Try 'grinding' or talk about your 'gains.'" }
                    ]
                },
                {
                    speaker: 'gym buddy',
                    message: "Wanna hit legs today? I've been skipping leg day and it's showing lol.",
                    prompt: "Agree to a leg workout:",
                    options: [
                        { text: "Let's get it! Never skip leg day. We're going heavy today.", correct: true, feedback: "'Let's get it' = let's do this. 'Never skip leg day' = gym commandment. 'Going heavy' = lifting heavy weights." },
                        { text: "I would be amenable to a lower body workout.", correct: false, feedback: "This is a gym, not a doctor's office! Say 'let's get it' or 'I'm down.'" },
                        { text: "Bro, say less. Squats and deadlifts — let's go beast mode.", correct: true, feedback: "'Say less' = I'm in. 'Beast mode' = intense workout mode. Perfectly motivating!" },
                        { text: "I'll consider the proposition after further reflection.", correct: false, feedback: "Your gym buddy's waiting by the squat rack! Just say 'let's get it!'" }
                    ]
                },
                {
                    speaker: 'gym buddy',
                    message: "That last set was brutal! I'm gassed. One more?",
                    prompt: "Push through the last set:",
                    options: [
                        { text: "No excuses, bro! One more and we're out. Let's finish strong.", correct: true, feedback: "'No excuses' = keep going. 'We're out' = we'll leave after. 'Finish strong' = end well. Great motivation!" },
                        { text: "Come on! We didn't come here to be average. Embrace the suck!", correct: true, feedback: "'Embrace the suck' = push through the pain. 'Didn't come here to be average' = classic gym motivation!" },
                        { text: "I believe we should cease physical activity for today.", correct: false, feedback: "Quitter talk! 😄 Try 'let's finish strong' or 'one more, we got this!'" },
                        { text: "Perhaps we should consider our physical limitations.", correct: false, feedback: "Your gym bro needs a hype man, not a disclaimer! Push through together." }
                    ]
                }
            ]
        },
        {
            id: 'us-gaming',
            title: 'Online Gaming Session',
            accent: 'us',
            description: 'Voice chatting while gaming with the squad. Learn gaming slang!',
            steps: [
                {
                    speaker: 'teammate',
                    message: "Yo, hop in the party. We need a fourth for ranked.",
                    prompt: "Join the gaming session:",
                    options: [
                        { text: "Gimme two secs, loading in now. What rank are we at?", correct: true, feedback: "'Gimme two secs' = give me a moment. 'Loading in' = joining the game. Natural gaming entry!" },
                        { text: "I shall connect to the gaming session momentarily.", correct: false, feedback: "Nobody on voice chat talks like that! Try 'loading in' or 'hopping on now.'" },
                        { text: "On my way! Let's run it. I've been warming up all day.", correct: true, feedback: "'Run it' = let's play. 'Warming up' = practicing beforehand. Showing you're ready!" },
                        { text: "I accept your invitation to participate in ranked competition.", correct: false, feedback: "This is a chill gaming sesh, not an RSVP! Just say 'on my way' or 'hopping on.'" }
                    ]
                },
                {
                    speaker: 'teammate',
                    message: "Watch out! Enemy on your left — HE'S ONE HIT!",
                    prompt: "React in the heat of gameplay:",
                    options: [
                        { text: "Got him! That was a clutch play. Easy clap.", correct: true, feedback: "'Clutch' = great play under pressure. 'Easy clap' = easy win/kill. Classic gaming callout!" },
                        { text: "I successfully eliminated the opposing player.", correct: false, feedback: "Mid-game comms need to be fast! Try 'got him!' or 'he's down!'" },
                        { text: "He's down! Nice callout bro. That was clean.", correct: true, feedback: "'He's down' = enemy eliminated. 'Callout' = information shared. 'Clean' = skillful play." },
                        { text: "The adversary has been neutralized.", correct: false, feedback: "You're playing a game, not running a military operation! Keep it casual." }
                    ]
                },
                {
                    speaker: 'teammate',
                    message: "Dude, you're going OFF today! Hard carry for real.",
                    prompt: "Respond to the compliment:",
                    options: [
                        { text: "I'm in the zone today! The lobbies are kinda bot-y though ngl.", correct: true, feedback: "'In the zone' = playing well. 'Bot-y' = easy opponents. 'Ngl' = not gonna lie. Humble brag!" },
                        { text: "GGs only today. We're built different. Let's keep it rolling.", correct: true, feedback: "'GGs only' = good games. 'Built different' = superior. 'Keep it rolling' = continue playing well." },
                        { text: "My performance metrics are above average today.", correct: false, feedback: "Lol nobody talks like a stats sheet! Say 'I'm in the zone' or 'GGs only.'" },
                        { text: "Thank you for acknowledging my gameplay contributions.", correct: false, feedback: "Sounds like a LinkedIn post! Just say 'GGs' or 'I'm cracked today.'" }
                    ]
                },
                {
                    speaker: 'teammate',
                    message: "Alright that's a dub! GG everyone. Same time tomorrow?",
                    prompt: "Wrap up the session:",
                    options: [
                        { text: "GG! Yeah I'm down, same time works. Good sesh everyone.", correct: true, feedback: "'GG' = good game. 'Sesh' = session. 'I'm down' = I'm available. Perfect sign-off!" },
                        { text: "That was fire! Absolutely. We're on a heater — can't stop now.", correct: true, feedback: "'On a heater' = winning streak. 'Can't stop now' = momentum. Confident and fun!" },
                        { text: "The gaming session has concluded satisfactorily.", correct: false, feedback: "Game over but your vocab is still in formal mode! 'GG' is all you need." },
                        { text: "I will evaluate my schedule and confirm participation.", correct: false, feedback: "It's a gaming group, not a board meeting! Just say 'yeah I'm down.'" }
                    ]
                }
            ]
        },
        // --- NEW UK Scenarios ---
        {
            id: 'uk-nightout',
            title: 'Night Out Plans',
            accent: 'uk',
            description: 'Planning a Saturday night out with your British mates. Proper banter!',
            steps: [
                {
                    speaker: 'mate',
                    message: "Right, what's the plan for tonight then? Fancy going out?",
                    prompt: "Suggest going out:",
                    options: [
                        { text: "Yeah, I'm well up for it! Shall we start at the pub then head into town?", correct: true, feedback: "'Well up for it' = very keen. 'Head into town' = go to the city center. Classic night out plan!" },
                        { text: "I would like to participate in evening social activities.", correct: false, feedback: "You sound like a social calendar! Try 'I'm up for it' or 'let's have it!'" },
                        { text: "Go on then! Pre-drinks at mine first? I've got some beers in the fridge.", correct: true, feedback: "'Go on then' = British agreement. 'Pre-drinks at mine' = drinks at my place first. Standard UK pre-game!" },
                        { text: "I shall consider the proposition carefully.", correct: false, feedback: "Your mates will go without you! Say 'I'm up for it' or 'go on then!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Lovely! I'll text the group. Should we get a taxi or just walk it?",
                    prompt: "Decide how to get there:",
                    options: [
                        { text: "Let's walk it — it's not far and we can save a few quid for drinks.", correct: true, feedback: "'Walk it' = walk there. 'Quid' = pounds (money). Practical and casual!" },
                        { text: "Can't be arsed walking if it's cold though. Let's split an Uber, innit?", correct: true, feedback: "'Can't be arsed' = can't be bothered. 'Split' = share the cost. 'Innit' = right? Very natural!" },
                        { text: "I believe pedestrian transportation would be the optimal choice.", correct: false, feedback: "Nobody says that! Just say 'let's walk it' or 'get a taxi.'" },
                        { text: "The mode of transport is inconsequential.", correct: false, feedback: "You're going on a night out, not writing an essay! Keep it casual." }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Class! Oh, have you heard? That new club on the high street is apparently banging.",
                    prompt: "React to the club suggestion:",
                    options: [
                        { text: "Oh mint! Let's check it out then. As long as we don't have to queue for ages.", correct: true, feedback: "'Mint' = excellent. 'Check it out' = try it. 'Queue for ages' = wait in line for a long time." },
                        { text: "I've heard it's class! Proper good tunes apparently. Let's give it a go!", correct: true, feedback: "'Class' = great. 'Proper good tunes' = really good music. 'Give it a go' = try it. Spot on!" },
                        { text: "The establishment sounds like it meets acceptable standards.", correct: false, feedback: "It's a club, not a health inspection! Say 'sounds mint' or 'let's give it a go!'" },
                        { text: "I am open to exploring the new nightlife venue.", correct: false, feedback: "Too posh for a night out with mates! Try 'mint' or 'sounds banging!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Sorted! Right, I'm gonna start getting ready. Pick you up at 9?",
                    prompt: "Confirm the plan:",
                    options: [
                        { text: "Lovely stuff! See you at 9. It's gonna be a proper good night.", correct: true, feedback: "'Lovely stuff' = great. 'Proper good night' = really good evening. Perfect confirmation!" },
                        { text: "Cushty! I'll be ready. Don't be late though, you muppet.", correct: true, feedback: "'Cushty' = great/fine. 'Muppet' = playful insult (idiot). Friendly banter!" },
                        { text: "Confirmed. I will prepare for the evening.", correct: false, feedback: "This is a text to your mate, not a military briefing! Try 'sorted' or 'see you at 9!'" },
                        { text: "I acknowledge the proposed schedule.", correct: false, feedback: "You sound like a robot secretary! Say 'sorted!' or 'lovely stuff!'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-sundayroast',
            title: 'Sunday Roast',
            accent: 'uk',
            description: 'Having a traditional Sunday roast at your nan\'s. Family banter and food chat!',
            steps: [
                {
                    speaker: 'nan',
                    message: "Come in, love! Dinner's nearly ready. Your uncle Dave's already here — he's been at the biscuit tin already!",
                    prompt: "Greet your nan:",
                    options: [
                        { text: "Alright, Nan! Smells brilliant in here. Uncle Dave never changes, does he?", correct: true, feedback: "'Alright' = greeting. 'Smells brilliant' = smells great. Warm family greeting!" },
                        { text: "Hello, grandmother. The aroma is most pleasing.", correct: false, feedback: "Nobody talks to their nan like that! Keep it warm and casual." },
                        { text: "Hiya, Nan! I'm starving. Been looking forward to this all week, honestly.", correct: true, feedback: "'Hiya' = hello (informal). 'Starving' = very hungry. Shows excitement for nan's cooking!" },
                        { text: "Greetings. I appreciate the culinary effort.", correct: false, feedback: "Your nan would give you a look! Just say 'hiya nan' and tell her you're hungry." }
                    ]
                },
                {
                    speaker: 'uncle',
                    message: "Oi oi! Here's trouble. How's work going then? Still at that dodgy office?",
                    prompt: "Banter back with your uncle:",
                    options: [
                        { text: "Cheeky! It's not dodgy, it's just... character building. Could be worse!", correct: true, feedback: "'Cheeky' = playfully rude. 'Character building' = British way of saying it's tough. 'Could be worse' = classic British understatement!" },
                        { text: "My professional life is proceeding adequately, thank you.", correct: false, feedback: "Uncle Dave wants banter, not a LinkedIn update! Give it some cheek." },
                        { text: "Yeah yeah, says the bloke who's been 'between jobs' for a year! How's the sofa treating ya?", correct: true, feedback: "'Between jobs' = unemployed (polite way). 'How's the sofa' = teasing about being lazy. Proper family banter!" },
                        { text: "Employment continues as expected.", correct: false, feedback: "Boring! Your uncle's winding you up — fire back with some banter!" }
                    ]
                },
                {
                    speaker: 'nan',
                    message: "Right, grub's up! Get it while it's hot. There's plenty of everything so don't be shy.",
                    prompt: "Compliment the food:",
                    options: [
                        { text: "Nan, this looks absolutely mint! Your Yorkshire puddings are always proper banging.", correct: true, feedback: "'Mint' = excellent. 'Proper banging' = really great. Complimenting nan's Yorkshires — she'll love it!" },
                        { text: "The presentation of this meal is commendable.", correct: false, feedback: "It's Sunday dinner at nan's, not MasterChef! Just say it looks 'brilliant' or 'mint.'" },
                        { text: "Looks gorgeous, Nan! You've smashed it as usual. Best roast in the country.", correct: true, feedback: "'Gorgeous' = looks amazing. 'Smashed it' = done an excellent job. Maximum nan-pleasing!" },
                        { text: "The food appears nutritionally adequate.", correct: false, feedback: "Your nan would clip you round the ear! Compliment her cooking properly." }
                    ]
                },
                {
                    speaker: 'uncle',
                    message: "Blimey, I'm absolutely stuffed. Couldn't eat another thing. Well, maybe a bit of pudding...",
                    prompt: "Agree about being full:",
                    options: [
                        { text: "Same! I'm well full but there's always room for pudding. What've you got, Nan?", correct: true, feedback: "'Well full' = very full. 'Always room for pudding' = universal British rule. Perfect!" },
                        { text: "I have reached maximum food capacity but dessert protocol overrides.", correct: false, feedback: "You sound like a computer! Just say 'I'm stuffed but I'll have pudding!'" },
                        { text: "Absolutely stuffed an' all! But I'd be daft to say no to Nan's apple crumble.", correct: true, feedback: "'Stuffed an' all' = very full too. 'Daft' = silly/crazy. Apple crumble = classic British pud!" },
                        { text: "I am sufficiently satiated, thank you.", correct: false, feedback: "Nobody at Sunday dinner says 'satiated!' Say you're 'stuffed' and ask about pudding." }
                    ]
                }
            ]
        },
        {
            id: 'uk-train',
            title: 'Train Delay Rant',
            accent: 'uk',
            description: 'British trains are late again. Complain like a proper Brit!',
            steps: [
                {
                    speaker: 'stranger',
                    message: "Delayed again?! This is the third time this week. Absolute joke.",
                    prompt: "Bond with a fellow frustrated commuter:",
                    options: [
                        { text: "Tell me about it. This lot are having a laugh. Twenty quid for THIS service?", correct: true, feedback: "'Tell me about it' = I totally agree. 'Having a laugh' = must be joking. 'Quid' = pounds. Classic commuter rant!" },
                        { text: "I share your frustration regarding the public transport infrastructure.", correct: false, feedback: "Way too formal for bonding over train delays! Brits bond through shared complaining." },
                        { text: "Mate, it's absolutely mental. Every single day. What are we paying for?", correct: true, feedback: "'Mate' = stranger bonding. 'Mental' = crazy. 'What are we paying for' = rhetorical frustration. Perfect!" },
                        { text: "Delays are a statistical inevitability in any transport system.", correct: false, feedback: "No! You're supposed to COMPLAIN, not rationalize! That's the British way." }
                    ]
                },
                {
                    speaker: 'stranger',
                    message: "And they've got the cheek to put the prices up every year. It's a right con.",
                    prompt: "Continue the shared rant:",
                    options: [
                        { text: "It's a shambles, innit? Other countries have proper trains. We're stuck in the dark ages.", correct: true, feedback: "'Shambles' = mess/disaster. 'Dark ages' = behind the times. Peak British transport complaining!" },
                        { text: "Too right! Daylight robbery, that's what it is. They should be ashamed.", correct: true, feedback: "'Daylight robbery' = overcharging blatantly. Classic British expression for being ripped off!" },
                        { text: "The pricing model could benefit from optimization.", correct: false, feedback: "You sound like a management consultant! Just say it's 'daylight robbery' or 'a right con.'" },
                        { text: "I accept the fare increase as a necessary adjustment.", correct: false, feedback: "Traitor! 😄 No Brit accepts fare increases quietly. COMPLAIN!" }
                    ]
                },
                {
                    speaker: 'stranger',
                    message: "Oh brilliant, now they're saying it's cancelled. Might as well walk at this rate.",
                    prompt: "React to the cancellation:",
                    options: [
                        { text: "Oh for crying out loud! Right, I'm getting an Uber. Can't be dealing with this.", correct: true, feedback: "'For crying out loud' = frustration. 'Can't be dealing with this' = I've had enough. Natural escalation!" },
                        { text: "Brilliant. Just brilliant. And they wonder why everyone drives. This country, honestly.", correct: true, feedback: "Using 'brilliant' sarcastically = peak British humor. 'This country, honestly' = quintessential exasperation!" },
                        { text: "I shall seek alternative transportation arrangements.", correct: false, feedback: "Too calm for a cancelled train! Show some British indignation!" },
                        { text: "The cancellation is understandable given operational challenges.", correct: false, feedback: "Are you secretly working for the train company?! Get properly annoyed!" }
                    ]
                }
            ]
        },
        // --- NEW Mixed Scenarios ---
        {
            id: 'mix-firstday',
            title: 'First Day at Work',
            accent: 'mix',
            description: 'Navigating your first day at a new job. Professional but friendly!',
            steps: [
                {
                    speaker: 'colleague',
                    message: "Hey! You must be the new hire. Welcome to the team! I'm Alex.",
                    prompt: "Introduce yourself casually:",
                    options: [
                        { text: "Hey Alex! Yeah, first day! I'm super excited to be here. Nice to meet you!", correct: true, feedback: "'Super excited' = very enthusiastic. 'Nice to meet you' = standard but warm. Great first impression!" },
                        { text: "Greetings, fellow employee. I am the recently onboarded staff member.", correct: false, feedback: "You sound like a robot! Be warm and natural — 'hey' and 'nice to meet you' work perfectly." },
                        { text: "Hi! Yep, that's me! Bit nervous honestly, but everyone seems really sound so far.", correct: true, feedback: "'Bit nervous' = slightly anxious (relatable). 'Sound' = nice/good (Irish/UK). Honest and likeable!" },
                        { text: "I am present as required for commencement of employment.", correct: false, feedback: "You're meeting a colleague, not filing paperwork! Be friendly and casual." }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "Don't worry, everyone's really chill here. Want me to show you where everything is?",
                    prompt: "Accept their help gratefully:",
                    options: [
                        { text: "That would be amazing, thanks! I'm still getting my bearings. Lead the way!", correct: true, feedback: "'Getting my bearings' = figuring out where things are. 'Lead the way' = you go first. Friendly and grateful!" },
                        { text: "Please proceed with the facility orientation at your convenience.", correct: false, feedback: "You're talking to a colleague, not writing an email! Say 'that'd be great, thanks!'" },
                        { text: "Yes please! Honestly I'd probably get lost trying to find the kitchen on my own haha.", correct: true, feedback: "Self-deprecating humor = great way to bond. 'Haha' softens it. Perfect first-day energy!" },
                        { text: "I am capable of independent navigation.", correct: false, feedback: "Turning down help on your first day? Accept it gracefully!" }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "Here's the kitchen — most important room! The coffee machine is a lifesaver. Friday afternoon people usually bring in treats.",
                    prompt: "Show you're fitting in:",
                    options: [
                        { text: "Good to know! I basically run on caffeine so the coffee machine is key. Friday treats sound amazing too!", correct: true, feedback: "'Run on caffeine' = need coffee to function. 'Key' = essential. Showing personality!" },
                        { text: "I am a responsible adult who does not require stimulants.", correct: false, feedback: "Way too serious! Everyone jokes about needing coffee at work. Join in!" },
                        { text: "Oh nice! I'll definitely be living by that coffee machine. And I'm totally bringing brownies next Friday, heads up!", correct: true, feedback: "'Living by' = using constantly. 'Heads up' = advance notice. Already planning to contribute — great attitude!" },
                        { text: "I will familiarize myself with the kitchen appliances and communal food protocol.", correct: false, feedback: "Lighten up! It's a casual chat about coffee and snacks, not a policy briefing." }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "You're gonna fit right in! If you need anything, don't hesitate to ask. We usually grab lunch together around noon too.",
                    prompt: "Accept the lunch invite:",
                    options: [
                        { text: "I'd love that! Thanks for being so welcoming, seriously. You've made this way less nerve-wracking.", correct: true, feedback: "'Way less nerve-wracking' = much less stressful. Genuine gratitude always lands well!" },
                        { text: "Sounds great! I'm always down for lunch. Count me in. And thanks, Alex — you're a legend.", correct: true, feedback: "'Down for' = interested in. 'Count me in' = include me. 'Legend' = awesome person. Nailed it!" },
                        { text: "I will assess whether the lunch opportunity aligns with my dietary schedule.", correct: false, feedback: "Just say yes! 'I'm down' or 'count me in' — don't overcomplicate a lunch invite." },
                        { text: "Your offer has been noted and will be evaluated.", correct: false, feedback: "You sound like a spam filter! Just say 'sounds great, count me in!'" }
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
