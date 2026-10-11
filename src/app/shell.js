/* ============================ SHELL: tabs · goal bar · today · awards · report ============================ */
const V={today:"vToday",en:"appE",de:"appD",math:"appM",brain:"vBrain",bhasha:"vBhasha",awards:"vAwards",parent:"vParent"};
const SUB={en:["🔤","English","#2F5BEA","#DCE5FF"],de:["🇩🇪","Deutsch","#D97A06","#FDEBCD"],math:["🧮","Mathe","#E0443E","#FDE2E1"],brain:["🧠","Training","#7C4DDB","#ECE4FC"],hi:["🪷","हिंदी","#C2185B","#FCE4EC"],mr:["🌺","मराठी","#E65100","#FFE9D6"]};
let CUR="today";
function show(v){
  if(v==="parent"&&!parentOK())return parentGate();
  UIL.set(v==="en"?"en":(v==="de"||v==="math")?"de":v==="brain"?PROF.brainLang():UIL.app());
  try{for(const m of [EN,MA,DE]){m.stopSpeech();m.closeSpeed();m.fxStop&&m.fxStop();}BR.stop();BH.stop();}catch(e){}
  CUR=v;for(const k in V)document.getElementById(V[k]).hidden=k!==v;
  document.querySelectorAll(".tab").forEach(b=>{b.classList.toggle("on",b.dataset.v===v||(v==="parent"&&b.dataset.v==="awards"));b.setAttribute("aria-selected",b.dataset.v===v);});
  if(v==="today")renderToday();if(v==="awards")renderAwards();if(v==="parent")renderParent();if(v==="brain")BR.home();if(v==="bhasha")BH.home();renderGbar();renderTabs();try{NBM.scanAll();}catch(e){}window.scrollTo(0,0);
  try{localStorage.setItem("aarya-tab",v==="parent"?"awards":v);}catch(e){}
}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>show(b.dataset.v));
/* tab labels: subject tabs keep their own name; Heute · Training · Auszeichnungen follow the App-Sprache */
function renderTabs(){const A=(de,en)=>UIL.app()==="en"?en:de;
  const TL={today:["🏠",A("Heute","Today")],en:["🔤","English"],de:["🇩🇪","Deutsch"],math:["🧮","Mathe"],brain:["🧠","Training"],bhasha:["🪔","हिंदी<br>मराठी"],awards:["🏆",A("Auszeich&shy;nungen","Awards")]};
  document.querySelectorAll(".tab").forEach(b=>{const t=TL[b.dataset.v];if(t)b.innerHTML=`<span>${t[0]}</span>${t[1]}`;});
  const at=(id,txt,attr)=>{const e=document.getElementById(id);if(e)e.setAttribute(attr||"aria-label",txt);};
  at("pts",T("Stufe und Punkte","Level and points"),"title");at("sbSpeed",T("Tempo und Stimme","Speed and voice"));at("sbSound",T("Stimme an/aus","Voice on/off"));at("sbSave",T("Speicherdatei","Save file"));
  try{if(typeof STORE!=="undefined")STORE.ui();}catch(e){}}
document.getElementById("pts").onclick=()=>show("awards");
document.getElementById("sbSpeed").onclick=()=>{(CUR==="math"?MA:CUR==="de"||CUR==="brain"?DE:EN).openSpeed();};
function syncSound(){const on=EN.S().voice;document.getElementById("sbSound").textContent=on?"🔊":"🔈";}
document.getElementById("sbSound").onclick=()=>{const nv=!EN.S().voice;[[EN,"soundE"],[MA,"soundM"],[DE,"soundD"]].forEach(([m,id])=>{if(m.S().voice!==nv)document.getElementById(id).click();});syncSound();};
[[MA,"soundM"],[DE,"soundD"]].forEach(([m,id])=>{if(m.S().voice!==EN.S().voice)document.getElementById(id).click();});syncSound();

const mins=s=>Math.round((s||0)/60);
const SUBJ_NAME={en:"English",de:"Deutsch",math:"Mathe",brain:"Training",hi:"Hindi",mr:"Marathi"};
const XSUBJ=["hi","mr"];
function subjectScores(){const R=REW.R();
  const st=(m,gof)=>{try{const U=m.U(),B=m.S().best;const by=[0,1,2].map(g=>{const us=U.filter(u=>gof(u)===g);return {stars:us.reduce((a,u)=>a+(B[u.id]||0),0),max:us.length*3,topics:us.filter(u=>B[u.id]>0).length,of:us.length};});
    return {stars:by.reduce((a,x)=>a+x.stars,0),max:by.reduce((a,x)=>a+x.max,0),by};}catch(e){return {stars:0,max:0,by:[]};}};
  const out={en:st(EN,u=>EN_GRADE[u.id]??1),de:st(DE,u=>u.k),math:st(MA,u=>u.k==="B"||u.k==="A"?1:u.k),brain:{stars:0,max:0,by:[]}};
  for(const k of XSUBJ){try{out[k]=Object.assign({by:[]},BH.stats(k));}catch(e){out[k]={stars:0,max:0,by:[]};}}
  for(const k of REW.SUBJ.concat(XSUBJ)){const c=R.tot[k]||0,w=R.wrong[k]||0;Object.assign(out[k],{points:R.sp[k]||0,correct:c,wrong:w,accuracy:pct(c,w)});}return out;}
