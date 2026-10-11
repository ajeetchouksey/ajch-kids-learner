/* ============================ STATE ============================ */
const KEY=CFG.key;
let S={best:{},gbest:{},voice:true,readEn:false,rate:.6,pauseMul:1,wordMode:false,voiceDe:"",voiceEn:"",len:"medium",bestMix:0,solved:0};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s)S=Object.assign(S,s);}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const $=s=>document.querySelector(s);
const app=$("#app");
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const sleep=ms=>new Promise(z=>setTimeout(z,ms));

/* ============================ VOICE (German + English) ============================ */
const HAS_TTS="speechSynthesis" in window;
const FEMALE=/anna|petra|helena|katja|hedda|marlene|vicki|amala|seraphina|elke|louisa|gisela|ingrid|klara|tanja|samantha|karen|moira|tessa|serena|kate|martha|stephanie|fiona|victoria|allison|ava|susan|zira|hazel|libby|sonia|maisie|jenny|aria|emma|michelle|natasha|clara|olivia|amy|female|woman|google deutsch|google uk english female/i;
const MALE=/\b(markus|stefan|conrad|killian|hans|yannick|daniel|arthur|george|ryan|david|mark|guy|alex|fred|oliver|thomas|rishi|james|william|brian|eric|male|man)\b/i;
let VOICES={de:[],en:[]},VOICE={de:null,en:null};
function scoreVoice(v,lang){let s=0;const n=v.name;
  if(FEMALE.test(n))s+=10;else if(MALE.test(n))s-=20;
  if(lang==="de"&&/de[-_]DE/i.test(v.lang))s+=4;
  if(lang==="en"&&/en[-_]GB/i.test(v.lang))s+=4;else if(lang==="en"&&/en[-_](US|AU|IE)/i.test(v.lang))s+=2;
  if(/natural|neural|online/i.test(n))s+=15;else if(/premium|enhanced|siri/i.test(n))s+=12;
  return s;}
const isNatural=v=>v&&/natural|neural|online|premium|enhanced/i.test(v.name);
function loadVoices(){
  if(!HAS_TTS)return;let all=[];try{all=speechSynthesis.getVoices();}catch(e){}
  for(const L of ["de","en"]){VOICES[L]=all.filter(v=>new RegExp("^"+L,"i").test(v.lang)).sort((a,b)=>scoreVoice(b,L)-scoreVoice(a,L));
    const want=L==="de"?S.voiceDe:S.voiceEn;VOICE[L]=VOICES[L].find(v=>v.name===want)||VOICES[L][0]||null;}
  document.querySelectorAll(".voicesel").forEach(fillVoiceSelect);
}
try{loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}

/* how symbols are spoken */
const SAY={de:{"+":"plus","−":"minus","-":"minus","=":"gleich","·":"mal","×":"mal",":":"geteilt durch","<":"ist kleiner als",">":"ist größer als","?":"wie viel","€":"Euro","ct":"Cent","Z":"Zehner","E":"Einer","→":"dann","◻":"was passt"},
           en:{"+":"plus","−":"minus","-":"minus","=":"equals","·":"times","×":"times",":":"divided by","<":"is less than",">":"is greater than","?":"what","€":"euros","ct":"cents","Z":"tens","E":"ones","→":"then","◻":"blank"}};
