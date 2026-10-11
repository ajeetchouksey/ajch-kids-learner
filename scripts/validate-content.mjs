#!/usr/bin/env node
/* Checks every content file before a build. No dependencies.
   Rules a teacher would check by hand:
   - reading: every question has 1 right + 2 different wrong answers, and the marked line really contains the answer
   - spelling: short, single words; German nouns start with a capital letter and have der/die/das
   - writing: model sentence starts with a capital letter and ends with . ! or ? */
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const load=f=>JSON.parse(readFileSync(path.join(ROOT,"content/learn",f),"utf8"));
const errors=[];const E=(where,msg)=>errors.push(`${where}: ${msg}`);
const LANGS=["de","en"],str=x=>typeof x==="string"&&x.trim().length>0;
const STOP=new Set(["the","der","die","das","den","dem","ein","eine","einen","mit","auf","über","zur","bei","im","in","an","am","on","to","a"]);

const read=load("read.json"),ids=new Set();
for(const l of LANGS){if(!Array.isArray(read[l])||!read[l].length){E("read."+l,"missing texts");continue;}
  let prev=0;read[l].forEach((t,i)=>{const w=`read.${l}[${i}] ${t.id}`;
    if(!str(t.id)||ids.has(l+t.id))E(w,"id missing or duplicate");ids.add(l+t.id);
    if(![0,1,2].includes(t.level))E(w,"level must be 0, 1 or 2");if(t.level<prev)E(w,"texts must go from easy to harder");prev=t.level;
    if(!str(t.emoji)||!str(t.title))E(w,"emoji/title missing");
    if(!Array.isArray(t.lines)||t.lines.length<3||t.lines.length>6||!t.lines.every(str))E(w,"3–6 lines of text");
    if(t.lines.some(x=>x.length>70))E(w,"a line is longer than 70 characters (too long for Klasse 1)");
    if(!Array.isArray(t.questions)||t.questions.length<2)E(w,"at least 2 questions");
    (t.questions||[]).forEach((q,k)=>{const wq=`${w} q${k+1}`;
      if(!str(q.q)||!str(q.answer)||!Array.isArray(q.wrong)||q.wrong.length!==2||!q.wrong.every(str))E(wq,"question, answer and 2 wrong answers needed");
      if(new Set([q.answer,...(q.wrong||[])]).size!==3)E(wq,"answers must be different");
      if(!Number.isInteger(q.line)||q.line<0||q.line>=t.lines.length){E(wq,"line index out of range");return;}
      const line=t.lines[q.line].toLowerCase(),keys=q.answer.toLowerCase().replace(/[.!?]/g,"").split(/\s+/).filter(x=>x.length>2&&!STOP.has(x));
      if(keys.length&&!keys.some(k=>line.includes(k.slice(0,4))))E(wq,`answer "${q.answer}" is not in the marked line "${t.lines[q.line]}"`);});});}

const spell=load("spell.json");
for(const l of LANGS){if(!Array.isArray(spell[l])||spell[l].length!==3){E("spell."+l,"needs 3 groups (easy, middle, hard)");continue;}
  const seen=new Set();spell[l].forEach((g,gi)=>{if(!Array.isArray(g)||g.length<8)E(`spell.${l}[${gi}]`,"at least 8 words per group");
    (g||[]).forEach(w=>{const wh=`spell.${l}[${gi}] ${w.word}`;
      if(!str(w.word)||/\s/.test(w.word)||w.word.length>9)E(wh,"one word, at most 9 letters");
      if(seen.has(w.word))E(wh,"duplicate word");seen.add(w.word);if(!str(w.emoji))E(wh,"emoji missing");
      if(l==="de"){if(!["der","die","das"].includes(w.article))E(wh,"German noun needs der/die/das");if(w.word[0]!==w.word[0].toUpperCase())E(wh,"German noun starts with a capital letter");}
      if(l==="en"&&w.word!==w.word.toLowerCase())E(wh,"English words in lower case");});});}

const write=load("write.json");
for(const l of LANGS){if(!Array.isArray(write[l])||write[l].length<7){E("write."+l,"at least 7 prompts (one per weekday)");continue;}
  write[l].forEach((p,i)=>{const w=`write.${l}[${i}]`;if(!str(p.emoji)||!str(p.prompt)||!str(p.model))E(w,"emoji, prompt and model sentence needed");
    else{if(!/^[A-ZÄÖÜ]/.test(p.model))E(w,"model sentence must start with a capital letter");if(!/[.!?]$/.test(p.model))E(w,"model sentence must end with . ! or ?");
      if(p.model.split(/\s+/).length>8)E(w,"model sentence longer than 8 words");}});}

if(errors.length){console.error(`✗ content check failed (${errors.length}):\n- `+errors.join("\n- "));process.exit(1);}
console.log(`✓ content ok: ${read.de.length}+${read.en.length} texts, ${spell.de.flat().length}+${spell.en.flat().length} words, ${write.de.length}+${write.en.length} writing prompts`);
