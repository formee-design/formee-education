/* Formee store v3: inner pages. Each HTML page sets <body data-page="..."> and this file renders it into <main id="page">.
   Copy follows the CEO's site (by Zubair/formee-ai-site 2); layout follows the v3 store home. Prices are illustrative, not final. */
(() => {
  'use strict';
  const { BUSINESSES, PRICING, PRICING_FAQ, TOOLS, findTool } = window.FD;
  const { SCENES } = window.FS;
  const S = window.FSite;
  const { $, $$, pad, vars, tag, ARROW, EXT, money, URL: U } = S;
  const page = document.body.dataset.page;
  const main = $('#page');
  const q = new URLSearchParams(location.search);

  const head = (eyebrow, title, sub, center) => `
    <div class="section-head${center ? ' section-head--center' : ''}">
      ${eyebrow ? `<span class="eyebrow r up">${eyebrow}</span>` : ''}
      <h2 class="r up" style="--rd:.06s">${title}</h2>
      ${sub ? `<p class="r up" style="--rd:.12s">${sub}</p>` : ''}
    </div>`;
  const scene = p => `<div class="scene is-active" aria-hidden="true">${SCENES[p.scene] ? SCENES[p.scene]() : ''}</div>`;
  const shortPill = p => p.name.startsWith(p.short) ? '' : `<span class="short-pill">${p.short}</span>`;
  const toolBtns = (b, p, { view = true } = {}) => p.external
    ? `<a class="btn btn--md" href="${p.href}" target="_blank" rel="noopener"><span>Visit ${p.name}</span>${EXT}</a>`
    : p.status
      ? `<a class="btn btn--md btn--outline" href="${U.contact(b.id, p.name)}"><span>Talk to the team</span></a>`
      : `<a class="btn btn--md" href="${U.pricing}"><span>Start free</span></a><a class="btn btn--md btn--outline" href="${U.contact(b.id, p.name)}"><span>Contact us</span></a>${view ? `<a class="link-arrow" href="${U.tool(p)}">View tool ${ARROW}</a>` : ''}`;
  const bundleFor = id => PRICING.bundles.find(x => x.industry === id);
  const paid = PRICING.tiers.filter(t => !t.contact_sales);
  // Per-tool prices (data.js "prices"), falling back to the shared tiers; bundles add up the tools' own prices
  const toolPrice = (p, t, key) => { const o = p.prices && p.prices[t.id]; const k = key === 'a' ? 'annual_monthly' : 'monthly'; return o && o[k] != null ? o[k] : t[k]; };
  const sumPrice = (tools, t, key) => tools.reduce((n, p) => n + toolPrice(p, t, key), 0);
  const bundlePrice = (tools, t, key) => +(sumPrice(tools, t, key) * (1 - PRICING.bundleDiscount / 100)).toFixed(2);
  const priceSpan = (m, a) => `US$<span data-m="${m}" data-a="${a}">${money(m)}</span>`;
  const otherIndustries = id => `
    <div class="chip-row r up">${BUSINESSES.filter(b => b.id !== id).map(b => `<a class="ind-chip" href="${U.industry(b.id)}">${b.name}</a>`).join('')}</div>`;
  // Industry pricing (2026-11-26): each tool's own price and the bundle price side by side, per plan.
  // Prices come from data.js, so only the numbers there need changing later.
  const bundleTable = (b, focus) => {
    // Pricing as plan cards (2026-11-26): only the monthly / annual switch on top, Basic / Standard / Premium side by side.
    // Industry page: each tool's price as a line, the bundle price as the headline. Tool page: that tool's price as the headline, the bundle as one line.
    const bd = bundleFor(b.id);
    const tools = bd ? b.products.filter(p => bd.tools.includes(p.slug)) : [focus].filter(Boolean);
    if (!tools.length) return '';
    const others = focus ? tools.filter(p => p !== focus) : [];
    const lead = { basic: 'For trying it with a small team.', standard: 'For teams using it every day.', premium: 'For larger teams and heavier use.' };
    const line = (label, m, a) => `<li><span>${label}</span><b>${priceSpan(m, a)}</b></li>`;
    const title = focus ? `${focus.name} pricing` : `${b.name} pricing`;
    const sub = bd ? `Buy ${focus ? focus.name : 'each tool'} on its own, or get every ${b.name} tool together in the ${bd.name} for ${PRICING.bundleDiscount}% less.` : `Every plan starts with a ${PRICING.trialDays}-day free trial.`;
    const card = t => {
      const rec = t.id === 'standard';
      const head = focus
        ? `<div class="pr-card__price"><b>${priceSpan(toolPrice(focus, t, 'm'), toolPrice(focus, t, 'a'))}</b><small>/month</small></div>
            ${bd ? `<div class="pr-card__bundle"><span>${bd.name} <span class="save-pill">Save ${PRICING.bundleDiscount}%</span></span><small>With ${others.map(p => p.name).join(', ')}</small><b>${priceSpan(bundlePrice(tools, t, 'm'), bundlePrice(tools, t, 'a'))}<small>/mo</small></b></div>` : ''}`
        : `<ul class="pr-card__lines">${tools.map(p => line(p.name, toolPrice(p, t, 'm'), toolPrice(p, t, 'a'))).join('')}</ul>
            <div class="pr-card__label">${bd.name} <span class="save-pill">Save ${PRICING.bundleDiscount}%</span></div>
            <div class="pr-card__price pr-card__price--bundle"><b>${priceSpan(bundlePrice(tools, t, 'm'), bundlePrice(tools, t, 'a'))}</b><small>/month</small><s>${priceSpan(sumPrice(tools, t, 'm'), sumPrice(tools, t, 'a'))}</s></div>`;
      return `
          <article class="pr-card${rec ? ' is-rec' : ''}">
            <h3>${t.name}${rec ? '<span class="pr-card__badge">Recommended</span>' : ''}</h3><p>${lead[t.id]}</p>
            ${head}
            <ul class="pr-card__checks"><li>${S.I('check', 16)}${PRICING.trialDays}-day free trial${t.trial_card_required ? ', card required' : ', no card'}</li><li>${S.I('check', 16)}${PRICING.moneyBackDays}-day money-back guarantee</li></ul>
            <a class="btn btn--md${rec ? '' : ' btn--outline'}" href="${U.pricing}"><span>Start free trial</span></a>
          </article>`;
    };
    return `
    <section class="section ind-pricing tp-sec--band">
      <div class="container">
        <h2 class="tp-title r up">${title}</h2>
        <p class="tp-sub r up">${sub}</p>
        <div class="pr-controls r up"></div>
        <div class="pr-cards pr-cards--plans r up">${paid.map(card).join('')}
        </div>
        <div class="pr-foot r up"><span>Prices in US dollars per month, before tax. ${PRICING.pending}.</span><a class="btn btn--md btn--outline" href="${U.pricing}"><span>Compare all plans</span>${ARROW}</a></div>
      </div>
    </section>`;
  };

  const R = {};

  /* ---------- Industries ---------- */
  R.industries = () => {
    // Refined 2026-11-26 to match the home page: no breadcrumb (top-level page, the nav already says where you are),
    // industry photos from the home tiles, each industry's tools listed with their app icons, pastel industry chip.
    const list = S.IND_ORDER.map(id => BUSINESSES.find(b => b.id === id)).filter(Boolean).concat(BUSINESSES.filter(b => !S.IND_ORDER.includes(b.id)));
    return `
    ${S.pageHero({ title: 'Start with your industry.', sub: `Eight industries, ${TOOLS} AI tools. Each industry has its own tools, built for the way it works.` })}
    <section class="inds-sec">
      <div class="container">
        <div class="ind-big-grid">${list.map((b, i) => `
          <article class="ind-big r up" style="--rd:${(i % 2) * .06}s">
            <a class="ind-big__photo" href="${U.industry(b.id)}" tabindex="-1" aria-hidden="true"><img src="assets/industries/${b.id}.jpg" alt="" loading="lazy" width="612" height="423"></a>
            <div class="ind-big__body">
              <div class="ind-big__head">
                <span class="ind-big__icon" data-ind="${b.id}">${S.I(b.icon, 20)}</span>
                <h2 class="ind-big__name"><a href="${U.industry(b.id)}">${b.name}</a></h2>
              </div>
              <p class="ind-big__desc">${b.desc}</p>
              <ul class="ind-big__tools">${b.products.map(p => `
                <li><a class="ind-big__tool" href="${U.tool(p)}"${p.external ? ' target="_blank" rel="noopener"' : ''}>
                  <span class="ind-big__tool-text"><b>${p.name}${tag(p)}</b><small>${p.summary}</small></span>
                  <span class="ind-big__tool-go${p.external ? ' is-ext' : ''}">${p.external ? EXT : ARROW}</span>
                </a></li>`).join('')}
              </ul>
              <a class="ind-big__more" href="${U.industry(b.id)}">Explore ${b.name} ${ARROW}</a>
            </div>
          </article>`).join('')}
        </div>
      </div>
    </section>
    ${S.ctaBand('Find the right tools for your team.', 'Start a free trial, or talk to the Formee team about your industry.')}`;
  };

  /* ---------- Industry (industry.html?id=hr) ---------- */
  R.industry = () => {
    const b = BUSINESSES.find(x => x.id === q.get('id')) || BUSINESSES[0];
    document.title = `AI tools for ${b.name} · Formee`;
    const n = b.products.length;
    return `
    ${S.pageHero({ title: b.headline, sub: b.desc, crumbs: [['Industries', U.industries], [b.name]],
      extra: `<div class="ind-hero-photo fade-in"><img src="${b.banner || `assets/industries/${b.id}.jpg`}" alt="" width="1774" height="887"></div>` })}
    <section class="section">
      <div class="container">
        ${head('', `${b.name} tools`, `${n} ${n > 1 ? 'tools' : 'tool'}${b.comingSoon ? ' today, with more on the way' : ''}. Every tool comes with a 14-day free trial.`)}
        <div class="tool-rows">${b.products.map((p, i) => `
          <article class="tool-row r up${i % 2 ? ' tool-row--flip' : ''}" data-ind="${b.id}" style="${vars(b)}">
            <div class="tool-row__copy">
              <div class="v2-caption__top">${shortPill(p)}${tag(p)}</div>
              <h3>${p.name}</h3>
              <p>${p.desc}</p>
              <ul class="tool-row__list">${p.highlights.map(([t, d, ic]) => `<li><span class="tool-row__ico">${S.I(ic || 'sparkles', 18)}</span><b>${t}</b><span>${d}</span></li>`).join('')}</ul>
              <div class="tool-row__btns">${p.external ? toolBtns(b, p) : p.status ? toolBtns(b, p) : `<a class="btn btn--md tool-row__go" href="${U.tool(p)}"><span>View ${p.short}</span>${ARROW}</a>`}</div>
            </div>
            <div class="tool-row__visual">${scene(p)}</div>
          </article>`).join('')}
        </div>
      </div>
    </section>
    ${bundleFor(b.id) ? `<div id="billingSlotInd" class="container billing-inline"></div>${bundleTable(b)}` : ''}
    <section class="section ind-other">
      <div class="container">
        <div class="ind-carousel__head r up"><h2 class="tp-title">Explore other industries</h2>
          <div class="ind-carousel__nav"><button type="button" class="ind-carousel__btn" data-dir="-1" aria-label="Previous">${S.I('arrow-left', 18)}</button><button type="button" class="ind-carousel__btn" data-dir="1" aria-label="Next">${S.I('arrow-right', 18)}</button></div>
        </div>
        <div class="ind-carousel r up" id="indCarousel">${S.IND_ORDER.map(id => BUSINESSES.find(x => x.id === id)).filter(x => x && x.id !== b.id).map(x => `
          <a class="ind-slide" href="${U.industry(x.id)}">
            <img src="assets/industries/${x.id}.jpg" alt="" loading="lazy" width="612" height="423">
            <span class="ind-slide__panel"><b>${x.name}</b><small>${x.tagline}</small><span class="ind-slide__go">Explore ${ARROW}</span></span>
          </a>`).join('')}
        </div>
      </div>
    </section>
    ${S.ctaBand(`Try the ${b.name} tools free for 14 days.`, 'Start a free trial, or talk to the Formee team.', b.id)}`;
  };

  /* ---------- Products ---------- */
  R.products = () => `
    ${S.pageHero({ title: 'Every tool, by industry.', sub: `${TOOLS} AI tools, grouped the way you work. Every tool comes with a 14-day free trial.`, crumbs: [['Home', U.home], ['Products']], actions: S.heroActions() })}
    <section class="section">
      <div class="container">
        <div class="filter-row r up" id="filters" role="tablist" aria-label="Filter by industry">
          <button class="filter-chip is-on" data-f="all">All <span>${TOOLS}</span></button>
          ${BUSINESSES.map(b => `<button class="filter-chip" data-f="${b.id}" style="${vars(b)}"><i></i>${b.name} <span>${b.products.length}</span></button>`).join('')}
        </div>
        <div class="tool-grid" id="toolGrid">${BUSINESSES.flatMap(b => b.products.map(p => `
          <article class="tool-card r up" data-ind="${b.id}" style="${vars(b)}">
            <a class="tool-card__visual" href="${U.tool(p)}"${p.external ? ' target="_blank" rel="noopener"' : ''}>${scene(p)}</a>
            <div class="tool-card__body">
              <span class="tool-card__ind">${b.name}</span>
              <h3>${p.name} ${tag(p)}</h3>
              <p>${p.desc}</p>
              <div class="tool-card__btns">${p.external ? `<a class="link-arrow" href="${p.href}" target="_blank" rel="noopener">Visit ${p.name} ${ARROW}</a>` : `<a class="link-arrow" href="${U.tool(p)}">View tool ${ARROW}</a><a class="link-arrow link-arrow--muted" href="${U.contact(b.id, p.name)}">Contact us</a>`}</div>
            </div>
          </article>`)).join('')}
        </div>
      </div>
    </section>
    ${S.ctaBand('Not sure where to start?', 'Tell us about your organisation and the Formee team will suggest the right tools.')}`;

  /* ---------- Tool (tool.html?id=hr-module) ---------- */
  R.tool = () => {
    /* Tool page template (2026-11-26). Every tool page follows the same frame; content comes from p.page in data.js.
       Sections, in order (each only if the tool has content for it):
       hero · journey (type 'flow' = ordered steps on a line with product-menu chips, type 'modules' = what's inside, unordered, steps are [title, text]) · feature rows (text + visual) · AI · extra (audience-specific) ·
       pricing summary · FAQ · more tools in the industry · closing call to action.
       Visuals that are not designed yet are grey placeholders labelled with what goes there.
       Tools without p.page fall back to their highlights. Generic filler (how-it-works steps, generic FAQ) was removed. */
    let [b, p] = findTool(q.get('id'));
    if (!p) [b, p] = [BUSINESSES[0], BUSINESSES[0].products[0]];
    document.title = `${p.name} · Formee`;
    const pg = p.page || {};
    const bd = bundleFor(b.id);
    const inBundle = bd && bd.tools.includes(p.slug);
    const others = b.products.filter(x => x !== p);
    const ph = (label, cls = '') => `<div class="ph-visual ${cls}" role="img" aria-label="${label} (placeholder)">${S.I('image', 20)}<span>${label}</span></div>`;
    const iconItems = items => items.map(([ic, t, d], i) => `
          <article class="tp-item r up" style="--rd:${i * .06}s"><span class="tool-row__ico">${S.I(ic, 18)}</span><h3>${t}</h3><p>${d}</p></article>`).join('');
    const features = pg.features || p.highlights.map(([t, d]) => ({ title: t, text: d, points: [] }));
    const isScene = v => !!(v && v.startsWith('scene:') && SCENES[v.slice(6)]);
    const minPrice = Math.min(...paid.map(t => toolPrice(p, t, 'm')));
    return `
    <section class="hero page-hero tool-hero">
      <div class="container tool-hero__grid">
        <div class="page-hero__inner">
          <nav class="crumbs fade-in" aria-label="Breadcrumb"><a href="${U.industries}">Industries</a><i>›</i><a href="${U.industry(b.id)}">${b.name}</a><i>›</i><span>${p.short}</span></nav>
          <h1 class="page-hero__title fade-in">${p.name}</h1>
          <p class="page-hero__sub fade-in">${p.desc}</p>
          <div class="page-hero__actions fade-in">${p.status ? `<a class="btn btn--md btn--outline" href="${U.contact(b.id, p.name)}"><span>Talk to the team</span></a>` : (p.external ? `<a class="btn btn--md" href="${p.href}" target="_blank" rel="noopener"><span>Visit ${p.name}</span>${EXT}</a>` : `<a class="btn btn--md" href="${U.pricing}"><span>Start free</span></a><a class="btn btn--md btn--outline" href="${U.demo}"><span>Request a demo</span></a>`)}</div>
          ${p.status ? `<div class="page-hero__tags fade-in">${tag(p)}</div>` : ''}
        </div>
        <div class="tp-frame fade-in" style="${vars(b)}">
          <div class="tp-frame__bar"><i></i><i></i><i></i><span>${p.name}</span></div>
          <div class="tp-frame__body">${p.heroVisual ? scene(p) : `<div class="tp-frame__soon">${S.I('image', 20)}<span>Product preview coming soon</span></div>`}</div>
        </div>
      </div>
    </section>
    ${pg.journey ? `
    <section class="tp-sec">
      <div class="container">
        <h2 class="tp-title r up">${pg.journey.title}</h2>
        ${pg.journey.type === 'flow' ? `
        <ol class="tp-flow r up" style="--n:${pg.journey.steps.length}">${pg.journey.steps.map(([t, d, chips], i) => `
          <li style="--i:${i}"><span class="tp-flow__num">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p>${chips && chips.length ? `<span class="tp-flow__chips">${chips.map(c => `<span>${c}</span>`).join('')}</span>` : ''}</li>`).join('')}
        </ol>` : `
        <div class="tp-inside">${pg.journey.steps.map(([t, d], i) => `
          <article class="tp-inside__card r up" style="--rd:${i * .06}s"><h3>${t}</h3><p>${d}</p></article>`).join('')}
        </div>`}
      </div>
    </section>` : ''}
    <section class="tp-sec">
      <div class="container">
        ${pg.features ? '' : `<h2 class="tp-title r up">What ${p.name} brings</h2>`}
        ${features.some(f => isScene(f.visual)) ? `<div class="tp-rows">${features.map((f, i) => `
          <article class="tp-row r up${i % 2 ? ' tp-row--flip' : ''}">
            <div class="tp-row__copy">
              <h2>${f.title}</h2>
              <p>${f.text}</p>
              ${f.points && f.points.length ? `<ul class="tp-points">${f.points.map(x => `<li>${S.I('check', 16)}<span>${x}</span></li>`).join('')}</ul>` : ''}
            </div>
            ${isScene(f.visual) ? `<div class="tp-row__stage" style="${vars(b)}"><div class="scene is-active" aria-hidden="true">${SCENES[f.visual.slice(6)]()}</div></div>` : ph(f.visual || f.title)}
          </article>`).join('')}
        </div>` : `<div class="tp-cards">${features.map((f, i) => `
          <article class="tp-card r up" style="--rd:${i * .06}s">
            <h2>${f.title}</h2>
            <p>${f.text}</p>
            ${f.points && f.points.length ? `<ul class="tp-points">${f.points.map(x => `<li>${S.I('check', 16)}<span>${x}</span></li>`).join('')}</ul>` : ''}
          </article>`).join('')}
        </div>`}
      </div>
    </section>
    ${pg.ai ? `
    <section class="tp-sec tp-sec--band">
      <div class="container">
        <h2 class="tp-title r up">${pg.ai.title}</h2>
        <div class="tp-bento tp-bento--type" style="${vars(b)}">${pg.ai.items.map(([ic, t, d], i) => `
          <article class="tp-type r up${i === 0 || i === 3 ? ' is-wide' : ''}" style="--rd:${i * .06}s">
            <span class="tool-row__ico tp-type__ico">${S.I(ic, 20)}</span>
            <div><h3>${t}</h3><p>${d}</p></div>
          </article>`).join('')}
        </div>
      </div>
    </section>` : ''}
    ${pg.extra ? `
    <section class="tp-sec">
      <div class="container">
        <h2 class="tp-title r up">${pg.extra.title}</h2>
        ${pg.extra.text ? `<p class="tp-sub r up">${pg.extra.text}</p>` : ''}
        <div class="tp-photos">${pg.extra.items.map(([ic, t, d, v], i) => `
          <article class="tp-photo r up" style="--rd:${i * .06}s">
            <div class="tp-photo__media">${ph(v || t, 'ph-visual--photo')}<span class="tp-photo__badge">${S.I(ic, 22)}</span></div>
            <h3>${t}</h3><p>${d}</p>
          </article>`).join('')}
        </div>
      </div>
    </section>` : ''}
    ${p.external || p.status ? '' : bundleTable(b, p)}
    ${pg.faq ? `
    <section class="faq">
      <div class="container faq__grid">
        <div class="faq__head"><h2 class="r up">${p.short} questions</h2></div>
        <div class="faq__list r up" style="--rd:.1s">${S.faqHTML(pg.faq)}</div>
      </div>
    </section>` : ''}
    ${others.length ? `
    <section class="tp-sec tp-sec--more">
      <div class="container">
        <h2 class="tp-title r up">More for ${b.name}</h2>
        <ul class="tp-more r up">${others.map(o => `
          <li><a class="ind-big__tool" href="${U.tool(o)}"${o.external ? ' target="_blank" rel="noopener"' : ''}>
            <span class="ind-big__tool-text"><b>${o.name}${tag(o)}</b><small>${o.summary}</small></span>
            <span class="ind-big__tool-go${o.external ? ' is-ext' : ''}">${o.external ? EXT : ARROW}</span>
          </a></li>`).join('')}
        </ul>
      </div>
    </section>` : ''}
    ${S.ctaBand(`Ready to try ${p.name}?`, 'Start a free trial, or request a demo from the Formee team.', b.id, p.name)}`;
  };

  /* ---------- Pricing ---------- */
  R.pricing = () => {
    const cell = v => v === true ? `<span class="cmp-yes" aria-label="Included">${S.I('check', 18)}</span>` : v === false ? '<span class="cmp-no">-</span>' : v;
    return `
    ${S.pageHero({ title: 'Simple pricing, per tool.', sub: `Every plan starts with a ${PRICING.trialDays}-day free trial. Save ${PRICING.annualDiscount}% with annual billing, and ${PRICING.bundleDiscount}% with an industry bundle.` })}
    <section class="section">
      <div class="container">
        <div class="pricing-controls r up">
          ${S.billingToggleHTML('billingPage')}
          <div class="segment" id="priceTabs" role="tablist" aria-label="Pricing view"><span class="segment__ind"></span><button class="segment__btn" role="tab" aria-selected="true" data-tab="tools">Per tool</button><button class="segment__btn" role="tab" aria-selected="false" data-tab="bundles">Industry bundles</button></div>
        </div>
        <div class="price-pane" data-pane="tools"><div class="plans">${S.tiersHTML()}</div></div>
        <div class="price-pane" data-pane="bundles" hidden>
          <div class="bundle-grid">${PRICING.bundles.map(bd => {
            const b = BUSINESSES.find(x => x.id === bd.industry), n = bd.tools.length;
            return `<article class="bundle-card" style="${vars(b)}">
              <div class="bundle-box__head"><div><b>${bd.name}</b><span>${n} tools: ${b.products.filter(p => bd.tools.includes(p.slug)).map(p => p.short).join(', ')}</span></div><span class="save-pill">Save ${PRICING.bundleDiscount}%</span></div>
              <table class="price-table"><tbody>${paid.map(t => `<tr><td>${t.name}</td><td><b>US$<span data-m="${bundlePrice(t, n, 'm')}" data-a="${bundlePrice(t, n, 'a')}">${money(bundlePrice(t, n, 'm'))}</span></b><small>/month</small></td></tr>`).join('')}</tbody></table>
              <a class="btn btn--md btn--outline" href="${U.industry(b.id)}"><span>See ${b.name} tools</span></a>
            </article>`;
          }).join('')}</div>
          <p class="pricing__note">Bundles for other industries are still to be confirmed by Formee. Single-tool industries are sold per tool.</p>
        </div>
        <p class="pricing__note r up">${PRICING.pending}.</p>
      </div>
    </section>
    <section class="section section--tint">
      <div class="container">
        ${head('Compare', 'Compare plans', 'What every plan includes today. Rows marked "To be set by Formee" are still being decided.', true)}
        <div class="cmp-wrap r up">
          <table class="cmp-table">
            <thead><tr><th></th>${PRICING.tiers.map(t => `<th>${t.name}</th>`).join('')}</tr></thead>
            <tbody>${PRICING.comparison.map(row => `<tr><th>${row.label}</th>${PRICING.tiers.map(t => `<td>${cell(row.values[t.id])}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${head('Payment, tax and trust', 'Everything you need to know before checkout.')}
        <div class="pay-grid">
          <article class="pay-card r up"><span class="pay-card__icon">${S.I('credit-card', 20)}</span><h3>Payment methods</h3><p>Pay by card, Apple Pay or Google Pay through Stripe, or with PayPal.</p><div class="chip-row">${PRICING.paymentMethods.map(m => `<span class="ui-chip">${m}</span>`).join('')}</div></article>
          <article class="pay-card r up" style="--rd:.06s"><span class="pay-card__icon">${S.I('receipt', 20)}</span><h3>Tax and currency</h3><p>Prices are in US dollars. Tax, GST or VAT is calculated from your billing address and shown before you submit payment. One invoice for your whole stack.</p></article>
          <article class="pay-card r up" style="--rd:.12s"><span class="pay-card__icon">${S.I('rotate-ccw', 20)}</span><h3>Free trial and refunds</h3><p>${PRICING.trialDays}-day free trial on every plan, with no card for Basic and Standard. ${PRICING.moneyBackDays}-day money-back guarantee on your first payment.</p></article>
          <article class="pay-card r up"><span class="pay-card__icon">${S.I('lock', 20)}</span><h3>Secure payments</h3><p>Payments are handled by Stripe and PayPal. Formee never sees or stores your card details. Hosted on Microsoft Azure.</p></article>
          <article class="pay-card r up" style="--rd:.06s"><span class="pay-card__icon">${S.I('map-pin', 20)}</span><h3>Choose your data region</h3><p>Pick the Azure region your data is kept in when you check out:</p><ul class="pay-list">${PRICING.regions.map(r => `<li>${r.name}</li>`).join('')}</ul></article>
          <article class="pay-card r up" style="--rd:.12s"><span class="pay-card__icon">${S.I('coins', 20)}</span><h3>Credits and usage</h3><p>What a credit or usage unit covers is set per tool. Amounts per plan are still to be set by Formee.</p></article>
        </div>
      </div>
    </section>
    <section class="faq">
      <div class="container faq__grid">
        <div class="faq__head"><span class="eyebrow r up">FAQ</span><h2 class="r up" style="--rd:.06s">Pricing questions</h2></div>
        <div class="faq__list r up" style="--rd:.1s">${S.faqHTML(PRICING_FAQ)}</div>
      </div>
    </section>
    ${S.ctaBand('Start your free trial.', `${PRICING.trialDays} days free. No card for Basic and Standard.`)}`;
  };

  /* ---------- About ---------- */
  R.about = () => `
    ${S.pageHero({ title: 'Practical AI, private by design.', sub: 'Formee builds AI tools for 8 industries and brings them together on one secure platform.', crumbs: [['Home', U.home], ['About']] })}
    <section class="section">
      <div class="container about-split">
        <div><span class="eyebrow r up">Why Formee exists</span><h2 class="r up" style="--rd:.06s">AI that fits your industry, and keeps data safe.</h2></div>
        <div class="about-split__text r up" style="--rd:.1s">
          <p>Teams need AI that fits their industry and keeps data safe. Too often, safe AI adoption is held back by privacy and compliance questions, work is spread across separate apps with no shared view, and information lives in many separate places.</p>
          <p class="about-split__strong">Formee brings it together: AI tools for eight industries, on one secure platform.</p>
        </div>
      </div>
    </section>
    <section class="section section--tint">
      <div class="container">
        ${head('What we offer', `${TOOLS} AI tools, each built for the way its industry works.`)}
        <div class="offer-list">${BUSINESSES.map((b, i) => `
          <a class="offer-row r up" href="${U.industry(b.id)}" style="${vars(b)}">
            <span class="offer-row__num">${pad(i + 1)}</span>
            <span class="offer-row__name"><span class="ind-icon">${S.I(b.icon, 18)}</span>${b.name}</span>
            <span class="offer-row__tools">${b.products.map(p => p.name).join(', ')}</span>
            ${ARROW}
          </a>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${head('How we build', 'Every Formee tool sits on the same secure foundation.', 'Privacy and compliance are built into every tool from the start, every tool runs on a modern, secure cloud, and hosting options are available across multiple countries on Microsoft Azure.')}
        <div class="trust__grid">${S.trustHTML()}</div>
      </div>
    </section>
    ${S.ctaBand('Find the right tools for your team.', 'Start a free trial, or talk to the Formee team about your industry.')}`;

  /* ---------- Contact ---------- */
  // Phone numbers by country (from the team, 2026-11-26). Empty = placeholder until the number arrives.
  const OFFICES = [
    ['Australia (Melbourne)', '+61 430 156 150'],
    ['USA', '+1 (847) 650-7505'],
    ['UK', ''],
    ['Japan', '+1 786-591-1494'],
    ['China', '+86 186 1862 6141'],
    ['India', '+91 81479 99137'],
    ['Malaysia', '']
  ];
  R.contact = () => `
    <section class="hero page-hero contact-hero">
      <div class="hero__bg" aria-hidden="true"><div class="hero__wash"></div><div class="hero__glow hero__glow--blue"></div><div class="hero__glow hero__glow--pink"></div><div class="hero__glow hero__glow--violet"></div><div class="hero__fade"></div></div>
      <div class="container contact-split">
        <div class="contact-split__intro">
          <h1 class="page-hero__title fade-in">Contact Formee.</h1>
          <p class="page-hero__sub fade-in">Questions about a tool, pricing or your industry? Send us a message and we will get back to you by email.</p>
          <div class="contact-info fade-in">
            <div class="contact-info__row"><h3>Email</h3><a href="mailto:contact@formeeeducation.com">contact@formeeeducation.com</a></div>
            <div class="contact-info__row"><h3>Phone</h3><ul class="contact-phones">${OFFICES.map(([c, n]) => `<li><span>${c}</span>${n ? `<a href="tel:${n.replace(/[^+\d]/g, '')}">${n}</a>` : '<em>Number coming soon</em>'}</li>`).join('')}</ul></div>
            <a class="contact-info__demo" href="${U.demo}">Want a walkthrough? Request a demo ${ARROW}</a>
          </div>
        </div>
        ${S.contactFormHTML({ title: 'Send a message', sub: 'Fields marked optional can be left blank.' })}
      </div>
    </section>`;

  /* ---------- Request a demo (demo.html), copy from the CEO site's demo page ---------- */
  R.demo = () => `
    <section class="hero page-hero contact-hero">
      <div class="container contact-split">
        <div class="contact-split__intro">
          <h1 class="page-hero__title fade-in">See Formee in action.</h1>
          <p class="page-hero__sub fade-in">Tell us about your organisation and the tools you are interested in. The Formee team will arrange a walkthrough.</p>
          <ol class="demo-steps fade-in">
            <li><b>Send your request</b><span>Choose your industry and, if you know it, the tool.</span></li>
            <li><b>We get in touch</b><span>The Formee team emails you to arrange a time.</span></li>
            <li><b>Your walkthrough</b><span>See the tools that fit your industry, and ask anything.</span></li>
          </ol>
        </div>
        ${S.contactFormHTML({ title: 'Request a demo', sub: 'Fields marked optional can be left blank.', demo: true })}
      </div>
    </section>`;

  /* ---------- Privacy notice (text from the CEO site, draft for legal review) ---------- */
  R.privacy = () => {
    const contactLink = `<a href="${U.contact()}">contact form</a>`;
    return `
    ${S.pageHero({ title: 'Privacy notice', sub: 'How formee.com collects and uses your details.',
      extra: `<p class="legal-meta fade-in">Last updated: [date of publication]</p>
        <p class="legal-draft fade-in"><b>Draft for legal review.</b> Text in [square brackets] must be completed by Formee, and the whole document should be reviewed by a qualified lawyer before launch.</p>` })}
    <section class="section legal">
      <div class="container legal__body">
        <h2>Who we are</h2>
        <p>This website is operated by [legal company name], [registered address] (“Formee”, “we”, “us”). You can reach us through the ${contactLink}.</p>

        <h2>What we collect</h2>
        <ul>
          <li><b>Demo requests and enquiries:</b> your name, email address, organisation, job title, country, industry, the tool you are interested in, your message, and your agreement to this notice.</li>
          <li><b>Your Formee account:</b> your name, email address, organisation and a securely hashed version of your password. We never store your password itself.</li>
          <li><b>Orders and billing:</b> the tools, plan, billing period and Azure data region you choose; your company name, billing address and tax ID; your subscriptions, invoices and refunds.</li>
          <li><b>Payments:</b> card and wallet payments are handled by Stripe, and PayPal payments by PayPal. We never receive or store your card details. We keep the references Stripe and PayPal give us so we can match payments to your account.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to your demo request or enquiry.</li>
          <li>To create and secure your account, verify your email address and let you reset your password.</li>
          <li>To provide the tools you buy, bill you, send invoices, and handle trials, cancellations and refunds.</li>
          <li>To keep the website secure, for example by limiting repeated sign-in attempts and form submissions.</li>
        </ul>
        <p>We do not sell your details. [Describe any marketing use, and the opt-in that applies, if Formee intends to send marketing emails.]</p>

        <h2>Who we share it with</h2>
        <p>Stripe and PayPal, to take payments and calculate tax; Microsoft Azure, which hosts this website and its database; and our email provider, to send account and billing emails. [List any other processors.]</p>

        <h2>Where it is stored</h2>
        <p>formee.com is hosted on Microsoft Azure. Account and billing records are stored in Azure Database for PostgreSQL in [Azure region]. Data from the tools you buy is kept in the Azure data region you choose at checkout. Data is encrypted in transit and at rest.</p>

        <h2>How long we keep it</h2>
        <p>Enquiry and demo request records: [retention period]. Account data: while your account is open, then [retention period]. Invoices and billing records: as long as tax law requires, [period].</p>

        <h2>Cookies</h2>
        <p>When you log in we set two strictly necessary cookies: one keeps you signed in securely, and one tells the page to show “Account” instead of “Log in”. Your cart is kept in your browser’s storage. We do not use analytics or advertising cookies. If that changes, we will ask for your consent before any non-essential cookies load, and update this notice.</p>

        <h2>Your rights</h2>
        <p>Depending on where you live, data protection laws such as Malaysia’s Personal Data Protection Act 2010 and the EU General Data Protection Regulation give you rights to access, correct and request deletion of your personal data, and to withdraw consent. To use these rights, contact us through the ${contactLink}. [Add the name or role of the data protection officer, if required.]</p>

        <h2>Changes</h2>
        <p>We will post any changes to this notice on this page and update the date above.</p>
      </div>
    </section>`;
  };

  /* ---------- Terms of use (text from the CEO site, draft for legal review) ---------- */
  R.terms = () => `
    ${S.pageHero({ title: 'Terms of use', sub: 'The terms that apply when you use formee.com and buy Formee subscriptions.',
      extra: `<p class="legal-meta fade-in">Last updated: [date of publication]</p>
        <p class="legal-draft fade-in"><b>Draft for legal review.</b> Text in [square brackets] must be completed by Formee, and the whole document should be reviewed by a qualified lawyer before launch.</p>` })}
    <section class="section legal">
      <div class="container legal__body">
        <h2>About these terms</h2>
        <p>These terms apply to your use of the formee.com website and to subscriptions bought on it, sold by [legal company name], [registered address]. [Add or link the service terms that govern use of the Formee tools themselves.]</p>

        <h2>Using this website</h2>
        <ul>
          <li>You may browse the website and use its forms for genuine enquiries.</li>
          <li>You must not misuse the website, attempt to break its security, or send automated or bulk submissions.</li>
          <li>Information you submit must be accurate and must not infringe anyone else’s rights.</li>
        </ul>

        <h2>Your account</h2>
        <p>You need a Formee account to buy a subscription. Keep your password secret; you are responsible for activity in your account. You must verify your email address before checkout.</p>

        <h2 id="subscriptions">Subscriptions, prices and billing</h2>
        <ul>
          <li>Prices are shown on the <a href="${U.pricing}">pricing page</a> in US dollars, per tool, and exclude tax. Tax, GST or VAT is calculated from your billing address and shown before you pay.</li>
          <li>You can pay monthly, or annually at 20% off. Industry bundles cost 25% less than the same tools bought separately.</li>
          <li>Subscriptions renew automatically at the end of each billing period until cancelled. Everything in one order is on one subscription and one invoice.</li>
          <li>Payments are processed by Stripe (cards, Apple Pay, Google Pay) or PayPal. Formee does not store card details.</li>
          <li>We may change prices for future billing periods with [notice period] notice by email.</li>
        </ul>

        <h2 id="trial">Free trial</h2>
        <ul>
          <li>Every Basic, Standard and Premium plan starts with a 14-day free trial, once per tool per account.</li>
          <li>Basic and Standard trials need no card. Add a payment method before the trial ends to keep your plan; if you do not, the subscription ends when the trial ends and you are not charged.</li>
          <li>Premium trials need a card at the start. You are charged when the trial ends unless you cancel before then.</li>
          <li>If you cancel during the free trial, you are not charged.</li>
        </ul>

        <h2 id="money-back">30-day money-back guarantee</h2>
        <ul>
          <li>If you are not satisfied, you can ask for a full refund of your first payment on a subscription within 30 days of that payment.</li>
          <li>Request the refund from the billing area of your account. It is paid back to the original Stripe or PayPal payment method, and the subscription ends when the refund is issued.</li>
          <li>The guarantee applies to the first payment only, once per subscription. Later payments are not refundable except where the law requires.</li>
        </ul>

        <h2>Changing or cancelling</h2>
        <ul>
          <li>Upgrades (a higher plan, or more tools) take effect at once, with the difference charged pro rata.</li>
          <li>Downgrades take effect at the end of the current billing period.</li>
          <li>You can cancel from your account at any time. You keep access until the end of the period you have paid for; we do not refund partial periods, apart from the money-back guarantee above.</li>
          <li>If a payment fails, we retry it and email you. If it still cannot be collected, access may be suspended until it is paid.</li>
        </ul>

        <h2>Content</h2>
        <p>The text, design and logos on this website belong to Formee or its licensors. Product descriptions are for general information and may change as tools develop. A tool marked “In design” is not yet available to buy.</p>

        <h2>Links</h2>
        <p>This website may link to other websites. We are not responsible for their content.</p>

        <h2>Liability</h2>
        <p>[Liability wording to be provided by Formee’s legal adviser.]</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of [jurisdiction].</p>

        <h2>Contact</h2>
        <p>Questions about these terms? Use the <a href="${U.contact()}">contact form</a>.</p>
      </div>
    </section>`;

  // Inner pages use a light top area (no dark gradient); the header switches to dark text to match
  document.body.classList.add('page-light');
  main.innerHTML = (R[page] || R.industries)();
  S.init({ active: { industries: 'industries', industry: 'industries', products: 'products', tool: 'products', pricing: 'pricing', about: 'about', contact: 'contact' }[page] });

  /* ---------- Page behaviours ---------- */
  S.initBilling($('#billingTool') || $('#billingPage'));
  // Industry pages: one billing toggle for the bundle table
  const indSlot = $('#billingSlotInd');
  if (indSlot) indSlot.innerHTML = '';
  // Other-industries carousel: arrows scroll by one card; buttons dim at the ends
  { const tr = $('#indCarousel'); if (tr) {
    const btns = $$('.ind-carousel__btn');
    const step = () => { const c = tr.querySelector('.ind-slide'); return c ? c.offsetWidth + parseFloat(getComputedStyle(tr).columnGap || 0) : 300; };
    const sync = () => { btns[0].disabled = tr.scrollLeft < 4; btns[1].disabled = tr.scrollLeft + tr.clientWidth > tr.scrollWidth - 4; };
    btns.forEach(bt => bt.addEventListener('click', () => tr.scrollBy({ left: step() * +bt.dataset.dir, behavior: S.reduce ? 'auto' : 'smooth' })));
    tr.addEventListener('scroll', sync, { passive: true }); addEventListener('resize', sync); sync();
  } }
  // Tool page flow line fills from left to right when it comes into view
  { const fl = $('.tp-flow'); if (fl) { if (S.reduce || !('IntersectionObserver' in window)) fl.classList.add('is-drawn'); else new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { fl.classList.add('is-drawn'); io.disconnect(); } }, { threshold: .4 }).observe(fl); } }
  // Monthly / annual toggle on the industry or tool pricing table
  { const host = $('.ind-pricing .pr-controls'); if (host) {
    host.insertAdjacentHTML('beforeend', S.billingToggleHTML('billingInd'));
    const bill = $('#billingInd'); S.initBilling(bill); bill.classList.add('in');
  } }

  // Pricing tabs
  const tabs = $('#priceTabs');
  if (tabs) {
    const ind = $('.segment__ind', tabs);
    const move = () => { const on = $('[aria-selected="true"]', tabs); ind.style.width = on.offsetWidth + 'px'; ind.style.transform = `translateX(${on.offsetLeft}px)`; };
    tabs.addEventListener('click', e => {
      const t = e.target.closest('.segment__btn');
      if (!t) return;
      $$('.segment__btn', tabs).forEach(x => x.setAttribute('aria-selected', String(x === t)));
      $$('.price-pane').forEach(p => { p.hidden = p.dataset.pane !== t.dataset.tab; $$('.r', p).forEach(el => el.classList.add('in')); });
      move();
    });
    move();
    document.fonts && document.fonts.ready.then(move);
  }

  // Products filter
  const filters = $('#filters');
  if (filters) filters.addEventListener('click', e => {
    const f = e.target.closest('.filter-chip');
    if (!f) return;
    $$('.filter-chip', filters).forEach(x => x.classList.toggle('is-on', x === f));
    $$('#toolGrid .tool-card').forEach(c => { c.hidden = f.dataset.f !== 'all' && c.dataset.ind !== f.dataset.f; if (!c.hidden) c.classList.add('in'); });
  });
})();
