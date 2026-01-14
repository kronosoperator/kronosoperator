/**
 * Villano.ai - Mercado Pago Checkout Integration
 */

class VillanoCheckout {
  constructor() {
    this.checkoutBtns = document.querySelectorAll('.checkout-btn, #checkoutBtn');
    this.init();
  }

  init() {
    // Add click handlers to all checkout buttons
    this.checkoutBtns.forEach(btn => {
      btn.addEventListener('click', () => this.handleCheckout());
    });
  }

  async handleCheckout() {
    // Disable buttons
    this.checkoutBtns.forEach(btn => {
      btn.disabled = true;
      btn.textContent = 'Procesando...';
    });

    try {
      // Create preference and redirect to Mercado Pago
      await this.createPreference();
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.');

      // Re-enable buttons
      this.checkoutBtns.forEach(btn => {
        btn.disabled = false;
        btn.textContent = '💳 PAGAR CON MERCADO PAGO';
      });
    }
  }

  async createPreference() {
    /**
     * IMPORTANTE: Este endpoint necesita estar configurado en tu backend.
     * El backend debe crear una preferencia de Mercado Pago y devolver el init_point.
     *
     * Ejemplo de respuesta esperada:
     * {
     *   "init_point": "https://www.mercadopago.com/checkout/v1/redirect?pref_id=..."
     * }
     */

    // Por ahora, esto es un placeholder que muestra cómo debe funcionar
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: 'manual-del-villano',
        price: 147,
        currency: 'USD'
      })
    });

    if (!response.ok) {
      throw new Error('Error creating preference');
    }

    const data = await response.json();

    // Redirect to Mercado Pago checkout
    window.location.href = data.init_point;
  }
}

// Initialize checkout when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the offer page
  if (document.querySelector('.offer-page')) {
    window.villanoCheckout = new VillanoCheckout();
  }
});

/**
 * NOTA PARA IMPLEMENTACIÓN:
 *
 * Para que Mercado Pago funcione, necesitas:
 *
 * 1. Crear una cuenta de vendedor en Mercado Pago
 * 2. Obtener tus credenciales (Access Token)
 * 3. Crear un backend que maneje las preferencias de pago
 *
 * Ver el archivo api/mercadopago.js para el código del backend
 */
