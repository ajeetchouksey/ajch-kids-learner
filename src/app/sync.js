/* ============================ ☁️ SYNC: progress in the family's own Google Drive ============================
   - Hidden app-data folder only (scope drive.appdata): the app cannot see any other file in the Drive, the family cannot
     accidentally delete it, and nothing passes through an AaryaAI server – there is none.
   - Works offline: the device keeps saving to localStorage; when online, changes are merged and uploaded.
   - Merge per storage key (Mathe, Deutsch, rewards, …): the newer change wins (mtime from AAI.MT).
   - First connection on a device that already has a Drive file: the parent decides (load from Drive / keep this device).
   - Only on the hosted https site in a top-level window; the offline file and the Claude artifact keep the save file. */
const SYNC=(function(){
  const CFG=(typeof APP_CONFIG!=="undefined"&&APP_CONFIG)||{};
  const CID=CFG.googleClientId||"",SCOPE="https://www.googleapis.com/auth/drive.appdata";
  const API="https://www.googleapis.com/drive/v3",UP="https://www.googleapis.com/upload/drive/v3";
  const MKEY="aaryaai-sync",TKEY="aaryaai-sync-token";
  let M={};try{M=JSON.parse(localStorage.getItem(MKEY)||"{}")||{};}catch(e){M={};}
  const saveM=()=>{try{localStorage.setItem(MKEY,JSON.stringify(M));}catch(e){}};
  let token=null,tokenExp=0,tc=null,busy=false,err="",ask=null,lastRun=0;
  try{const t=JSON.parse(sessionStorage.getItem(TKEY)||"null");if(t&&t.exp>Date.now()+60000){token=t.token;tokenExp=t.exp;}}catch(e){}
  const KEYS=()=>AAI.KEYS.filter(k=>k!=="aarya-tab");

  function available(){if(window.__syncTest)return !!CID;try{return !!CID&&/^https?:$/.test(location.protocol)&&window.top===window&&!!window.fetch;}catch(e){return false;}}
  const connected=()=>!!M.on;
  function status(){if(!available())return "unavailable";if(!M.on)return "off";if(ask)return "ask";if(busy)return "busy";if(err)return "error";
    if(!token||Date.now()>tokenExp-30000)return "auth";return navigator.onLine===false?"offline":"ok";}

  /* ---------- Google sign-in (Google Identity Services, token model) ---------- */
  function loadGis(){return new Promise((res,rej)=>{if(window.google&&google.accounts&&google.accounts.oauth2)return res();
    const s=document.createElement("script");s.src="https://accounts.google.com/gsi/client";s.async=true;s.onload=()=>res();s.onerror=()=>rej(new Error(T("Google-Anmeldung konnte nicht geladen werden (offline?)","Could not load Google sign-in (offline?)")));document.head.appendChild(s);});}
  async function signIn(interactive){await loadGis();return new Promise((res,rej)=>{
    tc=google.accounts.oauth2.initTokenClient({client_id:CID,scope:SCOPE,login_hint:M.email||undefined,
      callback:r=>{if(r&&r.access_token){token=r.access_token;tokenExp=Date.now()+(+r.expires_in||3600)*1000;try{sessionStorage.setItem(TKEY,JSON.stringify({token,exp:tokenExp}));}catch(e){}res();}
        else rej(new Error(r&&r.error_description||r&&r.error||"Google sign-in failed"));},
      error_callback:e=>rej(new Error(e&&e.type==="popup_closed"?T("Anmeldung abgebrochen","Sign-in cancelled"):(e&&e.message)||"Google sign-in failed"))});
    tc.requestAccessToken({prompt:interactive&&!M.on?"consent":""});});}

  /* ---------- Drive app-data folder ---------- */
  async function api(url,opt={}){const r=await fetch(url,Object.assign({},opt,{headers:Object.assign({Authorization:"Bearer "+token},opt.headers||{})}));
    if(r.status===401){token=null;try{sessionStorage.removeItem(TKEY);}catch(e){}throw Object.assign(new Error(T("Google möchte die Anmeldung bestätigen","Google wants you to sign in again")),{auth:true});}
    if(!r.ok)throw new Error(`Google Drive ${r.status}`);return r;}
  const fileName=()=>"aaryaai-"+(PROF.name()||"kind").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".json";
  async function findFile(){const q=encodeURIComponent(`name='${fileName()}' and trashed=false`);
    const j=await (await api(`${API}/files?spaces=appDataFolder&q=${q}&fields=files(id,version,modifiedTime)&pageSize=5`)).json();return (j.files||[])[0]||null;}
  async function download(id){return (await api(`${API}/files/${id}?alt=media`)).json();}
  async function upload(id,body){const txt=JSON.stringify(body);
    if(id){const r=await api(`${UP}/files/${id}?uploadType=media&fields=id,version,modifiedTime`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:txt});return r.json();}
    const b="aaryaai"+Math.random().toString(36).slice(2),meta={name:fileName(),parents:["appDataFolder"],mimeType:"application/json"};
    const r=await api(`${UP}/files?uploadType=multipart&fields=id,version,modifiedTime`,{method:"POST",headers:{"Content-Type":"multipart/related; boundary="+b},
      body:`--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n--${b}\r\nContent-Type: application/json\r\n\r\n${txt}\r\n--${b}--`});return r.json();}
  async function whoAmI(){try{const j=await (await api(`${API}/about?fields=user(emailAddress,displayName)`)).json();return j.user&&j.user.emailAddress||"";}catch(e){return "";}}

  /* ---------- local state ---------- */
  function local(){const data={},mt=AAI.MT.all();for(const k of KEYS()){const v=localStorage.getItem(k);if(v!=null){try{data[k]=JSON.parse(v);}catch(e){data[k]=v;}}}
    return {app:"AaryaAI",format:1,savedAt:new Date().toISOString(),child:{name:PROF.name()},data,sync:{mtime:mt,device:M.device||(M.device=Math.random().toString(36).slice(2,10))}};}
  const pts=d=>+(((d&&d.data||{})["aarya-rewards-v1"]||{}).points)||0;
  function apply(remote,keys){AAI.backup("sync");for(const k of keys){const v=remote.data[k];if(v===undefined)localStorage.removeItem(k);else localStorage.setItem(k,typeof v==="string"?v:JSON.stringify(v));
    AAI.MT.set(k,(remote.sync&&remote.sync.mtime||{})[k]||Date.now());}}
  function merge(L,R){const lm=L.sync.mtime,rm=(R.sync&&R.sync.mtime)||{},take=[],push=[];
    for(const k of KEYS()){const inL=k in L.data,inR=k in (R.data||{});if(!inL&&!inR)continue;const a=lm[k]||0,b=rm[k]||0;
      if(inR&&(!inL||b>a))take.push(k);else if(inL&&(!inR||a>b))push.push(k);
      else if(inL&&inR&&JSON.stringify(L.data[k])!==JSON.stringify(R.data[k]))(a>=b?push:take).push(k);}
    return {take,push};}
  function compose(L,R,take){const out=JSON.parse(JSON.stringify(L));out.sync.mtime=Object.assign({},L.sync.mtime);
    for(const k of take){out.data[k]=R.data[k];out.sync.mtime[k]=(R.sync&&R.sync.mtime||{})[k]||0;}return out;}

  /* ---------- sync run ---------- */
  async function run(opt={}){if(!available()||!M.on||busy||ask)return;if(navigator.onLine===false){ui();return;}
    busy=true;err="";ui();let reload=false;
    try{if(!token||Date.now()>tokenExp-30000){if(!opt.interactive){busy=false;ui();return;}await signIn(true);}
      const f=M.fileId?{id:M.fileId}:await findFile();const L=local();
      if(!f){const r=await upload(null,L);Object.assign(M,{fileId:r.id,version:r.version,at:Date.now(),first:false});}
      else{const R=await download(f.id);
        if(M.first){ask={R,f};M.first=false;saveM();busy=false;ui();return;}       /* parent decides on the first connection */
        const {take,push}=merge(L,R);
        if(take.length&&!opt.background){apply(R,take);reload=true;}          /* in the background: upload only, apply when the app is opened again */
        if(push.length||!R.sync){const r=await upload(f.id,compose(L,R,take));M.version=r.version;}
        Object.assign(M,{fileId:f.id,at:Date.now()});}
      saveM();}
    catch(e){err=e.auth?"":(e.message||String(e));if(e.auth)token=null;if(/404/.test(err)){M.fileId=null;saveM();err="";}}
    busy=false;lastRun=Date.now();ui();
    if(reload)setTimeout(()=>location.reload(),300);}
  async function connect(){err="";try{await signIn(true);M.on=true;M.first=true;M.fileId=null;M.email=await whoAmI();saveM();await run({interactive:true});}
    catch(e){err=e.message||String(e);ui();}}
  async function resolve(choice){const a=ask;ask=null;if(!a)return;busy=true;ui();
    try{if(choice==="drive"){apply(a.R,KEYS().filter(k=>k in (a.R.data||{})||localStorage.getItem(k)!=null));M.fileId=a.f.id;M.at=Date.now();saveM();busy=false;location.reload();return;}
      const L=local();const r=await upload(a.f.id,L);Object.assign(M,{fileId:a.f.id,version:r.version,at:Date.now()});saveM();}
    catch(e){err=e.message||String(e);}busy=false;ui();}
  function disconnect(){try{if(token&&window.google&&google.accounts&&google.accounts.oauth2)google.accounts.oauth2.revoke(token,()=>{});}catch(e){}
    token=null;try{sessionStorage.removeItem(TKEY);}catch(e){}M={device:M.device};saveM();ask=null;err="";ui();}

  /* ---------- UI (parent area) ---------- */
  const tm=t=>t?new Date(t).toLocaleString(UIL.app()==="en"?"en-GB":"de-DE",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}):"–";
  function panelInner(){const s=status(),E=AAI.esc;
    const head=`<h3>☁️ Google Drive</h3>`;
    if(s==="unavailable")return head+`<p class="sstat">${!CID?T("Für diese Version ist Google Drive noch nicht eingerichtet.","Google Drive is not set up for this version yet."):T("Google Drive gibt es in der Online-Version der App (im Browser geöffnet). Diese Datei speichert über 💾 Speicherdatei.","Google Drive is available in the online version of the app (opened in the browser). This copy saves with the 💾 save file.")}</p>`;
    if(s==="off")return head+`<p class="sstat">${T("Fortschritt in eurem eigenen Google Drive sichern und auf mehreren Geräten (Handy, Tablet, Laptop) weiterlernen.","Keep progress in your own Google Drive and continue on several devices (phone, tablet, laptop).")}</p>
      <div class="row"><button class="btn" id="syOn">🔗 ${T("Mit Google Drive verbinden","Connect Google Drive")}</button></div>
      <p class="snote">🔒 ${T("Die App bekommt nur einen versteckten App-Ordner – sie sieht keine anderen Dateien. Kein AaryaAI-Server, keine Werbung. Trennen jederzeit möglich.","The app only gets a hidden app folder – it cannot see any other files. No AaryaAI server, no ads. You can disconnect at any time.")}</p>`;
    const st={ok:`✅ ${T("Verbunden","Connected")}${M.email?` · <b>${E(M.email)}</b>`:""} · ${T("zuletzt","last")} ${tm(M.at)}`,busy:`⏳ ${T("Synchronisiere …","Syncing …")}`,
      offline:`📴 ${T("Offline – wird synchronisiert, sobald Internet da ist.","Offline – will sync when back online.")}`,auth:`🔑 ${T("Google möchte die Anmeldung bestätigen. Tippe auf „Jetzt synchronisieren“.","Google wants you to confirm the sign-in. Tap “Sync now”.")}`,
      error:`⚠️ ${E(err)}`,ask:""}[s];
    const askBox=ask?`<div class="confirm syask"><p>☁️ ${T(`Im Google Drive gibt es schon Fortschritt von <b>${E((ask.R.child||{}).name||PROF.name())}</b> (🪙 ${pts(ask.R)}, gespeichert ${tm(ask.R.savedAt)}). Auf diesem Gerät: 🪙 ${REW.R().points}.`,`Google Drive already has progress for <b>${E((ask.R.child||{}).name||PROF.name())}</b> (🪙 ${pts(ask.R)}, saved ${tm(ask.R.savedAt)}). On this device: 🪙 ${REW.R().points}.`)}</p>
      <div class="row"><button class="btn" id="syDrive">☁️ ${T("Aus Google Drive laden","Load from Google Drive")}</button><button class="btn ghost" id="syLocal">📱 ${T("Dieses Gerät behalten","Keep this device")}</button></div></div>`:"";
    return head+`<p class="sstat">${st}</p>${askBox}<div class="row">${ask?"":`<button class="btn" id="syNow">🔄 ${T("Jetzt synchronisieren","Sync now")}</button>`}<button class="btn ghost" id="syOff">✖ ${T("Trennen","Disconnect")}</button></div>
      <p class="snote">${T("Synchronisiert automatisch beim Öffnen, alle 2 Minuten und beim Schließen. Haben zwei Geräte gleichzeitig geübt, gewinnt pro Bereich (Mathe, Deutsch, …) die neuere Änderung.","Syncs automatically on opening, every 2 minutes and when closing. If two devices practised at the same time, the newer change wins per area (Mathe, Deutsch, …).")}</p>`;}
  function badge(){if(!available()||!M.on)return null;const s=status();
    return [{ok:"☁️✓",busy:"☁️…",offline:"☁️📴",auth:"☁️⚠️",error:"☁️⚠️",ask:"☁️❓"}[s]||"☁️",
      {ok:T("Mit Google Drive synchronisiert","Synced with Google Drive"),busy:T("Synchronisiere …","Syncing …"),offline:T("Offline – synchronisiert später","Offline – will sync later"),
       auth:T("Tippen: Google-Anmeldung bestätigen","Tap: confirm Google sign-in"),error:T("Synchronisieren hat nicht geklappt – tippen zum Wiederholen","Sync failed – tap to retry"),ask:T("Elternbereich: Google Drive wählen","Parent area: choose Google Drive")}[s]||"",
      ["auth","error","ask"].includes(s)];}
  function ui(){try{STORE.ui();}catch(e){}const p=document.getElementById("syncbox");if(p&&!document.getElementById("vParent").hidden){p.innerHTML=panelInner();wire(p);}
}
  function wire(p){const on=(id,f)=>{const e=p.querySelector("#"+id);if(e)e.onclick=f;};
    on("syOn",connect);on("syNow",()=>run({interactive:true}));on("syOff",disconnect);on("syDrive",()=>resolve("drive"));on("syLocal",()=>resolve("local"));}
  function init(){if(!available()||!M.on)return;run();setInterval(()=>{if(AAI.MT.max()>(M.at||0)||Date.now()-lastRun>10*60*1000)run({background:true});},120000);
    window.addEventListener("online",()=>run({background:true}));document.addEventListener("visibilitychange",()=>{if(document.hidden&&AAI.MT.max()>(M.at||0))run({background:true});else if(!document.hidden)run();});}
  return {badge,init,run,connect,disconnect,resolve,status,available,panel:()=>`<div class="panel parent" id="syncbox">${panelInner()}</div>`,ui,_merge:merge,_M:()=>M};
})();
