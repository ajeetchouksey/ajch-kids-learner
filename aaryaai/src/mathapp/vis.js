/* ============================ VISUALS (German school materials) ============================ */
/* Zehnerfeld (10) / Zwanzigerfeld (20): cells = array of "r" red, "b" blue, "x" crossed out, "" empty */
function field(cells,size){size=size||(cells.length>10?20:10);const c=cells.slice();while(c.length<size)c.push("");
  const out=[];c.forEach((k,i)=>{out.push(`<span class="c ${k}"></span>`);if(size===20&&i%10===4)out.push('<span class="sp"></span>');});
  return `<div class="field f${size}">${out.join("")}</div>`;}
const fill=(...groups)=>groups.flatMap(([n,k])=>Array(Math.max(0,n)).fill(k));
/* Würfelbild */
const PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function dice(n){return `<div class="dice">${[...Array(9)].map((_,i)=>`<span class="${PIPS[n].includes(i)?"p":""}"></span>`).join("")}</div>`;}
/* things in groups of five */
function objs(n,e){let s="";for(let i=0;i<n;i+=5)s+=`<span class="og">${e.repeat(Math.min(5,n-i))}</span>`;return `<div class="objs">${s}</div>`;}
function numberedObjs(n,e){return `<div class="objs num">${[...Array(n)].map((_,i)=>`<span class="ni"><span>${e}</span><b>${i+1}</b></span>`).join("")}</div>`;}
/* Zahlenstrahl */
function nline(min,max,{hi=[],q=[],jumps=[],labels}={}){
  const W=340,pad=16,step=(W-2*pad)/(max-min);const x=n=>pad+(n-min)*step;const span=max-min;
  const every=labels||(span<=20?(span<=10?1:5):10);
  let s=`<svg class="nline" viewBox="0 0 ${W} 86" role="img" aria-label="Zahlenstrahl"><line x1="${pad-6}" y1="56" x2="${W-pad+8}" y2="56" stroke="#1D2B53" stroke-width="2.5"/><path d="M${W-pad+8} 51 l8 5 -8 5z" fill="#1D2B53"/>`;
  for(let n=min;n<=max;n++){const big=n%5===0;if(span>20&&n%(span>50?5:1)!==0&&!hi.includes(n))continue;
    s+=`<line x1="${x(n)}" y1="${big?47:51}" x2="${x(n)}" y2="${big?65:61}" stroke="#1D2B53" stroke-width="${n%10===0?2.5:1.5}"/>`;
    if((n-min)%every===0||hi.includes(n))s+=`<text x="${x(n)}" y="80" text-anchor="middle" font-size="${span>20?10:12}" font-weight="${hi.includes(n)?700:400}" fill="${hi.includes(n)?"#E0443E":"#1D2B53"}">${n}</text>`;}
  hi.forEach(n=>{s+=`<circle cx="${x(n)}" cy="56" r="6" fill="#E0443E"/>`;});
  q.forEach(n=>{s+=`<rect x="${x(n)-11}" y="68" width="22" height="16" rx="4" fill="#FFC933"/><text x="${x(n)}" y="81" text-anchor="middle" font-size="12" font-weight="700" fill="#1D2B53">?</text>`;});
  jumps.forEach(([a,b,l])=>{const mx=(x(a)+x(b))/2,h=Math.min(34,10+Math.abs(b-a)*step*.25),dir=b>a?1:-1;
    s+=`<path d="M${x(a)} 48 Q${mx} ${48-h*1.6} ${x(b)} 48" fill="none" stroke="#1F9D63" stroke-width="2.5"/><path d="M${x(b)} 49 l${-dir*7} -6 l${dir*1} 7z" fill="#1F9D63" stroke="#1F9D63" stroke-width="1.5" stroke-linejoin="round"/>`;
    if(l)s+=`<text x="${mx}" y="${Math.max(12,48-h*.95)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1F9D63">${l}</text>`;});
  return s+"</svg>";}
