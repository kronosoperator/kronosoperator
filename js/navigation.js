/* ============================================
   NAVIGATION.JS - Shared Navigation Behavior
   Loads navigation component and handles interactions
   ============================================ */

/**
 * Load navigation HTML component
 */
async function loadNavigation() {
  try {
    const response = await fetch('components/nav.html');
    if (!response.ok) {
      throw new Error('Failed to load navigation');
    }
    const navHTML = await response.text();

    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Initialize navigation features
    initializeNavigation();

    return true;
  } catch (error) {
    console.error('Navigation loading error:', error);
    return false;
  }
}

/**
 * Load footer HTML component
 */
async function loadFooter() {
  try {
    const response = await fetch('components/footer.html');
    if (!response.ok) {
      throw new Error('Failed to load footer');
    }
    const footerHTML = await response.text();

    // Find and replace existing footer, or insert before closing body
    const existingFooter = document.querySelector('.brutal-footer');
    if (existingFooter) {
      existingFooter.outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Initialize footer features (social links)
    initializeFooter();

    return true;
  } catch (error) {
    console.error('Footer loading error:', error);
    return false;
  }
}

/**
 * Initialize footer features after loading
 */
function initializeFooter() {
  // Placeholder URLs - user will update these later
  const substackLink = document.getElementById('substack-link');
  const youtubeLink = document.getElementById('youtube-link');

  // You can update these URLs later
  if (substackLink) {
    substackLink.href = 'https://substack.com/@yourusername'; // Update this URL
  }
  if (youtubeLink) {
    youtubeLink.href = 'https://youtube.com/@yourchannel'; // Update this URL
  }
}

/**
 * Initialize navigation features after loading
 */
function initializeNavigation() {
  // Highlight active page
  highlightActivePage();

  // Setup language toggle
  setupLanguageToggle();

  // Setup mobile menu
  setupMobileMenu();
}

/**
 * Highlight the current active page in navigation
 */
function highlightActivePage() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Add active class to matching link
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');

    if (linkHref && linkHref.includes(currentPage)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // Special case: if on root, activate index.html link
    if (window.location.pathname === '/' && linkHref === '/index.html') {
      link.classList.add('active');
    }
  });
}

/**
 * Setup language toggle button
 */
function setupLanguageToggle() {
  const langToggle = document.getElementById('lang-toggle');

  if (langToggle && window.i18n) {
    langToggle.addEventListener('click', () => {
      window.i18n.toggleLanguage();
    });
  }
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

      // Toggle menu
      mainNav.classList.toggle('mobile-active');
      mobileToggle.setAttribute('aria-expanded', !isExpanded);

      // Focus first link when opening
      if (!isExpanded) {
        const firstLink = mainNav.querySelector('.nav-link');
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100);
        }
      }
    });

    // Close mobile menu when clicking a link
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('mobile-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('mobile-active')) {
        mainNav.classList.remove('mobile-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    await loadNavigation();
    await loadFooter();
  });
} else {
  // DOM is already ready
  (async () => {
    await loadNavigation();
    await loadFooter();
  })();
}
