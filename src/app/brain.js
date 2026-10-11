/* ============================ 🧠 BRAIN TRAINING (Gehirn-Training) ============================ */
const BKEY="aarya-brain-v1";
let BS={best:{},lvl:{},workouts:0};
try{const s=JSON.parse(localStorage.getItem(BKEY)||"null");if(s)BS=Object.assign(BS,s);}catch(e){}
const bsave=()=>{try{localStorage.setItem(BKEY,JSON.stringify(BS));}catch(e){}};
const $=s=>ROOT.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
let TM=[];const later=(f,ms)=>{const t=setTimeout(f,ms);TM.push(t);return t;};
function stop(){TM.forEach(clearTimeout);TM=[];try{speechSynthesis.cancel();}catch(e){}}
function say(t,lang="de"){try{return DE.speak(t,{lang});}catch(e){return Promise.resolve();}}
/* speak an instruction in the screen language */
function sayT(de,en){return UIL.cur==="en"?say(en,"en"):say(de,"de");}
let AC=null;
function tone(f,d=.18){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02);}catch(e){}}
const good=()=>{tone(660,.1);later(()=>tone(880,.12),90);},bad=()=>tone(240,.2);
function nopts(c,min=0,max=99){const s=[c];let d=1;while(s.length<3){for(const x of shuffle([c+d,c-d]))if(x>=min&&x<=max&&!s.includes(x)&&s.length<3)s.push(x);d++;}return shuffle(s);}
const DE_N=["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn"];
const POOL=[["🐶","der Hund","dog"],["🐱","die Katze","cat"],["🍎","der Apfel","apple"],["🚗","das Auto","car"],["⚽","der Ball","ball"],["🌸","die Blume","flower"],["🏠","das Haus","house"],["⭐","der Stern","star"],
 ["🐟","der Fisch","fish"],["🍌","die Banane","banana"],["🎈","der Ballon","balloon"],["📖","das Buch","book"],["☀️","die Sonne","sun"],["🐮","die Kuh","cow"],["🦆","die Ente","duck"],["🍓","die Erdbeere","strawberry"],
 ["🚲","das Fahrrad","bike"],["🎁","das Geschenk","present"],["🌙","der Mond","moon"],["🐞","der Marienkäfer","ladybird"],["🍦","das Eis","ice cream"],["🐘","der Elefant","elephant"],["🦋","der Schmetterling","butterfly"],["🧸","der Teddy","teddy"]];
const CATS=[["Obst","fruit",["🍎","🍌","🍇","🍓","🍊","🍐","🍒"]],["Tiere","animals",["🐶","🐱","🐮","🐴","🐷","🐔","🐰"]],["Fahrzeuge","vehicles",["🚗","🚌","🚲","✈️","🚂","🚢","🚜"]],
 ["Kleidung","clothes",["👕","👖","👗","🧦","🧢","👟","🧣"]],["Gemüse","vegetables",["🥕","🥦","🌽","🥒","🍅","🥔","🧅"]],["Sport","sport",["⚽","🏀","🎾","🏐","🏓","🥎","🏈"]]];
const COLS=[["ROT","rot","red","#E0443E"],["BLAU","blau","blue","#2F5BEA"],["GRÜN","grün","green","#1F9D63"],["GELB","gelb","yellow","#E8B400"]];
const MOVES=[["Spring 10-mal und zähle auf Deutsch!","Jump 10 times and count in German!","🦘"],["Mach 5 Hampelmänner und zähle auf Englisch!","Do 5 star jumps and count in English!","⭐"],
 ["Steh auf einem Bein und zähle bis 10!","Stand on one leg and count to 10!","🦩"],["Mach eine Brücke und zähle bis 5!","Do a bridge and count to 5!","🌉"],["Hüpf 3-mal nach links und 3-mal nach rechts!","Hop 3 times left and 3 times right!","↔️"],
 ["Mach 3 Purzelbäume!","Do 3 forward rolls!","🤸‍♀️"],["Streck dich ganz hoch wie eine Giraffe und dann ganz klein wie eine Maus!","Stretch tall like a giraffe, then small like a mouse!","🦒"],
 ["Klatsch 10-mal und zähle rückwärts von 10!","Clap 10 times and count back from 10!","👏"],["Lauf auf der Stelle und sag das ABC!","Run on the spot and say the ABC!","🏃‍♀️"],["Balancier wie auf dem Schwebebalken bis zur Tür!","Balance like on the beam to the door!","🤸"]];

