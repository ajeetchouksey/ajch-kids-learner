/* ============================ AaryaAI boot: setup wizard · save file · personalised start ============================ */
const AAI={PKEY:"aaryaai-profile",KEYS:["aaryaai-profile","aarya-rewards-v1","aarya-grammar-v1","aarya-deutsch-v1","aarya-mathe-v1","aarya-brain-v1","aarya-bhasha-v1","aarya-plan-v1","aarya-tab"]};
/* change times per storage key (for merging progress from several devices) */
AAI.MT=(()=>{const K="aaryaai-mtime";let m={};try{m=JSON.parse(localStorage.getItem(K)||"{}")||{};}catch(e){m={};}
  const S=Storage.prototype,set=S.setItem,rem=S.removeItem,watch=k=>AAI.KEYS.includes(k)&&k!=="aarya-tab";let quiet=false;
  const mark=k=>{if(quiet)return;m[k]=Date.now();quiet=true;try{set.call(localStorage,K,JSON.stringify(m));}catch(e){}quiet=false;};
  S.setItem=function(k,v){if(this===localStorage&&watch(k)&&this.getItem(k)!==String(v)){set.call(this,k,v);mark(k);return;}return set.call(this,k,v);};
  S.removeItem=function(k){const had=this===localStorage&&watch(k)&&this.getItem(k)!=null;rem.call(this,k);if(had)mark(k);};
  return {all:()=>Object.assign({},m),set:(k,t)=>{m[k]=t;quiet=true;try{set.call(localStorage,K,JSON.stringify(m));}catch(e){}quiet=false;},max:()=>Math.max(0,...Object.values(m))};})();
/* stored-data schema: bump SCHEMA and add a step to MIGRATE when the shape of saved data changes; runs once per device before the app reads anything */
AAI.SCHEMA=1;AAI.MIGRATE={/* 1:()=>{…change keys from schema 0 to 1…} */};
(()=>{try{const k="aaryaai-schema";let v=+(localStorage.getItem(k)||0);if(v>=AAI.SCHEMA)return;
  const backup={};for(const key of AAI.KEYS){const x=localStorage.getItem(key);if(x!=null)backup[key]=x;}
  if(Object.keys(backup).length)localStorage.setItem("aaryaai-backup",JSON.stringify({why:"migration "+v+"→"+AAI.SCHEMA,at:new Date().toISOString(),data:backup}));
  while(v<AAI.SCHEMA){v++;if(AAI.MIGRATE[v])AAI.MIGRATE[v]();}localStorage.setItem(k,String(AAI.SCHEMA));}catch(e){}})();
AAI.esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
AAI.prof=()=>{try{return JSON.parse(localStorage.getItem(AAI.PKEY)||"null");}catch(e){return null;}};
AAI.t=(de,en)=>(((AAI.prof()||{}).uiLang)==="en"?en:de);
AAI.saveProf=p=>{try{localStorage.setItem(AAI.PKEY,JSON.stringify(p));}catch(e){}};
AAI.clean=n=>(n||"").replace(/[^A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017E .\-]/g,"").replace(/\s+/g," ").trim().slice(0,20);
/* the save file handle is remembered in IndexedDB (browsers never reveal or accept a typed folder path) */
AAI.idb=(mode,fn)=>new Promise((res,rej)=>{try{const r=indexedDB.open("aaryaai",1);r.onupgradeneeded=()=>r.result.createObjectStore("kv");
  r.onsuccess=()=>{try{const tx=r.result.transaction("kv",mode),q=fn(tx.objectStore("kv"));tx.oncomplete=()=>res(q&&q.result);tx.onerror=()=>rej(tx.error);}catch(e){rej(e);}};r.onerror=()=>rej(r.error);}catch(e){rej(e);}});
