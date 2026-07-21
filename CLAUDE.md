# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian **personal advisor to pro athletes, CEOs and celebrities, and writer**. Author of *Quema Tu Dinero*. Handles: **@ivan.remoto** (Instagram — currently NOT linked on the site, by Ivan's decision) and **@soyivanrobayo** (YouTube).

**Identity (v6, 2026-07-21 — evolves; Ivan's latest word always overrides this file):** ivanro.com is a **writer's site** — "purely a blog for a writer." Think Osho / Kapil Gupta: serene, direct, zero pressure. Ivan's words: "we're not gonna force anything... if people want to access the paid content, they will find a way." Never describe him publicly as the Buddha/guru — that's private context, not copy. The remote-career business is **closed**: ⚠️ no Protocolo Remoto, no Skool, no mentorship funnels, no WhatsApp booking, no Oasis, no Kronos. Do not reintroduce any of them.

**The site's structure (all Spanish):**
- **Sections:** I. **Discursos** (the home feed → free on the Substack newsletter) · II. **Libros** (Quema Tu Dinero on Amazon; more coming) · III. **Escritos Secretos** (reserved; each text needs its own aporte, apply via navirobayo@gmail.com) · **Revelaciones de la Verdad** (the aporte page, "para el individuo de élite") · **Acerca de**. ⚠️ The podcast was removed (2026-07-21) — do not re-add it anywhere. Category-page close line (Ivan's): "Ivan Robayo es un consejero personal de CEOs, Atletas Profesionales, Celebridades al rededor del mundo."
- **The quiet door:** "Revelaciones de la Verdad" — the aporte via the Mercado Pago link. Escritos Secretos additionally require an individual aporte per text (apply via navirobayo@gmail.com).
- **Acerca de:** short bio; contact = reply to any newsletter email; YouTube for face/voice.
- **Allowed external destinations, complete list:** Substack, Amazon, Mercado Pago (aporte), YouTube. **No Instagram for now** (Ivan will decide later). No other links.

**Brand tone:** Direct, serene, aphoristic. No hype, no emojis, no scarcity, no persuasion mechanics. "La verdad no tiene prisa." The page never chases the reader.

---

## File Architecture

```
/
├── index.html          — HOME = the FEED of writings (newest on top). Sticky .topnav with the categories.
│                         To publish: copy the PLANTILLA comment block in the file, paste as first <article>.
├── libros.html         — Category page: books (Quema Tu Dinero → Amazon). Ivan's copy: "Para quienes aún están buscando".
├── secretos.html       — Escritos Secretos: each secret writing needs its OWN aporte; "el precio de cada uno de los
│                         textos es en millones"; apply via navirobayo@gmail.com (Ivan published his email himself).
├── revelaciones.html   — The aporte page. Ivan's h1: "Para el individuo de élite."
├── sobre.html          — Acerca de · contacto (newsletter reply + YouTube). Nav label is "Acerca de", NOT "Sobre Mí".
│                         (podcast.html DELETED by Ivan 2026-07-21 — the podcast is no longer a thing; never re-add.)
├── verdad.css          — The design system: paper #FBFAF7, ink, Cormorant Garamond + Newsreader, no animations.
│                         Shared chrome on every page: .masthead → .topnav (sticky) → content → .close → footer.
├── programa.html       — REDIRECT STUB → / (noindex). Old program URL kept so shared links don't 404. Do not rebuild.
├── oasis.css           — UNUSED legacy stylesheet from the previous business. Safe to ignore.
├── ivanro.css          — Legacy design system, docs/ pages only.
├── llms.txt            — AI/LLM brand intelligence (writer/advisor identity + archive guides).
├── robots.txt          — Allows all bots incl. AI crawlers. Disallows /legacy/.
├── sitemap.xml         — Real pages + llms.txt.
├── CLAUDE.md           — This file.
├── README.md           — Repo readme. CONTAINS WakaTime markers — see "Do not touch".
├── CNAME               — ivanro.com
├── img/                — ivan-portrait.png (OG image), ivan-trabajo.jpg, ivan-campo.png
├── docs/               — ARCHIVE: remote-career guides from the previous era. Still online, no longer the focus.
└── legacy/             — Old Villano.ai site. DO NOT TOUCH. Not served (robots disallow).
```

**DO NOT TOUCH:**
- `.github/workflows/waka-readme.yml` — WakaTime GitHub Action.
- `README.md` `<!--START_SECTION:waka-->` / `<!--END_SECTION:waka-->` markers — auto-updated by the action. Keep them and the content between them intact when editing README.
- `legacy/` — archived.

---

## How the Site Works (no funnel)

1. **ivanro.com/** — the writer's page. Reader lands, reads, and chooses: newsletter (free), book (Amazon), or the aporte (Mercado Pago → Revelaciones; Escritos Secretos per-text via email). Nothing pushes. The pledge box is the only "offer" and it's framed as a door, not a pitch.
2. **Substack (ivanrob.substack.com)** — where ALL the writing lives. The site always refers people to the newsletter for the free layer.
3. **docs/** — archive guides from the remote-career era. They still rank; their old CTAs point to /programa.html which now redirects home. Cleaning them up (or removing them) is pending Ivan's decision — ask before deleting.

---

## Design System (verdad.css)

- **Feel:** paper, ink, serif, silence. A book, not a landing page.
- Colors: paper `#FBFAF7` · ink `#191713` · soft `#6E675D` · line `#E7E2D8` · accent `#8A6D3B` (hover only).
- Type: **Cormorant Garamond** 500/600 (display) · **Newsreader** (body, 19px, line-height 1.75). No mono, no sans.
- Layout: single centered column, max-width 660px. Categories as numbered entries (Roman numerals) separated by hairlines.
- **No animations, no gradients, no shadows, no emojis.** The `.pledge` box is a plain bordered card; `.btn-quiet` is an outlined button that inverts on hover.
- `body{overflow-x:hidden}` guards mobile.
- Old `oasis.css` (pulsating CTAs, momentum tracks) belongs to the dead business — never bring it back to index.

---

## Writing Voice (for any copy on the site)

- Spanish. Short sentences. Aphoristic where natural.
- Claims stay literally true. No income promises, no titles Ivan hasn't claimed himself.
- The reader is never chased: "si lo necesitas, lo vas a encontrar."
- Signature closes like: *"Lee. O no. La verdad no tiene prisa."*

---

## Confirmed URLs

| Thing | URL | Status |
|---|---|---|
| Domain | https://www.ivanro.com | live |
| Newsletter (Discursos) | https://ivanrob.substack.com | linked |
| Book (Quema Tu Dinero) | https://www.amazon.com/dp/B0DG4YMW9Q | linked |
| Aporte (Mercado Pago) | https://mpago.li/19y5U1L | linked — Ivan re-prices on the backend |
| YouTube | https://www.youtube.com/@soyivanrobayo | linked |
| Instagram | https://www.instagram.com/ivan.remoto | exists, NOT linked (Ivan deciding) |
| Skool (old community) | https://www.skool.com/la-verdad-by-kronos-4939/about | retired from site |
| WhatsApp | https://wa.me/573193620926 | retired from site |

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected.
