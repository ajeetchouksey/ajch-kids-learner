/* ============================ 📘 WIE IM MATHEBUCH (Klasse 1 workbook pages 22–28) ============================ */
Object.assign(RULE,{
 balloon:["Zahlen zerlegen","Splitting numbers","Eine Menge kann man in zwei Farben teilen: 4 Ballons = 3 blaue + 1 roter. Es gibt viele Möglichkeiten: 4 + 0, 3 + 1, 2 + 2, 1 + 3, 0 + 4.","A group can be split into two colours: 4 balloons = 3 blue + 1 red. There are many ways: 4 + 0, 3 + 1, 2 + 2, 1 + 3, 0 + 4."],
 three:["Drei Summanden","Three parts","Eine Zahl kann man auch in drei Teile zerlegen: 7 = 4 + 2 + 1. Rechne zuerst zwei Zahlen zusammen, dann die dritte dazu.","A number can also be split into three parts: 7 = 4 + 2 + 1. Add two numbers first, then add the third."],
 zhaus:["Das Zerlegehaus","The splitting house","Im Zerlegehaus wohnen alle Zerlegungen der Dachzahl. Geh der Reihe nach: links wird es immer 1 mehr, rechts immer 1 weniger.","The splitting house holds all the ways to split the roof number. Go in order: on the left it gets 1 more each time, on the right 1 less."],
 box:["Die Schüttelbox","The shake box","In der Schüttelbox sind immer gleich viele Kugeln. Nach dem Schütteln liegen sie anders: 8 = 3 + 5 = 6 + 2. Ist eine Seite zu, rechnet man: alle minus die, die man sieht.","The shake box always holds the same number of balls. After shaking they lie differently: 8 = 3 + 5 = 6 + 2. If one side is covered: all of them minus the ones you can see."],
 tally:["Die Strichliste","Tally marks","Für jedes Ding ein Strich. Der fünfte Strich geht quer über die vier: ein Fünferbündel. So zählt man schnell: 5, 10, 15 …","One stroke for each thing. The fifth stroke goes across the four: a bundle of five. That makes counting fast: 5, 10, 15 …"],
 row:["Zahlenreihen","Number rows","Vorwärts wird jede Zahl 1 größer: 3, 4, 5. Rückwärts wird jede Zahl 1 kleiner: 7, 6, 5.","Forwards each number gets 1 bigger: 3, 4, 5. Backwards each number gets 1 smaller: 7, 6, 5."],
 data:["Daten und Tabellen","Data and tables","Zähle jede Sorte für sich und mach für jedes Tier einen Strich. Dann schreib die Zahl in die Tabelle. So kann man vergleichen.","Count each kind on its own and make one stroke for each animal. Then write the number in the table. Now you can compare."],
 lr:["Links und rechts","Left and right","Linke Hand: Daumen und Zeigefinger machen ein L. L wie links! Wohin die Nase zeigt, dahin läuft das Tier.","Left hand: thumb and first finger make an L. L for links (left)! An animal runs the way its nose points."]
});

/* ---------- pictures ---------- */
const BCOL={b:"#3B6FE0",r:"#E0443E",y:"#F4C20D",w:"#FFFFFF"};
const BNAME={b:["blau","blue"],r:["rot","red"],y:["gelb","yellow"]};
function balloons(cols,label){const n=cols.length,top=n>5?Math.ceil(n/2):n,rows=[cols.slice(0,top),cols.slice(top)];const W=260,kx=130,ky=label===null?150:146;let s="",st="";
  rows.forEach((row,ri)=>{const y=ri?96:42;row.forEach((c,i)=>{const x=kx+(i-(row.length-1)/2)*46,idx=ri?top+i:i;
    st+=`<path d="M${x} ${y+22} Q ${(x+kx)/2+6} ${(y+ky)/2} ${kx} ${ky}" fill="none" stroke="#7A86A8" stroke-width="1.4"/>`;
    s+=`<g class="bal" data-i="${idx}"><ellipse cx="${x}" cy="${y}" rx="18" ry="22" fill="${BCOL[c]}" stroke="#1D2B53" stroke-width="1.8"/><ellipse cx="${x-6}" cy="${y-8}" rx="4.5" ry="7" fill="#fff" opacity=".45"/><path d="M${x-4} ${y+24} L${x+4} ${y+24} L${x} ${y+20} Z" fill="${c==="w"?"#fff":BCOL[c]}" stroke="#1D2B53" stroke-width="1.2"/></g>`;});});
  const box=label===null?"":`<rect x="${kx-17}" y="${ky}" width="34" height="30" rx="4" fill="#fff" stroke="#1D2B53" stroke-width="2"/><text x="${kx}" y="${ky+22}" text-anchor="middle" font-size="20" font-family="Fredoka,sans-serif" fill="#1D2B53">${label}</text>`;
  return `<svg class="balsvg" viewBox="0 0 ${W} ${label===null?160:182}" role="img" aria-label="${n} Ballons">${st}${s}${box}</svg>`;}
const cv=x=>x!==null&&typeof x==="object"?x:{v:x,k:x==="?"?"qm":x===""?"":"g"};
function zhHtml(roof,rows,act,blue){return `<div class="zh${blue?" blue":""}"><div class="zroof"><span>${roof}</span></div><div class="zbody">${rows.map((r,ri)=>`<div class="zr">${r.map((x,ci)=>{const c=cv(x);
  return (ci?`<span class="zp">+</span>`:"")+`<span class="zc ${c.k}${act&&act[0]===ri&&act[1]===ci?" act":""}">${c.v}</span>`;}).join("")}</div>`).join("")}</div></div>`;}
function hands(shown){let s="";for(let h=0;h<2;h++){const ox=h*130+10;s+=`<rect x="${ox+18}" y="62" width="84" height="56" rx="22" fill="#F5C9A4" stroke="#B9835D" stroke-width="2"/>`;
  for(let f=0;f<5;f++){const k=h*5+f,up=k<shown,x=ox+20+f*17,th=f===0&&h===0||f===4&&h===1;const hgt=up?(th?30:48):12;const y=th?(up?54:62):66-hgt;
    s+=`<rect x="${th?(h===0?x-12:x+12):x}" y="${y}" width="15" height="${hgt+4}" rx="7" fill="${up?"#F5C9A4":"#E2B08B"}" stroke="#B9835D" stroke-width="2"/>`;}}
  return `<svg class="hands" viewBox="0 0 270 124" role="img" aria-label="${shown} Finger">${s}</svg>`;}
function dotsIn(n,x0,w){let s="";const cols=n>6?3:2;for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols);s+=`<circle cx="${x0+w/2+(c-(cols-1)/2)*24}" cy="${24+r*22}" r="9" fill="#454B5E"/>`;}return s;}
function boxVis(n,l,r,lid){const svg=`<svg class="boxsvg" viewBox="0 0 220 130" role="img" aria-label="Schüttelbox"><rect x="4" y="6" width="212" height="118" rx="10" fill="#FBF7EF" stroke="#8B8FA3" stroke-width="3"/><line x1="110" y1="6" x2="110" y2="124" stroke="#8B8FA3" stroke-width="3"/>
   ${lid!=="l"?dotsIn(l,4,106):""}${lid!=="r"?dotsIn(r,110,106):""}${lid?`<rect x="${lid==="l"?6:112}" y="8" width="102" height="114" rx="8" fill="#F0A33A" stroke="#B26B0E" stroke-width="2"/><text x="${lid==="l"?57:163}" y="80" text-anchor="middle" font-size="44" font-family="Fredoka,sans-serif" fill="#fff">?</text>`:""}</svg>`;
  return `<div class="boxwrap"><div class="boxn">${n}</div>${svg}</div>`;}
function tallyVis(n,label){let s="",x=6;const g=Math.floor(n/5),e=n%5;for(let k=0;k<g;k++){for(let i=0;i<4;i++)s+=`<line x1="${x+i*9}" y1="8" x2="${x+i*9}" y2="46" stroke="#1D2B53" stroke-width="3.2" stroke-linecap="round"/>`;
  s+=`<line x1="${x-5}" y1="40" x2="${x+32}" y2="14" stroke="#1D2B53" stroke-width="3.2" stroke-linecap="round"/>`;x+=50;}
  for(let i=0;i<e;i++)s+=`<line x1="${x+i*9}" y1="8" x2="${x+i*9}" y2="46" stroke="#1D2B53" stroke-width="3.2" stroke-linecap="round"/>`;const w=Math.max(40,x+e*9+6);
  return `<span class="tally">${label?`<span class="tl">${label}</span>`:""}<svg viewBox="0 0 ${w} 54" width="${w}" height="54" role="img" aria-label="${n} Striche">${s}</svg></span>`;}
function rowVis(cells,act){return `<div class="nrow">${cells.map((x,i)=>{const c=cv(x);return `<span class="nb ${c.k}${act===i?" act":""}">${c.v}</span>`;}).join("")}</div>`;}
const TIERE=[["🐰","Kaninchen","Kaninchen","rabbits",4],["🐔","Huhn","Hühner","hens",2],["🐐","Ziege","Ziegen","goats",4],["🐴","Pony","Ponys","ponies",4],["🦆","Ente","Enten","ducks",2]];
function farmVis(kinds,counts,tap){const slots=shuffle(cnt(0,29)),items=[];let k=0;kinds.forEach((t,j)=>{for(let i=0;i<counts[j];i++){const s=slots[k++];items.push([t[0],s%6,Math.floor(s/6)]);}});
  return `<div class="farm${tap?" tap":""}"><span class="pond"></span>${items.map(([e,c,r])=>`<span class="fa" style="left:${3+c*16+R(0,4)}%;top:${4+r*19+R(0,4)}%">${e}</span>`).join("")}</div>`;}
