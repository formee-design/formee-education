/* Showcase coverflow (11/12): the six-slot shape plus one smaller slot on each side, largest in the middle.
   Every few seconds each video moves one slot to the left; the leftmost fades out
   and the next queued video fades in on the right. Pauses on hover. */
(() => {
  const strip = document.getElementById('strip');
  if (!strip) return;
  const cards = [...strip.querySelectorAll('.cf-card')];
  const N = cards.length;
  // Eight slots: the original six plus a smaller one on each side.
  const SLOTS = [
    [48, 152, 176, 313],
    [240, 130, 200, 356], [456, 109, 224, 398], [696, 80, 256, 455],
    [968, 80, 256, 455], [1240, 109, 224, 398], [1480, 130, 200, 356],
    [1696, 152, 176, 313],
  ];
  const OUT_LEFT = [-140, 170, 156, 277];
  const OUT_RIGHT = [1904, 170, 156, 277];
  const STEP_MS = 3200;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let offset = 0, hover = false;
  const prev = new Array(N).fill(-1);

  const place = (el, [l, t, w, h], show) => {
    el.style.left = l + 'px'; el.style.top = t + 'px';
    el.style.width = w + 'px'; el.style.height = h + 'px';
    el.style.opacity = show ? 1 : 0;
    el.style.pointerEvents = show ? '' : 'none';
  };

  function layout() {
    cards.forEach((el, i) => {
      const p = ((i - offset) % N + N) % N;
      // A card that just left on the left jumps to the right queue without sliding across.
      el.classList.toggle('cf-jump', prev[i] === N - 1 && p !== N - 1);
      if (p < SLOTS.length) place(el, SLOTS[p], true);
      else if (p === N - 1) place(el, OUT_LEFT, false);
      else place(el, OUT_RIGHT, false);
      el.style.zIndex = p < SLOTS.length ? 10 - Math.abs(p - 3.5) * 2 | 0 : 0;
      const v = el.querySelector('video');
      if (v) { if (p < SLOTS.length) v.play().catch(() => {}); else v.pause(); }
      prev[i] = p;
    });
  }
  layout();
  strip.addEventListener('pointerenter', () => { hover = true; });
  strip.addEventListener('pointerleave', () => { hover = false; });
  if (!reduce) setInterval(() => { if (hover || document.hidden) return; offset = (offset + 1) % N; layout(); }, STEP_MS);
})();
