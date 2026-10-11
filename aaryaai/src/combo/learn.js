/* ============================ 📋 LERNPLAN: think · read · write before play ============================
   PLAN   – daily plan (read a story, build words, write a sentence in the notebook, one maths round); games unlock afterwards
   GUARD  – anti-guessing: answers appear after a short reading pause, fast wrong taps slow the next question down
   KP     – keypad: maths answers are typed, not picked
   READ   – short texts (Deutsch / English): read aloud first, then questions that need a look back into the text
   SPELL  – hear + see a picture, build the word from letter tiles, wrong words are corrected (Berichtigung)
   WRITE  – one picture prompt a day: write a whole sentence in the notebook, Mum/Dad checks it with a checklist */
const PLAN=(function(){
  const KEY="aarya-plan-v1";
  let P={opt:{gate:true,pause:true,type:true},days:{},readDone:{de:[],en:[]},spos:{de:0,en:0},wlog:{}};
  try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&typeof s==="object"){P=Object.assign(P,s);P.opt=Object.assign({gate:true,pause:true,type:true},s.opt||{});
    P.readDone=Object.assign({de:[],en:[]},s.readDone||{});P.spos=Object.assign({de:0,en:0},s.spos||{});P.days=s.days&&typeof s.days==="object"?s.days:{};P.wlog=s.wlog&&typeof s.wlog==="object"?s.wlog:{};}}catch(e){}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P));}catch(e){}};
  const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
  const dayNo=()=>Math.floor((new Date(today()+"T12:00:00")).getTime()/864e5);
  const ITEMS=["read","spell","write","math"];
  function day(){const t=today();if(!P.days[t])P.days[t]={};const ks=Object.keys(P.days).sort();if(ks.length>60){for(const k of ks.slice(0,ks.length-60))delete P.days[k];}return P.days[t];}
  const complete=()=>ITEMS.every(k=>day()[k]);
  function done(k){const d=day();if(d[k])return;d[k]=Date.now();save();
    if(complete()){try{REW.hit("bonus","plan");REW.toast(T("📋 Lernplan geschafft! +5 · Spiele sind jetzt frei 🎉","📋 Learning plan done! +5 · games are unlocked now 🎉"));gConfetti(140);}catch(e){}}
    refresh();}
  function refresh(){document.body.classList.toggle("gated",!!P.opt.gate&&!complete());try{if(typeof CUR!=="undefined"&&CUR==="today")renderToday();}catch(e){}}
  const opt=k=>!!P.opt[k];
  function setOpt(k,v){P.opt[k]=!!v;save();refresh();}
  /* games = memory / right-or-silly / blitz in the subjects, brain games and the workout in Training (movement breaks stay free) */
  const GATESEL="#appE .mode[data-m=memory],#appE .mode[data-m=silly],#appM .mode[data-m=memory],#appM .mode[data-m=rw],#appM .mode[data-m=blitz],#appD .mode[data-m=memory],#appD .mode[data-m=rw],#appD .mode[data-m=blitz],#vBrain .bcard:not([data-g=mov]),#vBrain #wo";
  document.addEventListener("click",e=>{if(!document.body.classList.contains("gated"))return;const el=e.target.closest&&e.target.closest(GATESEL);if(!el)return;
    e.preventDefault();e.stopPropagation();const inEn=!!el.closest("#appE");
    try{REW.toast(inEn?"🔒 First finish today's learning plan 📋":T("🔒 Erst den Lernplan von heute schaffen 📋","🔒 First finish today's learning plan 📋"));}catch(_){}
    setTimeout(()=>{try{show("today");}catch(_){}},900);},true);
  function card(){const d=day(),wl=WRITE.langToday();
    const row=(k,emo,de,en,sde,sen)=>`<button class="block lprow${d[k]?" done":""}" data-p="${k}"><span class="emo">${d[k]?"✅":emo}</span><span><b>${T(de,en)}</b><small>${T(sde,sen)}</small></span><span class="go2">${d[k]?"✓":"▶"}</span></button>`;
    const n=ITEMS.filter(k=>d[k]).length;
    return `<div class="panel lplan${complete()?" alldone":""}"><div class="lbl">📋 ${T("Mein Lernplan heute","My learning plan today")} <span class="lpn">${n}/4</span></div>
      ${row("read","📖","Lesen & verstehen","Read & understand","Eine Geschichte laut lesen, dann Fragen beantworten","Read a story out loud, then answer questions")}
      ${row("spell","🔤","Wörter schreiben","Spell words","Wörter aus Buchstaben bauen","Build words from letters")}
      ${row("write","✏️","Heft-Satz","Notebook sentence",wl==="en"?"Einen englischen Satz ins Heft schreiben":"Einen Satz ins Heft schreiben",wl==="en"?"Write an English sentence in your notebook":"Write a sentence in your notebook")}
      ${row("math","🧮","Rechnen","Maths","Eine Runde Mathe üben – Antwort selbst eintippen","One maths round – type the answer yourself")}
      <p class="lpfoot">${complete()?T("🎉 Alles geschafft! Spiele sind frei.","🎉 All done! Games are unlocked."):P.opt.gate?T("🔒 Memory, Blitz und die Gehirn-Spiele gehen auf, wenn alles geschafft ist.","🔒 Memory, Blitz and the brain games unlock when everything is done."):T("Erst lernen, dann spielen!","Learn first, then play!")}</p></div>`;}
  function wire(root){root.querySelectorAll(".lprow").forEach(b=>b.onclick=()=>{const k=b.dataset.p;
    if(k==="read")READ.open("de");else if(k==="spell")SPELL.open("de");else if(k==="write")WRITE.open();else{show("math");}});}
  const R=()=>P;
  setTimeout(refresh,0);
  return {done,complete,day,opt,setOpt,card,wire,refresh,R,save,today,dayNo,ITEMS,KEY};
})();