/* Zahlenhaus */
function house(roof,rows){return `<div class="house"><div class="roof"><span>${roof}</span></div><div class="floors">${rows.map(r=>`<div class="fl">${r.map(v=>`<span class="${v==="?"?"qm":""}">${v}</span>`).join("")}</div>`).join("")}</div></div>`;}
/* Rechenmauer: rows from top to bottom */
function wall(rows){return `<div class="wall">${rows.map(r=>`<div class="wr">${r.map(v=>`<span class="brick${v==="?"?" qm":""}">${v}</span>`).join("")}</div>`).join("")}</div>`;}
/* Zehnerstangen und Einerwürfel */
function tensOnes(t,o){return `<div class="to">${[...Array(t)].map(()=>`<span class="ten"></span>`).join("")}<span class="ones">${[...Array(o)].map(()=>`<span class="one"></span>`).join("")}</span></div>`;}
/* Geld */
const COIN={"1ct":["1","ct","cu"],"2ct":["2","ct","cu"],"5ct":["5","ct","cu"],"10ct":["10","ct","br"],"20ct":["20","ct","br"],"50ct":["50","ct","br"],"1€":["1","€","bi"],"2€":["2","€","bi2"]};
const NOTE={"5€":"n5","10€":"n10","20€":"n20","50€":"n50"};
function money(list){return `<div class="money">${list.map(k=>NOTE[k]?`<span class="note ${NOTE[k]}"><b>${k.replace("€","")}</b> €</span>`:`<span class="coin ${COIN[k][2]}"><b>${COIN[k][0]}</b><small>${COIN[k][1]==="€"?"EURO":"CENT"}</small></span>`).join("")}</div>`;}
/* Uhr */
function clock(h,m){const ha=((h%12)+m/60)*30,ma=m*6;let nums="";for(let i=1;i<=12;i++){const a=i*30*Math.PI/180;nums+=`<text x="${60+43*Math.sin(a)}" y="${64-43*Math.cos(a)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1D2B53">${i}</text>`;}
  let ticks="";for(let i=0;i<60;i++){const a=i*6*Math.PI/180,r1=i%5?52:49;ticks+=`<line x1="${60+r1*Math.sin(a)}" y1="${60-r1*Math.cos(a)}" x2="${60+55*Math.sin(a)}" y2="${60-55*Math.cos(a)}" stroke="#1D2B53" stroke-width="${i%5?1:2}"/>`;}
  return `<svg class="clock" viewBox="0 0 120 120" role="img" aria-label="Uhr"><circle cx="60" cy="60" r="57" fill="#fff" stroke="#1D2B53" stroke-width="3"/>${ticks}${nums}
  <line x1="60" y1="60" x2="${60+28*Math.sin(ha*Math.PI/180)}" y2="${60-28*Math.cos(ha*Math.PI/180)}" stroke="#E0443E" stroke-width="6" stroke-linecap="round"/>
  <line x1="60" y1="60" x2="${60+44*Math.sin(ma*Math.PI/180)}" y2="${60-44*Math.cos(ma*Math.PI/180)}" stroke="#2F5BEA" stroke-width="3.5" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#1D2B53"/></svg>`;}
/* Formen */
const SHAPES={Kreis:'<circle cx="50" cy="50" r="40" fill="#FFC933" stroke="#1D2B53" stroke-width="3"/>',Dreieck:'<polygon points="50,10 92,88 8,88" fill="#E0443E" stroke="#1D2B53" stroke-width="3"/>',
  Quadrat:'<rect x="14" y="14" width="72" height="72" fill="#2F5BEA" stroke="#1D2B53" stroke-width="3"/>',Rechteck:'<rect x="4" y="26" width="92" height="50" fill="#1F9D63" stroke="#1D2B53" stroke-width="3"/>'};
function shape(n){return `<svg class="shape" viewBox="0 0 100 100" role="img" aria-label="Form">${SHAPES[n]}</svg>`;}
/* Punktefeld for times tables */
function arr(r,c){return `<div class="arr">${[...Array(r)].map(()=>`<div class="ar">${[...Array(c)].map(()=>'<span></span>').join("")}</div>`).join("")}</div>`;}
/* Hunderterfeld */
function hundred(n){return `<div class="hund">${[...Array(100)].map((_,i)=>`<span class="${i<n?"on":""}${i%10===4?" g":""}"></span>`).join("")}</div>`;}
/* verteilen (sharing) */
function plates(groups,each,e){return `<div class="plates">${[...Array(groups)].map(()=>`<span class="plate">${e.repeat(each)}</span>`).join("")}</div>`;}
/* Spiegel (doubling) */
function mirror(n){const sz=n>10?20:10;return `<div class="mirror">${field(fill([n,"r"]),sz)}<span class="mline"></span>${field(fill([n,"b"]),sz)}</div>`;}
/* steps: [ ["8 + 2 = 10","first"], ... ] */
function steps(list){return `<div class="steps2">${list.map((s,i)=>`<div class="st2"><span class="sn2">${i+1}</span>${kwHtml(s,"de")}</div>`).join("")}</div>`;}
function seqVis(nums,stepLabel){return `<div class="seq">${nums.map((n,i)=>`${i?`<span class="sarrow">${stepLabel||""}</span>`:""}<span class="sn ${n==="?"?"qm":""}">${n}</span>`).join("")}</div>`;}
