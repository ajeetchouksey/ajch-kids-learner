
/* ============================ CONTENT ============================ */
const SECTIONS = {
  "The Alphabet":{c:"#2F5BEA",l:"#DCE5FF"},
  "Verbs":{c:"#E0443E",l:"#FDE2E1"},
  "Nouns":{c:"#1F9D63",l:"#D9F4E6"},
  "Articles":{c:"#7C4DDB",l:"#ECE4FC"},
  "Adverbs":{c:"#0E9488",l:"#D2F3EF"},
  "Adjectives":{c:"#D6397E",l:"#FCE1EE"},
  "Conjunctions":{c:"#D97A06",l:"#FDEBCD"},
  "Prepositions":{c:"#4B54D9",l:"#E2E4FB"}
};
const UNITS = [
{id:0,sec:"The Alphabet",emo:"🔤",title:"ABC Refresher",pages:"Workbook p. 1–4",
 say:"Every word is built from letters. A, E, I, O, U are the special vowel letters!",
 ex:[["🐱","cat"],["🐶","dog"],["☀️","sun"],["🍎","apple"],["🥚","egg"],["🐷","pig"]],
 rules:["Vowels: a e i o u","All the other letters are consonants","ABC order: look at the first letter"],
 chant:"A – E – I – O – U. Vowels, vowels, I know you!",
 q:[["c","a b c ___ — what comes next?",["d","e","b"]],["c","What comes after m?",["n","o","l"]],["c","What comes before t?",["s","u","r"]],
    ["c","🐱 c _ t — which vowel?",["a","o","u"]],["c","🐶 d _ g — which vowel?",["o","a","i"]],["c","☀️ s _ n — which vowel?",["u","a","e"]],["c","🐷 p _ g — which vowel?",["i","a","o"]],
    ["t","Tap all the vowels",["a","e","i","o","u"],["b","k","m","t"]],["c","Which comes first in ABC order?",["apple","dog","cat"]],["c","Which comes first in ABC order?",["ball","egg","cat"]],
    ["p","Match big and small letters",[["A","a"],["B","b"],["D","d"],["G","g"]]]],
 think:[["What letter comes after K?","L"],["What letter comes before R?","Q"],["Say a word that starts with b.","ball, bat, bed, bus…"],["How many vowels are there?","5 — a, e, i, o, u"]],
 speak:["Say the alphabet backwards from Z to A.","Say three words that start with the letter b.","Say your name and spell it letter by letter."],
 idea:"Five letters (a, e, i, o, u) are vowels; the other 21 are consonants. Alphabetical order is dictionary order: compare the first letter, then the second.",
 games:["Alphabet Hop: letters on paper squares on the floor; she hops on them in ABC order.","Toy line-up: line up 5 toys in alphabetical order of their names."]},

{id:1,sec:"Verbs",emo:"🤸",title:"Doing Words",pages:"Workbook p. 21–27",
 say:"A verb is a word you can DO. Can you jump? Yes! So jump is a verb.",
 ex:[["🏃","run"],["🤸","jump"],["🍎","eat"],["😴","sleep"],["🏊","swim"],["📖","read"]],
 rules:["Ask: can I do it?","jump ✔ verb · table ✘ not a verb","Every sentence has a verb: The dog runs."],
 chant:"Jump, jump, jump — that's a verb! Clap, clap, clap — that's a verb!",
 q:[["t","Tap the doing words (verbs)",["jump","run","sing","eat","swim"],["apple","chair","book"]],["c","Is “dance” a verb?",["Yes","No"]],["c","Is “table” a verb?",["No","Yes"]],["c","Is “clap” a verb?",["Yes","No"]],["c","Is “shoe” a verb?",["No","Yes"]],
    ["p","Match the picture to the verb",[["🏊","swim"],["😴","sleep"],["📖","read"],["🍎","eat"]]],["c","🎨 Aarya likes to ___.",["paint","table","blue"]],["c","🐦 Birds can ___.",["fly","tree","nest"]],
    ["c","🎳 ro _ _ (roll the ball)",["ll","ss","tt"]],["c","😘 ki _ _",["ss","ll","pp"]]],
 think:[["Imagine a cat. What is it doing?","The cat is sleeping / playing / eating."],["Think of a verb that starts with j.","jump, jog, juggle"],["What verbs do you do in gymnastics?","jump, roll, spin, stretch, balance"],["Think of a verb that starts with s.","swim, sing, sleep, sit"]],
 speak:["Tell Papa three things you can do: “I can …”","Do an action. Papa must say the verb!","What verbs did you do in gymnastics this week?"],
 idea:"A verb is an action or doing word. The easiest test for a young child: “Can I do it?” Start here before is/are, because it gives her a clear, physical picture of what a verb is.",
 games:["Verb gymnastics: call out jump, roll, hop, spin, stretch; she performs each one. Then swap roles.","Verb or not? Say a word. She jumps for a verb and stands still for a thing."]},

{id:2,sec:"Verbs",emo:"🌟",title:"am · is · are",pages:"Workbook p. 28, 5, 6",
 say:"I am Aarya. You are Papa. She is happy. One thing gets is. Many things get are!",
 ex:[["😊","I am happy."],["🍎","The apple is red."],["🐱🐱","The cats are small."],["🚗","It isn't blue."]],
 rules:["I → am","he, she, it, one thing → is","you, we, they, many → are","is not → isn't · are not → aren't"],
 chant:"I am! You are! He is, she is, it is! We are, they are!",
 q:[["c","I ___ a girl.",["am","is","are"]],["c","☀️ The sun ___ hot.",["is","am","are"]],["c","🐶🐶 The dogs ___ big.",["are","is","am"]],["c","You ___ my friend.",["are","is","am"]],["c","🚗 It ___ a red car.",["is","are","am"]],
    ["c","🏠 We ___ at home.",["are","is","am"]],["c","🐱 The cat ___ small.",["is","are","am"]],["c","😊😊 They ___ happy.",["are","is","am"]],["c","It is a cat. It ___ a dog.",["isn't","aren't"]],["c","They are red. They ___ blue.",["aren't","isn't"]],
    ["p","Match the short form",[["is not","isn't"],["are not","aren't"],["I am","I'm"]]]],
 think:[["Look at one toy. Say a sentence with “is”.","The car is red."],["Look at two toys. Say a sentence with “are”.","The cars are red."],["Is it “I is” or “I am”?","I am!"],["Say something NOT true: “The sky …”","The sky isn't green. It is blue."]],
 speak:["Say three sentences about you: “I am …”","Point to a toy: “It is …”. Point to two toys: “They are …”","Say something that is NOT true with isn't."],
 idea:"am/is/are are forms of “be”. The choice depends only on who: I → am; one person or thing → is; you or many → are. Workbook p. 28 (with pictures) is the gentlest page, so start there.",
 games:["One or many toss: hold up one toy (“The car is red”) or two (“The cars are red”).","Silly Papa: say “The sky is green!” and let her correct you with isn't."]},

{id:3,sec:"Verbs",emo:"⏪",title:"was · were",pages:"Workbook p. 7–10",
 say:"Yesterday is finished. For yesterday, is changes to was, and are changes to were!",
 ex:[["☀️","It was sunny."],["🛝","We were at the park."],["🎂","The cake was yummy."],["🌧️","It wasn't raining."]],
 rules:["am, is → was","are → were","was not → wasn't","were not → weren't"],
 chant:"Today it is, yesterday it was. Today they are, yesterday they were!",
 q:[["c","☀️ Yesterday it ___ sunny.",["was","were"]],["c","🐱🐱 The cats ___ hungry.",["were","was"]],["c","I ___ at school.",["was","were"]],["c","😊 We ___ happy.",["were","was"]],["c","🎂 The cake ___ big.",["was","were"]],
    ["c","You ___ in the garden.",["were","was"]],["c","🌧️ Was it raining yesterday? No, it ___.",["wasn't","weren't","isn't"]],["c","🐦 Were the birds singing? Yes, they ___.",["were","was","are"]],
    ["c","The dog is sad. Yesterday the dog ___ sad.",["was","is","were"]],["c","We are tired. Yesterday we ___ tired.",["were","are","was"]],["p","Today → yesterday",[["is","was"],["are","were"],["am","was"]]]],
 think:[["What was your lunch yesterday? “The rice was …”","The rice was yummy!"],["Where were you on Sunday?","We were at …"],["Today it is sunny. Yesterday it …","… was sunny."],["Say it with was: you and a baby.","I was a baby."]],
 speak:["Tell Mama about yesterday: “Yesterday I was …”","Say where you were on Sunday: “We were at …”","Answer: Was it hot yesterday?"],
 idea:"was/were are the past of am/is/are. Same “who” rule: I, he, she, it, one thing → was; you, we, they, many → were.",
 games:["Time-machine jump: you say a “now” sentence; she jumps backwards and says it in the past.","Photo album: look at old photos: “You were small. The balloons were pink.”"]},

{id:4,sec:"Verbs",emo:"🎒",title:"have · has · do · does",pages:"Workbook p. 11–13",
 say:"He, she and it love the letter S! So they say has and does. Everybody else says have and do.",
 ex:[["⚽","I have a ball."],["🧸","She has a teddy."],["🍕","We had pizza."],["✏️","He does his homework."]],
 rules:["I, you, we, they → have, do","he, she, it → has, does","Yesterday, for everyone → had, did"],
 chant:"He, she, it — add an S bit! Has and does — that's it!",
 q:[["c","🐈 I ___ a pet cat.",["have","has"]],["c","She ___ long hair.",["has","have"]],["c","🚗 We ___ a red car.",["have","has"]],["c","🦴 The dog ___ a bone.",["has","have"]],["c","I ___ my homework.",["do","does"]],
    ["c","He ___ his homework.",["does","do"]],["c","🥛 ___ you like milk?",["Do","Does"]],["c","🍰 ___ she like cake?",["Does","Do"]],["c","🍦 We ___ ice cream yesterday.",["had","have","has"]],["c","___ you play in the park yesterday?",["Did","Do","Does"]],
    ["t","Tap the words that go with “has”",["he","she","it"],["I","you","we","they"]]],
 think:[["What does Mama have? “Mama has …”","Mama has a phone."],["Ask Papa a question with “Do you …?”","Do you like apples?"],["Did you brush your teeth? Answer!","Yes, I did. / No, I didn't."],["Papa ___ a book. Have or has?","has — he, she, it love the S!"]],
 speak:["Say what is in your school bag: “I have …”","Say what your friend has: “She has …”","Ask Papa a question with “Do you …?”"],
 idea:"he, she and it take the -s form: has, does. Everyone else uses have/do. For the past it's one word for everyone: had, did.",
 games:["Bag of things: each person pulls an object: “I have a spoon. Papa has a book.”","Question ping-pong: “Do you like apples?” “Yes, I do.” “Does Mama?” “Yes, she does.”"]},

{id:5,sec:"Verbs",emo:"📅",title:"Yesterday · Today · Tomorrow",pages:"Workbook p. 14–20",
 say:"Yesterday I played. Today I play. Tomorrow I will play. The word changes with the time!",
 ex:[["⬅️","Yesterday I jumped."],["⏺️","Today I jump."],["➡️","Tomorrow I will jump."],["🚶","go → went"]],
 rules:["Yesterday: add -ed (play → played)","Tricky ones: go → went, eat → ate, see → saw, run → ran","Today: she plays, he washes","Tomorrow: will + verb"],
 chant:"Yesterday — played! Today — play! Tomorrow — will play!",
 q:[["c","Yesterday I ___. (walk)",["walked","walks","walking"]],["c","Yesterday I ___ ball. (play)",["played","play","plays"]],["c","Yesterday we ___ to the zoo. (go)",["went","goed","go"]],["c","🍎 Yesterday I ___ an apple. (eat)",["ate","eated","eat"]],
    ["c","🐦 Yesterday I ___ a bird. (see)",["saw","seed","see"]],["c","🚲 Tomorrow I ___ ride my bike.",["will","did","was"]],["c","🚗 Every Sunday Dad ___ his car. (wash)",["washes","wash","washed"]],["c","🏊 She ___ every day. (swim)",["swims","swim","swimed"]],
    ["c","“I will swim” is about …",["tomorrow","yesterday","today"]],["c","“I played” is about …",["yesterday","tomorrow","today"]],["p","Match the tricky pairs",[["go","went"],["eat","ate"],["see","saw"],["run","ran"]]]],
 think:[["Say 3 things you did today.","I went … I ate … I played …"],["What will you do tomorrow?","Tomorrow I will …"],["go → yesterday?","went"],["eat → yesterday?","ate"]],
 speak:["Say 3 things you did yesterday.","Say 3 things you do every day.","Say 3 things you will do tomorrow."],
 idea:"Present: he/she/it add -s. Past: most verbs add -ed; irregular ones change completely. Future: will + verb (the workbook also uses shall with I and we). “I goed” is a good sign: she knows the rule! Just say the right word back.",
 games:["Timeline jump: 3 papers on the floor (YESTERDAY · TODAY · TOMORROW). Say a verb; she jumps to one and makes a sentence.","Irregular memory: cards go/went, eat/ate… turn two over, keep matching pairs."]},

{id:6,sec:"Nouns",emo:"🏷️",title:"Naming Words",pages:"Workbook p. 29, 34–38, 51–53",
 say:"Everything has a name. The name is a noun. A special name like Aarya gets a capital letter, like a crown!",
 ex:[["👧","girl → Aarya"],["🏙️","city → Frankfurt"],["🐶","dog"],["⚽","ball"],["📅","day → Monday"],["🏫","school"]],
 rules:["Nouns name a person, place, animal or thing","Common: girl, city, dog","Proper: Aarya, Frankfurt, Monday — capital letter!"],
 chant:"Person, place, animal, thing — nouns are names for everything!",
 q:[["c","“teacher” is …",["a person","a place","an animal","a thing"]],["c","“park” is …",["a place","a person","an animal","a thing"]],["c","“lion” is …",["an animal","a person","a place","a thing"]],["c","“cup” is …",["a thing","a person","a place","an animal"]],
    ["c","“zoo” is …",["a place","an animal","a thing","a person"]],["c","“baby” is …",["a person","a thing","an animal","a place"]],["t","Tap the special names (proper nouns)",["Aarya","Monday","Germany","Frankfurt"],["girl","city","dog","day"]],
    ["c","Which is written correctly?",["Monday","monday"]],["c","Which is written correctly?",["Aarya is my name.","aarya is my name."]],["c","A special name for a city:",["Frankfurt","school","river"]]],
 think:[["Name a person, a place, an animal and a thing.","Papa · kitchen · cat · chair"],["Say a special name for a girl.","Aarya!"],["Say a special name for a day.","Monday, Tuesday …"],["Is “dog” a common or a proper noun?","common noun"]],
 speak:["Name a person, a place, an animal and a thing in this room.","Say the special names of your best friend, your city and today.","Play “I spy a noun” with Papa."],
 idea:"A noun names a person, place, animal or thing. Common nouns are general (girl, city); proper nouns are special names (Aarya, Frankfurt, Monday) and start with a capital letter.",
 games:["Noun hunt: person = yellow, place = blue, animal = green, thing = red. She sticks coloured notes around the house.","Crown hunt: in a storybook, find capital letters in the middle of sentences."]},

{id:7,sec:"Nouns",emo:"👉",title:"Pronouns",pages:"Workbook p. 30–33",
 say:"Instead of “Aarya ate Aarya's apple”, we say “She ate her apple.” Pronouns are short stand-in words!",
 ex:[["👨","Papa → he"],["👧","Aarya → she"],["🐱","the cat → it"],["🐦🐦","the birds → they"],["👨‍👩‍👧","our family → we"],["🎒","It is mine."]],
 rules:["One: I, me, he, him, she, her, it","Many: we, us, they, them","Owner words: mine, yours, his, hers, ours, theirs"],
 chant:"I — me! You — you! He — a boy! She — a girl! It — a thing! We — all of us! They — them!",
 q:[["c","Papa is tall. → ___ is tall.",["He","She","It","They"]],["c","Aarya is happy. → ___ is happy.",["She","He","It","They"]],["c","🐱 The cat is sleeping. → ___ is sleeping.",["It","He","They"]],["c","🐦🐦 The birds are singing. → ___ are singing.",["They","It","She"]],
    ["c","Aarya and I → ___",["we","they","she"]],["c","📘 I have a book. It is ___.",["mine","yours","hers"]],["c","🎩 Papa has a hat. It is ___.",["his","hers","mine"]],["c","👜 Mama has a bag. It is ___.",["hers","his","mine"]],
    ["t","Tap the words for MANY",["we","they","us","them"],["I","he","she","it"]],["c","___ is my friend.",["She","Her"]]],
 think:[["“Mama is cooking.” Swap Mama for a pronoun.","She is cooking."],["“The ball is red.” Swap the ball.","It is red."],["“Mama and Papa are home.” Swap them.","They are home."],["Point to yourself. Say the pronoun!","I!"]],
 speak:["Point and say: I · you · he · she · it · we · they.","Tell a story about Papa using “he”.","Hold something: “This is mine.” Point: “That is yours.”"],
 idea:"A pronoun takes the place of a noun: I, you, he, she, it, we, they (and me, him, her, us, them). Possessive pronouns show the owner: mine, yours, his, hers, ours, theirs.",
 games:["Point it! Say a pronoun; she points to the right person or thing.","Mine or yours? Sort family things: “This is mine. That is yours.”"]},

{id:8,sec:"Nouns",emo:"🐑",title:"One and Many",pages:"Workbook p. 39–45",
 say:"One cat, two cats! Most words grow an s tail. Some words change in a special way.",
 ex:[["📦","box → boxes"],["👶","baby → babies"],["📚","book → books"],["🦷","tooth → teeth"],["🐑","sheep → sheep"],["🧒","child → children"]],
 rules:["Most words: add s","ch, sh, s, ss, x: add es","consonant + y → ies (baby → babies)","Special: man → men, foot → feet, mouse → mice"],
 chant:"Box and bus and dish and watch — they get E-S, that's the catch!",
 q:[["c","one cat, two ___",["cats","cates","cat"]],["c","one box, two ___",["boxes","boxs","box"]],["c","one bus, two ___",["buses","buss","bus"]],["c","one baby, two ___",["babies","babys","babyes"]],
    ["c","one boy, two ___",["boys","boies"]],["c","one man, two ___",["men","mans"]],["c","one foot, two ___",["feet","foots"]],["c","one mouse, two ___",["mice","mouses"]],["c","one sheep, two ___",["sheep","sheeps"]],["c","one child, two ___",["children","childs"]],
    ["p","Match one and many",[["tooth","teeth"],["woman","women"],["person","people"],["fly","flies"]]]],
 think:[["Imagine one fox. Now two! Say it.","two foxes"],["one baby, two …","babies"],["one mouse, two …","mice"],["one dish, two …","dishes"]],
 speak:["Count things in your room: “one chair, two chairs”.","Say the plural: bus, baby, mouse, sheep.","How many people are in your family?"],
 idea:"Most nouns add -s; ch/sh/s/ss/x add -es; consonant + y → -ies (but boy → boys). Irregular: man/men, child/children, foot/feet, tooth/teeth, mouse/mice. Same: sheep, deer, fish.",
 games:["Double it! You hold one item and name it; she holds two and says the plural.","Clap the ending: box (1 clap), box-es (2 claps)."]},

{id:9,sec:"Nouns",emo:"👑",title:"Count it? Boy & Girl words",pages:"Workbook p. 46–50",
 say:"Can you count it? One egg, two eggs — yes! Can you count water? No! We say a glass of water.",
 ex:[["🥚","three eggs"],["🥛","a glass of milk"],["🍚","a bowl of rice"],["👑","king – queen"],["🦁","lion – lioness"],["👦👧","brother – sister"]],
 rules:["Count it: apple, egg, chair","Can't count it: milk, water, rice, sugar","Boy/girl pairs: king – queen, uncle – aunt"],
 chant:"",
 q:[["c","🍎 apple — can you count it?",["Yes, count it","No, can't count"]],["c","🥛 milk — can you count it?",["No, can't count","Yes, count it"]],["c","🥚 egg — can you count it?",["Yes, count it","No, can't count"]],["c","💧 water — can you count it?",["No, can't count","Yes, count it"]],
    ["c","🍚 rice — can you count it?",["No, can't count","Yes, count it"]],["c","I drink a glass of ___.",["milk","apples"]],["p","Match the boy and girl words",[["king","queen"],["father","mother"],["brother","sister"],["lion","lioness"]]],
    ["c","boy → ___",["girl","woman","sister"]],["c","uncle → ___",["aunt","niece","mother"]],["c","prince → ___",["princess","queen"]],["c","son → ___",["daughter","sister"]]],
 think:[["Can you count sand?","No! We say “some sand”."],["king → ?","queen"],["Name 3 things you can count in the kitchen.","spoons, cups, apples"],["tiger → ?","tigress"]],
 speak:["Ask for a drink politely: “A glass of …, please.”","Name three things you can count and three you can't.","Say the partner words: king, uncle, lion."],
 idea:"Countable nouns can be counted (an apple, two apples). Uncountable ones are measured (milk, rice, water): use some, a lot of, a glass of. Gender pairs: king–queen, lion–lioness, nephew–niece, wizard–witch.",
 games:["Kitchen sort: count-it things vs. can't-count things.","Gender snap: when a pair appears (king / queen), shout “Snap!”"]},

{id:10,sec:"Articles",emo:"🥚",title:"a · an · the",pages:"Workbook p. 55–57",
 say:"Say “a apple” — it's bumpy! “An apple” is smooth. Words starting with a, e, i, o, u get an.",
 ex:[["🍎","an apple"],["🐱","a cat"],["🥚","an egg"],["🦉","an owl"],["🍦","an ice cream"],["☀️","the sun"]],
 rules:["a + consonant: a ball","an + vowel sound: an egg","the: one special thing, or the second time"],
 chant:"A, E, I, O, U — they want AN, that's what they do!",
 q:[["c","🍎 ___ apple",["an","a"]],["c","🐱 ___ cat",["a","an"]],["c","🥚 ___ egg",["an","a"]],["c","⚽ ___ ball",["a","an"]],["c","🦉 ___ owl",["an","a"]],["c","☂️ ___ umbrella",["an","a"]],["c","🐶 ___ dog",["a","an"]],["c","🍦 ___ ice cream",["an","a"]],
    ["c","Mom gave me a dress. ___ dress was pretty.",["The","A","An"]],["c","🌙 Look at ___ moon!",["the","a","an"]],["c","🐘 I saw an elephant. ___ elephant was big.",["The","An","A"]]],
 think:[["egg — a or an?","an egg"],["banana — a or an?","a banana"],["orange — a or an?","an orange"],["“I saw a dog.” Continue with “the”.","The dog was big!"]],
 speak:["Look around and say 5 things with a or an.","Tell a mini story: “I saw a …. The … was …”","Say fast: an apple, an egg, an ice cream, an owl!"],
 idea:"a before a consonant sound, an before a vowel sound, the for a specific thing or the second mention. (For you: it's the sound that counts — an hour, a unicorn.)",
 games:["Mystery bag: pull an object out: “It's an egg!” “It's a spoon!”","Zoo walk: “I can see an elephant, a tiger, an owl …”"]},

{id:11,sec:"Adverbs",emo:"🐌",title:"How Words",pages:"Workbook p. 58–61",
 say:"An adverb tells how you do something. Walk slowly! Now walk quickly!",
 ex:[["🐌","walks slowly"],["🐇","runs quickly"],["🦁","roars loudly"],["🤫","speaks softly"],["😄","sings happily"],["🌧️","rains heavily"]],
 rules:["Add -ly: slow → slowly","y → ily: happy → happily","-le → -ly: gentle → gently"],
 chant:"Slowly, slowly, like a snail. Quickly, quickly, like a whale!",
 q:[["c","slow → ?",["slowly","slowy","slowely"]],["c","quick → ?",["quickly","quickely"]],["c","happy → ?",["happily","happyly"]],["c","heavy → ?",["heavily","heavyly"]],["c","gentle → ?",["gently","gentlely"]],
    ["c","🐌 The snail moves ___.",["slowly","loudly","often"]],["c","🦁 The lion roars ___.",["loudly","slowly","gently"]],["c","🐱 Pat the kitten ___.",["gently","loudly","greedily"]],["c","🛝 We ___ go to the park.",["often","slowly","loudly"]],["c","🐇 The rabbit runs ___.",["quickly","slowly"]]],
 think:[["How does a snail move?","slowly"],["How does a cheetah run?","quickly"],["loud → adverb?","loudly"],["How do you walk when a baby is sleeping?","quietly / softly"]],
 speak:["How do you walk to school: slowly or quickly?","Tell Papa 3 actions with adverbs: “Clap loudly!”","How does a mouse move? How does an elephant move?"],
 idea:"An adverb tells how, where or how often something happens. Many are made by adding -ly (slow → slowly; happy → happily; gentle → gently).",
 games:["Walk the adverb: she walks slowly, quickly, happily, loudly (stomp!), quietly (tiptoe).","Adverb robot: she commands you: “Clap loudly! Sit slowly!”"]},

{id:12,sec:"Adjectives",emo:"🍋",title:"Describing Words",pages:"Workbook p. 66–72, 77",
 say:"Adjectives make stories colourful! Not just “a dog” — “a big, fluffy, brown dog”!",
 ex:[["🍋","a sour lemon"],["🍰","a sweet cake"],["🌵","a prickly cactus"],["🧸","a soft teddy"],["🐘","a huge elephant"],["🌹","a fresh rose"]],
 rules:["Taste: sweet, sour, salty","Feel: soft, hard, rough, prickly","Look: big, small, tall","People: kind, helpful, shy"],
 chant:"",
 q:[["c","🍋 A lemon tastes ___.",["sour","sweet","salty"]],["c","🍬 Candy tastes ___.",["sweet","sour","bitter"]],["c","🥨 A pretzel tastes ___.",["salty","sweet","sour"]],["c","🧸 A teddy feels ___.",["soft","hard","prickly"]],
    ["c","🪨 A rock feels ___.",["hard","soft","fluffy"]],["c","🌵 A cactus feels ___.",["prickly","smooth","soft"]],["t","Tap the describing words",["big","soft","happy","tall","sweet"],["run","cat","jump"]],
    ["c","Which is right?",["a big dog","a dog big"]],["c","A friend who always helps is ___.",["helpful","lazy","shy"]],["c","🍬 I have ___ sweets.",["many","much"]]],
 think:[["Imagine a mango. How does it taste?","sweet!"],["Grow it: the dog → the big dog → …","the big brown dog"],["Describe your best friend.","She is kind and funny."],["Touch your hair. How does it feel?","soft / smooth / curly"]],
 speak:["Describe your favourite food with 3 describing words.","Describe your best friend: “She is kind and …”","Close your eyes, touch something, say how it feels."],
 idea:"An adjective describes a noun: how it looks, tastes, smells or feels, or what someone is like. It usually comes before the noun (a big dog) or after is/are (the dog is big).",
 games:["Mystery feel box: eyes closed, she feels an object and describes it.","Taste test: lemon, sugar, crisps: sour, sweet, salty."]},

{id:13,sec:"Adjectives",emo:"🏅",title:"Compare & Build Words",pages:"Workbook p. 62–65, 73–79",
 say:"Three friends run a race. Tom is fast. Sam is faster. Aarya is the fastest!",
 ex:[["🐭","small"],["🐶","bigger"],["🐘","biggest"],["☀️","sun → sunny"],["🤝","help → helpful"],["🎒","my bag · her bag"]],
 rules:["two things: -er (taller)","three or more: -est (tallest)","good, better, best","my, your, his, her, our, their + noun"],
 chant:"Big, bigger, biggest — look at them grow! Good, better, best — now you know!",
 q:[["c","tall, taller, ___",["tallest","tallerest","more tall"]],["c","fast, ___, fastest",["faster","more fast"]],["c","good, better, ___",["best","goodest","better"]],["c","big, ___, biggest",["bigger","biger"]],
    ["c","👩 I love ___ mom.",["my","his","their"]],["c","🚗 Papa is washing ___ car.",["his","her","my"]],["c","🎒 The kids have ___ bags.",["their","his","her"]],["c","☀️ sun → a ___ day",["sunny","sunful"]],["c","help → ___",["helpful","helpy"]],
    ["p","Match the opposites",[["hot","cold"],["big","small"],["happy","sad"],["fast","slow"]]]],
 think:[["Who is the tallest in your family?","Papa is the tallest!"],["good → better → …","best"],["What is the weather today?","Today is sunny / cloudy / rainy."],["Opposite of hot?","cold"]],
 speak:["Compare: “Papa is taller than me.”","Who is the fastest in your family?","Say today's weather: sunny, rainy, cloudy, windy."],
 idea:"Comparing: -er for two, -est for three or more (good, better, best). Possessive adjectives: my, your, his, her, its, our, their. Word building: -y, -ful/-less, -ly, -al turn nouns into adjectives.",
 games:["Toy race: line up 3 toys: tall / taller / tallest.","Opposite ping-pong: you say hot, she bounces back cold."]},

{id:14,sec:"Conjunctions",emo:"🔗",title:"Joining Words",pages:"Workbook p. 80–85",
 say:"Conjunctions are glue words. They stick two little sentences together!",
 ex:[["🎂","We baked a cake and ate it."],["☔","It rained, so we stayed in."],["🥇","I won because I practised."],["🧼","Wash before you eat."]],
 rules:["and adds more","but says something different","because tells why","so tells what happened","before, after, while tell when"],
 chant:"And adds more, but says no, because tells why, and so… off we go!",
 q:[["c","🐱🐶 I have a cat ___ a dog.",["and","but","because"]],["c","I like milk ___ I don't like tea.",["but","and","because"]],["c","🎉 I am happy ___ it is my birthday.",["because","but","and"]],["c","☔ It was raining, ___ we stayed home.",["so","but","because"]],
    ["c","🧼 Wash your hands ___ you eat.",["before","after","while"]],["c","🤫 Be quiet ___ I am speaking.",["while","before","after"]],["c","🛝 We played ___ school finished.",["after","before","while"]],["c","She was tired ___ she kept playing.",["but","and","so"]]],
 think:[["Finish: “I am wearing a coat because …”","… it is cold!"],["Finish: “I like apples but …”","… I don't like pears."],["What do you do before bed?","I brush my teeth before bed."],["Finish: “I love gymnastics because …”","… it is fun!"]],
 speak:["Finish: “I love gymnastics because …”","Finish: “I like apples but …”","Say what you do before bed and after school."],
 idea:"A conjunction joins two short sentences: and (adds), but (different), because (reason), so (result), before/after/while (time). Workbook p. 81–85 are cut-out cards, great for building sentences.",
 games:["Sentence train: two sentence cards with a conjunction card as the wagon between them.","The because game: ask why-questions all day: “I am smiling because …”"]},

{id:15,sec:"Prepositions",emo:"📦",title:"Where & When Words",pages:"Workbook p. 86–89",
 say:"Where is the cat? On the box! In the box! Under the box!",
 ex:[["📦","in the box"],["🛏️","on the bed"],["🪑","under the chair"],["🧍","between two friends"],["⏰","at 7 o'clock"],["📅","on Monday · in May"]],
 rules:["Where: in, on, under, between, behind, next to","at + clock time: at 8 o'clock","on + day: on Monday","in + month, season, morning: in May"],
 chant:"In the box, on the box, under the box — where's my fox?",
 q:[["c","📦🐱 The cat is ___ the box. (inside)",["in","on","under"]],["c","The cat is ___ the table. (on top)",["on","in","under"]],["c","⚽ The ball is ___ the chair. (below)",["under","on","in"]],["c","⏰ I wake up ___ 7 o'clock.",["at","on","in"]],
    ["c","🏊 We go swimming ___ Monday.",["on","at","in"]],["c","❄️ It snows ___ winter.",["in","on","at"]],["c","🎂 My birthday is ___ May.",["in","on","at"]],["c","🌙 I sleep ___ night.",["at","in","on"]],["c","🌅 We play ___ the morning.",["in","at","on"]],["c","I stand ___ Mama and Papa.",["between","under","in"]]],
 think:[["Where is your bed? “My bed is next to …”","My bed is next to the window."],["When do you wake up?","I wake up at 7 o'clock."],["Monday — at, on or in?","on Monday"],["July — at, on or in?","in July"]],
 speak:["Hide a toy and tell Papa where it is.","Say when you wake up: “I wake up at …”","Say your birthday: “My birthday is in …”"],
 idea:"Prepositions show where (in, on, under, between, behind, next to) or when: at + clock time, on + days, in + months, seasons and parts of the day.",
 games:["Preposition gym: stand on the mat, crawl under the table, stand between two chairs. She says each one.","Teddy hide-and-seek: she finds teddy and says where it is."]}
];