function scoreCards(){const R=REW.R(),sc=subjectScores(),tot=REW.SUBJ.concat(XSUBJ).reduce((a,k)=>[a[0]+sc[k].correct,a[1]+sc[k].wrong,a[2]+sc[k].stars,a[3]+sc[k].max],[0,0,0,0]),L=REW.level();
  const card=(k)=>{const s=sc[k];return `<button class="scard" data-go="${XSUBJ.includes(k)?"bhasha":k}" data-l="${k}" style="--c:${SUB[k][2]};--cl:${SUB[k][3]}"><span class="se">${SUB[k][0]}</span><b>${SUB[k][1]}</b><span class="sp">🪙 ${s.points}</span>
    <small>${k==="brain"?`🏋️ ${R.tot.workouts} · 🤸 ${R.tot.moves}`:`⭐ ${s.stars}/${s.max}`} · ✔ ${s.accuracy===null?"–":s.accuracy+"%"}</small></button>`;};
  return `<div class="panel"><div class="lbl">📊 ${T("Punkte","Scores")}</div><div class="scards">${REW.SUBJ.concat(XSUBJ).map(card).join("")}</div>
    <div class="soverall"><span class="se">${L.e}</span><div><b>${T("Gesamt","Overall")}: 🪙 ${R.points}</b><small>${T("Stufe","Level")} ${L.n} · ⭐ ${tot[2]}/${tot[3]} · ✔ ${pct(tot[0],tot[1])===null?"–":pct(tot[0],tot[1])+"%"} ${T("richtig","right")}${R.sp.bonus?` · 🎁 ${R.sp.bonus} Bonus`:""}</small></div></div></div>`;}
const pct=(r,w)=>r+w?Math.round(100*r/(r+w)):null;

/* ---------- goal bar under the tabs (shown in every subject) ---------- */
function renderGbar(){const el=document.getElementById("gbar");const s=CUR==="hi"||CUR==="mr"?null:SUB[CUR];if(!s){el.hidden=true;return;}
  const R=REW.R(),d=REW.day(),k=CUR,g=R.goal[k],v=d[k],c=REW.combo(),L=REW.level();
  el.hidden=false;el.style.setProperty("--c",s[2]);el.style.setProperty("--cl",s[3]);
  el.innerHTML=`<span class="ge">${v>=g&&g?"✅":s[0]}</span><div class="gb"><div class="gt"><b>${T("Heute","Today")} ${g?`${Math.min(v,g)}/${g}`:`${v} ✔`}</b><small>${g?(v>=g?T("Ziel geschafft!","Goal done!"):T("Tagesziel","Today's goal")):T("richtig heute","right today")}</small></div>${g?`<div class="bar2"><i style="width:${Math.round(Math.min(1,v/g)*100)}%"></i></div>`:""}</div>
    <span class="gpts" title="${T("Punkte in diesem Fach","Points in this subject")}">🪙 ${R.sp[k]||0}</span><button class="nbmt${NBM.on()?" on":""}" id="nbmT" type="button" title="${T("Heft-Modus: erst ins Heft schreiben","Notebook mode: write in your notebook first")}">📓 ${NBM.on()?T("an","on"):T("aus","off")}</button>`;
  el.onclick=e=>{if(e.target.closest("#nbmT"))return;show("today");};document.getElementById("nbmT").onclick=e=>{e.stopPropagation();NBM.toggle();};}

function ring(val,goal,color,emoji,de,en){const p=goal?Math.min(1,val/goal):1,done=val>=goal;
  return `<div class="ring ${done?"done":""}" style="--rc:${color};--rp:${Math.round(p*100)}%"><div class="rin"><span class="re">${done?"✅":emoji}</span><b>${Math.min(val,goal)}/${goal}</b></div><div class="rl"><b>${en?T(de,en):de}</b></div></div>`;}
function lvlBox(L){const N=REW.LEVELS[L.i+1];
  return `<div class="lvbox"><div class="lvl1"><b>${T(`Stufe ${L.n}: ${L.de}`,`Level ${L.n}: ${L.en}`)}</b></div><div class="bar2 lvbar"><i style="width:${Math.round(L.p*100)}%"></i></div>
    <small>${N?T(`Noch ${L.left} Punkte bis ${N[1]} ${N[2]}`,`${L.left} more points to ${N[1]} ${N[3]}`):T("Höchste Stufe erreicht!","Top level reached!")}</small></div>`;}
