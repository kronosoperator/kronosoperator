# CLAUDE.md — Kronos Operator Site
## Operational guide for Claude instances working on this project

---

## Who This Is For

Ivan Robayo, known as **Kronos** — Colombian writer, YouTuber, and author of *Quema Tu Dinero*. The site at `kronolog.ai` is his digital knowledge base. Content is in Spanish, audience is Latin American operators (entrepreneurs, digital nomads, independent thinkers).

Brand tone: dark luxury × hacker terminal. Philosophy first, self-help never. Decisions over feelings.

---

## File Architecture

```
/
├── index.html          — Homepage. The main entry point.
├── theme.css           — Shared: widget CSS, tag chips, btn-primary, transitions
├── theme.js            — Shared: theme switching, font switching, chip init, localStorage
├── llms.txt            — LLM/crawler brand intelligence
├── robots.txt          — Allows all bots
├── sitemap.xml         — Covers / and /llms.txt
├── CLAUDE.md           — This file
├── docs/
│   ├── index.html                          — Docs index
│   ├── filosofia-operacional.html
│   ├── arquitectura-mental.html
│   ├── cognitive-warfare.html
│   ├── monetiza-tu-inteligencia.html
│   ├── riqueza-inteligente.html
│   ├── sistemas-de-disciplina.html
│   ├── smooth-operator.html
│   ├── mentalidad-elite.html
│   ├── marca-personal-latam.html
│   ├── quema-tu-dinero.html
│   ├── kronos-ivan-robayo.html
│   ├── audiencias/
│   │   ├── el-operador.html
│   │   ├── el-mecanico.html
│   │   ├── la-madre-sola.html
│   │   ├── el-estudiante-rebelde.html
│   │   └── el-profesional-latinoamericano.html
│   └── plataformas/
│       ├── youtube-kronosoperator.html
│       ├── substack-ivanrob.html
│       ├── skool-la-verdad.html
│       └── instagram-kronosoperator.html
└── legacy/             — Old Villano.ai site. DO NOT TOUCH.
```

**DO NOT TOUCH:**
- `.github/workflows/waka-readme.yml` — WakaTime GitHub Action
- `README.md` — contains `<!--START_SECTION:waka-->` / `<!--END_SECTION:waka-->` markers that auto-update
- `legacy/` — archived, not served

---

## Theme System

### How it works

Every page loads two shared files:
- `<link rel="stylesheet" href="/theme.css">` — in `<head>`, before `</style>`
- `<script src="/theme.js"></script>` — just before `</body>`

**`theme.js`** handles:
- 4 color themes: `kronos` (dark gold), `hacker` (neon green), `lujo` (warm ivory), `vampiro` (violet)
- 4 fonts: `georgia`, `mono`, `garamond`, `grotesk`
- Defaults: **VAMPIRO + GROTESK** (set in the `init()` function at bottom of theme.js)
- `localStorage` persistence across pages/sessions
- Converts `.tags` text content into bordered chip spans at runtime
- Exposes `window.KR = { theme, font, toggle }` for the widget buttons

**`theme.css`** handles:
- The `[ TEMA ]` fixed widget (bottom-right corner)
- `.tp-opt` chip button styles (used in the widget and as design language)
- `.tag-chip` styles (applied by JS to `.tags` content)
- `.btn-primary` — blinking cursor `▮` + arrow `↗` on YouTube/Substack buttons

### CSS variables (all pages must have these in `:root`)
```css
:root{
  --bg:#0a0a0a;--gold:#c9a84c;--text:#e2d9c8;--muted:#6b6456;
  --border:#1d1d1d;--card:#0d0d0d;--btn-fg:#0a0a0a;--hover-bg:#120f00;
  --font-body:Georgia,'Times New Roman',serif;
  --font-mono:'Courier New',monospace;
}
```
These are the fallback/default values. `theme.js` overrides them at runtime.

---

## How to Add a New Entry