function dtab(cols,vals,act,tallyRow){return `<table class="dtab"><tr>${cols.map(c=>`<th>${c}</th>`).join("")}</tr>${tallyRow?`<tr class="trow">${vals.map(v=>`<td>${v!==""&&v!=null&&v>0?tallyVis(v):""}</td>`).join("")}</tr>`:""}<tr>${vals.map((v,i)=>`<td class="dv${act===i?" act":""}${v===""?"":" f"}">${v}</td>`).join("")}</tr></table>`;}
function critter(dir,kind){const fl=dir==="l"?` transform="translate(70,0) scale(-1,1)"`:"";
  const body=kind==="car"?`<rect class="cb" x="6" y="20" width="58" height="16" rx="5" stroke="#1D2B53" stroke-width="2"/><path class="cb" d="M16 20 L24 8 L44 8 L52 20 Z" stroke="#1D2B53" stroke-width="2"/><rect x="27" y="11" width="14" height="8" fill="#DCE5FF"/><circle cx="20" cy="38" r="6" fill="#1D2B53"/><circle cx="50" cy="38" r="6" fill="#1D2B53"/><circle cx="62" cy="26" r="3" fill="#F4C20D"/>`
   :`<path d="M14 32 C 2 32 2 16 10 14" fill="none" stroke="#1D2B53" stroke-width="2"/><ellipse class="cb" cx="30" cy="31" rx="18" ry="10" stroke="#1D2B53" stroke-width="2"/><ellipse class="cb" cx="49" cy="27" rx="10" ry="8" stroke="#1D2B53" stroke-width="2"/><circle cx="45" cy="18" r="6" fill="#F2B8C6" stroke="#1D2B53" stroke-width="1.6"/><circle cx="52" cy="25" r="1.8" fill="#1D2B53"/><circle cx="59" cy="29" r="2.6" fill="#E46A8A"/><path d="M22 40 l-2 4 M36 40 l2 4" stroke="#1D2B53" stroke-width="2"/>`;
  return `<svg class="critter" viewBox="0 0 70 46" role="img" aria-label="${dir==="l"?"nach links":"nach rechts"}"><g${fl}>${body}</g></svg>`;}
function gpig(c){const f={w:"#fff",s:"#2E2E36",b:"#A0652D",g:"#fff"}[c];return `<svg class="gpig" viewBox="0 0 80 54"><ellipse cx="40" cy="30" rx="32" ry="20" fill="${f}" stroke="#1D2B53" stroke-width="2"/>${c==="g"?`<circle cx="30" cy="24" r="7" fill="#A0652D"/><circle cx="50" cy="34" r="6" fill="#2E2E36"/><circle cx="44" cy="20" r="4" fill="#A0652D"/>`:""}<circle cx="62" cy="16" r="6" fill="${c==="s"?"#555":"#F2B8C6"}" stroke="#1D2B53" stroke-width="1.5"/><circle cx="64" cy="26" r="2.4" fill="${c==="s"?"#fff":"#1D2B53"}"/></svg>`;}
const sumOf=a=>a.split("+").reduce((x,y)=>x+ +y,0);

