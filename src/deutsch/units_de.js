/* ============================ DEUTSCH: Anfänger + Klasse 1 ============================ */
const SECTIONS={Wörter:{c:"#D97A06",l:"#FDEBCD"},Sprechen:{c:"#0E9488",l:"#D2F3EF"},Laute:{c:"#2F5BEA",l:"#DCE5FF"},Wortarten:{c:"#7C4DDB",l:"#ECE4FC"},Lesen:{c:"#1F9D63",l:"#D9F4E6"},Mix:{c:"#B7791F",l:"#FBF0D5"}};
function nopts(c,cands=[],min=0,max=100,suffix=""){const s=[c];for(const x of shuffle(cands))if(x>=min&&x<=max&&!s.includes(x)&&s.length<3)s.push(x);
  let d=1;while(s.length<3&&d<50){for(const x of [c+d,c-d])if(x>=min&&x<=max&&!s.includes(x)&&s.length<3)s.push(x);d++;}return s.map(x=>x+suffix);}
function sopts(c,cands){const s=[c];for(const x of shuffle(cands))if(!s.includes(x)&&s.length<3)s.push(x);return s;}
const eqs=(de,en)=>a=>({de:de(a),en:en?en(a):de(a)});
const W=(look,de,en,rule)=>({look,de,en,rule:RULE[rule]});
const eqline=t=>`<div class="eqline">${esc(t)}</div>`;
const big=e=>`<div class="bigemo">${e}</div>`;
const bigword=w=>`<div class="bigword">${esc(w)}</div>`;
const ART={der:"#2F5BEA",die:"#E0443E",das:"#1F9D63"};
const artw=(a,w)=>`<span class="artw" style="--ac:${ART[a]}"><b>${a}</b> ${esc(w)}</span>`;
/* noun bank: article, word, emoji, English, syllables, first sound */
const NOUNS=[["der","Hund","🐶","dog","Hund"],["die","Katze","🐱","cat","Kat-ze"],["die","Maus","🐭","mouse","Maus"],["der","Fisch","🐟","fish","Fisch"],["der","Vogel","🐦","bird","Vo-gel"],
 ["die","Kuh","🐮","cow","Kuh"],["das","Pferd","🐴","horse","Pferd"],["das","Schwein","🐷","pig","Schwein"],["der","Löwe","🦁","lion","Lö-we"],["der","Elefant","🐘","elephant","E-le-fant"],
 ["die","Ente","🦆","duck","En-te"],["der","Hase","🐰","rabbit","Ha-se"],["das","Haus","🏠","house","Haus"],["der","Ball","⚽","ball","Ball"],["das","Auto","🚗","car","Au-to"],
 ["die","Sonne","☀️","sun","Son-ne"],["der","Mond","🌙","moon","Mond"],["der","Baum","🌳","tree","Baum"],["die","Blume","🌸","flower","Blu-me"],["das","Buch","📖","book","Buch"],
 ["der","Apfel","🍎","apple","Ap-fel"],["die","Banane","🍌","banana","Ba-na-ne"],["das","Brot","🍞","bread","Brot"],["die","Milch","🥛","milk","Milch"],["das","Bett","🛏️","bed","Bett"],
 ["die","Uhr","⌚","watch","Uhr"],["das","Ei","🥚","egg","Ei"],["der","Stern","⭐","star","Stern"],["das","Schiff","🚢","ship","Schiff"],["die","Tomate","🍅","tomato","To-ma-te"],
 ["das","Krokodil","🐊","crocodile","Kro-ko-dil"],["die","Giraffe","🦒","giraffe","Gi-raf-fe"],["die","Schokolade","🍫","chocolate","Scho-ko-la-de"],["der","Igel","🦔","hedgehog","I-gel"],
 ["der","Affe","🐒","monkey","Af-fe"],["der","Pinguin","🐧","penguin","Pin-gu-in"],["die","Ananas","🍍","pineapple","A-na-nas"],["der","Tiger","🐯","tiger","Ti-ger"],["das","Zebra","🦓","zebra","Ze-bra"],
 ["der","Wal","🐋","whale","Wal"],["die","Rose","🌹","rose","Ro-se"],["das","Eis","🍦","ice cream","Eis"]];
const ANIMALS=NOUNS.filter(n=>["Hund","Katze","Maus","Fisch","Vogel","Kuh","Pferd","Schwein","Löwe","Elefant","Ente","Hase","Affe","Tiger","Zebra","Igel","Pinguin"].includes(n[1]));
const FAMILY=[["die","Mama","👩","mum"],["der","Papa","👨","dad"],["das","Baby","👶","baby"],["die","Oma","👵","grandma"],["der","Opa","👴","grandpa"],["die","Schwester","👧","sister"],["der","Bruder","👦","brother"],
 ["die","Hand","✋","hand"],["der","Fuß","🦶","foot"],["die","Nase","👃","nose"],["das","Auge","👁️","eye"],["das","Ohr","👂","ear"],["der","Mund","👄","mouth"]];
