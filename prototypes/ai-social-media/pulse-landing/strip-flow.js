/* Showcase strip: cards flow slowly to the left, pause on hover,
   and can be dragged or swiped sideways. Loops without a seam. (11/12) */
(() => {
  const strip = document.getElementById('strip');
  const track = document.getElementById('flowTrack');
  if (!strip || !track) return;
  const page = document.getElementById('page');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SPEED = 28; // canvas px per second

  // Duplicate the set once so the loop has no gap.
  const set = [...track.children];
  set.forEach(c => {
    const k = c.cloneNode(true);
    k.setAttribute('aria-hidden', 'true');
    k.querySelectorAll('.r').forEach(r => r.classList.add('in'));
    k.querySelectorAll('video').forEach(v => { v.preload = 'metadata'; v.muted = true; });
    track.appendChild(k);
  });

  const zoom = () => parseFloat(page && page.style.zoom) || 1;
  let x = 0, w = 0, hover = false, drag = null, last = performance.now();
  const measure = () => { w = track.scrollWidth / 2; };
  measure();
  addEventListener('resize', measure);
  addEventListener('load', measure);

  const wrap = () => { if (w > 0) { x %= w; if (x > 0) x -= w; } };

  strip.addEventListener('pointerenter', () => { hover = true; });
  strip.addEventListener('pointerleave', () => { hover = false; });

  strip.addEventListener('pointerdown', e => {
    drag = { sx: e.clientX, x0: x, moved: false };
    strip.setPointerCapture(e.pointerId);
    strip.classList.add('dragging');
  });
  strip.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = (e.clientX - drag.sx) / zoom();
    if (Math.abs(dx) > 3) drag.moved = true;
    x = drag.x0 + dx; wrap();
  });
  const end = () => { drag = null; strip.classList.remove('dragging'); };
  strip.addEventListener('pointerup', end);
  strip.addEventListener('pointercancel', end);

  // Sideways trackpad swipe moves the strip; vertical scrolling is left alone.
  strip.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    x -= e.deltaX / zoom(); wrap();
  }, { passive: false });

  const tick = now => {
    const dt = Math.min(64, now - last) / 1000; last = now;
    if (!reduce && !hover && !drag) { x -= SPEED * dt; wrap(); }
    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
