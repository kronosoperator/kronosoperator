# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian mentor de trabajo remoto, entrepreneur, writer, and content creator. His own identity ordering for the brand is **"Mentor de Trabajo Remoto, Empresario y Escritor"** — keep that order in any identity description. Known online as **@ivan.remoto** (Instagram) and **@soyivanrobayo** (YouTube). He has worked remotely for 8+ years for US/European companies and is an **expert in remote career building**. ONE public product: **El Protocolo Remoto** (Skool, $27). His public identity: **"Ivan Robayo, creador de El Protocolo Remoto"** — never "Ivan Remoto" as a name (that is only the @ivan.remoto handle). ⚠️ **The "Oasis" brand is DEAD (removed 2026-07-12)** — never reintroduce it. ⚠️ **The premium mentorship is NOT sold on the site (since 2026-07-12)** — it is only won via monthly contests in the community; do not add mentorship funnels/CTAs back.

**Strategy (v5, 2026-07-12 — evolves; Ivan's latest word always overrides this file):** ONE page, ONE offer, ONE destination. ivanro.com sells **El Protocolo Remoto** ($27, antes $500) and every conversion click goes to the Skool link — no secondary funnels, no mentorship CTAs, no WhatsApp booking on the site. Identity: **"Ivan Robayo, creador de El Protocolo Remoto"** ("if I die today, people will know me as the creator of the remote protocol"). The Protocolo = TWO routes (💼 empleo remoto high-income — the well-paid "esclavo del sistema", said with humor · ⚙️ marca personal / operador de marca — out of the corporate race, own your time, no face required) + the BONUS STACK (segundo cerebro + notas con IA, calendario, productividad, libros, estrategia de redes, concursos mensuales para ganarse una mentoría 1:1). Copy is emoji-forward Gen Z, confident, never apologetic ("Tómalo o déjalo"); claims stay true — no fake scarcity/counters/testimonials. The page must feel ALIVE: pulsating gradient CTAs, breathing glows, pinging momentum marker, scroll cue, drifting blob — on the light base, never dark. Non-buyers funnel to YouTube/Instagram/Substack ("¿Todavía no me crees?"). Authority story anchor year: **2018** (Ivan confirmed; drafts sometimes say 2022 — keep 2018 for consistency with "8 años remoto").

The site at **ivanro.com** is his conversion funnel + SEO/LLM backbone. Content is in **Spanish**, audience is Latin America.

> Note: the GitHub repo is still named `kronosoperator` and the domain is connected to it, but the **brand is 100% Ivan Robayo / remote-jobs**. There is no "Kronos" branding on the live site anymore — do not reintroduce it. The old kronolog.ai/Kronos site lives only in git history.

**Brand tone:** Clear, calm, honest. Internally it's operator mindset; externally we **sell calm, not pressure**. No hype, no catchy filler, no "get rich quick", no stress on the reader. Clarity first.

---

## File Architecture

```
/
├── index.html          — THE FRONT DOOR: minimalist $27 low-ticket landing (El Protocolo Remoto on Skool). Pure copy + emojis.
├── programa.html       — REDIRECT STUB → / (noindex). The old program URL; kept only so shared links do not 404.
├── oasis.css           — Brand system (light: ink/azure/spring). Used by index.html + programa.html. (Filename is legacy — no Oasis on visible pages.)
├── ivanro.css          — Legacy design system, docs/ pages only (migration to oasis.css pending).
├── llms.txt            — AI/LLM brand intelligence (remote-jobs authority + AI Q&A).
├── robots.txt          — Allows all bots incl. AI crawlers. Disallows /legacy/.
├── sitemap.xml         — All real pages + llms.txt.
├── CLAUDE.md           — This file.
├── README.md           — Repo readme. CONTAINS WakaTime markers — see "Do not touch".
├── CNAME               — ivanro.com
├── img/                — ivan-portrait.png (hero+OG), ivan-trabajo.jpg, ivan-campo.png
├── docs/               — Knowledge base. Each page is HTML (humans) + .md mirror (LLMs).
│   ├── index.html / index.md
│   ├── quien-es-ivan-robayo.html / .md                       (entity/author page)
│   ├── como-conseguir-trabajo-remoto-desde-latinoamerica.html / .md   (cornerstone pillar)
│   ├── trabajos-remotos-que-pagan-en-dolares.html / .md
│   └── cv-para-trabajo-remoto.html / .md
└── legacy/             — Old Villano.ai site. DO NOT TOUCH. Not served (robots disallow).
```

**DO NOT TOUCH:**
- `.github/workflows/waka-readme.yml` — WakaTime GitHub Action.
- `README.md` `<!--START_SECTION:waka-->` / `<!--END_SECTION:waka-->` markers — auto-updated by the action. Keep them and the content between them intact when editing README.
- `legacy/` — archived.

---

## The Funnel (how the site converts)

1. **ivanro.com/** (index) — THE ONLY PAGE. The $27 Protocolo Remoto landing: "low effort, high return". EXACTLY TWO routes (💼 empleo remoto high-income — "¿esclavo del sistema pero MUY bien pagado? Respeto 😏" + ⚙️ marca personal / operador de marca — fuera de la carrera corporativa, moto/carros/familia/perros, sin mostrar la cara, social media marketing + systems thinking); everything else is the BONUS STACK on top (segundo cerebro + notas con IA, calendario, productividad, libros, estrategia de redes, concursos 1:1 — "mientras juego Call of Duty 🎮") — never a third route. **EVERY conversion click goes to the Skool link. The ONLY allowed external destinations are: Skool, YouTube, Instagram, Substack** (plus the Amazon book link in the footer). No mentorship CTAs, no WhatsApp funnel, no other pages.
2. **ivanro.com/programa.html** — redirect stub to /. Do not rebuild it.
3. **ivanro.com/docs/** — knowledge base for SEO. Their CTAs historically pointed to /programa.html (now redirecting home) — repointing them to / or Skool is a pending cleanup.

---

## Design System

**Two stylesheets, on purpose:**
- `oasis.css` — index.html + programa.html. Implements the **OASIS Brand & Style Guide** (authoritative for anything Oasis-branded):
  - Colors: Ink `#0A2540` (text) · Ink-soft `#3A5573` · Azure `#0E5AE6` (accents, links, primary CTA) · Spring `#12C26A` (momentum/success) · Ice `#EAF2FE` · Mist `#F4F8FC` · White base. Signature gradient azure→spring (100deg) for key words + momentum track ONLY. **Light base always — never dark backgrounds. No pastels/rose/pink.**
  - Type: Sora 700/800 display (tracking -0.02em) · Plus Jakarta Sans body · JetBrains Mono for eyebrows/tags (uppercase, wide spacing).
  - Motif: the **momentum track** — horizontal bar filling blue→green, marker advancing to a solid-green finish node. Use for any journey/path.
  - Layout: whitespace, ~1080px max, white cards `1px #DCE7F5` border ~18px radius soft shadow, section order eyebrow→headline→lead, alternate white/mist backgrounds.
  - Tone: confident, empowering; momentum from support, never urgency.
  - Motion layer (since v2): `.btn-primary` = animated azure→spring gradient + breathing glow (`grad-move` + `btn-breathe`), `.track-marker`/`.track-finish`/`.vsl-play` ping-pulse, `.scroll-cue` bobbing arrow, `.hero::after` drifting organic blob, `.offer::before` moving gradient bar. All disabled under `prefers-reduced-motion`.
- `ivanro.css` — docs/ pages only, described below. Migrating docs to the Oasis guide is a likely future phase.

### ivanro.css (docs)

Pages link `<link rel="stylesheet" href="/ivanro.css">` and the Google Fonts (Barlow Condensed + Inter). No inline `<style>` blocks, no theme switcher (the old theme.css/theme.js are gone).

**CSS variables (`:root` in ivanro.css):**
```
--navy:#0f1629  --navy-soft:#161e38  --gold:#f0b429  --purple:#8b5cf6
--green:#22c55e  --green-dark:#16a34a  --cream:#f0ede7  --card:#ffffff
--text:#1c1917  --muted:#78716c  --border:#e5ddd6
--font-head:'Barlow Condensed'  --font-body:'Inter'  --font-mono:'Courier New'
```

**Look:** cream editorial body, dark navy hero/CTA/pricing sections, big uppercase condensed headlines (white/gold/purple), monospace labels. Green = WhatsApp/action, gold = primary CTA. All transitions .2s. Mobile-first.

**Key classes:** `nav` (sticky, brand left + `.nav-cta` right), `.hero` + `.hero-headline` (3 colored lines), `.btn-gold` / `.btn-wa` / `.btn-ghost`, `.sec` + `h2.title` (with `.hash`), `.card` / `.feat` / `.step`, `.split` (text+photo), `.photo` (graceful `onerror` placeholder), `.doc` (knowledge-base article layout), `.doc-cta`, `.faq`, `.related`, `footer`.

---

## How to Add a New Knowledge-Base Guide (the SEO/agentic move)

This is the main growth lever: each new guide targets a real remote-job search and funnels to the program. Do BOTH an HTML page and a `.md` mirror.

### 1. Create `docs/[slug].html`
Use an existing guide (e.g. `cv-para-trabajo-remoto.html`) as the template. It must have:
- `<title>`, meta description, keywords, canonical `https://www.ivanro.com/docs/[slug].html`, OG tags.
- JSON-LD: `Article` (always) + `FAQPage` (if it has FAQs) + `HowTo` (if step-by-step). Author/publisher = Ivan Robayo.
- `<link rel="stylesheet" href="/ivanro.css">` + the fonts.
- Shared `<nav>` and `<footer>` (copy from another doc page).
- `<article class="doc">` with `.crumb`, `h1`, `.lede`, `.byline`, `h2.title` sections, a `.doc-cta` block linking `/programa.html`, and a `.related` block.

### 2. Create `docs/[slug].md`
Clean Markdown mirror for LLMs: short intro line crediting Ivan + ivanro.com, the content as headings/lists, an FAQ section, and a closing link to `/programa.html`.

### 3. Register it
- Add `<url>` to `sitemap.xml`.
- Add a row to the guides table in `llms.txt` and, if it answers a common query, a Q&A entry there.
- Link it from `docs/index.html`, `docs/index.md`, and the `.related` block of sibling guides.

### High-value topics still open to write
`empresas que contratan remoto en latam`, `entrevista de trabajo remoto`, `trabajo remoto sin experiencia`, `mejores plataformas de trabajo remoto`, `inglés para trabajo remoto`, country-specific (`trabajo remoto desde méxico/argentina/perú`).

---

## Brand Voice (for writing content)

- Spanish primary. Operator-to-operator but **calm**.
- No motivational filler, no "en este artículo veremos", no hype, no pressure on the reader.
- Claim first, context second. Short paragraphs.
- Honest framing: "cero estafas — nadie te cobra por una vacante." Never overpromise.
- The mantra echo (sparingly): *"Yo te muestro el mapa. Tú caminas — en la dirección y al ritmo correcto."*

---

## Confirmed URLs

| Thing | URL |
|---|---|
| Domain | https://www.ivanro.com |
| Program / booking (WhatsApp) | https://wa.me/573193620926?text=AGENDA |
| Payment (Mercado Pago) | https://mpago.li/19y5U1L |
| Free community (Skool) | https://www.skool.com/la-verdad-by-kronos-4939/about |
| Instagram | https://www.instagram.com/ivan.remoto |
| YouTube | https://www.youtube.com/@soyivanrobayo |
| Substack | https://ivanrob.substack.com |
| Book (Quema Tu Dinero) | https://www.amazon.com/dp/B0DG4YMW9Q |

Offer (since 2026-07-12, single public offer): **$27 USD** (antes $500) El Protocolo Remoto on Skool — the two routes + bonus stack, sold on index.html. The 90-day 1:1 mentorship is NOT sold publicly anymore: it is won via the community's monthly contests. The Mercado Pago link and WhatsApp AGENDA funnel are retired from the site (links still exist in the table below for when Ivan sells 1:1 privately). Authority story anchor year: **2018** (lost/in chaos, call center, no useful degree → Netherlands remote job, $800→$3.000+/mo — consistent with "8 años remoto"). Free path: **Oasis Remoto** (the Skool community — Ivan's documented systems + monthly contests to win a 1:1 session) + Instagram @ivan.remoto + Substack. No cupos/scarcity claims — direct copy yes, fakery no.

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected.
