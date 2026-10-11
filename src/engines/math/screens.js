/* ============================ SCREENS ============================ */
const LEN={quiz:{short:8,medium:12,long:20},rw:{short:6,medium:10,long:14},memo:{short:4,medium:6,long:8},think:{short:4,medium:6,long:10},blitz:{short:45,medium:60,long:90},mix:{short:10,medium:20,long:30}};
const LENNAME={short:"Kurz",medium:"Mittel",long:"Lang"};
const nOf=g=>LEN[g][S.len||"medium"];
function col(u){return SECTIONS[u.sec];}
function setC(el,u){if(!el)return;const c=col(u);el.style.setProperty("--c",c.c);el.style.setProperty("--cl",c.l);}
function starsHtml(n){return [0,1,2].map(i=>i<n?"<b>★</b>":"★").join("");}
function totalStars(){return Object.values(S.best).reduce((a,b)=>a+b,0);}
function updTotal(){$("#total").textContent="⭐ "+totalStars()+" / "+UNITS.length*3;}
function go(fn){stopSpeech();closeSpeed();window.scrollTo(0,0);fn();}
const main=s=>s.split("|")[0],sub=s=>s.split("|")[1]||"";
/* only a German helper word is shown under an option ("größer · greater" → "größer"); pure English helpers are hidden */
const subDe=o=>{const t=sub(o);return t.includes(" · ")?t.split(" · ")[0]:"";};
function optBtn(o){const m=main(o);if(/^[\p{Extended_Pictographic}\uFE0F\u200D]+$/u.test(m))return `<span class="oe">${m}</span>`;return `${esc(m)}${subDe(o)?`<small>${esc(subDe(o))}</small>`:""}`;}
function lenSel(){return `<div class="lenrow"><span class="vl">Spiellänge</span><div class="seg" id="lenseg">${Object.keys(LENNAME).map(k=>`<button data-l="${k}" class="${(S.len||"medium")===k?"on":""}">${LENNAME[k]}</button>`).join("")}</div></div>`;}
function wireLen(){document.querySelectorAll("#lenseg button").forEach(b=>b.onclick=()=>{S.len=b.dataset.l;save();document.querySelectorAll("#lenseg button").forEach(x=>x.classList.toggle("on",x===b));});}
function head(u){return `<button class="back" id="back">← Alle Themen</button><div class="uhead" id="uh"><div class="emo">${u.emo}</div><div><div class="k">${u.k==="B"?"Mathebuch Klasse 1":u.k==="A"?`📕 Arbeitsheft · S. ${u.page}`:u.k?`Klasse ${u.k}`:u.k===0?"Anfänger":""}</div><h2>${esc(u.de)}</h2></div></div>`;}
function wireHead(u,backTo){setC($("#uh"),u);const ah=u.k==="A"||u.ahmix;$("#back").onclick=()=>go(u.id==="mix"?(ah?ahHome:home):(backTo||(ah?ahHome:home)));}
function gst(u,g){return (S.gbest[u.id+":"+g])||0;}
function saveG(u,g,st){if(st>(S.gbest[u.id+":"+g]||0)){S.gbest[u.id+":"+g]=st;save();}}