const COLS=[["rot","red","🍎"],["gelb","yellow","🍌"],["grün","green","🐸"],["blau","blue","🌊"],["orange","orange","🍊"],["lila","purple","🍇"],["braun","brown","🍫"],["weiß","white","☁️"],["schwarz","black","🐈‍⬛"],["rosa","pink","🐷"]];
const RHYMES=[["Haus","Maus","🏠","🐭"],["Hose","Rose","👖","🌹"],["Fisch","Tisch","🐟","🪑"],["Hand","Sand","✋","🏖️"],["Baum","Traum","🌳","💭"],["Topf","Kopf","🍲","🙂"],
 ["Nase","Hase","👃","🐰"],["Bein","Schwein","🦵","🐷"],["Wal","Schal","🐋","🧣"],["Rad","Bad","🚲","🛁"],["Katze","Tatze","🐱","🐾"],["Kerze","Herz","🕯️","❤️"]].filter(r=>r[0]!=="Kerze");
const ANLAUT=[["A","Affe","🐒"],["B","Ball","⚽"],["D","Dino","🦕"],["E","Ente","🦆"],["F","Fisch","🐟"],["G","Gabel","🍴"],["H","Haus","🏠"],["I","Igel","🦔"],["K","Katze","🐱"],["L","Löwe","🦁"],
 ["M","Maus","🐭"],["N","Nase","👃"],["O","Oma","👵"],["P","Pinguin","🐧"],["R","Rose","🌹"],["S","Sonne","☀️"],["T","Tomate","🍅"],["U","Uhr","⌚"],["W","Wal","🐋"],["Z","Zebra","🦓"]];
const VOWELW=[["Hund","u","🐶"],["Ball","a","⚽"],["Fisch","i","🐟"],["Bett","e","🛏️"],["Sonne","o","☀️"],["Mond","o","🌙"],["Hase","a","🐰"],["Igel","i","🦔"],["Rad","a","🚲"],["Zug","u","🚂"],["Bus","u","🚌"],["Kind","i","🧒"],["Hut","u","👒"],["Stern","e","⭐"],["Hose","o","👖"]];
const SENT=[["Die Katze schläft.","The cat is sleeping.","🐱💤"],["Der Hund spielt mit dem Ball.","The dog plays with the ball.","🐶⚽"],["Der Fisch schwimmt.","The fish swims.","🐟💧"],["Mama liest ein Buch.","Mum reads a book.","👩📖"],
 ["Die Sonne scheint.","The sun is shining.","☀️😎"],["Es regnet.","It is raining.","🌧️☔"],["Das Baby weint.","The baby is crying.","👶😢"],["Opa trinkt Tee.","Grandpa drinks tea.","👴☕"],["Ich esse einen Apfel.","I eat an apple.","🍎😋"],
 ["Der Vogel sitzt im Baum.","The bird sits in the tree.","🐦🌳"],["Das Auto ist rot.","The car is red.","🚗🔴"],["Aarya turnt.","Aarya does gymnastics.","🤸‍♀️"]];
