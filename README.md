# AaryaAI – Lernwelt für Klasse 1

An offline, single-file learning app for children in Klasse 1 at a German Grundschule.
**Live:** https://ajeetchouksey.github.io/ajch-kids-learner/ — or download `index.html` and open it in Chrome or Edge – no install, no server, no account. Everything stays in the browser.

**Areas:** Deutsch · Mathe (incl. "Denken und Rechnen" Arbeitsheft) · English · हिंदी / मराठी (native voices, 31 graded lessons each, letter tracing) · Training · Heft-Zeit (notebook work)

**Learning first:** a daily Lernplan – read a story and answer questions, spell words from letter tiles, write one sentence in the notebook (parent checklist), one maths round with typed answers. Games unlock afterwards (parents can change this).

## Source
`src/combo/build.py` builds the app from the files in `src/`:
```bash
cd src/combo && python3 build.py   # → AaryaAI.html (offline) and aaryaai.html
```
Tests (Playwright, Chromium) live in `src/combo/*_test.py`; run them over http (`python3 -m http.server 8765`).
Fonts: Andika, Fredoka, Noto Sans Devanagari (SIL Open Font License).


_The earlier "Kids Story Learner" app was replaced by AaryaAI; it is still in the git history (commit a9fa437)._