/* ---------- what to do next: the subject furthest from its goal, its next topic ---------- */
function nextStep(){const R=REW.R(),d=REW.day(),g=R.goal,M={en:EN,de:DE,math:MA},GOF={en:u=>EN_GRADE[u.id]??1,de:u=>u.k,math:u=>u.k==="B"||u.k==="A"?1:u.k};
  const order=["de","math","en"].map(k=>({k,left:(g[k]||0)-d[k]})).sort((a,b)=>b.left-a.left);const k=order[0].k,m=M[k];
  try{const us=m.U().filter(u=>GOF[k](u)===PROF.view(k)),B=m.S().best,u=us.find(x=>!(B[x.id]>0))||us[0];return {k,u,title:T(u.de||u.title,u.title||u.de),emo:u.emo};}catch(e){return {k,u:null,title:SUB[k][1],emo:SUB[k][0]};}}
function planLog(){try{const P=PLAN.R(),ks=Object.keys(P.days).sort().slice(-7);if(!ks.length)return "";
  return `<div class="lplog"><small>${T("Lernplan der letzten Tage","Learning plan, last days")}:</small>${ks.map(k=>{const d=P.days[k],n=PLAN.ITEMS.filter(x=>d[x]).length,w=P.wlog[k];return `<span title="${k}">${k.slice(8)}.${k.slice(5,7)}. ${n===4?"✅":n+"/4"}${w?" ✏️"+w.checks.filter(Boolean).length+"/5":""}</span>`;}).join("")}</div>`;}catch(e){return "";}}
function renderToday(){
  const R=REW.R(),d=REW.day(),g=R.goal,L=REW.level(),nx=nextStep();
  const nextB=REW.BADGES.filter(b=>!R.badges[b[0]]).map(b=>({b,p:b[5]()})).sort((x,y)=>(y.p[0]/y.p[1])-(x.p[0]/x.p[1]))[0];
  const rb=REW.SUBJ.map(k=>`<span class="rbc ${d[k]>=3?"ok":""}" style="--c:${SUB[k][2]}">${d[k]>=3?"✔":SUB[k][0]} <small>${Math.min(3,d[k])}/3</small></span>`).join("");
  const noFile=typeof STORE!=="undefined"&&STORE.state()==="none";
  document.getElementById("vToday").innerHTML=`
    <div class="hello lvhello"><div class="big">${L.e}</div><div style="flex:1"><h2>${T("Hallo Aarya!","Hello Aarya!")}</h2>${lvlBox(L)}</div></div>
    ${PLAN.card()}
    <button class="block gonext" id="goNext" style="--c:${SUB[nx.k][2]};--cl:${SUB[nx.k][3]}"><span class="emo">${nx.emo}</span><span><small>${T("Weiter mit","Continue with")}</small><b>${AAI.esc(nx.title)}</b><i>${SUB[nx.k][0]} ${SUB[nx.k][1]}</i></span><span class="go2">▶</span></button>
    <div class="panel today"><div class="lbl">🎯 ${T("Heute","Today")}</div>
      <div class="rings">${g.de?ringB("de",d.de,g.de,"🇩🇪","Deutsch"):""}${g.math?ringB("math",d.math,g.math,"🧮","Mathe"):""}${g.en?ringB("en",d.en,g.en,"🔤","English"):""}${g.brain?ringB("brain",d.brain,g.brain,"🧠","Training"):""}${g.read?ring(d.read,g.read,"#1F9D63","📖","Lesen","Read aloud"):""}${g.heft?ringB("nb",d.heft,g.heft,"📓",T("Heft","Notebook")):""}</div>
      <p class="tsub">${d.goal?T("Alle Ringe sind voll! 🎉 Super gemacht!","All rings are full! 🎉 Great job!"):T("Tippe auf einen Ring und leg los!","Tap a ring to start!")}</p>
      ${R.opt.rainbow?`<div class="rainbow ${d.rainbow?"done":""}"><div><b>🌈 ${T("Regenbogen-Bonus","Rainbow bonus")} ${d.rainbow?"✅":"+5"}</b><small>${T("3 richtige in jedem Fach","3 right in every subject")}</small></div><div class="rbrow">${rb}</div></div>`:""}</div>
    <div class="gobig"><button class="block subj" id="goDe"><span class="emo">🇩🇪</span><b>Deutsch</b></button><button class="block subj" id="goMa"><span class="emo">🧮</span><b>Mathe</b></button><button class="block subj" id="goEn"><span class="emo">🔤</span><b>English</b></button></div>
    <div class="gobig two three"><button class="block subj" id="goBr"><span class="emo">🧠</span><b>Training</b><span>${T("Spiele & Bewegung","Games & moving")}</span></button><button class="block subj" id="goNb"><span class="emo">📓</span><b>${T("Heft-Zeit","Notebook time")}</b><span>${T("Stift & Heft","Pencil & notebook")}</span></button><button class="block subj" id="goTk"><span class="emo">🗣️</span><b>${T("Sprechen","Speaking")}</b><span>${T("Sprich mit mir 🎤","Talk with me 🎤")}</span></button></div>
    <button class="block chall gobh" id="goBh"><span class="emo">🪔</span><span><b>हिंदी · मराठी</b><span>${T("Hindi und Marathi lernen – mit echter Aussprache","Learn Hindi and Marathi – with native pronunciation")}</span></span><span class="go2">▶</span></button>
    ${nextB?`<div class="panel nextb"><div class="lbl">🔜 ${T("Nächste Auszeichnung","Next award")}</div><div class="bmini"><span class="be">${nextB.b[1]}</span><div><b>${T(nextB.b[2],nextB.b[3])}</b><div class="bar2"><i style="width:${Math.round(Math.min(1,nextB.p[0]/nextB.p[1])*100)}%"></i></div><small>${T(nextB.b[4][0],nextB.b[4][1])} (${Math.min(nextB.p[0],nextB.p[1])}/${nextB.p[1]})</small></div></div></div>`:""}
    <div class="parentlink">${noFile?`<span class="savewarn">💾 ${T("Noch keine Sicherungsdatei","No backup file yet")}</span>`:""}<button class="btn ghost" id="goParent">🔒 ${T("Für Eltern","For parents")}</button></div>`;
  document.getElementById("goNext").onclick=()=>{show(nx.k);try{if(nx.u)({en:EN,de:DE,math:MA})[nx.k].openUnit(nx.u.id);}catch(e){}};
  document.querySelectorAll("#vToday .ring[data-go]").forEach(r=>r.onclick=()=>r.dataset.go==="nb"?NB.open({}):show(r.dataset.go));
  {const b=document.getElementById("goBh");if(b){b.style.setProperty("--c","#C2185B");b.style.setProperty("--cl","#FCE4EC");b.onclick=()=>show("bhasha");}}
  [["goEn","en"],["goDe","de"],["goMa","math"],["goBr","brain"],["goNb","nb"],["goTk","tk"]].forEach(([id,k])=>{const b=document.getElementById(id),c=k==="nb"?["#0E9488","#D2F3EF"]:k==="tk"?["#C2410C","#FFE8D6"]:[SUB[k][2],SUB[k][3]];b.style.setProperty("--c",c[0]);b.style.setProperty("--cl",c[1]);b.onclick=()=>k==="nb"?NB.open({}):k==="tk"?TALK.open("en"):show(k);});
  document.getElementById("goParent").onclick=()=>show("parent");
  PLAN.wire(document.getElementById("vToday"));
}
function ringB(k,val,goal,emoji,name){return ring(val,goal,k==="nb"?"#0E9488":SUB[k][2],emoji,name,"").replace('<div class="ring ','<div role="button" tabindex="0" data-go="'+k+'" class="ring tap ');}

