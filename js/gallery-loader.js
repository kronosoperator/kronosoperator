/* ============================================
   GALLERY-LOADER.JS
   Dynamic AI art gallery loading from JSON
   ============================================ */

let galleryData = null;

/**
 * Load and display gallery from JSON
 */
async function loadGallery() {
  try {
    const response = await fetch('/data/gallery.json');
    if (!response.ok) {
      throw new Error('Failed to load gallery');
    }

    galleryData = await response.json();
    const grid = document.getElementById('gallery-grid');

    // Get current language
    const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'es';

    // Check if there are pieces
    if (!galleryData.pieces || galleryData.pieces.length === 0) {
      // Keep the "no pieces" message
      return;
    }

    // Clear the grid
    grid.innerHTML = '';

    // Sort by date (newest first)
    const sortedPieces = galleryData.pieces.sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    // Create cards for each piece
    sortedPieces.forEach((piece, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.setAttribute('data-index', index);

      const title = currentLang === 'es' ? piece.title_es : piece.title_en;

      card.innerHTML = `
        <div class="gallery-image-wrapper">
          <img src="/assets/images/ai-gallery/${piece.filename}"
               alt="${title}"
               loading="lazy"
               class="gallery-image">
          <div class="gallery-overlay">
            <h3 class="gallery-item-title">${title}</h3>
            <p class="gallery-item-date">${formatDate(piece.date, currentLang)}</p>
          </div>
        </div>
      `;

      // Click to open lightbox
      card.addEventListener('click', () => openLightbox(index));

      grid.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading gallery:', error);
  }
}

/**
 * Open lightbox with piece details
 */
function openLightbox(index) {
  if (!galleryData || !galleryData.pieces) return;

  const sortedPieces = galleryData.pieces.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  const piece = sortedPieces[index];
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'es';

  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-image');
  const title = document.getElementById('lightbox-title');
  const description = document.getElementById('lightbox-description');
  const date = document.getElementById('lightbox-date');
  const tagsContainer = document.getElementById('lightbox-tags');

  image.src = `/assets/images/ai-gallery/${piece.filename}`;
  image.alt = currentLang === 'es' ? piece.title_es : piece.title_en;
  title.textContent = currentLang === 'es' ? piece.title_es : piece.title_en;
  description.textContent = currentLang === 'es' ? piece.description_es : piece.description_en;
  date.textContent = formatDate(piece.date, currentLang);

  tagsContainer.innerHTML = piece.tags
    .map(tag => `<span class="tag">#${tag}</span>`)
    .join('');

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/**
 * Format date for display
 */
function formatDate(dateString, lang) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
}

// Load gallery on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    setupLightbox();
  });
} else {
  loadGallery();
  setupLightbox();
}

/**
 * Setup lightbox event listeners
 */
function setupLightbox() {
  const closeButton = document.querySelector('.lightbox-close');
  const lightbox = document.getElementById('lightbox');

  if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Reload gallery when language changes
window.addEventListener('languageChanged', loadGallery);
