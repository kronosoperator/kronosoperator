# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian **AI researcher and science fiction writer/independent artist**. Handles: **@historicoia** (YouTube — AI research journal, personal notes on AI development in Latin America), **@espiritualidadivan** (YouTube — where episodes of his novel are published first), Substack `ivanrob.substack.com` (the Helios story, in text). Instagram `@ivan.remoto` exists but is NOT linked on the site (Ivan's ongoing decision).

**Identity (v8, 2026-09-20 — evolves; Ivan's latest word ALWAYS overrides this file):** ivanro.com is now Ivan's dual portfolio: **AI researcher first, science-fiction writer/artist second.** Ivan is starting a project documenting the development of AI in Latin America — an "AI journal" with personal notes, published on a new YouTube channel, **@historicoia**. This sits alongside **El Archivo de Helios**, the sci-fi novel he's writing and publishing in parts (video first on the original channel @espiritualidadivan, mirrored in text on Substack). His own framing: this is now his portfolio for **employers** as much as for readers/fans — the site has to read as credible to someone hiring in AI/tech, not just as an artist's page. ⚠️ Every previous era stays retired: no remote-career mentorship, no "Protocolo Remoto", no Skool, no Oasis, no Kronos, no "consejero personal" framing, **no payment gate, no aporte, no pledge mechanics of any kind**. Do not reintroduce any of it.

**Visual identity:** still dark, still `helios.css`, still driven by Ivan's own concept art — but now layered with a **dev-portfolio flavor** ("the site should feel coded"), added this pivot: a terminal-window hero (`.term-hero`/`.term-window`, `$ whoami`-style prompt lines) and repo-card style project cards (`.projects`/`.project-card` with mono `.tag` chips) sit alongside the existing cinematic hero, gallery and post components. Same palette (near-black bg, bone-white ink, warm ember accent), same single font (JetBrains Mono) — the "coded" feel comes from UI conventions (terminal chrome, tag chips, mono labels), not a new color system. Never go back to `verdad.css` or `oasis.css` — both stay retired, dead files.

**The site's structure (all Spanish), nav = Inicio · Investigación · Historias · Arte · Bitácora · Libros · Acerca de:**
- **Inicio (index.html)** — leads with the AI-researcher identity: a terminal-hero (`$ whoami` → name → role line naming both the AI research and Helios) with CTAs to YouTube (@historicoia) and the Investigación page, then a "Dos proyectos" section with two project-cards (Investigación IA / El Archivo de Helios), then the Helios art-gallery preview (demoted, not removed), then a "Cómo seguir" section linking both YouTube channels + Substack.
- **Investigación (investigacion.html)** — NEW this pivot. AI-research page: intro + link to @historicoia, then a post-embed feed (same pattern as Historias) for @historicoia videos via the PLANTILLA block. Shipped EMPTY — no fabricated video entries; Ivan hasn't given any video IDs yet.
- **Historias (historias.html)** — the novel's episodes, one embedded YouTube video per entry (channel @espiritualidadivan). Publish by copying the PLANTILLA comment block and pasting a new `<article class="post">` at the top (newest first). Currently has ONE entry: "d10s" (video ID `nlAQc_lIGR0`) — note the title is literally **"d10s"**, not "d1os"; Ivan confirmed this and said he needs to fix the video's own on-screen title to match.
- **Arte (arte.html)** — full gallery of the concept art, all 5 images, full-size on click.
- **Bitácora (revelaciones.html — filename unchanged, nav label is "Bitácora")** — free-form text blog, now spans BOTH tracks (investigation notes + fiction fragments), not Helios-only. Publish via the PLANTILLA comment block. Shipped EMPTY — no fabricated entries.
- **Libros (libros.html)** — Quema Tu Dinero (Amazon) AND El Archivo de Helios (linked to Historias, since it's not sold as a book yet).
- **Acerca de (sobre.html)** — bio now leads with the AI-researcher identity (investigación + @historicoia), then the sci-fi writer/artist identity, then the consulting/remote-career past as one brief background sentence. Contact: navirobayo@gmail.com.
- **secretos.html** — RETIRED. Redirect stub → `/revelaciones.html`. Do not rebuild.
- **Allowed external destinations:** YouTube @historicoia (AI research), YouTube @espiritualidadivan (fiction), Substack (ivanrob.substack.com), Amazon (the book). **No Mercado Pago / payment links anywhere.** No Instagram for now.

**Closing line "Helios preserva. Evoluciona. Trasciende."** stays, but scope narrowed this pivot: it's Helios in-universe copy, so it only belongs on pages that are Helios-specific (Historias, Arte, Libros). It was removed from Inicio, Investigación, Bitácora and Acerca de since those now cover both tracks and the line reads confusing as a universal AI-research-page closer. Don't restore it site-wide without Ivan asking, and don't invent a new universal tagline in its place — pages that lost it just end at the footer.

**Brand tone:** Direct, quiet confidence. No hype, no scarcity, no persuasion mechanics, no aphorisms about "la verdad" (previous era).

**What NOT to fabricate:** Do not invent AI-research video IDs/titles, chapter lists, blurbs, or plot details beyond what Ivan supplies verbatim — when he gives a video ID/title, publish it as given (see the d10s note above about trusting his exact spelling over what's on-screen). Do not invent specific technical skills, employers, or past AI work for the "employer portfolio" framing beyond what Ivan states — the credibility comes from the site being well-built and the work being real, not from résumé claims.

---

## File Architecture

```
/
├── index.html          — Inicio: terminal-hero (AI researcher leads) + two project-cards + gallery preview + links.
├── investigacion.html  — NEW v8. Investigación: AI-research intro + @historicoia post-embed feed, PLANTILLA block.
├── historias.html      — Novel episodes, one YouTube embed per entry. PLANTILLA block to publish.
├── arte.html           — Full concept-art gallery (5 images, click-through to full size).
├── revelaciones.html   — "Bitácora" (nav label). Free text-post blog (both tracks), PLANTILLA block. NO payment gate.
├── libros.html         — Quema Tu Dinero (Amazon) + El Archivo de Helios (→ Historias).
├── sobre.html          — Acerca de · bio (AI researcher first, then sci-fi writer/artist) · contacto.
├── secretos.html       — REDIRECT STUB → /revelaciones.html (noindex). Do not rebuild.
├── programa.html       — REDIRECT STUB → / (noindex). Old remote-mentorship URL. Do not rebuild.
├── helios.css          — CURRENT design system (dark/cinematic + dev-portfolio terminal/project-card flavor).
├── verdad.css          — RETIRED (the "paper writer's blog" era). Dead file, kept for history. Do not use.
├── oasis.css           — RETIRED (the pulsating-CTA sales-funnel era). Dead file. Do not use.
├── ivanro.css          — Legacy design system, docs/ pages only (unrelated archive, see below).
├── llms.txt            — AI/LLM brand intelligence — AI researcher + sci-fi writer/artist identity + archive note.
├── robots.txt          — Allows all bots incl. AI crawlers. Disallows /legacy/.
├── sitemap.xml         — Real pages + llms.txt.
├── CLAUDE.md           — This file.
├── README.md           — Repo readme. CONTAINS WakaTime markers — see "Do not touch".
├── CNAME               — ivanro.com
├── img/                — helios-*.jpg (optimized JPEGs of Ivan's concept art, web-sized ~400-650KB;
│                         originals kept as the spaced-name PNGs, e.g. "Cybele Ultimate 01.png", ~2.5MB
│                         each — don't reference those directly in HTML, use the helios-*.jpg versions).
│                         Also ivan-book01.png (Quema Tu Dinero cover), ivan-portrait.png, ivan-campo.png
│                         (old portraits, no longer used on live pages but kept).
├── docs/               — ARCHIVE: remote-career SEO guides from a much earlier era. Untouched, unrelated
│                         to this pivot. Still online. Ask Ivan before deleting.
└── legacy/             — Old Villano.ai site. DO NOT TOUCH. Not served (robots disallow).
```

**DO NOT TOUCH:**
- `.github/workflows/waka-readme.yml` — WakaTime GitHub Action.
- `README.md` `<!--START_SECTION:waka-->` / `<!--END_SECTION:waka-->` markers — auto-updated by the action. Keep them and the content between them intact when editing README.
- `legacy/` — archived.

---

## How the Site Works (no funnel, no gate)

1. **ivanro.com/** — now doubles as an employer-facing portfolio and a landing page for people arriving from either YouTube channel. Leads with the AI-researcher identity, then presents the sci-fi work as the second track — "dos proyectos, una forma de trabajar."
2. **YouTube (@historicoia)** — AI-research journal, published first.
3. **YouTube (@espiritualidadivan)** — where Helios episodes are published FIRST.
4. **Substack (ivanrob.substack.com)** — the Helios story, mirrored in text.
5. **ivanro.com is a hub, not a store.** Nothing is sold on the site. No payment links, no membership, no pledge.
6. **docs/** — unrelated SEO archive from the remote-career era, still online, not part of this identity.

---

## Design System (helios.css)

- **Feel:** dark, quiet confidence, driven by Ivan's own concept art — plus a **dev-portfolio layer** added v8 ("the site should feel coded"): terminal chrome and repo-style cards, same palette, no new colors.
- Colors: bg `#0A0A0C` · bg-alt `#131317` · ink (bone white) `#ECE8E0` · ink-soft `#938D83` · line `#26252A` · accent (warm ember, from the art's glowing eyes) `#E2A15C`.
- Type: **JetBrains Mono only**, site-wide (weights 400/500/600/700 + italic 400) — Ivan tried a display+body split (Space Grotesk headlines, then Newsreader, then Inter for body text) and rejected both body options; he wants ONE font everywhere, the mono he called "perfect" for his name. Do not reintroduce a second typeface without him asking again.
- Key components: `.cine-hero` (full-bleed background image + gradient overlay + centered title — no longer used on index.html since v8, kept for potential reuse), `.term-hero`/`.term-window`/`.term-bar`/`.term-line`/`.term-name`/`.term-role` (NEW v8 — terminal-window hero, used once on index.html), `.projects`/`.project-card`/`.project-head`/`.project-dot`/`.project-name`/`.project-desc`/`.project-tags`/`.tag`/`.project-go` (NEW v8 — repo-card style link cards, used on index.html "Dos proyectos"), `.gallery`/`.gallery-item` (image grid, index.html preview + arte.html full gallery), `.post`/`.post-embed` (YouTube-embed feed items, Historias + Investigación) and `.post`/`.post-date` (plain-text feed items, Bitácora), `.book`/`.book-cover` (Libros), `.btn`/`.btn-solid` (outlined vs filled amber CTA).
- No payment/pledge components exist in this stylesheet anymore (`.pledge`/`.btn-quiet` from `verdad.css` were NOT carried over — don't add them back).
- `body{overflow-x:hidden}` guards mobile. Verify new pages at 375px before shipping.

---

## Writing Voice (for any copy on the site)

- Spanish. Short sentences, direct rather than aphoristic-mystical (that was the previous era).
- Claims stay literally true — El Archivo de Helios is described as "en curso" / "por partes," never as a finished, purchasable book. The AI-research project is described as starting/ongoing, not with fabricated video counts or past-work claims.
- Closing line **"Helios preserva. Evoluciona. Trasciende."** (from Ivan's own in-universe art banners — don't paraphrase it) is now scoped to Helios-specific pages only (Historias, Arte, Libros) — see Identity note above. Don't invent a replacement universal tagline for the other pages.

---

## Confirmed URLs

| Thing | URL | Status |
|---|---|---|
| Domain | https://www.ivanro.com | live |
| YouTube (AI research) | https://www.youtube.com/@historicoia | linked everywhere, NEW v8 |
| YouTube (fiction episodes) | https://www.youtube.com/@espiritualidadivan | linked everywhere |
| Substack (Helios text mirror) | https://ivanrob.substack.com | linked everywhere |
| Book — Quema Tu Dinero | https://www.amazon.com/dp/B0DG4YMW9Q | linked on Libros |
| Contact | navirobayo@gmail.com | on Acerca de |
| Instagram | https://www.instagram.com/ivan.remoto | exists, NOT linked (Ivan deciding) |
| Mercado Pago / aporte links | (retired) | REMOVED site-wide this pivot — do not re-add |
| Skool / WhatsApp / old Protocolo links | (retired) | long gone, do not reintroduce |

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected. Ivan also edits pages directly on GitHub between sessions ("Manual Update" commits) — always `git pull --rebase` and re-read a file before editing it.