/* ---------- frame + result ---------- */
let WO=null; /* workout state */
function frame(g,extra=""){
  ROOT.innerHTML=`<button class="back" id="bback">← ${WO?T("Workout beenden","Stop workout"):"Training"}</button>
   <div class="uhead" id="buh" style="--c:${g.c}"><div class="emo">${g.e}</div><div><div class="k">${g.cat?esc(T(g.cat[0],g.cat[1])):""}${WO?`${g.cat?" · ":""}Workout ${WO.i+1}/${WO.list.length}`:""}</div><h2>${esc(T(g.de,g.en))}</h2></div></div>${extra}<div class="panel bpanel" id="bp" style="--c:${g.c}"></div>`;
  $("#buh").style.background=g.c;$("#bback").onclick=()=>{stop();WO=null;home();};return $("#bp");}
function finish(g,score,line,st){
  stop();if(score>(BS.best[g.id]||0))BS.best[g.id]=score;bsave();REW.hit("brain","round",st);
  if(WO){WO.stars+=st;WO.i++;return nextWorkout();}
  const msg=[["Weiter üben!","Keep practising!"],["Guter Anfang!","Good start!"],["Sehr gut!","Very good!"],["Super-Gehirn!","Super brain!"]][st];
  const P=frame(g);P.innerHTML=`<div class="result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div><h3>${T(msg[0],msg[1])}</h3><p>${line}</p>
   <div class="row"><button class="btn" id="again" style="--c:${g.c}">${T("Nochmal 🔁","Again 🔁")}</button><button class="btn ghost" id="bhome">Training</button></div></div>`;
  $("#again").onclick=()=>{stop();g.fn();};$("#bhome").onclick=()=>{stop();home();};
  if(st>=2){gConfetti();gFanfare();}sayT(msg[0],msg[1]);
}
const nTrials=(full,wo)=>WO?wo:full;
const GV=()=>PROF.view("brain"),GB=()=>[1,2,4][GV()];
function lvl(id){return Math.max(BS.lvl[id]||1,GB());}
function lvlUp(id,ok,max=8){BS.lvl[id]=Math.max(GB(),Math.min(max,lvl(id)+(ok?1:-1)));bsave();}
function trialHead(P,i,N,score){return `<div class="prog"><i style="width:${i/N*100}%"></i></div><div class="qmeta"><span>${i+1} / ${N}</span><span>✔ ${score} ${T("richtig","right")}</span></div>`;}
function qline(de,en){return `<div class="bq"><b>${esc(T(de,en))}</b></div>`;}
function nextBtn(P,fn){const b=document.createElement("div");b.className="row";b.innerHTML=`<button class="btn" id="bnext">${T("Weiter ▶","Next ▶")}</button>`;P.appendChild(b);$("#bnext").onclick=fn;}

