# ivanro.com — Ivan Robayo · Consejero Personal & Escritor

**Ivan Robayo — Colombia**

Sitio oficial de [ivanro.com](https://www.ivanro.com). La casa de la escritura de Ivan Robayo: consejero personal de atletas profesionales, CEOs y celebridades. Versión estable.

---

## Qué es

Un sitio de escritor. Sin funnels, sin presión: papel, tinta y serif. La escritura abierta llega gratis por el newsletter; lo reservado se abre con un aporte. *"Nada aquí te va a perseguir: si lo necesitas, lo vas a encontrar."*

| Sección | Qué es | Destino |
|---|---|---|
| Discursos | El feed de escritos, el más reciente arriba | ivanro.com (home) |
| Libros | *Quema Tu Dinero* y los que vienen | Amazon |
| Escritos Secretos | Escritura reservada, por aporte individual | Mercado Pago / correo |
| Revelaciones de la Verdad | El aporte, para el individuo de élite | Mercado Pago |
| Acerca de | Quién escribe · contacto | — |

**Enlaces externos del sitio (lista completa):** [Substack](https://ivanrob.substack.com) · [Amazon](https://www.amazon.com/dp/B0DG4YMW9Q) · [YouTube](https://www.youtube.com/@soyivanrobayo) · Mercado Pago (aporte).

---

## Arquitectura

```
ivanro.com/
├── index.html              # Home = el feed de escritos (PLANTILLA en comentario para publicar vía GitHub)
├── libros.html             # Libros
├── secretos.html           # Escritos Secretos
├── revelaciones.html       # El aporte
├── sobre.html              # Acerca de · contacto
├── verdad.css              # Sistema de diseño: papel, tinta, Cormorant Garamond + Newsreader
├── programa.html           # Stub de redirección → / (URL antigua, noindex)
├── llms.txt                # Inteligencia de marca para crawlers LLM
├── sitemap.xml · robots.txt
├── img/                    # Fotos
├── docs/                   # Archivo: guías de la etapa anterior (trabajo remoto)
└── legacy/                 # Sitio anterior, fuera del índice
```

**Publicar un escrito:** copiar el bloque `PLANTILLA` comentado en `index.html`, pegarlo como primer `<article>` del feed, editar título/subtítulo/enlace, commit a `main`. GitHub Pages despliega en ~2 minutos.

---

## Stack

- **Frontend:** HTML + CSS (verdad.css) — sin frameworks, sin JavaScript, sin dependencias.
- **Diseño:** papel `#FBFAF7` + tinta; Cormorant Garamond (títulos) + Newsreader (cuerpo). Sin animaciones.
- **SEO / LLM:** JSON-LD (Person, Book), Open Graph, llms.txt, sitemap.
- **Hosting:** GitHub Pages (dominio ivanro.com vía CNAME).
- **CI:** GitHub Actions — estadísticas de WakaTime auto-actualizadas abajo.

---

## Tono

Directo, sereno, sin adornos. *"Lee. O no. La verdad no tiene prisa."*

---

## Coding Stats

<!--START_SECTION:waka-->

```txt
Total Time: 418 hrs 20 mins

Dart               298 hrs 41 mins       ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   55.95 %
Other              115 hrs 32 mins       ⣿⣿⣿⣿⣿⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   21.64 %
HTML               34 hrs 8 mins         ⣿⣶⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   06.39 %
Swift              17 hrs 50 mins        ⣷⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   03.34 %
JavaScript         12 hrs 10 mins        ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.28 %
TypeScript         10 hrs 29 mins        ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.97 %
YAML               9 hrs 39 mins         ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.81 %
Groovy             6 hrs 54 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.29 %
Markdown           6 hrs 45 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.27 %
JSON               4 hrs 31 mins         ⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   00.85 %
```

<!--END_SECTION:waka-->
