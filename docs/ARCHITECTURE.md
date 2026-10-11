# AaryaAI – Architecture

AaryaAI is a learning app for children in Klasse 1 (Deutsch, Mathe, English, हिंदी, मराठी, Training, Heft-Zeit).
It must work **offline**, keep **all data on the child's device**, and be simple for parents to open on a phone or laptop.

## 1. Principles

| Principle | What it means in practice |
|---|---|
| Offline first | One self-contained HTML file (fonts embedded). The hosted version adds a service worker so it also opens without internet. |
| Privacy by design | No accounts of ours, no server-side data, no tracking. Progress lives in the browser (localStorage), optionally in a save file or in the **family's own Google Drive** (hidden app folder). |
| Learning before play | Daily Lernplan (read · spell · write · maths) unlocks games; reading pause and typed answers stop guessing. |
| One language per area | English area 100 % English, Deutsch/Mathe 100 % German, Hindi/Marathi with selectable instruction language and native voices only. |
| Content is data | Texts, words and prompts are JSON, checked by a validator before every build. |
| Every change is tested | ~230 Playwright checks run in CI before anything is deployed. |

## 2. Overview

```mermaid
flowchart LR
  subgraph Repo["GitHub · ajch-kids-learner"]
    SRC["src/app · src/engines\n(JS, CSS, template)"]
    CON["content/*.json"]
    AST["assets/fonts"]
    PATCH["src/legacy-patches.json"]
  end
  subgraph CI["GitHub Actions"]
    VAL["validate-content.mjs"] --> BLD["build.mjs (Node, no deps)"] --> TST["tests/run_all.py\n(Playwright · Chromium)"]
  end
  Repo --> CI
  TST -->|main| PROD["Cloudflare Workers\nstatic assets · production"]
  TST -->|pull request| PREV["Cloudflare preview URL\npr-<n>"]
  BLD --> DL["AaryaAI.html\n(offline download)"]
  PROD --> DEV["Phone / tablet / laptop\nPWA + service worker cache"]
  DEV --> LS[("localStorage\n+ optional save file")]
  DEV <-->|"OAuth token (browser only)\ndrive.appdata"| GD[("Family's Google Drive\nhidden app folder\naaryaai-<child>.json")]
```

## 3. Repository layout

```
src/app/            app shell, subjects, learning plan, Hindi/Marathi, PWA client, boot (setup wizard, save file, migrations)
src/engines/math/   shared practice engine + Mathe units (also used by Deutsch)
src/engines/deutsch Deutsch units
src/pwa/            service worker, manifest, icons, Cloudflare _headers
src/legacy-patches.json   exact-match patches that adapt the legacy engines (phase 2 removes them)
content/learn/      read.json · spell.json · write.json
assets/fonts/       Andika, Fredoka, Noto Sans Devanagari (OFL), embedded at build time
scripts/            build.mjs, validate-content.mjs
tests/              Playwright suites + run_all.py
docs/               this file
```

## 4. Build

`npm run build` → `validate-content.mjs` → `build.mjs` → `dist/`

| Output | Purpose |
|---|---|
| `index.html` | hosted app; links the manifest; registers `sw.js` |
| `AaryaAI.html` | same app for download / offline use (no service worker) |
| `sw.js` | cache-first service worker; its version string changes on every build |
| `manifest.webmanifest`, `icon*` | installable app ("Zum Startbildschirm hinzufügen") |
| `version.json` | `{version, build, date}` – shown in the parent area |
| `_headers` | Cloudflare: no-cache for `index.html`, `sw.js`, `version.json`; basic security headers |

The build is plain Node (≥ 18) with **zero npm dependencies**. `node scripts/build.mjs --legacy` reproduces the pre-migration file byte for byte (used to prove the Python → Node port changed nothing).

## 5. Runtime

- **Modules today:** IIFE globals – `PROF` (profile, languages), `REW` (points, levels, badges), `EN`/`MA`/`DE` (subject engines), `BR` (training), `NB`/`NBM` (notebook), `TALK` (speaking), `PLAN`/`GUARD`/`KP`/`READ`/`SPELL`/`WRITE` (learning first), `BH` (Hindi/Marathi), `PWA`, `STORE` (save file).
- **Scoring:** single entry point `REW.hit(subject, kind, n)`.
- **Storage:** localStorage keys listed in `AAI.KEYS`; `aaryaai-schema` holds the data schema version. `AAI.MIGRATE[n]` upgrades data once per device (a backup is written first).
- **Updates (PWA):** new deploy → browser installs the new service worker in the background → banner "Neue Version … Aktualisieren / Später" → only after OK: `SKIP_WAITING`, reload, old cache deleted. Checks every 30 min and when the app comes back to the foreground.
- **Speech:** Web Speech API (synthesis + recognition). Hindi/Marathi content is only spoken by a native `hi-*` / `mr-*` voice, never by a fallback voice.

## 5b. Family storage – Google Drive (`src/app/sync.js`)

The app never sees a server of ours: the browser signs in with **Google Identity Services** (token model) and talks to the **Drive API** directly.

- **Scope:** `drive.appdata` only – a hidden folder that belongs to the app. It cannot list, read or change any other file in the Drive.
- **File:** `aaryaai-<child>.json` in `appDataFolder`, same format as the 💾 save file (`{app, format, child, data, sync:{mtime, device}}`), so it can also be loaded manually.
- **Change times:** `AAI.MT` records when each storage key (Mathe, Deutsch, rewards, …) last changed (`aaryaai-mtime`).
- **Sync:** on opening, every 2 min when something changed, when the app goes to the background and when the device comes online. Merge per key: newer change wins; both sides end up with the merged result. In the background it only uploads; remote changes are applied when the app is opened again (never a reload mid-exercise).
- **First connection on a device** that finds an existing file: the parent chooses *Aus Google Drive laden* or *Dieses Gerät behalten*.
- **Tokens:** in memory + `sessionStorage` (≈1 h), never in localStorage or the save file. After a restart the 💾 button shows **☁️⚠️**; one tap re-confirms the sign-in (no consent screen again).
- **Limits:** if two devices change the *same* area at the same time, the later change wins for that area (points from the other device in that area can be lost). Not available in the offline file or the Claude artifact (no fixed https origin) – they keep the save file.
- **Privacy page:** `privacy.html` (deployed with the app) – needed for the Google consent screen.