/* ---------- 1. Kimspiel: Was fehlt? ---------- */
function kim(){const g=G.kim;const N=nTrials(5,3);let i=0,score=0;const P=frame(g);
  function trial(){stop();const L=lvl("kim"),n=Math.min(8,2+L),items=shuffle(POOL).slice(0,n),ms=2500+n*700;
    P.innerHTML=trialHead(P,i,N,score)+qline("Merk dir alle Bilder!","Remember all the pictures!")+`<div class="timer"><i id="tmb"></i></div><div class="kgrid">${items.map(x=>`<span><b>${x[0]}</b><small>${esc(T(x[1],x[2]))}</small></span>`).join("")}</div>`;
    sayT("Merk dir alle Bilder!","Remember all the pictures!");requestAnimationFrame(()=>{const t=$("#tmb");if(t){t.style.transition=`width ${ms}ms linear`;t.style.width="0%";}});
    later(()=>{const miss=pick(items),rest=shuffle(items.filter(x=>x!==miss)),dis=shuffle(POOL.filter(x=>!items.includes(x))).slice(0,2),opts=shuffle([miss,...dis]);
      P.innerHTML=trialHead(P,i,N,score)+qline("Was fehlt?","What is missing?")+`<div class="kgrid">${rest.map(x=>`<span><b>${x[0]}</b></span>`).join("")}<span class="qm"><b>?</b></span></div>
        <div class="opts">${opts.map(x=>`<button class="opt" data-e="${x[0]}"><span class="oe">${x[0]}</span></button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
      sayT("Was fehlt?","What is missing?");
      P.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=b.dataset.e===miss[0];P.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.e===miss[0])x.classList.add("right");});
        if(ok){score++;good();REW.hit("brain","correct");}else{b.classList.add("wrong");bad();REW.hit("brain","wrong");}lvlUp("kim",ok,6);
        $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=T(`${ok?"🎉 Richtig!":"Fast!"} Es fehlte: ${miss[0]} ${esc(miss[1])}`,`${ok?"🎉 Right!":"Nearly!"} Missing: ${miss[0]} the ${esc(miss[2])}`);sayT(`Es fehlte ${miss[1]}.`,`The ${miss[2]} was missing.`);
        nextBtn(P,()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} gefunden`,`${score} of ${N} found`),score>=N?3:score>=N*.6?2:score>0?1:0);});});},ms);}
  trial();}

/* ---------- 2. Zahlen merken (digit span) ---------- */
function digits(){const g=G.dig;const N=nTrials(5,3);let i=0,score=0;const P=frame(g);
  function trial(){stop();const len=Math.min(7,1+lvl("dig")),seq=[...Array(len)].map(()=>R(0,9));let k=0;
    P.innerHTML=trialHead(P,i,N,score)+qline("Schau und hör gut zu!","Watch and listen!")+`<div class="bigdig" id="bd"></div>`;
    (function show(){if(k<seq.length){const d=$("#bd");if(!d)return;d.textContent=seq[k];d.classList.remove("pulse");void d.offsetWidth;d.classList.add("pulse");sayT(DE_N[seq[k]],String(seq[k]));k++;later(show,1100);}else later(input,400);})();
    function input(){let got=[];P.innerHTML=trialHead(P,i,N,score)+qline("Tippe die Zahlen in der richtigen Reihenfolge!","Tap the numbers in the same order!")+
      `<div class="slots2">${seq.map(()=>"<span></span>").join("")}</div><div class="pad">${[1,2,3,4,5,6,7,8,9,0].map(n=>`<button class="pk" data-n="${n}">${n}</button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
      sayT("Jetzt du!","Your turn!");
      P.querySelectorAll(".pk").forEach(b=>b.onclick=()=>{if(got.length>=seq.length)return;got.push(+b.dataset.n);tone(500+got.length*60,.08);P.querySelectorAll(".slots2 span")[got.length-1].textContent=b.dataset.n;
        if(got.length===seq.length){const ok=got.join()===seq.join();if(ok){score++;good();REW.hit("brain","correct");}else{bad();REW.hit("brain","wrong");}lvlUp("dig",ok,6);
          $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=ok?T("🎉 Super Gedächtnis!","🎉 Great memory!"):`${T("Fast! Richtig war","Nearly! It was")}: ${seq.join(" ")}`;
          nextBtn(P,()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} richtig`,`${score} of ${N} correct`),score>=N?3:score>=N*.6?2:score>0?1:0);});}});}}
  trial();}

/* ---------- 3. Zahlen-Jagd (Schulte table) ---------- */
function schulte(){const g=G.sch;const big=(GV()>=2||lvl("sch")>=3)&&!WO,n=big?16:9,nums=shuffle([...Array(n)].map((_,i)=>i+1));let next=1;const t0=Date.now();const P=frame(g);
  P.innerHTML=qline(`Tippe 1 bis ${n} so schnell du kannst!`,`Tap 1 to ${n} as fast as you can!`)+`<div class="qmeta"><span>${T("Nächste","Next")}: <b id="snx">1</b></span><span id="stime">0 s</span></div><div class="sgrid s${n}">${nums.map(x=>`<button class="sc" data-n="${x}">${x}</button>`).join("")}</div>`;
  sayT("Los!","Go!");const iv=setInterval(()=>{const e=$("#stime");if(!e){clearInterval(iv);return;}e.textContent=Math.round((Date.now()-t0)/1000)+" s";},500);TM.push(iv);
  P.querySelectorAll(".sc").forEach(b=>b.onclick=()=>{if(+b.dataset.n===next){b.classList.add("done");tone(400+next*30,.06);next++;$("#snx").textContent=next<=n?next:"✔";
    if(next>n){clearInterval(iv);const s=Math.round((Date.now()-t0)/100)/10;REW.hit("brain","correct");const lim=n===9?[12,20,35]:[30,45,70];const st=s<=lim[0]?3:s<=lim[1]?2:s<=lim[2]?1:0;
      if(st>=2)lvlUp("sch",true,4);const bestKey=n===9?"sch9":"sch16";const prev=BS.best[bestKey];if(!prev||s<prev){BS.best[bestKey]=s;bsave();}
      later(()=>finish(g,0,T(`${n} Zahlen in ${s} Sekunden`,`${n} numbers in ${s} seconds`),st),500);}}
    else{b.classList.add("wrong");bad();later(()=>b.classList.remove("wrong"),350);}});}

