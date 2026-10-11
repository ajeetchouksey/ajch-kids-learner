/* ============================ PROFILE: child name, level, level tabs ============================ */
/* UI language: every visible text is chosen with T(german, english) for the current area.
   English area → "en"; Deutsch & Mathe → "de"; shared screens (Heute, Training, Auszeichnungen, Eltern) → the App-Sprache setting. */
const UIL={cur:"de",app:()=>(PROF.get().uiLang==="en"?"en":"de"),set(l){UIL.cur=l==="en"?"en":"de";try{document.documentElement.lang=UIL.cur;}catch(e){}return UIL.cur;}};
function T(de,en){return UIL.cur==="en"?en:de;}
const PROF=(function(){const KEY="aaryaai-profile";let P={};try{P=JSON.parse(localStorage.getItem(KEY)||"{}")||{};}catch(e){}
  P=Object.assign({name:"Aarya",gender:"f",grade:1,view:{},created:""},P);if(!P.view||typeof P.view!=="object")P.view={};
  P.name=String(P.name||"").replace(/[^A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017E .\-]/g,"").slice(0,20)||"Aarya";P.grade=[0,1,2].includes(+P.grade)?+P.grade:1;
  /* English starts at Anfänger unless a parent picks another English level */
  if(P.view.en===undefined&&P.enLevel===undefined)P.enLevel=0;
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P));}catch(e){}};
  return {get:()=>P,name:()=>P.name||"Aarya",grade:()=>+P.grade||0,view:s=>(P.view[s]!==undefined?P.view[s]:s==="en"&&P.enLevel!==undefined?P.enLevel:(+P.grade||0)),setEnLevel(g){P.enLevel=g;P.view.en=g;save();},setView(s,g){P.view[s]=g;save();},setUiLang(l){P.uiLang=l==='en'?'en':'de';save();},brainLang:()=>(P.brainLang==='en'||P.brainLang==='de'?P.brainLang:UIL.app()),setBrainLang(l){P.brainLang=l==='en'?'en':'de';save();},save};})();
const GRADES=[[0,"🐣","Anfänger","Beginner"],[1,"1️⃣","Klasse 1","Year 1"],[2,"2️⃣","Klasse 2","Year 2"]];
/* which level each English unit belongs to */
const EN_GRADE={16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0, 0:1,1:1,2:1,6:1,7:1,8:1,10:1,12:1,15:1, 3:2,4:2,5:2,9:2,11:2,13:2,14:2};
function gradeTabs(subj,stats){const v=PROF.view(subj);
  return `<div class="gtabs" data-s="${subj}" role="tablist">${GRADES.map(([g,e,de,en])=>{const s=stats&&stats[g];
    return `<button class="gtab${v===g?" on":""}" data-g="${g}" role="tab" aria-selected="${v===g}"><span class="ge2">${e}</span><b>${(subj==="en"?"en":subj==="de"||subj==="math"?"de":subj==="brain"?UIL.cur:UIL.app())==="en"?en:de}</b><small>${s?`⭐ ${s[0]}/${s[1]}`:""}</small>${PROF.grade()===g?`<i class="gme">${PROF.name()}</i>`:""}</button>`;}).join("")}</div>`;}
function wireGradeTabs(root,subj,rerender){root.querySelectorAll(`.gtabs[data-s="${subj}"] .gtab`).forEach(b=>b.onclick=()=>{PROF.setView(subj,+b.dataset.g);rerender();window.scrollTo(0,0);});}
function gradeStats(units,best,gradeOf){return [0,1,2].map(g=>{const us=units.filter(u=>gradeOf(u)===g);return [us.reduce((a,u)=>a+(best[u.id]||0),0),us.length*3];});}
