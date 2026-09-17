# ivanro.com — El Archivo de Helios

**Ivan Robayo — Colombia**

Sitio oficial de [ivanro.com](https://www.ivanro.com). La casa de *El Archivo de Helios*, la novela de ciencia ficción que Ivan Robayo escribe, ilustra y publica por partes.

---

## Qué es

Un hub, no una tienda. Nada se vende en el sitio: la historia se publica primero en YouTube, se refleja en texto en Substack, y aquí vive el punto de encuentro — episodios, arte conceptual y una bitácora de notas.

| Sección | Qué es | Destino |
|---|---|---|
| Inicio | Portada cinematográfica de El Archivo de Helios | ivanro.com |
| Historias | Los episodios, un video de YouTube embebido por entrada | ivanro.com |
| Arte | Galería del arte conceptual del universo | ivanro.com |
| Bitácora | Notas y fragmentos de texto, mientras escribe | ivanro.com |
| Libros | *Quema Tu Dinero* y *El Archivo de Helios* | Amazon / Historias |
| Acerca de | Quién escribe · contacto | — |

**Enlaces externos del sitio (lista completa):** [YouTube](https://www.youtube.com/@espiritualidadivan) · [Substack](https://ivanrob.substack.com) · [Amazon](https://www.amazon.com/dp/B0DG4YMW9Q). Sin pagos, sin membresías.

---

## Arquitectura

```
ivanro.com/
├── index.html              # Inicio — hero cinematográfico + galería + enlaces
├── historias.html          # Historias — episodios en video (YouTube embebido, PLANTILLA para publicar)
├── arte.html               # Arte — galería completa del universo Helios
├── revelaciones.html       # Bitácora — notas de texto (PLANTILLA para publicar, sin aporte)
├── libros.html             # Libros
├── sobre.html              # Acerca de · contacto
├── secretos.html           # Stub de redirección → /revelaciones.html (URL antigua, noindex)
├── programa.html           # Stub de redirección → / (URL antigua, noindex)
├── helios.css              # Sistema de diseño actual: oscuro, cinematográfico, una sola fuente (JetBrains Mono)
├── llms.txt                # Inteligencia de marca para crawlers LLM
├── sitemap.xml · robots.txt
├── img/                    # helios-*.jpg (arte, optimizado para web) + fotos anteriores
├── docs/                   # Archivo: guías de la etapa anterior (trabajo remoto)
└── legacy/                 # Sitio anterior, fuera del índice
```

**Publicar un episodio:** copiar el bloque `PLANTILLA` comentado en `historias.html`, pegarlo como primer `<article>`, poner el ID del video de YouTube, título y subtítulo, commit a `main`.

**Publicar una entrada de bitácora:** igual, pero en `revelaciones.html` — el bloque `PLANTILLA` admite título y uno o más párrafos de texto.

GitHub Pages despliega en ~2 minutos tras el push.

---

## Stack

- **Frontend:** HTML + CSS (helios.css) — sin frameworks, sin JavaScript de terceros, sin dependencias.
- **Diseño:** casi negro `#0A0A0C` + tinta hueso + acento ámbar; JetBrains Mono en todo el sitio — títulos, cuerpo y navegación. Dirigido por el arte conceptual de Ivan.
- **SEO / LLM:** JSON-LD (Person, CreativeWork), Open Graph, llms.txt, sitemap.
- **Hosting:** GitHub Pages (dominio ivanro.com vía CNAME).
- **CI:** GitHub Actions — estadísticas de WakaTime auto-actualizadas abajo.

---

## Tono

Directo, cinematográfico, sin presión. *"Helios preserva. Evoluciona. Trasciende."*

---

## Coding Stats

<!--START_SECTION:waka-->

```txt
Total Time: 419 hrs 21 mins

Dart               298 hrs 41 mins       ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   54.20 %
Other              131 hrs 43 mins       ⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   23.90 %
HTML               34 hrs 35 mins        ⣿⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   06.28 %
Swift              17 hrs 50 mins        ⣷⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   03.24 %
JavaScript         12 hrs 10 mins        ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.21 %
TypeScript         10 hrs 29 mins        ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.91 %
YAML               9 hrs 39 mins         ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.75 %
Markdown           7 hrs 13 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.31 %
Groovy             6 hrs 54 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.25 %
JSON               4 hrs 31 mins         ⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   00.82 %
```

<!--END_SECTION:waka-->
