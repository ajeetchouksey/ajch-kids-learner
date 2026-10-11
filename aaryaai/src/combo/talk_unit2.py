from playwright.sync_api import sync_playwright
T={"en":{0:["My name is Aarya.","me name is Aarya","Aarya","i am Aarya","my name Aarya"],
 1:["I am six years old","i have six years","six","i am six","I'm 6"],
 2:["my favourite colour is pink","my favorite color are blue","pink","i like pink"],
 3:["I am happy","i is happy","happy","i happy","i'm fine thank you","good"],
 4:["i like to eat pizza","i like pizza","pizza","i likes apples","i eat bananas"],
 5:["i like cats","i like cat","dog","i like dogs","i likes horse"],
 6:["i like to dance","i like dancing","i like do gymnastics","gymnastics","i like play football"],
 7:["it is sunny","sunny","is sunny","it's raining","it rain"],
 8:["i go to school","in the morning i go to school","school","i going to school"],
 9:["yes i have a brother","no i don't","i have one sister","yes i has a sister","no"],
 10:["my pencil case is in my school bag","in my school bag is a book","a book","there is a book and a pencil"],
 11:["no i don't have a pet","yes i have a cat","yes i have a dog","i have cat"],
 12:["yesterday i went to the park","yesterday i go to the park","i played with my friend","i goed to school","i play football"],
 13:["my mum likes to read","my mum like to cook","she likes reading","she like dancing","reading"],
 14:["my favourite toy is my teddy because it is soft","my teddy","my favourite toy is lego"],
 15:["yes i can swim","no i can't","yes i can swimming","yes","i can swim"],
 16:["an elephant is bigger","the elephant is bigger than a cat","elephant","the elephant is more big"],
 17:["i stay at home","when it rains i play inside","i take my umbrella","i read a book"]},
 "de":{0:["ich heiße Aarya","mein name ist aarya","Aarya","ich bin aarya","ich heisse aarya"],
 1:["ich bin sechs jahre alt","ich habe sechs jahre","sechs","ich bin sechs"],
 2:["meine lieblingsfarbe ist rosa","mein lieblingsfarbe ist blau","rosa","ich mag pink"],
 3:["mir geht es gut","ich bin gut","gut","es geht mir gut","mir geht's gut danke"],
 4:["ich esse gern pizza","pizza","ich esse gerne nudeln","ich mag apfel","ich isst gern pizza"],
 5:["ich mag katzen","ich mag die katze","katze","ich mag hund","ich mag hunde"],
 6:["ich turne gern","ich mache gern turnen","turnen","ich spiele gern fußball","ich spiel gern"],
 7:["heute ist es sonnig","heute es ist sonnig","sonnig","es regnet","es ist kalt"],
 8:["ja ich habe einen hund","ich habe ein hund","nein ich habe kein haustier","nein","ja ich habe eine katze","ich habe ein katze"],
 9:["meine mama und mein papa","mama papa und ich","bei mir wohnen meine mama und mein papa","mein mama"],
 10:["in meiner schultasche ist ein buch","ein buch","meine federmappe","ein heft und ein buch"],
 11:["ich gehe in die schule","in die schule","ich gehe zur schule","schule","ich geh in schule"],
 12:["gestern habe ich fußball gespielt","gestern ich habe gespielt","ich habe gespielt","ich bin in den park gegangen","ich habe gegangen in den park","ich spiele"],
 13:["meine mama kocht gern","mama liest gern","sie kocht gerne","meine mama koche gern"],
 14:["der elefant ist größer","der elefant","elefant","der elefant ist mehr groß","der hund ist größer"],
 15:["wenn es regnet spiele ich drinnen","ich lese ein buch","ich spiele drinnen","wenn es regnet ich spiele drinnen"],
 16:["ja ich kann schwimmen","nein ich kann nicht schwimmen","ja","ich kann schwimme"],
 17:["weil es spaß macht","sport macht spaß","weil es macht spaß","weil ich turnen mag"]}}
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page();errs=[]
  pg.on("pageerror",lambda e:errs.append(str(e)))
  pg.add_init_script("localStorage.setItem('aaryaai-profile',JSON.stringify({name:'Aarya',gender:'f',grade:1,enLevel:1,created:'2026-09-01'}))")
  pg.goto("file:///tmp/claude-0/-home-claude/cd893b8d-2513-5015-a160-25cbff4c1cab/scratchpad/combo/AaryaAI.html");pg.wait_for_timeout(800)
  for L,d in T.items():
    for i,ans in d.items():
      q=pg.evaluate(f"TALK.Q.{L}[{i}].q");print(f"\n## {L}{i} {q}")
      for a in ans:
        r=pg.evaluate("([L,i,a])=>{try{const r=TALK.check(L,TALK.Q[L][i],a);return [r.verdict,r.model,r.tip?r.tip[0]:''];}catch(e){return ['ERR',String(e),'']}}",[L,i,a])
        print(f"  {a!r:45} → {r[0]:7} | {r[1]} | {r[2]}")
  print("ERR",errs);b.close()
