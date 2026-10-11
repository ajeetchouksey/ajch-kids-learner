import os,json
from playwright.sync_api import sync_playwright
URL=os.environ.get("URL","http://localhost:8765/AaryaAI.html");O="/tmp/claude-0/-home-claude/cd893b8d-2513-5015-a160-25cbff4c1cab/scratchpad/review/bh/"
RES=[]
def ok(c,n,i=""):RES.append(bool(c));print(("PASS " if c else "FAIL ")+n+("" if c else "  -> "+str(i)[:400]))
with sync_playwright() as p:
  b=p.chromium.launch();ctx=b.new_context(viewport={"width":390,"height":844},has_touch=True);pg=ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
  pg.add_init_script("localStorage.getItem('aaryaai-profile')||localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}))")
  pg.goto(URL);pg.wait_for_timeout(800);E=pg.evaluate
  r=E("""async()=>{await document.fonts.ready;const R={n:0,trace:[],wobble:[],half:[],line:[],s4:[],s8:[],s40:[]};let rnd=7;const rand=()=>{rnd=(rnd*16807)%2147483647;return rnd/2147483647;};
   for(const l of ['hi','mr']){BH.setLang(l);for(const u of BH.units(l).filter(BH.canWrite))for(const t of [...new Set(BH.writeItems(u))]){await document.fonts.load('600 200px NotoDeva',t);R.n++;
     const sk=BH.glyphSkel(t),jit=j=>sk.map((s,i)=>s.map(q=>[q[0]+Math.sin(i*.05+j)*j,q[1]+Math.cos(i*.07)*j]));
     R.trace.push(BH.wscore(t,sk,false).grade);R.wobble.push(BH.wscore(t,jit(7),false).grade);R.half.push(BH.wscore(t,sk.filter(s=>s[0][0]<150),false).grade);
     R.line.push(BH.wscore(t,[[[20,150],[280,150]]],false).grade);
     for(const n of [4,8,40])R['s'+n].push(BH.wscore(t,[[...Array(n+1)].map(()=>[30+rand()*240,30+rand()*240])],false).grade);}}return R;}""")
  n=r["n"];c=lambda k,g:sum(1 for x in r[k] if x>=g)
  ok(n>150,"checked %d letters/syllables/words"%n)
  ok(c("trace",2)==n,"careful tracing along the letter gets ⭐⭐ for every letter",n-c("trace",2))
  ok(c("wobble",1)==n,"wobbly (child-like, ±7px) tracing is accepted for every letter",n-c("wobble",1))
  ok(c("half",2)==0 and c("half",1)<=n*.02,"half a letter is not enough",(c("half",1),c("half",2)))
  ok(c("line",1)==0,"a single straight line is never accepted")
  ok(all(c(k,2)==0 for k in ("s4","s8","s40")) and c("s8",1)<=n*.03 and c("s40",1)==0,"random scribbles are (almost) never accepted",[(k,c(k,1)) for k in ("s4","s8","s40")])
  # UI flow with real pointer input
  E("BH.setOpen(true);show('bhasha');BH.setLang('hi');BH.setInstr('hi','hi');BH.openUnit('kavarg')")
  ok(pg.locator("#vBhasha .mode[data-m=write]").count()==1,"letter lessons have a ✍️ Write mode")
  E("BH.openUnit('kahani1')");ok(pg.locator("#vBhasha .mode[data-m=write]").count()==0,"stories have no Write mode")
  E("BH.openUnit('kavarg');document.querySelector('#vBhasha .mode[data-m=write]').click()");pg.wait_for_timeout(500)
  pg.screenshot(path=O+"write_trace.png")
  t0=E("REW.R().tot.hi")
  def trace():
    t=E("document.querySelector('#bhcv').getAttribute('aria-label')");segs=E("BH.glyphSkel(%s)"%json.dumps(t))
    adj={}
    for s in segs:
      p,q=tuple(s[0]),tuple(s[1]);adj.setdefault(p,set()).add(q);adj.setdefault(q,set()).add(p)
    seen=set();paths=[]
    for st in sorted(adj,key=lambda p:(len(adj[p])!=1,p)):
      if st in seen:continue
      path=[st];seen.add(st);cur=st
      while True:
        nx=[q for q in adj[cur] if q not in seen]
        if not nx:break
        cur=nx[0];seen.add(cur);path.append(cur)
      if len(path)>2:paths.append(path)
    bx=pg.locator("#bhcv").bounding_box();s=bx["width"]/300
    for path in paths:
      pg.mouse.move(bx["x"]+path[0][0]*s,bx["y"]+path[0][1]*s);pg.mouse.down()
      for q in path[1::3]+[path[-1]]:pg.mouse.move(bx["x"]+q[0]*s,bx["y"]+q[1]*s)
      pg.mouse.up()
    pg.click("#bhchk");pg.wait_for_timeout(150)
  trace();ok(pg.locator("#bhfb.ok").count()==1,"tracing the letter with the mouse/finger is accepted",E("document.querySelector('#bhcv')._score"))
  pg.screenshot(path=O+"write_done1.png")
  ok(E("REW.R().tot.hi")==t0+1,"a written letter counts as a Hindi answer")
  pg.click("#bhwn");pg.wait_for_timeout(400);pg.screenshot(path=O+"write_alone.png")
  ok(pg.locator(".bhwmodel").count()==1,"second step: trace the dotted letter, small model above")
  pg.mouse.move(*(lambda bx:(bx["x"]+20,bx["y"]+20))(pg.locator("#bhcv").bounding_box()));pg.mouse.down();pg.mouse.move(pg.locator("#bhcv").bounding_box()["x"]+40,pg.locator("#bhcv").bounding_box()["y"]+30);pg.mouse.up()
  pg.click("#bhchk");pg.wait_for_timeout(150);ok(pg.locator("#bhfb.warn").count()==1,"a scribble gets 'try again'")
  pg.click("#bhchk");pg.mouse.move(pg.locator("#bhcv").bounding_box()["x"]+30,pg.locator("#bhcv").bounding_box()["y"]+30);pg.mouse.down();pg.mouse.move(pg.locator("#bhcv").bounding_box()["x"]+60,pg.locator("#bhcv").bounding_box()["y"]+30);pg.mouse.up();pg.click("#bhchk");pg.wait_for_timeout(150)
  ok(pg.locator("#bhwn").count()==1,"after 2 tries the child may skip")
  for k in range(7):
    if pg.locator("#bhwn").count():pg.click("#bhwn");pg.wait_for_timeout(350)
    if pg.locator("#bhcv").count():trace()
  if pg.locator("#bhwn").count():pg.click("#bhwn");pg.wait_for_timeout(300)
  ok(pg.locator("#vBhasha .result").count()==1,"write round ends with stars and the notebook tip",pg.inner_text("#vBhasha")[:200])
  pg.screenshot(path=O+"write_result.png")
  ok(E("BH.S().wbest['hi:kavarg']")>=1,"write stars saved")
  E("BH.openUnit('kavarg')");ok("★" in pg.inner_text("#vBhasha .mode[data-m=write]"),"write stars shown on the lesson")
  E("BH.setLang('mr');BH.setInstr('mr','mr');BH.openUnit('m_i');document.querySelector('#vBhasha .mode[data-m=write]').click()");pg.wait_for_timeout(500);pg.screenshot(path=O+"write_mr.png")
  ok("गिरव" in pg.inner_text("#vBhasha") or "बोट" in pg.inner_text("#vBhasha"),"Marathi instructions in Marathi")
  ok(pg.evaluate("document.documentElement.scrollWidth")<=390,"no sideways scrolling")
  ok(not errs,"no errors",errs)
print(f"\n{sum(RES)}/{len(RES)} passed")
