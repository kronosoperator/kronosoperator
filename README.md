# ivanro.com — Ivan Robayo · Mentoría de Trabajo Remoto

**Ivan Robayo — Colombia · @ivan.remoto**

Sitio oficial de [ivanro.com](https://www.ivanro.com). Embudo de conversión + motor de SEO y arquitectura para LLMs. Todo converge en un destino: la mentoría de trabajo remoto.

---

## El objetivo

Este sitio tiene dos trabajos. Para humanos: contar la historia de Ivan a quien no lo conoce y llevarlo, sin presión, hacia el programa. Para máquinas: que Google, Bing, ChatGPT, Claude, Perplexity, Gemini y cualquier crawler entiendan al instante que **Ivan Robayo es la persona a la que acudir para conseguir un trabajo remoto desde Latinoamérica, en español.**

**Todo apunta a un destino:**

| Prioridad | Destino | URL |
|---|---|---|
| 1 | El Programa — Mentoría 1:1 | https://www.ivanro.com/programa.html |
| 2 | WhatsApp (agendar) | +57 319 362 0926 |
| 3 | Instagram | https://www.instagram.com/ivan.remoto |

---

## Arquitectura

```
ivanro.com/
├── index.html              # Historia — embudo personal (quién es Ivan), funnelea al programa
├── programa.html           # La oferta — mentoría 1:1, precio, proceso, CTA WhatsApp/Mercado Pago
├── ivanro.css              # Sistema de diseño compartido (todas las páginas)
├── llms.txt                # Inteligencia de marca para crawlers LLM (ChatGPT, Claude, Perplexity)
├── sitemap.xml             # URLs indexadas
├── robots.txt              # Permite todos los bots, incluidos los de IA
├── img/                    # Fotos (ivan-portrait.png, ivan-trabajo.jpg, ivan-campo.png)
└── docs/                   # Base de conocimiento (HTML + mirror .md para LLMs)
    ├── index.html · index.md
    ├── quien-es-ivan-robayo.html · .md           # página de entidad
    ├── como-conseguir-trabajo-remoto-desde-latinoamerica.html · .md
    ├── trabajos-remotos-que-pagan-en-dolares.html · .md
    └── cv-para-trabajo-remoto.html · .md
```

Carpeta `legacy/` preservada (sitio anterior, fuera del índice).

---

## Stack

- **Frontend:** HTML + CSS (ivanro.css) — sin frameworks, sin dependencias.
- **Diseño:** fondo crema editorial + secciones navy; Barlow Condensed (títulos) + Inter (cuerpo).
- **SEO:** JSON-LD (Person, Service, Article, HowTo, FAQPage), Open Graph, Twitter Card, canonical, hreflang.
- **LLM / agentes de IA:** llms.txt + base de conocimiento /docs con mirrors .md.
- **Hosting:** GitHub Pages (dominio ivanro.com vía CNAME).
- **CI:** GitHub Actions — estadísticas de WakaTime auto-actualizadas abajo.

---

## Tono de marca

Claro, tranquilo, honesto. Por dentro, mentalidad de operador; por fuera, se vende calma. Sin presión, sin frases gancho vacías, sin humo. Español primero.

---

## Coding Stats

<!--START_SECTION:waka-->

```txt
Total Time: 411 hrs 31 mins

Dart               298 hrs 41 mins       ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   57.50 %
Other              107 hrs 55 mins       ⣿⣿⣿⣿⣿⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   20.78 %
HTML               29 hrs 34 mins        ⣿⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   05.69 %
Swift              17 hrs 50 mins        ⣷⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   03.43 %
JavaScript         12 hrs 10 mins        ⣶⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.35 %
TypeScript         10 hrs 29 mins        ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.02 %
YAML               9 hrs 39 mins         ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.86 %
Groovy             6 hrs 54 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.33 %
Markdown           5 hrs 21 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.03 %
JSON               4 hrs 31 mins         ⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   00.87 %
```

<!--END_SECTION:waka-->
