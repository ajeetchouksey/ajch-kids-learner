/* ============================ 📲 PWA: install + "new version → update after OK" ============================
   Only on the hosted site (https / localhost, top window). The offline file and the Claude artifact skip all of this. */
const PWA=(function(){
  const V=typeof APP_VERSION!=="undefined"?APP_VERSION:{version:"dev",build:"",date:""};
  const label=()=>`${V.version}${V.build?" · "+V.build:""}${V.date?" · "+V.date:""}`;
  const can=()=>{try{return "serviceWorker" in navigator&&/^https?:$/.test(location.protocol)&&window.top===window&&(!navigator.webdriver||window.__pwa);}catch(e){return false;}};
  let reg=null,waiting=null,reloading=false;
  function banner(){if(document.getElementById("pwaUpd"))return;const b=document.createElement("div");b.id="pwaUpd";b.setAttribute("role","alert");
    b.innerHTML=`<span>✨ ${T("Neue Version der App ist da.","A new version of the app is ready.")}</span><button class="btn" id="pwaOk">${T("Aktualisieren","Update")}</button><button class="btn ghost" id="pwaLater">${T("Später","Later")}</button>`;
    document.body.appendChild(b);
    b.querySelector("#pwaOk").onclick=()=>{try{STORE.saveNow&&STORE.saveNow();}catch(e){}if(waiting)waiting.postMessage("SKIP_WAITING");b.remove();};
    b.querySelector("#pwaLater").onclick=()=>b.remove();}
  function track(r){reg=r;if(r.waiting&&navigator.serviceWorker.controller){waiting=r.waiting;banner();}
    r.addEventListener("updatefound",()=>{const n=r.installing;if(!n)return;n.addEventListener("statechange",()=>{if(n.state==="installed"&&navigator.serviceWorker.controller){waiting=n;banner();}});});}
  function start(){if(!can())return;
    navigator.serviceWorker.register("sw.js").then(track).catch(()=>{});
    navigator.serviceWorker.addEventListener("controllerchange",()=>{if(reloading)return;reloading=true;location.reload();});
    const check=()=>{try{reg&&reg.update();}catch(e){}};setInterval(check,30*60*1000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)check();});}
  window.addEventListener("load",start);
  return {label,version:V,can,check:()=>reg&&reg.update()};
})();
