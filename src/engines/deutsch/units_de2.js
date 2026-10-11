/* ============================ DEUTSCH KLASSE 2 ============================ */
Object.assign(SECTIONS,{Grammatik:{c:"#D6397E",l:"#FCE1EE"},Rechtschreibung:{c:"#0E9488",l:"#D2F3EF"}});
Object.assign(RULE,{
 wortart:["Wortarten","Word types","Nomen sind Namen für Dinge, Menschen und Tiere (der Hund). Verben sagen, was man tut (laufen). Adjektive sagen, wie etwas ist (rot, groß).","Nouns name things, people and animals (der Hund). Verbs say what you do (laufen). Adjectives say what something is like (rot, groß)."],
 plural:["Einzahl und Mehrzahl","One and many","Einzahl: ein Ding (der Hund). Mehrzahl: viele (die Hunde). In der Mehrzahl ist der Begleiter immer die. Oft ändert sich das Wort: Maus → Mäuse.","Singular: one thing (der Hund). Plural: many (die Hunde). In the plural the article is always die. Often the word changes: Maus → Mäuse."],
 abc:["Das ABC","Alphabetical order","Schau auf den ersten Buchstaben. Welcher kommt im ABC zuerst? Sind die ersten gleich, schau auf den zweiten Buchstaben.","Look at the first letter. Which comes first in the alphabet? If the first letters are the same, look at the second letter."],
 punct:["Satzzeichen","Punctuation","Punkt (.) am Ende eines Erzählsatzes. Fragezeichen (?) nach einer Frage. Ausrufezeichen (!) wenn man ruft oder etwas befiehlt.","Full stop (.) at the end of a telling sentence. Question mark (?) after a question. Exclamation mark (!) when you shout or give an order."],
 ieei:["ie oder ei?","ie or ei?","Bei ie hört man ein langes i: Biene, Tier. Bei ei hört man ai: Ei, Stein. Sprich das Wort langsam und hör genau hin!","In ie you hear a long ee: Biene, Tier. In ei you hear ‘eye’: Ei, Stein. Say the word slowly and listen!"],
 compound:["Zusammengesetzte Nomen","Compound nouns","Zwei Nomen werden ein neues Wort: Haus + Tür = die Haustür. Der Begleiter kommt vom letzten Wort: die Tür → die Haustür.","Two nouns make a new word: Haus + Tür = die Haustür. The article comes from the last word: die Tür → die Haustür."]
});
const VERBEN=[["laufen","🏃","to run"],["spielen","🎲","to play"],["schlafen","😴","to sleep"],["essen","🍽️","to eat"],["springen","🦘","to jump"],["lesen","📖","to read"],["malen","🎨","to paint"],["singen","🎤","to sing"],["tanzen","💃","to dance"],["schwimmen","🏊","to swim"],["turnen","🤸","to do gymnastics"],["lachen","😂","to laugh"]];
const ADJ=[["rot","🔴","red"],["groß","🦒","big / tall"],["klein","🐭","small"],["schnell","🚀","fast"],["lustig","🤡","funny"],["müde","🥱","tired"],["kalt","🥶","cold"],["warm","☀️","warm"],["laut","📢","loud"],["leise","🤫","quiet"],["schön","🌸","beautiful"],["lang","🐍","long"]];
const PLURAL=[["der","Hund","Hunde","🐶",["Hunds","Hunden"]],["die","Katze","Katzen","🐱",["Katzes","Kätze"]],["die","Maus","Mäuse","🐭",["Mauser","Mausen"]],["der","Ball","Bälle","⚽",["Balls","Ballen"]],["das","Haus","Häuser","🏠",["Hause","Hauses"]],
 ["das","Buch","Bücher","📖",["Buchs","Buche"]],["der","Apfel","Äpfel","🍎",["Apfels","Apfeln"]],["die","Blume","Blumen","🌸",["Blumes","Blümer"]],["das","Auto","Autos","🚗",["Auten","Autoe"]],["der","Baum","Bäume","🌳",["Baums","Baumen"]],
 ["das","Kind","Kinder","🧒",["Kinds","Kinden"]],["der","Stern","Sterne","⭐",["Sterns","Sternen"]],["das","Ei","Eier","🥚",["Eis","Eien"]],["die","Banane","Bananen","🍌",["Bananes","Banänen"]],["der","Fisch","Fische","🐟",["Fischs","Fischen"]],["das","Bett","Betten","🛏️",["Betts","Bette"]]];
