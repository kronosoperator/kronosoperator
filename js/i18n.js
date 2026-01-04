/* ============================================
   I18N.JS - Bilingual Translation Engine
   Client-side language switching system
   ============================================ */

class I18n {
  constructor() {
    // Default to Spanish as primary language
    this.currentLang = localStorage.getItem('lang') || 'es';
    this.translations = {};
    this.isLoaded = false;
  }

  /**
   * Load translations from JSON file
   */
  async loadTranslations() {
    try {
      const response = await fetch('/data/translations.json');
      if (!response.ok) {
        throw new Error('Failed to load translations');
      }
      this.translations = await response.json();
      this.isLoaded = true;
      this.applyTranslations();
      this.updateLangToggleText();
      return true;
    } catch (error) {
      console.error('Translation loading error:', error);
      return false;
    }
  }

  /**
   * Apply translations to all elements with data-i18n attributes
   */
  applyTranslations() {
    if (!this.isLoaded) return;

    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.getTranslation(key);
      if (text) {
        el.textContent = text;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.getTranslation(key);
      if (text) {
        el.placeholder = text;
      }
    });

    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const text = this.getTranslation(key);
      if (text) {
        el.setAttribute('aria-label', text);
      }
    });

    // Handle language-specific content visibility
    this.handleLangSpecificContent();

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
  }

  /**
   * Show/hide content based on data-lang attribute
   */
  handleLangSpecificContent() {
    document.querySelectorAll('[data-lang]').forEach(el => {
      const lang = el.getAttribute('data-lang');
      if (lang === this.currentLang) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  /**
   * Get translation by nested key (e.g., "nav.home")
   */
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value || key;
  }

  /**
   * Toggle between Spanish and English
   */
  toggleLanguage() {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', this.currentLang);
    this.applyTranslations();
    this.updateLangToggleText();

    // Dispatch custom event for other scripts to react
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { lang: this.currentLang }
    }));
  }

  /**
   * Set specific language
   */
  setLanguage(lang) {
    if (lang === 'es' || lang === 'en') {
      this.currentLang = lang;
      localStorage.setItem('lang', this.currentLang);
      this.applyTranslations();
      this.updateLangToggleText();

      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang: this.currentLang }
      }));
    }
  }

  /**
   * Update language toggle button text
   */
  updateLangToggleText() {
    const toggles = document.querySelectorAll('#lang-toggle, .lang-toggle');
    toggles.forEach(toggle => {
      const span = toggle.querySelector('span:first-child') || toggle;
      span.textContent = this.getTranslation('nav.language');
    });
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
}

// Create global instance
const i18n = new I18n();

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n.loadTranslations();
  });
} else {
  // DOM is already ready
  i18n.loadTranslations();
}

// Make i18n globally available
window.i18n = i18n;
