/**
 * Villano.ai Backend API
 * Handles Mercado Pago payment processing
 */

const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../')); // Serve static files from parent directory

// Configure Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

/**
 * Create Payment Preference
 * This endpoint creates a payment preference in Mercado Pago
 * and returns the checkout URL
 */
app.post('/api/create-preference', async (req, res) => {
  try {
    const { product, price, currency } = req.body;

    // Create preference
    const preference = {
      items: [
        {
          title: 'El Manual del Villano - Acceso Completo',
          description: 'PDF + Mapas Mentales + Audios Narrados + Guía de Implementación',
          picture_url: 'https://villano.ai/assets/product-image.jpg', // Actualiza con tu URL
          category_id: 'digital_content',
          quantity: 1,
          currency_id: currency || 'USD',
          unit_price: parseFloat(price) || 147.00
        }
      ],
      back_urls: {
        success: `${process.env.BASE_URL || 'http://localhost:3000'}/gracias.html`,
        failure: `${process.env.BASE_URL || 'http://localhost:3000'}/error.html`,
        pending: `${process.env.BASE_URL || 'http://localhost:3000'}/pendiente.html`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12 // Hasta 12 cuotas sin interés
      },
      notification_url: `${process.env.BASE_URL || 'http://localhost:3000'}/api/webhook`,
      statement_descriptor: 'VILLANO.AI',
      external_reference: `villano_${Date.now()}`,
      expires: false
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      id: response.body.id,
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({
      error: 'Error creating payment preference',
      details: error.message
    });
  }
});

/**
 * Webhook for payment notifications
 * Mercado Pago will send POST requests here when payment status changes
 */
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    // Only process payment notifications
    if (type === 'payment') {
      const paymentId = data.id;

      // Get payment details
      const payment = await mercadopago.payment.findById(paymentId);
      const status = payment.body.status;
      const externalReference = payment.body.external_reference;

      console.log(`Payment ${paymentId} status: ${status}`);

      // Handle payment status
      if (status === 'approved') {
        // Payment approved - Send product to customer
        console.log('✅ Payment approved:', externalReference);

        // TODO: Send email with download links
        await sendProductToCustomer(payment.body);
      } else if (status === 'rejected') {
        console.log('❌ Payment rejected:', externalReference);
      } else if (status === 'pending') {
        console.log('⏳ Payment pending:', externalReference);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.sendStatus(500);
  }
});

/**
 * Send product to customer after successful payment
 */
async function sendProductToCustomer(paymentData) {
  const customerEmail = paymentData.payer.email;
  const customerName = paymentData.payer.first_name;

  console.log(`Sending product to ${customerEmail}`);

  // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
  // Send email with:
  // - Download link for PDF
  // - Download link for Mind Maps
  // - Download link for Audio files
  // - Access instructions

  /**
   * Ejemplo de email:
   *
   * Asunto: ¡Tu acceso al Manual del Villano está listo! 🔥
   *
   * Hola {customerName},
   *
   * Tu pago ha sido confirmado. Aquí está tu acceso completo:
   *
   * 📕 Descargar PDF: [link]
   * 🧠 Descargar Mapas Mentales: [link]
   * 🎧 Descargar Audios: [link]
   *
   * Garantía de 7 días: Si no estás satisfecho, responde este email
   * y te devolvemos tu dinero.
   *
   * ¡Empieza tu transformación ahora!
   *
   * - Villano.ai
   */
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Villano.ai API running on port ${PORT}`);
  console.log(`📝 Mercado Pago configured: ${process.env.MERCADOPAGO_ACCESS_TOKEN ? 'Yes' : 'No'}`);
});