/* every word that can be read is a .kw span, so it can light up */
function kwHtml(text,lang="de"){
  const out=[];
  String(text).replace(/⟦([^⟧]*)⟧/g,(_,a)=>a.split(" ").map(w=>"⟦"+w+"⟧").join(" ")).split(/\s+/).forEach(tok=>{
    if(!tok)return;const ans=tok.includes("⟦");const w=tok.replace(/[⟦⟧]/g,"");
    if(/^[\p{Extended_Pictographic}️‍]+$/u.test(w)){out.push(`<span class="e">${w}</span>`);return;}
    if(/^[·–\/]$/.test(w)&&!SAY[lang][w]){out.push(`<span class="sep">${esc(w)}</span>`);return;}
    const bare=w.replace(/[\p{Extended_Pictographic}️‍]/gu,"");
    let say=SAY[lang][bare]!==undefined?SAY[lang][bare]:bare;
    if(bare==="?"&&lang==="de")say="wie viel";
    out.push(`<span class="kw${ans?" answ":""}${/^[+−\-=·×:<>?]$/.test(bare)?" sym":""}" data-say="${esc(say)}">${esc(w)}</span>`);
  });
  return `<span class="kwline" data-lang="${lang}">${out.join(" ")}</span>`;
}
let hlTimer=null,curWords=[],speakSeq=0;
function clearHL(){clearTimeout(hlTimer);curWords.forEach(w=>w.classList.remove("on"));curWords=[];}
function stopSpeech(){speakSeq++;clearHL();try{speechSynthesis.cancel();}catch(e){}}
function cleanForSpeech(t,lang="de"){let s=String(t).replace(/[⟦⟧]/g,"").replace(/[\p{Extended_Pictographic}️‍]/gu,"");
  s=s.replace(/(^|\s)([+−=·×:<>?→])(?=\s|$)/g,(m,a,b)=>a+(b==="?"&&lang==="de"?"wie viel":SAY[lang][b]));return s.replace(/\s+/g," ").trim();}
function utter(text,rate,lang){const u=new SpeechSynthesisUtterance(text);u.rate=rate||S.rate;u.pitch=1;u.volume=1;const v=VOICE[lang];if(v){u.voice=v;u.lang=v.lang;}else u.lang=lang==="en"?"en-GB":"de-DE";return u;}
function say1(text,rate,lang,onb,onstart){return new Promise(res=>{try{const u=utter(text,rate,lang);if(onb)u.onboundary=onb;if(onstart)u.onstart=onstart;u.onend=u.onerror=()=>res();speechSynthesis.speak(u);}catch(e){res();}});}
async function speak(t,opt={}){
  if(!HAS_TTS||(!S.voice&&!opt.force))return;const lang=opt.lang||"de";
  if(!opt.keep)stopSpeech();const my=speakSeq;const rate=opt.rate||S.rate;
  const parts=cleanForSpeech(t,lang).split(/(?<=[.!?])\s+/).filter(Boolean);
  for(let k=0;k<parts.length;k++){if(my!==speakSeq)return;await say1(parts[k],rate,lang);if(my!==speakSeq)return;if(k<parts.length-1)await sleep(650*S.pauseMul);}
}
function phrases(ws){const out=[];let cur=[];
  ws.forEach((w,k)=>{cur.push(k);const t=w.dataset.say;const end=/[.!?]$/.test(t),com=/[,;:]$/.test(t);
    if(S.wordMode||end||com||cur.length>=9){out.push({ks:cur,pause:(end?750:com?420:S.wordMode?380:220)*S.pauseMul});cur=[];}});
  if(cur.length)out.push({ks:cur,pause:0});return out;}