/* ---------- 👀 GUARD: read first, then answer ---------- */
const GUARD=(function(){
  let tEn=0,streak=0,boost=1;
  const HINT={de:"👀 Erst lesen …",en:"👀 Read first …",hi:"👀 पहले पढ़ो …",mr:"👀 आधी वाच …"};
  const SLOW={de:"🐢 Langsam! Lies die Aufgabe genau, dann tippe.",en:"🐢 Slow down! Read the question, then tap.",hi:"🐢 धीरे! पहले सवाल पढ़ो, फिर चुनो।",mr:"🐢 हळू! आधी प्रश्न वाच, मग निवड."};
  const on=()=>window.__forcePause||(PLAN.opt("pause")&&!navigator.webdriver);
  function arm(box,text,lang){if(!box||!on())return;const btns=[...box.querySelectorAll("button")];if(!btns.length)return;
    const len=String(text||"").replace(/<[^>]+>/g,"").length,ms=Math.round(Math.max(1000,Math.min(3000,len*40))*boost);boost=1;
    box.classList.add("gwait");btns.forEach(b=>{b.disabled=true;b.dataset.gw="1";});
    const h=document.createElement("div");h.className="ghint";h.textContent=HINT[lang]||HINT.de;box.before(h);
    setTimeout(()=>{h.remove();box.classList.remove("gwait");const answered=box.querySelector(".right,.wrong");btns.forEach(b=>{if(b.dataset.gw){delete b.dataset.gw;if(!answered)b.disabled=false;}});tEn=Date.now();},ms);}
  function after(ok,lang){if(!on())return false;const quick=Date.now()-tEn<1300;
    if(ok){streak=0;return false;}if(quick)streak++;else streak=0;
    if(streak>=2){streak=0;boost=2.2;try{REW.toast(SLOW[lang]||SLOW.de);}catch(e){}return true;}return false;}
  return {arm,after,on};
})();

/* ---------- 🔢 KP: type the number ---------- */
const KP={attach(box,opts,q){
  if(!box||!PLAN.opt("type")||!opts||!opts.length||!opts.every(o=>/^\d{1,3}$/.test(String(o))))return false;
  box.style.display="none";const kp=document.createElement("div");kp.className="kp";
  kp.innerHTML=`<div class="kpd" aria-live="polite"><span class="kpv"></span><i>?</i></div><div class="kpg">${[1,2,3,4,5,6,7,8,9].map(n=>`<button class="kpk" data-k="${n}">${n}</button>`).join("")}<button class="kpk kpdel" data-k="del" aria-label="⌫">⌫</button><button class="kpk" data-k="0">0</button><button class="kpk kpok" data-k="ok" aria-label="OK" disabled>✓</button></div>`;
  box.after(kp);let v="";const disp=kp.querySelector(".kpv"),okb=kp.querySelector(".kpok");
  const upd=()=>{disp.textContent=v;kp.querySelector(".kpd i").style.display=v?"none":"";okb.disabled=!v;};
  const submit=()=>{if(!v)return;const btns=[...box.querySelectorAll(".opt")];let b=btns.find(x=>x.dataset.o===v);
    if(!b){b=btns.find(x=>x.dataset.o!==String(opts[0]));if(!b)return;b.dataset.o=v;b.textContent=v;}
    kp.querySelectorAll("button").forEach(x=>x.disabled=true);kp.classList.add("used");document.removeEventListener("keydown",key);box.style.display="";b.click();};
  const press=k=>{if(kp.classList.contains("used"))return;if(k==="del")v=v.slice(0,-1);else if(k==="ok")return submit();else if(v.length<3)v=(v==="0"?"":v)+k;upd();};
  kp.querySelectorAll(".kpk").forEach(b=>b.onclick=()=>press(b.dataset.k));
  const key=e=>{if(!document.body.contains(kp)){document.removeEventListener("keydown",key);return;}if(/^\d$/.test(e.key))press(e.key);else if(e.key==="Backspace")press("del");else if(e.key==="Enter")press("ok");};
  document.addEventListener("keydown",key);upd();return true;}};

/* ---------- shared overlay ---------- */
const LX=(function(){
  let prevL=null;const box=()=>document.getElementById("learnx");
  function say(lang,t){try{return lang==="en"?EN.speak(t,{force:true}):DE.speak(t,{lang:"de",force:true});}catch(e){return Promise.resolve();}}
  function hush(){try{EN.stopSpeech();DE.stopSpeech();}catch(e){}}
  function frame(lang,title,inner){const b=box();if(!prevL)prevL=UIL.cur;UIL.set(lang);b.hidden=false;document.body.classList.add("nbopen");
    b.innerHTML=`<div class="nbtop"><b>${title}</b><button class="nbx" id="lxClose" aria-label="${T("Schließen","Close")}">✖</button></div><div class="nbbody">${inner}</div>`;
    b.querySelector("#lxClose").onclick=close;b.scrollTop=0;}
  function close(){hush();const b=box();b.hidden=true;b.innerHTML="";if(prevL){UIL.set(prevL);prevL=null;}document.body.classList.remove("nbopen");try{if(CUR==="today")renderToday();renderGbar();}catch(e){}}
  const $=s=>box().querySelector(s),$$=s=>[...box().querySelectorAll(s)];
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const stars=n=>`<div class="bigstars">${[0,1,2].map(k=>`<span class="${k<n?"":"off"}">⭐</span>`).join("")}</div>`;
  return {say,hush,frame,close,$,$$,shuffle,stars,box,E:s=>AAI.esc(s)};
})();

