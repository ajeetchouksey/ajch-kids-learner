import re,json,sys,os
from playwright.sync_api import sync_playwright
DE_W=set("und ist nicht ich du der die das ein eine einen mit für auf zum zur noch nochmal tippe tipp weiter fertig heute los richtig falsch sehr gut super toll sterne punkte schreib schreibe sag sage hör höre lies wie wer wo warum welche welches dein deine mein meine wir sind hast hat habe kannst kann alle aufgabe aufgaben wörter wort satz sätze spiel spiele zurück zeit stufe ziel ziele eltern lesen heft fertig! geschafft schau schaue zähle zähl finde hilfe frage fragen antwort antworten mal bitte jetzt dann oder auch nur noch".split())
EN_W=set("the and is are you your tap to of for with again next finish great well done read write say listen look find help question questions answer answers word words sentence play game games back time level goal goals parents today right wrong try good job let's it this that what who where why which my we have has can all stars points start continue nearly perfect check correct one two three more less big small first last here there now then when how many much very just out up down day days week best score mode quiz build memory silly think learn speak notebook settings sound voice speed slow fast reset load save file open close yes no not only also because but from into new old show hide words long short girl boy name names numbers count add take away plus minus equals tens ones hundred what's don't can't won't i'm it's".split())
OK=set("aarya pizza super okay ok hamster panda mama papa oma opa baby lego teddy english deutsch mathe training sport".split())
def toks(t): return [w for w in re.findall(r"[a-zäöüß']+",t.lower()) if w not in OK]
def bad(lang,line):
    ws=toks(line)
    if lang=="en":
        hits=[w for w in ws if w in DE_W or re.search("[äöüß]",w)]
    else:
        hits=[w for w in ws if w in EN_W]
    return hits
issues={};errs=[]
def grab(pg,lang,where,sel):
    lang=getattr(pg,"_force",None) or lang
    try: txt=pg.evaluate("s=>{const out=[];document.querySelectorAll(s).forEach(r=>{if(r.offsetParent!==null||getComputedStyle(r).position==='fixed')out.push(r.innerText)});document.querySelectorAll(s+' [placeholder],'+s+' [aria-label]').forEach(e=>out.push((e.placeholder||'')+'\\n'+(e.getAttribute('aria-label')||'')));return out.join('\\n')}",sel)
    except Exception as e: errs.append(f"{where}: grab {e}");return
    for line in txt.split("\n"):
        line=line.strip()
        if not line: continue
        h=bad(lang,line)
        if len(h)>=1:
            issues.setdefault((lang,line[:140]),set()).add(where)
def closepops(pg):
    if pg.locator("#awardpop:visible").count(): grab(pg,pg.evaluate("UIL.cur"),"awardpop","#awardpop")
    for _ in range(8):
        if pg.locator("#awardpop:visible").count():
            pg.evaluate("document.querySelector('#awardpop button')&&document.querySelector('#awardpop button').click()");pg.wait_for_timeout(120)
        else: break
