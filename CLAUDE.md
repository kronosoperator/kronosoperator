# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian **science fiction writer and independent artist**. Handles: **@espiritualidadivan** (YouTube — where episodes of his novel are published first), Substack `ivanrob.substack.com` (the same story, in text). Instagram `@ivan.remoto` exists but is NOT linked on the site (Ivan's ongoing decision).

**Identity (v7, 2026-09-17 — evolves; Ivan's latest word ALWAYS overrides this file):** ivanro.com is now the home of **El Archivo de Helios**, the science-fiction novel Ivan is writing and publishing in parts (video first on YouTube, mirrored in text on Substack). He also makes the concept art for its universe — he is a **writer AND an independent artist**, and the site must read that way at a glance. ⚠️ Every previous era is retired: no remote-career mentorship, no "Protocolo Remoto", no Skool, no Oasis, no Kronos, no "consejero personal de atletas/CEOs/celebridades" framing, and — as of this pivot — **no payment gate, no aporte, no pledge mechanics of any kind**. Ivan's words: "the whole thing with consulting high performance is not that important anymore... let's remove the pledge thing." Do not reintroduce any of it.

**Visual identity:** dark, cinematic sci-fi — driven directly by Ivan's own concept art (`img/helios-*.jpg`): near-black backgrounds, bone-white ink, warm ember/amber accent (matches the glowing eyes/core-lights in the art), geometric display type, generous full-bleed imagery. Never go back to the previous eras' looks (the "paper/serif writer's blog" `verdad.css`, or the pulsating-CTA sales funnel `oasis.css`) — both are retired, kept only as dead files.

**The site's structure (all Spanish):**
- **Inicio (index.html)** — cinematic landing. Full-bleed hero image + "El Archivo de Helios" title, short "quién escribe" intro, a 4-image gallery preview linking to Arte, three links for following the story (Historias / YouTube / Substack), closing line.
- **Historias (historias.html)** — the novel's episodes, one embedded YouTube video per entry. Publish by copying the PLANTILLA comment block and pasting a new `<article class="post">` at the top (newest first). Currently has ONE entry: "d10s" (video ID `nlAQc_lIGR0`) — note the title is literally **"d10s"**, not "d1os"; Ivan confirmed this and said he needs to fix the video's own on-screen title to match.
- **Arte (arte.html)** — full gallery of the concept art, all 5 images, full-size on click. New page, added this pivot.
- **Bitácora (revelaciones.html — filename unchanged, nav label is "Bitácora")** — free-form text blog. This is where Ivan pastes text posts ("I guess I can paste the text here"). Publish via the PLANTILLA comment block (`<article class="post">` with `<span class="post-date">`, `<h2>`, one or more `<p>`). Shipped EMPTY — no fabricated entries. **No payment gate — the old "aporte"/Mercado Pago pledge box was removed entirely from this page.**
- **Libros (libros.html)** — Quema Tu Dinero (Amazon) AND El Archivo de Helios (linked to Historias, since it's not sold as a book yet — it's serialized in video/text).
- **Acerca de (sobre.html)** — short bio leading with the sci-fi writer/artist identity; the consulting/remote-career past is mentioned only briefly as prior chapters, not the headline. Contact: navirobayo@gmail.com.
- **secretos.html** — RETIRED. Now a redirect stub → `/revelaciones.html` (same noindex pattern as `programa.html` → `/`). Do not rebuild it; Escritos Secretos and Revelaciones de la Verdad were merged into the single free Bitácora on this pivot.
- **Allowed external destinations:** YouTube (@espiritualidadivan), Substack (ivanrob.substack.com), Amazon (the book). **No Mercado Pago / payment links anywhere on the site anymore.** No Instagram for now.

**Brand tone:** Direct, cinematic, quiet confidence. No hype, no scarcity, no persuasion mechanics, and now also **no aphorisms about "la verdad"** (that belonged to the previous era) — the closing line across pages is now **"Helios preserva. Evoluciona. Trasciende."**, pulled directly from the in-universe banners in Ivan's own art.

**What NOT to fabricate:** Ivan mentioned he may give an older YouTube channel handle later — he has not yet. Do not invent one. Do not invent chapter lists, blurbs, or plot details for El Archivo de Helios beyond what Ivan supplies — when he gives a video ID/title, publish it verbatim (see the d10s note above about trusting his exact spelling over what's on-screen).

---

## File Architecture

```
/
├── index.html          — Inicio: cinematic hero (El Archivo de Helios) + gallery preview + links.
├── historias.html      — Novel episodes, one YouTube embed per entry. PLANTILLA block to publish.
├── arte.html           — Full concept-art gallery (5 images, click-through to full size).
├── revelaciones.html   — "Bitácora" (nav label). Free text-post blog, PLANTILLA block. NO payment gate.
├── libros.html         — Quema Tu Dinero (Amazon) + El Archivo de Helios (→ Historias).
├── sobre.html          — Acerca de · bio (sci-fi writer/artist first) · contacto.
├── secretos.html       — REDIRECT STUB → /revelaciones.html (noindex). Do not rebuild.
├── programa.html       — REDIRECT STUB → / (noindex). Old remote-mentorship URL. Do not rebuild.
├── helios.css          — CURRENT design system (dark/cinematic/sci-fi). Used by every live page above.
├── verdad.css          — RETIRED (the "paper writer's blog" era). Dead file, kept for history. Do not use.
├── oasis.css           — RETIRED (the pulsating-CTA sales-funnel era). Dead file. Do not use.
├── ivanro.css          — Legacy design system, docs/ pages only (unrelated archive, see below).
├── llms.txt            — AI/LLM brand intelligence — sci-fi writer/artist identity + archive note.
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

1. **ivanro.com/** — cinematic landing for people who found Ivan via YouTube. Ivan's own words: "this is the landing page they see after finding me from YouTube... it's not that important" — i.e. keep it short and confident, its only job is to confirm "yes, this is the guy writing El Archivo de Helios" and point to where the story actually lives.
2. **YouTube (@espiritualidadivan)** — where episodes are published FIRST.
3. **Substack (ivanrob.substack.com)** — the same story, mirrored in text.
4. **ivanro.com is a hub, not a store.** Nothing is sold on the site. No payment links, no membership, no pledge.
5. **docs/** — unrelated SEO archive from the remote-career era, still online, not part of this identity.

---

## Design System (helios.css)

- **Feel:** cinematic, dark, quiet confidence. Driven by Ivan's own concept art, not generic sci-fi cliché.
- Colors: bg `#0A0A0C` · bg-alt `#131317` · ink (bone white) `#ECE8E0` · ink-soft `#938D83` · line `#26252A` · accent (warm ember, from the art's glowing eyes) `#E2A15C`.
- Type: **Space Grotesk** 500/700 (display/headlines) · **Newsreader** (body/long-form text — kept from the previous era for reading comfort) · **JetBrains Mono** (eyebrows, nav, uppercase wide-tracked labels).
- Key components: `.cine-hero` (full-bleed background image + gradient overlay + centered title, used once on index.html), `.gallery`/`.gallery-item` (image grid, used on index.html preview + arte.html full gallery), `.post`/`.post-embed` (YouTube-embed feed items, Historias) and `.post`/`.post-date` (plain-text feed items, Bitácora), `.book`/`.book-cover` (Libros), `.btn`/`.btn-solid` (outlined vs filled amber CTA).
- No payment/pledge components exist in this stylesheet anymore (`.pledge`/`.btn-quiet` from `verdad.css` were NOT carried over — don't add them back).
- `body{overflow-x:hidden}` guards mobile. Verify new pages at 375px before shipping.

---

## Writing Voice (for any copy on the site)

- Spanish. Short sentences, cinematic rather than aphoristic-mystical (that was the previous era).
- Claims stay literally true — El Archivo de Helios is described as "en curso" / "por partes," never as a finished, purchasable book.
- Closing line across pages: **"Helios preserva. Evoluciona. Trasciende."** (from Ivan's own in-universe art banners — don't paraphrase it).

---

## Confirmed URLs

| Thing | URL | Status |
|---|---|---|
| Domain | https://www.ivanro.com | live |
| YouTube (episodes, first) | https://www.youtube.com/@espiritualidadivan | linked everywhere |
| Substack (text mirror) | https://ivanrob.substack.com | linked everywhere |
| Book — Quema Tu Dinero | https://www.amazon.com/dp/B0DG4YMW9Q | linked on Libros |
| Contact | navirobayo@gmail.com | on Acerca de |
| Instagram | https://www.instagram.com/ivan.remoto | exists, NOT linked (Ivan deciding) |
| Mercado Pago / aporte links | (retired) | REMOVED site-wide this pivot — do not re-add |
| Skool / WhatsApp / old Protocolo links | (retired) | long gone, do not reintroduce |

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected. Ivan also edits pages directly on GitHub between sessions ("Manual Update" commits) — always `git pull --rebase` and re-read a file before editing it.