/* ---------- 📖 READ: read aloud, then answer with a look back into the text ---------- */
const READ=(function(){
  /* [id, level, emoji, title, lines, questions [question, right, wrong, wrong, line index]] – easy → harder */
  const TX={de:[
   ["bello",0,"🐶","Der Hund Bello",["Bello ist ein Hund.","Er ist braun und klein.","Bello spielt gern mit dem Ball.","Am Abend schläft er in seinem Korb."],
    [["Wie heißt der Hund?","Bello","Bruno","Max",0],["Welche Farbe hat Bello?","braun","schwarz","weiß",1],["Womit spielt Bello gern?","mit dem Ball","mit der Katze","mit dem Stock",2],["Wo schläft Bello?","im Korb","im Bett","im Garten",3]]],
   ["garten",0,"🌻","Im Garten",["Mia ist im Garten.","Sie gießt die Blumen.","Die Sonne scheint.","Ein Vogel singt im Baum."],
    [["Wer ist im Garten?","Mia","Tom","Oma",0],["Was gießt Mia?","die Blumen","den Baum","den Hund",1],["Wie ist das Wetter?","Die Sonne scheint.","Es regnet.","Es schneit.",2],["Wo singt der Vogel?","im Baum","auf dem Dach","im Haus",3]]],
   ["apfel",0,"🍎","Der Apfel",["Tim hat einen roten Apfel.","Der Apfel ist süß.","Tim teilt den Apfel mit Lea.","Jetzt haben beide eine Hälfte."],
    [["Welche Farbe hat der Apfel?","rot","grün","gelb",0],["Wie schmeckt der Apfel?","süß","sauer","salzig",1],["Mit wem teilt Tim den Apfel?","mit Lea","mit Mama","mit Ben",2]]],
   ["regen",0,"🌧️","Regen",["Es regnet.","Paul zieht seine Gummistiefel an.","Er springt in eine Pfütze.","Platsch! Seine Hose ist nass."],
    [["Wie ist das Wetter?","Es regnet.","Die Sonne scheint.","Es schneit.",0],["Was zieht Paul an?","Gummistiefel","Sandalen","Hausschuhe",1],["Wohin springt Paul?","in eine Pfütze","in den Sand","ins Bett",2],["Was ist nass?","die Hose","die Mütze","der Hund",3]]],
   ["turnen",1,"🤸","Turnen",["Heute ist Turnen.","Lena macht eine Rolle auf der Matte.","Dann springt sie über den Kasten.","Lena ist stolz."],
    [["Was macht Lena auf der Matte?","eine Rolle","einen Kuchen","ein Bild",1],["Worüber springt Lena?","über den Kasten","über den Ball","über den Hund",2],["Wie fühlt sich Lena?","stolz","traurig","müde",3]]],
   ["geburtstag",1,"🎂","Geburtstag",["Heute hat Ben Geburtstag.","Er wird sieben Jahre alt.","Oma backt einen Schokokuchen.","Ben bekommt ein rotes Fahrrad."],
    [["Wer hat Geburtstag?","Ben","Oma","Tim",0],["Wie alt wird Ben?","sieben","sechs","acht",1],["Was backt Oma?","einen Schokokuchen","ein Brot","Kekse",2],["Was bekommt Ben?","ein Fahrrad","einen Ball","ein Buch",3]]],
   ["schulweg",1,"🚦","Der Schulweg",["Anna geht zur Schule.","An der Ampel wartet sie.","Die Ampel ist rot.","Bei Grün geht Anna über die Straße."],
    [["Wohin geht Anna?","zur Schule","zum Bäcker","in den Park",0],["Wo wartet Anna?","an der Ampel","am Bus","an der Tür",1],["Wann geht Anna über die Straße?","bei Grün","bei Rot","bei Gelb",3]]],
   ["mimi",1,"🐱","Die Katze Mimi",["Mimi ist eine kleine Katze.","Sie hat ein weiches Fell.","Am Morgen trinkt sie Milch.","Dann klettert sie auf den Baum.","Abends schläft sie auf dem Sofa."],
    [["Was trinkt Mimi am Morgen?","Milch","Saft","Tee",2],["Wohin klettert Mimi?","auf den Baum","auf das Dach","auf den Tisch",3],["Wo schläft Mimi abends?","auf dem Sofa","im Korb","im Garten",4]]],
   ["schnee",2,"⛄","Schnee",["Im Winter liegt viel Schnee.","Mila und Jonas bauen einen Schneemann.","Er bekommt eine Karotte als Nase.","Jonas holt noch einen Schal."],
    [["Wann liegt viel Schnee?","im Winter","im Sommer","im Herbst",0],["Was bauen die Kinder?","einen Schneemann","ein Haus","eine Burg",1],["Was ist die Nase?","eine Karotte","ein Stein","ein Apfel",2],["Was holt Jonas?","einen Schal","eine Mütze","Handschuhe",3]]],
   ["zoo",2,"🦒","Im Zoo",["Familie Kaya fährt in den Zoo.","Zuerst sehen sie die Giraffen.","Die Giraffen fressen Blätter von den Bäumen.","Danach gehen sie zu den Affen.","Ein Affe isst eine Banane."],
    [["Was sehen sie zuerst?","die Giraffen","die Affen","die Löwen",1],["Was fressen die Giraffen?","Blätter","Fleisch","Bananen",2],["Was isst der Affe?","eine Banane","einen Apfel","ein Brot",4]]]],
  en:[
   ["cat",0,"🐱","My Cat",["I have a cat.","My cat is black.","She likes milk.","She sleeps on my bed."],
    [["What colour is the cat?","black","white","brown",1],["What does the cat like?","milk","juice","water",2],["Where does she sleep?","on my bed","in the garden","on the sofa",3]]],
   ["park",0,"🌳","In the Park",["Tom is in the park.","He has a red ball.","He plays with his dog.","They run and jump."],
    [["Where is Tom?","in the park","at school","at home",0],["What colour is the ball?","red","blue","green",1],["Who does Tom play with?","his dog","his sister","his cat",2]]],
   ["frog",0,"🐸","The Frog",["A little frog lives in a pond.","He is green.","He can jump very high.","He eats flies."],
    [["Where does the frog live?","in a pond","in a tree","in a house",0],["What colour is the frog?","green","brown","yellow",1],["What does he eat?","flies","fish","leaves",3]]],
   ["breakfast",1,"🥣","Breakfast",["It is morning.","Anna eats bread with jam.","She drinks a glass of milk.","Then she goes to school."],
    [["What does Anna eat?","bread with jam","an apple","cake",1],["What does she drink?","milk","tea","juice",2],["Where does she go then?","to school","to the park","to bed",3]]],
   ["gym",1,"🤸","Gym Class",["Today we have gym.","I do a cartwheel.","My friend jumps on the trampoline.","Gym is fun!"],
    [["What do I do?","a cartwheel","a drawing","a song",1],["Where does my friend jump?","on the trampoline","on the bed","on the table",2]]],
   ["rain",1,"☔","A Rainy Day",["It is raining.","Lily takes her umbrella.","Her boots are yellow.","She jumps in the puddles."],
    [["What does Lily take?","her umbrella","her ball","her hat",1],["What colour are her boots?","yellow","red","blue",2],["Where does she jump?","in the puddles","in the sand","on the bed",3]]],
   ["beach",2,"🏖️","At the Beach",["It is hot and sunny.","Ben and Mia are at the beach.","They build a sandcastle.","Then they swim in the sea."],
    [["What is the weather like?","hot and sunny","cold","rainy",0],["What do they build?","a sandcastle","a house","a boat",2],["Where do they swim?","in the sea","in a pool","in a lake",3]]],
   ["family",2,"👨‍👩‍👧","My Family",["This is my family.","My mum is a teacher.","My dad likes cooking.","I have a baby brother."],
    [["What is mum?","a teacher","a doctor","a cook",1],["What does dad like?","cooking","running","reading",2],["Who is the baby?","my brother","my sister","my cousin",3]]]]};
  const UI={de:{title:"📖 Lesen & verstehen",read:"Lies die Geschichte laut vor.",readS:"Zeig mit dem Finger mit. Lies langsam und deutlich.",did:"✅ Fertig vorgelesen",wait:"Lies in Ruhe …",hear:"🔊 Jetzt anhören und vergleichen",toQ:"Zu den Fragen ▶",q:"Frage",of:"von",look:"👀 Schau im Text nach! Die Antwort steht im gelben Satz.",right:"Richtig!",next:"Weiter ▶",done:"Fertig!",again:"Nächste Geschichte 🔁",close:"Schließen",score:"{r} von {n} beim ersten Versuch richtig",all:"Du hast alle Geschichten gelesen! Wir fangen wieder von vorn an."},
           en:{title:"📖 Read & understand",read:"Read the story out loud.",readS:"Follow with your finger. Read slowly and clearly.",did:"✅ I read it out loud",wait:"Take your time …",hear:"🔊 Now listen and compare",toQ:"To the questions ▶",q:"Question",of:"of",look:"👀 Look in the text! The answer is in the yellow sentence.",right:"Right!",next:"Next ▶",done:"Done!",again:"Next story 🔁",close:"Close",score:"{r} of {n} right on the first try",all:"You have read every story! Let's start again."}};
  let S=null;
  function pickText(lang){const lv=(()=>{try{return PROF.view(lang);}catch(e){return 1;}})(),all=TX[lang],P=PLAN.R(),dn=P.readDone[lang]||(P.readDone[lang]=[]);
    let pool=all.filter(t=>t[1]<=lv&&!dn.includes(t[0]));if(!pool.length)pool=all.filter(t=>!dn.includes(t[0]));
    if(!pool.length){P.readDone[lang]=[];PLAN.save();pool=all.filter(t=>t[1]<=lv);if(!pool.length)pool=all;}return pool[0];}
  function open(lang,id){lang=lang==="en"?"en":"de";const t=id?TX[lang].find(x=>x[0]===id):pickText(lang);S={lang,t,first:0,qi:0,u:UI[lang],t0:Date.now()};readStep();}
  const textBox=(t,cls)=>`<div class="rdtext ${cls||""}"><div class="rdemo">${t[2]}</div><h3>${LX.E(t[3])}</h3>${t[4].map((l,i)=>`<p data-i="${i}">${LX.E(l)}</p>`).join("")}</div>`;
  function readStep(){const {t,u,lang}=S;const words=t[4].join(" ").split(/\s+/).length,need=window.__fastRead?0:Math.max(4,Math.round(words*0.55));
    LX.frame(lang,u.title,`<p class="lxtask">📢 <b>${u.read}</b><br><small>${u.readS}</small></p>${textBox(t,"big")}
      <div class="lxwait"><i id="rdbar"></i></div><div class="row center"><button class="btn" id="rdDid" disabled>${u.wait}</button></div>
      <div class="row center"><button class="btn ghost" id="rdHear" hidden>${u.hear}</button><button class="btn" id="rdQ" hidden>${u.toQ}</button></div>`);
    const t0=Date.now(),bar=LX.$("#rdbar"),did=LX.$("#rdDid");
    const iv=setInterval(()=>{if(!LX.$("#rdbar")){clearInterval(iv);return;}const p=Math.min(1,(Date.now()-t0)/(need*1000||1));bar.style.width=Math.round(p*100)+"%";if(p>=1){clearInterval(iv);did.disabled=false;did.textContent=u.did;}},200);
    did.onclick=()=>{clearInterval(iv);did.hidden=true;LX.$(".lxwait").hidden=true;try{REW.hit(lang,"read");}catch(e){}LX.$("#rdHear").hidden=false;LX.$("#rdQ").hidden=false;};
    LX.$("#rdHear").onclick=async()=>{LX.hush();for(const p of LX.$$(".rdtext p")){p.classList.add("on");await LX.say(lang,p.textContent);p.classList.remove("on");if(!LX.$("#rdHear"))return;}};
    LX.$("#rdQ").onclick=()=>{LX.hush();ask();};}
  function ask(){const {t,u,lang}=S;if(S.qi>=t[5].length)return result();const q=t[5][S.qi];let tries=0;
    LX.frame(lang,u.title,`${textBox(t,"small")}<div class="panel lxq"><div class="qmeta"><span>${u.q} ${S.qi+1} ${u.of} ${t[5].length}</span><span>✔ ${S.first}</span></div>
      <div class="q"><button class="spk" id="rqHear" aria-label="🔊">🔊</button><div id="rqt">${LX.E(q[0])}</div></div>
      <div class="opts" id="rqo">${LX.shuffle([q[1],q[2],q[3]]).map(o=>`<button class="opt" data-o="${LX.E(o)}">${LX.E(o)}</button>`).join("")}</div>
      <div class="feedback" id="rqfb"></div><div class="row"><button class="btn" id="rqNext" hidden>${u.next}</button></div></div>`);
    LX.$("#rqHear").onclick=()=>LX.say(lang,q[0]);LX.say(lang,q[0]);GUARD.arm(LX.$("#rqo"),q[0],lang);
    LX.$$("#rqo .opt").forEach(b=>b.onclick=()=>{const ok=b.dataset.o===q[1];tries++;GUARD.after(ok,lang);LX.$$(".rdtext p").forEach(p=>p.classList.remove("look"));
      if(ok){b.classList.add("right");LX.$$("#rqo .opt").forEach(x=>x.disabled=true);if(tries===1){S.first++;try{REW.hit(lang,"correct");}catch(e){}}
        const fb=LX.$("#rqfb");fb.className="feedback ok";fb.textContent="🎉 "+u.right;LX.$(`.rdtext p[data-i="${q[4]}"]`)?.classList.add("found");LX.$("#rqNext").hidden=false;LX.say(lang,u.right);}
      else{b.classList.add("wrong");b.disabled=true;if(tries===1){try{REW.hit(lang,"wrong");}catch(e){}}const fb=LX.$("#rqfb");fb.className="feedback no";fb.textContent=u.look;
        const line=LX.$(`.rdtext p[data-i="${q[4]}"]`);if(line){line.classList.add("look");line.scrollIntoView({behavior:"smooth",block:"center"});}}});
    LX.$("#rqNext").onclick=()=>{S.qi++;ask();};}
  function result(){const {t,u,lang}=S,n=t[5].length,st=S.first>=n?3:S.first>=n-1?2:S.first>=1?1:0;
    try{REW.hit(lang,"round",st);}catch(e){}const P=PLAN.R();(P.readDone[lang]=P.readDone[lang]||[]).includes(t[0])||P.readDone[lang].push(t[0]);PLAN.save();PLAN.done("read");
    LX.frame(lang,u.title,`<div class="panel result">${LX.stars(st)}<h3>${u.done}</h3><p>${u.score.replace("{r}",S.first).replace("{n}",n)}</p>
      <div class="row center"><button class="btn" id="rdAgain">${u.again}</button><button class="btn ghost" id="rdClose">${u.close}</button></div></div>`);
    LX.$("#rdAgain").onclick=()=>open(lang);LX.$("#rdClose").onclick=LX.close;if(st>=2)try{gConfetti(100);}catch(e){}}
  return {open,TX,S:()=>S};
})();