/* ---------- HOME ---------- */
function home(){
  updTotal();const gOf=k=>k==="B"||k==="A"?1:k,GV=typeof PROF!=="undefined"?PROF.view(CFG.app):1,LV=CFG.levels.filter(([k])=>gOf(k)===GV),ord=LV.flatMap(([k])=>UNITS.filter(u=>u.k===k));const next=ord.find(u=>!(S.best[u.id]>0))||ord[0];
  let h=`<div class="hello"><div class="big">${CFG.emo}</div><div><h2>${CFG.hello}</h2><p>Als Nächstes: <b>${next.emo} ${esc(next.de)}</b>${S.solved?`<br>✅ Gelöst: <b>${S.solved}</b>`:""}</p></div><button class="btn go" id="gonext">Los! ▶</button></div>`;
  h+=`<button class="block chall" id="chall"><span class="emo">🏆</span><span><b>${CFG.chall[0]}</b><span>${CFG.chall[1]}${S.bestMix?` · Rekord ${S.bestMix}`:""}</span></span><span class="go2">▶</span></button>`+lenSel()+(typeof gradeTabs==="function"?gradeTabs(CFG.app,gradeStats(UNITS,S.best,u=>gOf(u.k))):"");
  LV.forEach(([k,lab])=>{if(k==="A"){h+=ahCard();return;}h+=`<div class="sec">${lab}</div><div class="grid">`;
    UNITS.filter(u=>u.k===k).forEach(u=>{h+=`<button class="block ucard" data-u="${u.id}"><span class="no">${u.id+1}</span><span class="emo">${u.emo}</span><span class="t">${esc(u.de)}</span><span class="st">${starsHtml(S.best[u.id]||0)}</span></button>`;});h+="</div>";});
  h+=`<div class="row" style="margin-top:18px"><button class="btn ghost" id="words">📚 Wörterliste</button><button class="btn ghost" id="openspeed2">🐢 Tempo &amp; Stimme</button></div>
   <p class="note">Sichern: 💾 oben rechts</p><div class="confirm" id="resetbox"><button class="btn ghost" id="reset" style="font-size:15px;padding:6px 14px">Sterne löschen</button></div>`;
  app.innerHTML=h;if(typeof wireGradeTabs==="function")wireGradeTabs(app,CFG.app,home);
  app.querySelectorAll(".ucard").forEach(b=>{const u=UNITS[b.dataset.u];setC(b,u);b.onclick=()=>go(()=>unit(u));});
  {const a=app.querySelector("#ahcard");if(a){a.onclick=()=>go(ahHome);}}
  $("#gonext").onclick=()=>go(()=>unit(next));setC($("#chall"),{sec:"Mix"});$("#chall").onclick=()=>go(()=>practice(mixUnit()));wireLen();
  $("#words").onclick=()=>go(glossary);$("#openspeed2").onclick=openSpeed;
  $("#reset").onclick=()=>{$("#resetbox").innerHTML=`Alles löschen? <button class="btn" id="yes" style="--c:var(--bad);font-size:15px;padding:6px 14px">Ja</button><button class="btn ghost" id="no" style="font-size:15px;padding:6px 14px">Nein</button>`;
    $("#yes").onclick=()=>{S.best={};S.gbest={};S.bestMix=0;S.solved=0;save();home();};$("#no").onclick=home;};
}
/* ---------- 📕 ARBEITSHEFT: follow the school workbook page by page ---------- */
const ahCur=()=>Math.max(1,Math.min(typeof AH_MAX!=="undefined"?AH_MAX:72,+S.ahPage||1));
function ahCard(){if(typeof AH_UNITS==="undefined")return "";const p=ahCur(),u=ahUnitFor(p);
  return `<div class="sec">📕 Arbeitsheft „Denken und Rechnen“</div><button class="block chall ahcard" id="ahcard"><span class="emo">📕</span><span><b>Wie in der Schule</b><span>Seite ${p}: ${u.emo} ${esc(u.de)} · ${AH_UNITS.length} Themen der Reihe nach</span></span><span class="go2">▶</span></button>`;}
