/**
 * Villano.ai - Sales Page Interactions
 * Floating CTA, email capture, FAQ, scroll animations, analytics
 */

(function() {
  'use strict';

  // ============================================
  // FLOATING CTA BAR - show after scrolling past hero
  // ============================================
  function initFloatingCta() {
    const cta = document.getElementById('floatingCta');
    const hero = document.getElementById('hero');
    if (!cta || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cta.classList.remove('visible');
        } else {
          cta.classList.add('visible');
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);
  }

  // ============================================
  // EMAIL CAPTURE FORM
  // ============================================
  function initEmailCapture() {
    const form = document.getElementById('emailForm');
    const input = document.getElementById('emailInput');
    const btn = document.getElementById('emailSubmitBtn');
    const successMsg = document.getElementById('emailSuccess');
    const errorMsg = document.getElementById('emailError');
    const phoneCapture = document.getElementById('phoneCapture');

    if (!form) return;

    // Store captured email for phone association
    let capturedEmail = '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = input.value.trim();
      if (!email || !email.includes('@')) return;

      // Disable button
      btn.disabled = true;
      btn.textContent = '...';

      // Hide previous messages
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      try {
        const result = await window.SupabaseClient.captureEmail(email);

        if (result.ok || result.error === 'not_configured') {
          successMsg.style.display = 'block';
          capturedEmail = email;
          input.value = '';

          // Show optional phone capture
          if (phoneCapture) {
            phoneCapture.style.display = 'block';
          }

          // Track event
          window.SupabaseClient.trackEvent('email_submit', { email_domain: email.split('@')[1] });
        } else {
          // Might be duplicate email - still show success to user
          if (result.error && result.error.includes('duplicate')) {
            successMsg.style.display = 'block';
            capturedEmail = email;
            input.value = '';
            if (phoneCapture) phoneCapture.style.display = 'block';
          } else {
            errorMsg.style.display = 'block';
          }
        }
      } catch (err) {
        errorMsg.style.display = 'block';
      }

      btn.disabled = false;
      btn.textContent = 'ENVIAR';
    });

    // Phone capture form
    const phoneForm = document.getElementById('phoneForm');
    const phoneCountry = document.getElementById('phoneCountry');
    const phoneInput = document.getElementById('phoneInput');
    const phoneBtn = document.getElementById('phoneSubmitBtn');

    if (phoneForm) {
      phoneForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const phone = phoneInput.value.trim().replace(/\D/g, '');
        if (!phone || phone.length < 7) return;

        const fullPhone = (phoneCountry.value || '+57') + phone;

        phoneBtn.disabled = true;
        phoneBtn.textContent = '...';

        try {
          await window.SupabaseClient.trackEvent('phone_submit', {
            email: capturedEmail,
            phone: fullPhone
          });

          // Hide phone form, show success
          phoneCapture.innerHTML = '<p style="color: var(--success); font-size: var(--text-sm);">WhatsApp guardado correctamente.</p>';
        } catch (err) {
          console.error('Phone capture error:', err);
        }

        phoneBtn.disabled = false;
        phoneBtn.textContent = 'GUARDAR';
      });
    }
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        items.forEach(i => i.classList.remove('active'));
        items.forEach(i => {
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });

        // Open clicked (if it was closed)
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL for anchor links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ============================================
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  // ============================================
  // SCROLL DEPTH TRACKING
  // ============================================
  function initScrollTracking() {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set();

    function checkScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      thresholds.forEach(t => {
        if (scrollPercent >= t && !tracked.has(t)) {
          tracked.add(t);
          window.SupabaseClient.trackEvent(`scroll_depth_${t}`, { percent: t });
        }
      });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // CTA CLICK TRACKING
  // ============================================
  function initCtaTracking() {
    document.querySelectorAll('.checkout-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.SupabaseClient.trackEvent('cta_click', {
          button_text: btn.textContent.trim(),
          location: btn.closest('section')?.id || 'floating'
        });
      });
    });
  }

  // ============================================
  // INITIALIZE EVERYTHING
  // ============================================
  function init() {
    initFloatingCta();
    initEmailCapture();
    initFaqAccordion();
    initSmoothScroll();
    initScrollReveal();
    initScrollTracking();
    initCtaTracking();

    // Track page view
    window.SupabaseClient.trackEvent('page_view', {
      page: window.location.pathname,
      referrer: document.referrer || 'direct'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
