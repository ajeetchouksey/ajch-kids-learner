import base64,pathlib
M="../mathapp/";D="../deutsch/"
def subs(js,tag,pairs):
    for a,b in pairs:
        c=js.count(a); assert c>=1,(tag,a,c); js=js.replace(a,b)
    return js
EN_RULES='''Object.assign(UNIT_RULE,{16:["Greetings","Hello when you meet someone, Goodbye when you leave, Thank you when you get something, Please when you ask."],
 17:["Colours","red, blue, green, yellow, orange, purple, pink, brown, black, white."],18:["Animal words","dog, cat, cow, horse, fish, bird, duck, lion, elephant."],
 19:["Numbers","one, two, three, four, five, six, seven, eight, nine, ten."],20:["Body words","eyes, ears, nose, mouth, hands, feet."],
 21:["Family words","mum, dad, sister, brother, baby, grandma, grandpa."],22:["Food words","bread, milk, apple, cheese, pizza, cake, water. Hungry → eat, thirsty → drink."],
 23:["Sight words","Little words we see all the time: I, a, the, and, is, can, see, go, in, on, like, my."]});
'''
NB_EN='''function nbTasks(u,n){const cs=shuffle((u.q||[]).filter(q=>q[0]==="c"&&Array.isArray(q[2]))).slice(0,n);
  return cs.map(q=>{const ans=q[2][0];let full=null;try{full=buildSentence(q[1],ans);}catch(e){}full=full?full.replace(/⟦|⟧/g,""):ans;return {q:q[1].replace(/\\s*\\([^)]*\\)\\s*/g," ").trim(),en:"",vis:"",ans,full};});}
'''
en=open("en.js").read()
en=subs(en,"en",[
 ('SECTIONS.Mix={c:"#B7791F",l:"#FBF0D5"};','SECTIONS.Mix={c:"#B7791F",l:"#FBF0D5"};\n'+open("en_beginner.js").read()),
 ('function why(q,correct,chosen){','function why(q,correct,chosen){if(typeof q[3]==="string"){const c=String(correct);return {look:[[leadEmo(q[1])||"👀","Look",`⟦${c}⟧`]],tip:q[3]};}'),
 ('const next=UNITS.find(u=>!(S.best[u.id]>0))||UNITS[0];','const GV=PROF.view("en"),ORD=UNITS.filter(u=>(EN_GRADE[u.id]??1)===GV);const next=ORD.find(u=>!(S.best[u.id]>0))||ORD[0];'),
 ('+lenSel();\n  let last="";','+lenSel()+gradeTabs("en",gradeStats(UNITS,S.best,u=>EN_GRADE[u.id]??1));\n  let last="";'),
 ('  app.innerHTML=h;\n  app.querySelectorAll(".ucard")','  app.innerHTML=h;wireGradeTabs(app,"en",home);\n  app.querySelectorAll(".ucard")'),
 ('  UNITS.forEach(u=>{','  ORD.forEach(u=>{'),
 ('\nhome();','\n'+EN_RULES+NB_EN+'home();'),
 ('   <button class="block mode" data-m="parent">','   <button class="block mode" data-m="nb"><span class="emo">📓</span><b>Notebook</b><span>Write it in your notebook, then compare</span></button>\n   <button class="block mode" data-m="parent">'),
 ('const M={learn,play,think,speak:speakMode,parent,build,memory,silly};','const M={learn,play,think,speak:speakMode,parent,build,memory,silly,nb:x=>NB.open({subj:"en",unit:x,kind:"aufg"})};'),
 ('const $=s=>document.querySelector(s);','const $=s=>ROOT.querySelector(s)||document.querySelector(s);const $$=s=>{const r=[...ROOT.querySelectorAll(s)];return r.length?r:[...document.querySelectorAll(s)];};'),
 ('const app=$("#app");','const app=ROOT;'),
 ('$("#total")','$("#totalE")'),('$("#sound")','$("#soundE")'),('$("#speedbtn")','$("#speedbtnE")'),
 ('document.querySelectorAll(','$$('),('document.getElementById("','$("#'),
 ('const w=e.target.closest(".kw");','if(!ROOT.contains(e.target))return;const w=e.target.closest(".kw");'),
 ('S.reads=(S.reads||0)+1;','S.reads=(S.reads||0)+1;REW.hit("en","read");'),
 ('if(ok){score++;','if(ok){score++;REW.hit("en","correct");'),
 ('if(st>=2){fanfare();confetti();}','REW.hit("en","round",st);if(st>=2){fanfare();confetti();}'),
 ('found++','found++,REW.hit("en","correct")'),
 ('$("#fb").textContent="🎉 You built it!";','$("#fb").textContent="🎉 You built it!";REW.hit("en","correct");'),
 ('<h2>Hi Aarya! Ready to play?</h2><p>Next up:','<h2>Hi Aarya! Ready to play?</h2><p>Next up:'),
  ('<button class="back" id="back">← All units</button>','<button class="back" id="back">← All units</button>'),
 ('<span class="vl">Game length</span>','<span class="vl">Game length</span>'),
 ('style="font-size:15px;padding:6px 14px">Reset stars</button>','style="font-size:15px;padding:6px 14px">Reset stars</button>'),
 ('Progress is saved on this device. Grown-ups:','Backups: 💾 top right. Grown-ups:'),
 ('return `<div class="rule"><div class="rl">📏 Grammar rule: <b>${esc(rule[0])}</b></div><div class="kwbox rt" id="whyr">${kwHtml(rule[1])}</div></div>`;','return `<details class="rulex"><summary>📏 Grammar rule: <b>${esc(rule[0])}</b></summary><div class="kwbox rt" id="whyr">${kwHtml(rule[1])}</div></details>`;'),
 ('.then(()=>still()&&rule&&speak("Grammar rule. "+rule[0])).then(()=>still()&&speakEl($("#whyr")))',''),
 ('.then(()=>still()&&rule&&speak("Grammar rule. "+rule[0],{force:true})).then(()=>still()&&speakEl($("#whyr"),{force:true}))',''),
 ('`;oops();','`;oops();REW.hit("en","wrong");'),('classList.add("wrong");oops();','classList.add("wrong");oops();REW.hit("en","wrong");'),('else{oops();$("#fb")','else{oops();REW.hit("en","wrong");$("#fb")'),
])
TKBTN=lambda lang,de,en:'h+=`<button class="block chall talkc" id="talk'+lang+'"><span class="emo">🗣️</span><span><b>'+de+'</b><span>'+en+'</span></span><span class="go2">🎤</span></button>`;'
def engine(files,tag,suf):
    js="\n".join(open(f).read() for f in files)
    return subs(js,tag,[
     ('const $=s=>document.querySelector(s);','const $=s=>ROOT.querySelector(s)||document.querySelector(s);const $$=s=>{const r=[...ROOT.querySelectorAll(s)];return r.length?r:[...document.querySelectorAll(s)];};'),
     ('const app=$("#app");','const app=ROOT;'),
     ('$("#total")','$("#total'+suf+'")'),('$("#sound")','$("#sound'+suf+'")'),('$("#speedbtn")','$("#speedbtn'+suf+'")'),
     ('document.querySelectorAll(','$$('),
     ('const en=e.target.closest(".enbtn");','if(!ROOT.contains(e.target)&&!e.target.closest("#speedpop"))return;const en=e.target.closest(".enbtn");'),
     ('S.solved=(S.solved||0)+1;','S.solved=(S.solved||0)+1;REW.hit("'+tag+'","correct");'),
     ('if(ok){score++;yay();$("#fb").className','if(ok){score++;REW.hit("'+tag+'","correct");yay();$("#fb").className'),
     ('if(st>=2){fanfare();confetti();}','REW.hit("'+tag+'","round",st);if(st>=2){fanfare();confetti();}'),
     ('found++','found++,REW.hit("'+tag+'","correct")'),
     ('class="note ','class="bnote '),
     ('classList.add("wrong");oops();','classList.add("wrong");oops();REW.hit("'+tag+'","wrong");'),('else{oops();$("#fb")','else{oops();REW.hit("'+tag+'","wrong");$("#fb")'),('class="clock"','class="aclock"'),
     ('const o=b.dataset.o,ok=o===q.opts[0];','const o=b.dataset.o,ok=o===q.opts[0];GUARD.after(ok,"de");'),
     ('    $("#next").onclick=()=>{stopSpeech();i++;if(i<N)render();else result();};','    if(!KP.attach(app.querySelector(".opts"),q.opts,q))GUARD.arm(app.querySelector(".opts"),q.de,"de");\n    $("#next").onclick=()=>{stopSpeech();i++;if(i<N)render();else result();};'),
    ])