def run(app):
  with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":390,"height":844})
    pg.on("pageerror",lambda e:errs.append(f"[{app}] pageerror {e}"))
    pg.add_init_script("localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,enLevel:1,uiLang:'%s',created:'2026-09-01'}));speechSynthesis.speak=()=>{};"%app)
    pg.goto(os.environ.get("URL","http://localhost:8765/AaryaAI.html"));pg.wait_for_timeout(700)
    W=lambda ms=150:pg.wait_for_timeout(ms)
    # shared screens
    for v in ["today","awards","brain"]:
        pg.evaluate(f"show('{v}')");W(250);grab(pg,app,v,"body > *:not(#setup):not(#talk):not(#nbook)")
    pg.evaluate("parentUntil=Date.now()+1e8;show('parent')");W(300);grab(pg,app,"parent","#vParent")
    grab(pg,app,"tabs",".tabs, .bar")
    # brain games
    pg.evaluate("show('brain')");W(200)
    n=pg.locator("#vBrain .bcard").count()
    for i in range(n):
        pg.evaluate("show('brain')");W(150);closepops(pg);pg.locator("#vBrain .bcard").nth(i).evaluate("e=>e.click()");W(400);grab(pg,app,f"brain-game{i}","#vBrain")
        o=pg.locator("#vBrain .opt:visible")
        if o.count(): o.first.evaluate("e=>e.click()");W(300);closepops(pg);grab(pg,app,f"brain-game{i}-fb","#vBrain")
        pg.evaluate("BR.stop()")
    # notebook from today
    pg.evaluate("NB.open({})");W(300);grab(pg,app,"nb-today","#nbook")
    for bt in pg.locator("#nbook button").all()[:6]:
        try:
            pg.evaluate("NB.open({})");W(150)
        except: pass
    pg.evaluate("NB.close&&NB.close()");W(100)
    # subjects
    for subj,lang,mod in [("en","en","EN"),("de","de","DE"),("math","de","MA")]:
        for g in [0,1,2]:
            pg.evaluate(f"PROF.setView('{subj}',{g});{'PROF.setEnLevel(%d);'%g if subj=='en' else ''}show('{subj}');{mod}.home()");W(250)
            root={"en":"#appE","de":"#appD","math":"#appM"}[subj]
            grab(pg,lang,f"{subj}-home-g{g}",root);grab(pg,lang,f"{subj}-gbar",'#gbar')
        ids=pg.evaluate(f"{mod}.U().map(u=>u.id)")
        for uid in ids:
            pg.evaluate(f"show('{subj}');{mod}.openUnit({json.dumps(uid)})");W(200)
            grab(pg,lang,f"{subj}-unit{uid}",root)
            modes=pg.evaluate(f"[...document.querySelectorAll('{root} .mode[data-m]')].map(b=>b.dataset.m)")
            for m in modes:
                if m=="nb":
                    pg.evaluate(f"{mod}.openUnit({json.dumps(uid)})");W(150)
                    pg.evaluate(f"document.querySelector('{root} .mode[data-m=nb]').click()");W(300);grab(pg,lang,f"{subj}-unit{uid}-nb","#nbook");pg.evaluate("NB.close&&NB.close()");continue
                pg.evaluate(f"{mod}.openUnit({json.dumps(uid)})");W(150)
                try: closepops(pg);pg.evaluate(f"document.querySelector('{root} .mode[data-m={m}]').click()")
                except Exception as e: errs.append(f"{subj} {uid} {m} click {e}");continue
                W(350);closepops(pg);grab(pg,lang,f"{subj}-unit{uid}-{m}",root)
                # NBM gate may appear; open options
                for sel in [f"{root} .opts button:visible",f"{root} .opt:visible",f"{root} button.ans:visible"]:
                    o=pg.locator(sel)
                    if o.count():
                        try: closepops(pg);o.first.evaluate("e=>e.click()");W(450);closepops(pg);grab(pg,lang,f"{subj}-unit{uid}-{m}-fb",root)
                        except Exception: pass
                        break
                pg.evaluate(f"{mod}.fxStop();{mod}.stopSpeech()")
        # challenge
        pg.evaluate(f"show('{subj}');{mod}.home()");W(200)
        if pg.locator(f"{root} #chall").count():
            pg.evaluate(f"document.querySelector('{root} #chall').click()");W(350);grab(pg,lang,f"{subj}-chall",root)
    # talk
    for L in ["en","de"]:
        pg.evaluate(f"TALK.open('{L}')");W(200);grab(pg,L,f"talk-{L}-hello","#talk")
        pg.evaluate("document.querySelector('#tkGo').click()");W(200)
        for i in range(5):
            grab(pg,L,f"talk-{L}-q","#talk")
            pg.fill("#tkIn","i is happy" if L=="en" else "ich bin gut");pg.evaluate("document.querySelector('#tkSend').click()");W(200);closepops(pg);grab(pg,L,f"talk-{L}-res","#talk")
            pg.evaluate("document.querySelector('#tkNext').click()");W(200);closepops(pg)
        grab(pg,L,f"talk-{L}-done","#talk");pg.evaluate("document.querySelector('#tkEnd').click()");W(100)
    # popups/toast captured in today
    pg.evaluate("show('today')");W(200);grab(pg,app,"today-after","#vToday")
    ov=pg.evaluate("document.documentElement.scrollWidth>innerWidth")
    if ov: errs.append(f"[{app}] horizontal overflow")
    b.close()
for app in sys.argv[1:] or ["de","en"]:
    run(app)
out=sorted(issues.items(),key=lambda x:(x[0][0],x[0][1]))
for (lang,line),where in out:
    print(f"[{lang}] {line}   <- {sorted(where)[:3]}{'…' if len(where)>3 else ''}")
print("\nISSUES",len(out));print("ERRS",errs[:30],len(errs))