const PUNCT=[["Wie heißt du","?","What's your name?"],["Ich spiele Fußball",".","I play football."],["Pass auf","!","Watch out!"],["Wo ist mein Ball","?","Where is my ball?"],["Die Sonne scheint",".","The sun is shining."],["Komm schnell her","!","Come here quickly!"],
 ["Hast du Hunger","?","Are you hungry?"],["Wir gehen in den Zoo",".","We are going to the zoo."],["Hurra, Ferien","!","Hooray, holidays!"],["Kannst du turnen","?","Can you do gymnastics?"],["Der Hund bellt",".","The dog barks."],["Hilfe","!","Help!"],["Was malst du","?","What are you drawing?"],["Oma backt einen Kuchen",".","Grandma bakes a cake."]];
const IEEI=[["Biene","ie","🐝"],["Brief","ie","✉️"],["Tier","ie","🐾"],["vier","ie","4️⃣"],["Ziege","ie","🐐"],["Wiese","ie","🌾"],["sieben","ie","7️⃣"],["Spiel","ie","🎲"],["Fliege","ie","🪰"],["Riese","ie","🧌"],
 ["Ei","ei","🥚"],["Eis","ei","🍦"],["Bein","ei","🦵"],["Stein","ei","🪨"],["Schwein","ei","🐷"],["drei","ei","3️⃣"],["Seife","ei","🧼"],["Leiter","ei","🪜"],["Zeitung","ei","📰"],["Kreis","ei","⭕"]];
const COMPOUND=[["das","Haus","die","Tür","die Haustür","🚪"],["die","Sonne","die","Blume","die Sonnenblume","🌻"],["der","Schnee","der","Mann","der Schneemann","⛄"],["der","Apfel","der","Baum","der Apfelbaum","🌳"],["der","Fuß","der","Ball","der Fußball","⚽"],
 ["das","Feuer","die","Wehr","die Feuerwehr","🚒"],["der","Zahn","die","Bürste","die Zahnbürste","🪥"],["der","Regen","der","Schirm","der Regenschirm","☂️"],["die","Hand","der","Schuh","der Handschuh","🧤"],["die","Erde","die","Beere","die Erdbeere","🍓"],
 ["die","Schule","die","Tasche","die Schultasche","🎒"],["das","Kissen","der","Bezug","der Kissenbezug","🛏️"],["der","Bauch","das","Weh","das Bauchweh","🤕"],["das","Eis","der","Bär","der Eisbär","🐻‍❄️"]].filter(c=>c[1]!=="Kissen");
