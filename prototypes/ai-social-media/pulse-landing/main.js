(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = $('#page');

  /* The design is a 1920 canvas with a 1440 content column.
     The 1440 column sits inside Synthesia's gutter (48px + 5.5vw each side), so the left and right lines match theirs at every width.
     About 1730–1920 wide: real size (zoom 1). Narrower: the column scales down, as Synthesia's type does. Wider: scale up so the backgrounds reach the edges. */
  let zoom = 1, rectK = 1;
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;left:0;top:0;width:100px;height:1px;visibility:hidden';
  page.appendChild(probe);
  const navWrap = $('#nav');
  function fit() {
    const cw = document.documentElement.clientWidth;
    // Side gutter follows Synthesia: 48px + 5.5% of the width each side, column capped at 1459 (= 230 each side at 1920).
    const col = Math.min(1459, cw - 2 * (48 + 0.055 * cw));
    zoom = cw > 1920 ? cw / 1920 : Math.min(1, col / 1440);
    page.style.zoom = zoom;
    const off = Math.min(0, (cw / zoom - 1920) / 2);
    page.style.marginLeft = page.style.marginRight = off + 'px';
    if (navWrap) navWrap.style.left = off + 'px';
    const w = probe.getBoundingClientRect().width;
    rectK = w ? (100 * zoom) / w : 1;
  }
  fit();
  addEventListener('resize', fit);
  const top = el => el.getBoundingClientRect().top * rectK;
  const height = el => el.getBoundingClientRect().height * rectK;

  /* Exported layers carry a flat backdrop, so crop each to its card and draw the shadow here. */
  const S1 = 'drop-shadow(0 16px 40px rgba(15,23,41,.1))';
  const crops = {
    'f1-base': [24, 40, 56, 40, '16px', S1],
    'f1-glass': [20, 32, 44, 32, '18px', 'drop-shadow(0 12px 32px rgba(237,119,151,.22))'],
    'f1-colors': [1, 2, 3, 2, '10px', 'drop-shadow(0 1px 2px rgba(15,23,41,.05))'],
    'f1-tag-font': [0, 0, 0, 0, '6px 6px 0 0', ''],
    'f1-tag-voice': [0, 0, 0, 0, '6px 6px 0 0', ''],
    'w-media': [24, 40, 56, 40, '16px', S1],
    'w-prompt': [17.2, 27, 36.6, 26.6, '13.44px', 'drop-shadow(0 10px 27px rgba(79,109,230,.1))'],
    'w-timeline': [20.16, 33.6, 47, 33.6, '13.44px', 'drop-shadow(0 13.44px 33.6px rgba(15,23,41,.1))'],
    'f2-stages': [24.1, 40, 56.2, 40, '16px', S1],
    'f2-popover': [8, 20, 32, 20, '12px', 'drop-shadow(0 12px 20px rgba(15,23,41,.1))'],
    'f2-rot-heart': [1.7, 3.3, 4.3, 2.7, '12px', 'drop-shadow(0 1px 3px rgba(15,23,41,.1))'],
    'f2-rot-cap': [1.9, 3, 4.1, 3, '12px', 'drop-shadow(0 1px 3px rgba(15,23,41,.1))'],
    'f4-post': [24, 40, 56, 40, '16px', S1],
    'f4-calendar': [24, 40, 56, 40, '16px', S1],
    'f4-publish': [24, 40, 56, 40, '16px', S1],
  };
  $$('.panel img').forEach(img => {
    const key = img.getAttribute('src').split('/').pop().split('?')[0].replace('.png', '');
    const c = crops[key];
    if (!c) return;
    img.style.clipPath = `inset(${c[0]}px ${c[1]}px ${c[2]}px ${c[3]}px round ${c[4]})`;
    if (c[5]) img.parentElement.style.filter = c[5];
  });

  /* Generated content */
  const logos = [[108, 34], [125, 40], [113, 34], [123, 46], [128, 26], [97, 34], [100, 34]];
  const track = $('#logoTrack');
  for (let copy = 0; copy < 4; copy++) logos.forEach(([w, h], i) => {
    const img = new Image(); img.src = `assets/logo-${i + 1}.png`; img.alt = ''; img.width = w; img.height = h;
    track.appendChild(img);
  });

  const F = ['Brand Kit on every post', 'Images and 8s videos up to 720p', '16s videos', '24s and 30s videos', '1080p export'];
  const plans = [
    { name: 'Free Trial', desc: 'Try Pulse on your own brand before you pay.', cr: '40 credits', per: ' / one time', up: 'Up to 40 images or 2 videos', m: 0, a: 0, unit: 'one time', cta: 'Start free trial', outline: true, off: [2, 3, 4, 7, 8], rest: ['1 brand, 1 team member', 'Library voices and music', 'Custom voices', 'Buy extra credits'] },
    { name: 'Basic', desc: 'For one brand that posts every week.', cr: '200 credits', per: ' / month', up: 'Up to 200 images or 10 videos', m: 49, a: 42, unit: '/month', cta: 'Upgrade now', off: [2, 3, 4], rest: ['1 brand, 1 team member', 'Library voices and music', '1 custom voice', 'Buy extra credits anytime'] },
    { name: 'Standard', best: true, desc: 'For growing brands that need longer, sharper videos.', cr: '520 credits', per: ' / month', up: 'Up to 520 images or 26 videos', m: 129, a: 110, unit: '/month', cta: 'Upgrade now', off: [3], rest: ['3 brands, 3 team members', 'Library voices and music', '3 custom voices', 'Buy extra credits anytime'] },
    { name: 'Premium', desc: 'For teams running several brands at full volume.', cr: '1,200 credits', per: ' / month', up: 'Up to 1,200 images or 60 videos', m: 299, a: 254, unit: '/month', cta: 'Upgrade now', off: [], rest: ['10 brands, 5 team members', 'Library voices and music', '5 custom voices', 'Buy extra credits anytime'] },
  ];
  $('#plans').innerHTML = plans.map((p, i) => `
    <article class="plan r up${p.best ? ' best' : ''}" style="--d:${i * .1}s">
      <div class="p-name">${p.name}${p.best ? '<span class="tag">Most popular</span>' : ''}</div>
      <p class="p-desc">${p.desc}</p>
      <div class="p-credit"><b>${p.cr}<span>${p.per}</span></b><small>${p.up}</small></div>
      <div class="p-price">${p.m ? `<s>$${p.m}</s>` : ''}<strong data-m="${p.m}" data-a="${p.a}">$${p.m}</strong><span>${p.unit}</span></div>
      <a class="btn${p.outline ? ' outline' : ''}" href="#"><span>${p.cta}</span></a>
      <ul class="p-feats">${[...F, ...p.rest].map((t, k) => `<li class="${p.off.includes(k) ? 'off' : ''}" style="--fd:${.3 + i * .08 + k * .04}s"><img src="assets/${p.off.includes(k) ? 'ic-x' : 'ic-check'}.svg" alt="">${t}</li>`).join('')}</ul>
    </article>`).join('');

  const faqs = [
    ['What is a credit?', 'Credits pay for generation. A 16-second 480p video uses 20 credits, and you see the cost on the Generate button before you start.'],
    ['Can I use my own logo, fonts and colors?', 'Placeholder answer for the accordion motion.'],
    ['Which social accounts can I publish to?', 'Placeholder answer for the accordion motion.'],
    ['Can I manage more than one brand?', 'Placeholder answer for the accordion motion.'],
    ['Who owns what I make in Pulse?', 'Placeholder answer for the accordion motion.'],
    ['Can I cancel anytime?', 'Placeholder answer for the accordion motion.'],
  ];
  $('#faqList').innerHTML = faqs.map(([q, a], i) => `
    <div class="q r up${i === 0 ? ' open' : ''}" style="--d:${i * .06}s">
      <button aria-expanded="${i === 0}"><span>${q}</span><img src="assets/ic-chevron.svg" alt=""></button>
      <div class="a"><div><p>${a}</p></div></div>
    </div>`).join('');

  const imgs = Array.from({ length: 20 }, (_, i) => `assets/wall/w${String(i + 1).padStart(2, '0')}.${i === 2 || i === 18 ? 'jpg' : 'png'}`);
  const patterns = [[150, 188, 188, 267], [188, 150, 150, 188], [267, 267, 188], [188, 188, 267], [150, 150, 188, 188], [267, 188, 188]];
  const wall = $('#wall');
  let n = 0;
  for (let c = 0; c < 13; c++) {
    const col = document.createElement('div');
    col.className = 'col' + (c % 2 ? ' down' : '');
    col.style.setProperty('--ci', Math.abs(c - 6)); /* rise from the middle outward when the wall enters (11/13) */
    const t = document.createElement('div');
    t.className = 'col-track';
    t.style.setProperty('--t', `${88 + (c * 14) % 48}s`); /* half speed (11/12) */
    const set = [...patterns[c % patterns.length], ...patterns[(c + 3) % patterns.length]];
    const html = set.map(h => `<img src="${imgs[n++ % imgs.length]}" alt="" style="height:${h}px">`).join('');
    t.innerHTML = html + html;
    col.appendChild(t);
    wall.appendChild(col);
  }

  /* Split headings into masked words */
  $$('[data-split]').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(' '));
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('i'); inner.textContent = part;
            inner.style.setProperty('--wd', `${(el.hasAttribute('data-auto') ? .25 : 0) + i++ * .055}s`);
            w.appendChild(inner); frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeName !== 'BR') walk(ch);
      });
    };
    walk(el);
  });

  $$('[data-fill]').forEach(el => {
    const walk = node => [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) return frag.appendChild(document.createTextNode(' '));
          const s = document.createElement('span'); s.className = 'fw'; s.textContent = p; frag.appendChild(s);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeName !== 'BR') walk(ch);
    });
    walk(el);
  });

  /* Count-up */
  const easeOut = t => 1 - Math.pow(2, -10 * t);
  function countTo(el, from, to, dur, fmt) {
    if (el._raf) cancelAnimationFrame(el._raf);
    const t0 = performance.now();
    const tick = now => {
      const p = clamp((now - t0) / dur);
      el.textContent = fmt(Math.round(from + (to - from) * easeOut(p)));
      if (p < 1) el._raf = requestAnimationFrame(tick);
    };
    el._raf = requestAnimationFrame(tick);
  }
  const startCount = el => countTo(el, 0, +el.dataset.count, 2000, v => v + el.dataset.suffix);
  const resetCount = el => { if (el._raf) cancelAnimationFrame(el._raf); el.textContent = '0' + el.dataset.suffix; };

  /* Scroll reveals. They reset below the fold so motion can be replayed. */
  const show = el => {
    if (el.matches('[data-split]')) el.classList.add('split-in');
    else el.classList.add('in');
    $$('[data-count]', el).forEach(startCount);
  };
  const hide = el => {
    if (el.matches('[data-split]')) el.classList.remove('split-in');
    else el.classList.remove('in');
    $$('[data-count]', el).forEach(resetCount);
  };
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) show(e.target);
    else if (e.boundingClientRect.top > 0 && $$('[data-count]', e.target).length) hide(e.target); /* reveals play once; only count-ups replay */
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  const targets = $$('.r, [data-split]');
  targets.forEach(el => {
    if (el.closest('.panel') && !el.matches('.panel')) return;
    if (el.closest('.strip')) return;
    if (el.hasAttribute('data-auto')) return;
    io.observe(el);
  });
  /* Children of a panel follow the panel */
  const panelIo = new IntersectionObserver(entries => entries.forEach(e => {
    const kids = $$('.r', e.target);
    if (e.isIntersecting) kids.forEach(k => k.classList.add('in'));
  }), { threshold: .22 });
  $$('.panel').forEach(p => panelIo.observe(p));

  /* Demo video plays from the start whenever it comes into view */
  const video = $('#demoVideo');
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (video.paused) { video.currentTime = 0; video.play().catch(() => {}); } }
    else video.pause();
  }, { threshold: .35 }).observe(video);

  /* Showcase card videos play only while the strip is on screen */
  const cardVideos = $$('.card-video');
  new IntersectionObserver(([e]) => {
    cardVideos.forEach(v => e.isIntersecting ? v.play().catch(() => {}) : v.pause());
  }, { threshold: .1 }).observe($('#strip'));

  /* Hero intro */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $$('[data-auto]').forEach(el => show(el));
    $$('.strip .r').forEach(el => el.classList.add('in'));
  }));

  /* Typewriter */
  const typedEl = $('#typed');
  const promptBox = $('.prompt');
  let typeToken = 0;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  async function typeText(text) {
    const id = ++typeToken;
    promptBox.classList.add('busy');
    while (typedEl.textContent.length) {
      if (id !== typeToken) return;
      typedEl.textContent = typedEl.textContent.slice(0, -3);
      await wait(8);
    }
    for (let i = 1; i <= text.length; i++) {
      if (id !== typeToken) return;
      typedEl.textContent = text.slice(0, i);
      await wait(16 + Math.random() * 22);
    }
    promptBox.classList.remove('busy');
  }
  const firstPrompt = 'Launch video for our new oat latte. Maya pours it at the counter, warm morning light, a little playful.';
  if (!typedEl) {} // B version has no prompt box
  else if (reduce) typedEl.textContent = firstPrompt;
  else setTimeout(() => typeText(firstPrompt), 1000);
  $$('[data-prompt]').forEach(b => b.addEventListener('click', () => typeText(b.dataset.prompt)));

  /* Button ripple and magnetic pull removed (11/12): buttons only react on hover */

  /* Nav */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const pill = $('.nav-pill');
  const links = $$('a', navLinks);
  const movePill = a => {
    if (!a) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.left = a.offsetLeft - 14 + 'px';
    pill.style.width = a.offsetWidth + 28 + 'px';
  };
  let activeLink = null;
  links.forEach(a => a.addEventListener('pointerenter', () => movePill(a)));
  navLinks.addEventListener('pointerleave', () => movePill(activeLink));

  /* Pricing toggle */
  const toggle = $('#toggle'), thumb = $('.thumb', toggle), plansEl = $('#plans');
  let mode = 'monthly';
  $$('button', toggle).forEach(b => b.addEventListener('click', () => {
    if (b.dataset.mode === mode) return;
    mode = b.dataset.mode;
    $$('button', toggle).forEach(x => x.classList.toggle('on', x === b));
    thumb.style.width = b.offsetWidth + 'px';
    thumb.style.transform = `translateX(${b.offsetLeft - 4}px)`;
    plansEl.classList.toggle('annual', mode === 'annual');
    const save = $('.save');
    save.classList.remove('bump'); void save.offsetWidth; save.classList.add('bump');
    $$('.p-price strong').forEach(s => {
      const from = +s.textContent.replace('$', '');
      countTo(s, from, +s.dataset[mode === 'annual' ? 'a' : 'm'], 700, v => '$' + v);
    });
  }));

  /* FAQ accordion */
  $$('.q button').forEach(b => b.addEventListener('click', () => {
    const q = b.parentElement, open = q.classList.contains('open');
    $$('.q').forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
    if (!open) { q.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  }));

  /* Pointer parallax and 3D tilt */
  let mx = 0, my = 0;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  const tilts = $$('[data-tilt]');
  tilts.forEach(p => {
    p._mx = 0; p._my = 0; p._tx = 0; p._ty = 0;
    p.addEventListener('pointermove', e => {
      const r = p.getBoundingClientRect();
      p._tx = (e.clientX - r.left) / r.width - .5;
      p._ty = (e.clientY - r.top) / r.height - .5;
    });
    p.addEventListener('pointerleave', () => { p._tx = 0; p._ty = 0; });
  });

  /* Single animation loop */
  const stripCards = $$('.strip .ly');
  const panelLayers = tilts.map(p => ({ p, ly: $$('.ly', p) }));
  const glows = $$('[data-mouse]');
  const demo = $('#demo'), demoStage = $('#demoStage');
  const progress = $('#progress');
  const fills = $$('.fw');
  const fillHead = $('[data-fill]');
  const steps = $$('#steps li');
  const stepsEl = $('#steps');
  const sections = links.map(a => $(a.getAttribute('href')));
  let sm = { x: 0, y: 0 }, lastY = scrollY;

  function frame() {
    const vh = innerHeight, y = scrollY;
    sm.x += (mx - sm.x) * .07; sm.y += (my - sm.y) * .07;

    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;

    nav.classList.toggle('scrolled', y > 40);

    /* Glows stay still (11/12) */
    stripCards.forEach(c => {
      const d = +c.dataset.depth, sp = +c.dataset.speed;
      c.style.transform = `translate3d(0,${y * sp * .5}px,0)`; /* scroll only, half strength (11/12) */
    });

    /* Demo flattens from a tilt as it reaches the middle */
    const dp = clamp(1 - (top(demoStage) - vh * .12) / (vh * .78));
    const e = 1 - Math.pow(1 - dp, 3);
    demo.style.transform = `rotateX(${(1 - e) * 22}deg) scale(${.84 + e * .16}) translateY(${(1 - e) * 40}px)`;
    demo.style.opacity = .35 + e * .65;

    /* Word by word fill */
    if (fillHead) {
      const fp = clamp((vh * .86 - top(fillHead)) / (vh * .42));
      const lit = Math.round(fp * fills.length);
      fills.forEach((w, i) => w.classList.toggle('lit', i < lit));
    }

    /* Steps timeline */
    const sp = clamp((vh * .62 - top(stepsEl)) / height(stepsEl));
    const seg = sp * (steps.length - 1);
    steps.forEach((li, i) => {
      li.classList.toggle('on', sp > 0 && seg >= i - .02);
      const u = $('u', li);
      if (u) u.style.transform = `scaleY(${clamp(seg - i)})`;
    });

    /* Panels: pointer tilt and layer parallax (restored 11/13) */
    panelLayers.forEach(({ p, ly }) => {
      p._mx += (p._tx - p._mx) * .09; p._my += (p._ty - p._my) * .09;
      const r = top(p), inView = r < vh && r + 600 * zoom > 0;
      if (!inView) return;
      const pc = (r + 300 * zoom - vh / 2) / vh;
      p.style.setProperty('--tilt', `perspective(1400px) rotateY(${p._mx * 5}deg) rotateX(${-p._my * 5}deg)`);
      ly.forEach(l => {
        const d = +l.dataset.depth;
        l.style.transform = `translate3d(${p._mx * d}px,${p._my * d + pc * d * -1.1}px,0)`;
      });
    });

    /* Active nav link */
    let cur = null;
    sections.forEach((s, i) => { if (s && top(s) < vh * .45) cur = links[i]; });
    if (cur !== activeLink) {
      links.forEach(a => a.classList.toggle('on', a === cur));
      activeLink = cur;
      if (!navLinks.matches(':hover')) movePill(cur);
    }
    requestAnimationFrame(frame);
  }
  if (!reduce) requestAnimationFrame(frame);
  else { demo.style.transform = 'none'; $$('.fw').forEach(w => w.classList.add('lit')); steps.forEach(s => s.classList.add('on')); }
})();