/* ---------- parent report ---------- */
function report(){
  const R=REW.R(),days=[...Array(7)].map((_,i)=>REW.addDays(REW.today(),i-6)).reverse();
  const wd=s=>T(["So","Mo","Di","Mi","Do","Fr","Sa"],["Su","Mo","Tu","We","Th","Fr","Sa"])[new Date(s+"T12:00").getDay()]+" "+s.slice(8)+"."+s.slice(5,7)+".";
  const cell=(x,k)=>{if(!x)return "<td>–</td>";const r=x[k]||0,w=(x.wrong||{})[k]||0;if(!r&&!w)return "<td>–</td>";const p=pct(r,w);return `<td><b>${r}</b><small class="${p<60?"lo":p>=85?"hi":""}">${p}%</small></td>`;};
  const rows=days.map(s=>{const x=R.days[s];return `<tr class="${s===REW.today()?"now":""}"><th>${wd(s)}</th>${["en","de","math","brain"].map(k=>cell(x,k)).join("")}<td>${x&&x.read||"–"}</td><td>${x&&x.secs?mins(x.secs):"–"}</td><td>${x&&x.goal?"⭐":x&&x.rainbow?"🌈":""}</td></tr>`;}).join("");
  const wk=k=>days.reduce((a,s)=>{const x=R.days[s];return x?[a[0]+(x[k]||0),a[1]+((x.wrong||{})[k]||0)]:a;},[0,0]);
  const acc=REW.SUBJ.map(k=>{const [r,w]=[R.tot[k],R.wrong[k]],p=pct(r,w),[wr,ww]=wk(k);
    return {k,p,line:`<div class="accrow"><span>${SUB[k][0]} <b>${SUB[k][1]}</b> <i class="apts">🪙 ${R.sp[k]||0}</i></span><div class="bar2 acc"><i style="width:${p||0}%;background:${SUB[k][2]}"></i></div><span class="accp">${p===null?"–":p+"%"}</span><small>${r} ✔ · ${w} ✗ · ${T("diese Woche","this week")}: ${wr} ✔ ${ww} ✗</small></div>`};});
  const tried=acc.filter(a=>a.p!==null&&R.tot[a.k]+R.wrong[a.k]>=10).sort((a,b)=>a.p-b.p);
  const wkMin=mins(days.reduce((a,s)=>a+((R.days[s]||{}).secs||0),0)),wkGoal=days.filter(s=>(R.days[s]||{}).goal).length;
  const tip=tried.length&&tried[0].p<80?T(`💡 <b>${SUB[tried[0].k][1]}</b> hat die niedrigste Genauigkeit (${tried[0].p} %). Kurze „Lernen“-Runden in diesem Fach helfen am meisten – am besten sitzt du dabei neben Aarya.`,`💡 <b>${SUB[tried[0].k][1]}</b> has the lowest accuracy (${tried[0].p}%). Short “Learn” rounds in that subject, with you sitting next to Aarya, help most.`)
    :tried.length?T("💡 Die Genauigkeit ist überall gut. Du kannst das Tagesziel etwas erhöhen oder das nächste Thema ausprobieren.","💡 Accuracy is good everywhere. You can raise the daily goal a little, or try the next topic."):T("💡 Nach etwa 10 Antworten in einem Fach erscheinen hier Tipps zur Genauigkeit.","💡 After about 10 answers in a subject, accuracy tips appear here.");
  return `<div class="panel parent report"><h3>📊 ${T("Wochenbericht (für Eltern)","Weekly report (for parents)")}</h3>
    <div class="wksum"><span>⏱️ <b>${wkMin}</b> ${T("Min.","min")}</span><span>🎯 <b>${wkGoal}</b>/7 ${T("Tagesziele","daily goals")}</span><span>💪 <b>${R.bestCombo}</b> ${T("Fragen am Stück (Rekord)","questions in one go (best)")}</span><span>📓 <b>${days.reduce((a,s)=>a+((R.days[s]||{}).heft||0),0)}</b> ${T("Heft-Zeiten","notebook times")}</span><span>✍️ <b>${days.reduce((a,s)=>a+((R.days[s]||{}).written||0),0)}</b> ${T("zuerst ins Heft geschrieben","written in the notebook first")}</span><span>🌿 <b>${Math.round(days.reduce((a,s)=>a+((R.days[s]||{}).offline||0),0)/60)}</b> ${T("Min. ohne Bildschirm","min screen-free")}</span></div>
    <div class="tscroll"><table class="rtab"><thead><tr><th>${T("Tag","Day")}</th><th>🔤</th><th>🇩🇪</th><th>🧮</th><th>🧠</th><th>📖</th><th>⏱️</th><th>🎯</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="rnote">${T("Zahl = richtige Antworten · % = Anteil richtiger Versuche · ⏱️ = aktive Minuten","Number = correct answers · % = how many tries were right · ⏱️ = active minutes")}</p>
    <h3 style="margin-top:14px">✔ ${T("Genauigkeit (gesamt)","Accuracy (all time)")}</h3>${acc.map(a=>a.line).join("")}<p class="rtip">${tip}</p></div>`;
}
/* ---------- child awards: levels and badges only ---------- */
function renderAwards(){
  const R=REW.R(),L=REW.level(),has=b=>R.badges[b[0]];
  const list=[...REW.BADGES.filter(has).sort((a,b)=>String(has(a))<String(has(b))?1:-1),...REW.BADGES.filter(b=>!has(b)).map(b=>({b,p:b[5]()})).sort((x,y)=>(y.p[0]/y.p[1])-(x.p[0]/x.p[1])).map(x=>x.b)];
  const date=v=>String(v).split("-").reverse().join(".");
  document.getElementById("vAwards").innerHTML=`
    <div class="panel"><div class="lbl">🪜 ${T("Stufen","Levels")}</div>${lvlBox(L)}<div class="ladder">${REW.LEVELS.map((x,i)=>`<span class="${i<L.i?"got":i===L.i?"cur":""}" title="${T(x[2],x[3])} · ${x[0]} 🪙"><b>${x[1]}</b><small>${x[0]}</small></span>`).join("")}</div></div>
    <div class="panel"><div class="lbl">🏆 ${T("Auszeichnungen","Awards")}</div><p class="bnote2">${T(`${Object.keys(R.badges).length} von ${REW.BADGES.length} · 🪙 ${R.points} Punkte · 📅 ${REW.weekDays()}/7 Zieltage diese Woche`,`${Object.keys(R.badges).length} of ${REW.BADGES.length} · 🪙 ${R.points} points · 📅 ${REW.weekDays()}/7 goal days this week`)}</p>
    <div class="badges">${list.map(b=>{const h=has(b),[v,t]=b[5]();return `<div class="badge ${h?"has":""}"><div class="bem">${h?b[1]:"🔒"}</div><b>${T(b[2],b[3])}</b><small>${h?"✅ "+date(h):T(b[4][0],b[4][1])}</small>${h?"":`<div class="bar2"><i style="width:${Math.round(Math.min(1,v/t)*100)}%"></i></div><small class="bp">${Math.min(v,t)}/${t}</small>`}</div>`;}).join("")}</div></div>
    <div class="parentlink"><button class="btn ghost" id="goParent2">🔒 ${T("Für Eltern","For parents")}</button></div>`;
  document.getElementById("goParent2").onclick=()=>show("parent");
}
/* ---------- grown-ups only: a small maths question keeps little fingers out ---------- */
let parentUntil=0;const parentOK=()=>Date.now()<parentUntil;
function parentGate(){const a=6+Math.floor(Math.random()*4),b=6+Math.floor(Math.random()*4),el=document.getElementById("setup");el.hidden=false;
  const A=(de,en)=>UIL.app()==="en"?en:de,wrongMsg=A("Leider falsch","Not quite");
  el.innerHTML=`<div class="setcard gate" role="dialog" aria-label="${A("Für Eltern","For parents")}"><div class="setlogo">🔒</div><h2>${A("Für Eltern","For parents")}</h2><p class="sub">${A("Bitte beantworte die Frage, um weiterzumachen.","Please answer to continue.")}</p>
    <label class="fl"><span>${A(`Wie viel ist ${a} × ${b}?`,`What is ${a} × ${b}?`)}</span><input id="pgIn" inputmode="numeric" autocomplete="off" maxlength="3"></label><p class="serr" id="pgErr"></p>
    <div class="srow"><button class="btn ghost" id="pgNo" type="button">${A("Abbrechen","Cancel")}</button><button class="btn" id="pgOk" type="button">${A("Öffnen","Open")}</button></div></div>`;
  const inp=el.querySelector("#pgIn");setTimeout(()=>inp.focus(),50);const close=()=>{el.hidden=true;el.innerHTML="";};
  const go=()=>{if(+inp.value===a*b){parentUntil=Date.now()+10*60*1000;close();show("parent");}else{el.querySelector("#pgErr").textContent=wrongMsg;inp.value="";inp.focus();}};
  el.querySelector("#pgOk").onclick=go;inp.onkeydown=e=>{if(e.key==="Enter")go();};el.querySelector("#pgNo").onclick=close;}
