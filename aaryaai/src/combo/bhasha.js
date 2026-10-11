/* ============================ 🪔 BHASHA: Hindi & Marathi learning with native voices ============================
   - Content words are only ever spoken with a real Hindi (hi-IN) or Marathi (mr-IN) voice. If the device has none, the app stays silent
     for that language and tells the parent how to get one – it never falls back to a voice with the wrong accent.
   - Instruction language per subject: Hindi → हिंदी / English / Deutsch; Marathi → मराठी / हिंदी / English / Deutsch. */
const BH=(function(ROOT){
  const KEY="aarya-bhasha-v1";
  let S={lang:"hi",instr:{hi:"hi",mr:"mr"},best:{},rate:.8,len:10,said:0};
  try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&typeof s==="object"){S=Object.assign(S,s);S.instr=Object.assign({hi:"hi",mr:"mr"},s.instr||{});S.best=s.best&&typeof s.best==="object"?s.best:{};}}catch(e){}
  if(!["hi","mr"].includes(S.lang))S.lang="hi";
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
  const $=s=>ROOT.querySelector(s),$$=s=>[...ROOT.querySelectorAll(s)];
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const girl=()=>{try{return PROF.get().gender!=="m";}catch(e){return true;}};

  /* ---------- native voices ---------- */
  const LOC={hi:"hi-IN",mr:"mr-IN",en:"en-GB",de:"de-DE"};
  let VOICES=[];
  function loadVoices(){try{VOICES=(window.speechSynthesis&&speechSynthesis.getVoices())||[];}catch(e){VOICES=[];}}
  loadVoices();try{speechSynthesis.addEventListener("voiceschanged",()=>{loadVoices();if(!ROOT.hidden&&ROOT.querySelector(".bhvoice"))home();});}catch(e){}
  const vlang=v=>String(v.lang||"").toLowerCase().replace("_","-");
  /* the voice must be made for this language (lang code hi-… / mr-…); nicer neural/online voices first */
  function voiceFor(l){const vs=VOICES.filter(v=>vlang(v).split("-")[0]===l);if(!vs.length)return null;
    const sc=v=>(/natural|neural|online|premium|enhanced/i.test(v.name)?4:0)+(/google/i.test(v.name)?2:0)+(vlang(v)===LOC[l].toLowerCase()?1:0)+(v.localService?0:0);
    return vs.slice().sort((a,b)=>sc(b)-sc(a))[0];}
  let seq=0;
  function stop(){seq++;try{speechSynthesis.cancel();}catch(e){}stopMic();}
  /* speak one text with the native voice of language l; resolves false (and says nothing) if there is no native voice */
  function say(text,l,o={}){const my=seq;return new Promise(res=>{const v=voiceFor(l);if(!v||!window.speechSynthesis){res(false);return;}
    try{const u=new SpeechSynthesisUtterance(String(text));u.voice=v;u.lang=v.lang;u.rate=o.rate||((l==="hi"||l==="mr")?S.rate:.9);u.pitch=1.05;
      let done=false;const fin=ok=>{if(!done){done=true;res(ok);}};u.onend=()=>fin(true);u.onerror=()=>fin(false);setTimeout(()=>fin(true),Math.min(9000,1500+String(text).length*160));
      if(my!==seq){fin(false);return;}speechSynthesis.speak(u);}catch(e){res(false);}});}
  const sayL=t=>say(t,S.lang);                   /* content: always the native voice of the subject */
  const sayI=t=>say(t,il());                     /* instructions: the native voice of the instruction language */

  /* ---------- instruction language ---------- */
  const INSTR={hi:["hi","en","de"],mr:["mr","hi","en","de"]};
  const LNAME={hi:"हिंदी",mr:"मराठी",en:"English",de:"Deutsch"};
  const il=()=>INSTR[S.lang].includes(S.instr[S.lang])?S.instr[S.lang]:S.lang;
  const UI={
   mr:{learn:"शिका",learnS:"कार्डवर टॅप कर आणि ऐक",quiz:"खेळ",quizS:"ऐक, पाहा आणि निवड",speak:"बोल",speakS:"ऐक आणि मोठ्याने बोल",back:"← सर्व धडे",next:"पुढे ▶",again:"पुन्हा 🔁",
    listen:"ऐक आणि योग्य चित्र निवड.",listenW:"ऐक आणि योग्य शब्द निवड.",whatIs:"हे काय आहे?",whichPic:"हा शब्द कोणत्या चित्राचा आहे?",starts:"{w} कोणत्या अक्षराने सुरू होते?",has:"{w} या शब्दात कोणते अक्षर आहे?",
    letterHear:"ऐक: हे कोणते अक्षर आहे?",join:"जोड: {c} + {m} = ?",count:"किती आहेत?",digit:"हा अंक कोणता?",numHear:"ऐक आणि अंक निवड.",situ:"तू काय म्हणशील?",phraseHear:"ऐक आणि योग्य वाक्य निवड.",
    right:"छान! बरोबर!",wrong:"अरेरे! बरोबर उत्तर:",sayIt:"आता तू बोल!",mic:"🎤 टॅप कर आणि बोल",listening:"मी ऐकते आहे…",heard:"मी ऐकले:",goodSay:"वा! अगदी बरोबर!",tryAgain:"पुन्हा ऐक आणि बोल.",
    parentQ:"आई-बाबा: बरोबर म्हटले का?",yes:"✓ हो",no:"✗ अजून सराव",done:"झाले!",score:"{n} पैकी {r} बरोबर",start:"सुरू कर ▶",instr:"सूचनांची भाषा",begin:"सुरुवात",more:"पुढचे धडे",meaning:"अर्थ"},
   hi:{learn:"सीखो",learnS:"कार्ड पर टैप करो और सुनो",quiz:"खेल",quizS:"सुनो, देखो और चुनो",speak:"बोलो",speakS:"सुनो और ज़ोर से बोलो",back:"← सभी पाठ",next:"आगे ▶",again:"फिर से 🔁",
    listen:"सुनो और सही चित्र चुनो।",listenW:"सुनो और सही शब्द चुनो।",whatIs:"यह क्या है?",whichPic:"यह शब्द किस चित्र का है?",starts:"{w} किस अक्षर से शुरू होता है?",has:"{w} में कौन-सा अक्षर है?",
    letterHear:"सुनो: यह कौन-सा अक्षर है?",join:"जोड़ो: {c} + {m} = ?",count:"कितने हैं?",digit:"यह कौन-सा अंक है?",numHear:"सुनो और अंक चुनो।",situ:"तुम क्या कहोगे?",phraseHear:"सुनो और सही वाक्य चुनो।",
    right:"शाबाश! सही!",wrong:"अरे! सही उत्तर है:",sayIt:"अब तुम बोलो!",mic:"🎤 टैप करो और बोलो",listening:"मैं सुन रही हूँ…",heard:"मैंने सुना:",goodSay:"वाह! बिल्कुल सही!",tryAgain:"फिर से सुनो और बोलो।",
    parentQ:"मम्मी-पापा: सही बोला?",yes:"✓ हाँ",no:"✗ और अभ्यास",done:"हो गया!",score:"{n} में से {r} सही",start:"शुरू करो ▶",instr:"निर्देशों की भाषा",begin:"शुरुआत",more:"आगे के पाठ",meaning:"मतलब"},
   en:{learn:"Learn",learnS:"Tap a card and listen",quiz:"Play",quizS:"Listen, look and choose",speak:"Speak",speakS:"Listen and say it out loud",back:"← All lessons",next:"Next ▶",again:"Again 🔁",
    listen:"Listen and choose the right picture.",listenW:"Listen and choose the right word.",whatIs:"What is this?",whichPic:"Which picture is this word?",starts:"Which letter does {w} start with?",has:"Which letter is in {w}?",
    letterHear:"Listen: which letter is it?",join:"Put together: {c} + {m} = ?",count:"How many are there?",digit:"Which number is this?",numHear:"Listen and choose the number.",situ:"What do you say?",phraseHear:"Listen and choose the right sentence.",
    right:"Great! That's right!",wrong:"Oops! The right answer is:",sayIt:"Now you say it!",mic:"🎤 Tap and speak",listening:"I'm listening…",heard:"I heard:",goodSay:"Wow! Exactly right!",tryAgain:"Listen again and say it.",
    parentQ:"Mum/Dad: said it right?",yes:"✓ Yes",no:"✗ More practice",done:"Done!",score:"{r} of {n} right",start:"Start ▶",instr:"Instruction language",begin:"First steps",more:"Next lessons",meaning:"means"},
   de:{learn:"Lernen",learnS:"Tippe auf eine Karte und hör zu",quiz:"Spielen",quizS:"Hören, schauen, wählen",speak:"Sprechen",speakS:"Hör zu und sprich laut nach",back:"← Alle Themen",next:"Weiter ▶",again:"Nochmal 🔁",
    listen:"Hör zu und wähle das richtige Bild.",listenW:"Hör zu und wähle das richtige Wort.",whatIs:"Was ist das?",whichPic:"Zu welchem Bild passt das Wort?",starts:"Mit welchem Buchstaben beginnt {w}?",has:"Welcher Buchstabe steckt in {w}?",
    letterHear:"Hör zu: Welcher Buchstabe ist das?",join:"Zusammen: {c} + {m} = ?",count:"Wie viele sind es?",digit:"Welche Zahl ist das?",numHear:"Hör zu und wähle die Zahl.",situ:"Was sagst du?",phraseHear:"Hör zu und wähle den richtigen Satz.",
    right:"Super! Richtig!",wrong:"Fast! Richtig ist:",sayIt:"Jetzt sag du es!",mic:"🎤 Tippen und sprechen",listening:"Ich höre zu …",heard:"Ich habe gehört:",goodSay:"Toll! Genau richtig!",tryAgain:"Hör noch einmal zu und sprich nach.",
    parentQ:"Mama/Papa: Richtig gesagt?",yes:"✓ Ja",no:"✗ Noch üben",done:"Fertig!",score:"{r} von {n} richtig",start:"Los ▶",instr:"Sprache der Anleitung",begin:"Erste Schritte",more:"Weitere Themen",meaning:"heißt"}};
  function I(k,v={}){let s=(UI[il()]||UI.en)[k];if(s==null)s=UI.en[k]||k;for(const x in v)s=s.split("{"+x+"}").join(v[x]);return s;}

  /* more instruction texts for the graded path */
  const UI2={
   mr:{missing:"कोणते अक्षर राहिले?",spell:"बरोबर लिहिलेला शब्द कोणता?",readPic:"वाच आणि योग्य चित्र निवड.",gap:"रिकाम्या जागी कोणता शब्द येईल?",story:"गोष्ट वाच (किंवा ऐक) आणि उत्तर दे.",
     locked:"आधी मागचा धडा पूर्ण कर 🔒",cont:"पुढे चला",review:"उजळणी",reviewS:"शिकलेल्या धड्यांमधून मिश्र प्रश्न",lesson:"धडा",stage:"टप्पा",chartL:"बाराखडी",storyRead:"गोष्ट",findL:"हे अक्षर शोध:",hearMatra:"ऐक: कोणते अक्षर?"},
   hi:{missing:"कौन-सा अक्षर छूट गया?",spell:"सही लिखा शब्द कौन-सा है?",readPic:"पढ़ो और सही चित्र चुनो।",gap:"खाली जगह में कौन-सा शब्द आएगा?",story:"कहानी पढ़ो (या सुनो) और जवाब दो।",
     locked:"पहले पिछला पाठ पूरा करो 🔒",cont:"आगे बढ़ो",review:"दोहराओ",reviewS:"सीखे हुए पाठों से मिले-जुले सवाल",lesson:"पाठ",stage:"चरण",chartL:"बारहखड़ी",storyRead:"कहानी",findL:"यह अक्षर ढूँढो:",hearMatra:"सुनो: कौन-सा अक्षर?"},
   en:{missing:"Which letter is missing?",spell:"Which word is spelled right?",readPic:"Read and choose the right picture.",gap:"Which word fits the gap?",story:"Read (or listen to) the story and answer.",
     locked:"Finish the lesson before first 🔒",cont:"Continue",review:"Review",reviewS:"Mixed questions from the lessons you have learned",lesson:"Lesson",stage:"Stage",chartL:"Table",storyRead:"Story",findL:"Find this letter:",hearMatra:"Listen: which syllable?"},
   de:{missing:"Welcher Buchstabe fehlt?",spell:"Welches Wort ist richtig geschrieben?",readPic:"Lies und wähle das richtige Bild.",gap:"Welches Wort passt in die Lücke?",story:"Lies (oder hör) die Geschichte und antworte.",
     locked:"Mach zuerst die Lektion davor 🔒",cont:"Weiter",review:"Wiederholen",reviewS:"Gemischte Fragen aus deinen Lektionen",lesson:"Lektion",stage:"Stufe",chartL:"Tabelle",storyRead:"Geschichte",findL:"Finde diesen Buchstaben:",hearMatra:"Hör zu: Welche Silbe?"}};
  for(const k in UI2)Object.assign(UI[k],UI2[k]);

  /* ---------- content (bhasha_data.js) ---------- */
  const C=BHD;
  const DIG="०१२३४५६७८९";const dev=n=>String(n).replace(/\d/g,d=>DIG[d]);
  const units=()=>C[S.lang].units;
  const uTitle=u=>u.t[S.lang]||u.t.hi;
  const uSub=u=>{const l=il();return l===S.lang?"":(u.t[l]||u.t.en);};
  const meaning=it=>{const l=il();if(l===S.lang||!it[2]||typeof it[2]!=="object")return "";return it[2][l]||it[2].en;};
  const bestOf=u=>S.best[S.lang+":"+u.id]||0;
  const stageName=i=>{const l=il();return (C.STAGES[S.lang]||C.STAGES.hi)[i]+(l!==S.lang?" · "+(C.STAGES[l]||C.STAGES.en)[i]:"");};
  function unlocked(idx,l=S.lang){if(S.open||idx===0)return true;const us=C[l].units;return (S.best[l+":"+us[idx-1].id]||0)>=1;}
  function nextUnit(){const us=units();for(let i=0;i<us.length;i++)if(!(bestOf(us[i])>=1))return us[i];return us[us.length-1];}
  function stats(l){const us=C[l].units;return {stars:us.reduce((a,u)=>a+(S.best[l+":"+u.id]||0),0),max:us.length*3,topics:us.filter(u=>S.best[l+":"+u.id]>0).length,of:us.length};}

  /* ---------- akshara (letter cluster) helpers ---------- */
  const SEG=(()=>{try{return new Intl.Segmenter("hi",{granularity:"grapheme"});}catch(e){return null;}})();
  function aksh(w){const out=SEG?[...SEG.segment(w)].map(x=>x.segment):(w.match(/[ऀ-हक़-ॡॲ-ॿ][़]?(?:्[ऀ-ह][़]?)*[ा-ौँ-ःॢॣ]*|./g)||[]);
    /* join halant-conjunct pieces so "बिल्ली" → बि, ल्ली */
    const r=[];for(const a of out){if(r.length&&/्$/.test(r[r.length-1]))r[r.length-1]+=a;else r.push(a);}return r;}
  const SWAP=[["ि","ी"],["ी","ि"],["ु","ू"],["ू","ु"],["े","ै"],["ै","े"],["ो","ौ"],["ौ","ो"],["ा",""],["ं","ँ"],["ँ","ं"]];
  function misspell(w){const out=new Set();for(const [a,b] of SWAP){let i=w.indexOf(a);while(i>=0){out.add(w.slice(0,i)+b+w.slice(i+a.length));i=w.indexOf(a,i+1);}}out.delete(w);return [...out].filter(x=>x&&!/^[ा-ौ]/.test(x));}

  /* ---------- question makers ---------- */
  const hasV=()=>!!voiceFor(S.lang);
  function opts3(correct,pool,key=x=>x){const seen=new Set([key(correct)]),others=[];for(const x of shuffle(pool)){const k=key(x);if(!seen.has(k)&&others.length<2){seen.add(k);others.push(x);}}return shuffle([correct,...others]);}
  const qWordPic=(u,items,ty)=>{const it=pick(items);
    if(ty==="hear")return {ask:I("listen"),big:"🔊",audio:it[0],opts:opts3(it,items,x=>x[1]).map(x=>({t:x[1],emoji:true,ok:x===it})),after:it[0],mean:meaning(it)};
    if(ty==="word")return {ask:I("whatIs"),big:it[1],opts:opts3(it,items,x=>x[0]).map(x=>({t:x[0],ok:x===it})),after:it[0],mean:meaning(it)};
    return {ask:I(u.kind==="words"?"whichPic":"readPic"),big:it[0],bigText:true,audio:null,opts:opts3(it,items,x=>x[1]).map(x=>({t:x[1],emoji:true,ok:x===it})),after:it[0],mean:meaning(it)};};
  function qMissing(u,items){const cand=items.filter(x=>aksh(x[0]).length>=2);if(!cand.length)return null;const it=pick(cand),parts=aksh(it[0]),k=Math.floor(Math.random()*parts.length),miss=parts[k];
    const pool=[...new Set(items.flatMap(x=>aksh(x[0])))].filter(a=>a!==miss);if(pool.length<2)return null;
    const shown=parts.map((p,i)=>i===k?"＿":p).join("");
    return {ask:I("missing"),big:it[1],sub:shown,subBig:true,opts:opts3(miss,[miss,...pool]).map(x=>({t:x,ok:x===miss})),after:it[0]};}
  function qSpell(u,items){const cand=items.filter(x=>misspell(x[0]).length>=2);if(!cand.length)return null;const it=pick(cand),wr=shuffle(misspell(it[0])).slice(0,2);
    return {ask:I("spell"),big:it[1],opts:shuffle([it[0],...wr]).map(x=>({t:x,ok:x===it[0]})),after:it[0]};}
  function makeQ(u){const V=hasV();let q=null;
    if(u.kind==="letters"){const withW=u.items.filter(x=>x[1]),ty=pick(V?["hearL","start","start","pic","find"]:["start","start","pic","find"]);
      if(ty==="hearL"){const it=pick(u.items);return {ask:I("letterHear"),big:"🔊",audio:it[0],opts:opts3(it,u.items,x=>x[0]).map(x=>({t:x[0],ok:x===it})),after:it[0]+(it[1]?" … "+it[1]:"")};}
      if(ty==="find"){const it=pick(u.items);return {ask:I("findL"),big:it[0],bigText:true,audio:V?it[0]:null,opts:opts3(it,u.items,x=>x[0]).map(x=>({t:x[0],ok:x===it})),after:it[0]+(it[1]?" … "+it[1]:"")};}
      const it=pick(withW);
      if(ty==="start")return {ask:I(it[3]==="in"?"has":"starts",{w:V?"🔊":it[1]}),big:it[2],sub:V?"":it[1],audio:V?it[1]:null,opts:opts3(it,withW,x=>x[0]).map(x=>({t:x[0],ok:x===it})),after:it[1]+" … "+it[0]};
      return {ask:I("whichPic"),big:it[1],bigText:true,audio:V?it[1]:null,opts:opts3(it,withW,x=>x[2]).map(x=>({t:x[2],emoji:true,ok:x===it})),after:it[1]};}
    if(u.kind==="words")return qWordPic(u,u.items,pick(V?["hear","hear","word","pic"]:["word","pic"]));
    if(u.kind==="read"){const ty=pick(V?["pic","pic","word","miss","hear"]:["pic","pic","word","miss"]);if(ty==="miss")q=qMissing(u,u.items);return q||qWordPic(u,u.items,ty==="miss"?"pic":ty);}
    if(u.kind==="matra"){const ty=pick(V?["pic","word","spell","spell","miss","hear"]:["pic","word","spell","spell","miss"]);
      if(ty==="spell")q=qSpell(u,u.items);if(ty==="miss")q=qMissing(u,u.items);return q||qWordPic(u,u.items,ty==="hear"?"hear":ty==="word"?"word":"pic");}
    if(u.kind==="num"){const n=1+Math.floor(Math.random()*10),w=u.items[n-1],ty=pick(V?["count","digit","hear"]:["count","digit"]);
      const ws=u.items.map((x,i)=>[x,i+1]),me=[w,n];
      if(ty==="count")return {ask:I("count"),big:"🟠".repeat(n),bigSmall:true,opts:opts3(me,ws,x=>x[1]).map(x=>({t:x[0],ok:x[1]===n})),after:`${dev(n)} – ${w}`};
      if(ty==="digit")return {ask:I("digit"),big:dev(n),bigText:true,sub:String(n),opts:opts3(me,ws,x=>x[1]).map(x=>({t:x[0],ok:x[1]===n})),after:`${dev(n)} – ${w}`};
      return {ask:I("numHear"),big:"🔊",audio:w,opts:opts3(me,ws,x=>x[1]).map(x=>({t:dev(x[1]),ok:x[1]===n})),after:`${dev(n)} – ${w}`};}
    if(u.kind==="chart"){const c=pick(u.base),sg=pick(u.signs),syl=c+sg[0],pool=u.signs.map(s=>c+s[0]),ty=pick(V?["join","join","hear"]:["join"]);
      if(ty==="hear")return {ask:I("hearMatra"),big:"🔊",audio:syl,opts:opts3(syl,pool).map(x=>({t:x,ok:x===syl})),after:syl};
      return {ask:I("join",{c,m:"◌"+sg[0]}),big:`${c} + ◌${sg[0]}`,bigText:true,sub:sg[1],opts:opts3(syl,pool).map(x=>({t:x,ok:x===syl})),after:syl};}
    if(u.kind==="sent"){const it=pick(u.items),ty=pick(V?["pic","pic","gap","hear"]:["pic","pic","gap"]);
      if(ty==="gap"){const w=it[2],blank=it[0].replace(w,"＿＿"),pool=[...new Set(u.items.map(x=>x[2]))];return {ask:I("gap"),big:it[1],sub:blank,subBig:true,opts:opts3(w,pool).map(x=>({t:x,ok:x===w})),after:it[0]};}
      if(ty==="hear")return {ask:I("phraseHear"),big:"🔊",audio:it[0],opts:opts3(it,u.items,x=>x[0]).map(x=>({t:x[0],ok:x===it,long:true})),after:it[0]};
      return {ask:I("readPic"),big:it[0],bigText:true,long:true,opts:opts3(it,u.items,x=>x[1]).map(x=>({t:x[1],emoji:true,ok:x===it})),after:it[0]};}
    if(u.kind==="story"){const qq=pick(u.qs),opts=shuffle([qq[1],qq[2],qq[3]]);
      return {ask:qq[0],story:u.lines,big:"",opts:opts.map(x=>({t:x,ok:x===qq[1],long:true})),after:qq[1],audioAsk:qq[0]};}
    if(u.kind==="pairs"){const it=pick(u.items),ask=(u.ask[il()]||u.ask.en).replace("{w}",it[0]);
      return {ask,big:it[2],sub:it[0],subBig:true,opts:opts3(it,u.items,x=>x[1]).map(x=>({t:x[1],ok:x===it})),after:`${it[0]} → ${it[1]}`};}
    /* phrases */
    const it=pick(u.items),ph=it[0],ty=pick(V?["situ","situ","hear"]:["situ"]),pool=u.items.map(x=>x[0]),sit=it[2][il()]||it[2].en;
    if(ty==="hear")return {ask:I("phraseHear"),big:"🔊",audio:ph,opts:opts3(ph,pool).map(x=>({t:x,ok:x===ph,long:true})),after:ph};
    return {ask:sit+" "+I("situ"),big:it[1],opts:opts3(ph,pool).map(x=>({t:x,ok:x===ph,long:true})),after:ph};}

  /* ---------- screens ---------- */
  const hasSR=()=>!!(window.SpeechRecognition||window.webkitSpeechRecognition);
  function voiceBox(){const l=S.lang,v=voiceFor(l),A=(de,en)=>UIL.app()==="en"?en:de,nm=LNAME[l],LN=l==="mr"?"Marathi":"Hindi";
    if(v)return `<p class="bhvoice ok">🔊 ${A("Echte "+LN+"-Stimme","Native "+LN+" voice")}: <b>${esc(v.name)}</b></p>`;
    return `<div class="bhvoice warn"><b>🔇 ${A(`Auf diesem Gerät gibt es keine ${LN}-Stimme.`,`This device has no ${LN} voice.`)}</b>
      <p>${A(`Damit die Aussprache stimmt, liest die App ${nm} nur mit einer echten ${LN}-Stimme vor – nie mit einer anderen. Bis dahin funktionieren Lesen und Bilder-Spiele ohne Ton.`,`To keep the accent right, the app only reads ${nm} with a real ${LN} voice – never with another one. Until then, reading and picture games work without sound.`)}</p>
      <details><summary>${A("So bekommst du eine Stimme","How to get a voice")}</summary><ul>
      <li><b>Android:</b> ${A(`Chrome + Google-Sprachausgabe; in den Android-Einstellungen unter „Sprachausgabe“ die Sprache ${l==="mr"?"Marathi (मराठी)":"Hindi (हिन्दी)"} herunterladen.`,`Chrome + Google text-to-speech; in Android settings under "Text-to-speech" download ${l==="mr"?"Marathi (मराठी)":"Hindi (हिन्दी)"}.`)}</li>
      <li><b>Windows/Mac:</b> ${A(`In Microsoft Edge öffnen (Online-Stimmen wie ${l==="mr"?"„Aarohi“ oder „Manohar“":"„Swara“ oder „Madhur“"}).${l==="hi"?" In Chrome ist „Google हिन्दी“ meist schon da.":""}`,`Open in Microsoft Edge (online voices such as ${l==="mr"?"“Aarohi” or “Manohar”":"“Swara” or “Madhur”"}).${l==="hi"?" Chrome usually already has “Google हिन्दी”.":""}`)}</li>
      <li><b>iPhone/iPad:</b> ${A(`Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen – ${l==="mr"?"Marathi gibt es dort nicht auf jedem Gerät.":"eine Hindi-Stimme laden."}`,`Settings → Accessibility → Spoken Content → Voices – ${l==="mr"?"Marathi is not available on every device.":"download a Hindi voice."}`)}</li></ul></details></div>`;}
  function home(){stop();const L=S.lang,us=units(),l=il(),st=stats(L),nx=nextUnit(),done=us.filter(u=>bestOf(u)>=1);
    let h=`<div class="bhhead"><div class="bhlang">${["hi","mr"].map(x=>`<button class="${x===L?"on":""}" data-l="${x}"><span>${C[x].emo}</span>${C[x].name}</button>`).join("")}</div>
      <p class="bhst">⭐ ${st.stars}/${st.max}</p></div>
      <div class="bhinstr"><span>${I("instr")}</span><div class="pseg bhseg" style="grid-template-columns:repeat(${INSTR[L].length},1fr)">${INSTR[L].map(x=>`<button data-i="${x}" class="${x===l?"on":""}">${LNAME[x]}</button>`).join("")}</div></div>${voiceBox()}
      <button class="block chall bhnext" id="bhcont"><span class="emo">${esc(nx.emo)}</span><span><b>${I("cont")}: <span class="bhdeva">${esc(uTitle(nx))}</span></b><span>${I("lesson")} ${us.indexOf(nx)+1} / ${us.length}${uSub(nx)?" · "+esc(uSub(nx)):""}</span></span><span class="go2">▶</span></button>
      ${done.length>=2?`<button class="block mode bhrev" id="bhrev"><span class="emo">🔁</span><b>${I("review")}</b><span>${I("reviewS")} (${done.length})</span></button>`:""}`;
    C.STAGES.hi.forEach((_,si)=>{const su=us.filter(u=>u.st===si),sd=su.filter(u=>bestOf(u)>=1).length;
      h+=`<div class="bhstage"><div class="bhsth"><b class="bhdeva">${I("stage")} ${si+1}: ${esc(stageName(si))}</b><span>${sd}/${su.length}</span></div><div class="bar2"><i style="width:${Math.round(sd/su.length*100)}%"></i></div></div><div class="bhpath">`;
      su.forEach(u=>{const idx=us.indexOf(u),open=unlocked(idx),b=bestOf(u),cur=u===nx;
        h+=`<button class="bhstep${open?"":" locked"}${cur?" cur":""}${b?" done":""}" data-u="${u.id}"${open?"":` aria-disabled="true"`}><span class="bhno">${idx+1}</span><span class="emo">${open?esc(u.emo):"🔒"}</span><span class="t"><b class="bhdeva">${esc(uTitle(u))}</b>${uSub(u)?`<small>${esc(uSub(u))}</small>`:""}</span><span class="st">${[0,1,2].map(i=>i<b?"<b>★</b>":"★").join("")}</span></button>`;});
      h+="</div>";});
    ROOT.innerHTML=h;
    $$(".bhlang button").forEach(b=>b.onclick=()=>{S.lang=b.dataset.l;save();home();});
    $$(".bhseg button").forEach(b=>b.onclick=()=>{S.instr[S.lang]=b.dataset.i;save();home();});
    $("#bhcont").onclick=()=>openUnit(nx.id);if($("#bhrev"))$("#bhrev").onclick=()=>review();
    $$(".bhstep").forEach(b=>b.onclick=()=>{if(b.classList.contains("locked")){b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),500);sayI(I("locked"));const t=b.querySelector("small")||b.querySelector(".t");try{REW.toast(I("locked"));}catch(e){}return;}openUnit(b.dataset.u);});}
  function head(u){const us=units();return `<button class="back" id="bhback">${I("back")}</button><div class="uhead bhuhead"><div class="emo">${esc(u.emo)}</div><div><div class="k">${C[S.lang].emo} ${C[S.lang].name} · ${I("lesson")} ${us.indexOf(u)+1}</div><h2 class="bhdeva">${esc(uTitle(u))}</h2>${uSub(u)?`<small>${esc(uSub(u))}</small>`:""}</div></div>`;}
  function wireBack(u){$("#bhback").onclick=()=>{stop();u&&u.id!=="review"?openUnit(u.id):home();};}
  function openUnit(id){stop();const us=units(),idx=us.findIndex(x=>x.id===id),u=us[idx];if(!u)return home();if(!unlocked(idx))return home();
    ROOT.innerHTML=head(u)+`<div class="modes"><button class="block mode" data-m="learn"><span class="emo">📖</span><b>${I(u.kind==="story"?"storyRead":"learn")}</b><span>${I("learnS")}</span></button>
      <button class="block mode" data-m="quiz"><span class="emo">🎮</span><b>${I("quiz")}</b><span>${I("quizS")} · ${"★".repeat(bestOf(u))||"—"}</span></button>
      ${["chart","story"].includes(u.kind)?"":`<button class="block mode" data-m="speak"><span class="emo">🗣️</span><b>${I("speak")}</b><span>${I("speakS")}</span></button>`}
      ${canWrite(u)?`<button class="block mode" data-m="write"><span class="emo">✍️</span><b>${I("write")}</b><span>${I("writeS")}${(S.wbest||{})[S.lang+":"+u.id]?" · "+"★".repeat(S.wbest[S.lang+":"+u.id]):""}</span></button>`:""}</div>`;
    $("#bhback").onclick=()=>{stop();home();};
    $$(".mode").forEach(b=>b.onclick=()=>({learn,quiz,speak,write}[b.dataset.m])(u));window.scrollTo(0,0);}
  /* learn: cards (or the story, line by line) */
  function cardsOf(u){if(u.kind==="letters")return u.items.map(it=>({big:it[0],small:it[1],emo:it[2]||"",say:it[1]?[it[0],it[1]]:[it[0]]}));
    if(u.kind==="words")return u.items.map(it=>({big:it[0],emo:it[1],small:meaning(it),say:[it[0]]}));
    if(u.kind==="read")return u.items.map(it=>({big:it[0],emo:it[1],small:aksh(it[0]).join(" + "),say:[it[0]]}));
    if(u.kind==="matra"){const base=["क","म","न","स","ल","प"];return [...u.sg.flatMap(s=>base.map(c=>({big:c+s[0],small:c+" + ◌"+s[0],emo:"",say:[c+s[0]],syl:true}))),...u.items.map(it=>({big:it[0],emo:it[1],small:aksh(it[0]).join(" + "),say:[it[0]]}))];}
    if(u.kind==="num")return u.items.map((w,i)=>({big:dev(i+1),small:w,emo:String(i+1),say:[w]}));
    if(u.kind==="chart"){const c=pick(u.base);return u.signs.map(s=>({big:c+s[0],small:s[1],emo:"◌"+s[0],say:[c+s[0]]}));}
    if(u.kind==="sent")return u.items.map(it=>({big:it[0],emo:it[1],say:[it[0]],long:true}));
    if(u.kind==="pairs")return u.items.map(it=>({big:it[0]+" → "+it[1],emo:it[2]+" "+it[3],say:[it[0],it[1]],long:true}));
    if(u.kind==="story")return u.lines.map((x,i)=>({big:x,emo:i===0?u.emo:"",say:[x],long:true}));
    return u.items.map(it=>({big:it[0],emo:it[1],small:it[2][il()]&&il()!==S.lang?it[2][il()]:"",say:[it[0]],long:true}));}
  function learn(u){stop();const cs=cardsOf(u),sign=u.kind==="matra"?`<div class="bhsigns">${u.sg.map(s=>`<span><b class="bhdeva">◌${s[0]}</b><small class="bhdeva">${esc(s[1])}</small></span>`).join("")}</div>`:"";
    const story=u.kind==="story";
    ROOT.innerHTML=head(u)+`<p class="bhhint">${hasV()?"🔊 "+I("learnS"):"📖"}</p>${sign}<div class="bhcards${story?" story":""}">${cs.map((c,i)=>`<button class="bhlc${c.long?" long":""}${c.syl?" syl":""}" data-i="${i}">${c.emo?`<span class="bhe">${esc(c.emo)}</span>`:""}<b class="bhdeva">${esc(c.big)}</b>${c.small?`<small class="bhdeva">${esc(c.small)}</small>`:""}</button>`).join("")}</div>
      <div class="row center">${story&&hasV()?`<button class="btn ghost" id="bhall">🔊 ${I("storyRead")}</button>`:""}<button class="btn" id="bhgo">🎮 ${I("quiz")}</button></div>`;wireBack(u);
    $$(".bhlc").forEach(b=>b.onclick=async()=>{const c=cs[+b.dataset.i];$$(".bhlc").forEach(x=>x.classList.remove("on"));b.classList.add("on");stop();for(const t of c.say){if(!(await sayL(t)))break;}});
    if($("#bhall"))$("#bhall").onclick=async()=>{stop();const my=seq;for(const [i,c] of cs.entries()){if(my!==seq)break;$$(".bhlc").forEach((x,k)=>x.classList.toggle("on",k===i));if(!(await sayL(c.say[0])))break;}};
    $("#bhgo").onclick=()=>quiz(u);sayI(I("learnS"));}
  /* quiz (also used for the review mix) */
  function quiz(u,mixFrom){stop();const N=S.len||10;let i=0,right=0;
    const next=()=>{if(i>=N)return finish();const src=mixFrom?pick(mixFrom):u;const q=makeQ(src);i++;
      ROOT.innerHTML=head(u)+`<div class="panel bhq"><div class="qmeta"><span>${i} / ${N}</span><span>✔ ${right}</span></div>
        ${q.story?`<div class="bhstory bhdeva">${q.story.map(x=>`<p>${esc(x)}</p>`).join("")}</div>`:`<div class="bhbig${q.bigText?" txt bhdeva":""}${q.long?" long":""}${q.bigSmall?" small":""}">${esc(q.big)}</div>`}${q.sub?`<div class="bhsmall bhdeva${q.subBig?" big":""}">${esc(q.sub)}</div>`:""}
        <p class="bhask">${q.audio||q.story?`<button class="spk" id="bhhear" aria-label="🔊">🔊</button>`:""}<span class="bhdeva">${esc(q.ask)}</span></p>
        <div class="opts bhopts${q.opts.some(o=>o.long)?" long":""}">${q.opts.map((o,k)=>`<button class="opt${o.emoji?" emo":""} bhdeva" data-k="${k}">${esc(o.t)}</button>`).join("")}</div><div id="bhfb" class="feedback"></div></div>`;
      wireBack(u);
      const hear=async()=>{if(q.story){for(const x of q.story)if(!(await sayL(x)))break;await sayL(q.ask);}else if(q.audio)await sayL(q.audio);};
      if($("#bhhear"))$("#bhhear").onclick=()=>{stop();hear();};
      (async()=>{if(q.story){await sayL(q.ask);return;}await sayI(q.ask.replace("🔊",""));if(q.audio)hear();})();
      GUARD.arm($(".bhopts"),(q.story?q.story.join(" "):"")+q.ask,il());
      $$(".bhopts .opt").forEach(b=>b.onclick=()=>{stop();const o=q.opts[+b.dataset.k],ok=o.ok;GUARD.after(ok,il());$$(".bhopts .opt").forEach((x,k)=>{x.disabled=true;if(q.opts[k].ok)x.classList.add("right");});
        if(ok){right++;REW.hit(S.lang,"correct");}else{b.classList.add("wrong");REW.hit(S.lang,"wrong");}
        const fb=$("#bhfb");fb.className="feedback "+(ok?"ok":"no");fb.innerHTML=`${ok?I("right"):I("wrong")} <b class="bhdeva">${esc(q.after)}</b>${q.mean?` <small>(${esc(q.mean)})</small>`:""}<div class="row center"><button class="btn" id="bhnext">${I("next")}</button></div>`;
        $("#bhnext").onclick=next;(async()=>{await sayI(ok?I("right"):I("wrong"));await sayL(q.after.replace(/ … | – | → /g,", "));})();});};
    const finish=()=>{const st=right>=N*.9?3:right>=N*.7?2:right>=N*.4?1:0;if(!mixFrom&&st>bestOf(u)){S.best[S.lang+":"+u.id]=st;save();}REW.hit(S.lang,"round",st);
      const us=units(),idx=us.indexOf(u),nu=!mixFrom&&st>=1&&us[idx+1];
      ROOT.innerHTML=head(u)+`<div class="panel result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div><h3>${I("done")}</h3><p>${I("score",{r:right,n:N})}</p>
        <div class="row center">${nu?`<button class="btn" id="bhnu">${I("cont")}: <span class="bhdeva">${esc(uTitle(nu))}</span> ▶</button>`:""}<button class="btn${nu?" ghost":""}" id="bhagain">${I("again")}</button><button class="btn ghost" id="bhmenu">${I("back")}</button></div></div>`;
      $("#bhback").onclick=()=>mixFrom?home():openUnit(u.id);$("#bhagain").onclick=()=>quiz(u,mixFrom);$("#bhmenu").onclick=home;if(nu)$("#bhnu").onclick=()=>openUnit(nu.id);try{if(st>=2)gConfetti(120);}catch(e){}sayI(I("done"));};
    next();}
  function review(){const done=units().filter(u=>bestOf(u)>=1);if(done.length<2)return home();quiz({id:"review",emo:"🔁",t:{hi:I("review"),mr:I("review"),en:"Review",de:"Wiederholen"}},done);}
  /* speak: listen, then say it */
  let rec=null;function stopMic(){try{rec&&rec.stop();}catch(e){}rec=null;}
  const nrm=s=>String(s).normalize("NFC").replace(/[़]/g,"").replace(/ँ/g,"ं").replace(/[।.,!?'"\s\-–→]/g,"").toLowerCase();
  function lev(a,b){const m=[...a],n=[...b],d=[...Array(m.length+1)].map((_,i)=>[i,...Array(n.length).fill(0)]);for(let j=1;j<=n.length;j++)d[0][j]=j;
    for(let i=1;i<=m.length;i++)for(let j=1;j<=n.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(m[i-1]===n[j-1]?0:1));return d[m.length][n.length];}
  /* spoken Marathi often uses short forms (माझं, हवं) – they count as right */
  const COLLOQ=[["माझं","माझे"],["हवं","हवे"],["तुझं","तुझे"],["केलं","केले"]];
  function closeEnough(heard,target){let h=nrm(heard);for(const [a,b] of COLLOQ)h=h.split(nrm(a)).join(nrm(b));const t=nrm(target);if(!h||!t)return false;if(h.includes(t))return true;
    const tn=nrm(target.replace(/Aarya/g,""));if(tn&&tn.length>2&&h.includes(tn))return true;const dist=lev(h,t);return 1-dist/Math.max(t.length,1)>=.7;}
  function speak(u){stop();const cs=shuffle(cardsOf(u).filter(c=>!c.syl||u.kind!=="matra")).slice(0,6);let i=0,ok=0;
    const step=()=>{if(i>=cs.length){const st=ok>=6?3:ok>=4?2:ok>=2?1:0;REW.hit(S.lang,"round",st);
        ROOT.innerHTML=head(u)+`<div class="panel result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div><h3>${I("done")}</h3><p>🗣️ ${ok} / ${cs.length}</p><div class="row center"><button class="btn" id="bhagain">${I("again")}</button><button class="btn ghost" id="bhmenu">${I("back")}</button></div></div>`;
        $("#bhback").onclick=()=>openUnit(u.id);$("#bhagain").onclick=()=>speak(u);$("#bhmenu").onclick=home;sayI(I("done"));return;}
      const c=cs[i];let counted=false;const target=c.say[c.say.length-1];
      ROOT.innerHTML=head(u)+`<div class="panel bhq"><div class="qmeta"><span>${i+1} / ${cs.length}</span><span>🗣️ ${ok}</span></div>${c.emo?`<div class="bhbig">${esc(c.emo)}</div>`:""}<div class="bhbig txt bhdeva${c.long?" long":""}">${esc(c.big)}</div>${c.small?`<div class="bhsmall bhdeva">${esc(c.small)}</div>`:""}
        <p class="bhask"><button class="spk" id="bhhear" aria-label="🔊">🔊</button><span>${I("sayIt")}</span></p>
        ${hasSR()?`<div class="tkmicw"><button class="tkmic" id="bhmic" aria-label="${esc(I("mic"))}">🎤</button><div class="tklive" id="bhlive">${I("mic")}</div></div>`:""}
        <div class="bhparent"><span>${I("parentQ")}</span><div class="row center"><button class="btn" id="bhyes">${I("yes")}</button><button class="btn ghost" id="bhno">${I("no")}</button></div></div></div>`;
      wireBack(u);const hear=async()=>{stop();for(const t of c.say){if(!(await sayL(t)))break;}};$("#bhhear").onclick=hear;(async()=>{await sayI(I("sayIt"));await hear();})();
      const good=()=>{if(counted)return;counted=true;ok++;REW.hit(S.lang,"read");$("#bhlive")&&($("#bhlive").innerHTML=I("goodSay"));sayI(I("goodSay"));setTimeout(()=>{i++;step();},1300);};
      $("#bhyes").onclick=good;$("#bhno").onclick=()=>{if(counted)return;counted=true;i++;step();};
      const m=$("#bhmic");if(m)m.onclick=()=>{if(rec){stopMic();return;}stop();const SR=window.SpeechRecognition||window.webkitSpeechRecognition;try{rec=new SR();}catch(e){return;}
        rec.lang=LOC[S.lang];rec.interimResults=true;rec.maxAlternatives=4;let best="",alts=[];m.classList.add("on");$("#bhlive").textContent=I("listening");
        rec.onresult=e=>{let t="";for(const r of e.results)t+=r[0].transcript+" ";best=t.trim();const last=e.results[e.results.length-1];if(last.isFinal)alts=[...last].map(a=>a.transcript);$("#bhlive").textContent="„"+best+"“";};
        rec.onerror=()=>{m.classList.remove("on");rec=null;$("#bhlive").textContent=I("parentQ");};
        rec.onend=()=>{m.classList.remove("on");rec=null;const all=[best,...alts].filter(Boolean);if(!all.length)return;
          if(all.some(a=>closeEnough(a,target)))good();else{$("#bhlive").innerHTML=`${I("heard")} „${esc(best)}“ · ${I("tryAgain")}`;sayI(I("tryAgain"));}};
        try{rec.start();}catch(e){m.classList.remove("on");rec=null;}};};
    step();}
  /* ---------- ✍️ write: trace letters with a finger (shape check, no handwriting AI) ---------- */
  const UI3={hi:{write:"लिखो",writeS:"उँगली से अक्षर बनाओ",trace:"हल्के अक्षर पर उँगली फेरो।",alone:"अब खुद लिखो!",dots:"बिंदुओं वाले अक्षर पर उँगली चलाओ।",clear:"↺ मिटाओ",check:"✓ देखो",wGreat:"वाह! बहुत सुंदर!",wGood:"अच्छा! थोड़ा और ध्यान से।",wMore:"फिर से कोशिश करो – लाइन पर चलो।",wRule:"पहले अक्षर बनाओ, फिर ऊपर की रेखा (शिरोरेखा) खींचो।",wHeft:"अब अपनी कॉपी में हर अक्षर 5 बार लिखो।",wSkip:"छोड़ो ▶"},
   mr:{write:"लिही",writeS:"बोटाने अक्षर गिरव",trace:"फिकट अक्षरावरून बोट फिरव.",alone:"आता स्वतः लिही!",dots:"ठिपक्यांच्या अक्षरावरून बोट फिरव.",clear:"↺ पुसून टाक",check:"✓ तपास",wGreat:"वा! खूप सुंदर!",wGood:"छान! अजून थोडे नीट.",wMore:"पुन्हा प्रयत्न कर – रेषेवरून गिरव.",wRule:"आधी अक्षर काढ, मग डोक्यावरची रेघ (शिरोरेखा) ओढ.",wHeft:"आता वहीत प्रत्येक अक्षर ५ वेळा लिही.",wSkip:"पुढे ▶"},
   en:{write:"Write",writeS:"Trace the letter with your finger",trace:"Trace over the light letter.",alone:"Now write it on your own!",dots:"Trace the dotted letter.",clear:"↺ Clear",check:"✓ Check",wGreat:"Wow! Beautiful!",wGood:"Good! A little more carefully.",wMore:"Try again – stay on the line.",wRule:"First draw the letter, then the line on top (shirorekha).",wHeft:"Now write each letter 5 times in your notebook.",wSkip:"Skip ▶"},
   de:{write:"Schreiben",writeS:"Fahre den Buchstaben mit dem Finger nach",trace:"Fahre den hellen Buchstaben nach.",alone:"Jetzt schreib ihn allein!",dots:"Fahre den gepunkteten Buchstaben nach.",clear:"↺ Löschen",check:"✓ Prüfen",wGreat:"Toll! Wunderschön!",wGood:"Gut! Noch etwas genauer.",wMore:"Versuch es nochmal – bleib auf der Linie.",wRule:"Erst den Buchstaben schreiben, dann den Strich oben (Shirorekha).",wHeft:"Schreib jetzt jeden Buchstaben 5-mal ins Heft.",wSkip:"Weiter ▶"}};
  for(const k in UI3)Object.assign(UI[k],UI3[k]);
  const canWrite=u=>["letters","matra","num","read","chart"].includes(u.kind);
  function writeItems(u){
    if(u.kind==="letters")return u.items.map(it=>it[0]);
    if(u.kind==="matra")return u.sg.flatMap(s=>["क","म","न","ल"].map(c=>c+s[0]));
    if(u.kind==="chart")return u.signs.map(s=>u.base[0]+s[0]);
    if(u.kind==="num")return u.items.map((w,i)=>dev(i+1));
    return u.items.map(it=>it[0]).filter(w=>aksh(w).length<=3);}
  const WC=300;
  function fit(t){const c=document.createElement("canvas").getContext("2d");let fs=200;c.font=`600 ${fs}px NotoDeva`;const w=c.measureText(t).width;if(w>255)fs=Math.floor(fs*255/w);
    c.font=`600 ${fs}px NotoDeva`;const m=c.measureText(t),a=m.actualBoundingBoxAscent||fs*.7,d=m.actualBoundingBoxDescent||0;
    const mk=c.measureText("क"),ka=mk.actualBoundingBoxAscent||fs*.6;const y=Math.round(WC/2+(a-d)/2);
    return {fs,x:WC/2,y,head:Math.round(y-ka+fs*.045)};}
  function mask(draw){const c=document.createElement("canvas");c.width=c.height=WC;const x=c.getContext("2d");draw(x);const d=x.getImageData(0,0,WC,WC).data,m=new Uint8Array(WC*WC);for(let i=0;i<m.length;i++)m[i]=d[i*4+3]>60?1:0;return m;}
  function glyph(x,t,L,extra){x.font=`600 ${L.fs}px NotoDeva`;x.textAlign="center";x.textBaseline="alphabetic";x.fillStyle="#000";x.fillText(t,L.x,L.y);
    if(extra){x.lineJoin="round";x.lineWidth=extra;x.strokeStyle="#000";x.strokeText(t,L.x,L.y);}}
  function ink(x,strokes,w,col){x.lineCap="round";x.lineJoin="round";x.lineWidth=w;x.strokeStyle=x.fillStyle=col||"#000";
    for(const s of strokes){if(!s.length)continue;if(s.length===1){x.beginPath();x.arc(s[0][0],s[0][1],w/2,0,7);x.fill();continue;}x.beginPath();x.moveTo(s[0][0],s[0][1]);for(const p of s.slice(1))x.lineTo(p[0],p[1]);x.stroke();}}
  const bbox=m=>{let x0=WC,y0=WC,x1=-1,y1=-1;for(let y=0;y<WC;y++)for(let x=0;x<WC;x++)if(m[y*WC+x]){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}return x1<0?null:{x0,y0,x1,y1};};
  /* compare the child's strokes with the letter: how much of the letter is covered, how much ink is off the letter */
  /* thin the letter to a 1-pixel centre line (Zhang–Suen) – used to know how long the pen path of the letter is */
  function thin(m){m=m.slice();const W=WC,at=(x,y)=>m[y*W+x];let ch=true;
    while(ch){ch=false;for(const pass of [0,1]){const del=[];for(let y=1;y<W-1;y++)for(let x=1;x<W-1;x++){if(!at(x,y))continue;
      const p=[at(x,y-1),at(x+1,y-1),at(x+1,y),at(x+1,y+1),at(x,y+1),at(x-1,y+1),at(x-1,y),at(x-1,y-1)],b=p.reduce((a,c)=>a+c,0);if(b<2||b>6)continue;
      let a=0;for(let k=0;k<8;k++)if(!p[k]&&p[(k+1)%8])a++;if(a!==1)continue;
      if(pass===0?(p[0]*p[2]*p[4]===0&&p[2]*p[4]*p[6]===0):(p[0]*p[2]*p[6]===0&&p[0]*p[4]*p[6]===0))del.push(y*W+x);}
      if(del.length){ch=true;for(const d of del)m[d]=0;}}}return m;}
  const SKC={};
  function skelOf(t){const L=fit(t),k=t+"|"+L.fs;if(!SKC[k]){const sk=thin(mask(x=>glyph(x,t,L)));let n=0;for(const v of sk)n+=v;SKC[k]={sk,n};}return SKC[k];}
  /* dotted centre line for the "trace the dots" step, like a school tracing sheet */
  const DTC={};
  function dotsOf(t){const {sk}=skelOf(t),k=t+"|"+fit(t).fs;if(DTC[k])return DTC[k];const out=[];
    for(let y=0;y<WC;y++)for(let x=0;x<WC;x++)if(sk[y*WC+x]&&!out.some(d=>(d[0]-x)**2+(d[1]-y)**2<81))out.push([x,y]);return DTC[k]=out;}
  function glyphSkel(t){const {sk}=skelOf(t),out=[];for(let y=0;y<WC;y++)for(let x=0;x<WC;x++)if(sk[y*WC+x]){if(sk[y*WC+x+1])out.push([[x,y],[x+1,y]]);if(sk[(y+1)*WC+x])out.push([[x,y],[x,y+1]]);if(sk[(y+1)*WC+x+1])out.push([[x,y],[x+1,y+1]]);if(sk[(y+1)*WC+x-1])out.push([[x,y],[x-1,y+1]]);}return out;}
  const WP={cw:.15,dm:.07};
  function wscore(t,strokes,alone,P){P=Object.assign({},WP,P||{});const L=fit(t),G=mask(x=>glyph(x,t,L)),D=mask(x=>glyph(x,t,L,L.fs*P.dm*2));
    let st=strokes;
    if(alone){const K0=mask(x=>ink(x,strokes,2)),a=bbox(K0),g=bbox(G);if(a&&g){const sx=(g.x1-g.x0+1)/(a.x1-a.x0+1),sy=(g.y1-g.y0+1)/(a.y1-a.y0+1),cl=v=>Math.max(.55,Math.min(1.8,v));
      const kx=cl(sx),ky=cl(sy),cx=(a.x0+a.x1)/2,cy=(a.y0+a.y1)/2,gx=(g.x0+g.x1)/2,gy=(g.y0+g.y1)/2;st=strokes.map(s=>s.map(p=>[gx+(p[0]-cx)*kx,gy+(p[1]-cy)*ky]));}}
    const KW=mask(x=>ink(x,st,L.fs*P.cw)),KN=mask(x=>ink(x,st,3));
    let g=0,gc=0,k=0,ki=0;for(let i=0;i<G.length;i++){if(G[i]){g++;if(KW[i])gc++;}if(KN[i]){k++;if(D[i])ki++;}}
    let len=0;for(const q of st)for(let j=1;j<q.length;j++)len+=Math.hypot(q[j][0]-q[j-1][0],q[j][1]-q[j-1][1]);
    const cov=g?gc/g:0,inside=k?ki/k:0,long=len/Math.max(1,skelOf(t).n),enough=cov>.25;
    /* cov: how much of the letter is covered · inside: how much of the pen line stays on the letter · long: pen travel compared with the letter (scribbling) */
    const grade=!enough||long>2.2?0:alone?(cov>=.78&&inside>=.85?2:cov>=.66&&inside>=.8?1:0):(cov>=.82&&inside>=.88?2:cov>=.7&&inside>=.8?1:0);
    return {cov:+cov.toFixed(2),inside:+inside.toFixed(2),len:+long.toFixed(2),grade};}
  function glyphPts(t,step=5){const L=fit(t),G=mask(x=>glyph(x,t,L)),pts=[];for(let y=0;y<WC;y+=step)for(let x=0;x<WC;x+=step)if(G[y*WC+x])pts.push([[x,y]]);return pts;}
  function write(u){stop();const all=writeItems(u),key=S.lang+":"+u.id;S.wpos=S.wpos||{};S.wbest=S.wbest||{};
    const p0=(S.wpos[key]||0)%all.length,items=[];for(let k=0;k<Math.min(4,all.length);k++)items.push(all[(p0+k)%all.length]);S.wpos[key]=(p0+items.length)%all.length;save();
    const tasks=items.flatMap(t=>[[t,false],[t,true]]);let i=0,pts=0;
    const fin=()=>{const st=pts>=tasks.length*1.5?3:pts>=tasks.length?2:pts>=tasks.length/2?1:0;REW.hit(S.lang,"round",st);S.wbest[key]=Math.max(S.wbest[key]||0,st);save();
      ROOT.innerHTML=head(u)+`<div class="panel result"><div class="bigstars">${[0,1,2].map(k=>`<span class="${k<st?"":"off"}">⭐</span>`).join("")}</div><h3>${I("done")}</h3>
        <p class="bhdeva bhwdone">${items.map(esc).join(" &nbsp; ")}</p><p class="bhhint">📓 ${I("wHeft")}</p>
        <div class="row center"><button class="btn" id="bhagain">${I("again")}</button><button class="btn ghost" id="bhmenu">${I("back")}</button></div></div>`;
      $("#bhback").onclick=()=>openUnit(u.id);$("#bhagain").onclick=()=>write(u);$("#bhmenu").onclick=home;sayI(I("done"));};
    const step=async()=>{if(i>=tasks.length)return fin();const [t,alone]=tasks[i];let strokes=[],cur=null,tries=0;
      try{await document.fonts.load(`600 200px NotoDeva`,t);}catch(e){}
      const L=fit(t);
      ROOT.innerHTML=head(u)+`<div class="panel bhq bhw"><div class="qmeta"><span>${i+1} / ${tasks.length}</span><span>✍️ ${pts}</span></div>
        <p class="bhask"><button class="spk" id="bhhear" aria-label="🔊">🔊</button><span>${I(alone?"dots":"trace")}</span></p>
        ${alone?`<div class="bhwmodel bhdeva">${esc(t)}</div>`:""}
        <div class="bhwbox"><canvas id="bhcv" width="${WC}" height="${WC}" aria-label="${esc(t)}"></canvas></div>
        ${u.kind!=="num"&&i<2?`<p class="bhwrule">✏️ ${I("wRule")}</p>`:""}
        <div id="bhfb" class="feedback"></div><div class="row center bhwbtn"><button class="btn ghost" id="bhclr">${I("clear")}</button><button class="btn" id="bhchk">${I("check")}</button></div></div>`;
      const cv=$("#bhcv"),dpr=Math.min(3,window.devicePixelRatio||1);cv.width=cv.height=WC*dpr;const x=cv.getContext("2d");x.scale(dpr,dpr);
      const paint=()=>{x.clearRect(0,0,WC,WC);x.fillStyle="#fff";x.fillRect(0,0,WC,WC);x.save();x.setLineDash([6,6]);x.lineWidth=2;x.strokeStyle="#9FB4E8";
        for(const yy of [L.head,L.y]){x.beginPath();x.moveTo(8,yy);x.lineTo(WC-8,yy);x.stroke();}x.restore();
        x.save();x.font=`600 ${L.fs}px NotoDeva`;x.textAlign="center";x.textBaseline="alphabetic";
        if(!alone){x.fillStyle="#E4E7F0";x.fillText(t,L.x,L.y);}else{x.fillStyle="#97A3C2";for(const d of dotsOf(t)){x.beginPath();x.arc(d[0],d[1],3.6,0,7);x.fill();}}x.restore();
        ink(x,strokes,L.fs*.085,"#C2185B");};
      paint();
      const pt=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)*WC/r.width,(e.clientY-r.top)*WC/r.height];};
      cv.onpointerdown=e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId);}catch(_){}cur=[pt(e)];strokes.push(cur);paint();};
      cv.onpointermove=e=>{if(!cur)return;e.preventDefault();cur.push(pt(e));paint();};
      cv.onpointerup=cv.onpointercancel=cv.onpointerleave=()=>{cur=null;};
      const hear=()=>sayL(t);$("#bhhear").onclick=hear;
      $("#bhclr").onclick=()=>{strokes=[];paint();$("#bhfb").innerHTML="";};
      $("#bhchk").onclick=()=>{if(!strokes.length)return;const r=wscore(t,strokes,false);tries++;cv._score=r;const fb=$("#bhfb");
        if(r.grade>0){pts+=r.grade;REW.hit(S.lang,"correct");fb.className="feedback ok";fb.innerHTML=`<b>${I(r.grade>1?"wGreat":"wGood")}</b> ${"⭐".repeat(r.grade)}`;sayI(I(r.grade>1?"wGreat":"wGood"));
          $(".bhwbtn").innerHTML=`<button class="btn" id="bhwn">${I("next")}</button>`;$("#bhwn").onclick=()=>{i++;step();};cv.onpointerdown=null;}
        else{fb.className="feedback warn";fb.innerHTML=`<b>${I("wMore")}</b>`;sayI(I("wMore"));strokes=[];setTimeout(paint,700);
          if(tries>=2&&!$("#bhwn")){const b=document.createElement("button");b.className="btn ghost";b.id="bhwn";b.textContent=I("wSkip");b.onclick=()=>{i++;step();};$(".bhwbtn").appendChild(b);}}};
      const my=i;sayI(I(alone?"dots":"trace")).then(()=>{if(i===my&&$("#bhcv")===cv)hear();});};
    step();}
  return {home,stop,openUnit,stats,voiceFor,say,makeQ,units:l=>C[l].units,S:()=>S,setLang(l){S.lang=l;save();},setInstr(l,i){S.instr[l]=i;save();},
    setOpen(v){S.open=!!v;save();},isOpen:()=>!!S.open,unlocked,aksh,misspell,closeEnough,_reloadVoices:loadVoices,write,writeItems,wscore,glyphPts,glyphSkel,canWrite};
})(document.getElementById("vBhasha"));
