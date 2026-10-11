"""PWA: installs offline cache, shows 'update available' after a new deploy and switches only after OK."""
import os,subprocess,shutil,time,json
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE=os.environ.get("PWA_SITE","/tmp/aaryaai-pwa-site");PORT=8766
RES=[]
def ok(c,n,i=""):RES.append(bool(c));print(("PASS " if c else "FAIL ")+n+("" if c else "  -> "+str(i)[:300]))
def build():
    subprocess.run(["node","scripts/build.mjs"],cwd=ROOT,check=True,env=dict(os.environ,OUT_DIR=SITE),stdout=subprocess.DEVNULL)
shutil.rmtree(SITE,ignore_errors=True);build()
srv=subprocess.Popen(["python3","-m","http.server",str(PORT),"--directory",SITE],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
try:
  with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={"width":390,"height":844});pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script("window.__pwa=true;localStorage.getItem('aaryaai-profile')||localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));")
    url=f"http://localhost:{PORT}/"
    pg.goto(url);pg.wait_for_function("navigator.serviceWorker&&navigator.serviceWorker.ready.then(()=>true)",timeout=10000);pg.wait_for_timeout(800)
    pg.reload();pg.wait_for_timeout(800)
    ok(pg.evaluate("!!navigator.serviceWorker.controller"),"service worker controls the page")
    ok(pg.evaluate("caches.keys().then(k=>k.some(x=>x.startsWith('aaryaai-')))"),"app is cached for offline use")
    ok(pg.evaluate("document.querySelector('link[rel=manifest]')!==null"),"manifest linked (installable)")
    v1=pg.evaluate("APP_VERSION.build+' '+(document.querySelector('meta[name=app-version]')||{}).content")
    ctx.set_offline(True);pg.reload();pg.wait_for_timeout(800)
    ok(pg.evaluate("typeof startApp==='function'||!!document.getElementById('vToday')"),"opens offline from the cache")
    ctx.set_offline(False)
    time.sleep(1.1);build()   # new deploy (sw.js changes)
    pg.evaluate("PWA.check()");pg.wait_for_selector("#pwaUpd",timeout=10000)
    ok(pg.locator("#pwaUpd").is_visible(),"new deploy → 'Neue Version' banner")
    ok(pg.evaluate("!!navigator.serviceWorker.controller"),"old version keeps running until OK")
    pg.screenshot(path=os.path.join(os.environ.get("OUT","test-output"),"pwa_update.png")) if os.makedirs(os.environ.get("OUT","test-output"),exist_ok=True) is None else None
    with pg.expect_navigation(timeout=10000):pg.click("#pwaOk")
    pg.wait_for_timeout(800)
    ok(pg.locator("#pwaUpd").count()==0,"after OK the app reloads into the new version")
    ok(pg.evaluate("caches.keys().then(k=>k.filter(x=>x.startsWith('aaryaai-')).length)")==1,"old cache removed")
    ok(not errs,"no errors",errs)
finally:
  srv.terminate()
print(f"\n{sum(RES)}/{len(RES)} passed")
