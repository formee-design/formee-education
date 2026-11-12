/* Shared behaviour for the Pulse sub pages (Pricing, Terms of Use, Privacy Policy).
   Same canvas rules, reveals, nav and buttons as the landing page (main.js), without the landing-only scenes. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = $('#page');

  /* 1920 canvas with a 1440 content column, same as the landing page.
     1600–1920 wide: real size. Narrower: scale so 80 real px stays on each side. Wider: scale up. */
  let zoom = 1, rectK = 1;
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;left:0;top:0;width:100px;height:1px;visibility:hidden';
  page.appendChild(probe);
  const navWrap = $('#nav');
  function fit() {
    const cw = document.documentElement.clientWidth;
    zoom = cw > 1920 ? cw / 1920 : cw < 1600 ? (cw - 160) / 1440 : 1;
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

  /* Pricing data (same plans as the landing page) */
  const plansEl = $('#plans');
  if (plansEl) {
    const F = ['Brand Kit on every post', 'Images and 8s videos up to 720p', '16s videos', '24s and 30s videos', '1080p export'];
    const plans = [
      { name: 'Free Trial', desc: 'Try Pulse on your own brand before you pay.', cr: '40 credits', per: ' / one time', up: 'Up to 40 images or 2 videos', m: 0, a: 0, unit: 'one time', note: 'Try it once. Upgrade when you are ready.', cta: 'Start free trial', outline: true, off: [2, 3, 4, 7, 8], rest: ['1 brand, 1 team member', 'Library voices and music', 'Custom voices', 'Buy extra credits'] },
      { name: 'Basic', desc: 'For one brand that posts every week.', cr: '200 credits', per: ' / month', up: 'Up to 200 images or 10 videos', m: 49, a: 42, unit: '/month', year: '$500', save: '$88', cta: 'Upgrade now', off: [2, 3, 4], rest: ['1 brand, 1 team member', 'Library voices and music', '1 custom voice', 'Buy extra credits anytime'] },
      { name: 'Standard', best: true, desc: 'For growing brands that need longer, sharper videos.', cr: '520 credits', per: ' / month', up: 'Up to 520 images or 26 videos', m: 129, a: 110, unit: '/month', year: '$1,316', save: '$232', cta: 'Upgrade now', off: [3], rest: ['3 brands, 3 team members', 'Library voices and music', '3 custom voices', 'Buy extra credits anytime'] },
      { name: 'Premium', desc: 'For teams running several brands at full volume.', cr: '1,200 credits', per: ' / month', up: 'Up to 1,200 images or 60 videos', m: 299, a: 254, unit: '/month', year: '$3,050', save: '$538', cta: 'Upgrade now', off: [], rest: ['10 brands, 5 team members', 'Library voices and music', '5 custom voices', 'Buy extra credits anytime'] },
    ];
    plansEl.innerHTML = plans.map((p, i) => `
      <article class="plan r up${p.best ? ' best' : ''}" style="--d:${i * .1}s">
        <div class="p-name">${p.name}${p.best ? '<span class="tag">Most popular</span>' : ''}</div>
        <p class="p-desc">${p.desc}</p>
        <div class="p-credit"><b>${p.cr}<span>${p.per}</span></b><small>${p.up}</small></div>
        <div class="p-block">
          <div class="p-price">${p.m ? `<s>$${p.m}</s>` : ''}<strong data-m="${p.m}" data-a="${p.a}">$${p.a}</strong><span>${p.unit}</span></div>
          <p class="p-note">${p.m ? `<span class="yr">Billed ${p.year} a year. <em>Save ${p.save}.</em></span><span class="mo">Billed monthly. Cancel anytime.</span>` : p.note}</p>
        </div>
        <a class="btn${p.outline ? ' outline' : ''}" href="#"><span>${p.cta}</span></a>
        <ul class="p-feats">${[...F, ...p.rest].map((t, k) => `<li class="${p.off.includes(k) ? 'off' : ''}" style="--fd:${.3 + i * .08 + k * .04}s"><img src="assets/${p.off.includes(k) ? 'ic-x' : 'ic-check'}.svg" alt="">${t}</li>`).join('')}</ul>
      </article>`).join('');
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

  /* Count-up for prices */
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

  /* Scroll reveals */
  const show = el => el.classList.add(el.matches('[data-split]') ? 'split-in' : 'in');
  const hide = el => el.classList.remove(el.matches('[data-split]') ? 'split-in' : 'in');
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) show(e.target);
    else if (e.boundingClientRect.top > 0) hide(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.r, [data-split]').forEach(el => { if (!el.hasAttribute('data-auto')) io.observe(el); });
  requestAnimationFrame(() => requestAnimationFrame(() => $$('[data-auto]').forEach(show)));

  /* Button ripple and magnetic pull */
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn:not(.ghost)');
    if (!b) return;
    const r = b.getBoundingClientRect();
    const s = document.createElement('i');
    s.className = 'ripple';
    const k = b.offsetWidth / r.width;
    s.style.left = (e.clientX - r.left) * k + 'px';
    s.style.top = (e.clientY - r.top) * k + 'px';
    s.style.width = s.style.height = b.offsetWidth * 2.2 + 'px';
    b.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  });
  $$('[data-magnetic]').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      b.style.translate = `${x * 10}px ${y * 8}px`;
    });
    b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    b.style.transition = (getComputedStyle(b).transition || '') + ', translate .35s cubic-bezier(.16,1,.3,1)';
  });

  /* Nav pill: rests on the current page link */
  const navLinks = $('#navLinks');
  const pill = $('.nav-pill');
  const current = $('a.on', navLinks);
  const movePill = a => {
    if (!a) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.left = a.offsetLeft - 14 + 'px';
    pill.style.width = a.offsetWidth + 28 + 'px';
  };
  $$('a', navLinks).forEach(a => a.addEventListener('pointerenter', () => movePill(a)));
  navLinks.addEventListener('pointerleave', () => movePill(current));
  addEventListener('load', () => movePill(current));

  /* Pricing toggle (Annual is the default, as in Figma) */
  const toggle = $('#toggle');
  if (toggle) {
    const thumb = $('.thumb', toggle);
    let mode = 'annual';
    const place = b => { thumb.style.width = b.offsetWidth + 'px'; thumb.style.transform = `translateX(${b.offsetLeft - 3}px)`; };
    addEventListener('load', () => place($('button.on', toggle)));
    $$('button', toggle).forEach(b => b.addEventListener('click', () => {
      if (b.dataset.mode === mode) return;
      mode = b.dataset.mode;
      $$('button', toggle).forEach(x => x.classList.toggle('on', x === b));
      place(b);
      plansEl.classList.toggle('annual', mode === 'annual');
      const save = $('.save');
      save.classList.remove('bump'); void save.offsetWidth; save.classList.add('bump');
      $$('.p-price strong').forEach(s => {
        const from = +s.textContent.replace('$', '');
        countTo(s, from, +s.dataset[mode === 'annual' ? 'a' : 'm'], 700, v => '$' + v);
      });
    }));
  }

  /* FAQ accordion */
  $$('.q button').forEach(b => b.addEventListener('click', () => {
    const q = b.parentElement, open = q.classList.contains('open');
    $$('.q').forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
    if (!open) { q.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  }));

  /* Legal pages: contents list follows the section in view */
  const toc = $$('.toc a');
  const tocTargets = toc.map(a => $(a.getAttribute('href')));

  /* Scroll loop: progress bar, nav state, contents highlight */
  const nav = $('#nav');
  const progress = $('#progress');
  let lastToc = null;
  function frame() {
    const vh = innerHeight, y = scrollY;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;
    nav.classList.toggle('scrolled', y > 40);
    if (toc.length) {
      let cur = toc[0];
      tocTargets.forEach((s, i) => { if (s && top(s) < vh * .35) cur = toc[i]; });
      if (y >= max - 2) cur = toc[toc.length - 1];
      if (cur !== lastToc) { toc.forEach(a => a.classList.toggle('on', a === cur)); lastToc = cur; }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if (reduce) $$('.r, [data-split]').forEach(show);
})();