AAI._h=null;
AAI.getHandle=()=>AAI._h?Promise.resolve(AAI._h):AAI.idb("readonly",s=>s.get("file")).catch(()=>null);
AAI.setHandle=h=>{AAI._h=h;return AAI.idb("readwrite",s=>s.put(h,"file")).catch(()=>{});};
AAI.delHandle=()=>{AAI._h=null;return AAI.idb("readwrite",s=>s.delete("file")).catch(()=>{});};
AAI.canPick=()=>typeof window.showSaveFilePicker==="function"&&typeof window.showOpenFilePicker==="function";
Object.defineProperty(AAI,"TYPES",{get:()=>[{description:AAI.t("AaryaAI-Fortschritt","AaryaAI progress"),accept:{"application/json":[".json"]}}]});
AAI.pickNew=async name=>{const h=await window.showSaveFilePicker({suggestedName:`${AAI.clean(name)||"Kind"}-AaryaAI.json`,types:AAI.TYPES});await AAI.setHandle(h);return h;};
AAI.pickOpen=async()=>{const [h]=await window.showOpenFilePicker({types:AAI.TYPES,multiple:false});return {h,txt:await (await h.getFile()).text()};};
AAI.isObj=o=>!!o&&typeof o==="object"&&!Array.isArray(o);
/* check a save file before anything is written: wrong or damaged files are refused */
AAI.readFile=txt=>{let j;try{j=JSON.parse(txt);}catch(e){throw new Error(AAI.t("Die Datei ist kein gültiges JSON.","The file is not valid JSON."));}
  if(!AAI.isObj(j)||j.app!=="AaryaAI"||!AAI.isObj(j.data))throw new Error(AAI.t("Das ist keine AaryaAI-Datei.","This is not an AaryaAI file."));
  const d=j.data,bad=()=>{throw new Error(AAI.t("Die Datei ist beschädigt.","The file is damaged."));};
  const r=d["aarya-rewards-v1"];if(r!==undefined){if(!AAI.isObj(r))bad();for(const k of ["days","badges","goal","tot","wrong","sp","opt"])if(r[k]!==undefined&&!AAI.isObj(r[k]))bad();if(r.points!==undefined&&!isFinite(+r.points))bad();}
  for(const k of ["aarya-grammar-v1","aarya-deutsch-v1","aarya-mathe-v1","aarya-brain-v1"])if(d[k]!==undefined&&!AAI.isObj(d[k]))bad();
  const p=d["aaryaai-profile"];if(p!==undefined){if(!AAI.isObj(p))bad();p.name=AAI.clean(p.name)||"Kind";p.gender=p.gender==="m"?"m":"f";p.grade=[0,1,2].includes(+p.grade)?+p.grade:1;if(!AAI.isObj(p.view))p.view={};}
  return j;};
/* a copy of everything is kept before a reset or an import */
AAI.backup=why=>{const o={};for(const k of AAI.KEYS){const v=localStorage.getItem(k);if(v!=null)o[k]=v;}try{localStorage.setItem("aaryaai-backup",JSON.stringify({why,at:new Date().toISOString(),data:o}));}catch(e){}};
AAI.importText=txt=>{const j=AAI.readFile(txt);AAI.backup("import");const old={};for(const k of AAI.KEYS)old[k]=localStorage.getItem(k);
  try{for(const k of AAI.KEYS){if(k==="aarya-tab")continue;if(k==="aaryaai-profile"&&!(k in j.data))continue;localStorage.removeItem(k);if(k in j.data)localStorage.setItem(k,typeof j.data[k]==="string"?j.data[k]:JSON.stringify(j.data[k]));}}
  catch(e){for(const k of AAI.KEYS){try{old[k]==null?localStorage.removeItem(k):localStorage.setItem(k,old[k]);}catch(x){}}throw new Error(AAI.t("Nicht genug Speicher im Browser.","Not enough browser storage."));}return j;};
