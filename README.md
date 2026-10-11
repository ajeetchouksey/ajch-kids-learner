# AaryaAI – Lernwelt für Klasse 1

A learning app for children in Klasse 1 at a German Grundschule: **Deutsch · Mathe · English · हिंदी · मराठी · Training · Heft-Zeit**.
Learning comes first: a daily **Lernplan** (read a story and answer questions, spell words, write one sentence in the notebook, one maths round with typed answers) unlocks the games.

- Works offline, installable on phone and laptop (PWA), asks before updating.
- No account of ours, no server data: progress stays in the child's browser, optionally in a save file or in the **family's own Google Drive** (hidden app folder, syncs phone ↔ tablet ↔ laptop).
- Hindi and Marathi only spoken with native voices.

## Use it
- **Online:** the Cloudflare URL (see *Deploy*), then "Add to Home Screen".
- **Offline:** download `AaryaAI.html` from the latest build and open it in Chrome or Edge.

## Develop
```bash
npm run build      # validate content + build → dist/
npm run serve      # http://localhost:8765
pip install playwright && python -m playwright install chromium
npm test           # all Playwright suites against dist/
```
Edit texts, spelling words and writing prompts in `content/learn/*.json` – the validator explains any mistake.

## Deploy
Every push to `main` is validated, built, tested and deployed to **Cloudflare**; pull requests get a preview URL.
One-time setup: add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub Actions secrets – details in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#6-hosting--cloudflare).
Google Drive: create an OAuth web client and set the Actions variable `GOOGLE_CLIENT_ID` – steps in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#5b-family-storage--google-drive-srcappsyncjs).

## Architecture
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) – overview diagram, build, runtime, hosting, quality gates and the phase 2/3 roadmap.

Fonts: Andika, Fredoka, Noto Sans Devanagari (SIL Open Font License).
_The earlier "Kids Story Learner" app is in the git history (commit a9fa437)._
