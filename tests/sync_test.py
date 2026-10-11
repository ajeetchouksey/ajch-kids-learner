"""Google Drive sync with a mocked Google sign-in and an in-memory Drive (appDataFolder), two devices."""
import os,json,re,subprocess,time,shutil
from urllib.parse import urlparse,parse_qs,unquote
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE="/tmp/aaryaai-sync-site";PORT=8767
OUT=os.path.join(os.environ.get("OUT","test-output"),"sync");os.makedirs(OUT,exist_ok=True)
RES=[]
def ok(c,n,i=""):RES.append(bool(c));print(("PASS " if c else "FAIL ")+n+("" if c else "  -> "+str(i)[:300]))
shutil.rmtree(SITE,ignore_errors=True)
subprocess.run(["node","scripts/build.mjs"],cwd=ROOT,check=True,env=dict(os.environ,OUT_DIR=SITE,GOOGLE_CLIENT_ID="test-client"),stdout=subprocess.DEVNULL)
srv=subprocess.Popen(["python3","-m","http.server",str(PORT),"--directory",SITE],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
GIS="""window.google={accounts:{oauth2:{initTokenClient:c=>({requestAccessToken:o=>{window.__gisCalls=(window.__gisCalls||0)+1;window.__gisPrompt=o&&o.prompt;
  setTimeout(()=>window.__gisDeny?c.error_callback({type:'popup_closed'}):c.callback({access_token:'tok-'+Date.now(),expires_in:3600}),20);}}),revoke:(t,cb)=>cb&&cb()}}};"""
DRIVE={"files":{},"n":0,"calls":[],"scopes":set()}
def drive(route,req):
  u=urlparse(req.url);q=parse_qs(u.query);DRIVE["calls"].append(req.method+" "+u.path)
  if not req.headers.get("authorization","").startswith("Bearer tok-"):return route.fulfill(status=401,body="{}")
  if u.path=="/drive/v3/about":return route.fulfill(json={"user":{"emailAddress":"family@example.com","displayName":"Family"}})
  if u.path=="/drive/v3/files" and req.method=="GET":
    assert q.get("spaces")==["appDataFolder"],q
    name=re.search(r"name='([^']+)'",unquote(q["q"][0])).group(1)
    fs=[{"id":i,"version":str(f["v"]),"modifiedTime":"x"} for i,f in DRIVE["files"].items() if f["name"]==name]
    return route.fulfill(json={"files":fs})
  m=re.match(r"/drive/v3/files/([\w-]+)$",u.path)
  if m and q.get("alt")==["media"]:
    f=DRIVE["files"].get(m.group(1));return route.fulfill(json=f["body"]) if f else route.fulfill(status=404,body="{}")
  if u.path=="/upload/drive/v3/files" and req.method=="POST":
    body=req.post_data;parts=body.split("\r\n\r\n");meta=json.loads(parts[1].split("\r\n--")[0]);content=json.loads(parts[2].split("\r\n--")[0])
    assert meta["parents"]==["appDataFolder"],meta
    DRIVE["n"]+=1;fid=f"f{DRIVE['n']}";DRIVE["files"][fid]={"name":meta["name"],"body":content,"v":1}
    return route.fulfill(json={"id":fid,"version":"1"})
  m=re.match(r"/upload/drive/v3/files/([\w-]+)$",u.path)
  if m and req.method=="PATCH":
    f=DRIVE["files"][m.group(1)];f["body"]=json.loads(req.post_data);f["v"]+=1;return route.fulfill(json={"id":m.group(1),"version":str(f["v"])})
  return route.fulfill(status=400,body="unexpected "+req.method+" "+req.url)
try:
 with sync_playwright() as p:
  b=p.chromium.launch()
  def device(name,points=None):
    ctx=b.new_context(viewport={"width":390,"height":844});
    ctx.route("https://accounts.google.com/gsi/client",lambda r,q:r.fulfill(body=GIS,content_type="text/javascript"))
    ctx.route("https://www.googleapis.com/**",drive)
    pg=ctx.new_page();pg._errs=[];pg.on("pageerror",lambda e:pg._errs.append(str(e)))
    pg.add_init_script("window.__syncTest=true;localStorage.getItem('aaryaai-profile')||localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));"
      "localStorage.getItem('aarya-plan-v1')||localStorage.setItem('aarya-plan-v1',JSON.stringify({opt:{gate:false,pause:false,type:false}}));"
      "setInterval(()=>{const a=document.getElementById('awardpop');if(a&&!a.hidden){const k=document.getElementById('apok');k&&k.click();}},150);")
    pg.goto(f"http://localhost:{PORT}/");pg.wait_for_timeout(700);return pg
  def parent(pg):pg.evaluate("parentUntil=Date.now()+1e8;show('parent')");pg.wait_for_timeout(200)
  A=device("A");E=A.evaluate
  parent(A);ok(A.locator("#syncbox #syOn").count()==1,"parent area offers 'Mit Google Drive verbinden'")
  A.screenshot(path=OUT+"/off.png",full_page=False)
  E("REW.hit('math','correct');REW.hit('math','correct');REW.hit('de','correct')");pA=E("REW.R().points")
  A.click("#syOn");A.wait_for_timeout(800)
  ok(len(DRIVE["files"])==1 and list(DRIVE["files"].values())[0]["name"]=="aaryaai-aarya.json","first device creates its file in the hidden app folder",DRIVE["files"].keys())
  body=list(DRIVE["files"].values())[0]["body"]
  ok(body.get("app")=="AaryaAI" and "aarya-rewards-v1" in body["data"] and body["data"]["aarya-rewards-v1"]["points"]==pA,"upload holds the full progress",list(body.get("data",{}).keys())[:5])
  ok("family@example.com" in A.inner_text("#syncbox"),"shows the connected Google account")
  A.screenshot(path=OUT+"/connected.png")
  ok(E("SYNC.status()")=="ok","status ok after connecting",E("SYNC.status()"))
  # ---- second device: different progress, first connection asks
  B=device("B");parent(B);B.evaluate("REW.hit('en','correct')")
  B.click("#syOn");B.wait_for_timeout(800)
  ok(B.locator("#syDrive").count()==1 and B.locator("#syLocal").count()==1,"second device: parent chooses 'aus Google Drive laden' or 'dieses Gerät behalten'")
  B.screenshot(path=OUT+"/ask.png")
  with B.expect_navigation():B.click("#syDrive")
  B.wait_for_timeout(700)
  ok(B.evaluate("REW.R().points")==pA,"device B now has device A's progress",(B.evaluate("REW.R().points"),pA))
  # ---- both practise, then merge per area (newer change wins per key)
  A.evaluate("MA.S().best[0]=3;localStorage.setItem('aarya-mathe-v1',JSON.stringify(MA.S()))");A.wait_for_timeout(50)
  B.wait_for_timeout(30);B.evaluate("const s=JSON.parse(localStorage.getItem('aarya-deutsch-v1')||'{}');s.best=Object.assign(s.best||{},{2:3});localStorage.setItem('aarya-deutsch-v1',JSON.stringify(s))")
  A.evaluate("SYNC.run({interactive:true})");A.wait_for_timeout(700)
  with B.expect_navigation(timeout=5000):B.evaluate("SYNC.run({interactive:true})")
  B.wait_for_timeout(700)
  ok(B.evaluate("(JSON.parse(localStorage.getItem('aarya-mathe-v1')).best||{})[0]")==3,"B got A's new Mathe stars")
  ok(B.evaluate("(JSON.parse(localStorage.getItem('aarya-deutsch-v1')).best||{})[2]")==3,"B kept its own new Deutsch stars")
  body=list(DRIVE["files"].values())[0]["body"]
  ok((body["data"]["aarya-deutsch-v1"].get("best") or {}).get("2")==3 and (body["data"]["aarya-mathe-v1"].get("best") or {}).get("0")==3,"Drive file has both changes merged")
  with A.expect_navigation(timeout=5000):A.evaluate("SYNC.run({interactive:true})")
  A.wait_for_timeout(600)
  ok(A.evaluate("(JSON.parse(localStorage.getItem('aarya-deutsch-v1')).best||{})[2]")==3,"A receives B's Deutsch stars on the next sync")
  # ---- background sync never reloads mid-exercise
  B.evaluate("REW.hit('math','correct')");A.evaluate("REW.hit('de','correct')")
  B.evaluate("SYNC.run({interactive:true})");B.wait_for_timeout(600)
  A.evaluate("window.__marker=1;SYNC.run({background:true})");A.wait_for_timeout(800)
  ok(A.evaluate("window.__marker")==1,"background sync uploads without reloading the page")
  # ---- offline
  ctxA=A.context;ctxA.set_offline(True);A.evaluate("REW.hit('math','correct')");A.evaluate("SYNC.run({interactive:true})");A.wait_for_timeout(300)
  ok(A.evaluate("SYNC.status()")=="offline","offline: keeps working, status 'offline'",A.evaluate("SYNC.status()"))
  ctxA.set_offline(False)
  # ---- expired token: no popup in the background, asks the parent
  A.evaluate("sessionStorage.clear()");A.reload();A.wait_for_timeout(800);calls=A.evaluate("window.__gisCalls||0")
  ok(calls==0,"after a restart no sign-in popup appears by itself",calls)
  parent(A);ok(A.evaluate("SYNC.status()")=="auth" and "Jetzt synchronisieren" in A.inner_text("#syncbox"),"expired sign-in → parent taps 'Jetzt synchronisieren'",A.evaluate("SYNC.status()"))
  ok(A.inner_text("#sbSave")=="☁️⚠️","top bar shows ☁️⚠️ when Google wants the sign-in confirmed",A.inner_text("#sbSave"))
  A.screenshot(path=OUT+"/auth.png")
  A.click("#sbSave",force=True);A.wait_for_timeout(800)
  ok(A.evaluate("window.__gisCalls")==1 and A.evaluate("SYNC.status()")=="ok" and A.inner_text("#sbSave")=="☁️✓","one tap on ☁️⚠️ reconnects and syncs",(A.evaluate("window.__gisCalls"),A.evaluate("SYNC.status()")))
  ok(A.evaluate("window.__gisPrompt")=="","reconnect does not ask for consent again",A.evaluate("window.__gisPrompt"))
  # ---- only the appDataFolder was ever used, and every call carried a token
  ok(all(("/drive/v3/" in c or "/upload/drive/v3/" in c) for c in DRIVE["calls"]),"only Drive API calls",set(DRIVE["calls"]))
  # ---- disconnect
  A.click("#syOff");A.wait_for_timeout(200);ok(A.locator("#syOn").count()==1 and A.evaluate("SYNC.status()")=="off","disconnect works")
  # ---- sign-in cancelled → clear message, nothing breaks
  C=device("C");parent(C);C.evaluate("window.__gisDeny=true");C.click("#syOn");C.wait_for_timeout(400)
  ok("abgebrochen" in C.inner_text("#syncbox") or "cancelled" in C.inner_text("#syncbox") or C.locator("#syOn").count()==1,"cancelled sign-in leaves the app working",C.inner_text("#syncbox")[:120])
  for pg in (A,B):ok(not pg._errs,"no errors",pg._errs)
finally:srv.terminate()
print(f"\n{sum(RES)}/{len(RES)} passed")