const WT=[["Nomen","Namenwort · noun"],["Verb","Tunwort · verb"],["Adjektiv","Wiewort · adjective"]];
UNITS.push(
{id:12,k:2,sec:"Grammatik",emo:"🏷️",de:"Nomen, Verb, Adjektiv",en:"Nouns, verbs, adjectives",blitz:true,
 say:["Wörter haben Familien. Nomen sind Namen: der Hund. Verben sagen, was man tut: laufen. Adjektive sagen, wie etwas ist: groß.","Words have families. Nouns are names: der Hund. Verbs say what you do: laufen. Adjectives say what something is like: groß."],
 merk:["Nomen: Wer oder was? Verb: Was tut man? Adjektiv: Wie ist es?","Noun: who or what? Verb: what do you do? Adjective: what is it like?"],
 ex:()=>[{vis:bigword("der Hund"),de:"Hund ist ein Nomen.",en:"Hund is a noun."},{vis:bigword("springen"),de:"springen ist ein Verb.",en:"springen is a verb."},{vis:bigword("lustig"),de:"lustig ist ein Adjektiv.",en:"lustig is an adjective."}],
 gen(){const t=R(0,2),w=t===0?(()=>{const n=pick(NOUNS);return [n[1],n[2],n[3]];})():pick(t===1?VERBEN:ADJ);
  if(Math.random()<.65){const opts=[t,...[0,1,2].filter(x=>x!==t)].map(i=>`${WT[i][0]}|${WT[i][1]}`);
   return {vis:big(w[1])+bigword(w[0]),de:`Welche Wortart ist „${w[0]}“?`,en:`What type of word is "${w[0]}" (${w[2]})?`,opts,stmt:eqs(a=>`${w[0]} ist ein ${a.split("|")[0]}.`,a=>`${w[0]} is a ${a.split("|")[1].split("· ")[1]}.`),mem:[w[0],WT[t][0]],
    why:W(big(w[1])+bigword(w[0]),t===0?`Man kann der, die oder das davor sagen. Darum ist ${w[0]} ein Nomen und wird groß geschrieben.`:t===1?`„${w[0]}“ ist etwas, das man tut: Ich kann ${w[0]}. Darum ist es ein Verb.`:`„${w[0]}“ sagt, wie etwas ist: Der Ball ist ${w[0]}. Darum ist es ein Adjektiv.`,
     t===0?`You can put der, die or das in front. So ${w[0]} is a noun and gets a capital letter.`:t===1?`"${w[0]}" is something you do (${w[2]}). So it is a verb.`:`"${w[0]}" says what something is like (${w[2]}). So it is an adjective.`,"wortart")};}
  const n=pick(NOUNS),v=pick(VERBEN),a=pick(ADJ),ask=R(0,2),words=[n[1],v[0],a[0]],c=words[ask];
  return {vis:"",de:`Welches Wort ist ein ${WT[ask][0]}?`,en:`Which word is a ${WT[ask][1].split("· ")[1]}?`,opts:[c,...words.filter(x=>x!==c)],stmt:eqs(x=>`${x} ist ein ${WT[ask][0]}.`,x=>`${x} is a ${WT[ask][1].split("· ")[1]}.`),
   why:W(bigword(`${n[1]} · ${v[0]} · ${a[0]}`),`${n[1]} ist ein Nomen (groß), ${v[0]} ist ein Verb, ${a[0]} ist ein Adjektiv.`,`${n[1]} is a noun (capital letter), ${v[0]} is a verb, ${a[0]} is an adjective.`,"wortart")};},
 parent:{method:"Klasse 2 introduces word types with their Latin names: Nomen (Namenwort), Verb (Tunwort), Adjektiv (Wiewort). Many classes colour-code them.",words:[["das Nomen","noun"],["das Verb","verb"],["das Adjektiv","adjective"],["die Wortart","word type"]],
  games:["Word detective: in a picture book, find 3 nouns, 3 verbs and 3 adjectives.","Charades: act out a verb, describe with an adjective."]}},

{id:13,k:2,sec:"Grammatik",emo:"👥",de:"Einzahl und Mehrzahl",en:"Singular and plural",blitz:true,
 say:["Ein Hund – viele Hunde. Das ist Einzahl und Mehrzahl. In der Mehrzahl sagen wir immer die.","One dog – many dogs. That is singular and plural. In the plural we always say die."],
 merk:["Viele? Dann heißt der Begleiter die!","Many? Then the article is die!"],
 ex:()=>[{vis:big("🐶 → 🐶🐶🐶"),de:"der Hund → die Hunde",en:"the dog → the dogs"},{vis:big("🐭 → 🐭🐭🐭"),de:"die Maus → die Mäuse",en:"the mouse → the mice"}],
 gen(){const p=pick(PLURAL);
  if(Math.random()<.7)return {vis:big(`${p[3]} → ${p[3].repeat(3)}`),de:`${p[0]} ${p[1]} → die ___`,en:`Plural of ${p[0]} ${p[1]}?`,opts:[p[2],...p[4]],stmt:eqs(a=>`${p[0]} ${p[1]} – die ${a}`),mem:[`${p[0]} ${p[1]}`,`die ${p[2]}`],
    why:W(big(p[3].repeat(3))+bigword(`die ${p[2]}`),`Die Mehrzahl von ${p[0]} ${p[1]} ist die ${p[2]}. Sprich beides laut: ${p[1]} – ${p[2]}.${/[äöü]/.test(p[2])&&!/[äöü]/.test(p[1])?" Hier wird der Selbstlaut zum Umlaut!":""}`,`The plural of ${p[1]} is ${p[2]}. Say both out loud.${/[äöü]/.test(p[2])&&!/[äöü]/.test(p[1])?" The vowel gets dots (umlaut)!":""}`,"plural")};
  const many=Math.random()<.5;return {vis:big(many?p[3].repeat(3):p[3]),de:`„${many?"die "+p[2]:p[0]+" "+p[1]}“ – Einzahl oder Mehrzahl?`,en:`"${many?"die "+p[2]:p[0]+" "+p[1]}" – singular or plural?`,opts:[many?"Mehrzahl|plural (many)":"Einzahl|singular (one)",many?"Einzahl|singular (one)":"Mehrzahl|plural (many)"],
   stmt:eqs(a=>`${many?"die "+p[2]:p[0]+" "+p[1]} ist ${a.split("|")[0]}.`),why:W(big(p[3])+bigword(`${p[0]} ${p[1]} → die ${p[2]}`),`${p[0]} ${p[1]} ist eins: Einzahl. die ${p[2]} sind viele: Mehrzahl.`,`${p[1]} is one: singular. ${p[2]} are many: plural.`,"plural")};},
 parent:{method:"German plurals have several endings (-e, -en, -er, -s, umlaut). Children learn them word by word, always with ‘die’.",words:[["die Einzahl","singular"],["die Mehrzahl","plural"],["der Umlaut","ä, ö, ü"]],games:["‘Ein … – viele …’ ping-pong game at dinner.","Count toys: one Ball, two Bälle."]}},

{id:14,k:2,sec:"Rechtschreibung",emo:"🔤",de:"ABC-Ordnung",en:"Alphabetical order",
 say:["Im Wörterbuch stehen die Wörter nach dem ABC. Wir schauen auf den ersten Buchstaben.","In a dictionary, words are in alphabetical order. We look at the first letter."],
 merk:["Erster Buchstabe gleich? Dann schau auf den zweiten!","Same first letter? Then look at the second one!"],
 ex:()=>[{vis:bigword("Affe · Ball · Hund"),de:"A kommt vor B, B kommt vor H.",en:"A comes before B, B comes before H."},{vis:bigword("Ball · Banane · Baum"),de:"Bal – Ban – Bau: l kommt vor n, n kommt vor u.",en:"Second letters differ, then the third."}],
 gen(){const same=Math.random()<.3;let ws;
  if(same){const groups={};NOUNS.forEach(n=>{const k=n[1].slice(0,1);(groups[k]=groups[k]||[]).push(n[1]);});const g=pick(Object.values(groups).filter(x=>x.length>=3&&new Set(x.map(w=>w[1])).size>=3));
   ws=[];for(const w of shuffle(g))if(!ws.some(x=>x[1]===w[1]))ws.push(w);ws=ws.slice(0,3);}
  else{ws=[];for(const n of shuffle(NOUNS))if(!ws.some(x=>x[0]===n[1][0]))ws.push(n[1]);ws=ws.slice(0,3);}
  const sorted=ws.slice().sort((a,b)=>a.localeCompare(b,"de")),first=Math.random()<.6,c=first?sorted[0]:sorted[2];
  return {vis:bigword(ws.join(" · ")),de:first?"Welches Wort kommt im ABC zuerst?":"Welches Wort kommt im ABC zuletzt?",en:first?"Which word comes first in the alphabet?":"Which word comes last in the alphabet?",opts:[c,...ws.filter(x=>x!==c)],
   stmt:eqs(a=>`${a} kommt im ABC ${first?"zuerst":"zuletzt"}.`,a=>`${a} comes ${first?"first":"last"}.`),mem:null,
   why:W(bigword(sorted.join(" → ")),same?`Alle fangen mit ${ws[0][0]} an. Darum schaust du auf den zweiten Buchstaben: ${sorted.map(w=>w[1]).join(", ")}. Die Reihenfolge: ${sorted.join(", ")}.`:`Schau auf die ersten Buchstaben: ${sorted.map(w=>w[0]).join(", ")}. Im ABC ist die Reihenfolge: ${sorted.join(", ")}.`,
    `Order: ${sorted.join(", ")}.`,"abc")};},
 parent:{method:"Klasse 2 starts working with a children's dictionary, so alphabetical order up to the second letter is practised.",words:[["das Alphabet / das ABC","alphabet"],["der Buchstabe","letter"],["das Wörterbuch","dictionary"]],games:["Sing the ABC song, then sort 5 toys by their German names.","Find words in a children's dictionary together."]}},

{id:15,k:2,sec:"Rechtschreibung",emo:"❓",de:"Satzzeichen . ? !",en:"Punctuation . ? !",blitz:true,
 say:["Am Satzende steht ein Zeichen. Punkt beim Erzählen, Fragezeichen bei einer Frage, Ausrufezeichen beim Rufen.","At the end of a sentence there is a mark. Full stop when telling, question mark when asking, exclamation mark when shouting."],
 merk:["Erzählen: Punkt. Fragen: Fragezeichen. Rufen: Ausrufezeichen!","Telling: full stop. Asking: question mark. Shouting: exclamation mark!"],
 ex:()=>[{vis:bigword("Wie heißt du?"),de:"Eine Frage: ?",en:"A question: ?"},{vis:bigword("Pass auf!"),de:"Ein Ruf: !",en:"A shout: !"}],
 gen(){const p=pick(PUNCT),name={".":"Punkt",
  "?":"Fragezeichen","!":"Ausrufezeichen"},en={".":"full stop","?":"question mark","!":"exclamation mark"};
  return {vis:bigword(`${p[0]} ___`),de:"Welches Zeichen kommt ans Ende?",en:`Which mark goes at the end? (${p[2].replace(/[.?!]$/,"")})`,opts:[p[1],...[".","?","!"].filter(x=>x!==p[1])].map(x=>`${x}|${name[x]} · ${en[x]}`),
   stmt:eqs(a=>`${p[0]}${a.split("|")[0]}`),mem:[p[0],p[1]],why:W(bigword(p[0]+p[1]),p[1]==="?"?`Das ist eine Frage – darum kommt ein Fragezeichen. Fragen fangen oft mit W an oder mit dem Verb: Wie, Wo, Was, Hast du …`:p[1]==="!"?`Hier ruft jemand oder sagt laut, was man tun soll – darum kommt ein Ausrufezeichen.`:`Hier erzählt jemand etwas – darum kommt ein Punkt.`,
    `That needs a ${en[p[1]]}.`,"punct")};},
 parent:{method:"Sentence types (Aussagesatz, Fragesatz, Ausrufesatz) and their punctuation are a Klasse 2 topic. Reading with the right voice (asking, shouting) helps.",words:[["der Punkt","full stop"],["das Fragezeichen","question mark"],["das Ausrufezeichen","exclamation mark"],["der Satz","sentence"]],games:["Say a sentence three ways: telling, asking, shouting. She shows . ? or ! on a card."]}},

{id:16,k:2,sec:"Rechtschreibung",emo:"🐝",de:"ie oder ei?",en:"ie or ei?",blitz:true,
 say:["Bei ie hören wir ein langes i, wie in Biene. Bei ei hören wir ai, wie in Ei.","In ie we hear a long ee, like Biene. In ei we hear ‘eye’, like Ei."],
 merk:["Die Biene summt ein langes i – das Ei sagt ai!","The bee hums a long ee – the egg says ‘eye’!"],
 ex:()=>[{vis:big("🐝")+bigword("Biene"),de:"Bi-e-ne: langes i → ie",en:"long ee → ie"},{vis:big("🥚")+bigword("Ei"),de:"Ei: ai → ei",en:"‘eye’ → ei"}],
 gen(){const w=pick(IEEI),i=w[0].toLowerCase().indexOf(w[1]),gap=w[0].slice(0,i)+"__"+w[0].slice(i+2);
  return {vis:big(w[2])+bigword(gap),de:`ie oder ei? ${gap}`,en:`ie or ei? ${gap}`,opts:[w[1],w[1]==="ie"?"ei":"ie"],stmt:eqs(a=>`${w[0].slice(0,i)}${a}${w[0].slice(i+2)}`),mem:[gap,w[1]],
   why:W(big(w[2])+bigword(w[0]),w[1]==="ie"?`Sprich langsam: ${w[0]}. Du hörst ein langes i – also schreibst du ie.`:`Sprich langsam: ${w[0]}. Du hörst ai – also schreibst du ei.`,w[1]==="ie"?`Say it slowly: ${w[0]}. You hear a long ee – so it's ie.`:`Say it slowly: ${w[0]}. You hear ‘eye’ – so it's ei.`,"ieei")};},
 parent:{method:"ie/ei is the classic early spelling trap — especially for English speakers, where the sounds feel reversed. Listening for the long ‘ee’ is the key.",words:[["das lange i","long ee sound"],["der Zwielaut ei","the ‘eye’ sound"],["die Biene","bee"]],games:["Sort word cards into an ie-bee jar and an ei-egg box.","Spot ie and ei words on signs while walking."]}},

{id:17,k:2,sec:"Grammatik",emo:"🧩",de:"Zusammengesetzte Nomen",en:"Compound nouns",
 say:["Aus zwei Nomen wird ein neues Wort: Schnee und Mann – der Schneemann. Der Begleiter kommt vom letzten Wort.","Two nouns make a new word: Schnee and Mann – der Schneemann. The article comes from the last word."],
 merk:["Das letzte Wort bestimmt den Begleiter!","The last word decides the article!"],
 ex:()=>[{vis:big("⛄")+bigword("der Schnee + der Mann"),de:"der Schneemann",en:"the snowman"},{vis:big("🌻")+bigword("die Sonne + die Blume"),de:"die Sonnenblume",en:"the sunflower"}],
 gen(){const c=pick(COMPOUND),[art,word]=c[4].split(" ");
  if(Math.random()<.55){const wrong1=c[3]+c[1].toLowerCase(),wrong2=c[1]+"-"+c[3];
   return {vis:big(c[5])+bigword(`${c[1]} + ${c[3]}`),de:`${c[1]} + ${c[3]} = ?`,en:`${c[1]} + ${c[3]} = ?`,opts:[word,wrong1,wrong2],stmt:eqs(a=>`${c[1]} und ${c[3]} ergibt ${a}.`),mem:[`${c[1]} + ${c[3]}`,word],
    why:W(big(c[5])+bigword(`${c[1]} + ${c[3]} = ${word}`),`Zuerst ${c[1]}, dann ${c[3]} – zusammen ein Wort: ${word}. Nur der Anfang wird groß geschrieben.`,`First ${c[1]}, then ${c[3]} – together one word: ${word}.`,"compound")};}
  return {vis:big(c[5])+bigword(`${c[1]} + ${c[3]}`),de:`der, die oder das? ___ ${word}`,en:`Which article? ___ ${word}`,opts:[art,...["der","die","das"].filter(x=>x!==art)],stmt:eqs(a=>`${a} ${word}`),mem:[word,art],
   why:W(big(c[5])+bigword(`${c[2]} ${c[3]} → ${art} ${word}`),`Das letzte Wort ist ${c[2]} ${c[3]}. Darum heißt es ${art} ${word} – auch wenn das erste Wort ${c[0]} ${c[1]} ist.`,`The last word is ${c[2]} ${c[3]}. So it is ${art} ${word}.`,"compound")};},
 parent:{method:"German builds long nouns from short ones. The article always comes from the last part (das Haus + die Tür = die Haustür).",words:[["zusammengesetzt","put together"],["das Grundwort","the last (main) word"],["das Bestimmungswort","the first word"]],games:["Build silly compound words together (Bananenauto!) and find the article.","Spot long nouns on packaging and split them."]}}
);