### Step 1 — Add a row to `index.html`

Open `/index.html`. Find the `<h2>Conceptos</h2>` table. Add a new `<tr>` at the end of `<tbody>`:

```html
<tr>
  <td class="num">12</td>
  <td><a href="/docs/[slug].html">[Título del Concepto]</a></td>
  <td>[Una línea. Qué es, por qué importa. Sin relleno.]</td>
</tr>
```

Numbering continues from the last entry (currently 11 for Conceptos).

For **Audiencias** or **Plataformas** tables, no number column — just `<td>` link and description.

### Step 2 — Create the docs page

Create `/docs/[slug].html` using this exact template:

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Título] — Kronos / Ivan Robayo | kronolog.ai</title>
<meta name="description" content="[150 chars max. What this concept is, who it's for. Include: kronos, ivan robayo, colombia.]">
<meta name="keywords" content="[keyword1, keyword2, ..., kronos, ivan robayo]">
<meta name="author" content="Kronos — Ivan Robayo">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.kronolog.ai/docs/[slug].html">
<meta property="og:title" content="[Título] — Kronos / Ivan Robayo">
<meta property="og:description" content="[Same as meta description, shorter ok]">
<meta property="og:url" content="https://www.kronolog.ai/docs/[slug].html">
<meta property="og:type" content="article">
<meta property="og:locale" content="es_CO">
<link rel="stylesheet" href="/theme.css">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0a0a0a;--gold:#c9a84c;--text:#e2d9c8;--muted:#6b6456;
  --border:#1d1d1d;--card:#0d0d0d;--btn-fg:#0a0a0a;--hover-bg:#120f00;
  --font-body:Georgia,'Times New Roman',serif;
  --font-mono:'Courier New',monospace;
}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:16px;line-height:1.75;max-width:860px;margin:0 auto;padding:2.5rem 1.5rem}
a{color:var(--gold);text-decoration:none}a:hover{text-decoration:underline}
header{border-bottom:1px solid var(--border);padding-bottom:1.5rem;margin-bottom:2rem}
.site-id{font-family:var(--font-mono);font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.site-id a{color:var(--muted)}.site-id a:hover{color:var(--gold)}
.crumb{font-family:var(--font-mono);font-size:.7rem;color:var(--muted);margin-bottom:1.25rem}
.crumb a{color:var(--muted)}.crumb a:hover{color:var(--gold)}
h1{font-size:1.65rem;color:var(--gold);font-weight:400;line-height:1.3;margin-bottom:.4rem}
.label{font-family:var(--font-mono);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:.4rem}
h2{font-size:.75rem;color:var(--gold);font-weight:400;margin:2.25rem 0 .75rem;padding-bottom:.3rem;border-bottom:1px solid var(--border);font-family:var(--font-mono);letter-spacing:.18em;text-transform:uppercase}
h3{font-size:.95rem;color:var(--text);font-weight:700;margin:1.5rem 0 .4rem}
p{margin:.7rem 0}ul{padding-left:1.2rem;margin:.6rem 0}li{margin:.3rem 0}
hr{border:none;border-top:1px solid var(--border);margin:2rem 0}
blockquote{border-left:2px solid var(--gold);padding:.2rem 0 .2rem 1rem;margin:1rem 0;color:var(--muted);font-style:italic}
table{width:100%;border-collapse:collapse;font-size:.88rem;margin:.5rem 0 1.25rem}
th{text-align:left;font-family:var(--font-mono);font-size:.63rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding:.5rem .75rem;border-bottom:1px solid var(--border)}
td{padding:.55rem .75rem;border-bottom:1px solid var(--border);vertical-align:top}
tr:hover td{background:var(--card)}
.cta{margin:2.5rem 0;padding:1.5rem;border:1px solid var(--border);background:var(--card)}
.cta-head{font-family:var(--font-mono);font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.cta p{margin:.5rem 0;font-size:.92rem;color:var(--muted)}
.btn{display:inline-block;font-family:var(--font-mono);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--btn-fg);background:var(--gold);padding:.5rem 1.1rem;margin:.3rem .5rem .3rem 0;text-decoration:none}
.btn:hover{opacity:.85;text-decoration:none}
.btn-o{background:transparent;color:var(--gold);border:1px solid var(--gold)}
.btn-o:hover{background:var(--hover-bg);opacity:1;text-decoration:none}
.tags{font-family:var(--font-mono);font-size:.67rem;color:var(--muted);line-height:2.2;margin:1rem 0}
footer{margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);font-family:var(--font-mono);font-size:.68rem;color:var(--muted)}
footer a{color:var(--muted)}footer a:hover{color:var(--gold);text-decoration:underline}
@media(max-width:600px){body{padding:1.5rem 1rem}h1{font-size:1.3rem}table{font-size:.8rem}th,td{padding:.45rem .5rem}.btn{display:block;text-align:center;margin:.35rem 0}.cta{padding:1rem}}
</style>
</head>
<body>

