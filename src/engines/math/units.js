/* ============================ CONTENT ============================ */
const SECTIONS={Zahlen:{c:"#2F5BEA",l:"#DCE5FF"},Rechnen:{c:"#E0443E",l:"#FDE2E1"},Muster:{c:"#7C4DDB",l:"#ECE4FC"},Größen:{c:"#D97A06",l:"#FDEBCD"},
  Geometrie:{c:"#1F9D63",l:"#D9F4E6"},Mal:{c:"#D6397E",l:"#FCE1EE"},Sachaufgaben:{c:"#0E9488",l:"#D2F3EF"},Mix:{c:"#B7791F",l:"#FBF0D5"}};
const ONES_DE=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn"];
const TENS_DE=["","zehn","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"];
const ONES_EN=["zero","one","two","three","four","five","six","seven","eight","nine"],TENS_EN=["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function wordDe(n){if(n<20)return ONES_DE[n];if(n===100)return "hundert";const t=Math.floor(n/10),o=n%10;return o?(o===1?"ein":ONES_DE[o])+"und"+TENS_DE[t]:TENS_DE[t];}
/* number options: first is correct */
function nopts(c,cands=[],min=0,max=100,suffix=""){const s=[c];for(const x of shuffle(cands))if(x>=min&&x<=max&&!s.includes(x)&&s.length<3)s.push(x);
  let d=1;while(s.length<3&&d<50){for(const x of [c+d,c-d])if(x>=min&&x<=max&&!s.includes(x)&&s.length<3)s.push(x);d++;}return s.map(x=>x+suffix);}
function sopts(c,cands){const s=[c];for(const x of shuffle(cands))if(!s.includes(x)&&s.length<3)s.push(x);return s;}
const eqs=(de,en)=>a=>({de:de(a),en:en?en(a):de(a)});
const cnt=(a,b)=>{const r=[];for(let i=a;i<=b;i++)r.push(i);return r;};

const RULE={
 count:["Zählen","Counting","Jedes Ding zählen wir genau einmal. Die letzte Zahl sagt, wie viele es sind.","We count each thing exactly once. The last number we say tells us how many there are."],
 cmp:["Größer, kleiner, gleich","Greater, less, equal","> heißt „ist größer als“. < heißt „ist kleiner als“. = heißt „ist gleich“. Die offene Seite zeigt zur größeren Zahl.","> means “is greater than”. < means “is less than”. = means “equals”. The open side faces the bigger number."],
 neigh:["Nachbarzahlen","Neighbour numbers","Der Vorgänger ist 1 weniger. Der Nachfolger ist 1 mehr. Beispiel: 6 – 7 – 8.","The number before is 1 less. The number after is 1 more. Example: 6 – 7 – 8."],
 split:["Zahlen zerlegen","Splitting numbers","Jede Zahl kann man in zwei Teile zerlegen: 7 = 1 + 6 = 2 + 5 = 3 + 4.","Every number can be split into two parts: 7 = 1 + 6 = 2 + 5 = 3 + 4."],
 add:["Addition: Plus","Addition: plus","Plus heißt dazutun. Das Ergebnis heißt Summe. Tipp: Starte mit der größeren Zahl und zähle weiter.","Plus means adding more. The answer is the sum. Tip: start with the bigger number and count on."],
 sub:["Subtraktion: Minus","Subtraction: minus","Minus heißt wegnehmen. Das Ergebnis heißt Differenz. Tipp: Zähle rückwärts oder streiche durch.","Minus means taking away. The answer is the difference. Tip: count back or cross out."],
 ten:["Verliebte Zahlen","Number friends of 10","Diese Paare ergeben zusammen 10: 1 + 9, 2 + 8, 3 + 7, 4 + 6, 5 + 5.","These pairs make 10 together: 1 + 9, 2 + 8, 3 + 7, 4 + 6, 5 + 5."],
 swap:["Tauschaufgabe","Swap rule","Bei Plus darf man die Zahlen tauschen: 3 + 5 = 5 + 3. Bei Minus darf man nicht tauschen!","With plus you may swap the numbers: 3 + 5 = 5 + 3. With minus you may not!"],
 rev:["Umkehraufgabe","Reverse sum","Plus und Minus gehören zusammen: 8 − 3 = 5, also 5 + 3 = 8. So kann man Minus prüfen.","Plus and minus belong together: 8 − 3 = 5, so 5 + 3 = 8. That is how you check a minus sum."],
 pv20:["Zehner und Einer","Tens and ones","Zahlen ab 10 haben Zehner (Z) und Einer (E): 14 = 1 Z 4 E = 10 + 4.","Numbers from 10 have tens and ones: 14 = 1 ten and 4 ones = 10 + 4."],
 cross:["Zehnerübergang","Crossing ten","Rechne erst bis zur 10, dann weiter. Zerlege dafür die zweite Zahl: 8 + 5 = 8 + 2 + 3 = 13.","First go up to 10, then go on. Split the second number: 8 + 5 = 8 + 2 + 3 = 13."],
 dbl:["Verdoppeln und Halbieren","Doubling and halving","Verdoppeln: die Zahl plus dieselbe Zahl, 6 + 6 = 12. Halbieren: in zwei gleiche Teile teilen, 12 = 6 + 6.","Doubling: the number plus the same number, 6 + 6 = 12. Halving: split into two equal parts, 12 = 6 + 6."],
 wall:["Rechenmauer","Number wall","Zwei Steine nebeneinander ergeben zusammen den Stein darüber. Fehlt unten ein Stein, rechnet man minus.","Two bricks side by side add up to the brick above. If a bottom brick is missing, use minus."],
 pat:["Zahlenfolgen und Muster","Patterns","Finde die Regel: Was passiert von einem zum nächsten? Dann mach genauso weiter.","Find the rule: what happens from one to the next? Then carry on the same way."],
 money:["Geld: Euro und Cent","Money: euros and cents","1 € = 100 ct. Zähle zuerst die Scheine, dann die großen Münzen, dann die kleinen.","1 € = 100 cents. Count the notes first, then the big coins, then the small coins."],
 shapes:["Formen","Shapes","Kreis: keine Ecke. Dreieck: 3 Ecken. Quadrat: 4 Ecken und 4 gleich lange Seiten. Rechteck: 4 Ecken, 2 lange und 2 kurze Seiten.","Circle: no corners. Triangle: 3 corners. Square: 4 corners and 4 equal sides. Rectangle: 4 corners, 2 long and 2 short sides."],
 lage:["Links, rechts, oben, unten","Left, right, above, below","Linke Hand hoch: Daumen und Zeigefinger machen ein L. L wie links!","Hold up your left hand: thumb and first finger make an L. L for left, in German links!"],
 clock:["Die Uhr","The clock","Der kurze Zeiger zeigt die Stunde, der lange Zeiger die Minuten. Langer Zeiger auf der 12: volle Stunde. Langer Zeiger auf der 6: halb. Halb 4 ist 3:30.","The short hand shows the hour, the long hand the minutes. Long hand on 12: o'clock. Long hand on 6: half past. In German, halb 4 means 3:30."],
 pv100:["Zahlen bis 100","Numbers to 100","47 = 4 Zehner und 7 Einer = 40 + 7. Wir schreiben die Zehner zuerst, aber wir sprechen die Einer zuerst: sieben-und-vierzig.","47 = 4 tens and 7 ones = 40 + 7. We write the tens first, but German says the ones first: sieben-und-vierzig, seven-and-forty."],
 step:["Schrittweise rechnen","Step by step","Erst die Zehner, dann die Einer: 34 + 25 = 34 + 20 + 5 = 59.","Tens first, then ones: 34 + 25 = 34 + 20 + 5 = 59."],
 mult:["Malnehmen: Multiplikation","Multiplication","3 · 4 heißt 3 mal die 4: 4 + 4 + 4 = 12. Tauschaufgabe: 3 · 4 = 4 · 3.","3 · 4 means 3 times 4: 4 + 4 + 4 = 12. Swap rule: 3 · 4 = 4 · 3."],
 div:["Geteilt: Division","Division","Geteilt heißt gerecht verteilen. 12 : 3 = 4, denn 3 · 4 = 12.","Divided means sharing fairly. 12 : 3 = 4, because 3 · 4 = 12."],
 word:["Sachaufgaben","Word problems","Lies genau. Finde die Frage. Schreibe die Rechnung. Antworte mit einem Satz.","Read carefully. Find the question. Write the sum. Answer with a sentence."]
};
const W=(look,de,en,rule)=>({look,de,en,rule:RULE[rule]});
const eqline=t=>`<div class="eqline">${esc(t)}</div>`;
const pair=(a,b)=>`<div class="cmp2">${a}${b}</div>`;

const UNITS=[
/* ---------------- KLASSE 1 ---------------- */
{id:0,k:1,sec:"Zahlen",emo:"🖐️",de:"Zählen bis 10",en:"Counting to 10",blitz:true,
 say:["Wir zählen jedes Ding genau einmal. Die letzte Zahl sagt, wie viele es sind.","We count each thing exactly once. The last number tells us how many there are."],
 merk:["Ich zeige mit dem Finger und zähle laut: 1, 2, 3!","I point with my finger and count out loud: 1, 2, 3!"],
 ex:()=>[{vis:objs(4,"🍎"),de:"Vier Äpfel",en:"four apples"},{vis:dice(5),de:"Fünf Punkte",en:"five dots"},{vis:field(fill([7,"r"])),de:"Sieben Plättchen",en:"seven counters"}],
 gen(){const t=pick(["obj","dice","field"]);let n,vis,de,en,e="🔴";
  if(t==="dice"){n=R(1,6);vis=dice(n);de="Wie viele Punkte hat der Würfel?";en="How many dots are on the dice?";}
  else if(t==="obj"){n=R(1,10);e=pick(["🍎","⭐","🦆","🌸","🚗","🐞"]);vis=objs(n,e);de="Wie viele sind es? Zähle!";en="How many are there? Count!";}
  else{n=R(1,10);vis=field(fill([n,"r"]));de="Wie viele rote Plättchen siehst du?";en="How many red counters can you see?";}
  return {vis,de,en,opts:nopts(n,[n+1,n-1,n+2],1,10),stmt:eqs(a=>`Es sind ${a}.`,a=>`There are ${a}.`),mem:n<=6?[e.repeat(n),String(n)]:null,
   why:W(numberedObjs(n,e),`Zeig mit dem Finger auf jedes Ding und zähle laut: ${cnt(1,n).join(", ")}. Die letzte Zahl ist ${n}. Es sind ${n}!${n>5&&t==="field"?" Tipp: Eine volle Reihe sind 5. Dann zählst du weiter.":""}`,
     `Point at each thing and count out loud: ${cnt(1,n).join(", ")}. The last number is ${n}. There are ${n}!${n>5&&t==="field"?" Tip: one full row is 5. Then count on.":""}`,"count")};},
 parent:{method:"German classes practise ‘Blitzblick’ (quick look): recognising amounts on dice, fingers and the Zehnerfeld (2 rows of 5) without counting one by one. Grouping by 5 is the key idea for everything later.",
  words:[["zählen","to count"],["Wie viele?","How many?"],["das Plättchen","counter (red/blue disc)"],["der Würfel","dice"],["das Zehnerfeld","ten-frame (2 rows of 5)"]],
  games:["Show fingers for 1 second; she says how many (Blitzblick).","Roll a dice at dinner: she says the number before counting the dots."]}},

{id:1,k:1,sec:"Zahlen",emo:"🐊",de:"Größer, kleiner, gleich",en:"Greater, less, equal",
 say:["Das Krokodil frisst immer die größere Zahl. Sein Maul geht zur größeren Zahl auf.","The crocodile always eats the bigger number. Its mouth opens towards the bigger number."],
 merk:["Das Krokodil 🐊 frisst immer die größere Zahl!","The crocodile always eats the bigger number!"],
 ex:()=>[{vis:eqline("7 > 4"),de:"7 ist größer als 4.",en:"7 is greater than 4."},{vis:eqline("3 < 8"),de:"3 ist kleiner als 8.",en:"3 is less than 8."},{vis:eqline("5 = 5"),de:"5 ist gleich 5.",en:"5 equals 5."}],
 gen(){if(Math.random()<.65){let a=R(0,10),b=Math.random()<.2?a:R(0,10);const sym=a>b?">":a<b?"<":"=";
   const big=Math.max(a,b);
   return {vis:pair(`<div>${objs(a,"🔵")||"–"}<b>${a}</b></div>`,`<div>${objs(b,"🔵")||"–"}<b>${b}</b></div>`),de:`Was passt? ${a} ◻ ${b}`,en:`Which sign fits? ${a} ◻ ${b}`,
    opts:sopts(sym,[">","<","="]).map(s=>s+"|"+{">":"größer · greater","<":"kleiner · less","=":"gleich · equal"}[s]),stmt:eqs(x=>`${a} ${x.split("|")[0]} ${b}`),
    why:W(pair(`<div>${objs(a,"🔵")||"–"}<b>${a}</b></div>`,`<div>${objs(b,"🔵")||"–"}<b>${b}</b></div>`)+eqline(`${a} ${sym} ${b}`),
     sym==="="?`Beide sind gleich viel: ${a} und ${b}. Dann schreiben wir das Gleichheitszeichen: ${a} = ${b}.`:`${big} ist mehr. Das Krokodil 🐊 will die größere Zahl fressen. Sein Maul geht zur ${big} auf: ${a} ${sym} ${b}.`,
     sym==="="?`Both are the same: ${a} and ${b}. So we write the equals sign: ${a} = ${b}.`:`${big} is more. The crocodile wants to eat the bigger number. Its mouth opens towards ${big}: ${a} ${sym} ${b}.`,"cmp")};}
  const a=R(0,20);let b=R(0,20);while(b===a)b=R(0,20);const g=Math.random()<.5;const c=g?Math.max(a,b):Math.min(a,b);
  return {vis:nline(0,20,{hi:[a,b]}),de:g?`Welche Zahl ist größer: ${a} oder ${b}?`:`Welche Zahl ist kleiner: ${a} oder ${b}?`,en:g?`Which number is greater: ${a} or ${b}?`:`Which number is smaller: ${a} or ${b}?`,
   opts:[String(c),String(c===a?b:a)],stmt:eqs(x=>`${x} ist ${g?"größer":"kleiner"}.`,x=>`${x} is ${g?"greater":"smaller"}.`),mem:null,
   why:W(nline(0,20,{hi:[a,b]}),`Auf dem Zahlenstrahl stehen die größeren Zahlen weiter rechts. ${Math.max(a,b)} ist weiter rechts, also größer.`,`On the number line, bigger numbers are further to the right. ${Math.max(a,b)} is further right, so it is greater.`,"cmp")};},
 parent:{method:"Children learn the signs with the crocodile (Krokodil) whose open mouth faces the bigger number. They compare amounts first, then numbers on the number line (Zahlenstrahl).",
  words:[["größer als","greater than"],["kleiner als","less than"],["gleich","equal"],["mehr / weniger","more / fewer"],["der Zahlenstrahl","number line"]],
  games:["Make a crocodile with your arm; she ‘eats’ the bigger handful of sweets.","Compare two dice: who has more?"]}},

{id:2,k:1,sec:"Zahlen",emo:"🏘️",de:"Nachbarzahlen",en:"Neighbour numbers",blitz:true,
 say:["Jede Zahl hat zwei Nachbarn: davor eine Zahl weniger, danach eine Zahl mehr.","Every number has two neighbours: before it, one less, after it, one more."],
 merk:["Vorgänger: 1 weniger. Nachfolger: 1 mehr.","Before: 1 less. After: 1 more."],
 ex:()=>[{vis:nline(0,20,{hi:[7],q:[6,8]}),de:"Die Nachbarn von 7 sind 6 und 8.",en:"The neighbours of 7 are 6 and 8."},{vis:seqVis([12,13,14]),de:"12 kommt vor 13. 14 kommt nach 13.",en:"12 comes before 13. 14 comes after 13."}],
 gen(){const n=R(1,19),before=Math.random()<.5,a=before?n-1:n+1;
  return {vis:nline(0,20,{hi:[n],q:[a]}),de:before?`Welche Zahl kommt vor der ${n}?`:`Welche Zahl kommt nach der ${n}?`,en:before?`Which number comes before ${n}?`:`Which number comes after ${n}?`,
   opts:nopts(a,[n,before?n+1:n-1,a+(before?-1:1)],0,20),stmt:eqs(x=>before?`${x} kommt vor der ${n}.`:`${x} kommt nach der ${n}.`,x=>before?`${x} comes before ${n}.`:`${x} comes after ${n}.`),
   mem:[`${before?"vor":"nach"} ${n}`,String(a)],
   why:W(nline(0,20,{hi:[n],jumps:[[n,a,before?"−1":"+1"]]}),before?`Geh auf dem Zahlenstrahl einen Schritt zurück: ${n} − 1 = ${a}. Die ${a} ist der Vorgänger.`:`Geh auf dem Zahlenstrahl einen Schritt weiter: ${n} + 1 = ${a}. Die ${a} ist der Nachfolger.`,
     before?`Go one step back on the number line: ${n} − 1 = ${a}. ${a} is the number before.`:`Go one step forward on the number line: ${n} + 1 = ${a}. ${a} is the number after.`,"neigh")};},
 parent:{method:"‘Vorgänger’ (the number before) and ‘Nachfolger’ (the number after) are practised on the Zahlenstrahl. This builds counting forwards and backwards from any number.",
  words:[["der Vorgänger","the number before"],["der Nachfolger","the number after"],["die Nachbarzahlen","neighbour numbers"],["vorwärts / rückwärts zählen","count forwards / backwards"]],
  games:["On the stairs: ‘We are on step 7. Which step is before?’","Count backwards from 20 while she jumps (gymnastics countdown)."]}},

{id:3,k:1,sec:"Rechnen",emo:"🏠",de:"Zahlenhaus",en:"Number houses",blitz:true,
 say:["Im Zahlenhaus steht oben auf dem Dach eine Zahl. Unten wohnen immer zwei Zahlen, die zusammen die Dachzahl ergeben.","The number house has a number on its roof. Each floor has two numbers that together make the roof number."],
 merk:["Zwei Zahlen zusammen ergeben die Dachzahl.","Two numbers together make the roof number."],
 ex:()=>[{vis:house(5,[[0,5],[1,4],[2,3]]),de:"5 = 1 + 4 = 2 + 3",en:"5 = 1 + 4 = 2 + 3"},{vis:field(fill([3,"r"],[4,"b"])),de:"3 rote und 4 blaue sind 7.",en:"3 red and 4 blue make 7."}],
 gen(){const r=R(3,10),a=R(0,r),b=r-a,left=Math.random()<.5,ans=left?b:a,known=left?a:b;
  return {vis:house(r,[left?[a,"?"]:["?",b]]),de:"Welche Zahl fehlt im Zahlenhaus?",en:"Which number is missing in the number house?",
   opts:nopts(ans,[r,ans+1,ans-1,known],0,10),stmt:eqs(x=>`${known} und ${x} sind zusammen ${r}.`,x=>`${known} and ${x} make ${r} together.`),mem:[`${r} = ${known} + ?`,String(ans)],
   why:W(field(fill([known,"r"],[ans,"b"]))+eqline(`${known} + ${ans} = ${r}`),`Auf dem Dach steht ${r}. Im Haus wohnt schon die ${known}. Bis ${r} fehlen noch ${ans}. Zähle von ${known} weiter bis ${r}: ${ans} Schritte.`,
     `The roof says ${r}. The ${known} already lives in the house. To get to ${r}, ${ans} are still missing. Count on from ${known} to ${r}: ${ans} steps.`,"split")};},
 parent:{method:"The Zahlenhaus is THE classic German Klasse 1 tool for splitting numbers (Zahlzerlegung). Knowing all splits of 10 by heart makes crossing ten easy later.",
  words:[["das Zahlenhaus","number house"],["die Dachzahl","roof number"],["zerlegen","to split"],["die Zerlegung","splitting / decomposition"],["die Schüttelbox","shake box (counters in a box with a divider)"]],
  games:["Hide some of 7 buttons under a cup: ‘7 altogether, I see 3, how many are hiding?’","Draw a number house on paper and fill all floors together."]}},

{id:4,k:1,sec:"Rechnen",emo:"➕",de:"Plus bis 10",en:"Adding to 10",blitz:true,
 say:["Plus heißt: Es kommt etwas dazu. Starte mit der größeren Zahl und zähle weiter.","Plus means something is added. Start with the bigger number and count on."],
 merk:["Plus heißt dazu! Große Zahl zuerst, dann weiterzählen.","Plus means more! Big number first, then count on."],
 ex:()=>[{vis:field(fill([3,"r"],[2,"b"])),de:"3 + 2 = 5",en:"3 plus 2 equals 5"},{vis:nline(0,10,{hi:[6],jumps:[[6,9,"+3"]]}),de:"6 + 3 = 9",en:"6 plus 3 equals 9"}],
 gen(){const ph=Math.random()<.3;let a=R(0,9),b=R(0,10-a);if(a+b===0)b=1;const s=a+b,big=Math.max(a,b),small=Math.min(a,b);
  if(ph)return {vis:field(fill([a,"r"],[b,"q"])),de:`${a} + ? = ${s}`,en:`${a} plus what makes ${s}?`,opts:nopts(b,[s,b+1,b-1],0,10),stmt:eqs(x=>`${a} + ${x} = ${s}`),mem:[`${a} + ? = ${s}`,String(b)],
   why:W(field(fill([a,"r"],[b,"b"]))+eqline(`${a} + ${b} = ${s}`),`Du hast ${a}. Wie viele fehlen bis ${s}? Zähle weiter: ${cnt(a+1,s).join(", ")||"keine"}. Das sind ${b}.`,`You have ${a}. How many are missing to make ${s}? Count on: ${cnt(a+1,s).join(", ")||"none"}. That is ${b}.`,"add")};
  return {vis:field(fill([a,"r"],[b,"b"])),de:`${a} + ${b} = ?`,en:`What is ${a} plus ${b}?`,opts:nopts(s,[s+1,s-1,s+2,big],0,10),stmt:eqs(x=>`${a} + ${b} = ${x}`),mem:[`${a} + ${b}`,String(s)],
   why:W(field(fill([a,"r"],[b,"b"]))+nline(0,10,{hi:[big],jumps:small?[[big,s,"+"+small]]:[]}),small?`Starte bei der größeren Zahl, der ${big}. Zähle ${small} weiter: ${cnt(big+1,s).join(", ")}. Du bist bei ${s}!`:`Plus 0 heißt: Es kommt nichts dazu. Es bleibt ${s}.`,
     small?`Start at the bigger number, ${big}. Count on ${small}: ${cnt(big+1,s).join(", ")}. You are at ${s}!`:`Plus 0 means nothing is added. It stays ${s}.`,"add")};},
 parent:{method:"Addition starts with real objects and red/blue counters in the Zehnerfeld, then moves to ‘Weiterzählen’ (counting on from the bigger number) and the number line. ‘Platzhalteraufgaben’ (3 + ? = 8) appear early.",
  words:[["plus / addieren","plus / to add"],["die Plusaufgabe","addition sum"],["das Ergebnis","the answer"],["weiterzählen","count on"],["die Platzhalteraufgabe","missing-number sum"]],
  games:["Two dice: add them (Würfelrechnen).","Gymnastics jumps: 4 jumps, then 3 more — how many altogether?"]}},

{id:5,k:1,sec:"Rechnen",emo:"➖",de:"Minus bis 10",en:"Taking away to 10",blitz:true,
 say:["Minus heißt: Etwas geht weg. Streiche durch und zähle, was übrig bleibt.","Minus means something goes away. Cross out and count what is left."],
 merk:["Minus heißt weg!","Minus means take away!"],
 ex:()=>[{vis:field(fill([5,"r"],[3,"x"])),de:"8 − 3 = 5",en:"8 minus 3 equals 5"},{vis:nline(0,10,{hi:[7],jumps:[[7,5,"−2"]]}),de:"7 − 2 = 5",en:"7 minus 2 equals 5"}],
 gen(){const a=R(1,10),b=R(0,a),d=a-b,ph=Math.random()<.25;
  if(ph)return {vis:field(fill([d,"r"],[b,"q"])),de:`${a} − ? = ${d}`,en:`${a} minus what leaves ${d}?`,opts:nopts(b,[d,b+1,b-1],0,10),stmt:eqs(x=>`${a} − ${x} = ${d}`),mem:[`${a} − ? = ${d}`,String(b)],
   why:W(field(fill([d,"r"],[b,"x"]))+eqline(`${a} − ${b} = ${d}`),`Du hattest ${a}. Jetzt sind nur noch ${d} da. ${b} sind weggegangen.`,`You had ${a}. Now only ${d} are left. ${b} went away.`,"sub")};
  return {vis:field(fill([d,"r"],[b,"x"])),de:`${a} − ${b} = ?`,en:`What is ${a} minus ${b}?`,opts:nopts(d,[d+1,d-1,a+b,b],0,10),stmt:eqs(x=>`${a} − ${b} = ${x}`),mem:[`${a} − ${b}`,String(d)],
   why:W(field(fill([d,"r"],[b,"x"]))+nline(0,10,{hi:[a],jumps:b?[[a,d,"−"+b]]:[]}),b?`Du hast ${a}. ${b} gehen weg, die sind durchgestrichen. Zähle die übrigen: ${d}. Oder zähle rückwärts: ${cnt(d,a-1).reverse().join(", ")}.`:`Minus 0 heißt: Nichts geht weg. Es bleiben ${a}.`,
     b?`You have ${a}. ${b} go away, they are crossed out. Count the ones left: ${d}. Or count back: ${cnt(d,a-1).reverse().join(", ")}.`:`Minus 0 means nothing goes away. ${a} are left.`,"sub")};},
 parent:{method:"Subtraction is taught as ‘wegnehmen’ (taking away, crossing out counters) and as counting back on the number line. Every minus sum has a plus ‘Umkehraufgabe’ to check it.",
  words:[["minus / subtrahieren","minus / to subtract"],["wegnehmen","take away"],["durchstreichen","cross out"],["rückwärts zählen","count back"],["übrig","left over"]],
  games:["10 grapes: she eats 3. How many are left? (Then say it as a sum.)","Ten skittles: knock some over, write the minus sum."]}},

{id:6,k:1,sec:"Rechnen",emo:"💕",de:"Verliebte Zahlen",en:"Number friends of 10",blitz:true,
 say:["Verliebte Zahlen sind Paare, die zusammen genau 10 ergeben. Sie füllen das Zehnerfeld genau voll.","Number friends are pairs that make exactly 10. Together they fill the ten-frame."],
 merk:["1 und 9, 2 und 8, 3 und 7, 4 und 6, 5 und 5 – verliebt!","1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5 – friends!"],
 ex:()=>[{vis:field(fill([7,"r"],[3,"b"])),de:"7 und 3 sind verliebt: 7 + 3 = 10.",en:"7 and 3 are friends: 7 + 3 = 10."},{vis:field(fill([4,"r"],[6,"b"])),de:"4 + 6 = 10",en:"4 plus 6 equals 10"}],
 gen(){const n=R(1,9),m=10-n,rev=Math.random()<.3;
  return {vis:field(fill([n,"r"],[m,"q"])),de:rev?`10 − ${n} = ?`:`Wer ist in die ${n} verliebt? ${n} + ? = 10`,en:rev?`What is 10 minus ${n}?`:`Which number goes with ${n} to make 10?`,
   opts:nopts(m,[n,m+1,m-1],0,10),stmt:eqs(x=>rev?`10 − ${n} = ${x}`:`${n} + ${x} = 10`),mem:[`${n} ❤️ ?`,String(m)],
   why:W(field(fill([n,"r"],[m,"b"]))+`<div class="hearts">1❤️9 · 2❤️8 · 3❤️7 · 4❤️6 · 5❤️5</div>`,`Im Zehnerfeld sind ${n} rote Plättchen. Die leeren Plätze sind ${m}. ${n} und ${m} sind verliebt: Zusammen sind sie 10!`,
     `There are ${n} red counters in the ten-frame. The empty places are ${m}. ${n} and ${m} are friends: together they make 10!`,"ten")};},
 parent:{method:"‘Verliebte Zahlen’ (numbers in love) or ‘Zehnerfreunde’ are the pairs that make 10. They must become automatic, because crossing ten (8 + 5) depends on them.",
  words:[["verliebte Zahlen","number pairs that make 10"],["die Zehnerfreunde","ten-friends"],["ergänzen","to complete / make up to"],["das Zehnerfeld","ten-frame"]],
  games:["Ten fingers: hold up some, she says how many are down.","Clap game: you say 3, she says 7 — as fast as possible."]}},

{id:7,k:1,sec:"Rechnen",emo:"🔄",de:"Tausch- und Umkehraufgaben",en:"Swap and reverse sums",
 say:["Bei Plus darf man tauschen: 3 + 5 ist gleich 5 + 3. Und jede Minusaufgabe hat eine Plusaufgabe als Umkehraufgabe.","With plus you may swap: 3 + 5 equals 5 + 3. And every minus sum has a reverse plus sum."],
 merk:["Plus darf tauschen. Plus und Minus sind eine Familie!","Plus may swap. Plus and minus are one family!"],
 ex:()=>[{vis:pair(field(fill([3,"r"],[5,"b"])),field(fill([5,"b"],[3,"r"]))),de:"3 + 5 = 5 + 3 = 8",en:"3 + 5 = 5 + 3 = 8"},{vis:eqline("8 − 3 = 5  →  5 + 3 = 8"),de:"Umkehraufgabe",en:"reverse sum"}],
 gen(){let a=R(1,8),b=R(1,9-a);if(a===b)b=a===1?2:a-1;const s=a+b;
  if(Math.random()<.5)return {vis:field(fill([a,"r"],[b,"b"])),de:`Was ist die Tauschaufgabe von ${a} + ${b}?`,en:`What is the swap sum of ${a} + ${b}?`,
   opts:sopts(`${b} + ${a}`,[`${a} + ${a}`,`${b} + ${b}`,a>=b?`${a} − ${b}`:`${b} − ${a}`]),stmt:eqs(x=>`${a} + ${b} = ${x} = ${s}`),mem:[`${a} + ${b}`,`${b} + ${a}`],
   why:W(pair(field(fill([a,"r"],[b,"b"])),field(fill([b,"b"],[a,"r"]))),`Bei Plus darfst du tauschen! ${a} + ${b} und ${b} + ${a} sind beide ${s}. Dreh das Zehnerfeld einfach um.`,`With plus you may swap! ${a} + ${b} and ${b} + ${a} are both ${s}. Just turn the ten-frame around.`,"swap")};
  return {vis:eqline(`${s} − ${b} = ${a}`),de:`Was ist die Umkehraufgabe von ${s} − ${b} = ${a}?`,en:`What is the reverse sum of ${s} − ${b} = ${a}?`,
   opts:sopts(`${a} + ${b} = ${s}`,[`${s} + ${b} = ${s+b}`,a>=b?`${a} − ${b} = ${a-b}`:`${b} − ${a} = ${b-a}`]),stmt:eqs(x=>`${x} prüft ${s} − ${b} = ${a}.`,x=>`${x} checks ${s} − ${b} = ${a}.`),mem:null,
   why:W(field(fill([a,"r"],[b,"x"]))+eqline(`${s} − ${b} = ${a}   ↔   ${a} + ${b} = ${s}`),`Minus nimmt ${b} weg, Plus tut die ${b} wieder dazu. ${s} − ${b} = ${a}, also ist ${a} + ${b} = ${s}. So prüfst du Minus mit Plus!`,
     `Minus takes ${b} away, plus puts the ${b} back. ${s} − ${b} = ${a}, so ${a} + ${b} = ${s}. That is how you check minus with plus!`,"rev")};},
 parent:{method:"‘Tauschaufgaben’ (commutative pairs) halve the facts to learn. ‘Umkehraufgaben’ link minus to plus; the four sums 3+5, 5+3, 8−3, 8−5 form an ‘Aufgabenfamilie’ (fact family).",
  words:[["die Tauschaufgabe","swapped sum (3+5 → 5+3)"],["die Umkehraufgabe","reverse sum (8−3 → 5+3)"],["die Aufgabenfamilie","fact family"],["prüfen","to check"]],
  games:["Build 3 red + 5 blue Lego, turn it round: still 8!","Give her one sum, she writes the whole family of four."]}},

{id:8,k:1,sec:"Zahlen",emo:"🔟",de:"Zahlen bis 20",en:"Numbers to 20",blitz:true,
 say:["Eine volle Reihe im Zwanzigerfeld ist ein Zehner. Die übrigen sind Einer. 14 ist 1 Zehner und 4 Einer.","A full row in the twenty-frame is one ten. The rest are ones. 14 is 1 ten and 4 ones."],
 merk:["Erst der Zehner, dann die Einer: 10 + 4 = 14.","Ten first, then the ones: 10 + 4 = 14."],
 ex:()=>[{vis:field(fill([14,"r"]),20),de:"14 = 10 + 4",en:"14 = 10 + 4"},{vis:tensOnes(1,6),de:"1 Zehner und 6 Einer sind 16.",en:"1 ten and 6 ones make 16."}],
 gen(){const n=R(11,20),t=Math.floor(n/10),o=n%10,ty=pick(["to","ze","field"]);
  const why=W(field(fill([n,"r"]),20)+eqline(`${n} = ${t*10} + ${o}`),`Eine volle Reihe sind 10, das ist ein Zehner. Dann zählst du die einzelnen Einer: ${o}. Zusammen: 10 + ${o} = ${n}.`,`A full row is 10, that is one ten. Then count the single ones: ${o}. Together: 10 + ${o} = ${n}.`,"pv20");
  if(ty==="ze")return {vis:"",de:`Wie viele Zehner und Einer hat die ${n}?`,en:`How many tens and ones does ${n} have?`,opts:sopts(`${t} Z ${o} E|${t} ten ${o} ones`,[`${o} Z ${t} E|${o} tens ${t} ones`,`${t} Z ${o+1} E|${t} ten ${o+1} ones`,`${t+1} Z ${o} E|${t+1} tens ${o} ones`]),stmt:eqs(x=>`${n} hat ${x.split("|")[0]}.`,x=>`${n} has ${x.split("|")[1]}.`),mem:null,why};
  return {vis:ty==="to"?tensOnes(t,o):field(fill([n,"r"]),20),de:"Welche Zahl ist das?",en:"Which number is this?",opts:nopts(n,[10+o+1,o,n-10,n+1],0,20),stmt:eqs(x=>`Das ist die ${x}.`,x=>`This is ${x}.`),mem:[`10 + ${o}`,String(n)],why};},
 parent:{method:"Numbers 11–20 are shown in the Zwanzigerfeld (2 rows of 10) and with Zehnerstangen/Einerwürfel (Dienes blocks). Watch for ‘vierzehn’ being written 41 — German says the ones first!",
  words:[["der Zehner (Z)","ten"],["der Einer (E)","one"],["das Zwanzigerfeld","twenty-frame"],["die Zehnerstange","ten-rod"],["der Einerwürfel","unit cube"]],
  games:["Make bundles of 10 straws with a hair tie: ‘1 bundle and 3 single = 13’.","Read house numbers 11–20 on a walk."]}},

{id:9,k:1,sec:"Rechnen",emo:"🚦",de:"Zehnerübergang",en:"Crossing ten",blitz:true,
 say:["Bei 8 + 5 rechnen wir erst bis zur 10: 8 + 2 = 10. Dann den Rest: 10 + 3 = 13.","For 8 + 5 we first go to 10: 8 + 2 = 10. Then the rest: 10 + 3 = 13."],
 merk:["Erst bis zur 10, dann weiter!","First to 10, then go on!"],
 ex:()=>[{vis:field(fill([8,"r"],[5,"b"]),20)+steps(["8 + 2 = 10","10 + 3 = 13"]),de:"8 + 5 = 13",en:"8 plus 5 equals 13"},{vis:steps(["13 − 3 = 10","10 − 2 = 8"]),de:"13 − 5 = 8",en:"13 minus 5 equals 8"}],
 gen(){if(Math.random()<.6){const a=R(5,9),b=R(11-a,9),s=a+b,k=10-a,rest=b-k;
   return {vis:field(fill([a,"r"],[b,"b"]),20),de:`${a} + ${b} = ?`,en:`What is ${a} plus ${b}?`,opts:nopts(s,[s+1,s-1,s-10,s+10],0,20),stmt:eqs(x=>`${a} + ${b} = ${x}`),mem:[`${a} + ${b}`,String(s)],
    why:W(field(fill([a,"r"],[b,"b"]),20)+steps([`${a} + ${k} = 10`,`10 + ${rest} = ${s}`]),`Erst bis zur 10! Die ${a} braucht noch ${k} bis zur 10: ${a} + ${k} = 10. Von der ${b} bleiben noch ${rest} übrig: 10 + ${rest} = ${s}.`,
     `First go to 10! ${a} needs ${k} more to make 10: ${a} + ${k} = 10. From the ${b}, ${rest} are left: 10 + ${rest} = ${s}.`,"cross")};}
  const s=R(11,18),b=R(s-9,9),d=s-b,k=s-10,rest=b-k;
  return {vis:field(fill([d,"r"],[b,"x"]),20),de:`${s} − ${b} = ?`,en:`What is ${s} minus ${b}?`,opts:nopts(d,[d+1,d-1,d+10,s-10],0,20),stmt:eqs(x=>`${s} − ${b} = ${x}`),mem:[`${s} − ${b}`,String(d)],
   why:W(field(fill([d,"r"],[b,"x"]),20)+steps([`${s} − ${k} = 10`,`10 − ${rest} = ${d}`]),`Erst zurück bis zur 10: ${s} − ${k} = 10. Von der ${b} musst du noch ${rest} wegnehmen: 10 − ${rest} = ${d}.`,
    `First go back to 10: ${s} − ${k} = 10. From the ${b} you still have to take away ${rest}: 10 − ${rest} = ${d}.`,"cross")};},
 parent:{method:"The ‘Zehnerübergang’ is the big hurdle of Klasse 1. The school strategy is ‘Schrittweise’: fill up to 10 first (using verliebte Zahlen), then add the rest. Doubles (7+7) and neighbour doubles (7+8) are a second strategy.",
  words:[["der Zehnerübergang","crossing ten"],["schrittweise rechnen","step by step"],["bis zur 10 auffüllen","fill up to 10"],["zerlegen","split"]],
  games:["Egg box with 10 holes + extra eggs: fill the box first, then count the rest.","Say the first step out loud each time: ‘8 needs 2 to make 10…’"]}},

{id:10,k:1,sec:"Rechnen",emo:"🪞",de:"Verdoppeln und Halbieren",en:"Doubling and halving",blitz:true,
 say:["Verdoppeln heißt: noch einmal dieselbe Zahl dazu, wie im Spiegel. Halbieren heißt: gerecht in zwei gleiche Teile teilen.","Doubling means adding the same number again, like in a mirror. Halving means sharing into two equal parts."],
 merk:["Doppelt wie im Spiegel. Halb heißt: zwei gleiche Teile.","Double like a mirror. Half means two equal parts."],
 ex:()=>[{vis:mirror(4),de:"Das Doppelte von 4 ist 8.",en:"Double 4 is 8."},{vis:field(fill([5,"r"],[5,"b"])),de:"Die Hälfte von 10 ist 5.",en:"Half of 10 is 5."}],
 gen(){if(Math.random()<.55){const n=R(1,10),d=2*n;
   return {vis:mirror(n),de:`Verdopple die ${n}.`,en:`Double ${n}.`,opts:nopts(d,[d+1,d-1,n+2,n],0,20),stmt:eqs(x=>`Das Doppelte von ${n} ist ${x}.`,x=>`Double ${n} is ${x}.`),mem:[`${n} + ${n}`,String(d)],
    why:W(mirror(n)+eqline(`${n} + ${n} = ${d}`),`Verdoppeln heißt: die Zahl noch einmal dazu, wie im Spiegel 🪞. ${n} + ${n} = ${d}.`,`Doubling means the same number again, like in a mirror. ${n} + ${n} = ${d}.`,"dbl")};}
  const h=R(1,10),n=2*h;
  return {vis:field(fill([n,"r"]),n>10?20:10),de:`Halbiere die ${n}.`,en:`Halve ${n}.`,opts:nopts(h,[h+1,h-1,n-2,n],0,20),stmt:eqs(x=>`Die Hälfte von ${n} ist ${x}.`,x=>`Half of ${n} is ${x}.`),mem:[`Hälfte von ${n}`,String(h)],
   why:W(field(fill([h,"r"],[h,"b"]),n>10?20:10)+eqline(`${n} = ${h} + ${h}`),`Halbieren heißt: gerecht in zwei gleiche Teile teilen. ${n} = ${h} + ${h}. Jede Hälfte ist ${h}.`,`Halving means sharing into two equal parts. ${n} = ${h} + ${h}. Each half is ${h}.`,"dbl")};},
 parent:{method:"Doubles (Verdoppeln) up to 10 + 10 are learned by heart and used as anchors: 7 + 8 = 7 + 7 + 1. Mirrors are used in class to show doubling.",
  words:[["verdoppeln","to double"],["das Doppelte","double"],["halbieren","to halve"],["die Hälfte","half"],["der Spiegel","mirror"]],
  games:["Put a mirror next to some Lego bricks: how many now?","Share 12 grapes fairly between you and her."]}},

{id:11,k:1,sec:"Muster",emo:"🧱",de:"Rechenmauer und Muster",en:"Number walls and patterns",
 say:["In der Rechenmauer ergeben zwei Steine nebeneinander zusammen den Stein darüber. Bei Mustern suchst du die Regel.","In a number wall, two bricks side by side add up to the brick above. In a pattern you look for the rule."],
 merk:["Zwei Steine unten ergeben den Stein oben.","Two bricks below make the brick above."],
 ex:()=>[{vis:wall([[7],[3,4],[1,2,2]]),de:"1 + 2 = 3, 2 + 2 = 4, 3 + 4 = 7",en:"1 + 2 = 3, 2 + 2 = 4, 3 + 4 = 7"},{vis:seqVis([2,4,6,8],"+2"),de:"Immer plus 2.",en:"Always plus 2."}],
 gen(){const ty=pick(["wall","wall","seq","pat"]);
  if(ty==="wall"){const b=[R(0,5),R(0,5),R(0,5)],m=[b[0]+b[1],b[1]+b[2]],t=m[0]+m[1];const pos=pick(["t","m0","m1","b0","b2"]);
   const rows=[[t],[...m],[...b]];let ans,whyDe,whyEn;
   if(pos==="t"){ans=t;rows[0][0]="?";whyDe=`Die zwei Steine darunter ergeben zusammen den Stein oben: ${m[0]} + ${m[1]} = ${t}.`;whyEn=`The two bricks below add up to the top brick: ${m[0]} + ${m[1]} = ${t}.`;}
   else if(pos[0]==="m"){const i=+pos[1];ans=m[i];rows[1][i]="?";whyDe=`Die zwei Steine darunter ergeben zusammen diesen Stein: ${b[i]} + ${b[i+1]} = ${m[i]}.`;whyEn=`The two bricks below add up to this brick: ${b[i]} + ${b[i+1]} = ${m[i]}.`;}
   else{const i=+pos[1];ans=b[i];rows[2][i]="?";const up=i===0?m[0]:m[1];whyDe=`Der Stein darüber ist ${up}. Daneben liegt die ${b[1]}. Rechne minus: ${up} − ${b[1]} = ${ans}.`;whyEn=`The brick above is ${up}. Next to it is ${b[1]}. Use minus: ${up} − ${b[1]} = ${ans}.`;}
   return {vis:wall(rows),de:"Welche Zahl fehlt in der Rechenmauer?",en:"Which number is missing in the number wall?",opts:nopts(ans,[ans+1,ans-1,ans+2],0,30),stmt:eqs(x=>`In den Stein gehört die ${x}.`,x=>`The brick needs ${x}.`),mem:null,
    why:W(wall([[t],[...m],[...b]]),whyDe,whyEn,"wall")};}
  if(ty==="seq"){const step=pick([1,2,2,3,5,10,-1,-2]);let st=step>0?R(0,step===10?10:8):R(4*Math.abs(step)+1,20);const nums=[0,1,2,3].map(i=>st+i*step);const nx=st+4*step;
   const lab=(step>0?"+":"−")+Math.abs(step);
   return {vis:seqVis([...nums,"?"],lab),de:`Wie geht es weiter? ${nums.join(", ")}, ?`,en:`What comes next? ${nums.join(", ")}, ?`,opts:nopts(nx,[nx+1,nx-1,nums[3]+1,nx+step],0,60),stmt:eqs(x=>`Als Nächstes kommt ${x}.`,x=>`Next comes ${x}.`),mem:[`${nums.slice(1).join(", ")}, ?`,String(nx)],
    why:W(seqVis([...nums,nx],lab),`Schau, was immer passiert: immer ${step>0?"plus":"minus"} ${Math.abs(step)}. ${nums[3]} ${step>0?"+":"−"} ${Math.abs(step)} = ${nx}.`,`Look what always happens: always ${step>0?"plus":"minus"} ${Math.abs(step)}. ${nums[3]} ${step>0?"+":"−"} ${Math.abs(step)} = ${nx}.`,"pat")};}
  const cols=shuffle(["🔴","🔵","🟢","🟡"]);const unit=pick([[0,1],[0,0,1],[0,1,2],[0,1,1]]).map(i=>cols[i]);const shown=[...unit,...unit,...unit].slice(0,unit.length*2+R(0,unit.length-1));const nx=unit[shown.length%unit.length];
  return {vis:`<div class="patv">${shown.join("")}<span class="qm">?</span></div>`,de:"Was kommt als Nächstes?",en:"What comes next?",opts:sopts(nx,[...new Set([...unit,cols[3]])]),stmt:eqs(x=>`Als Nächstes kommt ${x}.`,x=>`Next comes ${x}.`),mem:null,
   why:W(`<div class="patv">${unit.join("")} · ${unit.join("")} · …</div>`,`Das Muster wiederholt sich immer wieder: ${unit.join(" ")}. Nach ${shown[shown.length-1]} kommt ${nx}.`,`The pattern repeats again and again: ${unit.join(" ")}. After ${shown[shown.length-1]} comes ${nx}.`,"pat")};},
 parent:{method:"Rechenmauern (number walls), Zahlenfolgen (number sequences) and Muster (patterns) train flexible thinking. In class, children also invent their own walls and sequences.",
  words:[["die Rechenmauer","number wall"],["der Stein","brick"],["die Zahlenfolge","number sequence"],["das Muster","pattern"],["die Regel","the rule"]],
  games:["Build a real Lego number wall with numbers on paper.","Clap–stamp–clap–stamp patterns: what comes next?"]}},

{id:12,k:1,sec:"Größen",emo:"💶",de:"Geld: Euro und Cent",en:"Money: euros and cents",
 say:["Unser Geld heißt Euro und Cent. 1 Euro sind 100 Cent. Zähle zuerst das große Geld, dann das kleine.","Our money is euros and cents. 1 euro is 100 cents. Count the big money first, then the small."],
 merk:["1 € = 100 ct. Großes Geld zuerst!","1 € = 100 cents. Big money first!"],
 ex:()=>[{vis:money(["10€","5€","2€"]),de:"10 € + 5 € + 2 € = 17 €",en:"10 + 5 + 2 = 17 euros"},{vis:money(["10ct","5ct","2ct"]),de:"10 ct + 5 ct + 2 ct = 17 ct",en:"17 cents"}],
 gen(){const V={"1ct":1,"2ct":2,"5ct":5,"10ct":10,"20ct":20,"50ct":50,"1€":100,"2€":200,"5€":500,"10€":1000,"20€":2000};
  const ty=pick(["eur","eur","ct","more"]);
  if(ty==="more"){const ks=Object.keys(V);let a=pick(ks),b=pick(ks);while(b===a)b=pick(ks);const big=V[a]>V[b]?a:b;const lab=k=>k.replace("€"," €").replace("ct"," ct");
   return {vis:money([a,b]),de:"Was ist mehr wert?",en:"Which is worth more?",opts:[lab(big),lab(big===a?b:a)],stmt:eqs(x=>`${x} ist mehr wert.`,x=>`${x} is worth more.`),mem:null,
    why:W(money([a,b]),(a.includes("€")!==b.includes("€"))?`Euro ist viel mehr als Cent: 1 € sind schon 100 ct. Darum ist ${lab(big)} mehr wert.`:`Schau auf die Zahl: ${lab(big)} ist mehr als ${lab(big===a?b:a)}.`,
     (a.includes("€")!==b.includes("€"))?`Euros are worth much more than cents: 1 € is already 100 cents. So ${lab(big)} is worth more.`:`Look at the number: ${lab(big)} is more than ${lab(big===a?b:a)}.`,"money")};}
  const pool=ty==="eur"?["1€","2€","5€","10€"]:["1ct","2ct","5ct","10ct","20ct"];let items,sum;
  do{items=[...Array(R(2,4))].map(()=>pick(pool)).sort((x,y)=>V[y]-V[x]);sum=items.reduce((s,k)=>s+V[k],0)/(ty==="eur"?100:1);}while(sum>(ty==="eur"?20:50));
  const u=ty==="eur"?" €":" ct",vals=items.map(k=>V[k]/(ty==="eur"?100:1));let run=0;const st=vals.map(v=>{run+=v;return run;});
  return {vis:money(items),de:"Wie viel Geld ist das?",en:"How much money is this?",opts:nopts(sum,[sum+1,sum-1,sum+5,sum-2],1,100,u),stmt:eqs(x=>`Das sind ${x}.`,x=>`That is ${x}.`),mem:[vals.join(u+" + ")+u,sum+u],
   why:W(money(items)+eqline(vals.join(" + ")+" = "+sum+u),`Zähle zuerst das große Geld, dann das kleine: ${st.join(", ")}. Zusammen sind es ${sum}${u}.`,`Count the big money first, then the small: ${st.join(", ")}. Together that is ${sum}${u}.`,"money")};},
 parent:{method:"Klasse 1 uses euro amounts up to 20 € and coins up to 20 ct; Klasse 2 goes to 100 € and mixed € and ct. Children count from the biggest coin/note down.",
  words:[["der Euro (€)","euro"],["der Cent (ct)","cent"],["die Münze","coin"],["der Schein","banknote"],["bezahlen / das Wechselgeld","to pay / change"]],
  games:["Play shop with real coins and price tags up to 20 €.","Let her pay at the bakery and count the change with you."]}},

{id:13,k:1,sec:"Geometrie",emo:"🔺",de:"Formen und Lage",en:"Shapes and positions",
 say:["Ein Kreis hat keine Ecken. Ein Dreieck hat 3 Ecken. Ein Viereck hat 4 Ecken. Links und rechts: Die linke Hand macht ein L.","A circle has no corners. A triangle has 3 corners. A rectangle or square has 4 corners. Left and right: your left hand makes an L."],
 merk:["L wie links: Daumen und Zeigefinger der linken Hand!","L for left (links): thumb and first finger of your left hand!"],
 ex:()=>[{vis:pair(shape("Kreis"),shape("Dreieck")),de:"Kreis und Dreieck",en:"circle and triangle"},{vis:pair(shape("Quadrat"),shape("Rechteck")),de:"Quadrat und Rechteck",en:"square and rectangle"}],
 gen(){const N={Kreis:["circle",0],Dreieck:["triangle",3],Quadrat:["square",4],Rechteck:["rectangle",4]};const ty=pick(["name","name","corners","lr","ou"]);
  const shapeWhy=n=>W(shape(n),n==="Kreis"?"Ein Kreis ist ganz rund. Er hat keine Ecken.":n==="Dreieck"?"Ein Dreieck hat 3 Ecken und 3 Seiten. Zähle die Ecken: 1, 2, 3!":n==="Quadrat"?"Ein Quadrat hat 4 Ecken, und alle 4 Seiten sind gleich lang.":"Ein Rechteck hat 4 Ecken: 2 lange Seiten und 2 kurze Seiten.",
   n==="Kreis"?"A circle is completely round. It has no corners.":n==="Dreieck"?"A triangle has 3 corners and 3 sides. Count the corners: 1, 2, 3!":n==="Quadrat"?"A square has 4 corners, and all 4 sides are the same length.":"A rectangle has 4 corners: 2 long sides and 2 short sides.","shapes");
  if(ty==="name"){const n=pick(Object.keys(N));return {vis:shape(n),de:"Wie heißt diese Form?",en:"What is this shape called?",opts:sopts(`${n}|${N[n][0]}`,Object.keys(N).map(k=>`${k}|${N[k][0]}`)),stmt:eqs(x=>`Das ist ein ${x.split("|")[0]}.`,x=>`This is a ${x.split("|")[1]}.`),mem:[{Kreis:"⚪",Dreieck:"🔺",Quadrat:"🟦",Rechteck:"▬"}[n],n],why:shapeWhy(n)};}
  if(ty==="corners"){const n=pick(Object.keys(N));return {vis:shape(n),de:`Wie viele Ecken hat ein ${n}?`,en:`How many corners does a ${N[n][0]} have?`,opts:nopts(N[n][1],[3,4,0,5],0,6),stmt:eqs(x=>`Ein ${n} hat ${x} Ecken.`,x=>`A ${N[n][0]} has ${x} corners.`),mem:null,why:shapeWhy(n)};}
  if(ty==="lr"){const right=Math.random()<.5;return {vis:`<div class="lage">${right?"🐱 ⚽":"⚽ 🐱"}</div>`,de:"Ist der Ball links oder rechts von der Katze?",en:"Is the ball to the left or the right of the cat?",
   opts:right?["rechts|right","links|left"]:["links|left","rechts|right"],stmt:eqs(x=>`Der Ball ist ${x.split("|")[0]} von der Katze.`,x=>`The ball is to the ${x.split("|")[1]} of the cat.`),mem:null,
   why:W(`<div class="lage">${right?"🐱 ⚽":"⚽ 🐱"}</div><div class="eqline">🤚 L = links</div>`,`Halte deine linke Hand hoch: Daumen und Zeigefinger machen ein L. L wie links! Der Ball ist auf der ${right?"anderen Seite, also rechts":"L-Seite, also links"}.`,
    `Hold up your left hand: thumb and first finger make an L. L for left, in German links! The ball is on the ${right?"other side, so right":"L side, so left"}.`,"lage")};}
  const top=Math.random()<.5;return {vis:`<div class="lage col">${top?"⭐<br>🏠":"🏠<br>⭐"}</div>`,de:"Ist der Stern oben oder unten?",en:"Is the star above or below?",opts:top?["oben|above","unten|below"]:["unten|below","oben|above"],
   stmt:eqs(x=>`Der Stern ist ${x.split("|")[0]}.`,x=>`The star is ${x.split("|")[1]}.`),mem:null,why:W(`<div class="lage col">${top?"⭐<br>🏠":"🏠<br>⭐"}</div>`,top?"Oben ist zum Himmel hin. Der Stern ist über dem Haus: oben.":"Unten ist zum Boden hin. Der Stern ist unter dem Haus: unten.",top?"Above is towards the sky. The star is over the house: above.":"Below is towards the ground. The star is under the house: below.","lage")};},
 parent:{method:"Geometry in Klasse 1: naming flat shapes (Kreis, Dreieck, Viereck, Rechteck, Quadrat), counting corners (Ecken) and sides (Seiten), and position words (links, rechts, oben, unten, vor, hinter, zwischen).",
  words:[["der Kreis","circle"],["das Dreieck","triangle"],["das Viereck","four-sided shape"],["das Quadrat","square"],["das Rechteck","rectangle"],["die Ecke / die Seite","corner / side"],["links / rechts","left / right"],["oben / unten","above / below"]],
  games:["Shape hunt at home: find 3 Kreise, 3 Rechtecke.","‘Simon says’ in German: Hand nach links! Bein nach rechts!"]}},

{id:14,k:1,sec:"Größen",emo:"🕐",de:"Die Uhr",en:"The clock",
 say:["Der kurze Zeiger zeigt die Stunde. Der lange Zeiger zeigt die Minuten. Steht der lange Zeiger oben auf der 12, ist es eine volle Stunde.","The short hand shows the hour. The long hand shows the minutes. When the long hand is up on 12, it is o'clock."],
 merk:["Kurz für die Stunde, lang für die Minuten. Halb 4 ist 3:30!","Short hand for hours, long hand for minutes. Halb 4 is 3:30!"],
 ex:()=>[{vis:clock(3,0),de:"Es ist 3 Uhr.",en:"It is 3 o'clock."},{vis:clock(3,30),de:"Es ist halb 4.",en:"It is half past 3."}],
 gen(){const h=R(1,12),half=Math.random()<.45,n=h%12+1,p=h===1?12:h-1;
  const lab=(hh,hf)=>hf?`halb ${hh%12+1}|half past ${hh}`:`${hh} Uhr|${hh} o'clock`;
  const c=lab(h,half);const opts=sopts(c,half?[lab(p,true),lab(h,false),lab(n,false)]:[lab(n,false),lab(h,true),lab(p,true)]);
  return {vis:clock(h,half?30:0),de:"Wie spät ist es?",en:"What time is it?",opts,stmt:eqs(x=>`Es ist ${x.split("|")[0]}.`,x=>`It is ${x.split("|")[1]}.`),mem:[`${h}:${half?"30":"00"}`,c.split("|")[0]],
   why:W(clock(h,half?30:0)+eqline(`${h}:${half?"30":"00"}`),half?`Der lange blaue Zeiger steht unten auf der 6: eine halbe Stunde. Der kurze rote Zeiger ist zwischen ${h} und ${n}. Auf Deutsch sagen wir halb ${n}, denn es ist schon halb auf dem Weg zur ${n}.`:`Der lange blaue Zeiger steht oben auf der 12: eine volle Stunde. Der kurze rote Zeiger zeigt auf die ${h}. Es ist ${h} Uhr.`,
    half?`The long blue hand is down on 6: half an hour. The short red hand is between ${h} and ${n}. German says halb ${n}, because it is already half way to ${n}. In English we say half past ${h}.`:`The long blue hand is up on 12: o'clock. The short red hand points to ${h}. It is ${h} o'clock.`,"clock")};},
 parent:{method:"Full and half hours are taught in Klasse 1, quarters (Viertel) in Klasse 2. Careful: German ‘halb 4’ means 3:30 (half way to four), not 4:30 — a classic trap for English speakers.",
  words:[["die Uhr","clock"],["der Stundenzeiger","hour hand (short)"],["der Minutenzeiger","minute hand (long)"],["… Uhr","… o'clock"],["halb 4","3:30 (half past 3)"],["Viertel nach / Viertel vor","quarter past / quarter to"]],
  games:["At meals, ask ‘Wie spät ist es?’ and point at a real clock.","Make a paper-plate clock and set times for her day (Schule, Turnen, Bett)."]}},

/* ---------------- KLASSE 2 ---------------- */
{id:15,k:2,sec:"Zahlen",emo:"💯",de:"Zahlen bis 100",en:"Numbers to 100",blitz:true,
 say:["Zahlen bis 100 haben Zehner und Einer. Wir schreiben zuerst die Zehner. Aber wir sprechen zuerst die Einer: sieben-und-vierzig ist 47.","Numbers to 100 have tens and ones. We write the tens first. But German says the ones first: sieben-und-vierzig is 47."],
 merk:["Zuerst schreiben: die Zehner. Zuerst sprechen: die Einer!","Write the tens first. Say the ones first!"],
 ex:()=>[{vis:tensOnes(4,7),de:"4 Zehner und 7 Einer sind 47.",en:"4 tens and 7 ones make 47."},{vis:eqline("47 = sieben-und-vierzig"),de:"siebenundvierzig",en:"forty-seven (German: seven-and-forty)"}],
 gen(){const t=R(2,9),o=R(1,9),n=10*t+o,sw=10*o+t,ty=pick(["to","word","word","tens","cmp"]);
  const why=W(tensOnes(t,o)+eqline(`${n} = ${t*10} + ${o}`),`Jede Stange ist ein Zehner: ${t} Stangen sind ${t*10}. Dazu ${o} Einer. ${t*10} + ${o} = ${n}. Wir sagen ${wordDe(n)}: zuerst die Einer, dann die Zehner!`,
   `Each rod is a ten: ${t} rods make ${t*10}. Plus ${o} ones. ${t*10} + ${o} = ${n}. German says ${wordDe(n)}: the ones first, then the tens! Like “${ONES_EN[o]}-and-${TENS_EN[t]}”.`,"pv100");
  if(ty==="to")return {vis:tensOnes(t,o),de:"Welche Zahl ist das?",en:"Which number is this?",opts:nopts(n,o!==t?[sw,n+10,n-1]:[n+10,n-1],0,100),stmt:eqs(x=>`Das ist die ${x}.`,x=>`This is ${x}.`),mem:[`${t} Z ${o} E`,String(n)],why};
  if(ty==="word")return {vis:"",de:`Welche Zahl ist ${wordDe(n)}?`,en:`Which number is “${wordDe(n)}”? German says the ones first!`,opts:nopts(n,o!==t?[sw,n+1,n+10]:[n+1,n+10],0,100),stmt:eqs(x=>`${wordDe(n)} ist ${x}.`,x=>`${wordDe(n)} is ${x}.`),mem:[wordDe(n),String(n)],why};
  if(ty==="tens")return {vis:"",de:`Wie viele Zehner hat die ${n}?`,en:`How many tens does ${n} have?`,opts:nopts(t,[o,t+1,t-1],0,10),stmt:eqs(x=>`Die ${n} hat ${x} Zehner.`,x=>`${n} has ${x} tens.`),mem:null,why};
  const m=o!==t?sw:n+R(1,9);const big=Math.max(n,m);
  return {vis:"",de:`Welche Zahl ist größer: ${n} oder ${m}?`,en:`Which number is greater: ${n} or ${m}?`,opts:[String(big),String(big===n?m:n)],stmt:eqs(x=>`${x} ist größer.`,x=>`${x} is greater.`),mem:null,
   why:W(pair(tensOnes(Math.floor(n/10),n%10),tensOnes(Math.floor(m/10),m%10)),`Vergleiche zuerst die Zehner: Wer mehr Zehner hat, ist größer. ${big} hat ${Math.floor(big/10)} Zehner.`,`Compare the tens first: more tens means bigger. ${big} has ${Math.floor(big/10)} tens.`,"cmp")};},
 parent:{method:"The hundred field (Hunderterfeld), tens rods and the number line to 100 are used. The biggest trap: German number words say the ones first (siebenundvierzig = 47), so children often write 74. Practise number dictation!",
  words:[["das Hunderterfeld","hundred square"],["die Zehnerzahl","multiple of ten (30, 40 …)"],["der Stellenwert","place value"],["das Zahlendiktat","number dictation"],["siebenundvierzig","47 (‘seven-and-forty’)"]],
  games:["Number dictation: you say a German number, she writes it.","Bundle 47 straws into tens and ones."]}},

{id:16,k:2,sec:"Rechnen",emo:"🧮",de:"Plus und Minus bis 100",en:"Plus and minus to 100",blitz:true,
 say:["Bei großen Aufgaben rechnen wir Schritt für Schritt: erst die Zehner, dann die Einer.","With big sums we go step by step: tens first, then ones."],
 merk:["Erst die Zehner, dann die Einer!","Tens first, then the ones!"],
 ex:()=>[{vis:steps(["34 + 20 = 54","54 + 5 = 59"]),de:"34 + 25 = 59",en:"34 plus 25 equals 59"},{vis:steps(["30 + 40 = 70"]),de:"3 Zehner + 4 Zehner = 7 Zehner",en:"3 tens plus 4 tens make 7 tens"}],
 gen(){const ty=pick(["tens","zee","zeze","zeze","minus","cross"]);let a,b,op="+",r,st,de,en;
  if(ty==="tens"){a=10*R(1,8);b=10*R(1,9-a/10);r=a+b;st=[`${a/10} + ${b/10} = ${r/10}`,`${a} + ${b} = ${r}`];de=`Rechne mit Zehnern wie mit Einern: ${a/10} + ${b/10} = ${r/10}, also ${a} + ${b} = ${r}.`;en=`Work with tens like ones: ${a/10} + ${b/10} = ${r/10}, so ${a} + ${b} = ${r}.`;}
  else if(ty==="zee"){a=10*R(1,8)+R(0,7);b=R(1,9-a%10);r=a+b;st=[`${a%10} + ${b} = ${a%10+b}`,`${a-a%10} + ${a%10+b} = ${r}`];de=`Die Zehner bleiben gleich. Rechne nur die Einer: ${a%10} + ${b} = ${a%10+b}. Also ${r}.`;en=`The tens stay the same. Just add the ones: ${a%10} + ${b} = ${a%10+b}. So ${r}.`;}
  else if(ty==="zeze"){const o1=R(0,8),o2=R(1,9-o1),t1=R(1,7),t2=R(1,8-t1);a=10*t1+o1;b=10*t2+o2;r=a+b;st=[`${a} + ${t2*10} = ${a+t2*10}`,`${a+t2*10} + ${o2} = ${r}`];de=`Erst die Zehner: ${a} + ${t2*10} = ${a+t2*10}. Dann die Einer: ${a+t2*10} + ${o2} = ${r}.`;en=`Tens first: ${a} + ${t2*10} = ${a+t2*10}. Then the ones: ${a+t2*10} + ${o2} = ${r}.`;}
  else if(ty==="minus"){const t1=R(3,9),o1=R(1,9),t2=R(1,t1-1),o2=R(0,o1);a=10*t1+o1;b=10*t2+o2;op="−";r=a-b;st=[`${a} − ${t2*10} = ${a-t2*10}`,`${a-t2*10} − ${o2} = ${r}`];de=`Erst die Zehner weg: ${a} − ${t2*10} = ${a-t2*10}. Dann die Einer: ${a-t2*10} − ${o2} = ${r}.`;en=`Take away the tens first: ${a} − ${t2*10} = ${a-t2*10}. Then the ones: ${a-t2*10} − ${o2} = ${r}.`;}
  else{a=10*R(1,8)+R(5,9);b=R(10-a%10+1,9);r=a+b;const nx=Math.ceil(a/10)*10,k=nx-a;st=[`${a} + ${k} = ${nx}`,`${nx} + ${b-k} = ${r}`];de=`Erst bis zum nächsten Zehner: ${a} + ${k} = ${nx}. Dann den Rest: ${nx} + ${b-k} = ${r}.`;en=`First up to the next ten: ${a} + ${k} = ${nx}. Then the rest: ${nx} + ${b-k} = ${r}.`;}
  return {vis:"",de:`${a} ${op} ${b} = ?`,en:`What is ${a} ${op==="+"?"plus":"minus"} ${b}?`,opts:nopts(r,[r+10,r-10,r+1,r-1],0,100),stmt:eqs(x=>`${a} ${op} ${b} = ${x}`),mem:[`${a} ${op} ${b}`,String(r)],
   why:W(steps(st),de,en,ty==="cross"?"cross":"step")};},
 parent:{method:"Klasse 2 calculates to 100 with strategies: ‘Schrittweise’ (tens then ones), ‘Stellenweise’ (tens + tens, ones + ones) and filling up to the next ten. Children write intermediate steps (Zwischenschritte).",
  words:[["schrittweise","step by step"],["stellenweise","place by place"],["der Zwischenschritt","intermediate step"],["der nächste Zehner","the next ten"]],
  games:["Shopping list: 34 € + 25 € — say the steps out loud.","Hundred square: jump +10 (one row down) and +1 (one step right)."]}},

{id:17,k:2,sec:"Mal",emo:"✖️",de:"Das Einmaleins",en:"Times tables",blitz:true,
 say:["Mal heißt: immer wieder dieselbe Zahl dazu. 3 mal 4 sind 3 Reihen mit je 4 Punkten: 4 + 4 + 4 = 12.","Times means adding the same number again and again. 3 times 4 is 3 rows of 4 dots: 4 + 4 + 4 = 12."],
 merk:["Mal ist schnelles Plus! 3 · 4 = 4 + 4 + 4.","Times is quick plus! 3 · 4 = 4 + 4 + 4."],
 ex:()=>[{vis:arr(3,4),de:"3 · 4 = 12",en:"3 times 4 equals 12"},{vis:seqVis([5,10,15,20],"+5"),de:"Die 5er-Reihe",en:"the 5 times table"}],
 gen(){const b=pick([2,5,10,2,5,10,3,4,1]),a=R(1,10),p=a*b;
  const tip=b===5?` Tipp: 5 mal ist die Hälfte von 10 mal: ${a} · 10 = ${10*a}, die Hälfte ist ${p}.`:b===2?` Tipp: Mal 2 ist Verdoppeln: ${a} + ${a} = ${p}.`:b===10?` Tipp: Mal 10 heißt: hinten eine 0 dran.`:` Tauschaufgabe: ${a} · ${b} = ${b} · ${a}.`;
  const tipEn=b===5?` Tip: 5 times is half of 10 times: ${a} · 10 = ${10*a}, half is ${p}.`:b===2?` Tip: times 2 is doubling: ${a} + ${a} = ${p}.`:b===10?` Tip: times 10 means add a 0 at the end.`:` Swap: ${a} · ${b} = ${b} · ${a}.`;
  const sum=a<=6?Array(a).fill(b).join(" + ")+` = ${p}`:`${a} Reihen mit je ${b}`;
  if(Math.random()<.2&&a<=7){const seq=[1,2,3].map(i=>(a-1+i)*b);const nx=(a+3)*b;
   return {vis:seqVis([...seq,"?"],"+"+b),de:`Wie geht die ${b}er-Reihe weiter? ${seq.join(", ")}, ?`,en:`What comes next in the ${b} times table? ${seq.join(", ")}, ?`,opts:nopts(nx,[nx+1,nx-b+1,nx+b],0,110),stmt:eqs(x=>`Als Nächstes kommt ${x}.`,x=>`Next comes ${x}.`),mem:null,
    why:W(seqVis([...seq,nx],"+"+b),`In der ${b}er-Reihe kommt immer ${b} dazu: ${seq[2]} + ${b} = ${nx}.`,`In the ${b} times table you always add ${b}: ${seq[2]} + ${b} = ${nx}.`,"mult")};}
  return {vis:a*b<=60?arr(a,b):"",de:`${a} · ${b} = ?`,en:`What is ${a} times ${b}?`,opts:nopts(p,[p+b,p-b,a+b,p+1],0,110),stmt:eqs(x=>`${a} · ${b} = ${x}`),mem:[`${a} · ${b}`,String(p)],
   why:W((a*b<=60?arr(a,b):"")+eqline(sum),`${a} · ${b} heißt: ${a} mal die ${b}. Das sind ${a} Reihen mit je ${b}: zusammen ${p}.${tip}`,`${a} · ${b} means ${a} times ${b}. That is ${a} rows of ${b}: ${p} altogether.${tipEn}`,"mult")};},
 parent:{method:"German schools write multiplication with a dot (3 · 4). Children start with ‘Kernaufgaben’ (core facts: 1·, 2·, 5·, 10·) and derive the rest from them, then learn the ‘Einmaleins-Reihen’ (times tables) by heart in Klasse 2.",
  words:[["mal / malnehmen","times / multiply"],["das Einmaleins","times tables"],["die Kernaufgabe","core fact (1·, 2·, 5·, 10·)"],["die 5er-Reihe","the 5 times table"],["das Punktefeld","dot array"]],
  games:["Count gymnastics jumps in 2s, 5s and 10s.","Egg boxes: 3 rows of 2 eggs = 3 · 2."]}},

{id:18,k:2,sec:"Mal",emo:"➗",de:"Geteilt: gerecht verteilen",en:"Sharing and dividing",blitz:true,
 say:["Geteilt heißt gerecht verteilen: Jeder bekommt gleich viel. 12 geteilt durch 3 ist 4, denn 3 mal 4 ist 12.","Divided means sharing fairly: everyone gets the same. 12 divided by 3 is 4, because 3 times 4 is 12."],
 merk:["Geteilt heißt: gerecht verteilen. Prüfe mit Mal!","Divided means sharing fairly. Check with times!"],
 ex:()=>[{vis:plates(3,4,"🍬"),de:"12 : 3 = 4",en:"12 divided by 3 equals 4"},{vis:plates(2,5,"🍓"),de:"10 : 2 = 5",en:"10 divided by 2 equals 5"}],
 gen(){const b=R(2,5),q=R(1,10),t=b*q,story=Math.random()<.5;
  return {vis:story?objs(t,"🍬")+`<div class="kids">${"🧒".repeat(b)}</div>`:"",de:story?`Verteile ${t} Bonbons gerecht an ${b} Kinder. Wie viele bekommt jedes Kind?`:`${t} : ${b} = ?`,en:story?`Share ${t} sweets fairly between ${b} children. How many does each child get?`:`What is ${t} divided by ${b}?`,
   opts:nopts(q,[q+1,q-1,t-b,b],0,50),stmt:eqs(x=>story?`Jedes Kind bekommt ${x} Bonbons.`:`${t} : ${b} = ${x}`,x=>story?`Each child gets ${x} sweets.`:`${t} : ${b} = ${x}`),mem:[`${t} : ${b}`,String(q)],
   why:W(plates(b,q,"🍬")+eqline(`${b} · ${q} = ${t}`),`Gib reihum jedem Kind eins, bis alle weg sind. Jedes Kind hat dann ${q}. Prüfe mit Mal: ${b} · ${q} = ${t}.`,`Give one to each child in turn until none are left. Then each child has ${q}. Check with times: ${b} · ${q} = ${t}.`,"div")};},
 parent:{method:"Division (geteilt, written with a colon: 12 : 3) is introduced as fair sharing (Verteilen) and grouping (Aufteilen), always linked to the matching multiplication.",
  words:[["geteilt durch","divided by"],["teilen / verteilen","to share"],["aufteilen","to split into groups"],["gerecht","fairly"],["der Rest","remainder"]],
  games:["Share a bag of gummy bears between the family.","Deal playing cards round the table and count each pile."]}},

{id:19,k:2,sec:"Sachaufgaben",emo:"📖",de:"Sachaufgaben",en:"Word problems",
 say:["Bei Sachaufgaben lesen wir genau, finden die Frage, schreiben die Rechnung und antworten mit einem Satz.","In word problems we read carefully, find the question, write the sum and answer with a sentence."],
 merk:["Frage – Rechnung – Antwort!","Question – sum – answer!"],
 ex:()=>[{vis:steps(["Frage: Wie viele Äpfel hat Aarya jetzt?","Rechnung: 7 + 5 = 12","Antwort: Aarya hat 12 Äpfel."]),de:"Frage – Rechnung – Antwort",en:"question – sum – answer"}],
 gen(){const T=[
   {de:"Aarya hat {a} Äpfel. Sie bekommt {b} dazu. Wie viele Äpfel hat sie jetzt?",en:"Aarya has {a} apples. She gets {b} more. How many apples does she have now?",op:"+",kw:["dazu","more"],ans:["Aarya hat jetzt {x} Äpfel.","Aarya has {x} apples now."],e:"🍎"},
   {de:"Im Bus sitzen {a} Kinder. {b} Kinder steigen aus. Wie viele Kinder sind noch im Bus?",en:"There are {a} children on the bus. {b} children get off. How many are still on the bus?",op:"−",kw:["steigen aus","get off"],ans:["Es sind noch {x} Kinder im Bus.","There are still {x} children on the bus."],e:"🚌"},
   {de:"Aarya hat {a} Stifte. Ihre Freundin hat {b} Stifte. Wie viele Stifte haben beide zusammen?",en:"Aarya has {a} pencils. Her friend has {b} pencils. How many pencils do they have together?",op:"+",kw:["zusammen","together"],ans:["Beide haben zusammen {x} Stifte.","Together they have {x} pencils."],e:"✏️"},
   {de:"Auf dem Teller liegen {a} Kekse. Aarya isst {b} Kekse. Wie viele Kekse liegen noch auf dem Teller?",en:"There are {a} biscuits on the plate. Aarya eats {b}. How many are still on the plate?",op:"−",kw:["isst","eats"],ans:["Es liegen noch {x} Kekse auf dem Teller.","There are still {x} biscuits on the plate."],e:"🍪"},
   {de:"Im Teich schwimmen {a} Enten. Es kommen {b} Enten dazu. Wie viele Enten sind jetzt im Teich?",en:"{a} ducks swim in the pond. {b} more ducks come. How many ducks are in the pond now?",op:"+",kw:["kommen dazu","more come"],ans:["Jetzt sind {x} Enten im Teich.","Now there are {x} ducks in the pond."],e:"🦆"},
   {de:"Aarya hat {a} €. Ein Ball kostet {b} €. Wie viel Geld hat sie nach dem Kauf noch?",en:"Aarya has {a} €. A ball costs {b} €. How much money does she have left after buying it?",op:"−",kw:["kostet","costs"],ans:["Sie hat noch {x} €.","She has {x} € left."],e:"⚽"},
   {de:"Beim Turnen stehen {a} Kinder in einer Reihe. Es gibt {b} Reihen. Wie viele Kinder sind es?",en:"At gymnastics, {a} children stand in each row. There are {b} rows. How many children are there?",op:"·",kw:["in jeder Reihe","in each row"],ans:["Es sind {x} Kinder.","There are {x} children."],e:"🤸"}];
  const t=pick(T);let a,b;if(t.op==="+"){a=R(2,12);b=R(1,20-a);}else if(t.op==="−"){a=R(6,20);b=R(1,a-1);}else{a=R(2,5);b=R(2,5);}
  const r=t.op==="+"?a+b:t.op==="−"?a-b:a*b,f=(s,x)=>s.replace("{a}",a).replace("{b}",b).replace("{x}",x);
  const wrong=t.op==="+"?a-b:a+b;
  return {vis:`<div class="story">${t.e}</div>`,de:f(t.de),en:f(t.en),opts:nopts(r,[wrong,r+1,r-1].filter(x=>x>=0),0,100),stmt:a2=>({de:f(t.ans[0],a2),en:f(t.ans[1],a2)}),mem:null,
   why:W(steps([`Frage: ${f(t.de).split(". ").pop()}`,`Rechnung: ${a} ${t.op} ${b} = ${r}`,`Antwort: ${f(t.ans[0],r)}`]),`Achte auf das Signalwort „${t.kw[0]}“. Das heißt ${t.op==="+"?"plus":t.op==="−"?"minus":"mal"}. Rechnung: ${a} ${t.op} ${b} = ${r}.`,
    `Look for the signal word “${t.kw[1]}”. It means ${t.op==="+"?"plus":t.op==="−"?"minus":"times"}. Sum: ${a} ${t.op} ${b} = ${r}.`,"word")};},
 parent:{method:"‘Sachaufgaben’ are written in German with the scheme F (Frage), R (Rechnung), A (Antwort). Reading the German text is often the real difficulty — read it together and underline the signal words.",
  words:[["die Sachaufgabe","word problem"],["die Frage / die Rechnung / die Antwort","question / sum / answer"],["dazu / zusammen","plus words"],["weg / übrig / noch","minus words"],["das Signalwort","signal word"]],
  games:["Turn everyday moments into Sachaufgaben at dinner.","Let her invent a Sachaufgabe for you to solve."]}}
];
