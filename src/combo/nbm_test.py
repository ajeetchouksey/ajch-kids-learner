import asyncio,pathlib
from playwright.async_api import async_playwright
F="file://"+str(pathlib.Path("AaryaAI.html").resolve())
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={"width":390,"height":844})
    errs=[];pg.on("pageerror",lambda e:errs.append(str(e)));pg.on("console",lambda m:m.type=="error" and errs.append(m.text))
    ok=lambda c,m: print(("PASS " if c else "FAIL ")+m)
    await pg.goto(F);await pg.evaluate("()=>{localStorage.clear();localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,view:{}}));localStorage.setItem('aarya-plan-v1',JSON.stringify({opt:{gate:false,pause:false,type:false}}));}");await pg.reload();await pg.wait_for_timeout(500)
    await pg.evaluate("document.getElementById('sbSound').click()");await pg.evaluate("PROF.setEnLevel(1);EN.home()")
    async def close():
      for _ in range(30):
        if await pg.evaluate("document.getElementById('awardpop').hidden"):
          await pg.wait_for_timeout(250)
          if await pg.evaluate("document.getElementById('awardpop').hidden"): return
        await pg.evaluate("document.getElementById('apok')&&document.getElementById('apok').click()")
    await pg.click('.tab[data-v="en"]');ok(await pg.inner_text("#nbmT")=="📓 off","toggle shows off (English area)")
    await pg.click("#nbmT");await close();ok(await pg.evaluate("NBM.on()") and await pg.evaluate("CUR")=="en","toggle on (stays on English tab)")
    # English quiz
    await pg.click('#appE .ucard[data-u="2"]');await pg.click('#appE .mode[data-m="play"]');await pg.wait_for_timeout(300)
    vis=await pg.is_visible("#appE .opts");g=await pg.is_visible("#appE .nbgate");ok(g and not vis,"English: options hidden behind write-first card")
    await pg.screenshot(path="g1.png");w0=await pg.evaluate("REW.R().tot.written")
    await pg.click("#appE .nbgate button");ok(await pg.is_visible("#appE .opts"),"English: compare reveals options")
    ok(await pg.evaluate("REW.R().tot.written")==w0+1,"written answer counted")
    await pg.click("#appE .opt");await close();await pg.screenshot(path="g2.png")
    for sel in ["#didread","#appE #next:not([hidden])"]:
      e=await pg.query_selector(sel)
      if e and await e.is_visible(): await e.click();await pg.wait_for_timeout(150)
    await close();ok(await pg.is_visible("#appE .nbgate"),"next English question gated again")
    # Mathe practice + blitz + rw
    await pg.click('.tab[data-v="math"]');await pg.evaluate("MA.home()");await pg.click('#appM .ucard[data-u="4"]');await pg.click('#appM .mode[data-m="practice"]');await pg.wait_for_timeout(300)
    ok(await pg.is_visible("#appM .nbgate") and not await pg.is_visible("#appM .opts"),"Mathe practice gated");await pg.screenshot(path="g3.png")
    await pg.evaluate("MA.home()");await pg.click('#appM .ucard[data-u="4"]');await pg.click('#appM .mode[data-m="blitz"]');await pg.wait_for_timeout(300)
    ok(await pg.query_selector("#appM .nbgate") is None,"Blitz not gated");await pg.evaluate("MA.home()")
    await pg.click('#appM .ucard[data-u="4"]');await pg.click('#appM .mode[data-m="rw"]');await pg.wait_for_timeout(300);ok(await pg.query_selector("#appM .nbgate") is None,"Richtig-oder-falsch not gated")
    # Deutsch: words gated, picture-only not gated
    await pg.click('.tab[data-v="de"]');await pg.evaluate("DE.home()");await pg.click('#appD .ucard[data-u="8"]');await pg.click('#appD .mode[data-m="practice"]');await pg.wait_for_timeout(300)
    ok(await pg.is_visible("#appD .nbgate"),"Deutsch der/die/das gated")
    await pg.evaluate("DE.home()");await pg.click('#appD .ucard[data-u="10"]');await pg.click('#appD .mode[data-m="practice"]');await pg.wait_for_timeout(300)
    ok(await pg.query_selector("#appD .nbgate") is None and await pg.is_visible("#appD .opts"),"picture-only answers not gated")
    # toggle off removes gates; persists
    await pg.evaluate("DE.home()");await pg.click('#appD .ucard[data-u="8"]');await pg.click('#appD .mode[data-m="practice"]');await pg.wait_for_timeout(200)
    await pg.click("#nbmT");await pg.wait_for_timeout(100);ok(await pg.query_selector("#appD .nbgate") is None and await pg.is_visible("#appD .opts"),"toggle off opens options")
    await pg.click("#nbmT");await pg.reload();await pg.wait_for_timeout(500);ok(await pg.evaluate("NBM.on()"),"setting persists after reload")
    for v in ["today","en","de","math","brain","awards"]:
      await close();await pg.click(f'.tab[data-v="{v}"]');w=await pg.evaluate("document.documentElement.scrollWidth")
      if w>390: errs.append(f"overflow {v} {w}")
    print("ERRORS",errs)
asyncio.run(main())
