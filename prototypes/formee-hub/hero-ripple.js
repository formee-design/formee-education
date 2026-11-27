/* Home hero variants (prototype, 2026-11-26)
   1. Version switcher pill at the bottom right: A = orbits (default), B = water-drop dot ripple, C = Orbit+ (hero-orbit-plus.js).
      Picks reload the page with ?hero=a|b|c (also remembered in localStorage; the inline script at the top of <body> applies it before store.js).
   2. Hero B (internally data-hero="d"): a canvas dot grid (small squares, digital look) behind the centred copy. Every 12s a drop sends a train of
      three rings about 190px apart (each thins and fades as it travels, so the innermost reads thickest) outward from a circle that already clears the copy;
      they travel slowly and fade, so about three are on screen. Where a ring passes, the squares swell, brighten and are
      pushed outward a little; one side of each ring catches light and the other
      falls into shade, which gives the ring the body of a real water or paint drop. Hovering the hero shows a soft spotlight under the
      cursor (squares nearby swell, brighten and lean away with a faint shimmer); no new rings, so the field stays calm (2026-11-27, click rings removed).
      A random tenth of the squares sparkle white now and then, so the field
      never sits flat between rings. Colours come from the design tokens: cyan on the left, white in the middle, rose on the right.
      Reduced motion: one still frame with three rings. Paused while the hero is off screen or the tab is hidden. */