/* ============================ MORE EXAMPLES ============================ */
const MORE = {
0:[["🍎","A is for apple."],["⚽","B is for ball."],["🐱","C is for cat."],["🔤","The vowels are a, e, i, o, u."],["🐶","Dog comes before egg in ABC order."],["☀️","Sun has the vowel u."],["🐷","Pig has the vowel i."]],
1:[["🏃","I run fast."],["🐟","Fish swim in the water."],["🎤","We sing a song."],["👏","Clap your hands!"],["🤸","Aarya does a cartwheel."],["😴","The baby sleeps."],["🍎","I eat an apple."]],
2:[["😊","I am happy."],["🌳","The tree is tall."],["🐟","The fish are in the water."],["👩","Mama is kind."],["🧦","My socks are blue."],["🐶","The dog isn't big."],["🍌","The bananas aren't green."]],
3:[["🎈","The party was fun."],["🧸","My toys were on the floor."],["❄️","It was cold yesterday."],["👵","Grandma was happy."],["🐣","The chicks were small."],["🌧️","It wasn't sunny."],["🍪","The cookies weren't hot."]],
4:[["🐶","I have a dog."],["🐱","She has a cat."],["📚","They have books."],["🍞","We had toast for breakfast."],["🦒","A giraffe has a long neck."],["🍕","Does he like pizza? Yes, he does."],["🧹","Did you tidy up? Yes, I did."]],
5:[["🛝","Yesterday I played in the park."],["🥣","Today I eat cereal."],["🎨","Tomorrow I will paint."],["🏫","I went to school."],["🐶","The dog ran fast."],["🍰","We ate cake."],["👵","We will visit Grandma."]],
6:[["👩‍🏫","The teacher is kind."],["🏫","The school is big."],["🐘","The elephant is grey."],["✏️","The pencil is red."],["🏙️","Frankfurt is a city."],["📅","Today is Monday."],["🐶","My dog is called Bruno."]],
7:[["👨","Papa is tall. He is tall."],["👧","Aarya is kind. She is kind."],["🐱","The cat is soft. It is soft."],["👫","Tom and Mia play. They play."],["👨‍👩‍👧","We are a family."],["🎁","This gift is for me."],["🧸","The teddy is mine."]],
8:[["🍎","one apple, two apples"],["🦊","one fox, three foxes"],["🍓","one berry, many berries"],["🔑","one key, two keys"],["👣","one foot, two feet"],["🐭","one mouse, many mice"],["🐟","one fish, five fish"]],
9:[["🍞","I want some bread."],["🧃","A glass of juice, please."],["🍪","I have three cookies."],["💧","We need some water."],["👸","prince and princess"],["👩","uncle and aunt"],["🐓","cock and hen"]],
10:[["🐜","an ant"],["🍊","an orange"],["🦓","a zebra"],["🐙","an octopus"],["🚌","a bus"],["🌍","the Earth"],["🐕","I have a dog. The dog is brown."]],
11:[["🐢","The turtle walks slowly."],["🚀","The rocket flies quickly."],["🐭","The mouse squeaks softly."],["🥁","He plays the drum loudly."],["🐻","The bear eats greedily."],["💤","The baby sleeps peacefully."],["😊","She smiles happily."]],
12:[["🌶️","The chilli is spicy."],["🍫","The chocolate is sweet."],["🐑","The sheep is fluffy."],["🧊","The ice is cold."],["🦒","The giraffe is tall."],["🐁","The mouse is tiny."],["👧","Aarya is kind."]],
13:[["🍉","An apple is small. A melon is bigger."],["🐘","The elephant is the biggest."],["🌧️","A rainy day."],["☁️","A cloudy sky."],["🪄","A magical wand."],["🤲","Be careful with the glass!"],["👜","This is her bag."]],
14:[["🥪","I want bread and jam."],["🍦","I like ice cream but it is cold."],["😴","I am tired because I played."],["☔","It is raining, so I have an umbrella."],["🦷","I brush my teeth after breakfast."],["🎨","I sing while I paint."],["🧤","Put on gloves before you go out."]],
15:[["🐦","The bird is on the tree."],["🐟","The fish is in the bowl."],["🐱","The cat is under the table."],["🧸","The teddy is next to the bed."],["⚽","The ball is behind the tree."],["🎂","My party is on Saturday."],["🌙","I read at night."]]
};

