/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VILLANO.AI — CREATOR v1.1
 * Generador de productos digitales estilo revista
 * Con soporte para múltiples tamaños y exportación de imagen
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  let selectedBlock = null;
  let blockCounter = 0;
  let currentSize = 'desktop';
  let isPreviewMode = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // SIZE CONFIGURATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  const sizeConfigs = {
    desktop: { width: 850, height: 'auto', label: '850 × auto px' },
    tablet: { width: 768, height: 'auto', label: '768 × auto px' },
    mobile: { width: 375, height: 667, label: '375 × 667 px' },
    story: { width: 1080, height: 1920, label: '1080 × 1920 px (9:16)' },
    square: { width: 1080, height: 1080, label: '1080 × 1080 px (1:1)' },
    post: { width: 1080, height: 1350, label: '1080 × 1350 px (4:5)' }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DOM REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  const docContainer = document.getElementById('doc-container');
  const emptyState = document.getElementById('empty-state');
  const blockControls = document.getElementById('block-controls');
  const fileInput = document.getElementById('file-input');
  const sizeInfo = document.getElementById('size-info');
  const previewBar = document.getElementById('preview-bar');

  // Config inputs
  const docTitle = document.getElementById('doc-title');
  const docSubtitle = document.getElementById('doc-subtitle');
  const docVersion = document.getElementById('doc-version');
  const docTheme = document.getElementById('doc-theme');

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOCK TEMPLATES
  // ═══════════════════════════════════════════════════════════════════════════
  const blockTemplates = {
    cover: () => `
      <div class="content-block block-cover" data-type="cover" data-id="${++blockCounter}">
        <div class="cover-tag" contenteditable="true" data-placeholder="VILLANO.AI PRESENTA">VILLANO.AI PRESENTA</div>
        <h1 class="cover-title" contenteditable="true" data-placeholder="Título del Manual">${docTitle.value || 'Manual del Villano'}</h1>
        <p class="cover-subtitle" contenteditable="true" data-placeholder="Subtítulo descriptivo">${docSubtitle.value || 'Conocimiento prohibido para la minoría'}</p>
        <div class="cover-meta" contenteditable="true" data-placeholder="Versión / Año">${docVersion.value || 'v1.0'} — ${new Date().getFullYear()}</div>
        <div class="cover-logo">VILLANO<span>.AI</span></div>
      </div>
    `,

    chapter: () => `
      <div class="content-block block-chapter" data-type="chapter" data-id="${++blockCounter}">
        <div class="chapter-number" contenteditable="true" data-placeholder="CAPÍTULO 01">CAPÍTULO 01</div>
        <h2 class="chapter-title" contenteditable="true" data-placeholder="Título del Capítulo">Título del Capítulo</h2>
        <p class="chapter-desc" contenteditable="true" data-placeholder="Descripción breve del contenido de este capítulo...">Descripción breve del contenido de este capítulo.</p>
      </div>
    `,

    text: () => `
      <div class="content-block block-text" data-type="text" data-id="${++blockCounter}">
        <div class="text-content" contenteditable="true" data-placeholder="Escribe el contenido aquí...">
          <p>Este es un bloque de texto. Puedes escribir párrafos, usar <strong>negritas</strong> y <em>cursivas</em> para dar énfasis a las ideas importantes.</p>
          <p>Los párrafos se separan automáticamente. El contenido se adapta al estilo visual del documento.</p>
        </div>
      </div>
    `,

    highlight: () => `
      <div class="content-block block-highlight" data-type="highlight" data-id="${++blockCounter}">
        <div class="highlight-content" contenteditable="true" data-placeholder="Escribe el contenido destacado...">
          Este es un bloque destacado para resaltar información importante que el lector debe recordar.
        </div>
      </div>
    `,

    list: () => `
      <div class="content-block block-list" data-type="list" data-id="${++blockCounter}">
        <div class="list-title" contenteditable="true" data-placeholder="Título de la lista">Puntos clave:</div>
        <ul class="list-items">
          <li contenteditable="true" data-placeholder="Elemento de lista">Primer elemento de la lista</li>
          <li contenteditable="true" data-placeholder="Elemento de lista">Segundo elemento de la lista</li>
          <li contenteditable="true" data-placeholder="Elemento de lista">Tercer elemento de la lista</li>
        </ul>
        <button class="add-list-item-btn" onclick="addListItem(this)">+ Añadir elemento</button>
      </div>
    `,

    terminal: () => `
      <div class="content-block block-terminal" data-type="terminal" data-id="${++blockCounter}">
        <div class="terminal-block">
          <div class="terminal-header">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-title" contenteditable="true">villano.ai — terminal</span>
          </div>
          <div class="terminal-body">
            <span class="terminal-line">
              <span class="prompt">$</span>
              <span class="command" contenteditable="true" data-placeholder="comando"> villano --help</span>
            </span>
            <span class="terminal-line">
              <span class="output" contenteditable="true" data-placeholder="output">Resultado del comando...</span>
            </span>
          </div>
        </div>
        <button class="add-terminal-line-btn" onclick="addTerminalLine(this)">+ Añadir línea</button>
      </div>
    `,

    quote: () => `
      <div class="content-block block-quote" data-type="quote" data-id="${++blockCounter}">
        <p class="quote-text" contenteditable="true" data-placeholder="Escribe la cita...">El conocimiento es poder, pero solo si se aplica.</p>
        <span class="quote-author" contenteditable="true" data-placeholder="— Autor">— VILLANO.AI</span>
      </div>
    `,

    divider: () => `
      <div class="content-block block-divider" data-type="divider" data-id="${++blockCounter}">
        <div class="divider-line"></div>
        <span class="divider-icon" contenteditable="true">◆</span>
        <div class="divider-line"></div>
      </div>
    `,

    callout: () => `
      <div class="content-block block-callout" data-type="callout" data-id="${++blockCounter}">
        <div class="callout-box">
          <div class="callout-title" contenteditable="true" data-placeholder="IMPORTANTE">⚠️ IMPORTANTE</div>
          <div class="callout-content" contenteditable="true" data-placeholder="Contenido del callout...">
            Este es un callout para advertencias o información crítica que el lector debe tener en cuenta.
          </div>
        </div>
      </div>
    `,

    image: () => `
      <div class="content-block block-image" data-type="image" data-id="${++blockCounter}">
        <div class="image-placeholder" onclick="triggerImageUpload(this)">
          <span class="image-placeholder-icon">🖼️</span>
          <span class="image-placeholder-text">Click para añadir imagen</span>
        </div>
        <p class="image-caption" contenteditable="true" data-placeholder="Pie de imagen (opcional)"></p>
        <input type="file" class="image-input" accept="image/*" style="display: none;" onchange="handleImageUpload(this)">
      </div>
    `
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  function init() {
    // Toolbar button listeners
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action && action.startsWith('add-')) {
          const type = action.replace('add-', '');
          addBlock(type);
        }
      });
    });

    // Size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        setCanvasSize(size);
      });
    });

    // Action buttons
    document.getElementById('btn-export').addEventListener('click', exportPDF);
    document.getElementById('btn-capture').addEventListener('click', captureImage);
    document.getElementById('btn-preview').addEventListener('click', enterPreview);
    document.getElementById('btn-save').addEventListener('click', saveToJSON);
    document.getElementById('btn-load').addEventListener('click', () => fileInput.click());
    document.getElementById('btn-clear').addEventListener('click', clearDocument);

    // Preview bar buttons
    document.getElementById('btn-exit-preview').addEventListener('click', exitPreview);
    document.getElementById('btn-capture-preview').addEventListener('click', captureImage);

    // File input for loading JSON
    fileInput.addEventListener('change', loadFromJSON);

    // Theme selector
    docTheme.addEventListener('change', updateTheme);

    // Block controls
    document.querySelectorAll('.block-ctrl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (selectedBlock) {
          const action = btn.dataset.action;
          handleBlockAction(action, selectedBlock);
        }
      });
    });

    // Document click to deselect
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.content-block') && !e.target.closest('.block-controls')) {
        deselectBlock();
      }
    });

    // Block selection on click
    docContainer.addEventListener('click', (e) => {
      const block = e.target.closest('.content-block');
      if (block) {
        selectBlock(block);
      }
    });

    // Show controls on block hover
    docContainer.addEventListener('mouseover', (e) => {
      const block = e.target.closest('.content-block');
      if (block && !isPreviewMode) {
        showBlockControls(block);
      }
    });

    docContainer.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget?.closest('.block-controls') &&
          !e.relatedTarget?.closest('.content-block')) {
        hideBlockControls();
      }
    });

    blockControls.addEventListener('mouseleave', () => {
      hideBlockControls();
    });

    console.log('VILLANO.AI Creator v1.1 initialized');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CANVAS SIZE
  // ═══════════════════════════════════════════════════════════════════════════
  function setCanvasSize(size) {
    // Update active button
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === size);
    });

    // Remove all size classes
    Object.keys(sizeConfigs).forEach(s => {
      docContainer.classList.remove(`size-${s}`);
    });

    // Add new size class
    docContainer.classList.add(`size-${size}`);
    currentSize = size;

    // Update info display
    if (sizeInfo) {
      sizeInfo.textContent = sizeConfigs[size].label;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BLOCK MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  function addBlock(type) {
    if (!blockTemplates[type]) {
      console.error('Unknown block type:', type);
      return;
    }

    // Hide empty state
    if (emptyState) {
      emptyState.style.display = 'none';
    }

    // Create and insert block
    const html = blockTemplates[type]();
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const block = temp.firstElementChild;

    // Insert after selected block or at end
    if (selectedBlock) {
      selectedBlock.after(block);
    } else {
      docContainer.appendChild(block);
    }

    // Select new block
    selectBlock(block);

    // Focus first editable element
    const firstEditable = block.querySelector('[contenteditable]');
    if (firstEditable) {
      firstEditable.focus();
    }
  }

  function selectBlock(block) {
    deselectBlock();
    selectedBlock = block;
    block.classList.add('selected');
  }

  function deselectBlock() {
    if (selectedBlock) {
      selectedBlock.classList.remove('selected');
      selectedBlock = null;
    }
    hideBlockControls();
  }

  function showBlockControls(block) {
    const rect = block.getBoundingClientRect();
    blockControls.style.left = `${rect.right + 10}px`;
    blockControls.style.top = `${rect.top}px`;
    blockControls.classList.add('visible');
    selectedBlock = block;
  }

  function hideBlockControls() {
    blockControls.classList.remove('visible');
  }

  function handleBlockAction(action, block) {
    switch (action) {
      case 'move-up':
        moveBlockUp(block);
        break;
      case 'move-down':
        moveBlockDown(block);
        break;
      case 'duplicate':
        duplicateBlock(block);
        break;
      case 'delete':
        deleteBlock(block);
        break;
    }
  }

  function moveBlockUp(block) {
    const prev = block.previousElementSibling;
    if (prev && prev.classList.contains('content-block')) {
      block.parentNode.insertBefore(block, prev);
    }
  }

  function moveBlockDown(block) {
    const next = block.nextElementSibling;
    if (next && next.classList.contains('content-block')) {
      block.parentNode.insertBefore(next, block);
    }
  }

  function duplicateBlock(block) {
    const clone = block.cloneNode(true);
    clone.dataset.id = ++blockCounter;
    clone.classList.remove('selected');
    block.after(clone);
    selectBlock(clone);
  }

  function deleteBlock(block) {
    if (confirm('¿Eliminar este bloque?')) {
      block.remove();
      selectedBlock = null;
      hideBlockControls();
      checkEmptyState();
    }
  }

  function checkEmptyState() {
    const blocks = docContainer.querySelectorAll('.content-block');
    if (blocks.length === 0 && emptyState) {
      emptyState.style.display = 'flex';
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SPECIAL BLOCK FUNCTIONS (Global scope for onclick)
  // ═══════════════════════════════════════════════════════════════════════════
  window.addListItem = function(btn) {
    const list = btn.previousElementSibling;
    const li = document.createElement('li');
    li.contentEditable = true;
    li.dataset.placeholder = 'Elemento de lista';
    li.textContent = 'Nuevo elemento';
    list.appendChild(li);
    li.focus();
  };

  window.addTerminalLine = function(btn) {
    const body = btn.previousElementSibling.querySelector('.terminal-body');
    const line = document.createElement('span');
    line.className = 'terminal-line';
    line.innerHTML = `
      <span class="prompt">$</span>
      <span class="command" contenteditable="true" data-placeholder="comando"> nuevo-comando</span>
    `;
    body.appendChild(line);
  };

  window.triggerImageUpload = function(placeholder) {
    const input = placeholder.parentElement.querySelector('.image-input');
    input.click();
  };

  window.handleImageUpload = function(input) {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const block = input.closest('.block-image');
        const placeholder = block.querySelector('.image-placeholder');

        // Create image container
        const container = document.createElement('div');
        container.className = 'image-container';
        container.innerHTML = `<img src="${e.target.result}" alt="Imagen">`;

        // Replace placeholder
        placeholder.replaceWith(container);
      };
      reader.readAsDataURL(file);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // THEME
  // ═══════════════════════════════════════════════════════════════════════════
  function updateTheme() {
    const theme = docTheme.value;
    docContainer.className = 'document-container';

    // Re-add size class
    docContainer.classList.add(`size-${currentSize}`);

    if (theme !== 'cyan') {
      docContainer.classList.add(`theme-${theme}`);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PREVIEW MODE
  // ═══════════════════════════════════════════════════════════════════════════
  function enterPreview() {
    isPreviewMode = true;
    document.body.classList.add('preview-mode');
    deselectBlock();

    // Make all contenteditable false
    docContainer.querySelectorAll('[contenteditable]').forEach(el => {
      el.setAttribute('contenteditable', 'false');
    });
  }

  function exitPreview() {
    isPreviewMode = false;
    document.body.classList.remove('preview-mode');

    // Restore contenteditable
    docContainer.querySelectorAll('[contenteditable]').forEach(el => {
      el.setAttribute('contenteditable', 'true');
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // IMAGE CAPTURE
  // ═══════════════════════════════════════════════════════════════════════════
  async function captureImage() {
    if (typeof html2canvas === 'undefined') {
      alert('Error: html2canvas no está cargado');
      return;
    }

    // Hide buttons and controls
    const buttons = docContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');
    deselectBlock();

    try {
      // Get scale for high resolution
      const config = sizeConfigs[currentSize];
      const scale = config.width >= 1080 ? 1 : 2;

      const canvas = await html2canvas(docContainer, {
        backgroundColor: '#0a0a0a',
        scale: scale,
        useCORS: true,
        logging: false,
        windowWidth: docContainer.scrollWidth,
        windowHeight: docContainer.scrollHeight
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${docTitle.value.replace(/\s+/g, '_')}_${currentSize}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      console.log('Image captured:', link.download);
    } catch (err) {
      console.error('Capture error:', err);
      alert('Error al capturar imagen: ' + err.message);
    }

    // Restore buttons
    buttons.forEach(btn => btn.style.display = '');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPORT / SAVE / LOAD
  // ═══════════════════════════════════════════════════════════════════════════
  function exportPDF() {
    // Hide buttons inside blocks
    const buttons = docContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');

    // Trigger print
    window.print();

    // Restore buttons
    setTimeout(() => {
      buttons.forEach(btn => btn.style.display = '');
    }, 100);
  }

  function saveToJSON() {
    const blocks = docContainer.querySelectorAll('.content-block');
    const data = {
      meta: {
        title: docTitle.value,
        subtitle: docSubtitle.value,
        version: docVersion.value,
        theme: docTheme.value,
        size: currentSize,
        created: new Date().toISOString()
      },
      blocks: []
    };

    blocks.forEach(block => {
      const blockData = {
        type: block.dataset.type,
        id: block.dataset.id,
        html: block.innerHTML
      };
      data.blocks.push(blockData);
    });

    // Download JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle.value.replace(/\s+/g, '_')}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    console.log('Document saved');
  }

  function loadFromJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);

        // Clear current content
        docContainer.querySelectorAll('.content-block').forEach(b => b.remove());

        // Set meta
        if (data.meta) {
          docTitle.value = data.meta.title || '';
          docSubtitle.value = data.meta.subtitle || '';
          docVersion.value = data.meta.version || '';
          docTheme.value = data.meta.theme || 'cyan';

          // Restore size
          if (data.meta.size) {
            setCanvasSize(data.meta.size);
          }

          updateTheme();
        }

        // Add blocks
        if (data.blocks && data.blocks.length > 0) {
          emptyState.style.display = 'none';

          data.blocks.forEach(blockData => {
            const block = document.createElement('div');
            block.className = `content-block block-${blockData.type}`;
            block.dataset.type = blockData.type;
            block.dataset.id = blockData.id;
            block.innerHTML = blockData.html;
            docContainer.appendChild(block);

            // Update counter
            const id = parseInt(blockData.id);
            if (id > blockCounter) blockCounter = id;
          });
        }

        console.log('Document loaded');
      } catch (err) {
        alert('Error al cargar el archivo: ' + err.message);
      }
    };
    reader.readAsText(file);

    // Reset input
    e.target.value = '';
  }

  function clearDocument() {
    if (confirm('¿Limpiar todo el documento? Esta acción no se puede deshacer.')) {
      docContainer.querySelectorAll('.content-block').forEach(b => b.remove());
      emptyState.style.display = 'flex';
      blockCounter = 0;
      selectedBlock = null;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════════════════════
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S = Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveToJSON();
    }

    // Ctrl/Cmd + P = Export PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      exportPDF();
    }

    // Ctrl/Cmd + Shift + C = Capture image
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      captureImage();
    }

    // Delete selected block
    if (e.key === 'Delete' && selectedBlock && !document.activeElement.isContentEditable) {
      deleteBlock(selectedBlock);
    }

    // Escape to deselect or exit preview
    if (e.key === 'Escape') {
      if (isPreviewMode) {
        exitPreview();
      } else {
        deselectBlock();
      }
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // START
  // ═══════════════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', init);

})();