function ahMix(list,title){return {id:"mix",ahmix:true,k:null,sec:"Mix",emo:"📕",de:title,en:"",gen:()=>{const u=pick(list);const q=u.gen();q.uid=u.id;return q;}};}
function ahHome(){const p=ahCur(),cu=ahUnitFor(p),done=AH_UNITS.filter(u=>u.ah[1]<cu.ah[0]),upto=AH_UNITS.filter(u=>u.ah[0]<=cu.ah[0]);
  let h=`<button class="back" id="ahback">← Alle Themen</button><div class="ahhero"><div class="ahbook">📕</div><div><h2>Arbeitsheft</h2><p>Denken und Rechnen · Klasse 1 · ${AH_MAX} Seiten</p></div></div>
   <div class="ahpage"><span>In der Schule sind wir auf Seite</span><div class="ahstep"><button class="btn ghost" data-d="-5">−5</button><button class="btn ghost" data-d="-1">−</button><b id="ahp">${p}</b><button class="btn ghost" data-d="1">+</button><button class="btn ghost" data-d="5">+5</button></div><small>Für Eltern: Stell hier die Seite ein, an der die Klasse gerade arbeitet.</small></div>
   <button class="block chall ahnow" id="ahnow"><span class="emo">${cu.emo}</span><span><b>📍 Jetzt: ${esc(cu.de)}</b><span>Seite ${cu.page} · üben, lernen und ins Heft schreiben</span></span><span class="go2">▶</span></button>
   <div class="ahbtns"><button class="block mode" id="ahrep"${done.length?"":" disabled"}><span class="emo">🔁</span><b>Wiederholung</b><span>${done.length?`Gemischt aus ${done.length} Themen vor Seite ${cu.ah[0]}`:"Kommt, wenn ihr weiter seid"}</span></button>
   <button class="block mode" id="ahtest"><span class="emo">🎯</span><b>Großer Test</b><span>Alles bis Seite ${cu.ah[1]}</span></button></div>
   <div class="sec">Alle Themen in der Reihenfolge vom Heft</div><div class="ahlist">`;
  AH_UNITS.forEach(u=>{const st=u===cu?"now":u.ah[1]<cu.ah[0]?"done":"later";
    h+=`<button class="ahrow ${st}" data-u="${u.id}"><span class="ahpg">S. ${u.page}</span><span class="ahemo">${u.emo}</span><span class="aht">${esc(u.de)}${st==="now"?" <i>📍 jetzt</i>":st==="later"?" <i>kommt noch</i>":""}</span><span class="st">${starsHtml(S.best[u.id]||0)}</span></button>`;});
  h+=`</div><p class="note">Eigene Übungen zu den Themen im Arbeitsheft – keine Kopie der Seiten. Am besten: erst die Seite in der Schule, dann hier üben.</p>`;
  app.innerHTML=h;$("#ahback").onclick=()=>go(home);
  app.querySelectorAll(".ahstep button").forEach(b=>b.onclick=()=>{S.ahPage=Math.max(1,Math.min(AH_MAX,ahCur()+ +b.dataset.d));save();ahHome();});
  setC($("#ahnow"),cu);$("#ahnow").onclick=()=>go(()=>unit(cu));
  const rep=$("#ahrep");setC(rep,{sec:"Mix"});if(done.length)rep.onclick=()=>go(()=>practice(ahMix(done,"Wiederholung bis Seite "+(cu.ah[0]-1))));
  const t=$("#ahtest");setC(t,{sec:"Mix"});t.onclick=()=>go(()=>practice(ahMix([...upto,cu,cu],"Großer Test bis Seite "+cu.ah[1])));
  app.querySelectorAll(".ahrow").forEach(b=>{const u=UNITS[b.dataset.u];setC(b,u);b.onclick=()=>go(()=>unit(u));});}
function mixUnit(){const done=UNITS.filter(u=>S.best[u.id]>0);const from=done.length>=2?done:CFG.mixDefault();
  return {id:"mix",k:null,sec:"Mix",emo:"🏆",de:CFG.chall[0],en:"",gen:()=>{const u=pick(from);const q=u.gen();q.uid=u.id;return q;}};}

/* ---------- UNIT MENU ---------- */
function unit(u){
  const probe=u.gen();const memSet=new Set();for(let i=0;i<40;i++){const q=i?u.gen():probe;if(q&&q.mem)memSet.add(q.mem[0]);}const hasMem=memSet.size>=3;
  const modes=[["learn","📖","Lernen","Lerne, wie es geht"],["practice","🎮","Üben",`Rekord ${"★".repeat(S.best[u.id]||0)||"—"}`]];
  if(typeof NB!=="undefined")modes.push(["nb","📓","Ins Heft","Schreib, dann vergleiche"]);
  if(u.heft)modes.splice(1,0,["heft","✏️","Wie im Heft",`Wie im Buch${u.page?" · S. "+u.page:""} · ${"★".repeat(gst(u,"heft"))||"—"}`]);
  if(u.blitz)modes.push(["blitz","⚡",CFG.blitzName,`Schnell! · ${"★".repeat(gst(u,"blitz"))||"—"}`]);
  modes.push(["think","🧠",CFG.thinkName,"Erst denken, dann sagen"]);
  if(hasMem)modes.push(["memory","🃏","Memory",`Finde die Paare · ${"★".repeat(gst(u,"memo"))||"—"}`]);
  modes.push(["rw","🕵️","Richtig oder falsch?",`Gut aufpassen! · ${"★".repeat(gst(u,"rw"))||"—"}`]);
  app.innerHTML=head(u)+lenSel()+`<div class="modes">${modes.map(m=>`<button class="block mode" data-m="${m[0]}"><span class="emo">${m[1]}</span><b>${m[2]}</b><span>${m[3]}</span></button>`).join("")}</div>`;
  wireHead(u);wireLen();const M={learn,practice,blitz,think,memory,rw,parent,heft:x=>x.heft(x),nb:x=>NB.open({subj:CFG.app,unit:x,kind:"aufg"})};
  app.querySelectorAll(".mode").forEach(b=>{setC(b,u);b.onclick=()=>go(()=>M[b.dataset.m](u));});
}