/* ---------- 4. Farben-Falle (Stroop) ---------- */
function stroop(){const g=G.str;const N=nTrials(8,4);let i=0,score=0;const P=frame(g);
  function trial(){stop();const w=pick(COLS);let ink=Math.random()<.7?pick(COLS.filter(c=>c!==w)):w;
    P.innerHTML=trialHead(P,i,N,score)+qline("Welche FARBE hat die Schrift? Nicht lesen – nur schauen!","What COLOUR is the ink? Don't read – just look!")+
      `<div class="sword" style="color:${ink[3]}">${T(w[0],w[2].toUpperCase())}</div><div class="opts four">${shuffle(COLS).map(c=>`<button class="opt" data-c="${c[1]}"><span class="dot" style="background:${c[3]}"></span>${T(c[1],c[2])}</button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
    P.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=b.dataset.c===ink[1];P.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.c===ink[1])x.classList.add("right");});
      if(ok){score++;good();REW.hit("brain","correct");}else{b.classList.add("wrong");bad();REW.hit("brain","wrong");}
      $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=ok?T(`🎉 Richtig: ${ink[1]}!`,`🎉 Right: ${ink[2]}!`):T(`Das Wort sagt ${w[1]}, aber die Schrift ist ${ink[1]}.`,`The word says ${w[2]}, but the ink is ${ink[2]}.`);
      later(()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} richtig`,`${score} of ${N} correct`),score>=N-1?3:score>=N*.6?2:score>0?1:0);},ok?700:2200);});}
  trial();}

/* ---------- 5. Was passt nicht? ---------- */
function odd(){const g=G.odd;const N=nTrials(6,3);let i=0,score=0;const P=frame(g);
  function trial(){stop();const [A,B]=shuffle(CATS).slice(0,2),three=shuffle(A[2]).slice(0,3),one=pick(B[2].filter(e=>!A[2].includes(e))),all=shuffle([...three,one]);
    P.innerHTML=trialHead(P,i,N,score)+qline("Was passt nicht dazu?","Which one does not belong?")+`<div class="opts four">${all.map(e=>`<button class="opt" data-e="${e}"><span class="oe">${e}</span></button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
    sayT("Was passt nicht dazu?","Which one does not belong?");
    P.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=b.dataset.e===one;P.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.e===one)x.classList.add("right");});
      if(ok){score++;good();REW.hit("brain","correct");}else{b.classList.add("wrong");bad();REW.hit("brain","wrong");}
      $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=T(`${ok?"🎉 Richtig!":"Fast!"} ${three.join(" ")} sind ${A[0]}. ${one} gehört zu ${B[0]}.`,`${ok?"🎉 Right!":"Nearly!"} ${three.join(" ")} are ${A[1]}. ${one} is ${B[1]}.`);
      sayT(`${three.length} sind ${A[0]}. Das passt nicht.`,`${three.length} are ${A[1]}. That one does not belong.`);
      nextBtn(P,()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} richtig`,`${score} of ${N} correct`),score>=N?3:score>=N*.6?2:score>0?1:0);});});}
  trial();}

