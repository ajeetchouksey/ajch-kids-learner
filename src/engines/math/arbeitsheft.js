/* ============================ 📕 ARBEITSHEFT (Klasse 1): practice that follows the order of the school workbook ============================
   Own exercises in the style of the workbook topics (no copied pages). Each unit lists the workbook pages (AH) it belongs to. */
Object.assign(RULE,{
 schreib:["Zahlen von 1 bis 10","Numbers 1 to 10","Jede Zahl hat ein Bild: 5 ist eine Hand voll, 10 sind zwei Hände. Zahlen schreibt man immer oben beim roten Punkt anfangen.","Each number has a picture: 5 is one hand, 10 is two hands. Start writing a number at the top, at the red dot."],
 immer:["Immer gleich viele","Always the same","Bei „Immer 6“ bleiben es zusammen immer 6: 4 + 2, 5 + 1, 3 + 3. Ein Teil wird größer, der andere kleiner.","“Always 6” means together it is always 6: 4 + 2, 5 + 1, 3 + 3. One part gets bigger, the other smaller."],
 story:["Rechengeschichten","Number stories","Schau das Bild genau an: Wie viele sind es zuerst? Kommen welche dazu (plus) oder gehen welche weg (minus)? Dann schreib die Aufgabe.","Look at the picture: how many are there first? Do more come (plus) or do some go away (minus)? Then write the sum."],
 pack:["Starke Päckchen","Strong packs","In einem starken Päckchen gibt es ein Muster: Eine Zahl bleibt gleich, die andere wird immer 1 größer. Dann wird auch das Ergebnis immer 1 größer.","A strong pack has a pattern: one number stays the same, the other gets 1 bigger each time. Then the answer also gets 1 bigger."],
 tower:["Türme bauen","Building towers","Probiere der Reihe nach: Welche Farbe ist unten? Dann tausche oben. So vergisst du keinen Turm und keiner kommt doppelt.","Try in order: which colour is at the bottom? Then swap the top. That way you forget no tower and none comes twice."],
 bund:["Bündeln","Bundling","Immer 10 Einer packen wir zu einem Zehner zusammen. 1 Zehner und 3 Einer sind 13.","We pack 10 ones together into one ten. 1 ten and 3 ones make 13."],
 vn:["Vorgänger und Nachfolger","Before and after","Der Vorgänger steht direkt davor: 1 weniger. Der Nachfolger kommt direkt danach: 1 mehr.","The number before is 1 less. The number after is 1 more."],
 strahl:["Der Zahlenstrahl","The number line","Auf dem Zahlenstrahl wird es nach rechts immer mehr. Die langen Striche sind 5, 10, 15 und 20. Zähle von dort weiter.","On the number line it gets bigger to the right. The long marks are 5, 10, 15 and 20. Count on from there."],
 f20:["Das Zwanzigerfeld","The twenty-frame","Oben sind 10, unten sind 10. Eine volle Reihe ist ein Zehner. 10 und 4 sind 14.","10 on top, 10 below. A full row is one ten. 10 and 4 make 14."],
 analog:["Analogieaufgaben","Similar sums","Die kleine Aufgabe hilft: 5 − 4 = 1, also ist 15 − 4 = 11. Nur der Zehner kommt dazu.","The small sum helps: 5 − 4 = 1, so 15 − 4 = 11. Just add the ten."],
 erg:["Ergänzen","Making up","Ergänzen heißt: Wie viele fehlen noch? 7 + ? = 10. Zähle von 7 bis 10: 8, 9, 10 – es fehlen 3.","Making up means: how many are still missing? 7 + ? = 10. Count from 7 to 10: 8, 9, 10 – 3 are missing."],
 dreieck:["Das Rechendreieck","The number triangle","Im Rechendreieck rechnet man die zwei Zahlen innen an einer Seite zusammen. Das Ergebnis steht außen an dieser Seite.","In the number triangle you add the two inner numbers on one side. The answer stands outside on that side."],
 gerade:["Gerade und ungerade","Even and odd","Gerade Zahlen kann man in Paare legen, ohne dass einer übrig bleibt: 2, 4, 6, 8, 10. Bei ungeraden bleibt einer allein: 1, 3, 5, 7, 9.","Even numbers make pairs with none left over: 2, 4, 6, 8, 10. With odd numbers one is left alone: 1, 3, 5, 7, 9."],
 nachbar:["Nachbaraufgaben","Neighbour sums","Eine leichte Aufgabe hilft bei der Nachbaraufgabe: 5 + 5 = 10, also ist 5 + 6 = 11 (eins mehr).","An easy sum helps with its neighbour: 5 + 5 = 10, so 5 + 6 = 11 (one more)."],
 zu2:["Zwei Schritte","Two steps","Erst bis zur 10, dann weiter: 8 + 5 = 8 + 2 + 3 = 13. Bei Minus erst zurück bis zur 10: 13 − 5 = 13 − 3 − 2 = 8.","First to 10, then on: 8 + 5 = 8 + 2 + 3 = 13. With minus first back to 10: 13 − 5 = 13 − 3 − 2 = 8."],
 neun:["Strategie für die 9","Trick for 9","Plus 9 ist wie plus 10 und dann 1 weniger: 6 + 9 = 6 + 10 − 1 = 15.","Plus 9 is like plus 10 and then 1 less: 6 + 9 = 6 + 10 − 1 = 15."],
 geld20:["Geld bis 20","Money up to 20","Zähle zuerst die großen Münzen oder Scheine, dann die kleinen dazu: 10 € + 5 € + 2 € = 17 €.","Count the big coins or notes first, then add the small ones: 10 € + 5 € + 2 € = 17 €."],
 koerper:["Formen und Körper","Shapes and solids","Flache Formen: Kreis, Dreieck, Quadrat, Rechteck. Körper kann man anfassen: Kugel, Würfel, Quader, Zylinder.","Flat shapes: circle, triangle, square, rectangle. Solids you can hold: sphere, cube, cuboid, cylinder."],
 stunde:["Volle Stunde","O'clock","Bei der vollen Stunde zeigt der lange Zeiger genau nach oben auf die 12. Der kurze Zeiger zeigt die Stunde.","At o'clock the long hand points straight up to 12. The short hand shows the hour."]
});

/* ---------- pictures ---------- */
const AHP=s=>`<span class="ahp">📕 AH S. ${s}</span>`;
function scene(n,e,{away=0,come=0}={}){const stay=[...Array(n-away)].map(()=>`<span>${e}</span>`).join(""),gone=[...Array(away)].map(()=>`<span class="aw">${e}</span>`).join(""),
  more=come?`<span class="scplus">+</span>${[...Array(come)].map(()=>`<span class="nw">${e}</span>`).join("")}`:"";
  return `<div class="scene">${stay}${gone}${more}${away?`<span class="awarrow">➜</span>`:""}</div>`;}
function pack(rows){return `<div class="pack">${rows.map(r=>`<div class="pr">${r.map(x=>`<span class="${x==="?"?"pq":""}">${x}</span>`).join("")}</div>`).join("")}</div>`;}
const TCOL={s:"#4A4F5C",g:"#47A84B",y:"#F2C230",r:"#E0443E",b:"#3B6FE0"},TNAME={s:["schwarz","black"],g:["grün","green"],y:["gelb","yellow"],r:["rot","red"],b:["blau","blue"]};
function tower(cols){return `<span class="tower">${cols.slice().reverse().map(c=>`<span style="background:${TCOL[c]}"></span>`).join("")}</span>`;}
function zeBox(z,e){return `<table class="zebox"><tr><th>Z</th><th>E</th></tr><tr><td>${z}</td><td>${e}</td></tr></table>`;}
function vnRow(a,b,c){return `<div class="vnrow">${[a,b,c].map(x=>`<span class="${x==="?"?"q":""}">${x}</span>`).join("")}</div>`;}
function tri(a,b,c,show){const ab=a+b,bc=b+c,ac=a+c,v=(k,val)=>show.includes(k)?val:"?";
  const box=(x,y,t,cls)=>`<rect x="${x-17}" y="${y-15}" width="34" height="28" rx="6" fill="${t==="?"?"#FFF3C4":"#fff"}" stroke="#1D2B53" stroke-width="2"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="700" fill="#1D2B53">${t}</text>`;
  const dots=(n,cx,cy)=>{let s="";for(let i=0;i<n;i++){const col=i%5,row=Math.floor(i/5);s+=`<circle cx="${cx-16+col*8}" cy="${cy+row*9}" r="3.4" fill="#E0443E"/>`;}return s;};
  return `<svg class="trisvg" viewBox="0 0 240 200" role="img" aria-label="Rechendreieck"><path d="M120 20 L220 185 L20 185 Z" fill="#FBF7EF" stroke="#1D2B53" stroke-width="2.5"/><path d="M120 110 L120 20 M120 110 L220 185 M120 110 L20 185" stroke="#B9C0D4" stroke-width="1.5"/>
    ${dots(a,120,62)}${dots(b,165,150)}${dots(c,75,150)}${box(190,95,v("ab",ab))}${box(50,95,v("ac",ac))}${box(120,195-14,v("bc",bc))}</svg>`;}
