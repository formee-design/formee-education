/* Home hero C · Orbit+ (prototype, 2026-11-26, calm revision). Runs only with ?hero=c (body[data-hv="e"]); builds on hero A.
   The first C was too busy, so it keeps just three quiet touches:
   - Orbits: solid hairlines with a soft gradient (bright in the middle, fading at the ends) instead of faint dashes.
   - One small glowing light per orbit, drifting slowly (replaces A's dots).
   - Every ~7.5s one industry chip glows softly for a moment, as if it just sent data to the centre.
   Reduced motion: lights and glows off. The glow pauses while the hero is off screen or the tab is hidden. */
(() => {
  if (document.body.dataset.hv !== 'e') return;
  const orbit = document.getElementById('heroOrbit');
  const svg = orbit && orbit.querySelector('.hero-orbit__svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const defs = svg.querySelector('defs') || el('defs', {}, svg);
  defs.insertAdjacentHTML('beforeend', `
    <linearGradient id="eOrbitGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" style="stop-color:var(--color-neutral-0);stop-opacity:.14"/>
      <stop offset=".5" style="stop-color:var(--color-neutral-0);stop-opacity:.85"/>
      <stop offset="1" style="stop-color:var(--color-neutral-0);stop-opacity:.14"/>
    </linearGradient>
    <filter id="ePulseGlow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`);

  if (reduce) return;

  // one slow light per orbit
  svg.querySelectorAll('.hero-orbit__path').forEach(path => {
    const g = path.parentNode;
    const baseDur = parseFloat((g.querySelector('animateMotion') || { getAttribute: () => '60s' }).getAttribute('dur')) || 60;
    const c = el('circle', { class: 'e-pulse', r: 2.6 }, g);
    const am = el('animateMotion', { dur: baseDur * .8 + 's', begin: (-Math.random() * baseDur).toFixed(1) + 's', repeatCount: 'indefinite' }, c);
    el('mpath', { href: '#' + path.id }, am);
  });

  // a soft glow on one chip at a time
  const chips = [...orbit.querySelectorAll('.orbit-chip')];
  let last = -1, timer = 0, visible = true;
  const glow = () => {
    if (!chips.length) return;
    let i; do { i = Math.floor(Math.random() * chips.length); } while (chips.length > 1 && i === last);
    last = i;
    chips[i].classList.add('is-ping');
    setTimeout(() => chips[i].classList.remove('is-ping'), 2200);
  };
  const run = () => { clearInterval(timer); timer = 0; if (visible && !document.hidden) timer = setInterval(glow, 7500); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(orbit.closest('.hero'));
  document.addEventListener('visibilitychange', run);
  setTimeout(glow, 1800);
})();
