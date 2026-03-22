# Villano.ai — El Metodo Villano

Single-product sales page for a $29 USD copywriting + AI bots course.

## Stack

- **Frontend:** Vanilla HTML/CSS/JS (no frameworks)
- **Backend:** Node.js + Express
- **Database:** Supabase (leads, purchases, events)
- **Payments:** MercadoPago (external link)
- **Email:** Resend

## Structure

```
├── index.html          # Sales page (14 sections)
├── gracias.html        # Post-payment success
├── error.html          # Payment error
├── pendiente.html      # Payment pending
├── css/
│   ├── luxury.css      # Design system (dark luxury theme)
│   └── sales.css       # Sales page components
├── js/
│   ├── supabase.js     # Frontend Supabase client
│   ├── sales.js        # Page interactions + analytics
│   └── checkout.js     # MercadoPago redirect
├── api/
│   ├── server.js       # Express API
│   ├── email.js        # Product delivery emails
│   ├── schema.sql      # Supabase schema
│   └── package.json    # Dependencies
└── components/
    ├── nav.html        # Floating CTA (optional)
    └── footer.html     # Footer (optional)
```

## Setup

1. **Configure MercadoPago link:**
   ```js
   // js/checkout.js
   const MERCADOPAGO_LINK = 'https://mpago.la/YOUR_LINK_HERE';
   ```

2. **Configure Supabase:**
   ```js
   // js/supabase.js
   const SUPABASE_CONFIG = {
     url: 'YOUR_SUPABASE_URL',
     anonKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```

3. **Setup backend:**
   ```bash
   cd api
   cp .env.example .env
   # Edit .env with your credentials
   npm install
   npm start
   ```

4. **Run Supabase schema:**
   - Copy contents of `api/schema.sql`
   - Run in Supabase SQL editor

## Environment Variables

```env
MERCADOPAGO_ACCESS_TOKEN=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
PDF_DOWNLOAD_URL=
BASE_URL=https://villano.ai
PORT=3000
```

## Features

- Email + optional phone capture (with country code)
- Checkout opens in new window
- Analytics tracking (page views, scroll depth, CTA clicks)
- Scroll reveal animations
- Floating CTA bar
- FAQ accordion
- Luxury dark theme (champagne gold accent)

---

## Coding Stats

<!--START_SECTION:waka-->

```txt
Total Time: 402 hrs 5 mins

Dart               298 hrs 41 mins       ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⣀⣀⣀⣀⣀⣀⣀⣀   63.12 %
Other              71 hrs 6 mins         ⣿⣿⣿⣷⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   15.03 %
HTML               24 hrs 27 mins        ⣿⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   05.17 %
Swift              17 hrs 50 mins        ⣿⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   03.77 %
JavaScript         12 hrs 10 mins        ⣶⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.57 %
TypeScript         10 hrs 29 mins        ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.22 %
YAML               9 hrs 37 mins         ⣦⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   02.03 %
Groovy             6 hrs 54 mins         ⣤⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   01.46 %
JSON               4 hrs 30 mins         ⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   00.95 %
C                  3 hrs 18 mins         ⣄⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀   00.70 %
```

<!--END_SECTION:waka-->