/* ---------- 📓 tasks to write in the notebook ---------- */
function nbTasks(u,n){const out=[],seen=new Set();let g=0;
  while(out.length<n&&g++<n*40){const q=u.gen();if(!q||!q.opts)continue;const a=main(q.opts[0]),k=q.de+"|"+a;if(seen.has(k))continue;seen.add(k);const st=q.stmt?q.stmt(q.opts[0]):null;
    out.push({q:q.de,en:"",vis:q.vis||"",ans:a,full:st&&st.de?st.de:a});}return out;}
/* ---------- LEARN ---------- */
function learn(u){
  app.innerHTML=head(u)+`<div class="panel" id="pn">
    <div class="say"><button class="spk" id="s1" aria-label="Anhören">🔊</button><div id="sayt">${bi(u.say[0],u.say[1])}</div></div>
    <div class="chant"><div class="lbl">⭐ Merksatz</div><div class="chrow"><div id="cht">${bi(u.merk[0],u.merk[1])}</div><button class="spk" id="s2" aria-label="Anhören">🔊</button></div></div>
    <div class="lbl" style="margin-top:16px">🖼️ Beispiele (tippen zum Hören)</div>
    <div class="exl">${u.ex().map((e,i)=>`<div class="exi" data-i="${i}"><div class="exv">${e.vis}</div><div class="ext">${bi(e.de,e.en)}</div><button class="spk" aria-label="Anhören">🔊</button></div>`).join("")}</div>
    <div class="rule" style="margin-top:14px"><div class="rl">📏 Regel: <b>${esc(probeRule(u)[0])}</b></div><div id="rlt">${bi(probeRule(u)[2],probeRule(u)[3])}</div></div>
    <div class="row"><button class="btn" id="go1">Üben! 🎮</button></div></div>`;
  wireHead(u,()=>unit(u));const pn=$("#pn");setC(pn,u);pn.querySelectorAll(".say,.chant,.spk,.exi").forEach(el=>setC(el,u));setC($("#go1"),u);
  $("#s1").onclick=()=>speakEl($("#sayt"),{force:true});$("#s2").onclick=()=>speakEl($("#cht"),{force:true});
  pn.querySelectorAll(".exi .spk").forEach(b=>b.onclick=()=>speakEl(b.parentElement.querySelector(".ext"),{force:true}));
  $("#go1").onclick=()=>go(()=>practice(u));speakEl($("#sayt"));
}
function probeRule(u){for(let i=0;i<5;i++){const q=u.gen();if(q.why&&q.why.rule)return q.why.rule;}return ["","","",""];}

/* ---------- WHY box ---------- */
function whyBox(q,chosen){
  const w=q.why||{},right=q.stmt?q.stmt(q.opts[0]):null,wrong=chosen&&q.stmt?q.stmt(chosen):null;const r=w.rule;
  return `<div class="why"><div class="whyhead">🦉 Schau mal!</div>
    ${wrong?`<div class="cmp bad"><span>❌</span><div>${esc(wrong.de)}</div></div>`:""}
    ${right?`<div class="cmp good"><span>✅</span><div id="whys">${kwHtml(right.de,"de")}</div></div>`:""}
    ${w.look?`<div class="look mlook">${w.look}</div>`:""}
    <div class="whyt" id="whyt">${bi(w.de||"",w.en||"")}</div>
    ${r?`<details class="rulex"><summary>📏 Regel: <b>${esc(r[0])}</b></summary><div id="whyr">${bi(r[2],r[3])}</div></details>`:""}
    <div class="sayit">${CFG.sayIt}</div></div>`;
}

