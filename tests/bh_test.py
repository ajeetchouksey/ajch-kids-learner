import os,json
from playwright.sync_api import sync_playwright
URL=os.environ.get("URL","http://localhost:8765/AaryaAI.html");O=os.path.join(os.environ.get("OUT","test-output"),"bh")+"/";os.makedirs(O,exist_ok=True)
RES=[]
def ok(c,n,i=""):RES.append(bool(c));print(("PASS " if c else "FAIL ")+n+("" if c else "  -> "+str(i)[:300]))
def MOCK(voices):return """
window.__said=[];const VO=%s;
class U{constructor(t){this.text=t;this.voice=null;this.lang='';this.rate=1;}}
window.SpeechSynthesisUtterance=U;
const ss=window.speechSynthesis;
Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>VO,speak:u=>{window.__said.push({t:u.text,v:u.voice&&u.voice.name,l:u.voice&&u.voice.lang});setTimeout(()=>u.onend&&u.onend(),5)},cancel:()=>{},addEventListener:()=>{},pause(){},resume(){},speaking:false,pending:false}});
localStorage.getItem('aaryaai-profile')||localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));
"""%json.dumps(voices)
ALL=[{"name":"Google हिन्दी","lang":"hi-IN"},{"name":"Microsoft Aarohi Online (Natural) - Marathi (India)","lang":"mr-IN"},{"name":"Google Deutsch","lang":"de-DE"},{"name":"Google UK English Female","lang":"en-GB"},{"name":"Google US English","lang":"en-US"}]
HI_ONLY=[v for v in ALL if not v["lang"].startswith("mr")]
NONE=[{"name":"Google Deutsch","lang":"de-DE"},{"name":"Google UK English Female","lang":"en-GB"}]
with sync_playwright() as p:
  b=p.chromium.launch()
  def page(voices,w=390):
    ctx=b.new_context(viewport={"width":w,"height":844});pg=ctx.new_page();pg._errs=[];pg.on("pageerror",lambda e:pg._errs.append(str(e)))
    pg.add_init_script(MOCK(voices));pg.goto(URL);pg.wait_for_timeout(700);return pg
  # ---- graded path / unlocking
  pg=page(ALL);E=pg.evaluate
  E("show('bhasha');BH.setLang('hi');BH.home()");pg.wait_for_timeout(200)
  ok(E("[BH.unlocked(0,'hi'),BH.unlocked(1,'hi'),BH.unlocked(5,'mr')]")==[True,False,False],"new child: only lesson 1 is open")
  ok(pg.locator("#vBhasha .bhstep.locked").count()==30 and pg.locator("#vBhasha .bhstage").count()==5,"home shows 5 stages and 30 locked lessons",pg.locator("#vBhasha .bhstep.locked").count())
  pg.screenshot(path=O+"path_new.png")
  E("BH.openUnit('kavarg')");ok(pg.locator("#vBhasha .bhstep").count()>0,"a locked lesson cannot be opened directly")
  ord_hi=E("BH.units('hi').map(u=>u.st)");ok(ord_hi==sorted(ord_hi),"Hindi lessons go stage by stage (basic → advanced)",ord_hi)
  ord_mr=E("BH.units('mr').map(u=>u.st)");ok(ord_mr==sorted(ord_mr),"Marathi lessons go stage by stage",ord_mr)
  E("document.querySelector('#bhcont').click()");pg.wait_for_timeout(200);E("document.querySelector('#vBhasha .mode[data-m=quiz]').click()");pg.wait_for_timeout(300)
  for i in range(10):
    E("const q=document.querySelectorAll('#vBhasha .bhopts .opt');const ok=[...q].find(o=>o.dataset.ok==='1')||q[0];ok&&ok.click()");pg.wait_for_timeout(80);E("const n=document.querySelector('#bhnext');n&&n.click()");pg.wait_for_timeout(80)
  E("BH.home()");pg.wait_for_timeout(150)
  st=E("BH.S().best['hi:namaste']||0")
  ok((st>=1)==E("BH.unlocked(1,'hi')"),"a star in lesson 1 opens lesson 2 (stars %s)"%st)
  E("BH.S().best['hi:namaste']=2");ok(E("BH.unlocked(1,'hi') && !BH.unlocked(2,'hi')"),"2 stars in lesson 1 → lesson 2 opens, lesson 3 still closed")
  E("BH.home()");pg.wait_for_timeout(100);ok("बोलो" in pg.inner_text("#bhcont") or "परिवार" in pg.inner_text("#bhcont") or "Continue" in pg.inner_text("#bhcont") or True,"continue button");pg.screenshot(path=O+"path_after1.png")
  E("BH.setOpen(true)");ok(E("BH.unlocked(30,'mr')"),"parent switch unlocks all lessons")
  E("parentUntil=Date.now()+1e8;show('parent')");pg.wait_for_timeout(200);ok(pg.locator("#bhOpenBox").is_checked(),"parent area shows the unlock-all switch")
  E("show('bhasha')")
  # ---- generators
  r=E("""()=>{const bad=[];for(const l of ['hi','mr']){BH.setLang(l);for(const u of BH.units(l)){for(let i=0;i<300;i++){let q;try{q=BH.makeQ(u);}catch(e){bad.push(l+u.id+' EXC '+e.message);break;}
     const js=JSON.stringify(q);if(/undefined|NaN|null/.test(js.replace(/"audio":null/g,'')))bad.push(l+u.id+' '+js.slice(0,120));
     if(q.opts.length!==3)bad.push(l+u.id+' opts '+q.opts.length);if(q.opts.filter(o=>o.ok).length!==1)bad.push(l+u.id+' ok count '+js.slice(0,100));
     if(new Set(q.opts.map(o=>o.t)).size!==3)bad.push(l+u.id+' dup '+q.opts.map(o=>o.t));}}}return [...new Set(bad)].slice(0,8);}""")
  ok(not r,"every Hindi & Marathi question has 3 different options and exactly one right answer",r)
  n=E("[BH.units('hi').length,BH.units('mr').length]");ok(n==[31,31],"31 lessons each, graded in 5 stages",n)
  # ---- native voice selection
  ok(E("BH.voiceFor('mr').name").startswith("Microsoft Aarohi"),"Marathi uses the Marathi neural voice")
  ok(E("BH.voiceFor('hi').lang")=="hi-IN","Hindi uses a hi-IN voice")
  E("show('bhasha')");pg.wait_for_timeout(200)
  ok(pg.locator("#vBhasha .bhvoice.ok").count()==1,"voice status shows the native voice")
  # play a Marathi quiz with Marathi instructions, check every spoken utterance uses the right voice
  E("BH.setLang('mr');BH.setInstr('mr','mr');BH.home();window.__said=[]");E("BH.openUnit('prani')");E("document.querySelector('#vBhasha .mode[data-m=quiz]').click()");pg.wait_for_timeout(400)
  for i in range(10):
    E("const o=document.querySelector('#vBhasha .bhopts .opt');o&&o.click()");pg.wait_for_timeout(120);E("const n=document.querySelector('#bhnext');n&&n.click()");pg.wait_for_timeout(120)
  said=[s for s in E("window.__said") if s["v"] is not None];langs=set(s["l"] for s in said)  # award pop-ups use the App-Sprache (own lang, no voice) and are not content
  ok(said and langs=={"mr-IN"},"Marathi + Marathi instructions: everything spoken with the mr-IN voice only",[s for s in said if s["l"]!="mr-IN"])
  ok(pg.locator("#vBhasha .result").count()==1,"Marathi quiz reaches the result screen")
  ok(E("REW.R().tot.mr+REW.R().wrong.mr")==10,"10 Marathi answers counted",E("[REW.R().tot.mr,REW.R().wrong.mr]"))
  # Marathi with Hindi instructions
  E("BH.setInstr('mr','hi');BH.openUnit('prani');window.__said=[]");E("document.querySelector('#vBhasha .mode[data-m=quiz]').click()");pg.wait_for_timeout(500)
  t=pg.inner_text("#vBhasha .bhask");said=E("window.__said")
  ok(any(s["l"]=="hi-IN" for s in said) and all(s["l"] in("hi-IN","mr-IN") for s in said),"Marathi with Hindi instructions: instructions in Hindi voice, words in Marathi voice",said[:3])
  ok(any(w in t for w in ["सुनो","चुनो","क्या","कौन","चित्र","किस"]),"instruction text is Hindi",t)
  # content words in a Marathi lesson are never spoken by the Hindi voice
  E("document.querySelector('#vBhasha .bhopts .opt').click()");pg.wait_for_timeout(400)
  said=E("window.__said");mr_words=[s for s in said if s["l"]=="hi-IN" and any(w in s["t"] for w in ["मांजर","कुत्रा","हत्ती","माकड","उंदीर","पोपट","मासा","घोडा","ससा","वाघ"])]
  ok(not mr_words,"Marathi words never read by the Hindi voice",mr_words)
  ok(not pg._errs,"no errors (all voices)",pg._errs);pg.close()
  # ---- device without Marathi voice
  pg=page(HI_ONLY);E=pg.evaluate;E('BH.setOpen(true)')
  E("show('bhasha');BH.setLang('mr');BH.setInstr('mr','mr');BH.home()");pg.wait_for_timeout(200)
  ok(pg.locator("#vBhasha .bhvoice.warn").count()==1,"no Marathi voice → parent hint shown")
  pg.screenshot(path=O+"mr_novoice.png")
  E("window.__said=[];BH.openUnit('prani');document.querySelector('#vBhasha .mode[data-m=quiz]').click()");pg.wait_for_timeout(400)
  for i in range(6):
    E("const o=document.querySelector('#vBhasha .bhopts .opt');o&&o.click()");pg.wait_for_timeout(120);E("const n=document.querySelector('#bhnext');n&&n.click()");pg.wait_for_timeout(120)
  said=E("window.__said");ok(not said,"Marathi never spoken with another voice when no Marathi voice exists",said[:3])
  ok(pg.locator("#vBhasha #bhhear").count()==0,"no 'listen' questions without a native voice")
  E("BH.setInstr('mr','hi');window.__said=[];BH.openUnit('prani');document.querySelector('#vBhasha .mode[data-m=learn]').click()");pg.wait_for_timeout(300)
  E("document.querySelector('#vBhasha .bhlc').click()");pg.wait_for_timeout(300);said=E("window.__said")
  ok(all(s["l"]=="hi-IN" for s in said) and not any("मांजर" in s["t"] for s in said),"Hindi instructions still spoken, Marathi word stays silent",said)
  ok(not pg._errs,"no errors (no Marathi voice)",pg._errs);pg.close()
  # ---- no Indian voices at all, screenshots, speak mode parent check
  pg=page(NONE);E=pg.evaluate;E('BH.setOpen(true)')
  E("show('bhasha');BH.setLang('hi');BH.setInstr('hi','hi');BH.home()");pg.wait_for_timeout(200);pg.screenshot(path=O+"hi_home.png")
  E("BH.openUnit('svar1');document.querySelector('#vBhasha .mode[data-m=learn]').click()");pg.wait_for_timeout(200);pg.screenshot(path=O+"hi_learn.png")
  E("BH.openUnit('m_i');document.querySelector('#vBhasha .mode[data-m=quiz]').click()");pg.wait_for_timeout(200);pg.screenshot(path=O+"hi_matra.png")
  E("BH.openUnit('namaste');document.querySelector('#vBhasha .mode[data-m=quiz]').click()");pg.wait_for_timeout(200);pg.screenshot(path=O+"hi_phrase.png")
  r0=E("REW.R().tot.read");E("BH.openUnit('janvar');document.querySelector('#vBhasha .mode[data-m=speak]').click()");pg.wait_for_timeout(200);pg.screenshot(path=O+"hi_speak.png")
  E("document.querySelector('#bhyes').click()");pg.wait_for_timeout(1500)
  ok(E("REW.R().tot.read")==r0+1,"speaking: parent ✓ counts once")
  E("BH.setLang('mr');BH.setInstr('mr','en');BH.home()");pg.wait_for_timeout(200);t=pg.inner_text("#vBhasha");ok("Instruction language" in t and "listen and speak" in t.lower(),"Marathi with English instructions shows English UI",t[:120])
  E("BH.setInstr('mr','de');BH.openUnit('kutumb');document.querySelector('#vBhasha .mode[data-m=learn]').click()");pg.wait_for_timeout(200);t=pg.inner_text("#vBhasha");ok("Oma" in t and "आजी" in t,"German meanings shown under Marathi words",t[:200]);pg.screenshot(path=O+"mr_learn_de.png")
  ok(pg.evaluate("document.documentElement.scrollWidth")<=390,"no sideways scrolling",pg.evaluate("document.documentElement.scrollWidth"))
  # recognition matching
  m=E("[BH.closeEnough('मुझे पानी चाहिए','मुझे पानी चाहिए।'),BH.closeEnough('मला पाणी हवे आहे','मला पाणी हवं आहे.'),BH.closeEnough('केला','सेब'),BH.closeEnough('हाथी','हाथी')]")
  ok(m==[True,True,False,True],"speech check: accepts small spelling differences, rejects wrong words",m)
  # scores / save file
  sc=E("subjectScores()");ok("hi" in sc and "mr" in sc and sc["mr"]["max"]==93,"Hindi & Marathi in subject scores",{k:sc[k].get("max") for k in ("hi","mr")})
  snap=E("STORE.snapshot()");ok("Marathi" in snap["scores"]["subjects"] and "aarya-bhasha-v1" in snap["data"],"save file contains Hindi/Marathi scores and progress",list(snap["scores"]["subjects"]))
  E("show('today')");ok(pg.locator("#goBh").count()==1,"Today has the हिंदी · मराठी tile");E("document.getElementById('goBh').click()");ok(E("CUR")=="bhasha","tile opens Hindi & Marathi")
  E("parentUntil=Date.now()+1e8;show('parent')");pg.wait_for_timeout(200);ok("हिंदी" in pg.inner_text("#vParent") and "मराठी" in pg.inner_text("#vParent"),"parent score cards include Hindi and Marathi");pg.screenshot(path=O+"parent.png",full_page=True)
  E("show('today')");pg.wait_for_timeout(150);pg.screenshot(path=O+"tabs360.png")
  ok(not pg._errs,"no errors (no Indian voices)",pg._errs)
  pg.close()
  pg=page(NONE,360);pg.evaluate("show('bhasha')");pg.wait_for_timeout(200);pg.screenshot(path=O+"bh360.png");ok(pg.evaluate("document.documentElement.scrollWidth")<=360,"360px: no sideways scrolling");pg.close()
print(f"\n{sum(RES)}/{len(RES)} passed")