/* ---------- 🔤 SPELL: build the word from letter tiles ---------- */
const SPELL=(function(){
  /* [word, emoji, article] – easy → harder; German nouns keep their capital letter */
  const W={de:[[["Ei","🥚","das"],["Uhr","⌚","die"],["Oma","👵","die"],["Opa","👴","der"],["Eis","🍦","das"],["Kuh","🐮","die"],["Hund","🐶","der"],["Maus","🐭","die"],["Ball","⚽","der"],["Haus","🏠","das"],["Baum","🌳","der"],["Mond","🌙","der"],["Hase","🐰","der"],["Nase","👃","die"],["Rose","🌹","die"],["Igel","🦔","der"],["Buch","📖","das"],["Brot","🍞","das"],["Ente","🦆","die"],["Auto","🚗","das"]],
             [["Katze","🐱","die"],["Sonne","☀️","die"],["Blume","🌸","die"],["Apfel","🍎","der"],["Fisch","🐟","der"],["Vogel","🐦","der"],["Tiger","🐯","der"],["Zebra","🦓","das"],["Pferd","🐴","das"],["Stern","⭐","der"],["Schiff","🚢","das"],["Banane","🍌","die"],["Tomate","🍅","die"],["Löwe","🦁","der"],["Hand","✋","die"],["Bett","🛏️","das"]],
             [["Schwein","🐷","das"],["Giraffe","🦒","die"],["Elefant","🐘","der"],["Pinguin","🐧","der"],["Krokodil","🐊","das"],["Fahrrad","🚲","das"],["Flugzeug","✈️","das"],["Ananas","🍍","die"],["Schnecke","🐌","die"],["Kuchen","🍰","der"]]],
           en:[[["cat","🐱"],["dog","🐶"],["sun","☀️"],["bus","🚌"],["hat","🎩"],["pig","🐷"],["cup","☕"],["bed","🛏️"],["egg","🥚"],["fish","🐟"],["cow","🐮"],["box","📦"]],
             [["apple","🍎"],["house","🏠"],["tree","🌳"],["ball","⚽"],["frog","🐸"],["duck","🦆"],["book","📖"],["star","⭐"],["cake","🍰"],["milk","🥛"],["moon","🌙"],["bird","🐦"]],
             [["horse","🐴"],["mouse","🐭"],["train","🚆"],["chair","🪑"],["flower","🌸"],["rabbit","🐰"],["banana","🍌"],["pencil","✏️"],["snake","🐍"],["sheep","🐑"]]]};
  const UI={de:{title:"🔤 Wörter schreiben",task:"Hör gut zu und bau das Wort.",check:"✓ Prüfen",del:"⌫",ok:"Richtig geschrieben!",wrong:"So schreibt man es:",fix:"Jetzt du – bau es noch einmal richtig.",fixed:"Super verbessert! +2",next:"Weiter ▶",done:"Fertig!",again:"Noch eine Runde 🔁",close:"Schließen",score:"{r} von {n} Wörtern beim ersten Versuch richtig",w:"Wort"},
           en:{title:"🔤 Spell words",task:"Listen carefully and build the word.",check:"✓ Check",del:"⌫",ok:"Spelled right!",wrong:"This is how you spell it:",fix:"Your turn – build it again.",fixed:"Well corrected! +2",next:"Next ▶",done:"Done!",again:"Another round 🔁",close:"Close",score:"{r} of {n} words right on the first try",w:"Word"}};
  const ABC={de:"abdefghiklmnoprstuz",en:"abcdefghilmnoprstuw"};
  let S=null;const N=6;
  function words(lang){const lv=(()=>{try{return PROF.view(lang);}catch(e){return 1;}})();const L=W[lang];return lv<=0?L[0]:lv===1?L[0].slice(Math.floor(L[0].length/2)).concat(L[1]):L[1].concat(L[2]);}
  function open(lang){lang=lang==="en"?"en":"de";const pool=words(lang),P=PLAN.R(),p0=(P.spos[lang]||0)%pool.length,list=[];
    for(let k=0;k<Math.min(N,pool.length);k++)list.push(pool[(p0+k)%pool.length]);P.spos[lang]=(p0+list.length)%pool.length;PLAN.save();
    S={lang,list,i:0,first:0,u:UI[lang]};word();}
  function word(){const {lang,u}=S;if(S.i>=S.list.length)return result();const w=S.list[S.i],chars=[...w[0]];let fix=false,tries=0;
    const extra=[];const pool=[...ABC[lang]].filter(c=>!chars.map(x=>x.toLowerCase()).includes(c));while(extra.length<2&&pool.length)extra.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
    const tiles=LX.shuffle(chars.concat(extra));
    LX.frame(lang,u.title,`<div class="panel spl"><div class="qmeta"><span>${u.w} ${S.i+1} / ${S.list.length}</span><span>✔ ${S.first}</span></div>
      <p class="lxtask">${u.task}</p><div class="splpic"><span>${w[1]}</span><button class="spk" id="spHear" aria-label="🔊">🔊</button></div>${w[2]?`<p class="splart">${w[2]} …</p>`:""}
      <div class="splslots" id="spSlots">${chars.map((_,k)=>`<button class="slot" data-k="${k}"></button>`).join("")}</div>
      <div class="spltiles" id="spTiles">${tiles.map((c,k)=>`<button class="tile" data-t="${k}">${LX.E(c)}</button>`).join("")}</div>
      <div class="feedback" id="spfb"></div><div class="row center"><button class="btn ghost" id="spDel">${u.del}</button><button class="btn" id="spChk" disabled>${u.check}</button><button class="btn" id="spNext" hidden>${u.next}</button></div></div>`);
    const hear=()=>LX.say(lang,(w[2]?w[2]+" ":"")+w[0]);LX.$("#spHear").onclick=hear;setTimeout(()=>S&&LX.$("#spHear")&&hear(),200);
    const filled=()=>LX.$$("#spSlots .slot").map(s=>s.dataset.c||"");
    const upd=()=>{const f=filled();LX.$("#spChk").disabled=f.some(x=>!x);};
    LX.$$("#spTiles .tile").forEach(t=>t.onclick=()=>{const s=LX.$$("#spSlots .slot").find(x=>!x.dataset.c);if(!s||t.disabled)return;s.dataset.c=t.textContent;s.dataset.t=t.dataset.t;s.textContent=t.textContent;t.disabled=true;upd();});
    const unfill=s=>{if(!s||!s.dataset.c)return;const t=LX.$(`#spTiles .tile[data-t="${s.dataset.t}"]`);if(t)t.disabled=false;delete s.dataset.c;delete s.dataset.t;s.textContent="";s.classList.remove("bad","good");upd();};
    LX.$$("#spSlots .slot").forEach(s=>s.onclick=()=>unfill(s));
    LX.$("#spDel").onclick=()=>{const f=LX.$$("#spSlots .slot").filter(x=>x.dataset.c);unfill(f[f.length-1]);};
    LX.$("#spChk").onclick=()=>{const got=filled().join(""),ok=got===w[0];tries++;const fb=LX.$("#spfb");
      if(ok){LX.$$("#spSlots .slot").forEach(s=>{s.classList.add("good");s.disabled=true;});LX.$$("#spTiles .tile,#spDel,#spChk").forEach(x=>x.disabled=true);
        if(fix){try{REW.hit(lang,"fix");}catch(e){}fb.className="feedback ok";fb.textContent="🎉 "+u.fixed;}
        else{if(tries===1){S.first++;try{REW.hit(lang,"correct");}catch(e){}}fb.className="feedback ok";fb.textContent="🎉 "+u.ok;}
        LX.$("#spChk").hidden=true;LX.$("#spNext").hidden=false;LX.say(lang,w[0]);}
      else{if(!fix){try{REW.hit(lang,"wrong");}catch(e){}}const f=filled();LX.$$("#spSlots .slot").forEach((s,k)=>s.classList.toggle("bad",f[k]!==chars[k]));
        fb.className="feedback no";fb.innerHTML=`${u.wrong} <b class="splmodel">${[...w[0]].map((c,k)=>`<span class="${f[k]===c?"":"diff"}">${LX.E(c)}</span>`).join("")}</b><br><small>${u.fix}</small>`;
        fix=true;LX.say(lang,w[0]);setTimeout(()=>{if(!LX.$("#spSlots"))return;LX.$$("#spSlots .slot").forEach(unfill);},1600);}};
    LX.$("#spNext").onclick=()=>{S.i++;word();};}
  function result(){const {lang,u}=S,n=S.list.length,st=S.first>=n?3:S.first>=n-2?2:S.first>=n/2?1:0;try{REW.hit(lang,"round",st);}catch(e){}PLAN.done("spell");
    LX.frame(lang,u.title,`<div class="panel result">${LX.stars(st)}<h3>${u.done}</h3><p>${u.score.replace("{r}",S.first).replace("{n}",n)}</p><p class="splall">${S.list.map(w=>w[1]+" "+LX.E(w[0])).join(" · ")}</p>
      <div class="row center"><button class="btn" id="spAgain">${u.again}</button><button class="btn ghost" id="spClose">${u.close}</button></div></div>`);
    LX.$("#spAgain").onclick=()=>open(lang);LX.$("#spClose").onclick=LX.close;if(st>=2)try{gConfetti(100);}catch(e){}}
  return {open,W,S:()=>S};
})();

