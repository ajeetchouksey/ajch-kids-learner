/* ============================ MATHE ANFÄNGER (pre-Klasse 1) ============================ */
Object.assign(RULE,{
 count5:["Zählen bis 5","Counting to 5","Zeig auf jedes Ding und zähle laut. Die letzte Zahl sagt, wie viele es sind.","Point at each thing and count out loud. The last number tells how many."],
 numrec:["Zahlen erkennen","Knowing numbers","Jede Zahl hat ein Zeichen: 1, 2, 3 … und ein Wort: eins, zwei, drei …","Every number has a sign: 1, 2, 3 … and a word: eins, zwei, drei …"],
 more:["Mehr oder weniger","More or fewer","Leg die Dinge paarweise nebeneinander. Wo welche übrig bleiben, da sind mehr.","Put the things side by side in pairs. The side with some left over has more."],
 colours:["Farben und Formen","Colours and shapes","Rot, blau, gelb, grün … Kreis, Dreieck, Quadrat, Rechteck.","Red, blue, yellow, green … circle, triangle, square, rectangle."],
 add5:["Dazutun bis 5","Adding to 5","Plus heißt: Es kommt etwas dazu. Zähle alle zusammen.","Plus means more are added. Count them all together."],
 order:["Reihenfolge","Number order","Die Zahlen haben eine feste Reihenfolge: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.","Numbers always come in the same order: 1, 2, 3 … 10."]
});
const FARBEN=[["rot","red","🍎"],["gelb","yellow","🍌"],["grün","green","🐸"],["blau","blue","🌊"],["orange","orange","🍊"],["lila","purple","🍇"],["braun","brown","🍫"],["weiß","white","☁️"],["rosa","pink","🐷"]];
UNITS.push(
{id:20,k:0,sec:"Zahlen",emo:"🐣",de:"Zählen bis 5",en:"Counting to 5",blitz:true,
 say:["Wir zählen langsam: eins, zwei, drei, vier, fünf. Bei jeder Zahl zeigen wir auf ein Ding.","We count slowly: one, two, three, four, five. For each number we point at one thing."],
 merk:["Eins, zwei, drei, vier, fünf – eine ganze Hand! ✋","One, two, three, four, five – a whole hand!"],
 ex:()=>[{vis:objs(3,"🐥"),de:"Drei Küken",en:"three chicks"},{vis:objs(5,"⭐"),de:"Fünf Sterne – eine Hand voll",en:"five stars – a handful"}],
 gen(){const n=R(1,5),e=pick(["🐥","🍓","🎈","🐞","🌼","🚗"]),ty=pick(["obj","obj","dice"]);const vis=ty==="dice"?dice(n):objs(n,e);
  return {vis,de:ty==="dice"?"Wie viele Punkte?":"Wie viele sind es? Zähle!",en:ty==="dice"?"How many dots?":"How many are there? Count!",opts:nopts(n,[n+1,n-1],1,6),
   stmt:eqs(a=>`Es sind ${a}.`,a=>`There are ${a}.`),mem:[(ty==="dice"?"🔴":e).repeat(n),String(n)],
   why:W(numberedObjs(n,ty==="dice"?"🔴":e),`Zeig auf jedes Ding und zähl laut: ${cnt(1,n).join(", ")}. Es sind ${n}!`,`Point at each one and count out loud: ${cnt(1,n).join(", ")}. There are ${n}!`,"count5")};},
 parent:{method:"Before Klasse 1, children learn one-to-one counting: one number word for each object. Touching or moving each object while counting is the key habit.",
  words:[["zählen","to count"],["eins, zwei, drei, vier, fünf","one to five"],["Wie viele?","How many?"]],games:["Count stairs, grapes and toys every day.","Put 5 toys in a row and hide one: how many now?"]}},
{id:21,k:0,sec:"Zahlen",emo:"🔢",de:"Zahlen erkennen",en:"Knowing numbers 1–10",blitz:true,
 say:["Jede Zahl hat ein Zeichen und ein Wort. Die 3 sagen wir drei.","Every number has a sign and a word. We say 3 as drei."],
 merk:["Ich sehe die Zahl, ich sage die Zahl, ich zeige so viele Finger!","I see the number, I say the number, I show that many fingers!"],
 ex:()=>[{vis:`<div class="bignum">3</div>`+objs(3,"🍎"),de:"Drei",en:"three"},{vis:`<div class="bignum">7</div>`+objs(7,"🍎"),de:"Sieben",en:"seven"}],
 gen(){const n=R(1,10),ty=pick(["word","word","match"]);
  if(ty==="word")return {vis:"",de:`Welche Zahl ist „${ONES_DE[n]}“?`,en:`Which number is "${ONES_DE[n]}"? (${ONES_EN[n]||"ten"})`,opts:nopts(n,[n+1,n-1,n===6?9:n===9?6:n+2],1,10),
   stmt:eqs(a=>`${ONES_DE[n]} ist die ${a}.`,a=>`${ONES_DE[n]} is ${a}.`),mem:[ONES_DE[n],String(n)],
   why:W(`<div class="bignum">${n}</div>`+objs(n,"🍎"),`${ONES_DE[n]} schreibt man so: ${n}. Das sind ${n} Äpfel.`,`${ONES_DE[n]} is written like this: ${n}. That is ${n} apples.`,"numrec")};
  const m=Math.min(n,6);return {vis:`<div class="bignum">${m}</div>`,de:"Wie viele Punkte passen zur Zahl?",en:"How many dots match the number?",opts:sopts("🔴".repeat(m),[...new Set([m+1,m-1>0?m-1:m+2,m+2].map(k=>"🔴".repeat(k)))]),
   stmt:eqs(a=>`Zur ${m} passen ${[...a].length} Punkte.`,a=>`${m} matches ${[...a].length} dots.`),mem:null,
   why:W(`<div class="bignum">${m}</div>`+numberedObjs(m,"🔴"),`Die Zahl ist ${m}. Zähle die Punkte: ${cnt(1,m).join(", ")}. Genau ${m}!`,`The number is ${m}. Count the dots: ${cnt(1,m).join(", ")}. Exactly ${m}!`,"numrec")};},
 parent:{method:"Children connect three things: the amount (dots), the spoken word (sieben) and the written sign (7). Practise all three directions.",
  words:[["die Zahl","number"],["die Ziffer","digit"],["eins … zehn","one … ten"]],games:["Number hunt on a walk: house numbers, bus numbers, prices.","Show a number card; she shows that many fingers."]}},
{id:22,k:0,sec:"Zahlen",emo:"⚖️",de:"Mehr oder weniger",en:"More or fewer",
 say:["Wo sind mehr? Leg die Dinge paarweise nebeneinander. Wo welche übrig bleiben, da sind mehr.","Where are more? Put them side by side in pairs. The side with some left over has more."],
 merk:["Paare bilden, Rest anschauen!","Make pairs, look at what is left!"],
 ex:()=>[{vis:pair(`<div>${objs(5,"🍪")}<b>links</b></div>`,`<div>${objs(3,"🍪")}<b>rechts</b></div>`),de:"Links sind mehr.",en:"There are more on the left."}],
 gen(){let a=R(1,8),b=R(1,8);while(b===a)b=R(1,8);const e=pick(["🍪","🎈","🐟","⭐"]),more=Math.random()<.6;const left=more?a>b:a<b;
  const vis=pair(`<div>${objs(a,e)}<b>links</b></div>`,`<div>${objs(b,e)}<b>rechts</b></div>`);
  return {vis,de:more?"Wo sind mehr?":"Wo sind weniger?",en:more?"Where are there more?":"Where are there fewer?",opts:left?["links|left","rechts|right"]:["rechts|right","links|left"],
   stmt:eqs(x=>`${main(x)==="links"?"Links":"Rechts"} sind ${more?"mehr":"weniger"}.`,x=>`There are ${more?"more":"fewer"} on the ${sub(x)}.`),mem:null,
   why:W(vis+eqline(`${a} ${a>b?">":"<"} ${b}`),`Links sind ${a}, rechts sind ${b}. ${Math.max(a,b)} ist mehr als ${Math.min(a,b)}. Mehr sind ${a>b?"links":"rechts"}, weniger sind ${a>b?"rechts":"links"}.`,`Left has ${a}, right has ${b}. ${Math.max(a,b)} is more than ${Math.min(a,b)}. More are on the ${a>b?"left":"right"}, fewer on the ${a>b?"right":"left"}.`,"more")};},
 parent:{method:"Comparing amounts (mehr, weniger, gleich viel) comes before comparing numbers. Pairing objects one-to-one is the school method.",
  words:[["mehr","more"],["weniger","fewer"],["gleich viele","the same number"],["links / rechts","left / right"]],games:["Share sweets into two piles: who has more?","Pair socks: are there more red or blue?"]}},
{id:23,k:0,sec:"Geometrie",emo:"🔵",de:"Farben und Formen",en:"Colours and shapes",
 say:["Wir lernen die Farben und die Formen auf Deutsch: rot, blau, gelb, grün und Kreis, Dreieck, Quadrat.","We learn colours and shapes in German: red, blue, yellow, green and circle, triangle, square."],
 merk:["Rot wie ein Apfel, gelb wie die Sonne, grün wie ein Frosch!","Red like an apple, yellow like the sun, green like a frog!"],
 ex:()=>[{vis:`<div class="bigemo">🍎</div>`,de:"Der Apfel ist rot.",en:"The apple is red."},{vis:shape("Dreieck"),de:"Das ist ein Dreieck.",en:"This is a triangle."}],
 gen(){if(Math.random()<.6){const f=pick(FARBEN);return {vis:`<div class="bigemo">${f[2]}</div>`,de:"Welche Farbe hat das?",en:"What colour is it?",opts:sopts(`${f[0]}|${f[1]}`,shuffle(FARBEN).filter(x=>x!==f).map(x=>`${x[0]}|${x[1]}`)),
   stmt:eqs(x=>`Das ist ${main(x)}.`,x=>`It is ${sub(x)}.`),mem:[f[2],f[0]],
   why:W(`<div class="bigemo">${f[2]}</div>`,`Schau genau: Es ist ${f[0]}.`,`Look closely: it is ${f[1]}. In German: ${f[0]}.`,"colours")};}
  const N={Kreis:"circle",Dreieck:"triangle",Quadrat:"square",Rechteck:"rectangle"};const n=pick(Object.keys(N));
  return {vis:shape(n),de:"Wie heißt diese Form?",en:"What is this shape called?",opts:sopts(`${n}|${N[n]}`,Object.keys(N).map(k=>`${k}|${N[k]}`)),stmt:eqs(x=>`Das ist ein ${main(x)}.`,x=>`This is a ${sub(x)}.`),mem:[{Kreis:"⚪",Dreieck:"🔺",Quadrat:"🟦",Rechteck:"▬"}[n],n],
   why:W(shape(n),n==="Kreis"?"Ein Kreis ist rund und hat keine Ecken.":n==="Dreieck"?"Ein Dreieck hat 3 Ecken.":n==="Quadrat"?"Ein Quadrat hat 4 gleich lange Seiten.":"Ein Rechteck hat 2 lange und 2 kurze Seiten.",
    n==="Kreis"?"A circle is round with no corners.":n==="Dreieck"?"A triangle has 3 corners.":n==="Quadrat"?"A square has 4 equal sides.":"A rectangle has 2 long and 2 short sides.","colours")};},
 parent:{method:"German colour and shape words are needed from day one at school (‘Mal das Dreieck rot an!’).",
  words:[["rot / blau / gelb / grün","red / blue / yellow / green"],["der Kreis","circle"],["das Dreieck","triangle"],["das Quadrat","square"],["anmalen","to colour in"]],games:["‘Ich sehe was, was du nicht siehst, und das ist rot.’","Cut shapes from paper and name them in German."]}},
{id:24,k:0,sec:"Rechnen",emo:"🍓",de:"Dazutun bis 5",en:"Adding to 5 with pictures",blitz:true,
 say:["Wir haben 2 Erdbeeren. Es kommt 1 dazu. Jetzt zählen wir alle: 3!","We have 2 strawberries. 1 more comes. Now we count them all: 3!"],
 merk:["Plus heißt: es kommen welche dazu!","Plus means more are coming!"],
 ex:()=>[{vis:`<div class="addpic">${objs(2,"🍓")}<b>+</b>${objs(1,"🍓")}</div>`,de:"2 + 1 = 3",en:"2 plus 1 equals 3"}],
 gen(){const a=R(1,4),b=R(1,5-a),s=a+b,e=pick(["🍓","🐟","🎈","🍪"]);const vis=`<div class="addpic">${objs(a,e)}<b>+</b>${objs(b,e)}</div>`;
  return {vis,de:`${a} + ${b} = ?`,en:`What is ${a} plus ${b}?`,opts:nopts(s,[s+1,s-1],1,6),stmt:eqs(x=>`${a} + ${b} = ${x}`),mem:[`${a} + ${b}`,String(s)],
   why:W(numberedObjs(s,e),`Erst ${a}, dann kommen ${b} dazu. Zähle alle zusammen: ${cnt(1,s).join(", ")}. Das sind ${s}!`,`First ${a}, then ${b} more. Count them all: ${cnt(1,s).join(", ")}. That is ${s}!`,"add5")};},
 parent:{method:"First adding is ‘counting all’ with real objects. Later (Klasse 1) children learn to ‘count on’ from the bigger number.",
  words:[["dazutun","add"],["plus","plus"],["zusammen","together"]],games:["Snack maths: 2 grapes and 2 more — how many now?","Story sums with toys: 3 cars in the garage, 1 more drives in…"]}},
{id:25,k:0,sec:"Muster",emo:"🪜",de:"Was kommt danach?",en:"What comes next?",blitz:true,
 say:["Die Zahlen stehen immer in derselben Reihe: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.","Numbers always stand in the same row: 1 to 10."],
 merk:["Eins, zwei, drei – immer der Reihe nach!","One, two, three – always in order!"],
 ex:()=>[{vis:seqVis([1,2,3,4,5]),de:"1, 2, 3, 4, 5",en:"one to five"},{vis:seqVis([6,7,"?"]),de:"Nach der 7 kommt die 8.",en:"After 7 comes 8."}],
 gen(){const n=R(1,9),ty=pick(["after","seq","seq"]);
  if(ty==="after")return {vis:nline(0,10,{hi:[n],q:[n+1]}),de:`Welche Zahl kommt nach der ${n}?`,en:`Which number comes after ${n}?`,opts:nopts(n+1,[n,n+2],0,10),stmt:eqs(x=>`Nach der ${n} kommt die ${x}.`,x=>`After ${n} comes ${x}.`),mem:[`nach ${n}`,String(n+1)],
   why:W(nline(0,10,{hi:[n],jumps:[[n,n+1,"+1"]]}),`Zähl weiter: ${n}, ${n+1}! Nach der ${n} kommt die ${n+1}.`,`Count on: ${n}, ${n+1}! After ${n} comes ${n+1}.`,"order")};
  const st=R(1,6),seq=[st,st+1,st+2],nx=st+3;
  return {vis:seqVis([...seq,"?"]),de:`Zähl weiter: ${seq.join(", ")}, ?`,en:`Count on: ${seq.join(", ")}, ?`,opts:nopts(nx,[nx+1,nx-1,st],1,10),stmt:eqs(x=>`${seq.join(", ")}, ${x}`),mem:null,
   why:W(seqVis([...seq,nx]),`Immer eins mehr: ${seq.join(", ")}, ${nx}.`,`Always one more: ${seq.join(", ")}, ${nx}.`,"order")};},
 parent:{method:"Saying the number sequence forwards from any starting point (not only from 1) is an important pre-school skill.",
  words:[["danach / davor","after / before"],["weiterzählen","count on"],["der Reihe nach","in order"]],games:["Start counting at 4 (or 7) while she jumps.","Number cards 1–10: put them in order."]}}
);