/* ============================ EXTRA QUIZ QUESTIONS ============================ */
const EXTRA = {
0:[["c","What comes after f?",["g","h","e"]],["c","What comes after r?",["s","t","q"]],["c","What comes before d?",["c","e","b"]],["c","🛏️ b _ d — which vowel?",["e","a","u"]],["c","🦊 f _ x — which vowel?",["o","i","a"]],["c","Which comes first in ABC order?",["fish","goat","hat"]],["c","Which comes first in ABC order?",["moon","sun","tree"]]],
1:[["c","🐟 Fish can ___.",["swim","blue","water"]],["c","🎤 We ___ a song.",["sing","song","happy"]],["c","📖 I ___ a book.",["read","red","page"]],["c","Is “run” a verb?",["Yes","No"]],["c","Is “apple” a verb?",["No","Yes"]],["c","👏 ___ your hands!",["Clap","Hands","Loud"]],["c","😴 At night I ___.",["sleep","bed","moon"]]],
2:[["c","🌳 The tree ___ tall.",["is","are","am"]],["c","🧦 My socks ___ blue.",["are","is","am"]],["c","👩 Mama ___ kind.",["is","are","am"]],["c","😊 I ___ happy.",["am","is","are"]],["c","🍌🍌 The bananas ___ yellow.",["are","is","am"]],["c","He ___ my brother.",["is","are","am"]],["c","The dog is small. It ___ big.",["isn't","aren't"]]],
3:[["c","🎈 The party ___ fun.",["was","were"]],["c","🧸 My toys ___ on the floor.",["were","was"]],["c","❄️ It ___ cold yesterday.",["was","were"]],["c","👵 Grandma ___ happy.",["was","were"]],["c","🐣 The chicks ___ small.",["were","was"]],["c","🍪 The cookies ___ hot. (not)",["weren't","wasn't"]],["c","Were you at home? Yes, I ___.",["was","were"]]],
4:[["c","🐶 I ___ a dog.",["have","has"]],["c","🦒 A giraffe ___ a long neck.",["has","have"]],["c","📚 They ___ books.",["have","has"]],["c","🍞 We ___ toast yesterday.",["had","has","have"]],["c","🍕 ___ he like pizza?",["Does","Do"]],["c","🧹 ___ you tidy up yesterday?",["Did","Does","Do"]],["c","She ___ her homework every day.",["does","do"]]],
5:[["c","🏫 Yesterday I ___ to school. (go)",["went","goed","go"]],["c","🐶 Yesterday the dog ___ fast. (run)",["ran","runned","run"]],["c","🍰 Yesterday we ___ cake. (eat)",["ate","eated","eat"]],["c","🎨 Tomorrow I ___ paint.",["will","did","was"]],["c","🏊 Yesterday I ___ in the pool. (swim)",["swam","swimmed","swim"]],["c","🥣 Every day she ___ cereal. (eat)",["eats","eat","ate"]],["c","Yesterday I ___ Mama. (help)",["helped","helps","help"]]],
6:[["c","“school” is …",["a place","a person","an animal","a thing"]],["c","“pencil” is …",["a thing","a place","an animal","a person"]],["c","“elephant” is …",["an animal","a thing","a person","a place"]],["c","“doctor” is …",["a person","a place","a thing","an animal"]],["c","Which is written correctly?",["Frankfurt","frankfurt"]],["c","A special name for a day:",["Sunday","morning","week"]],["c","A special name for a country:",["Germany","country","city"]]],
7:[["c","👩 Mama is cooking. → ___ is cooking.",["She","He","It"]],["c","⚽ The ball is red. → ___ is red.",["It","She","They"]],["c","👫 Tom and Mia play. → ___ play.",["They","We","He"]],["c","🧸 The teddy is ___. (I have it)",["mine","yours","his"]],["c","⚽ You have a ball. It is ___.",["yours","mine","hers"]],["c","Papa and I → ___",["we","they","he"]],["c","📘 Please give ___ the book. (to me)",["me","I"]]],
8:[["c","one fox, two ___",["foxes","foxs","fox"]],["c","one key, two ___",["keys","keies"]],["c","one tooth, two ___",["teeth","tooths"]],["c","one dish, two ___",["dishes","dishs"]],["c","one fly, two ___",["flies","flys"]],["c","one woman, two ___",["women","womans"]],["c","one fish, two ___",["fish","fishs"]]],
9:[["c","🧃 juice — can you count it?",["No, can't count","Yes, count it"]],["c","🍪 cookie — can you count it?",["Yes, count it","No, can't count"]],["c","🪑 chair — can you count it?",["Yes, count it","No, can't count"]],["c","🍞 I want some ___.",["bread","breads"]],["c","father → ___",["mother","aunt","sister"]],["c","lion → ___",["lioness","queen","sister"]],["c","nephew → ___",["niece","aunt","sister"]]],
10:[["c","🐜 ___ ant",["an","a"]],["c","🍊 ___ orange",["an","a"]],["c","🦓 ___ zebra",["a","an"]],["c","🐙 ___ octopus",["an","a"]],["c","🚌 ___ bus",["a","an"]],["c","☀️ Look at ___ sun!",["the","a","an"]],["c","🐕 I have a dog. ___ dog is brown.",["The","A","An"]]],
11:[["c","loud → ?",["loudly","loudy"]],["c","soft → ?",["softly","softy"]],["c","sad → ?",["sadly","saddly"]],["c","🐢 The turtle walks ___.",["slowly","quickly","loudly"]],["c","🚀 The rocket flies ___.",["quickly","slowly","softly"]],["c","🐭 The mouse squeaks ___.",["softly","loudly","heavily"]],["c","😊 She smiles ___.",["happily","sadly","greedily"]]],
12:[["c","🌶️ The chilli is ___.",["spicy","sweet","soft"]],["c","🍫 The chocolate is ___.",["sweet","sour","salty"]],["c","🐑 The sheep is ___.",["fluffy","prickly","hard"]],["c","🧊 The ice is ___.",["cold","hot","spicy"]],["c","🐁 The mouse is ___.",["tiny","huge","tall"]],["c","🦒 The giraffe is ___.",["tall","short","tiny"]],["c","Which is right?",["a red ball","a ball red"]]],
13:[["c","small, ___, smallest",["smaller","more small"]],["c","hot, hotter, ___",["hottest","hotest","hotter"]],["c","bad, worse, ___",["worst","baddest","worse"]],["c","🌧️ rain → a ___ day",["rainy","rainful"]],["c","☁️ cloud → a ___ sky",["cloudy","cloudful"]],["c","👜 Mama has a bag. It is ___ bag.",["her","his","my"]],["c","Opposite of big:",["small","tall","fast"]]],
14:[["c","🥪 I want bread ___ jam.",["and","but","because"]],["c","😴 I am tired ___ I played.",["because","but","and"]],["c","☔ It is raining, ___ I have an umbrella.",["so","but","before"]],["c","🦷 I brush my teeth ___ breakfast.",["after","while","but"]],["c","🎨 I sing ___ I paint.",["while","because","so"]],["c","🧤 Put on gloves ___ you go out.",["before","after","because"]],["c","🍦 I like ice cream ___ it is cold.",["but","so","because"]]],
15:[["c","🐦 The bird is ___ the tree.",["on","under","at"]],["c","🐟 The fish is ___ the bowl.",["in","on","at"]],["c","🧸 The teddy is ___ to the bed.",["next","in","on"]],["c","🎂 My party is ___ Saturday.",["on","in","at"]],["c","🌙 I read ___ night.",["at","on","in"]],["c","🏖️ We go to the beach ___ summer.",["in","on","at"]],["c","⚽ The ball is ___ the tree. (at the back)",["behind","between","on"]]]
};
UNITS.forEach(u=>u.q.push(...(EXTRA[u.id]||[])));

/* ============================ MEMORY PAIRS ============================ */
const MEMO = {
0:[["A","a"],["B","b"],["D","d"],["G","g"],["M","m"],["R","r"]],
1:[["🏊","swim"],["😴","sleep"],["📖","read"],["🍎","eat"],["🎨","paint"],["👏","clap"]],
2:[["is not","isn't"],["are not","aren't"],["I am","I'm"],["🐱 one cat","is"],["🐱🐱 two cats","are"],["I","am"]],
3:[["is","was"],["are","were"],["was not","wasn't"],["were not","weren't"],["I am","I was"],["they are","they were"]],
4:[["I ___ a ball.","have"],["She ___ a doll.","has"],["He ___ his homework.","does"],["___ you like milk?","Do"],["Yesterday we ___ pizza.","had"],["Yesterday ___ you play?","Did"]],
5:[["go","went"],["eat","ate"],["see","saw"],["run","ran"],["swim","swam"],["come","came"]],
6:[["girl","Aarya"],["city","Frankfurt"],["day","Monday"],["country","Germany"],["river","Main"],["month","May"]],
7:[["Papa","he"],["Mama","she"],["the cat","it"],["the birds","they"],["my book","mine"],["Aarya and I","we"]],
8:[["tooth","teeth"],["woman","women"],["person","people"],["fly","flies"],["box","boxes"],["child","children"]],
9:[["king","queen"],["father","mother"],["brother","sister"],["lion","lioness"],["uncle","aunt"],["prince","princess"]],
10:[["🍎","an apple"],["🐱","a cat"],["🥚","an egg"],["⚽","a ball"],["🦉","an owl"],["🐶","a dog"]],
11:[["slow","slowly"],["quick","quickly"],["happy","happily"],["loud","loudly"],["gentle","gently"],["heavy","heavily"]],
12:[["🍋","sour"],["🍬","sweet"],["🧸","soft"],["🪨","hard"],["🌵","prickly"],["🧊","cold"]],
13:[["hot","cold"],["big","small"],["happy","sad"],["fast","slow"],["tall","short"],["good","bad"]],
14:[["I have a cat","and a dog."],["I like milk","but not tea."],["I am happy","because it is my birthday."],["It was raining,","so we stayed home."],["Wash your hands","before you eat."],["We played","after school."]],
15:[["in","out"],["on","off"],["up","down"],["over","under"],["in front of","behind"],["near","far"]]
};
SECTIONS.Mix={c:"#B7791F",l:"#FBF0D5"};