/* ---------- ✏️ WRITE: one sentence a day in the notebook, Mum/Dad checks ---------- */
const WRITE=(function(){
  const PR={de:[["🐶⚽","Was macht der Hund?","Der Hund spielt mit dem Ball."],["🐱🥛","Was trinkt die Katze?","Die Katze trinkt Milch."],["👧🎨","Was macht das Mädchen?","Das Mädchen malt ein Bild."],
    ["☀️🌳","Wie ist das Wetter?","Die Sonne scheint."],["🍎🧺","Was ist im Korb?","Im Korb ist ein Apfel."],["🐟🌊","Wo schwimmt der Fisch?","Der Fisch schwimmt im Wasser."],["👦🚲","Was macht der Junge?","Der Junge fährt Fahrrad."],
    ["🐦🌳","Wo sitzt der Vogel?","Der Vogel sitzt auf dem Baum."],["🤸","Was machst du gern?","Ich turne gern."],["🎂🎁","Was gibt es beim Geburtstag?","Es gibt einen Kuchen."],["🌧️☂️","Was brauchst du bei Regen?","Ich brauche einen Schirm."],["🐘💧","Was macht der Elefant?","Der Elefant trinkt Wasser."]],
   en:[["🐶","I have a …","I have a dog."],["🍎","I like …","I like apples."],["⚽🔴","The ball is …","The ball is red."],["🐱","The cat is …","The cat is small."],["☀️","The sun is …","The sun is hot."],["🍕","I eat …","I eat pizza."],["🐸","The frog is …","The frog is green."],["🤸","I can …","I can jump."]]};
  const UI={de:{title:"✏️ Heft-Satz",task:"Schreib einen ganzen Satz in dein Heft.",help:"Wörter-Hilfe",rules:["Großer Anfangsbuchstabe","Lücken zwischen den Wörtern","Punkt am Ende"],did:"✏️ Ich habe geschrieben",wait:"Schreib in Ruhe …",
        parent:"👨‍👩‍👧 Mama/Papa: Schau ins Heft und hake ab",checks:["Großer Anfangsbuchstabe","Lücken zwischen den Wörtern","Punkt am Ende","Wörter richtig geschrieben","Schön geschrieben"],model:"Beispiel-Satz",ok:"✓ Geprüft",fix:"Verbessere die Fehler im Heft – dann ist es perfekt!",great:"Wunderbar geschrieben!",close:"Schließen",doneToday:"Heute schon geschrieben – toll! Morgen gibt es ein neues Bild.",again:"Noch einen Satz schreiben"},
           en:{title:"✏️ Notebook sentence",task:"Write the whole sentence in your notebook.",help:"Word help",rules:["Capital letter at the start","Spaces between words","Full stop at the end"],did:"✏️ I have written it",wait:"Take your time …",
        parent:"👨‍👩‍👧 Mum/Dad: look in the notebook and tick",checks:["Capital letter at the start","Spaces between words","Full stop at the end","Words spelled right","Neat handwriting"],model:"Example sentence",ok:"✓ Checked",fix:"Correct the mistakes in the notebook – then it's perfect!",great:"Beautifully written!",close:"Close",doneToday:"Already written today – great! Tomorrow there is a new picture.",again:"Write another sentence"}};
  const langToday=()=>PLAN.dayNo()%3===2?"en":"de";
  function open(lang,extra){lang=lang||langToday();const u=UI[lang],P=PLAN.R(),t=PLAN.today(),log=P.wlog[t];
    if(log&&!extra){LX.frame(lang,u.title,`<div class="panel result"><div class="wrbig">${PR[log.lang][log.idx][0]}</div><h3>✅</h3><p>${u.doneToday}</p><div class="row center"><button class="btn ghost" id="wrMore">${u.again}</button><button class="btn" id="wrClose">${u.close}</button></div></div>`);
      LX.$("#wrClose").onclick=LX.close;LX.$("#wrMore").onclick=()=>open(lang,true);return;}
    const idx=(PLAN.dayNo()+(extra?1+Math.floor(Math.random()*5):0))%PR[lang].length,p=PR[lang][idx],ws=LX.shuffle(p[2].replace(/[.!?]$/,"").split(" "));const need=window.__fastRead?0:20,t0=Date.now();
    LX.frame(lang,u.title,`<div class="wrbig">${p[0]}</div><p class="lxtask"><b>${LX.E(p[1])}</b> <button class="spk" id="wrHear" aria-label="🔊">🔊</button></p><p class="lxtask">📓 ${u.task}</p>
      <div class="wrhelp"><span>${u.help}:</span>${ws.map(w=>`<button class="wrw">${LX.E(w)}</button>`).join("")}</div>
      <ul class="wrrules">${u.rules.map(r=>`<li>${r}</li>`).join("")}</ul>
      <div class="lxwait"><i id="wrbar"></i></div><div class="row center"><button class="btn" id="wrDid" disabled>${u.wait}</button></div>`);
    LX.$("#wrHear").onclick=()=>LX.say(lang,p[1].replace("…",""));LX.say(lang,p[1].replace("…",""));LX.$$(".wrw").forEach(b=>b.onclick=()=>LX.say(lang,b.textContent));
    const did=LX.$("#wrDid"),iv=setInterval(()=>{const bar=LX.$("#wrbar");if(!bar){clearInterval(iv);return;}const q=Math.min(1,(Date.now()-t0)/(need*1000||1));bar.style.width=Math.round(q*100)+"%";if(q>=1){clearInterval(iv);did.disabled=false;did.textContent=u.did;}},250);
    did.onclick=()=>{clearInterval(iv);check(lang,idx,Math.round((Date.now()-t0)/1000));};}
  function check(lang,idx,secs){const u=UI[lang],p=PR[lang][idx];
    LX.frame(lang,u.title,`<div class="wrbig small">${p[0]}</div><p class="lxtask"><b>${u.parent}</b></p>
      <div class="wrchk">${u.checks.map((c,k)=>`<button class="wrc" data-k="${k}" aria-pressed="false"><span>⬜</span>${c}</button>`).join("")}</div>
      <details class="wrmodel"><summary>${u.model}</summary><p>${LX.E(p[2])}</p></details><div class="feedback" id="wrfb"></div>
      <div class="row center"><button class="btn" id="wrOk">${u.ok}</button></div>`);
    LX.$$(".wrc").forEach(b=>b.onclick=()=>{const on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);b.classList.toggle("on",on);b.querySelector("span").textContent=on?"✅":"⬜";});
    LX.$("#wrOk").onclick=()=>{const got=LX.$$(".wrc").map(b=>b.classList.contains("on")),n=got.filter(Boolean).length;const P=PLAN.R(),t=PLAN.today();
      if(!P.wlog[t])P.wlog[t]={lang,idx,checks:got};const ks=Object.keys(P.wlog).sort();if(ks.length>90)for(const k of ks.slice(0,ks.length-90))delete P.wlog[k];PLAN.save();
      try{REW.hit(lang,"heft",{parent:true,secs});}catch(e){}PLAN.done("write");
      const all=n===got.length,fb=LX.$("#wrfb");fb.className="feedback "+(all?"ok":"no");fb.textContent=all?"🎉 "+u.great:"✏️ "+u.fix;
      LX.$("#wrOk").textContent=u.close;LX.$("#wrOk").onclick=LX.close;LX.$$(".wrc").forEach(b=>b.disabled=true);if(all)try{gConfetti(100);}catch(e){}};}
  return {open,langToday,PR};
})();
