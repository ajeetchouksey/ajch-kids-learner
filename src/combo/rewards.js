/* ============================ REWARDS: points · levels · daily goals · streak · awards · report ============================ */
const REW=(function(){
  const KEY="aarya-rewards-v1";
  const SUBJ=["en","de","math","brain"];
  const blank=()=>({points:0,tot:{en:0,math:0,de:0,read:0,rounds:0,perfect:0,brain:0,moves:0,workouts:0,secs:0,heft:0,offline:0,diktatPerfect:0,written:0,talk:0,hi:0,mr:0},wrong:{en:0,de:0,math:0,brain:0,hi:0,mr:0},
    sp:{en:0,de:0,math:0,brain:0,hi:0,mr:0,bonus:0},days:{},badges:{},goal:{en:3,math:5,de:5,read:2,brain:2,heft:1},opt:{rainbow:false},streak:0,lastGoalDay:"",lv:0,bestCombo:0,seen:[]});
  const OLDGOAL=[{en:10,math:10,de:5,read:5},{en:10,math:10,de:5,read:5,brain:5},{en:10,math:10,de:5,read:5,brain:5,heft:0}];
  let R=blank();
  try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s){const b=blank();R=Object.assign(b,s,{tot:Object.assign(b.tot,s.tot||{}),wrong:Object.assign(b.wrong,s.wrong||{}),goal:Object.assign(b.goal,s.goal||{})});
    if(s.lv===undefined)R.lv=-1;
    if(!s.goal||OLDGOAL.some(o=>JSON.stringify(o)===JSON.stringify(s.goal)))R.goal=blank().goal;
    R.opt=Object.assign(blank().opt,s.opt||{});
    for(const k in R.goal)R.goal[k]=Math.max(0,Math.min(50,Math.round(+R.goal[k]||0)));
    if(!R.days||typeof R.days!=="object"||Array.isArray(R.days))R.days={};
    if(!R.badges||typeof R.badges!=="object")R.badges={};for(const k in R.badges)R.badges[k]=String(R.badges[k]).replace(/[^0-9-]/g,"").slice(0,10);
    for(const k in R.tot)R.tot[k]=Math.max(0,+R.tot[k]||0);R.points=Math.max(0,+R.points||0);
    if(!s.sp){const t=R.tot,sp={en:t.en+t.read,de:t.de,math:t.math,brain:t.brain+2*t.moves+5*t.workouts};const used=sp.en+sp.de+sp.math+sp.brain;
      if(used>R.points){const f=R.points/Math.max(1,used);for(const k in sp)sp[k]=Math.floor(sp[k]*f);}sp.bonus=Math.max(0,R.points-(sp.en+sp.de+sp.math+sp.brain));R.sp=sp;}
    else R.sp=Object.assign(blank().sp,s.sp);}}catch(e){}
  let saveWarned=false;
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(R));return true;}catch(e){if(!saveWarned){saveWarned=true;setTimeout(()=>toast(T("⚠️ Speichern im Browser fehlgeschlagen – bitte Datei sichern (🔒 Eltern)","⚠️ Saving in the browser failed – please back up the file (🔒 Parents)")),50);}return false;}};
  let dateOverride=null;
  const pad=n=>String(n).padStart(2,"0");
  const dstr=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const today=()=>dateOverride||dstr(new Date());
  const addDays=(s,k)=>{const [y,m,d]=s.split("-").map(Number);const t=new Date(y,m-1,d+k);return dstr(t);};
  const day=(s=today())=>{const d=R.days[s]||(R.days[s]={});for(const k of ["en","math","de","read","rounds","brain","moves","workouts","secs","heft","offline","written","talk","hi","mr"])d[k]=d[k]||0;
    d.wrong=Object.assign({en:0,de:0,math:0,brain:0,hi:0,mr:0},d.wrong||{});d.goal=!!d.goal;d.rainbow=!!d.rainbow;return d;};

  /* ---------- levels: points → animal level ---------- */
  const LEVELS=[[0,"🐣","Küken","chick"],[20,"🐥","Spatz","sparrow"],[50,"🐰","Hase","bunny"],[100,"🦊","Fuchs","fox"],[175,"🐬","Delfin","dolphin"],
    [275,"🦉","Eule","owl"],[400,"🐼","Panda","panda"],[550,"🦁","Löwe","lion"],[750,"🐘","Elefant","elephant"],[1000,"🦄","Einhorn","unicorn"],
    [1300,"🐉","Drache","dragon"],[1700,"🌟","Superstar","superstar"],[2200,"👑","Lern-Königin","learning queen"]];
  function level(p=R.points){let i=0;while(i+1<LEVELS.length&&p>=LEVELS[i+1][0])i++;const L=LEVELS[i],N=LEVELS[i+1];
    return {i,n:i+1,e:L[1],de:L[2],en:L[3],from:L[0],to:N?N[0]:null,left:N?N[0]-p:0,p:N?(p-L[0])/(N[0]-L[0]):1};}

  /* every badge: id, emoji, German, English, how to earn [German, English], progress () => [value, target] */
  const units=m=>{try{return Object.values(m.S().best).filter(x=>x>0).length;}catch(e){return 0;}};
  const BADGES=[
    ["first","👣","Erster Schritt","First step",["Beantworte deine erste Frage richtig.","Answer your first question correctly."],()=>[R.tot.en+R.tot.math+R.tot.de+R.tot.brain,1]],
    ["en10","🔤","Wort-Entdeckerin","Word explorer",["10 richtige Antworten in English.","10 correct English answers."],()=>[R.tot.en,10]],
    ["en50","📚","Grammatik-Heldin","Grammar hero",["50 richtige Antworten in English.","50 correct English answers."],()=>[R.tot.en,50]],
    ["en200","🌟","English-Star","English star",["200 richtige Antworten in English.","200 correct English answers."],()=>[R.tot.en,200]],
    ["m10","🔢","Zahlen-Entdeckerin","Number explorer",["10 richtige Antworten in Mathe.","10 correct maths answers."],()=>[R.tot.math,10]],
    ["m50","🧮","Rechen-Profi","Maths pro",["50 richtige Antworten in Mathe.","50 correct maths answers."],()=>[R.tot.math,50]],
    ["m200","🏅","Mathe-Star","Maths star",["200 richtige Antworten in Mathe.","200 correct maths answers."],()=>[R.tot.math,200]],
    ["de10","🇩🇪","Deutsch-Entdeckerin","German explorer",["10 richtige Antworten in Deutsch.","10 correct Deutsch answers."],()=>[R.tot.de,10]],
    ["de50","✏️","Wörter-Profi","Word pro",["50 richtige Antworten in Deutsch.","50 correct Deutsch answers."],()=>[R.tot.de,50]],
    ["de200","📜","Deutsch-Star","German star",["200 richtige Antworten in Deutsch.","200 correct Deutsch answers."],()=>[R.tot.de,200]],
    ["brain10","🧠","Denk-Sportlerin","Brain athlete",["10 richtige Antworten im Training.","10 correct answers in brain training."],()=>[R.tot.brain,10]],
    ["brain50","🦉","Gedächtnis-Ass","Memory ace",["50 richtige Antworten im Training.","50 correct answers in brain training."],()=>[R.tot.brain,50]],
    ["brain200","🚀","Super-Gehirn","Super brain",["200 richtige Antworten im Training.","200 correct answers in brain training."],()=>[R.tot.brain,200]],
    ["move5","🤸‍♀️","Bewegungs-Star","Movement star",["Mach 5 Bewegungspausen.","Do 5 movement breaks."],()=>[R.tot.moves,5]],
    ["workout1","🏋️","Erstes Workout","First workout",["Mach ein Workout im Training ganz fertig.","Finish one daily brain workout."],()=>[R.tot.workouts,1]],
    ["workout7","💎","Workout-Woche","Workout week",["Mach 7 Workouts ganz fertig.","Finish 7 brain workouts."],()=>[R.tot.workouts,7]],
    ["heft1","📓","Heft-Heldin","Notebook hero",["Mach deine erste Heft-Zeit fertig.","Finish your first notebook time."],()=>[R.tot.heft,1]],
    ["heft10","🖊️","Schreib-Profi","Writing pro",["Mach 10 Heft-Zeiten fertig.","Finish 10 notebook times."],()=>[R.tot.heft,10]],
    ["written50","✍️","Heft-Schreiberin","Notebook writer",["Schreib 50 Antworten zuerst in dein Heft (Heft-Modus).","Write 50 answers in your notebook first (notebook mode)."],()=>[R.tot.written,50]],
    ["diktat","🎧","Diktat-Star","Dictation star",["Ein Diktat mit 6 oder mehr Wörtern, alles richtig – ein Erwachsener schaut nach.","A dictation with 6 or more items, all right – checked by a parent."],()=>[R.tot.diktatPerfect,1]],
    ["fix10","🩹","Verbesserin","Fixer",["Schreib 10 Berichtigungen in dein Heft.","Write 10 corrections in your notebook."],()=>[R.tot.fixes||0,10]],
    ["offline60","🌿","Bildschirm-Pause","Screen break",["Schreib 60 Minuten in dein Heft, ohne Bildschirm.","Write 60 minutes in your notebook with the screen off."],()=>[Math.floor(R.tot.offline/60),60]],
    ["hi10","🪷","Hindi-Entdeckerin","Hindi explorer",["10 richtige Antworten in Hindi.","10 correct Hindi answers."],()=>[R.tot.hi||0,10]],
    ["mr10","🌺","Marathi-Entdeckerin","Marathi explorer",["10 richtige Antworten in Marathi.","10 correct Marathi answers."],()=>[R.tot.mr||0,10]],
    ["talk10","🗣️","Plaudertasche","Chatterbox",["Beantworte 10 Fragen mit Sprechen (Sprich mit mir).","Answer 10 questions by speaking (Talk with me)."],()=>[R.tot.talk||0,10]],
    ["talk50","🎙️","Sprech-Star","Speaking star",["Beantworte 50 Fragen mit Sprechen.","Answer 50 questions by speaking."],()=>[R.tot.talk||0,50]],
    ["combo10","💪","Dranbleiben","Keep going",["Beantworte 20 Fragen am Stück – richtig oder falsch, jeder Versuch zählt!","Answer 20 questions in one go – right or wrong, every try counts!"],()=>[R.bestCombo,20]],
    ["rainbow","🌈","Regenbogen-Tag","Rainbow day",["3 richtige Antworten in English, Deutsch, Mathe und Training an einem Tag.","3 correct answers in English, Deutsch, Mathe and Training on one day."],()=>[Object.values(R.days).filter(d=>d.rainbow).length,1]],
    ["rainbow5","🎨","Regenbogen-Profi","Rainbow pro",["5 Regenbogen-Tage.","5 rainbow days."],()=>[Object.values(R.days).filter(d=>d.rainbow).length,5]],
    ["three","🎪","Alles-Könnerin","All-rounder",["Beantworte an einem Tag je 5 Fragen in English, Deutsch und Mathe.","Answer 5 questions in English, Deutsch and Mathe on the same day."],()=>[Object.values(R.days).filter(d=>d.en>=5&&d.math>=5&&d.de>=5).length,1]],
    ["read10","📖","Leserin","Reader",["Lies 10 Sätze laut vor.","Read 10 sentences out loud."],()=>[R.tot.read,10]],
    ["read50","📗","Super-Leserin","Super reader",["Lies 50 Sätze laut vor.","Read 50 sentences out loud."],()=>[R.tot.read,50]],
    ["perfect","⭐","Perfekte Runde","Perfect round",["Schaffe eine Runde mit 3 Sternen.","Finish a round with 3 stars."],()=>[R.tot.perfect,1]],
    ["perfect10","💫","Sterne-Sammlerin","Star collector",["Schaffe 10 Runden mit 3 Sternen.","Finish 10 rounds with 3 stars."],()=>[R.tot.perfect,10]],
    ["rounds10","💪","Fleißige Biene","Busy bee",["Spiel 10 Runden – egal welches Spiel.","Finish 10 rounds of any game."],()=>[R.tot.rounds,10]],
    ["time60","⏱️","Lern-Stunde","Learning hour",["Lerne zusammen 60 Minuten.","Learn for 60 minutes in total."],()=>[Math.floor(R.tot.secs/60),60]],
    ["goal1","🎯","Tagesziel!","Daily goal",["Schaffe einmal dein Tagesziel.","Reach your daily goal once."],()=>[Object.values(R.days).filter(d=>d.goal).length,1]],
    ["streak3","📅","3 Zieltage","3 goal days",["Schaffe dein Tagesziel an 3 Tagen in einer Woche.","Reach your daily goal on 3 days in one week."],()=>[weekDays(),3]],
    ["streak7","🏆","Wochen-Champion","Week champion",["Schaffe dein Tagesziel an 5 Tagen in einer Woche.","Reach your daily goal on 5 days in one week."],()=>[weekDays(),5]],
    ["enTopics","🗺️","English-Reisende","English traveller",["Sammle Sterne in 5 English-Themen.","Get stars in 5 English topics."],()=>[units(EN),5]],
    ["deTopics","🧩","Deutsch-Reisende","German traveller",["Sammle Sterne in 5 Deutsch-Themen.","Get stars in 5 Deutsch topics."],()=>[units(DE),5]],
    ["maTopics","🧭","Mathe-Reisende","Maths traveller",["Sammle Sterne in 5 Mathe-Themen.","Get stars in 5 Mathe topics."],()=>[units(MA),5]],
    ["both","🎓","Doppel-Tag","Double day",["Mach English und Mathe am selben Tag (je 5 Antworten).","Do English and Mathe on the same day (5 answers each)."],()=>[Object.values(R.days).filter(d=>d.en>=5&&d.math>=5).length,1]]
  ];
  function weekDays(){const t=today();let n=0;for(let i=0;i<7;i++){const x=R.days[addDays(t,-i)];if(x&&x.goal)n++;}return n;}
  function curStreak(){if(!R.lastGoalDay)return 0;const t=today();return (R.lastGoalDay===t||R.lastGoalDay===addDays(t,-1))?R.streak:0;}

  /* ---------- pop-ups: wait while a timed game is running ---------- */
  const BUSY='[id^="app"]:not([hidden]) #bb, #vBrain:not([hidden]) .sgrid, #vBrain:not([hidden]) .simon, #vBrain:not([hidden]) .bigdig, #vBrain:not([hidden]) .timer';
  const busy=()=>!!document.querySelector(BUSY);
  const queue=[];let showing=false,waitT=null;
  function popup(emoji,de,en,sub,kind){queue.push({emoji,de,en,sub,kind});if(!showing)nextPop();}
  function nextPop(){clearTimeout(waitT);const el=document.getElementById("awardpop");if(!queue.length||!el){showing=false;return;}
    showing=true;if(busy()){waitT=setTimeout(nextPop,800);return;}
    const p=queue.shift();const head={goal:T("Geschafft!","Done!"),lvl:T("Neue Stufe!","Level up!"),bonus:T("Bonus!","Bonus!")}[p.kind]||T("Neue Auszeichnung!","New award!");
    const name=T(p.de,p.en),sub=Array.isArray(p.sub)?T(p.sub[0],p.sub[1]):p.sub;
    el.innerHTML=`<div class="apcard" role="dialog" aria-label="${name}"><div class="apemo">${p.emoji}</div><div class="apk">${head}</div><h3>${name}</h3><p class="apsub">${sub}</p><button class="btn" id="apok">${T("Juhu! 🎉","Yay! 🎉")}</button></div>`;
    el.hidden=false;try{gConfetti(150);gFanfare();}catch(e){}
    const line={goal:T("Super! Tagesziel geschafft!","Great! Daily goal reached!"),lvl:T("Juhu! Neue Stufe: "+p.de,"Yay! New level: "+p.en),bonus:T("Toll! "+p.de,"Great! "+p.en)}[p.kind]||T("Toll! Neue Auszeichnung: "+p.de,"Great! New award: "+p.en);
    try{EN.stopSpeech();MA.stopSpeech();DE.stopSpeech();const u=new SpeechSynthesisUtterance(line);u.lang=T("de-DE","en-GB");u.rate=.8;speechSynthesis.speak(u);}catch(e){}
    document.getElementById("apok").onclick=()=>{el.hidden=true;setTimeout(nextPop,250);};}
  /* small non-blocking messages and the flying "+1" */
  function toast(t){const el=document.getElementById("toast");if(!el)return;el.textContent=t;el.classList.remove("on");void el.offsetWidth;el.classList.add("on");}
  function fly(n){const p=document.getElementById("pts");if(!p||n<=0)return;const s=document.createElement("span");s.className="fly";s.textContent="+"+n;p.appendChild(s);setTimeout(()=>s.remove(),1100);
    p.classList.remove("bump");void p.offsetWidth;p.classList.add("bump");}

  function checkBadges(){let got=false;for(const b of BADGES){if(R.badges[b[0]])continue;const [v,t]=b[5]();if(v>=t){R.badges[b[0]]=today();got=true;popup(b[1],b[2],b[3],b[4]);}}if(got)save();}
  function goalMet(d){const g=R.goal;if(!(g.en+g.math+g.de+g.read+g.brain+(g.heft||0)))return false;return d.en>=g.en&&d.math>=g.math&&d.de>=g.de&&d.read>=g.read&&d.brain>=g.brain&&d.heft>=(g.heft||0);}
  const MOVE_PTS_PER_DAY=5,KEEP_EVERY=10;
  let combo=0,lastT=0;
  /* every try counts: no penalty for mistakes */
  function attempt(){combo++;if(combo>R.bestCombo)R.bestCombo=combo;if(combo%KEEP_EVERY===0){R.points+=2;toast(T(`💪 ${combo} Fragen geschafft! +2`,`💪 ${combo} questions done! +2`));}}

  /* called by every part of the app */
  function hit(app,kind,n=1){
    const d=day(),p0=R.points;
    if(["correct","wrong","read","move","checked"].includes(kind)){const now=Date.now();if(lastT&&now-lastT>300000)combo=0;if(lastT&&now-lastT<180000){const s=Math.round(Math.min(60,(now-lastT)/1000));d.secs+=s;R.tot.secs+=s;}lastT=now;}
    if(kind==="correct"){R.tot[app]++;d[app]++;R.points+=1;attempt();}
    else if(kind==="wrong"){if(app in R.wrong){R.wrong[app]++;d.wrong[app]++;}attempt();}
    else if(kind==="checked"){const o=n||{};if(o.right){R.tot[app]++;d[app]++;}else if(app in R.wrong){R.wrong[app]++;d.wrong[app]++;}R.points+=1;attempt();}
    else if(kind==="fix"){R.tot.fixes=(R.tot.fixes||0)+1;R.points+=2;}
    else if(kind==="read"){R.tot.read++;d.read++;R.points+=1;}
    else if(kind==="round"){R.tot.rounds++;d.rounds++;R.points+=2*n;if(n>=3)R.tot.perfect++;}
    else if(kind==="move"){R.tot.moves++;d.moves++;if(d.moves<=MOVE_PTS_PER_DAY)R.points+=2;}
    else if(kind==="written"){const o=n||{};R.tot.written++;d.written++;const s=Math.min(180,o.secs||0);R.tot.offline+=s;d.offline+=s;R.points+=1;}
    else if(kind==="heft"){const o=n||{};R.tot.heft++;d.heft++;R.tot.offline+=o.secs||0;d.offline+=o.secs||0;R.points+=3+(o.parent?2:0);if(o.perfectDikt&&o.parent)R.tot.diktatPerfect++;}
    else if(kind==="spoke"){R.tot.talk=(R.tot.talk||0)+1;d.talk++;}
    else if(kind==="plan"){R.points+=5;}
    else if(kind==="workout"){R.tot.workouts++;d.workouts++;R.points+=5;}
    {const g=R.points-p0;if(g>0)R.sp[app in R.sp?app:"bonus"]+=g;}const p1=R.points;
    if(R.opt.rainbow&&!d.rainbow&&SUBJ.every(k=>d[k]>=3)){d.rainbow=true;R.points+=5;popup("🌈","Regenbogen-Tag!","Rainbow day!",["English, Deutsch, Mathe und Training geübt · +5 Punkte","English, Deutsch, Mathe and Training practised · +5 points"],"bonus");}
    if(!d.goal&&goalMet(d)){d.goal=true;const t=today();R.streak=(R.lastGoalDay===addDays(t,-1))?R.streak+1:(R.lastGoalDay===t?R.streak:1);R.lastGoalDay=t;R.points+=10;
      popup("🎯","Tagesziel geschafft!","Daily goal reached!",[`+10 Punkte · 📅 ${weekDays()} von 7 Tagen diese Woche`,`+10 points · 📅 ${weekDays()} of 7 days this week`],"goal");}
    if(R.points>p1)R.sp.bonus+=R.points-p1;
    checkLevel();fly(R.points-p0);
    save();checkBadges();refresh();
  }
  function checkLevel(){const L=level();if(R.lv<0){R.lv=L.i;return;}if(L.i>R.lv){R.lv=L.i;popup(L.e,`Stufe ${L.n}: ${L.de}`,`Level ${L.n}: ${L.en}`,L.to?[`Noch ${L.left} Punkte bis zur nächsten Stufe`,`${L.left} more points to the next level`]:["Höchste Stufe!","Top level!"],"lvl");}}
  function refresh(){const L=level();const v=document.getElementById("ptsv");if(v)v.textContent=R.points;const e=document.getElementById("ptsl");if(e)e.textContent=L.e;
    try{if(typeof renderGbar==="function")renderGbar();}catch(e){}
    if(typeof renderToday==="function"&&!document.getElementById("vToday").hidden)renderToday();
    if(typeof renderAwards==="function"&&!document.getElementById("vAwards").hidden)renderAwards();
    if(typeof renderParent==="function"&&document.getElementById("vParent")&&!document.getElementById("vParent").hidden)renderParent();}
  function setGoal(k,v){R.goal[k]=Math.max(0,Math.min(50,v));const d=day();if(!d.goal&&goalMet(d))hit("en","noop");save();refresh();}
  function reset(){try{AAI.backup("reset");}catch(e){}R=blank();combo=0;save();refresh();}
  function setOpt(k,v){R.opt[k]=v;save();refresh();}
  return {hit,R:()=>R,day,today,addDays,BADGES,LEVELS,level,curStreak,weekDays,setOpt,toast,setGoal,reset,goalMet,checkBadges,checkLevel,save,refresh,combo:()=>combo,SUBJ,_setDate:s=>{dateOverride=s;}};
})();