/* ============================ STATE ============================ */
const KEY="aarya-grammar-v1";
let S={best:{},said:{},voice:true,reads:0,rate:.6,pauseMul:1,wordMode:false,voiceName:"",len:"medium",gbest:{},bestMix:0};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null"); if(s) S=Object.assign(S,s);}catch(e){}
if(!S.v3){S.rate=.6;S.voiceName="";S.v3=true;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const $=s=>document.querySelector(s);
const app=$("#app");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function col(u){return SECTIONS[u.sec];}
function totalStars(){return Object.values(S.best).reduce((a,b)=>a+b,0);}
function updTotal(){$("#total").textContent="⭐ "+totalStars()+" / "+UNITS.length*3;}
$("#sound").textContent=S.voice?"🔊":"🔈";
$("#sound").onclick=()=>{S.voice=!S.voice;save();$("#sound").textContent=S.voice?"🔊":"🔈";if(!S.voice)stopSpeech();};

/* ============================ VOICE ============================ */
const HAS_TTS="speechSynthesis" in window;
const FEMALE=/samantha|karen|moira|tessa|serena|kate|martha|stephanie|fiona|victoria|allison|ava|susan|zira|hazel|libby|sonia|maisie|jenny|aria|emma|michelle|natasha|clara|olivia|amy|joanna|salli|kimberly|ivy|nicky|shelley|flo|sandy|female|woman|google uk english female|google us english/i;
const MALE=/\b(daniel|arthur|george|ryan|david|mark|guy|alex|fred|oliver|thomas|rishi|james|william|brian|eric|aaron|gordon|reed|rocko|grandpa|ralph|albert|junior|male|man)\b/i;
let VOICES=[],VOICE=null;
function scoreVoice(v){let s=0;const n=v.name;
  if(FEMALE.test(n))s+=10;else if(MALE.test(n))s-=20;
  if(/en[-_]GB/i.test(v.lang))s+=4;else if(/en[-_](US|AU|IE|NZ|CA)/i.test(v.lang))s+=2;else if(/^en/i.test(v.lang))s+=1;
  if(/natural|neural|online/i.test(n))s+=15;else if(/premium|enhanced|siri/i.test(n))s+=12;
  return s;}
function loadVoices(){
  if(!HAS_TTS)return;
  try{VOICES=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)).sort((a,b)=>scoreVoice(b)-scoreVoice(a));}catch(e){VOICES=[];}
  VOICE=VOICES.find(v=>v.name===S.voiceName)||VOICES[0]||null;
  const sel=$("#voicesel");if(sel)fillVoiceSelect(sel);
}
try{loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}

/* Word tokens: every word the app reads is a .kw span so it can light up */
function kwHtml(text){
  const out=[];
  String(text).replace(/⟦([^⟧]*)⟧/g,(_,a)=>a.split(" ").map(w=>"⟦"+w+"⟧").join(" ")).split(/\s+/).forEach(tok=>{
    if(!tok)return;
    const ans=tok.includes("⟦");const w=tok.replace(/[⟦⟧]/g,"");
    if(/^[\p{Extended_Pictographic}️‍]+$/u.test(w)){out.push(`<span class="e">${w}</span>`);return;}
    if(/_{3}/.test(w)){const rest=w.replace(/_{3}/,"");out.push(`<span class="kw gap" data-say="blank"></span>${esc(rest)}`);return;}
    if(w==="→"){out.push(`<span class="kw arrow" data-say="to">→</span>`);return;}
    if(/^[·–\/+=]+$/.test(w)){out.push(`<span class="sep">${esc(w)}</span>`);return;}
    if(w==="…"){out.push(`<span class="gap"></span>`);return;}
    const say=w.replace(/[\p{Extended_Pictographic}️‍]/gu,"");
    out.push(`<span class="kw${ans?" answ":""}" data-say="${esc(say)}">${esc(w)}</span>`);
  });
  return out.join(" ");
}
let hlTimer=null,curWords=[],speakSeq=0;
function clearHL(){clearTimeout(hlTimer);curWords.forEach(w=>w.classList.remove("on"));curWords=[];}
function stopSpeech(){speakSeq++;clearHL();try{speechSynthesis.cancel();}catch(e){}}
function cleanForSpeech(t){return String(t).replace(/[⟦⟧]/g,"").replace(/_{2,}/g," blank ").replace(/[\p{Extended_Pictographic}️‍]/gu,"").replace(/→/g," to ").replace(/…/g," ").replace(/\s+/g," ").trim();}
function utter(text,rate){const u=new SpeechSynthesisUtterance(text);u.rate=rate||S.rate;u.pitch=1;u.volume=1;if(VOICE){u.voice=VOICE;u.lang=VOICE.lang;}else u.lang="en-GB";return u;}
const sleep=ms=>new Promise(z=>setTimeout(z,ms));
const isNatural=v=>v&&/natural|neural|online|premium|enhanced/i.test(v.name);
/* one utterance, resolves when finished */
function say1(text,rate,onb,onstart){return new Promise(res=>{try{const u=utter(text,rate);if(onb)u.onboundary=onb;if(onstart)u.onstart=onstart;u.onend=u.onerror=()=>res();speechSynthesis.speak(u);}catch(e){res();}});}
/* speak plain text like a teacher: one sentence at a time, with a pause between */
async function speak(t,opt={}){
  if(!HAS_TTS||(!S.voice&&!opt.force))return;
  stopSpeech();const my=speakSeq;const rate=opt.rate||S.rate;
  const parts=cleanForSpeech(t).split(/(?<=[.!?])\s+/).filter(Boolean);
  for(let k=0;k<parts.length;k++){if(my!==speakSeq)return;await say1(parts[k],rate);if(my!==speakSeq)return;if(k<parts.length-1)await sleep(650*S.pauseMul);}
}
/* split words into short phrases: stop at . , ! ? and after about 6 words */
function phrases(ws){const out=[];let cur=[];
  ws.forEach((w,k)=>{cur.push(k);const t=w.dataset.say;const end=/[.!?]$/.test(t),com=/[,;:]$/.test(t)||t==="to"&&w.classList.contains("arrow");
    if(S.wordMode||end||com||cur.length>=9){out.push({ks:cur,pause:(end?750:com?420:S.wordMode?380:220)*S.pauseMul});cur=[];}});
  if(cur.length)out.push({ks:cur,pause:0});return out;}
/* speak the .kw words inside an element phrase by phrase, lighting each word as it is read */
async function speakEl(el,opt={}){
  if(!el)return;
  const ws=[...el.querySelectorAll(".kw")].filter(w=>w.dataset.say);
  if(!ws.length||!HAS_TTS||(!S.voice&&!opt.force))return;
  stopSpeech();const my=speakSeq;const rate=opt.rate||S.rate;curWords=ws;
  const on=k=>{if(my!==speakSeq)return;ws.forEach(w=>w.classList.remove("on"));if(ws[k])ws[k].classList.add("on");};
  for(const ph of phrases(ws)){
    if(my!==speakSeq)return;
    const starts=[];let s="";ph.ks.forEach(k=>{starts.push(s.length);s+=ws[k].dataset.say+" ";});
    let got=false;
    await say1(s.trim(),rate,
      e=>{if(e.name&&e.name!=="word")return;got=true;clearTimeout(hlTimer);let j=0;for(let i=0;i<starts.length;i++)if(starts[i]<=e.charIndex)j=i;on(ph.ks[j]);},
      ()=>{on(ph.ks[0]);let j=0;hlTimer=setTimeout(function step(){if(got||my!==speakSeq)return;on(ph.ks[j]);const len=ws[ph.ks[j]].dataset.say.length;j++;if(j<ph.ks.length)hlTimer=setTimeout(step,(260+len*80)/rate);},350);});
    clearTimeout(hlTimer);
    if(my!==speakSeq)return;
    if(ph.pause)await sleep(ph.pause);
  }
  if(my===speakSeq){clearHL();await sleep(450);}
}
/* tap any word to hear it */
document.addEventListener("click",e=>{
  const w=e.target.closest(".kw");if(!w||w.closest("button"))return;
  if(!w.dataset.say)return;const pr=speak(w.dataset.say,{force:true,rate:Math.min(S.rate,.55)});w.classList.add("on");curWords=[w];pr.then(()=>w.classList.remove("on"));
});

/* ---------- sounds ---------- */
let AC=null;
function tone(freqs,dur=.12,type="sine"){
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();let t=AC.currentTime;
    freqs.forEach(f=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.14,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+dur+.02);t+=dur*.8;});
  }catch(e){}
}
const yay=()=>tone([523,659,784],.13), oops=()=>tone([300,220],.16,"triangle"), fanfare=()=>tone([523,659,784,1047],.16);
/* ---------- confetti ---------- */
const fx=$("#fx"),ctx=fx.getContext("2d");let parts=[];
function confetti(n=120){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  fx.width=innerWidth;fx.height=innerHeight;const cs=["#FFC933","#E0443E","#2F5BEA","#1F9D63","#D6397E","#7C4DDB"];
  const start=!parts.length;
  for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*14,vy:Math.random()*-12-4,s:6+Math.random()*6,c:cs[i%cs.length],r:Math.random()*6,life:0});
  if(start)requestAnimationFrame(step);
}
function step(){ctx.clearRect(0,0,fx.width,fx.height);parts.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;p.life++;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);ctx.restore();});
  parts=parts.filter(p=>p.y<fx.height+20&&p.life<240);if(parts.length)requestAnimationFrame(step);else ctx.clearRect(0,0,fx.width,fx.height);}

/* ============================ SCREENS ============================ */
function setC(el,u){if(!el)return;const c=col(u);el.style.setProperty("--c",c.c);el.style.setProperty("--cl",c.l);}
function starsHtml(n){return [0,1,2].map(i=>i<n?"<b>★</b>":"★").join("");}
function go(fn){stopSpeech();window.scrollTo(0,0);fn();}

/* ---------- 🐢 reading speed panel ---------- */
function speedLabel(r){return r<=.45?"Super slow":r<=.55?"Very slow":r<=.68?"Slow":r<=.82?"Medium":"Normal";}
const PAUSES=[[0,"None"],[.6,"Short"],[1,"Medium"],[1.7,"Long"]];
function openSpeed(){
  if($("#speedpop")){closeSpeed();return;}
  const d=document.createElement("div");d.id="speedpop";d.className="speedpop";d.setAttribute("role","dialog");d.setAttribute("aria-label","Reading speed");
  d.innerHTML=`<div class="sphead"><b>🐢 Reading speed</b><button class="iconbtn" id="spclose" aria-label="Close">✕</button></div>
    <label class="splbl" for="sprate">Voice speed: <b id="spval">${speedLabel(S.rate)}</b></label>
    <div class="sprow"><span>🐢</span><input type="range" id="sprate" min="40" max="95" step="5" value="${Math.round(S.rate*100)}"><span>🐇</span></div>
    <div class="splbl">Pauses between phrases</div>
    <div class="seg" id="sppause">${PAUSES.map(([v,l])=>`<button data-v="${v}" class="${Math.abs(S.pauseMul-v)<.01?"on":""}">${l}</button>`).join("")}</div>
    <label class="sptoggle"><input type="checkbox" id="spword" ${S.wordMode?"checked":""}> One word at a time <small>(for brand-new sentences)</small></label>
    <div class="sptry"><button class="btn" id="sptest">▶ Try it</button><div class="kwbox" id="sptestt">${kwHtml("The cat is sleeping on the mat. It is very happy!")}</div></div>`;
  document.body.appendChild(d);
  const test=()=>speakEl($("#sptestt"),{force:true});
  $("#spclose").onclick=closeSpeed;
  const r=$("#sprate");r.oninput=()=>{S.rate=+r.value/100;$("#spval").textContent=speedLabel(S.rate);};r.onchange=()=>{save();refreshSpeedBtn();test();};
  d.querySelectorAll("#sppause button").forEach(b=>b.onclick=()=>{S.pauseMul=+b.dataset.v;save();d.querySelectorAll("#sppause button").forEach(x=>x.classList.toggle("on",x===b));test();});
  $("#spword").onchange=e=>{S.wordMode=e.target.checked;save();test();};
  $("#sptest").onclick=test;
}
function closeSpeed(){const d=$("#speedpop");if(d){d.remove();}refreshSpeedBtn();}
function refreshSpeedBtn(){const b=$("#openspeed");if(b)b.textContent="🐢 Reading speed: "+speedLabel(S.rate);}
$("#speedbtn").onclick=openSpeed;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSpeed();});

function fillVoiceSelect(sel){
  sel.innerHTML=VOICES.length?VOICES.map(v=>`<option value="${esc(v.name)}"${VOICE&&v.name===VOICE.name?" selected":""}>${isNatural(v)?"⭐ ":""}${esc(v.name)} (${esc(v.lang)})${FEMALE.test(v.name)?" ♀":""}</option>`).join(""):`<option>Default voice</option>`;
}
function voicePanel(){
  const rates=[[.5,"Super slow"],[.6,"Very slow"],[.72,"Slow"],[.85,"Normal"]];
  return `<details class="panel vset" id="vset"><summary>🎙️ Voice settings</summary>
    <div class="vrow"><label for="voicesel">Voice</label><select id="voicesel"></select></div>
    <div class="vrow"><span class="vl">Speed</span><button class="btn ghost" id="openspeed" style="font-size:16px;padding:6px 14px">🐢 Reading speed: ${speedLabel(S.rate)}</button></div>
    <div class="vrow"><button class="btn" id="vtest" style="font-size:17px;padding:8px 16px">▶ Test voice</button><span class="kwbox" id="vtestt">${kwHtml("Hello Aarya! Let's read together.")}</span></div>
    <p class="note" style="margin:6px 0 0">Voices come from this phone or laptop, so the list is different on each device. ⭐ marks the most natural, human-sounding voices; ♀ marks female voices.${VOICE&&!isNatural(VOICE)?" <b>This device has no natural voice yet. See below for how to add one.</b>":""}</p>
    <details class="vhelp"><summary>How to get a more human voice</summary><ul>
      <li><b>Windows laptop:</b> open this app in <b>Microsoft Edge</b>. Edge has free natural voices. Pick “⭐ Microsoft Libby Online (Natural)” or “⭐ Sonia Online (Natural)”.</li>
      <li><b>Mac:</b> System Settings → Accessibility → Spoken Content → System voice → Manage Voices. Download an English (UK) voice marked Premium or Enhanced, such as Serena. Then reopen the browser.</li>
      <li><b>iPhone / iPad:</b> Settings → Accessibility → Spoken Content → Voices → English. Download a Premium or Enhanced voice (for example Serena or Martha), then reopen the app.</li>
      <li><b>Android:</b> Settings → Text-to-speech output → Google engine → Install voice data → English (United Kingdom). Choose a voice and download it.</li>
    </ul></details></details>`;
}
function wireVoicePanel(){
  const sel=$("#voicesel");fillVoiceSelect(sel);
  sel.onchange=()=>{S.voiceName=sel.value;save();VOICE=VOICES.find(v=>v.name===sel.value)||VOICE;speakEl($("#vtestt"),{force:true});};
  $("#openspeed").onclick=openSpeed;
  $("#vtest").onclick=()=>speakEl($("#vtestt"),{force:true});
}

function home(){
  updTotal();
  const next=UNITS.find(u=>!(S.best[u.id]>0))||UNITS[0];
  let h=`<div class="hello"><div class="big">🤸‍♀️</div><div><h2>Hi Aarya! Ready to play?</h2><p>Next up: <b>${next.emo} ${esc(next.title)}</b>. Tap a block to start.${S.reads?` <br>📖 Sentences read out loud: <b>${S.reads}</b>`:""}</p></div><button class="btn go" id="gonext">Go! ▶</button></div>`;
  h+=`<button class="block chall" id="chall"><span class="emo">🏆</span><span><b>Big Challenge</b><span>Questions mixed from the units you have played${S.bestMix?` · best score ${S.bestMix}`:""}</span></span><span class="go2">▶</span></button>`+lenSel();
  let last="";
  UNITS.forEach(u=>{
    if(u.sec!==last){if(last)h+="</div>";h+=`<div class="sec">${esc(u.sec)}</div><div class="grid">`;last=u.sec;}
    h+=`<button class="block ucard" data-u="${u.id}" aria-label="${esc(u.title)}"><span class="no">${u.id}</span><span class="emo">${u.emo}</span><span class="t">${esc(u.title)}</span><span class="pg">${esc(u.pages)}</span><span class="st">${starsHtml(S.best[u.id]||0)}</span></button>`;
  });
  h+=`</div>${voicePanel()}<p class="note">Progress is saved on this device. Grown-ups: each unit has a “For Papa” page with the rule and game ideas from the prep book.</p>
  <div class="confirm" id="resetbox"><button class="btn ghost" id="reset" style="font-size:15px;padding:6px 14px">Reset stars</button></div>`;
  app.innerHTML=h;
  app.querySelectorAll(".ucard").forEach(b=>{const u=UNITS[b.dataset.u];setC(b,u);b.onclick=()=>go(()=>unit(u));});
  $("#gonext").onclick=()=>go(()=>unit(next));
  setC($("#chall"),{sec:"Mix"});$("#chall").onclick=()=>go(()=>play(mixUnit()));wireLen();
  wireVoicePanel();
  $("#reset").onclick=()=>{$("#resetbox").innerHTML=`Clear all stars and ticks? <button class="btn" id="yes" style="--c:var(--bad);font-size:15px;padding:6px 14px">Yes, clear</button><button class="btn ghost" id="no" style="font-size:15px;padding:6px 14px">Keep them</button>`;
    $("#yes").onclick=()=>{S.best={};S.said={};S.reads=0;S.gbest={};S.bestMix=0;save();home();};$("#no").onclick=home;};
}