/* ---------- PRACTICE (Üben) ---------- */
function practice(u){
  const N=u.id==="mix"?nOf("mix"):nOf("quiz");let i=0,score=0;const c=col(u);
  function render(){
    stopSpeech();window.scrollTo(0,0);const q=u.gen();
    app.innerHTML=head(u)+`<div class="panel" id="pn" style="--c:${c.c}">
      <div class="prog"><i style="width:${(i/N)*100}%"></i></div>
      <div class="qmeta"><span>Aufgabe ${i+1} von ${N}</span><span>✔ ${score}</span></div>
      ${q.vis?`<div class="vis">${q.vis}</div>`:""}
      <div class="q"><button class="spk" id="sq" style="--c:${c.c}" aria-label="Vorlesen">🔊</button><div id="qt">${bi(q.de,q.en!==q.de?q.en:"")}</div></div>
      <div class="opts${q.opts.length===2?" two":""}">${shuffle(q.opts).map(o=>`<button class="opt" data-o="${esc(o)}">${optBtn(o)}</button>`).join("")}</div>
      <div class="feedback" id="fb" aria-live="polite"></div><div id="after"></div>
      <div class="row"><button class="btn" id="next" hidden>${i===N-1?"Meine Sterne ⭐":"Weiter ▶"}</button></div></div>`;
    wireHead(u,()=>unit(u));setC($("#next"),u);
    $("#sq").onclick=()=>speakEl($("#qt"),{force:true});speakEl($("#qt"));
    app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      const o=b.dataset.o,ok=o===q.opts[0];app.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.o===q.opts[0])x.classList.add("right");else if(x!==b)x.classList.add("dim");});
      const fb=$("#fb"),tok=i;const still=()=>i===tok;
      if(ok){score++;S.solved=(S.solved||0)+1;save();b.classList.add("right");yay();const w=pick(["Super!","Toll!","Richtig!","Prima!","Klasse!"]);fb.className="feedback ok";fb.innerHTML=`🎉 ${w}`;
        const st=q.stmt?q.stmt(q.opts[0]):null;
        if(st){$("#after").innerHTML=`<div class="readit" style="--c:${c.c}"><div class="lbl">🗣️ Sag es laut!</div><div class="sent" id="full">${bi(st.de,st.en!==st.de?st.en:"")}</div></div>`;
          speak(w).then(()=>still()&&speakEl($("#full"),{keep:true}));}
        else speak(w);}
      else{b.classList.add("wrong");oops();fb.className="feedback no";fb.innerHTML=`Fast! Richtig ist <span class="ans">${esc(main(q.opts[0]))}</span> `;
        $("#after").innerHTML=whyBox(q,o);
        speak("Schau mal!").then(()=>still()&&speakEl($("#whys"),{keep:true})).then(()=>still()&&speakEl($("#whyt"),{keep:true}));}
      $("#next").hidden=false;$("#after").scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    $("#next").onclick=()=>{stopSpeech();i++;if(i<N)render();else result();};
  }
  function result(){
    const p=score/N,st=p>=.9?3:p>=.7?2:p>=.4?1:0;
    if(u.id==="mix"){if(score>(S.bestMix||0)){S.bestMix=score;save();}}else if(st>(S.best[u.id]||0)){S.best[u.id]=st;save();}
    showResult(u,st,`${score} von ${N} richtig`,()=>practice(u));
  }
  render();
}
function showResult(u,st,line,again){
  updTotal();window.scrollTo(0,0);const msg=[["Weiter üben!"],["Guter Anfang!"],["Sehr gut!"],[CFG.starWord]][st];
  app.innerHTML=head(u)+`<div class="panel result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div>
    <h3>${msg[0]}</h3><p>${line}</p>
    <div class="row"><button class="btn" id="again">Nochmal 🔁</button><button class="btn ghost" id="tounit">Andere Spiele</button><button class="btn ghost" id="tohome">Alle Themen</button></div></div>`;
  wireHead(u,()=>unit(u));setC($("#again"),u);$("#again").onclick=()=>go(again);$("#tounit").onclick=()=>go(u.id==="mix"?(u.ahmix?ahHome:home):()=>unit(u));$("#tohome").onclick=()=>go(u.k==="A"||u.ahmix?ahHome:home);
  if(st>=2){fanfare();confetti();}speak(msg[0]);
}

