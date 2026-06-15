# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian mentor de trabajo remoto, writer, and content creator. Known online as **@ivan.remoto** (Instagram) and **@soyivanrobayo** (YouTube). He has worked remotely for 8+ years for US/European companies and now runs a **1:1 mentorship that helps people in Latin America land a real remote job**.

The site at **ivanro.com** is his conversion funnel + SEO/LLM backbone. Content is in **Spanish**, audience is Latin America.

> Note: the GitHub repo is still named `kronosoperator` and the domain is connected to it, but the **brand is 100% Ivan Robayo / remote-jobs**. There is no "Kronos" branding on the live site anymore — do not reintroduce it. The old kronolog.ai/Kronos site lives only in git history.

**Brand tone:** Clear, calm, honest. Internally it's operator mindset; externally we **sell calm, not pressure**. No hype, no catchy filler, no "get rich quick", no stress on the reader. Clarity first.

---

## File Architecture

```
/
├── index.html          — Homepage = Ivan's STORY funnel. Educates a cold visitor, hands off to the program.
├── programa.html       — THE OFFER. The mentorship funnel (price, process, WhatsApp/Mercado Pago CTAs).
├── ivanro.css          — Shared design system for ALL pages.
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
2. **ivanro.com/programa.html** — the offer. Primary CTAs: WhatsApp (`https://wa.me/573193620926?text=AGENDA`) and Mercado Pago (`https://mpago.li/19y5U1L`).
3. **ivanro.com/docs/** — knowledge base. Ranks for remote-job searches, builds authority, and every page funnels to /programa.html.

---

## Design System (ivanro.css)

Every page links `<link rel="stylesheet" href="/ivanro.css">` and the Google Fonts (Barlow Condensed + Inter). No inline `<style>` blocks, no theme switcher (the old theme.css/theme.js are gone).

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
| Instagram | https://www.instagram.com/ivan.remoto |
| YouTube | https://www.youtube.com/@soyivanrobayo |
| Substack | https://ivanrob.substack.com |
| Book (Quema Tu Dinero) | https://www.amazon.com/dp/B0DG4YMW9Q |

Offer: **600 USD** mentorship (start 150 USD, rest on placement). Only **3 clients/month**.

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected.