(() => {
  const body = document.body;
  const cur = body.dataset.hero === 'd' ? 'b' : body.dataset.hv === 'e' ? 'c' : 'a';

  // ---------- switcher ----------
  const sw = document.createElement('div');
  sw.className = 'hero-switch';
  sw.setAttribute('role', 'group');
  sw.setAttribute('aria-label', 'Hero version');
  sw.innerHTML = '<span class="hero-switch__label">Hero</span>' + [['a', 'A · Orbit'], ['b', 'B · Ripple'], ['c', 'C · Orbit+']]
    .map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${v === cur}">${l}</button>`).join('');
  sw.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || b.dataset.v === cur) return;
    try { localStorage.setItem('formeeHero', b.dataset.v); } catch (x) { /* storage unavailable */ }
    const u = new URL(location.href); u.searchParams.set('hero', b.dataset.v); location.href = u.toString();
  });
  body.appendChild(sw);
  if (cur !== 'b') return;

  // ---------- hero D ripple ----------
  const hero = document.querySelector('.hero:not(.page-hero)');
  const bg = hero && hero.querySelector('.hero__bg');
  if (!bg) return;
  const cv = document.createElement('canvas');
  cv.className = 'hero-ripple';
  bg.appendChild(cv);
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = getComputedStyle(document.documentElement);
  const rgb = (name, fb) => {
    let h = (css.getPropertyValue(name).trim() || fb).replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255];
  };
  const LEFT = rgb('--color-scale-cyan-200', '#a5f3fc'), MID = rgb('--color-neutral-0', '#ffffff'), RIGHT = rgb('--color-scale-rose-200', '#fecdd3');
  const HUES = 7, ALPHAS = 12;
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const PALETTE = Array.from({ length: HUES }, (_, i) => { const k = i / (HUES - 1); const c = k < .5 ? mix(LEFT, MID, k * 2) : mix(MID, RIGHT, (k - .5) * 2); return `rgb(${c.join(',')})`; });

  // Tuning
  const GAP = 11;          // grid step (px)
  const SQ = 1.05;         // resting square size (px)
  const GROW = 1.5;        // extra size on a crest (px), kept small so squares stay fine
  const PUSH = 8;          // outward push on a crest (px)
  const SPEED = 58;        // ring speed (px/s), slow like water
  const EVERY = 12;        // seconds between drops; each drop sends a short train of rings
  const TRAIN = [[0, 1], [3.3, 1], [6.6, 1]]; // [delay s, strength]: three rings ~190px apart; each fades and thins as it travels, so the innermost always reads thickest
  const TWINKLE = .1;      // share of grid squares that sparkle now and then
  const TW_GAIN = .42;     // how bright a sparkle gets (about 60% of the first version, barely there)
  const DECAY = 560;       // ring fades with distance travelled from its start circle (px), quicker so the outer rings stay soft
  const SIG0 = 64;         // crest half width at the start circle (px); thins as it travels (44 → 64 on 2026-11-27 so rings read as soft bands, not lines)
  const LX = .62, LY = -.78; // light from the upper right (unit vector)
  const SPOT_R = 90;       // hover spotlight radius (px, gaussian sigma)
  const SPOT_GAIN = .2;    // how much the squares under the cursor swell and brighten (barely there: a quarter of the first try, 2026-11-27)

  let W = 0, H = 0, dpr = 1, cx = 0, cy = 0, calm = 0, r0 = 0, navB = 86, raf = 0, visible = true, cols = 0, rowsN = 0, twA, twP, twS;
  const rings = [];
  const spot = { x: 0, y: 0, tx: 0, ty: 0, a: 0, on: false }; // follows the cursor with a little lag, fades in and out
  let tStart = performance.now(), nextDrop = 0;
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // The copy block = title + subtitle + email form (the .hero__content container itself is full width)
    const h = hero.getBoundingClientRect();
    const rs = ['.hero__title', '.hero__sub', '#heroCard'].map(q => hero.querySelector(q)).filter(Boolean).map(e => e.getBoundingClientRect());
    const L = Math.min(...rs.map(r => r.left)), R = Math.max(...rs.map(r => r.right)), T = Math.min(...rs.map(r => r.top)), B = Math.max(...rs.map(r => r.bottom));
    cx = (L + R) / 2 - h.left; cy = (T + B) / 2 - h.top;
    // Rings start on a circle that already clears the copy block, not from the middle of the text
    r0 = (Math.max(R - L, B - T) / 2 + 32) * .8; // 80% of a circle that fully clears the copy
    navB = (document.querySelector('.hub-header') || { offsetHeight: 86 }).offsetHeight; // keep the nav labels clean
    calm = r0; // quiet zone behind the copy
    // Sparkles: a random tenth of the grid squares, each with its own phase and tempo
    cols = Math.ceil(W / GAP); rowsN = Math.ceil(H / GAP);
    const n = cols * rowsN;
    twA = new Float32Array(n); twP = new Float32Array(n); twS = new Float32Array(n);
    for (let i = 0; i < n; i++) { if (Math.random() < TWINKLE) { twA[i] = .45 + Math.random() * .55; twP[i] = Math.random() * Math.PI * 2; twS[i] = .25 + Math.random() * .55; } } // tempo: half the first version
  };
  const drop = (x, y, amp, born, start = r0) => { rings.push({ x, y, amp, born, start }); if (rings.length > 8) rings.shift(); };
  const dropTrain = (x, y, born, start) => TRAIN.forEach(([d, a]) => drop(x, y, a, born + d, start));

  const paths = Array.from({ length: HUES * ALPHAS }, () => []);
  const draw = t => {
    // centre drops on a steady beat
    if (!reduce) { while (t >= nextDrop) { dropTrain(cx, cy, nextDrop); nextDrop += EVERY; } }
    // ring state
    const live = [];
    for (const g of rings) {
      const age = t - g.born; if (age < 0) continue;
      const trav = age * SPEED, r = g.start + trav;
      // swells in gently at its start circle; fades to almost nothing as it nears the left and right edges
      const edge = Math.max(g.x, W - g.x), e = Math.min(1, Math.max(0, (r - edge * .78) / (edge * .24)));
      const a = g.amp * Math.exp(-trav / DECAY) * Math.min(1, age / 1.2) * (1 - e * e * (3 - 2 * e));
      if (a < .02 && age > 1.2) continue;
      live.push({ x: g.x, y: g.y, r, a, s: 8 + (SIG0 - 8) * Math.exp(-trav / 300) }); // thick band at the start circle, thinning clearly as it spreads (2026-11-27: min 8px, half width halves about every 210px)
    }
    for (let i = rings.length - 1; i >= 0; i--) { const age = t - rings[i].born; if (rings[i].start + age * SPEED > Math.hypot(W, H) + 200) rings.splice(i, 1); }

    // hover spotlight: ease towards the cursor and fade in or out
    spot.x += (spot.tx - spot.x) * .14; spot.y += (spot.ty - spot.y) * .14;
    spot.a += ((spot.on ? 1 : 0) - spot.a) * .06;
    const sa = spot.a > .01 ? spot.a : 0, s2 = 2 * SPOT_R * SPOT_R, sLim = 9 * s2;
    ctx.clearRect(0, 0, W, H);
    paths.forEach(p => p.length = 0);
    for (let y = GAP / 2, iy = 0; y < H; y += GAP, iy++) {
      for (let x = GAP / 2, ix = 0; x < W; x += GAP, ix++) {
        let hgt = 0, shade = 0, push = 0, ox = 0, oy = 0;
        for (const g of live) {
          const dx = x - g.x, dy = y - g.y, d = Math.hypot(dx, dy) || 1;
          const u = d - g.r, s = g.s;
          if (u > 3 * s || u < -3 * s) continue;
          // one clean crest per ring
          const c1 = Math.exp(-(u * u) / (2 * s * s));
          const crest = c1 * g.a;
          const slope = -u / (s * s) * c1 * s * g.a; // about -1..1
          const nx = dx / d, ny = dy / d;
          hgt += crest;
          shade += slope * (nx * LX + ny * LY);
          push += crest; ox += nx * crest; oy += ny * crest;
        }
        // hover spotlight: squares near the cursor swell and lean away, with a faint shimmer travelling outward
        if (sa) {
          const dx = x - spot.x, dy = y - spot.y, d2 = dx * dx + dy * dy;
          if (d2 < sLim) {
            const d = Math.sqrt(d2) || 1, f = Math.exp(-d2 / s2) * sa * (1 + .25 * Math.sin(t * 3 - d / 16));
            hgt += f * SPOT_GAIN; push += f * .45; ox += dx / d * f; oy += dy / d * f;
            shade += f * .08 * (-(dx / d) * LX - (dy / d) * LY > 0 ? 1 : .3);
          }
        }
        // quiet zone behind the copy
        const dc = Math.hypot(x - cx, y - cy);
        const m = Math.min(1, Math.max(0, (dc - calm * .6) / (calm * .4)));
        // fade everything out under the nav bar so the menu labels stay readable
        const nv = Math.min(1, Math.max(0, (y - navB * .7) / (navB * 1.3)));
        const k = (.25 + .75 * m) * nv;
        hgt *= k; shade *= k;
        // sparkle: short, sharp flashes on random squares so the field never sits still between rings
        const ti = iy * cols + ix, ta = twA[ti];
        const tw = ta ? Math.pow(Math.max(0, Math.sin(t * twS[ti] + twP[ti])), 8) * ta * (.3 + .7 * m) * nv : 0;
        let a = .07 * (.4 + .6 * m) * nv + hgt * 1.05 + Math.max(shade, 0) * .55 - Math.max(-shade, 0) * .15 + tw * TW_GAIN;
        if (a < .03) continue;
        a = Math.min(1, a);
        const sz = SQ + hgt * GROW + Math.max(shade, 0) * .3 + tw * .6;
        const len = Math.hypot(ox, oy) || 1;
        const px = x + ox / len * push * PUSH * k, py = y + oy / len * push * PUSH * k;
        // highlights go white; otherwise colour follows the horizontal position
        const hue = shade > .35 || tw > .25 ? (HUES - 1) / 2 : Math.min(HUES - 1, Math.max(0, Math.round(x / W * (HUES - 1))));
        const ai = Math.min(ALPHAS - 1, Math.floor(a * ALPHAS));
        paths[hue * ALPHAS + ai].push(px - sz / 2, py - sz / 2, sz);
      }
    }
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i]; if (!p.length) continue;
      ctx.fillStyle = PALETTE[Math.floor(i / ALPHAS)];
      ctx.globalAlpha = ((i % ALPHAS) + .5) / ALPHAS;
      ctx.beginPath();
      for (let j = 0; j < p.length; j += 3) ctx.rect(p[j], p[j + 1], p[j + 2], p[j + 2]);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const now = () => (performance.now() - tStart) / 1000;
  const loop = () => { draw(now()); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
  const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
  const still = () => { rings.length = 0; dropTrain(cx, cy, -5.5); draw(0); };

  size();
  if (reduce) still();
  else {
    // Hover spotlight (replaces the old click rings)
    hero.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      const h = hero.getBoundingClientRect();
      spot.tx = e.clientX - h.left; spot.ty = e.clientY - h.top;
      if (!spot.on && spot.a < .02) { spot.x = spot.tx; spot.y = spot.ty; }
      spot.on = true;
    });
    hero.addEventListener('pointerleave', () => { spot.on = false; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    start();
  }
  addEventListener('resize', () => { size(); if (reduce) still(); });
  document.fonts && document.fonts.ready.then(() => { size(); if (reduce) still(); });
})();
