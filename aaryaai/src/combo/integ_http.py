import os,json
from playwright.sync_api import sync_playwright
RES=[]
def ok(c,name,info=""):
    RES.append((bool(c),name,str(info)[:200]));print(("PASS " if c else "FAIL ")+name+("" if c else "  -> "+str(info)[:300]))
URL="http://localhost:8765/AaryaAI.html"
def mkpage(b,prof=None,w=390,h=844):
    pg=b.new_context(viewport={"width":w,"height":h}).new_page();pg._errs=[];pg.on("pageerror",lambda e:pg._errs.append(str(e)))
    init="speechSynthesis.speak=()=>{};/*Storage.prototype.removeItem=function(k){console.log('RM '+k+' '+new Error().stack.split('\\n').slice(1,4).join(' | '));return _rm.call(this,k)};const _cl=Storage.prototype.clear;Storage.prototype.clear=function(){console.log('CLEAR '+new Error().stack);*/"
    if prof: init="if(!localStorage.getItem('aaryaai-profile'))localStorage.setItem('aaryaai-profile',JSON.stringify(%s));"%json.dumps(prof)+init
    init="localStorage.getItem('aarya-plan-v1')||localStorage.setItem('aarya-plan-v1',JSON.stringify({opt:{gate:false,pause:false,type:false}}));"+init  # legacy checks: learning-plan gate/pause/keypad off (tested in lp_test.py)
    pg.add_init_script(init);pg.goto(URL);pg.wait_for_timeout(700);return pg