/* ---------- units ---------- */
UNITS.push(
{id:26,k:"B",sec:"Rechnen",emo:"🎈",de:"Zerlegen mit Ballons",en:"Splitting with balloons",blitz:true,page:"22",
 say:["Ein Strauß mit 4 Ballons. Manche sind blau, manche rot. Wie viele blaue? Wie viele rote? So zerlegen wir die 4.","A bunch of 4 balloons. Some are blue, some are red. How many blue? How many red? That is how we split the 4."],
 merk:["Blau und rot zusammen sind alle Ballons.","Blue and red together are all the balloons."],
 ex:()=>[{vis:balloons(["b","b","b","r"],4),de:"4 = 3 + 1",en:"4 = 3 + 1"},{vis:balloons(["b","b","r","r"],4),de:"4 = 2 + 2",en:"4 = 2 + 2"}],
 gen(){const ty=pick(["pic","pic","miss","which","num"]);
  if(ty==="pic"){const n=R(2,7),b=R(0,n),r=n-b,c=`${b} + ${r}`,cols=[...Array(b).fill("b"),...Array(r).fill("r")];
   return {vis:balloons(cols,n),de:"Schreib die Aufgabe: blaue + rote.",en:"Write the sum: blue + red.",opts:sopts(c,[`${r} + ${b}`,`${b} + ${r+1}`,`${b+1} + ${Math.max(0,r-1)}`,`${Math.max(0,b-1)} + ${r+1}`].filter(x=>x!==c)),
    stmt:eqs(a=>`${n} = ${a}`),mem:[`${"🔵".repeat(b)}${"🔴".repeat(r)}`,c],
    why:W(balloons(cols,n)+eqline(`${b} + ${r} = ${n}`),`Zähle zuerst die blauen Ballons: ${b}. Dann die roten: ${r}. Blau kommt zuerst: ${b} + ${r} = ${n}.`,`Count the blue balloons first: ${b}. Then the red ones: ${r}. Blue comes first: ${b} + ${r} = ${n}.`,"balloon")};}
  if(ty==="miss"){const n=R(3,7),b=R(1,n-1),r=n-b,cols=[...Array(b).fill("b"),...Array(r).fill("w")];
   return {vis:balloons(cols,n),de:`${n} Ballons. ${b} sind blau. Wie viele malst du rot an?`,en:`${n} balloons. ${b} are blue. How many do you colour red?`,opts:nopts(r,[n,b,r+1],0,10),
    stmt:eqs(a=>`${b} + ${a} = ${n}`),mem:[`${n} = ${b} + ?`,String(r)],
    why:W(balloons([...Array(b).fill("b"),...Array(r).fill("r")],n)+eqline(`${b} + ${r} = ${n}`),`Es sind ${n} Ballons. ${b} sind schon blau. Zähle die weißen: ${r}. Die malst du rot an.`,`There are ${n} balloons. ${b} are already blue. Count the white ones: ${r}. You colour those red.`,"balloon")};}
  if(ty==="which"){const n=R(3,6),k=R(0,n),c=`${k} + ${n-k}`,others=cnt(0,n).filter(i=>i!==k).map(i=>`${i} + ${n-i}`);
   return {vis:`<div class="splist"><b>${n}</b>${cnt(0,n).map(i=>i===k?`<span class="qm">? + ?</span>`:`<span>${i} + ${n-i}</span>`).join("")}</div>`,de:`Alle Möglichkeiten für ${n}: Welche fehlt?`,en:`All the ways to make ${n}: which one is missing?`,
    opts:sopts(c,[...others.slice(0,2),`${k} + ${n-k+1}`]),stmt:eqs(a=>`${n} = ${a}`),mem:[`${n} = ${k} + ?`,String(n-k)],
    why:W(eqline(cnt(0,n).map(i=>`${i} + ${n-i}`).join("  ·  ")),`Geh der Reihe nach: links 0, 1, 2 … Bei der ${k} fehlt die Reihe: ${k} + ${n-k} = ${n}.`,`Go in order: on the left 0, 1, 2 … The row with ${k} is missing: ${k} + ${n-k} = ${n}.`,"balloon")};}
  const n=R(4,10),a=R(0,n);
  return {vis:balloons([...Array(a).fill("b"),...Array(n-a).fill("w")],n),de:`${n} = ${a} + ?`,en:`${n} = ${a} + ?`,opts:nopts(n-a,[n,a],0,10),stmt:eqs(x=>`${n} = ${a} + ${x}`),mem:[`${n} = ${a} + ?`,String(n-a)],
   why:W(eqline(`${a} + ${n-a} = ${n}`),`Von ${a} bis ${n} fehlen noch ${n-a}. Zähle weiter: ${cnt(a+1,n).join(", ")||"–"}.`,`From ${a} to ${n}, ${n-a} are missing. Count on: ${cnt(a+1,n).join(", ")||"–"}.`,"balloon")};},
 heft:u=>heftBallons(u,false),
 parent:{method:"Workbook p. 22 (Zerlegen – Kombinationen): colour a bunch of balloons in two colours and write the matching plus sum. The aim is to find ALL the splits of a number, ideally in order (4+0, 3+1, 2+2, 1+3, 0+4).",
  words:[["der Luftballon","balloon"],["blau / rot","blue / red"],["zerlegen","to split"],["die Möglichkeit","the possibility / way"],["Wie viele blaue? Wie viele rote?","How many blue? How many red?"]],
  games:["Use 4 to 7 Lego bricks in two colours and build every split.","Ask: ‘Have we found them all? How do we know?’ Then sort them in order."]}},

{id:27,k:"B",sec:"Rechnen",emo:"🎨",de:"Drei Summanden",en:"Three parts",page:"23",
 say:["Jetzt hat der Strauß drei Farben: rot, gelb und blau. Wir schreiben eine Plusaufgabe mit drei Zahlen.","Now the bunch has three colours: red, yellow and blue. We write a plus sum with three numbers."],
 merk:["Rot plus gelb plus blau sind alle Ballons.","Red plus yellow plus blue are all the balloons."],
 ex:()=>[{vis:balloons(["r","r","y","y","b"],5),de:"5 = 2 + 2 + 1",en:"5 = 2 + 2 + 1"},{vis:balloons(["r","r","r","r","y","y","b"],7),de:"7 = 4 + 2 + 1",en:"7 = 4 + 2 + 1"}],
 gen(){const ty=pick(["pic","pic","miss","which"]);const n=pick([5,5,6,7,7,8,10]),r=R(1,n-2),y=R(1,n-r-1),b=n-r-y;
  const cols=[...Array(r).fill("r"),...Array(y).fill("y"),...Array(b).fill("b")];
  if(ty==="pic"){const c=`${r} + ${y} + ${b}`;
   return {vis:balloons(cols,n),de:"Schreib die Aufgabe: rote + gelbe + blaue.",en:"Write the sum: red + yellow + blue.",opts:sopts(c,[`${b} + ${y} + ${r}`,`${r} + ${y} + ${b+1}`,`${r+1} + ${y} + ${b}`,`${r} + ${y+1} + ${Math.max(1,b-1)}`].filter(x=>x!==c)),
    stmt:eqs(a=>`${n} = ${a}`),mem:[`${"🔴".repeat(r)}${"🟡".repeat(y)}${"🔵".repeat(b)}`,c],
    why:W(balloons(cols,n)+eqline(`${r} + ${y} + ${b} = ${n}`),`Zähle jede Farbe: ${r} rote, ${y} gelbe, ${b} blaue. Erst ${r} + ${y} = ${r+y}, dann ${r+y} + ${b} = ${n}.`,`Count each colour: ${r} red, ${y} yellow, ${b} blue. First ${r} + ${y} = ${r+y}, then ${r+y} + ${b} = ${n}.`,"three")};}
  if(ty==="miss"){return {vis:balloons([...Array(r).fill("r"),...Array(y).fill("y"),...Array(b).fill("w")],n),de:`${n} = ${r} + ${y} + ?`,en:`${n} = ${r} + ${y} + ?`,opts:nopts(b,[r+y,n-r,b+1],1,10),
    stmt:eqs(a=>`${r} + ${y} + ${a} = ${n}`),mem:[`${n} = ${r} + ${y} + ?`,String(b)],
    why:W(balloons(cols,n)+eqline(`${r} + ${y} = ${r+y}  →  ${r+y} + ${b} = ${n}`),`Rechne erst ${r} + ${y} = ${r+y}. Bis ${n} fehlen noch ${b}.`,`First work out ${r} + ${y} = ${r+y}. To make ${n}, ${b} are still missing.`,"three")};}
  const c=`${r} + ${y} + ${b}`;
  return {vis:"",de:`Welche Aufgabe ergibt ${n}?`,en:`Which sum makes ${n}?`,opts:sopts(c,[`${r} + ${y} + ${b+1}`,`${r+1} + ${y+1} + ${b}`,`${Math.max(0,r-1)} + ${y} + ${b}`]),
   stmt:eqs(a=>`${a} = ${n}`),mem:[c,String(n)],why:W(eqline(`${r} + ${y} = ${r+y}  →  ${r+y} + ${b} = ${n}`),`Rechne jede Aufgabe in zwei Schritten. Nur ${c} ergibt genau ${n}.`,`Work out each sum in two steps. Only ${c} makes exactly ${n}.`,"three")};},
 heft:u=>heftBallons(u,true),
 parent:{method:"Workbook p. 23 (Zerlegen – Drei Summanden): a number is split into three parts using three colours. Children learn to add two numbers first, then the third. Open tasks (‘10 = ? + ? + ?’) have many right answers.",
  words:[["drei Summanden","three addends (parts)"],["gelb","yellow"],["die offene Aufgabe","open task: many answers"],["zuerst … dann …","first … then …"]],
  games:["Sort 10 crayons into three cups. Say the sum.","Roll three dice and add them: big + middle + small."]}},

{id:28,k:"B",sec:"Rechnen",emo:"🏡",de:"Das Zerlegehaus",en:"The splitting house",blitz:true,page:"24–25",
 say:["Im Zerlegehaus wohnen alle Zerlegungen der Dachzahl. Wir gehen der Reihe nach: 0 + 5, 1 + 4, 2 + 3 …","The splitting house holds every way to split the roof number. We go in order: 0 + 5, 1 + 4, 2 + 3 …"],
 merk:["Links eins mehr, rechts eins weniger!","One more on the left, one less on the right!"],
 ex:()=>[{vis:zhHtml(5,cnt(0,5).map(i=>[i,5-i])),de:"Immer 5: 0 + 5, 1 + 4, 2 + 3, 3 + 2, 4 + 1, 5 + 0",en:"Always 5: 0 + 5, 1 + 4, 2 + 3, 3 + 2, 4 + 1, 5 + 0"},{vis:hands(7),de:"Immer 10: Ich zeige 7, 3 Finger sind versteckt.",en:"Always 10: I show 7, 3 fingers are hidden."}],
 gen(){const ty=pick(["cont","cont","fing","blue","pair"]);
  if(ty==="cont"){const n=R(5,10),k=R(1,n-1),from=Math.max(0,k-3);
   return {vis:zhHtml(n,[...cnt(from,k-1).map(i=>[i,n-i]),[k,"?"]]),de:`Setze fort: ${k} + ? = ${n}`,en:`Carry on: ${k} + ? = ${n}`,opts:nopts(n-k,[n-k+1,n-k-1,k],0,10),
    stmt:eqs(a=>`${k} + ${a} = ${n}`),mem:[`🏡${n}: ${k} + ?`,String(n-k)],
    why:W(zhHtml(n,[[k-1,n-k+1],[k,n-k]]),`Schau die Reihen an: links wird es 1 mehr, rechts 1 weniger. Nach ${k-1} + ${n-k+1} kommt ${k} + ${n-k}.`,`Look at the rows: on the left 1 more, on the right 1 less. After ${k-1} + ${n-k+1} comes ${k} + ${n-k}.`,"zhaus")};}
  if(ty==="fing"){const s=R(1,9);
   return {vis:hands(s),de:`Immer 10! Ich zeige ${s} Finger. Wie viele Finger sind versteckt?`,en:`Always 10! I show ${s} fingers. How many fingers are hidden?`,opts:nopts(10-s,[s,11-s,9-s],0,10),
    stmt:eqs(a=>`${s} + ${a} = 10`),mem:[`🖐️ ${s} + ? = 10`,String(10-s)],
    why:W(hands(s)+eqline(`${s} + ${10-s} = 10`),`Wir haben 10 Finger. ${s} sind oben, also sind ${10-s} versteckt: ${s} + ${10-s} = 10.`,`We have 10 fingers. ${s} are up, so ${10-s} are hidden: ${s} + ${10-s} = 10.`,"ten")};}
  if(ty==="blue"){const n=R(6,9),a=R(1,3),b=R(1,n-a-1),c=n-a-b;
   return {vis:zhHtml(n,[[a,b,"?"]],null,true),de:`Blaues Haus, immer ${n}: ${a} + ${b} + ? = ${n}`,en:`Blue house, always ${n}: ${a} + ${b} + ? = ${n}`,opts:nopts(c,[c+1,c-1,a+b],0,10),
    stmt:eqs(x=>`${a} + ${b} + ${x} = ${n}`),mem:[`${a} + ${b} + ? = ${n}`,String(c)],
    why:W(eqline(`${a} + ${b} = ${a+b}  →  ${a+b} + ${c} = ${n}`),`Rechne erst ${a} + ${b} = ${a+b}. Bis ${n} fehlen noch ${c}.`,`First ${a} + ${b} = ${a+b}. To make ${n}, ${c} are still missing.`,"three")};}
  const n=R(4,10),a=R(0,n),c=`${a} + ${n-a}`;
  return {vis:zhHtml(n,[["?","?"]]),de:`Welche Reihe passt in das Haus mit der ${n}?`,en:`Which row fits in the house with ${n} on the roof?`,opts:sopts(c,[`${a} + ${n-a+1}`,`${Math.max(0,a-1)} + ${n-a+2}`,`${a+1} + ${n-a+1}`]),
   stmt:eqs(x=>`${x} = ${n}`),mem:[c,String(n)],why:W(eqline(`${a} + ${n-a} = ${n}`),`Nur ${c} ergibt genau ${n}. Prüfe jede Reihe: Plus rechnen und mit dem Dach vergleichen.`,`Only ${c} makes exactly ${n}. Check each row: add, then compare with the roof.`,"zhaus")};},
 heft:u=>heftHaus(u),
 parent:{method:"Workbook pp. 24–25 (Das Zerlegehaus): fill houses systematically. ‘Setze fort’ means continue the pattern. Children discover that the left number goes up while the right goes down (gegensinniges Verändern). ‘Immer 10’ with hidden fingers trains the friends of ten. The blue house has three parts per row.",
  words:[["das Zerlegehaus","splitting house"],["Setze fort.","Carry on."],["Finde alle Möglichkeiten.","Find all the ways."],["Immer 10.","Always 10."],["Wie viele Finger sind versteckt?","How many fingers are hidden?"]],
  games:["Finger game: one person shows some fingers behind the back for a split second, the other says how many are folded.","Draw a house for the number of family members at dinner and fill it together."]}},

{id:29,k:"B",sec:"Rechnen",emo:"📦",de:"Die Schüttelbox",en:"The shake box",blitz:true,page:"26",
 say:["In der Schüttelbox liegen Kugeln. Wir schütteln. Dann zählen wir links und rechts.","There are balls in the shake box. We shake it. Then we count left and right."],
 merk:["Links plus rechts sind alle Kugeln.","Left plus right are all the balls."],
 ex:()=>[{vis:boxVis(8,3,5),de:"8 = 3 + 5",en:"8 = 3 + 5"},{vis:boxVis(6,4,2,"r"),de:"6 Kugeln, 4 sehe ich. 2 sind unter dem Deckel.",en:"6 balls, I see 4. 2 are under the lid."}],
 gen(){const ty=pick(["both","both","lidR","lidL"]);const n=R(4,10),l=R(0,n),r=n-l;
  if(ty==="both"){const c=`${l} + ${r}`;
   return {vis:boxVis(n,l,r),de:"Schreib die Plusaufgabe zur Schüttelbox: links + rechts.",en:"Write the plus sum for the shake box: left + right.",opts:sopts(c,[`${r} + ${l}`,`${l} + ${r+1}`,`${l+1} + ${r}`].filter(x=>x!==c)),
    stmt:eqs(a=>`${n} = ${a}`),mem:[`📦 ${n}: ${l} | ${r}`,c],
    why:W(boxVis(n,l,r)+eqline(`${l} + ${r} = ${n}`),`Zähle links: ${l}. Zähle rechts: ${r}. Links kommt zuerst: ${l} + ${r} = ${n}.`,`Count the left: ${l}. Count the right: ${r}. Left comes first: ${l} + ${r} = ${n}.`,"box")};}
  const hid=ty==="lidR"?r:l,see=n-hid,side=ty==="lidR"?"r":"l";
  return {vis:boxVis(n,l,r,side),de:`In der Box sind ${n} Kugeln. ${see} siehst du. Wie viele sind unter dem Deckel?`,en:`There are ${n} balls in the box. You can see ${see}. How many are under the lid?`,opts:nopts(hid,[see,n,hid+1],0,10),
   stmt:eqs(a=>`${see} + ${a} = ${n}`),mem:[`📦 ${n} = ${see} + ?`,String(hid)],
   why:W(boxVis(n,l,r)+eqline(`${n} − ${see} = ${hid}`),`Alle zusammen sind ${n}. ${see} siehst du. ${n} − ${see} = ${hid}. Oder zähle von ${see} weiter bis ${n}.`,`All together there are ${n}. You see ${see}. ${n} − ${see} = ${hid}. Or count on from ${see} to ${n}.`,"box")};},
 heft:u=>heftBox(u),
 parent:{method:"Workbook p. 26 (Das kann ich schon, tasks 4–5): the Schüttelbox is a box with a divider. Shake it, then write the split. With a lid on one side, the child works out the hidden part — the first step towards subtraction.",
  words:[["die Schüttelbox","shake box"],["schütteln","to shake"],["der Deckel","lid"],["die Kugel","ball / counter"],["versteckt","hidden"]],
  games:["Make one from an egg box: put 8 beans in, shake, open, say the sum.","Hide some coins under your hand: ‘7 altogether, how many are under my hand?’"]}},

{id:30,k:"B",sec:"Zahlen",emo:"✏️",de:"Die Strichliste",en:"Tally marks",page:"26–27",
 say:["Für jedes Ding machen wir einen Strich. Den fünften Strich ziehen wir quer: ein Fünferbündel!","For each thing we draw one stroke. The fifth stroke goes across: a bundle of five!"],
 merk:["Vier Striche stehen, der fünfte liegt quer.","Four strokes stand up, the fifth lies across."],
 ex:()=>[{vis:tallyVis(3),de:"3",en:"3"},{vis:tallyVis(7),de:"7 = ein Fünferbündel und 2 Striche",en:"7 = one bundle of five and 2 strokes"}],
 gen(){const ty=pick(["read","read","bund","cmp"]);
  if(ty==="read"){const n=R(1,15);
   return {vis:tallyVis(n),de:"Wie viele Striche sind es?",en:"How many strokes are there?",opts:nopts(n,[n+5,n-5,n+1,n-1],1,20),stmt:eqs(a=>`Die Strichliste zeigt ${a}.`,a=>`The tally shows ${a}.`),
    why:W(tallyVis(n),`Ein Bündel sind 5 Striche. ${Math.floor(n/5)} Bündel sind ${5*Math.floor(n/5)}. Dazu ${n%5} einzelne Striche: ${n}.`,`One bundle is 5 strokes. ${Math.floor(n/5)} bundles are ${5*Math.floor(n/5)}. Plus ${n%5} single strokes: ${n}.`,"tally")};}
  if(ty==="bund"){const n=R(5,15),f=Math.floor(n/5),e=n%5;
   return {vis:`<div class="bignum">${n}</div>`,de:`Du schreibst ${n} als Strichliste. Wie viele Fünferbündel brauchst du?`,en:`You write ${n} as a tally. How many bundles of five do you need?`,opts:nopts(f,[f+1,f-1,e],0,4),
    stmt:eqs(a=>`Für ${n} brauche ich ${a} Fünferbündel.`,a=>`For ${n} I need ${a} bundles of five.`),
    why:W(tallyVis(n),`${n} = ${f===0?"":`${5*f} + `}${e}. Jedes Bündel sind 5. Also ${f} Bündel und ${e} einzelne Striche.`,`${n} = ${f===0?"":`${5*f} + `}${e}. Each bundle is 5. So ${f} bundles and ${e} single strokes.`,"tally")};}
  let a=R(3,14),b=R(3,14);while(a===b)b=R(3,14);const c=a>b?"🐰|Kaninchen":"🐔|Hühner";
  return {vis:`<div class="tcmp">${tallyVis(a,"🐰")}${tallyVis(b,"🐔")}</div>`,de:"Wovon gibt es mehr? Vergleiche die Striche.",en:"Which are there more of? Compare the tallies.",opts:[c,a>b?"🐔|Hühner":"🐰|Kaninchen"],
   stmt:eqs(x=>`Es gibt mehr ${x.split("|")[1]}.`,x=>`There are more ${x.split("|")[1]==="Hühner"?"hens":"rabbits"}.`),
   why:W(`<div class="tcmp">${tallyVis(a,"🐰")}${tallyVis(b,"🐔")}</div>`,`Kaninchen: ${a}. Hühner: ${b}. ${Math.max(a,b)} ist mehr als ${Math.min(a,b)}.`,`Rabbits: ${a}. Hens: ${b}. ${Math.max(a,b)} is more than ${Math.min(a,b)}.`,"tally")};},
 heft:u=>heftTally(u),
 parent:{method:"Workbook p. 26 (task 1) and p. 27: tally marks. Four strokes, then the fifth across makes a bundle of five, so you can count in fives. Used to collect data in tables.",
  words:[["die Strichliste","tally chart"],["der Strich","stroke / mark"],["das Fünferbündel","bundle of five"],["zählen und eintragen","count and fill in"]],
  games:["Make a tally of red cars seen from the window in 5 minutes.","Tally who wants which fruit at dinner."]}},

{id:31,k:"B",sec:"Zahlen",emo:"🔢",de:"Zahlenreihen vor und zurück",en:"Number rows forwards and backwards",blitz:true,page:"26",
 say:["Wir zählen vorwärts: 1, 2, 3 … und rückwärts: 7, 6, 5 … Welche Zahlen fehlen?","We count forwards: 1, 2, 3 … and backwards: 7, 6, 5 … Which numbers are missing?"],
 merk:["Vorwärts eins mehr, rückwärts eins weniger.","Forwards one more, backwards one less."],
 ex:()=>[{vis:rowVis([1,2,3,4,5,6,7,8]),de:"Vorwärts: 1, 2, 3, 4, 5, 6, 7, 8",en:"Forwards: 1 to 8"},{vis:rowVis([11,10,9,8,7,6,5,4]),de:"Rückwärts: 11, 10, 9, 8, 7, 6, 5, 4",en:"Backwards: 11 down to 4"}],
 gen(){const dir=pick([1,-1]),st=dir>0?R(0,12):R(7,20),vals=cnt(0,7).map(i=>st+dir*i),ask=R(1,7),given=new Set([0,1,2,...shuffle(cnt(3,7)).slice(0,R(0,2))]);given.delete(ask);
  const ans=vals[ask],cells=vals.map((v,i)=>i===ask?"?":given.has(i)?v:"");
  return {vis:rowVis(cells),de:dir>0?"Zähle vorwärts. Welche Zahl gehört in das gelbe Kästchen?":"Zähle rückwärts. Welche Zahl gehört in das gelbe Kästchen?",en:dir>0?"Count forwards. Which number goes in the yellow box?":"Count backwards. Which number goes in the yellow box?",
   opts:nopts(ans,[ans+1,ans-1,ans+2,ans-2],0,20),stmt:eqs(a=>`In das gelbe Kästchen gehört die ${a}.`,a=>`The number ${a} goes in the yellow box.`),mem:[`${vals[ask-1]} ${dir>0?"→":"←"} ?`,String(ans)],
   why:W(rowVis(vals.map((v,i)=>i===ask?{v,k:"f"}:v)),dir>0?`Vorwärts: immer 1 mehr. Vor dem Kästchen steht ${vals[ask-1]}. ${vals[ask-1]} + 1 = ${ans}.`:`Rückwärts: immer 1 weniger. Vor dem Kästchen steht ${vals[ask-1]}. ${vals[ask-1]} − 1 = ${ans}.`,
     dir>0?`Forwards: always 1 more. Before the box is ${vals[ask-1]}. ${vals[ask-1]} + 1 = ${ans}.`:`Backwards: always 1 less. Before the box is ${vals[ask-1]}. ${vals[ask-1]} − 1 = ${ans}.`,"row")};},
 heft:u=>heftRows(u),
 parent:{method:"Workbook p. 26 (tasks 2–3): continue number rows forwards and backwards, also past 10. Counting backwards fluently is the basis for subtraction.",
  words:[["vorwärts","forwards"],["rückwärts","backwards"],["die Zahlenreihe","number row"],["Setze fort.","Carry on."]],
  games:["Count backwards from 10 like a rocket launch, then from 15.","Walk the stairs counting up, come down counting back."]}},

{id:32,k:"B",sec:"Sachaufgaben",emo:"📊",de:"Daten und Tabellen",en:"Data and tables",page:"27",
 say:["Im Tierpark leben viele Tiere. Wir zählen jede Sorte und tragen die Zahl in eine Tabelle ein.","Lots of animals live in the farm park. We count each kind and write the number in a table."],
 merk:["Erst zählen, dann eintragen, dann vergleichen.","First count, then fill in, then compare."],
 ex:()=>[{vis:dtab(["🐰 Kaninchen","🐔 Hühner","🦆 Enten"],[3,5,4],null,true),de:"3 Kaninchen, 5 Hühner, 4 Enten",en:"3 rabbits, 5 hens, 4 ducks"},{vis:dtab(["4 Beine","2 Beine"],[7,9]),de:"Kaninchen, Ziegen und Ponys haben 4 Beine. Hühner und Enten haben 2 Beine.",en:"Rabbits, goats and ponies have 4 legs. Hens and ducks have 2 legs."}],
 gen(){const ty=pick(["count","count","legs","most","table"]);
  if(ty==="table"){const s=R(1,5),b=R(1,4),g=R(1,4),q=pick(["sum","diff"]);
   const vis=dtab(["⚫ schwarz","🟤 braun","🐾 gefleckt"],[s,b,g]);
   if(q==="sum")return {vis,de:"Lies die Tabelle: Wie viele Meerschweinchen sind es zusammen?",en:"Read the table: how many guinea pigs are there altogether?",opts:nopts(s+b+g,[s+b,s+g,s+b+g+1],1,20),
     stmt:eqs(a=>`Es sind ${a} Meerschweinchen.`,a=>`There are ${a} guinea pigs.`),why:W(vis+eqline(`${s} + ${b} + ${g} = ${s+b+g}`),`Rechne alle Zahlen aus der Tabelle zusammen: ${s} + ${b} + ${g} = ${s+b+g}.`,`Add all the numbers in the table: ${s} + ${b} + ${g} = ${s+b+g}.`,"data")};
   const [x,y]=s===b?[s+1,b]:[Math.max(s,b),Math.min(s,b)],big=s===b?"schwarze":s>b?"schwarze":"braune",small=s>b||s===b?"braune":"schwarze";const v2=dtab(["⚫ schwarz","🟤 braun","🐾 gefleckt"],[s===b?s+1:s,b,g]);
   return {vis:v2,de:`Wie viele ${big} Meerschweinchen sind es mehr als ${small}?`,en:`How many more ${big==="schwarze"?"black":"brown"} guinea pigs are there than ${small==="braune"?"brown":"black"}?`,opts:nopts(x-y,[x,y,x-y+1],0,10),
    stmt:eqs(a=>`Es sind ${a} mehr.`,a=>`There are ${a} more.`),why:W(v2+eqline(`${x} − ${y} = ${x-y}`),`${x} ${big} und ${y} ${small}. Der Unterschied: ${x} − ${y} = ${x-y}.`,`${x} and ${y}. The difference: ${x} − ${y} = ${x-y}.`,"data")};}
  const kinds=shuffle(TIERE).slice(0,3);if(!kinds.some(t=>t[4]===2))kinds[2]=pick(TIERE.filter(t=>t[4]===2));if(!kinds.some(t=>t[4]===4))kinds[2]=pick(TIERE.filter(t=>t[4]===4&&!kinds.includes(t)));
  const counts=shuffle(cnt(1,6)).slice(0,3),vis=farmVis(kinds,counts);
  if(ty==="count"){const j=R(0,2),t=kinds[j],c=counts[j];
   return {vis,de:`Zähle! Wie viele ${t[2]} sind es? ${t[0]}`,en:`Count! How many ${t[3]} are there? ${t[0]}`,opts:nopts(c,counts.filter(x=>x!==c),1,8),stmt:eqs(a=>`Es sind ${a} ${t[2]}.`,a=>`There are ${a} ${t[3]}.`),
    why:W(vis,`Tippe auf jedes ${t[0]} und zähle: ${cnt(1,c).join(", ")}. Es sind ${c} ${t[2]}.`,`Point at each ${t[0]} and count: ${cnt(1,c).join(", ")}. There are ${c} ${t[3]}.`,"data")};}
  if(ty==="legs"){const four=kinds.map((t,j)=>t[4]===4?counts[j]:0).reduce((a,b)=>a+b,0),fk=kinds.filter(t=>t[4]===4);
   return {vis,de:"Wie viele Tiere haben 4 Beine?",en:"How many animals have 4 legs?",opts:nopts(four,[four+1,four-1,counts[0]+counts[1]+counts[2]-four],1,20),stmt:eqs(a=>`${a} Tiere haben 4 Beine.`,a=>`${a} animals have 4 legs.`),
    why:W(vis,`4 Beine haben: ${fk.map(t=>t[2]+" "+t[0]).join(", ")}. Zähle sie zusammen: ${kinds.map((t,j)=>t[4]===4?counts[j]:null).filter(x=>x!==null).join(" + ")} = ${four}. Hühner und Enten haben nur 2 Beine.`,`4 legs: ${fk.map(t=>t[3]).join(", ")}. Add them: ${kinds.map((t,j)=>t[4]===4?counts[j]:null).filter(x=>x!==null).join(" + ")} = ${four}. Hens and ducks have only 2 legs.`,"data")};}
  const mx=counts.indexOf(Math.max(...counts)),c=`${kinds[mx][0]}|${kinds[mx][2]}`;
  return {vis,de:"Von welchem Tier gibt es am meisten?",en:"Which animal is there the most of?",opts:[c,...kinds.filter((t,j)=>j!==mx).map(t=>`${t[0]}|${t[2]}`)],stmt:eqs(a=>`Am meisten gibt es ${a.split("|")[1]}.`,a=>`There are most ${a.split("|")[1]}.`),
   why:W(dtab(kinds.map(t=>t[0]),counts),`Zähle jede Sorte: ${kinds.map((t,j)=>`${counts[j]} ${t[2]}`).join(", ")}. Die größte Zahl ist ${counts[mx]}.`,`Count each kind: ${kinds.map((t,j)=>`${counts[j]} ${t[3]}`).join(", ")}. The biggest number is ${counts[mx]}.`,"data")};},
 heft:u=>heftTable(u),
 parent:{method:"Workbook p. 27 (Daten – Tabellen): count animals in a picture, make a tally, write the number, sort by 2 or 4 legs, and read a table to colour a picture. This is the start of statistics.",
  words:[["die Tabelle","table"],["eintragen","to fill in"],["Kaninchen, Hühner, Ziegen, Ponys, Enten","rabbits, hens, goats, ponies, ducks"],["4 Beine / 2 Beine","4 legs / 2 legs"],["weiß, braun, gefleckt, schwarz","white, brown, spotted, black"],["das Meerschweinchen","guinea pig"]],
  games:["Count the toys on her shelf by kind and make a small table together.","At the zoo or a farm: tally the animals you see."]}},

{id:33,k:"B",sec:"Geometrie",emo:"⬅️",de:"Links und rechts",en:"Left and right",page:"28",
 say:["Halte die linke Hand hoch. Daumen und Zeigefinger machen ein L. L wie links! Wohin die Nase zeigt, dahin läuft das Tier.","Hold up your left hand. Thumb and first finger make an L. L for links, left! An animal runs the way its nose points."],
 merk:["L wie links!","L for left!"],
 ex:()=>[{vis:critter("l","mouse"),de:"Die Maus läuft nach links.",en:"The mouse runs to the left."},{vis:critter("r","car"),de:"Das Auto fährt nach rechts.",en:"The car drives to the right."}],
 gen(){const ty=pick(["one","one","count","lof"]);
  if(ty==="one"){const d=pick(["l","r"]),k=pick(["mouse","car"]),w=d==="l"?"links":"rechts",o=d==="l"?"rechts":"links";const subj=k==="car"?["Das Auto fährt","The car drives"]:["Die Maus läuft","The mouse runs"];
   return {vis:`<div class="crow big">${critter(d,k)}</div>`,de:k==="car"?"Fährt das Auto nach links oder nach rechts?":"Läuft die Maus nach links oder nach rechts?",en:k==="car"?"Does the car drive to the left or to the right?":"Does the mouse run to the left or to the right?",
    opts:[`${w}|${d==="l"?"left":"right"}`,`${o}|${d==="l"?"right":"left"}`],stmt:eqs(a=>`${subj[0]} nach ${a.split("|")[0]}.`,a=>`${subj[1]} to the ${a.split("|")[1]}.`),
    why:W(`<div class="crow big">${critter(d,k)}</div><div class="lhand">🤚 L = links</div>`,`Schau, wohin die ${k==="car"?"Lampe vorne":"Nase"} zeigt: nach ${w}. Linke Hand: Daumen und Zeigefinger machen ein L.`,`Look where the ${k==="car"?"front light":"nose"} points: to the ${d==="l"?"left":"right"}. Left hand: thumb and first finger make an L.`,"lr")};}
  if(ty==="count"){const k=pick(["mouse","car"]),dirs=shuffle([...Array(R(1,4)).fill("l"),...Array(6).fill("r")]).slice(0,6);const nl=dirs.filter(d=>d==="l").length;
   return {vis:`<div class="crow">${dirs.map(d=>critter(d,k)).join("")}</div>`,de:k==="car"?"Wie viele Autos fahren nach links?":"Wie viele Mäuse laufen nach links?",en:k==="car"?"How many cars drive to the left?":"How many mice run to the left?",opts:nopts(nl,[6-nl,nl+1],0,6),
    stmt:eqs(a=>`${a} ${k==="car"?"Autos fahren":"Mäuse laufen"} nach links.`,a=>`${a} ${k==="car"?"cars drive":"mice run"} to the left.`),
    why:W(`<div class="crow">${dirs.map(d=>critter(d,k).replace('class="critter"',d==="l"?'class="critter pick"':'class="critter"')).join("")}</div>`,`Die lila ${k==="car"?"Autos fahren":"Mäuse laufen"} nach links. Zähle sie: ${nl}.`,`The purple ones go to the left. Count them: ${nl}.`,"lr")};}
  const IT=[["🍎","der Apfel","vom Apfel"],["⚽","der Ball","vom Ball"],["🌸","die Blume","von der Blume"],["⭐","der Stern","vom Stern"],["🎈","der Ballon","vom Ballon"],["🧸","der Teddy","vom Teddy"],["🍌","die Banane","von der Banane"],["🎁","das Geschenk","vom Geschenk"]];
  const row=shuffle(IT).slice(0,4),side=pick(["l","r"]),t=side==="l"?R(1,3):R(0,2),ans=row[t+(side==="l"?-1:1)],other=row.filter(x=>x!==ans&&x!==row[t]);
  const S1=side==="l"?"Links":"Rechts";
  return {vis:`<div class="items">${row.map(x=>`<span>${x[0]}</span>`).join("")}</div>`,de:`Was ist ${side==="l"?"links":"rechts"} ${row[t][2]} ${row[t][0]}?`,en:`What is to the ${side==="l"?"left":"right"} of the ${row[t][0]}?`,
   opts:[`${ans[0]}|${ans[1]}`,...other.slice(0,2).map(x=>`${x[0]}|${x[1]}`)],stmt:eqs(a=>`${S1} ${row[t][2]} ist ${a.split("|")[1]}.`,a=>`${a.split("|")[0]} is to the ${side==="l"?"left":"right"} of ${row[t][0]}.`),
   why:W(`<div class="items">${row.map(x=>`<span class="${x===ans?"hl":""}">${x[0]}</span>`).join("")}</div><div class="lhand">🤚 L = links</div>`,`Leg den Finger auf ${row[t][1]} ${row[t][0]}. Geh einen Schritt nach ${side==="l"?"links":"rechts"}: da ist ${ans[1]} ${ans[0]}.`,`Put your finger on the ${row[t][0]}. Move one step to the ${side==="l"?"left":"right"}: there is the ${ans[0]}.`,"lr")};},
 heft:u=>heftLR(u),
 parent:{method:"Workbook p. 28 (Orientierung: Links – Rechts): the ‘Wortspeicher’ L-hand trick (left thumb and index finger make an L). Children colour only the animals running to the left. Direction = where the nose points.",
  words:[["links / rechts","left / right"],["die linke Hand","the left hand"],["nach links laufen","to run to the left"],["der Wortspeicher","word store (vocabulary box)"],["Welche Tiere laufen nach links?","Which animals run to the left?"]],
  games:["Simon says with links/rechts: ‘Hebe die rechte Hand!’","Put shoes in a row, some pointing left, some right — she turns the left ones around."]}}
);

