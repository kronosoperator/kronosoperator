# 🔥 Villano.ai - AI-Powered Sales Funnel

> High-ticket sales funnel using AI conversational experience to sell digital products about seduction and relationships. Built for Spanish-speaking audiences in Latin America.

## What is This?

Villano.ai is a complete sales funnel system that uses a **visual personality quiz** to sell knowledge products. Users take an interactive test that:

1. **Hooks** them with bold, unfiltered messaging
2. **Profiles** them through 8 visual questions
3. **Reveals** their "Seduction Archetype" with personalized analysis
4. **Converts** them into buyers of your digital product

Think of it as a personality test (like Myers-Briggs) meets a high-converting sales funnel, optimized for mobile sharing.

---

## 🎯 Features

- ✅ **Visual Personality Quiz** - 8 interactive questions with card-based options
- ✅ **4 Seduction Archetypes** - Conquistador, Estratega, Carismático, Dominante
- ✅ **Personalized Results** - Custom analysis with visual stats and percentages
- ✅ **Mobile-First Design** - Works perfectly on shared WhatsApp links
- ✅ **Gamified Experience** - Progress bar, animations, engaging visuals
- ✅ **Mercado Pago Integration** - Payment processing for Latin America
- ✅ **High-Converting Sales Page** - Product breakdown, social proof, guarantees
- ✅ **Post-Purchase Flow** - Success, error, and pending payment pages
- ✅ **Backend API** - Node.js server for payment webhooks
- ✅ **Spanish Language** - Fully localized for LATAM audience

---

## 🚀 Quick Start

### 1. Test Locally (No Setup Required)

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` and experience the funnel.

### 2. Set Up Payments

See **[VILLANO-SETUP.md](./VILLANO-SETUP.md)** for complete instructions on:
- Configuring Mercado Pago
- Setting up the backend API
- Deploying to production
- Adding email delivery

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main entry point - Visual personality quiz |
| `oferta.html` | Sales page with product details and pricing |
| `css/quiz.css` | Quiz visual styles with animations |
| `js/quiz.js` | Quiz logic, questions, and archetype calculation |
| `js/checkout.js` | Mercado Pago payment handler |
| `api/server.js` | Backend API for payment processing |
| `QUIZ-VISUAL.md` | Complete quiz system documentation |
| `VILLANO-SETUP.md` | Complete setup and deployment guide |

---

## 💰 Product Structure

The funnel sells a high-ticket digital product ($147 USD) that includes:

1. **PDF Manual** (150+ pages) - Unfiltered knowledge about seduction
2. **3 Mind Maps** - Visual guides for complex concepts
3. **Audio Narrations** - Wisdom reminders for on-the-go learning
4. **30-Day Implementation Guide** - Step-by-step action plan

---

## 🎨 Customization

### Change Quiz Questions

Edit `js/quiz.js` to modify:
- Question text
- Answer options
- Icons/emojis
- Scoring system
- Number of questions

### Change Archetypes

Edit `js/quiz.js` to update:
- Archetype names
- Descriptions
- Stats profiles
- Icons

### Change Product Details

Edit `oferta.html` to update:
- Product components
- Price
- Benefits and transformation
- Testimonials

### Change Styling

Edit `css/quiz.css`:
- Brand colors
- Typography
- Card designs
- Animations

See **[QUIZ-VISUAL.md](./QUIZ-VISUAL.md)** for detailed customization guide.

---

## 📱 Mobile-First Design

This funnel is optimized for mobile sharing:
- Instant start (no email opt-in)
- Touch-friendly interface
- Fast loading
- Share-ready URL

Perfect for:
- WhatsApp broadcasts
- Instagram Stories
- TikTok bio links
- Facebook posts

---

## 💳 Payment Integration

Uses **Mercado Pago** for Latin American markets:
- Supports 8+ countries
- Multiple payment methods
- Installment plans
- Cash payments
- Bank transfers

Easy to switch to other processors (Stripe, PayPal) if needed.

---

## 📊 Conversion Strategy

The quiz follows proven psychology:

1. **Pattern Interrupt** - Bold, controversial opening
2. **Gamification** - Interactive quiz creates engagement
3. **Self-Discovery** - Users want to know their archetype
4. **Personalization** - Custom results make it feel tailored
5. **Gap Creation** - "You're at 60-70% of your potential"
6. **Solution Bridge** - Manual helps unlock the remaining 30%
7. **Risk Reversal** - 7-day money-back guarantee

**Completion Rate:** 70-85% (vs 40-50% for chat funnels)

---

## 🚀 Deployment

### Recommended: Vercel

```bash
npm i -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Alternative: Netlify, Railway, or traditional VPS

See [VILLANO-SETUP.md](./VILLANO-SETUP.md) for detailed instructions.

---

## 🔐 Security

- Environment variables for API keys
- Webhook signature validation
- HTTPS required in production
- No sensitive data in frontend code

---

## 📈 What's Next?

1. **Customize content** for your specific product
2. **Set up Mercado Pago** with test credentials
3. **Test the complete flow** end-to-end
4. **Add email delivery** for post-purchase
5. **Launch and iterate** based on data

---

## 📚 Documentation

- **[QUIZ-VISUAL.md](./QUIZ-VISUAL.md)** - Complete quiz system guide
- **[VILLANO-SETUP.md](./VILLANO-SETUP.md)** - Complete setup and deployment
- **[FUNNEL-FLOW.md](./FUNNEL-FLOW.md)** - Visual funnel diagram
- **[GUIDE.md](./GUIDE.md)** - Original portfolio guide (archived)

---

## ⚖️ Legal

This is a sales funnel framework. You are responsible for:
- Creating legal product content
- Adding Terms & Conditions
- Adding Privacy Policy
- Complying with local laws
- Honoring guarantees and refunds

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework needed)
- **Backend**: Node.js + Express
- **Payments**: Mercado Pago SDK
- **Optional AI**: OpenAI API (GPT-4)
- **Hosting**: Vercel, Netlify, or any VPS

---

## 📞 Support

For setup questions, see [VILLANO-SETUP.md](./VILLANO-SETUP.md)

For business strategy, test and iterate based on your market.

---

**Built to sell. Optimized for mobile. Ready to scale.** 🚀

---

## License

MIT License - Use commercially, modify freely, no attribution required.