/* ---------- 6. Rechen-Kette (mental maths chain) ---------- */
function chain(){const g=G.chn;const N=nTrials(5,3);let i=0,score=0;const P=frame(g);
  function trial(){stop();const L=lvl("chn"),steps=Math.min(5,1+L),mx=[10,20,50][GV()],sz=[2,4,9][GV()];let v=R(1,8);const st=[];
    for(let s=0;s<steps;s++){let d=R(1,sz)*(Math.random()<.5?1:-1);if(v+d<0||v+d>mx)d=-d;v+=d;st.push(d);}
    const start=v-st.reduce((a,b)=>a+b,0);let k=-1;
    P.innerHTML=trialHead(P,i,N,score)+qline("Rechne im Kopf mit!","Calculate in your head!")+`<div class="bigdig chainv" id="cv"></div>`;
    (function show(){const e=$("#cv");if(!e)return;if(k<0){e.textContent=`Start: ${start}`;sayT(`Start bei ${start}`,`Start at ${start}`);}else{const d=st[k];e.textContent=(d>0?"+ ":"− ")+Math.abs(d);{const w=(d>0?"plus ":"minus ")+Math.abs(d);sayT(w,w);}}
      e.classList.remove("pulse");void e.offsetWidth;e.classList.add("pulse");k++;if(k<st.length)later(show,2000);else later(ask,2000);})();
    function ask(){const opts=nopts(v,0,mx);P.innerHTML=trialHead(P,i,N,score)+qline("Was kommt heraus?","What is the answer?")+`<div class="opts">${opts.map(o=>`<button class="opt" data-n="${o}">${o}</button>`).join("")}</div><div class="feedback" id="bfb"></div>`;sayT("Was kommt heraus?","What is the answer?");
      P.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=+b.dataset.n===v;P.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(+x.dataset.n===v)x.classList.add("right");});
        if(ok){score++;good();REW.hit("brain","correct");}else{b.classList.add("wrong");bad();REW.hit("brain","wrong");}lvlUp("chn",ok,6);
        let run=start;const path=[String(start),...st.map(d=>{run+=d;return `${d>0?"+":"−"} ${Math.abs(d)} = ${run}`;})];
        $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=`${ok?T("🎉 Richtig!","🎉 Right!"):T("Fast!","Nearly!")} <span class="ans">${path.join(" → ")}</span>`;
        nextBtn(P,()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} richtig`,`${score} of ${N} correct`),score>=N?3:score>=N*.6?2:score>0?1:0);});});}}
  trial();}

/* ---------- 7. Farbfolge (Simon) ---------- */
function simon(){const g=G.sim;const P=frame(g);const F=[523,659,784,988];const seq=[R(0,3),R(0,3)];let best=0,busy=true,pos=0;
  P.innerHTML=qline("Schau dir die Reihenfolge an und mach sie nach!","Watch the order, then copy it!")+`<div class="qmeta"><span id="slen">${T("Länge","Length")}: 2</span><span id="sst">👀</span></div>
   <div class="simon">${COLS.map((c,i)=>`<button class="sp" data-i="${i}" style="--sc:${c[3]}" aria-label="${T(c[1],c[2])}"></button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
  const pads=[...P.querySelectorAll(".sp")];
  const flash=i=>{pads[i].classList.add("lit");tone(F[i],.3);later(()=>pads[i].classList.remove("lit"),380);};
  function play(){busy=true;$("#sst").textContent="👀";$("#slen").textContent=T("Länge","Length")+": "+seq.length;seq.forEach((x,k)=>later(()=>flash(x),700+k*650));later(()=>{busy=false;pos=0;$("#sst").textContent=T("👆 Du bist dran!","👆 Your turn!");},700+seq.length*650);}
  pads.forEach(p=>p.onclick=()=>{if(busy)return;const i=+p.dataset.i;flash(i);
    if(i===seq[pos]){pos++;if(pos===seq.length){best=seq.length;REW.hit("brain","correct");$("#bfb").className="feedback ok";$("#bfb").textContent="🎉 Super!";
      if(WO&&seq.length>=4)return later(()=>finish(g,best,"",best>=4?3:2),700);seq.push(R(0,3));later(play,900);}}
    else{busy=true;bad();REW.hit("brain","wrong");$("#bfb").className="feedback no";$("#bfb").innerHTML=T(`Oh! Deine längste Folge: ${best}`,`Oh! Your longest sequence: ${best}`);
      later(()=>finish(g,best,T(`Längste Folge: ${best}`,`Longest sequence: ${best}`),best>=6?3:best>=4?2:best>=2?1:0),1500);}});
  play();}

/* ---------- 8. Wort-Zwilling (German ↔ English) ---------- */
function twin(){const g=G.twn;const N=nTrials(8,4);let i=0,score=0;const P=frame(g);
  function trial(){stop();const w=pick(POOL),toEn=Math.random()<.5,others=shuffle(POOL.filter(x=>x!==w)).slice(0,2),opts=shuffle([w,...others]);
    P.innerHTML=trialHead(P,i,N,score)+qline(toEn?"Was heißt das auf Englisch?":"Was heißt das auf Deutsch?",toEn?"What is this in English?":"What is this in German?")+`<div class="sword small">${esc(toEn?w[1]:w[2])}</div>
      <div class="opts">${opts.map(o=>`<button class="opt" data-e="${o[0]}">${esc(toEn?o[2]:o[1])}</button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
    say(toEn?w[1]:w[2],toEn?"de":"en");
    P.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=b.dataset.e===w[0];P.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.e===w[0])x.classList.add("right");});
      if(ok){score++;good();REW.hit("brain","correct");}else{b.classList.add("wrong");bad();REW.hit("brain","wrong");}
      $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=`${w[0]} ${esc(w[1])} = ${esc(w[2])} <small>${ok?T("Richtig!","Right!"):T("So ist es richtig","This is right")}</small>`;
      say(w[1],"de").then(()=>say(w[2],"en"));
      nextBtn(P,()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} richtig`,`${score} of ${N} correct`),score>=N-1?3:score>=N*.6?2:score>0?1:0);});});}
  trial();}

