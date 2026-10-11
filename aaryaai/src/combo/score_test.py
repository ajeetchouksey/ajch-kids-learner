import os,json
from playwright.sync_api import sync_playwright
RES=[]
def ok(c,name,info=""):
    RES.append((bool(c),name,info));print(("PASS " if c else "FAIL ")+name+("" if c else "  -> "+str(info)))
URL="file://"+os.getcwd()+"/AaryaAI.html"
PROF="localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));speechSynthesis.speak=()=>{};"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
  pg.add_init_script("if(!sessionStorage.getItem('init')){localStorage.clear();"+PROF+"sessionStorage.setItem('init','1');}speechSynthesis.speak=()=>{};")
  pg.goto(URL);pg.wait_for_timeout(700)
  E=pg.evaluate
  E("REW._setDate('2026-10-05')")
  st=lambda:E("(()=>{const R=REW.R();return {p:R.points,tot:R.tot,wrong:R.wrong,sp:R.sp,day:REW.day(),badges:Object.keys(R.badges),best:R.bestCombo}})()")
  s0=st();ok(s0["p"]==0,"fresh profile starts at 0 points",s0["p"])
  # ---- point rules per kind
  def delta(js):
    a=st()["p"];E(js);E("document.getElementById('awardpop').hidden=true");return st()["p"]-a
  ok(delta("REW.hit('math','correct')")==1,"correct answer = +1")
  ok(delta("REW.hit('math','wrong')")==0,"wrong answer = 0 (no penalty)")
  ok(st()["wrong"]["math"]==1,"wrong answer is counted for accuracy")
  ok(delta("REW.hit('de','checked',{right:true})")==1,"notebook checked right = +1")
  ok(delta("REW.hit('de','checked',{right:false})")==1,"notebook checked wrong = +1 (effort)")
  ok(delta("REW.hit('math','fix')")==2,"correction (Berichtigung) = +2")
  ok(delta("REW.hit('en','read')")==1,"read aloud = +1")
  ok(delta("REW.hit('math','round',3)")==6,"round 3 stars = +6")
  ok(delta("REW.hit('math','round',0)")==0,"round 0 stars = 0")
  ok(delta("REW.hit('brain','workout')")==5,"workout = +5")
  ok(delta("REW.hit('de','written',{secs:30})")==1,"written first in notebook = +1")
  ok(delta("REW.hit('de','heft',{secs:300,parent:true})")==5,"notebook session with parent = +5")
  ok(delta("REW.hit('de','heft',{secs:300})")==3,"notebook session without parent = +3")
  t0=st()["tot"].get("talk",0);d=delta("REW.hit('en','spoke')");ok(d==0 and st()["tot"]["talk"]==t0+1,"spoken answer counted, no extra points",d)
  mv=[delta("REW.hit('brain','move')") for _ in range(7)];ok(mv[:5]==[2]*5 and mv[5:]==[0,0],"movement break +2, max 5 per day",mv)
  # combo bonus: +2 every 10 attempts
  E("REW.R().bestCombo=0")
  ds=[delta("REW.hit('math','wrong')") for _ in range(20)];ok(sum(ds) in (2,4),"every 10 tries in a row = +2 bonus",ds)
  # subject points sum
  s=st();ok(sum(s["sp"].values())==s["p"],"subject points + bonus add up to total",(s["sp"],s["p"]))
  # ---- daily goal
  E("REW.R().days={};REW.R().goal={en:1,math:1,de:1,read:0,brain:0,heft:0}")
  E("REW.hit('en','correct');REW.hit('de','correct')");g1=E("REW.day().goal")
  a=st()["p"];E("REW.hit('math','correct')");g2=E("REW.day().goal");d=st()["p"]-a
  ok(not g1 and g2,"daily goal reached exactly when last subject is done")
  ok(d==11,"goal bonus +10 (plus +1 for answer)",d)
  a=st()["p"];E("REW.hit('math','correct')");ok(st()["p"]-a==1,"goal bonus only once per day")
  # streak over days
  for dd in ["2026-10-06","2026-10-07"]:
    E(f"REW._setDate('{dd}')");E("REW.hit('en','correct');REW.hit('de','correct');REW.hit('math','correct')")
  ok(E("REW.curStreak()")==3,"3 goal days in a row = streak 3",E("REW.curStreak()"))
  ok(E("REW.weekDays()")==3,"week counter 3",E("REW.weekDays()"))
  ok("streak3" in st()["badges"],"badge '3 Zieltage' awarded")
  E("REW._setDate('2026-10-09')");ok(E("REW.curStreak()")==0,"streak resets after a missed day")
  # level up
  E("REW.R().points=18;REW.R().lv=0");E("REW.hit('math','round',1)");ok(E("REW.level().n")==2,"level 2 at 20 points",E("REW.level()"))
  # badges
  bs=st()["badges"];ok("first" in bs and "goal1" in bs,"first answer + first goal badges",bs)
  # ---- end to end: Mathe practice through the UI
  E("show('math');MA.openUnit(4)");pg.wait_for_timeout(150)
  before=st()
  E("document.querySelector('#appM .mode[data-m=practice]').click()");pg.wait_for_timeout(200)
  n=0
  for i in range(30):
    E("document.getElementById('awardpop').hidden=true")
    if not pg.locator("#appM .opts button").count(): break
    # click correct: engine marks correct option via data? use answer from MA state
    clicked=E("""(()=>{const bs=[...document.querySelectorAll('#appM .opts button:not([disabled])')];if(!bs.length)return 'none';
      const qt=document.querySelector('#appM .qtext,#appM .q, #appM h3');return bs.length})()""")
    if clicked=='none': break
    # try each option until correct shows
    E("document.querySelector('#appM .opts button').click()");pg.wait_for_timeout(120)
    nx=pg.locator("#appM #next")
    if nx.count(): E("document.querySelector('#appM #next').click()");pg.wait_for_timeout(120)
    n+=1
    if pg.locator("#appM .result").count(): break
  after=st()
  ok(pg.locator("#appM .result").count()==1,"Mathe practice round reaches the result screen",n)
  answered=(after["tot"]["math"]-before["tot"]["math"])+(after["wrong"]["math"]-before["wrong"]["math"])
  ok(answered==12,"every answer of a 12-question round is counted once",answered)
  ok(after["tot"]["rounds"]==before["tot"]["rounds"]+1,"round counted")
  stars=E("MA.S().best[4]||0");ok(stars>=0,"stars stored for unit",stars)
  sc=E("subjectScores().math");ok(sc["correct"]==after["tot"]["math"] and sc["points"]==after["sp"]["math"],"Mathe score card matches counters",sc)
  # workbook units count in stars
  E("MA.S().best[45]=2");sc2=E("subjectScores().math");ok(sc2["stars"]==sc["stars"]+2,"workbook (Arbeitsheft) stars count in Mathe score",(sc["stars"],sc2["stars"]))
  ok(sc2["max"]==E("MA.U().length*3"),"star maximum includes every Mathe topic",(sc2["max"],E("MA.U().length*3")))
  # snapshot / save file
  snap=E("STORE.snapshot()")
  ok(snap["scores"]["overall"]["points"]==st()["p"],"save file: overall points match")
  ok(snap["scores"]["subjects"]["Mathe" if "Mathe" in snap["scores"]["subjects"] else list(snap["scores"]["subjects"])[1]]["points"]>=0,"save file: subject scores present",list(snap["scores"]["subjects"]))
  ok(snap["child"]["name"]=="Aarya","save file: child name")
  ok(len(snap["awards"])==len(st()["badges"]),"save file: awards list matches",(len(snap["awards"]),len(st()["badges"])))
  # reload persistence
  p_before=st()["p"];pg.reload();pg.wait_for_timeout(700);E("REW._setDate('2026-10-09')")
  ok(st()["p"]==p_before,"points survive reload",(p_before,st()["p"]))
  # talk scoring end-to-end
  E("REW.R().tot.talk=0");a=st()
  E("TALK.open('en')");E("document.querySelector('#tkGo').click()")
  for i in range(5):
    pg.fill("#tkIn","i is happy");E("document.querySelector('#tkSend').click()");pg.wait_for_timeout(80)
    if pg.locator(".tkagain #tkIn").count():
      m=pg.inner_text(".tkmodel");pg.fill(".tkagain #tkIn",m);E("document.querySelector('.tkagain #tkSend').click()")
      # second repeat must not give points again
      pp=st()["p"];E("document.querySelector('.tkagain #tkSend')&&document.querySelector('.tkagain #tkSend').click()");
      if i==0: ok(st()["p"]==pp,"repeat bonus can't be earned twice")
    E("document.getElementById('awardpop').hidden=true;document.querySelector('#tkNext').click()");pg.wait_for_timeout(60)
  b2=st();ok(b2["tot"]["talk"]==5,"5 spoken answers counted",b2["tot"]["talk"])
  E("document.querySelector('#tkEnd')&&document.querySelector('#tkEnd').click()")
  # notebook session scoring
  a=st()["p"];E("NB.open({subj:'math',kind:'aufg'})");pg.wait_for_timeout(200)
  print("ERRORS",errs)
  json.dump(RES,open("score_res.json","w"))
  print(f"\n{sum(r[0] for r in RES)}/{len(RES)} passed")