function head(u){return `<button class="back" id="back">← All units</button><div class="uhead" id="uh"><div class="emo">${u.emo}</div><div><div class="k">${esc(u.sec)} · ${esc(u.pages)}</div><h2>${esc(u.title)}</h2></div></div>`;}
function wireHead(u,backTo){setC($("#uh"),u);$("#back").onclick=()=>go(u.id==="mix"?home:(backTo||home));}

function unit(u){
  app.innerHTML=head(u)+lenSel()+`<div class="modes">
   <button class="block mode" data-m="learn"><span class="emo">📖</span><b>Learn</b><span>Rule and examples</span></button>
   <button class="block mode" data-m="play"><span class="emo">🎮</span><b>Play</b><span>Quiz · best ${"★".repeat(S.best[u.id]||0)||"—"}</span></button>
   <button class="block mode" data-m="build"><span class="emo">🧩</span><b>Build it</b><span>Put the words in order · ${"★".repeat(gstars(u,"build"))||"—"}</span></button>
   <button class="block mode" data-m="memory"><span class="emo">🃏</span><b>Memory</b><span>Find the pairs · ${"★".repeat(gstars(u,"memo"))||"—"}</span></button>
   <button class="block mode" data-m="silly"><span class="emo">🕵️</span><b>Right or silly?</b><span>Spot the mistakes · ${"★".repeat(gstars(u,"silly"))||"—"}</span></button>
   <button class="block mode" data-m="think"><span class="emo">🧠</span><b>Think</b><span>Answer in your head first</span></button>
   <button class="block mode" data-m="speak"><span class="emo">🗣️</span><b>Say it</b><span>Talk out loud</span></button>
   <button class="block mode" data-m="parent"><span class="emo">👨‍👧</span><b>For Papa</b><span>Rule and game ideas</span></button></div>`;
  wireHead(u);wireLen();
  const M={learn,play,think,speak:speakMode,parent,build,memory,silly};
  app.querySelectorAll(".mode").forEach(b=>{setC(b,u);b.onclick=()=>go(()=>M[b.dataset.m](u));});
}

function learn(u){
  const more=MORE[u.id]||[];
  app.innerHTML=head(u)+`<div class="panel" id="pn">
   <div class="say"><button class="spk" id="s1" aria-label="Listen">🔊</button><div class="kwbox" id="sayt">${kwHtml(u.say)}</div></div>
   <div class="lbl" style="margin-top:16px">🖼️ Examples, tap to hear</div>
   <div class="egs">${u.ex.map((e,i)=>`<button class="eg" data-i="${i}"><span class="e">${e[0]}</span><span class="kwbox">${kwHtml(e[1])}</span></button>`).join("")}</div>
   <ul class="rules">${u.rules.map(r=>`<li class="kwbox">${kwHtml(r)}</li>`).join("")}</ul>
   ${u.chant?`<div class="chant"><div class="lbl">♪ Chant it together</div><div class="chrow"><div class="kwbox" id="cht">${kwHtml(u.chant)}</div><button class="spk" id="s2" aria-label="Listen to the chant">🔊</button></div></div>`:""}
   <div class="lbl" style="margin-top:18px">📚 More examples</div>
   <div class="more">${more.map((m,i)=>`<div class="mrow2" data-i="${i}"><span class="e">${m[0]}</span><div class="kwbox">${kwHtml(m[1])}</div><button class="spk" aria-label="Listen">🔊</button></div>`).join("")}</div>
   <div class="row"><button class="btn ghost" id="readall">▶ Read them all to me</button><button class="btn" id="toplay">Let's play! 🎮</button></div></div>`;
  wireHead(u,()=>unit(u));
  const pn=$("#pn");setC(pn,u);pn.querySelectorAll(".say,.eg,.chant,.spk,.mrow2").forEach(el=>setC(el,u));setC($("#toplay"),u);
  $("#s1").onclick=()=>speakEl($("#sayt"),{force:true});
  if($("#s2"))$("#s2").onclick=()=>speakEl($("#cht"),{force:true});
  pn.querySelectorAll(".eg").forEach(b=>b.onclick=()=>speakEl(b.querySelector(".kwbox"),{force:true}));
  pn.querySelectorAll(".mrow2 .spk").forEach(b=>b.onclick=()=>speakEl(b.parentElement.querySelector(".kwbox"),{force:true}));
  $("#readall").onclick=async()=>{const my=++speakSeq;const rows=[...pn.querySelectorAll(".mrow2")];
    for(const r of rows){if(my!==speakSeq-0&&my!==speakSeq)break;r.classList.add("cur");r.scrollIntoView({behavior:"smooth",block:"center"});
      const before=speakSeq;await speakEl(r.querySelector(".kwbox"),{force:true});r.classList.remove("cur");if(speakSeq!==before+1)break;await new Promise(z=>setTimeout(z,500));}};
  $("#toplay").onclick=()=>go(()=>play(u));
  speakEl($("#sayt"));
}

/* ---------- READ-IT sentence builder ---------- */
const MK=a=>"⟦"+a+"⟧";
function buildSentence(q,ans){
  let p=q.trim();let m;
  if((m=p.match(/^Is “(.+)” a verb\?$/)))return ans==="Yes"?`Yes! “${m[1]}” is ${MK("a verb")}.`:`No! “${m[1]}” is ${MK("not")} a verb.`;
  if((m=p.match(/— can you count it\?$/)))return ans.startsWith("Yes")?`Yes, I ${MK("can")} count it.`:`No, I ${MK("can't")} count it.`;
  if((m=p.match(/^What comes (after|before) (\w)\?$/)))return `${MK(ans)} comes ${m[1]} ${m[2]}.`;
  if(/^Which comes first/.test(p))return `${MK(ans)} comes first.`;
  if(/^Which is (written correctly|right)\?$/.test(p))return MK(ans);
  if((m=p.match(/(\w) _ (\w) — which vowel\?/)))return `${p.split(" ")[0]} ${m[1]}${MK(ans)}${m[2]}`;
  if((m=p.match(/(\w+) _ _/)))return `${p.split(" ")[0]} ${m[1]}${MK(ans)}`;
  p=p.replace(/\s*\((?:[^)]*)\)\s*/g," ").replace(/\s*— what comes next\?/,"").trim();
  if(p.includes("→")){
    const [l,r]=p.split("→").map(x=>x.trim());
    const rr=r.replace(/_{3}|\?|…/,MK(ans));
    return rr.replace(/⟦.*⟧/,"").trim()===""?`${l} → ${rr}`:rr;
  }
  if(/_{3}/.test(p))return p.replace(/_{3}/,MK(ans));
  if(/…$/.test(p))return p.replace(/…$/,MK(ans)+".");
  if(/:$/.test(p))return p+" "+MK(ans)+".";
  return null;
}

/* ---------- PLAY ---------- */
function play(u){
  const qs=shuffle(u.q).slice(0,u.id==="mix"?nOf("mix"):nOf("quiz"));let i=0,score=0,reads=0;
  const c=col(u);
  function render(){
    stopSpeech();window.scrollTo(0,0);
    const q=qs[i];
    app.innerHTML=head(u)+`<div class="panel" id="pn" style="--c:${c.c}">
      <div class="prog"><i style="width:${(i/qs.length)*100}%"></i></div>
      <div class="qmeta"><span>Question ${i+1} of ${qs.length}</span><span>✔ ${score}</span></div>
      <div id="qa"></div><div class="feedback" id="fb" aria-live="polite"></div>
      <div class="row"><button class="btn" id="next" hidden>Next ▶</button></div></div>`;
    wireHead(u,()=>unit(u));setC($("#next"),u);
    const qa=$("#qa");
    qa.innerHTML=`<div class="q"><button class="spk" id="sq" style="--c:${c.c}" aria-label="Read the question">🔊</button><div class="kwbox" id="qt">${kwHtml(q[1])}</div></div>`;
    $("#sq").onclick=()=>speakEl($("#qt"),{force:true});
    if(q[0]==="c")choice(q,qa);else if(q[0]==="t")tapAll(q,qa);else pairs(q,qa);
    speakEl($("#qt"));
  }
  function finish(ok,answerText,readAns,chosen){
    const fb=$("#fb");const nb=$("#next");
    nb.textContent=i===qs.length-1?"See my stars ⭐":"Next ▶";
    nb.onclick=()=>{stopSpeech();i++;if(i<qs.length)render();else result();};
    const showNext=()=>{nb.hidden=false;nb.focus({preventScroll:true});};
    if(ok){score++;fb.className="feedback ok";const w=["Great job!","Super!","Yes! Well done!","Brilliant!","You got it!"][Math.floor(Math.random()*5)];fb.innerHTML="🎉 "+w;yay();
      const sen=readAns!=null?buildSentence(qs[i][1],readAns):null;
      if(sen){
        const box=document.createElement("div");box.className="readit";setC(box,u);
        box.innerHTML=`<div class="lbl">📖 Your turn! Read it out loud</div><div class="sent kwbox" id="sent">${kwHtml(sen)}</div>
          <p class="readhint">Tap a word to hear it. Stuck? Tap “Help me”.</p>
          <div class="row"><button class="btn ghost" id="help">🔊 Help me</button><button class="btn" id="didread">I read it! ⭐</button></div>`;
        fb.after(box);setC($("#didread"),u);
        $("#help").onclick=()=>speakEl($("#sent"),{force:true,rate:Math.min(S.rate,.72)});
        $("#didread").onclick=()=>{stopSpeech();reads++;S.reads=(S.reads||0)+1;save();tone([784,988],.12);
          $("#didread").remove();$("#help").textContent="🔊 Hear it again";fb.innerHTML="🎉 "+w+" <span class='ans'>📖 Super reader!</span>";showNext();};
        speak(w+" Now you read it!");
        box.scrollIntoView({behavior:"smooth",block:"nearest"});
      }else{speak(w);showNext();}
    }
    else{fb.className="feedback no";fb.innerHTML=`Nice try! The answer is <span class="ans">${esc(answerText)}</span>`;oops();
      const q=qs[i],tok=i;let w=null,sen=null,bad=null;
      if(q[0]==="c"){w=why(q,q[2][0],chosen);sen=buildSentence(q[1],q[2][0]);bad=chosen?buildSentence(q[1],chosen):null;}
      if(!w)w=UWHY[q.uid]||{look:[],tip:(UNITS[q.uid]||u).say};
      const rule=ruleFor(q,q[2][0]);fb.insertAdjacentHTML("afterend",whyBox(w,sen,bad,rule));
      const still=()=>i===tok&&document.getElementById("whyt");
      speak("Nice try!").then(()=>still()&&speakEl($("#whys"))).then(()=>still()&&speakEl($("#whyt"))).then(()=>still()&&rule&&speak("Grammar rule. "+rule[0])).then(()=>still()&&speakEl($("#whyr"))).then(()=>still()&&speak("Now you say it!"));
      showNext();}
  }
  function choice(q,qa){
    const correct=q[2][0];const wrap=document.createElement("div");wrap.className="opts";
    shuffle(q[2]).forEach(o=>{const b=document.createElement("button");b.className="opt";b.textContent=o;
      b.onclick=()=>{wrap.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.textContent===correct)x.classList.add("right");else if(x!==b)x.classList.add("dim");});
        if(o===correct){finish(true,null,correct);}else{b.classList.add("wrong");finish(false,correct,null,o);}};
      wrap.appendChild(b);});
    qa.appendChild(wrap);
  }
  function tapAll(q,qa){
    const good=new Set(q[2]);const wrap=document.createElement("div");wrap.className="opts";
    shuffle(q[2].concat(q[3])).forEach(o=>{const b=document.createElement("button");b.className="opt";b.textContent=o;b.setAttribute("aria-pressed","false");
      b.onclick=()=>{b.classList.toggle("sel");b.setAttribute("aria-pressed",b.classList.contains("sel"));speak(o,{force:true});};wrap.appendChild(b);});
    qa.appendChild(wrap);
    const row=document.createElement("div");row.className="row";const chk=document.createElement("button");chk.className="btn";chk.textContent="Check ✔";setC(chk,u);row.appendChild(chk);qa.appendChild(row);
    chk.onclick=()=>{let ok=true;wrap.querySelectorAll(".opt").forEach(x=>{x.disabled=true;const g=good.has(x.textContent),s=x.classList.contains("sel");x.classList.remove("sel");
        if(g&&s)x.classList.add("right");else if(g&&!s){x.classList.add("right");ok=false;}else if(!g&&s){x.classList.add("wrong");ok=false;}else x.classList.add("dim");});
      row.remove();finish(ok,q[2].join(", "));};
  }
  function pairs(q,qa){
    const P=q[2];let pick=null,matched=0,miss=0;
    const g=document.createElement("div");g.className="pairs";const L=document.createElement("div"),R=document.createElement("div");L.className=R.className="col";
    const mk=(txt,side,key)=>{const b=document.createElement("button");b.className="opt";b.textContent=txt;b.dataset.k=key;b.dataset.s=side;return b;};
    shuffle(P.map((p,k)=>[p[0],k])).forEach(([t,k])=>L.appendChild(mk(t,"L",k)));
    shuffle(P.map((p,k)=>[p[1],k])).forEach(([t,k])=>R.appendChild(mk(t,"R",k)));
    g.append(L,R);qa.appendChild(g);
    g.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      if(b.disabled)return;speak(b.textContent,{force:true});
      if(!pick||pick.dataset.s===b.dataset.s){if(pick)pick.classList.remove("sel");pick=b;b.classList.add("sel");return;}
      if(pick.dataset.k===b.dataset.k){[pick,b].forEach(x=>{x.classList.remove("sel");x.classList.add("right");x.disabled=true;});matched++;tone([660],.08);
        if(matched===P.length)finish(miss<=1,P.map(p=>p.join(" – ")).join(" · "));}
      else{miss++;const a=pick;[a,b].forEach(x=>x.classList.add("wrong"));oops();setTimeout(()=>[a,b].forEach(x=>x.classList.remove("wrong","sel")),450);}
      pick=null;});
  }
  function result(){
    const pct=score/qs.length;const st=pct>=.9?3:pct>=.7?2:pct>=.4?1:0;
    if(u.id==="mix"){if(score>(S.bestMix||0)){S.bestMix=score;save();}}else if(st>(S.best[u.id]||0)){S.best[u.id]=st;save();}updTotal();
    window.scrollTo(0,0);
    const msg=["Let's practise again!","Good start!","Great work!","Superstar!"][st];
    app.innerHTML=head(u)+`<div class="panel result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div>
      <h3>${msg}</h3><p>You got ${score} out of ${qs.length} right.${reads?` You read <b>${reads}</b> sentence${reads>1?"s":""} out loud! 📖`:""}</p>
      <div class="row"><button class="btn" id="again">Play again 🔁</button><button class="btn ghost" id="tothink">Think mode 🧠</button><button class="btn ghost" id="tohome">All units</button></div></div>`;
    wireHead(u,()=>unit(u));setC($("#again"),u);
    $("#again").onclick=()=>go(()=>play(u));$("#tothink").onclick=()=>go(()=>think(u));$("#tohome").onclick=()=>go(home);
    if(st>=2){fanfare();confetti();}speak(msg+" You got "+score+" out of "+qs.length);
  }
  render();
}

