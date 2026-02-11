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
        },
        // --- NEW US Scenarios (Batch 2) ---
        {
            id: 'us-thanksgiving',
            title: 'Thanksgiving Dinner',
            accent: 'us',
            description: 'You\'re at a family Thanksgiving dinner. Navigate the food, football, and family drama!',
            steps: [
                {
                    speaker: 'mom',
                    message: "Honey, can you set the table? Everyone's gonna be here in like twenty minutes and I'm swamped.",
                    prompt: "Agree to help your mom out:",
                    options: [
                        { text: "I got you, Mom! I'll knock it out real quick. Want me to grab the fancy plates?", correct: true, feedback: "'I got you' = I'll handle it. 'Knock it out' = do it quickly. Helpful and casual!" },
                        { text: "I shall attend to the table arrangement posthaste.", correct: false, feedback: "Nobody talks to their mom like that! Try 'I got you' or 'on it!'" },
                        { text: "On it! No worries. Should I put out the good china or nah?", correct: true, feedback: "'On it' = I'll do it now. 'Or nah' = or not. Casual and helpful!" },
                        { text: "I will comply with your request regarding table preparation.", correct: false, feedback: "You're talking to your mom, not a drill sergeant! Be casual." }
                    ]
                },
                {
                    speaker: 'uncle',
                    message: "Hey kiddo! Long time no see. So what's the deal — you still doing that computer thing?",
                    prompt: "Handle your uncle's awkward question about your job:",
                    options: [
                        { text: "Haha, yeah, still grinding away at the 'computer thing.' It's going solid though, can't complain!", correct: true, feedback: "'Grinding away' = working hard. 'Going solid' = going well. 'Can't complain' = things are fine. Classic deflection!" },
                        { text: "My career in software engineering is progressing according to plan.", correct: false, feedback: "Way too corporate for Thanksgiving small talk! Keep it light and casual." },
                        { text: "Yep, still at it! Keeping busy, you know how it is. How about you — still retired and loving it?", correct: true, feedback: "'Still at it' = still doing it. 'You know how it is' = relatable deflection. Redirecting is smart!" },
                        { text: "I'd prefer not to discuss my employment status at this time.", correct: false, feedback: "That'll make Thanksgiving super awkward! Just keep it breezy." }
                    ]
                },
                {
                    speaker: 'cousin',
                    message: "Dude, have you tried Grandma's mac and cheese yet? I'm about to go back for thirds.",
                    prompt: "Rave about the food:",
                    options: [
                        { text: "Bro, it's fire! Grandma went OFF this year. I'm stuffed but I might get more too.", correct: true, feedback: "'Fire' = amazing. 'Went off' = did an incredible job. 'Stuffed' = very full. Perfect food praise!" },
                        { text: "The macaroni and cheese is of exceptional quality.", correct: false, feedback: "You're at Thanksgiving, not a restaurant review! Say it's 'fire' or 'bussin'!" },
                        { text: "It's bussin, no cap! Grandma doesn't miss. I'm literally in a food coma already.", correct: true, feedback: "'Bussin' = delicious. 'Doesn't miss' = always delivers. 'Food coma' = sleepy from eating. On point!" },
                        { text: "I found it to be an adequate side dish.", correct: false, feedback: "Adequate?! It's Grandma's mac and cheese! Show some love — 'bussin' or 'fire'!" }
                    ]
                },
                {
                    speaker: 'dad',
                    message: "Alright, who wants to watch the game? Cowboys are playing and I'm telling you, this is their year.",
                    prompt: "React to your dad's football optimism:",
                    options: [
                        { text: "Dad, you say that every year! But yeah, I'm down to watch. Pass me the remote.", correct: true, feedback: "'You say that every year' = playful teasing. 'I'm down' = I'm in. Classic father-child banter!" },
                        { text: "I would like to observe the athletic competition as well.", correct: false, feedback: "Nobody talks like that on Thanksgiving! Just say 'I'm down' or 'let's watch!'" },
                        { text: "Their year? Lol, okay Dad. But sure, let's watch — I call dibs on the recliner!", correct: true, feedback: "'Lol okay' = playful skepticism. 'Dibs' = claiming something first. 'Recliner' = the good seat. Fun!" },
                        { text: "I have no preference regarding televised sports viewing.", correct: false, feedback: "It's Thanksgiving — you watch the game! Just join in and tease your dad." }
                    ]
                }
            ]
        },
        {
            id: 'us-superbowl',
            title: 'Super Bowl Watch Party',
            accent: 'us',
            description: 'You\'re at a Super Bowl party with friends. Wings, dips, and game-day energy!',
            steps: [
                {
                    speaker: 'host',
                    message: "Yo, welcome! Grab a plate. We got wings, sliders, and like four different dips. Game starts in ten.",
                    prompt: "Get hyped about the party:",
                    options: [
                        { text: "Dude, you went all out! This spread is insane. I'm loading up before kickoff.", correct: true, feedback: "'Went all out' = put in maximum effort. 'Spread' = food layout. 'Loading up' = getting lots of food. Party vibes!" },
                        { text: "The culinary offerings appear satisfactory for the occasion.", correct: false, feedback: "It's a Super Bowl party, not a catering review! Say the spread is 'insane' or 'fire'!" },
                        { text: "Let's gooo! This setup is fire. You're the real MVP for hosting.", correct: true, feedback: "'This setup is fire' = looks amazing. 'Real MVP' = most valuable player/best person. Perfect compliment!" },
                        { text: "I appreciate the invitation and the available refreshments.", correct: false, feedback: "Way too formal! Match the party energy — 'let's go' and 'this is fire!'" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "NOOO! How did he drop that?! That was a wide-open catch! I can't with this team right now.",
                    prompt: "React to the bad play:",
                    options: [
                        { text: "Bro, that was brutal! Dude had butterfingers. They're totally choking right now.", correct: true, feedback: "'Butterfingers' = can't catch. 'Choking' = failing under pressure. Classic sports frustration!" },
                        { text: "The receiver's failure to secure the pass was indeed unfortunate.", correct: false, feedback: "You sound like a commentator robot! Say 'butterfingers' or 'he choked!'" },
                        { text: "That's a wrap. They're cooked. Might as well start watching the halftime show early.", correct: true, feedback: "'That's a wrap' = it's over. 'They're cooked' = they're done/finished. Dramatic sports fan energy!" },
                        { text: "Statistical errors are an inherent part of athletic competition.", correct: false, feedback: "Nobody wants to hear stats when their team is losing! React emotionally!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "TOUCHDOWN! LET'S GOOO! DID YOU SEE THAT PLAY?! That was LEGENDARY!",
                    prompt: "Match the excitement:",
                    options: [
                        { text: "NO WAY! That play was absolutely NUTS! They just turned this whole game around!", correct: true, feedback: "'Absolutely nuts' = incredibly amazing. 'Turned it around' = changed the momentum. Maximum hype!" },
                        { text: "I'm DEAD! That was the sickest play I've ever seen! We're back, baby!", correct: true, feedback: "'I'm dead' = can't believe it. 'Sickest' = most amazing. 'We're back' = team is winning again!" },
                        { text: "Indeed, the scoring play was quite impressive.", correct: false, feedback: "Your friend is screaming and you're calm?! Match the energy — 'LET'S GO!'" },
                        { text: "A satisfactory outcome for the offensive drive.", correct: false, feedback: "It's a Super Bowl touchdown! Scream 'LET'S GO' like everyone else!" }
                    ]
                }
            ]
        },
        {
            id: 'us-college',
            title: 'College Dorm Life',
            accent: 'us',
            description: 'Freshman year in the dorms. Navigate roommate life, classes, and campus culture!',
            steps: [
                {
                    speaker: 'roommate',
                    message: "Bro, I just pulled an all-nighter for that chem exam and I still feel like I'm gonna bomb it.",
                    prompt: "Sympathize with your roommate:",
                    options: [
                        { text: "That's rough, dude. All-nighters are brutal. I'm sure you'll do better than you think though.", correct: true, feedback: "'That's rough' = that's tough. 'All-nighters are brutal' = staying up all night is hard. Supportive!" },
                        { text: "I empathize with your academic predicament.", correct: false, feedback: "Nobody in a dorm talks like that! Say 'that's rough' or 'been there, man.'" },
                        { text: "Dude, same. That class is no joke. But hey, C's get degrees, right?", correct: true, feedback: "'No joke' = very difficult. 'C's get degrees' = passing is passing. Classic college humor!" },
                        { text: "Perhaps you should have commenced studying earlier.", correct: false, feedback: "Not helpful and way too formal! Be a supportive roommate, not a professor." }
                    ]
                },
                {
                    speaker: 'roommate',
                    message: "Anyway, some people on our floor are hitting up this house party tonight. You down?",
                    prompt: "Decide about the party:",
                    options: [
                        { text: "I'm so down! I need to blow off some steam after this week. Where's it at?", correct: true, feedback: "'I'm down' = I'm in. 'Blow off steam' = relieve stress. 'Where's it at' = where is it. Natural!" },
                        { text: "I would need to evaluate whether social activities align with my schedule.", correct: false, feedback: "You're in college, not a board meeting! Just say 'I'm down' or 'let's go!'" },
                        { text: "Bet! I've been cooped up in this dorm all week. Let me get ready real quick.", correct: true, feedback: "'Bet' = sounds good. 'Cooped up' = stuck inside. 'Real quick' = quickly. Perfect dorm talk!" },
                        { text: "I shall deliberate on the matter and provide my response.", correct: false, feedback: "Your roommate will leave without you! Just say 'bet' or 'I'm down!'" }
                    ]
                },
                {
                    speaker: 'floormate',
                    message: "Hey, are you guys going to the dining hall? The food is actually decent today — they've got a taco bar.",
                    prompt: "React to the food news:",
                    options: [
                        { text: "Say less! Taco bar goes hard. I've been living off ramen all week, I need real food.", correct: true, feedback: "'Say less' = I'm in. 'Goes hard' = is really good. 'Living off ramen' = classic broke college student life!" },
                        { text: "I shall partake in the dining facility offerings.", correct: false, feedback: "Nobody in college talks like that! Say 'I'm down' or 'say less!'" },
                        { text: "Yo, for real? Let's go! The dining hall food is usually mid but I'll take a W where I can get one.", correct: true, feedback: "'Mid' = mediocre. 'Take a W' = accept a win. Realistic college attitude toward dining hall food!" },
                        { text: "The nutritional offerings sound adequate.", correct: false, feedback: "It's a taco bar, not a nutrition report! Be excited — 'let's go!'" }
                    ]
                },
                {
                    speaker: 'roommate',
                    message: "Ugh, my 8am got moved to a building across campus. Who even schedules these things?",
                    prompt: "Commiserate about early classes:",
                    options: [
                        { text: "That's an L, dude. 8ams should be illegal. No way I'd make it on time.", correct: true, feedback: "'That's an L' = that's a loss/bad thing. '8ams should be illegal' = hyperbolic college humor. Relatable!" },
                        { text: "The scheduling department has made a regrettable decision.", correct: false, feedback: "Too formal! College students say 'that's an L' or 'that's trash.'" },
                        { text: "RIP. That's a fat commute. I would literally just skip at that point, not gonna lie.", correct: true, feedback: "'RIP' = rest in peace (expressing sympathy). 'Fat commute' = long walk. 'Not gonna lie' = honestly. Real dorm talk!" },
                        { text: "Campus logistics can be challenging at times.", correct: false, feedback: "You sound like a campus brochure! Complain like a real student." }
                    ]
                }
            ]
        },
        {
            id: 'us-dmv',
            title: 'At the DMV',
            accent: 'us',
            description: 'Waiting at the DMV for hours. Bond with fellow sufferers through shared misery!',
            steps: [
                {
                    speaker: 'stranger',
                    message: "How long have you been waiting? I've been here for like an hour and a half and I'm losing my mind.",
                    prompt: "Bond over the shared suffering:",
                    options: [
                        { text: "Dude, same. I've been here since they opened. This place is actual torture.", correct: true, feedback: "'Since they opened' = emphasizes long wait. 'Actual torture' = hyperbolic complaint. Classic DMV bonding!" },
                        { text: "I have been waiting for an extended period as well.", correct: false, feedback: "Too stiff! The DMV is where Americans unite in complaining. Be casual!" },
                        { text: "Bro, going on two hours. I'm about to lose it. Why is it always this packed?", correct: true, feedback: "'Going on two hours' = almost two hours. 'About to lose it' = getting very frustrated. 'Packed' = crowded. Real talk!" },
                        { text: "The wait time is within expected parameters for government services.", correct: false, feedback: "Nobody accepts DMV waits calmly! Complain like a normal person!" }
                    ]
                },
                {
                    speaker: 'stranger',
                    message: "And of course I forgot one of the documents they need. Classic. Now I gotta come back AGAIN.",
                    prompt: "React to their bad luck:",
                    options: [
                        { text: "Oh no, that's brutal. The DMV always has some random paperwork you didn't know about. Total nightmare.", correct: true, feedback: "'That's brutal' = that's terrible. 'Total nightmare' = awful experience. Empathetic and casual!" },
                        { text: "That's the worst! They always get you with some document you didn't even know existed. I'd be so heated.", correct: true, feedback: "'The worst' = terrible. 'Get you' = catch you off guard. 'Heated' = angry. Perfect sympathy!" },
                        { text: "Documentation requirements should be more clearly communicated.", correct: false, feedback: "True but too formal! This is commiseration, not a Yelp review. Say 'that's brutal!'" },
                        { text: "Perhaps better preparation would have prevented this issue.", correct: false, feedback: "Don't blame the victim! DMV solidarity means sharing the pain, not lecturing." }
                    ]
                },
                {
                    speaker: 'stranger',
                    message: "At least there's free WiFi. Small victories, I guess. You'd think they'd have a faster system by now though.",
                    prompt: "Agree and wrap up the conversation:",
                    options: [
                        { text: "For real. It's 2025 and this place still runs like it's the 90s. At least we're surviving though. Good luck!", correct: true, feedback: "'For real' = I agree. 'Runs like the 90s' = outdated. 'Good luck' = warm send-off. Nice bonding moment!" },
                        { text: "Right? You'd think they'd figure it out by now. Anyway, hang in there — we'll get through this.", correct: true, feedback: "'You'd think' = rhetorical frustration. 'Hang in there' = stay strong. Encouraging stranger interaction!" },
                        { text: "Government technological infrastructure requires modernization.", correct: false, feedback: "You're not testifying before Congress! Just say 'for real' and wish them luck." },
                        { text: "The WiFi availability partially compensates for the inconvenience.", correct: false, feedback: "Too analytical! Just bond over the shared misery like normal people." }
                    ]
                }
            ]
        },
        {
            id: 'us-tinder',
            title: 'Tinder Chat',
            accent: 'us',
            description: 'You matched with someone on Tinder. Navigate the world of dating app slang!',
            steps: [
                {
                    speaker: 'match',
                    message: "Hey! I love your dog in your third pic. What's their name? 😊",
                    prompt: "Reply with a smooth opener:",
                    options: [
                        { text: "Haha thanks! That's Max. He's basically my wingman at this point. What about you — any pets?", correct: true, feedback: "'Wingman' = someone who helps you in dating. Smooth, funny, and keeps the conversation going!" },
                        { text: "Thank you for your interest in my canine companion.", correct: false, feedback: "This is Tinder, not a veterinary clinic! Be casual and flirty." },
                        { text: "Aw thanks! His name's Max and he's the real reason people swipe right, let's be honest. 😄", correct: true, feedback: "'Swipe right' = like someone on Tinder. Self-deprecating humor is charming on dating apps!" },
                        { text: "The dog's name is Max. He is a golden retriever, age 3.", correct: false, feedback: "That reads like a pet adoption listing! Be playful and engaging." }
                    ]
                },
                {
                    speaker: 'match',
                    message: "Omg Max is adorable! So what do you do for fun? Your profile says you're into hiking?",
                    prompt: "Keep the vibe going:",
                    options: [
                        { text: "Yeah! I'm lowkey obsessed with finding new trails. Max and I try to hit a new one every weekend. You into outdoor stuff?", correct: true, feedback: "'Lowkey obsessed' = secretly really into it. 'Hit a new one' = try a new trail. Engaging and asks a question back!" },
                        { text: "I do enjoy outdoor recreation and physical fitness activities.", correct: false, feedback: "Snooze! You sound like a LinkedIn profile. Be casual — 'lowkey obsessed' or 'super into it.'" },
                        { text: "Big time! Hiking's my go-to for decompressing. Plus Max is literally the best trail buddy. We should totally go sometime!", correct: true, feedback: "'Go-to' = favorite activity. 'Decompressing' = relaxing. Smooth transition to suggesting a date!" },
                        { text: "Affirmative. I participate in hiking on a regular basis.", correct: false, feedback: "Are you a military robot? This is flirting! Be fun and ask questions." }
                    ]
                },
                {
                    speaker: 'match',
                    message: "Okay so random question — what's your most controversial food take? I need to know before this goes any further 😂",
                    prompt: "Give a fun, playful answer:",
                    options: [
                        { text: "Okay don't judge me... pineapple on pizza is elite. I will die on this hill. 🍕", correct: true, feedback: "'Elite' = top tier. 'Die on this hill' = stand by this opinion no matter what. Fun and playful!" },
                        { text: "I don't have strong opinions about food.", correct: false, feedback: "Boring! Dating apps require personality. Give a fun take and own it!" },
                        { text: "Hot take: cereal is a soup. I said what I said. Your turn — drop yours! 😂", correct: true, feedback: "'Hot take' = controversial opinion. 'I said what I said' = standing by it. Playful and keeps it going!" },
                        { text: "My dietary preferences are fairly standard and unremarkable.", correct: false, feedback: "That's the most un-dateable answer possible! Be fun and have a personality." }
                    ]
                },
                {
                    speaker: 'match',
                    message: "Okay you passed the vibe check ✅ So when are we actually hanging out? 👀",
                    prompt: "Lock in the date:",
                    options: [
                        { text: "Haha yes! How about Saturday? There's this dope coffee spot downtown. Or we could do a hike with Max if you're feeling adventurous!", correct: true, feedback: "'Dope' = cool/great. Offering options shows effort. Including Max is a nice callback!" },
                        { text: "I would be available to schedule a meeting at a mutually convenient time.", correct: false, feedback: "It's a date, not a business appointment! Say 'how about Saturday' like a normal person." },
                        { text: "Bet! How's this weekend looking for you? I know a sick little taco place that's super chill.", correct: true, feedback: "'Bet' = sounds great. 'Sick' = awesome. 'Super chill' = relaxed atmosphere. Smooth date planning!" },
                        { text: "Please propose several dates and I will assess my availability.", correct: false, feedback: "You'll get unmatched so fast! Take initiative and suggest a plan." }
                    ]
                }
            ]
        },
        {
            id: 'us-fastfood',
            title: 'Drive-Thru Order',
            accent: 'us',
            description: 'Ordering food at a drive-thru with your friend riding shotgun. Fast food slang!',
            steps: [
                {
                    speaker: 'friend',
                    message: "Yo, pull into that Chick-fil-A! I'm starving. Their spicy chicken sandwich hits different.",
                    prompt: "Agree and talk about the food:",
                    options: [
                        { text: "Say less! Their spicy sandwich is goated. I'm getting a large combo, no cap.", correct: true, feedback: "'Say less' = I'm in. 'Goated' = greatest of all time. 'No cap' = seriously. Drive-thru hype!" },
                        { text: "I concur that the establishment's poultry sandwich is of high quality.", correct: false, feedback: "You're in a car with your friend, not writing a food review! Say it 'hits different' or it's 'goated.'" },
                        { text: "Bet! I've been craving their nuggets all day. The sauce is elite too.", correct: true, feedback: "'Bet' = let's do it. 'Craving' = really wanting. 'Elite' = top tier. Perfect fast food energy!" },
                        { text: "I shall consider the menu options upon arrival.", correct: false, feedback: "You already know what you want! Don't be formal, be hungry!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Ugh, this line is crazy long. Why is there always a mile-long line at this place?",
                    prompt: "Comment on the wait:",
                    options: [
                        { text: "Because it slaps, that's why! It's worth the wait though, trust.", correct: true, feedback: "'Slaps' = is really good. 'Trust' = believe me. Defending the wait with enthusiasm!" },
                        { text: "The queue length is directly proportional to the food quality.", correct: false, feedback: "You sound like a math textbook! Just say 'it slaps' or 'it's worth it.'" },
                        { text: "Fr though, their drive-thru line is always wild. But they move fast so we're good.", correct: true, feedback: "'Fr' = for real. 'Wild' = crazy. 'We're good' = it'll be fine. Realistic and casual!" },
                        { text: "Perhaps we should seek a less congested dining option.", correct: false, feedback: "Don't bail on Chick-fil-A! Your friend is starving. Stick it out!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Alright I'm getting the deluxe combo. You want me to order for you too while you're driving?",
                    prompt: "Tell them your order casually:",
                    options: [
                        { text: "Yeah, hook me up with the spicy deluxe combo, large. And throw in some extra sauce — I always need more.", correct: true, feedback: "'Hook me up' = get me. 'Throw in' = add. 'Extra sauce' = essential fast food move. Solid order!" },
                        { text: "I would like the number three meal with a medium beverage, please.", correct: false, feedback: "You're talking to your friend, not the speaker box! Be casual — 'hook me up with...' works great." },
                        { text: "Dude just get me whatever you're getting. I'm not picky. Extra sauce though, don't forget!", correct: true, feedback: "'Whatever you're getting' = easy choice. 'Don't forget the sauce' = priorities. Classic passenger move!" },
                        { text: "Please relay my order of one sandwich meal to the service attendant.", correct: false, feedback: "Service attendant? It's a drive-thru! Be casual with your friend." }
                    ]
                }
            ]
        },
        {
            id: 'us-gasstation',
            title: 'Road Trip Gas Stop',
            accent: 'us',
            description: 'Quick pit stop on a road trip. Snacks, gas, and vibes!',
            steps: [
                {
                    speaker: 'friend',
                    message: "We gotta stop soon, the tank's almost on E. Plus I need to stretch my legs and grab some snacks.",
                    prompt: "Agree about the pit stop:",
                    options: [
                        { text: "Yeah, I saw a sign for a gas station at the next exit. I could go for some gas station snacks, lowkey.", correct: true, feedback: "'At the next exit' = upcoming highway exit. 'Gas station snacks' = a road trip staple. 'Lowkey' = a little bit. Road trip vibes!" },
                        { text: "I agree that refueling the vehicle is a necessary logistical priority.", correct: false, feedback: "Lighten up! It's a road trip, not a military operation. Say 'let's stop at the next exit!'" },
                        { text: "For sure! I'm dying for some coffee and maybe some gummy bears. Road trip snacks hit different.", correct: true, feedback: "'Dying for' = really want. 'Hit different' = are uniquely satisfying. Essential road trip energy!" },
                        { text: "The fuel gauge does indicate a low level. We should proceed to the nearest station.", correct: false, feedback: "You sound like the car's GPS! Be casual and excited about snacks." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Dude, gas is $4.50 a gallon here?! That's highway robbery. Literally.",
                    prompt: "React to the gas prices:",
                    options: [
                        { text: "Bruh, that's insane. We're getting ripped off. Should've filled up in the last town.", correct: true, feedback: "'Bruh' = disbelief. 'Ripped off' = overcharged. 'Should've filled up' = hindsight. Classic gas price complaint!" },
                        { text: "The fuel pricing at this location is unreasonable.", correct: false, feedback: "Too formal! Americans complain about gas prices with passion, not corporate language." },
                        { text: "Sheesh! Welcome to highway prices, I guess. It is what it is — we need gas.", correct: true, feedback: "'Sheesh' = wow. 'It is what it is' = accepting reality. Resigned but casual. Realistic!" },
                        { text: "Fuel costs are subject to geographic and market fluctuations.", correct: false, feedback: "Are you an economics professor? Just say 'that's insane' like everyone else!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Okay, snacks acquired. I got us Red Bulls, Takis, and some beef jerky. We're set for the next three hours.",
                    prompt: "Approve of the snack haul:",
                    options: [
                        { text: "You're a legend! Takis and Red Bull — that's the ultimate road trip combo. Let's hit the road!", correct: true, feedback: "'Legend' = awesome person. 'Ultimate combo' = best pairing. 'Hit the road' = get going. Perfect!" },
                        { text: "The nutritional value of those selections is questionable.", correct: false, feedback: "It's a road trip! Nobody wants a health lecture. Say the snacks are 'clutch!'" },
                        { text: "Clutch! That's a solid lineup. I call dibs on the Takis. Let's bounce!", correct: true, feedback: "'Clutch' = perfectly timed/essential. 'Solid lineup' = great selection. 'Bounce' = leave. Road trip ready!" },
                        { text: "Thank you for procuring the provisions for our journey.", correct: false, feedback: "Provisions? You got gas station snacks, not survival supplies! Be casual." }
                    ]
                }
            ]
        },
        {
            id: 'us-blackfriday',
            title: 'Black Friday Shopping',
            accent: 'us',
            description: 'Braving the Black Friday crowds with a friend. Score deals and survive the chaos!',
            steps: [
                {
                    speaker: 'friend',
                    message: "Girl, wake UP! The doorbuster deals start at 5am and I am NOT missing that TV deal.",
                    prompt: "React to the early morning plan:",
                    options: [
                        { text: "Ugh, 5am?! You're crazy but I'm in. That deal is way too good to pass up.", correct: true, feedback: "'You're crazy but I'm in' = reluctant agreement. 'Too good to pass up' = can't miss it. Real Black Friday energy!" },
                        { text: "I find the proposed wake-up time unreasonably early.", correct: false, feedback: "It's Black Friday! Early mornings are the whole point. Say 'I'm in' or 'let's do it!'" },
                        { text: "Alright alright, I'm up! Coffee first though. If I'm getting up at 5am, I better be saving big.", correct: true, feedback: "'Coffee first' = relatable priority. 'Saving big' = getting great deals. Sleepy but motivated!" },
                        { text: "I shall set my alarm for the appropriate time.", correct: false, feedback: "More enthusiasm needed! Black Friday is an event, not a chore." }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "OMG this line is wrapped around the building. We should've gotten here earlier!",
                    prompt: "React to the long line:",
                    options: [
                        { text: "This is wild! There's no way all these people are getting that TV deal. We gotta book it inside.", correct: true, feedback: "'Wild' = crazy. 'Book it' = move fast. Competitive Black Friday spirit!" },
                        { text: "I observe that the queue is significantly longer than anticipated.", correct: false, feedback: "Nobody calmly observes lines on Black Friday! Say 'this is wild' and strategize!" },
                        { text: "Okay don't panic. We got this. As soon as those doors open, beeline to electronics. No stopping!", correct: true, feedback: "'We got this' = we'll manage. 'Beeline' = go directly. Strategic and pumped up!" },
                        { text: "Perhaps we should return at a less congested time.", correct: false, feedback: "There IS no less congested time — it's Black Friday! Commit to the chaos!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "YES! I got the last TV! Did you see me grab it? That lady was reaching for it too but I was FASTER.",
                    prompt: "Celebrate the victory:",
                    options: [
                        { text: "You're an absolute SAVAGE! That grab was clutch. Black Friday champion right here!", correct: true, feedback: "'Savage' = fierce/impressive. 'Clutch' = perfectly timed. 'Champion' = winner. Celebratory!" },
                        { text: "Congratulations on acquiring the television at a reduced price.", correct: false, feedback: "Your friend just won a Black Friday battle! Hype them up with 'savage' or 'clutch!'" },
                        { text: "LETS GO! That was straight up Olympic-level shopping. I'm living for this energy!", correct: true, feedback: "'Olympic-level' = expert. 'Living for this' = loving it. Maximum hype for the win!" },
                        { text: "Your acquisition was timely and efficient.", correct: false, feedback: "Your friend needs a high five, not a performance review! Celebrate!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "My feet are killing me but we saved like $500 total today. Brunch to celebrate?",
                    prompt: "Agree and wrap up the shopping trip:",
                    options: [
                        { text: "We crushed it today! Brunch is a must. I need pancakes and like three coffees after this.", correct: true, feedback: "'Crushed it' = did amazingly well. 'A must' = absolutely necessary. Earned celebration!" },
                        { text: "The savings were substantial. I would enjoy a meal.", correct: false, feedback: "Show some excitement! You saved $500! Say 'we crushed it' or 'we killed it!'" },
                        { text: "Absolutely! We earned it. Mimosas on me — we just had the most productive morning ever.", correct: true, feedback: "'Earned it' = deserved reward. 'On me' = I'm paying. 'Productive' used humorously. Perfect wrap-up!" },
                        { text: "A caloric replenishment would be advisable after the physical exertion.", correct: false, feedback: "It's brunch, not a medical recommendation! Say 'we earned it!'" }
                    ]
                }
            ]
        },
        {
            id: 'us-concert',
            title: 'At a Concert',
            accent: 'us',
            description: 'You\'re at a live concert with friends. Capture the energy and excitement!',
            steps: [
                {
                    speaker: 'friend',
                    message: "DUDE! They're about to come on stage! I can't believe we're actually here right now!",
                    prompt: "Match the pre-show excitement:",
                    options: [
                        { text: "I'm literally shaking! Front row too?! This is gonna be INSANE. Best night ever!", correct: true, feedback: "'Literally shaking' = extremely excited. 'Insane' = amazing. Maximum concert hype!" },
                        { text: "I am experiencing significant anticipation for the musical performance.", correct: false, feedback: "You're at a concert, not writing a diary entry! Scream about how hype you are!" },
                        { text: "BRO I'm SO hyped right now! I've been waiting for this forever. Let's go FRONT ROW!", correct: true, feedback: "'Hyped' = excited. 'Waiting for this forever' = long-anticipated. Pure concert energy!" },
                        { text: "The artist should be appearing shortly. Let us observe patiently.", correct: false, feedback: "Observe patiently?! It's a concert! Let loose and get hyped!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "OH MY GOD THEY'RE PLAYING MY FAVORITE SONG! THIS IS NOT A DRILL!",
                    prompt: "React to the song:",
                    options: [
                        { text: "NO WAYYY! I'm losing my mind right now! This song SLAPS live! I'm screaming!", correct: true, feedback: "'Losing my mind' = incredibly excited. 'Slaps live' = sounds even better in person. Concert brain activated!" },
                        { text: "I LITERALLY CAN'T! This hits so different live! I'm getting chills, this is everything!", correct: true, feedback: "'I can't' = overwhelmed. 'Hits different live' = better in person. 'This is everything' = perfect. Peak fan energy!" },
                        { text: "Ah yes, this particular composition is quite enjoyable.", correct: false, feedback: "Your friend is losing their mind and you say 'quite enjoyable'?! MATCH THE ENERGY!" },
                        { text: "I recognize this song from my playlist.", correct: false, feedback: "Way too calm for a live concert! Scream about how it 'slaps live!'" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "That was hands down the best show I've ever been to. I'm on a whole other level right now. Post-concert high is REAL.",
                    prompt: "Agree about the amazing show:",
                    options: [
                        { text: "Dude, no cap that was LEGENDARY. My voice is gone from screaming but worth it. Core memory unlocked.", correct: true, feedback: "'Legendary' = incredible. 'Voice is gone' = screamed too much. 'Core memory unlocked' = unforgettable moment!" },
                        { text: "The performance was satisfactory and met expectations.", correct: false, feedback: "Satisfactory?! After the show of a lifetime? Say it was 'legendary' or 'unreal!'" },
                        { text: "I'm still buzzing! That was absolutely unreal. We need to go to every show from now on. I'm obsessed.", correct: true, feedback: "'Buzzing' = still excited. 'Unreal' = incredible. 'Obsessed' = deeply into it. Perfect post-show vibe!" },
                        { text: "The concert concluded. I am now ready to depart.", correct: false, feedback: "Zero emotion! The post-concert high deserves better. Say you're 'still buzzing!'" }
                    ]
                }
            ]
        },
        {
            id: 'us-brunch',
            title: 'Sunday Brunch',
            accent: 'us',
            description: 'Sunday brunch with friends. Mimosas, eggs benny, and weekend vibes!',
            steps: [
                {
                    speaker: 'friend',
                    message: "I'm so glad we're finally doing this! I've been dying to try this place. The IG reviews look amazing.",
                    prompt: "React to arriving at brunch:",
                    options: [
                        { text: "Same! The aesthetic of this place is immaculate. We're definitely getting content today.", correct: true, feedback: "'Aesthetic' = visual style. 'Immaculate' = perfect. 'Getting content' = taking photos for social media. Brunch culture!" },
                        { text: "The restaurant's online reviews were indeed favorable.", correct: false, feedback: "Too formal for brunch with friends! Talk about the 'aesthetic' or 'vibes.'" },
                        { text: "The vibes are already on point! This place is so cute. I already know what I'm ordering — mimosa flight, obviously.", correct: true, feedback: "'Vibes on point' = great atmosphere. 'Mimosa flight' = multiple mimosas. 'Obviously' = it's a given. Brunch queen energy!" },
                        { text: "I shall evaluate the establishment once we are seated.", correct: false, feedback: "It's brunch, not an inspection! Get excited about the vibes and the mimosas!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Okay I'm getting the avocado toast and the eggs benny. Don't judge me for getting two entrees — I'm THAT hungry.",
                    prompt: "Support their order:",
                    options: [
                        { text: "No judgement! Honestly, same energy. I'm getting a waffle AND a breakfast burrito. Treat yourself, right?", correct: true, feedback: "'Same energy' = I feel the same way. 'Treat yourself' = indulge without guilt. Supportive brunch friend!" },
                        { text: "Ordering two entrees is a disproportionate amount of food.", correct: false, feedback: "Don't food-shame at brunch! Support your friend — 'treat yourself!'" },
                        { text: "Girl, go OFF! It's Sunday. Calories don't count at brunch — that's literally the rule.", correct: true, feedback: "'Go off' = do your thing. 'Calories don't count' = humorous brunch logic. Perfect supportive energy!" },
                        { text: "Your appetite seems excessive for the time of day.", correct: false, feedback: "Rude! Brunch is about indulging. Be supportive and say 'go off!'" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "Okay this food is absolutely UNREAL. We need to make this our regular spot. Every Sunday, no excuses.",
                    prompt: "Agree about making it a tradition:",
                    options: [
                        { text: "I'm SO down! Sunday brunch era has officially begun. This place is a vibe and the food is bussin.", correct: true, feedback: "'Era' = new phase of life. 'A vibe' = great atmosphere. 'Bussin' = delicious. Locking in the tradition!" },
                        { text: "I would consider returning on a recurring basis.", correct: false, feedback: "Your friend is declaring a tradition and you're 'considering'?! Say 'I'm so down!'" },
                        { text: "One hundred percent! This is our spot now. Nonnegotiable. Already looking forward to next Sunday.", correct: true, feedback: "'Our spot' = claimed it. 'Nonnegotiable' = it's decided. 'Looking forward' = excited. Tradition locked in!" },
                        { text: "The food quality warrants repeat visits.", correct: false, feedback: "You sound like a Yelp review bot! Just say it's your new 'spot' and you're 'so down.'" }
                    ]
                }
            ]
        },
        // --- NEW UK Scenarios (Batch 2) ---
        {
            id: 'uk-christmas',
            title: 'Christmas Day',
            accent: 'uk',
            description: 'Christmas morning with the family. Crackers, presents, and the Queen\'s speech!',
            steps: [
                {
                    speaker: 'mum',
                    message: "Right, everyone's here! Shall we do presents first or have a cuppa and some mince pies?",
                    prompt: "Respond to your mum on Christmas morning:",
                    options: [
                        { text: "Presents first, obviously! I've been dying to open mine. Put the kettle on after, Mum!", correct: true, feedback: "'Dying to' = can't wait. 'Put the kettle on' = make tea. Classic British Christmas morning excitement!" },
                        { text: "I would like to establish a structured gift-opening schedule.", correct: false, feedback: "It's Christmas, not a board meeting! Just say 'presents first!'" },
                        { text: "Go on then, cuppa first — but make it quick! I'm buzzing to see what I've got.", correct: true, feedback: "'Go on then' = alright. 'Make it quick' = hurry. 'Buzzing' = excited. Patient but keen!" },
                        { text: "I have no preference regarding the sequencing of activities.", correct: false, feedback: "It's Christmas morning! Show some excitement — 'I'm buzzing!' or 'presents first!'" }
                    ]
                },
                {
                    speaker: 'dad',
                    message: "Who wants to pull a cracker? Come on, get your party hats on — it's tradition!",
                    prompt: "Join in the Christmas cracker fun:",
                    options: [
                        { text: "Go on then! I always lose these though. Right, on three — one, two, THREE!", correct: true, feedback: "'Go on then' = okay. 'Always lose these' = self-deprecating fun. Pulling crackers is a must!" },
                        { text: "Christmas crackers are a frivolous activity.", correct: false, feedback: "Bah humbug! Crackers are non-negotiable at British Christmas. Get involved!" },
                        { text: "I bags the blue one! And I'm not wearing the hat if I get a rubbish joke again.", correct: true, feedback: "'I bags' = I claim. 'Rubbish joke' = bad joke (cracker jokes are always bad). Classic banter!" },
                        { text: "I shall participate in the cracker-pulling ceremony.", correct: false, feedback: "Ceremony? It's pulling a cardboard tube! Say 'I bags the blue one!'" }
                    ]
                },
                {
                    speaker: 'nan',
                    message: "Come on then, dinner's ready! I've done a massive turkey and all the trimmings. Don't let it go cold!",
                    prompt: "Compliment Nan's Christmas dinner:",
                    options: [
                        { text: "Nan, you've outdone yourself! This looks absolutely brilliant. I'm well ready for this.", correct: true, feedback: "'Outdone yourself' = exceeded expectations. 'Well ready' = very ready. Nan will be chuffed!" },
                        { text: "The turkey and accompaniments appear to be prepared to a high standard.", correct: false, feedback: "That's a food critic review, not what you say to your nan! Say it looks 'brilliant!'" },
                        { text: "Get in! This looks proper lush, Nan. Christmas wouldn't be Christmas without your roast.", correct: true, feedback: "'Get in!' = excellent. 'Proper lush' = really lovely. Making Nan feel appreciated. Spot on!" },
                        { text: "I shall commence consuming the festive meal.", correct: false, feedback: "You'll get coal next year for talking like that! Say 'this looks brilliant, Nan!'" }
                    ]
                },
                {
                    speaker: 'sibling',
                    message: "I'm absolutely stuffed. But there's still Christmas pud and trifle. Why does Nan always make so much food?",
                    prompt: "Agree about the amount of food:",
                    options: [
                        { text: "Because she's a legend, that's why! I'm stuffed an' all but I'm not saying no to trifle.", correct: true, feedback: "'Legend' = amazing person. 'Stuffed an' all' = very full too. Never refuse Nan's trifle!" },
                        { text: "The quantity of food is excessive for the number of guests.", correct: false, feedback: "Don't call Nan's cooking excessive! That's how you get written out of the will." },
                        { text: "Mate, I can barely move but Christmas pud is non-negotiable. Bring it on!", correct: true, feedback: "'Can barely move' = so full. 'Non-negotiable' = mandatory. 'Bring it on' = ready for more. The British way!" },
                        { text: "I have reached my caloric intake limit for the day.", correct: false, feedback: "Caloric intake limit on Christmas?! That's not a thing. Say you're 'stuffed but ready for pud!'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-guyfawkes',
            title: 'Bonfire Night',
            accent: 'uk',
            description: 'November 5th — fireworks, bonfires, and toffee apples. A proper British night out!',
            steps: [
                {
                    speaker: 'mate',
                    message: "You coming to the bonfire tonight? It's meant to be well good this year. They've got a massive display planned.",
                    prompt: "Respond about Bonfire Night plans:",
                    options: [
                        { text: "Wouldn't miss it! Bonfire Night is always class. I'll bring some sparklers and a flask of hot choc.", correct: true, feedback: "'Wouldn't miss it' = definitely coming. 'Class' = great. 'Flask of hot choc' = perfect Bonfire Night essential!" },
                        { text: "I shall attend the pyrotechnic display this evening.", correct: false, feedback: "Pyrotechnic display?! It's Bonfire Night! Say it's 'class' or you 'wouldn't miss it!'" },
                        { text: "Yeah, I'm well up for it! Love a good bonfire. As long as it's not chucking it down again.", correct: true, feedback: "'Well up for it' = keen. 'Love a good bonfire' = enthusiastic. 'Chucking it down' = raining heavily. Peak British concern!" },
                        { text: "I will evaluate the weather conditions before committing.", correct: false, feedback: "It's Bonfire Night — you go rain or shine! Say you're 'well up for it!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Blimey, it's absolutely freezing out here! Worth it for the fireworks though. Fancy a toffee apple?",
                    prompt: "React to the cold and the toffee apple offer:",
                    options: [
                        { text: "I'm absolutely perished! But yeah, go on then — can't say no to a toffee apple. Proper Bonfire Night vibes.", correct: true, feedback: "'Perished' = freezing cold. 'Go on then' = yes please. 'Proper vibes' = authentic atmosphere. Lovely!" },
                        { text: "The ambient temperature is indeed below comfortable levels.", correct: false, feedback: "Nobody says that while watching fireworks! Say you're 'perished' or 'frozen solid!'" },
                        { text: "Mate, I can't feel my fingers but who cares! Toffee apple, please. Reminds me of being a kid.", correct: true, feedback: "'Can't feel my fingers' = very cold. Nostalgia about childhood Bonfire Nights — very British!" },
                        { text: "I decline the confectionery item due to the suboptimal conditions.", correct: false, feedback: "Suboptimal conditions?! You're at Bonfire Night! Embrace the cold and have a toffee apple!" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "WHOA! Did you see that one?! That was massive! Best fireworks display I've seen in ages!",
                    prompt: "React to the big firework:",
                    options: [
                        { text: "That was MENTAL! Proper epic. They've smashed it this year. Easily the best one yet!", correct: true, feedback: "'Mental' = incredible. 'Smashed it' = done brilliantly. Fireworks excitement at its best!" },
                        { text: "The pyrotechnic display was visually impressive.", correct: false, feedback: "Show some emotion! A massive firework just went off! Say it was 'mental' or 'epic!'" },
                        { text: "Crikey! That one nearly took my eyebrows off! Absolutely belting though, fair play!", correct: true, feedback: "'Crikey' = surprise. 'Belting' = amazing. 'Fair play' = credit where it's due. Classic British!" },
                        { text: "The explosive was of significant magnitude.", correct: false, feedback: "You sound like a police report! Say 'crikey' or 'that was mental!'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-freshers',
            title: 'Uni Freshers Week',
            accent: 'uk',
            description: 'First week at university. Flat parties, society sign-ups, and making new mates!',
            steps: [
                {
                    speaker: 'flatmate',
                    message: "Alright! I'm your new flatmate — I'm in the room next door. Fancy going to the freshers fair together? I haven't got a clue where anything is.",
                    prompt: "Accept your new flatmate's offer:",
                    options: [
                        { text: "Yeah, sound! I'm well lost too, to be honest. Might as well figure it out together. I'm proper buzzing though!", correct: true, feedback: "'Sound' = great/nice. 'Well lost' = very confused. 'Proper buzzing' = really excited. Perfect freshers energy!" },
                        { text: "I would be amenable to navigating the campus together.", correct: false, feedback: "You're meeting your flatmate, not a business partner! Say 'sound' or 'I'm well up for it!'" },
                        { text: "Go on then! Haven't got a scooby where anything is either. Let's wing it!", correct: true, feedback: "'Haven't got a scooby' = haven't got a clue. 'Wing it' = improvise. Freshers bonding moment!" },
                        { text: "I shall accompany you to the designated event area.", correct: false, feedback: "Too formal for your new flatmate! Be friendly — 'go on then' or 'sounds good!'" }
                    ]
                },
                {
                    speaker: 'flatmate',
                    message: "This freshers fair is mental! There's like a hundred societies. I've signed up for rugby, film club, and cheese appreciation. No regrets.",
                    prompt: "React to their society choices:",
                    options: [
                        { text: "Cheese appreciation?! That's class! I'm signing up for that an' all. What a laugh.", correct: true, feedback: "'Class' = brilliant. 'An' all' = as well. 'What a laugh' = how funny. Embracing uni life!" },
                        { text: "The variety of extracurricular organizations is impressive.", correct: false, feedback: "Lighten up! Your flatmate signed up for cheese club. Have fun with it!" },
                        { text: "Mate, cheese appreciation is elite. I'm all over that. I've joined the pub quiz society and five-a-side footie.", correct: true, feedback: "'Elite' = top tier. 'All over that' = definitely joining. 'Five-a-side' = small football games. Classic uni societies!" },
                        { text: "I will carefully evaluate which societies best align with my interests.", correct: false, feedback: "It's freshers week — sign up for everything! You can quit later. Say 'I'm all over that!'" }
                    ]
                },
                {
                    speaker: 'flatmate',
                    message: "There's a massive flat party in block C tonight. Everyone's going. Pre-drinks at ours first?",
                    prompt: "Agree to the party plan:",
                    options: [
                        { text: "Absolutely! Pre-drinks at ours — I'll grab some cans from the shop. What time are people coming round?", correct: true, feedback: "'Pre-drinks at ours' = pre-party at our flat. 'Cans' = beers/drinks. 'Coming round' = coming over. Freshers ready!" },
                        { text: "I shall consider attending the social gathering this evening.", correct: false, feedback: "It's freshers week and there's a party — you GO! Say 'absolutely' or 'I'm there!'" },
                        { text: "I'm there! Wouldn't miss it for the world. Freshers week is meant to be messy, innit?", correct: true, feedback: "'Wouldn't miss it' = definitely attending. 'Messy' = wild/chaotic (positive in this context). 'Innit' = right?" },
                        { text: "I will attend provided the noise levels remain within acceptable parameters.", correct: false, feedback: "Noise parameters?! At a freshers party?! Just say 'I'm there!' and enjoy yourself." }
                    ]
                },
                {
                    speaker: 'new friend',
                    message: "That party was jokes! Can't believe how many people were there. Reckon we should get a kebab? I'm absolutely famished.",
                    prompt: "Agree to post-party food:",
                    options: [
                        { text: "Mate, I'm well up for a kebab. I'm absolutely starving. Best part of a night out, honestly.", correct: true, feedback: "'Well up for' = keen. 'Starving' = very hungry. Post-night-out kebab is a sacred British tradition!" },
                        { text: "I would prefer a more refined late-night dining experience.", correct: false, feedback: "It's 2am after a freshers party — you're having a kebab! It's the law!" },
                        { text: "Too right! A dirty kebab is exactly what I need right now. That party was quality though, wasn't it?", correct: true, feedback: "'Dirty kebab' = greasy takeaway kebab (affectionate term). 'Quality' = great. Peak post-party vibes!" },
                        { text: "I shall evaluate the available late-night food establishments.", correct: false, feedback: "It's a kebab shop at 2am, not a restaurant review! Say 'I'm starving, let's go!'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-chippy',
            title: 'At the Chippy',
            accent: 'uk',
            description: 'Getting fish and chips from the local chippy. A British institution!',
            steps: [
                {
                    speaker: 'mate',
                    message: "Fancy a chippy tea tonight? I'm absolutely gasping for some proper fish and chips.",
                    prompt: "Agree to fish and chips:",
                    options: [
                        { text: "Oh mate, you're speaking my language! I'm well up for a chippy tea. The one on the high street is banging.", correct: true, feedback: "'Speaking my language' = exactly what I want. 'Chippy tea' = fish and chips for dinner. 'Banging' = excellent. Spot on!" },
                        { text: "I would be agreeable to acquiring fried fish and potato chips.", correct: false, feedback: "Nobody describes a chippy like that! And in the UK, they're chips, not potato chips. Say you're 'well up for it!'" },
                        { text: "Go on then! Can't beat a proper chippy tea on a Friday. Battered cod and mushy peas for me.", correct: true, feedback: "'Go on then' = classic British yes. 'Can't beat' = nothing's better. Battered cod and mushy peas = perfect order!" },
                        { text: "I shall consider the dining suggestion and respond accordingly.", correct: false, feedback: "It's fish and chips, not a contract negotiation! Say 'go on then!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Right, what you having? I'm getting a large cod, chips, and a battered sausage on the side. Go big or go home.",
                    prompt: "Place your order:",
                    options: [
                        { text: "Ooh, a battered sausage! Cheeky! I'll have a large haddock, chips, and loads of scraps. And don't forget the curry sauce!", correct: true, feedback: "'Cheeky' = indulgent. 'Scraps' = crispy batter bits. 'Curry sauce' = essential chippy condiment. Pro-level order!" },
                        { text: "I would like one portion of fish with a side of fried potatoes.", correct: false, feedback: "That's the blandest chippy order ever! Get scraps, curry sauce, mushy peas — live a little!" },
                        { text: "Same as you but with mushy peas instead. And a pickled egg if they've got them. Proper treat, this.", correct: true, feedback: "'Mushy peas' = classic chippy side. 'Pickled egg' = old-school chippy snack. 'Proper treat' = genuine delight!" },
                        { text: "I shall have the standard fish and chips combination.", correct: false, feedback: "Standard?! A chippy visit deserves enthusiasm. Get 'loads of scraps' and 'curry sauce!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Mate, these chips are gorgeous. Proper crispy. And the fish is absolutely spot on. This chippy never lets you down.",
                    prompt: "Agree about the quality:",
                    options: [
                        { text: "Banging, innit? The batter's perfect. Honestly, this is the best chippy in town, no contest.", correct: true, feedback: "'Banging' = excellent. 'No contest' = undeniably the best. High chippy praise!" },
                        { text: "The food quality is consistent with previous visits.", correct: false, feedback: "That's a TripAdvisor review, not mate chat! Say it's 'banging' or 'spot on!'" },
                        { text: "Proper lovely, this. Salt and vinegar, bit of curry sauce — can't go wrong. Happy days!", correct: true, feedback: "'Proper lovely' = really nice. 'Can't go wrong' = guaranteed good. 'Happy days' = all is well. Chippy bliss!" },
                        { text: "The fish-to-batter ratio is optimal.", correct: false, feedback: "Optimal ratio?! Just say it's 'gorgeous' or 'spot on!' Enjoy your chippy tea!" }
                    ]
                }
            ]
        },
        {
            id: 'uk-weather',
            title: 'Weather Moaning',
            accent: 'uk',
            description: 'The national sport of Britain — complaining about the weather!',
            steps: [
                {
                    speaker: 'colleague',
                    message: "Absolutely miserable out there today, isn't it? Chucking it down again. So much for summer.",
                    prompt: "Join in the classic British weather moan:",
                    options: [
                        { text: "Tell me about it! I'm drenched and I only walked from the car. This weather's an absolute joke.", correct: true, feedback: "'Tell me about it' = I agree completely. 'Drenched' = soaking wet. 'An absolute joke' = terrible. Peak British weather chat!" },
                        { text: "The precipitation levels are indeed above average for this time of year.", correct: false, feedback: "You sound like a weather forecast! British weather chat needs feeling — say 'it's an absolute joke!'" },
                        { text: "Mate, it's grim out there. I've had it up to here with this rain. We get about three days of sun a year.", correct: true, feedback: "'Grim' = horrible. 'Had it up to here' = reached breaking point. Exaggerating = peak British moaning!" },
                        { text: "Weather patterns are a natural occurrence that we must accept.", correct: false, feedback: "Accept the weather?! Complaining about it is the whole point of being British!" }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "And apparently it's going to be scorching this weekend. Thirty degrees! We'll all be moaning about the heat then.",
                    prompt: "React to the heatwave forecast:",
                    options: [
                        { text: "Typical! We'll all be saying 'it's too hot' by Saturday. We're never happy, are we? Can't win with British weather.", correct: true, feedback: "'Typical' = expected. 'Can't win' = nothing satisfies us. Self-aware British humor about weather moaning!" },
                        { text: "Temperature fluctuations are normal meteorological phenomena.", correct: false, feedback: "You're missing the entire point of British weather chat! Moan about it being 'too hot' next!" },
                        { text: "Thirty degrees?! Mate, this country falls apart over twenty-five. Trains will be delayed, guaranteed.", correct: true, feedback: "'Falls apart' = can't cope. Predicting train delays from heat = extremely British observation!" },
                        { text: "I look forward to the improved weather conditions.", correct: false, feedback: "Looking forward to it?! A proper Brit would say 'it'll be too hot' and complain anyway!" }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "Right, I'm off home before it gets any worse. Bet the roads are an absolute nightmare too.",
                    prompt: "Say goodbye and moan one more time:",
                    options: [
                        { text: "Good shout. Drive safe — it'll be chaos out there. Roll on the weekend, even if it is going to be boiling!", correct: true, feedback: "'Good shout' = good idea. 'Roll on the weekend' = can't wait for the weekend. Classic weather sign-off!" },
                        { text: "Safe travels. My commute will be equally challenging in these conditions.", correct: false, feedback: "Too formal! Say 'good shout' and moan about the roads being 'a nightmare.'" },
                        { text: "Yeah, I'm heading off an' all. If it's not raining it's scorching — there's no in-between, is there?", correct: true, feedback: "'Heading off an' all' = leaving too. 'No in-between' = perfect summary of British weather. Textbook moaning!" },
                        { text: "I will also depart due to the inclement weather.", correct: false, feedback: "Inclement weather?! Just say you're 'heading off' before it gets worse!" }
                    ]
                }
            ]
        },
        {
            id: 'uk-results',
            title: 'A-Level Results Day',
            accent: 'uk',
            description: 'The big day — A-Level results! Nerves, celebrations, and clearing calls!',
            steps: [
                {
                    speaker: 'friend',
                    message: "I feel physically sick. I can't open the envelope. What if I've messed it up? My mum's already crying and she doesn't even know the results.",
                    prompt: "Calm your friend down:",
                    options: [
                        { text: "Mate, breathe! Whatever happens, it'll be fine. You worked your socks off. Just open it — rip the plaster off!", correct: true, feedback: "'Worked your socks off' = worked extremely hard. 'Rip the plaster off' = just do it quickly. Supportive and practical!" },
                        { text: "Your anxiety regarding the examination results is understandable.", correct: false, feedback: "Your friend is panicking! They need encouragement, not a therapist voice. Say 'you'll smash it!'" },
                        { text: "Come on, you've got this! You revised like mad. Even if it's not perfect, there's always clearing. Just open it!", correct: true, feedback: "'Revised like mad' = studied intensely. 'Clearing' = system for getting uni places with different results. Reassuring!" },
                        { text: "Statistical analysis suggests your results will be adequate.", correct: false, feedback: "Not helpful! Your friend needs emotional support, not statistics!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "I GOT IN! THREE A'S! I can't believe it! I'm going to Leeds! I'm actually going to uni!",
                    prompt: "Celebrate their results:",
                    options: [
                        { text: "GET IN! I KNEW IT! You absolute legend! I'm so chuffed for you! Drinks tonight, it's on me!", correct: true, feedback: "'Get in!' = celebration. 'Legend' = amazing. 'Chuffed' = extremely pleased. 'On me' = I'm paying. Proper celebration!" },
                        { text: "Congratulations on meeting the university entry requirements.", correct: false, feedback: "Your friend just got three A's! Scream 'GET IN!' and hug them, not congratulate them formally!" },
                        { text: "YES MATE! Smashed it! Three A's?! That's absolutely mental! Leeds won't know what's hit them!", correct: true, feedback: "'Smashed it' = aced it. 'Mental' = incredible. 'Won't know what's hit them' = they'll be amazed. Maximum hype!" },
                        { text: "Your academic achievement is commendable.", correct: false, feedback: "Commendable?! It's three A's on results day! Show some emotion — 'GET IN!'" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "What about you?! Have you opened yours? Come on, we'll do it together!",
                    prompt: "Open your results:",
                    options: [
                        { text: "Oh god, here goes nothing... TWO A's AND A B! That's enough! I'm in! We're BOTH going to uni!", correct: true, feedback: "'Here goes nothing' = taking the leap. Celebrating together makes it special. Brilliant moment!" },
                        { text: "I shall now examine my academic results documentation.", correct: false, feedback: "Your friend is hyped and you're being formal?! Just rip it open and celebrate!" },
                        { text: "Right, deep breath... YES! I've done it! Not three A's like you, you swot, but I've got my place! Happy days!", correct: true, feedback: "'Swot' = someone who studies hard (teasing). 'Happy days' = everything's great. Playful and celebratory!" },
                        { text: "My results appear to be satisfactory for university entrance.", correct: false, feedback: "It's results day! Jump up and down and scream! 'I've done it' or 'get in!'" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "This is the best day ever! We need to celebrate properly. Everyone's heading to the pub — you coming?",
                    prompt: "Agree to celebrate:",
                    options: [
                        { text: "Try and stop me! First round's on me. We've earned this! Best results day ever!", correct: true, feedback: "'Try and stop me' = definitely coming. 'First round's on me' = I'm buying drinks. Generous celebration!" },
                        { text: "I would consider joining the group for celebratory refreshments.", correct: false, feedback: "Consider?! You just got your results! Say 'try and stop me!' and get celebrating!" },
                        { text: "Mate, I am SO there! We're going to have an absolute belter tonight. We proper smashed it!", correct: true, feedback: "'Belter' = amazing time. 'Proper smashed it' = did incredibly well. Celebration mode: activated!" },
                        { text: "I will evaluate my schedule and confirm attendance.", correct: false, feedback: "It's A-Level results day and your mate's asking you to the pub! Just say 'I'm there!'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-nandos',
            title: "Nando's with Mates",
            accent: 'uk',
            description: "A cheeky Nando's with the lads. Spice levels, refills, and banter!",
            steps: [
                {
                    speaker: 'mate',
                    message: "Right, what spice are you going? I'm feeling brave — reckon I'll try extra hot today.",
                    prompt: "Discuss your spice choice:",
                    options: [
                        { text: "Extra hot?! You're mental! Last time you had hot you were dying. I'm sticking with medium — I know my limits.", correct: true, feedback: "'Mental' = crazy. 'Dying' = struggling badly. 'Know my limits' = being realistic. Classic Nando's banter!" },
                        { text: "I shall select a spice level appropriate to my tolerance.", correct: false, feedback: "It's Nando's with your mates, not a scientific experiment! Join the banter!" },
                        { text: "Go on then, big man! I dare you. I'll go hot — if you're going extra hot, I can't look soft, can I?", correct: true, feedback: "'Big man' = playful challenge. 'Look soft' = appear weak. Peer pressure at Nando's is real!" },
                        { text: "The Scoville rating of each option should be considered carefully.", correct: false, feedback: "Nobody calculates Scoville ratings at Nando's! Just pick a heat and banter about it!" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Oh mate, this extra hot is KILLING me. My lips are on fire. But I can't back down now — the lads would never let me live it down.",
                    prompt: "React to their suffering:",
                    options: [
                        { text: "Hahaha! Your face is bright red! Called it! Get some bottomless refill to cool down, you muppet.", correct: true, feedback: "'Called it' = predicted this. 'Bottomless refill' = free refill drinks. 'Muppet' = playful insult. Nando's banter perfected!" },
                        { text: "Your capsaicin sensitivity appears to be causing discomfort.", correct: false, feedback: "Capsaicin sensitivity?! Your mate is dying from the spice — laugh at them properly!" },
                        { text: "That's what you get for showing off! Rookie error, that. Here, have some of my halloumi — it might help.", correct: true, feedback: "'Showing off' = trying to impress. 'Rookie error' = beginner mistake. Offering food = being a good mate!" },
                        { text: "Perhaps a milder option would have been more prudent.", correct: false, feedback: "Don't be sensible! Laugh at your mate's suffering and offer them some coleslaw!" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "Right, who's getting the bill? I'm skint until Friday. Don't look at me like that — I'll get you next time, I promise!",
                    prompt: "React to splitting the bill:",
                    options: [
                        { text: "Every time! You always say you'll get the next one! Fine, I'll sort it, but you owe me big time, mate.", correct: true, feedback: "'Every time' = this always happens. 'Sort it' = handle it. 'Owe me big time' = major debt. Classic mate negotiations!" },
                        { text: "Financial obligations should be distributed equally among the party.", correct: false, feedback: "You sound like an accountant! Just say 'you owe me!' and sort the bill like mates do." },
                        { text: "Skint again?! Alright, I'll cover you this time, but next time it's your shout, no excuses!", correct: true, feedback: "'Skint' = broke. 'Cover you' = pay for you. 'Your shout' = your turn to pay. Proper mate rules!" },
                        { text: "I shall calculate each person's precise financial contribution.", correct: false, feedback: "Splitting to the penny is very un-British! Just figure out who's 'getting this one.'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-boxing',
            title: 'Boxing Day Sales',
            accent: 'uk',
            description: 'The day after Christmas — hitting the Boxing Day sales with a mate!',
            steps: [
                {
                    speaker: 'mate',
                    message: "Right, I've been up since stupid o'clock. These Boxing Day sales better be worth it. You ready?",
                    prompt: "React to the early start:",
                    options: [
                        { text: "Barely! I'm still full from yesterday. But if there's bargains to be had, I'm dragging myself out. Let's smash it!", correct: true, feedback: "'Still full from yesterday' = ate too much at Christmas. 'Bargains to be had' = deals available. 'Smash it' = do it well!" },
                        { text: "I am adequately prepared for the commercial expedition.", correct: false, feedback: "It's a shopping trip, not an expedition! Say you're 'ready to smash it!'" },
                        { text: "Mate, I've had about three hours' sleep and I'm still in a food coma. But a bargain's a bargain — let's go!", correct: true, feedback: "'Food coma' = sleepy from overeating. 'A bargain's a bargain' = deals are worth the effort. Relatable!" },
                        { text: "I shall endeavor to participate despite insufficient rest.", correct: false, feedback: "Too formal! Just say you're knackered but 'a bargain's a bargain!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "This is chaos! Look at all these people. It's like the Hunger Games in here. I just saw two women fighting over a toaster!",
                    prompt: "React to the Boxing Day madness:",
                    options: [
                        { text: "Mental, isn't it?! People lose their minds over a sale. Right, you hit clothing, I'll do electronics. Divide and conquer!", correct: true, feedback: "'Mental' = crazy. 'Lose their minds' = go crazy. 'Divide and conquer' = split up to be efficient. Tactical shopping!" },
                        { text: "The consumer behavior on display is quite remarkable.", correct: false, feedback: "You're in the middle of a Boxing Day scrum, not observing from a sociology lab! Get stuck in!" },
                        { text: "Mate, it's absolute bedlam! I love it though. Fighting over a toaster — you couldn't make it up! Right, let's crack on.", correct: true, feedback: "'Bedlam' = chaos. 'Couldn't make it up' = unbelievable. 'Crack on' = get going. Boxing Day warrior!" },
                        { text: "I suggest we implement an orderly shopping strategy.", correct: false, feedback: "There's no order on Boxing Day! Just dive in and say 'let's crack on!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "I just got a massive telly for half price! And a coat that was seventy quid down to twenty. I'm absolutely buzzing!",
                    prompt: "Celebrate the bargains:",
                    options: [
                        { text: "Mate, you've done well there! What a result! I bagged a pair of trainers for a tenner. Proper chuffed!", correct: true, feedback: "'Done well' = got great deals. 'Bagged' = got/claimed. 'Tenner' = ten pounds. 'Chuffed' = very pleased. Bargain hunters!" },
                        { text: "Your purchases represent favorable price-to-value ratios.", correct: false, feedback: "You sound like a spreadsheet! Say you're 'proper chuffed' with your 'bargains!'" },
                        { text: "Get in! That telly deal is quality. I've smashed it too — got loads of bits and bobs for dead cheap. Happy days!", correct: true, feedback: "'Quality' = excellent. 'Bits and bobs' = various things. 'Dead cheap' = very cheap. Boxing Day success!" },
                        { text: "Congratulations on securing the discounted merchandise.", correct: false, feedback: "Discounted merchandise?! Say 'what a bargain!' or 'you've smashed it!'" }
                    ]
                }
            ]
        },
        {
            id: 'uk-pubquiz',
            title: 'Pub Quiz Night',
            accent: 'uk',
            description: 'Tuesday night pub quiz with your mates. Trivia, tension, and terrible team names!',
            steps: [
                {
                    speaker: 'mate',
                    message: "Right, we need a team name. Last week we were 'Quiz Khalifa.' We need to top that.",
                    prompt: "Suggest a team name:",
                    options: [
                        { text: "How about 'Les Quizerables'? Or 'Agatha Quiztie'? We need something proper punny.", correct: true, feedback: "Pun-based quiz team names are a British institution! 'Proper punny' = very pun-heavy. Classic!" },
                        { text: "I suggest we use a straightforward descriptive team name.", correct: false, feedback: "Boring! Pub quiz names HAVE to be puns. That's literally the rule!" },
                        { text: "What about 'The Quizzard of Oz'? Or we could go with 'Quizteama Aguilera.' Go big or go home!", correct: true, feedback: "'Go big or go home' = be bold. Both names are top-tier pub quiz puns. You'd win the name round!" },
                        { text: "Team designation is irrelevant to quiz performance.", correct: false, feedback: "The team name is HALF the fun of a pub quiz! Get creative with the puns!" }
                    ]
                },
                {
                    speaker: 'quizmaster',
                    message: "Question seven — for two points: In what year did the Great Fire of London take place?",
                    prompt: "Discuss the answer with your team:",
                    options: [
                        { text: "Ooh, I know this! It's 1666, definitely. I'd put money on it. Write it down!", correct: true, feedback: "'Put money on it' = very confident. Acting certain about answers is half the fun of pub quizzes!" },
                        { text: "I believe the historically documented date is 1666.", correct: false, feedback: "Too formal! In a pub quiz you say 'I know this!' or 'trust me on this one!'" },
                        { text: "Sixteen sixty-six, innit? Remember it from school — stuck in my head. Trust me on this one, lads!", correct: true, feedback: "'Innit' = right? 'Stuck in my head' = memorable. 'Trust me on this one' = classic pub quiz confidence!" },
                        { text: "The answer requires careful consideration and verification.", correct: false, feedback: "You can't Google it in a pub quiz! Just back yourself and say '1666!'" }
                    ]
                },
                {
                    speaker: 'mate',
                    message: "We're one point behind going into the music round. This is our round — we've GOT to nail it!",
                    prompt: "Hype up the team for the final round:",
                    options: [
                        { text: "Right, this is it! Music's our bread and butter. We've got this in the bag. Come on, team!", correct: true, feedback: "'Bread and butter' = strong point. 'In the bag' = certain to win. Rally the troops!" },
                        { text: "The probability of winning remains dependent on our collective knowledge.", correct: false, feedback: "Nobody wants probability talk in a tense quiz moment! Say 'we've got this!'" },
                        { text: "One point?! That's nothing! We're going to smash this round and absolutely mug them off. Game on!", correct: true, feedback: "'Smash this round' = ace it. 'Mug them off' = show them up. 'Game on' = let's compete. Competitive spirit!" },
                        { text: "We should focus on optimizing our response accuracy.", correct: false, feedback: "It's a pub quiz, not a NASA mission! Say 'we've got this!' and get competitive!" }
                    ]
                },
                {
                    speaker: 'quizmaster',
                    message: "And the winners tonight are... table seven! Well done, you lot!",
                    prompt: "Celebrate winning the pub quiz:",
                    options: [
                        { text: "GET IN! We've only gone and won it! Drinks all round! What a result! Unbeatable, we are!", correct: true, feedback: "'Get in!' = celebration. 'Gone and won it' = actually won. 'Drinks all round' = buying for everyone. Victory!" },
                        { text: "Our collective trivia knowledge proved sufficient for victory.", correct: false, feedback: "You just WON the pub quiz! Scream 'GET IN!' and buy a round!" },
                        { text: "Yes, lads! Champions! That's what I'm talking about! Same time next week — we're defending our title!", correct: true, feedback: "'Yes, lads!' = team celebration. 'Defending our title' = coming back as champions. Pub quiz glory!" },
                        { text: "The outcome is satisfactory. We achieved first place.", correct: false, feedback: "Satisfactory?! You just WON! Celebrate properly — 'GET IN!' and buy some drinks!" }
                    ]
                }
            ]
        },
        {
            id: 'uk-commute',
            title: 'Morning Commute Rant',
            accent: 'uk',
            description: 'Arriving at work after an awful commute. Time for a proper moan with your colleague!',
            steps: [
                {
                    speaker: 'colleague',
                    message: "Morning! You look like you've had a rough one. Alright?",
                    prompt: "Rant about your terrible commute:",
                    options: [
                        { text: "Don't even get me started! The M25 was an absolute car park. Took me two hours to get in. I'm fuming.", correct: true, feedback: "'Car park' = not moving (so congested it's like a parking lot). 'Fuming' = very angry. Classic commute rant!" },
                        { text: "My commute was adversely impacted by traffic congestion.", correct: false, feedback: "Too corporate! You're ranting to a work friend, not writing an incident report. Say you're 'fuming!'" },
                        { text: "Mate, it was a nightmare! Some muppet broke down in the fast lane and everything ground to a halt. I need a coffee. Now.", correct: true, feedback: "'Nightmare' = awful. 'Muppet' = fool. 'Ground to a halt' = completely stopped. Proper commute moan!" },
                        { text: "Traffic conditions were suboptimal this morning.", correct: false, feedback: "Suboptimal?! You just sat in traffic for two hours! Let rip and say it was 'an absolute nightmare!'" }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "Tell me about it. I was on the tube and it was sardines in there. Some bloke's armpit was literally in my face for twenty minutes.",
                    prompt: "Commiserate about public transport:",
                    options: [
                        { text: "Grim! The tube in rush hour is proper rank. I don't know how you do it every day. Rather you than me!", correct: true, feedback: "'Grim' = horrible. 'Proper rank' = really disgusting. 'Rather you than me' = glad it's not my problem. Empathetic moaning!" },
                        { text: "Public transport overcrowding is a significant urban issue.", correct: false, feedback: "Save the policy analysis for the meeting! Your colleague needs sympathy — say 'that's grim!'" },
                        { text: "Oh mate, that is absolutely minging. Bless you. At least you made it in one piece. Fancy a brew to recover?", correct: true, feedback: "'Minging' = disgusting. 'Bless you' = poor you. 'Brew' = cup of tea. Offering tea = peak British kindness!" },
                        { text: "The population density on your commute sounds unpleasant.", correct: false, feedback: "Population density?! Say 'that's minging!' and offer them a brew!" }
                    ]
                },
                {
                    speaker: 'colleague',
                    message: "Honestly, I'm ready to jack it all in and work from a beach somewhere. This commute is slowly killing me.",
                    prompt: "Agree with the fantasy of escaping:",
                    options: [
                        { text: "Same! I've been looking at remote jobs, no word of a lie. Can't hack this commute much longer.", correct: true, feedback: "'No word of a lie' = honestly. 'Can't hack it' = can't tolerate it. Relatable escape fantasy!" },
                        { text: "Career relocation would require careful financial planning.", correct: false, feedback: "Your colleague is venting, not asking for financial advice! Join the daydream!" },
                        { text: "Mate, I'm with you. Sod the commute. We'd be much happier in the Maldives. Right, back to reality — what's the plan for today?", correct: true, feedback: "'Sod the commute' = forget the commute. 'Back to reality' = returning to work. Brief daydream, then back to it. Very British!" },
                        { text: "Remote employment opportunities are worth investigating.", correct: false, feedback: "They're not genuinely job searching — it's a moan! Say 'sod the commute' and dream together!" }
                    ]
                }
            ]
        },
        // --- NEW Mixed/Cross-Cultural Scenarios ---
        {
            id: 'mix-office',
            title: 'International Office Meeting',
            accent: 'mix',
            description: 'A meeting with American and British colleagues. Navigate both styles of English!',
            steps: [
                {
                    speaker: 'American boss',
                    message: "Alright team, let's circle back on the Q3 numbers. We need to move the needle on this. Who wants to take point?",
                    prompt: "Volunteer while navigating corporate speak:",
                    options: [
                        { text: "I can take the lead on that. I've been crunching the numbers and I think we've got some solid insights to share.", correct: true, feedback: "'Take the lead' = volunteer. 'Crunching the numbers' = analyzing data. 'Solid insights' = good findings. Professional but natural!" },
                        { text: "I shall endeavor to spearhead the initiative at your behest.", correct: false, feedback: "Even for a meeting, this is way too stiff! 'I can take the lead' is confident and natural." },
                        { text: "Yeah, I'll run with it. I've been deep-diving into the data and there are some quick wins we can flag up.", correct: true, feedback: "'Run with it' = take ownership. 'Deep-diving' = thoroughly analyzing. 'Quick wins' = easy improvements. Smart move!" },
                        { text: "I am available to assume responsibility for the aforementioned task.", correct: false, feedback: "Nobody talks like that, even in meetings! Say 'I'll take the lead' or 'I'll run with it.'" }
                    ]
                },
                {
                    speaker: 'British colleague',
                    message: "Brilliant. While we're at it, shall we touch base on the client feedback? It's been a bit of a mixed bag, to be honest.",
                    prompt: "Respond to the update:",
                    options: [
                        { text: "Yeah, for sure. Some of the feedback was spot on but a few things were a bit off-base. We should probably loop in the design team.", correct: true, feedback: "'Spot on' = exactly right (British). 'Off-base' = wrong (American). 'Loop in' = include. Nice mix!" },
                        { text: "The client feedback requires systematic categorization and response.", correct: false, feedback: "Too robotic! In a real meeting, you'd say 'some was spot on, some was off' and suggest next steps." },
                        { text: "Absolutely. I reckon we should flag the key issues and get everyone on the same page before the next call.", correct: true, feedback: "'Reckon' = think (casual). 'Flag' = highlight. 'On the same page' = aligned. Natural meeting language!" },
                        { text: "I acknowledge the feedback has been received and will be processed accordingly.", correct: false, feedback: "You sound like an automated email reply! Be more conversational." }
                    ]
                },
                {
                    speaker: 'American boss',
                    message: "Great discussion, team. Let's not boil the ocean here — let's pick the low-hanging fruit first. Can we sync up tomorrow AM?",
                    prompt: "Agree to follow up:",
                    options: [
                        { text: "Sounds good! I'll pull together an action plan tonight and we can hit the ground running tomorrow.", correct: true, feedback: "'Pull together' = create. 'Hit the ground running' = start productively. Showing initiative!" },
                        { text: "I will prepare the requisite documentation for the subsequent meeting.", correct: false, feedback: "Way too formal! Even in a work setting, 'sounds good' and 'I'll get it sorted' work fine." },
                        { text: "Yeah, crack on. I'll get the key bits sorted by morning. Fancy a quick coffee after to hash it out properly?", correct: true, feedback: "'Crack on' = get going (British). 'Key bits sorted' = main things done. 'Hash it out' = discuss thoroughly. Professional and friendly!" },
                        { text: "The proposed timeline for the follow-up engagement is acceptable.", correct: false, feedback: "You're talking to your team, not writing a contract! Say 'sounds good' and commit to next steps." }
                    ]
                },
                {
                    speaker: 'British colleague',
                    message: "Cheers, everyone. Good stuff. Right, I'm gasping for a cuppa — anyone else?",
                    prompt: "Respond to the tea offer:",
                    options: [
                        { text: "Oh, yes please! I could murder a tea right now. Milk, no sugar. You're a lifesaver!", correct: true, feedback: "'Could murder a tea' = desperately want one (British). 'Lifesaver' = you're very helpful. Tea culture!" },
                        { text: "I would appreciate a caffeinated beverage at this juncture.", correct: false, feedback: "Caffeinated beverage?! It's a cuppa! Say 'yes please, you're a lifesaver!'" },
                        { text: "Go on then! I'll have one too. And great session everyone — really productive. Catch you all tomorrow.", correct: true, feedback: "'Go on then' = yes please (British). Wrapping up warmly while accepting tea. Perfect office exit!" },
                        { text: "I shall decline the refreshment offer at this time.", correct: false, feedback: "Never turn down a cuppa offer from a colleague! It's basically a bonding ritual." }
                    ]
                }
            ]
        },
        {
            id: 'mix-confusion',
            title: 'Lost in Translation',
            accent: 'mix',
            description: 'An American and a Brit realize they speak very different versions of English!',
            steps: [
                {
                    speaker: 'British friend',
                    message: "I'll just nip to the boot and grab my jumper — it's a bit nippy out. Back in a tick!",
                    prompt: "You're American and confused. What do they mean?",
                    options: [
                        { text: "Wait — the boot? Your jumper? Oh! You mean you're going to the trunk of your car to get a sweater. Got it!", correct: true, feedback: "Correct! 'Boot' = trunk (of car). 'Jumper' = sweater. 'Nippy' = chilly. 'In a tick' = in a moment. Translation complete!" },
                        { text: "Why would you jump into a boot? That makes no sense!", correct: false, feedback: "'Boot' = trunk (car). 'Jumper' = sweater. It's not about jumping into footwear!" },
                        { text: "Haha, I love British English! Boot is trunk, jumper is sweater, and nippy means cold, right? I'm learning!", correct: true, feedback: "You nailed all the translations! 'Boot' = trunk, 'jumper' = sweater, 'nippy' = cold. You're going native!" },
                        { text: "I don't understand any of those words.", correct: false, feedback: "Let's decode: 'boot' = car trunk, 'jumper' = sweater, 'nippy' = chilly, 'in a tick' = in a moment!" }
                    ]
                },
                {
                    speaker: 'American friend',
                    message: "Hey, can you pass me the chips and a napkin? And do you know where the bathroom is? I've been looking everywhere.",
                    prompt: "You're British — clarify the translation confusion:",
                    options: [
                        { text: "Chips? Oh, you mean crisps! And the bathroom — you want the loo? It's just down the corridor, mate.", correct: true, feedback: "US 'chips' = UK 'crisps'. US 'bathroom' = UK 'loo' or 'toilet'. Classic translation moment!" },
                        { text: "Here you go. The bathroom is down the hall.", correct: false, feedback: "You missed the cultural moment! Point out that 'chips' means crisps in the UK and the 'bathroom' is the 'loo.'" },
                        { text: "Ha! Right, so in British: you want the crisps and a serviette, and the loo's round the corner. Welcome to England!", correct: true, feedback: "'Crisps' = US chips. 'Serviette' = napkin. 'Loo' = bathroom. Full cultural translation service!" },
                        { text: "Those items are available in the designated areas.", correct: false, feedback: "You missed a great chance to teach some British English! Point out the differences." }
                    ]
                },
                {
                    speaker: 'British friend',
                    message: "I just realized — when I said I'd 'knock you up in the morning,' your face went bright red! In Britain it means I'll knock on your door to wake you up!",
                    prompt: "React to the embarrassing misunderstanding:",
                    options: [
                        { text: "OH! Okay, that makes SO much more sense! In America that means... something VERY different. I was so confused!", correct: true, feedback: "One of the most famous US/UK English misunderstandings! In the UK, 'knock you up' = wake you by knocking. In the US... very different!" },
                        { text: "I do not comprehend the cultural discrepancy.", correct: false, feedback: "This is a classic and hilarious UK/US mix-up! 'Knock you up' means wake you up in the UK but means... something else in the US." },
                        { text: "Hahahaha! I was DYING inside! Note to self: British English has some serious plot twists. You had me worried there!", correct: true, feedback: "'Dying inside' = mortified. 'Plot twists' = unexpected turns. The most famous UK/US misunderstanding!" },
                        { text: "The linguistic variation is noted.", correct: false, feedback: "This is a hilarious cultural moment! Laugh about it and learn the difference." }
                    ]
                }
            ]
        },
        {
            id: 'mix-exchange',
            title: 'Exchange Student Arrives',
            accent: 'mix',
            description: 'A British exchange student arrives at an American university. Culture shock ensues!',
            steps: [
                {
                    speaker: 'American roommate',
                    message: "Hey, welcome! So you're from England? That's awesome! I love the accent. Want to go grab some food? The dining hall has great fries today.",
                    prompt: "Respond as the British exchange student:",
                    options: [
                        { text: "Cheers, mate! Yeah, I'm from Manchester. I could go for some food — though I'm still getting used to calling chips 'fries!'", correct: true, feedback: "'Cheers' = thanks (British). Noting the chips/fries difference shows cultural awareness. Great introduction!" },
                        { text: "Thank you for your hospitable welcome to this educational institution.", correct: false, feedback: "Too formal! You're meeting your new roommate, not accepting an award. Be friendly!" },
                        { text: "Thanks! Lovely to meet you. I'm absolutely famished — skipped lunch on the plane. Lead the way! And yeah, the accent usually gets a reaction haha.", correct: true, feedback: "'Lovely to meet you' = warm British greeting. 'Famished' = very hungry (British). Good-humored about the accent. Natural!" },
                        { text: "I acknowledge your greeting and accept the dining proposal.", correct: false, feedback: "Lighten up! Say 'cheers' and be friendly — your roommate is excited to meet you!" }
                    ]
                },
                {
                    speaker: 'American roommate',
                    message: "So what's your major? I'm in business. Also — you guys really drink tea all the time? Is that a real thing?",
                    prompt: "Answer the questions naturally:",
                    options: [
                        { text: "I'm doing English Lit — or as you lot say, 'English major.' And yes mate, the tea thing is absolutely real. I'm gasping for a cuppa right now!", correct: true, feedback: "'You lot' = you guys (British). 'Gasping for a cuppa' = desperate for tea. Sharing real British culture!" },
                        { text: "My academic discipline is English Literature, and yes, tea consumption is culturally significant in Britain.", correct: false, feedback: "You sound like a textbook! Be casual — say you're 'doing English Lit' and 'gasping for a cuppa!'" },
                        { text: "English Lit! And mate, the tea thing is no joke — I've brought my own teabags because I've heard American tea is proper dodgy. No offence!", correct: true, feedback: "'Proper dodgy' = really bad. 'No offence' = don't take it personally. Bringing your own teabags = true Brit abroad!" },
                        { text: "I prefer not to perpetuate cultural stereotypes about my nationality.", correct: false, feedback: "The tea stereotype is true and beloved! Embrace it — say you 'can't function without a cuppa!'" }
                    ]
                },
                {
                    speaker: 'American roommate',
                    message: "Dude, there's a huge house party tonight. It's gonna be lit. You should totally come — it'll be a great way to meet people!",
                    prompt: "Accept the invite with British enthusiasm:",
                    options: [
                        { text: "Sounds brilliant! I'm well up for it. Is it like freshers over here? Back home we go absolutely mental during freshers week.", correct: true, feedback: "'Brilliant' = great. 'Well up for it' = keen. 'Freshers' = orientation week (UK). 'Mental' = crazy. Cultural comparison!" },
                        { text: "I shall consider the social engagement opportunity.", correct: false, feedback: "Your roommate is inviting you to a party! Don't be stiff — say 'I'm well up for it!'" },
                        { text: "I'm there! When in Rome, right? Just don't judge me if I say something dead British that nobody understands!", correct: true, feedback: "'When in Rome' = adapt to local customs. 'Dead British' = very British. Self-aware and fun!" },
                        { text: "I will attend the gathering at the designated time.", correct: false, feedback: "You're an exchange student at a party invite, not a diplomat at a summit! Be excited!" }
                    ]
                },
                {
                    speaker: 'new American friend',
                    message: "So wait — in England, the first floor isn't the ground floor? And you guys call math 'maths'? With an S? Wild.",
                    prompt: "Explain British English differences:",
                    options: [
                        { text: "Haha, yeah! Ground floor is floor zero for us, and then first floor is what you call the second floor. And it IS maths — there's more than one math, innit?", correct: true, feedback: "Great explanation with humor! The floor numbering difference trips up many visitors. 'Maths' = British standard!" },
                        { text: "The numerical designation of building levels differs between our nations.", correct: false, feedback: "You'll bore everyone to sleep! Explain it casually with humor like 'there's more than one math, innit?'" },
                        { text: "Mate, that's just the start! We say 'boot' for trunk, 'bonnet' for hood, and we put a 'u' in colour. You lot dropped it somewhere along the way!", correct: true, feedback: "Listing fun differences is a great conversation move. 'You lot dropped it' = playful teasing. Cultural exchange at its finest!" },
                        { text: "There are numerous lexical differences between American and British English.", correct: false, feedback: "Don't lecture — banter! Share the fun differences and tease each other about them." }
                    ]
                }
            ]
        },
        {
            id: 'mix-restaurant',
            title: 'International Restaurant',
            accent: 'mix',
            description: 'Americans and Brits dining together navigate menu and tipping culture differences!',
            steps: [
                {
                    speaker: 'American friend',
                    message: "Everything looks amazing! I'm getting the burger. Should we ask for a check when we're done? And what's the tipping situation here in the UK?",
                    prompt: "Explain British restaurant culture:",
                    options: [
                        { text: "So here you'd ask for the bill, not the check. And tipping isn't as big a deal — ten percent is generous, and sometimes service is included already.", correct: true, feedback: "'Bill' not 'check' (UK). Tipping culture is very different — 10% or service charge included. Great cultural guide!" },
                        { text: "The payment customs differ between our respective nations.", correct: false, feedback: "Too vague! Explain that it's 'the bill' here and that tipping culture is different." },
                        { text: "Welcome to Britain, mate! It's 'the bill' here, and nobody tips twenty percent like you lot do. Service charge is usually on there already. Lovely, isn't it?", correct: true, feedback: "'The bill' = UK term. 'You lot' = you guys. 'Service charge included' = key difference. 'Lovely isn't it' = cheeky!" },
                        { text: "I am unfamiliar with the local dining customs.", correct: false, feedback: "Help your friend! Explain 'bill' vs 'check' and the different tipping culture." }
                    ]
                },
                {
                    speaker: 'British friend',
                    message: "I fancy a pudding. What are you having? Oh wait — you call it dessert, don't you? And your portions are absolutely massive compared to ours!",
                    prompt: "Respond to the dessert/pudding discussion:",
                    options: [
                        { text: "Ha! Yeah, 'pudding' is dessert for us Americans. And guilty as charged on the portions — go big or go home, right?", correct: true, feedback: "'Pudding' = dessert (UK general term). 'Go big or go home' = American motto. Fun cultural comparison!" },
                        { text: "The nomenclature for the final course varies between dialects.", correct: false, feedback: "You sound like a linguistics paper! Just laugh about 'pudding' vs 'dessert' like normal people." },
                        { text: "You call ALL desserts 'pudding'? That's actually kind of great. And yeah, our portions are wild — but that just means leftovers, baby!", correct: true, feedback: "'Kind of great' = appreciating the difference. 'Wild' = crazy big. 'Leftovers' = positive spin. Fun attitude!" },
                        { text: "I will order the standard dessert option.", correct: false, feedback: "Engage with the cultural differences! It's a fun conversation about pudding vs dessert!" }
                    ]
                },
                {
                    speaker: 'waiter',
                    message: "How was everything, folks? Can I get you anything else or shall I bring the bill?",
                    prompt: "Respond to the waiter:",
                    options: [
                        { text: "Everything was lovely, cheers! Just the bill when you're ready, please. Brilliant meal!", correct: true, feedback: "'Lovely' = great. 'Cheers' = thanks. 'When you're ready' = polite UK phrasing. 'Brilliant' = excellent. Properly British!" },
                        { text: "The meal was satisfactory. Please process our payment.", correct: false, feedback: "Way too cold! Compliment the food — 'everything was lovely' or 'absolutely brilliant!'" },
                        { text: "That was amazing, thank you! Could we get the bill? And compliments to the chef — the food was absolutely banging.", correct: true, feedback: "'Banging' = excellent. 'Compliments to the chef' = polite touch. Warm and appreciative. Great dining etiquette!" },
                        { text: "We are prepared to settle the financial obligation.", correct: false, feedback: "Financial obligation?! Just say 'the bill please' and compliment the food!" }
                    ]
                }
            ]
        },
        {
            id: 'mix-wedding',
            title: 'Cross-Cultural Wedding',
            accent: 'mix',
            description: 'An American-British wedding. Navigate the social customs and vocabulary from both sides!',
            steps: [
                {
                    speaker: 'British guest',
                    message: "What a lovely do this is! The bride looks absolutely stunning. Have you been to the drinks reception yet? They've got Pimm's and champagne.",
                    prompt: "Respond about the wedding:",
                    options: [
                        { text: "It's gorgeous! I've never had Pimm's before — is it any good? The whole thing feels like something out of a movie. So classy!", correct: true, feedback: "'Gorgeous' = beautiful. Asking about Pimm's shows cultural curiosity. 'So classy' = very elegant. Good mix of US/UK!" },
                        { text: "The wedding celebration meets all standard requirements.", correct: false, feedback: "It's a wedding, not an inspection! Say it's 'gorgeous' or 'absolutely beautiful!'" },
                        { text: "This is beautiful! And Pimm's? I'm so down to try it — when in England, right? The vibes are immaculate.", correct: true, feedback: "'I'm so down' = keen (US). 'When in England' = embracing the culture. 'Vibes immaculate' = perfect atmosphere!" },
                        { text: "I shall sample the available beverages in due course.", correct: false, feedback: "In due course?! Grab some Pimm's and enjoy the wedding!" }
                    ]
                },
                {
                    speaker: 'American guest',
                    message: "Okay wait — the best man's speech was HILARIOUS. Do they always roast the groom that hard in British weddings?",
                    prompt: "Explain British wedding speech culture:",
                    options: [
                        { text: "Oh absolutely! The best man's job is basically to embarrass the groom as much as possible. It's tradition! The more cringe, the better.", correct: true, feedback: "'Embarrass the groom' = essential duty. 'The more cringe the better' = awkward stories are expected. Spot on!" },
                        { text: "British wedding speech customs differ from American conventions.", correct: false, feedback: "That's dry as toast! Share the fun of it — 'the more embarrassing, the better!'" },
                        { text: "Mate, that's nothing! I've been to weddings where the best man had actual PowerPoint slides of embarrassing photos. It's brutal but everyone loves it!", correct: true, feedback: "'That's nothing' = there's worse. PowerPoint slides at weddings = genuinely common in the UK. Cultural insight with humor!" },
                        { text: "The level of comedic intensity in the speech was notable.", correct: false, feedback: "Comedic intensity?! Say 'it was hilarious' and explain it's tradition to roast the groom!" }
                    ]
                },
                {
                    speaker: 'British guest',
                    message: "Right, they're doing the first dance now. Then it's the ceilidh — do you know how to do a Gay Gordons? It's proper good fun!",
                    prompt: "React to the dancing:",
                    options: [
                        { text: "A ceilidh? I have no idea what that is but I am SO in! Just don't laugh too hard when I mess it up!", correct: true, feedback: "'SO in' = very keen (US). A ceilidh is a traditional Scottish/Irish group dance. Willingness to try = great attitude!" },
                        { text: "I am unfamiliar with the traditional dance forms of the British Isles.", correct: false, feedback: "Don't be a wallflower! Say 'I'm in!' and have a go, even if you don't know the steps." },
                        { text: "I have zero clue what a ceilidh is but sign me up! This wedding keeps getting better. Just grab my hand and I'll follow your lead!", correct: true, feedback: "'Zero clue' = no idea. 'Sign me up' = I want in. 'Follow your lead' = I'll learn. Enthusiastic and open-minded!" },
                        { text: "I prefer to observe from a seated position.", correct: false, feedback: "Nobody sits out a ceilidh! Get on the dance floor and give it a go!" }
                    ]
                },
                {
                    speaker: 'friend',
                    message: "That was honestly one of the best weddings I've ever been to. The mix of American and British touches was so cool. Bacon butties at midnight was genius!",
                    prompt: "Agree about the wedding:",
                    options: [
                        { text: "Iconic wedding! The Pimm's, the ceilidh, and then bacon sandwiches at midnight? Chef's kiss. I'm stealing that idea for mine.", correct: true, feedback: "'Iconic' = amazing/memorable. 'Chef's kiss' = perfect. 'Stealing that idea' = will copy it. Wedding goals!" },
                        { text: "The event was well-organized and the catering was satisfactory.", correct: false, feedback: "Satisfactory?! It was the best wedding ever! Say it was 'iconic' or 'absolutely unreal!'" },
                        { text: "Best wedding ever, no cap! The whole US-UK mashup was elite. And bacon butties at midnight? That's the most British thing I've ever experienced and I loved every bite!", correct: true, feedback: "'No cap' = seriously (US). 'Elite' = top tier. 'Bacon butties' = bacon sandwiches (UK). Perfect cultural fusion appreciation!" },
                        { text: "The intercultural nuptial celebration was aesthetically pleasing.", correct: false, feedback: "Nuptial celebration?! Just say 'best wedding ever' and rave about the bacon butties!" }
                    ]
                }
            ]
        },
        {
            id: 'mix-airport',
            title: 'Airport Layover Chat',
            accent: 'mix',
            description: 'Stuck at the airport during a long layover. Chat with a stranger from across the pond!',
            steps: [
                {
                    speaker: 'British stranger',
                    message: "Excuse me, is this seat taken? My flight's been delayed three hours. Absolute nightmare. Where are you headed?",
                    prompt: "Start a friendly conversation:",
                    options: [
                        { text: "Go for it! My flight's delayed too — typical, right? I'm heading to New York. Three hours, ugh. At least there's WiFi.", correct: true, feedback: "'Go for it' = help yourself. 'Typical' = expected (shared travel misery). Friendly airport bonding!" },
                        { text: "The seat is unoccupied. You may utilize it.", correct: false, feedback: "Lighten up! A stranger is being friendly. Say 'go for it' and bond over delayed flights!" },
                        { text: "All yours, mate! — wait, can I say 'mate'? I'm American but I've been in London a week and it's rubbing off on me. Flight to JFK, super delayed.", correct: true, feedback: "'All yours' = help yourself. Joking about picking up British slang = charming icebreaker. Great conversation starter!" },
                        { text: "This seating area is available for public use.", correct: false, feedback: "You sound like an airport announcement! Be friendly — 'all yours!' and start chatting." }
                    ]
                },
                {
                    speaker: 'British stranger',
                    message: "Ha! New York — brilliant. I've always wanted to go. Is it really as mental as everyone says? And is the food as good as they reckon?",
                    prompt: "Tell them about New York:",
                    options: [
                        { text: "Dude, it's insane — in the best way. The energy is unreal. And the food? Don't even get me started. Pizza alone is worth the trip, no cap.", correct: true, feedback: "'Insane in the best way' = amazing. 'Energy is unreal' = incredible atmosphere. 'No cap' = seriously. Great NYC sell!" },
                        { text: "New York City is a significant metropolitan area with diverse dining options.", correct: false, feedback: "That's a Wikipedia entry! Sell NYC with enthusiasm — 'the energy is unreal!'" },
                        { text: "It's everything you've heard and more! Honestly, it's mad busy but in a good way. The pizza is life-changing and the bagels are elite. You'd love it!", correct: true, feedback: "'Mad busy' = very busy (works in both dialects). 'Life-changing' = incredibly good. 'Elite' = top tier. Enthusiastic!" },
                        { text: "The urban environment is stimulating and the cuisine is varied.", correct: false, feedback: "Stimulating?! Say 'it's mental' or 'the energy is unreal!' Match their enthusiasm!" }
                    ]
                },
                {
                    speaker: 'British stranger',
                    message: "Right, they're finally boarding my gate. Lovely chatting to you! If you're ever in London, look me up — I'll show you all the proper spots!",
                    prompt: "Say goodbye warmly:",
                    options: [
                        { text: "It was great talking to you! I'll definitely take you up on that. Safe travels and enjoy your trip! Maybe I'll see you around!", correct: true, feedback: "'Take you up on that' = accept the offer. 'Safe travels' = standard warm goodbye. Natural and friendly!" },
                        { text: "The conversation was pleasant. I wish you safe passage.", correct: false, feedback: "Safe passage?! You're not a ship captain. Say 'safe travels' or 'have a good one!'" },
                        { text: "Cheers, mate! — see, I'm getting better at this! Have a safe flight and I'll one hundred percent hit you up if I'm in London. Legend!", correct: true, feedback: "'Cheers' = thanks (using British). 'Hit you up' = contact you (US). 'Legend' = great person. Perfect cross-cultural goodbye!" },
                        { text: "Acknowledged. I will add your information to my contact database.", correct: false, feedback: "Contact database?! Say 'cheers' and 'have a safe flight' like a normal person!" }
                    ]
                }
            ]
        },
        {
            id: 'mix-flatshare',
            title: 'International Flatshare',
            accent: 'mix',
            description: 'An American and a Brit sharing a flat in London. Daily life brings hilarious language clashes!',
            steps: [
                {
                    speaker: 'British flatmate',
                    message: "I've put the hoover round the lounge and sorted the kitchen. Could you do the bins? They're absolutely minging.",
                    prompt: "Respond (you're the American flatmate):",
                    options: [
                        { text: "Hoover, lounge, bins... okay I THINK you mean you vacuumed the living room and want me to take out the trash? On it!", correct: true, feedback: "'Hoover' = vacuum. 'Lounge' = living room. 'Bins' = trash. 'Minging' = disgusting. Cultural translation success!" },
                        { text: "I am unable to parse the colloquial terminology you have employed.", correct: false, feedback: "Don't give up! 'Hoover' = vacuum, 'lounge' = living room, 'bins' = trash. You'll learn!" },
                        { text: "Haha, I'm getting better at this! Vacuumed the living room, got it. I'll take the trash — sorry, BINS — out right now. They are pretty gross!", correct: true, feedback: "Self-correcting 'trash' to 'bins' = great adaptation. 'Gross' and 'minging' both mean disgusting. Adjusting well!" },
                        { text: "Please use standard American English for my comprehension.", correct: false, feedback: "You're living in London — embrace the British terms! 'Hoover' = vacuum, 'bins' = trash!" }
                    ]
                },
                {
                    speaker: 'American flatmate',
                    message: "Hey, I left my sneakers by the front door and my sweater on the couch. Also, do we have any cookies left?",
                    prompt: "Respond (you're the British flatmate):",
                    options: [
                        { text: "You mean your trainers, jumper, and biscuits? Yeah, they're all where you left them. You're SO American, it's brilliant.", correct: true, feedback: "'Trainers' = sneakers. 'Jumper' = sweater. 'Biscuits' = cookies. 'Sofa' = couch. Teaching British terms with humor!" },
                        { text: "The items you described are in their respective locations.", correct: false, feedback: "Miss a great chance to teach British vocabulary! Point out trainers, jumper, and biscuits!" },
                        { text: "Trainers by the door, jumper on the sofa, and yes there are biscuits in the cupboard. I'm basically your English-to-English translator at this point!", correct: true, feedback: "Translating all three items AND adding 'cupboard' (cabinet). 'English-to-English translator' = brilliant observation!" },
                        { text: "I acknowledge the location of your possessions.", correct: false, feedback: "Have some fun with the language differences! Correct 'sneakers' to 'trainers' playfully!" }
                    ]
                },
                {
                    speaker: 'British flatmate',
                    message: "Right, I'm knackered. Shall we get a takeaway tonight? I fancy a curry. Can't be arsed to cook.",
                    prompt: "Agree to ordering in:",
                    options: [
                        { text: "A takeaway — that's takeout, right? I'm so down. I've been craving Indian food. Let's do it! You order since you know the good spots.", correct: true, feedback: "'Takeaway' = takeout (UK). 'I'm so down' = I'm keen (US). Blending both dialects naturally!" },
                        { text: "I shall research the optimal dining delivery services.", correct: false, feedback: "Your flatmate is hungry and tired! Just say 'I'm down!' and help order." },
                        { text: "Absolutely! I'm beat too. A curry sounds amazing — is that like a regular thing here? Because I could get used to this life real quick.", correct: true, feedback: "'Beat' = tired (US equivalent of 'knackered'). Curry takeaway = very British tradition. Embracing the culture!" },
                        { text: "I have no preference regarding the evening meal procurement method.", correct: false, feedback: "Just say yes! Your flatmate wants curry and you should be excited about it!" }
                    ]
                },
                {
                    speaker: 'American flatmate',
                    message: "Okay I just tried to ask for a 'check' at a restaurant and the waiter looked at me like I was crazy. Living here is an adventure every day!",
                    prompt: "React to the cultural mishap:",
                    options: [
                        { text: "Ha! It's 'the bill' here, mate! Classic American moment. Don't worry, I still accidentally say 'sidewalk' instead of 'pavement.' We're both learning!", correct: true, feedback: "'The bill' = the check (UK). 'Sidewalk' = pavement. Mutual cultural learning makes great flatmate bonding!" },
                        { text: "Terminology differences are an expected challenge of international relocation.", correct: false, feedback: "Your flatmate is sharing a funny story! Laugh with them and share your own mix-ups!" },
                        { text: "Oh no, not the check vs bill thing! Wait till you accidentally ask for the 'restroom' — they'll know you're American instantly. Just say 'loo' and you'll blend right in!", correct: true, feedback: "'Restroom' = very American. 'Loo' = British toilet/bathroom. Coaching your flatmate on blending in. Helpful and fun!" },
                        { text: "The waiter should have been more accommodating of international visitors.", correct: false, feedback: "It's not a complaint moment — it's a funny story! Laugh about it and swap similar experiences." }
                    ]
                }
            ]
        },
        {
            id: 'mix-sports',
            title: 'Football vs Soccer',
            accent: 'mix',
            description: 'The eternal debate — is it football or soccer? Americans and Brits collide over sport!',
            steps: [
                {
                    speaker: 'British friend',
                    message: "Did you watch the football last night? What a match! Three-two in injury time — absolutely mental!",
                    prompt: "Respond (you're American):",
                    options: [
                        { text: "Wait — football as in soccer, right? Not like NFL football? Because yes, that game was insane! I'm getting into it, honestly!", correct: true, feedback: "Clarifying 'football' = soccer for Americans is smart. 'Getting into it' = becoming a fan. Cultural bridge-building!" },
                        { text: "I did not observe the sporting event in question.", correct: false, feedback: "Your friend is buzzing about the match! Engage with them — ask about it!" },
                        { text: "Yes! Okay I know you guys hate when I call it soccer, but that game was WILD! Injury time goals are the most dramatic thing in sports, no debate.", correct: true, feedback: "Acknowledging the soccer/football tension with humor. 'Wild' = crazy. Appreciating the drama shows genuine interest!" },
                        { text: "I remain indifferent to international sporting terminology debates.", correct: false, feedback: "Don't be boring! The football/soccer debate is a fun cultural touchpoint. Engage with it!" }
                    ]
                },
                {
                    speaker: 'American friend',
                    message: "Okay but REAL football — like the NFL — the Super Bowl is coming up. You guys don't get it, but it's basically our World Cup!",
                    prompt: "Respond (you're British):",
                    options: [
                        { text: "Mate, I've tried watching American football but I don't understand why they stop every five seconds! It's like rugby but with padding and ad breaks!", correct: true, feedback: "Comparing NFL to rugby = classic British take. 'Ad breaks' = commercials. Lighthearted cultural teasing!" },
                        { text: "American football is a sport I have not studied in sufficient depth.", correct: false, feedback: "Don't be so formal! Give a cheeky opinion — Brits love playfully teasing American football." },
                        { text: "Fair enough, I'll give it a go! But you're watching the Premier League with me in return. And it's FOOTBALL, not soccer — deal?", correct: true, feedback: "'Give it a go' = try it (British). Negotiating a cultural exchange. 'It's FOOTBALL' = standing firm. Great banter!" },
                        { text: "I acknowledge the cultural significance of your preferred sporting event.", correct: false, feedback: "Too diplomatic! Have some banter — tease the NFL and defend real football!" }
                    ]
                },
                {
                    speaker: 'both friends',
                    message: "Okay so we're doing a Super Bowl party AND a Premier League watch next weekend. This is going to be interesting!",
                    prompt: "React to the cross-cultural sports plan:",
                    options: [
                        { text: "Love it! I'll bring the wings and nachos for Super Bowl, you bring the pies and pints for the footie. Best of both worlds!", correct: true, feedback: "'Wings and nachos' = US game food. 'Pies and pints' = UK match food. 'Footie' = football (casual). Cultural fusion!" },
                        { text: "The combined viewing arrangement is logistically feasible.", correct: false, feedback: "Logistically feasible?! It's a fun sports hangout! Say 'love it!' and plan the snacks." },
                        { text: "This is class! I'm buzzing for both honestly. I'll explain offside if you explain what a tight end is. Deal?", correct: true, feedback: "'Class' = great (British). 'Buzzing' = excited. Offside vs tight end = hilarious cultural exchange idea!" },
                        { text: "I will attend both sporting events as scheduled.", correct: false, feedback: "Show some excitement! It's a fun cultural exchange over sports and snacks!" }
                    ]
                }
            ]
        }
    ],

    // === Daily Rotation Helper ===
    _getDailySubset(arr, count, salt) {
        const today = new Date();
        const dateStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
        const indices = [];
        for (let i = 0; i < count && i < arr.length; i++) {
            const seed = dateStr + ':' + salt + ':' + i;
            let hash = 0;
            for (let j = 0; j < seed.length; j++) { hash = ((hash << 5) - hash) + seed.charCodeAt(j); hash = hash & hash; }
            let idx = Math.abs(hash) % arr.length;
            while (indices.includes(idx)) { idx = (idx + 1) % arr.length; }
            indices.push(idx);
        }
        return indices.map(i => arr[i]);
    },

    // === Render Methods ===

    renderScenarioSelector(container) {
        const allUS = this.scenarios.filter(s => s.accent === 'us');
        const allUK = this.scenarios.filter(s => s.accent === 'uk');
        const allMix = this.scenarios.filter(s => s.accent === 'mix');
        const showingAll = container.dataset.showAll === 'true';

        const usScenarios = showingAll ? allUS : this._getDailySubset(allUS, 3, 'chat-us');
        const ukScenarios = showingAll ? allUK : this._getDailySubset(allUK, 3, 'chat-uk');
        const mixScenarios = showingAll ? allMix : this._getDailySubset(allMix, 2, 'chat-mix');
        const totalShowing = usScenarios.length + ukScenarios.length + mixScenarios.length;
        const totalAll = this.scenarios.length;

        let html = `
            <div class="chat-intro">
                <h3>Slang Conversation Practice</h3>
                <p>Practice using slang in realistic conversations. Pick a scenario and respond with the right slang!</p>
                <div class="daily-rotation-info">Showing ${totalShowing} of ${totalAll} scenarios${showingAll ? '' : ' (today\'s selection)'}</div>
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

        html += `<div style="text-align:center;margin:20px 0;">
            <button class="btn-show-all" id="chat-toggle">${showingAll ? 'Show Today\'s Selection' : `Show All ${totalAll} Scenarios`}</button>
        </div>`;

        container.innerHTML = html;

        // Attach click handlers
        container.querySelectorAll('.scenario-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-scenario');
                this.startScenario(id, container);
            });
        });

        container.querySelector('#chat-toggle').addEventListener('click', () => {
            container.dataset.showAll = showingAll ? 'false' : 'true';
            this.renderScenarioSelector(container);
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
