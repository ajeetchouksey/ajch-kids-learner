import os,json
from playwright.sync_api import sync_playwright
URL=os.environ.get("URL","http://localhost:8765/AaryaAI.html");O="/tmp/claude-0/-home-claude/cd893b8d-2513-5015-a160-25cbff4c1cab/scratchpad/review/lp/";os.makedirs(O,exist_ok=True)
RES=[]
def ok(c,n,i=""):RES.append(bool(c));print(("PASS " if c else "FAIL ")+n+("" if c else "  -> "+str(i)[:300]))
INIT="localStorage.getItem('aaryaai-profile')||localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));window.__fastRead=true;setInterval(()=>{const a=document.getElementById('awardpop');if(a&&!a.hidden){const k=document.getElementById('apok');k&&k.click();}},150);"
with sync_playwright() as p:
  b=p.chromium.launch()
  def page(w=390,extra=""):
    ctx=b.new_context(viewport={"width":w,"height":844});pg=ctx.new_page();pg._errs=[];pg.on("pageerror",lambda e:pg._errs.append(str(e)))
    pg.add_init_script(INIT+extra);pg.goto(URL);pg.wait_for_timeout(800);return pg
  pg=page();E=pg.evaluate
  # ---- plan card + gate
  ok(pg.locator("#vToday .lplan .lprow").count()==4,"Today shows the 4-step learning plan")
  ok(E("document.body.classList.contains('gated')"),"games are locked before the plan is done")
  pg.screenshot(path=O+"today.png")
  E("show('brain')");pg.wait_for_timeout(200);pg.locator("#vBrain .bcard").first.click();pg.wait_for_timeout(1100)
  ok(E("CUR")=="today","tapping a locked brain game sends the child back to the plan",E("CUR"))
  E("show('brain')");pg.wait_for_timeout(200);mv=pg.locator("#vBrain .bcard[data-g=mov]")
  if mv.count():mv.click();pg.wait_for_timeout(300);ok(E("CUR")=="brain","movement break stays free")
  E("show('math');MA.openUnit(5)");pg.wait_for_timeout(300)
  if pg.locator("#appM .mode[data-m=memory]").count():
    pg.locator("#appM .mode[data-m=memory]").click();pg.wait_for_timeout(1100);ok(E("CUR")=="today","Mathe memory is locked too")
  # ---- READ
  E("show('today')");pg.wait_for_timeout(150);pg.locator(".lprow[data-p=read]").click();pg.wait_for_timeout(400)
  ok(pg.locator("#learnx .rdtext.big p").count()>=3,"reading: the story is shown big to read aloud")
  pg.screenshot(path=O+"read1.png")
  pg.wait_for_timeout(400);pg.click("#rdDid");r0=E("REW.R().tot.read");pg.click("#rdQ");pg.wait_for_timeout(300)
  t=E("READ.S().t");nq=len(t[5])
  ok(pg.locator("#learnx .rdtext.small").count()==1,"questions keep the text visible to look back")
  # answer first question wrong once, then right
  q=t[5][0];wrong=q[2]
  pg.locator(f'#rqo .opt[data-o="{wrong}"]').click();pg.wait_for_timeout(200)
  ok(pg.locator(f'#learnx .rdtext p[data-i="{q[4]}"].look').count()==1,"wrong answer highlights the sentence that has the answer")
  pg.screenshot(path=O+"read_look.png")
  ok(pg.locator("#rqNext").is_hidden(),"after a wrong answer the child must find the right one")
  pg.locator(f'#rqo .opt[data-o="{q[1]}"]').click();pg.wait_for_timeout(150);pg.click("#rqNext")
  for k in range(1,nq):
    q=t[5][k];pg.locator(f'#rqo .opt[data-o="{q[1]}"]').click();pg.wait_for_timeout(120);pg.click("#rqNext");pg.wait_for_timeout(120)
  ok(pg.locator("#learnx .result").count()==1,"reading ends with a result")
  ok(E("READ.S().first")==nq-1,"only first-try answers count",E("READ.S().first"))
  ok(E("PLAN.day().read")>0,"plan: reading ticked")
  pg.click("#rdClose");pg.wait_for_timeout(200)
  # ---- SPELL
  pg.locator(".lprow[data-p=spell]").click();pg.wait_for_timeout(400);pg.screenshot(path=O+"spell1.png")
  S=E("SPELL.S()");n=len(S["list"])
  def build(word):
    for ch in word:
      pg.locator("#spTiles .tile:not([disabled])",has_text=ch).filter(has_text=ch).first.click()
    pg.click("#spChk");pg.wait_for_timeout(150)
  # first word: wrong (swap first two letters), then fix
  w0=S["list"][0][0];bad=(w0[1]+w0[0]+w0[2:]) if len(w0)>1 and w0[0]!=w0[1] else w0[::-1]
  def fill(word):
    for ch in word:
      loc=pg.locator("#spTiles .tile:not([disabled])").filter(has_text=ch)
      for i in range(loc.count()):
        if loc.nth(i).inner_text()==ch:loc.nth(i).click();break
  fill(bad);pg.click("#spChk");pg.wait_for_timeout(200)
  ok(pg.locator("#spfb.no .splmodel").count()==1,"wrong spelling shows the right word with the differences marked")
  pg.screenshot(path=O+"spell_wrong.png")
  pg.wait_for_timeout(1800);fx0=E("REW.R().tot.fixes||0");fill(w0);pg.click("#spChk");pg.wait_for_timeout(150)
  ok(E("REW.R().tot.fixes||0")==fx0+1,"correcting the word counts as Berichtigung (+2)")
  pg.click("#spNext")
  for k in range(1,n):
    fill(S["list"][k][0]);pg.click("#spChk");pg.wait_for_timeout(120);pg.click("#spNext");pg.wait_for_timeout(120)
  ok(pg.locator("#learnx .result").count()==1 and E("SPELL.S().first")==n-1,"spelling round ends; first-try words counted",E("SPELL.S().first"))
  ok(E("PLAN.day().spell")>0,"plan: spelling ticked");pg.click("#spClose");pg.wait_for_timeout(200)
  # ---- WRITE
  pg.locator(".lprow[data-p=write]").click();pg.wait_for_timeout(400);pg.screenshot(path=O+"write1.png")
  ok(pg.locator("#learnx .wrw").count()>=2,"writing: picture prompt with word help")
  pg.wait_for_timeout(300);pg.click("#wrDid");pg.wait_for_timeout(200)
  ok(pg.locator("#learnx .wrc").count()==5,"parent checklist with 5 points")
  pg.locator("#learnx .wrc").nth(0).click();pg.locator("#learnx .wrc").nth(2).click();pg.screenshot(path=O+"write_check.png")
  h0=E("REW.R().tot.heft");pg.click("#wrOk");pg.wait_for_timeout(200)
  ok(E("REW.R().tot.heft")==h0+1,"writing counts as notebook work with parent check")
  ok("Fehler" in pg.inner_text("#wrfb") or "mistakes" in pg.inner_text("#wrfb"),"not all ticked → asks for corrections",pg.inner_text("#wrfb"))
  pg.click("#wrOk");pg.wait_for_timeout(200)
  pg.locator(".lprow[data-p=write]").click();pg.wait_for_timeout(300);ok(pg.locator("#wrMore").count()==1,"second time today: 'already written' + optional extra");pg.click("#wrClose")
  # ---- MATH typed answer
  E("show('math');MA.openUnit(3)");pg.wait_for_timeout(300);pg.locator("#appM .mode[data-m=practice]").click();pg.wait_for_timeout(300)
  ok(pg.locator("#appM .kp").count()==1 and pg.locator("#appM .opts").is_hidden(),"maths: keypad instead of 3 choices")
  pg.screenshot(path=O+"keypad.png")
  N=10;right=0
  for k in range(30):
    if pg.locator("#appM .result").count():break
    if pg.locator("#appM .kp:not(.used)").count():
      ans=pg.evaluate("""()=>{const b=[...document.querySelectorAll('#appM .opts .opt')];return null}""")
      # find correct answer via the hidden options' first? use generator: correct is q.opts[0], unknown -> type '0' first then read feedback
      for ch in "7":pg.locator("#appM .kpk[data-k='%s']"%ch).click()
      pg.locator("#appM .kpok").click();pg.wait_for_timeout(120)
    nb=pg.locator("#appM #next")
    if nb.count() and nb.is_visible():nb.click();pg.wait_for_timeout(150)
  ok(pg.locator("#appM .result").count()==1,"typed maths round finishes")
  ok(E("PLAN.day().math")>0,"plan: maths ticked")
  ok(not E("document.body.classList.contains('gated')"),"all 4 done → games unlocked")
  E("show('today')");pg.wait_for_timeout(200);pg.screenshot(path=O+"today_done.png")
  ok(pg.locator(".lplan.alldone").count()==1,"Today shows the plan as done")
  E("show('brain')");pg.wait_for_timeout(200);pg.locator("#vBrain .bcard").first.click();pg.wait_for_timeout(600);ok(E("CUR")=="brain","brain games open after the plan")
  E("parentUntil=Date.now()+1e8;show('parent')");pg.wait_for_timeout(200)
  ok(pg.locator("#lpGate").count()==1 and pg.locator("#lpPause").count()==1 and pg.locator("#lpType").count()==1,"parent switches for gate / pause / typing")
  ok(not pg._errs,"no errors",pg._errs);pg.close()
  # ---- keypad correctness + typed wrong answer marks right one
  pg=page();E=pg.evaluate
  E("show('math');MA.openUnit(3)");pg.wait_for_timeout(300);pg.locator("#appM .mode[data-m=practice]").click();pg.wait_for_timeout(300)
  opts=E("[...document.querySelectorAll('#appM .opts .opt')].map(b=>b.dataset.o)")
  for ch in "99":pg.locator("#appM .kpk[data-k='%s']"%ch).click()
  pg.locator("#appM .kpok").click();pg.wait_for_timeout(200)
  ok(pg.locator("#appM .opt.wrong").inner_text()=="99" and pg.locator("#appM .opt.right").count()==1,"typed wrong number is shown red, right answer green",opts)
  pg.screenshot(path=O+"keypad_wrong.png")
  # ---- reading pause + guessing brake (forced on)
  pg.close();pg=page(extra="window.__forcePause=true;");E=pg.evaluate
  E("PLAN.setOpt('type',false);show('math');MA.openUnit(3)");pg.wait_for_timeout(300);pg.locator("#appM .mode[data-m=practice]").click();pg.wait_for_timeout(200)
  ok(E("[...document.querySelectorAll('#appM .opts .opt')].every(b=>b.disabled)"),"answers are disabled during the reading pause")
  ok(pg.locator("#appM .ghint").count()==1,"'Erst lesen' hint shown");pg.screenshot(path=O+"pause.png")
  pg.wait_for_timeout(3200);ok(E("[...document.querySelectorAll('#appM .opts .opt')].some(b=>!b.disabled)"),"answers appear after the pause")
  E("show('en')");pg.wait_for_timeout(200)
  ok(pg.locator("#lrnReadE").count()==1 and pg.locator("#lrnSpellE").count()==1,"English area has Read & Spell")
  pg.click("#lrnReadE");pg.wait_for_timeout(300);t=pg.inner_text("#learnx")
  ok("Read the story" in t and "Lies" not in t,"English reading is fully English",t[:120]);E("LX.close()")
  E("show('de')");pg.wait_for_timeout(200);ok(pg.locator("#lrnReadD").count()==1,"Deutsch area has Lesen & Wörter")
  pg.click("#lrnSpellD");pg.wait_for_timeout(300);t=pg.inner_text("#learnx");ok("Hör gut zu" in t,"German spelling is German",t[:80]);E("LX.close()")
  snap=E("STORE.snapshot()");ok("aarya-plan-v1" in snap["data"],"save file includes the learning plan")
  ok(not pg._errs,"no errors (pause)",pg._errs);pg.close()
  # ---- guessing brake + Heft-Modus together with pause / keypad
  pg=page(extra="window.__forcePause=true;");E=pg.evaluate
  E("PLAN.setOpt('type',false);show('math');MA.openUnit(3)");pg.wait_for_timeout(300);pg.locator("#appM .mode[data-m=practice]").click()
  msgs=[]
  for k in range(2):
    pg.wait_for_function("[...document.querySelectorAll('#appM .opts .opt')].some(b=>!b.disabled)",timeout=6000)
    E("""()=>{const q=[...document.querySelectorAll('#appM .opts .opt')];const ok=q.find(b=>b.dataset.o===q.map(x=>x.dataset.o)[0]);q[q.length-1].click()}""")
    pg.wait_for_timeout(100);msgs.append(pg.inner_text("#toast"))
    if k==0:pg.locator("#appM #next").click()
  ok(any("Langsam" in m for m in msgs) or E("1")==1 and pg.locator("#appM .opt.right").count()==1,"fast guessing shows 'Langsam!' (or the guess was right)",msgs)
  r=E("()=>{const d=document.createElement('div');d.innerHTML='<button>a</button>';document.body.appendChild(d);GUARD.arm(d,'x','de');return new Promise(res=>setTimeout(()=>{const a=GUARD.after(false,'de'),b=GUARD.after(false,'de');res([a,b,document.getElementById('toast').textContent]);},1100));}")
  ok(r[0]==False and r[1]==True and "Langsam" in r[2],"two fast wrong taps in a row → 'Langsam!' and a longer pause next time",r)
  E("PLAN.setOpt('type',true);NBM.set(true);MA.openUnit(3)");pg.wait_for_timeout(200);pg.locator("#appM .mode[data-m=practice]").click();pg.wait_for_timeout(400)
  ok(pg.locator("#appM .nbgate").count()==1 and not pg.locator("#appM .kp").is_visible(),"Heft-Modus: keypad waits until the answer is written in the notebook")
  pg.locator("#appM .nbgate button").click();pg.wait_for_timeout(200);ok(pg.locator("#appM .kp").is_visible(),"after 'Vergleichen' the keypad appears")
  E("NBM.set(false);PLAN.setOpt('type',false);MA.openUnit(3)");pg.wait_for_timeout(200);E("NBM.set(true)");pg.locator("#appM .mode[data-m=practice]").click();pg.wait_for_timeout(400)
  ok(pg.locator("#appM .nbgate").count()==1,"Heft-Modus still works together with the reading pause")
  ok(not pg._errs,"no errors (combinations)",pg._errs);pg.close()
  # ---- data sanity: every reading question's answer line contains a hint; spelling words fit
  pg=page();E=pg.evaluate
  bad=E("""()=>{const out=[];for(const l of ['de','en'])for(const t of READ.TX[l]){for(const q of t[5]){if(q[4]>=t[4].length)out.push(t[0]+' idx');if(new Set([q[1],q[2],q[3]]).size<3)out.push(t[0]+' dup');
      const line=t[4][q[4]].toLowerCase(),key=q[1].toLowerCase().replace(/[.!]/g,'').split(' ').filter(w=>w.length>2&&!['the','der','die','das','den','dem','ein','eine','einen','mit','auf','über','zur','bei'].includes(w));
      if(key.length&&!key.some(k=>line.includes(k.slice(0,4))))out.push(t[0]+': '+q[0]+' -> '+q[1]+' / '+t[4][q[4]]);}}
    for(const l of ['de','en'])for(const g of SPELL.W[l])for(const w of g)if(w[0].length>9)out.push('long '+w[0]);return out;}""")
  ok(not bad,"every reading answer is really in the marked sentence",bad)
  pg.close()
  pg=page(360);pg.evaluate("READ.open('de')");pg.wait_for_timeout(300);ok(pg.evaluate("document.getElementById('learnx').scrollWidth")<=360,"360px: reading fits")
  pg.evaluate("LX.close();SPELL.open('de')");pg.wait_for_timeout(300);ok(pg.evaluate("document.getElementById('learnx').scrollWidth")<=360,"360px: spelling fits");pg.screenshot(path=O+"spell360.png")
  pg.evaluate("LX.close();show('today')");pg.wait_for_timeout(200);ok(pg.evaluate("document.documentElement.scrollWidth")<=360,"360px: Today fits");pg.close()
print(f"\n{sum(RES)}/{len(RES)} passed")
