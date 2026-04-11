(function () {
  'use strict';

  var THEMES = {
    kronos:  { '--bg':'#0a0a0a','--gold':'#c9a84c','--text':'#e2d9c8','--muted':'#6b6456','--border':'#1d1d1d','--card':'#0d0d0d','--btn-fg':'#0a0a0a','--hover-bg':'#120f00' },
    hacker:  { '--bg':'#010a01','--gold':'#00e64d','--text':'#7de87d','--muted':'#2d6b2d','--border':'#0b220b','--card':'#020e02','--btn-fg':'#010a01','--hover-bg':'#020e02' },
    lujo:    { '--bg':'#f7f2e7','--gold':'#9a7021','--text':'#1a1208','--muted':'#7a6840','--border':'#ddd5b8','--card':'#f0ead5','--btn-fg':'#f7f2e7','--hover-bg':'#ede5c8' },
    vampiro: { '--bg':'#07000f','--gold':'#a855f7','--text':'#e8d4f4','--muted':'#6b4590','--border':'#1a0830','--card':'#0a0018','--btn-fg':'#07000f','--hover-bg':'#0d0020' }
  };

  var FONTS = {
    georgia:  { body: "Georgia,'Times New Roman',serif",             mono: "'Courier New',monospace" },
    mono:     { body: "'Courier New','Lucida Console',monospace",     mono: "'Courier New',monospace" },
    garamond: { body: "'EB Garamond',Garamond,Palatino,serif",        mono: "'Courier New',monospace",
                gf: "EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap" },
    grotesk:  { body: "'DM Sans',system-ui,-apple-system,sans-serif", mono: "'DM Mono','Courier New',monospace",
                gf: "DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=DM+Mono:wght@400&display=swap" }
  };

  var fontLoaded = {};

  function css(key, val) {
    document.documentElement.style.setProperty(key, val);
  }

  function applyTheme(name) {
    var t = THEMES[name];
    if (!t) return;
    Object.keys(t).forEach(function (k) { css(k, t[k]); });
    document.querySelectorAll('.tp-opt[data-theme]').forEach(function (el) {
      el.classList.toggle('active', el.dataset.theme === name);
    });
    try { localStorage.setItem('kr-theme', name); } catch (e) {}
  }

  function loadGFont(spec) {
    if (fontLoaded[spec]) return;
    fontLoaded[spec] = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + spec;
    document.head.appendChild(link);
  }

  function applyFont(name) {
    var f = FONTS[name];
    if (!f) return;
    if (f.gf) loadGFont(f.gf);
    css('--font-body', f.body);
    css('--font-mono', f.mono);
    document.querySelectorAll('.tp-opt[data-font]').forEach(function (el) {
      el.classList.toggle('active', el.dataset.font === name);
    });
    try { localStorage.setItem('kr-font', name); } catch (e) {}
  }

  function toggle() {
    var panel = document.getElementById('theme-panel');
    var btn   = document.getElementById('theme-btn');
    if (!panel || !btn) return;
    var open = panel.classList.toggle('open');
    btn.classList.toggle('active', open);
  }

  function initChips() {
    document.querySelectorAll('.tags').forEach(function (el) {
      var chips = el.textContent.split('·').map(function (t) { return t.trim(); }).filter(Boolean);
      el.innerHTML = chips.map(function (t) {
        return '<span class="tag-chip">' + t + '</span>';
      }).join('');
    });
  }

  document.addEventListener('click', function (e) {
    var panel = document.getElementById('theme-panel');
    var btn   = document.getElementById('theme-btn');
    if (!panel || !btn) return;
    if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn) {
      panel.classList.remove('open');
      btn.classList.remove('active');
    }
  });

  function get(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function init() {
    initChips();
    applyTheme(get('kr-theme') || 'vampiro');
    applyFont(get('kr-font')   || 'grotesk');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.KR = { theme: applyTheme, font: applyFont, toggle: toggle };
}());