/* read every .kwline inside el (German and/or English), lighting up each word */
async function speakEl(el,opt={}){
  if(!el||!HAS_TTS||(!S.voice&&!opt.force))return;
  const lines=el.classList&&el.classList.contains("kwline")?[el]:[...el.querySelectorAll(".kwline")];
  if(!opt.keep)stopSpeech();const my=speakSeq;
  for(const line of lines){
    const lang=line.dataset.lang||"de";if(lang==="en")continue;
    const ws=[...line.querySelectorAll(".kw")].filter(w=>w.dataset.say);if(!ws.length)continue;
    const rate=opt.rate||S.rate;curWords=ws;
    const on=k=>{if(my!==speakSeq)return;ws.forEach(w=>w.classList.remove("on"));if(ws[k])ws[k].classList.add("on");};
    for(const ph of phrases(ws)){
      if(my!==speakSeq)return;
      const starts=[];let s="";ph.ks.forEach(k=>{starts.push(s.length);s+=ws[k].dataset.say+" ";});let got=false;
      await say1(s.trim(),rate,lang,
        e=>{if(e.name&&e.name!=="word")return;got=true;clearTimeout(hlTimer);let j=0;for(let i=0;i<starts.length;i++)if(starts[i]<=e.charIndex)j=i;on(ph.ks[j]);},
        ()=>{on(ph.ks[0]);let j=0;hlTimer=setTimeout(function st(){if(got||my!==speakSeq)return;on(ph.ks[j]);const len=ws[ph.ks[j]].dataset.say.length;j++;if(j<ph.ks.length)hlTimer=setTimeout(st,(260+len*80)/rate);},350);});
      clearTimeout(hlTimer);if(my!==speakSeq)return;if(ph.pause)await sleep(ph.pause);
    }
    if(my!==speakSeq)return;ws.forEach(w=>w.classList.remove("on"));await sleep(400*S.pauseMul);
  }
  if(my===speakSeq)clearHL();
}
/* tap any word to hear it; 🇬🇧 buttons read the English line */
document.addEventListener("click",e=>{
  const en=e.target.closest(".enbtn");if(en){const line=en.parentElement.querySelector('.kwline[data-lang="en"]');speakEl(line,{force:true,en:true});return;}
  const w=e.target.closest(".kw");if(!w||w.closest("button"))return;if(!w.dataset.say)return;
  const lang=(w.closest(".kwline")||{}).dataset?.lang||"de";
  const pr=speak(w.dataset.say,{force:true,lang,rate:Math.min(S.rate,.55)});w.classList.add("on");curWords=[w];pr.then(()=>w.classList.remove("on"));
});
/* a German line with its English helper underneath */
function bi(de,en,cls=""){return `<div class="bi ${cls}"><div class="de">${kwHtml(de,"de")}</div></div>`;}

/* ---------- sounds + confetti ---------- */
let AC=null;
function tone(freqs,dur=.12,type="sine"){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();let t=AC.currentTime;
  freqs.forEach(f=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.14,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+dur+.02);t+=dur*.8;});}catch(e){}}
const yay=()=>tone([523,659,784],.13),oops=()=>tone([300,220],.16,"triangle"),fanfare=()=>tone([523,659,784,1047],.16);
const fx=$("#fx"),ctx=fx.getContext("2d");let parts=[];
function confetti(n=120){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;fx.width=innerWidth;fx.height=innerHeight;const cs=["#FFC933","#E0443E","#2F5BEA","#1F9D63","#D6397E","#7C4DDB"];const st=!parts.length;
  for(let i=0;i<n;i++)parts.push({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*14,vy:Math.random()*-12-4,s:6+Math.random()*6,c:cs[i%cs.length],r:Math.random()*6,life:0});if(st)requestAnimationFrame(stepFx);}
function stepFx(){ctx.clearRect(0,0,fx.width,fx.height);parts.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;p.life++;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);ctx.restore();});
  parts=parts.filter(p=>p.y<fx.height+20&&p.life<240);if(parts.length)requestAnimationFrame(stepFx);else ctx.clearRect(0,0,fx.width,fx.height);}

