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

  /* Review chip so it is clear this is the logged in preview */
  const chip = document.createElement('a');
  chip.className = 'login-preview';
  chip.href = location.pathname + '?login=0';
  chip.textContent = 'Logged in preview' + (plan ? ' · ' + plan : '') + ' · Exit';
  document.body.appendChild(chip);
})();