/* ============================ ✏️ WIE IM HEFT: interactive workbook pages ============================ */
let PV="",PCB=null;
function padHtml(){return `<div class="hpad">${[1,2,3,4,5,6,7,8,9,0].map(d=>`<button class="hk" data-d="${d}">${d}</button>`).join("")}<button class="hk del" data-d="del" aria-label="löschen">⌫</button><button class="hk ok" data-d="ok" aria-label="fertig">✔</button></div>`;}
function setPad(max,show,submit){PV="";PCB={max,show,submit};app.querySelectorAll(".hk").forEach(b=>b.onclick=()=>padKey(b.dataset.d));}
function padKey(d){if(!PCB)return;const {max,show,submit}=PCB;
  if(d==="del"){PV=PV.slice(0,-1);show(PV);return;}
  if(d==="ok"){if(PV!==""){const v=+PV;PV="";submit(v);}return;}
  if(PV.length>=2)return;PV+=d;show(PV);tone([520+(+d)*30],.05);
  if(PV==="0"||+PV*10>max||PV.length>=2){const v=+PV;PV="";setTimeout(()=>submit(v),200);}}
document.addEventListener("keydown",e=>{if(!PCB||app.closest("[hidden]")||!app.querySelector(".hpad"))return;
  if(/^[0-9]$/.test(e.key))padKey(e.key);else if(e.key==="Backspace")padKey("del");else if(e.key==="Enter")padKey("ok");else return;e.preventDefault();});