/* ---------- 9. Suchbild (find and count) ---------- */
function search(){const g=G.sea;const N=nTrials(5,3);let i=0,score=0;const P=frame(g);
  function trial(){stop();const L=lvl("sea"),cells=Math.min(25,12+L*3),k=R(2,Math.min(8,3+L)),set=shuffle(POOL).slice(0,3+Math.min(3,L)),tgt=set[0],
      grid=shuffle([...Array(k).fill(tgt[0]),...[...Array(cells-k)].map(()=>pick(set.slice(1))[0])]);
    P.innerHTML=trialHead(P,i,N,score)+qline(`Wie viele ${tgt[0]} siehst du?`,`How many ${tgt[0]} can you see?`)+`<div class="sgrid2">${grid.map(e=>`<span>${e}</span>`).join("")}</div>
      <div class="opts">${nopts(k,1,12).map(o=>`<button class="opt" data-n="${o}">${o}</button>`).join("")}</div><div class="feedback" id="bfb"></div>`;
    sayT(`Wie viele ${tgt[1].split(" ").slice(1).join(" ")} siehst du?`,`Count the ${tgt[2]}! How many can you see?`);
    P.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const ok=+b.dataset.n===k;P.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(+x.dataset.n===k)x.classList.add("right");});
      if(ok){score++;good();REW.hit("brain","correct");}else{b.classList.add("wrong");bad();REW.hit("brain","wrong");}lvlUp("sea",ok,5);
      P.querySelectorAll(".sgrid2 span").forEach(s=>{if(s.textContent===tgt[0])s.classList.add("hit");});
      $("#bfb").className="feedback "+(ok?"ok":"no");$("#bfb").innerHTML=T(`${ok?"🎉 Richtig!":"Fast!"} Es sind ${k}. <small>Tipp: Zähl Reihe für Reihe!</small>`,`${ok?"🎉 Right!":"Nearly!"} There are ${k}. <small>Tip: count row by row!</small>`);
      nextBtn(P,()=>{i++;i<N?trial():finish(g,score,T(`${score} von ${N} richtig`,`${score} of ${N} correct`),score>=N?3:score>=N*.6?2:score>0?1:0);});});}
  trial();}

/* ---------- 🤸 Bewegungspause ---------- */
function move(){const g=G.mov;const m=pick(MOVES);const P=frame(g);const secs=25;
  P.innerHTML=`<div class="movecard"><div class="me">${m[2]}</div><b>${esc(T(m[0],m[1]))}</b></div><div class="timer"><i id="tmb"></i></div>
   <div class="row" style="justify-content:center"><button class="btn" id="mdone" style="--c:${g.c}">${T("Geschafft! ✅","Done! ✅")}</button><button class="btn ghost" id="mother">${T("Andere Übung","Another one")}</button></div>`;
  sayT(m[0],m[1]);requestAnimationFrame(()=>{const t=$("#tmb");if(t){t.style.transition=`width ${secs}s linear`;t.style.width="0%";}});
  $("#mother").onclick=()=>{stop();move();};
  const md=$("#mdone");md.disabled=true;let wait=10;const lab=()=>{md.textContent=wait>0?`⏳ ${wait} … ${T("mach mit!","join in!")}`:T("Geschafft! ✅","Done! ✅");};lab();
  (function tick(){later(()=>{wait--;lab();if(wait>0)tick();else{md.disabled=false;tone(880,.12);}},1000);})();
  md.onclick=()=>{stop();REW.hit("brain","move");good();if(WO){WO.i++;return nextWorkout();}gConfetti();
    P.innerHTML=`<div class="result"><div class="bigstars">💪</div><h3>${T("Stark!","Strong!")}</h3><p>${T("Bewegung macht das Gehirn wach.","Moving wakes up your brain.")}</p><div class="row"><button class="btn" id="again" style="--c:${g.c}">${T("Noch eine","One more")}</button><button class="btn ghost" id="bhome">Training</button></div></div>`;
    $("#again").onclick=()=>{stop();move();};$("#bhome").onclick=()=>{stop();home();};sayT("Stark!","Strong!");};}

