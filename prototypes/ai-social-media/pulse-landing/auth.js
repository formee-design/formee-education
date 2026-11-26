/* Logged in state (11/26).
   Production: replace isLoggedIn() and currentPlan() with the real session check
   (shared cookie on .formeeholdings.com or a quick session request) and run this before the header shows.
   Prototype: add ?login=1 to any page to preview the logged in state (remembered on this browser),
   ?login=0 to go back. ?plan=free-trial | basic | standard | premium sets the plan the user is on. */
(() => {
  const APP = 'https://ai.formeeholdings.com';
  const ROUTES = {               /* app paths: placeholders until dev confirms */
    home: APP + '/',
    newContent: APP + '/new-content',
    brandKit: APP + '/brand-kit',
    trends: APP + '/trends',
    accounts: APP + '/settings/connected-accounts',
    billing: APP + '/settings/billing',
  };
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
  };
  const q = new URLSearchParams(location.search);
  if (q.has('login')) store.set('pulseDemoLogin', q.get('login') === '1' ? '1' : null);
  if (q.has('plan')) store.set('pulseDemoPlan', q.get('plan') || null);

  const isLoggedIn = () => store.get('pulseDemoLogin') === '1';
  const currentPlan = () => store.get('pulseDemoPlan'); /* null = unknown */

  /* Prototype control (11/26): switch Logged out / Logged in and the plan without editing the URL.
     Review only. Remove this block (and .proto-ctrl in style.css) for production. */
  const SCROLL = 'pulseDemoScroll';
  try {
    const saved = sessionStorage.getItem(SCROLL);
    if (saved !== null) {
      sessionStorage.removeItem(SCROLL);
      addEventListener('load', () => {
        const go = () => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, parseFloat(saved)); document.documentElement.style.scrollBehavior = ''; };
        go(); setTimeout(go, 300); /* again after late layout (videos, fonts) */
      });
    }
  } catch {}
  const reloadWith = (login, plan) => {
    store.set('pulseDemoLogin', login ? '1' : null);
    if (plan !== undefined) store.set('pulseDemoPlan', plan);
    try { sessionStorage.setItem(SCROLL, String(scrollY)); } catch {}
    const u = new URL(location.href); u.searchParams.delete('login'); u.searchParams.delete('plan');
    location.replace(u.pathname + u.search + u.hash);
  };
  const buildControl = () => {
    const on = isLoggedIn(), plan = currentPlan();
    const plans = [['free-trial', 'Free trial'], ['basic', 'Basic'], ['standard', 'Standard'], ['premium', 'Premium']];
    const el = document.createElement('div');
    el.className = 'proto-ctrl' + (store.get('pulseDemoCtrl') === 'min' ? ' is-min' : '');
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Prototype control');
    el.innerHTML =
      `<button type="button" class="proto-head" aria-expanded="true"><span class="proto-dot${on ? ' on' : ''}"></span><span class="proto-title">Prototype</span><span class="proto-now">${on ? 'Logged in' + (plan ? ' · ' + (plans.find(x => x[0] === plan) || [, plan])[1] : '') : 'Logged out'}</span><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 7.5 6 4.5l3 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>` +
      `<div class="proto-body">` +
        `<div class="proto-label">View</div>` +
        `<div class="proto-seg"><button type="button" data-login="0" class="${on ? '' : 'on'}">Logged out</button><button type="button" data-login="1" class="${on ? 'on' : ''}">Logged in</button></div>` +
        `<div class="proto-label">Plan</div>` +
        `<div class="proto-seg proto-plans">` + plans.map(([k, l]) => `<button type="button" data-plan="${k}" class="${on && plan === k ? 'on' : ''}">${l}</button>`).join('') + `</div>` +
      `</div>`;
    const head = el.querySelector('.proto-head');
    const sync = () => head.setAttribute('aria-expanded', String(!el.classList.contains('is-min')));
    sync();
    head.addEventListener('click', () => { el.classList.toggle('is-min'); store.set('pulseDemoCtrl', el.classList.contains('is-min') ? 'min' : null); sync(); });
    el.addEventListener('click', e => {
      const b = e.target.closest('button[data-login], button[data-plan]');
      if (!b || b.classList.contains('on') || b.disabled) return;
      if (b.dataset.login) reloadWith(b.dataset.login === '1', b.dataset.login === '1' ? (plan || 'basic') : undefined);
      else reloadWith(true, b.dataset.plan);
    });
    document.body.appendChild(el);
  };
  if (document.body) buildControl(); else addEventListener('DOMContentLoaded', buildControl);

  if (!isLoggedIn()) return;

  document.documentElement.classList.add('logged-in');
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const setBtn = (a, label, href) => {
    const span = a.querySelector('span') || a;
    span.textContent = label;
    if (href) { a.setAttribute('href', href); a.removeAttribute('onclick'); }
  };

  /* 01-1 Header: only "Go to Pulse" */
  $$('.nav-right .btn').forEach(a => {
    if (a.classList.contains('ghost')) a.hidden = true;
    else setBtn(a, 'Go to Pulse', ROUTES.home);
  });
  /* B hero (CTA version) */
  $$('.hero-btn').forEach(a => setBtn(a, 'Go to Pulse', ROUTES.home));

  /* 02-1 Hero Generate: open New content with the typed prompt */
  const gen = document.getElementById('generate');
  if (gen) {
    gen.removeAttribute('onclick');
    gen.addEventListener('click', () => {
      const typed = (document.getElementById('typed') || {}).textContent || '';
      location.href = ROUTES.newContent + (typed ? '?prompt=' + encodeURIComponent(typed) : '');
    });
  }

  /* 03-1 Feature buttons: labels stay, open the matching app screen */
  const feature = { 'Set up your brand': ROUTES.brandKit, 'Find trends': ROUTES.trends, 'Make a post': ROUTES.newContent, 'Connect accounts': ROUTES.accounts };
  $$('a.get-started').forEach(a => { const t = (a.querySelector('span') || a).textContent.trim(); if (feature[t]) a.setAttribute('href', feature[t]); });

  /* 04-1 How it works and 06-1 Final CTA */
  $$('a.btn').forEach(a => {
    const t = (a.querySelector('span') || a).textContent.trim();
    if (t === 'Try it free') setBtn(a, 'Go to Pulse', ROUTES.home);
    if (t === 'Start creating for free') setBtn(a, 'Start creating', ROUTES.newContent);
  });

  /* 05-1 Plan cards and compare table */
  const rank = { 'free-trial': 0, basic: 1, standard: 2, premium: 3 };
  const plan = currentPlan();
  $$('a[href*="sign-up?plan="]').forEach(a => {
    const p = new URL(a.href).searchParams.get('plan');
    if (plan == null || !(plan in rank)) { setBtn(a, 'See plans in Pulse', ROUTES.billing); return; }
    if (p === plan) {
      setBtn(a, 'Current plan');
      a.removeAttribute('href'); a.classList.add('is-current'); a.setAttribute('aria-disabled', 'true');
      return;
    }
    if (p === 'free-trial') { a.style.visibility = 'hidden'; a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1; return; } /* paying users do not see Free Trial; keep its space so the cards stay aligned */
    setBtn(a, rank[p] > rank[plan] ? 'Upgrade' : 'Change plan', ROUTES.billing);
  });

})();
