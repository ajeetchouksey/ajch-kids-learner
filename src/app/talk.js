/* ============================ 🗣️ SPRECHEN · TALK WITH ME: answer by microphone, gentle sentence correction ============================ */
const TALK=(function(){
  /* ---------- word lists (slots). entry: [say, aliases (ok), aliases that need fixing, gender m/f/n/pl, plural] ---------- */
  const NUMEN=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
  const NUMDE=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn","zwanzig"];
  const L=(arr)=>arr.map(e=>typeof e==="string"?{say:e,ok:[e],fix:[]}:{say:e[0],ok:e[1]||[e[0]],fix:e[2]||[],g:e[3],pl:e[4]});
  const SL={en:{
      color:L(["red","blue","green","yellow","pink","purple","orange","black","white","brown","rainbow"]),
      animal:L([["dog",["dog","dogs"],[],0,"dogs"],["cat",["cat","cats"],[],0,"cats"],["horse",["horse","horses"],[],0,"horses"],["rabbit",["rabbit","rabbits","bunny","bunnies"],[],0,"rabbits"],["bird",["bird","birds"],[],0,"birds"],["fish",["fish","fishes"],[],0,"fish"],
        ["lion",["lion","lions"],[],0,"lions"],["elephant",["elephant","elephants"],[],0,"elephants"],["monkey",["monkey","monkeys"],[],0,"monkeys"],["unicorn",["unicorn","unicorns"],[],0,"unicorns"],["duck",["duck","ducks"],[],0,"ducks"],["cow",["cow","cows"],[],0,"cows"],["tiger",["tiger","tigers"],[],0,"tigers"],["panda",["panda","pandas"],[],0,"pandas"],["hamster",["hamster","hamsters"],[],0,"hamsters"]]),
      food:L(["pizza","pasta","ice cream","chocolate","bread","rice","noodles","cake","soup",["apples",["apples","apple"]],["bananas",["bananas","banana"]],["strawberries",["strawberries","strawberry"]],["carrots",["carrots","carrot"]],["chips",["chips","fries","french fries"]],["pancakes",["pancakes","pancake"]],["spaghetti",["spaghetti"]]]),
      feel:L(["fine","good","great","happy","sad","tired","hungry","okay","super","very good"]),
      sport:L([["gymnastics",["gymnastics","doing gymnastics"],["do gymnastics","turning","turnen"]],["swimming",["swimming"],["swim"]],["dancing",["dancing"],["dance"]],["painting",["painting","drawing"],["paint","draw"]],["reading",["reading"],["read"]],["football",["football","soccer","playing football"],["play football","play soccer"]],["running",["running"],["run"]],["singing",["singing"],["sing"]],["playing",["playing"],["play"]],["cycling",["cycling","riding my bike"],["cycle"]]]),
      weather:L(["sunny",["rainy",["rainy"],["rain"]],"cloudy","windy","cold","hot","warm","snowy","foggy",["raining",["raining"],["rains"]],["snowing",["snowing"],["snow","snows"]]]),
      place:L([["school",["school"]],["kindergarten",["kindergarten","kita"]],["the park",["the park","park"]],["gymnastics",["gymnastics"]]]),
      fam:L(["brother","sister","mum","dad","baby","grandma","grandpa",["mum",["mom","mummy","mama"]],["dad",["daddy","papa"]]]),
      thing:L(["pencil case","book","pencil","apple","ruler","pen","rubber","bottle","lunchbox","notebook","sandwich","banana"]),
      toy:L(["teddy","doll","ball","car","puzzle","bike","lego","robot","unicorn"]),
      past:L([["played",["played"],["play","plays","playing"]],["went",["went"],["go","goes","goed","going"]],["swam",["swam"],["swim","swimmed","swimming"]],["ate",["ate"],["eat","eated","eating"]],["read",["read"],[]],["watched",["watched"],["watch","watching"]],["visited",["visited"],["visit"]],["made",["made"],["make","maked"]],["saw",["saw"],["see","seed"]],["did",["did"],["do","doed"]],["drew",["drew"],["draw","drawed"]],["sang",["sang"],["sing","singed"]],["rode",["rode"],["ride","rided"]]]),
      verb3:L([["likes",["likes"],["like"]],["reads",["reads"],["read"]],["cooks",["cooks"],["cook"]],["sings",["sings"],["sing"]],["dances",["dances"],["dance"]],["works",["works"],["work"]],["swims",["swims"],["swim"]],["paints",["paints"],["paint"]],["plays",["plays"],["play"]],["runs",["runs"],["run"]]]),
      verbi:L(["play","read","paint","draw","build","watch","sing","dance","bake","stay","sleep","jump","take","put on","wear","go","look","listen","make","cuddle"])},
    de:{
      farbe:L(["rot","blau","grün","gelb","rosa","pink","lila","orange","schwarz","weiß","braun","türkis"]),
      tier:L([["Hund",["hund","hunde"],[],"m","Hunde"],["Katze",["katze","katzen"],[],"f","Katzen"],["Pferd",["pferd","pferde"],[],"n","Pferde"],["Hase",["hase","hasen"],[],"m","Hasen"],["Vogel",["vogel","vögel"],[],"m","Vögel"],["Fisch",["fisch","fische"],[],"m","Fische"],["Löwe",["löwe","löwen"],[],"m","Löwen"],
        ["Elefant",["elefant","elefanten"],[],"m","Elefanten"],["Affe",["affe","affen"],[],"m","Affen"],["Einhorn",["einhorn","einhörner"],[],"n","Einhörner"],["Ente",["ente","enten"],[],"f","Enten"],["Kuh",["kuh","kühe"],[],"f","Kühe"],["Meerschweinchen",["meerschweinchen"],[],"n","Meerschweinchen"],["Hamster",["hamster"],[],"m","Hamster"],["Panda",["panda","pandas"],[],"m","Pandas"]]),
      essen:L([["Pizza",["pizza"]],["Nudeln",["nudeln","spaghetti"]],["Eis",["eis"]],["Schokolade",["schokolade"]],["Brot",["brot"]],["Reis",["reis"]],["Kuchen",["kuchen"]],["Suppe",["suppe"]],["Äpfel",["äpfel","apfel"]],["Bananen",["bananen","banane"]],["Erdbeeren",["erdbeeren","erdbeere"]],["Karotten",["karotten","möhren","karotte"]],["Pommes",["pommes"]],["Pfannkuchen",["pfannkuchen"]],["Brezeln",["brezeln","brezel"]]]),
      gefuehl:L(["gut","super","toll","prima","sehr gut","nicht so gut","schlecht"]),
      wetter:L(["sonnig","regnerisch","bewölkt","windig","kalt","warm","heiß","neblig"]),
      tun:L([["turne",["turne"],["turnen","turnt","turnst"]],["schwimme",["schwimme"],["schwimmen","schwimmt"]],["tanze",["tanze"],["tanzen","tanzt"]],["male",["male"],["malen","malt"]],["lese",["lese"],["lesen","liest"]],["singe",["singe"],["singen","singt"]],["laufe",["laufe"],["laufen","läuft"]],["spiele",["spiele"],["spielen","spielt","spiel"]],["bastle",["bastle","bastele"],["basteln"]],["baue",["baue"],["bauen","baut"]]]),
      tut:L([["liest",["liest"],["lese","lesen","lest"]],["kocht",["kocht"],["koche","kochen"]],["malt",["malt"],["male","malen"]],["tanzt",["tanzt"],["tanze","tanzen"]],["singt",["singt"],["singe","singen"]],["schwimmt",["schwimmt"],["schwimme","schwimmen"]],["turnt",["turnt"],["turne","turnen"]],["arbeitet",["arbeitet"],["arbeite","arbeiten"]],["spielt",["spielt"],["spiele","spielen"]],["backt",["backt"],["backe","backen"]],["läuft",["läuft"],["laufe","laufen","lauft"]]]),
      fam:L([["Bruder",["bruder"],[],"m"],["Schwester",["schwester"],[],"f"],["Mama",["mama","mutter"],[],"f"],["Papa",["papa","vater"],[],"m"],["Baby",["baby"],[],"n"],["Oma",["oma"],[],"f"],["Opa",["opa"],[],"m"]]),
      ding:L([["Buch",["buch"],[],"n"],["Stift",["stift","bleistift"],[],"m"],["Heft",["heft"],[],"n"],["Apfel",["apfel"],[],"m"],["Lineal",["lineal"],[],"n"],["Federmäppchen",["federmäppchen","mäppchen"],[],"n"],["Federmappe",["federmappe"],[],"f"],["Trinkflasche",["trinkflasche"],[],"f"],["Brotdose",["brotdose"],[],"f"],["Flasche",["flasche"],[],"f"],["Radiergummi",["radiergummi"],[],"m"],["Banane",["banane"],[],"f"]]),
      perf:L([["gespielt",["gespielt"],[]],["gemalt",["gemalt"],[]],["gelesen",["gelesen"],[]],["geturnt",["geturnt"],[]],["gegessen",["gegessen"],[]],["gebastelt",["gebastelt"],[]],["gebaut",["gebaut"],[]],["gesungen",["gesungen"],[]]]),
      perfs:L([["geschwommen",["geschwommen"],[]],["gegangen",["gegangen"],[]],["gelaufen",["gelaufen"],[]],["gefahren",["gefahren"],[]],["geritten",["geritten"],[]]]),
      verb1:L([["spiele",["spiele"],["spielen"]],["male",["male"],["malen"]],["lese",["lese"],["lesen"]],["bleibe",["bleibe"],["bleiben"]],["baue",["baue"],["bauen"]],["tanze",["tanze"],["tanzen"]],["bastle",["bastle"],["basteln"]],["schaue",["schaue"],["schauen"]],["turne",["turne"],["turnen"]],["höre",["höre"],["hören"]]])}};
  const ART={def:{m:"der",f:"die",n:"das"},acc:{m:"einen",f:"eine",n:"ein"},indef:{m:"ein",f:"eine",n:"ein"},kein:{m:"keinen",f:"keine",n:"kein"}};
  const ARTS="der|die|das|den|dem|des|ein|eine|einen|einem|kein|keine|keinen|mein|meine|meinen|a|an|the|my|one";

  /* ---------- questions: f = [pattern, model, kind, tip]; kind "" = perfect, "~" = short answer, "!" = typical mistake ---------- */
  const Q={en:[
    {lv:0,emo:"👋",q:"What is your name?",h:"Wie heißt du?",ex:"My name is Aarya.",f:[["my name is {name}","My name is {name}."],["i am {name}","I am {name}.",""],["~{name}","My name is {name}."],["!me name is {name}","My name is {name}.","!",["Sag my, nicht me: My name is …","Say my, not me: My name is …"]]]},
    {lv:0,emo:"🎂",q:"How old are you?",h:"Wie alt bist du?",ex:"I am six years old.",f:[["i am {num} years old","I am {num} years old."],["i am {num}","I am {num} years old.","~"],["~{num}( years old)?","I am {num} years old."],["!i {num}( years old)?","I am {num} years old.","!",["Nicht vergessen: I am …","Don't forget am: I am …"]],["!i have {num} years","I am {num} years old.","!",["Englisch sagt: I am six, nicht I have six years.","In English: I am six years old."]]]},
    {lv:0,emo:"🎨",q:"What is your favourite colour?",h:"Was ist deine Lieblingsfarbe?",ex:"My favourite colour is pink.",f:[["my favourite colour is {color}","My favourite colour is {color}."],["i like {color}","I like {color}.",""],["~{color}","My favourite colour is {color}."],["!my favourite colour (are|it) {color}","My favourite colour is {color}.","!",["Bei einer Farbe sagen wir is: My favourite colour is pink.","One colour → is: My favourite colour is pink."]],["!(my )?favourite colour {color}","My favourite colour is {color}.","!",["Nicht vergessen: is – My favourite colour is pink.","Don't forget is."]]]},
    {lv:0,emo:"😊",q:"How are you today?",h:"Wie geht es dir heute?",ex:"I am fine, thank you.",f:[["i am {feel}( thank you| thanks)?( today)?","I am {feel}, thank you."],["~{feel}( thank you| thanks)?","I am {feel}, thank you."],["!i {feel}( thank you| thanks)?","I am {feel}, thank you.","!",["Mit I sagen wir am: I am fine.","With I we say am: I am fine."]],["!i is {feel}.*","I am {feel}, thank you.","!",["Mit I sagen wir am, nicht is.","With I we say am, not is."]]]},
    {lv:0,emo:"🍕",q:"What do you like to eat?",h:"Was isst du gern?",ex:"I like pizza.",f:[["i like( to eat| eating)? {food}","I like {food}."],["i love {food}","I love {food}."],["i eat {food}","I eat {food}.",""],["~{food}","I like {food}."],["!i likes( to eat)? {food}","I like {food}.","!",["Mit I sagen wir like (ohne s).","With I we say like (no s)."]]]},
    {lv:0,emo:"🐾",q:"What animal do you like?",h:"Welches Tier magst du?",ex:"I like dogs.",f:[["i like {animal.pl}","I like {animal.pl}."],["i like the {animal}","I like the {animal}.",""],["!i likes? {animal}","I like {animal.pl}.","!",["Bei Tieren sagen wir meist viele: I like cats.","For animals we say many: I like cats."]],["my favourite animal is (the |a )?{animal}","My favourite animal is the {animal}."],["~{animal}","I like {animal.pl}."]]},
    {lv:1,emo:"🤸",q:"What do you like to do?",h:"Was machst du gern?",ex:"I like gymnastics.",f:[["i like {sport}","I like {sport}."],["i love {sport}","I love {sport}."],["i like to {sport}","I like {sport}.",""],["~{sport}","I like {sport}."],["!i likes( to)? {sport}","I like {sport}.","!",["Mit I sagen wir like (ohne s).","With I we say like (no s)."]]]},
    {lv:1,emo:"☀️",q:"What is the weather like today?",h:"Wie ist das Wetter heute?",ex:"It is sunny today.",f:[["(today )?it is {weather}( today)?","It is {weather} today."],["the weather is {weather}( today)?","The weather is {weather} today."],["~{weather}( today)?","It is {weather} today."],["!(today )?is {weather}( today)?","It is {weather} today.","!",["Englisch braucht it: It is sunny.","English needs it: It is sunny."]],["!(today )?it {weather}( today)?","It is {weather} today.","!",["Nicht vergessen: is – It is sunny.","Don't forget is: It is sunny."]]]},
    {lv:1,emo:"🏫",q:"Where do you go in the morning?",h:"Wohin gehst du am Morgen?",ex:"I go to school.",f:[["(in the morning )?i go to {place}( in the morning)?","I go to {place}."],["~(to )?{place}","I go to {place}."],["!i (going|goes|am go) to {place}","I go to {place}.","!",["Sag I go, nicht I going.","Say I go, not I going."]]]},
    {lv:1,emo:"👨‍👩‍👧",q:"Do you have a brother or a sister?",h:"Hast du einen Bruder oder eine Schwester?",ex:"Yes, I have a brother.",f:[["(yes )?i have (a|one) {fam}","Yes, I have a {fam}."],["no i do not( have a brother or a sister)?","No, I don't."],["no i have no {fam}","No, I don't have a {fam}.",""],["~yes","Yes, I have a brother.","~"],["~no","No, I don't."],["!yes i has (a|one) {fam}","Yes, I have a {fam}.","!",["Mit I sagen wir have, nicht has.","With I we say have, not has."]]]},
    {lv:1,emo:"🎒",q:"What is in your school bag?",h:"Was ist in deiner Schultasche?",ex:"There is a book in my bag.",f:[["there is (a|an|my) {thing} in my( school)? bag","There is a {thing} in my bag."],["(a|an|my) {thing} is in my( school)? bag","My {thing} is in my bag.",""],["there (is|are) (a|an|my) {thing}( .+)?","There is a {thing}{rest} in my bag.",""],["i have (a|an|my) {thing}( in my( school)? bag)?","I have a {thing} in my bag."],["!in my( school)? bag (is|are) (a |an |my )?{thing}( .+)?","There is a {thing}{rest} in my bag.","!",["Auf Englisch beginnt der Satz mit There is: There is a book in my bag.","In English start with There is."]],["~(a |an |my )?{thing}( .+)?","There is a {thing}{rest} in my bag."]]},
    {lv:1,emo:"🐶",q:"Do you have a pet?",h:"Hast du ein Haustier?",ex:"Yes, I have a cat.",f:[["(yes )?i have (a|one) {animal}","Yes, I have a {animal}."],["!(yes )?i have {animal}","Yes, I have a {animal}.","!",["Nicht vergessen: a – I have a cat.","Don't forget a: I have a cat."]],["no i do not( have a pet)?","No, I don't have a pet."],["no i have no pet","No, I don't have a pet.",""],["~yes","Yes, I have a cat."],["~no","No, I don't have a pet."],["!yes i has (a|one) {animal}","Yes, I have a {animal}.","!",["Mit I sagen wir have.","With I we say have."]]]},
    {lv:2,emo:"📅",q:"What did you do yesterday?",h:"Was hast du gestern gemacht?",ex:"Yesterday I played in the park.",f:[["(yesterday )?i {past}( .+)?( yesterday)?","Yesterday I {past}{rest}."],["~{past}( .+)?","Yesterday I {past}{rest}."]]},
    {lv:2,emo:"👩",q:"What does your mum like to do?",h:"Was macht deine Mama gern?",ex:"She likes to read books.",f:[["(she|my mum|mum) {verb3}( .+)?","She {verb3}{rest}."],["~{verb3}( .+)?","She {verb3}{rest}."],["~{sport}","She likes {sport}."]]},
    {lv:2,emo:"🧸",q:"What is your favourite toy and why?",h:"Was ist dein Lieblingsspielzeug und warum?",ex:"My favourite toy is my teddy because it is soft.",f:[["my favourite toy is (my|the|a) {toy} because (.+)","My favourite toy is my {toy} because {why}."],["my favourite toy is (my |the |a )?{toy}","My favourite toy is my {toy} because it is fun.","~"],["~(my |the |a )?{toy}","My favourite toy is my {toy} because it is fun."]]},
    {lv:2,emo:"🏊",q:"Can you swim?",h:"Kannst du schwimmen?",ex:"Yes, I can swim.",f:[["i can( swim)?( well| very well)?","Yes, I can swim."],["i cannot( swim)?( yet)?","No, I can't swim."],["~yes","Yes, I can swim."],["~no","No, I can't swim."],["!i can (swimming|swims)","Yes, I can swim.","!",["Nach can kommt das Grundwort: I can swim.","After can comes the plain verb: I can swim."]]]},
    {lv:2,emo:"🐘",q:"Which is bigger, a cat or an elephant?",h:"Was ist größer, eine Katze oder ein Elefant?",ex:"An elephant is bigger than a cat.",f:[["(an|the) elephant is bigger( than (a|the) cat)?","An elephant is bigger than a cat."],["~(an |the )?elephant","An elephant is bigger than a cat."],["!(an |the )?elephant is (more big|more bigger|biger)( than (a|the) cat)?","An elephant is bigger than a cat.","!",["Groß → bigger (nicht more big).","big → bigger (not more big)."]]]},
    {lv:2,emo:"🌧️",q:"What do you do when it rains?",h:"Was machst du, wenn es regnet?",ex:"When it rains, I read a book.",f:[["(when it rains )?i {verbi}( .+)?","When it rains, I {verbi}{rest}."],["~{verbi}( .+)?","When it rains, I {verbi}{rest}."]]}],
   de:[
    {lv:0,emo:"👋",q:"Wie heißt du?",h:"What's your name?",ex:"Ich heiße Aarya.",f:[["ich heisse {name}","Ich heiße {name}."],["mein name ist {name}","Mein Name ist {name}."],["ich bin (die |der )?{name}","Ich bin {name}.",""],["~{name}","Ich heiße {name}."]]},
    {lv:0,emo:"🎂",q:"Wie alt bist du?",h:"How old are you?",ex:"Ich bin sechs Jahre alt.",f:[["ich bin {num} jahre alt","Ich bin {num} Jahre alt."],["ich bin {num}","Ich bin {num} Jahre alt.","~"],["~{num}( jahre( alt)?)?","Ich bin {num} Jahre alt."],["!ich habe {num} jahre( alt)?","Ich bin {num} Jahre alt.","!",["Auf Deutsch: Ich bin sechs Jahre alt.","In German: Ich bin … Jahre alt."]]]},
    {lv:0,emo:"🎨",q:"Was ist deine Lieblingsfarbe?",h:"What is your favourite colour?",ex:"Meine Lieblingsfarbe ist Rosa.",f:[["meine lieblingsfarbe ist {farbe}","Meine Lieblingsfarbe ist {farbe}."],["ich mag( die farbe)? {farbe}","Ich mag {farbe}.",""],["~{farbe}","Meine Lieblingsfarbe ist {farbe}."],["!mein lieblingsfarbe ist {farbe}","Meine Lieblingsfarbe ist {farbe}.","!",["Die Farbe → meine Lieblingsfarbe.","die Farbe → meine Lieblingsfarbe."]]]},
    {lv:0,emo:"😊",q:"Wie geht es dir?",h:"How are you?",ex:"Mir geht es gut.",f:[["mir geht es {gefuehl}( danke)?","Mir geht es {gefuehl}."],["es geht mir {gefuehl}( danke)?","Es geht mir {gefuehl}.",""],["~{gefuehl}( danke)?","Mir geht es {gefuehl}."],["!ich bin {gefuehl}","Mir geht es {gefuehl}.","!",["Auf Deutsch sagt man: Mir geht es gut.","In German we say: Mir geht es gut."]]]},
    {lv:0,emo:"🍕",q:"Was isst du gern?",h:"What do you like to eat?",ex:"Ich esse gern Pizza.",f:[["ich esse (gern|gerne) {essen}","Ich esse gern {essen}."],["ich mag {essen}","Ich mag {essen}.",""],["!ich (isst|esst|essen) (gern |gerne )?{essen}( gern| gerne)?","Ich esse gern {essen}.","!",["Mit ich sagen wir esse: Ich esse gern Pizza.","With ich we say esse."]],["~{essen}","Ich esse gern {essen}."],["!ich esse {essen} (gern|gerne)","Ich esse gern {essen}.","!",["Gern kommt vor das Essen: Ich esse gern Pizza.","gern comes first: Ich esse gern Pizza."]]]},
    {lv:0,emo:"🐾",q:"Welches Tier magst du?",h:"What animal do you like?",ex:"Ich mag Hunde.",f:[["ich mag {tier.pl}","Ich mag {tier.pl}."],["ich mag {tier.def}","Ich mag {tier.def}.",""],["!ich mag {tier}","Ich mag {tier.pl}.","!",["Bei Tieren sagen wir meist viele: Ich mag Hunde.","For animals we usually say many: Hunde."]],["mein lieblingstier ist {tier.def}","Mein Lieblingstier ist {tier.def}."],["~{tier}","Ich mag {tier.pl}."]]},
    {lv:1,emo:"🤸",q:"Was machst du gern?",h:"What do you like to do?",ex:"Ich turne gern.",f:[["ich {tun} (gern|gerne)( .+)?","Ich {tun} gern{rest}."],["!ich mache (gern |gerne )?(turnen|sport)","Ich turne gern.","!",["Kürzer und schöner: Ich turne gern.","Shorter: Ich turne gern."]],["~{tun}( .+)?","Ich {tun} gern{rest}."],["!(gern|gerne) ich {tun}","Ich {tun} gern.","!",["Ich steht vorne: Ich turne gern.","I comes first: Ich turne gern."]]]},
    {lv:1,emo:"☀️",q:"Wie ist das Wetter heute?",h:"What is the weather like today?",ex:"Heute ist es sonnig.",f:[["heute ist es {wetter}","Heute ist es {wetter}."],["es ist (heute )?{wetter}","Heute ist es {wetter}.",""],["das wetter ist (heute )?{wetter}","Das Wetter ist heute {wetter}."],["(heute )?(regnet es|es regnet)( heute)?","Heute regnet es."],["(heute )?(schneit es|es schneit)( heute)?","Heute schneit es."],["~{wetter}","Heute ist es {wetter}."],["!heute es ist {wetter}","Heute ist es {wetter}.","!",["Das Verb steht an Stelle 2: Heute ist es …","The verb comes second: Heute ist es …"]]]},
    {lv:1,emo:"🐶",q:"Hast du ein Haustier?",h:"Do you have a pet?",ex:"Ja, ich habe eine Katze.",f:[["ich habe {tier.acc}","Ja, ich habe {tier.acc}."],["(nein )?ich habe kein(e|en)? haustier","Nein, ich habe kein Haustier."],["~ja","Ja, ich habe eine Katze."],["~nein","Nein, ich habe kein Haustier."]]},
    {lv:1,emo:"👨‍👩‍👧",q:"Wer wohnt bei dir zu Hause?",h:"Who lives at home with you?",ex:"Bei mir wohnen Mama und Papa.",f:[["(bei mir wohnen|ich wohne mit|mit mir wohnen) {fam}( und {fam2})?","Bei mir wohnen {fam}{fam2+}."],["~{fam}( und)? {fam2}( und ich)?","Bei mir wohnen {fam} und {fam2}."],["~{fam}( und ich)?","Bei mir wohnen {fam}."]]},
    {lv:1,emo:"🎒",q:"Was ist in deiner Schultasche?",h:"What is in your school bag?",ex:"In meiner Schultasche ist ein Buch.",f:[["in meiner schultasche ist {ding.indef}","In meiner Schultasche ist {ding.indef}."],["ich habe {ding.acc}( in meiner schultasche)?","Ich habe {ding.acc} in meiner Schultasche."],["~{ding}( .+)?","In meiner Schultasche ist {ding.indef}{rest}."]]},
    {lv:1,emo:"🏫",q:"Wohin gehst du am Morgen?",h:"Where do you go in the morning?",ex:"Ich gehe in die Schule.",f:[["ich gehe (in die|zur) schule","Ich gehe in die Schule."],["ich gehe (in den|zum) kindergarten","Ich gehe in den Kindergarten."],["~(in die |zur )?schule","Ich gehe in die Schule."],["!ich gehe? (in |zu )?(der )?schule","Ich gehe in die Schule.","!",["Es fehlt: in die – Ich gehe in die Schule.","Missing: in die – Ich gehe in die Schule."]]]},
    {lv:2,emo:"📅",q:"Was hast du gestern gemacht?",h:"What did you do yesterday?",ex:"Gestern habe ich gespielt.",f:[["gestern habe ich( .+)? {perf}","Gestern habe ich{mid} {perf}."],["ich habe( .+)? {perf}( gestern)?","Gestern habe ich{mid} {perf}.",""],["gestern bin ich( .+)? {perfs}","Gestern bin ich{mid} {perfs}."],["ich bin( .+)? {perfs}","Gestern bin ich{mid} {perfs}.",""],["!gestern ich (habe|bin)( .+)? ({perf}|{perfs})","Gestern {aux} ich{mid} {p}.","!",["Das Verb steht an Stelle 2: Gestern habe ich …","The verb comes second: Gestern habe ich …"]],["!(gestern )?(habe ich|ich habe)( .+)? {perfs}( .+)?","Gestern bin ich{mid}{rest2} {perfs}.","!",["Bei Bewegung sagt man bin: Ich bin geschwommen.","For moving we use bin: Ich bin geschwommen."]]]},
    {lv:2,emo:"👩",q:"Was macht deine Mama gern?",h:"What does your mum like to do?",ex:"Sie liest gern.",f:[["(sie|meine mama|mama) {tut} (gern|gerne)( .+)?","Sie {tut} gern{rest}."],["~{tut}( .+)?","Sie {tut} gern{rest}."]]},
    {lv:2,emo:"🐘",q:"Wer ist größer: der Hund oder der Elefant?",h:"Who is bigger: the dog or the elephant?",ex:"Der Elefant ist größer als der Hund.",f:[["der elefant ist grösser( als der hund)?","Der Elefant ist größer als der Hund."],["~(der )?elefant","Der Elefant ist größer als der Hund."],["!(der )?elefant ist (mehr gross|grösser wie der hund|gross)( als der hund)?","Der Elefant ist größer als der Hund.","!",["Groß → größer als: Der Elefant ist größer als der Hund.","big → bigger than: größer als."]]]},
    {lv:2,emo:"🌧️",q:"Was machst du, wenn es regnet?",h:"What do you do when it rains?",ex:"Wenn es regnet, spiele ich drinnen.",f:[["wenn es regnet {verb1} ich( .+)?","Wenn es regnet, {verb1} ich{rest}."],["ich {verb1}( .+)?","Wenn es regnet, {verb1} ich{rest}.",""],["!wenn es regnet ich {verb1}( .+)?","Wenn es regnet, {verb1} ich{rest}.","!",["Nach dem Komma kommt zuerst das Verb: Wenn es regnet, spiele ich …","After the comma the verb comes first."]]]},
    {lv:2,emo:"🏊",q:"Kannst du schwimmen?",h:"Can you swim?",ex:"Ja, ich kann schwimmen.",f:[["ich kann( gut| schon)? schwimmen","Ja, ich kann schwimmen."],["ich kann (noch )?nicht schwimmen","Nein, ich kann noch nicht schwimmen."],["~ja","Ja, ich kann schwimmen."],["~nein","Nein, ich kann noch nicht schwimmen."],["!ich kann (schwimme|schwimmt)","Ja, ich kann schwimmen.","!",["Nach kann kommt die Grundform: ich kann schwimmen.","After kann comes the full verb: schwimmen."]]]},
    {lv:2,emo:"🤸",q:"Warum magst du Sport?",h:"Why do you like sport?",ex:"Ich mag Sport, weil es Spaß macht.",f:[["!(ich mag sport )?weil es macht( mir)? spass","Ich mag Sport, weil es Spaß macht.","!",["Nach weil steht das Verb am Ende: …, weil es Spaß macht.","After weil the verb goes to the end."]],["ich mag sport weil (.+)","Ich mag Sport, weil {why}."],["weil (.+)","Ich mag Sport, weil {why}.",""],["(sport|es) macht( mir)?( so)?( viel)? spass","Sport macht Spaß!",""],["~(.+)","Ich mag Sport, weil es Spaß macht."]]}]};

  /* ---------- general grammar hints (used when no special hint fits) ---------- */
  const RULES={en:[[/\bi (is|are)\b/,["Mit I sagen wir am: I am.","With I we say am: I am."]],[/\b(he|she|it|mum|dad) (like|play|go|have|eat|read|swim)\b/,["Bei he/she kommt ein s dazu: she likes.","With he/she add s: she likes."]],[/\bi has\b/,["Mit I sagen wir have: I have.","With I we say have: I have."]],[/\bme (name|like|am)\b/,["Sag my name / I like.","Say my name / I like."]]],
    de:[[/\bich (bist|ist|sind)\b/,["Es heißt: ich bin.","It is: ich bin."]],[/\bich (hast|hat)\b/,["Es heißt: ich habe.","It is: ich habe."]],[/\b(heute|gestern|morgen|dann) (ich|du|wir|er|sie) \w+/,["Das Verb steht an Stelle 2: Heute spiele ich.","The verb comes second: Heute spiele ich."]]]};

  /* ---------- text tools ---------- */
  const STOP=new Set("i am is are my me the a an and to it you yes no ok okay ich bin ist mein meine der die das ein eine und ja nein heisse heiße name es".split(" "));
  function norm(t,lang){let s=" "+String(t||"").toLowerCase().replace(/[’`´]/g,"'").replace(/ß/g,"ss").replace(/[.,!?;:"()\-–]/g," ")+" ";
    if(lang==="en")s=s.replace(/ i'm /g," i am ").replace(/ it's /g," it is ").replace(/ don't /g," do not ").replace(/ can't /g," cannot ").replace(/ can not /g," cannot ").replace(/ there's /g," there is ").replace(/ favorite /g," favourite ").replace(/ color /g," colour ").replace(/ mom /g," mum ");
    if(lang==="de")s=s.replace(/ (\w+)'s /g," $1 es ").replace(/ gehts /g," geht es ").replace(/ gibts /g," gibt es ");
    else s=s.replace(/ (he|she|what|that)'s /g," $1 is ");
    s=s.replace(/ (um|uh|uhm|ähm|äh|hmm|also|well) /g," ").replace(/ (thank you|thanks|danke) (very much|schön)? /g," $1 ");
    return s.replace(/\s+/g," ").trim();}
  const esc=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const nrm=w=>w.toLowerCase().replace(/ß/g,"ss");
  function slotRe(lang,type,i){const base=type.split(".")[0];
    if(base==="name")return `(?<s${i}>[a-zäöüé]+(?: [a-zäöüé]+)?)`;
    if(base==="num")return `(?<s${i}>\\d{1,2}|${(lang==="en"?NUMEN:NUMDE).map(nrm).join("|")})`;
    const list=SL[lang][base.replace(/2$/,"")];const al=list.flatMap(e=>[...e.ok,...e.fix]).map(nrm).sort((a,b)=>b.length-a.length).map(esc).join("|");
    return `(?:(?<a${i}>${ARTS}) )?(?<s${i}>${al})`;}
  /* every (...) group of the pattern becomes non-capturing, except free text (.+) which is kept as rest / rest2 */
  function compile(lang,pat){const slots=[];let re=pat.replace(/\{([a-z0-9.]+)\}/g,(m,t)=>{slots.push(t);return "\u0001"+(slots.length-1)+"\u0001";});
    let nr=0;re=re.replace(/\((?!\?)( ?)\.\+\)/g,(m,sp)=>`(?<rest${nr++?nr:""}>${sp}.+?)`).replace(/\((?!\?)/g,"(?:");
    re=re.replace(/ /g,"\\s+").replace(/\u0001(\d+)\u0001/g,(m,i)=>slotRe(lang,slots[+i],+i));re=re.replace(/ß/g,"ss");
    return {re:new RegExp(`^(?:(?:yes|no|ja|nein|oh|ok|okay|hmm)\\s+)?${re}$`),slots};}
  function numSay(lang,v){const n=/^\d+$/.test(v)?+v:(lang==="en"?NUMEN:NUMDE).map(nrm).indexOf(v);return n>=0&&n<=20?(lang==="en"?NUMEN:NUMDE)[n]:v;}
  function findEntry(lang,base,word){const list=SL[lang][base.replace(/2$/,"")];if(!list)return null;const w=nrm(word);for(const e of list){if(e.ok.map(nrm).includes(w))return {e,fix:false};if(e.fix.map(nrm).includes(w))return {e,fix:true};}return null;}
  function display(lang,type,raw,art){const [base,form]=type.split(".");
    if(base==="name")return raw.split(" ").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ");
    if(base==="num")return numSay(lang,raw);
    const f=findEntry(lang,base,raw);if(!f)return raw;const e=f.e;
    if(form==="pl")return e.pl||e.say;
    if(form&&ART[form]&&e.g)return ART[form][e.g]+" "+e.say;
    return e.say;}
  /* compare two word lists: which words are new / missing */
  function diff(a,b){const n=a.length,m=b.length,T=[...Array(n+1)].map(()=>Array(m+1).fill(0));
    for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)T[i][j]=nrm(a[i])===nrm(b[j])?T[i+1][j+1]+1:Math.max(T[i+1][j],T[i][j+1]);
    const out=[];let i=0,j=0;while(i<n&&j<m){if(nrm(a[i])===nrm(b[j])){out.push(["=",b[j]]);i++;j++;}else if(T[i+1][j]>=T[i][j+1]){out.push(["-",a[i]]);i++;}else{out.push(["+",b[j]]);j++;}}
    while(i<n)out.push(["-",a[i++]]);while(j<m)out.push(["+",b[j++]]);return {ops:out,same:T[0][0]};}
  const words=s=>s.replace(/[.,!?]/g,"").split(/\s+/).filter(Boolean);

  /* ---------- the checker: what did the child say, how should it sound? ---------- */
  const DEFIX={spass:"Spaß",fussball:"Fußball",gross:"groß",grösser:"größer",draussen:"draußen",strasse:"Straße",weiss:"weiß",süss:"süß",heisse:"heiße",heisst:"heißt",gruss:"Gruß",schoss:"Schoß"};
  const NOUNS=new Set("park garten spielplatz schwimmbad wald zoo kino oma opa mama papa freundin freund freunden freundinnen buch bücher bild bilder kuchen schule kindergarten hause haus ball puppe lego sport spaß fußball turnen musik film fernseher tablet hund katze pferd schnee regen sonne zimmer küche fahrrad roller drinnen".split(" ").filter(w=>w!=="drinnen"));
  function fixDe(txt){return txt.split(" ").map(w=>{const k=nrm(w);let o=DEFIX[k]||w;const ok=nrm(o);if(NOUNS.has(ok)||NOUNS.has(k)||Object.values(SL.de).some(l=>l.some(e=>e.g&&nrm(e.say)===k)))o=o[0].toUpperCase()+o.slice(1);return o;}).join(" ");}
  function check(lang,item,raw){const t=norm(raw,lang);if(!t)return {verdict:"none",model:item.ex.replace(/Aarya/g,PROF.name()),said:raw};
    const isPl=(e,w)=>e.pl&&nrm(w)===nrm(e.pl);
    frames:for(const [pat,model,kind0,tip0] of item.f){const kind=pat[0]==="~"?"~":pat[0]==="!"?"!":(kind0||"");const {re,slots}=compile(lang,pat.replace(/^[~!]/,""));const m=t.match(re);if(!m)continue;
      const G=m.groups||{};let fixTip=null;const raws={};
      slots.forEach((st,i)=>{const [base,form]=st.split(".");const w=G["s"+i],art=G["a"+i];if(w===undefined)return;
        raws[st]=w;raws[base]=raws[base]||w;if(base==="name"||base==="num")return;
        const f=findEntry(lang,base,w);if(!f)return;
        if(f.fix&&!fixTip)fixTip=lang==="en"?[`Sag lieber „${f.e.say}“.`,`Say “${f.e.say}”.`]:[`Es heißt: ${f.e.say}.`,`Say: ${f.e.say}.`];
        if(form==="pl"&&f.e.pl&&!isPl(f.e,w)&&nrm(f.e.pl)!==nrm(f.e.say)){if(art)raws.__skip=1;else if(!fixTip)fixTip=lang==="en"?[`Bei Tieren sagen wir meist viele: ${f.e.pl}.`,`For animals we usually say many: ${f.e.pl}.`]:[`Bei Tieren sagen wir meist viele: ${f.e.pl}.`,`For animals we usually say many: ${f.e.pl}.`];}
        if(form&&ART[form]&&f.e.g){const want=ART[form][f.e.g];if(!art&&form==="def")raws.__skip=1;else if((!art||nrm(art)!==want)&&!fixTip)fixTip=[`Es heißt: ${want} ${f.e.say}.`,`Say: ${want} ${f.e.say}.`];}});
      if(raws.__skip)continue frames;
      let rest=(G.rest||"").trim(),rest2=(G.rest2||"").trim();if(/^(yes|no|ja|nein|my|the|a|an|one)$/.test(rest))rest="";
      if(lang==="de"){rest=fixDe(rest);rest2=fixDe(rest2);}
      const sp=x=>x?" "+x:"";
      const val=k=>{const base=k.split(".")[0];const r=raws[k]!==undefined?raws[k]:raws[base];return r===undefined?"":display(lang,k,r);};
      let out=model.replace(/\{rest\}/g,sp(rest)).replace(/\{mid\}/g,sp(rest)).replace(/\{rest2\}/g,sp(rest2)).replace(/\{why\}/g,rest||(lang==="en"?"it is fun":"es Spaß macht"))
        .replace(/\{aux\}/g,/ bin /.test(" "+t+" ")||raws.perfs?"bin":"habe").replace(/\{p\}/g,()=>val("perf")||val("perfs"))
        .replace(/\{fam2\+\}/g,()=>raws.fam2?" und "+val("fam2"):"").replace(/\{([a-z0-9.]+)\}/g,(mm,k)=>val(k));
      out=out.replace(/\s+/g," ").replace(/ ([.,!])/g,"$1").trim();out=out[0].toUpperCase()+out.slice(1);
      const verdict=kind===""&&!fixTip?"perfect":"good";
      let tip=kind==="!"&&tip0?tip0:kind==="~"?["Super! Jetzt sag es als ganzen Satz.","Great! Now say it as a whole sentence."]:fixTip;
      if(!tip&&verdict!=="perfect")tip=rule(lang,t);
      return {verdict,model:out,said:raw,tip,ok:true};}
    /* no frame fits: find the important word and build the sentence for her */
    const main=item.f[0],{slots}=compile(lang,main[0].replace(/^[~!]/,""));const vals={};let found=0;
    for(const st of slots){const base=st.split(".")[0];let v=null;
      if(base==="num"){const mm=t.match(new RegExp(`\\b(\\d{1,2}|${(lang==="en"?NUMEN:NUMDE).map(nrm).join("|")})\\b`));if(mm)v=mm[1];}
      else if(base==="name"){const ws=t.split(" ").filter(w=>!STOP.has(w));if(ws.length)v=ws[ws.length-1];}
      else{const list=SL[lang][base.replace(/2$/,"")]||[];for(const e of list)for(const a of [...e.ok,...e.fix])if(new RegExp(`\\b${esc(nrm(a))}\\b`).test(t)){v=nrm(a);break;}}
      if(v){vals[st]=display(lang,st,v,null);vals[base]=vals[base]||vals[st];found++;}}
    if(found===slots.length&&slots.length){let out=main[1].replace(/\{rest\}|\{mid\}/g,"").replace(/\{why\}/g,"it is fun").replace(/\{fam2\+\}/g,"").replace(/\{([a-z0-9.]+)\}/g,(mm,k)=>vals[k]||vals[k.split(".")[0]]||"").replace(/\s+/g," ").replace(/ ([.,])/g,"$1");
      const r=fuzzy(words(t),words(out));return {verdict:r>=.5?"good":"try",model:out,said:raw,tip:rule(lang,t)||(r>=.5?["Fast! So klingt der ganze Satz.","Nearly! This is the whole sentence."]:null)};}
    return {verdict:"try",model:item.ex.replace(/Aarya/g,PROF.name()),said:raw,tip:rule(lang,t)||["Hör gut zu und sprich mir nach.","Listen and say it after me."]};}
  const stem=w=>{w=nrm(w);return w.length>3?w.replace(/(es|en|e|n|s)$/,""):w;};
  function fuzzy(a,b){const d=diff(a.map(stem),b.map(stem));return d.same/Math.max(1,b.length);}
  function rule(lang,t){for(const [re,tip] of RULES[lang])if(re.test(t))return tip;return null;}
  function repeatOK(lang,model,raw){return fuzzy(words(norm(raw,lang)),words(norm(model,lang)))>=.75;}

  /* ---------- microphone ---------- */
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null;
  function listen(lang,onText){return new Promise((res,rej)=>{if(!SR)return rej("unsupported");try{rec=new SR();}catch(e){return rej("unsupported");}
    rec.lang=lang==="en"?"en-US":"de-DE";rec.interimResults=true;rec.maxAlternatives=3;rec.continuous=false;let best="",alts=[];
    rec.onresult=e=>{let t="";for(const r of e.results)t+=r[0].transcript+" ";best=t.trim();const last=e.results[e.results.length-1];if(last.isFinal)alts=[...last].map(a=>a.transcript);onText(best);};
    rec.onerror=e=>{rec=null;rej(e.error||"error");};rec.onend=()=>{rec=null;res({best,alts});};rec.start();});}
  function stopMic(){try{rec&&rec.stop();}catch(e){}}

  /* ---------- screens ---------- */
  let S=null,prevL=null;const box=()=>document.getElementById("talk"),$t=s=>box().querySelector(s),E=AAI.esc;
  const SAY={en:t=>EN.speak(t,{force:true}),de:t=>DE.speak(t,{lang:"de",force:true})};
  function sayIt(t){try{return SAY[S.lang](t);}catch(e){return Promise.resolve();}}
  function stopAll(){stopMic();try{EN.stopSpeech();DE.stopSpeech();}catch(e){}}
  function frame(inner){const b=box();b.hidden=false;document.body.classList.add("nbopen");
    b.innerHTML=`<div class="nbtop"><b>🗣️ ${T("Sprich mit mir · Deutsch","Talk with me · English")}${S.items?` · ${Math.min(S.i+1,S.items.length)}/${S.items.length}`:""}</b><button class="nbx" id="tkClose" aria-label="${T("Schließen","Close")}">✖</button></div><div class="nbbody">${inner}</div>`;
    $t("#tkClose").onclick=close;b.scrollTop=0;}
  function close(){stopAll();box().hidden=true;box().innerHTML="";S=null;if(prevL){UIL.set(prevL);prevL=null;}document.body.classList.remove("nbopen");try{if(CUR==="today")renderToday();renderGbar();}catch(e){}}
  function open(lang){stopAll();if(!prevL)prevL=UIL.cur;UIL.set(lang);const lv=PROF.view(lang);S={lang,lv,i:0,res:[],items:null};
    const pool=Q[lang].filter(q=>q.lv===lv),more=Q[lang].filter(q=>q.lv<lv);
    S.items=[...shuffleT(pool),...shuffleT(more)].slice(0,5);
    frame(`<div class="nbhello"><div class="nbbig">🗣️🎤</div><h2>${T("Lass uns sprechen!","Let's talk!")}</h2>
      <p>${T("Ich frage dich etwas. Tippe auf 🎤 und antworte mit einem ganzen Satz.","I ask you a question. Tap 🎤 and answer with a whole sentence.")}</p></div>
      <div class="pseg tklang"><button data-l="en" class="${lang==="en"?"on":""}">🇬🇧 English</button><button data-l="de" class="${lang==="de"?"on":""}">🇩🇪 Deutsch</button></div>
      <p class="nblvl">${T("Stufe","Level")}: <b>${GRADES[lv][1]} ${T(GRADES[lv][2],GRADES[lv][3])}</b> · ${T("5 Fragen","5 questions")}</p>
      ${SR?"":`<p class="tkwarn">🎤 ${T("Dieses Gerät kann hier nicht zuhören. Du kannst die Antwort tippen (oder Mama/Papa tippt). Am besten klappt das Mikrofon in Chrome oder Edge mit der Offline-Datei.","This device can't listen here. You can type the answer (or Mum/Dad types it). The microphone works best in Chrome or Edge with the offline file.")}</p>`}
      <div class="row center"><button class="btn" id="tkGo">${T("Los geht's ▶","Let's go ▶")}</button></div>
      <p class="tknote">👨 ${T("Für Eltern: Die Spracherkennung des Browsers versteht Kinderstimmen nicht immer. Die App korrigiert sanft und zeigt immer den richtigen Satz.","For parents: browser speech recognition doesn't always understand children's voices. The app corrects gently and always shows the right sentence.")}</p>`);
    $t("#tkGo").onclick=ask;box().querySelectorAll(".tklang button").forEach(b=>b.onclick=()=>{if(b.dataset.l!==lang)open(b.dataset.l);});}
  function shuffleT(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function ask(){stopAll();const it=S.items[S.i];
    frame(`<div class="tkq"><div class="tkemo">${it.emo}</div><div class="tkqt"><button class="spk" id="tkHear" aria-label="${T("Nochmal hören","Listen again")}">🔊</button><b>${E(it.q)}</b></div></div>
      <div class="tkmicw"><button class="tkmic" id="tkMic" aria-label="${T("Antworten","Answer")}">🎤</button><div class="tklive" id="tkLive">${SR?T("Tippe auf das Mikrofon und sprich","Tap the mic and speak"):""}</div></div>
      <div class="tktype"><input id="tkIn" placeholder="${SR?T("… oder tippen","… or type"):T("Antwort tippen","Type the answer")}" autocomplete="off"><button class="btn" id="tkSend">✔</button></div>
      <details class="tkhelp"><summary>💡 ${T("Hilfe","Help")}</summary><p>${T("So könnte es klingen","It could sound like this")}: <b>${E(it.ex.replace(/Aarya/g,PROF.name()))}</b></p></details>`);
    const hear=()=>sayIt(it.q);$t("#tkHear").onclick=hear;setTimeout(()=>S&&hear(),250);
    $t("#tkSend").onclick=()=>{const v=$t("#tkIn").value.trim();if(v)judge(v);};$t("#tkIn").onkeydown=e=>{if(e.key==="Enter"){const v=e.target.value.trim();if(v)judge(v);}};
    $t("#tkMic").onclick=()=>micTo(t=>judge(t));}
  function micTo(done){const m=$t("#tkMic"),live=$t("#tkLive");if(m.classList.contains("on")){stopMic();return;}stopAll();
    m.classList.add("on");live.textContent=T("🎧 Ich höre zu …","🎧 Listening …");
    listen(S.lang,t=>{live.textContent="„"+t+"“";}).then(({best,alts})=>{m.classList.remove("on");
      if(!best){live.textContent=T("Ich habe nichts gehört. Nochmal?","I didn't hear anything. Again?");return;}
      /* children's speech: pick the alternative that fits best */
      done(best,alts);}).catch(err=>{m.classList.remove("on");live.innerHTML=err==="not-allowed"||err==="service-not-allowed"?T("🎤 Mikrofon nicht erlaubt – bitte erlauben oder tippen","🎤 Microphone blocked – please allow it or type"):err==="no-speech"?T("Ich habe nichts gehört. Nochmal?","I didn't hear anything. Again?"):T("🎤 Hier geht das Mikrofon nicht – bitte tippen","🎤 The mic doesn't work here – please type");});}
  function judge(said,alts){const it=S.items[S.i];let r=check(S.lang,it,said);
    if(alts&&alts.length>1)for(const a of alts){const r2=check(S.lang,it,a);const rank={perfect:3,good:2,try:1,none:0};if(rank[r2.verdict]>rank[r.verdict])r=r2;}
    S.res[S.i]=r.verdict;stopAll();
    const sp2=x=>String(x).split(/\s+/).filter(Boolean),sw=sp2(r.said),mw=sp2(r.model),d=diff(sw.map(w=>norm(w,S.lang)),mw.map(w=>norm(w,S.lang)));
    const alt=r.verdict==="perfect"&&fuzzy(sw.map(w=>norm(w,S.lang)),mw.map(w=>norm(w,S.lang)))<.8;let mi=0;const modelHtml=d.ops.filter(o=>o[0]!=="-").map(o=>{const w=mw[mi++];return o[0]==="+"&&r.verdict!=="perfect"?`<ins>${E(w)}</ins>`:E(w);}).join(" ");
    let si=0;const saidHtml=d.ops.filter(o=>o[0]!=="+").map(o=>{const w=sw[si++];return o[0]==="-"&&r.verdict!=="perfect"?`<s>${E(w)}</s>`:E(w);}).join(" ");
    const head={perfect:["⭐ Super Satz!","⭐ Perfect sentence!"],good:["👍 Fast perfekt!","👍 Nearly perfect!"],try:["🙂 Wir üben zusammen","🙂 Let's practise together"],none:["🙂 Ich habe nichts verstanden","🙂 I didn't catch that"]}[r.verdict];
    REW.hit(S.lang,"spoke");if(r.verdict==="perfect")REW.hit(S.lang,"correct");else REW.hit(S.lang,"checked",{right:r.verdict==="good"});
    frame(`<div class="tkres ${r.verdict}"><div class="tkhead"><b>${T(head[0],head[1])}</b></div>
      <div class="tkline"><span class="tkl">${T("Du hast gesagt","You said")}:</span><div class="tksaid">${saidHtml||"…"}</div></div>
      <div class="tkline good"><span class="tkl">${alt?T("Auch richtig! So geht es auch","Also right! You can also say"):r.verdict==="perfect"?T("Genau so","Exactly"):T("So sagt man es","Say it like this")}:</span><div class="tkmodel">${modelHtml}</div><button class="spk" id="tkHearM" aria-label="${T("Anhören","Listen")}">🔊</button></div>
      ${r.tip?`<div class="tktip">💡 <b>${E(T(r.tip[0],r.tip[1]))}</b></div>`:""}
      ${r.verdict==="perfect"?"":`<div class="tkagain"><p>${T("Jetzt du: Sag den Satz noch einmal!","Now you: say the sentence again!")}</p><div class="tkmicw small"><button class="tkmic" id="tkMic" aria-label="${T("Nochmal sagen","Say it again")}">🎤</button><div class="tklive" id="tkLive"></div></div>
        <div class="tktype"><input id="tkIn" placeholder="${T("… oder tippen","… or type")}" autocomplete="off"><button class="btn" id="tkSend">✔</button></div></div>`}
      <div class="row center"><button class="btn" id="tkNext">${S.i<S.items.length-1?T("Nächste Frage ▶","Next question ▶"):T("Fertig ⭐","Finish ⭐")}</button></div></div>`);
    const hm=()=>sayIt(r.model);$t("#tkHearM").onclick=hm;setTimeout(()=>S&&sayIt(r.verdict==="perfect"?(S.lang==="en"?"Perfect! ":"Super! ")+r.model:(S.lang==="en"?"Say it like this: ":"Sag es so: ")+r.model),200);
    const again=t=>{if(S.res[S.i]==="fixed")return;const okk=repeatOK(S.lang,r.model,t);$t("#tkLive").innerHTML=okk?T("🎉 Genau richtig!","🎉 Exactly right!"):`${T("Fast! Hör noch einmal zu","Nearly! Listen again")}: <b>${E(r.model)}</b>`;if(okk){REW.hit(S.lang,"read");S.res[S.i]="fixed";sayIt(S.lang==="en"?"Great!":"Toll!");$t(".tkagain").classList.add("done");}};
    if($t("#tkMic")){$t("#tkMic").onclick=()=>micTo(t=>again(t));$t("#tkSend").onclick=()=>{const v=$t("#tkIn").value.trim();if(v)again(v);};$t("#tkIn").onkeydown=e=>{if(e.key==="Enter"&&e.target.value.trim())again(e.target.value.trim());};}
    $t("#tkNext").onclick=()=>{S.i++;S.i<S.items.length?ask():done();};}
  function done(){stopAll();const n=S.items.length,p=S.res.filter(x=>x==="perfect").length,g=S.res.filter(x=>x==="good"||x==="fixed").length,st=p+g>=n?3:p+g>=n*.6?2:1;
    REW.hit(S.lang,"round",st);
    frame(`<div class="nbhello"><div class="nbbig">${"⭐".repeat(st)}</div><h2>${st===3?T("Toll gesprochen!","Great talking!"):T("Gut gemacht!","Well done!")}</h2><p>${T("Du hast toll erzählt!","You talked in English!")}</p></div>
      <div class="nbstats"><span><b>⭐ ${p}</b>${T("Super Sätze","Perfect")}</span><span><b>👍 ${g}</b>${T("verbessert","Improved")}</span><span><b>🗣️ ${n}</b>${T("Fragen","Questions")}</span></div>
      <p class="nblvl">👨 ${T("Tipp: Stellt euch die Fragen auch beim Abendessen!","Tip: Ask each other these questions at dinner too!")}</p>
      <div class="row center"><button class="btn" id="tkAgain">${T("Nochmal 🗣️","Again 🗣️")}</button><button class="btn ghost" id="tkEnd">${T("Fertig","Finish")}</button></div>`);
    if(st>=2)gConfetti();$t("#tkAgain").onclick=()=>open(S.lang);$t("#tkEnd").onclick=close;}
  return {open,close,check,Q,norm,repeatOK,hasMic:()=>!!SR};})();
