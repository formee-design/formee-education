/* 11/26 Flow prototype: Paid plan and Free trial flows (FME hand off 17182:6466, 17245:20135).
   State lives in the hash so any step can be shared: flows.html#flow=paid&step=3&plan=premium */
(() => {
  const APP = '../';                           /* other Pulse prototypes sit next to pulse-landing */
  const HOME = APP + 'home/home.html';
  const BILLING = APP + 'billing/billing-v2.html';
  const PLANS = {
    basic:    { name: 'Basic',    price: 49,  credits: '200' },
    standard: { name: 'Standard', price: 129, credits: '520' },
    premium:  { name: 'Premium',  price: 299, credits: '1,200' },
  };

  /* Steps. kind: landing | signup | stripe | home | billing. branch steps are drawn after a divider. */
  const FLOWS = {
    paid: [
      { id: '1', t: 'Landing · Pricing', kind: 'landing', note: 'Pick a paid plan. The plan travels in the link.', url: p => '/sign-up?plan=' + p },
      { id: '2', t: 'Pulse · Sign up', kind: 'signup', note: 'Staging sign up (4 steps). The plan stays in the link until sign up is done.' },
      { id: '3', t: 'Stripe Checkout', kind: 'stripe', note: 'Opens right after sign up for the plan in the link. "Subscribe" pays. The back arrow leaves without paying and goes to A.' },
      { id: '4', t: 'Payment processing', kind: 'billing', note: 'Stripe sends the user back to Billing. This modal shows while the payment is confirmed.', hash: p => `plan=free&tab=plan&modal=result&result=processing&target=${p}`, auto: 1800 },
      { id: '5', t: 'Subscription active', kind: 'billing', note: 'The plan is active and credits are added. "Done" closes the modal and stays on Billing.', hash: p => `plan=${p}&bal=full&tab=plan&modal=result&result=success-sub` },
      { id: 'A', t: 'Home + plan banner', kind: 'home', banner: 'plan', branch: true, note: 'They left Stripe Checkout without paying. Home shows the plan banner for 3 days after sign up. Free trial (40 credits) works in the meantime.' },
      { id: 'B', t: 'Billing · Plan & credits', kind: 'billing', branch: true, note: '"Complete subscription" opens Billing as Free trial. The user clicks "Upgrade plan". No modal opens on its own.', hash: () => 'plan=free&tab=plan' },
      { id: 'C', t: 'Billing + Subscribe modal', kind: 'billing', branch: true, note: '"Upgrade plan" opens "Subscribe to [plan]?" with the plan from the link. "Continue to payment" goes back to 3 (Stripe).', hash: p => `plan=free&tab=plan&modal=subscribe&target=${p}`, pay: '3' },
    ],
    trial: [
      { id: '1', t: 'Landing · Pricing', kind: 'landing', note: 'Free Trial card, "Start free trial". The link carries ?plan=free-trial.', url: () => '/sign-up?plan=free-trial' },
      { id: '2', t: 'Pulse · Sign up', kind: 'signup', note: 'Staging sign up (4 steps). Same screens as the paid plan flow.' },
      { id: '3', t: 'Home (no banner)', kind: 'home', note: 'Home opens without a banner. Free trial has 40 credits (one time) and they can create right away. They can subscribe any time from Billing.' },
      { id: '4', t: 'Home + low credits banner', kind: 'home', banner: 'low', note: 'At 10 or fewer credits, Home shows this banner until they upgrade. Close hides it until the next sign in. At 0 credits the "Choose a plan" modal opens instead.' },
      { id: '5', t: 'Billing · Plan & credits', kind: 'billing', note: '"Upgrade plan" leads to the same Billing, modal and Stripe steps as the paid plan flow.', hash: () => 'plan=free&tab=plan' },
      { id: '6', t: 'Billing + Subscribe modal', kind: 'billing', note: 'Example: Standard. "Continue to payment" opens Stripe Checkout.', hash: p => `plan=free&tab=plan&modal=subscribe&target=${p}`, pay: '7' },
      { id: '7', t: 'Stripe Checkout', kind: 'stripe', note: 'Same Stripe Checkout as the paid plan flow.' },
      { id: '8', t: 'Payment processing', kind: 'billing', note: 'Back on Billing while the payment is confirmed.', hash: p => `plan=free&tab=plan&modal=result&result=processing&target=${p}`, auto: 1800 },
      { id: '9', t: 'Subscription active', kind: 'billing', note: 'The plan is active and credits are added.', hash: p => `plan=${p}&bal=full&tab=plan&modal=result&result=success-sub` },
    ],
  };

  const $ = s => document.querySelector(s);
  const frame = $('#frame'), mock = $('#mock'), note = $('#note'), stepsEl = $('#steps');
  let S = { flow: 'paid', step: '1', plan: 'premium' };
  let autoTimer;

  const read = () => {
    const q = new URLSearchParams(location.hash.slice(1));
    const flow = FLOWS[q.get('flow')] ? q.get('flow') : 'paid';
    const plan = PLANS[q.get('plan')] ? q.get('plan') : (flow === 'trial' ? 'standard' : 'premium');
    const step = FLOWS[flow].some(s => s.id === q.get('step')) ? q.get('step') : '1';
    S = { flow, step, plan };
  };
  const go = (patch) => {
    const n = Object.assign({}, S, patch);
    const h = `flow=${n.flow}&step=${n.step}&plan=${n.plan}`;
    if (location.hash.slice(1) === h) render(); else location.hash = h;
  };
  const steps = () => FLOWS[S.flow];
  const cur = () => steps().find(s => s.id === S.step);

  /* Pages loaded in the frame: tidy them up and catch the clicks that move the flow on */
  const onFrameLoad = (fn) => { frame.onload = () => { try { fn(frame.contentDocument); } catch (e) { /* other origin: leave the page as it is */ } }; };
  const hide = (doc, sel) => { /* a style rule also covers panels the page adds later */
    if (doc.getElementById('flow-hide')) return;
    const st = doc.createElement('style'); st.id = 'flow-hide';
    st.textContent = sel + '{display:none!important}';
    doc.head.appendChild(st);
  };

  const banner = (kind) => {
    const p = PLANS[S.plan];
    const icon = kind === 'plan'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.3 9.2l6.1-.6z"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>';
    const title = kind === 'plan' ? `You picked ${p.name}.` : '10 credits left.';
    const text = kind === 'plan'
      ? `Complete your subscription to get ${p.credits} credits a month. Until then you are on Free trial with 40 credits.`
      : 'Upgrade to keep creating. Free trial credits don’t renew.';
    const cta = kind === 'plan' ? 'Complete subscription' : 'Upgrade plan';
    return `<div data-flow-banner style="display:flex;align-items:center;gap:12px;margin:0 0 16px;padding:12px 16px;border-radius:12px;background:linear-gradient(90deg,#EEF1FD,#F5F3FF);border:1px solid #E0E6FB;font-family:inherit">
      <span style="display:flex;color:#4F6BED">${icon}</span>
      <span style="flex:1;min-width:0"><b style="display:block;font-weight:600;font-size:13px;line-height:18px;color:#0F1729">${title}</b><span style="font-size:12px;line-height:16px;color:#64748B">${text}</span></span>
      <button type="button" data-flow-cta style="height:32px;padding:0 14px;border:0;border-radius:8px;background:#0F1729;color:#fff;font:inherit;font-size:12px;font-weight:600;cursor:pointer">${cta}</button>
      <button type="button" data-flow-close aria-label="Close" style="display:flex;border:0;background:none;color:#64748B;cursor:pointer;padding:4px"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
    </div>`;
  };

  const showFrame = (src, fn) => { mock.hidden = true; frame.hidden = false; onFrameLoad(fn || (() => {})); if (frame.getAttribute('src') !== src) frame.setAttribute('src', src); else { try { (fn || (() => {}))(frame.contentDocument); } catch (e) {} } };
  const showMock = html => { frame.hidden = true; mock.hidden = false; mock.innerHTML = html; mock.scrollTop = 0; };
  const nextId = () => { const i = steps().indexOf(cur()); const n = steps()[i + 1]; return n && !(n.branch && !cur().branch) ? n.id : null; };

  const render = () => {
    read();
    const st = cur();
    clearTimeout(autoTimer);
    /* top bar */
    document.querySelectorAll('[data-flow]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.flow === S.flow)));
    let html = '', seenBranch = false;
    steps().forEach(s => {
      if (s.branch && !seenBranch) { seenBranch = true; html += '<span class="fl-sep">|</span>'; }
      html += `<button type="button" class="fl-step${s.branch ? ' is-branch' : ''}${s.id === S.step ? ' on' : ''}" data-step="${s.id}"><b>${s.id}</b>${s.t}</button>`;
    });
    stepsEl.innerHTML = html;
    const i = steps().indexOf(st);
    $('#prev').disabled = i === 0;
    const nx = nextId();
    $('#next').disabled = !nx;
    const p = PLANS[S.plan];
    note.innerHTML = `<strong>${st.id} · ${st.t}</strong><span>${st.note}</span>` + (st.url ? `<span class="url">${st.url(S.plan)}</span>` : '');

    /* stage */
    if (st.kind === 'landing') {
      showFrame('pricing.html?flow=1', doc => {
        doc.addEventListener('click', e => {
          const a = e.target.closest('a[href*="/sign-up"]');
          if (!a) return;
          e.preventDefault();
          const pl = new URL(a.href).searchParams.get('plan');
          if (pl === 'free-trial') go({ flow: 'trial', step: '2', plan: 'standard' });
          else go({ flow: 'paid', step: '2', plan: PLANS[pl] ? pl : S.plan });
        }, true);
      });
    } else if (st.kind === 'signup') {
      const planQ = S.flow === 'trial' ? 'free-trial' : S.plan;
      showMock(`<div class="su"><div class="su-card">
        <div class="su-bars"><i class="on"></i><i></i><i></i><i></i></div>
        <h1>Create your account</h1><p class="su-sub">One form and one email code.</p>
        <label>FULL NAME</label><div class="su-in">Jane Doe</div>
        <label>EMAIL</label><div class="su-in">name@business.com</div>
        <label>WHATSAPP NUMBER</label><div class="su-in">+1 000 000 0000</div>
        <label>PASSWORD</label><div class="su-in">At least 8 characters</div>
        <button type="button" class="su-go" data-next>Continue</button>
        <p class="su-fine">Already have an account? <a>Sign in</a></p>
        <div style="text-align:center"><span class="su-plan">/sign-up?plan=${planQ}</span></div>
      </div></div>`);
    } else if (st.kind === 'stripe') {
      showMock(`<div class="sc"><div class="sc-l"><div>
        <button type="button" class="sc-back" data-leave><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3 5 8l5 5"/></svg><span class="lg">P</span>Pulse</button>
        <p class="t">Subscribe to ${p.name}</p>
        <p class="p">$${p.price.toFixed(2)} <small>per month</small></p>
        <div class="sc-row"><span>${p.name}<em>Billed monthly</em></span><span>$${p.price.toFixed(2)}</span></div>
        <div class="sc-row"><span>Subtotal</span><span>$${p.price.toFixed(2)}</span></div>
        <div class="sc-row total"><span>Total due today</span><span>$${p.price.toFixed(2)}</span></div>
      </div></div><div class="sc-r"><div>
        <h2>Pay with card</h2>
        <label>Email</label><div class="sc-in">name@business.com</div>
        <label>Card information</label><div class="sc-grp"><div class="sc-in">1234 1234 1234 1234</div><div class="two"><div class="sc-in">MM / YY</div><div class="sc-in">CVC</div></div></div>
        <label>Cardholder name</label><div class="sc-in">Full name on card</div>
        <label>Country or region</label><div class="sc-in">United States</div>
        <button type="button" class="sc-pay" data-next>Subscribe</button>
        <p class="sc-fine">By confirming your subscription, you allow Pulse to charge you for future payments in line with their terms. You can always cancel your subscription.</p>
        <p class="sc-by">Powered by Stripe · Terms · Privacy</p>
      </div></div></div>`);
    } else if (st.kind === 'home') {
      showFrame(HOME, doc => {
        hide(doc, '.home-fab, .nav-test-panel');
        doc.querySelectorAll('[data-flow-banner]').forEach(n => n.remove());
        if (!st.banner) return;
        const main = doc.querySelector('.home-main');
        if (!main) return;
        main.insertAdjacentHTML('afterbegin', banner(st.banner));
        const b = main.querySelector('[data-flow-banner]');
        b.querySelector('[data-flow-close]').onclick = () => b.remove();
        b.querySelector('[data-flow-cta]').onclick = () => go({ step: S.flow === 'trial' ? '5' : 'B' });
      });
    } else if (st.kind === 'billing') {
      showFrame(BILLING + '?f=' + Date.now() + '#' + st.hash(S.plan), doc => {
        hide(doc, '.launcher, .home-fab, .nav-test-panel');
        if (st.pay) doc.addEventListener('click', e => {
          const b = e.target.closest('#payBtn');
          if (!b) return;
          e.preventDefault(); e.stopPropagation();
          go({ step: st.pay });
        }, true);
      });
      if (st.auto) autoTimer = setTimeout(() => go({ step: nextId() }), st.auto);
    }
  };

  /* controls */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-flow], [data-step], [data-next], [data-leave]');
    if (!t) return;
    if (t.dataset.flow) go({ flow: t.dataset.flow, step: '1', plan: t.dataset.flow === 'trial' ? 'standard' : 'premium' });
    else if (t.dataset.step) go({ step: t.dataset.step });
    else if (t.hasAttribute('data-next')) { const n = nextId(); if (n) go({ step: n }); }
    else if (t.hasAttribute('data-leave')) go({ step: S.flow === 'paid' ? 'A' : '6' });
  });
  $('#prev').onclick = () => { const i = steps().indexOf(cur()); if (i > 0) go({ step: steps()[i - 1].id }); };
  $('#next').onclick = () => { const n = nextId(); if (n) go({ step: n }); };
  addEventListener('hashchange', render);
  render();
})();
