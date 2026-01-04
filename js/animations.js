/* ============================================
   ANIMATIONS.JS - Scroll Animations & Interactions
   Brutalist reveal animations and effects
   ============================================ */

/**
 * Intersection Observer for brutalist reveal animations
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('brutalist-reveal');
        // Optionally unobserve after revealing
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements that need reveal animation
  const elementsToObserve = document.querySelectorAll(
    '.section, .writing-card, .gallery-item, .bio-text, .project-card'
  );

  elementsToObserve.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Parallax effect for hero sections
 */
function initParallax() {
  const heroSections = document.querySelectorAll('.hero-brutal, .hero-background');

  if (heroSections.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    heroSections.forEach(hero => {
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  });
}

/**
 * Smooth scroll for anchor links (enhance native behavior)
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignore if href is just "#"
      if (href === '#') return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without triggering scroll
        history.pushState(null, null, href);
      }
    });
  });
}

/**
 * Add glitch effect on specific elements
 */
function initGlitchEffects() {
  const glitchElements = document.querySelectorAll('.hero-title');

  glitchElements.forEach(el => {
    // Random glitch effect on mouse enter (optional)
    el.addEventListener('mouseenter', () => {
      el.style.animation = 'none';
      setTimeout(() => {
        el.style.animation = '';
      }, 10);
    });
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  initScrollAnimations();
  initParallax();
  initSmoothScroll();
  initGlitchEffects();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
