/* Showcase coverflow (11/12, drag added 11/23): the six-slot shape plus one smaller slot on each side, largest in the middle.
   Every few seconds each video moves one slot to the left; the leftmost fades out
   and the next queued video fades in on the right. Pauses on hover.
   Visitors can also grab the strip and drag it left or right (mouse or touch);
   every DRAG_PX of drag moves one slot. Auto flow resumes RESUME_MS after the last drag. */
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
  const STEP_MS = 4500; // 11/23: slowed from 2000
  const DRAG_PX = 90, RESUME_MS = 3000;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let offset = 0, hover = false, lastDrag = 0;
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
      // A card that wraps between the two hidden queues jumps instead of sliding across the strip.
      el.classList.toggle('cf-jump', (prev[i] === N - 1 && p !== N - 1 && p !== 0) || (prev[i] === N - 2 && p === N - 1));
      if (p < SLOTS.length) place(el, SLOTS[p], true);
      else if (p === N - 1) place(el, OUT_LEFT, false);
      else place(el, OUT_RIGHT, false);
      el.style.zIndex = p < SLOTS.length ? 10 - Math.abs(p - 3.5) * 2 | 0 : 0;
      const v = el.querySelector('video');
      if (v) { if (p < SLOTS.length) v.play().catch(() => {}); else v.pause(); }
      prev[i] = p;
    });
  }
  const step = d => { offset = ((offset + d) % N + N) % N; layout(); };
  layout();

  // Drag: one slot per DRAG_PX, faster slide while dragging.
  let down = null;
  strip.style.cursor = 'grab';
  strip.style.touchAction = 'pan-y';
  strip.addEventListener('dragstart', e => e.preventDefault());
  strip.addEventListener('pointerdown', e => {
    down = { x: e.clientX }; strip.classList.add('cf-drag'); strip.style.cursor = 'grabbing';
    strip.setPointerCapture?.(e.pointerId);
  });
  strip.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - down.x;
    if (Math.abs(dx) >= DRAG_PX) { step(dx < 0 ? 1 : -1); down.x = e.clientX; lastDrag = Date.now(); }
  });
  const end = () => { if (!down) return; down = null; lastDrag = Date.now(); strip.classList.remove('cf-drag'); strip.style.cursor = 'grab'; };
  strip.addEventListener('pointerup', end);
  strip.addEventListener('pointercancel', end);

  strip.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  strip.addEventListener('pointerleave', () => { hover = false; });
  if (!reduce) setInterval(() => {
    if (hover || down || document.hidden || Date.now() - lastDrag < RESUME_MS) return;
    step(1);
  }, STEP_MS);
})();
