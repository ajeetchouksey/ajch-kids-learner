/* AaryaAI service worker – version __VERSION__
   Cache-first for the app shell so it opens offline; a new deploy changes this file, the browser installs the new
   version in the background and the app asks "Aktualisieren?" – it only switches after the parent/child taps OK. */
const CACHE="aaryaai-__VERSION__";
const SHELL=["./","index.html","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","AaryaAI.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:"reload"})))));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("aaryaai-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("message",e=>{if(e.data==="SKIP_WAITING")self.skipWaiting();});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  if(new URL(r.url).pathname.endsWith("/version.json"))return;   /* always live */
  e.respondWith(caches.open(CACHE).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&r.mode==="navigate")c.put(r,res.clone());return res;}).catch(()=>c.match("index.html")))));});