LRNBTN=lambda lang,a,b,c,d:'h+=`<div class="lrnbtns"><button class="block lrnb" id="lrnRead'+lang+'"><span class="emo">📖</span><b>'+a+'</b><span>'+b+'</span></button><button class="block lrnb" id="lrnSpell'+lang+'"><span class="emo">🔤</span><b>'+c+'</b><span>'+d+'</span></button></div>`;'
LRNWIRE=lambda lang,l:'{const r=$("#lrnRead'+lang+'"),s=$("#lrnSpell'+lang+'");if(r)r.onclick=()=>READ.open("'+l+'");if(s)s.onclick=()=>SPELL.open("'+l+'");}'
ma=engine([M+"cfg_math.js",M+"core.js",M+"vis.js",M+"units.js",M+"math_beginner.js",M+"book.js",M+"arbeitsheft.js",M+"screens.js"],"math","M")
de=engine([D+"cfg_de.js",M+"core.js",M+"vis.js",D+"units_de.js",D+"units_de2.js",M+"screens.js"],"de","D")
de=subs(de,"de-talk",[('h+=`<button class="block chall" id="chall">',TKBTN("D","Sprich mit mir 🎤","Ich frage, du antwortest mit dem Mikrofon – ich helfe dir beim Satz")+'h+=`<button class="block chall" id="chall">'),
 ('setC($("#chall"),{sec:"Mix"});','setC($("#chall"),{sec:"Mix"});{const t=$("#talkD");if(t)t.onclick=()=>TALK.open("de");}')])