function heftShell(u){PCB=null;app.innerHTML=head(u)+`<div class="panel heft" id="hp"><div class="wsp">✏️ Wie im Heft${u.page?` · S. ${u.page}`:""}</div>
   <div class="hinstr"><button class="spk" id="hsp" aria-label="Vorlesen">🔊</button><div id="hit"></div></div><div id="hbody"></div><div class="feedback" id="hfb"></div><div class="row" id="hrow"></div></div>`;
  wireHead(u,()=>{PCB=null;unit(u);});setC($("#hp"),u);setC($("#hsp"),u);$("#hsp").onclick=()=>speakEl($("#hit"),{force:true});}
function hInstr(de,en){$("#hit").innerHTML=bi(de,en);speakEl($("#hit"));}
function hFb(ok,de,en){const f=$("#hfb");f.className="feedback "+(ok===null?"":ok?"ok":"no");f.innerHTML=de?`${de}`:"";}
function hGood(){S.solved=(S.solved||0)+1;save();yay();}
function hBad(el){if(el){el.classList.add("wrong");oops();setTimeout(()=>el.classList.remove("wrong"),650);}else{const x=$("#hfb");x.classList.add("wrong");oops();setTimeout(()=>x.classList.remove("wrong"),650);}}
function hNext(label,fn){$("#hrow").innerHTML=`<button class="btn" id="hnext">${label}</button>`;setC($("#hnext"),{sec:"Rechnen"});$("#hnext").style.setProperty("--c","var(--accent)");$("#hnext").onclick=()=>{stopSpeech();$("#hrow").innerHTML="";hFb(null);fn();};}
function hDone(u,good,bad,line,again){PCB=null;const p=good/Math.max(1,good+bad),st=good===0?0:p>=.9?3:p>=.75?2:p>=.5?1:0;
  saveG(u,"heft",st);if(st>(S.best[u.id]||0)){S.best[u.id]=st;save();}showResult(u,st,line,again);}