const RULE={
 words:["Namenwörter","Naming words","Jedes Ding hat einen Namen. Lerne das Wort immer mit seinem Begleiter: der Hund, die Katze, das Haus.","Everything has a name. Always learn a word with its article: der Hund, die Katze, das Haus."],
 colours:["Farben","Colours","rot, gelb, grün, blau, orange, lila, braun, weiß, schwarz, rosa.","red, yellow, green, blue, orange, purple, brown, white, black, pink."],
 talk:["Sprechen","Speaking","Auf eine Frage antworten wir mit einem ganzen Satz: Wie heißt du? – Ich heiße Aarya.","We answer a question with a whole sentence: What's your name? – My name is Aarya."],
 anlaut:["Anlaut","First sound","Der Anlaut ist der erste Laut im Wort. Sprich das Wort langsam: Mmm-aus. Der Anlaut ist M.","The first sound is the beginning sound of a word. Say it slowly: Mmm-aus. The first sound is M."],
 vowel:["Selbstlaute","Vowels","a, e, i, o, u sind Selbstlaute. In jedem Wort steckt mindestens ein Selbstlaut.","a, e, i, o, u are vowels. Every word has at least one vowel."],
 syl:["Silben","Syllables","Klatsch das Wort: Ba – na – ne. Jeder Klatscher ist eine Silbe. In jeder Silbe steckt ein Selbstlaut.","Clap the word: Ba – na – ne. Each clap is one syllable. Every syllable has a vowel."],
 rhyme:["Reimwörter","Rhyming words","Wörter reimen sich, wenn sie am Ende gleich klingen: Haus – Maus.","Words rhyme when they sound the same at the end: Haus – Maus."],
 art:["Begleiter: der, die, das","Articles: der, die, das","Jedes Namenwort hat einen Begleiter: der (blau), die (rot), das (grün). Man muss ihn mit dem Wort lernen.","Every noun has an article: der (blue), die (red), das (green). You learn it together with the word."],
 caps:["Groß- und Kleinschreibung","Capital letters","Namenwörter schreibt man groß: der Hund, die Katze. Tunwörter und Wiewörter schreibt man klein: laufen, rot. Der Satzanfang ist immer groß.","Nouns start with a capital letter: der Hund, die Katze. Verbs and adjectives are small: laufen, rot. A sentence always starts with a capital."],
 read:["Lesen","Reading","Lies Laut für Laut und schleife die Laute zusammen: H-u-n-d → Hund.","Read sound by sound and glide the sounds together: H-u-n-d → Hund."]
};
const UNITS=[
{id:0,k:0,sec:"Wörter",emo:"🎨",de:"Farben",en:"Colours",blitz:true,
 say:["Wir lernen die Farben auf Deutsch: rot, gelb, grün, blau.","We learn the colours in German: rot, gelb, grün, blau."],
 merk:["Rot wie der Apfel, gelb wie die Banane, grün wie der Frosch!","Red like the apple, yellow like the banana, green like the frog!"],
 ex:()=>COLS.slice(0,4).map(c=>({vis:big(c[2]),de:`${c[0]}`,en:c[1]})),
 gen(){const c=pick(COLS);if(Math.random()<.7)return {vis:big(c[2]),de:"Welche Farbe ist das?",en:"What colour is this?",opts:sopts(`${c[0]}|${c[1]}`,COLS.filter(x=>x!==c).map(x=>`${x[0]}|${x[1]}`)),
   stmt:eqs(x=>`Das ist ${main(x)}.`,x=>`It is ${sub(x)}.`),mem:[c[2],c[0]],why:W(big(c[2]),`Schau genau hin: Das ist ${c[0]}.`,`Look closely: it is ${c[1]}. In German we say ${c[0]}.`,"colours")};
  const others=shuffle(COLS.filter(x=>x!==c)).slice(0,2);
  return {vis:"",de:`Was ist ${c[0]}?`,en:`What is ${c[1]}?`,opts:[c[2],...others.map(o=>o[2])],stmt:eqs(x=>`${x} ist ${c[0]}.`,x=>`${x} is ${c[1]}.`),mem:null,why:W(big(c[2]),`${c[0]} heißt ${c[1]}. ${c[2]} ist ${c[0]}.`,`${c[0]} means ${c[1]}. ${c[2]} is ${c[1]}.`,"colours")};},
 parent:{method:"Colour words are used constantly at school: ‘Mal den Kreis rot an!’ (colour the circle red).",words:COLS.map(c=>[c[0],c[1]]),games:["‘Ich sehe was, was du nicht siehst, und das ist … blau!’","Sort clothes by colour while saying the German words."]}},
{id:1,k:0,sec:"Wörter",emo:"🐾",de:"Tiere",en:"Animals",blitz:true,
 say:["Jedes Tier hat einen Namen und einen Begleiter: der Hund, die Katze, das Pferd.","Every animal has a name and an article: der Hund, die Katze, das Pferd."],
 merk:["Der Hund macht wau, die Katze macht miau!","The dog goes woof, the cat goes meow!"],
 ex:()=>ANIMALS.slice(0,4).map(n=>({vis:big(n[2]),de:`${n[0]} ${n[1]}`,en:n[3]})),
 gen(){const n=pick(ANIMALS),others=shuffle(ANIMALS.filter(x=>x!==n)).slice(0,2);
  return {vis:big(n[2]),de:"Welches Tier ist das?",en:"Which animal is this?",opts:[`${n[0]} ${n[1]}|${n[3]}`,...others.map(o=>`${o[0]} ${o[1]}|${o[3]}`)],
   stmt:eqs(x=>`Das ist ${main(x)}.`,x=>`This is a ${sub(x)}.`),mem:[n[2],n[1]],
   why:W(big(n[2])+`<div class="eqline">${artw(n[0],n[1])}</div>`,`Das ist ${n[0]} ${n[1]}. Sag es laut mit Begleiter: ${n[0]} ${n[1]}!`,`This is a ${n[3]}. In German: ${n[0]} ${n[1]}.`,"words")};},
 parent:{method:"Learn every noun together with its article (der/die/das). Many German classrooms colour-code articles: der = blue, die = red, das = green.",words:ANIMALS.slice(0,10).map(n=>[`${n[0]} ${n[1]}`,n[3]]),games:["Animal picture book: point and name with article.","Animal sounds game in German: Wie macht die Kuh? Muh!"]}},
{id:2,k:0,sec:"Wörter",emo:"👨‍👩‍👧",de:"Familie und Körper",en:"Family and body",blitz:true,
 say:["Das ist meine Familie: die Mama, der Papa, die Oma, der Opa. Und mein Körper: die Hand, die Nase, das Ohr.","This is my family: mum, dad, grandma, grandpa. And my body: hand, nose, ear."],
 merk:["Kopf, Schultern, Knie und Fuß, Knie und Fuß!","Head, shoulders, knees and toes in German!"],
 ex:()=>FAMILY.slice(0,4).map(n=>({vis:big(n[2]),de:`${n[0]} ${n[1]}`,en:n[3]})),
 gen(){const n=pick(FAMILY),others=shuffle(FAMILY.filter(x=>x!==n)).slice(0,2);
  return {vis:big(n[2]),de:"Wer oder was ist das?",en:"Who or what is this?",opts:[`${n[0]} ${n[1]}|${n[3]}`,...others.map(o=>`${o[0]} ${o[1]}|${o[3]}`)],
   stmt:eqs(x=>`Das ist ${main(x)}.`,x=>`This is ${sub(x)}.`),mem:[n[2],n[1]],
   why:W(big(n[2])+`<div class="eqline">${artw(n[0],n[1])}</div>`,`Das ist ${n[0]} ${n[1]}.`,`This is ${n[3]}. In German: ${n[0]} ${n[1]}.`,"words")};},
 parent:{method:"Family and body words come up in the first weeks of school (Ich und meine Familie).",words:FAMILY.map(n=>[`${n[0]} ${n[1]}`,n[3]]),games:["Sing ‘Kopf, Schultern, Knie und Fuß’.","Family photo: ‘Wer ist das?’ – ‘Das ist die Oma.’"]}},
{id:3,k:0,sec:"Sprechen",emo:"👋",de:"Hallo! Erste Sätze",en:"Hello! First sentences",
 say:["Auf eine Frage antworten wir mit einem ganzen Satz. Wie heißt du? Ich heiße Aarya.","We answer a question with a whole sentence. What is your name? My name is Aarya."],
 merk:["Hallo! Ich heiße Aarya. Wie heißt du?","Hello! My name is Aarya. What's your name?"],
 ex:()=>[{vis:big("👋"),de:"Guten Morgen!",en:"Good morning!"},{vis:big("🙋‍♀️"),de:"Ich heiße Aarya.",en:"My name is Aarya."},{vis:big("😊"),de:"Mir geht es gut.",en:"I am fine."},{vis:big("🙏"),de:"Danke! – Bitte!",en:"Thank you! – You're welcome!"}],
 gen(){const Q=[["Wie heißt du?","What is your name?","Ich heiße Aarya.|My name is Aarya.",["Ich bin gut.|I am good.","Danke!|Thank you!"]],
   ["Wie geht es dir?","How are you?","Mir geht es gut.|I am fine.",["Ich heiße Aarya.|My name is Aarya.","Tschüss!|Bye!"]],
   ["Wie alt bist du?","How old are you?","Ich bin sechs Jahre alt.|I am six years old.",["Ich heiße sechs.|(wrong)","Mir geht es gut.|I am fine."]],
   ["Du bekommst ein Geschenk. Was sagst du?","You get a present. What do you say?","Danke!|Thank you!",["Tschüss!|Bye!","Guten Morgen!|Good morning!"]],
   ["Du gehst nach Hause. Was sagst du?","You go home. What do you say?","Tschüss!|Bye!",["Hallo!|Hello!","Danke!|Thank you!"]],
   ["Es ist Morgen. Was sagst du?","It is morning. What do you say?","Guten Morgen!|Good morning!",["Gute Nacht!|Good night!","Tschüss!|Bye!"]],
   ["Du gehst ins Bett. Was sagst du?","You go to bed. What do you say?","Gute Nacht!|Good night!",["Guten Morgen!|Good morning!","Hallo!|Hello!"]],
   ["Du möchtest Wasser. Was sagst du?","You want water. What do you say?","Ich möchte Wasser, bitte.|I would like water, please.",["Ich bin Wasser.|I am water.","Tschüss, Wasser!|Bye, water!"]],
   ["Woher kommst du?","Where are you from?","Ich wohne in Frankfurt.|I live in Frankfurt.",["Ich heiße Frankfurt.|My name is Frankfurt.","Danke!|Thank you!"]]];
  const q=pick(Q);
  return {vis:big("💬"),de:q[0],en:q[1],opts:[q[2],...q[3]],stmt:eqs(x=>`${q[0]} – ${main(x)}`,x=>`${q[1]} – ${sub(x)}`),mem:null,
   why:W(big("💬"),`Auf „${q[0]}“ passt: ${main(q[2])} Das ist ein ganzer, höflicher Satz.`,`For “${q[1]}” the right answer is: ${sub(q[2])}`,"talk")};},
 parent:{method:"Speaking in full sentences (‘in ganzen Sätzen antworten’) is expected from the start of Klasse 1.",words:[["Wie heißt du?","What's your name?"],["Ich heiße …","My name is …"],["Wie geht es dir?","How are you?"],["Mir geht es gut.","I'm fine."],["Danke / Bitte","Thank you / please"],["Tschüss","Bye"]],games:["Phone game with a toy phone: greet, ask names, say goodbye.","Practise ordering at the bakery: ‘Ich möchte ein Brötchen, bitte.’"]}},
{id:4,k:1,sec:"Laute",emo:"🔤",de:"Anlaute",en:"First sounds",blitz:true,
 say:["Der Anlaut ist der erste Laut im Wort. Sprich langsam: Mmm-aus. Maus fängt mit M an!","The first sound is the first sound of a word. Say slowly: Mmm-aus. Maus starts with M!"],
 merk:["Wort langsam sprechen – den ersten Laut hören!","Say the word slowly – hear the first sound!"],
 ex:()=>ANLAUT.slice(0,4).map(a=>({vis:big(a[2]),de:`${a[0]} wie ${a[1]}`,en:`${a[0]} as in ${a[1]}`})),
 gen(){const a=pick(ANLAUT),others=shuffle(ANLAUT.filter(x=>x[0]!==a[0])).slice(0,2);
  return {vis:big(a[2]),de:`Womit fängt ${a[1]} an?`,en:`What sound does ${a[1]} start with?`,opts:[a[0],...others.map(o=>o[0])],stmt:eqs(x=>`${a[1]} fängt mit ${x} an.`,x=>`${a[1]} starts with ${x}.`),mem:[a[2],a[0]],
   why:W(big(a[2])+`<div class="eqline"><b class="hl1">${a[1][0]}</b>${a[1].slice(1)}</div>`,`Sprich ganz langsam: ${a[0]}… ${a[1]}. Der erste Laut ist ${a[0]}. ${a[0]} wie ${a[1]}!`,`Say it very slowly: ${a[0]}… ${a[1]}. The first sound is ${a[0]}.`,"anlaut")};},
 parent:{method:"German Klasse 1 teaches reading with an ‘Anlauttabelle’ (sound chart): each letter has a picture whose word starts with that sound (A – Affe). Children say the letter SOUND (mmm), not the letter name (em).",
  words:[["der Anlaut","first sound"],["die Anlauttabelle","sound chart"],["der Buchstabe","letter"],["der Laut","sound"]],games:["‘Ich packe meinen Koffer’ with things starting with one sound.","I-spy with sounds: ‘Ich sehe was, das fängt mit Mmm an.’"]}},
{id:5,k:1,sec:"Laute",emo:"🅰️",de:"Selbstlaute",en:"Vowels",blitz:true,
 say:["a, e, i, o, u sind Selbstlaute. Sie klingen ganz allein. In jedem Wort steckt mindestens einer!","a, e, i, o, u are vowels. They sound on their own. Every word has at least one!"],
 merk:["A, E, I, O, U – Selbstlaute, das bist du!","A, E, I, O, U – vowels, that is you!"],
 ex:()=>VOWELW.slice(0,3).map(v=>({vis:big(v[2]),de:v[0],en:`vowel: ${v[1]}`})),
 gen(){const v=pick(VOWELW);const i=v[0].toLowerCase().indexOf(v[1].toLowerCase());const shown=v[0].slice(0,i)+"_"+v[0].slice(i+1);
  const others=shuffle(["a","e","i","o","u"].filter(x=>x!==v[1].toLowerCase())).slice(0,2);
  return {vis:big(v[2])+bigword(shown),de:`Welcher Selbstlaut fehlt?`,en:"Which vowel is missing?",opts:[v[1].toLowerCase(),...others],stmt:eqs(x=>`${v[0].slice(0,i)}${i===0?x.toUpperCase():x}${v[0].slice(i+1)}`),mem:null,
   why:W(big(v[2])+bigword(v[0]),`Zieh das Wort lang wie Kaugummi: ${v[0].slice(0,i)}${v[0][i].repeat(3)}${v[0].slice(i+1)}. Da hörst du das ${v[1].toLowerCase()}.`,`Stretch the word like chewing gum: ${v[0].slice(0,i)}${v[0][i].repeat(3)}${v[0].slice(i+1)}. You can hear the ${v[1].toLowerCase()}.`,"vowel")};},
 parent:{method:"Vowels are called ‘Selbstlaute’ (they sound by themselves); consonants are ‘Mitlaute’. Ä, Ö, Ü are ‘Umlaute’.",words:[["der Selbstlaut / Vokal","vowel"],["der Mitlaut / Konsonant","consonant"],["der Umlaut (ä, ö, ü)","umlaut"]],games:["Stretch words like chewing gum: ‘Hhhuuunnnd’ — which vowel do you hear?","Colour all vowels red in a short text."]}},
{id:6,k:1,sec:"Laute",emo:"👏",de:"Silben klatschen",en:"Clapping syllables",blitz:true,
 say:["Wir klatschen die Wörter: Ba – na – ne. Jeder Klatscher ist eine Silbe.","We clap the words: Ba – na – ne. Each clap is one syllable."],
 merk:["Klatsch mit! Jede Silbe ein Klatscher! 👏","Clap along! Each syllable is one clap!"],
 ex:()=>[{vis:big("🍌")+`<div class="syl"><span>Ba</span><span>na</span><span>ne</span></div>`,de:"Ba-na-ne: 3 Silben",en:"3 syllables"},{vis:big("☀️")+`<div class="syl"><span>Son</span><span>ne</span></div>`,de:"Son-ne: 2 Silben",en:"2 syllables"}],
 gen(){const n=pick(NOUNS.filter(x=>x[4])),parts=n[4].split("-");
  return {vis:big(n[2]),de:`Wie viele Silben hat ${n[1]}? Klatsch mit!`,en:`How many syllables does ${n[1]} have? Clap along!`,opts:nopts(parts.length,[parts.length+1,parts.length-1],1,5),
   stmt:eqs(x=>`${n[1]} hat ${x} ${x==="1"?"Silbe":"Silben"}.`,x=>`${n[1]} has ${x} syllable${x==="1"?"":"s"}.`),mem:[n[2],String(parts.length)],
   why:W(big(n[2])+`<div class="syl">${parts.map(p=>`<span>${p}</span>`).join("")}</div>`,`Klatsch mit: ${parts.join(" – ")}. Das ${parts.length===1?"ist 1 Klatscher, also 1 Silbe":`sind ${parts.length} Klatscher, also ${parts.length} Silben`}.`,`Clap along: ${parts.join(" – ")}. That is ${parts.length} clap${parts.length>1?"s":""}, so ${parts.length} syllable${parts.length>1?"s":""}.`,"syl")};},
 parent:{method:"‘Silben klatschen’ (clapping syllables) and ‘Silbenbögen’ (syllable arcs) are core Klasse 1 reading tools. Many reading books print syllables in alternating colours.",words:[["die Silbe","syllable"],["klatschen","to clap"],["der Silbenbogen","syllable arc"]],games:["Clap names of family members: Aa-rya, Pa-pa.","Robot talk: speak in syllables and she guesses the word."]}},
{id:7,k:1,sec:"Laute",emo:"🎵",de:"Reimwörter",en:"Rhyming words",
 say:["Wörter reimen sich, wenn sie am Ende gleich klingen: Haus – Maus, Hose – Rose.","Words rhyme when they sound the same at the end: Haus – Maus."],
 merk:["Haus und Maus, das reimt sich – raus! 🎵","Haus and Maus, they rhyme!"],
 ex:()=>[{vis:big("🏠🐭"),de:"Haus – Maus",en:"house – mouse"},{vis:big("👃🐰"),de:"Nase – Hase",en:"nose – rabbit"}],
 gen(){const r=pick(RHYMES),others=shuffle(RHYMES.filter(x=>x!==r)).slice(0,2);
  return {vis:big(r[2]),de:`Was reimt sich auf ${r[0]}?`,en:`What rhymes with ${r[0]}?`,opts:[`${r[1]}|${r[3]}`,...others.map(o=>`${o[1]}|${o[3]}`)],stmt:eqs(x=>`${r[0]} – ${main(x)}: das reimt sich${main(x)===r[1]?"!":" nicht."}`,x=>`${r[0]} – ${main(x)}`),mem:[r[0],r[1]],
   why:W(big(r[2]+r[3]),`Hör auf das Ende: ${r[0]} und ${r[1]} klingen am Ende gleich. Das ist ein Reim!`,`Listen to the end: ${r[0]} and ${r[1]} sound the same at the end. That is a rhyme!`,"rhyme")};},
 parent:{method:"Rhyming trains ‘phonological awareness’ (hearing sounds in words), the foundation for reading and spelling in German.",words:[["der Reim","rhyme"],["sich reimen","to rhyme"],["das Reimwort","rhyming word"]],games:["Rhyme ping-pong: you say Haus, she says Maus.","Read rhyming picture books (e.g. Der Grüffelo in German)."]}},
{id:8,k:1,sec:"Wortarten",emo:"📦",de:"der, die, das",en:"Articles der, die, das",blitz:true,
 say:["Jedes Namenwort hat einen Begleiter: der, die oder das. In der Schule hat jeder eine Farbe: der ist blau, die ist rot, das ist grün.","Every noun has an article: der, die or das. At school each has a colour: der is blue, die is red, das is green."],
 merk:["Der ist blau, die ist rot, das ist grün – immer mit Begleiter lernen!","der blue, die red, das green – always learn with the article!"],
 ex:()=>[{vis:big("🐶")+`<div class="eqline">${artw("der","Hund")}</div>`,de:"der Hund",en:"the dog"},{vis:big("🐱")+`<div class="eqline">${artw("die","Katze")}</div>`,de:"die Katze",en:"the cat"},{vis:big("🏠")+`<div class="eqline">${artw("das","Haus")}</div>`,de:"das Haus",en:"the house"}],
 gen(){const n=pick(NOUNS);
  return {vis:big(n[2]),de:`der, die oder das? ___ ${n[1]}`,en:`Which article? ___ ${n[1]} (${n[3]})`,opts:[n[0],...["der","die","das"].filter(x=>x!==n[0])],stmt:eqs(x=>`${x} ${n[1]}`),mem:[n[1],n[0]],
   why:W(big(n[2])+`<div class="eqline">${artw(n[0],n[1])}</div>`,`Es heißt ${n[0]} ${n[1]}. Den Begleiter muss man mit dem Wort zusammen lernen. Tipp: Sag es dreimal: ${n[0]} ${n[1]}, ${n[0]} ${n[1]}, ${n[0]} ${n[1]}!`,`It is ${n[0]} ${n[1]}. In German you just have to learn the article with the word. Tip: say it three times!`,"art")};},
 parent:{method:"German articles must be memorised with each word. Many Klasse 1 classes use colours (der blue, die red, das green) on word cards. Tip: label things at home with coloured sticky notes.",words:[["der Begleiter / der Artikel","article"],["das Namenwort / Nomen","noun"],["der, die, das","the (masculine, feminine, neuter)"]],games:["Coloured sticky notes on furniture: blue der Tisch, red die Tür, green das Fenster.","Article sorting: put toys into a blue, red or green box."]}},
{id:9,k:1,sec:"Wortarten",emo:"🔠",de:"Groß oder klein?",en:"Capital or small letter?",
 say:["Namenwörter schreibt man groß: der Hund, die Katze. Man kann der, die oder das davor setzen.","Nouns are written with a capital letter: der Hund, die Katze. You can put der, die or das in front."],
 merk:["Kann ich der, die, das davor sagen? Dann schreibe ich groß!","Can I say der, die, das before it? Then it gets a capital!"],
 ex:()=>[{vis:bigword("der Hund"),de:"Hund – groß",en:"noun – capital"},{vis:bigword("laufen"),de:"laufen – klein",en:"verb – small"}],
 gen(){const n=pick(NOUNS);const small=pick(["laufen","rot","spielen","groß","schlafen","schnell","essen","lustig","springen","klein"]);
  if(Math.random()<.5)return {vis:"",de:"Welches Wort schreibt man groß?",en:"Which word starts with a capital letter?",opts:[n[1],small,pick(["und","mit","auf","heute"])],stmt:eqs(x=>`${x} schreibt man ${x===n[1]?"groß":"klein"}.`,x=>`${x} is written ${x===n[1]?"with a capital":"small"}.`),mem:null,
   why:W(bigword(`${n[0]} ${n[1]}`),`Man kann ${n[0]} davor sagen: ${n[0]} ${n[1]}. Darum ist ${n[1]} ein Namenwort und wird groß geschrieben. ${small} ist kein Ding: Man sagt nicht „der ${small}“.`,`You can say ${n[0]} before it: ${n[0]} ${n[1]}. So ${n[1]} is a noun and gets a capital letter.`,"caps")};
  return {vis:big(n[2]),de:"Wie schreibt man es richtig?",en:"Which spelling is right?",opts:[`${n[0]} ${n[1]}`,`${n[0]} ${n[1].toLowerCase()}`],stmt:eqs(x=>`Richtig: ${x}`,x=>`Right: ${x}`),mem:null,
   why:W(bigword(`${n[0]} ${n[1]}`),`${n[1]} ist ein Namenwort. Namenwörter schreibt man groß: ${n[0]} ${n[1]}.`,`${n[1]} is a noun. German nouns always start with a capital letter.`,"caps")};},
 parent:{method:"In German ALL nouns are capitalised — very different from English. The school test: ‘Can you put der/die/das in front?’",words:[["großschreiben","write with a capital"],["kleinschreiben","write small"],["das Namenwort","noun"],["das Tunwort","verb"],["das Wiewort","adjective"]],games:["Word sorting: cards with nouns and verbs; nouns go to the ‘groß’ box.","Find capital letters in a picture-book sentence and say why."]}},
{id:10,k:1,sec:"Lesen",emo:"📖",de:"Wörter lesen",en:"Reading words",blitz:true,
 say:["Lies Laut für Laut und zieh die Laute zusammen: H – u – n – d … Hund!","Read sound by sound and glide them together: H – u – n – d … Hund!"],
 merk:["Laute zusammenziehen wie Kaugummi!","Stretch the sounds together like chewing gum!"],
 ex:()=>[{vis:bigword("Hund"),de:"H-u-n-d → Hund 🐶",en:"dog"},{vis:bigword("Sonne"),de:"Son-ne → Sonne ☀️",en:"sun"}],
 gen(){const n=pick(NOUNS.filter(x=>x[1].length<=6)),others=shuffle(NOUNS.filter(x=>x!==n)).slice(0,2);
  return {vis:bigword(n[1]),de:"Lies das Wort. Welches Bild passt?",en:"Read the word. Which picture matches?",opts:[n[2],...others.map(o=>o[2])],stmt:eqs(x=>`${n[1]} ${x===n[2]?"passt zu":"passt nicht zu"} ${x}.`,x=>`${n[1]} (${n[3]}) ${x===n[2]?"matches":"does not match"} ${x}.`),mem:[n[1],n[2]],
   why:W(bigword(n[1])+big(n[2]),`Lies langsam, Laut für Laut: ${n[1].split("").join(" – ")}. Zusammen: ${n[1]}! Das ist ${n[0]} ${n[1]}.`,`Read slowly, sound by sound: ${n[1].split("").join(" – ")}. Together: ${n[1]}! It means ${n[3]}.`,"read")};},
 parent:{method:"German spelling is very regular, so children learn to read by ‘Lautieren’ (sounding out) and ‘Zusammenschleifen’ (gliding sounds together). Say sounds, not letter names (‘mmm’ not ‘em’).",words:[["lesen","to read"],["lautieren","sound out"],["zusammenschleifen","blend sounds"],["das Wort","word"]],games:["Label 10 things at home with word cards; she reads and touches them.","Read shop signs on walks (Bäckerei, Apotheke)."]}},
{id:11,k:1,sec:"Lesen",emo:"📝",de:"Sätze lesen",en:"Reading sentences",
 say:["Ein Satz fängt groß an und hört mit einem Punkt auf. Lies jedes Wort und denk an das Bild.","A sentence starts with a capital and ends with a full stop. Read every word and picture it."],
 merk:["Groß am Anfang, Punkt am Ende!","Capital at the start, full stop at the end!"],
 ex:()=>SENT.slice(0,2).map(s=>({vis:big(s[2]),de:s[0],en:s[1]})),
 gen(){const s=pick(SENT),others=shuffle(SENT.filter(x=>x!==s)).slice(0,2);
  return {vis:bigword(s[0]),de:"Lies den Satz. Welches Bild passt?",en:"Read the sentence. Which picture matches?",opts:[s[2],...others.map(o=>o[2])],stmt:eqs(x=>`${s[0]} ${x===s[2]?"passt zu":"passt nicht zu"} ${x}`,x=>`${s[1]} ${x===s[2]?"matches":"does not match"} ${x}`),mem:null,
   why:W(bigword(s[0])+big(s[2]),`Lies Wort für Wort: ${s[0]} Stell dir das Bild im Kopf vor: ${s[2]}`,`Read word by word: ${s[1]} Picture it in your head: ${s[2]}`,"read")};},
 parent:{method:"‘Sinnentnehmendes Lesen’ (reading for meaning) is checked with picture matching in Klasse 1 workbooks.",words:[["der Satz","sentence"],["der Punkt","full stop"],["der Satzanfang","start of the sentence"]],games:["Write little notes for her: ‘Hol den Ball.’ She reads and does it.","Read one sentence each in a picture book."]}}
];
