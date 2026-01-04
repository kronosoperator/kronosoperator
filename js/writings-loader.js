/* ============================================
   WRITINGS-LOADER.JS
   Dynamic blog post loading from JSON
   ============================================ */

/**
 * Load and display writings from JSON
 */
async function loadWritings() {
  try {
    const response = await fetch('/data/writings.json');
    if (!response.ok) {
      throw new Error('Failed to load writings');
    }

    const data = await response.json();
    const grid = document.getElementById('writings-grid');

    // Get current language
    const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'es';

    // Check if there are posts
    if (!data.posts || data.posts.length === 0) {
      // Keep the "no posts" message
      return;
    }

    // Clear the grid
    grid.innerHTML = '';

    // Sort by date (newest first)
    const sortedPosts = data.posts.sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    // Create cards for each post
    sortedPosts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'writing-card';

      const title = currentLang === 'es' ? post.title_es : post.title_en;
      const excerpt = currentLang === 'es' ? post.excerpt_es : post.excerpt_en;

      card.innerHTML = `
        <div class="writing-date">${formatDate(post.date, currentLang)}</div>
        <h2 class="writing-title">
          <a href="${post.url}">${title}</a>
        </h2>
        <p class="writing-excerpt">${excerpt}</p>
        <div class="writing-tags">
          ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
        <a href="${post.url}" class="read-more" data-i18n="writings.read_more">
          Leer más →
        </a>
      `;

      grid.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading writings:', error);
  }
}

/**
 * Format date for display
 */
function formatDate(dateString, lang) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
}

// Load writings on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadWritings);
} else {
  loadWritings();
}

// Reload writings when language changes
window.addEventListener('languageChanged', loadWritings);
