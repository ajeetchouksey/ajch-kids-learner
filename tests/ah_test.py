from playwright.sync_api import sync_playwright
import os,json
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={"width":390,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
  pg.add_init_script("localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,created:'2026-09-01'}));speechSynthesis.speak=()=>{};")
  pg.goto(os.environ.get("URL","http://localhost:8765/AaryaAI.html"));pg.wait_for_timeout(700)
  res=pg.evaluate("""()=>{const out={};const us=MA.U().filter(u=>u.k==="A");
    for(const u of us){const bad=[];const seen=new Set();
      for(let i=0;i<400;i++){let q;try{q=u.gen();}catch(e){bad.push("EXC "+e.message);break;}
        const txt=JSON.stringify([q.de,q.en,q.opts,q.vis]);
        if(/undefined|NaN|null/.test(txt))bad.push("bad text: "+txt.slice(0,160));
        if(!q.opts||q.opts.length<2)bad.push("opts<2 "+JSON.stringify(q.opts)+" "+q.de);
        else if(new Set(q.opts.map(String)).size!==q.opts.length)bad.push("dup opts "+JSON.stringify(q.opts)+" "+q.de);
        if(q.opts&&q.opts.some(o=>typeof o==="number"&&o<0))bad.push("neg "+JSON.stringify(q.opts)+" "+q.de);
        try{const s=q.stmt(q.opts[0]);if(!s||!s.de)bad.push("stmt");}catch(e){bad.push("stmt exc "+e.message);}
        if(!q.why||!q.why.rule)bad.push("why/rule missing: "+q.de);
        seen.add(q.de);}
      out[u.id+" "+u.de]={variety:seen.size,bad:[...new Set(bad)].slice(0,4)};}
    return out;}""")
  for k,v in res.items(): print(k,"| variants:",v["variety"],"|",v["bad"])
  print("ERR",errs)