/* ---------- ⚡ BLITZRECHNEN ---------- */
function blitz(u){
  const T=nOf("blitz");let left=T,score=0,tries=0,timer=null,q=null;const c=col(u);
  app.innerHTML=head(u)+`<div class="panel" style="--c:${c.c}"><div class="blitzbar"><i id="bb" style="width:100%"></i></div>
    <div class="qmeta"><span>⚡ ${CFG.blitzName}</span><span id="bt">${T} s · ✔ 0</span></div><div id="bq"></div></div>`;
  wireHead(u,()=>{clearInterval(timer);unit(u);});
  let lock=false;
  function nextQ(){lock=false;q=u.gen();
    $("#bq").innerHTML=`${q.vis?`<div class="vis">${q.vis}</div>`:""}<div class="q${/^[\d ?+−·:=]+$/.test(q.de)?" big2":""}">${kwHtml(q.de,"de")}</div>
      <div class="opts">${shuffle(q.opts).map(o=>`<button class="opt" data-o="${esc(o)}">${optBtn(o)}</button>`).join("")}</div>`;
    $("#bq").querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(lock)return;lock=true;$("#bq").querySelectorAll(".opt").forEach(x=>x.disabled=true);tries++;if(b.dataset.o===q.opts[0]){score++;S.solved=(S.solved||0)+1;tone([700],.06);b.classList.add("right");}else{b.classList.add("wrong");oops();}
      $("#bt").textContent=`${left} s · ✔ ${score}`;setTimeout(()=>{if(left>0)nextQ();},250);});}
  speak("Achtung, fertig, los!",{force:true});nextQ();
  timer=setInterval(()=>{left--;const bb=$("#bb");if(!bb){clearInterval(timer);return;}bb.style.width=(left/T*100)+"%";$("#bt").textContent=`${left} s · ✔ ${score}`;
    if(left<=0){clearInterval(timer);save();const per=score/(T/60);const st=per>=18?3:per>=12?2:per>=6?1:0;saveG(u,"blitz",st);
      showResult(u,st,`${score} Aufgaben in ${T} Sekunden`,()=>blitz(u));}},1000);
}

/* ---------- 🧠 KOPFRECHNEN ---------- */
function think(u){
  const N=nOf("think");let i=0,timer=null;const c=col(u);
  function render(){
    clearInterval(timer);stopSpeech();window.scrollTo(0,0);const q=u.gen();const st=q.stmt?q.stmt(q.opts[0]):{de:main(q.opts[0]),en:""};
    app.innerHTML=head(u)+`<div class="panel think" style="--c:${c.c}">
      <div class="qmeta"><span>🧠 Karte ${i+1} von ${N}</span><span>${CFG.thinkName}</span></div>
      ${q.vis?`<div class="vis">${q.vis}</div>`:""}<div class="tq" id="tq">${bi(q.de,q.en!==q.de?q.en:"")}</div>
      <div class="clock2" id="clk" style="--p:0%"><span id="cn">3</span></div>
      <div class="stage" id="stg">Denk im Kopf …</div><div id="rv"></div>
      <div class="row"><button class="btn ghost" id="hear">🔊 Nochmal</button><button class="btn" id="show" hidden>Lösung zeigen</button><button class="btn" id="nx" hidden>${i<N-1?"Nächste Karte ▶":"Fertig 🎉"}</button></div></div>`;
    wireHead(u,()=>{clearInterval(timer);unit(u);});["show","nx"].forEach(id=>setC($("#"+id),u));
    $("#hear").onclick=()=>speakEl($("#tq"),{force:true});
    const startClock=()=>{let t=0;timer=setInterval(()=>{t++;if(!$("#clk")){clearInterval(timer);return;}const left=Math.max(0,3-Math.floor(t/10));
      $("#clk").style.setProperty("--p",Math.min(100,t/30*100)+"%");$("#cn").textContent=left>0?left:"💬";
      if(t>=30){clearInterval(timer);$("#stg").textContent="Jetzt sag es laut!";$("#show").hidden=false;tone([700],.1);speak("Jetzt sag es laut!");}},100);};
    Promise.race([speakEl($("#tq")),sleep(12000)]).then(()=>{if($("#tq"))startClock();});
    $("#show").onclick=()=>{$("#rv").innerHTML=`<div class="reveal" id="rvt">${bi(st.de,st.en!==st.de?st.en:"")}</div>`;$("#show").hidden=true;$("#nx").hidden=false;speakEl($("#rvt"),{force:true});};
    $("#nx").onclick=()=>{i++;if(i<N)render();else{confetti(80);fanfare();go(()=>unit(u));}};
  }
  render();
}

