# 🔥 Villano.ai - Setup Guide

## Overview

Villano.ai is an AI-powered sales funnel designed to sell high-ticket digital products through conversational experiences. This system includes:

- **AI Conversational Funnel**: Interactive chat that profiles users and builds desire
- **Sales Page**: High-converting offer page with product details
- **Payment Processing**: Mercado Pago integration for Latin America
- **Post-Purchase Flow**: Thank you, error, and pending payment pages
- **Backend API**: Node.js server for payment processing

---

## 📁 Project Structure

```
villano.ai/
├── index.html              # AI conversational funnel (main entry point)
├── oferta.html            # Sales/offer page
├── gracias.html           # Success page (after payment)
├── error.html             # Error page (failed payment)
├── pendiente.html         # Pending payment page
│
├── css/
│   ├── villano.css        # Main styles for funnel
│   └── oferta.css         # Styles for offer page
│
├── js/
│   ├── villano-funnel.js  # Conversational funnel logic
│   └── checkout.js        # Mercado Pago checkout handler
│
├── api/
│   ├── server.js          # Backend API server
│   ├── package.json       # Node.js dependencies
│   └── .env.example       # Environment variables template
│
└── VILLANO-SETUP.md       # This file
```

---

## 🚀 Quick Start

### Step 1: Test the Funnel Locally

The conversational funnel works without any backend setup:

```bash
# Serve the site locally
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

The AI conversation flow is currently scripted (doesn't require OpenAI) and profiles users through questions.

### Step 2: Set Up Mercado Pago

1. **Create a Mercado Pago account**: https://www.mercadopago.com
2. **Get your credentials**:
   - Go to: https://www.mercadopago.com/developers/panel
   - Navigate to "Tus credenciales" (Your credentials)
   - Copy your **Access Token** (use TEST token first, then PRODUCTION)

3. **Configure the backend**:
```bash
cd api
cp .env.example .env
# Edit .env and add your Mercado Pago Access Token
```

4. **Install dependencies**:
```bash
npm install
```

5. **Start the backend server**:
```bash
npm start
```

### Step 3: Test the Complete Flow

1. Open `http://localhost:3000` in your browser
2. Go through the conversational funnel
3. Click "OBTENER ACCESO COMPLETO"
4. Click the payment button (will use Mercado Pago TEST mode)
5. Use Mercado Pago test cards: https://www.mercadopago.com/developers/en/docs/checkout-pro/additional-content/test-cards

---

## 💳 Mercado Pago Configuration

### Setting Up Your Product

The product configuration is in `api/server.js`:

```javascript
items: [
  {
    title: 'El Manual del Villano - Acceso Completo',
    description: 'PDF + Mapas Mentales + Audios Narrados + Guía de Implementación',
    quantity: 1,
    currency_id: 'USD', // or 'ARS', 'MXN', 'BRL', etc.
    unit_price: 147.00
  }
]
```

### Supported Countries & Currencies

Mercado Pago works in:
- 🇦🇷 Argentina (ARS)
- 🇧🇷 Brazil (BRL)
- 🇨🇱 Chile (CLP)
- 🇨🇴 Colombia (COP)
- 🇲🇽 Mexico (MXN)
- 🇵🇪 Peru (PEN)
- 🇺🇾 Uruguay (UYU)
- And accepts USD in most countries

### Payment Methods

Mercado Pago supports:
- Credit/Debit cards
- Bank transfers
- Cash payments (at authorized locations)
- Installment plans (up to 12 months)

---

## 🎯 Customizing the Funnel

### Modifying the Conversation Flow

Edit `js/villano-funnel.js` to customize:

1. **Initial hook** (line 28 in index.html):
```javascript
<p><strong>¿Crees que entiendes a las mujeres?</strong></p>
```

2. **Questions and responses** (in `villano-funnel.js`):
```javascript
getStage1Response() {
  return `Your custom message here`;
}
```

3. **Number of stages**: Adjust `conversationState.stage` checks

### Changing Product Details

Edit `oferta.html` to modify:
- Product components (PDF, maps, audios)
- Price
- Benefits
- Testimonials
- FAQ

### Styling

- **Colors**: Edit CSS variables in `css/villano.css`
- **Fonts**: Change Google Fonts import in HTML files
- **Layout**: Modify CSS in `css/villano.css` and `css/oferta.css`

---

## 🤖 Adding Real OpenAI Integration (Optional)

Currently, the funnel uses predefined responses. To integrate OpenAI:

1. **Get OpenAI API key**: https://platform.openai.com/api-keys

2. **Add to `.env`**:
```bash
OPENAI_API_KEY=sk-your-key-here
```