AAI.peek=async h=>{try{const f=await h.getFile();if(!f.size)return null;const j=AAI.readFile(await f.text());return {j,points:+((((j.data||{})["aarya-rewards-v1"])||{}).points)||0,name:(j.child&&j.child.name)||""};}catch(e){return null;}};
AAI.saveBlob=async(name,text)=>{try{if(window.claude&&window.claude.use){const d=await window.claude.use("downloads");if(d){await d.save({filename:name,data:text});return;}}}catch(e){if(e&&e.code==="declined")return;}
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"application/json"}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},800);};
/* safe mode: if the app cannot start, the parent can still rescue the data */
AAI.rescue=msg=>{const el=document.getElementById("setup");if(!el||el.dataset.rescue)return;el.dataset.rescue="1";const has=!!localStorage.getItem("aaryaai-backup");el.hidden=false;
  el.innerHTML=`<div class="setcard"><div class="setlogo">🛟</div><h2>${AAI.t("Hoppla – AaryaAI startet nicht","Oops – AaryaAI won't start")}</h2><p class="sub">${AAI.t("Beim Starten ist etwas schiefgegangen. Deine Daten sind noch da.","Something went wrong while starting. Your data is still here.")}</p><p class="serr" style="font-weight:400;font-size:12px">${AAI.esc(String(msg||"").slice(0,160))}</p>
    <div class="srow col"><button class="btn" id="rsDown" type="button">⬇️ ${AAI.t("Daten sichern","Save a copy")}</button>${has?`<button class="btn ghost" id="rsBack" type="button">↩️ ${AAI.t("Letzte Sicherung zurückholen","Restore last backup")}</button>`:""}<button class="btn ghost" id="rsNew" type="button">🧹 ${AAI.t("Neu anfangen","Start fresh")}</button></div><p class="serr" id="rsMsg"></p></div>`;
  el.querySelector("#rsDown").onclick=()=>{const data={};for(const k of AAI.KEYS){const v=localStorage.getItem(k);if(v!=null){try{data[k]=JSON.parse(v);}catch(e){data[k]=v;}}}AAI.saveBlob("AaryaAI-Sicherung.json",JSON.stringify({app:"AaryaAI",format:1,savedAt:new Date().toISOString(),rescue:true,data},null,2));};
  if(has)el.querySelector("#rsBack").onclick=()=>{try{const b=JSON.parse(localStorage.getItem("aaryaai-backup"));for(const k of AAI.KEYS){localStorage.removeItem(k);if(b.data[k]!=null)localStorage.setItem(k,b.data[k]);}location.reload();}catch(e){el.querySelector("#rsMsg").textContent=e.message;}};
  let sure=false;el.querySelector("#rsNew").onclick=e=>{if(!sure){sure=true;e.target.textContent=AAI.t("Wirklich alles löschen? Nochmal tippen","Delete everything? Tap again to confirm");return;}AAI.backup("rescue");for(const k of AAI.KEYS)localStorage.removeItem(k);location.reload();};};
AAI.pickErr=e=>e&&e.name==="SecurityError"?AAI.t("Hier darf der Browser keine Datei auswählen (z. B. in der Online-Vorschau). Öffne die heruntergeladene AaryaAI-Datei in Chrome oder Edge.","File pickers are blocked here (e.g. in the online preview). Open the downloaded AaryaAI file in Chrome or Edge."):(e&&e.message)||String(e);
/* sentences that talk about the child: boy versions */
AAI.SWAPS=[["we say “She ate her apple.”","we say “He ate his apple.”"],['["👧","Aarya → she"]','["👦","Aarya → he"]'],['"Aarya is happy. → ___ is happy.",["She","He","It","They"]','"Aarya is happy. → ___ is happy.",["He","She","It","They"]'],
  ['["👧","Aarya is kind. She is kind."]','["👦","Aarya is kind. He is kind."]'],['["👧","girl → Aarya"]','["👦","boy → Aarya"]'],['"Say a special name for a girl.","Aarya!"','"Say a special name for a boy.","Aarya!"'],['["girl","Aarya"]','["boy","Aarya"]'],
  ["Sie bekommt {b} dazu. Wie viele Äpfel hat sie jetzt?","Er bekommt {b} dazu. Wie viele Äpfel hat er jetzt?"],["She gets {b} more. How many apples does she have now?","He gets {b} more. How many apples does he have now?"],
  ["Ihre Freundin hat {b} Stifte","Sein Freund hat {b} Stifte"],["Her friend has {b} pencils","His friend has {b} pencils"],["hat sie nach dem Kauf noch","hat er nach dem Kauf noch"],["does she have left","does he have left"],["🙋‍♀️","🙋‍♂️"],["🤸‍♀️","🤸‍♂️"],
  ["Entdeckerin","Entdecker"],["Heldin","Held"],["Reisende\"","Reisender\""],["Super-Leserin","Super-Leser"],["\"Leserin\"","\"Leser\""],["Sammlerin","Sammler"],["Schreiberin","Schreiber"],["Sportlerin","Sportler"],["Alles-Könnerin","Alles-Könner"],["Lern-Königin","Lern-König"],["learning queen","learning king"],["Verbesserin","Verbesserer"]];

