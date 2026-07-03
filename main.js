// Wires config.js values into the DOM.

(function () {
  const cfg = window.APP_CONFIG || {};

  const asanaTile = document.getElementById('asana-tile');
  if (asanaTile && cfg.asanaProjectUrl) {
    asanaTile.setAttribute('href', cfg.asanaProjectUrl);
  }

  // Append optional extra tiles configured in config.js.
  const grid = document.querySelector('.hub__grid');
  if (grid && Array.isArray(cfg.extraDashboards)) {
    for (const item of cfg.extraDashboards) {
      if (!item?.url) continue;
      const a = document.createElement('a');
      a.className = 'tile';
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.innerHTML = `
        <div class="tile__icon">${item.icon || '🔗'}</div>
        <div class="tile__body">
          <h3 class="tile__title">${escapeHtml(item.name || 'External link')}</h3>
          <p class="tile__desc">${escapeHtml(item.desc || '')}</p>
          <span class="tile__cta">Open →</span>
        </div>`;
      // Insert before the "info" tile so links stay grouped.
      const info = grid.querySelector('.tile--info');
      if (info) grid.insertBefore(a, info);
      else grid.appendChild(a);
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }
})();
