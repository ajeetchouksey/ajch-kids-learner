/* ============================ 📓 HEFT-ZEIT: write in the notebook, screen off, then compare ============================ */
const NB=(function(){
  const box=()=>document.getElementById("nbook"),esc=AAI.esc;
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
  const MOD={en:()=>EN,de:()=>DE,math:()=>MA};
  const GOF={en:u=>EN_GRADE[u.id]??1,de:u=>u.k,math:u=>u.k==="B"||u.k==="A"?1:u.k};
  /* subject names [emoji, German UI, English UI] – same names as the main tabs */
  const SN={en:["🔤","English","English"],de:["🇩🇪","Deutsch","Deutsch"],math:["🧮","Mathe","Mathe"],brain:["🧠","Training","Training"]};
  const snN=k=>T(SN[k][1],SN[k][2]),kN=k=>T(KIND[k][1],KIND[k][2]);
  const KIND={aufg:["✏️","Aufgaben","Exercises","Die App zeigt die Aufgaben. Du schreibst die Antworten ins Heft.","The app shows the tasks. You write the answers in your notebook."],
    dikt:["🎧","Diktat","Dictation","Die App liest vor. Du schreibst ins Heft – ohne auf den Bildschirm zu schauen.","The app reads aloud. You write it down without looking at the screen."],
    schoen:["✍️","Schönschrift","Neat writing","Schreib die Sätze ganz ordentlich ab.","Copy the sentences in your neatest handwriting."],
    merk:["🧠","Merk-Heft","Memory notebook","Schau dir die Bilder an. Dann schreib oder mal alles, was du dir gemerkt hast.","Look at the pictures, then write or draw everything you remember."]};
  const NUMW=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn"];
  /* dictation lists: [answer, what the app says (optional)] */
  const DIKT={de:[[["M","Schreib ein großes M wie Maus."],["A","Schreib ein großes A wie Affe."],["O","Schreib ein großes O wie Oma."],["L","Schreib ein großes L wie Löwe."],["S","Schreib ein großes S wie Sonne."],["Mama"],["Papa"],["Oma"],["Opa"],["Ei"],["Eis"],["Auto"],["Ball"],["Hut"],["Nase"]],
      [["Mama"],["Papa"],["Oma"],["Opa"],["Sofa"],["Limo"],["Nase"],["Rose"],["Hose"],["Dose"],["Esel"],["Igel"],["Lama"],["Hut"],["Tomate"],["Banane"],["Ofen"],["Mut"]],
      [["Mama ist da."],["Der Hund spielt."],["Ich kann turnen."],["die Biene"],["der Brief"],["das Tier"],["die Ziege"],["der Stein"],["das Schwein"],["die Hunde"],["die Mäuse"],["die Bäume"],["der Schneemann"],["die Haustür"],["die Erdbeere"],["Wie heißt du?"],["Die Sonne scheint heute."],["Wir spielen im Garten."],["Hast du Hunger?"],["Der Igel schläft im Laub."],["Im Winter ist es kalt."]]],
    en:[[["red"],["blue"],["green"],["cat"],["dog"],["sun"],["one"],["two"],["three"],["mum"],["dad"],["yes"],["no"],["ball"],["hello"]],
      [["I can see a cat."],["The dog is big."],["I like red."],["My name is Aarya."],["We go to school."],["I have a ball."],["The sun is hot."],["I am happy."],["Look at me!"],["It is a pen."]],
      [["Yesterday I played."],["She has a red book."],["They were happy."],["The cat is faster than the dog."],["I can swim and jump."],["The ball is under the table."],["He does not like milk."],["We went to the park."],["Is it your bag?"],["The apples are sweet."]]]};
  function mathDikt(g){if(g===0){const n=R(0,10);return {say:`Schreib die Zahl ${NUMW[n]}.`,ans:String(n),q:T("Zahl","Number")};}
    if(g===1){if(Math.random()<.55){const a=R(1,10),b=R(1,10);return {say:`${a} plus ${b}`,ans:`${a} + ${b} = ${a+b}`};}const a=R(5,20),b=R(1,Math.min(10,a));return {say:`${a} minus ${b}`,ans:`${a} − ${b} = ${a-b}`};}
    const t=pick(["add","sub","mul","div"]);
    if(t==="add"){const a=R(10,60),b=R(5,39);return {say:`${a} plus ${b}`,ans:`${a} + ${b} = ${a+b}`};}
    if(t==="sub"){const a=R(30,99),b=R(5,a-10);return {say:`${a} minus ${b}`,ans:`${a} − ${b} = ${a-b}`};}
    if(t==="mul"){const a=R(2,10),b=pick([2,3,4,5,10]);return {say:`${a} mal ${b}`,ans:`${a} · ${b} = ${a*b}`};}
    const b=pick([2,5,10]),q=R(1,10);return {say:`${b*q} geteilt durch ${b}`,ans:`${b*q} : ${b} = ${q}`};}
  const SCHOEN={de:[["A a  E e  I i  O o  U u","M m  L l  S s  R r","Mama  Papa  Oma  Opa","Ich bin Aarya."],["Der Hund spielt mit dem Ball.","Die Sonne scheint.","Ich kann schon schreiben.","Mama liest ein Buch.","Aarya turnt gern."],
      ["Im Herbst fallen die Blätter.","Die Biene sitzt auf der Blume.","Wir gehen heute in den Zoo.","Hast du mein Heft gesehen?","Aarya macht ein Rad."]],
    en:[["a b c d e f g","cat  dog  sun","Hello! I am Aarya.","red  blue  green"],["I can read a book.","The cat is on the mat.","My name is Aarya.","I like apples."],["Yesterday we played in the park.","My friend is taller than me.","The birds are singing.","I can jump and I can swim."]],
    math:[["0  1  2  3  4  5","6  7  8  9  10","1 + 1 = 2    2 + 1 = 3","eins = 1   zwei = 2   drei = 3"],["11  12  13  14  15  16  17  18  19  20","2 + 3 = 5    5 + 5 = 10","10 − 4 = 6    9 − 3 = 6","7 = 3 + 4 = 5 + 2"],
      ["10  20  30  40  50  60  70  80  90  100","2 · 1 = 2    2 · 2 = 4    2 · 3 = 6","34 + 25 = 59","20 : 4 = 5    15 : 3 = 5"]]};
  const MERK=[["🐶","Hund","dog"],["🐱","Katze","cat"],["🍎","Apfel","apple"],["🚗","Auto","car"],["⚽","Ball","ball"],["🌸","Blume","flower"],["🏠","Haus","house"],["⭐","Stern","star"],["🐟","Fisch","fish"],["🍌","Banane","banana"],
    ["🎈","Ballon","balloon"],["📖","Buch","book"],["☀️","Sonne","sun"],["🦆","Ente","duck"],["🚲","Fahrrad","bike"],["🎁","Geschenk","present"],["🌙","Mond","moon"],["🍦","Eis","ice cream"],["🐘","Elefant","elephant"],["🧸","Teddy","teddy"]];
  const CHECK={de:[["Großer Anfangsbuchstabe","capital letter at the start"],["Ein Finger Abstand zwischen den Wörtern","a finger space between words"],["Schön auf der Linie","neatly on the line"],["Punkt oder Zeichen am Ende","full stop or mark at the end"]]};

  let C=null,timer=null,seq=0,spT=null,prevL=null;
  const tag=()=>C.subj;
  function stopAll(){seq++;clearTimeout(spT);clearInterval(timer);timer=null;try{EN.stopSpeech();MA.stopSpeech();DE.stopSpeech();}catch(e){}try{speechSynthesis.cancel();}catch(e){}}
  function say(text){if(!C)return Promise.resolve();const s=C.subj,m=s==="en"?EN:s==="math"?MA:DE;let r=.6;try{r=Math.max(.45,(m.S().rate||.6)*.85);}catch(e){}
    try{return s==="en"?EN.speak(text,{force:true,rate:r}):m.speak(text,{lang:"de",force:true,rate:r});}catch(e){return Promise.resolve();}}
  /* instructions are spoken in the screen language (content keeps the subject voice via say) */
  function sayUI(de,en){if(!C)return Promise.resolve();const isEn=UIL.cur==="en",m=isEn?EN:DE;let r=.6;try{r=Math.max(.45,(m.S().rate||.6)*.85);}catch(e){}
    try{return isEn?EN.speak(en,{force:true,rate:r}):DE.speak(de,{lang:"de",force:true,rate:r});}catch(e){return Promise.resolve();}}
  const g=()=>PROF.view(C.subj==="brain"?"brain":C.subj);
  function frame(inner,dark){const b=box();b.hidden=false;b.className=dark?"dark":"";
    b.innerHTML=`<div class="nbtop"><b>📓 ${T("Heft-Zeit","Notebook time")}${C&&C.subj?` · ${SN[C.subj][0]} ${snN(C.subj)}`:""}${C&&C.kind?` · ${KIND[C.kind][0]} ${kN(C.kind)}`:""}</b><button class="nbx" id="nbClose" aria-label="${T("Schließen","Close")}">✖</button></div><div class="nbbody">${inner}</div>`;
    document.getElementById("nbClose").onclick=close;box().scrollTop=0;}
  const $n=s=>box().querySelector(s);
  function close(){stopAll();box().hidden=true;box().innerHTML="";C=null;if(prevL){UIL.set(prevL);prevL=null;}document.body.classList.remove("nbopen");try{renderGbar();if(CUR==="today")renderToday();}catch(e){}}

  /* ---------- 1. choose ---------- */
  function open(o={}){stopAll();if(!prevL)prevL=UIL.cur;UIL.set(o.subj==="en"?"en":o.subj==="de"||o.subj==="math"?"de":UIL.app());document.body.classList.add("nbopen");C={subj:o.subj||null,unit:o.unit||null,kind:o.kind||null,n:6,parent:false,fixed:!!o.subj};
    if(C.subj==="brain")C.kind="merk";choose();}
  function kindsFor(s){return s==="brain"?["merk"]:["aufg","dikt","schoen"];}
  function choose(){const s=C.subj;if(s&&!kindsFor(s).includes(C.kind))C.kind=kindsFor(s)[0];
    const counts=C.kind==="schoen"?[2,3,4]:C.kind==="merk"?[5,6,8]:[4,6,8,10];if(!counts.includes(C.n))C.n=counts[1];
    frame(`<div class="nbhello"><div class="nbbig">📓✏️</div><h2>${T("Heft-Zeit!","Notebook time!")}</h2><p>${T("Leg das Tablet weg, nimm Stift und Heft. Erst schreiben, dann vergleichen.","Put the tablet aside, take your pencil and notebook. Write first, then compare.")}</p></div>
      ${C.fixed?"":`<div class="nblbl">1. ${T("Fach","Subject")}</div><div class="nbseg">${Object.keys(SN).map(k=>`<button data-s="${k}" class="${s===k?"on":""}">${SN[k][0]}<b>${snN(k)}</b></button>`).join("")}</div>`}
      ${s?`<div class="nblbl">${C.fixed?"1":"2"}. ${T("Was machen wir?","What do we do?")}${C.unit?` <i>(${esc(T(C.unit.de||C.unit.title,C.unit.title||C.unit.de))})</i>`:""}</div><div class="nbkinds">${kindsFor(s).map(k=>`<button data-k="${k}" class="${C.kind===k?"on":""}"><span>${KIND[k][0]}</span><b>${kN(k)}</b><i>${T(KIND[k][3],KIND[k][4])}</i></button>`).join("")}</div>
        <div class="nblbl">${T("Wie viele?","How many?")}</div><div class="nbseg small">${counts.map(n=>`<button data-n="${n}" class="${C.n===n?"on":""}">${n}${C.kind==="schoen"?T(" Zeilen"," lines"):""}</button>`).join("")}</div>
        <label class="nbpar"><input type="checkbox" id="nbPar" ${C.parent?"checked":""}> 👨 ${T("Papa oder Mama prüft das Heft mit (+2 Bonus)","Mum or Dad checks the notebook too (+2 bonus)")}</label>
        <p class="nblvl">${T("Stufe","Level")}: <b>${GRADES[g()][1]} ${T(GRADES[g()][2],GRADES[g()][3])}</b> <small>(${T("ändern im Fach","change it in the subject")})</small></p>
        <div class="row center"><button class="btn" id="nbGo">${T("Los geht's ▶","Let's go ▶")}</button></div>`:`<p class="nblvl">${T("Wähle ein Fach","Choose a subject")}</p>`}`);
    box().querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{C.subj=b.dataset.s;C.kind=null;UIL.set(C.subj==="en"?"en":C.subj==="de"||C.subj==="math"?"de":UIL.app());C.unit=null;choose();});
    box().querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{C.kind=b.dataset.k;choose();});
    box().querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{C.n=+b.dataset.n;choose();});
    const p=$n("#nbPar");if(p)p.onchange=()=>{C.parent=p.checked;};const go=$n("#nbGo");if(go)go.onclick=prepare;}

  /* ---------- 2. build the items ---------- */
  function items(){const s=C.subj,G=g(),n=C.n,out=[];
    if(C.kind==="aufg"){const m=MOD[s]();if(C.unit)return m.nbTasks(C.unit,n);
      const us=m.U().filter(u=>GOF[s](u)===G);let k=0;while(out.length<n&&k++<300){const u=pick(us),t=(m.nbTasks(u,1)||[])[0];if(t&&!out.some(x=>x.q===t.q&&x.ans===t.ans))out.push(t);}return out;}
    if(C.kind==="dikt"){if(s==="math"){let k=0;while(out.length<n&&k++<200){const t=mathDikt(G);if(!out.some(x=>x.ans===t.ans))out.push(t);}return out;}
      let src=DIKT[s][G].map(([a,sy])=>({ans:a,say:sy||a}));
      if(C.unit&&s==="en"){const more=EN.more(C.unit.id);if(more&&more.length>=3)src=more.map(([e,t])=>({ans:t,say:t,emo:e}));}
      return shuffle(src).slice(0,n);}
    if(C.kind==="schoen"){let src=SCHOEN[s][G];if(C.unit&&s==="en"){const more=EN.more(C.unit.id);if(more&&more.length>=2)src=more.map(x=>x[1]);}
      return shuffle(src).slice(0,n).map(t=>({ans:t}));}
    return shuffle(MERK).slice(0,n).map(x=>({emo:x[0],ans:x[1],en:x[2]}));}
  function prepare(){C.items=items();C.res=[];C.fixes=0;C.off=0;C.t0=Date.now();
    if(!C.items.length){frame(`<p class="nblvl">${T("Für diese Auswahl gibt es noch keine Aufgaben.","There are no tasks for this choice yet.")}</p><div class="row center"><button class="btn" id="nbBack">${T("◀ Zurück","◀ Back")}</button></div>`);$n("#nbBack").onclick=choose;return;}
    const d=new Date(),date=UIL.cur==="en"?d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):d.toLocaleDateString("de-DE",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"});
    const title=`${snN(C.subj)} – ${kN(C.kind)}`;
    frame(`<div class="nbhello"><div class="nbbig">📓</div><h2>${T("Mach dein Heft bereit","Get your notebook ready")}</h2></div>
      <ol class="nbsteps"><li><b>${T("Schreib das Datum oben hin","Write the date at the top")}:</b><div class="nbline">${esc(date)}</div></li>
        <li><b>${T("Schreib die Überschrift","Write the title")}:</b><div class="nbline">${esc(title)}</div></li>
        ${C.kind==="aufg"||C.kind==="dikt"?`<li><b>${T("Schreib die Nummern untereinander","Write the numbers one under the other")}:</b><div class="nbline">${C.items.map((_,i)=>i+1).join("  ")}</div></li>`:""}
        <li><b>${T("Spitzer Stift, gerade sitzen!","Sharp pencil, sit up straight!")}</b> ✏️🪑</li></ol>
      <div class="row center"><button class="btn" id="nbReady">${T("Bin bereit! ▶","I'm ready! ▶")}</button></div>`);
    sayUI(`Schreib das Datum und die Überschrift: ${title}.`,`Write the date and the title: ${title}.`);
    $n("#nbReady").onclick=()=>{stopAll();({aufg:sheet,dikt:()=>dict(0),schoen:copy,merk:memo})[C.kind]();};}

  /* ---------- 3. work: sheet · dictation · copy · memory ---------- */
  function sheet(){frame(`<div class="nbsheet">${C.items.map((t,i)=>`<div class="nbitem"><span class="nbno">${i+1}</span><div>${t.vis?`<div class="nbvis">${t.vis}</div>`:""}<div class="nbq">${esc(t.q)}</div>${t.en&&UIL.cur==="en"?`<small>${esc(t.en)}</small>`:""}</div><button class="spk nbspk" data-i="${i}" aria-label="${T("Vorlesen","Read aloud")}">🔊</button></div>`).join("")}</div>
      <div class="nbkey">${C.items.map((t,i)=>`<div>${i+1}. ${esc(t.full||t.ans)}</div>`).join("")}</div>
      <div class="row center"><button class="btn" id="nbPause">🙈 ${T("Bildschirm-Pause – ich schreibe!","Screen break – I'm writing!")}</button><button class="btn ghost" id="nbPrint">🖨️ ${T("Drucken","Print")}</button></div>`);
    box().querySelectorAll(".nbspk").forEach(b=>b.onclick=()=>say(C.items[+b.dataset.i].q.replace(/_{2,}/g," ... ")));
    $n("#nbPause").onclick=()=>pause(sheet);$n("#nbPrint").onclick=()=>{try{window.print();}catch(e){}};
    sayUI("Schreib die Antworten in dein Heft. Dann mach eine Bildschirm-Pause.","Write the answers in your notebook. Then put the screen away.");}
  function copy(){frame(`<p class="nblvl">${T("Schreib jede Zeile einmal ganz schön ab.","Copy each line once, very neatly.")}</p><div class="nbpaper">${C.items.map(t=>`<div class="nbl4"><span>${esc(t.ans)}</span></div>`).join("")}</div>
      <div class="nbtips">✏️ ${T("Großer Anfang","Capital start")} &nbsp; 👆 ${T("Finger-Abstand","Finger space")} &nbsp; 📏 ${T("Auf der Linie","On the line")} &nbsp; ⚫ ${T("Punkt am Ende","Full stop")}</div>
      <div class="row center"><button class="btn" id="nbPause">🙈 ${T("Bildschirm-Pause – ich schreibe!","Screen break – I'm writing!")}</button></div>`);
    $n("#nbPause").onclick=()=>pause(copy);sayUI("Schreib die Zeilen ganz schön ab.","Copy the lines in your best handwriting.");}
  function pause(back){stopAll();const t0=Date.now();
    frame(`<div class="nbpause"><div class="nbpen">✏️</div><h2>${T("Augen aufs Heft!","Eyes on your notebook!")} 👀📓</h2><p>${T("Schreib in dein Heft. Der Bildschirm macht Pause.","Write in your notebook. The screen is taking a break.")}</p><div class="nbclock" id="nbClock">0:00</div>
      <div class="row center"><button class="btn ghost light" id="nbLook">👀 ${T("Nochmal ansehen","Look again")}</button><button class="btn" id="nbDone">✅ ${T("Fertig – vergleichen","Done – compare")}</button></div></div>`,true);
    const tick=()=>{const s=Math.floor((Date.now()-t0)/1000),e=$n("#nbClock");if(e)e.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;};timer=setInterval(tick,1000);
    const leave=fn=>()=>{C.off+=Date.now()-t0;stopAll();fn();};$n("#nbLook").onclick=leave(back);$n("#nbDone").onclick=leave(check);}
  function dict(i){stopAll();const t=C.items[i],t0=Date.now(),N=C.items.length;let show=false;
    const draw=()=>{frame(`<div class="nbpause"><div class="nbno big">${i+1}<small>/ ${N}</small></div><h2>🎧 ${T("Hör gut zu und schreib!","Listen carefully and write!")}</h2>
        ${show?`<p class="nbpar2">👨 ${esc(t.say)}</p>`:""}<div class="nbclock" id="nbClock"></div>
        <div class="row center"><button class="btn ghost light" id="nbAgain">🔁 ${T("Nochmal hören","Hear it again")}</button><button class="btn" id="nbNext">${i<N-1?T("▶ Nächstes","▶ Next"):T("✅ Fertig – vergleichen","✅ Done – compare")}</button></div>
        <button class="nbtxt" id="nbShow">${show?T("🙈 Text verstecken","🙈 Hide text"):T("👨 Text für Papa oder Mama zeigen","👨 Show text for Mum or Dad")}</button></div>`,true);
      $n("#nbAgain").onclick=speakIt;$n("#nbShow").onclick=()=>{show=!show;draw();};
      $n("#nbNext").onclick=()=>{C.off+=Date.now()-t0;stopAll();i<N-1?dict(i+1):check();};};
    const speakIt=()=>{stopAll();const my=seq,live=()=>my===seq&&C&&C.kind==="dikt";const pre=C.subj==="en"?`Number ${i+1}.`:`Nummer ${i+1}.`;
      say(pre).then(()=>live()&&say(t.say)).then(()=>new Promise(r=>setTimeout(r,1800))).then(()=>{if(live())say(t.say);});};
    draw();spT=setTimeout(speakIt,350);}
  function memo(){const N=C.items.length,secs=Math.max(20,N*4);let left=secs;
    frame(`<p class="nblvl">${T("Merk dir alle Bilder!","Remember all the pictures!")}</p><div class="nbmemo">${C.items.map(t=>`<span><b>${t.emo}</b>${esc(T(t.ans,t.en))}</span>`).join("")}</div><div class="nbbar"><i id="nbBar"></i></div>
      <div class="row center"><button class="btn" id="nbHide">🙈 ${T("Ich hab's! Verstecken","Got it! Hide")}</button></div>`);
    sayUI("Merk dir alle Bilder!","Remember all the pictures!");const hide=()=>{stopAll();pause(()=>{});const l=$n("#nbLook");if(l)l.remove();const h=$n(".nbpause h2");if(h)h.textContent=T("Schreib oder mal alles, was du dir gemerkt hast!","Write or draw everything you remember!");sayUI("Schreib oder mal alles, was du dir gemerkt hast!","Write or draw everything you remember!");};
    timer=setInterval(()=>{left--;const b=$n("#nbBar");if(b)b.style.width=(left/secs*100)+"%";if(left<=0)hide();},1000);$n("#nbHide").onclick=hide;}

  /* ---------- 4. compare ---------- */
  function spell(t){return /^\S{1,12}$/.test(t)&&!/\d/.test(t)?`<div class="nbspell">${[...t].map(c=>`<span>${esc(c)}</span>`).join("")}</div>`:"";}
  function check(){stopAll();if(C.kind==="schoen")return checkSchoen();if(C.kind==="merk")return checkMemo();checkItem(0);}
  function checkItem(i){const t=C.items[i],N=C.items.length,who=C.parent?"👨 ":"";
    frame(`<div class="nbdots">${C.items.map((_,k)=>`<i class="${C.res[k]===true?"ok":C.res[k]===false?"no":k===i?"cur":""}"></i>`).join("")}</div>
      <div class="nbcheck"><div class="nbno">${i+1}</div>${t.q?`<div class="nbq small">${esc(t.q)}</div>`:""}${t.vis?`<div class="nbvis small">${t.vis}</div>`:""}
        <div class="nblbl">${T("So ist es richtig","This is right")}:</div><div class="nbans">${t.emo?`<span>${t.emo}</span> `:""}${esc(t.full||t.ans)}</div>${spell(t.full&&/^\S+$/.test(t.full)?t.full:t.ans)}
        <button class="spk" id="nbHear" aria-label="${T("Anhören","Listen")}">🔊</button>
        <p class="nbask">${C.parent?T("Papa/Mama: Stimmt es im Heft?","Mum/Dad: is it right in the notebook?"):T("Vergleiche mit deinem Heft. Stimmt jeder Buchstabe?","Compare with your notebook. Is every letter right?")}</p>
        <div class="row center"><button class="btn nbyes" id="nbYes">${who}✅ ${T("Richtig","Right")}</button>${C.kind==="dikt"&&g()<=1?`<button class="btn nbsound" id="nbSound">${who}👂 ${T("Alle Laute da","All sounds there")}</button>`:""}<button class="btn nbno2" id="nbNo">${who}✏️ ${T("Noch üben","Not yet")}</button></div><div id="nbFix"></div></div>`);
    $n("#nbHear").onclick=()=>say(t.full||t.ans);say(t.full||t.ans);
    const next=()=>{stopAll();i<N-1?checkItem(i+1):result();};
    $n("#nbYes").onclick=()=>{C.res[i]=true;tone2(true);next();};
    const snd=$n("#nbSound");if(snd)snd.onclick=()=>{C.res[i]=true;tone2(true);$n("#nbFix").innerHTML=`<div class="nbfix">👂 ${T("Super gehört! So schreibt man es","Great listening! This is how you spell it")}: <b>${esc(t.ans)}</b> – ${T("schau es dir genau an.","look at it closely.")}<div class="row center"><button class="btn" id="nbFixed">${T("Weiter ▶","Next ▶")}</button></div></div>`;$n("#nbYes").disabled=$n("#nbNo").disabled=snd.disabled=true;$n("#nbFixed").onclick=next;};
    $n("#nbNo").onclick=()=>{C.res[i]=false;tone2(false);$n("#nbYes").disabled=$n("#nbNo").disabled=true;
      $n("#nbFix").innerHTML=`<div class="nbfix">✍️ <b>${T("Berichtigung","Correction")}:</b> ${T("Schreib es noch einmal richtig darunter. Langsam und schön!","Write it again correctly underneath. Slowly and neatly!")}<div class="row center"><button class="btn" id="nbFixed">${T("Erledigt ✔","Done ✔")}</button></div></div>`;
      sayUI("Kein Problem! Schreib es noch einmal richtig.","No problem! Write it again correctly.");$n("#nbFixed").onclick=()=>{C.fixes=(C.fixes||0)+1;next();};};}
  function checkSchoen(){const L=CHECK.de,ticks=L.map(()=>false);
    const draw=()=>{frame(`<div class="nbhello"><div class="nbbig">✍️🔍</div><h2>${T("Schau dein Heft an","Look at your notebook")}</h2><p>${T("Hake ab, was dir gut gelungen ist.","Tick what you did well.")}</p></div>
      <div class="nbchecks">${L.map((c,k)=>`<button class="${ticks[k]?"on":""}" data-k="${k}"><span>${ticks[k]?"✅":"⬜"}</span><b>${T(c[0],c[1])}</b></button>`).join("")}</div>
      <p class="nblvl">⭐ ${T("Kreis dein schönstes Wort im Heft ein!","Circle your nicest word in the notebook!")}</p><div class="row center"><button class="btn" id="nbOk">${T("Fertig ✔","Done ✔")}</button></div>`);
      box().querySelectorAll(".nbchecks button").forEach(b=>b.onclick=()=>{ticks[+b.dataset.k]=!ticks[+b.dataset.k];draw();});
      $n("#nbOk").onclick=()=>{C.res=ticks.slice();result();};};draw();sayUI("Schau dein Heft an. Was ist dir gut gelungen?","Look at your notebook. What did you do well?");}
  function checkMemo(){const got=C.items.map(()=>false);
    const draw=()=>{frame(`<div class="nbhello"><div class="nbbig">🧠</div><h2>${T("Was hast du dir gemerkt?","What did you remember?")}</h2><p>${T("Hake alles ab, was du geschrieben oder gemalt hast.","Tick everything you wrote or drew.")}</p></div>
      <div class="nbmemo tick">${C.items.map((t,k)=>`<button class="${got[k]?"on":""}" data-k="${k}"><b>${t.emo}</b>${esc(T(t.ans,t.en))}<small>${got[k]?"✅":""}</small></button>`).join("")}</div>
      <div class="row center"><button class="btn" id="nbOk">${T("Fertig ✔","Done ✔")} (${got.filter(Boolean).length}/${got.length})</button></div>`);
      box().querySelectorAll(".nbmemo button").forEach(b=>b.onclick=()=>{got[+b.dataset.k]=!got[+b.dataset.k];draw();});$n("#nbOk").onclick=()=>{C.res=got.slice();result();};};draw();}
  function tone2(ok){try{const a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),gn=a.createGain();o.frequency.value=ok?784:330;gn.gain.value=.08;o.connect(gn).connect(a.destination);o.start();o.stop(a.currentTime+.15);}catch(e){}}

  /* ---------- 5. result + rewards ---------- */
  function result(){stopAll();const right=C.res.filter(x=>x===true).length,N=C.res.length,wrong=C.kind==="aufg"||C.kind==="dikt"?C.res.filter(x=>x===false).length:0;
    const p=right/Math.max(1,N),st=p>=.9?3:p>=.6?2:p>0?1:0,mins=Math.max(1,Math.round(C.off/60000)),p0=REW.R().points;
    /* honest checking pays: every checked answer +1 (right or wrong), every correction +2 */
    if(C.kind==="aufg"||C.kind==="dikt"||C.kind==="merk")C.res.forEach(r=>REW.hit(tag(),"checked",{right:r===true}));for(let k=0;k<(C.fixes||0);k++)REW.hit(tag(),"fix");
    REW.hit(tag(),"heft",{secs:Math.round(C.off/1000),parent:C.parent,perfectDikt:C.kind==="dikt"&&N>=6&&right===N});
    const gained=REW.R().points-p0,msg=[["Weiter üben!","Keep practising!"],["Guter Anfang!","Good start!"],["Sehr gut!","Very good!"],["Heft-Star!","Notebook star!"]][st];
    frame(`<div class="nbhello"><div class="nbbig">${["📓","📓⭐","📓⭐⭐","📓⭐⭐⭐"][st]}</div><h2>${T(msg[0],msg[1])}</h2></div>
      <div class="nbstats"><span><b>${right}/${N}</b>${C.kind==="schoen"?T("Häkchen","Ticks"):C.kind==="merk"?T("gemerkt","Remembered"):T("richtig","Right")}</span><span><b>🌿 ${mins}</b>${T("Min. ohne Bildschirm","Min. screen-free")}</span><span><b>🪙 +${gained}</b>${T("Punkte","Points")}</span></div>
      <p class="nblvl">👨 ${T("Zeig Papa oder Mama dein Heft!","Show your notebook to Mum or Dad!")}</p>
      <div class="row center"><button class="btn" id="nbAgain2">${T("Nochmal 📓","Again 📓")}</button><button class="btn ghost" id="nbEnd">${T("Fertig","Finish")}</button></div>`);
    if(st>=2)gConfetti();sayUI(msg[0],msg[1]);$n("#nbAgain2").onclick=()=>{C.res=[];prepare();};$n("#nbEnd").onclick=close;}
  return {open,close,isOpen:()=>!!C};})();