/* ---------- 🃏 MEMORY ---------- */
function memory(u){
  const n=nOf("memo"),pairs=[],seenL=new Set(),seenR=new Set();let g=0;
  while(pairs.length<n&&g++<300){const q=u.gen();if(!q.mem)continue;const [l,r]=q.mem;if(seenL.has(l)||seenR.has(r))continue;seenL.add(l);seenR.add(r);pairs.push([l,r]);}
  const cards=shuffle(pairs.flatMap((p,k)=>[{t:p[0],k},{t:p[1],k}]));let open=[],moves=0,found=0,lock=false;
  app.innerHTML=head(u)+`<div class="panel" style="--c:${col(u).c}"><div class="qmeta"><span>🃏 Finde die Paare!</span><span id="mv">Züge: 0</span></div>
    <div class="memo">${cards.map((cd,i)=>`<button class="mcard" data-i="${i}" aria-label="Karte ${i+1}"><span class="back">?</span><span class="front${/^[\p{Extended_Pictographic}️‍]+$/u.test(cd.t)?" emo":""}">${esc(cd.t)}</span></button>`).join("")}</div>
    <p class="note">${CFG.memoNote}</p></div>`;
  wireHead(u,()=>unit(u));speak("Finde die Paare!");
  document.querySelectorAll(".mcard").forEach(b=>b.onclick=()=>{
    if(lock||b.classList.contains("up"))return;const cd=cards[b.dataset.i];b.classList.add("up");speak(cleanForSpeech(cd.t),{force:true,rate:.8});open.push([b,cd]);
    if(open.length===2){moves++;$("#mv").textContent="Züge: "+moves;const [[b1,c1],[b2,c2]]=open;open=[];
      if(c1.k===c2.k){found++;setTimeout(()=>{b1.classList.add("got");b2.classList.add("got");yay();},350);
        if(found===pairs.length)setTimeout(()=>{const st=moves<=pairs.length+2?3:moves<=pairs.length*2?2:1;saveG(u,"memo",st);showResult(u,st,`${pairs.length} Paare in ${moves} Zügen`,()=>memory(u));},1300);}
      else{lock=true;setTimeout(()=>{b1.classList.remove("up");b2.classList.remove("up");lock=false;},1100);}}
  });
}