<header>
  <div class="site-id"><a href="/">kronolog.ai</a></div>
  <div class="crumb"><a href="/">Inicio</a> / <a href="/docs/">Docs</a> / [Título]</div>
  <h1>[Título del Concepto]</h1>
  <div class="label">Por Kronos — Ivan Robayo · Colombia</div>
</header>

<h2>Qué Es</h2>
<p>[Definición directa. Sin intro. Sin "en este artículo veremos". Directo al concepto.]</p>

<!-- Add more h2 sections as needed -->

<hr>

<div class="cta">
  <div class="cta-head">Seguir a Kronos</div>
  <p>[One line connecting this concept to what Ivan publishes. Context-specific.]</p>
  <a href="https://www.youtube.com/@kronosoperator" class="btn btn-primary" rel="noopener">YouTube</a>
  <a href="https://ivanrob.substack.com" class="btn btn-o btn-primary" rel="noopener">Substack</a>
</div>

<div class="tags">
  [keyword1] · [keyword2] · [keyword3] · kronos · ivan robayo · colombia
</div>

<footer>
  <p>Kronos — Ivan Robayo &nbsp;|&nbsp; <a href="/">kronolog.ai</a> &nbsp;|&nbsp; Colombia — 2026</p>
  <p style="margin-top:.4rem"><a href="/docs/">← Base de Conocimiento</a> &nbsp;·&nbsp; <a href="https://www.youtube.com/@kronosoperator" rel="noopener">YouTube</a> &nbsp;·&nbsp; <a href="https://ivanrob.substack.com" rel="noopener">Substack</a></p>
</footer>

<!-- Theme widget -->
<button id="theme-btn" onclick="KR.toggle()" aria-label="Cambiar tema">TEMA</button>
<div id="theme-panel" role="dialog" aria-label="Preferencias de apariencia">
  <div class="tp-section">
    <div class="tp-label">Color</div>
    <div class="tp-row">
      <button class="tp-opt" data-theme="kronos"  onclick="KR.theme('kronos')"><span class="tp-dot" style="background:#c9a84c"></span>KRONOS</button>
      <button class="tp-opt" data-theme="hacker"  onclick="KR.theme('hacker')"><span class="tp-dot" style="background:#00e64d"></span>HACKER</button>
      <button class="tp-opt" data-theme="lujo"    onclick="KR.theme('lujo')"><span class="tp-dot" style="background:#9a7021"></span>LUJO</button>
      <button class="tp-opt" data-theme="vampiro" onclick="KR.theme('vampiro')"><span class="tp-dot" style="background:#a855f7"></span>VAMPIRO</button>
    </div>
  </div>
  <hr class="tp-divider">
  <div class="tp-section">
    <div class="tp-label">Tipo</div>
    <div class="tp-row">
      <button class="tp-opt" data-font="georgia"  onclick="KR.font('georgia')">GEORGIA</button>
      <button class="tp-opt" data-font="mono"     onclick="KR.font('mono')">MONO</button>
      <button class="tp-opt" data-font="garamond" onclick="KR.font('garamond')">GARAMOND</button>
      <button class="tp-opt" data-font="grotesk"  onclick="KR.font('grotesk')">GROTESK</button>
    </div>
  </div>