/* ---------- 🏋️ Tages-Workout ---------- */
function startWorkout(){const pool=["kim","dig","str","odd","chn","twn","sea","sim"];WO={list:[...shuffle(pool).slice(0,4).map(k=>G[k]),G.mov],i:0,stars:0};
  const P=frame({e:"🏋️",de:"Tages-Workout",en:"Today's workout",c:"#7C4DDB"});
  P.innerHTML=`<p class="wolist">${WO.list.map((x,k)=>`<span>${k+1}. ${x.e} ${esc(T(x.de,x.en))}</span>`).join("")}</p><div class="row" style="justify-content:center"><button class="btn" id="wgo" style="--c:#7C4DDB">${T("Los geht's! ▶","Let's go! ▶")}</button></div>`;
  sayT("Dein Workout: vier Spiele und eine Bewegungspause. Los geht's!","Your workout: four games and a movement break. Let's go!");$("#wgo").onclick=()=>{stop();WO.list[0].fn();};}
function nextWorkout(){stop();if(WO.i<WO.list.length)return later(()=>WO.list[WO.i].fn(),300);
  const stars=WO.stars;WO=null;BS.workouts=(BS.workouts||0)+1;bsave();REW.hit("brain","workout");
  const P=frame({e:"🏆",de:"Workout geschafft!",en:"Workout complete!",c:"#7C4DDB"});
  P.innerHTML=`<div class="result"><div class="bigstars">🏋️‍♀️🧠</div><h3>${T("Workout geschafft!","Workout complete!")}</h3><p>⭐ ${stars} ${T("Sterne","stars")} · +5 ${T("Punkte","points")}</p><div class="row"><button class="btn" id="bhome" style="--c:#7C4DDB">Training</button></div></div>`;
  $("#bhome").onclick=()=>home();gConfetti();gFanfare();sayT("Super! Workout geschafft!","Super! Workout complete!");}

/* ---------- games + home ---------- */
const G={kim:{id:"kim",e:"🔍",de:"Was fehlt?",en:"What's missing?",cat:["Gedächtnis","Memory"],c:"#7C4DDB",d:["Merk dir die Bilder und finde das, was fehlt.","Remember the pictures, then find the missing one."],fn:kim},
 dig:{id:"dig",e:"🔢",de:"Zahlen merken",en:"Number memory",cat:["Gedächtnis","Memory"],c:"#2F5BEA",d:["Schau dir die Zahlen an und tippe sie in der gleichen Reihenfolge.","Watch a row of numbers and tap them back in order."],fn:digits},
 sch:{id:"sch",e:"🎯",de:"Zahlen-Jagd",en:"Number hunt",cat:["Aufmerksamkeit","Attention"],c:"#E0443E",d:["Tippe 1, 2, 3 … so schnell du kannst.","Tap 1, 2, 3 … as fast as you can."],fn:schulte},
 str:{id:"str",e:"🎨",de:"Farben-Falle",en:"Colour trap",cat:["Konzentration","Focus"],c:"#D6397E",d:["Nimm die Farbe der Schrift, nicht das Wort!","Pick the ink colour, not the word!"],fn:stroop},
 odd:{id:"odd",e:"🧩",de:"Was passt nicht?",en:"Odd one out",cat:["Logik","Logic"],c:"#1F9D63",d:["Finde das Bild, das nicht dazu passt.","Find the picture that does not belong."],fn:odd},
 chn:{id:"chn",e:"⛓️",de:"Rechen-Kette",en:"Maths chain",cat:["Kopfrechnen","Mental maths"],c:"#D97A06",d:["Rechne die + und − Schritte im Kopf.","Follow the + and − steps in your head."],fn:chain},
 sim:{id:"sim",e:"🎵",de:"Farbfolge",en:"Colour sequence",cat:["Gedächtnis","Memory"],c:"#0E9488",d:["Schau, welche Farben leuchten, und mach es nach.","Watch the colours light up and copy them."],fn:simon},
 twn:{id:"twn",e:"🔁",de:"Wort-Zwilling",en:"Word twins",cat:["Deutsch ↔ Englisch","German ↔ English"],c:"#4B54D9",d:["Wechsle zwischen deutschen und englischen Wörtern.","Switch between German and English words."],fn:twin},
 sea:{id:"sea",e:"🔎",de:"Suchbild",en:"Find and count",cat:["Aufmerksamkeit","Attention"],c:"#B7791F",d:["Finde das Bild und zähle es.","Find and count the picture."],fn:search},
 mov:{id:"mov",e:"🤸",de:"Bewegungspause",en:"Movement break",cat:["Bewegung","Movement"],c:"#EA580C",d:["Springen, balancieren, zählen – dann weiter denken!","Jump, balance and count – then back to thinking!"],fn:move}};
