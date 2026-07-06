# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian mentor de trabajo remoto, entrepreneur, writer, and content creator. His own identity ordering for the brand is **"Mentor de Trabajo Remoto, Empresario y Escritor"** — keep that order in any identity description. Known online as **@ivan.remoto** (Instagram) and **@soyivanrobayo** (YouTube). He has worked remotely for 8+ years for US/European companies and now runs **Oasis, a 1:1 mentorship (3 months) that helps people in Latin America build remote work income in USD/EUR**.

**Strategy (v2 copy shipped 2026-07-06 — evolves; Ivan's latest word always overrides this file):** the program is **Oasis — Mentoría de 90 días · Ingreso remoto premium**. Hero hook: "El trabajo remoto ya no es el futuro. Es el presente. ¿Por qué sigues vendiendo tu tiempo barato?" Promise: **tu primer ingreso remoto premium en 90 días**; the program doesn't end at session 12 if the result hasn't arrived. Format: 12 weekly 1:1 sessions (2h max), 3 phases (mentalidad ganadora → habilidades y prueba real → despliegue). 12 sections incl. "La era" (context: everyone is remote now; the division is who operates vs. who is operated). The **three routes are THE GOLD and the page's centerpiece** (section 05, before "cómo funciona"): big showcase cards (Empleo Remoto 💼 / Operador ⚙️ / Creador 🚀), each framed as a premium layer — **"Eliges UNA ruta para ejecutar. Te llevas las TRES capas de conocimiento"** (bonus banner). Phases are condensed to a compact "cómo funciona". Copy is **emoji-forward Gen Z** (big emojis, humor — e.g. 🤮 on the disgust filter, "que te vaya bonito 👋") while keeping claims true. Systems thinking is Ivan's personal proof layer (calendario es ley, sistema de notas, carga cognitiva en infraestructura) and it's documented free in the community. Tone: **direct and confrontational is allowed and wanted** (la jaula / el caos, "el filtro", "no acepto a todos") — grab attention to help, not to abuse; still no fake scarcity/counters/invented testimonials. **The page must feel ALIVE** (Ivan: "this is a selling funnel, next gen stuff"): pulsating gradient CTAs, breathing glows, pinging momentum markers, scroll cues, organic drifting blobs — on the light Oasis base, never dark. Conversion goal: **book the diagnostic call** (WhatsApp; free, doubles as Ivan evaluating the applicant). Never remove existing conversion elements (payment links, CTAs) without asking Ivan. Authority story anchor year: **2018** (Ivan confirmed; drafts sometimes say 2022 — keep 2018 for consistency with "8 años remoto").

The site at **ivanro.com** is his conversion funnel + SEO/LLM backbone. Content is in **Spanish**, audience is Latin America.

> Note: the GitHub repo is still named `kronosoperator` and the domain is connected to it, but the **brand is 100% Ivan Robayo / remote-jobs**. There is no "Kronos" branding on the live site anymore — do not reintroduce it. The old kronolog.ai/Kronos site lives only in git history.

**Brand tone:** Clear, calm, honest. Internally it's operator mindset; externally we **sell calm, not pressure**. No hype, no catchy filler, no "get rich quick", no stress on the reader. Clarity first.

---

## File Architecture

```
/
├── index.html          — Homepage = Ivan's STORY funnel. Educates a cold visitor, hands off to the program.
├── programa.html       — THE OFFER. The Oasis mentorship funnel (diagnostic-call CTA, $500 offer card).
├── oasis.css           — Oasis brand system (light: ink/azure/spring). Used by index.html + programa.html.
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

1. **ivanro.com/** (index) — cold visitor learns who Ivan is (story: Buenos Aires metro → working remote from the countryside). Nav + bridge CTA push to the program.
2. **ivanro.com/programa.html** — the offer page (shared via Instagram automation). Primary CTA everywhere: **"Agenda tu llamada de diagnóstico"** via WhatsApp (`https://wa.me/573193620926?text=AGENDA`); the call is free and filters/evaluates. Secondary in the offer card: "Separa tu lugar →" via Mercado Pago (`https://mpago.li/19y5U1L` — Ivan re-priced it on the backend for the $3.000 offer, 2026-07-06).
3. **ivanro.com/docs/** — knowledge base. Ranks for remote-job searches, builds authority, and every page funnels to /programa.html.

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

Offer (since 2026-07-06): **$3.000 USD** — Oasis Mentorías Inteligentes, 90-day 1:1 mentorship. Pago completo, or plan: **$1.200 entrada + 2 cuotas de $900** (entrada before session 1, sin excepciones). Promise: first remote income within 90 days; program continues past session 12 until the result arrives. Payment: Mercado Pago link (`https://mpago.li/19y5U1L`, re-priced by Ivan for this offer) as the "Separa tu lugar →" secondary CTA, or coordinated on the call. Authority story anchor year: **2018** (lost/in chaos, call center, no useful degree → Netherlands remote job, $800→$3.000+/mo — consistent with "8 años remoto"). Free path: **Oasis Remoto** (the Skool community — Ivan's documented systems + monthly contests to win a 1:1 session) + Instagram @ivan.remoto + Substack. No cupos/scarcity claims — direct copy yes, fakery no.

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected.