/* ---------- THINK ---------- */
function think(u){
  const items=shuffle(u.think);let i=0,timer=null;const c=col(u);
  function render(){
    clearInterval(timer);stopSpeech();window.scrollTo(0,0);const [q,a]=items[i];
    app.innerHTML=head(u)+`<div class="panel think" style="--c:${c.c}">
      <div class="qmeta"><span>Think card ${i+1} of ${items.length}</span><span>🧠</span></div>
      <div class="tq kwbox" id="tq">${kwHtml(q)}</div>
      <div class="clock" id="clk" style="--p:0%"><span id="cn">3</span></div>
      <div class="stage" id="stg">Think in your head…</div>
      <div id="rv"></div>
      <div class="row"><button class="btn ghost" id="hear">Hear it again 🔊</button><button class="btn" id="show" hidden>Show answer</button><button class="btn" id="nx" hidden>${i<items.length-1?"Next card ▶":"Finish 🎉"}</button></div></div>`;
    wireHead(u,()=>{clearInterval(timer);unit(u);});["show","nx"].forEach(id=>setC($("#"+id),u));
    $("#hear").onclick=()=>speakEl($("#tq"),{force:true});
    const startClock=()=>{let t=0;timer=setInterval(()=>{t++;const left=Math.max(0,3-Math.floor(t/10));
      if(!$("#clk")){clearInterval(timer);return;}
      $("#clk").style.setProperty("--p",Math.min(100,(t/30)*100)+"%");$("#cn").textContent=left>0?left:"💬";
      if(t>=30){clearInterval(timer);$("#stg").textContent="Now say it out loud!";$("#show").hidden=false;tone([700],.1);speak("Now say it out loud!");}},100);};
    const p=speakEl($("#tq"));(S.voice&&HAS_TTS?p:Promise.resolve()).then(()=>{if($("#tq"))startClock();});
    $("#show").onclick=()=>{$("#rv").innerHTML=`<div class="reveal kwbox" id="rvt">${kwHtml(a)}</div>`;$("#show").hidden=true;$("#nx").hidden=false;speakEl($("#rvt"),{force:true});};
    $("#nx").onclick=()=>{i++;if(i<items.length)render();else{confetti(80);fanfare();go(()=>unit(u));}};
  }
  render();
}

/* ---------- SPEAK ---------- */
function speakMode(u){
  S.said[u.id]=S.said[u.id]||[];
  app.innerHTML=head(u)+`<div class="panel"><div class="lbl" style="--c:${col(u).c}">🗣️ Say it out loud!</div>
    <div class="speaklist">${u.speak.map((s,k)=>`<div class="sp-item"><button class="spk" data-k="${k}" style="--c:${col(u).c}" aria-label="Listen">🔊</button><div class="txt kwbox" id="sp${k}">${kwHtml(s)}</div><button class="done ${S.said[u.id][k]?"on":""}" data-d="${k}">${S.said[u.id][k]?"I said it ✔":"I said it"}</button></div>`).join("")}</div>
    <p class="note">Tip for Papa: answer back with the correct sentence instead of saying “wrong”.</p></div>`;
  wireHead(u,()=>unit(u));
  app.querySelectorAll(".spk[data-k]").forEach(b=>b.onclick=()=>speakEl($("#sp"+b.dataset.k),{force:true}));
  app.querySelectorAll(".done").forEach(b=>b.onclick=()=>{const k=b.dataset.d;S.said[u.id][k]=!S.said[u.id][k];save();b.classList.toggle("on",!!S.said[u.id][k]);b.textContent=S.said[u.id][k]?"I said it ✔":"I said it";if(S.said[u.id][k]){yay();}});
}

/* ---------- PARENT ---------- */
function parent(u){
  app.innerHTML=head(u)+`<div class="panel parent"><h3>💡 The big idea</h3><p>${esc(u.idea)}</p>
    <h3>🎲 Games to play</h3><ul>${u.games.map(g=>`<li>${esc(g)}</li>`).join("")}</ul>
    <h3>🧠 Mental practice</h3><p>Use the Think cards: she hears the question, thinks silently for 3 seconds, says her answer, then taps to check. The pause builds the habit of thinking in English.</p>
    <h3>📖 Reading</h3><p>After every correct answer she reads the whole sentence aloud. Let her try first; “Help me” reads it slowly with each word lit up. Tapping any word in the app reads that word.</p>
    <h3>📅 Suggested week</h3><ul><li><b>Day 1:</b> Learn + chant + one game, then Play.</li><li><b>Day 2:</b> More examples + Think cards, then Play again.</li><li><b>Day 3:</b> Say it + Play for 3 stars.</li><li><b>Day 4:</b> Workbook ${esc(u.pages.replace("Workbook ",""))}.</li></ul></div>`;
  wireHead(u,()=>unit(u));
}

/* ============================ GAME LENGTH ============================ */
const LEN={quiz:{short:8,medium:12,long:99},silly:{short:6,medium:10,long:14},build:{short:4,medium:6,long:9},memo:{short:4,medium:6,long:6},mix:{short:10,medium:20,long:30}};
const LENNAME={short:"Short",medium:"Medium",long:"Long"};
function nOf(game){return LEN[game][S.len||"medium"];}
function lenSel(){return `<div class="lenrow"><span class="vl">Game length</span><div class="seg" id="lenseg">${Object.keys(LENNAME).map(k=>`<button data-l="${k}" class="${(S.len||"medium")===k?"on":""}">${LENNAME[k]}</button>`).join("")}</div></div>`;}
function wireLen(after){document.querySelectorAll("#lenseg button").forEach(b=>b.onclick=()=>{S.len=b.dataset.l;save();document.querySelectorAll("#lenseg button").forEach(x=>x.classList.toggle("on",x===b));if(after)after();});}
function gstars(u,g){return (S.gbest&&S.gbest[u.id+":"+g])||0;}
function saveG(u,g,st){S.gbest=S.gbest||{};if(st>(S.gbest[u.id+":"+g]||0)){S.gbest[u.id+":"+g]=st;save();}}
const stripEmo=t=>String(t).replace(/[\p{Extended_Pictographic}️‍]/gu,"").replace(/\s+/g," ").trim();
const leadEmo=t=>{const m=String(t).match(/^([\p{Extended_Pictographic}️‍]+)/u);return m?m[1]:"";};

function gameResult(u,game,score,total,st,extra,again){
  saveG(u,game,st);updTotal();window.scrollTo(0,0);
  const msg=["Let's practise again!","Good start!","Great work!","Superstar!"][st];
  app.innerHTML=head(u)+`<div class="panel result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div>
    <h3>${msg}</h3><p>${extra||`You got ${score} out of ${total} right.`}</p>
    <div class="row"><button class="btn" id="again">Play again 🔁</button><button class="btn ghost" id="tounit">More games</button><button class="btn ghost" id="tohome">All units</button></div></div>`;
  wireHead(u,()=>unit(u));setC($("#again"),u);
  $("#again").onclick=()=>go(again);$("#tounit").onclick=()=>go(()=>unit(u));$("#tohome").onclick=()=>go(home);
  if(st>=2){fanfare();confetti();}speak(msg);
}
function readStep(host,u,sen,onDone){
  const box=document.createElement("div");box.className="readit";setC(box,u);
  box.innerHTML=`<div class="lbl">📖 Your turn! Read it out loud</div><div class="sent kwbox">${kwHtml(sen)}</div>
    <p class="readhint">Tap a word to hear it. Stuck? Tap “Help me”.</p>
    <div class="row"><button class="btn ghost rs-help">🔊 Help me</button><button class="btn rs-done">I read it! ⭐</button></div>`;
  host.appendChild(box);setC(box.querySelector(".rs-done"),u);
  box.querySelector(".rs-help").onclick=()=>speakEl(box.querySelector(".sent"),{force:true,rate:Math.min(S.rate,.72)});
  box.querySelector(".rs-done").onclick=()=>{stopSpeech();S.reads=(S.reads||0)+1;save();tone([784,988],.12);box.querySelector(".rs-done").remove();box.querySelector(".rs-help").textContent="🔊 Hear it again";onDone();};
  box.scrollIntoView({behavior:"smooth",block:"nearest"});
}

/* ---------- 🧩 BUILD THE SENTENCE ---------- */
function sentencesFor(u){
  const out=[];const seen=new Set();
  const add=(emo,t)=>{t=stripEmo(t);const n=t.split(" ").length;if(n<3||n>8||/[→:“]/.test(t)||seen.has(t))return;seen.add(t);out.push([emo||u.emo,t]);};
  u.ex.forEach(e=>add(e[0],e[1]));(MORE[u.id]||[]).forEach(m=>add(m[0],m[1]));
  u.q.filter(q=>q[0]==="c").forEach(q=>{const s=buildSentence(q[1],q[2][0]);if(s&&/[.!?]$/.test(s.replace(/[⟦⟧]/g,"")))add(leadEmo(q[1]),s.replace(/[⟦⟧]/g,""));});
  return out;
}
function build(u){
  const pool=shuffle(sentencesFor(u)).slice(0,nOf("build"));let i=0,mistakes=0;const c=col(u);
  function render(){
    stopSpeech();window.scrollTo(0,0);
    const [emo,sen]=pool[i];const words=sen.split(" ");
    let order=shuffle(words.map((w,k)=>k));let tries=0;while(order.every((v,k)=>v===k)&&tries++<5)order=shuffle(order);
    app.innerHTML=head(u)+`<div class="panel" id="pn" style="--c:${c.c}">
      <div class="prog"><i style="width:${(i/pool.length)*100}%"></i></div>
      <div class="qmeta"><span>🧩 Sentence ${i+1} of ${pool.length}</span><span>Tap the words in order</span></div>
      <div class="bhint"><span class="bemo">${emo}</span><button class="btn ghost" id="hearall">🔊 Hear the sentence</button></div>
      <div class="slots" id="slots">${words.map(()=>`<span class="slot"></span>`).join("")}</div>
      <div class="chips" id="chips">${order.map(k=>`<button class="chip" data-k="${k}">${esc(words[k])}</button>`).join("")}</div>
      <div class="feedback" id="fb"></div><div id="rd"></div>
      <div class="row"><button class="btn" id="next" hidden>${i<pool.length-1?"Next ▶":"See my stars ⭐"}</button></div></div>`;
    wireHead(u,()=>unit(u));setC($("#next"),u);
    const hidden=document.createElement("div");hidden.className="kwbox";hidden.hidden=true;hidden.innerHTML=kwHtml(sen);$("#pn").appendChild(hidden);
    $("#hearall").onclick=()=>speak(sen,{force:true,rate:Math.min(S.rate,.75)});
    let pos=0;const slots=[...document.querySelectorAll(".slot")];
    document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{
      if(b.disabled)return;
      if(b.textContent===words[pos]){slots[pos].textContent=b.textContent;slots[pos].classList.add("filled");b.disabled=true;b.classList.add("used");pos++;speak(b.textContent,{force:true,rate:.8});
        if(pos===words.length){yay();$("#fb").className="feedback ok";$("#fb").textContent="🎉 You built it!";$("#chips").remove();
          readStep($("#rd"),u,sen,()=>{$("#next").hidden=false;$("#next").focus({preventScroll:true});});}}
      else{mistakes++;b.classList.add("wrong");oops();setTimeout(()=>b.classList.remove("wrong"),400);}
    });
    $("#next").onclick=()=>{i++;if(i<pool.length)render();else{const per=mistakes/pool.length;const st=per<=.5?3:per<=1.5?2:1;
      gameResult(u,"build",0,0,st,`You built ${pool.length} sentences${mistakes?` with ${mistakes} oops`:" with no mistakes"}!`,()=>build(u));}};
    speak("Build the sentence!");
  }
  if(!pool.length){app.innerHTML=head(u)+`<div class="panel">No sentences here yet.</div>`;wireHead(u,()=>unit(u));return;}
  render();
}

/* ---------- 🃏 MEMORY MATCH ---------- */
function memory(u){
  const pairs=shuffle(MEMO[u.id]||[]).slice(0,nOf("memo"));const c=col(u);
  const cards=shuffle(pairs.flatMap((p,k)=>[{t:p[0],k},{t:p[1],k}]));
  let open=[],moves=0,found=0,lock=false;
  app.innerHTML=head(u)+`<div class="panel" style="--c:${c.c}">
    <div class="qmeta"><span>🃏 Find the pairs!</span><span id="mv">Moves: 0</span></div>
    <div class="memo" id="memo">${cards.map((cd,i)=>`<button class="mcard" data-i="${i}" aria-label="Card ${i+1}"><span class="back">?</span><span class="front">${esc(cd.t)}</span></button>`).join("")}</div>
    <p class="note">Turn over two cards. If they belong together, they stay open!</p></div>`;
  wireHead(u,()=>unit(u));
  speak("Find the pairs!");
  document.querySelectorAll(".mcard").forEach(b=>b.onclick=()=>{
    if(lock||b.classList.contains("up"))return;
    const cd=cards[b.dataset.i];b.classList.add("up");speak(stripEmo(cd.t.replace(/_{3}/g," blank ")),{force:true,rate:.8});open.push([b,cd]);
    if(open.length===2){moves++;$("#mv").textContent="Moves: "+moves;const [[b1,c1],[b2,c2]]=open;open=[];
      if(c1.k===c2.k){found++;setTimeout(()=>{b1.classList.add("got");b2.classList.add("got");yay();},350);
        if(found===pairs.length)setTimeout(()=>{const st=moves<=pairs.length+2?3:moves<=pairs.length*2?2:1;
          gameResult(u,"memo",0,0,st,`You found all ${pairs.length} pairs in ${moves} moves!`,()=>memory(u));},1300);}
      else{lock=true;setTimeout(()=>{b1.classList.remove("up");b2.classList.remove("up");lock=false;},1100);}}
  });
}

/* ---------- 🕵️ RIGHT OR SILLY? ---------- */
function silly(u){
  const src=u.q.filter(q=>q[0]==="c"&&q[2].length>1).map(q=>{const good=buildSentence(q[1],q[2][0]);if(!good)return null;return {q,good};}).filter(Boolean);
  const items=shuffle(src).slice(0,nOf("silly")).map(it=>{const right=Math.random()<.5;const bad=shuffle(it.q[2].slice(1))[0];const shown=right?it.good:buildSentence(it.q[1],bad);return {...it,right,shown,bad};});
  let i=0,score=0;const c=col(u);
  function render(){
    stopSpeech();window.scrollTo(0,0);const it=items[i];
    app.innerHTML=head(u)+`<div class="panel" id="pn" style="--c:${c.c}">
      <div class="prog"><i style="width:${(i/items.length)*100}%"></i></div>
      <div class="qmeta"><span>🕵️ Sentence ${i+1} of ${items.length}</span><span>✔ ${score}</span></div>
      <div class="lbl" style="margin-top:8px">Is this sentence right, or silly?</div>
      <div class="q"><button class="spk" id="sq" style="--c:${c.c}" aria-label="Read the sentence">🔊</button><div class="kwbox sent2" id="qt">${kwHtml(it.shown)}</div></div>
      <div class="opts two"><button class="opt big" id="yes">✅ Right</button><button class="opt big" id="no">🤪 Silly</button></div>
      <div class="feedback" id="fb"></div><div id="fix"></div>
      <div class="row"><button class="btn" id="next" hidden>${i<items.length-1?"Next ▶":"See my stars ⭐"}</button></div></div>`;
    wireHead(u,()=>unit(u));setC($("#next"),u);
    $("#sq").onclick=()=>speakEl($("#qt"),{force:true});speakEl($("#qt"));
    const answer=says=>{$("#yes").disabled=$("#no").disabled=true;const ok=(says===it.right);
      (it.right?$("#yes"):$("#no")).classList.add("right");if(!ok)(says?$("#yes"):$("#no")).classList.add("wrong");
      if(ok){score++;yay();$("#fb").className="feedback ok";$("#fb").textContent=it.right?"🎉 Yes, it's right!":"🎉 Good detective! It's silly.";}
      else{oops();$("#fb").className="feedback no";$("#fb").textContent=it.right?"Oops! That one was right.":"Oops! That one was silly.";}
      const reason=why(it.q,it.q[2][0],it.right?null:it.bad)||UWHY[it.q.uid]||{look:[],tip:u.say};
      const tok=i;const still=()=>i===tok&&document.getElementById("whyt");
      if(!it.right||!ok){const rule=ruleFor(it.q,it.q[2][0]);$("#fix").innerHTML=whyBox(reason,it.good,it.right?null:it.shown,rule);
        speak(it.right?"That one was right.":"Here is the right way.",{force:true}).then(()=>still()&&speakEl($("#whys"),{force:true})).then(()=>still()&&speakEl($("#whyt"),{force:true})).then(()=>still()&&rule&&speak("Grammar rule. "+rule[0],{force:true})).then(()=>still()&&speakEl($("#whyr"),{force:true}));}
      else speak("Yes, it's right!");
      $("#next").hidden=false;};
    $("#yes").onclick=()=>answer(true);$("#no").onclick=()=>answer(false);
    $("#next").onclick=()=>{i++;if(i<items.length)render();else{const p=score/items.length;const st=p>=.9?3:p>=.7?2:p>=.4?1:0;gameResult(u,"silly",score,items.length,st,null,()=>silly(u));}};
  }
  render();
}