3. **Create API endpoint** in `api/server.js`:
```javascript
app.post('/api/ai-response', async (req, res) => {
  const { message, stage, profile } = req.body;

  // Call OpenAI API with context
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Eres un mentor directo y sin filtros que enseña sobre seducción...`
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  res.json({ response: completion.choices[0].message.content });
});
```

4. **Update frontend** to call the API in `js/villano-funnel.js`

---

## 📧 Setting Up Email Delivery

After successful payment, you need to send the product to customers. Options:

### Option 1: SendGrid
```bash
npm install @sendgrid/mail
```

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendProductToCustomer(paymentData) {
  const msg = {
    to: paymentData.payer.email,
    from: 'soporte@villano.ai',
    subject: '¡Tu acceso al Manual del Villano está listo! 🔥',
    html: `
      <h1>Hola ${paymentData.payer.first_name},</h1>
      <p>Tu pago ha sido confirmado. Aquí está tu acceso:</p>
      <ul>
        <li><a href="[DOWNLOAD_LINK]">Descargar PDF</a></li>
        <li><a href="[DOWNLOAD_LINK]">Descargar Mapas Mentales</a></li>
        <li><a href="[DOWNLOAD_LINK]">Descargar Audios</a></li>
      </ul>
    `
  };

  await sgMail.send(msg);
}
```

### Option 2: Mailgun
Similar setup with Mailgun SDK.

### Option 3: Manual Process
Check the webhook logs and manually email customers (not scalable).

---

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Option 2: Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm install` (in /api directory)
3. Set environment variables

### Option 3: Traditional VPS

1. Set up Node.js on your server
2. Use PM2 to keep the server running:
```bash
npm install -g pm2
pm2 start api/server.js
pm2 save
```

3. Configure nginx as reverse proxy

---

## 🔒 Security Checklist

- [ ] Never commit `.env` file (add to `.gitignore`)
- [ ] Use PRODUCTION Mercado Pago credentials in production
- [ ] Enable HTTPS (required for payment processing)
- [ ] Validate all webhook requests from Mercado Pago
- [ ] Store customer data securely (comply with privacy laws)
- [ ] Implement rate limiting on API endpoints

---

## 📊 Analytics & Tracking

Add tracking to measure funnel performance:

### Google Analytics
Add to all HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Facebook Pixel
Add before closing `</head>`:
```html
<script>
  !function(f,b,e,v,n,t,s){...}
  fbq('track', 'PageView');
</script>
```

Track conversions:
```javascript
fbq('track', 'Purchase', {value: 147.00, currency: 'USD'});
```

---

## 🎨 Branding Customization

1. **Logo**: Replace "VILLANO.ai" text with your logo image
2. **Colors**: Edit CSS variables in `css/villano.css`
3. **Copy**: All Spanish text can be edited in HTML files
4. **Domain**: Change all instances of `villano.ai` to your domain

---

## 🐛 Troubleshooting

### Payment button doesn't work
- Check that backend API is running (`http://localhost:3000/api/health`)
- Verify Mercado Pago credentials in `.env`
- Check browser console for errors

### Webhooks not working
- Ensure your server is publicly accessible
- Use ngrok for local testing: `ngrok http 3000`
- Check Mercado Pago webhook logs in their dashboard

### Emails not sending
- Verify email API credentials
- Check spam folder
- Test email service separately

---

## 📈 Next Steps

1. **Add product files**: Upload PDF, maps, and audios to secure cloud storage
2. **Test payment flow**: Use Mercado Pago test mode
3. **Set up email delivery**: Configure SendGrid or Mailgun
4. **Add analytics**: Google Analytics and Facebook Pixel
5. **Go live**: Switch to production Mercado Pago credentials
6. **Market**: Share the link on social media, WhatsApp, etc.

---

## 💰 Pricing Strategy

Current setup: $147 USD (mid-ticket)

Consider:
- **A/B test prices**: $97, $147, $197
- **Payment plans**: 3x $49 instead of $147
- **Urgency**: Limited spots, countdown timers
- **Upsells**: After purchase, offer advanced material at $297

---

## 📞 Support

For technical issues with this setup:
- Check documentation above
- Review code comments in files
- Test locally before deploying

For business/product questions:
- Customize content for your audience
- Test the funnel with real users
- Iterate based on feedback

---

## ⚖️ Legal Notes

- Ensure your content complies with local laws
- Add Terms & Conditions page
- Add Privacy Policy page
- Comply with GDPR/data protection laws if targeting EU
- Honor your 7-day money-back guarantee

---

**Your high-ticket funnel is ready. Time to launch and scale.** 🚀
