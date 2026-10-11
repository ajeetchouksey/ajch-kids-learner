/* ============================ STORE: JSON save file (name · progress · scores · awards) ============================ */
const STORE=(function(){let handle=null,perm="none",last="",lastAt=null,err="",confirmOpen=false;
  function snapshot(){const R=REW.R(),L=REW.level(),P=PROF.get(),sc=subjectScores(),tr=REW.SUBJ.reduce((a,k)=>[a[0]+R.tot[k],a[1]+R.wrong[k]],[0,0]);
    const data={};for(const k of AAI.KEYS){const v=localStorage.getItem(k);if(v!=null){try{data[k]=JSON.parse(v);}catch(e){data[k]=v;}}}
    const subj={};for(const k of REW.SUBJ.concat(XSUBJ)){const s=sc[k];subj[SUBJ_NAME[k]]={points:s.points,correct:s.correct,wrong:s.wrong,accuracyPercent:s.accuracy,stars:s.stars,starsPossible:s.max,
      byLevel:Object.fromEntries((s.by||[]).map((x,g)=>[GRADES[g][2],{stars:x.stars,starsPossible:x.max,topicsStarted:x.topics,topics:x.of}])),...(k==="brain"?{workouts:R.tot.workouts,movementBreaks:R.tot.moves}:{})};}
    return {app:"AaryaAI",format:1,savedAt:new Date().toISOString(),
      child:{name:PROF.name(),gender:P.gender==="m"?"boy":"girl",level:GRADES[PROF.grade()][2],since:P.created||""},
      scores:{overall:{points:R.points,level:L.n,levelName:`${L.de} (${L.en})`,stars:REW.SUBJ.reduce((a,k)=>a+sc[k].stars,0),starsPossible:REW.SUBJ.reduce((a,k)=>a+sc[k].max,0),
        correct:tr[0],wrong:tr[1],accuracyPercent:pct(tr[0],tr[1]),dayStreak:REW.curStreak(),bestRunInARow:R.bestCombo,minutesLearned:Math.round(R.tot.secs/60),notebookSessions:R.tot.heft,answersWrittenFirst:R.tot.written,screenFreeMinutes:Math.round(R.tot.offline/60),bonusPoints:R.sp.bonus||0},subjects:subj},
      awards:Object.entries(R.badges).map(([id,d])=>{const b=REW.BADGES.find(x=>x[0]===id);return {id,name:b?b[2]:id,english:b?b[3]:"",earned:d};}).sort((a,b)=>a.earned<b.earned?-1:1),
      awardsTotal:REW.BADGES.length,data};}
  const json=()=>JSON.stringify(snapshot(),null,2);
  let writing=false,again=false;
  async function tick(force){if(!handle||perm!=="granted")return;if(writing){again=again||force;return;}writing=true;try{await tick2(force);}finally{writing=false;if(again){again=false;tick(true);}}}
  async function tick2(force){const s=snapshot(),key=JSON.stringify(Object.assign({},s,{savedAt:0}));if(key===last&&!force)return;
    try{const w=await handle.createWritable();await w.write(JSON.stringify(s,null,2));await w.close();last=key;lastAt=new Date();err="";}
    catch(e){err=(e&&e.message)||String(e);try{perm=await handle.queryPermission({mode:"readwrite"});}catch(x){perm="prompt";}}ui();}
  async function connect(){if(!handle)return;try{perm=await handle.requestPermission({mode:"readwrite"});}catch(e){err=e.message;}ui();if(perm==="granted")tick(true);}
  async function chooseNew(){try{const h=await AAI.pickNew(PROF.name());const pk=await AAI.peek(h);
    if(pk&&pk.points>REW.R().points){confirmOpen={kind:"existing",h,pk};ui();return;}
    handle=h;perm="granted";last="";await tick(true);}catch(e){if(e.name!=="AbortError")err=AAI.pickErr(e);}ui();}
  async function openFile(){try{const {h,txt}=await AAI.pickOpen();AAI.importText(txt);await AAI.setHandle(h);try{await h.requestPermission({mode:"readwrite"});}catch(e){}location.reload();}
    catch(e){if(e.name!=="AbortError"){err=AAI.pickErr(e);ui();}}}
  let DL=null;try{if(window.claude&&typeof window.claude.use==="function")window.claude.use("downloads").then(d=>{DL=d;}).catch(()=>{});}catch(e){}
  async function download(){if(DL){try{await DL.save({filename:`${PROF.name()}-AaryaAI.json`,data:json()});err="";}catch(e){err=e&&e.code==="declined"?"":((e&&(e.message||e.code))||T("Download nicht möglich","Download not possible"));}ui();return;}
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([json()],{type:"application/json"}));a.download=`${PROF.name()}-AaryaAI.json`;document.body.appendChild(a);a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},800);}
  function upload(f){f.text().then(t=>{AAI.importText(t);location.reload();}).catch(e=>{err=e.message;ui();});}
  async function forget(){await AAI.delHandle();handle=null;perm="none";ui();}
  function state(){if(!handle)return AAI.canPick()?"none":"nopick";return perm==="granted"?(err?"error":"ok"):"prompt";}
  function ui(){const b=document.getElementById("sbSave");if(b){const s=state();b.textContent={ok:"💾✓",prompt:"💾⚠️",error:"💾⚠️",none:"💾",nopick:"💾"}[s];
      b.title={ok:T(`Gespeichert in ${handle&&handle.name}`,`Saving to ${handle&&handle.name}`),prompt:T("Tippen zum Verbinden","Tap to reconnect the save file"),error:T("Speichern fehlgeschlagen","Saving failed"),none:T("Speicherdatei wählen","Choose a save file"),nopick:T("Sichern","Back up")}[s];
      b.classList.toggle("warn",s==="prompt"||s==="error");
      try{const c=SYNC.badge();if(c){b.textContent=c[0];b.title=c[1];b.classList.toggle("warn",c[2]);}}catch(e){}}
    const p=document.getElementById("storebox");if(p&&!document.getElementById("vParent").hidden){p.innerHTML=panelInner();wire(p);}}
  function panelInner(){const s=state(),t=lastAt?lastAt.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):"";
    const fn=`<b>${AAI.esc(handle&&handle.name)}</b>`;
    const status={ok:`✅ ${T("Speichert automatisch in","Saving automatically to")} ${fn}${t?` · ${T("zuletzt","last")} ${t}`:""}`,
      prompt:T(`⚠️ Die Datei ${fn} ist gewählt, aber der Browser fragt nach Erlaubnis. Tippe auf „Verbinden“, damit wieder gespeichert wird (Browser fragen nach einem Neustart erneut).`,`⚠️ The file ${fn} is chosen, but the browser asks for permission. Tap “Reconnect” to allow saving again (browsers ask after a restart).`),
      error:T(`⚠️ Speichern hat nicht geklappt: ${AAI.esc(err)}`,`⚠️ Saving failed: ${AAI.esc(err)}`),none:T("Noch keine Speicherdatei gewählt. Der Fortschritt liegt nur in diesem Browser.","No save file chosen yet: progress is only in this browser."),
      nopick:T("Dieser Browser kann nicht direkt in eine Datei speichern. Nutze ⬇️ Herunterladen als Sicherung und ⬆️ Laden zum Wiederherstellen.","This browser can't write to a file directly. Use ⬇️ Download as a backup and ⬆️ Load to restore.")}[s];
    return `<h3>💾 ${T("Speicherdatei","Save file")}</h3><p class="sstat">${status}</p>${err&&s!=="error"?`<p class="serr">${AAI.esc(err)}</p>`:""}
      <div class="row">${s==="prompt"?`<button class="btn" id="stConnect">🔗 ${T("Verbinden","Reconnect")}</button>`:""}${AAI.canPick()?`<button class="btn${s==="none"?"":" ghost"}" id="stNew">📁 ${handle?T("Andere Datei","Other file"):T("Speicherort wählen","Choose file")}</button><button class="btn ghost" id="stOpen">📂 ${T("Datei öffnen","Open file")}</button>`:""}
        <button class="btn ghost" id="stDown">⬇️ ${T("Herunterladen","Download")}</button><label class="btn ghost" for="stUp">⬆️ ${T("Laden","Load")}</label><input type="file" id="stUp" accept=".json,application/json" hidden>${handle?`<button class="btn ghost" id="stForget">✖ ${T("Datei trennen","Disconnect")}</button>`:""}</div>
      ${confirmOpen&&confirmOpen.kind==="existing"?`<div class="confirm">⚠️ ${T(`<b>${AAI.esc(confirmOpen.h.name)}</b> enthält schon mehr Fortschritt (🪙 ${confirmOpen.pk.points} von ${AAI.esc(confirmOpen.pk.name)}).`,`<b>${AAI.esc(confirmOpen.h.name)}</b> already holds more progress (🪙 ${confirmOpen.pk.points} from ${AAI.esc(confirmOpen.pk.name)}).`)} <button class="btn" id="stLoadEx">📂 ${T("Laden","Load it")}</button><button class="btn ghost" id="stOverEx" style="--c:var(--bad)">${T("Überschreiben","Overwrite")}</button></div>`:""}
      ${confirmOpen&&!confirmOpen.kind?`<div class="confirm">${T("Der aktuelle Fortschritt wird durch die Datei ersetzt. Weiter?","The current progress will be replaced by the file. Continue?")} <button class="btn" id="stYes" style="--c:var(--bad)">${T("Ja","Yes")}</button><button class="btn ghost" id="stNo">${T("Nein","No")}</button></div>`:""}
      <p class="snote">${T("Die Datei enthält: Name, Stufe, Punkte pro Fach und gesamt, Sterne, Genauigkeit, Auszeichnungen und den ganzen Spielstand. Browser zeigen aus Sicherheitsgründen keinen Ordnerpfad an – nur den Dateinamen.","The file holds name, level, scores per subject and overall, stars, accuracy, awards and the full game state. For security, browsers only show the file name, never the folder path.")}</p>`;}
  function wire(p){const on=(id,f)=>{const e=p.querySelector("#"+id);if(e)e.onclick=f;};
    on("stConnect",connect);on("stNew",chooseNew);on("stDown",download);on("stForget",forget);
    on("stOpen",()=>{confirmOpen="open";ui();});on("stNo",()=>{confirmOpen=false;ui();});on("stYes",()=>{const m=confirmOpen;confirmOpen=false;if(m==="open")openFile();else if(m&&m.name)upload(m);});
    on("stLoadEx",()=>{const m=confirmOpen;confirmOpen=false;try{AAI.importText(JSON.stringify(m.pk.j));AAI.setHandle(m.h).then(()=>location.reload());}catch(e){err=e.message;ui();}});
    on("stOverEx",async()=>{const m=confirmOpen;confirmOpen=false;handle=m.h;perm="granted";last="";await tick(true);ui();});
    const up=p.querySelector("#stUp");if(up)up.onchange=e=>{const f=e.target.files[0];if(f){confirmOpen=f;ui();}};}
  async function init(){handle=await AAI.getHandle();if(handle){try{perm=await handle.queryPermission({mode:"readwrite"});}catch(e){perm="prompt";}}
    const b=document.getElementById("sbSave");if(b)b.onclick=()=>{try{if(["auth","error"].includes(SYNC.status())){SYNC.run({interactive:true});return;}}catch(e){}state()==="prompt"?connect():show("parent");setTimeout(()=>{const p=document.getElementById("storebox");if(p)p.scrollIntoView({behavior:"smooth",block:"center"});},80);};
    ui();setInterval(()=>tick(false),4000);document.addEventListener("visibilitychange",()=>{if(document.hidden)tick(true);});if(perm==="granted")tick(true);}
  return {init,snapshot,json,download,panel:()=>`<div class="panel parent" id="storebox">${panelInner()}</div>`,ui,tick,state};})();
STORE.init();
startApp();
try{SYNC.init();}catch(e){}
window.__aaiOK=true;