/* ---------- 🏆 BIG CHALLENGE ---------- */
function mixUnit(){
  const done=UNITS.filter(u=>S.best[u.id]>0);const from=(done.length>=2?done:UNITS);
  return {id:"mix",sec:"Mix",emo:"🏆",title:"Big Challenge",pages:done.length>=2?"Units you have played":"All units",
    q:from.flatMap(u=>u.q.filter(q=>q[0]==="c")),ex:[],rules:[],think:[],speak:[],games:[],idea:""};
}

/* ============================ WHY? — child-friendly explanations ============================
   why() returns {look:[[emoji,label,text],...], tip:"..."}. ⟦ ⟧ marks the key word.       */
UNITS.forEach(u=>u.q.forEach(q=>{q.uid=u.id;}));
const ABC="abcdefghijklmnopqrstuvwxyz";
const IRREG={went:"go",ate:"eat",saw:"see",ran:"run",swam:"swim",came:"come"};
const IRREG_EMO={go:"🚶",eat:"🍎",see:"👀",run:"🏃",swim:"🏊",come:"👋"};
const PL_EMO={cat:"🐱",box:"📦",bus:"🚌",baby:"👶",boy:"🧒",man:"👨",foot:"🦶",mouse:"🐭",sheep:"🐑",child:"🧒",fox:"🦊",key:"🔑",tooth:"🦷",dish:"🍽️",fly:"🪰",woman:"👩",fish:"🐟"};
const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
const W=(...rows)=>rows;