en=subs(en,"en-talk",[('h+=`<button class="block chall" id="chall">',TKBTN("E","Talk with me 🎤","I ask a question, you answer with your voice – I help you say it right")+'h+=`<button class="block chall" id="chall">'),
 ('setC($("#chall"),{sec:"Mix"});','setC($("#chall"),{sec:"Mix"});{const t=$("#talkE");if(t)t.onclick=()=>TALK.open("en");}')])
ma=subs(ma,"ma-plan",[('showResult(u,st,`${score} von ${N} richtig`,()=>practice(u));','try{PLAN.done("math");}catch(e){}showResult(u,st,`${score} von ${N} richtig`,()=>practice(u));')])
de=subs(de,"de-lrn",[('h+=`<button class="block chall" id="chall">',LRNBTN("D","Lesen & verstehen","Geschichte lesen, Fragen beantworten","Wörter schreiben","Wörter aus Buchstaben bauen")+'h+=`<button class="block chall" id="chall">'),
 ('setC($("#chall"),{sec:"Mix"});','setC($("#chall"),{sec:"Mix"});'+LRNWIRE("D","de"))])
en=subs(en,"en-lrn",[('h+=`<button class="block chall" id="chall">',LRNBTN("E","Read & understand","Read a story, answer questions","Spell words","Build words from letters")+'h+=`<button class="block chall" id="chall">'),
 ('setC($("#chall"),{sec:"Mix"});','setC($("#chall"),{sec:"Mix"});'+LRNWIRE("E","en")),
 ('        if(o===correct){finish(true,null,correct);}','        GUARD.after(o===correct,"en");if(o===correct){finish(true,null,correct);}'),
 ('    qa.appendChild(wrap);\n  }\n  function tapAll','    qa.appendChild(wrap);GUARD.arm(wrap,q[1],"en");\n  }\n  function tapAll')])
api='\nreturn {S:()=>S,stopSpeech,openSpeed,closeSpeed,home,U:()=>UNITS,speak,confetti,fanfare,nbTasks,openUnit:id=>go(()=>unit(UNITS[id])),fxStop:()=>{parts=[];}};'
js=(open("profile.js").read()+"\n"+open("rewards.js").read()
 +"\nconst EN=(function(ROOT){\n"+en+api.replace('speak,','speak,nbTasks,more:id=>MORE[id],')+"\n})(document.getElementById('appE'));"
 +"\nconst MA=(function(ROOT){\n"+ma+api+"\n})(document.getElementById('appM'));"
 +"\nconst DE=(function(ROOT){\n"+de+api+"\n})(document.getElementById('appD'));\n"
 +"function gConfetti(n){try{EN.confetti(n);}catch(e){}}\nfunction gFanfare(){try{EN.fanfare();}catch(e){}}\n"
 +"const BR=(function(ROOT){\n"+open("brain.js").read()+"\n})(document.getElementById('vBrain'));\n"
 +open("notebook.js").read()+"\n"+open("talk.js").read()+"\n"+open("learn.js").read()+"\n"+open("bhasha_data.js").read()+"\n"+open("bhasha.js").read()+"\n"+open("shell.js").read()+"\n"+open("store.js").read())
assert "</script" not in js.lower()
mcss=open(M+"math.css").read().replace(".note{width:96px",".bnote{width:96px").replace(".note b{font-size:26px}.note.n5",".bnote b{font-size:26px}.bnote.n5").replace(".note.n10",".bnote.n10").replace(".note.n20",".bnote.n20").replace(".note.n50",".bnote.n50").replace(".clock{width:150px;height:150px}",".aclock{width:150px;height:150px}")
assert ".bnote{" in mcss and ".aclock{" in mcss
css=open("learn.css").read()+"\n"+open("en.css").read()+"\n"+mcss+"\n"+open("shell.css").read()+"\n"+open("brain.css").read()+"\n"+open(M+"book.css").read()+"\n"+open("app.css").read()+"\n"+open("nb.css").read()+"\n"+open("bh.css").read()
F=pathlib.Path("../fonts")
for k,f in {"__ANDIKA400__":"andika/files/andika-latin-400-normal.woff2","__ANDIKA700__":"andika/files/andika-latin-700-normal.woff2","__FREDOKA600__":"fredoka/files/fredoka-latin-600-normal.woff2","__DEVA400__":"noto-deva/noto-sans-devanagari-devanagari-400-normal.woff2","__DEVA600__":"noto-deva/noto-sans-devanagari-devanagari-600-normal.woff2"}.items():
    css=css.replace(k,base64.b64encode((F/f).read_bytes()).decode())
t=open("template.html").read().replace("/*CSS*/",css).replace("/*JS*/",js).replace("/*BOOT*/",open("boot.js").read())
open("aaryaai.html","w").write(t)
open("AaryaAI.html","w").write(t.replace('<title>','<!doctype html>\n<html lang="de"><head><meta charset="utf-8">\n<title>',1).replace('</style>\n','</style>\n</head><body>\n',1)+"\n</body></html>\n")
print("built",len(t))