**One-time Google setup (owner):**
1. [console.cloud.google.com](https://console.cloud.google.com) → new project **AaryaAI** → *APIs & Services → Library* → enable **Google Drive API**.
2. *OAuth consent screen* (Google Auth Platform → Branding/Audience): user type **External**, app name *AaryaAI*, support e-mail, app home page = the Cloudflare URL, privacy policy = `<URL>/privacy.html`. *Data access* → add scope `…/auth/drive.appdata`. *Audience* → while **Testing**, add the Google accounts of your family as test users (up to 100).
3. *Clients* → *Create client* → **Web application** → *Authorized JavaScript origins*: the Cloudflare URL(s), e.g. `https://aaryaai-kids.<account>.workers.dev` and later `https://kids.aaryaai.dev` (no path, no trailing slash). No redirect URI is needed.
4. Copy the **Client ID** (`….apps.googleusercontent.com`) → GitHub repo → *Settings → Secrets and variables → Actions → Variables* → `GOOGLE_CLIENT_ID`. The client ID is public by design (it ends up in the page); no client secret is used.
5. Push / re-run CI. Without the variable the app simply shows "Google Drive ist noch nicht eingerichtet".
6. Later, for families outside your test-user list: *Audience → Publish app* (Google may ask for verification of the app; check the requirements for the `drive.appdata` scope at that time).

## 6. Hosting – Cloudflare

Static assets on **Cloudflare Workers** (`wrangler.jsonc`, no server code).

| Branch / event | Result |
|---|---|
| push to `main` | tests → `wrangler deploy` → production (`aaryaai-kids.<account>.workers.dev`, custom domain optional) |
| pull request | tests → `wrangler versions upload --preview-alias pr-<n>` → preview URL |
| tests fail | nothing is deployed |

**One-time setup (owner):**
1. Cloudflare dashboard → *My Profile → API Tokens → Create Token* → template **"Edit Cloudflare Workers"**.
2. GitHub repo → *Settings → Secrets and variables → Actions* → add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (Account ID is on the Cloudflare dashboard home, right column).
3. Optional: *Workers → aaryaai-kids → Settings → Domains & Routes* → custom domain (e.g. `kids.aaryaai.dev`).

Until the secrets exist, CI still validates, builds and tests; the deploy job is skipped with a warning.

## 7. Quality gates

| Gate | Tool |
|---|---|
| Content rules (answer really in the text, 3 different options, der/die/das, capitals, sentence length) | `scripts/validate-content.mjs` |
| Legacy patch drift | `build.mjs` fails if any patch no longer matches |
| Scoring, integration, review, notebook mode, Hindi/Marathi, tracing, learning plan, workbook generators, speaking checker, PWA update | `tests/*.py` via `run_all.py` |
| Layout at 360 px – laptop, tap targets, contrast | `tests/ux_test.py` (audit, run manually) |

## 8. Roadmap

**Phase 1.5 – done:** Google Drive sync (hidden app folder, per-area merge, one-tap reconnect, privacy page). Next provider: OneDrive (Microsoft Graph app folder) behind the same `SYNC` provider interface.

**Phase 1 – done:** Node build, content JSON + validator, PWA with update prompt, schema/migrations hook, CI, Cloudflare deploy, version in parent area.

**Phase 2 – modules & types**
- Vite + TypeScript, ES modules instead of globals; `vite-plugin-singlefile` keeps the one-file offline download.
- One shared **question engine** (`Question = {prompt, visual, answer, options?, input: "choice"|"number"|"tiles"|"trace"|"speech", why}`) used by Mathe, Deutsch, English, Hindi/Marathi and Lernplan – removes `legacy-patches.json`.
- Unit/lesson content of Mathe, Deutsch, English and Hindi/Marathi to JSON (generators stay code), with JSON-Schema.
- Vitest for generators and the speaking checker; Playwright tests moved to `@playwright/test`.

**Phase 3 – data & learning intelligence**
- IndexedDB store with typed, versioned records; export/import stays the save-file format.
- Spaced repetition (Leitner boxes) across subjects: mistakes come back after 1, 3, 7 days.
- Parent report from real learning data (reading accuracy, spelling errors by letter, maths facts not yet automatic).
- Optional, opt-in only: family sync via Cloudflare Workers + D1 (parent account, no child account), and bring-your-own-AI key for free-form writing and speaking feedback. Privacy review (GDPR, children's data) before either ships.

## 9. Decisions

| # | Decision | Why |
|---|---|---|
| 1 | Single-file app, embedded fonts | works from a USB stick, email attachment or Claude artifact; no broken paths offline |
| 2 | No backend | children's data stays at home; zero running cost; nothing to secure |
| 3 | Cloudflare Workers static assets | free tier, global CDN, preview URLs per PR, `_headers`, room for Workers/D1 later |
| 4 | Node build with zero deps | builds anywhere (CI, Cloudflare, a laptop) without `npm install`; fast |
| 5 | Patches kept as data during migration | proves byte-identical output now; patch drift fails the build; removed in phase 2 |
| 6 | Update only after OK | a child mid-exercise is never interrupted by a reload |