const LEN3=()=>({short:2,medium:3,long:4}[S.len||"medium"]);

/* ---- 🏡 Zerlegehaus: Setze fort · Finde alle · blaues Haus ---- */
function heftHaus(u){const plan=[{t:"cont",n:R(5,7)},{t:"all",n:R(3,5)},{t:"three",n:R(6,8)},{t:"cont",n:R(8,10)}].slice(0,LEN3());let si=0,good=0,bad=0;heftShell(u);
  function stage(){const s=plan[si];let rows,act;const B=$("#hbody");
    if(s.t==="cont"){rows=cnt(0,s.n).map(i=>[{v:i,k:"g"},{v:i?"":s.n,k:i?"":"g"}]);act=[1,1];
      hInstr(`Setze fort! Auf dem Dach steht ${s.n}. Links steht die Zahl schon. Wie viele fehlen bis ${s.n}?`,`Carry on! The roof says ${s.n}. The left number is already there. How many are missing to make ${s.n}?`);}
    else if(s.t==="all"){rows=cnt(0,s.n).map(()=>[{v:"",k:""},{v:"",k:""}]);act=[0,0];
      hInstr(`Finde alle Möglichkeiten für ${s.n}! Tipp: Fang mit 0 an.`,`Find all the ways to make ${s.n}! Tip: start with 0.`);}
    else{const a=1,b=2;rows=[[{v:a,k:"g"},{v:b,k:"g"},{v:s.n-3,k:"g"}],...cnt(1,3).map(()=>[{v:"",k:""},{v:"",k:""},{v:"",k:""}])];act=[1,0];
      hInstr(`Das blaue Haus hat drei Zahlen in jeder Reihe. Immer ${s.n}! Finde andere Möglichkeiten.`,`The blue house has three numbers in each row. Always ${s.n}! Find other ways.`);}
    const three=s.t==="three";
    function draw(){B.innerHTML=zhHtml(s.n,rows,act,three)+padHtml();setPad(s.n,v=>{const c=B.querySelector(".zc.act");if(c)c.textContent=v;},submit);
      const a=B.querySelector(".zc.act");if(a)a.scrollIntoView({block:"nearest",behavior:"smooth"});}
    function submit(v){const [r,c]=act,row=rows[r],el=B.querySelector(".zc.act");let ok,why="",whyEn="";
      if(s.t==="cont"){ok=v===s.n-row[0].v;if(!ok){why=`${row[0].v} + ? = ${s.n}. Zähle von ${row[0].v} weiter bis ${s.n}.`;whyEn=`${row[0].v} + ? = ${s.n}. Count on from ${row[0].v} to ${s.n}.`;}}
      else if(s.t==="all"){if(c===0){ok=v<=s.n&&!rows.some((x,i)=>i!==r&&x[0].v===v);if(!ok){why=v>s.n?`${v} ist größer als ${s.n}. Das passt nicht ins Haus.`:`Die ${v} wohnt schon links im Haus! Nimm eine andere Zahl.`;whyEn=v>s.n?`${v} is bigger than ${s.n}. It doesn't fit.`:`${v} is already on the left! Try another number.`;}}
        else{ok=v===s.n-row[0].v;if(!ok){why=`${row[0].v} + ? = ${s.n}`;whyEn=why;}}}
      else{const before=row.slice(0,c).reduce((a,x)=>a+x.v,0);if(c<2){ok=before+v<=s.n-(c===0?1:0);if(!ok){why=`Das ist zu viel! Zusammen darf es nur ${s.n} sein.`;whyEn=`That's too much! Together it may only be ${s.n}.`;}}
        else{const key=[row[0].v,row[1].v,v].join("+"),dup=rows.some((x,i)=>i!==r&&x.map(y=>y.v).join("+")===key);ok=before+v===s.n&&!dup;
          if(!ok){why=dup?"Diese Reihe gibt es schon. Probier andere Zahlen!":`${row[0].v} + ${row[1].v} + ? = ${s.n}`;whyEn=dup?"That row is already there. Try other numbers!":why;}}}
      if(!ok){bad++;hBad(el);hFb(false,"Fast! "+why,whyEn);if(el)el.textContent="";return;}
      row[c]={v,k:"f"};hFb(null);
      const rowDone=s.t==="cont"||c===row.length-1;if(rowDone){good++;hGood();}
      if(s.t==="cont")act=[r+1,1];else act=c<row.length-1?[r,c+1]:[r+1,0];
      if(act[0]>=rows.length){act=null;
        if(s.t==="all")rows.sort((x,y)=>x[0].v-y[0].v);
        B.innerHTML=zhHtml(s.n,rows,null,three)+(s.t!=="three"?`<p class="hnote">👀 Links: ${rows.map(x=>x[0].v).join(", ")} – immer 1 mehr. Rechts: ${rows.map(x=>x[1].v).join(", ")} – immer 1 weniger.</p>`:"");PCB=null;
        hFb(true,"🎉 Das Haus ist fertig!","The house is finished!");speak("Super! Das Haus ist fertig!");si++;
        si<plan.length?hNext("Nächstes Haus ▶",stage):hNext("Fertig! ⭐",()=>hDone(u,good,bad,`${good} Reihen richtig`,()=>heftHaus(u)));return;}
      draw();}
    draw();}
  stage();}