def hidepop(pg): pg.evaluate("const a=document.getElementById('awardpop');if(a)a.hidden=true")
with sync_playwright() as p:
  b=p.chromium.launch()
  # 1 ---- first run wizard
  pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
  pg.add_init_script("speechSynthesis.speak=()=>{};");pg.goto(URL);pg.wait_for_timeout(700)
  ok(pg.locator("#setup:visible").count()==1,"first start shows the setup wizard")
  t=pg.inner_text("#setup")
  pg.fill("#setup input","Leo")
  pg.evaluate("document.querySelector('#setup [data-g=m]')&&document.querySelector('#setup [data-g=m]').click()")
  btns=pg.evaluate("[...document.querySelectorAll('#setup button')].map(b=>b.textContent.trim()).slice(0,20)")
  # go through wizard: pick Klasse 2 if offered, then press the primary buttons until it closes
  for i in range(8):
    if not pg.locator("#setup:visible").count(): break
    pg.evaluate("""(()=>{const s=document.getElementById('setup');const k=[...s.querySelectorAll('button')].find(b=>/Klasse 2|Year 2/.test(b.textContent));if(k&&!k.classList.contains('on'))k.click();
      const nx=[...s.querySelectorAll('button')].find(b=>/Weiter|Next|Los|Start|Fertig|später|later|Ohne|without|Überspringen|Skip/i.test(b.textContent));if(nx)nx.click();})()""");pg.wait_for_timeout(250)
  ok(not pg.locator("#setup:visible").count(),"wizard can be completed (save file can be skipped)",btns)
  pr=pg.evaluate("JSON.parse(localStorage.getItem('aaryaai-profile'))")
  ok(pr and pr.get("name")=="Leo" and pr.get("gender")=="m","profile saved with name and gender",pr)
  pg.wait_for_timeout(500)
  body=pg.inner_text("body")
  import re as _re;ok("Leo" in body and not _re.search(r"Aarya(?!AI)",body),"child's name replaces Aarya everywhere visible",body[:120])
  pg.evaluate("show('awards')");aw=pg.inner_text("#vAwards")
  ok("Heldin" not in aw and "Entdeckerin" not in aw,"boy forms used in award names")
  ok(not errs,"no errors during first run",errs)
  pg.close()
  # 2 ---- Today navigation
  pg=mkpage(b,{"name":"Aarya","gender":"f","grade":1,"created":"2026-09-01"})
  vis=lambda v:pg.evaluate(f"!document.getElementById('{v}').hidden")
  for tid,view in [("goDe","vDe"),("goMa","vMath"),("goEn","vEn"),("goBr","vBrain")]:
    pg.evaluate("show('today')");pg.evaluate(f"document.getElementById('{tid}').click()");pg.wait_for_timeout(150)
    ids=pg.evaluate("Object.values({en:'vEn'}).length")
    cur=pg.evaluate("CUR")
    ok(cur=={"goDe":"de","goMa":"math","goEn":"en","goBr":"brain"}[tid],f"Today tile {tid} opens its subject",cur)
  pg.evaluate("show('today');document.getElementById('goNb').click()");pg.wait_for_timeout(150);ok(vis("nbook"),"Today tile Heft-Zeit opens notebook");pg.evaluate("NB.close()")
  pg.evaluate("show('today');document.getElementById('goTk').click()");pg.wait_for_timeout(150);ok(vis("talk"),"Today tile Sprechen opens speaking practice");pg.evaluate("TALK.close()")
  pg.evaluate("show('today')");gn=pg.locator("#vToday .gonext")
  if gn.count():
    gn.first.evaluate("e=>e.click()");pg.wait_for_timeout(200);ok(pg.evaluate("CUR")!="today","'Weiter mit' button opens a topic",pg.evaluate("CUR"))
  rings=pg.locator("#vToday .ring.tap").count();ok(rings>=5,"goal rings are tappable",rings)
  # 3 ---- languages
  pg.evaluate("PROF.setUiLang('en');UIL.set('en');show('today')");pg.wait_for_timeout(150)
  t=pg.inner_text("#vToday");ok("Hello" in t or "Today" in t,"App language English → Today in English",t[:80])
  pg.evaluate("show('de')");t=pg.inner_text("#appD");ok("Alle Themen" in t or "Los" in t or "Hallo" in t,"Deutsch area stays German when app is English",t[:80])
  pg.evaluate("show('en')");t=pg.inner_text("#appE");ok("Ready to play" in t,"English area is English",t[:80])
  pg.evaluate("PROF.setBrainLang('de');show('brain')");t=pg.inner_text("#vBrain");ok("Gehirn-Training" in t,"Training language independent of app language",t[:60])
  pg.evaluate("PROF.setUiLang('de');PROF.setBrainLang('de');UIL.set('de');show('today')")
  # 4 ---- Heft-Modus gate
  pg.evaluate("show('math');MA.openUnit(4)");pg.wait_for_timeout(100)
  pg.evaluate("NBM.set&&NBM.set(true)");pg.evaluate("document.querySelector('#appM .mode[data-m=practice]').click()");pg.wait_for_timeout(250)
  gate=pg.locator("#appM .nbgate:visible").count();ok(gate==1,"Heft-Modus hides the answers until written",gate)
  pg.evaluate("const g=document.querySelector('#appM .nbgate button');g&&g.click()");pg.wait_for_timeout(150)
  ok(pg.locator("#appM .opts button:visible").count()>=2,"after 'written' the answers appear")
  pg.evaluate("NBM.set&&NBM.set(false);MA.fxStop()")
  # 5 ---- notebook session end to end
  h0=pg.evaluate("REW.R().tot.heft");p0=pg.evaluate("REW.R().points")
  pg.evaluate("NB.open({subj:'math',unit:MA.U()[4],kind:'aufg'})");pg.wait_for_timeout(200)
  for i in range(40):
    if pg.evaluate("document.getElementById('nbook').hidden"): break
    hidepop(pg)
    done=pg.evaluate("""(()=>{const nb=document.getElementById('nbook');const q=s=>nb.querySelector(s);
      const yes=[...nb.querySelectorAll('.nbchecks button,.nbcheck button')].find(b=>/✓|✔|richtig|Richtig|right/.test(b.textContent)&&!b.classList.contains('on'));if(yes){yes.click();return 'check';}
      for(const id of ['nbPar','nbGo','nbReady','nbPause','nbDone','nbYes','nbOk','nbFixed','nbNext','nbEnd','nbShow']){const b=q('#'+id);if(b&&b.offsetParent!==null&&!b.disabled){if(id==='nbPar'){if(b.dataset.clicked)continue;b.dataset.clicked=1;}b.click();return id;}}return 'none';})()""")
    pg.wait_for_timeout(120)
    if done=="none": break
  h1=pg.evaluate("REW.R().tot.heft");ok(h1==h0+1,"notebook session completes and is counted",(h0,h1,done))
  ok(pg.evaluate("REW.R().points")>p0,"notebook session gives points")
  pg.evaluate("NB.close&&NB.close()")
  # 6 ---- Arbeitsheft page persists
  pg.evaluate("show('math');MA.home();document.querySelector('#appM #ahcard').click()");pg.wait_for_timeout(150)
  ok(pg.locator("#appM #ahrep[disabled]").count()==1,"Wiederholung disabled on page 1")
  for i in range(4): pg.evaluate("document.querySelector('#appM .ahstep [data-d=\"5\"]').click()")
  pg.wait_for_timeout(1500);pg.reload();pg.wait_for_timeout(700);pg.evaluate("show('math');MA.home()")
  ok("Seite 21" in pg.inner_text("#appM #ahcard"),"workbook page survives reload",pg.inner_text("#appM #ahcard"))
  pg.evaluate("document.querySelector('#appM #ahcard').click()");pg.evaluate("document.querySelector('#appM #ahrep').click()");pg.wait_for_timeout(200)
  ok(pg.locator("#appM .opts button").count()>=2,"Wiederholung mix starts with questions")
  # 7 ---- save / restore
  pg.evaluate("REW.hit('de','correct')");snap=pg.evaluate("STORE.json()");pts=pg.evaluate("REW.R().points");best=pg.evaluate("JSON.stringify(MA.S().best)")
  pg.evaluate("localStorage.removeItem('aarya-rewards-v1');localStorage.removeItem('aarya-mathe-v1')")
  pg.evaluate("t=>AAI.importText(t)",snap);pg.wait_for_timeout(1500);pg.reload();pg.wait_for_timeout(700)
  ok(pg.evaluate("REW.R().points")==pts,"restore from save file brings points back",(pts,pg.evaluate("REW.R().points")))
  ok(pg.evaluate("JSON.stringify(MA.S().best)")==best,"restore brings stars back")
  bad=pg.evaluate("(()=>{try{AAI.importText('{\"app\":\"other\"}');return 'accepted'}catch(e){return 'rejected'}})()")
  ok(bad=="rejected","a wrong file is rejected, nothing overwritten",bad)
  # 8 ---- parent gate
  pg.evaluate("parentUntil=0;show('parent')");pg.wait_for_timeout(150)
  ok(pg.evaluate("document.getElementById('vParent').hidden"),"parent area is locked behind the question")
  gt=pg.locator(".setcard.gate:visible").count();ok(gt==1,"parent gate question shown")
  q=pg.inner_text(".setcard.gate");import re;m=re.search(r"(\d+)\s*[×x·]\s*(\d+)",q)
  if m:
    pg.fill(".setcard.gate input","1");pg.keyboard.press("Enter");pg.wait_for_timeout(100)
    ok(pg.evaluate("document.getElementById('vParent').hidden"),"wrong answer keeps it locked")
    pg.fill(".setcard.gate input",str(int(m.group(1))*int(m.group(2))));pg.keyboard.press("Enter");pg.wait_for_timeout(200)
    ok(not pg.evaluate("document.getElementById('vParent').hidden"),"right answer opens the parent area")
  else: ok(False,"gate question readable",q)
  # 9 ---- popups wait during timed game
  pg.evaluate("show('math');MA.openUnit(4);document.querySelector('#appM .mode[data-m=blitz]').click()");pg.wait_for_timeout(300)
  pg.evaluate("REW.R().badges={};REW.checkBadges()");pg.wait_for_timeout(300)
  ok(pg.locator("#awardpop:visible").count()==0,"award pop-up waits while Blitzrechnen runs")
  pg.evaluate("MA.home()");pg.wait_for_timeout(1200)
  ok(pg.locator("#awardpop:visible").count()==1,"pop-up appears after the timed game")
  hidepop(pg)
  # 10 ---- grade change
  pg.evaluate("PROF.setView('math',2);show('math');MA.home()");t=pg.inner_text("#appM");ok("Einmaleins" in t,"Klasse 2 shows Klasse-2 topics")
  pg.evaluate("PROF.setView('math',1);MA.home()")
  ok(not pg._errs,"no JS errors in integration run",pg._errs)
  json.dump(RES,open("integ_res.json","w"))
  print(f"\n{sum(r[0] for r in RES)}/{len(RES)} passed")
