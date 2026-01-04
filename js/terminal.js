/* ============================================
   TERMINAL.JS - Hacker Boot Sequence
   Digital Backend Access System
   ============================================ */

class TerminalBoot {
  constructor() {
    this.bootMessages = [
      'INITIALIZING IVAN.SYS...',
      'LOADING NEURAL INTERFACE...',
      'ACCESSING DIGITAL LEGACY...',
      'ESTABLISHING SECURE CONNECTION...',
      'DECRYPTING MEMORY BANKS...',
      'RENDERING PHILOSOPHICAL FRAMEWORK...',
      'WELCOME TO THE BACKEND'
    ];
    this.currentLang = localStorage.getItem('lang') || 'es';
    this.bootMessagesES = [
      'INICIALIZANDO IVAN.SYS...',
      'CARGANDO INTERFAZ NEURAL...',
      'ACCEDIENDO AL LEGADO DIGITAL...',
      'ESTABLECIENDO CONEXIÓN SEGURA...',
      'DESCIFRANDO BANCOS DE MEMORIA...',
      'RENDERIZANDO MARCO FILOSÓFICO...',
      'BIENVENIDO AL BACKEND'
    ];
  }

  async init() {
    // Only run boot sequence on first page load
    const hasBooted = sessionStorage.getItem('terminalBooted');
    if (hasBooted) {
      this.setupEffects();
      return;
    }

    await this.showBootSequence();
    sessionStorage.setItem('terminalBooted', 'true');
    this.setupEffects();
  }

  async showBootSequence() {
    // Create boot overlay
    const bootOverlay = document.createElement('div');
    bootOverlay.className = 'terminal-boot';
    document.body.appendChild(bootOverlay);

    const messages = this.currentLang === 'es' ? this.bootMessagesES : this.bootMessages;

    // Display messages one by one
    for (let i = 0; i < messages.length; i++) {
      await this.displayMessage(bootOverlay, messages[i], i);
      await this.sleep(300);
    }

    // Show loading bar
    await this.showLoadingBar(bootOverlay);
    await this.sleep(500);

    // Hide boot overlay
    bootOverlay.classList.add('hidden');
    await this.sleep(500);
    bootOverlay.remove();
  }

  async displayMessage(container, message, index) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.style.animationDelay = `${index * 0.1}s`;
    line.textContent = message;
    container.appendChild(line);
    return this.sleep(100);
  }

  async showLoadingBar(container) {
    const loadingBar = document.createElement('div');
    loadingBar.className = 'terminal-loading';
    container.appendChild(loadingBar);
    return this.sleep(2000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setupEffects() {
    // Add scanlines
    this.addScanlines();

    // Add digital noise
    this.addDigitalNoise();

    // Add screen flicker
    this.addScreenFlicker();

    // Add system status
    this.addSystemStatus();

    // Setup terminal text reveals
    this.setupTerminalReveals();

    // Add subtle glitch to title
    this.addGlitchEffect();
  }

  addScanlines() {
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
  }

  addDigitalNoise() {
    const noise = document.createElement('div');
    noise.className = 'digital-noise';
    document.body.appendChild(noise);
  }

  addScreenFlicker() {
    const flicker = document.createElement('div');
    flicker.className = 'screen-flicker';
    document.body.appendChild(flicker);
  }

  addSystemStatus() {
    const status = document.createElement('div');
    status.className = 'system-status';
    const currentTime = new Date().toISOString().split('T')[0];
    status.innerHTML = `
      <span class="status-dot"></span>
      SYSTEM ONLINE | ${currentTime}
    `;
    document.body.appendChild(status);
  }

  setupTerminalReveals() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('terminal-reveal');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section:not(.bio-hero):not(.hero-brutal)');
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  addGlitchEffect() {
    // Add subtle glitch to main title
    const heroTitle = document.querySelector('.hero-title, .bio-title');
    if (heroTitle && !heroTitle.dataset.text) {
      heroTitle.dataset.text = heroTitle.textContent;
      // Randomly apply glitch effect
      setInterval(() => {
        if (Math.random() > 0.95) {
          heroTitle.classList.add('terminal-glitch');
          setTimeout(() => {
            heroTitle.classList.remove('terminal-glitch');
          }, 300);
        }
      }, 3000);
    }
  }
}

/* ============================================
   CURSOR TRAIL EFFECT
   ============================================ */
class CursorTrail {
  constructor() {
    this.trail = null;
    this.enabled = window.innerWidth > 768; // Only on desktop
  }

  init() {
    if (!this.enabled) return;

    this.trail = document.createElement('div');
    this.trail.className = 'cursor-trail';
    document.body.appendChild(this.trail);

    document.addEventListener('mousemove', (e) => {
      this.trail.style.left = e.clientX + 'px';
      this.trail.style.top = e.clientY + 'px';
      this.trail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      this.trail.style.opacity = '0';
    });
  }
}

/* ============================================
   TYPEWRITER EFFECT FOR SPECIFIC ELEMENTS
   ============================================ */
class TypewriterEffect {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentIndex = 0;
  }

  async type() {
    this.element.textContent = '';

    for (let char of this.text) {
      this.element.textContent += char;
      await this.sleep(this.speed);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/* ============================================
   INITIALIZE ON PAGE LOAD
   ============================================ */
document.addEventListener('DOMContentLoaded', async () => {
  const terminal = new TerminalBoot();
  await terminal.init();

  const cursorTrail = new CursorTrail();
  cursorTrail.init();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TerminalBoot, TypewriterEffect, CursorTrail };
}