function home(){stop();WO=null;const d=REW.day();
  const bestTxt=id=>id==="sch"?(BS.best.sch9?`⏱ ${BS.best.sch9}s`:T("✨ Neu","✨ New")):id==="sim"?(BS.best.sim?`🏅 ${BS.best.sim}`:T("✨ Neu","✨ New")):id==="mov"?`💪 ${REW.R().tot.moves||0}`:(BS.best[id]?`🏅 ${BS.best[id]}`:T("✨ Neu","✨ New"));
  ROOT.innerHTML=`<div class="hello"><div class="big">🧠</div><div><h2>${T("Gehirn-Training","Brain gym")}</h2><div class="pseg blang" role="group" aria-label="${T("Sprache","Language")}"><button data-l="de" class="${UIL.cur==="de"?"on":""}">🇩🇪 Deutsch</button><button data-l="en" class="${UIL.cur==="en"?"on":""}">🇬🇧 English</button></div><p>${T("Heute","Today")}: ${d.brain} ✔ · ${d.workouts||0} Workout${(d.workouts||0)===1?"":"s"} · ${BS.workouts||0} ${T("insgesamt","total")}</p></div></div>${gradeTabs("brain")}
   <p class="bnote3">${[T("🐣 Anfänger: kurze Folgen, Rechnen bis 10, kleine Felder","🐣 Beginner: short sequences, maths to 10, small grids"),T("1️⃣ Klasse 1: längere Folgen, Rechnen bis 20","1️⃣ Year 1: longer sequences, maths to 20"),T("2️⃣ Klasse 2: schwerer, Rechnen bis 50, großes Zahlenfeld","2️⃣ Year 2: harder, maths to 50, big number grid")][GV()]}</p>
   <button class="block chall wo" id="wo"><span class="emo">🏋️</span><span><b>${T("Tages-Workout starten","Start today's workout")}</b><span>${T("4 Gehirn-Spiele und eine Bewegungspause (etwa 5 Minuten)","4 brain games and a movement break (about 5 minutes)")}</span></span><span class="go2">▶</span></button>
   <button class="block chall wo" id="nbm"><span class="emo">📓</span><span><b>${T("Merk-Heft","Memory notebook")}</b><span>${T("Bilder anschauen, Bildschirm aus, dann aufschreiben oder malen, was du dir gemerkt hast","Look at pictures, screen off, then write or draw what you remember")}</span></span><span class="go2">▶</span></button>
   <div class="sec">${T("Spiele","Games")}</div><div class="grid">${Object.values(G).map(x=>`<button class="block ucard bcard" data-g="${x.id}" style="--c:${x.c}"><span class="emo">${x.e}</span><span class="t">${esc(T(x.de,x.en))}</span><span class="pg">${esc(T(x.cat[0],x.cat[1]))}</span><span class="pg2">${esc(T(x.d[0],x.d[1]))}</span><span class="st">${bestTxt(x.id)}</span></button>`).join("")}</div>
   <p class="note">${T("Die Spiele werden automatisch schwerer, wenn es gut klappt, und leichter, wenn es schwer ist.","The games get harder by themselves when it goes well, and easier when it is hard.")}</p>`;
  wireGradeTabs(ROOT,"brain",home);$("#nbm").style.setProperty("--c","#0E9488");$("#nbm").style.setProperty("--cl","#D2F3EF");$("#nbm").onclick=()=>{stop();NB.open({subj:"brain",kind:"merk"});};$("#wo").style.setProperty("--c","#7C4DDB");$("#wo").style.setProperty("--cl","#ECE4FC");$("#wo").onclick=startWorkout;
  ROOT.querySelectorAll(".bcard").forEach(b=>b.onclick=()=>{stop();G[b.dataset.g].fn();});
  ROOT.querySelectorAll(".blang button").forEach(b=>b.onclick=()=>{PROF.setBrainLang(b.dataset.l);UIL.set(b.dataset.l);home();try{renderGbar();}catch(e){}});}
return {home,stop};
