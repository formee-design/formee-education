/* Formee store: shared site chrome for every page (header, Industries / Products mega menus, footer, contact form,
   reveal, FAQ accordion, billing toggle, toast for pages that don't exist yet).
   Each page renders its own content first, then calls FSite.init(). */
window.FSite = (() => {
  'use strict';
  const { BUSINESSES, TOOLS, PRICING } = window.FD;

  /* ---------- Helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const vars = b => `--c1:${b.c1};--c2:${b.c2}`;
  const I = window.FI.icon;
  const ARROW = I('arrow-right', 16, 'arrow');
  const EXT = I('arrow-up-right', 16);
  const CHEV = I('chevron-down', 16, 'hub-nav__chev');
  const tag = p => p.status ? `<span class="tag tag--soon">${p.status}</span>` : '';
  const money = n => Number.isInteger(n) ? String(n) : n.toFixed(2);

  // Page addresses (all pages sit in this folder)
  const URL_ = {
    home: 'v3-store.html',
    industries: 'industries.html',
    industry: id => `industry.html?id=${id}`,
    products: 'products.html',
    tool: p => p.external ? p.href : `tool.html?id=${p.slug}`,
    pricing: 'pricing.html',
    demo: 'demo.html',
    privacy: 'privacy.html',
    terms: 'terms.html',
    about: 'about.html', // About page is hidden for now (no links point here); about.html is kept for later
    contact: (ind, tool) => `contact.html${ind ? `?industry=${ind}${tool ? `&tool=${encodeURIComponent(tool)}` : ''}` : ''}`
  };

  /* ---------- Shared markup ---------- */
  // Formee wordmark (Figma 1063:113465); fill follows currentColor
  const SYMBOL = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="formee-wordmark" viewBox="0 0 117 21" fill="currentColor"><path d="M10.726 5.00599H5.44521V8.76564H12.4315V10.4897C12.4315 12.006 11.363 12.9823 10.0685 12.9823H5.54795V20.5431H2.91781C1.19178 20.5431 0 19.6707 0 17.8012V4.11282C0 1.62024 1.35616 0.457031 4.00685 0.457031H13.6233V2.40955C13.6233 3.57276 12.6781 5.00599 10.7466 5.00599H10.726Z"/><path d="M24.4513 21C19.0472 21 14.8965 17.0534 14.8965 10.7596C14.8965 4.46588 18.6773 0 25.0677 0C29.9376 0 34.602 3.65579 34.602 10.2196C34.602 16.7834 30.9239 21.0208 24.4719 21.0208L24.4513 21ZM24.513 4.46588C21.8006 4.46588 20.3623 6.81306 20.3623 10.1988C20.3623 14.4362 21.965 16.4926 24.965 16.4926C27.4513 16.4926 29.1157 14.3947 29.1157 10.6973C29.1157 6.29377 27.5541 4.46588 24.513 4.46588Z"/><path d="M51.4521 20.6885C49.6028 20.6885 48.4521 19.8784 47.8768 18.5698L46.4179 15.3087C45.6371 13.5846 45.1028 13.2523 43.7878 13.1069L42.9247 13.0238V20.5639H40.8289C38.6919 20.5639 37.459 19.2553 37.459 17.3858V1.03866C38.8357 0.540147 41.8973 0.16626 43.4179 0.16626H45.6371C49.8905 0.16626 52.911 2.51344 52.911 6.16923C52.911 8.84875 51.185 11.1128 49.2946 11.549C50.2398 11.9852 50.733 12.7122 51.4727 14.3116L52.9932 17.5728C53.5686 18.7567 54.0823 19.6707 54.3699 20.0238V20.1692C53.7124 20.5223 52.6234 20.6885 51.4316 20.6885H51.4521ZM44.0343 4.54905C43.8083 4.54905 43.3357 4.61136 42.9453 4.67368V9.09801C43.6028 9.18109 44.3014 9.18109 45.1234 9.18109C46.685 9.18109 47.4453 7.99712 47.4453 6.85469C47.4453 5.40068 46.7261 4.54905 45.1439 4.54905H44.0138H44.0343Z"/><path d="M79.0896 20.5431C77.1992 20.5431 75.8019 19.5045 75.8019 17.4066C75.8019 15.5994 75.6375 10.4481 75.3087 7.47778L72.5759 15.911C72.1649 17.1365 71.343 19.276 70.5827 20.5431H69.0622C67.1923 20.5431 65.7334 19.1098 64.48 15.0386L63.4731 11.6944C62.98 10.0327 62.3841 8.2671 62.0553 7.41547C61.706 10.8428 61.4594 17.2196 61.4594 20.5431H59.4252C57.7608 20.5431 56.2402 19.3799 56.2402 17.4066C56.2402 11.6529 57.0211 4.6944 57.9663 0.477783H59.8567C63.0211 0.477783 64.6444 1.9941 65.3635 3.75968L66.9252 7.66473C67.5827 9.34722 68.4252 11.6529 68.8567 13.3354C69.2882 11.8606 69.8841 10.0742 70.5005 8.62022L72.3909 4.02971C73.1101 2.30568 74.0553 1.08016 74.7745 0.477783H75.7813C78.6581 0.477783 80.0348 2.07719 80.4252 4.96443C80.9389 8.89025 81.432 15.0594 81.432 20.5638H79.1101L79.0896 20.5431Z"/><path d="M94.9119 20.8131H92.6721C87.4529 20.8131 84.5762 18.1336 84.5762 12.5876V9.22259C84.5762 7.3947 84.6995 5.35909 84.9256 3.80123C85.2954 1.24633 86.816 0.477783 88.7475 0.477783H99.5762V1.76562C99.5762 3.6766 98.5694 4.96443 96.268 4.96443H90.2269C90.1036 5.96146 90.0214 7.41547 90.0214 8.37096H97.7064V10.3858C97.7064 11.8398 96.6379 12.6499 94.7064 12.6499H90.0214V13.3769C90.0214 15.5371 90.7201 16.2849 93.4735 16.2849H94.9119C96.5557 16.2849 97.9324 16.1395 99.5557 15.7241V17.8428C99.5557 19.6707 98.4256 20.7716 94.9119 20.7716V20.8131Z"/><path d="M112.336 20.8131H110.096C104.877 20.8131 102 18.1336 102 12.5876V9.22259C102 7.3947 102.123 5.35909 102.349 3.80123C102.719 1.24633 104.24 0.477783 106.171 0.477783H117V1.76562C117 3.6766 115.993 4.96443 113.692 4.96443H107.651C107.527 5.96146 107.445 7.41547 107.445 8.37096H115.13V10.3858C115.13 11.8398 114.062 12.6499 112.13 12.6499H107.445V13.3769C107.445 15.5371 108.144 16.2849 110.897 16.2849H112.336C113.979 16.2849 115.356 16.1395 116.979 15.7241V17.8428C116.979 19.6707 115.849 20.7716 112.336 20.7716V20.8131Z"/></symbol></svg>`;
  const WORDMARK = '<svg class="hub-logo__word" viewBox="0 0 117 21" role="img" aria-label="Formee"><use href="#formee-wordmark"/></svg>';

  function headerHTML(active) {
    const on = k => active === k ? ' is-current' : '';
    return `
    <header class="hub-header" id="header">
      <div class="container hub-header__inner">
        <a class="hub-logo" href="${URL_.home}" aria-label="Formee home">${WORDMARK}</a>
        <nav class="hub-nav" id="hubNav" aria-label="Main">
          <span class="hub-nav__pill" aria-hidden="true"></span>
          <button class="hub-nav__item${on('industries')}" data-mega="industries" aria-expanded="false">Industries ${CHEV}</button>
          <button class="hub-nav__item${on('products')}" data-mega="products" aria-expanded="false">Products ${CHEV}</button>
          <a class="hub-nav__item${on('pricing')}" href="${URL_.pricing}">Pricing</a>
          <a class="hub-nav__item${on('contact')}" href="${URL_.contact()}">Contact</a>
        </nav>
        <div class="hub-header__right store-actions">
          <a class="store-login" href="#" data-placeholder="Log in">Log in</a>
          <a class="btn btn--md btn--outline store-demo" href="${URL_.demo}"><span>Request a demo</span></a>
          <a class="btn btn--md store-start" href="${URL_.pricing}"><span>Start free</span></a>
          <button class="hub-burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
        </div>
      </div>

      <div class="mega-menu mega-menu--rows" id="mega-industries">
        <div class="container">
          <div class="mega-rows">${BUSINESSES.map((b, i) => `
            <a class="mega-row mega-col" href="${URL_.industry(b.id)}" style="--i:${i}">
              <span class="mega-row__icon">${I(b.icon, 22)}</span>
              <span class="mega-row__text"><b>${b.name}</b><small>${b.tagline}</small></span>
            </a>`).join('')}
          </div>
          <div class="mega-menu__foot">
            <a class="link-arrow mega-foot__all" href="${URL_.industries}">All eight industries ${ARROW}</a>
            <span>Not sure where to start? <a class="mega-foot__link" href="${URL_.contact()}">Contact us</a></span>
          </div>
        </div>
      </div>

      <div class="mega-menu" id="mega-products">
        <div class="container">
          <div class="mega-menu__grid">${BUSINESSES.map((b, i) => `
            <div class="mega-col" style="--i:${i}">
              <a class="mega-cat mega-cat--row" href="${URL_.industry(b.id)}"><span class="mega-row__icon mega-row__icon--sm">${I(b.icon, 18)}</span><span class="mega-cat__name">${b.name}</span></a>
              <ul class="mega-list">${b.products.map(p => `<li><a href="${URL_.tool(p)}"${p.external ? ' target="_blank" rel="noopener"' : ''}>${p.name}${tag(p)}</a></li>`).join('')}</ul>
            </div>`).join('')}
          </div>
          <div class="mega-menu__foot">
            <a class="link-arrow mega-foot__all" href="${URL_.products}">All ${TOOLS} tools ${ARROW}</a>
          </div>
        </div>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        <div class="container">
          <a class="mobile-menu__page" href="${URL_.industries}">Industries</a>
          <a class="mobile-menu__page" href="${URL_.products}">Products</a>
          <a class="mobile-menu__page" href="${URL_.pricing}">Pricing</a>
          <a class="mobile-menu__page" href="${URL_.contact()}">Contact</a>
          <a class="btn btn--md" href="${URL_.pricing}">Start free</a>
        </div>
      </div>
    </header>
    <div class="mega-scrim" id="megaScrim"></div>`;
  }

  const footerHTML = () => `
    <footer class="footer">
      <div class="container footer__grid footer__grid--store">
        <div class="footer__brand">
          <a class="hub-logo" href="${URL_.home}" aria-label="Formee home">${WORDMARK}</a>
          <p>AI tools for every industry. Practical AI, private by design.</p>
          <a class="footer__email" href="mailto:contact@formeeeducation.com">contact@formeeeducation.com</a>
          <div class="social">
            <a href="#" aria-label="Instagram"><img src="assets/so-ig.svg" alt=""></a>
            <a href="#" aria-label="TikTok" class="tt"><img src="assets/so-tt.svg" alt=""></a>
            <a href="#" aria-label="LinkedIn"><img src="assets/so-li.svg" alt=""></a>
            <a href="#" aria-label="Facebook"><img src="assets/so-fb.svg" alt=""></a>
          </div>
        </div>
        <div class="footer__col"><h5>Industries</h5>${BUSINESSES.map(b => `<a href="${URL_.industry(b.id)}">${b.name}</a>`).join('')}</div>
        <div class="footer__col"><h5>Buy</h5><a href="${URL_.pricing}">Pricing</a><a href="${URL_.products}">All tools</a><a href="${URL_.pricing}">Start free</a></div>
        <div class="footer__col"><h5>Company</h5><a href="${URL_.home}#faq">FAQ</a><a href="${URL_.contact()}">Contact</a><a href="${URL_.terms}">Terms of Use</a><a href="${URL_.privacy}">Privacy</a></div>
        <div class="footer__bottom"><small>© 2026 Formee Holdings</small></div>
      </div>
    </footer>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  // Gradient band used as the closing call to action on every page
  const ctaBand = (title, sub, ind, tool, { full = false } = {}) => `
    <section class="cta-band${full ? ' cta-band--full' : ''}">
      <div class="container">
        <div class="cta-band__box r up">
          <div class="hero__bg" aria-hidden="true"><div class="hero__wash"></div><div class="hero__glow hero__glow--blue"></div><div class="hero__glow hero__glow--pink"></div></div>
          <h2>${title}</h2>
          <p>${sub}</p>
          <div class="cta-band__btns">
            <a class="btn btn--md btn--white" href="${URL_.pricing}"><span>Start free</span></a>
            <a class="btn btn--md btn--glass-light" href="${URL_.contact(ind, tool)}"><span>Contact us</span></a>
          </div>
        </div>
      </div>
    </section>`;

  // Short gradient hero for inner pages
  // Page eyebrow chips were removed (the breadcrumb already names the page)
  const pageHero = ({ title, sub, crumbs, actions = '', extra = '' }) => `
    <section class="hero page-hero">
      <div class="hero__bg" aria-hidden="true"><div class="hero__wash"></div><div class="hero__glow hero__glow--blue"></div><div class="hero__glow hero__glow--pink"></div><div class="hero__glow hero__glow--violet"></div><div class="hero__fade"></div></div>
      <div class="container page-hero__inner">
        ${crumbs ? `<nav class="crumbs fade-in" aria-label="Breadcrumb">${crumbs.map(([t, h]) => h ? `<a href="${h}">${t}</a>` : `<span>${t}</span>`).join('<i>›</i>')}</nav>` : ''}
        <h1 class="page-hero__title fade-in">${title}</h1>
        ${sub ? `<p class="page-hero__sub fade-in">${sub}</p>` : ''}
        ${actions ? `<div class="page-hero__actions fade-in">${actions}</div>` : ''}
        ${extra}
      </div>
    </section>`;

  const heroActions = (ind, tool) => `
    <a class="btn btn--md btn--white" href="${URL_.pricing}"><span>Start free</span></a>
    <a class="btn btn--md btn--glass-light" href="${URL_.contact(ind, tool)}"><span>Contact us</span></a>`;

  const contactFormHTML = ({ title, sub, demo = false } = {}) => `
    <form class="contact-form fade-in" id="contactForm" novalidate>
      <div class="contact-form__body">${title ? `
        <div class="field--full contact-form__head"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>` : ''}
        <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" placeholder="Your full name" required></div>
        <div class="field"><label for="cf-email">Work email</label><input id="cf-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required></div>
        <div class="field"><label for="cf-company">Company</label><input id="cf-company" name="company" type="text" autocomplete="organization" placeholder="Company or organisation" required></div>
        <div class="field"><label for="cf-industry">Industry</label><select id="cf-industry" name="industry" required><option value="" selected disabled>Choose your industry</option>${BUSINESSES.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}</select></div>
        <div class="field field--full"><label for="cf-tool">Tool <span class="field__opt">optional</span></label><select id="cf-tool" name="tool"><option value="">Any tool in this industry</option></select></div>${demo ? `
        <div class="field"><label for="cf-role">Job title <span class="field__opt">optional</span></label><input id="cf-role" name="role" type="text" autocomplete="organization-title" placeholder="Your role"></div>
        <div class="field"><label for="cf-country">Country <span class="field__opt">optional</span></label><input id="cf-country" name="country" type="text" autocomplete="country-name" placeholder="Where your team is based"></div>` : ''}
        <div class="field field--full"><label for="cf-enquiry">${demo ? 'What would you like to see? <span class="field__opt">optional</span>' : 'Message'}</label><textarea id="cf-enquiry" name="message" rows="4" placeholder="${demo ? 'The workflows or questions you want the walkthrough to cover' : 'Tell us a little about your team and what you need'}"></textarea></div>
        <div class="field field--full field--check">
          <label class="check"><input id="cf-consent" name="consent" type="checkbox" required><span class="check__box">${I('check', 14)}</span><span>I agree that Formee may use these details to respond to me, as described in the <a href="${URL_.privacy}" target="_blank" rel="noopener">privacy notice</a>.</span></label>
        </div>
        <div class="field--full contact-form__foot"><span class="contact-form__note">We only use your details to ${demo ? 'arrange your demo' : 'reply to your message'}.</span><button class="btn btn--md" type="submit"><span>${demo ? 'Request a demo' : 'Send message'}</span></button></div>
      </div>
      <div class="contact-form__done" aria-live="polite">
        <span class="contact-form__check">${I('check', 28)}</span>
        <h3>${demo ? 'Demo requested. Thank you.' : 'Thanks, we got it.'}</h3>
        <p>${demo ? 'The Formee team will email you to arrange your demo.' : 'The Formee team will get back to you by email.'}</p>
        <button class="btn btn--md btn--outline" type="button" id="contactReset"><span>${demo ? 'Request another' : 'Send another'}</span></button>
      </div>
    </form>`;

  // Safe AI by design: three cards shared by home, industry and about pages
  const TRUST = [
    ['Privacy and compliance by design', 'Privacy and compliance are built into every tool from the start.', 'shield-check'],
    ['Multi-country hosting', 'Hosting options across multiple countries, on Microsoft Azure.', 'globe'],
    ['Modern secure cloud', 'Every tool runs on a modern, secure cloud foundation.', 'cloud']
  ];
  const trustHTML = () => TRUST.map(([t, d, icon], i) => `
    <article class="trust-card r up" style="--rd:${i * .08}s">
      <span class="trust-card__icon">${I(icon, 22)}</span>
      <h3>${t}</h3>
      <p>${d}</p>
    </article>`).join('');

  const faqHTML = list => list.map(([q, a], i) => `
    <div class="faq-q${i === 0 ? ' open' : ''}">
      <button type="button" aria-expanded="${i === 0}"><span>${q}</span>${I('chevron-down', 24, 'faq-q__chev')}</button>
      <div class="faq-a"><div><p>${a.replace('{tools}', TOOLS)}</p></div></div>
    </div>`).join('');

  // Tier cards; prices switch with the billing toggle (data-m / data-a)
  const tiersHTML = ({ recommended = 'standard', unit = 'per tool per month' } = {}) => PRICING.tiers.map((t, i) => t.contact_sales ? `
    <article class="plan plan--ent r up" style="--rd:${i * .06}s">
      <h3>${t.name}</h3>
      <p class="plan__lead">Custom terms for larger organisations.</p>
      <div class="plan__price"><b>Custom</b><small>talk to the Formee team</small></div>
      <ul class="plan__list plan__list--check"><li>Every tool, bundles by arrangement</li><li>Choice of Azure data region</li><li>Trial by arrangement</li></ul>
      <a class="btn btn--md btn--outline" href="${URL_.contact()}"><span>Contact sales</span></a>
    </article>` : `
    <article class="plan${t.id === recommended ? ' plan--rec' : ''} r up" style="--rd:${i * .06}s">
      ${t.id === recommended ? '<span class="plan__badge">Recommended</span>' : ''}
      <h3>${t.name}</h3>
      <p class="plan__lead">${{ basic: 'For trying one tool with a small team.', standard: 'For teams using Formee every day.', premium: 'For larger teams and heavier use.' }[t.id]}</p>
      <div class="plan__price"><small>from</small><b>US$<span data-m="${t.monthly}" data-a="${t.annual_monthly}">${t.monthly}</span></b><small>${unit}</small></div>
      <ul class="plan__list plan__list--check"><li>${t.trial_card_required ? '14-day free trial, card required' : '14-day free trial, no card'}</li><li>30-day money-back guarantee</li><li>Credits and usage: to be set by Formee</li></ul>
      <a class="btn btn--md${t.id === recommended ? '' : ' btn--outline'}" href="#" data-placeholder="Checkout"><span>Start free</span></a>
    </article>`).join('');

  const billingToggleHTML = id => `
    <div class="segment pricing__toggle r up" id="${id}" role="tablist" aria-label="Billing period" style="--rd:.18s">
      <span class="segment__ind"></span>
      <button class="segment__btn" role="tab" aria-selected="true" data-period="monthly">Monthly</button>
      <button class="segment__btn" role="tab" aria-selected="false" data-period="annual">Annual <span class="save-pill">Save 20%</span></button>
    </div>`;

  /* ---------- Behaviours ---------- */
  function initHeader() {
    const body = document.body, header = $('#header'), nav = $('#hubNav'), pill = $('.hub-nav__pill'), burger = $('#burger');
    const triggers = $$('[data-mega]', nav);
    let closeTimer, openKey = null;
    const movePill = el => {
      if (!el) { pill.style.opacity = 0; return; }
      pill.style.opacity = 1;
      pill.style.left = el.offsetLeft - 14 + 'px';
      pill.style.width = el.offsetWidth + 28 + 'px';
    };
    const update = () => header.classList.toggle('is-solid', scrollY > 8 || !!openKey || body.classList.contains('is-mobile-open') || body.classList.contains('page-solid'));
    const open = key => {
      clearTimeout(closeTimer);
      openKey = key;
      body.classList.add('is-mega');
      $$('.mega-menu', header).forEach(m => m.classList.toggle('is-open', m.id === 'mega-' + key));
      triggers.forEach(t => t.setAttribute('aria-expanded', String(t.dataset.mega === key)));
      movePill(triggers.find(t => t.dataset.mega === key));
      update();
    };
    const close = () => {
      openKey = null;
      body.classList.remove('is-mega');
      $$('.mega-menu', header).forEach(m => m.classList.remove('is-open'));
      triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
      movePill(null);
      update();
    };
    $$('.hub-nav__item', nav).forEach(a => a.addEventListener('pointerenter', () => movePill(a)));
    nav.addEventListener('pointerleave', () => movePill(openKey ? triggers.find(t => t.dataset.mega === openKey) : null));
    triggers.forEach(t => {
      t.addEventListener('click', () => openKey === t.dataset.mega ? close() : open(t.dataset.mega));
      if (finePointer) t.addEventListener('mouseenter', () => open(t.dataset.mega));
    });
    if (finePointer) {
      $$('.mega-menu', header).forEach(m => m.addEventListener('mouseenter', () => clearTimeout(closeTimer)));
      header.addEventListener('mouseleave', () => { closeTimer = setTimeout(close, 200); });
      $$('a.hub-nav__item', nav).forEach(a => a.addEventListener('mouseenter', () => { if (openKey) close(); movePill(a); }));
    }
    $('#megaScrim').addEventListener('click', close);
    burger.addEventListener('click', () => {
      const o = body.classList.toggle('is-mobile-open');
      burger.setAttribute('aria-expanded', String(o));
      update();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    addEventListener('scroll', update, { passive: true });
    update();
  }

  function initReveal() {
    const countUp = el => {
      const to = +el.dataset.count;
      if (reduce) { el.textContent = pad(to); return; }
      const t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 1400); el.textContent = pad(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      if (en.target.dataset.count) countUp(en.target);
      io.unobserve(en.target);
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.r, [data-count]').forEach(el => io.observe(el));
  }

  function initFaq() {
    $$('.faq-q button').forEach(btn => btn.addEventListener('click', () => {
      const q = btn.parentElement, list = q.parentElement, o = !q.classList.contains('open');
      $$('.faq-q', list).forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
      q.classList.toggle('open', o);
      btn.setAttribute('aria-expanded', String(o));
    }));
  }

  // Monthly / annual toggle; onChange receives 'm' or 'a'
  function initBilling(el, onChange) {
    if (!el) return;
    const ind = $('.segment__ind', el);
    const move = () => { const on = $('[aria-selected="true"]', el); ind.style.width = on.offsetWidth + 'px'; ind.style.transform = `translateX(${on.offsetLeft}px)`; };
    el.addEventListener('click', e => {
      const t = e.target.closest('.segment__btn');
      if (!t) return;
      $$('.segment__btn', el).forEach(b => b.setAttribute('aria-selected', String(b === t)));
      move();
      const key = t.dataset.period === 'annual' ? 'a' : 'm';
      $$('[data-m]').forEach(n => {
        const from = parseFloat(n.textContent), to = parseFloat(n.dataset[key]);
        if (reduce) { n.textContent = money(to); return; }
        // Each count-up gets a token; a newer change (another period click or a plan switch) cancels the old one
        const run = n._countRun = (n._countRun || 0) + 1;
        const t0 = performance.now();
        const step = now => { if (n._countRun !== run) return; const k = Math.min(1, (now - t0) / 500); const v = from + (to - from) * (1 - Math.pow(1 - k, 3)); n.textContent = k < 1 ? Math.round(v) : money(to); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
      onChange && onChange(key);
    });
    addEventListener('resize', move);
    document.fonts && document.fonts.ready.then(move);
    move();
  }

  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const indSel = $('#cf-industry'), toolSel = $('#cf-tool');
    const fill = id => {
      const b = BUSINESSES.find(x => x.id === id);
      toolSel.innerHTML = '<option value="">Any tool in this industry</option>' + (b ? b.products.filter(p => !p.external).map(p => `<option>${p.name}</option>`).join('') : '');
    };
    indSel.addEventListener('change', () => fill(indSel.value));
    const prefill = (id, tool) => { if (!id) return; indSel.value = id; fill(id); toolSel.value = tool || ''; };
    const q = new URLSearchParams(location.search);
    prefill(q.get('industry'), q.get('tool'));
    // Email typed in the home hero card is handed over through sessionStorage (never the URL)
    try { const em = sessionStorage.getItem('formeeContactEmail'); if (em) { $('#cf-email').value = em; sessionStorage.removeItem('formeeContactEmail'); } } catch (e) { /* storage unavailable */ }
    // On the home page, Contact us links with data-contact prefill the form in place
    document.addEventListener('click', e => { const a = e.target.closest('[data-contact]'); if (a) { const [id, tool] = a.dataset.contact.split('|'); prefill(id, tool); } });
    const required = $$('[required]', form);
    const setError = (input, msg) => {
      const field = input.closest('.field');
      field.classList.toggle('is-error', !!msg);
      let err = $('.field__error', field);
      if (msg && !err) { err = document.createElement('span'); err.className = 'field__error'; field.appendChild(err); }
      if (err) err.textContent = msg || '';
      if (!msg && err) err.remove();
    };
    const check = i => i.type === 'checkbox' ? (i.checked ? '' : 'Please agree so we can reply to you.') : !i.value.trim() ? 'Please fill this in.' : (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value) ? 'Please enter a valid email.' : '');
    required.forEach(i => i.addEventListener(i.type === 'checkbox' ? 'change' : 'input', () => { if (i.closest('.is-error')) setError(i, check(i)); }));
    form.addEventListener('submit', e => {
      e.preventDefault();
      let bad = null;
      required.forEach(i => { const m = check(i); setError(i, m); if (m && !bad) bad = i; });
      if (bad) { bad.focus(); return; }
      form.classList.add('is-sent');
    });
    $('#contactReset').addEventListener('click', () => { form.reset(); fill(''); form.classList.remove('is-sent'); });
  }

  function initToast() {
    const toast = $('#toast');
    let t;
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-placeholder]');
      if (!a) return;
      e.preventDefault();
      toast.textContent = `${a.dataset.placeholder}: coming soon in this prototype`;
      toast.classList.add('is-on');
      clearTimeout(t);
      t = setTimeout(() => toast.classList.remove('is-on'), 2200);
    });
  }

  // Mount header and footer, then wire everything up. Call after the page has rendered its content.
  function init({ active } = {}) {
    // Static markup can ask for a Lucide icon with data-icon="name" (data-size, data-cls optional)
    $$('[data-icon]').forEach(el => el.insertAdjacentHTML(el.dataset.after ? 'beforeend' : 'afterbegin', I(el.dataset.icon, +el.dataset.size || 20, el.dataset.cls || '')));
    document.body.insertAdjacentHTML('afterbegin', SYMBOL + headerHTML(active));
    document.body.insertAdjacentHTML('beforeend', footerHTML());
    initHeader();
    initToast();
    initFaq();
    initContactForm();
    initReveal();
  }

  // Safe AI cards with the Figma illustrations (node 1121:13450): used on the home page and the industry pages
  const TRUST_ART = [['security', 75.4], ['global', 78.6], ['cloud', 71.8]];
  const trustArtHTML = () => TRUST.map(([t, d], i) => `
    <article class="trust-art r up" style="--rd:${i * .08}s">
      <span class="trust-art__panel"><img src="assets/safe-ai/${TRUST_ART[i][0]}.svg" alt="" style="width:${TRUST_ART[i][1]}%" loading="lazy"></span>
      <h3>${t}</h3>
      <p>${d}</p>
    </article>`).join('');

  // Shared by the home explorer and the Industries page (2026-11-26): each tool's own Lucide icon on its industry gradient,
  // and the industry order used across the site (same as the home tiles).
  const TOOL_ICON = {
    'hr-module': 'id-card', 'crew-os': 'network',
    lms: 'book-open', sms: 'school', 'lumina-for-kids': 'lightbulb', grading: 'clipboard-check', 'course-design': 'pencil-ruler',
    bigbrother: 'cctv', 'security-watchdog': 'radar',
    'childcare-humanoid-robotics': 'bot',
    'aged-care-platform': 'hand-heart', 'ai-human-rights-stack': 'scale',
    plotara: 'building-2', primeform: 'activity',
    bluegen: 'list-checks', pulse: 'megaphone'
  };
  const appIcon = (p, b, size = 24, cls = '') => `<span class="app-icon${cls ? ' ' + cls : ''}" style="--c1:${b.c1};--c2:${b.c2}">${I(TOOL_ICON[p.slug] || b.icon, size)}</span>`;
  const IND_ORDER = ['hr', 'sales-marketing', 'security', 'education', 'health', 'childcare', 'real-estate', 'sports'];

  return { TOOL_ICON, appIcon, IND_ORDER, trustArtHTML, init, initBilling, URL: URL_, ARROW, EXT, tag, vars, pad, clamp, reduce, finePointer, money, $, $$,
    ctaBand, pageHero, heroActions, contactFormHTML, faqHTML, tiersHTML, billingToggleHTML, trustHTML, I };
})();