function pairs(n){let s="";for(let i=0;i<n;i+=2)s+=`<span class="pair">${i+1<n?"🔴🔴":"🔴"}</span>`;return `<div class="pairs">${s}</div>`;}
const BODIES={Kugel:["sphere","⚽"],Würfel:["cube","🎲"],Quader:["cuboid","📦"],Zylinder:["cylinder","🥫"]};
const COINS20=[["10€",10],["5€",5],["2€",2],["1€",1]];
const money20=money;
const fullField=(n,cls="b")=>field(fill([n,cls]),n>10?20:10);
const ofU=id=>UNITS.find(u=>u.id===id);
const fromU=id=>{const q=ofU(id).gen();delete q.mem;return q;};
const EMO=["🐦","🐸","🐭","🦔","🐟","🦆","🐰","🐞","🍎","🎈","🚗","🐝"];

const AH_UNITS=[
{id:34,k:"A",sec:"Zahlen",emo:"✏️",de:"Die Zahlen 1 bis 10",en:"Numbers 1 to 10",ah:[1,6],page:"1–6",
 say:["Wir lernen jede Zahl von 1 bis 10: wie man sie schreibt und wie viele es sind. 5 ist eine ganze Hand, 10 sind zwei Hände.","We learn every number from 1 to 10: how to write it and how many it is. 5 is a whole hand, 10 is two hands."],
 merk:["Zählen: jedes Ding nur einmal antippen!","Counting: touch each thing only once!"],
 ex:()=>[{vis:objs(6,"🐥"),de:"6 Küken. Ich zähle: 1, 2, 3, 4, 5, 6.",en:"6 chicks. I count: 1, 2, 3, 4, 5, 6."},{vis:dice(4)+dice(2),de:"Immer 6: 4 und 2.",en:"Always 6: 4 and 2."}],
 gen(){const ty=pick(["count","count","dice","immer5","row","fing"]);
  if(ty==="count"){const n=R(1,10),e=pick(EMO);return {vis:objs(n,e),de:"Wie viele sind es? Zähle genau.",en:"How many are there? Count carefully.",opts:nopts(n,[n+1,n-1],0,10),stmt:eqs(a=>`Es sind ${a}.`,a=>`There are ${a}.`),mem:[e.repeat(Math.min(n,5))+(n>5?"…":""),String(n)],
    why:W(numberedObjs(n,e),`Tippe jedes Bild einmal an und zähle mit: Das letzte Wort ist ${n}.`,`Touch each picture once and count: the last word is ${n}.`,"count")};}
  if(ty==="dice"){const a=R(1,5),b=6-a;return {vis:`<div class="dpair">${dice(a)}<span class="dq">?</span></div>`,de:`Immer 6! Ein Würfel zeigt ${a}. Was zeigt der andere?`,en:`Always 6! One dice shows ${a}. What does the other show?`,opts:nopts(b,[a,b+1,b-1],1,6),stmt:eqs(x=>`${a} + ${x} = 6`),
    why:W(dice(a)+dice(b),`${a} und ${b} sind zusammen 6. Zähle von ${a} weiter bis 6.`,`${a} and ${b} make 6 together. Count on from ${a} to 6.`,"immer")};}
  if(ty==="immer5"){const r=R(1,4),b=5-r;return {vis:field(fill([b,"b"],[r,"r"]),10),de:"Immer 5! Wie viele sind rot?",en:"Always 5! How many are red?",opts:nopts(r,[b,r+1],0,5),stmt:eqs(x=>`${b} + ${x} = 5`),
    why:W(field(fill([b,"b"],[r,"r"]),10),`${b} sind blau. Bis 5 fehlen ${r}: ${b} + ${r} = 5.`,`${b} are blue. ${r} more make 5: ${b} + ${r} = 5.`,"immer")};}
  if(ty==="fing"){const s=R(1,9);return {vis:hands(s),de:"Immer 10! Wie viele Finger sind unten?",en:"Always 10! How many fingers are down?",opts:nopts(10-s,[s,11-s],0,10),stmt:eqs(x=>`${s} + ${x} = 10`),
    why:W(hands(s),`${s} Finger sind oben. Zu 10 fehlen ${10-s}.`,`${s} fingers are up. ${10-s} are missing to make 10.`,"ten")};}
  const back=Math.random()<.5,st=back?R(5,10):R(1,6),seq=cnt(0,3).map(i=>back?st-i:st+i),gap=R(1,3),ans=seq[gap];const show=seq.map((x,i)=>i===gap?"?":x);
  return {vis:seqVis(show),de:back?"Zähle rückwärts. Welche Zahl fehlt?":"Zähle vorwärts. Welche Zahl fehlt?",en:back?"Count backwards. Which number is missing?":"Count forwards. Which number is missing?",opts:nopts(ans,[ans+1,ans-1],0,10),
   stmt:eqs(x=>seq.map((y,i)=>i===gap?x:y).join(", ")),why:W(seqVis(seq),back?"Rückwärts wird jede Zahl 1 kleiner.":"Vorwärts wird jede Zahl 1 größer.",back?"Backwards each number gets 1 smaller.":"Forwards each number gets 1 bigger.","row")};}},

{id:35,k:"A",sec:"Zahlen",emo:"🛍️",de:"Mengen und die Zahlenreihe",en:"Amounts and the number row",ah:[7,7],page:"7",
 say:["Auf jeder Tasche steht eine Zahl. So viele Punkte gehören hinein. Dann zählen wir vorwärts und rückwärts.","Each bag shows a number. That many dots go inside. Then we count forwards and backwards."],
 merk:["0 heißt: gar nichts!","0 means: nothing at all!"],
 ex:()=>[{vis:objs(4,"🔴"),de:"Auf der Tasche steht 4: vier Punkte.",en:"The bag says 4: four dots."},{vis:seqVis([7,6,5,4]),de:"Rückwärts: 7, 6, 5, 4.",en:"Backwards: 7, 6, 5, 4."}],
 gen(){const ty=pick(["bag","bag","row","zero"]);
  if(ty==="bag"){const n=R(0,10),have=Math.max(0,n-R(1,3));return {vis:`<div class="bag"><span class="bn">${n}</span>${have?objs(have,"🔴"):'<span class="bempty">leer</span>'}</div>`,de:`Auf der Tasche steht ${n}. Wie viele Punkte musst du noch malen?`,en:`The bag says ${n}. How many more dots must you draw?`,opts:nopts(n-have,[n-have+1,n,have],0,10),
    stmt:eqs(x=>`${have} + ${x} = ${n}`),why:W(objs(n,"🔴"),`In der Tasche sind ${have}. Bis ${n} fehlen ${n-have}.`,`There are ${have} in the bag. ${n-have} more make ${n}.`,"count")};}
  if(ty==="zero"){const n=R(1,4);return {vis:`<div class="bag"><span class="bn">?</span><span class="bempty">leer</span></div>`,de:"Die Tasche ist leer. Welche Zahl steht darauf?",en:"The bag is empty. Which number is on it?",opts:nopts(0,[1,10],0,10),stmt:eqs(x=>`Leer heißt ${x}.`,x=>`Empty means ${x}.`),
    why:W(eqline("leer = 0"),"Wenn gar nichts drin ist, schreiben wir 0.","If nothing is inside, we write 0.","count")};}
  const back=Math.random()<.5,len=R(6,8),st=back?R(len-1,10):R(0,10-len+1),seq=cnt(0,len-1).map(i=>back?st-i:st+i),gap=R(2,len-2);
  return {vis:seqVis(seq.map((x,i)=>i===gap?"?":x)),de:back?"Zähle rückwärts. Welche Zahl gehört in die Lücke?":"Zähle vorwärts. Welche Zahl gehört in die Lücke?",en:back?"Count backwards. Which number fills the gap?":"Count forwards. Which number fills the gap?",opts:nopts(seq[gap],[seq[gap]+1,seq[gap]-1],0,10),
   stmt:eqs(x=>`… ${seq[gap-1]}, ${x}, ${seq[gap+1]} …`),why:W(seqVis(seq),`Vor der Lücke steht ${seq[gap-1]}, danach ${seq[gap+1]}. Dazwischen liegt ${seq[gap]}.`,`Before the gap is ${seq[gap-1]}, after it ${seq[gap+1]}. In between is ${seq[gap]}.`,"row")};}},

{id:36,k:"A",sec:"Rechnen",emo:"💐",de:"Zerlegen: Schüttelbox, Plus, Kombinationen",en:"Splitting: shake box, plus, combinations",ah:[8,10],page:"8–10",
 say:["Eine Zahl kann man in Teile zerlegen: 5 Blumen sind 3 rote und 2 blaue. Mit dem Pluszeichen schreiben wir 3 + 2.","A number can be split into parts: 5 flowers are 3 red and 2 blue. With the plus sign we write 3 + 2."],
 merk:["Finde alle Möglichkeiten – der Reihe nach!","Find all the ways – in order!"],
 ex:()=>[{vis:scene(5,"🌷"),de:"5 Tulpen: 4 + 1, 3 + 2, 2 + 3 …",en:"5 tulips: 4 + 1, 3 + 2, 2 + 3 …"}],
 gen(){const ty=pick(["box","bal","three","vase","vase"]);
  if(ty==="box")return fromU(29);if(ty==="bal")return fromU(26);if(ty==="three")return fromU(27);
  const n=R(4,7),r=R(0,n),b=n-r;const flowers=`<div class="vase">${"🌹".repeat(r)}${"💠".repeat(b)}<span class="vn">${n}</span></div>`;
  return {vis:flowers,de:`In der Vase sind ${n} Blumen. ${r} sind rot. Wie viele sind blau?`,en:`There are ${n} flowers in the vase. ${r} are red. How many are blue?`,opts:nopts(b,[r,b+1,b-1],0,n),
   stmt:eqs(x=>`${r} + ${x} = ${n}`),why:W(flowers+eqline(`${r} + ${b} = ${n}`),`Alle zusammen sind ${n}. ${r} sind rot, die anderen ${b} sind blau.`,`${n} in all. ${r} are red, the other ${b} are blue.`,"split")};}},

{id:37,k:"A",sec:"Rechnen",emo:"🏡",de:"Das Zerlegehaus",en:"The splitting house",ah:[11,11],page:"11",blitz:true,
 say:ofU(28).say,merk:ofU(28).merk,ex:ofU(28).ex,
 gen(){if(Math.random()<.6)return fromU(28);const n=R(3,10),rows=cnt(0,n).map(i=>[i,n-i]),k=R(1,n-1),left=Math.random()<.5;
  const shown=rows.map((r,i)=>i===k?(left?["?",r[1]]:[r[0],"?"]):r).slice(Math.max(0,k-2),k+2);const ans=left?k:n-k;
  return {vis:zhHtml(n,shown),de:`Haus ${n}: Welche Zahl fehlt?`,en:`House ${n}: which number is missing?`,opts:nopts(ans,[ans+1,ans-1,n],0,10),stmt:eqs(x=>left?`${x} + ${n-k} = ${n}`:`${k} + ${x} = ${n}`),
   why:W(zhHtml(n,[[k,n-k]]),`Beide Zahlen zusammen ergeben immer das Dach: ${k} + ${n-k} = ${n}.`,`Both numbers together always make the roof: ${k} + ${n-k} = ${n}.`,"zhaus")};}},

{id:38,k:"A",sec:"Muster",emo:"🔷",de:"Tabellen, Formen und Muster",en:"Tables, shapes and patterns",ah:[12,15],page:"12–15",
 say:["Wir zählen und tragen in Tabellen ein, erkennen Formen und setzen Muster fort.","We count and fill in tables, recognise shapes and continue patterns."],
 merk:["Muster: Was wiederholt sich?","Pattern: what repeats?"],
 ex:()=>[{vis:`<div class="patrow">🔺🟦🔺🟦🔺❓</div>`,de:"Dreieck, Quadrat, Dreieck, Quadrat … dann kommt Quadrat.",en:"Triangle, square, triangle, square … then comes square."}],
 gen(){const ty=pick(["data","shape","pat","pat"]);if(ty==="data")return fromU(32);if(ty==="shape")return fromU(13);
  const sets=[["🔺","🟦"],["🔴","🟡","🔵"],["⭐","⭐","🌙"],["🟩","🔺","🔺"],["🍎","🍌"]],p=pick(sets),len=R(5,7),seq=cnt(0,len-1).map(i=>p[i%p.length]),ans=p[len%p.length];
  return {vis:`<div class="patrow">${seq.join("")}❓</div>`,de:"Setze das Muster fort. Was kommt als Nächstes?",en:"Continue the pattern. What comes next?",opts:sopts(ans,[...new Set([...p,"🟣","⬛"])].filter(x=>x!==ans)),
   stmt:eqs(x=>`… ${seq.slice(-2).join(" ")} ${x}`),why:W(`<div class="patrow">${seq.join("")}${ans}</div>`,`Das Muster ist ${p.join(" ")} – immer wieder von vorn.`,`The pattern is ${p.join(" ")} – again and again.`,"pat")};}},

{id:39,k:"A",sec:"Sachaufgaben",emo:"🦒",de:"Rechengeschichten: Plus",en:"Number stories: plus",ah:[16,20],pgs:[16,20],page:"16, 20",
 say:["In einer Rechengeschichte erzählt ein Bild etwas: 3 Kinder spielen, 2 kommen dazu. Dazu schreiben wir: 3 + 2 = 5.","A picture tells a number story: 3 children play, 2 more come. We write: 3 + 2 = 5."],
 merk:["Dazu kommen = plus!","More come = plus!"],
 ex:()=>[{vis:scene(3,"🐧",{come:2}),de:"3 Pinguine, 2 kommen dazu: 3 + 2 = 5.",en:"3 penguins, 2 more come: 3 + 2 = 5."}],
 gen(){const a=R(1,6),b=R(1,10-a),e=pick(["🐧","🦩","🐒","🚗","🐰","🦜","🐟"]);const ty=pick(["sum","sum","task"]);
  if(ty==="task"){const c=`${a} + ${b} = ${a+b}`;return {vis:scene(a,e,{come:b}),de:"Welche Aufgabe passt zum Bild?",en:"Which sum fits the picture?",opts:sopts(c,[`${a} − ${b} = ${Math.max(0,a-b)}`,`${a+1} + ${b} = ${a+b+1}`,`${b} + ${a+b} = ${a+2*b}`]),stmt:eqs(x=>x),
    why:W(scene(a,e,{come:b}),`Zuerst sind es ${a}. ${b} kommen dazu. Das ist plus: ${c}.`,`First there are ${a}. ${b} more come. That is plus: ${c}.`,"story")};}
  return {vis:scene(a,e,{come:b}),de:`${a} sind schon da, ${b} kommen dazu. Wie viele sind es jetzt?`,en:`${a} are there, ${b} more come. How many now?`,opts:nopts(a+b,[a+b+1,a+b-1,a],0,10),stmt:eqs(x=>`${a} + ${b} = ${x}`),
   why:W(scene(a,e,{come:b})+eqline(`${a} + ${b} = ${a+b}`),`Starte bei ${a} und zähle ${b} weiter: ${cnt(a+1,a+b).join(", ")}.`,`Start at ${a} and count on ${b}: ${cnt(a+1,a+b).join(", ")}.`,"story")};}},

{id:40,k:"A",sec:"Rechnen",emo:"🟥",de:"Plus mit dem Zehnerfeld, Tauschaufgaben",en:"Plus with the ten-frame, swap sums",ah:[17,19],page:"17–19",blitz:true,
 say:["Im Zehnerfeld legen wir zwei Farben: 4 rote und 3 blaue sind 4 + 3 = 7. Dreht man das Feld um, sieht man die Tauschaufgabe 3 + 4 = 7.","In the ten-frame we put two colours: 4 red and 3 blue are 4 + 3 = 7. Turn it round and you see the swap sum 3 + 4 = 7."],
 merk:["Tauschaufgabe: gleiches Ergebnis!","Swap sum: same answer!"],
 ex:()=>[{vis:field(fill([4,"r"],[3,"b"])),de:"4 + 3 = 7 und 3 + 4 = 7",en:"4 + 3 = 7 and 3 + 4 = 7"}],
 gen(){const a=R(1,7),b=R(1,10-a),ty=pick(["read","read","swap"]);
  if(ty==="swap"){const c=`${b} + ${a}`;return {vis:field(fill([a,"r"],[b,"b"])),de:`${a} + ${b} = ${a+b}. Wie heißt die Tauschaufgabe?`,en:`${a} + ${b} = ${a+b}. What is the swap sum?`,opts:sopts(c,[`${a} + ${b+1}`,`${a+b} − ${a}`,`${b} − ${a}`].filter(x=>x!==c)),stmt:eqs(x=>`${x} = ${a+b}`),
    why:W(field(fill([b,"b"],[a,"r"])),`Die Zahlen tauschen den Platz: ${b} + ${a}. Das Ergebnis bleibt ${a+b}.`,`The numbers swap places: ${b} + ${a}. The answer stays ${a+b}.`,"swap")};}
  return {vis:field(fill([a,"r"],[b,"b"])),de:`Rot und blau: ${a} + ${b} = ?`,en:`Red and blue: ${a} + ${b} = ?`,opts:nopts(a+b,[a+b+1,a+b-1],0,10),stmt:eqs(x=>`${a} + ${b} = ${x}`),
   why:W(field(fill([a,"r"],[b,"b"])),`${a} rote und ${b} blaue Plättchen sind zusammen ${a+b}. Tipp: Bei 5 ist die erste Reihe voll.`,`${a} red and ${b} blue counters make ${a+b}. Tip: at 5 the first row is full.`,"add")};}},

{id:41,k:"A",sec:"Muster",emo:"📜",de:"Starke Päckchen",en:"Strong packs",ah:[21,26],pgs:[21,26],page:"21, 26",blitz:true,
 say:["Ein starkes Päckchen hat ein Muster. 5 + 1, 5 + 2, 5 + 3: Die zweite Zahl wird immer 1 größer – also auch das Ergebnis.","A strong pack has a pattern. 5 + 1, 5 + 2, 5 + 3: the second number gets 1 bigger – so does the answer."],
 merk:["Erst das Muster finden, dann rechnen!","Find the pattern first, then calculate!"],
 ex:()=>[{vis:pack([["5 + 0 =","5"],["5 + 1 =","6"],["5 + 2 =","7"]]),de:"Immer 1 mehr.",en:"Always 1 more."}],
 gen(){const ty=pick(["up","up","ten","minus"]);let rows,q;
  if(ty==="up"){const a=R(0,6),s=R(0,9-a-3);rows=cnt(0,3).map(i=>[a,s+i]);q=rows.map(([x,y])=>[`${x} + ${y} =`,x+y]);}
  else if(ty==="ten"){const s=R(5,8);rows=cnt(0,3).map(i=>[s+i,10-s-i]);q=rows.map(([x,y])=>[`${x} + ${y} =`,10]);}
  else{const n=R(6,10),s=R(1,3);q=cnt(0,3).map(i=>[`${n} − ${s+i} =`,n-s-i]);}
  const ans=q[3][1],shown=q.map((r,i)=>i<3?[r[0],String(r[1])]:[r[0],"?"]);
  return {vis:pack(shown),de:"Setze das Päckchen fort. Was kommt heraus?",en:"Continue the pack. What is the answer?",opts:nopts(ans,[ans+1,ans-1,q[2][1]],0,20),stmt:eqs(x=>`${q[3][0]} ${x}`),
   why:W(pack(q.map(r=>[r[0],String(r[1])])),ty==="ten"?"Die erste Zahl wird 1 größer, die zweite 1 kleiner. Das Ergebnis bleibt immer 10!":ty==="minus"?"Es wird immer 1 mehr weggenommen. Dann wird das Ergebnis immer 1 kleiner.":"Eine Zahl wird immer 1 größer. Darum wird das Ergebnis auch immer 1 größer.",
    ty==="ten"?"The first number gets 1 bigger, the second 1 smaller. The answer always stays 10!":ty==="minus"?"Each time 1 more is taken away, so the answer gets 1 smaller.":"One number gets 1 bigger each time, so the answer gets 1 bigger too.","pack")};}},

{id:42,k:"A",sec:"Sachaufgaben",emo:"🦊",de:"Rechengeschichten: Minus",en:"Number stories: minus",ah:[22,23],page:"22–23",
 say:["Bei Minus gehen welche weg: 6 Vögel sitzen da, 2 fliegen weg. Dann sind noch 4 da: 6 − 2 = 4.","With minus some go away: 6 birds sit there, 2 fly away. Then 4 are left: 6 − 2 = 4."],
 merk:["Weggehen, wegfliegen = minus!","Go away, fly away = minus!"],
 ex:()=>[{vis:scene(6,"🐦",{away:2}),de:"6 − 2 = 4",en:"6 − 2 = 4"}],
 gen(){const n=R(2,10),k=R(1,n-1),e=pick(["🐦","🐸","🐭","🦔","🦊","🐷","🦌","🐰"]);const ty=pick(["rest","rest","away","task"]);
  if(ty==="away")return {vis:scene(n,e,{away:k}),de:`Es waren ${n}. Wie viele gehen weg?`,en:`There were ${n}. How many go away?`,opts:nopts(k,[n-k,k+1],0,10),stmt:eqs(x=>`${n} − ${x} = ${n-k}`),
   why:W(scene(n,e,{away:k}),`Die blassen Tiere gehen weg. Das sind ${k}.`,`The faded animals go away. That is ${k}.`,"story")};
  if(ty==="task"){const c=`${n} − ${k} = ${n-k}`;return {vis:scene(n,e,{away:k}),de:"Welche Aufgabe passt zum Bild?",en:"Which sum fits the picture?",opts:sopts(c,[`${n} + ${k} = ${n+k}`,`${n} − ${n-k} = ${k}`,`${k} − ${n} = 0`].filter(x=>x!==c)),stmt:eqs(x=>x),
   why:W(scene(n,e,{away:k}),`Zuerst ${n}, dann gehen ${k} weg: ${c}.`,`First ${n}, then ${k} go away: ${c}.`,"story")};}
  return {vis:scene(n,e,{away:k}),de:`${n} sind da. ${k} gehen weg. Wie viele bleiben?`,en:`${n} are there. ${k} go away. How many are left?`,opts:nopts(n-k,[n-k+1,n-k-1,k],0,10),stmt:eqs(x=>`${n} − ${k} = ${x}`),
   why:W(scene(n,e,{away:k})+eqline(`${n} − ${k} = ${n-k}`),`Zähle nur die Tiere, die bleiben: ${n-k}.`,`Count only the animals that stay: ${n-k}.`,"sub")};}},

{id:43,k:"A",sec:"Rechnen",emo:"✖️",de:"Minus mit dem Zehnerfeld",en:"Minus with the ten-frame",ah:[24,25],page:"24–25",blitz:true,
 say:["Bei Minus streichen wir im Zehnerfeld durch: 8 − 3, drei Plättchen bekommen ein Kreuz. Übrig bleiben 5.","For minus we cross out in the ten-frame: 8 − 3, three counters get a cross. 5 are left."],
 merk:["Streiche durch. Rechne.","Cross out. Calculate."],
 ex:()=>[{vis:field(fill([5,"r"],[3,"x"])),de:"8 − 3 = 5",en:"8 − 3 = 5"}],
 gen(){const n=R(3,10),k=R(1,n),ty=pick(["calc","calc","read"]);const vis=field(fill([n-k,"r"],[k,"x"]));
  if(ty==="read"){const c=`${n} − ${k}`;return {vis,de:"Welche Minusaufgabe zeigt das Zehnerfeld?",en:"Which minus sum does the ten-frame show?",opts:sopts(c,[`${n} − ${n-k}`,`${n-k} − ${k}`,`${n} + ${k}`].filter(x=>x!==c)),stmt:eqs(x=>`${x} = ${n-k}`),
   why:W(vis,`Es sind ${n} Plättchen, ${k} sind durchgestrichen: ${c} = ${n-k}.`,`There are ${n} counters, ${k} are crossed out: ${c} = ${n-k}.`,"sub")};}
  return {vis,de:`${n} − ${k} = ?`,en:`${n} minus ${k}?`,opts:nopts(n-k,[n-k+1,n-k-1,k],0,10),stmt:eqs(x=>`${n} − ${k} = ${x}`),
   why:W(vis,`Zähle die Plättchen ohne Kreuz: ${n-k}.`,`Count the counters without a cross: ${n-k}.`,"sub")};}},

{id:44,k:"A",sec:"Geometrie",emo:"🧱",de:"Kombinationen: Türme",en:"Combinations: towers",ah:[27,27],page:"27",
 say:["Wir bauen Türme aus bunten Steinen. Keine Farbe darf doppelt sein. Wenn wir der Reihe nach probieren, finden wir alle Türme.","We build towers from coloured bricks. No colour twice. If we try in order, we find every tower."],
 merk:["Der Reihe nach probieren!","Try in order!"],
 ex:()=>[{vis:`<div class="towers">${tower(["s","g"])}${tower(["g","s"])}${tower(["s","y"])}${tower(["y","s"])}${tower(["g","y"])}${tower(["y","g"])}</div>`,de:"3 Farben, 2 Steine: 6 Türme.",en:"3 colours, 2 bricks: 6 towers."}],
 gen(){const ty=pick(["count","miss","miss","same"]);const C=["s","g","y"];
  const all2=[];for(const a of C)for(const b of C)if(a!==b)all2.push([a,b]);
  if(ty==="count"){const three=Math.random()<.5,n=6;return {vis:`<div class="towers">${C.map(c=>tower([c])).join("")}</div>`,de:three?"Du hast drei Farben. Wie viele verschiedene Türme mit 3 Steinen kannst du bauen? Keine Farbe doppelt.":"Du hast drei Farben. Wie viele verschiedene Türme mit 2 Steinen kannst du bauen? Keine Farbe doppelt.",
    en:three?"You have three colours. How many different towers of 3 bricks can you build? No colour twice.":"You have three colours. How many different towers of 2 bricks can you build? No colour twice.",opts:nopts(n,[3,9,4],1,12),stmt:eqs(x=>`Es gibt ${x} Türme.`,x=>`There are ${x} towers.`),
    why:W(`<div class="towers">${(three?[["s","g","y"],["s","y","g"],["g","s","y"],["g","y","s"],["y","s","g"],["y","g","s"]]:all2).map(tower).join("")}</div>`,"Jede Farbe kommt einmal nach unten. Für jede untere Farbe gibt es 2 Türme: 3 · 2 = 6.","Each colour goes to the bottom once. For each bottom colour there are 2 towers: 3 × 2 = 6.","tower")};}
  if(ty==="same"){const good=pick(all2),bad=[good[0],good[0]],right=Math.random()<.5,side=right?"rechts":"links";return {vis:`<div class="towers">${right?tower(good)+tower(bad):tower(bad)+tower(good)}</div>`,de:"Welcher Turm ist nicht erlaubt? Keine Farbe darf doppelt sein.",en:"Which tower is not allowed? No colour twice.",opts:sopts(side,[right?"links":"rechts"]),stmt:eqs(x=>`Nicht erlaubt: der Turm ${x}`,x=>`Not allowed: the tower on the ${x==="rechts"?"right":"left"}`),
    why:W(tower(bad),`Im Turm ${side} ist ${TNAME[good[0]][0]} zweimal.`,`In the tower on the ${right?"right":"left"} ${TNAME[good[0]][1]} is there twice.`,"tower")};}
  const missing=pick(all2),shown=shuffle(all2.filter(t=>t!==missing));const nm=t=>`${TNAME[t[0]][0]} unten, ${TNAME[t[1]][0]} oben`;
  return {vis:`<div class="towers">${shown.map(tower).join("")}<span class="tower tq">?</span></div>`,de:"Ein Turm fehlt noch. Welcher?",en:"One tower is missing. Which one?",opts:sopts(nm(missing),shown.slice(0,2).map(nm)),stmt:eqs(x=>`Es fehlt: ${x}.`),
   why:W(`<div class="towers">${all2.map(tower).join("")}</div>`,"Ordne nach der unteren Farbe. Bei jeder unteren Farbe gibt es zwei Türme. So siehst du, welcher fehlt.","Sort by the bottom colour. Each bottom colour has two towers. Then you see which is missing.","tower")};}},

{id:45,k:"A",sec:"Zahlen",emo:"📦",de:"Bündeln: Zehner und Einer",en:"Bundling: tens and ones",ah:[28,28],page:"28",
 say:["Immer 10 Würfel stecken wir zu einer Stange zusammen. Eine Stange ist ein Zehner, ein Würfel ist ein Einer.","We stick 10 cubes together into a rod. A rod is one ten, a cube is one."],
 merk:["Z = Zehner, E = Einer","Z = tens, E = ones"],
 ex:()=>[{vis:tensOnes(1,3)+zeBox(1,3),de:"1 Zehner und 3 Einer sind 13.",en:"1 ten and 3 ones make 13."}],
 gen(){const n=R(4,20),z=Math.floor(n/10),e=n%10,ty=pick(["num","num","ze","circle"]);
  if(ty==="ze")return {vis:tensOnes(z,e),de:"Wie viele Einer sind es?",en:"How many ones are there?",opts:nopts(e,[e+1,z,10-e],0,10),stmt:eqs(x=>`${z} Z ${x} E`),
   why:W(tensOnes(z,e)+zeBox(z,e),`Die einzelnen Würfel sind die Einer: ${e}.`,`The single cubes are the ones: ${e}.`,"bund")};
  if(ty==="circle"){const m=R(11,19);return {vis:`<div class="loose">${"🟦".repeat(m)}</div>`,de:`Kreise 10 ein. Wie viele bleiben übrig?`,en:`Circle 10. How many are left over?`,opts:nopts(m-10,[m-9,10],0,10),stmt:eqs(x=>`${m} = 10 + ${x}`),
   why:W(tensOnes(1,m-10),`10 sind ein Bündel. Übrig bleiben ${m-10}: ${m} = 1 Z ${m-10} E.`,`10 make a bundle. ${m-10} are left: ${m} = 1 ten ${m-10} ones.`,"bund")};}
  return {vis:tensOnes(z,e),de:"Welche Zahl ist das?",en:"Which number is this?",opts:nopts(n,[e*10+z>20?n+1:e*10+z,n+10>20?n-1:n+10,n+1],0,20),stmt:eqs(x=>`${z} Z ${e} E = ${x}`),
   why:W(tensOnes(z,e)+zeBox(z,e),`${z} Zehner und ${e} Einer: ${z*10} + ${e} = ${n}.`,`${z} tens and ${e} ones: ${z*10} + ${e} = ${n}.`,"bund")};}},

{id:46,k:"A",sec:"Zahlen",emo:"👫",de:"Vorgänger und Nachfolger",en:"Before and after",ah:[29,29],page:"29",blitz:true,
 say:["Jede Zahl hat einen Vorgänger (1 weniger) und einen Nachfolger (1 mehr). Bei 15: 14 – 15 – 16.","Every number has one before (1 less) and one after (1 more). For 15: 14 – 15 – 16."],
 merk:["Vorgänger: davor. Nachfolger: danach.","Before: in front. After: behind."],
 ex:()=>[{vis:vnRow(14,15,16),de:"14 – 15 – 16",en:"14 – 15 – 16"}],
 gen(){const n=R(1,19),pos=pick([0,2,0,2,1]),row=[n-1,n,n+1],ans=row[pos];const show=row.map((x,i)=>i===pos?"?":x);
  const de=pos===0?`Wie heißt der Vorgänger von ${n}?`:pos===2?`Wie heißt der Nachfolger von ${n}?`:`Welche Zahl liegt zwischen ${n-1} und ${n+1}?`,en=pos===0?`What comes before ${n}?`:pos===2?`What comes after ${n}?`:`Which number lies between ${n-1} and ${n+1}?`;
  return {vis:vnRow(...show),de,en,opts:nopts(ans,[pos===0?n+1:n-1,ans+2,ans-2],0,20),stmt:eqs(x=>show.map(y=>y==="?"?x:y).join(" – ")),
   why:W(vnRow(...row),pos===0?`Der Vorgänger ist 1 weniger: ${n} − 1 = ${n-1}.`:pos===2?`Der Nachfolger ist 1 mehr: ${n} + 1 = ${n+1}.`:`Zwischen ${n-1} und ${n+1} liegt ${n}.`,pos===0?`Before is 1 less: ${n-1}.`:pos===2?`After is 1 more: ${n+1}.`:`Between ${n-1} and ${n+1} is ${n}.`,"vn")};}},

{id:47,k:"A",sec:"Zahlen",emo:"🐊",de:"Zahlen vergleichen bis 20",en:"Comparing numbers to 20",ah:[30,30],page:"30",blitz:true,
 say:["Wir vergleichen zwei Zahlen: Ist die erste größer (>), kleiner (<) oder gleich (=)? Das Krokodil frisst immer die größere Zahl.","We compare two numbers: is the first greater (>), smaller (<) or equal (=)? The crocodile always eats the bigger number."],
 merk:["Das offene Maul zeigt zur größeren Zahl.","The open mouth faces the bigger number."],
 ex:()=>[{vis:eqline("16 > 12"),de:"16 ist größer als 12.",en:"16 is greater than 12."}],
 gen(){if(Math.random()<.35){const a=R(1,20),b=R(0,a-1);return {vis:eqline(`${a} > ?`),de:`Welche Zahl passt? ${a} > ?`,en:`Which number fits? ${a} > ?`,opts:sopts(String(b),[String(a),String(Math.min(20,a+R(1,3)))]),stmt:eqs(x=>`${a} > ${x}`),
   why:W(nline(0,20,{hi:[a,b]}),`${b} ist kleiner als ${a}. Auf dem Zahlenstrahl liegt ${b} weiter links.`,`${b} is less than ${a}. On the number line ${b} is further left.`,"cmp")};}
  const a=R(0,20),b=Math.random()<.2?a:R(0,20),s=a>b?">":a<b?"<":"=";
  return {vis:`<div class="cmpq">${a} <span class="qc">?</span> ${b}</div>`,de:`${a} ? ${b}: größer, kleiner oder gleich?`,en:`${a} ? ${b}: greater, less or equal?`,opts:sopts(s,[">","<","="].filter(x=>x!==s)).map(x=>x+(x===">"?"|größer":x==="<"?"|kleiner":"|gleich")),
   stmt:eqs(x=>`${a} ${main(x)} ${b}`),why:W(nline(0,20,{hi:a===b?[a]:[a,b]}),a===b?`Beide Zahlen sind gleich: ${a} = ${b}.`:`${Math.max(a,b)} ist größer, es liegt weiter rechts: ${a} ${s} ${b}.`,a===b?`Both are equal.`:`${Math.max(a,b)} is bigger, it is further right.`,"cmp")};}},

{id:48,k:"A",sec:"Zahlen",emo:"📏",de:"Der Zahlenstrahl bis 20",en:"The number line to 20",ah:[31,31],page:"31",
 say:["Am Zahlenstrahl hat jede Zahl ihren Platz. Die langen Striche sind 5, 10, 15, 20. Von dort zählen wir weiter.","On the number line every number has its place. The long marks are 5, 10, 15, 20. We count on from there."],
 merk:["Nach rechts wird es mehr.","To the right it gets more."],
 ex:()=>[{vis:nline(0,20,{hi:[12]}),de:"Von 10 zwei Striche weiter: 12.",en:"Two marks after 10: 12."}],
 gen(){let n=R(2,19);if(n%5===0)n+=pick([1,-1]);const ty=pick(["where","where","approx"]);
  if(ty==="approx"){const a=pick([2,7,9,15,18]),c=`${a}`;return {vis:nline(0,20,{q:[a],labels:20}),de:"Nur 0 und 20 stehen dran. Welche Zahl ist ungefähr am gelben Kasten?",en:"Only 0 and 20 are marked. Which number is roughly at the yellow box?",opts:sopts(c,[String(20-a),String(a>10?a-8:a+8)].filter(x=>x!==c)),stmt:eqs(x=>`Ungefähr ${x}.`,x=>`About ${x}.`),
   why:W(nline(0,20,{hi:[a]}),`Die Mitte ist 10. ${a} liegt ${a<10?"links":"rechts"} von der Mitte.`,`The middle is 10. ${a} is to the ${a<10?"left":"right"} of the middle.`,"strahl")};}
  return {vis:nline(0,20,{q:[n],labels:5}),de:"Welche Zahl gehört an den gelben Kasten?",en:"Which number belongs at the yellow box?",opts:nopts(n,[n+1,n-1,n+5>20?n-5:n+5],0,20),stmt:eqs(x=>`Hier ist ${x}.`,x=>`Here is ${x}.`),
   why:W(nline(0,20,{hi:[n],labels:5}),`Der nächste lange Strich ist ${Math.round(n/5)*5}. Zähle von dort ${n-Math.round(n/5)*5>=0?"weiter":"zurück"}: ${n}.`,`The nearest long mark is ${Math.round(n/5)*5}. Count from there: ${n}.`,"strahl")};}},

{id:49,k:"A",sec:"Zahlen",emo:"🔟",de:"Das Zwanzigerfeld",en:"The twenty-frame",ah:[32,32],page:"32",
 say:["Das Zwanzigerfeld hat zwei Reihen mit je 10. Eine volle Reihe ist ein Zehner. Immer 20 heißt: rot und blau zusammen sind 20.","The twenty-frame has two rows of 10. A full row is one ten. Always 20 means: red and blue together make 20."],
 merk:["Volle Reihe = 10!","Full row = 10!"],
 ex:()=>[{vis:fullField(14),de:"Eine volle Reihe und 4: 14.",en:"One full row and 4: 14."}],
 gen(){const ty=pick(["read","read","immer20"]);
  if(ty==="immer20"){const r=R(1,10),b=20-r;return {vis:field(fill([b,"b"],[r,"r"]),20),de:"Immer 20! Blau + rot = 20. Wie viele sind blau?",en:"Always 20! Blue + red = 20. How many are blue?",opts:nopts(b,[r,b+1,b-1],0,20),stmt:eqs(x=>`${x} + ${r} = 20`),
   why:W(field(fill([b,"b"],[r,"r"]),20),`${r} sind rot. Bis 20 fehlen ${b}.`,`${r} are red. ${b} more make 20.`,"f20")};}
  const n=R(6,20);return {vis:fullField(n),de:"Wie viele Plättchen sind es?",en:"How many counters?",opts:nopts(n,[n+1,n-1,n>10?n-10:n+10],0,20),stmt:eqs(x=>`Es sind ${x}.`,x=>`There are ${x}.`),
   why:W(fullField(n),n>10?`Eine volle Reihe ist 10. Dazu kommen ${n-10}: 10 + ${n-10} = ${n}.`:`Es sind ${n}. Bei 5 ist die Reihe halb voll.`,n>10?`One full row is 10. Plus ${n-10}: ${n}.`:`There are ${n}.`,"f20")};}},

{id:50,k:"A",sec:"Rechnen",emo:"🧮",de:"Plus und Minus im Zwanzigerfeld",en:"Plus and minus in the twenty-frame",ah:[33,36],page:"33–36",blitz:true,
 say:["Im Zwanzigerfeld rechnen wir ohne Zehnerübergang: 14 + 3 – die 10 bleibt, nur die Einer werden mehr: 17.","In the twenty-frame we calculate without crossing ten: 14 + 3 – the 10 stays, only the ones grow: 17."],
 merk:["Der Zehner bleibt – rechne mit den Einern!","The ten stays – work with the ones!"],
 ex:()=>[{vis:field(fill([14,"b"],[3,"r"]),20),de:"14 + 3 = 17",en:"14 + 3 = 17"},{vis:field(fill([13,"r"],[3,"x"]),20),de:"16 − 3 = 13",en:"16 − 3 = 13"}],
 gen(){const plus=Math.random()<.5;
  if(plus){const a=10+R(0,8),bb=R(1,9-(a-10)),s=a+bb;
   return {vis:field(fill([a,"b"],[bb,"r"]),20),de:`${a} + ${bb} = ?`,en:`${a} + ${bb} = ?`,opts:nopts(s,[s+1,s-1,s-10],0,20),stmt:eqs(x=>`${a} + ${bb} = ${x}`),
    why:W(field(fill([a,"b"],[bb,"r"]),20),`Rechne nur die Einer: ${a%10} + ${bb} = ${a%10+bb}. Der Zehner bleibt: ${s}.`,`Just the ones: ${a%10} + ${bb} = ${a%10+bb}. The ten stays: ${s}.`,"f20")};}
  const a=R(11,20),b=R(1,a%10||10),d=a-b;
  return {vis:field(fill([d,"r"],[b,"x"]),20),de:`${a} − ${b} = ?`,en:`${a} − ${b} = ?`,opts:nopts(d,[d+1,d-1,d-10>=0?d-10:d+2],0,20),stmt:eqs(x=>`${a} − ${b} = ${x}`),
   why:W(field(fill([d,"r"],[b,"x"]),20),`Streiche ${b} durch. Übrig bleiben ${d}.`,`Cross out ${b}. ${d} are left.`,"sub")};}},

{id:51,k:"A",sec:"Rechnen",emo:"🪞",de:"Analogieaufgaben",en:"Similar sums",ah:[37,38],page:"37–38",blitz:true,
 say:["Die kleine Aufgabe hilft bei der großen: 7 − 2 = 5, also 17 − 2 = 15. Es kommt nur der Zehner dazu.","The small sum helps with the big one: 7 − 2 = 5, so 17 − 2 = 15. Only the ten is added."],
 merk:["Kleine Aufgabe zuerst!","Small sum first!"],
 ex:()=>[{vis:pack([["5 − 4 =","1"],["15 − 4 =","11"]]),de:"5 − 4 = 1 hilft bei 15 − 4 = 11.",en:"5 − 4 = 1 helps with 15 − 4 = 11."}],
 gen(){const plus=Math.random()<.4,e=R(2,9);let b,small,big,sa,ba;
  if(plus){b=R(1,9-e);small=`${e} + ${b}`;big=`${10+e} + ${b}`;sa=e+b;ba=10+e+b;}else{b=R(1,e);small=`${e} − ${b}`;big=`${10+e} − ${b}`;sa=e-b;ba=10+e-b;}
  if(Math.random()<.35){return {vis:eqline(`${big} = ?`),de:`Welche kleine Aufgabe hilft bei ${big}?`,en:`Which small sum helps with ${big}?`,opts:sopts(small,[plus?`${e} − ${b}`:`${e} + ${b}`,`${10+e} − 10`,`${b} ${plus?"+":"−"} ${e}`].filter(x=>x!==small)),stmt:eqs(x=>`${x} hilft.`,x=>`${x} helps.`),
   why:W(pack([[small+" =",String(sa)],[big+" =",String(ba)]]),"Nimm den Zehner weg: dann siehst du die kleine Aufgabe.","Take away the ten: then you see the small sum.","analog")};}
  return {vis:pack([[small+" =",String(sa)],[big+" =","?"]]),de:`${small} = ${sa}. Wie viel ist ${big}?`,en:`${small} = ${sa}. What is ${big}?`,opts:nopts(ba,[sa,ba+1,ba-1],0,20),stmt:eqs(x=>`${big} = ${x}`),
   why:W(pack([[small+" =",String(sa)],[big+" =",String(ba)]]),`Bei der großen Aufgabe kommt nur der Zehner dazu: ${sa} + 10 = ${ba}.`,`In the big sum just the ten is added: ${sa} + 10 = ${ba}.`,"analog")};}},

{id:52,k:"A",sec:"Rechnen",emo:"🔺",de:"Umkehraufgaben, Ergänzen, Rechendreieck",en:"Reverse sums, making up, number triangle",ah:[39,45],page:"39–45",blitz:true,
 say:["Umkehraufgabe: 8 − 3 = 5, also 5 + 3 = 8. Ergänzen: Wie viele fehlen? Im Rechendreieck stehen außen die Summen.","Reverse sum: 8 − 3 = 5, so 5 + 3 = 8. Making up: how many are missing? In the number triangle the sums are outside."],
 merk:["Plus und Minus sind eine Familie.","Plus and minus are one family."],
 ex:()=>[{vis:tri(2,3,4,["ab","ac","bc"]),de:"Innen 2 und 3, außen 5.",en:"Inside 2 and 3, outside 5."}],
 gen(){const ty=pick(["rev","erg","erg","tri","tri"]);
  if(ty==="rev")return fromU(7);
  if(ty==="erg"){const t=pick([10,10,12,15,20]),a=R(Math.max(1,t-9),t-1),m=t-a;return {vis:t<=10?field(fill([a,"r"],[m,"q"]),10):field(fill([a,"r"],[m,"q"]),20),de:`Ergänze: ${a} + ? = ${t}`,en:`Make up: ${a} + ? = ${t}`,opts:nopts(m,[m+1,m-1,t-m],0,20),stmt:eqs(x=>`${a} + ${x} = ${t}`),
   why:W(eqline(`${a} → ${t}`),`Zähle von ${a} weiter bis ${t}: Es fehlen ${m}.`,`Count on from ${a} to ${t}: ${m} are missing.`,"erg")};}
  const a=R(1,6),b=R(1,6),c=R(1,6),k=pick(["ab","bc","ac"]),val={ab:a+b,bc:b+c,ac:a+c}[k];
  return {vis:tri(a,b,c,["ab","bc","ac"].filter(x=>x!==k)),de:"Rechendreieck: Welche Zahl gehört in den gelben Kasten?",en:"Number triangle: which number goes in the yellow box?",opts:nopts(val,[val+1,val-1,a+b+c],0,20),stmt:eqs(x=>`Außen steht ${x}.`,x=>`Outside is ${x}.`),
   why:W(tri(a,b,c,["ab","bc","ac"]),"Rechne die zwei Punktefelder an dieser Seite zusammen.","Add the two dot fields on that side.","dreieck")};}},

{id:53,k:"A",sec:"Rechnen",emo:"👯",de:"Verdoppeln, Halbieren, gerade Zahlen",en:"Doubling, halving, even numbers",ah:[47,49],page:"47–49",blitz:true,
 say:["Verdoppeln: 4 + 4 = 8. Halbieren: 8 geteilt in zwei gleiche Teile ist 4 und 4. Gerade Zahlen kann man immer halbieren.","Doubling: 4 + 4 = 8. Halving: 8 split into two equal parts is 4 and 4. Even numbers can always be halved."],
 merk:["Gerade: 2, 4, 6, 8, 10 …","Even: 2, 4, 6, 8, 10 …"],
 ex:()=>[{vis:pairs(7),de:"7 ist ungerade: Einer bleibt allein.",en:"7 is odd: one is left alone."}],
 gen(){if(Math.random()<.6)return fromU(10);const n=R(1,20),ev=n%2===0;
  return {vis:pairs(n),de:`Ist ${n} gerade oder ungerade?`,en:`Is ${n} even or odd?`,opts:sopts(ev?"gerade":"ungerade",[ev?"ungerade":"gerade"]),stmt:eqs(x=>`${n} ist ${x}.`,x=>`${n} is ${x==="gerade"?"even":"odd"}.`),
   why:W(pairs(n),ev?`Alle Punkte haben einen Partner. ${n} ist gerade.`:`Ein Punkt bleibt allein. ${n} ist ungerade.`,ev?`Every dot has a partner. ${n} is even.`:`One dot is alone. ${n} is odd.`,"gerade")};}},

{id:54,k:"A",sec:"Muster",emo:"🧱",de:"Zahlenmauer und Nachbaraufgaben",en:"Number wall and neighbour sums",ah:[50,51],page:"50–51",
 say:["In der Zahlenmauer ergeben zwei Steine zusammen den Stein darüber. Nachbaraufgaben: 6 + 6 = 12 hilft bei 6 + 7 = 13.","In the number wall two bricks make the brick above. Neighbour sums: 6 + 6 = 12 helps with 6 + 7 = 13."],
 merk:["Eins mehr – eins mehr im Ergebnis!","One more – one more in the answer!"],
 ex:()=>[{vis:pack([["5 + 5 =","10"],["5 + 6 =","11"]]),de:"Nachbaraufgabe: eins mehr.",en:"Neighbour sum: one more."}],
 gen(){if(Math.random()<.5)return fromU(11);const a=R(2,9),up=Math.random()<.6,b=up?a+1:a-1,s=a+b;
  return {vis:pack([[`${a} + ${a} =`,String(2*a)],[`${a} + ${b} =`,"?"]]),de:`${a} + ${a} = ${2*a}. Wie viel ist ${a} + ${b}?`,en:`${a} + ${a} = ${2*a}. What is ${a} + ${b}?`,opts:nopts(s,[2*a,s+1,s-1],0,20),stmt:eqs(x=>`${a} + ${b} = ${x}`),
   why:W(pack([[`${a} + ${a} =`,String(2*a)],[`${a} + ${b} =`,String(s)]]),up?`${b} ist eins mehr als ${a}. Also ist das Ergebnis eins mehr: ${s}.`:`${b} ist eins weniger als ${a}. Also ist das Ergebnis eins weniger: ${s}.`,up?`One more, so the answer is one more: ${s}.`:`One less, so the answer is one less: ${s}.`,"nachbar")};}},

{id:55,k:"A",sec:"Rechnen",emo:"🪜",de:"Plus mit Zehnerübergang",en:"Plus crossing ten",ah:[53,57],page:"53–57",blitz:true,
 say:["Über die 10 rechnen wir in zwei Schritten: 8 + 5. Erst 8 + 2 = 10, dann 10 + 3 = 13. Bei plus 9: plus 10, dann 1 weniger.","Crossing 10 takes two steps: 8 + 5. First 8 + 2 = 10, then 10 + 3 = 13. For plus 9: plus 10, then 1 less."],
 merk:["Erst bis zur 10, dann weiter!","First to 10, then on!"],
 ex:()=>[{vis:field(fill([8,"b"],[2,"r"],[3,"r"]),20),de:"8 + 5 = 8 + 2 + 3 = 13",en:"8 + 5 = 8 + 2 + 3 = 13"}],
 gen(){const ty=pick(["two","two","step","nine"]);
  if(ty==="nine"){const a=R(2,9),s=a+9;return {vis:eqline(`${a} + 9 = ?`),de:`${a} + 9 = ? Tipp: erst + 10, dann − 1.`,en:`${a} + 9 = ? Tip: first + 10, then − 1.`,opts:nopts(s,[s+1,s-1,a+10],0,20),stmt:eqs(x=>`${a} + 9 = ${x}`),
   why:W(eqline(`${a} + 10 = ${a+10} → ${a+10} − 1 = ${s}`),`Plus 10 ist leicht: ${a+10}. 9 ist eins weniger, also ${s}.`,`Plus 10 is easy: ${a+10}. 9 is one less, so ${s}.`,"neun")};}
  const a=R(5,9),b=R(11-a,9),k=10-a,r=b-k,s=a+b;
  if(ty==="step")return {vis:field(fill([a,"b"],[k,"r"]),20),de:`${a} + ${b}: Wie viele brauchst du bis zur 10?`,en:`${a} + ${b}: how many do you need to reach 10?`,opts:nopts(k,[r,k+1,b],0,10),stmt:eqs(x=>`${a} + ${x} = 10`),
   why:W(field(fill([a,"b"],[k,"r"]),20),`${a} und ${k} sind verliebt: zusammen 10.`,`${a} and ${k} make 10.`,"zu2")};
  return {vis:field(fill([a,"b"],[b,"r"]),20),de:`${a} + ${b} = ?`,en:`${a} + ${b} = ?`,opts:nopts(s,[s+1,s-1,s-10],0,20),stmt:eqs(x=>`${a} + ${b} = ${x}`),
   why:W(field(fill([a,"b"],[b,"r"]),20)+eqline(`${a} + ${k} + ${r} = ${s}`),`Erst ${a} + ${k} = 10, dann 10 + ${r} = ${s}.`,`First ${a} + ${k} = 10, then 10 + ${r} = ${s}.`,"zu2")};}},

{id:56,k:"A",sec:"Rechnen",emo:"🛝",de:"Minus mit Zehnerübergang",en:"Minus crossing ten",ah:[59,63],page:"59–63",blitz:true,
 say:["Minus über die 10 geht auch in zwei Schritten: 13 − 5. Erst 13 − 3 = 10, dann 10 − 2 = 8.","Minus across 10 also takes two steps: 13 − 5. First 13 − 3 = 10, then 10 − 2 = 8."],
 merk:["Erst zurück bis zur 10!","First back to 10!"],
 ex:()=>[{vis:field(fill([8,"r"],[5,"x"]),20),de:"13 − 5 = 13 − 3 − 2 = 8",en:"13 − 5 = 13 − 3 − 2 = 8"}],
 gen(){const ty=pick(["two","two","step","nine"]);
  if(ty==="nine"){const a=R(11,18),d=a-9;return {vis:eqline(`${a} − 9 = ?`),de:`${a} − 9 = ? Tipp: erst − 10, dann + 1.`,en:`${a} − 9 = ? Tip: first − 10, then + 1.`,opts:nopts(d,[d+1,d-1,a-10],0,20),stmt:eqs(x=>`${a} − 9 = ${x}`),
   why:W(eqline(`${a} − 10 = ${a-10} → ${a-10} + 1 = ${d}`),`Minus 10 ist leicht: ${a-10}. Wir haben 1 zu viel weggenommen, also ${d}.`,`Minus 10 is easy: ${a-10}. We took 1 too many, so ${d}.`,"neun")};}
  const a=R(11,17),e=a-10,b=R(e+1,9),d=a-b,r=b-e;
  if(ty==="step")return {vis:field(fill([a,"r"]),20),de:`${a} − ${b}: Wie viele nimmst du zuerst weg, bis du bei 10 bist?`,en:`${a} − ${b}: how many do you take away first to reach 10?`,opts:nopts(e,[r,b,e+1],0,10),stmt:eqs(x=>`${a} − ${x} = 10`),
   why:W(field(fill([10,"r"],[e,"x"]),20),`Die ${e} Einer unten zuerst weg, dann ist man bei 10.`,`Take the ${e} ones away first, then you are at 10.`,"zu2")};
  return {vis:field(fill([d,"r"],[b,"x"]),20),de:`${a} − ${b} = ?`,en:`${a} − ${b} = ?`,opts:nopts(d,[d+1,d-1,d+10],0,20),stmt:eqs(x=>`${a} − ${b} = ${x}`),
   why:W(field(fill([d,"r"],[b,"x"]),20)+eqline(`${a} − ${e} − ${r} = ${d}`),`Erst ${a} − ${e} = 10, dann 10 − ${r} = ${d}.`,`First ${a} − ${e} = 10, then 10 − ${r} = ${d}.`,"zu2")};}},

{id:57,k:"A",sec:"Größen",emo:"💶",de:"Geld bis 20 Euro",en:"Money up to 20 euros",ah:[64,67],page:"64–67",
 say:["Wir zählen Geld: zuerst die großen Scheine und Münzen, dann die kleinen. 10 € + 5 € + 2 € = 17 €.","We count money: big notes and coins first, then the small ones. 10 € + 5 € + 2 € = 17 €."],
 merk:["Groß zuerst, dann klein!","Big first, then small!"],
 ex:()=>[{vis:money20(["10€","5€","2€"]),de:"17 €",en:"17 euros"}],
 gen(){const ty=pick(["count","count","pay"]);
  if(ty==="count"){let list=[],sum=0;const pool=shuffle(["10€","5€","2€","2€","1€","5€","1€"]);for(const c of pool){const v=parseInt(c);if(sum+v<=20&&list.length<5){list.push(c);sum+=v;}}
   list.sort((x,y)=>parseInt(y)-parseInt(x));return {vis:money20(list),de:"Wie viel Geld ist das?",en:"How much money is this?",opts:nopts(sum,[sum+1,sum-1,sum+2],0,22," €"),stmt:eqs(x=>`Das sind ${x}.`,x=>`That is ${x}.`),
    why:W(money20(list),`Zähle groß zuerst: ${list.map(c=>parseInt(c)).join(" + ")} = ${sum} €.`,`Count big first: ${list.map(c=>parseInt(c)).join(" + ")} = ${sum} €.`,"geld20")};}
  const price=R(3,9),pay=10,back=pay-price,item=pick(["🧸","📚","🍦","⚽","🖍️"]);
  return {vis:`<div class="shop">${item}<span class="price">${price} €</span></div>`+money20(["10€"]),de:`${item} kostet ${price} €. Du bezahlst mit 10 €. Wie viel bekommst du zurück?`,en:`${item} costs ${price} €. You pay with 10 €. How much change do you get?`,opts:nopts(back,[back+1,back-1,price],0,10," €"),stmt:eqs(x=>`10 € − ${price} € = ${x}`),
   why:W(eqline(`${price} € + ${back} € = 10 €`),`Von ${price} bis 10 fehlen ${back}. So viel bekommst du zurück.`,`From ${price} to 10 there are ${back} missing. That is your change.`,"geld20")};}},

{id:58,k:"A",sec:"Geometrie",emo:"🎲",de:"Formen, Spiegelbilder, Körper",en:"Shapes, mirror images, solids",ah:[46,69],pgs:[46,68,69],page:"46, 68–69",
 say:["Flache Formen sind Kreis, Dreieck, Quadrat und Rechteck. Körper kann man in die Hand nehmen: Kugel, Würfel, Quader, Zylinder.","Flat shapes are circle, triangle, square and rectangle. Solids you can hold: sphere, cube, cuboid, cylinder."],
 merk:["Ein Ball ist eine Kugel, eine Dose ein Zylinder.","A ball is a sphere, a tin is a cylinder."],
 ex:()=>[{vis:`<div class="bodies">⚽ 🎲 📦 🥫</div>`,de:"Kugel, Würfel, Quader, Zylinder",en:"Sphere, cube, cuboid, cylinder"}],
 gen(){const ty=pick(["body","body","shape","mirror"]);if(ty==="shape")return fromU(13);
  if(ty==="mirror"){const n=R(2,8);return {vis:mirror(n),de:"Wie viele Plättchen sind im Spiegelbild?",en:"How many counters are in the mirror image?",opts:nopts(n,[n+1,n-1,2*n],0,20),stmt:eqs(x=>`Auch ${x}.`,x=>`Also ${x}.`),
   why:W(mirror(n),`Im Spiegel ist alles genau gleich, nur umgedreht: ${n}.`,`In the mirror everything is the same, just flipped: ${n}.`,"koerper")};}
  const k=pick(Object.keys(BODIES)),[en,e]=BODIES[k];
  return {vis:`<div class="bodies big">${e}</div>`,de:"Welcher Körper ist das?",en:"Which solid is this?",opts:sopts(k,Object.keys(BODIES).filter(x=>x!==k)),stmt:eqs(x=>`Das ist ein${x==="Kugel"?"e":""} ${x}.`,x=>`It is a ${BODIES[x][0]}.`),
   why:W(`<div class="bodies">⚽ Kugel · 🎲 Würfel · 📦 Quader · 🥫 Zylinder</div>`,`${e} hat die Form: ${k}.`,`${e} has the shape: ${en}.`,"koerper")};}},

{id:59,k:"A",sec:"Größen",emo:"🕐",de:"Tabellen und die Uhr: volle Stunde",en:"Tables and the clock: o'clock",ah:[70,72],page:"70–72",
 say:["Bei der vollen Stunde zeigt der lange Zeiger auf die 12. Der kurze Zeiger zeigt die Stunde: 3 Uhr.","At o'clock the long hand points to 12. The short hand shows the hour: 3 o'clock."],
 merk:["Langer Zeiger oben = volle Stunde.","Long hand up = o'clock."],
 ex:()=>[{vis:clock(3,0),de:"Es ist 3 Uhr.",en:"It is 3 o'clock."}],
 gen(){if(Math.random()<.3)return fromU(32);const h=R(1,12);
  if(Math.random()<.3){const day=[["🌅",7,"Aufstehen","get up"],["🏫",8,"Schule","school"],["🍽️",12,"Mittagessen","lunch"],["🛏️",8,"Schlafen","bed"]];const [e,hh,de,en]=pick(day);
   return {vis:`<div class="bodies big">${e}</div>`+clock(hh,0),de:`${de}: Wie spät ist es?`,en:`${en}: what time is it?`,opts:sopts(`${hh} Uhr`,[`${hh%12+1} Uhr`,`${(hh+10)%12+1} Uhr`]),stmt:eqs(x=>`Es ist ${x}.`,x=>`It is ${x.replace(" Uhr"," o'clock")}.`),
    why:W(clock(hh,0),`Der kurze Zeiger zeigt auf die ${hh}.`,`The short hand points to ${hh}.`,"stunde")};}
  return {vis:clock(h,0),de:"Wie spät ist es?",en:"What time is it?",opts:sopts(`${h} Uhr`,[`${h%12+1} Uhr`,`12 Uhr`,`${(h+5)%12+1} Uhr`].filter(x=>x!==`${h} Uhr`)),stmt:eqs(x=>`Es ist ${x}.`,x=>`It is ${x.replace(" Uhr"," o'clock")}.`),
   why:W(clock(h,0),`Der lange Zeiger zeigt auf die 12: volle Stunde. Der kurze zeigt auf die ${h}: ${h} Uhr.`,`The long hand is on 12. The short hand is on ${h}: ${h} o'clock.`,"stunde")};}}
];
AH_UNITS.forEach(u=>{u.pgs=u.pgs||cnt(u.ah[0],u.ah[1]);});
UNITS.push(...AH_UNITS);
/* the workbook's chapter list (for orientation; pages without own unit are covered by the nearest unit) */
const AH_MAX=72;
function ahUnitFor(p){return AH_UNITS.find(u=>u.pgs.includes(p))||AH_UNITS.filter(u=>u.ah[0]<=p).sort((a,b)=>b.ah[0]-a.ah[0])[0]||AH_UNITS[0];}