/* ---------- 🐢 speed + voice panel ---------- */
function speedLabel(r){return r<=.45?"Super langsam":r<=.55?"Sehr langsam":r<=.68?"Langsam":r<=.82?"Mittel":"Normal";}
const PAUSES=[[0,"Keine"],[.6,"Kurz"],[1,"Mittel"],[1.7,"Lang"]];
function fillVoiceSelect(sel){const L=sel.dataset.lang;sel.innerHTML=VOICES[L].length?VOICES[L].map(v=>`<option value="${esc(v.name)}"${VOICE[L]&&v.name===VOICE[L].name?" selected":""}>${isNatural(v)?"⭐ ":""}${esc(v.name)}${FEMALE.test(v.name)?" ♀":""}</option>`).join(""):`<option>Standard</option>`;}
function openSpeed(){
  if($("#speedpop")){closeSpeed();return;}
  const d=document.createElement("div");d.id="speedpop";d.className="speedpop";d.setAttribute("role","dialog");d.setAttribute("aria-label","Tempo");
  d.innerHTML=`<div class="sphead"><b>🐢 Tempo &amp; Stimme</b><button class="iconbtn" id="spclose" aria-label="Schließen">✕</button></div>
    <label class="splbl" for="sprate">Sprechtempo: <b id="spval">${speedLabel(S.rate)}</b></label>
    <div class="sprow"><span>🐢</span><input type="range" id="sprate" min="40" max="95" step="5" value="${Math.round(S.rate*100)}"><span>🐇</span></div>
    <div class="splbl">Pausen</div>
    <div class="seg" id="sppause">${PAUSES.map(([v,l])=>`<button data-v="${v}" class="${Math.abs(S.pauseMul-v)<.01?"on":""}">${l}</button>`).join("")}</div>
    <label class="sptoggle"><input type="checkbox" id="spword" ${S.wordMode?"checked":""}> Wort für Wort</label>
    <div class="vrow"><label for="vde">🇩🇪 Stimme</label><select id="vde" class="voicesel" data-lang="de"></select></div>
    <div class="sptry"><button class="btn" id="sptest">▶ Probieren</button><div id="sptestt">${bi("Acht plus fünf gleich dreizehn.")}</div></div>
    <details class="vhelp"><summary>Schönere Stimme</summary><ul>
      <li><b>Windows:</b> Öffne die App in <b>Microsoft Edge</b> und wähle „⭐ Microsoft Katja Online (Natural)“.</li>
      <li><b>iPhone / iPad:</b> Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Deutsch → eine Premium-Stimme laden (z. B. Anna).</li>
      <li><b>Mac:</b> Systemeinstellungen → Bedienungshilfen → Gesprochene Inhalte → Systemstimme → Stimmen verwalten → Deutsch → Anna (Premium).</li>
      <li><b>Android:</b> Einstellungen → Sprachausgabe → Google → Sprachdaten installieren → Deutsch (Deutschland).</li></ul></details>`;
  document.body.appendChild(d);document.querySelectorAll(".voicesel").forEach(fillVoiceSelect);
  const test=()=>speakEl($("#sptestt"),{force:true});
  $("#spclose").onclick=closeSpeed;
  const r=$("#sprate");r.oninput=()=>{S.rate=+r.value/100;$("#spval").textContent=speedLabel(S.rate);};r.onchange=()=>{save();test();};
  d.querySelectorAll("#sppause button").forEach(b=>b.onclick=()=>{S.pauseMul=+b.dataset.v;save();d.querySelectorAll("#sppause button").forEach(x=>x.classList.toggle("on",x===b));test();});
  $("#spword").onchange=e=>{S.wordMode=e.target.checked;save();test();};
  if($("#spen"))$("#spen").onchange=e=>{S.readEn=e.target.checked;save();};
  d.querySelectorAll(".voicesel").forEach(sel=>sel.onchange=()=>{const L=sel.dataset.lang;if(L==="de")S.voiceDe=sel.value;else S.voiceEn=sel.value;save();VOICE[L]=VOICES[L].find(v=>v.name===sel.value)||VOICE[L];test();});
  $("#sptest").onclick=test;
}
function closeSpeed(){const d=$("#speedpop");if(d)d.remove();}
$("#speedbtn").onclick=openSpeed;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSpeed();});
$("#sound").textContent=S.voice?"🔊":"🔈";
$("#sound").onclick=()=>{S.voice=!S.voice;save();$("#sound").textContent=S.voice?"🔊":"🔈";if(!S.voice)stopSpeech();};
