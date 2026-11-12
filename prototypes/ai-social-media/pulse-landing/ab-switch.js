/* Review helper: switch between the A (prompt hero) and B (CTA hero) prototypes, keeping the scroll position. */
(() => {
  const versions = [
    { key: 'A', label: 'Prompt hero', href: 'index.html' },
    { key: 'B', label: 'CTA hero', href: 'index-b.html' },
  ];
  const current = /index-b\.html$/.test(location.pathname) ? 'B' : 'A';
  const KEY = 'ab-switch-scroll';

  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved !== null) {
      sessionStorage.removeItem(KEY);
      const ratio = parseFloat(saved);
      addEventListener('load', () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.scrollBehavior = 'auto';
        scrollTo(0, ratio * max);
        document.documentElement.style.scrollBehavior = '';
      });
    }
  } catch (e) {}

  const bar = document.createElement('nav');
  bar.className = 'ab-switch';
  bar.setAttribute('aria-label', 'Prototype version');
  bar.innerHTML = versions.map(v =>
    `<a href="${v.href}" class="${v.key === current ? 'on' : ''}" ${v.key === current ? 'aria-current="page"' : ''}><b>${v.key}</b>${v.label}</a>`
  ).join('');
  bar.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || a.classList.contains('on')) { e.preventDefault(); return; }
    try {
      const max = document.documentElement.scrollHeight - innerHeight;
      sessionStorage.setItem(KEY, String(max > 0 ? scrollY / max : 0));
    } catch (e) {}
  });
  document.body.appendChild(bar);
})();