function why(q,correct,chosen){
  const uid=q.uid,p=q[1],c=String(correct),cl=c.toLowerCase(),ch=String(chosen||"").toLowerCase();let m;
  const base=(p.match(/\((\w+)\)/)||[])[1];
  const R=(look,tip)=>({look,tip});
  switch(uid){
  case 0:
    if((m=p.match(/comes (after|before) (\w)/))){const L=m[2],k=ABC.indexOf(L);
      return m[1]==="after"?R(W(["🔤","ABC song",`${ABC[k-1]||""} ${L} ⟦${ABC[k+1]}⟧ ${ABC[k+2]||""}`]),`Sing the ABC song and stop at ${L}. What comes next? ${ABC[k+1]}!`)
                           :R(W(["🔤","ABC song",`${ABC[k-2]||""} ⟦${ABC[k-1]}⟧ ${L} ${ABC[k+1]||""}`]),`Sing the ABC song. Just before ${L}, we sing ${ABC[k-1]}!`);}
    if(/^a b c/.test(p))return R(W(["🎵","Sing it","a, b, c, ⟦d⟧!"]),"Sing the ABC song: a, b, c, d! After c comes d.");
    if((m=p.match(/(\w) _ (\w)/))){const w=m[1]+c+m[2];return R(W([leadEmo(p),"Say it slowly",`${m[1]} - ⟦${c}⟧ - ${m[2]}`]),`Say it slowly, like a robot: ${m[1]}… ${c}… ${m[2]}. ${cap(w)}! Can you hear the ${c} in the middle?`);}
    if(/ABC order/.test(p)){const f=q[2].slice().sort();return R(W(["🔤","First letters",f.map(x=>x===c?`⟦${x}⟧`:x).join(", ")]),`Look at the first letter of each word. In the ABC song, ${c[0]} comes first. So ${c} goes first!`);}
    break;
  case 1:
    if((m=p.match(/“(\w+)” a verb/))){const x=m[1];
      return cl==="yes"?R(W(["🤸","Try it!",`Can you ⟦${x}⟧? Yes!`]),`You can ${x}! If you can do it, it is a doing word.`)
                       :R(W(["🤔","Try it!",`Can you ⟦${x}⟧? No, silly!`]),`A ${x} is a thing. You can't do a ${x}! So it is not a doing word.`);}
    if((m=p.match(/(\w+) _ _/))){const w=m[1]+c;return R(W([leadEmo(p),"Look",`${m[1]}⟦${c}⟧`]),`${cap(w)} ends with two ${c[0]}'s sitting together. They are letter twins: ${c}!`);}
    return R(W(["✅","Can you do it?",`Yes! You can ⟦${c.toLowerCase()}⟧.`],["❌","Can you do it?",`Can you ${ch}? No, silly!`]),`You can ${c.toLowerCase()}! But you can't ${ch}. ${cap(ch)} is not something you do.`);
  case 2: case 3:{
    const subj=(stripEmo(p).match(/^(You|We|They|I)\b/)||[])[1];
    if(cl==="am")return R(W(["🙋‍♀️","Me!","I ⟦am⟧"]),"I and am are best friends. They always go together: I am!");
    if(subj&&(cl==="are"||cl==="were"))return R(W(["👫",cap(subj.toLowerCase()),`${subj} ⟦${cl}⟧`]),`${subj} and ${cl} always go together. Say it three times: ${subj} ${cl}, ${subj} ${cl}, ${subj} ${cl}!`);
    if(subj==="I"&&cl==="was")return R(W(["⏺️","Today","I am"],["⬅️","Yesterday","I ⟦was⟧"]),"It already happened, so I am changes to I was.");
    if(cl==="is")return R(W(["☝️","Just one","⟦is⟧"],["✌️","More than one","are"]),"Count with your fingers. Just one? Then we say is!");
    if(cl==="are")return R(W(["☝️","Just one","is"],["✌️","More than one","⟦are⟧"]),"Count with your fingers. More than one? Then we say are!");
    if(cl==="was")return R(W(["⬅️☝️","Yesterday, one","⟦was⟧"],["⬅️✌️","Yesterday, many","were"]),"It already happened, and there is just one. So we say was!");
    if(cl==="were")return R(W(["⬅️☝️","Yesterday, one","was"],["⬅️✌️","Yesterday, many","⟦were⟧"]),"It already happened, and there are many. So we say were!");
    if(cl==="isn't")return R(W(["☝️","One","is not → ⟦isn't⟧"]),"Just one thing, and it is NOT true. So we say isn't.");
    if(cl==="aren't")return R(W(["✌️","Many","are not → ⟦aren't⟧"]),"Many things, and it is NOT true. So we say aren't.");
    if(cl==="wasn't")return R(W(["⬅️☝️","Yesterday, one","was not → ⟦wasn't⟧"]),"It already happened, just one thing, and it is NOT true. So: wasn't.");
    if(cl==="weren't")return R(W(["⬅️✌️","Yesterday, many","were not → ⟦weren't⟧"]),"It already happened, many things, and it is NOT true. So: weren't.");
    break;}
  case 4:
    if(cl==="has")return R(W(["👧","She","She ⟦has⟧"],["🙋‍♀️","I","I have"]),"He, she and it love the snake letter S 🐍. So they say has!");
    if(cl==="does")return R(W(["👧","She","She ⟦does⟧"],["🙋‍♀️","I","I do"]),"He, she and it love the snake letter S 🐍. So they say does!");
    if(cl==="have")return R(W(["🙋‍♀️","I, you, we, they","⟦have⟧"],["👧","he, she, it","has"]),"I, you, we and they don't need the snake S. They just say have.");
    if(cl==="do")return R(W(["🙋‍♀️","I, you, we, they","⟦do⟧"],["👧","he, she, it","does"]),"I, you, we and they don't need the snake S. They just say do.");
    if(cl==="had")return R(W(["⏺️","Today","We have"],["⬅️","Yesterday","We ⟦had⟧"]),"It already happened yesterday. So have changes to had!");
    if(cl==="did")return R(W(["⏺️","Today","Do you play?"],["⬅️","Yesterday","⟦Did⟧ you play?"]),"It is about yesterday. So do changes to did!");
    break;
  case 5:
    if(IRREG[cl]){const b=IRREG[cl],e=IRREG_EMO[b]||"";return R(W(["⏺️","Today",`I ${b} ${e}`],["⬅️","Yesterday",`I ⟦${c}⟧ ${e}`]),`${cap(b)} is a magic word 🪄. For yesterday it changes itself into ${c}!${ch&&ch.endsWith("ed")?` We never say ${ch}.`:""}`);}
    if(/ed$/.test(cl)){const b=base||cl.replace(/ed$/,"");return R(W(["⏺️","Today",`I ${b}`],["⬅️","Yesterday",`I ${b}⟦ed⟧`]),`It already happened, so we stick ed on the end: ${b} + ed = ${c}!`);}
    if(cl==="will")return R(W(["⬅️","Yesterday","I played"],["➡️","Tomorrow","I ⟦will⟧ play"]),"Tomorrow hasn't happened yet. For things that are coming, we say will!");
    if(cl==="tomorrow")return R(W(["➡️","Tomorrow","I ⟦will⟧ swim"]),"Will means it hasn't happened yet. It is coming, tomorrow!");
    if(cl==="yesterday")return R(W(["⬅️","Yesterday","I play⟦ed⟧"]),"Played ends with ed. Ed means it already happened, yesterday!");
    if(/s$/.test(cl)&&base)return R(W(["🙋‍♀️","I",`I ${base}`],["👧","She, he, Dad",`She ${base}⟦${cl.slice(base.length)}⟧`]),`He, she and Dad love the snake letter S 🐍. So we say ${c}!`);
    break;
  case 6:
    if((m=p.match(/“(\w+)” is/))){const x=m[1];
      const t={"a person":[`🙋‍♀️`,`${cap(x)} is a person, just like you and me!`],"a place":["📍",`${cap(x)} is a place. You can go there!`],
               "an animal":["🐾",`${cap(x)} is an animal. It is alive, and it is not a person!`],"a thing":["✋",`${cap(x)} is a thing. You can touch it, but it is not alive!`]}[cl]||["",""];
      return R(W([t[0],cap(c.replace(/^an? /,"")),`${x} is ⟦${c}⟧`]),t[1]);}
    if(/written correctly/.test(p)){const w=c.split(" ")[0];return R(W(["👑","Crown letter",`⟦${w}⟧`],["❌","No crown",w.toLowerCase()]),"Special names wear a crown 👑. The crown is a big capital letter at the start!");}
    if(/special name/.test(p))return R(W(["👑","Special name",`⟦${c}⟧`]),`${c} is a special name. Special names wear a crown 👑: a big ${c[0]}!`);
    break;
  case 7:{
    const t={he:["👦","A boy or a man is he."],she:["👧","A girl or a woman is she."],it:["⚽","A thing or an animal is it."],they:["👫","More than one is they."],
      we:["🤝","Me and someone else together is we."],mine:["🙋‍♀️","If it belongs to ME, it is mine!"],yours:["🫵","If it belongs to YOU, it is yours!"],
      his:["👨","If it belongs to a boy or a man, it is his!"],hers:["👩","If it belongs to a girl or a woman, it is hers!"],me:["🎁","When someone gives something to you, you say me: give me!"]}[cl];
    if(cl==="she"&&ch==="her")return R(W(["✅","Start of the sentence","⟦She⟧ is my friend."],["❌","Not like this","Her is my friend."]),"At the start of a sentence we say She. Say it: She is my friend!");
    if(t)return R(W([t[0],"Who?",`⟦${c}⟧`]),t[1]);break;}
  case 8:{const s=(p.match(/one (\w+)/)||[])[1]||"";const e=PL_EMO[s]||"";
    const rows=W([e,"One",`one ${s}`],[e+e,"More than one",c===s?`two ⟦${c}⟧`:(c.startsWith(s)?`two ${s}⟦${c.slice(s.length)}⟧`:`two ⟦${c}⟧`)]);
    if(cl===s)return R(rows,`${cap(s)} stays the same! One ${s}, two ${s}, lots of ${s}!`);
    if(["men","women","feet","mice","children","teeth","people"].includes(cl))return R(W([e,"One",`one ${s}`],[e+e,"More than one",`two ⟦${c}⟧`]),`${cap(s)} is a magic word 🪄. It changes itself: ${s} → ${c}! We never say ${s}s.`);
    if(/ies$/.test(cl))return R(W([e,"One",`one ${s}`],[e+e,"More than one",`two ${s.slice(0,-1)}⟦ies⟧`]),`The y at the end changes into ies: ${s} → ${c}!`);
    if(/es$/.test(cl)&&/(s|x|sh|ch)$/.test(s))return R(rows,`Say ${c} and clap: ${s}-es! Two claps 👏👏. So it needs es.`);
    return R(rows,`For more than one, ${s} just grows an s tail: ${c}!`);}
  case 9:{
    const thing=stripEmo(p).split(" —")[0];
    if(/can't count/.test(cl))return R(W([leadEmo(p),"Try to count",`1 ${thing}, 2 ${thing}…? No!`],["🥛","We say","⟦some⟧ "+thing]),`${cap(thing)} is not something you can count one by one! We say some ${thing}.`);
    if(/count it/.test(cl))return R(W([leadEmo(p),"Count them!",`1, 2, 3 ${thing}s!`]),`You can put ${thing}s in a row and count them: 1, 2, 3!`);
    if(cl==="bread")return R(W(["🍞","We say","some ⟦bread⟧"]),"We don't count bread, so it doesn't get an s. We say some bread!");
    if(cl==="milk")return R(W(["🥛","In a glass","a glass of ⟦milk⟧"]),"Milk is a drink, so it goes in a glass! Apples don't go in a glass.");
    if((m=p.match(/^(\w+) →/)))return R(W(["👦","Boy word",m[1]],["👧","Girl word",`⟦${c}⟧`]),`${cap(m[1])} is the boy word, and ${c} is the girl word. They are partners!`);
    break;}
  case 10:{
    if(/moon|sun/.test(p))return R(W([/moon/.test(p)?"🌙":"☀️","Only one",`⟦the⟧ ${/moon/.test(p)?"moon":"sun"}`]),`There is only one ${/moon/.test(p)?"moon":"sun"} in the sky, so we say the!`);
    if(cl==="the")return R(W(["1️⃣","First time","I have a dog."],["2️⃣","Second time","⟦The⟧ dog is brown."]),"The second time we talk about it, we know which one. So we say the!");
    const w=((stripEmo(p).match(/___ ([\w ]+)/)||[])[1]||"").trim();
    if(cl==="an")return R(W(["😖","Bumpy",`a ${w}`],["😊","Smooth",`⟦an⟧ ${w}`]),`${cap(w)} starts with ${w[0]}. Try saying a ${w}. It's bumpy! An ${w} is smooth, so we say an.`);
    if(cl==="a")return R(W(["✅","Just right",`⟦a⟧ ${w}`]),`${cap(w)} starts with ${w[0]}, and ${w[0]} is not a, e, i, o or u. So we just say a ${w}!`);
    break;}
  case 11:{
    if((m=p.match(/^(\w+) → \?/))){const b=m[1];
      if(/y$/.test(b))return R(W(["😊","Describing word",b],["✨","How word",`${b.slice(0,-1)}⟦ily⟧`]),`${cap(b)} ends with y. The y changes to i, then we add ly: ${c}!`);
      if(/le$/.test(b))return R(W(["🤲","Describing word",b],["✨","How word",`${b.slice(0,-1)}⟦y⟧`]),`${cap(b)} ends with le. We take away the e and add y: ${c}!`);
      return R(W(["🐌","Describing word",b],["✨","How word",`${b}⟦ly⟧`]),`To tell HOW something is done, add ly: ${b} + ly = ${c}!`);}
    const t={slowly:"Snails and turtles are slow 🐌. So they move slowly!",quickly:"Rabbits and rockets are fast 🚀. So they move quickly!",loudly:"A lion's roar is really loud! ROAR! 🦁 It roars loudly.",
      gently:"A kitten is tiny and soft 🐱. We pat it gently, like a feather.",softly:"A mouse is tiny, so its squeak is very soft 🐭.",happily:"She is smiling, so she is happy! 😊 She smiles happily.",
      often:"Often means lots and lots of times. We go to the park again and again!"}[cl];
    if(t)return R(W([leadEmo(p),"How?",`⟦${c}⟧`]),t);break;}
  case 12:{
    if(/^a /.test(c)){const pp=c.split(" ");return R(W(["✅","Right",`a ⟦${pp[1]}⟧ ${pp[2]}`],["❌","Wrong way",`a ${pp[2]} ${pp[1]}`]),`The describing word comes first, then the thing: ${c}!`);}
    const t={sour:"Lemons are sour. They make your face go 😖!",sweet:"It's sweet like sugar 🍬. Yummy!",salty:"Pretzels have little bits of salt on top 🧂.",soft:"A teddy is soft and squishy 🧸, nice to hug!",
      hard:"A rock is hard. Knock, knock! Ouch! 🪨",prickly:"A cactus has sharp little spikes 🌵. Don't touch!",spicy:"Chillies are hot in your mouth! 🌶️🔥",fluffy:"Sheep have soft, fluffy wool, like a cloud ☁️.",
      cold:"Ice is frozen water. Brrr, cold! 🥶",tiny:"A mouse is teeny tiny 🐭.",tall:"A giraffe has a looong neck, so it is tall! 🦒",helpful:"Someone who helps you is helpful 🤝.",many:"You can count sweets: 1, 2, 3… So we say many sweets!"}[cl];
    if(t)return R(W([leadEmo(p)||"🔍","Describe it",`⟦${c}⟧`]),t);break;}
  case 13:{
    const parts=stripEmo(p).split(",").map(x=>x.trim());
    if(parts.length===3){const rows=parts.map((x,k)=>[["1️⃣","2️⃣","🏆"][k],["One","Two","The most"][k],x==="___"?`⟦${c}⟧`:x]);
      const t={best:"Good is a magic word 🪄: good, better, best!",worst:"Bad is a magic word 🪄: bad, worse, worst!",bigger:"Big → bigger. The g gets a twin: gg!",hottest:"Hot → hottest. The t gets a twin: tt!"}[cl];
      return R(rows,t||(/est$/.test(cl)?"When something is the MOST of all, add est! 🏆":"When we compare two things, add er!"));}
    const t={my:["🙋‍♀️","It is MY mom, so we say my mom!"],his:["👨","Papa is a man, so it is his car."],her:["👩","Mama is a woman, so it is her bag."],their:["👫","The bags belong to the kids. There are many kids, so we say their bags."],
      sunny:["☀️","When the sun is out, it is a sunny day! (sun + n + y)"],rainy:["🌧️","When rain falls, it is a rainy day!"],cloudy:["☁️","Lots of clouds? It is a cloudy sky!"],helpful:["🤝","Full of help → helpful!"],small:["🐘🐭","Big and small are opposites, like up and down!"]}[cl];
    if(t)return R(W([t[0],"Look",`⟦${c}⟧`]),t[1]);break;}
  case 14:{
    const t={and:"And is glue 🧴 that adds one more thing!",but:"But tells us something different is coming!",because:"Because tells us WHY. Why? Because…!",so:"So tells us what happened next!",
      before:"Before means first. First this, then that!",after:"After means later. First one thing, then the next!",while:"While means at the same time. Both together!"}[cl];
    if(t)return R(W(["🔗","Glue word",`⟦${c}⟧`]),t);break;}
  case 15:{
    const time=/o'clock|Monday|Saturday|winter|summer|May|night|morning/.test(p);
    if(time){if(cl==="at")return R(W(["⏰","Clock time","⟦at⟧ 7 o'clock"],["🌙","Night","⟦at⟧ night"]),"Clock times and night use at: at 7 o'clock, at night!");
      if(cl==="on")return R(W(["📅","Days","⟦on⟧ Monday"]),"Days of the week use on: on Monday, on Saturday!");
      if(cl==="in")return R(W(["🗓️","Months","⟦in⟧ May"],["❄️","Seasons","⟦in⟧ winter"],["🌅","Morning","⟦in⟧ the morning"]),"Months, seasons and the morning use in!");}
    const t={in:["📦","In means inside. It is hiding inside!"],on:["⬆️","On means on top. It is sitting on it!"],under:["⬇️","Under means below. Look down!"],
      between:["👩🧍👨","Between means in the middle, like you in the middle of Mama and Papa!"],next:["↔️","Next to means right beside it, side by side."],behind:["🙈","Behind means at the back, hiding!"]}[cl];
    if(t)return R(W([t[0],"Where?",`⟦${c}⟧`]),t[1]);break;}
  }
  return null;
}
function R0(row,tip){return {look:[row],tip};}
const UWHY={0:R0(["🔤","Vowels","⟦a e i o u⟧"],"A, e, i, o and u are the special vowel letters. All the others are consonants."),
 1:R0(["🤸","Doing word","Can you do it?"],"If you can DO it, it is a verb. Can you jump? Yes! Can you chair? No!"),
 4:R0(["👧","He, she, it","has 🐍"],"He, she and it love the snake letter S: has!"),
 6:R0(["👑","Special names","⟦Aarya⟧, ⟦Monday⟧"],"Special names wear a crown 👑: a big capital letter!"),
 7:R0(["☝️","One","I, he, she, it"],"One person or thing: I, he, she, it. More than one: we, they, us, them."),
 12:R0(["🔍","Describing words","big, soft, happy"],"Describing words tell us what something is like.")};

function whyBox(w,rightSen,wrongSen,rule){
  const rows=w.look.map(r=>`<div class="lookrow"><span class="le">${r[0]||""}</span><span class="ll">${esc(r[1]||"")}</span><span class="lt kwbox">${kwHtml(r[2]||"")}</span></div>`).join("");
  return `<div class="why"><div class="whyhead">🦉 Let's see why!</div>
    ${wrongSen?`<div class="cmp bad"><span>❌</span><div>${esc(wrongSen.replace(/[⟦⟧]/g,""))}</div></div>`:""}
    ${rightSen?`<div class="cmp good"><span>✅</span><div class="kwbox" id="whys">${kwHtml(rightSen)}</div></div>`:""}
    <div class="look">${rows}</div>
    <div class="kwbox whyt" id="whyt">${kwHtml(w.tip)}</div>
    ${ruleHtml(rule)}
    <div class="sayit">🗣️ Now you say the ✅ sentence out loud!</div></div>`;
}

/* ============================ GRAMMAR RULE (proper name + rule) ============================ */
const UNIT_RULE={
 0:["Vowels and consonants","a, e, i, o, u are vowels. All the other letters are consonants."],
 1:["Verb","A verb is an action (doing) word: run, eat, sing, jump."],
 2:["Verb ‘to be’ (present)","I → am · he / she / it / one thing → is · you / we / they / many → are"],
 3:["Verb ‘to be’ (past)","I / he / she / it / one thing → was · you / we / they / many → were"],
 4:["have / has · do / does","I / you / we / they → have, do · he / she / it → has, does · Past for everyone → had, did"],
 5:["Tenses","Past (yesterday): I played · Present (today): I play · Future (tomorrow): I will play"],
 6:["Noun","A noun is a naming word for a person, place, animal or thing."],
 7:["Pronoun","A pronoun takes the place of a noun: I, you, he, she, it, we, they."],
 8:["Plural nouns","Singular means one. Plural means more than one. Most nouns add -s: cat → cats."],
 9:["Countable and uncountable nouns","We can count apples (one apple, two apples). We can't count milk, so we say some milk."],
 10:["Articles a / an / the","a + consonant sound (a cat) · an + vowel sound (an apple) · the + one special thing (the moon)"],
 11:["Adverb","An adverb tells how something is done. Most adverbs add -ly: slow → slowly."],
 12:["Adjective","An adjective describes a noun. It comes before the noun: a big dog."],
 13:["Degrees of comparison","-er compares two things (taller). -est is the most of all (tallest)."],
 14:["Conjunction","A conjunction joins two ideas: and, but, because, so, before, after, while."],
 15:["Preposition","A preposition tells where or when: in, on, under, between · at 7 o'clock, on Monday, in May."]
};
function ruleFor(q,correct){
  const uid=q.uid,p=q[1]||"",cl=String(correct||"").toLowerCase();let m;
  const r=(n,t)=>[n,t];
  switch(uid){
  case 0:
    if(/_ \w — which vowel/.test(p))return r("Vowels","a, e, i, o, u are vowels. Almost every word has a vowel in the middle: c-a-t, d-o-g.");
    if(/ABC order/.test(p))return r("Alphabetical (ABC) order","Look at the first letter of each word. The word whose first letter comes first in the alphabet goes first.");
    return r("The alphabet","The alphabet has 26 letters in a fixed order: a, b, c, d … x, y, z.");
  case 1:
    if(/_ _/.test(p))return r("Spelling: double letters","Some words end with two of the same letter: roll, kiss, fall, dress.");
    break;
  case 2:
    if(/n't$/.test(cl))return r("Short forms (contractions)","is not → isn't · are not → aren't. The apostrophe (') takes the place of the missing o.");
    break;
  case 3:
    if(/n't$/.test(cl))return r("Short forms (contractions)","was not → wasn't · were not → weren't. The apostrophe (') takes the place of the missing o.");
    break;
  case 4:
    if(["have","has","had"].includes(cl))return r("have / has / had","I / you / we / they → have · he / she / it → has · Past for everyone → had");
    if(["do","does","did"].includes(cl))return r("do / does / did","I / you / we / they → do · he / she / it → does · Past for everyone → did");
    break;
  case 5:
    if(IRREG[cl])return r("Past tense: irregular verbs","Most verbs add -ed for the past. Irregular verbs change instead: go → went, eat → ate, see → saw, run → ran, swim → swam.");
    if(/ed$/.test(cl))return r("Past tense: regular verbs","Add -ed to show it already happened: walk → walked, play → played, help → helped.");
    if(cl==="will")return r("Future tense","will + verb: I will play, she will swim, we will go.");
    if(/s$/.test(cl)&&/\(\w+\)/.test(p))return r("Present tense with he / she / it","Add -s to the verb: she swims, he eats. Add -es after sh, ch, s, x: he washes.");
    break;
  case 6:
    if(/written correctly|special name/.test(p))return r("Proper noun","A proper noun is the special name of one person, place, day or month. It always starts with a capital letter: Aarya, Frankfurt, Monday.");
    return r("Noun","A noun is a naming word. There are four kinds: person, place, animal, thing.");
  case 7:
    if(["mine","yours","his","hers","ours","theirs"].includes(cl))return r("Possessive pronoun","A possessive pronoun shows who owns something: mine, yours, his, hers, ours, theirs.");
    if(cl==="me")return r("Object pronoun","After a verb or after ‘to’, use me, him, her, us, them: Give me the book.");
    return r("Subject pronoun","The one doing the action: I, you, he (boy or man), she (girl or woman), it (thing or animal), we, they (many).");
  case 8:{const s=(p.match(/one (\w+)/)||[])[1]||"";
    if(cl===s)return r("Plural nouns: no change","Some nouns are the same for one and many: sheep, fish, deer.");
    if(["men","women","feet","mice","children","teeth","people"].includes(cl))return r("Irregular plural nouns","Irregular plurals change the word: man → men, foot → feet, tooth → teeth, mouse → mice, child → children.");
    if(/ies$/.test(cl))return r("Plural nouns: -y → -ies","Consonant + y: change y to i and add -es: baby → babies, fly → flies, city → cities.");
    if(/es$/.test(cl)&&/(s|x|sh|ch)$/.test(s))return r("Plural nouns: -es","Nouns ending in s, ss, x, sh or ch add -es: box → boxes, bus → buses, dish → dishes.");
    if(/[aeiou]y$/.test(s))return r("Plural nouns: vowel + y","Vowel + y: just add -s: boy → boys, key → keys, toy → toys.");
    return r("Plural nouns: -s","Most nouns add -s for more than one: cat → cats, book → books.");}
  case 9:
    if(/→/.test(p))return r("Gender of nouns","Many nouns have a male (boy) and a female (girl) form: king – queen, father – mother, lion – lioness.");
    if(/can't count|bread|milk/.test(cl))return r("Uncountable nouns","We can't count some things one by one: milk, water, rice, bread. They don't take -s. We say some milk or a glass of milk.");
    return r("Countable nouns","Countable nouns can be counted: one apple, two apples. They take a / an and -s.");
  case 10:
    if(cl==="the")return r("Article ‘the’","Use the for one special thing (the moon, the sun) or for something we already talked about (I have a dog. The dog is brown.).");
    return r("Articles a / an","Use a before a consonant sound: a cat, a ball. Use an before a vowel sound (a, e, i, o, u): an apple, an egg.");
  case 11:
    if(cl==="often")return r("Adverb of frequency","It tells how often something happens: always, often, sometimes, never.");
    return r("Adverb (-ly)","An adverb tells how something is done. Add -ly: slow → slowly. y → ily: happy → happily. -le → -ly: gentle → gently.");
  case 12:
    if(cl==="many")return r("Adjectives of quantity","many + things we can count (many sweets) · much + things we can't count (much milk)");
    break;
  case 13:
    if(/, /.test(stripEmo(p)))return r("Degrees of comparison","-er compares two things: taller. -est is the most of all: tallest. Short words like big and hot double the last letter: bigger, hottest. Irregular: good, better, best · bad, worse, worst.");
    if(["my","your","his","her","its","our","their"].includes(cl))return r("Possessive adjectives","my, your, his, her, its, our, their + noun: my mom, his car, her bag, their bags.");
    if(/(y|ful|less)$/.test(cl)&&/→/.test(p))return r("Making adjectives","Add -y, -ful or -less to a noun to make an adjective: rain → rainy, sun → sunny, help → helpful, care → careless.");
    return r("Opposites (antonyms)","Opposites are words with the opposite meaning: big – small, hot – cold, fast – slow.");
  case 14:{
    const t={and:"and adds more",but:"but shows something different",because:"because tells why",so:"so tells the result",before:"before tells what happens first",after:"after tells what happens later",while:"while means at the same time"}[cl];
    return r("Conjunction","A conjunction joins two ideas. "+(t?cap(t)+".":""));}
  case 15:
    if(/o'clock|Monday|Saturday|winter|summer|May|night|morning/.test(p))return r("Prepositions of time","at + clock times and night (at 7 o'clock) · on + days (on Monday) · in + months, seasons, the morning (in May)");
    return r("Prepositions of place","They tell where something is: in, on, under, between, next to, behind.");
  }
  return UNIT_RULE[uid]||null;
}
function ruleHtml(rule){
  if(!rule)return "";
  return `<div class="rule"><div class="rl">📏 Grammar rule: <b>${esc(rule[0])}</b></div><div class="kwbox rt" id="whyr">${kwHtml(rule[1])}</div></div>`;
}

home();