/* ============================ 📓 HEFT-MODUS: every question — write first, then compare ============================ */
const NBM=(function(){const SEC={appE:"en",appD:"de",appM:"math"};
  const on=()=>!!PROF.get().nbmode;
  const onlyPics=bs=>bs.every(b=>b.querySelector(".oe")||/^[\p{Extended_Pictographic}️‍\s]+$/u.test(b.textContent.trim()));
  function gate(o,id){if(o.dataset.nbg)return;o.dataset.nbg="1";const sec=document.getElementById(id),bs=[...o.querySelectorAll(".opt")];
    if(sec.querySelector("#bb")||o.querySelector("#yes")||bs.length<2||bs.some(b=>b.disabled&&!b.dataset.gw)||onlyPics(bs))return;
    o.classList.add("nbhide");const t0=Date.now(),c=document.createElement("div");c.className="nbgate";
    const L=id==="appE"?"en":"de",tt=(de,en)=>L==="en"?en:de;
    c.innerHTML=`<span class="ng1">✏️📓</span><div><b>${tt("Erst ins Heft schreiben!","Write it in your notebook first!")}</b><small>${tt("Dann vergleichen.","Then compare.")}</small></div><button class="btn" type="button">👀 ${tt("Vergleichen","Compare")}</button>`;
    o.parentNode.insertBefore(c,o);
    c.querySelector("button").onclick=()=>{o.classList.remove("nbhide");c.remove();REW.hit(SEC[id],"written",{secs:Math.round((Date.now()-t0)/1000)});
      const f=o.querySelector(".opt");if(f)f.scrollIntoView({block:"nearest",behavior:"smooth"});};}
  function scanAll(){if(!on())return;for(const id in SEC){const s=document.getElementById(id);if(s&&!s.hidden)s.querySelectorAll(".opts:not([data-nbg])").forEach(o=>gate(o,id));}}
  function openAll(){document.querySelectorAll(".nbgate").forEach(g=>{const o=g.nextElementSibling;if(o)o.classList.remove("nbhide");g.remove();});}
  function set(v){PROF.get().nbmode=!!v;PROF.save();if(v){scanAll();}else openAll();
    try{const t=document.getElementById("toast");t.textContent=v?T("📓 Heft-Modus an: erst ins Heft schreiben, dann vergleichen","📓 Notebook mode on: write in the notebook first, then compare"):T("📓 Heft-Modus aus","📓 Notebook mode off");t.classList.remove("on");void t.offsetWidth;t.classList.add("on");}catch(e){}
    try{renderGbar();if(!document.getElementById("vParent").hidden)renderParent();}catch(e){}}
  const mo=new MutationObserver(()=>{if(on())scanAll();});
  for(const id in SEC){const s=document.getElementById(id);if(s)mo.observe(s,{childList:true,subtree:true});}
  return {on,set,toggle:()=>set(!on()),scanAll};})();