function renderParent(){
  const R=REW.R(),g=R.goal,P=PROF.get(),d=REW.day();
  const last7=[...Array(7)].map((_,i)=>REW.addDays(REW.today(),i-6)),wd=s=>T(["So","Mo","Di","Mi","Do","Fr","Sa"],["Su","Mo","Tu","We","Th","Fr","Sa"])[new Date(s+"T12:00").getDay()];
  const step=(k,label,en)=>`<div class="gset"><div><b>${label}</b><small>${en}</small></div><div class="stepper"><button data-k="${k}" data-d="-1" aria-label="${T("weniger","less")}">−</button><span>${+g[k]||0}</span><button data-k="${k}" data-d="1" aria-label="${T("mehr","more")}">+</button></div></div>`;
  const seg=(id,cur,opts)=>`<div class="pseg" id="${id}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" class="${cur===v?"on":""}">${l}</button>`).join("")}</div>`;
  document.getElementById("vParent").innerHTML=`
    <div class="phead"><button class="back" id="pBack">← ${T("Zurück","Back")}</button><h2>👨‍👩‍👧 ${T("Für Eltern","For parents")}</h2><p>${AAI.esc(PROF.name())}: ${T("alles auf einen Blick","everything at a glance")}</p></div>
    ${scoreCards()}
    <div class="panel"><div class="lbl">📅 ${T("Diese Woche","This week")}</div><div class="tstats four"><div class="ts"><span>📅</span><b>${REW.weekDays()}/7</b><small>${T("Tage mit Tagesziel","goal days")}</small></div><div class="ts"><span>⏱️</span><b>${mins(d.secs)}</b><small>${T("Min. heute","min today")}</small></div><div class="ts"><span>🌿</span><b>${Math.round(d.offline/60)}</b><small>${T("Min. ohne Bildschirm heute","screen-free min today")}</small></div><div class="ts"><span>🏅</span><b>${Object.keys(R.badges).length}</b><small>${T("Auszeichnungen","awards")}</small></div></div>
      <div class="week">${last7.map(s=>{const x=R.days[s];return `<div class="wday ${x&&x.goal?"ok":""} ${s===REW.today()?"now":""}"><span>${x&&x.goal?"⭐":x&&(x.en+x.math+(x.de||0)+(x.brain||0))?"•":""}</span><small>${wd(s)}</small></div>`;}).join("")}</div></div>
    ${report()}
    <div class="panel parent"><h3>⚙️ ${T("Einstellungen","Settings")}</h3>
      <p><b>${AAI.esc(PROF.name())}</b> · ${P.gender==="m"?T("👦 Junge","👦 Boy"):T("👧 Mädchen","👧 Girl")} · ${T("Schule","School")}: ${GRADES[PROF.grade()][1]} ${T(GRADES[PROF.grade()][2],GRADES[PROF.grade()][3])} <button class="btn ghost small" id="profEdit">✏️ ${T("ändern","change")}</button></p>
      <div class="pset"><b>🌐 ${T("App-Sprache","App language")}</b><small>${T("Für Heute, Training, Auszeichnungen und den Elternbereich. English wird immer auf Englisch geübt, Deutsch und Mathe immer auf Deutsch.","For Today, Training, Awards and the parent area. English is always practised in English, Deutsch and Mathe always in German.")}</small>${seg("uiLang",UIL.app(),[["de","🇩🇪 Deutsch"],["en","🇬🇧 English"]]).replace('class="pseg"','class="pseg" style="grid-template-columns:1fr 1fr"')}</div>
      <div class="pset"><b>🔤 ${T("English-Stufe","English level")}</b><small>${T("Unabhängig von der Schulklasse. Empfohlen: Anfänger (Hören, Bilder, Sprechen).","Separate from the school year. Recommended: Beginner (listening, pictures, speaking).")}</small>${seg("enLv",PROF.view("en"),[[0,"🐣 "+T("Anfänger","Beginner")],[1,"1️⃣ "+T("Klasse 1","Year 1")],[2,"2️⃣ "+T("Klasse 2","Year 2")]])}</div>
      <label class="nbpar"><input type="checkbox" id="nbmBox" ${NBM.on()?"checked":""}> 📓 <b>${T("Heft-Modus","Notebook mode")}</b>: ${T("jede Antwort zuerst ins Heft schreiben","write every answer in the notebook first")}</label>
      <label class="nbpar"><input type="checkbox" id="rbBox" ${R.opt.rainbow?"checked":""}> 🌈 <b>${T("Regenbogen-Bonus","Rainbow bonus")}</b>: ${T("+5, wenn an einem Tag in allen vier Bereichen geübt wurde (optional)","+5 for practising all four subjects on one day (optional)")}</label>
      <label class="nbpar"><input type="checkbox" id="bhOpenBox" ${BH.isOpen()?"checked":""}> 🪔 <b>${T("Hindi/Marathi","Hindi/Marathi")}</b>: ${T("alle Lektionen freischalten (sonst Schritt für Schritt, wie im Schulbuch)","unlock all lessons (otherwise step by step, like a school book)")}</label>
      <div class="lpset"><b>📋 ${T("Lernen statt nur spielen","Learning, not just playing")}</b>
      <label class="nbpar"><input type="checkbox" id="lpGate" ${PLAN.opt("gate")?"checked":""}> 🔒 <b>${T("Spiele erst nach dem Lernplan","Games only after the learning plan")}</b>: ${T("Memory, Blitz, Richtig-oder-falsch und die Gehirn-Spiele gehen auf, wenn Lesen, Wörter, Heft-Satz und eine Mathe-Runde geschafft sind (Bewegungspausen bleiben frei)","Memory, Blitz, right-or-silly and the brain games unlock once reading, spelling, the notebook sentence and one maths round are done (movement breaks stay free)")}</label>
      <label class="nbpar"><input type="checkbox" id="lpPause" ${PLAN.opt("pause")?"checked":""}> 👀 <b>${T("Lesepause","Reading pause")}</b>: ${T("Antworten erscheinen erst nach ein paar Sekunden; schnelles Raten bremst die nächste Frage","answers appear after a few seconds; fast guessing slows the next question down")}</label>
      <label class="nbpar"><input type="checkbox" id="lpType" ${PLAN.opt("type")?"checked":""}> 🔢 <b>${T("Mathe: Antwort eintippen","Maths: type the answer")}</b>: ${T("Zahl über die Tasten eingeben statt aus 3 Antworten wählen","enter the number on a keypad instead of picking 1 of 3")}</label>
      ${planLog()}</div>
      <small class="appver">AaryaAI ${(()=>{try{return PWA.label();}catch(e){return "";}})()}</small></div>
    ${STORE.panel()}
    ${typeof SYNC!=="undefined"?SYNC.panel():""}
    <div class="panel parent"><h3>🎯 ${T("Tagesziel","Daily goal")}</h3><p>${T("Lieber klein anfangen: etwa 15 Antworten und eine Heft-Zeit pro Tag reichen.","Start small: about 15 answers and one notebook time a day is plenty.")}</p>
      ${step("de","🇩🇪 Deutsch",T("richtige Antworten (0 = aus)","correct answers (0 = off)"))}${step("math","🧮 Mathe",T("richtige Antworten","correct answers"))}${step("en","🔤 English",T("richtige Antworten","correct answers"))}${step("brain","🧠 Training",T("richtige Antworten","correct answers"))}${step("read","📖 "+T("Lesen","Reading"),T("Sätze laut gelesen","sentences read aloud"))}${step("heft","📓 "+T("Heft-Zeit","Notebook time"),T("Heft-Zeiten pro Tag","notebook times per day"))}
      <h3 style="margin-top:14px">🪙 ${T("So gibt es Punkte","How points work")}</h3><ul>
        <li>${T("+1 für jede richtige Antwort · 💪 +2 für je 10 Fragen am Stück (Fehler setzen nicht zurück)","+1 for every correct answer · 💪 +2 for every 10 questions answered in one go (mistakes don't reset it)")}</li>
        <li>${T("+1 pro laut gelesenem Satz · +2 pro Stern am Ende einer Runde","+1 per sentence read aloud · +2 per star at the end of a round")}</li><li>${T("+2 pro Bewegungspause (die ersten 5 am Tag) · +5 pro fertigem Workout","+2 per movement break (first 5 a day) · +5 per finished workout")}</li>
        <li>${T("📓 Heft-Modus: +1 für jede zuerst ins Heft geschriebene Antwort · Heft-Zeit: +1 für jede Antwort, die Aarya selbst prüft (richtig <i>oder</i> falsch – Ehrlichkeit lohnt sich), +2 pro Berichtigung, +3 pro Heft-Zeit, +2 wenn ein Elternteil nachsieht","📓 Notebook mode: +1 for every answer written first · Notebook time: +1 for every answer Aarya checks (right <i>or</i> wrong – honesty pays), +2 per correction, +3 per session, +2 when a parent checks")}</li>
        <li>🎯 ${T("+10, wenn das Tagesziel erreicht ist","+10 when the daily goal is reached")}${R.opt.rainbow?" · 🌈 "+T("+5 Regenbogen-Bonus","+5 rainbow bonus"):""}</li><li>${T("Punkte bringen die nächste Stufe:","Points raise the level:")} ${REW.LEVELS.map(x=>x[1]).join(" ")}</li></ul>
      <div class="confirm" id="rrbox"><button class="btn ghost" id="rreset" style="font-size:15px;padding:6px 14px">${T("Punkte &amp; Auszeichnungen löschen","Reset points &amp; awards")}</button></div></div>`;
  const $p=s=>document.getElementById(s);
  $p("pBack").onclick=()=>show("awards");$p("nbmBox").onchange=e=>NBM.set(e.target.checked);$p("rbBox").onchange=e=>REW.setOpt("rainbow",e.target.checked);$p("bhOpenBox").onchange=e=>BH.setOpen(e.target.checked);
  [["lpGate","gate"],["lpPause","pause"],["lpType","type"]].forEach(([id,k])=>{const x=$p(id);if(x)x.onchange=e=>PLAN.setOpt(k,e.target.checked);});
  $p("uiLang").querySelectorAll("button").forEach(b=>b.onclick=()=>{const l=b.dataset.v;PROF.setUiLang(l);UIL.set(l);renderParent();renderTabs();});
  $p("enLv").querySelectorAll("button").forEach(b=>b.onclick=()=>{PROF.setEnLevel(+b.dataset.v);try{EN.home();}catch(e){}renderParent();});
  $p("profEdit").onclick=()=>AAI.wizard({edit:true}).then(p=>{if(p)location.reload();});
  STORE.ui();try{SYNC.ui();}catch(e){}
  document.querySelectorAll("#vParent .stepper button").forEach(b=>b.onclick=()=>{const k=b.dataset.k,cur=+REW.R().goal[k]||0;REW.setGoal(k,Math.max(0,cur+ +b.dataset.d));renderParent();});
  $p("rreset").onclick=()=>{$p("rrbox").innerHTML=`${T("Wirklich alles löschen? Vorher wird eine Sicherung gespeichert.","Clear everything? A backup is kept first.")} <button class="btn" id="ry" style="--c:var(--bad);font-size:15px;padding:6px 14px">${T("Ja","Yes")}</button><button class="btn ghost" id="rn" style="font-size:15px;padding:6px 14px">${T("Nein","No")}</button>`;
    $p("ry").onclick=()=>{REW.reset();renderParent();};$p("rn").onclick=renderParent;};
}
function startApp(){REW.checkLevel();REW.refresh();REW.checkBadges();
  let startTab="today";try{startTab=localStorage.getItem("aarya-tab")||"today";}catch(e){}
  show(V[startTab]&&startTab!=="parent"?startTab:"today");}
