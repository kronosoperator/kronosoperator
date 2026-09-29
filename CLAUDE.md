# CLAUDE.md — ivanro.com
## Operational guide for Claude instances working on this project

---

## Who This Is For

**Ivan Robayo** — Colombian writer. The site is now **one single page**, radically minimal, in the voice he calls "la verdad, directa" (the truth, plainly). He writes *Quema Tu Dinero* (published, Amazon) and *El Archivo de Helios* (a sci-fi novel in progress — video on YouTube @espiritualidadivan, text on Substack). Instagram `@ivan.remoto` exists but is NOT linked on the site (Ivan's ongoing decision).

**Identity (v10, 2026-09-28 — evolves; Ivan's latest word ALWAYS overrides this file):** Ivan dropped the AI-researcher framing entirely ("I decided to keep talking about the truth, not the ai researcher thing") and asked for a **Kapil Gupta approach** — radical minimalism, stark and aphoristic, one page, no explaining. Concretely:
- **The whole site is index.html.** No nav, no separate category pages. Every other `.html` file is either a bare noindex redirect stub back to `/`, or has been deleted outright.
- **Voice reverts to the pre-Helios "la verdad" register** (see [[investigador-pivot]] history for the AI-researcher era this replaces, and the escritor-pivot lineage this echoes — v6 in the git history, `verdad.css` era). Verbatim lines that are Ivan's own established copy, reused here, not invented: *"La verdad, directa. Lo demás es ruido."* and *"La verdad no tiene prisa."*
- **Visual system stays** — Ivan explicitly said "the style that it has now is cool." Keep `helios.css`'s dark palette, JetBrains Mono, and the terminal-window hero card. Don't redesign the look, just the content/structure.
- **@historicoia (the AI-research YouTube channel) is fully removed** — no mentions anywhere on the site, in metadata, or in llms.txt. investigacion.html was deleted outright (Ivan's explicit choice, not just retired as a stub).
- ⚠️ Every previous era stays retired: no remote-career mentorship, no "Protocolo Remoto", no Skool, no Oasis, no Kronos, no "consejero personal de atletas/CEOs/celebridades" framing, **no payment gate, no aporte, no pledge mechanics, no "Escritos Secretos"/paid podcast**. Ivan asked for the *voice* of the old "la verdad" era back, not its monetization — do not reintroduce Mercado Pago links or gated content without him explicitly asking for that specifically.

**The site's structure — literally just index.html:**
- Masthead: "Ivan Robayo," nothing else.
- Hero (`.term-hero`/`.term-window`): the terminal-card visual, now holding the stark statement "La verdad, directa.<br>Lo demás es ruido." — no prompt line, no role bio, no CTA buttons inside it.
- One short section (`.verdad-list`/`.verdad-item`, numbered I/II/III like Ivan's own prior Kapil-style build): **I. Escritura** → Substack · **II. Libros** → Quema Tu Dinero (Amazon) + El Archivo de Helios (YouTube) · **III. Contacto** → navirobayo@gmail.com. Terse link lines, no persuasive paragraphs.
- Close (`.close`): "La verdad no tiene prisa."
- Footer: Substack / Amazon / YouTube links + the standard foot-note.

**Retired/removed, do not rebuild without Ivan asking exactly where he wants it:**
- **investigacion.html** — DELETED (not a stub). The @historicoia AI-research project is gone from the site entirely.
- **libros.html, sobre.html, historias.html, arte.html, revelaciones.html** — all noindex redirect stubs → `/` (avoid redirect chains; all point straight to `/`, not to each other).
- **secretos.html, programa.html** — already-retired stubs → `/`, unchanged this pivot.
- If Ivan ever asks for a dedicated Libros or Acerca de page again, ask him first whether he wants the old multi-page structure back or something new — don't assume.

**Allowed external destinations:** Substack (ivanrob.substack.com), YouTube @espiritualidadivan (El Archivo de Helios only — @historicoia is gone), Amazon (Quema Tu Dinero). **No Mercado Pago / payment links anywhere.** No Instagram for now.

**Brand tone:** Stark, direct, unexplained. Kapil Gupta register — declarative statements, no persuasion, no hedging, no "let me tell you about myself" framing. If you're tempted to add a sentence explaining *why* something is true or *why* Ivan does what he does, cut it — the whole point of this voice is that it doesn't justify itself.

**What NOT to fabricate:** Don't invent new aphorisms wholesale — reuse Ivan's own established lines where they exist (see above), and when new copy is needed keep it terse and factual rather than manufacturing a "teaching" or "philosophy" content stream he hasn't actually written. Don't reintroduce Escritos Secretos, the paid podcast, or "consejero personal" framing — none of that was asked for, only the voice/minimalism.

---

## File Architecture

```
/
├── index.html          — THE site. Masthead + terminal-hero (la verdad statement) + I/II/III link list
│                          (Escritura/Libros/Contacto) + close line + footer. No nav.
├── libros.html         — REDIRECT STUB → / (noindex). Folded into index.html.
├── sobre.html          — REDIRECT STUB → / (noindex). Folded into index.html.
├── historias.html      — REDIRECT STUB → / (noindex). Retired.
├── arte.html           — REDIRECT STUB → / (noindex). Retired.
├── revelaciones.html   — REDIRECT STUB → / (noindex). Retired.
├── secretos.html       — REDIRECT STUB → / (noindex). Retired pre-v9.
├── programa.html       — REDIRECT STUB → / (noindex). Old remote-mentorship URL. Retired.
├── helios.css          — CURRENT design system. Trimmed to only what index.html uses (masthead, term-hero,
│                          verdad-list, close, footer) — every other page is CSS-free (bare redirect HTML).
├── verdad.css          — RETIRED (the original "paper writer's blog" era). Dead file, kept for history.
├── oasis.css           — RETIRED (the pulsating-CTA sales-funnel era). Dead file. Do not use.
├── ivanro.css          — Legacy design system, docs/ pages only (unrelated archive, see below).
├── llms.txt            — AI/LLM brand intelligence — escritor identity, one-page site noted explicitly.
├── robots.txt          — Allows all bots incl. AI crawlers. Disallows /legacy/.
├── sitemap.xml         — Just the homepage + docs/ + llms.txt now (no more category-page entries).
├── CLAUDE.md           — This file.
├── README.md           — Repo readme. CONTAINS WakaTime markers — see "Do not touch".
├── CNAME               — ivanro.com
├── img/                — helios-cybele-ultimate.jpg still used as og:image only (no inline art on the
│                          page anymore — radical minimalism means no gallery/imagery in the page body).
│                          Everything else in img/ is unreferenced, left in place, not deleted.
├── docs/               — ARCHIVE: remote-career SEO guides from a much earlier era. Untouched, unrelated.
└── legacy/             — Old Villano.ai site. DO NOT TOUCH. Not served (robots disallow).
```

**DO NOT TOUCH:**
- `.github/workflows/waka-readme.yml` — WakaTime GitHub Action.
- `README.md` `<!--START_SECTION:waka-->` / `<!--END_SECTION:waka-->` markers — auto-updated by the action. Keep them and the content between them intact when editing README.
- `legacy/` — archived.

---

## How the Site Works

1. **ivanro.com/ is the entire site.** One page. No funnel, no gate, no nav — just a stark statement, three terse links, a closing line.
2. **Substack** carries the actual writing (essays if/when he publishes them, El Archivo de Helios in text).
3. **YouTube (@espiritualidadivan)** carries El Archivo de Helios in video. @historicoia is gone — don't link it, don't mention it.
4. **Amazon** carries Quema Tu Dinero.
5. **docs/** — unrelated SEO archive from the remote-career era, still online, not part of this identity.

---

## Design System (helios.css)

- **Feel:** dark, stark, one page. Same palette and font as before — Ivan said the style is "cool," this pivot only changed content/structure, not the visual system.
- Colors: bg `#0A0A0C` · bg-alt `#131317` · ink (bone white) `#ECE8E0` · ink-soft `#938D83` · line `#26252A` · accent (warm ember) `#E2A15C`.
- Type: **JetBrains Mono only**, site-wide. Ivan was firm about ONE font everywhere. Do not reintroduce a second typeface without him asking again.
- Components in use (all on index.html — nowhere else needs them): `.masthead`/`.masthead-name`, `.term-hero`/`.term-window`/`.term-bar`/`.term-dot`/`.term-body`/`.term-name` (hero card — note: no `.term-line`/`.prompt`/`.term-role` anymore, those were AI-researcher-era sub-parts and got removed with the content that used them), `.sec` (padding wrapper), `.verdad-list`/`.verdad-item`/`.verdad-num` (NEW v10 — the terse I/II/III link list), `.close`, `footer`/`.foot-links`/`.foot-note`.
- **Removed this pivot (v10) — the whole multi-page component set, since only one page exists now:** `.topnav`, `.btn`/`.btn-solid`/`.btn-group`, `.sec-tag`/`.sec h2`/`.sec-lede`, `.post`/`.post-embed`/`.post-sub`, `.page-title`, `.book`/`.book-cover`/`.book-info`, `.about`, `.wrap-wide`. If a future page needs any of these again, re-add them deliberately rather than assuming they're still there — this file no longer carries them.
- No payment/pledge components exist in this stylesheet (never did in `helios.css`).
- `body{overflow-x:hidden}` guards mobile. Verify at 375px before shipping — checked clean at time of writing.

---

## Writing Voice (for any copy on the site)

- Spanish. Stark, declarative, unexplained — Kapil Gupta register. No hedging, no "why," no persuasion.
- Claims stay literally true — El Archivo de Helios is "en curso"/"por partes," never a finished, purchasable book.
- Reuse Ivan's own established lines rather than inventing new ones when they fit: "La verdad, directa. Lo demás es ruido." (hero) and "La verdad no tiene prisa." (close) are both his verbatim prior copy from the escritor-pivot era, not fabricated for this pivot.

---

## Confirmed URLs

| Thing | URL | Status |
|---|---|---|
| Domain | https://www.ivanro.com | live, single page |
| Substack | https://ivanrob.substack.com | linked |
| YouTube (El Archivo de Helios) | https://www.youtube.com/@espiritualidadivan | linked |
| YouTube (@historicoia, AI research) | — | REMOVED v10, do not re-add |
| Book — Quema Tu Dinero | https://www.amazon.com/dp/B0DG4YMW9Q | linked |
| Contact | navirobayo@gmail.com | on the single page |
| Instagram | https://www.instagram.com/ivan.remoto | exists, NOT linked (Ivan deciding) |
| Mercado Pago / aporte links | (retired) | REMOVED — do not re-add |
| Skool / WhatsApp / old Protocolo links | (retired) | long gone, do not reintroduce |

---

## Deploy

GitHub Pages serves from `main`. Pushing to `main` deploys to ivanro.com (~1–2 min). The WakaTime cron commits to `main` periodically, so `git pull --rebase` before pushing if a push is rejected. Ivan also edits pages directly on GitHub between sessions ("Manual Update" commits) — always `git pull --rebase` and re-read a file before editing it.
