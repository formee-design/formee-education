(() => {
  'use strict';

  /* ---------- Content: edit categories and products here ---------- */
  const PULSE_URL = 'https://formee-design.github.io/formee-education/prototypes/ai-social-media/pulse-landing/index.html';

  // Copy is draft. Product one-liners need confirming with each product owner.
  // c1/c2 only tint each business visual; everything else uses the Pulse blue/pink.
  const BUSINESSES = [
    {
      id: 'education', name: 'Education',
      c1: 'var(--color-scale-purple-300)', c2: 'var(--color-brand-primary)',
      title: 'AI that gives teachers their time back',
      desc: 'From planning a course to marking the last assignment, one connected set of tools for schools and educators.',
      products: [
        { name: 'Course Design', short: 'Course Design', scene: 'course', desc: 'Plan units, lessons and assessments with AI that follows your curriculum.' },
        { name: 'Marking & Grading Tool', short: 'Marking & Grading', scene: 'marking', desc: 'Mark faster and more consistently, with AI feedback teachers can review and edit.' },
        { name: 'Learning Management System', short: 'LMS', scene: 'lms', desc: 'Deliver courses, track progress and keep every learner on the same page.' },
        { name: 'Student Management System', short: 'SMS', scene: 'sms', desc: 'Enrolments, attendance and student records, all in one place.' }
      ]
    },
    {
      id: 'real-estate', name: 'Real Estate',
      c1: 'var(--color-scale-orange-300)', c2: 'var(--color-scale-rose-300)',
      title: 'Read any site before you commit',
      desc: 'AI that brings land, zoning and market data together, so property decisions take minutes instead of weeks.',
      products: [
        { name: 'Plotara', short: 'Plotara', scene: 'plotara', desc: 'Analyse a plot, see what can be built on it and spot the risks before you buy.' }
      ]
    },
    {
      id: 'social-media', name: 'Social Media',
      c1: 'var(--color-brand-accent)', c2: 'var(--color-brand-violet)',
      title: 'Content that keeps up with your brand',
      desc: 'Plan, create and publish on-brand content for every channel, with AI doing the heavy lifting.',
      products: [
        { name: 'Pulse', short: 'Pulse', scene: 'pulse', desc: 'An AI content platform that turns your brand into ready-to-post images, carousels and videos.', live: true, href: PULSE_URL },
        { name: 'Blue Gen', short: 'Blue Gen', scene: 'bluegen', desc: 'Generate campaign visuals at scale, always in your brand style.' }
      ]
    },
    {
      id: 'finance', name: 'Finance',
      c1: 'var(--color-scale-teal-300)', c2: 'var(--color-scale-cyan-400)',
      title: 'Run people and pay with less paperwork',
      desc: 'Tools that keep hiring, payroll and crew operations accurate, without the spreadsheets.',
      products: [
        { name: 'HR Module', short: 'HR Module', scene: 'hr', desc: 'Hiring, onboarding and people records, handled in one flow.' },
        { name: 'CrewOS', short: 'CrewOS', scene: 'crewos', desc: 'One place to run your crew: schedules, shifts and pay together.' }
      ]
    },
    {
      id: 'ai-oversight', name: 'AI Oversight',
      c1: 'var(--color-scale-cyan-300)', c2: 'var(--color-scale-blue-400)',
      title: 'Keep every AI agent accountable',
      desc: 'As teams hand more work to AI agents, we make sure someone is always watching.',
      products: [
        { name: 'Watchdog', short: 'Watchdog', scene: 'watchdog', desc: 'Monitor what your AI agents do, flag risky actions and step in before they cause harm.' }
      ]
    },
    {
      id: 'security', name: 'Security / Safety',
      c1: 'var(--color-scale-yellow-300)', c2: 'var(--color-scale-orange-300)',
      title: 'Safety you can see coming',
      desc: 'Products that help people and sites stay safe, spotting risk early and acting fast.',
      products: [
        { name: 'Iceman', short: 'Iceman', scene: 'iceman', desc: 'Product summary coming soon.' },
        { name: 'Steelman', short: 'Steelman', scene: 'steelman', desc: 'Product summary coming soon.' },
        { name: 'Sportman', short: 'Sportman', scene: 'sportman', desc: 'Product summary coming soon.' }
      ]
    }
  ];

  /* ---------- Product scenes (v2): small illustrative UI per product. Content is mock data. ---------- */
  const SPARK = '<svg class="ui-spark" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5c.4 3.3 2.2 5.1 5.5 5.5v1c-3.3.4-5.1 2.2-5.5 5.5h-1c-.4-3.3-2.2-5.1-5.5-5.5V7c3.3-.4 5.1-2.2 5.5-5.5h1Z" fill="currentColor"/></svg>';
  const CHECK = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const avatar = (initials, tone) => `<span class="ui-avatar ui-avatar--${tone}">${initials}</span>`;
  const bar = (w, k = 0) => `<span class="ui-bar"><i style="--w:${w}%;--k:${k}"></i></span>`;
  const SCENES = {
    course: () => `
      <div class="ui-card ui-pos-a" style="--k:0;--l:0%;--t:4%;--wd:92%">
        <div class="ui-prompt">${SPARK}<span>Create a 10-week unit on workplace communication</span><i class="ui-caret"></i></div>
      </div>
      <div class="ui-card" style="--k:1;--l:8%;--t:28%;--wd:86%">
        <div class="ui-head"><b>Unit plan</b><span class="ui-chip ui-chip--blue">Aligned to curriculum</span></div>
        <ol class="ui-list">
          <li><span class="ui-num">W1</span>Communication basics<span class="ui-done">${CHECK}</span></li>
          <li><span class="ui-num">W2</span>Writing for the workplace<span class="ui-done">${CHECK}</span></li>
          <li><span class="ui-num">W3</span>Presenting ideas<span class="ui-chip ui-chip--violet">${SPARK}Generating</span></li>
          <li class="is-ghost"><span class="ui-num">W4</span><span class="ui-skel"></span></li>
        </ol>
      </div>`,
    marking: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:4%;--wd:84%">
        <div class="ui-head"><span class="ui-who">${avatar('MC', 'rose')}<span><b>Mia Chen</b><small>Assessment 2 · Business report</small></span></span><span class="ui-score">78<small>/100</small></span></div>
        <div class="ui-rubric">
          <div><span>Structure</span>${bar(90, 0)}<b>18/20</b></div>
          <div><span>Evidence</span>${bar(60, 1)}<b>12/20</b></div>
          <div><span>Clarity</span>${bar(75, 2)}<b>15/20</b></div>
        </div>
      </div>
      <div class="ui-card ui-card--ai" style="--k:1;--l:34%;--t:60%;--wd:64%">
        <div class="ui-ai-label">${SPARK}AI feedback</div>
        <p>Clear structure. Add one more source to support section 3.</p>
        <div class="ui-actions"><span class="ui-btn ui-btn--dark">Accept</span><span class="ui-btn">Edit</span></div>
      </div>`,
    lms: () => `
      <div class="ui-card" style="--k:0;--l:4%;--t:4%;--wd:88%">
        <div class="ui-head"><span><b>Diploma of Business</b><small>Module 4 of 8</small></span><span class="ui-chip ui-chip--green">52% complete</span></div>
        ${bar(52, 0)}
        <div class="ui-people">
          <div>${avatar('LP', 'blue')}<span>Liam Patel</span>${bar(84, 1)}<b>84%</b></div>
          <div>${avatar('AN', 'mint')}<span>Ava Nguyen</span>${bar(66, 2)}<b>66%</b></div>
          <div>${avatar('NS', 'amber')}<span>Noah Smith</span>${bar(41, 3)}<b>41%</b></div>
        </div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:46%;--t:78%;--wd:auto">
        <span class="ui-dot"></span>12 learners on track this week
      </div>`,
    sms: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:4%;--wd:90%">
        <div class="ui-head"><b>Students</b><span class="ui-chip">Term 2</span></div>
        <div class="ui-table">
          <div class="ui-tr ui-th"><span>Name</span><span>Status</span><span>Attendance</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('MC', 'rose')}Mia Chen</span><span class="ui-chip ui-chip--green">Enrolled</span><span>96%</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('LP', 'blue')}Liam Patel</span><span class="ui-chip ui-chip--orange">Pending</span><span>-</span></div>
          <div class="ui-tr"><span class="ui-who">${avatar('AN', 'mint')}Ava Nguyen</span><span class="ui-chip ui-chip--green">Enrolled</span><span>91%</span></div>
        </div>
      </div>
      <div class="ui-card" style="--k:1;--l:52%;--t:66%;--wd:46%">
        <div class="ui-stat"><small>Attendance today</small><b>94%</b></div>
        <div class="ui-spark-bars">${[60, 72, 68, 80, 76, 88, 94].map((h, i) => `<i style="--h:${h}%;--k:${i}"></i>`).join('')}</div>
      </div>`,
    plotara: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:70%">
        <div class="ui-head"><span><b>Lot 14, Maple St</b><small>612 m² · corner block</small></span><span class="ui-chip ui-chip--blue">R2 Residential</span></div>
        <svg class="ui-map" viewBox="0 0 240 110" aria-hidden="true">
          <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width=".6"/></pattern></defs>
          <rect width="240" height="110" fill="url(#g)"/>
          <path class="ui-map__lot" d="M70 22 L168 16 L182 84 L84 94 Z"/>
          <circle class="ui-map__pin" cx="126" cy="54" r="5"/>
        </svg>
      </div>
      <div class="ui-card" style="--k:1;--l:44%;--t:56%;--wd:56%">
        <div class="ui-ai-label">${SPARK}Site check</div>
        <ol class="ui-list ui-list--tight">
          <li>Flood overlay<span class="ui-chip ui-chip--green">Low</span></li>
          <li>Max height<span class="ui-chip">9 m</span></li>
          <li>Heritage<span class="ui-chip ui-chip--green">None</span></li>
        </ol>
      </div>`,
    pulse: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:88%">
        <div class="ui-prompt">${SPARK}<span>Launch post for our new oat latte, warm morning light</span><i class="ui-caret"></i></div>
      </div>
      <div class="ui-card ui-post" style="--k:1;--l:16%;--t:24%;--wd:36%">
        <div class="ui-post__img"></div>
        <span class="ui-skel"></span><span class="ui-skel ui-skel--short"></span>
      </div>
      <div class="ui-card ui-card--pill" style="--k:2;--l:58%;--t:44%;--wd:auto"><span class="ui-dot"></span>Scheduled · Mon 9:00</div>
      <div class="ui-card ui-card--pill" style="--k:3;--l:60%;--t:62%;--wd:auto">Instagram · 4:5</div>`,
    bluegen: () => `
      <div class="ui-card" style="--k:0;--l:4%;--t:2%;--wd:88%">
        <div class="ui-head"><b>Spring campaign</b><span class="ui-chip ui-chip--violet">${SPARK}Generating 4</span></div>
        <div class="ui-tiles">${[0, 1, 2, 3].map(k => `<i style="--k:${k}"></i>`).join('')}</div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:46%;--t:84%;--wd:auto"><span class="ui-dot"></span>Brand style matched</div>`,
    hr: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:90%">
        <div class="ui-head"><b>Hiring pipeline</b><span class="ui-chip">Store manager</span></div>
        <div class="ui-pipe">
          <div><small>Applied</small><b>24</b><span class="ui-faces">${avatar('JK', 'blue')}${avatar('SR', 'mint')}${avatar('+', 'amber')}</span></div>
          <div><small>Interview</small><b>6</b><span class="ui-faces">${avatar('AN', 'mint')}${avatar('LP', 'blue')}</span></div>
          <div><small>Offer</small><b>2</b><span class="ui-faces">${avatar('MC', 'rose')}</span></div>
        </div>
      </div>
      <div class="ui-card" style="--k:1;--l:36%;--t:56%;--wd:60%">
        <div class="ui-head"><b>Onboarding · Mia Chen</b><small>3 of 4</small></div>
        ${bar(75, 0)}
      </div>`,
    crewos: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:92%">
        <div class="ui-head"><b>This week</b><span class="ui-chip ui-chip--green">All shifts filled</span></div>
        <div class="ui-roster">
          <div class="ui-roster__days"><span></span>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => `<span>${d}</span>`).join('')}</div>
          ${[['LP', 'blue', 0, 2], ['AN', 'mint', 1, 3], ['NS', 'amber', 2, 3]].map(([n, t, a, w], k) => `<div class="ui-roster__row">${avatar(n, t)}<span class="ui-roster__track"><i style="--a:${a};--w:${w};--k:${k}"></i></span></div>`).join('')}
        </div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:40%;--t:80%;--wd:auto"><span class="ui-dot"></span>Pay run ready for approval</div>`,
    watchdog: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:88%">
        <div class="ui-head"><b>Agent activity</b><span class="ui-chip">Live</span></div>
        <ol class="ui-list ui-list--tight">
          <li><span class="ui-ok">${CHECK}</span>Support agent sent a refund email<span class="ui-chip ui-chip--green">Allowed</span></li>
          <li><span class="ui-ok">${CHECK}</span>Sales agent updated 3 leads<span class="ui-chip ui-chip--green">Allowed</span></li>
          <li><span class="ui-warn">!</span>Ops agent tried to delete 1,204 records<span class="ui-chip ui-chip--red">Paused</span></li>
        </ol>
      </div>
      <div class="ui-card ui-card--alert" style="--k:1;--l:34%;--t:62%;--wd:62%">
        <div class="ui-ai-label ui-ai-label--red">Needs review</div>
        <p>Bulk delete is outside this agent's permissions.</p>
        <div class="ui-actions"><span class="ui-btn ui-btn--dark">Block</span><span class="ui-btn">Allow once</span></div>
      </div>`,
    // Security / Safety scenes are placeholders until product details are confirmed
    iceman: () => `
      <div class="ui-card" style="--k:0;--l:2%;--t:4%;--wd:80%">
        <div class="ui-head"><span><b>Cold room 3</b><small>Live temperature</small></span><span class="ui-score">-18.4<small>°C</small></span></div>
        <div class="ui-spark-bars">${[52, 50, 54, 51, 49, 53, 58, 64].map((h, i) => `<i style="--h:${h}%;--k:${i}"></i>`).join('')}</div>
      </div>
      <div class="ui-card ui-card--alert" style="--k:1;--l:40%;--t:64%;--wd:58%">
        <div class="ui-ai-label ui-ai-label--red">Alert</div>
        <p>Door open for 4 minutes. Temperature rising.</p>
      </div>`,
    steelman: () => `
      <div class="ui-card" style="--k:0;--l:0%;--t:2%;--wd:86%">
        <div class="ui-head"><b>Site inspection · Level 2</b><span class="ui-chip">Today</span></div>
        <ol class="ui-list ui-list--tight">
          <li><span class="ui-ok">${CHECK}</span>Edge protection in place</li>
          <li><span class="ui-ok">${CHECK}</span>PPE checked at entry</li>
          <li><span class="ui-warn">!</span>Scaffold tag expired<span class="ui-chip ui-chip--orange">Action</span></li>
        </ol>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:44%;--t:80%;--wd:auto"><span class="ui-dot"></span>Supervisor notified</div>`,
    sportman: () => `
      <div class="ui-card" style="--k:0;--l:2%;--t:4%;--wd:84%">
        <div class="ui-head"><span class="ui-who">${avatar('JK', 'blue')}<span><b>Jordan Kim</b><small>Training session</small></span></span><span class="ui-score">142<small> bpm</small></span></div>
        <div class="ui-rubric">
          <div><span>Load</span>${bar(72, 0)}<b>72%</b></div>
          <div><span>Recovery</span>${bar(58, 1)}<b>58%</b></div>
        </div>
      </div>
      <div class="ui-card ui-card--pill" style="--k:1;--l:30%;--t:74%;--wd:auto"><span class="ui-dot"></span>Hydration break in 10 min</div>`
  };

  /* ---------- Helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const vars = b => `--c1:${b.c1};--c2:${b.c2}`;
  const ARROW = '<svg class="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tag = p => p.live ? '<span class="tag tag--live"><i></i>Live</span>' : '<span class="tag tag--soon">Coming soon</span>';

  /* ---------- Render ---------- */
  $('#megaGrid').innerHTML = BUSINESSES.map((b, i) => `
    <div class="mega-col" style="--i:${i}">
      <a class="mega-cat" href="#biz-${b.id}" data-biz="${b.id}"><span class="mega-cat__num">${pad(i + 1)}</span><span class="mega-cat__name">${b.name}</span></a>
      <ul class="mega-list">${b.products.map((p, j) => `<li><a href="#biz-${b.id}" data-biz="${b.id}" data-product="${j}">${p.name}${p.live ? '<span class="tag tag--live"><i></i>Live</span>' : ''}</a></li>`).join('')}</ul>
    </div>`).join('');

  $('#mobileMenuList').innerHTML = '<a class="mobile-menu__page" href="#about" data-close>About Formee</a>' + BUSINESSES.map((b, i) => `
    <div class="mobile-menu__group">
      <a class="mega-cat" href="#biz-${b.id}" data-biz="${b.id}"><span class="mega-cat__num">${pad(i + 1)}</span><span class="mega-cat__name">${b.name}</span></a>
      <div class="mobile-menu__links">${b.products.map((p, j) => `<a href="#biz-${b.id}" data-biz="${b.id}" data-product="${j}">${p.name}</a>`).join('')}</div>
    </div>`).join('') +
    '<a class="mobile-menu__page" href="#faq" data-close>FAQ</a><a class="mobile-menu__page" href="#contact" data-close>Contact</a>';

  const marquee = BUSINESSES.flatMap(b => b.products.map(p => `<span class="marquee__item">${p.name}</span>`)).join('');
  $('#marquee').innerHTML = marquee + marquee.replace(/class="marquee__item"/g, 'class="marquee__item" aria-hidden="true"');

  $('#bizIndexList').innerHTML = BUSINESSES.map((b, i) => `
    <li><a class="biz-index__item" href="#biz-${b.id}" data-biz="${b.id}">
      <span class="biz-index__fill"></span>
      <span class="biz-index__num">${pad(i + 1)}</span>
      <span class="biz-index__name">${b.name}</span>
      <span class="biz-index__count">${b.products.length}</span>
    </a></li>`).join('');

  const segmentHTML = b => `<div class="segment" role="tablist" aria-label="${b.name} products"><span class="segment__ind"></span>${b.products.map((p, j) => `<button class="segment__btn" role="tab" aria-selected="false" data-j="${j}">${p.short}</button>`).join('')}</div>`;

  $('#bizPanels').innerHTML = BUSINESSES.map((b, i) => {
    const many = b.products.length > 1;
    const link = b.products.find(p => p.href);
    return `
    <article class="biz-panel${many ? ' biz-panel--scroll' : ''}" id="biz-${b.id}" data-i="${i}" style="${vars(b)}">${many ? '<div class="biz-panel__sticky">' : ''}
      <div class="biz-visual r up${many ? '' : ' biz-visual--single'}">
        ${many ? `<div class="biz-visual__seg">${segmentHTML(b)}</div>` : ''}
        <div class="v2-grid">
          <div class="v2-copy">${b.products.map((p, j) => `
            <div class="v2-caption" data-j="${j}">
              <div class="v2-caption__top">${p.name.startsWith(p.short) ? '' : `<span class="short-pill">${p.short}</span>`}${tag(p)}</div>
              <h4>${p.name}</h4>
              <p>${p.desc}</p>
            </div>`).join('')}
          </div>
          <div class="v2-stage">${b.products.map((p, j) => `<div class="scene" data-j="${j}" aria-hidden="true">${SCENES[p.scene] ? SCENES[p.scene]() : ''}</div>`).join('')}</div>
        </div>
      </div>
      <div class="biz-body biz-body--v2">
        <div class="r up">
          <span class="eyebrow">${b.name}</span>
          <h3>${b.title}</h3>
        </div>
        <div class="r up" style="--rd:.1s">
          <p class="biz-body__desc">${b.desc}</p>
          ${link ? `<a class="btn btn--md biz-body__cta" href="${link.href}">Learn more</a>` : ''}
        </div>
      </div>
    ${many ? '</div>' : ''}</article>`;
  }).join('');

  $('#footerBiz').innerHTML = BUSINESSES.map(b => `<a href="#biz-${b.id}" data-biz="${b.id}">${b.name}</a>`).join('');

  $('#cf-subject').insertAdjacentHTML('beforeend',
    '<option>General enquiry</option><option>Partnership</option><option>Investment</option><option>Press</option>' +
    `<optgroup label="A business">${BUSINESSES.map(b => `<option>${b.name}</option>`).join('')}</optgroup>`);

  // About statement: split into words, *wrapped* words get the brand gradient
  const statement = $('#statement');
  let accent = false;
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map(w => {
    if (w.startsWith('*')) accent = true;
    const cls = accent ? 'w w--accent' : 'w';
    if (/\*[.,]?$/.test(w)) accent = false;
    return `<span class="${cls}">${w.replace(/\*/g, '')}</span>`;
  }).join(' ');

  /* ---------- Product selection (segment, cards) ---------- */
  function moveIndicator(panel) {
    const seg = $('.segment', panel);
    if (!seg) return;
    const on = $('[aria-selected="true"]', seg);
    const ind = $('.segment__ind', seg);
    ind.style.width = on.offsetWidth + 'px';
    ind.style.transform = `translateX(${on.offsetLeft}px)`;
  }

  // Only the selected product's copy and scene are shown; Learn more follows the selected product's link
  function select(panel, j) {
    const p = BUSINESSES[panel.dataset.i].products[j];
    $$('.segment__btn', panel).forEach(btn => btn.setAttribute('aria-selected', String(+btn.dataset.j === j)));
    $$('.v2-caption, .scene', panel).forEach(c => c.classList.toggle('is-active', +c.dataset.j === j));
    moveIndicator(panel);
    panel._j = j;
    const cta = $('.biz-body__cta', panel);
    if (cta) { cta.classList.toggle('is-hidden', !p.href); if (p.href) cta.href = p.href; }
  }

  const panels = $$('.biz-panel');
  panels.forEach(p => select(p, 0));

  const scrollPanels = $$('.biz-panel--scroll');
  const scrollStep = () => innerHeight * .45;
  const stickyTop = p => parseFloat(getComputedStyle($('.biz-panel__sticky', p)).top);
  function layoutScrollPanels() {
    scrollPanels.forEach(p => {
      const n = BUSINESSES[p.dataset.i].products.length;
      p.style.height = $('.biz-panel__sticky', p).offsetHeight + n * scrollStep() + 'px';
    });
  }
  // Jump to the scroll position where product j is shown
  function scrollToProduct(p, j) {
    const top = scrollY + p.getBoundingClientRect().top - stickyTop(p) + j * scrollStep() + 2;
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  }
  layoutScrollPanels();

  $('#bizPanels').addEventListener('click', e => {
    const t = e.target.closest('.segment__btn');
    if (!t) return;
    const p = t.closest('.biz-panel');
    if (p.classList.contains('biz-panel--scroll')) scrollToProduct(p, +t.dataset.j);
    else select(p, +t.dataset.j);
  });
  $('#bizPanels').addEventListener('keydown', e => {
    const t = e.target.closest('.segment__btn');
    if (!t || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const btns = $$('.segment__btn', t.parentElement);
    const next = btns[(btns.indexOf(t) + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length];
    next.focus();
    const p = t.closest('.biz-panel');
    if (p.classList.contains('biz-panel--scroll')) scrollToProduct(p, +next.dataset.j);
    else select(p, +next.dataset.j);
  });

  /* ---------- Header: nav pill, mega menu, mobile menu ---------- */
  const body = document.body;
  const header = $('#header');
  const hero = $('.hero');
  const nav = $('#hubNav');
  const pill = $('.hub-nav__pill');
  const trigger = $('#bizTrigger');
  const burger = $('#burger');
  let closeTimer;

  const movePill = el => {
    if (!el) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.left = el.offsetLeft - 14 + 'px';
    pill.style.width = el.offsetWidth + 28 + 'px';
  };
  $$('.hub-nav__item', nav).forEach(a => a.addEventListener('pointerenter', () => movePill(a)));
  nav.addEventListener('pointerleave', () => movePill(body.classList.contains('is-mega') ? trigger : null));

  function updateHeader() {
    header.classList.toggle('is-solid', scrollY > 8 || body.classList.contains('is-mega') || body.classList.contains('is-mobile-open'));
  }
  function openMega() { clearTimeout(closeTimer); body.classList.add('is-mega'); trigger.setAttribute('aria-expanded', 'true'); movePill(trigger); updateHeader(); }
  function closeMega() { body.classList.remove('is-mega'); trigger.setAttribute('aria-expanded', 'false'); movePill(null); updateHeader(); }
  function closeMobile() { body.classList.remove('is-mobile-open'); burger.setAttribute('aria-expanded', 'false'); updateHeader(); }

  trigger.addEventListener('click', () => body.classList.contains('is-mega') ? closeMega() : openMega());
  if (finePointer) {
    trigger.addEventListener('mouseenter', openMega);
    $('#megaMenu').addEventListener('mouseenter', () => clearTimeout(closeTimer));
    header.addEventListener('mouseleave', () => { closeTimer = setTimeout(closeMega, 200); });
    $$('.hub-nav__item:not(#bizTrigger)', nav).forEach(a => a.addEventListener('mouseenter', () => { if (body.classList.contains('is-mega')) closeMega(); movePill(a); }));
  }
  $('#megaScrim').addEventListener('click', closeMega);
  burger.addEventListener('click', () => {
    const open = body.classList.toggle('is-mobile-open');
    burger.setAttribute('aria-expanded', String(open));
    updateHeader();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMega(); closeMobile(); } });

  // Any [data-biz] link: scroll to that business and pick the product if given
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) { closeMega(); closeMobile(); }
    const a = e.target.closest('[data-biz]');
    if (!a) return;
    const panel = document.getElementById('biz-' + a.dataset.biz);
    if (!panel) return;
    e.preventDefault();
    closeMega();
    closeMobile();
    if (panel.classList.contains('biz-panel--scroll')) { scrollToProduct(panel, +(a.dataset.product || 0)); return; }
    if (a.dataset.product) select(panel, +a.dataset.product);
    panel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });

  /* ---------- Scroll-driven state ---------- */
  const indexItems = $$('.biz-index__item');
  const indexList = $('#bizIndexList');
  const stWords = $$('.w', statement);
  let lastActive = -1, ticking = false;

  function update() {
    ticking = false;
    const vh = innerHeight;
    updateHeader();

    // Scroll-driven panels: each product gets one scroll step while the panel is stuck
    scrollPanels.forEach(p => {
      const n = BUSINESSES[p.dataset.i].products.length;
      const idx = Math.max(0, Math.min(n - 1, Math.floor((stickyTop(p) - p.getBoundingClientRect().top) / scrollStep())));
      if (idx !== p._j) select(p, idx);
    });

    const sr = statement.getBoundingClientRect();
    const n = Math.round(clamp((vh * .85 - sr.top) / (sr.height + vh * .35)) * stWords.length);
    stWords.forEach((w, i) => w.classList.toggle('is-on', i < n));

    const line = vh * .45;
    let active = 0;
    panels.forEach((p, i) => {
      const r = p.getBoundingClientRect();
      if (r.top <= line) active = i;
      indexItems[i].style.setProperty('--p', clamp((line - r.top) / r.height).toFixed(3));
    });
    if (active !== lastActive) {
      lastActive = active;
      indexItems.forEach((it, i) => it.classList.toggle('is-active', i === active));
      const it = indexItems[active];
      if (indexList.scrollWidth > indexList.clientWidth) {
        indexList.scrollTo({ left: it.offsetLeft - indexList.clientWidth / 2 + it.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { layoutScrollPanels(); panels.forEach(moveIndicator); onScroll(); });
  update();

  /* ---------- Reveal + count-up ---------- */
  function countUp(el) {
    const to = +el.dataset.count;
    if (reduce) { el.textContent = pad(to); return; }
    const t0 = performance.now(), dur = 1400;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = pad(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    if (en.target.dataset.count) countUp(en.target);
    io.unobserve(en.target);
  }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  $$('.r, [data-count]').forEach(el => io.observe(el));

  /* ---------- Hero: business rail (coverflow) ---------- */
  const CYCLE = 3200;
  const rail = $('#heroRail');
  rail.innerHTML = BUSINESSES.map((b, i) => `
    <button class="rail-card" data-i="${i}" style="${vars(b)}" aria-label="${b.name}">
      <span class="rail-card__num">${pad(i + 1)}</span>
      <span class="rail-card__name">${b.name}</span>
      <span class="rail-card__meta">${b.products.length} ${b.products.length > 1 ? 'products' : 'product'}</span>
      <span class="rail-card__chips">${b.products.map((p, k) => `<span class="rail-card__chip" style="--k:${k}">${p.name}${p.live ? '<span class="tag tag--live"><i></i>Live</span>' : ''}</span>`).join('')}</span>
      <span class="rail-card__go">Explore ${ARROW}</span>
    </button>`).join('');
  const railCards = $$('.rail-card', rail);
  let railIdx = 0, railTimer = null, railPaused = false;

  function showRail(i) {
    railIdx = (i + BUSINESSES.length) % BUSINESSES.length;
    railCards.forEach((c, k) => {
      const o = ((k - railIdx + BUSINESSES.length + 3) % BUSINESSES.length) - 3;
      c.style.setProperty('--o', o);
      c.style.setProperty('--ao', Math.abs(o));
      c.classList.toggle('is-on', o === 0);
      c.classList.toggle('is-far', Math.abs(o) > 2);
      c.tabIndex = Math.abs(o) > 2 ? -1 : 0;
    });
  }
  function startRail() {
    clearInterval(railTimer);
    if (!reduce) railTimer = setInterval(() => { if (!railPaused) showRail(railIdx + 1); }, CYCLE);
  }
  rail.addEventListener('click', e => {
    const c = e.target.closest('.rail-card');
    if (!c) return;
    if (+c.dataset.i !== railIdx) { showRail(+c.dataset.i); startRail(); return; }
    $('#biz-' + BUSINESSES[railIdx].id).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });
  rail.addEventListener('mouseenter', () => { railPaused = true; });
  rail.addEventListener('mouseleave', () => { railPaused = false; });
  showRail(0);
  startRail();

  /* ---------- FAQ accordion (one open at a time) ---------- */
  $$('.faq-q button').forEach(btn => btn.addEventListener('click', () => {
    const q = btn.parentElement, open = !q.classList.contains('open');
    $$('.faq-q').forEach(o => { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); });
    q.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }));

  /* ---------- Contact form (prototype: validates, then shows the sent state; nothing is sent) ---------- */
  const form = $('#contactForm');
  const required = $$('[required]', form);
  const setError = (input, msg) => {
    const field = input.closest('.field');
    field.classList.toggle('is-error', !!msg);
    let err = $('.field__error', field);
    if (msg && !err) { err = document.createElement('span'); err.className = 'field__error'; field.appendChild(err); }
    if (err) err.textContent = msg || '';
    if (!msg && err) err.remove();
  };
  const check = input => {
    if (!input.value.trim()) return 'Please fill this in.';
    if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) return 'Please enter a valid email.';
    return '';
  };
  required.forEach(i => i.addEventListener('input', () => { if (i.closest('.is-error')) setError(i, check(i)); }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    let firstBad = null;
    required.forEach(i => { const msg = check(i); setError(i, msg); if (msg && !firstBad) firstBad = i; });
    if (firstBad) { firstBad.focus(); return; }
    form.classList.add('is-sent');
  });
  $('#contactReset').addEventListener('click', () => { form.reset(); form.classList.remove('is-sent'); });

  document.fonts && document.fonts.ready.then(() => { layoutScrollPanels(); panels.forEach(moveIndicator); });
})();
