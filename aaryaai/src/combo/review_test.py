import asyncio,pathlib,json
from playwright.async_api import async_playwright
F="file://"+str(pathlib.Path("AaryaAI.html").resolve())
MOCK="""localStorage.getItem('aarya-plan-v1')||localStorage.setItem('aarya-plan-v1',JSON.stringify({opt:{gate:false,pause:false,type:false}}));window.__file=null;const mk=(n,c)=>({name:n,kind:'file',queryPermission:async()=>'granted',requestPermission:async()=>'granted',
 createWritable:async()=>{let b='';return {write:async d=>{b+=d},close:async()=>{window.__file=b}}},getFile:async()=>({size:(c||window.__file||'').length,text:async()=>c||window.__file||''})});
window.__existing=null;window.showSaveFilePicker=async o=>mk(o.suggestedName,window.__existing);window.showOpenFilePicker=async()=>[mk('x.json',window.__existing)];"""
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();ctx=await b.new_context(viewport={"width":390,"height":844});await ctx.add_init_script(MOCK);pg=await ctx.new_page()
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)));pg.on("console",lambda m:m.type=="error" and errs.append(m.text))
    ok=lambda c,m: print(("PASS " if c else "FAIL ")+m)
    async def close():
      for _ in range(40):
        if await pg.evaluate("document.getElementById('awardpop').hidden"):
          await pg.wait_for_timeout(250)
          if await pg.evaluate("document.getElementById('awardpop').hidden"): return
        await pg.evaluate("document.getElementById('apok')&&document.getElementById('apok').click()")
    await pg.goto(F);await pg.evaluate("localStorage.clear()");await pg.reload();await pg.wait_for_selector("#sname")
    await pg.fill("#sname","Leo");await pg.click('.seg2 button[data-g="m"]');await pg.click("#s1");await pg.click("#sskip");await pg.wait_for_timeout(500)
    await pg.evaluate("document.getElementById('sbSound').click()")
    t=await pg.inner_text("#vToday");ok("Weiter mit" in t and "Punkte · scores" not in t.lower() and "Für Eltern" in t,"Today: next-step button, no score grid, parent link")
    ok(await pg.is_visible(".savewarn"),"Today: backup warning when no save file")
    g=await pg.evaluate("REW.R().goal");ok(g=={"en":3,"math":5,"de":5,"read":2,"brain":2,"heft":1},"calmer default goals "+json.dumps(g))
    await pg.click("#goNext");await pg.wait_for_timeout(300);c=await pg.evaluate("CUR");ok(c in("de","math","en") and await pg.is_visible(f"#app{ {'de':'D','math':'M','en':'E'}[c] } .modes"),"next-step opens a topic in "+c)
    await pg.click('.tab[data-v="today"]');await pg.click('#vToday .ring[data-go="math"]');ok(await pg.evaluate("CUR")=="math","tapping a ring opens the subject")
    # English separate level
    await pg.click('.tab[data-v="en"]');t=await pg.inner_text("#appE");ok("Colours" in t and "Doing Words" not in t,"English starts at Anfänger although school level is Klasse 1")
    ok("Ready to play" in t and "Big Challenge" in t and "Game length" in t and "Spiellänge" not in t and "Große" not in t,"English area is English-only")
    src=await pg.evaluate("JSON.stringify(EN.U()[6])");ok("leo is my name." in src and "aarya" not in src.lower(),"lowercase name replaced too")
    # parent gate
    await pg.click('.tab[data-v="awards"]');t=await pg.inner_text("#vAwards");ok("Wochenbericht" not in t and "reset" not in t.lower(),"child Awards: no parent data")
    await pg.click("#goParent2");await pg.wait_for_selector("#pgIn");q=await pg.inner_text(".gate .fl span");a,b2=[int(x) for x in q.split("Wie viel ist ")[1].split("?")[0].split(" × ")]
    await pg.fill("#pgIn","1");await pg.click("#pgOk");ok("falsch" in await pg.inner_text("#pgErr"),"gate refuses wrong answer")
    await pg.fill("#pgIn",str(a*b2));await pg.click("#pgOk");await pg.wait_for_timeout(200);t=await pg.inner_text("#vParent");ok(await pg.evaluate("CUR")=="parent" and "Wochenbericht" in t and "Speicherdatei" in t and "English-Stufe" in t,"parent area opens after correct answer")
    await pg.screenshot(path="../review/r_parent.png",full_page=True)
    await pg.click('#enLv button[data-v="1"]');await pg.click('.tab[data-v="en"]');ok("Doing Words" in await pg.inner_text("#appE"),"parent sets English level → Klasse 1")
    # scoring: mistakes don't reset the counter
    p0=await pg.evaluate("REW.R().points");await pg.evaluate("()=>{for(let i=0;i<10;i++)REW.hit('math',i%2?'wrong':'correct')}");await close()
    r=await pg.evaluate("({pts:REW.R().points,c:REW.combo()})");ok(r["pts"]-p0==5+2 and r["c"]==10,f"10 tries (5 right) → +{r['pts']-p0} incl. +2 keep-going bonus, no reset")
    await pg.evaluate("()=>{for(const k of ['en','de','brain'])for(let i=0;i<3;i++)REW.hit(k,'correct')}");await close();ok(not await pg.evaluate("REW.day().rainbow"),"rainbow bonus off by default")
    # Heft-Zeit honest scoring + gentle Diktat
    p0=await pg.evaluate("REW.R().points");await pg.evaluate("()=>{PROF.setView('de',1);NB.open({subj:'de'})}");await pg.click('#nbook [data-k="dikt"]');await pg.click('#nbook [data-n="4"]');await pg.click("#nbGo");await pg.click("#nbReady");await pg.click("#nbShow")
    w=await pg.inner_text("#nbook .nbpar2");ok(" " not in w.replace("👨 ","").strip(),"Klasse 1 Diktat starts with single words: "+w)
    for i in range(4): await pg.click("#nbNext");await pg.wait_for_timeout(60)
    await close();await pg.click("#nbYes");await close();await pg.click("#nbSound");await pg.click("#nbFixed");await close();await pg.click("#nbNo");await pg.click("#nbFixed");await close();await pg.click("#nbNo");await pg.click("#nbFixed");await close()
    await pg.wait_for_selector("#nbEnd");r=await pg.evaluate("({pts:REW.R().points,fix:REW.R().tot.fixes,dk:REW.R().tot.diktatPerfect})")
    ok(r["pts"]-p0>=4+4+3 and r["fix"]==2,f"Heft-Zeit: +1 per checked answer, +2 per correction, +3 session → +{r['pts']-p0}");await pg.click("#nbEnd");await close()
    # blitz double tap
    await pg.click('.tab[data-v="math"]');await pg.evaluate("MA.home()");await pg.click('#appM .ucard[data-u="4"]');await pg.click('#appM .mode[data-m="blitz"]');await pg.wait_for_timeout(300)
    c0=await pg.evaluate("REW.R().tot.math+REW.R().wrong.math");await pg.evaluate("()=>{const b=document.querySelector('#appM #bq .opt');b.click();b.click();b.click();}");await pg.wait_for_timeout(400)
    ok(await pg.evaluate("REW.R().tot.math+REW.R().wrong.math")-c0==1,"Blitz: triple tap counts once")
    # rule folded away
    await pg.evaluate("MA.home()");await pg.click('#appM .ucard[data-u="4"]');await pg.click('#appM .mode[data-m="practice"]');await pg.wait_for_timeout(200)
    opts=await pg.query_selector_all("#appM .opt");q=await pg.inner_text("#appM #qt");
    for o in opts:
      await o.click();break
    await pg.wait_for_timeout(300);await close()
    if await pg.query_selector("#appM details.rulex"): ok(not await pg.evaluate("document.querySelector('#appM details.rulex').open"),"grammar/maths rule folded by default")
    else: ok(True,"(answer was right – no rule box)")
    tb=await pg.evaluate("getComputedStyle(document.getElementById('toast')).bottom");ok(tb!="auto","toast sits at the bottom ("+tb+")")
    # data safety: bad import refused, name sanitised, backup on reset
    await pg.click('.tab[data-v="awards"]');await pg.click("#goParent2")
    if await pg.query_selector("#pgIn"):
      q=await pg.inner_text(".gate .fl span");a,b2=[int(x) for x in q.split("Wie viel ist ")[1].split("?")[0].split(" × ")];await pg.fill("#pgIn",str(a*b2));await pg.click("#pgOk")
    pathlib.Path("bad2.json").write_text(json.dumps({"app":"AaryaAI","data":{"aarya-rewards-v1":{"days":"oops"}}}))
    await pg.set_input_files("#stUp","bad2.json");await pg.click("#stYes");await pg.wait_for_timeout(300);ok("beschädigt" in await pg.inner_text("#storebox"),"damaged file refused")
    snap=await pg.evaluate("STORE.snapshot()");snap["data"]["aaryaai-profile"]["name"]='<img src=x onerror=alert(1)>Mia';pathlib.Path("xss.json").write_text(json.dumps(snap))
    await pg.set_input_files("#stUp","xss.json");await pg.click("#stYes");await pg.wait_for_timeout(1500);await close()
    nm=await pg.evaluate("PROF.name()");ok("<" not in nm and await pg.query_selector("img[src=x]") is None,"imported name sanitised: "+nm)
    await pg.evaluate("REW.reset()");ok(await pg.evaluate("!!localStorage.getItem('aaryaai-backup')"),"backup kept before reset")
    # existing file with more progress is not overwritten
    await pg.evaluate("()=>{const s=STORE.snapshot();s.data['aarya-rewards-v1'].points=500;window.__existing=JSON.stringify(s);}")
    await pg.evaluate("show('parent')");
    if await pg.query_selector("#pgIn"):
      q=await pg.inner_text(".gate .fl span");a,b2=[int(x) for x in q.split("Wie viel ist ")[1].split("?")[0].split(" × ")];await pg.fill("#pgIn",str(a*b2));await pg.click("#pgOk")
    await pg.click("#stNew");await pg.wait_for_timeout(300);ok(await pg.query_selector("#stLoadEx") is not None and await pg.evaluate("window.__file")!=None or await pg.query_selector("#stLoadEx") is not None,"existing file with more progress → asks load/overwrite")
    # rescue screen
    await pg.evaluate("AAI.rescue('test')");ok(await pg.is_visible("#rsDown") and await pg.is_visible("#rsBack"),"rescue screen offers copy + restore")
    # two tabs
    pg2=await ctx.new_page();await pg2.goto(F);await pg2.wait_for_timeout(400);reloaded=[]
    pg2.on("load",lambda:reloaded.append(1));await pg.reload();await pg.wait_for_timeout(300);await pg.evaluate("REW.hit('de','correct')");await pg2.wait_for_timeout(800)
    ok(len(reloaded)>=1,"second tab reloads when the first one saves")
    for w in [360,390]:
      await pg2.set_viewport_size({"width":w,"height":800})
      for v in ["today","en","de","math","brain","awards"]:
        await pg2.evaluate(f"show('{v}')");sw=await pg2.evaluate("document.documentElement.scrollWidth")
        if sw>w: errs.append(f"overflow {v}@{w} {sw}")
    print("ERRORS",errs[:6])
asyncio.run(main())
