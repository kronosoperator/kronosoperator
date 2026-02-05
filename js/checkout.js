/**
 * Villano.ai - Checkout Integration
 * El Metodo Villano - $29 USD
 * Uses external MercadoPago link
 */

// CONFIGURE: Replace with your actual MercadoPago payment link
const MERCADOPAGO_LINK = 'https://mpago.la/YOUR_LINK_HERE';

class VillanoCheckout {
  constructor() {
    this.product = {
      name: 'El Metodo Villano',
      price: 29,
      currency: 'USD'
    };
    this.init();
  }

  init() {
    // Handle all checkout buttons
    document.querySelectorAll('.checkout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Only intercept buttons, not anchor links to sections
        if (btn.tagName === 'A' && btn.getAttribute('href')?.startsWith('#')) {
          return; // Let anchor links work normally
        }

        e.preventDefault();
        this.handleCheckout();
      });
    });

    // Specifically bind the main checkout button
    const mainBtn = document.getElementById('mainCheckoutBtn');
    if (mainBtn) {
      mainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleCheckout();
      });
    }
  }

  handleCheckout() {
    // Track checkout initiation
    if (window.SupabaseClient) {
      window.SupabaseClient.trackEvent('checkout_initiated', {
        product: this.product.name,
        price: this.product.price
      });
    }

    // Open MercadoPago link in new window/tab
    window.open(MERCADOPAGO_LINK, '_blank', 'noopener,noreferrer');
  }
}

// Initialize checkout when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.villanoCheckout = new VillanoCheckout();
});