/* ---------- 🕵️ RICHTIG ODER FALSCH ---------- */
function rw(u){
  const N=nOf("rw");let i=0,score=0;const c=col(u);
  function render(){
    stopSpeech();window.scrollTo(0,0);let q=u.gen(),g=0;while(!q.stmt&&g++<20)q=u.gen();
    const right=Math.random()<.5,shownOpt=right?q.opts[0]:pick(q.opts.slice(1)),st=q.stmt(shownOpt);
    app.innerHTML=head(u)+`<div class="panel" style="--c:${c.c}"><div class="prog"><i style="width:${(i/N)*100}%"></i></div>
      <div class="qmeta"><span>🕵️ ${i+1} von ${N}</span><span>✔ ${score}</span></div>
      ${q.vis?`<div class="vis">${q.vis}</div>`:""}<div class="small-q">${bi(q.de,q.en!==q.de?q.en:"")}</div>
      <div class="lbl" style="margin-top:10px">Stimmt das?</div>
      <div class="q"><button class="spk" id="sq" style="--c:${c.c}" aria-label="Vorlesen">🔊</button><div id="qt" class="sent2">${bi(st.de,st.en!==st.de?st.en:"")}</div></div>
      <div class="opts two"><button class="opt big" id="yes">✅ Richtig</button><button class="opt big" id="no">❌ Falsch</button></div>
      <div class="feedback" id="fb"></div><div id="after"></div>
      <div class="row"><button class="btn" id="next" hidden>${i<N-1?"Weiter ▶":"Meine Sterne ⭐"}</button></div></div>`;
    wireHead(u,()=>unit(u));setC($("#next"),u);$("#sq").onclick=()=>speakEl($("#qt"),{force:true});speakEl($("#qt"));
    const answer=says=>{$("#yes").disabled=$("#no").disabled=true;const ok=says===right;(right?$("#yes"):$("#no")).classList.add("right");if(!ok)(says?$("#yes"):$("#no")).classList.add("wrong");
      const tok=i,still=()=>i===tok;
      if(ok){score++;yay();$("#fb").className="feedback ok";$("#fb").innerHTML=right?"🎉 Ja, das stimmt!":"🎉 Gut aufgepasst! Das war falsch.";}
      else{oops();$("#fb").className="feedback no";$("#fb").innerHTML=right?"Oh! Das war richtig.":"Oh! Das war falsch.";}
      if(!right||!ok){$("#after").innerHTML=whyBox(q,right?null:shownOpt);speak(right?"Das war richtig.":"So ist es richtig.").then(()=>still()&&speakEl($("#whys"),{keep:true})).then(()=>still()&&speakEl($("#whyt"),{keep:true}));}
      else speak("Ja, das stimmt!");$("#next").hidden=false;};
    $("#yes").onclick=()=>answer(true);$("#no").onclick=()=>answer(false);
    $("#next").onclick=()=>{i++;if(i<N)render();else{const p=score/N,st=p>=.9?3:p>=.7?2:p>=.4?1:0;saveG(u,"rw",st);showResult(u,st,`${score} von ${N} richtig`,()=>rw(u));}};
  }
  render();
}

/* ---------- 👨‍👧 FÜR PAPA ---------- */
function parent(u){
  const p=u.parent;
  app.innerHTML=head(u)+`<div class="panel parent"><h3>💡 How German schools teach this</h3><p>${esc(p.method)}</p>
    <h3>📚 School words · Wörter (tap to hear the German)</h3><div class="gl">${p.words.map(w=>`<div class="glr"><div class="gde">${kwHtml(w[0],"de")}</div><div class="gen">${esc(w[1])}</div></div>`).join("")}</div>
    <h3>🎲 Games at home</h3><ul>${p.games.map(g=>`<li>${esc(g)}</li>`).join("")}</ul>
    <h3>📅 Suggested week</h3><ul><li><b>Day 1:</b> Lernen + Merksatz, then Üben (Short).</li><li><b>Day 2:</b> a home game + Kopfrechnen.</li><li><b>Day 3:</b> Memory or Richtig oder falsch? + Üben (Medium).</li><li><b>Day 4:</b> Blitzrechnen — try to beat yesterday's score.</li></ul>
    <p class="note">Tip: speak German with her during maths, even if your German is basic. The app's 🇬🇧 buttons give you the English for every sentence.</p></div>`;
  wireHead(u,()=>unit(u));
}
function glossary(){
  const all=UNITS.flatMap(u=>u.parent.words.map(w=>[...w,u]));
  app.innerHTML=`<button class="back" id="back">← Alle Themen</button><div class="panel parent"><h3>${CFG.wordsTitle}</h3><p>Tippe auf ein Wort. Dann hörst du es.</p>
    ${UNITS.map(u=>`<div class="glh">${u.emo} ${esc(u.de)}</div><div class="gl">${u.parent.words.map(w=>`<div class="glr"><div class="gde">${kwHtml(w[0],"de")}</div></div>`).join("")}</div>`).join("")}</div>`;
  $("#back").onclick=()=>go(home);
}
home();
