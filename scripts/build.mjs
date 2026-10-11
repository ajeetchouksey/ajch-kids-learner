#!/usr/bin/env node
/* AaryaAI build – no dependencies, Node ≥ 18.
   Assembles the single-file app from src/ + content/ + assets/ and writes:
     dist/index.html      – hosted app (Cloudflare), registers the service worker
     dist/AaryaAI.html    – offline download (same app, opens from disk)
     dist/sw.js, dist/manifest.webmanifest, dist/icon-*.svg, dist/version.json
   Legacy engines (English, Mathe, Deutsch) are still adapted with exact-match string patches from
   src/legacy-patches.json; every patch must match at least once or the build fails (phase 2 removes them). */
import {readFileSync,writeFileSync,mkdirSync,copyFileSync,existsSync} from "node:fs";
import {execSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import path from "node:path";

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const P=(...a)=>path.join(ROOT,...a);
const read=f=>readFileSync(P(f),"utf8");
const rep=(s,a,b)=>s.split(a).join(b);               // replace all, no $-patterns
const rep1=(s,a,b)=>{const i=s.indexOf(a);return i<0?s:s.slice(0,i)+b+s.slice(i+a.length);};
const APP="src/app/",MATH="src/engines/math/",DE="src/engines/deutsch/";

/* ---------- version ---------- */
const pkg=JSON.parse(read("package.json"));
let sha="local";try{sha=execSync("git rev-parse --short HEAD",{cwd:ROOT,stdio:["ignore","pipe","ignore"]}).toString().trim();}catch(e){}
sha=process.env.GITHUB_SHA?process.env.GITHUB_SHA.slice(0,7):(process.env.CF_PAGES_COMMIT_SHA||process.env.WORKERS_CI_COMMIT_SHA||"").slice(0,7)||sha;
const built=new Date().toISOString();
const VERSION={version:pkg.version,build:sha,date:built.slice(0,10)};
const LEGACY=process.argv.includes("--legacy");      // reproduce the pre-phase-1 file byte for byte (check only)

/* ---------- legacy patches ---------- */
const PATCHES=JSON.parse(read("src/legacy-patches.json"));
const done=new Set();
function patch(js,tag){const p=PATCHES.find(x=>x.tag===tag);if(!p)throw new Error("no patch set "+tag);
  for(const [a,b] of p.pairs){if(!js.includes(a))throw new Error(`patch "${tag}" did not match:\n${a.slice(0,200)}`);js=rep(js,a,b);}done.add(tag);return js;}

/* ---------- engines ---------- */
let en=patch(read(APP+"en.js"),"en");
const engine=(files,tag)=>patch(files.map(read).join("\n"),tag);
let ma=engine([MATH+"cfg_math.js",MATH+"core.js",MATH+"vis.js",MATH+"units.js",MATH+"math_beginner.js",MATH+"book.js",MATH+"arbeitsheft.js",MATH+"screens.js"],"math");
let de=engine([DE+"cfg_de.js",MATH+"core.js",MATH+"vis.js",DE+"units_de.js",DE+"units_de2.js",MATH+"screens.js"],"de");
de=patch(de,"de-talk");en=patch(en,"en-talk");ma=patch(ma,"ma-plan");de=patch(de,"de-lrn");en=patch(en,"en-lrn");
const unused=PATCHES.map(p=>p.tag).filter(t=>!done.has(t));if(unused.length)throw new Error("unused patch sets: "+unused);

/* ---------- content (validated by scripts/validate-content.mjs) ---------- */
const content={};
for(const f of ["read","spell","write"]){const file=`content/learn/${f}.json`;if(existsSync(P(file)))content[f]=JSON.parse(read(file));}
const contentJs=LEGACY?"":`const CONTENT=${JSON.stringify(content)};\n`;
const versionJs=LEGACY?"":`const APP_VERSION=${JSON.stringify(VERSION)};\n`;

const api='\nreturn {S:()=>S,stopSpeech,openSpeed,closeSpeed,home,U:()=>UNITS,speak,confetti,fanfare,nbTasks,openUnit:id=>go(()=>unit(UNITS[id])),fxStop:()=>{parts=[];}};';
const js=versionJs+read(APP+"profile.js")+"\n"+read(APP+"rewards.js")
 +"\nconst EN=(function(ROOT){\n"+en+rep(api,"speak,","speak,nbTasks,more:id=>MORE[id],")+"\n})(document.getElementById('appE'));"
 +"\nconst MA=(function(ROOT){\n"+ma+api+"\n})(document.getElementById('appM'));"
 +"\nconst DE=(function(ROOT){\n"+de+api+"\n})(document.getElementById('appD'));\n"
 +"function gConfetti(n){try{EN.confetti(n);}catch(e){}}\nfunction gFanfare(){try{EN.fanfare();}catch(e){}}\n"
 +"const BR=(function(ROOT){\n"+read(APP+"brain.js")+"\n})(document.getElementById('vBrain'));\n"
 +read(APP+"notebook.js")+"\n"+read(APP+"talk.js")+"\n"+contentJs+read(APP+"learn.js")+"\n"+read(APP+"bhasha_data.js")+"\n"+read(APP+"bhasha.js")+"\n"
 +(LEGACY?"":read(APP+"pwa.js")+"\n")+read(APP+"shell.js")+"\n"+read(APP+"store.js");
if(js.toLowerCase().includes("</script"))throw new Error("</script inside the app source");

/* ---------- css + fonts ---------- */
let mcss=read(MATH+"math.css");
for(const [a,b] of [[".note{width:96px",".bnote{width:96px"],[".note b{font-size:26px}.note.n5",".bnote b{font-size:26px}.bnote.n5"],[".note.n10",".bnote.n10"],[".note.n20",".bnote.n20"],[".note.n50",".bnote.n50"],[".clock{width:150px;height:150px}",".aclock{width:150px;height:150px}"]])mcss=rep(mcss,a,b);
if(!mcss.includes(".bnote{")||!mcss.includes(".aclock{"))throw new Error("math.css patch failed");
let css=[APP+"learn.css",APP+"en.css",null,APP+"shell.css",APP+"brain.css",MATH+"book.css",APP+"app.css",APP+"nb.css",APP+"bh.css"].map(f=>f?read(f):mcss).join("\n");
const FONTS={"__ANDIKA400__":"andika/files/andika-latin-400-normal.woff2","__ANDIKA700__":"andika/files/andika-latin-700-normal.woff2","__FREDOKA600__":"fredoka/files/fredoka-latin-600-normal.woff2","__DEVA400__":"noto-deva/noto-sans-devanagari-devanagari-400-normal.woff2","__DEVA600__":"noto-deva/noto-sans-devanagari-devanagari-600-normal.woff2"};
for(const [k,f] of Object.entries(FONTS))css=rep(css,k,readFileSync(P("assets/fonts",f)).toString("base64"));

/* ---------- page ---------- */
let t=rep(read(APP+"template.html"),"/*CSS*/",css);t=rep(t,"/*JS*/",js);t=rep(t,"/*BOOT*/",read(APP+"boot.js"));
const head=LEGACY?"":`<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="theme-color" content="#2F5BEA">\n<meta name="app-version" content="${VERSION.version}+${VERSION.build}">\n`;
const page=rep1(rep1(t,"<title>",'<!doctype html>\n<html lang="de"><head><meta charset="utf-8">\n'+head+"<title>"),"</style>\n","</style>\n</head><body>\n")+"\n</body></html>\n";
const hosted=LEGACY?page:rep1(page,"</head>",'<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" href="icon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="icon-192.png">\n</head>');

const out=path.resolve(ROOT,process.env.OUT_DIR||"dist");mkdirSync(out,{recursive:true});
if(LEGACY){writeFileSync(path.join(out,"AaryaAI.legacy.html"),page);console.log("legacy build",page.length);process.exit(0);}
writeFileSync(path.join(out,"index.html"),hosted);
writeFileSync(path.join(out,"AaryaAI.html"),page);
writeFileSync(path.join(out,"version.json"),JSON.stringify(VERSION));
writeFileSync(path.join(out,"sw.js"),rep(read("src/pwa/sw.js"),"__VERSION__",`${VERSION.version}+${VERSION.build}+${built}`));
for(const f of ["manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","_headers"])if(existsSync(P("src/pwa",f)))copyFileSync(P("src/pwa",f),path.join(out,f));
console.log(`built AaryaAI ${VERSION.version}+${VERSION.build}: index.html ${(hosted.length/1024).toFixed(0)} KB`);
