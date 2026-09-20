# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian **AI researcher** who also writes. Handle: **@historicoia** (YouTube — his AI research journal: documenting how AI is being built in Latin America, personal notes, "vlogging about it"). He also writes — *Quema Tu Dinero* (published) and *El Archivo de Helios* (a sci-fi novel in progress, video on @espiritualidadivan, text on Substack) — but that's surfaced ONLY via the Libros page, not given site-wide billing. Instagram `@ivan.remoto` exists but is NOT linked on the site (Ivan's ongoing decision).

**Identity (v9, 2026-09-20 — evolves; Ivan's latest word ALWAYS overrides this file):** ivanro.com is Ivan's AI-research vlog corner and, secondarily, an employer-facing portfolio. His own framing, verbatim intent: **"Primero soy un AI researcher y me gusta escribir... de resto no hay que darle mucha importancia a mis historias o mi gusto por escribir, lo principal es dar forma a esta herramienta o servicio que documenta el progreso de IA... por ahora es mi rincón para vlogear al respecto."** Concretely:
- The site is NOT a dual-identity portfolio anymore (that was v8 — see [[investigador-pivot]] history). It's singular: AI research first.
- Writing (fiction + *Quema Tu Dinero*) is real and stays linked, but ONLY on **Libros** — don't give it a homepage section, a nav item of its own, or space anywhere else.
- The AI-research project may eventually become its own tool/service — don't build that now, don't imply it exists; the site's job today is just to be Ivan's public notebook for it.
- ⚠️ Every previous era stays retired: no remote-career mentorship, no "Protocolo Remoto", no Skool, no Oasis, no Kronos, no "consejero personal" framing, **no payment gate, no aporte, no pledge mechanics of any kind**. Do not reintroduce any of it.

**Visual identity:** dark, `helios.css`, dev-portfolio flavored ("the site should feel coded") — a terminal-window hero (`.term-hero`/`.term-window`, `$ whoami`-style prompt lines), mono labels, the warm-ember Helios palette (kept because it's still the color story behind the one remaining Helios asset — the book cover on Libros). Never go back to `verdad.css` or `oasis.css` — both stay retired, dead files.

**The site's structure (all Spanish), nav = Inicio · Investigación · Libros · Acerca de:**
- **Inicio (index.html)** — terminal-hero (`$ whoami` → name → single AI-researcher role line) with CTAs to YouTube (@historicoia) and Investigación, then one short "// sobre esto" section explaining the project is his personal documentation corner that could grow into something more. Nothing else — no gallery, no second project track, no fiction mention.
- **Investigación (investigacion.html)** — the AI-research page: intro + link to @historicoia, then a `.post`/`.post-embed` feed (YouTube embeds) via the PLANTILLA block. Shipped EMPTY — no fabricated video entries; Ivan hasn't given any video IDs yet.
- **Libros (libros.html)** — the ONLY place fiction/writing shows up: Quema Tu Dinero (Amazon link) + El Archivo de Helios (links out to YouTube @espiritualidadivan and Substack directly, since there's no more in-site Historias page). Keeps the Helios closing line ("Helios preserva. Evoluciona. Trasciende.") — this is the one page where it still belongs.
- **Acerca de (sobre.html)** — bio is AI-researcher-first and stays that way; writing gets one short sentence pointing to Libros, not a paragraph. Contact: navirobayo@gmail.com.

**RETIRED this pivot (v9) — do not rebuild:**
- **Historias (historias.html)** — was the Helios video-episode feed. Now a redirect stub → `/libros.html`.
- **Arte (arte.html)** — was the concept-art gallery. Now a redirect stub → `/libros.html`.
- **Bitácora (revelaciones.html)** — was the free-text blog. Now a redirect stub → `/`.
- **secretos.html** — already retired pre-v9; redirect target updated to `/` directly (was `/revelaciones.html`, which is itself now a stub — avoid redirect chains).
- If Ivan asks to bring fiction content back with more room than a Libros mention, ask him where he wants it before rebuilding any of these — don't assume Historias/Arte/Bitácora is what he means.

**Allowed external destinations:** YouTube @historicoia (AI research, primary), YouTube @espiritualidadivan + Substack (El Archivo de Helios, linked only from Libros), Amazon (Quema Tu Dinero, linked only from Libros). **No Mercado Pago / payment links anywhere.** No Instagram for now.

**Brand tone:** Direct, quiet confidence, no over-explaining. Don't spend copy justifying "two sides" of Ivan's work — the site has one subject (AI research); the writing is a footnote that lives entirely on Libros.

**What NOT to fabricate:** Do not invent AI-research video IDs/titles beyond what Ivan supplies verbatim — investigacion.html ships empty until he gives one. Do not invent specific technical skills, employers, or past AI work for the "employer portfolio" angle — credibility comes from the site being well-built and the work being real, not résumé claims. Do not imply the AI-research project is already a "tool" or "service" — it's a personal documentation corner that *may* become that.

---

## File Architecture

```
/
├── index.html          — Inicio: terminal-hero (AI researcher, single track) + short mission blurb + footer.
├── investigacion.html  — Investigación: AI-research intro + @historicoia post-embed feed, PLANTILLA block.
├── libros.html         — Quema Tu Dinero (Amazon) + El Archivo de Helios (→ YouTube + Substack directly).
├── sobre.html          — Acerca de · bio (AI researcher; writing gets one line → Libros) · contacto.
├── historias.html      — REDIRECT STUB → /libros.html (noindex). RETIRED v9. Do not rebuild.
├── arte.html           — REDIRECT STUB → /libros.html (noindex). RETIRED v9. Do not rebuild.
├── revelaciones.html   — REDIRECT STUB → / (noindex). RETIRED v9. Do not rebuild.
├── secretos.html       — REDIRECT STUB → / (noindex). Retired pre-v9.
├── programa.html       — REDIRECT STUB → / (noindex). Old remote-mentorship URL. Do not rebuild.
├── helios.css          — CURRENT design system (dark + dev-portfolio terminal-hero flavor).
├── verdad.css          — RETIRED (the "paper writer's blog" era). Dead file, kept for history. Do not use.
├── oasis.css           — RETIRED (the pulsating-CTA sales-funnel era). Dead file. Do not use.
├── ivanro.css          — Legacy design system, docs/ pages only (unrelated archive, see below).
├── llms.txt            — AI/LLM brand intelligence — AI-researcher identity, writing noted only briefly.
├── robots.txt          — Allows all bots incl. AI crawlers. Disallows /legacy/.
├── sitemap.xml         — Real pages (Inicio, Investigación, Libros, Acerca de) + docs/ + llms.txt.
├── CLAUDE.md           — This file.
├── README.md           — Repo readme. CONTAINS WakaTime markers — see "Do not touch".
├── CNAME               — ivanro.com
├── img/                — helios-cybele-ultimate.jpg still used (Libros book cover, homepage og:image).
│                         The other helios-*.jpg (first-mother, volan, concept, cybele portrait) are now
│                         UNREFERENCED anywhere (Arte page gone) — left in place, not deleted, in case
│                         Ivan wants them again. Also ivan-book01.png (Quema Tu Dinero cover),
│                         ivan-portrait.png, ivan-campo.png (old portraits, unused, kept).
├── docs/               — ARCHIVE: remote-career SEO guides from a much earlier era. Untouched, unrelated.
└── legacy/             — Old Villano.ai site. DO NOT TOUCH. Not served (robots disallow).
```

**DO NOT TOUCH:**
- `.github/workflows/waka-readme.yml` — WakaTime GitHub Action.
- `README.md` `<!--START_SECTION:waka-->` / `<!--END_SECTION:waka-->` markers — auto-updated by the action. Keep them and the content between them intact when editing README.
- `legacy/` — archived.

---

## How the Site Works (no funnel, no gate)

1. **ivanro.com/** — Ivan's AI-research vlog corner first, employer-facing portfolio second. One subject on the homepage: AI research. No "dos proyectos" split anymore (that was v8, superseded).
2. **YouTube (@historicoia)** — AI-research journal, the primary and only channel surfaced outside Libros.
3. **Libros is the sole home for writing** — Quema Tu Dinero + El Archivo de Helios, with their own external links (Amazon / YouTube @espiritualidadivan / Substack). Nothing about the fiction appears anywhere else on the site.
4. **ivanro.com is a hub, not a store.** Nothing is sold on the site. No payment links, no membership, no pledge.
5. **docs/** — unrelated SEO archive from the remote-career era, still online, not part of this identity.

---

## Design System (helios.css)

- **Feel:** dark, quiet confidence, dev-portfolio flavored — terminal chrome, mono labels, same palette as always.
- Colors: bg `#0A0A0C` · bg-alt `#131317` · ink (bone white) `#ECE8E0` · ink-soft `#938D83` · line `#26252A` · accent (warm ember) `#E2A15C`.
- Type: **JetBrains Mono only**, site-wide (weights 400/500/600/700 + italic 400) — Ivan was firm about ONE font everywhere after rejecting a display+body split twice. Do not reintroduce a second typeface without him asking again.
- Key components still in use: `.term-hero`/`.term-window`/`.term-bar`/`.term-line`/`.term-name`/`.term-role` (terminal-window hero, index.html only), `.sec`/`.sec-tag`/`.sec-lede` (generic section pattern), `.post`/`.post-embed` (YouTube-embed feed items, Investigación only now), `.book`/`.book-cover` (Libros), `.btn`/`.btn-group`/`.btn-solid` (CTAs — note `.btn-group` now carries its own base `display:flex;gap:1rem;flex-wrap:wrap`; it used to only work inside a since-removed `.cine-hero` scope, which was a latent layout bug), `.page-title`, `.about`, `.close` (Libros only).
- **Removed this pivot (v9), do not re-add without a live page that needs them:** `.cine-hero` (dead since v8), `.gallery`/`.gallery-item` (was Arte + homepage gallery preview), `.projects`/`.project-card`/`.tag` (was the v8 "Dos proyectos" split), `.quote`/`.quote-foot` (never used), `.post-date`/`.post-img` (were Bitácora/unused), `.masthead-role` (never used).
- No payment/pledge components exist in this stylesheet (`.pledge`/`.btn-quiet` from `verdad.css` were never carried over).
- `body{overflow-x:hidden}` guards mobile. Verify new pages at 375px before shipping.

---

## Writing Voice (for any copy on the site)

- Spanish. Short sentences, direct, no over-explaining — especially don't narrate "I do two things" framing anywhere outside Libros.
- Claims stay literally true — El Archivo de Helios is "en curso"/"por partes," never a finished, purchasable book. The AI-research project is a documentation corner that *may* become a tool/service — don't claim it already is one.
- Closing line **"Helios preserva. Evoluciona. Trasciende."** (from Ivan's own in-universe art banners — don't paraphrase it) lives ONLY on Libros now that Historias/Arte are gone.

---

## Confirmed URLs

| Thing | URL | Status |
|---|---|---|
| Domain | https://www.ivanro.com | live |
| YouTube (AI research, primary) | https://www.youtube.com/@historicoia | linked everywhere |
| YouTube (El Archivo de Helios) | https://www.youtube.com/@espiritualidadivan | linked only from Libros |
| Substack (El Archivo de Helios, text) | https://ivanrob.substack.com | linked only from Libros |
| Book — Quema Tu Dinero | https://www.amazon.com/dp/B0DG4YMW9Q | linked on Libros |
| Contact | navirobayo@gmail.com | on Acerca de |
| Instagram | https://www.instagram.com/ivan.remoto | exists, NOT linked (Ivan deciding) |
| Mercado Pago / aporte links | (retired) | REMOVED — do not re-add |
| Skool / WhatsApp / old Protocolo links | (retired) | long gone, do not reintroduce |

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected. Ivan also edits pages directly on GitHub between sessions ("Manual Update" commits) — always `git pull --rebase` and re-read a file before editing it.
