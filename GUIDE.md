# hijodelgenesis - Website Guide

## Overview

Your website has been transformed into a bold, bilingual digital legacy platform with a Basquiat-inspired brutalist aesthetic. This guide will help you understand and maintain your new site.

## Project Structure

```
hijodelgenesis/
├── index.html              # Home page with hero section
├── bio.html               # Biography page
├── writings.html          # Blog/writings listing page
├── gallery.html           # AI art gallery page
│
├── css/
│   ├── core.css          # Base styles and CSS variables
│   ├── basquiat.css      # Brutalist aesthetic & hero styles
│   ├── typography.css    # Bold typography system
│   ├── navigation.css    # Navigation component styles
│   ├── components.css    # Reusable components (cards, lightbox, etc.)
│   └── responsive.css    # Mobile and tablet styles
│
├── js/
│   ├── i18n.js          # Bilingual translation engine
│   ├── navigation.js    # Navigation loading and behavior
│   ├── animations.js    # Scroll animations and effects
│   ├── writings-loader.js    # Dynamic blog post loading
│   └── gallery-loader.js     # Dynamic gallery loading
│
├── data/
│   ├── translations.json    # All Spanish/English translations
│   ├── writings.json       # Blog posts metadata
│   └── gallery.json        # AI art metadata
│
├── writings/
│   └── template.html      # Template for new blog posts
│
├── assets/
│   └── images/
│       └── ai-gallery/    # Store AI-generated art images here
│
└── components/
    └── nav.html          # Shared navigation HTML
```

## Design Philosophy

### Brutalist Aesthetic (Basquiat-Inspired)
- **Dark backgrounds**: Deep blacks (#0a0a0a) create dramatic contrast
- **Aggressive accents**: Electric crimson (#ff0040) and raw yellow (#ffff00)
- **Bold typography**: Anton, Bebas Neue for headings; Space Mono for body
- **High contrast**: Sharp edges, no gradients, pure colors
- **Raw energy**: Offset shadows, glitch effects, brutalist layouts

### Color Palette
- `--void-black`: #0a0a0a (primary background)
- `--electric-crimson`: #ff0040 (primary accent)
- `--raw-yellow`: #ffff00 (Basquiat signature yellow)
- `--neon-cyan`: #00ffff (links and interactive elements)
- `--toxic-green`: #39ff14 (call-to-action)
- `--bone-white`: #f5f5f5 (main text)

## How to Use

### 1. Adding a New Blog Post

1. **Create the HTML file**:
   ```bash
   cp writings/template.html writings/2026-01-05-my-new-post.html
   ```

2. **Edit the file**: Replace placeholder content with your writing in both Spanish and English

3. **Add metadata to `data/writings.json`**:
   ```json
   {
     "posts": [
       {
         "id": "2026-01-05-my-new-post",
         "title_es": "Mi Nuevo Post",
         "title_en": "My New Post",
         "slug": "2026-01-05-my-new-post",
         "date": "2026-01-05",
         "excerpt_es": "Un breve extracto en español...",
         "excerpt_en": "A brief excerpt in English...",
         "url": "/writings/2026-01-05-my-new-post.html",
         "tags": ["filosofía", "arte", "IA"]
       }
     ]
   }
   ```

### 2. Adding AI-Generated Art

1. **Save your image**: Place it in `assets/images/ai-gallery/` (e.g., `piece-004.jpg`)

2. **Add metadata to `data/gallery.json`**:
   ```json
   {
     "pieces": [
       {
         "id": "piece-004",
         "filename": "piece-004.jpg",
         "title_es": "Consciencia Digital",
         "title_en": "Digital Consciousness",
         "description_es": "Exploración de la mente artificial...",
         "description_en": "Exploration of artificial mind...",
         "date": "2026-01-05",
         "tags": ["consciencia", "IA", "arte"]
       }
     ]
   }
   ```

### 3. Updating Content

All text content is managed through `data/translations.json`. Edit this file to change any text across the site.

Example:
```json
{
  "es": {
    "home": {
      "hero_subtitle": "Tu nuevo subtítulo aquí"
    }
  },
  "en": {
    "home": {
      "hero_subtitle": "Your new subtitle here"
    }
  }
}
```

### 4. Bilingual System

The site defaults to **Spanish** and includes a language toggle in the navigation.

- Language preference is saved in localStorage
- All text uses `data-i18n` attributes for automatic translation
- Language-specific content uses `data-lang` attributes

## Key Features

### ✅ Fully Bilingual (Spanish/English)
- Instant language switching without page reload
- Language preference persists across sessions

### ✅ Responsive Design
- Mobile-first approach
- Optimized for phones, tablets, and desktops
- Touch-friendly interactions

### ✅ Dynamic Content Loading
- Blog posts loaded from JSON
- Gallery images loaded dynamically
- Easy to add new content without touching HTML

### ✅ Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus management for modals
- Semantic HTML structure

### ✅ Performance
- Lazy loading for images
- Minimal JavaScript
- No framework overhead
- Pure CSS animations

## Viewing Your Site

To view your site locally, you need a local web server (because of JavaScript module loading):

### Option 1: Using Python
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Option 2: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run
http-server

# Then visit: http://localhost:8080
```

### Option 3: Using VS Code
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Deployment

This site is pure static HTML/CSS/JS and can be hosted anywhere:

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Drag and drop deployment
- **Vercel**: Simple static hosting
- **Any web server**: Just upload the files

## Customization Tips

### Changing Colors
Edit `css/core.css` and modify the CSS variables in `:root`

### Adding New Pages
1. Copy an existing page (e.g., `bio.html`)
2. Update content
3. Add link in `components/nav.html`
4. Add translations in `data/translations.json`

### Modifying Typography
Edit `css/typography.css` to change fonts, sizes, or styles

## Maintenance

### Regular Tasks
- ✅ Keep `writings.json` and `gallery.json` updated with new content
- ✅ Optimize images before adding to gallery (recommended: < 500KB)
- ✅ Update translations when adding new content
- ✅ Test on mobile devices regularly

### Best Practices
- Always provide both Spanish and English versions
- Keep image filenames simple (no spaces)
- Use descriptive tags for writings and gallery
- Maintain chronological order (newest first) in JSON files

## Support

This site requires no dependencies, no build process, and no framework updates. It's built to last.

For questions or modifications, refer to the inline comments in each file.

---

**Your legacy. Your voice. Your future.**