/* ---- 🎈 Ballons anmalen (2 or 3 colours) ---- */
function heftBallons(u,three){const pal=three?["r","y","b"]:["b","r"];
  const plan=(three?[[5,3],[7,2],[10,2],[6,3]]:[[4,5],[3,4],[7,4],[5,4]]).slice(0,LEN3());let si=0,good=0;heftShell(u);
  function stage(){const [n,target]=plan[si];let cols=Array(n).fill("w"),sel=pal[0];const found=[];const B=$("#hbody");
    hInstr(three?`Male die ${n} Ballons rot, gelb und blau an. Finde ${target} verschiedene Möglichkeiten!`:`Male die ${n} Ballons blau und rot an. Finde ${target} verschiedene Möglichkeiten!`,
      three?`Colour the ${n} balloons red, yellow and blue. Find ${target} different ways!`:`Colour the ${n} balloons blue and red. Find ${target} different ways!`);
    const counts=()=>pal.map(c=>cols.filter(x=>x===c).length);
    function draw(){const cs=counts();
      B.innerHTML=`<div class="palette">${pal.map(c=>`<button class="pc${c===sel?" on":""}" data-c="${c}" style="--pc:${BCOL[c]}"><span></span>${BNAME[c][0]}</button>`).join("")}</div>
        <div class="baltap">${balloons(cols,n)}</div>
        <div class="eqb">${cs.map((x,i)=>`<span class="ebox" style="--pc:${BCOL[pal[i]]}">${x}</span>`).join(`<span class="ep">+</span>`)}<span class="ep">=</span><span class="ebox tot">${n}</span></div>
        <div class="row" style="justify-content:center"><button class="btn ghost" id="bclr">Alle weiß</button><button class="btn" id="bok">✔ Fertig</button></div>
        <div class="fchips"><span class="cl">Gefunden: ${found.length}/${target}</span>${found.map(f=>`<span class="fchip">${f}</span>`).join("")}</div>`;
      B.querySelectorAll(".pc").forEach(b=>b.onclick=()=>{sel=b.dataset.c;draw();});
      B.querySelectorAll(".bal").forEach(g=>g.onclick=()=>{const i=+g.dataset.i;cols[i]=cols[i]===sel?"w":sel;tone([440+i*40],.06);draw();});
      setC($("#bok"),u);$("#bclr").onclick=()=>{cols=Array(n).fill("w");draw();};
      $("#bok").onclick=()=>{const cs=counts(),key=cs.join(" + ");
        if(cols.includes("w"))return hFb(false,`Male alle ${n} Ballons an! Noch ${cols.filter(x=>x==="w").length} weiß.`,`Colour all ${n} balloons! ${cols.filter(x=>x==="w").length} are still white.`);
        if(three&&cs.includes(0))return hFb(false,"Benutze alle drei Farben!","Use all three colours!");
        if(found.includes(key))return hFb(false,`${key} hast du schon! Probier eine andere Möglichkeit.`,`You already have ${key}! Try another way.`);
        found.push(key);good++;hGood();hFb(true,`🎉 ${n} = ${key}`,"");speak(`${n} gleich ${cs.join(" plus ")}`);
        if(found.length>=target){draw();B.querySelectorAll("button").forEach(b=>b.disabled=true);si++;
          speak("Toll! Alle gefunden!");si<plan.length?hNext("Nächster Strauß ▶",stage):hNext("Fertig! ⭐",()=>hDone(u,good,0,`${good} Möglichkeiten gefunden`,()=>heftBallons(u,three)));}
        else draw();};}
    draw();}
  stage();}

/* ---- 📦 Schüttelbox ---- */
function heftBox(u){const N={short:3,medium:5,long:7}[S.len||"medium"];const plan=[{n:8},{n:8},{n:6},{n:6,lid:1},{n:R(7,10),lid:1},{n:R(5,10)},{n:R(5,10),lid:1}].slice(0,N);let si=0,good=0,bad=0,last=-1;heftShell(u);
  function round(){const s=plan[si],n=s.n,B=$("#hbody");
    hInstr(`Runde ${si+1} von ${N}: In der Box sind ${n} Kugeln. Schüttle die Box!`,`Round ${si+1} of ${N}: there are ${n} balls in the box. Shake the box!`);
    B.innerHTML=`<div id="bxv">${boxVis(n,n,0)}</div><div class="row" style="justify-content:center"><button class="btn" id="shake">Schütteln! 🫨</button></div>`;setC($("#shake"),u);
    $("#shake").onclick=()=>{let l=R(0,n);while(l===last&&n>1)l=R(0,n);last=l;const r=n-l;const v=$("#bxv");v.classList.add("shaking");tone([300,360,300,360],.06);
      setTimeout(()=>{v.classList.remove("shaking");ask(l,r);},700);};
    function ask(l,r){const lid=s.lid?(Math.random()<.5?"r":"l"):null;let cells=lid?[{v:n,k:"g"},{v:lid==="l"?"":l,k:lid==="l"?"":"g"},{v:lid==="r"?"":r,k:lid==="r"?"":"g"}]:[{v:n,k:"g"},{v:"",k:""},{v:"",k:""}];
      let act=lid?(lid==="l"?1:2):1;
      if(lid)hInstr(`Der Deckel ist zu! ${lid==="l"?r:l} Kugeln siehst du. Wie viele sind unter dem Deckel?`,`The lid is on! You can see ${lid==="l"?r:l} balls. How many are under the lid?`);
      else hInstr("Zähle links und rechts. Schreib die Plusaufgabe.","Count left and right. Write the plus sum.");
      function draw(){B.innerHTML=`<div id="bxv">${boxVis(n,l,r,lid)}</div><div class="eqb big"><span class="ebox g">${n}</span><span class="ep">=</span>${[1,2].map(i=>`<span class="ebox ${cells[i].k}${act===i?" act":""}">${cells[i].v}</span>`).join(`<span class="ep">+</span>`)}</div>`+padHtml();
        setPad(10,v=>{const e=B.querySelector(".ebox.act");if(e)e.textContent=v;},submit);}
      function submit(v){const want=act===1?l:r,el=B.querySelector(".ebox.act");
        if(v!==want){bad++;hBad(el);hFb(false,lid?`Fast! ${n} − ${lid==="l"?r:l} = ?`:act===1?"Fast! Zähle die Kugeln links.":"Fast! Zähle die Kugeln rechts.",lid?"":act===1?"Nearly! Count the balls on the left.":"Nearly! Count the balls on the right.");draw();return;}
        cells[act]={v,k:"f"};hFb(null);
        if(!lid&&act===1){act=2;draw();return;}
        hGood();good++;PCB=null;B.innerHTML=`<div id="bxv">${boxVis(n,l,r)}</div><div class="eqb big"><span class="ebox g">${n}</span><span class="ep">=</span><span class="ebox f">${l}</span><span class="ep">+</span><span class="ebox f">${r}</span></div>`;
        hFb(true,`🎉 ${n} = ${l} + ${r}`,"");speak(`${n} gleich ${l} plus ${r}`);si++;
        si<N?hNext("Nochmal schütteln ▶",round):hNext("Fertig! ⭐",()=>hDone(u,good,bad,`${good} von ${N} Boxen richtig`,()=>heftBox(u)));}
      draw();}}
  round();}

/* ---- ✏️ Strichliste: draw and read ---- */
function heftTally(u){const draws=[3,5,4,7,12].slice(0,{short:3,medium:4,long:5}[S.len||"medium"]),reads=[R(6,9),R(10,15)];const tasks=[...draws.map(n=>({t:"draw",n})),...reads.map(n=>({t:"read",n}))];let ti=0,good=0,bad=0;heftShell(u);
  function task(){const s=tasks[ti],B=$("#hbody");
    if(s.t==="draw"){let k=0;hInstr(`Mach eine Strichliste für die ${s.n}! Der fünfte Strich geht quer.`,`Make a tally for ${s.n}! The fifth stroke goes across.`);
      function draw(){B.innerHTML=`<div class="tdraw"><div class="bignum">${s.n}</div><div class="tbox">${k?tallyVis(k):`<span class="tph">…</span>`}</div></div><div class="row" style="justify-content:center"><button class="btn" id="tadd">✏️ Strich</button><button class="btn ghost" id="tdel">⌫</button><button class="btn" id="tok">✔ Fertig</button></div>`;
        setC($("#tadd"),u);setC($("#tok"),u);$("#tadd").onclick=()=>{if(k<20){k++;tone([400+k*25],.05);draw();}};$("#tdel").onclick=()=>{if(k>0){k--;draw();}};
        $("#tok").onclick=()=>{if(k===s.n){good++;hGood();hFb(true,`🎉 Richtig! ${s.n} Striche.`,`Right! ${s.n} strokes.`);speak(`Richtig! ${s.n} Striche.`);B.querySelectorAll("button").forEach(b=>b.disabled=true);ti++;nextT();}
          else{bad++;hBad($(".tbox"));hFb(false,`Du hast ${k} Striche. Es sollen ${s.n} sein. ${k<s.n?"Mach noch "+(s.n-k)+" dazu.":"Nimm "+(k-s.n)+" weg."}`,`You have ${k}. It should be ${s.n}.`);}};}
      draw();}
    else{let val="";hInstr("Wie viele Striche sind es? Zähle die Fünferbündel: 5, 10 …","How many strokes? Count the bundles: 5, 10 …");
      const draw=()=>{B.innerHTML=`<div class="tdraw"><div class="tbox">${tallyVis(s.n)}</div><span class="ebox act big1">${val}</span></div>`+padHtml();setPad(20,v=>{val=v;B.querySelector(".ebox").textContent=v;},submit);};
      function submit(v){if(v===s.n){good++;hGood();PCB=null;B.querySelector(".ebox").textContent=v;B.querySelector(".ebox").className="ebox f big1";hFb(true,`🎉 ${s.n}!`,"");speak(`Richtig, ${s.n}!`);ti++;nextT();}
        else{bad++;val="";hBad(B.querySelector(".ebox"));B.querySelector(".ebox").textContent="";hFb(false,`Fast! ${Math.floor(s.n/5)} Bündel sind ${5*Math.floor(s.n/5)}. Dann zähl die einzelnen Striche dazu.`,`Nearly! ${Math.floor(s.n/5)} bundles are ${5*Math.floor(s.n/5)}. Then add the single strokes.`);}}
      draw();}}
  function nextT(){ti<tasks.length?hNext("Weiter ▶",task):hNext("Fertig! ⭐",()=>hDone(u,good,bad,`${good} von ${tasks.length} richtig`,()=>heftTally(u)));}
  task();}

