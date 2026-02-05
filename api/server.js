/**
 * Villano.ai Backend API
 * Handles Mercado Pago payments, Supabase integration, email delivery
 */

const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// SUPABASE CLIENT (service role for backend)
// ============================================
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

if (!supabase) {
  console.warn('⚠️  Supabase not configured - database features disabled');
}

// ============================================
// EMAIL SERVICE
// ============================================
const { sendProductEmail } = require('./email');

// ============================================
// MIDDLEWARE
// ============================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts for MercadoPago
  crossOriginEmbedderPolicy: false
}));

// CORS - restrict in production
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.BASE_URL, 'https://villano.ai']
    : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// JSON body parser
app.use(express.json());

// Serve static files from parent directory
app.use(express.static('../'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute for sensitive endpoints
  message: { error: 'Rate limit exceeded.' }
});

app.use('/api/', limiter);

// ============================================
// CONFIGURE MERCADO PAGO
// ============================================
if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
  });
}

// ============================================
// ROUTES
// ============================================

/**
 * POST /api/leads
 * Capture email leads
 */
app.post('/api/leads', strictLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@') || email.length > 255) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!supabase) {
      console.log('[Leads] Would capture:', cleanEmail);
      return res.json({ success: true });
    }

    const { error } = await supabase
      .from('leads')
      .insert({
        email: cleanEmail,
        source: 'api',
        ip_address: req.ip || req.connection.remoteAddress,
        user_agent: req.get('User-Agent')
      });

    if (error) {
      // Duplicate email is not an error for the user
      if (error.code === '23505') {
        return res.json({ success: true, duplicate: true });
      }
      console.error('[Leads] Insert error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('[Leads] Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/track
 * Track analytics events (fire-and-forget)
 */
app.post('/api/track', async (req, res) => {
  // Respond immediately
  res.json({ success: true });

  // Insert async
  if (!supabase) return;

  const { event_type, session_id, metadata } = req.body;

  if (!event_type) return;

  try {
    await supabase.from('events').insert({
      event_type,
      session_id: session_id || null,
      metadata: metadata || {}
    });
  } catch (err) {
    console.error('[Track] Insert error:', err);
  }
});

/**
 * POST /api/create-preference
 * Create Mercado Pago payment preference
 */
app.post('/api/create-preference', strictLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    // Product config
    const product = {
      title: 'El Metodo Villano - Acceso Completo',
      description: 'PDF + Framework de Bots + Plantillas + Guia de Implementacion',
      price: 29.00,
      currency: 'USD'
    };

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const externalRef = `villano_${Date.now()}_${email ? email.replace('@', '_at_') : 'anon'}`;

    const preference = {
      items: [{
        title: product.title,
        description: product.description,
        picture_url: `${baseUrl}/assets/product-image.jpg`,
        category_id: 'digital_content',
        quantity: 1,
        currency_id: product.currency,
        unit_price: product.price
      }],
      payer: email ? { email: email } : undefined,
      back_urls: {
        success: `${baseUrl}/gracias.html`,
        failure: `${baseUrl}/error.html`,
        pending: `${baseUrl}/pendiente.html`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12
      },
      notification_url: `${baseUrl}/api/webhook`,
      statement_descriptor: 'VILLANO.AI',
      external_reference: externalRef,
      expires: false
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      id: response.body.id,
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error('[Preference] Error:', error);
    res.status(500).json({
      error: 'Error creating payment preference',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/webhook
 * Handle Mercado Pago payment notifications
 */
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    // Only process payment notifications
    if (type !== 'payment') {
      return res.sendStatus(200);
    }

    const paymentId = data.id;

    // Get payment details from MercadoPago
    const payment = await mercadopago.payment.findById(paymentId);
    const paymentData = payment.body;

    const status = paymentData.status;
    const email = paymentData.payer?.email;
    const name = paymentData.payer?.first_name;
    const externalRef = paymentData.external_reference;

    console.log(`[Webhook] Payment ${paymentId}: ${status}`);

    // Store in Supabase
    if (supabase) {
      const { error } = await supabase.from('purchases').insert({
        email: email || 'unknown',
        name: name || null,
        mercadopago_payment_id: String(paymentId),
        mercadopago_status: status,
        amount: paymentData.transaction_amount,
        currency: paymentData.currency_id,
        product: 'metodo-villano',
        delivered: false,
        raw_webhook: paymentData
      });

      if (error && error.code !== '23505') {
        console.error('[Webhook] Supabase insert error:', error);
      }

      // Mark lead as converted
      if (email) {
        await supabase
          .from('leads')
          .update({ converted: true })
          .eq('email', email.toLowerCase());
      }
    }

    // Handle approved payments
    if (status === 'approved' && email) {
      console.log(`✅ Payment approved for ${email}`);

      try {
        await sendProductEmail(email, name);

        // Mark as delivered
        if (supabase) {
          await supabase
            .from('purchases')
            .update({ delivered: true, delivered_at: new Date().toISOString() })
            .eq('mercadopago_payment_id', String(paymentId));
        }

        console.log(`📧 Product delivered to ${email}`);
      } catch (emailErr) {
        console.error('[Webhook] Email delivery failed:', emailErr);
        // Don't fail the webhook - payment is still valid
      }
    } else if (status === 'rejected') {
      console.log(`❌ Payment rejected: ${externalRef}`);
    } else if (status === 'pending') {
      console.log(`⏳ Payment pending: ${externalRef}`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('[Webhook] Error:', error);
    res.sendStatus(500);
  }
});

/**
 * GET /api/health
 * Health check endpoint with DB connectivity
 */
app.get('/api/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      mercadopago: !!process.env.MERCADOPAGO_ACCESS_TOKEN,
      supabase: false,
      email: !!process.env.RESEND_API_KEY
    }
  };

  // Test Supabase connectivity
  if (supabase) {
    try {
      const { error } = await supabase.from('events').select('id').limit(1);
      health.services.supabase = !error;
    } catch {
      health.services.supabase = false;
    }
  }

  res.json(health);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`🚀 Villano.ai API running on port ${PORT}`);
  console.log(`📝 Mercado Pago: ${process.env.MERCADOPAGO_ACCESS_TOKEN ? 'Configured' : 'Not configured'}`);
  console.log(`📊 Supabase: ${supabase ? 'Configured' : 'Not configured'}`);
  console.log(`📧 Email: ${process.env.RESEND_API_KEY ? 'Configured' : 'Not configured'}`);
});
