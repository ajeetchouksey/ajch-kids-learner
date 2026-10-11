"""Runs every test suite against a freshly built dist/ and fails if any check fails.
   Usage: npm run build && npm test     (needs: pip install playwright && python -m playwright install chromium)"""
import os,subprocess,sys,time,re
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST=os.path.join(ROOT,"dist");PORT=8765
SUITES=["score_http.py","integ_http.py","review_test.py","nbm_test.py","bh_test.py","bhw_test.py","lp_test.py","ah_test.py","talk_unit2.py","pwa_test.py"]
if len(sys.argv)>1:SUITES=[s for s in SUITES if any(a in s for a in sys.argv[1:])]
if not os.path.exists(os.path.join(DIST,"AaryaAI.html")):sys.exit("dist/ missing – run `npm run build` first")
env=dict(os.environ,URL=f"http://localhost:{PORT}/AaryaAI.html",OUT=os.environ.get("OUT",os.path.join(ROOT,"test-output")))
srv=subprocess.Popen([sys.executable,"-m","http.server",str(PORT),"--directory",DIST],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
failed=[];summary=[]
try:
  for s in SUITES:
    t0=time.time();r=subprocess.run([sys.executable,os.path.join(ROOT,"tests",s)],cwd=DIST,env=env,capture_output=True,text=True,timeout=900)
    out=r.stdout+r.stderr;fails=[l for l in out.splitlines() if l.startswith("FAIL")]
    errs=re.findall(r"ERR(?:ORS?)? \[(.+?)\]",out);npass=sum(1 for l in out.splitlines() if l.startswith("PASS"))
    bad=r.returncode!=0 or fails or [e for e in errs if e.strip()] or (s=="ah_test.py" and re.search(r"\| \[(?!\])",out)) or (s=="talk_unit2.py" and "→ ERR" in out)
    summary.append(f"{'✗' if bad else '✓'} {s:16s} {npass:3d} passed{'' if not fails else ', '+str(len(fails))+' failed'}  ({time.time()-t0:.0f}s)")
    print(summary[-1],flush=True)
    if bad:failed.append(s);print("\n".join(fails[:20]) or out[-2000:])
finally:srv.terminate()
print("\n"+"\n".join(summary))
if failed:sys.exit(f"\nFAILED: {', '.join(failed)}")
print("\nall suites passed")
