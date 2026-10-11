import os,json,collections
from playwright.sync_api import sync_playwright
URL=os.environ.get("URL","http://localhost:8765/AaryaAI.html");O=os.path.join(os.environ.get("OUT","test-output"),"ux")+"/"
os.makedirs(O,exist_ok=True)
AUDIT=r"""(root)=>{const R=document.querySelector(root)||document.body;const out={overflow:document.documentElement.scrollWidth>innerWidth+1,small:[],tiny:[],contrast:[],clip:[]};
 const lum=c=>{const m=c.match(/[\d.]+/g);if(!m)return null;const [r,g,b,a]=m.map(Number);if(a===0)return null;const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return .2126*f(r)+.7152*f(g)+.0722*f(b);};
 const bgOf=e=>{while(e){const s=getComputedStyle(e);if(s.backgroundImage&&s.backgroundImage!=='none')return null;const c=s.backgroundColor;if(c&&!/rgba\(0, 0, 0, 0\)|transparent/.test(c))return c;e=e.parentElement;}return 'rgb(255,255,255)';};
 R.querySelectorAll('button,a,input,[role=button],label.btn').forEach(e=>{if(e.offsetParent===null)return;const r=e.getBoundingClientRect();if(r.width<1)return;
   if((r.width<40||r.height<40)&&!e.closest('.mcard')){out.small.push((e.id||e.className||e.tagName).toString().slice(0,30)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' "'+e.textContent.trim().slice(0,12)+'"');}
   if(r.right>innerWidth+1)out.clip.push((e.id||e.className).toString().slice(0,30)+' right='+Math.round(r.right));});
 const walker=document.createTreeWalker(R,NodeFilter.SHOW_TEXT);let n;const seen=new Set();
 while(n=walker.nextNode()){const t=n.textContent.trim();if(!t||t.length<2)continue;const e=n.parentElement;if(!e||e.offsetParent===null||seen.has(e))continue;seen.add(e);const s=getComputedStyle(e);
   const fs=parseFloat(s.fontSize);if(fs<12&&!/^[\p{Extended_Pictographic}\s️]+$/u.test(t))out.tiny.push(Math.round(fs)+'px "'+t.slice(0,25)+'"');
   const bg=bgOf(e),L1=lum(s.color),L2=bg?lum(bg):null;if(L1!=null&&L2!=null&&parseFloat(s.opacity)>0.5){const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);const big=fs>=18.5||(fs>=14&&+s.fontWeight>=700);
     if(cr<(big?3:4.5))out.contrast.push(cr.toFixed(1)+' '+Math.round(fs)+'px "'+t.slice(0,25)+'"');}}
 for(const k of ['small','tiny','contrast','clip'])out[k]=[...new Set(out[k])];return out;}"""
SIZES=[("phone-s",360,740),("phone",390,844),("tablet",768,1024),("tablet-l",1024,768),("laptop",1366,800)]
agg=collections.defaultdict(lambda:collections.defaultdict(set))
with sync_playwright() as p:
  b=p.chromium.launch()
  for name,w,h in SIZES:
    pg=b.new_page(viewport={"width":w,"height":h});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));speechSynthesis.speak=()=>{};")
    pg.goto(URL);pg.wait_for_timeout(700);E=pg.evaluate
    def chk(scr,root,shot=False):
      E("const a=document.getElementById('awardpop');if(a)a.hidden=true")
      r=E(AUDIT,root)
      if r["overflow"]:agg["overflow"][scr].add(name)
      for k in ["small","tiny","contrast","clip"]:
        for x in r[k]: agg[k][x].add(scr)
      if shot: pg.screenshot(path=O+f"{name}_{scr}.png")
    chk("today","#vToday",True)
    for v,root in [("en","#appE"),("de","#appD"),("math","#appM")]:
      E(f"show('{v}')");pg.wait_for_timeout(150);chk(v+"-home",root,v=="math")
      mod={"en":"EN","de":"DE","math":"MA"}[v];uid=E(f"{mod}.U()[{2 if v!='math' else 4}].id")
      E(f"{mod}.openUnit({uid})");chk(v+"-menu",root)
      E(f"document.querySelector('{root} .mode[data-m=play],{root} .mode[data-m=practice]').click()");pg.wait_for_timeout(250);chk(v+"-question",root,True)
      E(f"const o=[...document.querySelectorAll('{root} .opts button')];(o[1]||o[0])&&(o[1]||o[0]).click()");pg.wait_for_timeout(400);chk(v+"-feedback",root,v=="en")
      E(f"{mod}.fxStop&&{mod}.fxStop();{mod}.stopSpeech()")
    E("show('math');MA.home();document.querySelector('#appM #ahcard').click()");pg.wait_for_timeout(150);chk("arbeitsheft","#appM",True)
    E("show('brain')");pg.wait_for_timeout(150);chk("training","#vBrain",True)
    E("show('awards')");chk("awards","#vAwards")
    E("parentUntil=Date.now()+1e8;show('parent')");pg.wait_for_timeout(150);chk("parent","#vParent",name=="tablet")
    E("show('today');NB.open({})");pg.wait_for_timeout(150);chk("notebook","#nbook",name=="phone");E("NB.close()")
    E("TALK.open('en');document.querySelector('#tkGo').click()");pg.wait_for_timeout(150);chk("talk","#talk",name=="phone")
    E("TALK.close()")
    if errs: agg["errors"][str(errs[:2])].add(name)
    pg.close()
  # keyboard: focus visible style present?
  pg=b.new_page();pg.goto(URL);pg.wait_for_timeout(500)
  fv=pg.evaluate("[...document.styleSheets].some(s=>{try{return [...s.cssRules].some(r=>/focus-visible|:focus/.test(r.selectorText||''))}catch(e){return false}})")
  rm=pg.evaluate("[...document.styleSheets].some(s=>{try{return [...s.cssRules].some(r=>/prefers-reduced-motion/.test(r.conditionText||r.cssText.slice(0,60)))}catch(e){return false}})")
  print("focus style present:",fv,"| reduced-motion handled:",rm)
for k,v in agg.items():
  print(f"\n== {k} ({len(v)})")
  for x,s in sorted(v.items(),key=lambda t:-len(t[1]))[:25]: print("  ",x,"<-",sorted(s)[:5])