/* ---- 🔢 Zahlenreihen ausfüllen ---- */
function heftRows(u){const mk=(st,dir,g)=>({vals:cnt(0,7).map(i=>st+dir*i),given:g,dir});
  const rows=[mk(R(1,4),1,[0,1,2,6]),mk(R(3,9),1,[0,1,2,6]),mk(R(7,9),-1,[0,1,2]),mk(R(11,15),-1,[0,1,2]),mk(R(5,12),1,[0,1])].slice(0,LEN3()+1);let ri=0,good=0,bad=0;heftShell(u);
  function row(){const s=rows[ri],B=$("#hbody");const cells=s.vals.map((v,i)=>s.given.includes(i)?{v,k:"g"}:{v:"",k:""});let act=cells.findIndex(c=>c.k==="");
    hInstr(s.dir>0?`Reihe ${ri+1}: Zähle vorwärts und fülle die leeren Kästchen.`:`Reihe ${ri+1}: Zähle rückwärts und fülle die leeren Kästchen.`,s.dir>0?`Row ${ri+1}: count forwards and fill the empty boxes.`:`Row ${ri+1}: count backwards and fill the empty boxes.`);
    function draw(){B.innerHTML=`<div class="dirl">${s.dir>0?"➡️ vorwärts (+1)":"⬅️ rückwärts (−1)"}</div>`+rowVis(cells,act)+padHtml();setPad(20,v=>{const e=B.querySelector(".nb.act");if(e)e.textContent=v;},submit);}
    function submit(v){const el=B.querySelector(".nb.act");if(v!==s.vals[act]){bad++;hBad(el);const p=s.vals[act-1];hFb(false,`Fast! ${p} ${s.dir>0?"+":"−"} 1 = ?`,`Nearly! ${p} ${s.dir>0?"+":"−"} 1 = ?`);draw();return;}
      cells[act]={v,k:"f"};good++;hGood();hFb(null);act=cells.findIndex(c=>c.k==="");
      if(act<0){PCB=null;B.innerHTML=`<div class="dirl">${s.dir>0?"➡️ vorwärts":"⬅️ rückwärts"}</div>`+rowVis(cells);hFb(true,"🎉 Die Reihe ist fertig!","The row is finished!");speak(s.vals.join(", "));ri++;
        ri<rows.length?hNext("Nächste Reihe ▶",row):hNext("Fertig! ⭐",()=>hDone(u,good,bad,`${good} Zahlen richtig`,()=>heftRows(u)));return;}
      draw();}
    draw();}
  row();}

/* ---- 📊 Tierpark-Tabelle · Beine · Meerschweinchen ---- */
function heftTable(u){let good=0,bad=0;heftShell(u);const B=()=>$("#hbody");const counts=TIERE.map(()=>R(1,6));const farm=farmVis(TIERE,counts,true);
  const stages=[count,legs,pigs].slice(0,LEN3());let si=0;
  function next(){si++;si<stages.length?hNext("Weiter ▶",stages[si]):hNext("Fertig! ⭐",()=>hDone(u,good,bad,`${good} richtig eingetragen`,()=>heftTable(u)));}
  function wireFarm(){B().querySelectorAll(".farm.tap .fa").forEach(f=>f.onclick=()=>{f.classList.toggle("ct");tone([660],.04);});}
  function count(){const vals=TIERE.map(()=>"");let act=0;hInstr("Zähle die Tiere im Tierpark. Trage die Zahl ein. Tipp: Tippe jedes gezählte Tier an.","Count the animals in the farm park. Fill in the number. Tip: tap each animal you have counted.");
    const draw=()=>{B().innerHTML=farm+dtab(TIERE.map(t=>`<span class="te">${t[0]}</span><br>${t[2]}`),vals,act,true)+padHtml();wireFarm();setPad(6,v=>{const e=B().querySelector(".dv.act");if(e)e.textContent=v;},submit);};
    const keepFarm=()=>{const f=B().querySelector(".farm");return f?f.outerHTML:farm;};
    function submit(v){const el=B().querySelector(".dv.act"),t=TIERE[act];if(v!==counts[act]){bad++;hBad(el);hFb(false,`Zähle die ${t[2]} ${t[0]} nochmal langsam.`,`Count the ${t[3]} again slowly.`);el.textContent="";return;}
      vals[act]=v;good++;hGood();hFb(null);act++;const fh=keepFarm();
      if(act>=TIERE.length){PCB=null;B().innerHTML=fh+dtab(TIERE.map(t=>`<span class="te">${t[0]}</span><br>${t[2]}`),vals,null,true);hFb(true,"🎉 Die Tabelle ist fertig!","The table is finished!");speak("Super! Die Tabelle ist fertig!");next();return;}
      B().innerHTML=fh+dtab(TIERE.map(t=>`<span class="te">${t[0]}</span><br>${t[2]}`),vals,act,true)+padHtml();wireFarm();setPad(6,v=>{const e=B().querySelector(".dv.act");if(e)e.textContent=v;},submit);}
    draw();}
  function legs(){const four=TIERE.reduce((a,t,j)=>a+(t[4]===4?counts[j]:0),0),two=TIERE.reduce((a,t,j)=>a+(t[4]===2?counts[j]:0),0),vals=["",""];let act=0;
    hInstr("Wie viele Tiere haben 4 Beine? Wie viele haben 2 Beine? Schau in deine Tabelle.","How many animals have 4 legs? How many have 2 legs? Look at your table.");
    const tab=dtab(TIERE.map(t=>`${t[0]} ${t[4]}🦵`),counts);
    const draw=()=>{B().innerHTML=tab+dtab(["4 Beine<br>🐰🐐🐴","2 Beine<br>🐔🦆"],vals,act)+padHtml();setPad(20,v=>{const e=B().querySelector(".dv.act");if(e)e.textContent=v;},submit);};
    function submit(v){const want=act===0?four:two;if(v!==want){bad++;hBad(B().querySelector(".dv.act"));
        const parts=TIERE.map((t,j)=>(t[4]===(act===0?4:2))?counts[j]:null).filter(x=>x!==null);hFb(false,`Fast! Rechne ${parts.join(" + ")}.`,`Nearly! Add ${parts.join(" + ")}.`);draw();return;}
      vals[act]=v;good++;hGood();hFb(null);act++;if(act>1){PCB=null;B().innerHTML=tab+dtab(["4 Beine","2 Beine"],vals);hFb(true,`🎉 ${four} Tiere mit 4 Beinen, ${two} mit 2 Beinen.`,`${four} animals with 4 legs, ${two} with 2 legs.`);next();return;}draw();}
    draw();}
  function pigs(){const want={s:R(1,3),b:R(1,2),g:R(1,2)},n=want.s+want.b+want.g,cols=Array(n).fill("w"),cyc=["w","s","b","g"];
    hInstr("Lies die Tabelle. Male die Meerschweinchen an: Tippe so oft, bis die Farbe stimmt.","Read the table. Colour the guinea pigs: tap until the colour is right.");
    const draw=()=>{B().innerHTML=dtab(["⚫ schwarz","🟤 braun","🐾 gefleckt"],[want.s,want.b,want.g])+`<div class="pigs">${cols.map((c,i)=>`<button class="pig" data-i="${i}" aria-label="Meerschweinchen ${i+1}">${gpig(c)}</button>`).join("")}</div>
      <div class="row" style="justify-content:center"><button class="btn" id="pok">✔ Fertig</button></div>`;
      B().querySelectorAll(".pig").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;cols[i]=cyc[(cyc.indexOf(cols[i])+1)%4];tone([500],.05);draw();});setC($("#pok"),u);
      $("#pok").onclick=()=>{const has={s:0,b:0,g:0,w:0};cols.forEach(c=>has[c]++);
        if(has.w)return hFb(false,`Noch ${has.w} weiß! Male alle an.`,`${has.w} are still white! Colour them all.`);
        const off=["s","b","g"].filter(k=>has[k]!==want[k]);const nm={s:["schwarze","black"],b:["braune","brown"],g:["gefleckte","spotted"]};
        if(off.length){bad++;hBad();return hFb(false,`Fast! Die Tabelle sagt ${want[off[0]]} ${nm[off[0]][0]}, du hast ${has[off[0]]}.`,`Nearly! The table says ${want[off[0]]} ${nm[off[0]][1]}, you have ${has[off[0]]}.`);}
        good++;hGood();B().querySelectorAll("button").forEach(b=>b.disabled=true);hFb(true,"🎉 Genau wie in der Tabelle!","Just like the table!");speak("Genau wie in der Tabelle!");next();};};
    draw();}
  stages[0]();}

/* ---- ⬅️ Welche Tiere laufen nach links? ---- */
function heftLR(u){const kinds=["mouse","car","mouse","car"].slice(0,LEN3()+1);let ri=0,good=0,bad=0;heftShell(u);
  function row(){const k=kinds[ri],nl=R(2,4),dirs=shuffle([...Array(nl).fill("l"),...Array(7-nl).fill("r")]),picked=new Set(),B=$("#hbody");
    hInstr(k==="car"?"Welche Autos fahren nach links? Tippe sie an – sie werden lila.":"Welche Mäuse laufen nach links? Tippe sie an – sie werden lila.",k==="car"?"Which cars drive to the left? Tap them – they turn purple.":"Which mice run to the left? Tap them – they turn purple.");
    const draw=(check)=>{B.innerHTML=`<div class="lhand">🤚 <b>L</b> = links (Daumen + Zeigefinger)</div><div class="crow tapr">${dirs.map((d,i)=>{let c=picked.has(i)?" pick":"";
        if(check)c+=d==="l"&&picked.has(i)?" okp":d==="l"?" miss":picked.has(i)?" badp":"";return `<button class="cbtn${c}" data-i="${i}" aria-label="${k==="car"?"Auto":"Maus"} ${i+1}">${critter(d,k)}</button>`;}).join("")}</div>
        ${check?"":`<div class="row" style="justify-content:center"><button class="btn" id="lok">✔ Fertig</button></div>`}`;
      if(check)return;B.querySelectorAll(".cbtn").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;picked.has(i)?picked.delete(i):picked.add(i);tone([picked.has(i)?660:440],.05);draw();});setC($("#lok"),u);
      $("#lok").onclick=()=>{const hit=dirs.filter((d,i)=>d==="l"&&picked.has(i)).length,miss=nl-hit,wrongp=[...picked].filter(i=>dirs[i]==="r").length;
        for(let j=0;j<hit;j++)hGood();good+=hit;bad+=miss+wrongp;if(miss+wrongp)hBad();draw(true);
        hFb(miss+wrongp===0,miss+wrongp===0?`🎉 Alle ${nl} gefunden!`:`${hit} von ${nl} richtig.${wrongp?` ${wrongp} ${k==="car"?"fahren":"laufen"} nach rechts.`:""}${miss?` ${miss} fehlen noch (gestrichelt).`:""}`,miss+wrongp===0?`All ${nl} found!`:`${hit} of ${nl} right.${wrongp?` ${wrongp} go to the right.`:""}${miss?` ${miss} missed (dashed).`:""}`);
        ri++;ri<kinds.length?hNext("Nächste Reihe ▶",row):hNext("Fertig! ⭐",()=>hDone(u,good,bad,`${good} richtig gefunden`,()=>heftLR(u)));};};
    draw(false);}
  row();}