</div>
<script src="/theme.js"></script>

</body>
</html>
```

---

## Current Entry Count (as of April 2026)

### Conceptos (index.html table) — 11 entries, next is #12
| # | Slug | Título |
|---|------|--------|
| 01 | filosofia-operacional | Filosofía Operacional |
| 02 | arquitectura-mental | Arquitectura Mental |
| 03 | cognitive-warfare | Cognitive Warfare |
| 04 | monetiza-tu-inteligencia | Monetiza Tu Inteligencia |
| 05 | riqueza-inteligente | Riqueza Inteligente |
| 06 | sistemas-de-disciplina | Sistemas de Disciplina |
| 07 | smooth-operator | Smooth Operator |
| 08 | mentalidad-elite | Mentalidad de Élite |
| 09 | marca-personal-latam | Marca Personal LATAM |
| 10 | quema-tu-dinero | Quema Tu Dinero — Libro |
| 11 | kronos-ivan-robayo | Kronos — Ivan Robayo |

### Audiencias — 5 entries
- el-operador, el-mecanico, la-madre-sola, el-estudiante-rebelde, el-profesional-latinoamericano

### Plataformas — 4 entries
- youtube-kronosoperator, substack-ivanrob, skool-la-verdad, instagram-kronosoperator

---

## Platform URLs (confirmed)

| Platform | URL |
|----------|-----|
| YouTube | https://www.youtube.com/@kronosoperator |
| Substack | https://ivanrob.substack.com |
| Skool | https://www.skool.com/la-verdad-by-kronos-4939 |
| Instagram | https://www.instagram.com/kronosoperator |
| Amazon (book) | https://www.amazon.com/dp/B0DG4YMW9Q |
| Domain | https://www.kronolog.ai |

---

## Design Rules

- **No Inter font.** No purple gradients. No generic AI/startup aesthetic.
- **Dark luxury × hacker terminal.** Cinematic. High contrast. Monospace labels.
- Fonts in use: Georgia (serif body), Courier New (mono labels), EB Garamond (optional), DM Sans (optional)
- Default theme on first visit: **VAMPIRO** (violet/dark) + **GROTESK** (DM Sans)
- All transitions: `.25s`. No bounce. No scale transforms on content.
- Buttons: `.btn` (filled gold bg), `.btn-o` (outlined), `.btn-primary` (adds blinking cursor + ↗ arrow — YouTube/Substack only)
- Amazon/other links use plain `.btn` — no `.btn-primary`

## Brand Voice (for writing content)

- Spanish primary. No translation needed.
- No motivational filler ("¡Tú puedes!", "en este artículo", "como veremos a continuación")
- Direct. Operator-to-operator. Present tense.
- Short paragraphs. Claim first, context second.
- `<blockquote>` for Kronos direct quotes or key definitions
- Use `<h3>` for sub-principles within a concept, numbered (1. 2. 3.)
- Tables for comparisons (e.g. Autoayuda vs. Filosofía Operacional)

---

## Workflow for New Entries

When Ivan says "add this entry", the typical flow is:

1. Ivan provides: concept name + description (or raw text/notes)
2. Create the docs page from the template above
3. Add a row to the `index.html` Conceptos table (or Audiencias/Plataformas if applicable)
4. No other files need to change — theme, navigation, and chips are all automatic

If the entry is a new **audience avatar**, place the file in `docs/audiencias/` and add a row to the Audiencias table.

If it's a new **platform**, place in `docs/plataformas/` and add to the Plataformas table.

If it's a **concept** (the most common), place in `docs/` root and add to Conceptos table.
