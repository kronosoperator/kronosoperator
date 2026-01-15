/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DONDELUKAS — DIGITAL GALLERY INTERFACE
 * A computational experience for the cybernetic individual
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // MATRIX RAIN
  // ═══════════════════════════════════════════════════════════════════════════
  class MatrixRain {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.columns = [];
      this.fontSize = 14;

      // Characters: mix of katakana, latin, numbers, symbols
      this.chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';

      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.columnCount = Math.floor(this.canvas.width / this.fontSize);

      // Initialize columns
      this.columns = [];
      for (let i = 0; i < this.columnCount; i++) {
        this.columns[i] = {
          y: Math.random() * this.canvas.height,
          speed: 0.5 + Math.random() * 1.5
        };
      }
    }

    draw() {
      // Semi-transparent black to create fade effect
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Set text style
      this.ctx.fillStyle = '#00ffff';
      this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;

      // Draw characters
      for (let i = 0; i < this.columns.length; i++) {
        const char = this.chars[Math.floor(Math.random() * this.chars.length)];
        const x = i * this.fontSize;
        const y = this.columns[i].y;

        // Varying opacity for depth
        const opacity = 0.3 + Math.random() * 0.7;
        this.ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
        this.ctx.fillText(char, x, y);

        // Move column down
        this.columns[i].y += this.fontSize * this.columns[i].speed;

        // Reset column when it goes off screen
        if (this.columns[i].y > this.canvas.height && Math.random() > 0.98) {
          this.columns[i].y = 0;
          this.columns[i].speed = 0.5 + Math.random() * 1.5;
        }
      }
    }

    start() {
      const animate = () => {
        this.draw();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CUSTOM CURSOR
  // ═══════════════════════════════════════════════════════════════════════════
  class CustomCursor {
    constructor() {
      this.cursor = document.getElementById('cursor');
      if (!this.cursor) return;

      this.cursorX = 0;
      this.cursorY = 0;
      this.targetX = 0;
      this.targetY = 0;

      this.init();
    }

    init() {
      document.addEventListener('mousemove', (e) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
      });

      // Hover effect on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .artifact, .domain-card');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
      });

      this.animate();
    }

    animate() {
      // Smooth follow with easing
      this.cursorX += (this.targetX - this.cursorX) * 0.15;
      this.cursorY += (this.targetY - this.cursorY) * 0.15;

      this.cursor.style.left = `${this.cursorX - 10}px`;
      this.cursor.style.top = `${this.cursorY - 10}px`;

      requestAnimationFrame(() => this.animate());
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SMOOTH SCROLL
  // ═══════════════════════════════════════════════════════════════════════════
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-in, .artifact, .domain-card, .protocol-step').forEach(el => {
      observer.observe(el);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTIFACT INTERACTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  function initArtifactInteractions() {
    const acquireButtons = document.querySelectorAll('.btn-acquire');

    acquireButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.dataset.product;
        const artifact = this.closest('.artifact');
        const title = artifact.querySelector('.artifact-title').textContent;
        const price = artifact.querySelector('.price-fiat').textContent;

        // Visual feedback
        this.textContent = 'PROCESANDO...';
        this.style.background = 'var(--cyan)';
        this.style.color = 'var(--void)';

        // Simulate transaction initiation
        setTimeout(() => {
          this.textContent = 'ADQUIRIR';
          this.style.background = '';
          this.style.color = '';

          // Show transaction modal (placeholder)
          showTransactionModal(productId, title, price);
        }, 1000);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSACTION MODAL
  // ═══════════════════════════════════════════════════════════════════════════
  function showTransactionModal(id, title, price) {
    // Remove existing modal
    const existing = document.querySelector('.tx-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'tx-modal';
    modal.innerHTML = `
      <div class="tx-modal-content">
        <div class="tx-header">
          <span class="tx-id">TX #${id}</span>
          <button class="tx-close">&times;</button>
        </div>
        <div class="tx-body">
          <h3 class="tx-title">${title}</h3>
          <div class="tx-price">${price}</div>
          <div class="tx-methods">
            <button class="tx-method" data-method="card">TARJETA</button>
            <button class="tx-method" data-method="btc">BTC</button>
            <button class="tx-method" data-method="eth">ETH</button>
          </div>
          <p class="tx-note">Checkout próximamente. Contactar para transacciones manuales.</p>
        </div>
      </div>
    `;

    // Add styles inline
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;

    const content = modal.querySelector('.tx-modal-content');
    content.style.cssText = `
      background: #0a0a0a;
      border: 1px solid #00ffff;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      position: relative;
    `;

    const header = modal.querySelector('.tx-header');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #2a2a2a;
    `;

    modal.querySelector('.tx-id').style.cssText = `
      font-size: 0.75rem;
      color: #00ffff;
      letter-spacing: 0.1em;
    `;

    modal.querySelector('.tx-close').style.cssText = `
      background: none;
      border: none;
      color: #606060;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    `;

    modal.querySelector('.tx-title').style.cssText = `
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      color: #ffffff;
      margin-bottom: 0.5rem;
    `;

    modal.querySelector('.tx-price').style.cssText = `
      font-size: 2rem;
      color: #00ffff;
      margin-bottom: 1.5rem;
    `;

    modal.querySelector('.tx-methods').style.cssText = `
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    `;

    modal.querySelectorAll('.tx-method').forEach(btn => {
      btn.style.cssText = `
        flex: 1;
        padding: 0.75rem;
        background: transparent;
        border: 1px solid #404040;
        color: #a0a0a0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = '#00ffff';
        btn.style.color = '#00ffff';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = '#404040';
        btn.style.color = '#a0a0a0';
      });
    });

    modal.querySelector('.tx-note').style.cssText = `
      font-size: 0.75rem;
      color: #606060;
      text-align: center;
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.tx-close').addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => modal.remove(), 300);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TERMINAL TYPING EFFECT
  // ═══════════════════════════════════════════════════════════════════════════
  function initTerminalEffect() {
    const terminal = document.querySelector('.terminal-body');
    if (!terminal) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateTerminal();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(terminal);
  }

  function animateTerminal() {
    const lines = document.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(10px)';

      setTimeout(() => {
        line.style.transition = 'all 0.3s ease';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GLITCH EFFECT ON SCROLL
  // ═══════════════════════════════════════════════════════════════════════════
  function initGlitchOnScroll() {
    const glitchElement = document.querySelector('.glitch');
    if (!glitchElement) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const intensity = Math.min(scrollY / 500, 1);

          if (intensity > 0.1) {
            glitchElement.style.setProperty('--glitch-intensity', intensity);
          }

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PARALLAX EFFECT
  // ═══════════════════════════════════════════════════════════════════════════
  function initParallax() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY < heroHeight) {
        const opacity = 1 - (scrollY / heroHeight);
        const translateY = scrollY * 0.4;

        hero.style.transform = `translateY(${translateY}px)`;
        hero.style.opacity = Math.max(opacity, 0);
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ADD FADEOUT ANIMATION
  // ═══════════════════════════════════════════════════════════════════════════
  function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      .artifact, .domain-card, .protocol-step {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .artifact.visible, .domain-card.visible, .protocol-step.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .animate-in.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ENTRY MODAL - CASINO STYLE
  // ═══════════════════════════════════════════════════════════════════════════
  function initEntryModal() {
    const modal = document.getElementById('entry-modal');
    const enterBtn = document.getElementById('enter-btn');

    if (!modal || !enterBtn) return;

    // Check if already entered this session
    if (sessionStorage.getItem('villano_entered')) {
      modal.classList.add('hidden');
      setTimeout(() => modal.remove(), 500);
      showUrgencyBar();
      return;
    }

    // Animate stats counter
    animateCounters();

    // Enter button click
    enterBtn.addEventListener('click', () => {
      sessionStorage.setItem('villano_entered', 'true');
      modal.classList.add('hidden');
      setTimeout(() => modal.remove(), 500);
      showUrgencyBar();
      startSocialProofToasts();
    });
  }

  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const start = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // URGENCY BAR
  // ═══════════════════════════════════════════════════════════════════════════
  function showUrgencyBar() {
    const bar = document.getElementById('urgency-bar');
    if (!bar) return;

    // Show after a delay
    setTimeout(() => {
      bar.classList.add('visible');
    }, 3000);

    // Update dynamic numbers
    updateUrgencyNumbers();
    setInterval(updateUrgencyNumbers, 30000); // Update every 30s
  }

  function updateUrgencyNumbers() {
    const visitorsEl = document.getElementById('visitors-count');
    const purchaseEl = document.getElementById('last-purchase');

    if (visitorsEl) {
      const visitors = Math.floor(Math.random() * 20) + 15; // 15-35
      visitorsEl.textContent = visitors;
    }

    if (purchaseEl) {
      const minutes = Math.floor(Math.random() * 10) + 1; // 1-10
      purchaseEl.textContent = `${minutes} min`;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SOCIAL PROOF TOASTS
  // ═══════════════════════════════════════════════════════════════════════════
  function startSocialProofToasts() {
    const names = ['Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofia', 'Andrés', 'Valentina'];
    const cities = ['Bogotá', 'CDMX', 'Buenos Aires', 'Lima', 'Santiago', 'Madrid', 'Barcelona', 'Medellín', 'Monterrey', 'Quito'];
    const products = ['Cash Flow para Operadores', 'DeFi Crash Course', 'Transformación del Villano', 'Seguridad On-Chain', 'Trading Bot Setup'];

    function showToast() {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const minutes = Math.floor(Math.random() * 15) + 1;

      // Remove existing toast
      const existing = document.querySelector('.social-proof-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.className = 'social-proof-toast';
      toast.innerHTML = `
        <div class="toast-content">
          <span class="toast-icon">✅</span>
          <div class="toast-info">
            <div class="toast-text"><strong>${name}</strong> de ${city} adquirió</div>
            <div class="toast-text"><strong>${product}</strong></div>
            <div class="toast-time">Hace ${minutes} minutos</div>
          </div>
        </div>
      `;

      document.body.appendChild(toast);

      // Show toast
      setTimeout(() => toast.classList.add('visible'), 100);

      // Hide toast
      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 500);
      }, 5000);
    }

    // Show first toast after 15 seconds
    setTimeout(showToast, 15000);

    // Then show every 45-90 seconds
    setInterval(showToast, Math.random() * 45000 + 45000);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FLOATING ACTION BUTTON
  // ═══════════════════════════════════════════════════════════════════════════
  function initFloatingCTA() {
    // Create FAB if it doesn't exist
    if (document.querySelector('.fab-cta')) return;

    const fab = document.createElement('a');
    fab.className = 'fab-cta';
    fab.href = 'empezar.html#transformacion';
    fab.innerHTML = '🔥';
    fab.title = 'Ver oferta exclusiva';

    document.body.appendChild(fab);

    // Show/hide based on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 500) {
        fab.style.opacity = '1';
        fab.style.pointerEvents = 'auto';
      } else {
        fab.style.opacity = '0';
        fab.style.pointerEvents = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });

    fab.style.opacity = '0';
    fab.style.pointerEvents = 'none';
    fab.style.transition = 'opacity 0.3s ease';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  function init() {
    // Add animation styles
    addAnimationStyles();

    // Initialize Matrix Rain
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
      const matrix = new MatrixRain(matrixCanvas);
      matrix.start();
    }

    // Initialize Custom Cursor (desktop only)
    if (window.innerWidth > 768) {
      new CustomCursor();
    }

    // Initialize interactions
    initSmoothScroll();
    initScrollAnimations();
    initArtifactInteractions();
    initTerminalEffect();
    initGlitchOnScroll();
    initParallax();

    // Initialize Casino/Marketing elements
    initEntryModal();
    initFloatingCTA();

    console.log('%c VILLANO.AI ', 'background: #00ffff; color: #000; font-weight: bold; padding: 4px 8px;');
    console.log('%c ¿Listo para apostar en ti mismo? ', 'color: #ff00ff;');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