AAI.wizard=(opts={})=>new Promise(done=>{const el=document.getElementById("setup");let P=Object.assign({name:"",gender:"f",grade:1,view:{},uiLang:"de"},AAI.prof()||{});
  /* the wizard follows the language picked inside it (not yet saved) */
  const t=(de,en)=>P.uiLang==="en"?en:de;
  if(!P.name&&localStorage.getItem("aarya-rewards-v1"))P.name="Aarya";let step=opts.step||1,handleName="";
  const finish=()=>{P.name=AAI.clean(P.name);if(!P.created)P.created=new Date().toISOString().slice(0,10);AAI.saveProf(P);el.hidden=true;el.innerHTML="";done(P);};
  function render(){el.hidden=false;
    if(step===1){el.innerHTML=`<div class="setcard" role="dialog" aria-label="${t("AaryaAI einrichten","AaryaAI setup")}"><div class="setlogo">🤖✨</div><h2>${opts.edit?t("Profil ändern","Edit profile"):t("Willkommen bei AaryaAI!","Welcome to AaryaAI!")}</h2><p class="sub">${opts.edit?t("Name, Stufe und Sprache ändern","Change name, level and language"):t("Lass uns die Lern-App einrichten.","Let's set up the learning app.")}</p>
      <div class="fl"><span>${t("App-Sprache","App language")} <small>${t("für Heute, Training, Auszeichnungen und Eltern","for Today, Training, Awards and Parents")}</small></span><div class="seg2">${[["de","🇩🇪 Deutsch"],["en","🇬🇧 English"]].map(([v,l])=>`<button type="button" data-l="${v}" class="${(P.uiLang==="en"?"en":"de")===v?"on":""}">${l}</button>`).join("")}</div></div>
      <label class="fl"><span>${t("Wie heißt dein Kind?","What is your child's name?")}</span><input id="sname" maxlength="20" autocomplete="off" value="${AAI.esc(P.name)}" placeholder="${t("z. B. Aarya","e.g. Aarya")}"></label>
      <div class="fl"><span>${t("Mädchen oder Junge?","Girl or boy?")} <small>${t("für Sätze wie „sie / er“","for “she / he” sentences")}</small></span><div class="seg2">${[["f",t("👧 Mädchen","👧 Girl")],["m",t("👦 Junge","👦 Boy")]].map(([v,l])=>`<button type="button" data-g="${v}" class="${P.gender===v?"on":""}">${l}</button>`).join("")}</div></div>
      <div class="fl"><span>${t("Welche Stufe?","Which level?")}</span><div class="seg3">${[[0,"🐣","Anfänger","Beginner"],[1,"1️⃣","Klasse 1","Year 1"],[2,"2️⃣","Klasse 2","Year 2"]].map(([v,e,d,en])=>`<button type="button" data-k="${v}" class="${+P.grade===v?"on":""}"><span>${e}</span><b>${t(d,en)}</b></button>`).join("")}</div></div>
      <p class="serr" id="serr"></p><div class="srow">${opts.edit?`<button class="btn ghost" id="scancel" type="button">${t("Abbrechen","Cancel")}</button>`:""}<button class="btn" id="s1" type="button">${opts.edit?t("Speichern ✔","Save ✔"):t("Weiter ▶","Next ▶")}</button></div></div>`;
      const nm=el.querySelector("#sname");setTimeout(()=>nm.focus(),50);
      el.querySelectorAll(".seg2 button[data-l]").forEach(b=>b.onclick=()=>{P.uiLang=b.dataset.l==="en"?"en":"de";P.name=nm.value;render();});
      el.querySelectorAll(".seg2 button[data-g]").forEach(b=>b.onclick=()=>{P.gender=b.dataset.g;P.name=nm.value;render();});
      el.querySelectorAll(".seg3 button").forEach(b=>b.onclick=()=>{P.grade=+b.dataset.k;P.view={};P.name=nm.value;render();});
      const go=()=>{const n=AAI.clean(nm.value);if(!n){el.querySelector("#serr").textContent=t("Bitte gib einen Namen ein.","Please enter a name.");nm.focus();return;}P.name=n;if(opts.edit)return finish();step=2;render();};
      el.querySelector("#s1").onclick=go;nm.onkeydown=e=>{if(e.key==="Enter")go();};
      if(opts.edit)el.querySelector("#scancel").onclick=()=>{el.hidden=true;el.innerHTML="";done(null);};return;}
    const can=AAI.canPick();
    el.innerHTML=`<div class="setcard" role="dialog" aria-label="${t("Speicherort","Save location")}"><div class="setlogo">💾</div><h2>${t("Wo soll gespeichert werden?","Where should progress be saved?")}</h2><p class="sub">${t(`Für den Fortschritt von ${AAI.esc(P.name)}.`,`For ${AAI.esc(P.name)}'s progress.`)}</p>
      <p class="sinfo">${t("AaryaAI speichert <b>Name, Fortschritt, Punkte und Auszeichnungen</b> in einer JSON-Datei auf deinem Computer. Wähle den Ordner und den Dateinamen – danach speichert die App automatisch.","AaryaAI saves <b>name, progress, points and awards</b> in a JSON file on your computer. Pick the folder and file name – after that the app saves automatically.")}</p>
      ${can?`<div class="srow col"><button class="btn" id="snew" type="button">📁 ${t("Speicherort wählen …","Choose folder &amp; file …")}</button><button class="btn ghost" id="sopen" type="button">📂 ${t("Vorhandene Datei öffnen …","Open an existing file …")}</button></div>`
        :`<p class="swarn">${t("Dieser Browser kann nicht direkt in eine Datei schreiben (z. B. iPhone/iPad, Firefox oder die Online-Ansicht). Unter 🏆 Auszeichnungen → 🔒 Für Eltern kannst du die Datei jederzeit herunterladen und wieder laden.","This browser can't write to a file directly (e.g. iPhone/iPad, Firefox or the online preview). Under 🏆 Awards → 🔒 For parents you can download the file and load it again at any time.")}</p>
          <div class="srow col"><label class="btn ghost" for="sfile">⬆️ ${t("Vorhandene Datei laden","Load an existing file")}</label><input type="file" id="sfile" accept=".json,application/json" hidden></div>`}
      <p class="sok" id="sok"></p><p class="serr" id="serr"></p>
      <div class="srow"><button class="btn ghost" id="sback" type="button">◀ ${t("Zurück","Back")}</button><button class="btn ghost" id="sskip" type="button">${t("Später","Later")}</button><button class="btn" id="sdone" type="button" hidden>${t("Los geht's! ▶","Let's go! ▶")}</button></div></div>`;
    const ok=t=>{el.querySelector("#sok").innerHTML=t;el.querySelector("#serr").textContent="";el.querySelector("#sdone").hidden=false;el.querySelector("#sskip").hidden=true;};
    const bad=t=>{el.querySelector("#serr").textContent=t;};
    el.querySelector("#sback").onclick=()=>{step=1;render();};el.querySelector("#sskip").onclick=finish;el.querySelector("#sdone").onclick=finish;
    if(can){el.querySelector("#snew").onclick=async()=>{try{const h=await AAI.pickNew(P.name);handleName=h.name;
        const pk=await AAI.peek(h);if(pk){AAI.importText(JSON.stringify(pk.j));P=Object.assign(P,AAI.prof()||{});ok(t(`✅ In <b>${AAI.esc(h.name)}</b> war schon Fortschritt von <b>${AAI.esc(pk.name||P.name)}</b> (🪙 ${pk.points}) – er wurde geladen, nicht überschrieben.`,`✅ <b>${AAI.esc(h.name)}</b> already had progress from <b>${AAI.esc(pk.name||P.name)}</b> (🪙 ${pk.points}) – it was loaded, not overwritten.`));return;}
        ok(t(`✅ Gespeichert wird in: <b>${AAI.esc(h.name)}</b>. Die App schreibt automatisch hinein.`,`✅ Saving to <b>${AAI.esc(h.name)}</b>. The app writes to it automatically.`));}catch(e){if(e.name!=="AbortError")bad(AAI.pickErr(e));}};
      el.querySelector("#sopen").onclick=async()=>{try{const {h,txt}=await AAI.pickOpen();const j=AAI.importText(txt);await AAI.setHandle(h);try{await h.requestPermission({mode:"readwrite"});}catch(e){}
        const kp=AAI.prof()||{};P=Object.assign(P,kp);if(j.child&&j.child.name)P.name=AAI.clean(j.child.name);ok(t(`✅ Fortschritt von <b>${AAI.esc(P.name)}</b> geladen aus <b>${AAI.esc(h.name)}</b>. Neuer Fortschritt wird in dieselbe Datei gespeichert.`,`✅ Progress of <b>${AAI.esc(P.name)}</b> loaded from <b>${AAI.esc(h.name)}</b>. New progress is saved into the same file.`));}catch(e){if(e.name!=="AbortError")bad(AAI.pickErr(e));}};}
    else el.querySelector("#sfile").onchange=async ev=>{const f=ev.target.files[0];if(!f)return;try{const j=AAI.importText(await f.text());P=Object.assign(P,AAI.prof()||{});if(j.child&&j.child.name)P.name=AAI.clean(j.child.name);ok(t(`✅ Fortschritt von <b>${AAI.esc(P.name)}</b> geladen.`,`✅ Progress of <b>${AAI.esc(P.name)}</b> loaded.`));}catch(e){bad(e.message);}};}
  render();});

AAI.boot=()=>{const P=AAI.prof()||{};let src=document.getElementById("app-src").textContent;
  if(P.gender==="m")for(const [a,b] of AAI.SWAPS)src=src.split(a).join(b);
  const nm=AAI.clean(P.name)||"Aarya";src=src.replace(/Aarya(?!AI)/g,nm).replace(/\baarya\b(?!-)/g,nm.toLowerCase());
  document.title=`AaryaAI · ${nm}`;window.__aaiOK=false;let err="";const onErr=e=>{if(!window.__aaiOK)err=err||(e&&e.message)||"error";};window.addEventListener("error",onErr);
  const s=document.createElement("script");s.textContent=src;document.body.appendChild(s);window.removeEventListener("error",onErr);
  if(!window.__aaiOK){AAI.rescue(err||"start failed");return;}
  try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist();}catch(e){}
  /* two open tabs: when the other tab saves, reload so nothing is overwritten */
  window.addEventListener("storage",e=>{if(e.key&&AAI.KEYS.includes(e.key)&&e.key!=="aarya-tab")location.reload();});};
(async()=>{const p=AAI.prof();if(!p||!p.name)await AAI.wizard();AAI.boot();})();
