/* Formee store v3: home page (v3-store.html). Uses data.js (FD), scenes.js (FS) and site.js (FSite). */
(() => {
  'use strict';
  const { BUSINESSES, FAQ, TOOLS } = window.FD;
  const S = window.FSite;
  const { $, $$, pad, clamp, reduce, vars, tag, ARROW, EXT, URL: U } = S;


  /* ---------- Hero B (v3-store-b.html): one abstract gyroscope graphic with a sparkle in the middle ----------
     No chips. Overlapping orbits (two wide, one vertical ring, two inner), dots drifting slowly along them,
     a fixed 4-point sparkle at the centre. Email + Contact us sits under the subtitle instead. */
  const renderGyro = () => {
    const G = { w: 1200, h: 640, cx: 600, cy: 330 };
    const ring = (id, rx, ry, rot, cls) => `<g transform="rotate(${rot} ${G.cx} ${G.cy})"><path id="${id}" class="${cls}" d="M ${G.cx - rx} ${G.cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0"/>`;
    const dots = (id, n, dur, r = 3.5, dim = false) => Array.from({ length: n }, (_, k) => `<circle class="gyro__dot${dim ? ' gyro__dot--dim' : ''}" r="${r}"><animateMotion dur="${dur}s" begin="${(-dur * k / n).toFixed(1)}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`).join('');
    // Simplified (2026-11-25): three orbits only, none standing upright; 5 slow dots
    const ORB = [
      ['gyroA', 500, 170, -6, 'gyro__line', 2, 90],
      ['gyroB', 330, 140, 28, 'gyro__line', 2, 70],
      ['gyroC', 420, 150, -22, 'gyro__line gyro__line--dash', 1, 110]
    ];
    const star = 'M0 -40 C5 -9 9 -5 40 0 C9 5 5 9 0 40 C-5 9 -9 5 -40 0 C-9 -5 -5 -9 0 -40 Z';
    $('#heroGyro').innerHTML = `
      <svg class="gyro" viewBox="0 0 ${G.w} ${G.h}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="gyroGlow"><stop offset="0" style="stop-color:var(--color-neutral-0);stop-opacity:.9"/><stop offset=".45" style="stop-color:var(--color-brand-primary-pale);stop-opacity:.45"/><stop offset="1" style="stop-color:var(--color-brand-primary-pale);stop-opacity:0"/></radialGradient>
          <filter id="gyroBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18"/></filter>
          <filter id="gyroStarGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx="${G.cx}" cy="${G.cy}" r="230" fill="url(#gyroGlow)" filter="url(#gyroBlur)" class="gyro__glow"/>
        ${ORB.map(([id, rx, ry, rot, cls, n, dur]) => `${ring(id, rx, ry, rot, cls)}${n ? dots(id, n, dur) : ''}</g>`).join('')}
        <g class="gyro__star" transform="translate(${G.cx} ${G.cy})"><path d="${star}" filter="url(#gyroStarGlow)"/></g>
      </svg>`;
    if (reduce) $('.gyro').pauseAnimations();
  };
  // Hero variants: A = orbits + chips (v3-store.html), B = gyroscope (v3-store-b.html), C = gradient only (v3-store-c.html)
  const HERO_V = document.body.dataset.hero || 'a';
  const HERO_B = HERO_V !== 'a'; // B and C put the email CTA under the subtitle
  /* ---------- Hero C (v3-store-c.html): digital dot grid with ripples spreading from an invisible circle ----------
     Canvas halftone: dots on a 14px grid; a virtual circle sits behind the hero copy. Inside it the dots stay small
     and dim; outside, sine waves travel outward and swell the dots as they pass, fading with distance.
     Static frame with reduced motion; paused while the hero is off screen or the tab is hidden. */
  const initDots = () => {
    const cv = $('#heroDots'); if (!cv) return;
    const hero = cv.closest('.hero'), ctx = cv.getContext('2d');
    const dotColor = getComputedStyle(document.documentElement).getPropertyValue('--color-neutral-0').trim() || 'white';
    // Water-ripple feel (2026-11-25 v2): finer grid, true circles, rings close together near the centre and
    // spreading wider and fainter as they travel out (wavelength grows with sqrt of the distance).
    const GAP = 10, R_MIN = .35, R_MAX = 1.6, K = .22, FREQ = .14, FALLOFF = 460, BUCKETS = 12;
    let W = 0, H = 0, cx = 0, cy = 0, R = 0, dpr = 1, raf = 0, visible = true, t0 = performance.now();
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The circle hugs the copy block: centred on it, radius from the title width
      const c = $('.hero__content', hero).getBoundingClientRect(), tt = $('.hero__title', hero).getBoundingClientRect(), h = hero.getBoundingClientRect();
      cx = c.left - h.left + c.width / 2; cy = c.top - h.top + c.height / 2;
      R = tt.width * .7;
    };
    const paths = Array.from({ length: BUCKETS }, () => []);
    const draw = now => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = dotColor;
      paths.forEach(p => p.length = 0);
      for (let y = GAP / 2; y < H; y += GAP) {
        for (let x = GAP / 2; x < W; x += GAP) {
          const d = Math.hypot(x - cx, y - cy);
          let r, a;
          if (d < R) { const k = d / R; r = R_MIN * .8; a = .03 + .1 * k * k; }
          else {
            const out = d - R, decay = Math.exp(-out / FALLOFF);
            const phase = K * Math.sqrt(out + 30) - t * FREQ;
            // Thick, soft bands near the centre; thinner, sharper ones further out
            const w = Math.pow(.5 + .5 * Math.sin(phase * Math.PI * 2), 1 + 4 * (1 - decay));
            r = R_MIN + (R_MAX - R_MIN) * w * (.3 + .7 * decay);
            a = (.06 + .8 * w) * decay + .03;
          }
          const bi = Math.min(BUCKETS - 1, Math.floor(a * BUCKETS));
          if (bi > 0) paths[bi].push(x, y, r);
        }
      }
      for (let i = 1; i < BUCKETS; i++) {
        const p = paths[i]; if (!p.length) continue;
        ctx.globalAlpha = (i + .5) / BUCKETS;
        ctx.beginPath();
        for (let j = 0; j < p.length; j += 3) { ctx.moveTo(p[j] + p[j + 2], p[j + 1]); ctx.arc(p[j], p[j + 1], p[j + 2], 0, Math.PI * 2); }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const loop = now => { draw(now); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
    size(); draw(performance.now());
    if (!reduce) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(hero);
      document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
      start();
    }
    addEventListener('resize', () => { size(); if (reduce) draw(performance.now()); });
    document.fonts && document.fonts.ready.then(() => { size(); if (reduce) draw(performance.now()); });
  };
  if (HERO_V === 'c') initDots();
  if (HERO_V === 'b') renderGyro();
  else if (HERO_V === 'a') {
    /* ---------- Hero graphic: industries on dashed orbits around a soft glowing core (no logo) ----------
       Layout matches the Figma hero (FME_AI Social Media For Design Team, node 1080:40, 2026-11-25):
       orbit ellipses fitted from the Figma vectors, chips at the Figma positions, two blurred glows in the centre.
       The orbits and moving dots are SVG (viewBox 1200 x 560); chips are HTML placed over it in %.
       Dots travel with SMIL animateMotion; with reduced motion the SVG is paused and the chips stay still. */
    const VB = { w: 1200, h: 560 };
    const ORBITS = [
      { cx: 597.4, cy: 292.3, rx: 533, ry: 211.3, rot: -16.83, dur: 74, dots: 4 },
      { cx: 534.3, cy: 264, rx: 425.4, ry: 170.5, rot: 13, dur: 62, dots: 3 },
      { cx: 582.5, cy: 290.2, rx: 303.6, ry: 127.2, rot: -26.37, dur: 48, dots: 3 }
    ];
    // Chip icons exported from the Figma hero (design-system icon set, kept as drawn)
    const HERO_ICONS = {
      education: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 16V12.5H18V16C18 16.7956 17.3679 17.5587 16.2426 18.1213C15.1174 18.6839 13.5913 19 12 19C10.4087 19 8.88258 18.6839 7.75736 18.1213C6.63214 17.5587 6 16.7956 6 16Z" fill="#4F6DE6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke="#4F6DE6"/><path d="M21.4198 10.9221C21.5988 10.8431 21.7507 10.7134 21.8567 10.5489C21.9627 10.3845 22.0181 10.1925 22.0161 9.99685C22.0141 9.8012 21.9547 9.61044 21.8454 9.4482C21.736 9.28596 21.5814 9.15937 21.4008 9.08411L12.8298 5.18011C12.5692 5.06126 12.2862 4.99976 11.9998 4.99976C11.7134 4.99976 11.4304 5.06126 11.1698 5.18011L2.5998 9.08011C2.42177 9.15809 2.27031 9.28625 2.16396 9.44893C2.05761 9.61161 2.00098 9.80175 2.00098 9.99611C2.00098 10.1905 2.05761 10.3806 2.16396 10.5433C2.27031 10.706 2.42177 10.8341 2.5998 10.9121L11.1698 14.8201C11.4304 14.939 11.7134 15.0005 11.9998 15.0005C12.2862 15.0005 12.5692 14.939 12.8298 14.8201L21.4198 10.9221Z" fill="#0B2B55" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#0B2B55"/><path d="M22 10V16" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="#0B2B55"/></svg>',
      realEstate: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 1.99902C12.4726 1.99902 12.9301 2.16667 13.291 2.47168L20.291 8.47168C20.5131 8.6594 20.692 8.89344 20.8145 9.15723C20.9369 9.42113 21.0001 9.70907 21 10V19C21 19.5304 20.7891 20.039 20.4141 20.4141C20.039 20.7891 19.5304 21 19 21H15V13C15 12.7348 14.8946 12.4805 14.707 12.293C14.5195 12.1054 14.2652 12 14 12H10C9.73478 12 9.4805 12.1054 9.29297 12.293C9.10543 12.4805 9 12.7348 9 13V21H5C4.46957 21 3.96101 20.7891 3.58594 20.4141C3.21087 20.039 3 19.5304 3 19V10C2.99993 9.70907 3.06309 9.42113 3.18555 9.15723C3.308 8.89344 3.48687 8.6594 3.70898 8.47168L10.709 2.47168C11.0699 2.16667 11.5274 1.99902 12 1.99902Z" fill="#4F6DE6" stroke-linecap="round" stroke-linejoin="round" stroke="#4F6DE6"/></svg>',
      security: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M33.3337 21.6666C33.3337 29.9999 27.5003 34.1666 20.567 36.5833C20.2039 36.7063 19.8096 36.7004 19.4503 36.5666C12.5003 34.1666 6.66699 29.9999 6.66699 21.6666V9.99994C6.66699 9.55791 6.84259 9.13399 7.15515 8.82142C7.46771 8.50886 7.89163 8.33327 8.33366 8.33327C11.667 8.33327 15.8337 6.33327 18.7337 3.79994C19.0867 3.49827 19.5359 3.33252 20.0003 3.33252C20.4647 3.33252 20.9139 3.49827 21.267 3.79994C24.1837 6.34994 28.3337 8.33327 31.667 8.33327C32.109 8.33327 32.5329 8.50886 32.8455 8.82142C33.1581 9.13399 33.3337 9.55791 33.3337 9.99994V21.6666Z" fill="url(#heroSecGrad)"/><path d="M15 20.0001L18.3333 23.3334L25 16.6667" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#475069"/><defs><linearGradient id="heroSecGrad" x1="10.3761" y1="3.33252" x2="29.3122" y2="36.6714" gradientUnits="userSpaceOnUse"><stop offset="0.222583" stop-color="#E3E8F2"/><stop offset="0.492868" stop-color="#E3E8F2"/><stop offset="0.649262" stop-color="#C8D1E1"/><stop offset="0.934046" stop-color="#E3E8F2"/></linearGradient></defs></svg>',
      sports: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M23.8877 13.3333H25.9997C26.8837 13.3333 27.7316 12.9821 28.3567 12.3569C28.9818 11.7318 29.333 10.884 29.333 9.99992V6.66659C29.333 6.31296 29.1926 5.97383 28.9425 5.72378C28.6925 5.47373 28.3533 5.33325 27.9997 5.33325H23.9997" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#CFB14C"/><path d="M18.6668 22.6666V19.5466H16V29.3333H22.6668V26.6666C22.6668 25.9594 22.3859 25.2811 21.8858 24.781C21.3857 24.2809 20.7074 24 20.0002 24C19.6465 24 19.3074 23.8595 19.0574 23.6094C18.8073 23.3594 18.6668 23.0203 18.6668 22.6666Z" fill="url(#heroCupA)"/><path d="M8.11233 13.3333H6.00033C5.11627 13.3333 4.26842 12.9821 3.6433 12.3569C3.01818 11.7318 2.66699 10.884 2.66699 9.99992V6.66659C2.66699 6.31296 2.80747 5.97383 3.05752 5.72378C3.30756 5.47373 3.6467 5.33325 4.00033 5.33325H8.00033" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#CFB14C"/><path d="M13.3332 22.6669V19.5469H16V29.3335H9.33317V26.6669C9.33317 25.9596 9.61412 25.2814 10.1142 24.7813C10.6143 24.2812 11.2926 24.0002 11.9998 24.0002C12.3535 24.0002 12.6926 23.8597 12.9426 23.6097C13.1927 23.3596 13.3332 23.0205 13.3332 22.6669Z" fill="url(#heroCupB)"/><path d="M5.33301 29.3333H26.6663" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#CFB14C"/><path d="M8 12.0001C8 14.1218 8.84285 16.1566 10.3431 17.6569C11.8434 19.1572 13.8783 20.0001 16 20.0001C18.1217 20.0001 20.1566 19.1572 21.6569 17.6569C23.1571 16.1566 24 14.1218 24 12.0001V4.00008C24 3.64646 23.8595 3.30732 23.6095 3.05727C23.3594 2.80722 23.0203 2.66675 22.6667 2.66675H9.33333C8.97971 2.66675 8.64057 2.80722 8.39052 3.05727C8.14048 3.30732 8 3.64646 8 4.00008V12.0001Z" fill="#FFECA8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke="#FFECA8"/><defs><linearGradient id="heroCupA" x1="19.3334" y1="19.5466" x2="19.3334" y2="29.3333" gradientUnits="userSpaceOnUse"><stop stop-color="#887942"/><stop offset="0.360577" stop-color="#FFECA8"/></linearGradient><linearGradient id="heroCupB" x1="12.6666" y1="19.5469" x2="12.6666" y2="29.3335" gradientUnits="userSpaceOnUse"><stop stop-color="#887942"/><stop offset="0.360577" stop-color="#FFECA8"/></linearGradient></defs></svg>',
      hr: '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><path d="M22 20.6667V23H4V20.6667C4 19.429 4.54184 18.242 5.50631 17.3668C6.47078 16.4917 7.77889 16 9.14286 16H16.8571C18.2211 16 19.5292 16.4917 20.4937 17.3668C21.4582 18.242 22 19.429 22 20.6667Z" fill="#A8CBFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke="#A8CBFF"/><path d="M13 11C15.7614 11 18 8.76142 18 6C18 3.23858 15.7614 1 13 1C10.2386 1 8 3.23858 8 6C8 8.76142 10.2386 11 13 11Z" fill="#A8CBFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" stroke="#A8CBFF"/></svg>',
      sales: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="#D0F6FE"/><path d="M18 5H16C15.4477 5 15 5.44772 15 6V16C15 16.5523 15.4477 17 16 17H18C18.5523 17 19 16.5523 19 16V6C19 5.44772 18.5523 5 18 5Z" fill="#A3E4F3"/><path d="M11 8H9C8.44772 8 8 8.44772 8 9V16C8 16.5523 8.44772 17 9 17H11C11.5523 17 12 16.5523 12 16V9C12 8.44772 11.5523 8 11 8Z" fill="#A3E4F3"/></svg>'
    };
    // Chips as placed in Figma (updated 2026-11-25): centre (x, y) in the 1200 x 560 graphic. Pills are text only; round chips show only the icon.
    const CHIPS = {
      hr: { x: 303, y: 183, kind: 'icon', tone: 'blue', size: 48, icon: 'hr' },
      education: { x: 373, y: 71, kind: 'pill' },
      security: { x: 812, y: 118, kind: 'icon', tone: 'dark', size: 64, icon: 'security' },
      childcare: { x: 930, y: 282, kind: 'pill' },
      health: { x: 350, y: 297, kind: 'pill' },
      'real-estate': { x: 1063, y: 91, kind: 'pill' },
      sports: { x: 153, y: 292, kind: 'icon', tone: 'dark', size: 56, icon: 'sports' },
      'sales-marketing': { x: 1072, y: 249, kind: 'icon', tone: 'teal', size: 50, icon: 'sales' }
    };
    const ellipse = o => `M ${o.cx - o.rx} ${o.cy} a ${o.rx} ${o.ry} 0 1 0 ${o.rx * 2} 0 a ${o.rx} ${o.ry} 0 1 0 ${-o.rx * 2} 0`;
    $('#heroOrbit').innerHTML = `
      <svg class="hero-orbit__svg" viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="orbitCore"><stop offset="0" style="stop-color:var(--color-neutral-0);stop-opacity:.95"/><stop offset=".88" style="stop-color:var(--color-brand-primary-pale);stop-opacity:.55"/><stop offset="1" style="stop-color:var(--color-brand-primary-pale);stop-opacity:0"/></radialGradient>
          <radialGradient id="orbitCore2"><stop offset=".51" style="stop-color:var(--color-neutral-0);stop-opacity:1"/><stop offset="1" style="stop-color:var(--color-neutral-0);stop-opacity:0"/></radialGradient>
          <filter id="orbitBlurL" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="25"/></filter>
          <filter id="orbitBlurS" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
        </defs>
        <circle class="hero-orbit__core" cx="599.5" cy="334.4" r="360.5" fill="url(#orbitCore)" filter="url(#orbitBlurL)"/>
        <circle class="hero-orbit__core2" cx="598" cy="334.9" r="231" fill="url(#orbitCore2)" filter="url(#orbitBlurS)"/>
        ${ORBITS.map((o, i) => `
        <g transform="rotate(${o.rot} ${o.cx} ${o.cy})">
          <path id="orbit${i}" class="hero-orbit__path" d="${ellipse(o)}"/>
          ${Array.from({ length: o.dots }, (_, k) => `<circle class="hero-orbit__dot${k % 2 ? ' hero-orbit__dot--dim' : ''}" r="${k % 2 ? 2.5 : 3.5}"><animateMotion dur="${o.dur}s" begin="${(-o.dur * k / o.dots).toFixed(1)}s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit${i}"/></animateMotion></circle>`).join('')}
        </g>`).join('')}
      </svg>
      ${BUSINESSES.map((b, i) => {
        const c = CHIPS[b.id];
        if (!c) return '';
        const pos = `left:${(c.x / VB.w * 100).toFixed(2)}%;top:${(c.y / VB.h * 100).toFixed(2)}%;--d:${(i * .7).toFixed(1)}s`;
        const icon = c.icon ? HERO_ICONS[c.icon] : '';
        return c.kind === 'icon'
          ? `<span class="orbit-chip orbit-chip--icon orbit-chip--${c.tone}" style="${pos};--s:${c.size}px" aria-hidden="true">${icon}</span>`
          : `<span class="orbit-chip${c.tone ? ' orbit-chip--' + c.tone : ''}" style="${pos}" aria-hidden="true">${icon}${b.name}</span>`;
      }).join('')}`;
    if (reduce) $('.hero-orbit__svg').pauseAnimations();
    // Chips pop in one by one in a random order (new order on every load); the first one appears right away
    const chipsIn = $$('#heroOrbit .orbit-chip');
    const order = chipsIn.map((_, i) => i).sort(() => Math.random() - .5);
    // Then each chip drifts very slowly on its own path and tempo
    chipsIn.forEach(c => {
      const r = (min, max) => (min + Math.random() * (max - min)).toFixed(1);
      c.style.setProperty('--fx', (Math.random() < .5 ? -1 : 1) * r(4, 9) + 'px');
      c.style.setProperty('--fy', -r(6, 11) + 'px');
      c.style.setProperty('--fd', r(9, 14) + 's');
    });
    order.forEach((ci, k) => chipsIn[ci].style.setProperty('--in', (k ? .1 + k * .2 + Math.random() * .12 : .05).toFixed(2) + 's'));
  }
  // Centre: email + Contact us, with a trial link below (no card, Firmable-style) (the email is passed to the contact form via sessionStorage, not the URL)
  $(HERO_B ? '.hero__content' : '#heroOrbit').insertAdjacentHTML('beforeend', `
    <form class="hero-card${HERO_B ? ' hero-card--inline' : ''}" id="heroCard" novalidate>
      <div class="hero-card__row">
        <label class="sr-only" for="heroEmail">Work email</label>
        <input id="heroEmail" type="email" autocomplete="email" placeholder="Enter your work email">
        <button class="btn btn--md hero-card__btn" type="submit"><span>Contact us</span></button>
      </div>
      <p class="hero-card__error" id="heroEmailError" aria-live="polite"></p>
      <a class="hero-card__alt" href="${U.pricing}">Or start a 14-day free trial ${ARROW}</a>
    </form>`);
  $('#heroCard').addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#heroEmail'), v = input.value.trim(), err = $('#heroEmailError');
    if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { err.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    err.textContent = '';
    try { if (v) sessionStorage.setItem('formeeContactEmail', v); } catch (x) { /* storage unavailable */ }
    location.href = U.contact();
  });

  /* ---------- Marquee, trust ---------- */
  const names = BUSINESSES.flatMap(b => b.products.map(p => `<span class="marquee__item">${p.name}</span>`)).join('');
  if ($('#marquee')) $('#marquee').innerHTML = names + names.replace(/class="marquee__item"/g, 'class="marquee__item" aria-hidden="true"');

  // Safe AI cards with the Figma graphics (node 1121:13450, 2026-11-26): an illustration panel on top, title and line below.
  // Graphics exported from Figma as SVG (assets/safe-ai); width is the share of the 411px Figma panel each one takes.
  $('#trustGrid').innerHTML = S.trustArtHTML();
  $('#toolsLine').textContent = `${TOOLS} AI tools, grouped the way you work. Every tool has a demo on request.`;

  /* ---------- Start with your industry. (8 photo tiles) + Every tool, by industry. (full list) ----------
     Option 2 chosen 2026-11-24: each industry has one photo, shown big on its tile and as a thumbnail in the tool list.
     Photos are placeholders showing the shot brief until real images are chosen. */
  const SHOT = {
    hr: 'Small team meeting in a bright office', education: 'Lecturer and students in a classroom',
    security: 'Operator watching camera screens', childcare: 'Educator playing with toddlers',
    health: 'Carer with an older person', 'real-estate': 'Agent showing a home to a couple',
    sports: 'Coach training athletes outdoors', 'sales-marketing': 'Marketer reviewing a campaign'
  };
  // Industry photos exported from Figma (node 1080:250, 612 x 423 crops); falls back to the shot-brief placeholder
  const PHOTOS = new Set(['hr', 'education', 'security', 'childcare', 'health', 'real-estate', 'sports', 'sales-marketing']);
  const photo = (b, cls) => PHOTOS.has(b.id)
    ? `<span class="photo-ph photo-ph--img ${cls}"><img src="assets/industries/${b.id}.jpg" alt="${SHOT[b.id] || b.name}" loading="lazy" width="612" height="423"></span>`
    : `<span class="photo-ph ${cls}" role="img" aria-label="${b.name} photo">${S.I('image', 20)}<small>${SHOT[b.id] || b.name}</small></span>`;

  // Tile order follows the Figma grid (2026-11-25): HR, Sales and Marketing, Security, Education / Health, Childcare, Real Estate, Sports
  const TILE_ORDER = ['hr', 'sales-marketing', 'security', 'education', 'health', 'childcare', 'real-estate', 'sports'];
  const tilesInOrder = TILE_ORDER.map(id => BUSINESSES.find(b => b.id === id)).filter(Boolean).concat(BUSINESSES.filter(b => !TILE_ORDER.includes(b.id)));
  // Cards variant (v3-store-cards.html): full-photo cards with a soft brand gradient at the bottom,
  // name + tool count by default; description and arrow slide in on hover
  const overlayTiles = () => tilesInOrder.map((b, i) => `
    <a class="ind-ov r up" href="${U.industry(b.id)}" style="--rd:${(i % 4) * .05}s">
      ${photo(b, 'ind-ov__photo')}
      <span class="ind-ov__shade" aria-hidden="true"></span>
      <span class="ind-ov__body">
        <span class="ind-ov__name">${b.name}</span>
        <span class="ind-ov__tag">${b.tagline}</span>
        <span class="ind-ov__count">${b.products.length} ${b.products.length > 1 ? 'tools' : 'tool'}</span>
      </span>
      <span class="ind-ov__go" aria-hidden="true">${ARROW}</span>
    </a>`).join('');
  // Comparison copy of the section with overlay cards (v3-store.html, below the normal tiles)
  if ($('#indTilesOv')) $('#indTilesOv').innerHTML = overlayTiles();
  if (document.body.dataset.cards === 'overlay') $('#indTiles').innerHTML = overlayTiles();
  else
  $('#indTiles').innerHTML = tilesInOrder.map((b, i) => `
    <a class="ind-tile ind-tile--photo r up" href="${U.industry(b.id)}" style="--rd:${(i % 4) * .05}s">
      ${photo(b, 'ind-tile__photo')}
      <span class="ind-tile__body">
        <span class="ind-tile__head"><span class="ind-tile__name">${b.name}</span></span>
        <span class="ind-tile__tag">${b.tagline}</span>
        <span class="ind-tile__foot"><span class="ind-tile__count">${b.products.length} ${b.products.length > 1 ? 'tools' : 'tool'}</span><span class="ind-tile__go">${ARROW}</span></span>
      </span>
    </a>`).join('');

  if ($('#toolIndex')) $('#toolIndex').innerHTML = tilesInOrder.map(b => `
    <div class="tool-index__group r up">
      <a class="tool-index__ind" href="${U.industry(b.id)}">
        <span class="mega-row__icon mega-row__icon--sm">${S.I(b.icon, 18)}</span>
        <span class="tool-index__ind-name">${b.name}</span>
      </a>
      <ul class="tool-index__list">${b.products.map(p => `
        <li><a class="tool-index__row" href="${U.tool(p)}"${p.external ? ' target="_blank" rel="noopener"' : ''}>
          <span class="tool-index__text"><b>${p.name}${tag(p)}</b><small>${p.summary}</small></span>
          <span class="tool-index__go">${p.external ? EXT : ARROW}</span>
        </a></li>`).join('')}
      </ul>
    </div>`).join('');

  /* ---------- Tools compare page (v3-store-tools.html, 2026-11-26) ----------
     No product screenshots exist, so each tool gets its own Lucide icon on its industry's gradient (c1 -> c2).
     Option 1: app-icon grid with industry filter chips (cards re-flow with a short FLIP animation).
     Option 2: industry list on the left, that industry's tools in a tinted panel on the right; auto-cycles every 6s, pauses on hover. */
  const { TOOL_ICON, appIcon } = S;
  const toolAttrs = p => `href="${U.tool(p)}"${p.external ? ' target="_blank" rel="noopener"' : ''}`;

  if ($('#toolGrid')) {
    const all = tilesInOrder.flatMap(b => b.products.map(p => ({ p, b })));
    $('#toolFilter').innerHTML = [`<button class="tool-chip is-on" type="button" role="tab" aria-selected="true" data-f="all">All <span>${all.length}</span></button>`]
      .concat(tilesInOrder.map(b => `<button class="tool-chip" type="button" role="tab" aria-selected="false" data-f="${b.id}">${b.name} <span>${b.products.length}</span></button>`)).join('');
    $('#toolGrid').innerHTML = all.map(({ p, b }) => `
      <a class="tool-card" ${toolAttrs(p)} data-ind="${b.id}" style="--c1:${b.c1};--c2:${b.c2}">
        <span class="tool-card__top">${appIcon(p, b)}<span class="tool-card__ind">${b.name}</span></span>
        <b class="tool-card__name">${p.name}${tag(p)}</b>
        <span class="tool-card__desc">${p.summary}</span>
        <span class="tool-card__go">View tool ${p.external ? EXT : ARROW}</span>
      </a>`).join('');
    const cards = $$('#toolGrid .tool-card');
    $('#toolFilter').addEventListener('click', e => {
      const chip = e.target.closest('.tool-chip');
      if (!chip || chip.classList.contains('is-on')) return;
      $$('#toolFilter .tool-chip').forEach(c => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
      const f = chip.dataset.f;
      const before = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
      cards.forEach(c => { c.hidden = f !== 'all' && c.dataset.ind !== f; });
      if (reduce) return;
      cards.filter(c => !c.hidden).forEach((c, i) => {
        const a = before.get(c), r = c.getBoundingClientRect();
        const wasHidden = !a.width;
        c.animate(wasHidden
          ? [{ opacity: 0, transform: 'translateY(12px) scale(.97)' }, { opacity: 1, transform: 'none' }]
          : [{ transform: `translate(${a.left - r.left}px, ${a.top - r.top}px)` }, { transform: 'none' }],
          { duration: 420, delay: wasHidden ? i * 30 : 0, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
      });
    });
  }

  if ($('#toolExplore')) {
    $('#toolExplore').innerHTML = `
      <div class="tool-explore__nav" role="tablist" aria-label="Industries">${tilesInOrder.map((b, i) => `
        <button class="tool-explore__ind${i ? '' : ' is-on'}" type="button" role="tab" aria-selected="${!i}" data-i="${i}" data-ind="${b.id}" style="--c1:${b.c1};--c2:${b.c2}">
          <span class="tool-explore__ind-icon">${S.I(b.icon, 18)}</span>
          <span class="tool-explore__ind-name">${b.name}</span>
          <span class="tool-explore__ind-count">${b.products.length}</span>
          <span class="tool-explore__bar"><i></i></span>
        </button>`).join('')}
      </div>
      <div class="tool-explore__stage">${tilesInOrder.map((b, i) => `
        <div class="tool-explore__panel${i ? '' : ' is-on'}" role="tabpanel" style="--c1:${b.c1};--c2:${b.c2}"${i ? ' hidden' : ''}>
          <span class="tool-explore__art" aria-hidden="true">${S.I(b.icon, 220)}</span>
          <div class="tool-explore__head">
            <h3>${b.headline}</h3>
            <p>${b.desc}</p>
          </div>
          <div class="tool-explore__list${b.products.length > 2 ? ' tool-explore__list--many' : ''}">${b.products.map((p, k) => `
            <a class="tool-explore__tool" ${toolAttrs(p)} style="--k:${k}">
              ${appIcon(p, b, 22)}
              <span class="tool-explore__tool-text"><b>${p.name}${tag(p)}</b><small>${p.summary}</small></span>
              <span class="tool-explore__go">${p.external ? EXT : ARROW}</span>
            </a>`).join('')}
          </div>
        </div>`).join('')}
      </div>`;
    const inds = $$('#toolExplore .tool-explore__ind'), panels = $$('#toolExplore .tool-explore__panel');
    let cur = 0;
    const show = i => {
      if (i === cur) return;
      inds[cur].classList.remove('is-on'); inds[cur].setAttribute('aria-selected', false);
      panels[cur].classList.remove('is-on'); panels[cur].hidden = true;
      cur = i;
      inds[cur].classList.add('is-on'); inds[cur].setAttribute('aria-selected', true);
      panels[cur].hidden = false;
      void panels[cur].offsetWidth;
      panels[cur].classList.add('is-on');
    };
    // Scroll-driven: the pinned block steps through the industries as the page scrolls;
    // the bar under the active industry fills with the scroll progress of that step.
    // Clicking an industry scrolls to its step. Without room to pin (small screens) it falls back to click to switch.
    const scroller = $('#toolExploreScroll');
    const N = inds.length;
    const pinned = () => getComputedStyle(scroller).getPropertyValue('--pinned').trim() === '1';
    const span = () => scroller.offsetHeight - innerHeight;
    const update = () => {
      if (!pinned()) return;
      const top = scroller.getBoundingClientRect().top;
      const p = clamp(-top / Math.max(1, span()), 0, .9999);
      const f = p * N, i = Math.floor(f);
      show(i);
      inds.forEach((b, k) => b.style.setProperty('--fill', k < i ? 1 : k === i ? (f - i).toFixed(3) : 0));
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
    inds.forEach((b, i) => b.addEventListener('click', () => {
      if (!pinned()) return show(i);
      const y = scroller.getBoundingClientRect().top + scrollY + span() * (i + .5) / N;
      scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }));
  }

  /* ---------- Pricing teaser, FAQ, closing call to action ---------- */
  $('#billingSlot').innerHTML = S.billingToggleHTML('billingToggle');
  $('#plans').innerHTML = S.tiersHTML();
  $('#faqList').innerHTML = S.faqHTML(FAQ);
  $('#closingCta').outerHTML = S.ctaBand('Find the right tools for your team.', 'Start a 14-day free trial, or talk to the Formee team about your industry.', null, null);

  /* ---------- Why Formee statement: words fill in on scroll, *wrapped* words get the brand gradient ---------- */
  const statement = $('#statement');
  let accent = false;
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map(w => {
    if (w.startsWith('*')) accent = true;
    const cls = accent ? 'w w--accent' : 'w';
    if (/\*[.,]?$/.test(w)) accent = false;
    return `<span class="${cls}">${w.replace(/\*/g, '')}</span>`;
  }).join(' ');

  /* ---------- Shared chrome ---------- */
  S.init({ active: 'home' });
  S.initBilling($('#billingToggle'));

  /* ---------- Scroll-driven state: Why Formee statement fill ---------- */
  const stWords = $$('.w', statement);
  const line = $('.together__line'), together = $('.together');
  // These two are driven by the scroll below, not by the generic reveal
  [line, together].forEach(el => el && el.classList.remove('r', 'up'));
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight, sr = statement.getBoundingClientRect();
    const n = Math.round(clamp((vh * .85 - sr.top) / (sr.height + vh * .35)) * stWords.length);
    stWords.forEach((w, i) => w.classList.toggle('is-on', i < n));
    // Why Formee story: the divider draws down with the scroll, then "Formee brings it together." rises in
    if (line && together) {
      const lr = line.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh * .8 - lr.top) / (lr.height + vh * .12));
      line.style.setProperty('--draw', p.toFixed(3));
      together.classList.toggle('is-in', p > .96);
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
})();
