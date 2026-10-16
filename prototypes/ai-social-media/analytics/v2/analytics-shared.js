// Analytics — shared placeholder data + helpers for analytics.html and posts.html.
// One dataset (platform × content type) drives every number on both screens, so a total on Analytics
// always matches the posts listed on Published Posts. Only metrics every connected platform's API returns:
// posts, views, likes, comments (engagement = (likes + comments) ÷ views). Paid metrics (spend, leads, CPL)
// come from Meta Ads, so they exist only for Instagram / Facebook posts and only once Meta Ads is connected.

const ICON = '../../../../components/ai-social-media/icons/';
const THUMB = '../../trends/assets/';

// Platform series use the brand blue ramp, darkest → lightest in display order (stacks build up from the darkest).
// connected: false = not wired up yet (REDnote, 2026-10-14) — left out of every chart, list and filter, same as the
// hidden layers in Figma. Flip it back to true once the integration lands; colours / seeds stay as they are.
const ALL_PLATFORMS = [
  { name: 'Instagram', color: 'var(--color-brand-primary-dark)', connected: true },
  { name: 'TikTok', color: 'var(--color-brand-link)', connected: true },
  { name: 'Facebook', color: 'var(--color-brand-primary-soft)', connected: true },
  { name: 'REDnote', color: 'var(--color-brand-primary-mid)', connected: false },
  { name: 'LinkedIn', color: 'var(--color-brand-primary-pale)', connected: true },
];
const PLATFORMS = ALL_PLATFORMS.filter((p) => p.connected);
const platformSeed = (p) => ALL_PLATFORMS.indexOf(p) + 1; // fixed per platform, so hiding one doesn't reshuffle the others' data
const META_ADS_PLATFORMS = ['Instagram', 'Facebook'];
// Content types — Video · Image · Carousel on every platform. Facebook / LinkedIn's multi-image post is a Carousel too
// (Figma 2026-10-16: Multi-Image Post merged into Carousel, so the Type chart, legend and filter have three types).
// v2: types are a stack in the Published Posts chart, where primary-light vanishes on white → the strongest blues
const TYPES = [
  { name: 'Video', color: 'var(--color-brand-primary-dark)' },
  { name: 'Image', color: 'var(--color-brand-link)' },
  { name: 'Carousel', color: 'var(--color-brand-primary-soft)' },
];
// Published posts in the last 30 days, per platform × type
const BASE_POSTS = {
  Instagram: { Video: 9, Image: 4, Carousel: 5 },
  TikTok: { Video: 18, Image: 2, Carousel: 4 },
  Facebook: { Video: 5, Image: 2, Carousel: 1 },
  REDnote: { Video: 1, Image: 2, Carousel: 1 },
  LinkedIn: { Video: 3, Image: 5, Carousel: 4 },
};
// Per-post averages: platform baseline × format multiplier (placeholder)
const PLATFORM_BASE = {
  TikTok: { views: 52000, likeRate: 0.068, commentRate: 0.0018 },
  Instagram: { views: 31000, likeRate: 0.075, commentRate: 0.0030 },
  Facebook: { views: 9800, likeRate: 0.032, commentRate: 0.0021 },
  LinkedIn: { views: 4200, likeRate: 0.048, commentRate: 0.0046 },
  REDnote: { views: 7600, likeRate: 0.081, commentRate: 0.0052 },
};
const TYPE_MULT = {
  Video: { views: 1.3, eng: 1.0 },
  Image: { views: 0.55, eng: 0.95 },
  Carousel: { views: 0.8, eng: 1.25 },
};
const ENG_TWEAK = { TikTok: { Carousel: 0.8 }, Instagram: { Video: 1.3 }, REDnote: { Image: 1.35 } };

// ── Dates — calendar-day math (no ms arithmetic, so DST never shifts a day) ──
const TODAY = new Date(2026, 9, 12);
const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
const diffDays = (a, b) => Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()) - new Date(a.getFullYear(), a.getMonth(), a.getDate())) / 864e5);
const fmtDay = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const fmtDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const fmtMonth = (date) => date.toLocaleDateString('en-US', { month: 'short' });

// Global date range → post-count scale and chart buckets (placeholder). Each bucket is the week / month / day
// ending on `ends[i]`; `chartUnit` is the x-axis step of the Published Posts line chart.
const PERIODS = {
  '30d': { factor: 1, unit: 'week', chartUnit: 'day', ends: Array.from({ length: 5 }, (_, i) => addDays(TODAY, -7 * (4 - i))) },
  '90d': { factor: 2.7, unit: 'week', chartUnit: 'week', ends: Array.from({ length: 13 }, (_, i) => addDays(TODAY, -7 * (12 - i))) },
  all: { factor: 6.4, unit: 'month', chartUnit: 'month', ends: Array.from({ length: 12 }, (_, i) => (i === 11 ? TODAY : new Date(2025, 11 + i, 0))) },
  custom: {}, // filled by setCustomRange()
};
for (const p of Object.values(PERIODS)) if (p.ends) p.buckets = p.ends.map(p.unit === 'month' ? fmtMonth : fmtDay);

// Custom range (Date Picker · Time=Without time) → buckets: ≤ 14 days by day, ≤ 120 days by week (ending on the
// last day), longer by month. Post volume scales with the length of the range.
function setCustomRange(start, end, key = 'custom') {
  const days = diffDays(start, end) + 1;
  const p = PERIODS[key] || (PERIODS[key] = {}); // key 'base' = a second slot for the range a Custom slice was cut from
  p.start = start; p.end = end; p.factor = days / 30;
  if (days <= 14) {
    Object.assign(p, { unit: 'day', chartUnit: 'day', ends: Array.from({ length: days }, (_, i) => addDays(start, i)) });
  } else if (days <= 120) {
    const n = Math.ceil(days / 7);
    Object.assign(p, { unit: 'week', chartUnit: days <= 45 ? 'day' : 'week', ends: Array.from({ length: n }, (_, i) => addDays(end, -7 * (n - 1 - i))) });
  } else {
    const ends = [];
    for (let d = new Date(start.getFullYear(), start.getMonth() + 1, 0); d < end; d = new Date(d.getFullYear(), d.getMonth() + 2, 0)) ends.push(d);
    ends.push(end);
    Object.assign(p, { unit: 'month', chartUnit: 'month', ends });
  }
  p.buckets = p.ends.map(p.unit === 'month' ? fmtMonth : fmtDay);
}
setCustomRange(new Date(2026, 8, 11), new Date(2026, 9, 11)); // 11/09/2026 – 11/10/2026 (DD/MM/YYYY)

function bucketRange(periodKey, i) {
  const { unit, ends, start: rangeStart } = PERIODS[periodKey];
  const end = ends[i];
  let start = unit === 'week' ? addDays(end, -6) : unit === 'month' ? new Date(end.getFullYear(), end.getMonth(), 1) : end;
  if (rangeStart && start < rangeStart) start = rangeStart; // custom range: first bucket starts on the picked day
  return { start, end };
}

// DD/MM/YYYY — the date format used across the product's inputs
const fmtDMY = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
const fmtISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parseISO = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
// query params that carry a period between Analytics and Published Posts (custom adds its dates)
const periodParams = (key) => (key === 'custom' ? { period: key, from: fmtISO(PERIODS.custom.start), to: fmtISO(PERIODS.custom.end) } : { period: key });
// Detail pages (campaign.html / post.html) — their own period selector, preset from the list they were opened from.
// The part of a run (start → last) inside the picked range; 'all' = the whole run (lifetime), null = no overlap.
function detailSpan(periodKey, start, last) {
  if (periodKey === 'all') return { start, end: last };
  const r = periodRange(periodKey);
  const s = r.start > start ? r.start : start, e = r.end < last ? r.end : last;
  return s > e ? null : { start: s, end: e };
}
// binds the Segment Chip track (#periodSelector) + Custom date range (#customRange) on a detail page
function bindDetailPeriod({ initial, onChange }) {
  const chips = document.querySelectorAll('#periodSelector .segment-chip');
  const select = (key) => {
    chips.forEach((c) => c.classList.toggle('segment-chip--active', c.dataset.period === key));
    document.getElementById('customRange').hidden = key !== 'custom';
  };
  chips.forEach((chip) => chip.addEventListener('click', () => { select(chip.dataset.period); onChange(chip.dataset.period); }));
  bindCustomRange({
    fromField: document.getElementById('customFrom'), toField: document.getElementById('customTo'),
    applyBtn: document.getElementById('customApply'), onApply: () => onChange('custom'),
  });
  select(initial);
}
// A bar on Analytics opens its week / month in Published Posts as a Custom range, but lists the bar's own posts: the
// parent range's dataset (?base=30d|90d|all, or base=custom&baseFrom&baseTo) cut to the custom dates — so the count
// matches the bar. Returns the PERIODS key to build posts from, or null.
function readBasePeriod(params) {
  const b = params.get('base');
  if (b === 'custom') {
    const f = parseISO(params.get('baseFrom')), t = parseISO(params.get('baseTo'));
    if (!f || !t || f > t) return null;
    setCustomRange(f, t, 'base');
    return 'base';
  }
  return ['30d', '90d', 'all'].includes(b) ? b : null;
}
const baseParams = (key) => (!key ? {} : key === 'base'
  ? { base: 'custom', baseFrom: fmtISO(PERIODS.base.start), baseTo: fmtISO(PERIODS.base.end) } : { base: key });
// posts for a list: its own range, or (with a base) the base range's posts that fall inside the custom dates
function postsFor(periodKey, baseKey, opts) {
  if (!baseKey) return buildPosts(periodKey, opts);
  const { start, end } = periodRange(periodKey);
  return buildPosts(baseKey, opts).filter((p) => p.date >= start && p.date <= end);
}
function readCustomRange(params) {
  const from = parseISO(params.get('from')), to = parseISO(params.get('to'));
  if (from && to && from <= to && to <= TODAY) setCustomRange(from, to);
}
function periodRange(periodKey) {
  const n = PERIODS[periodKey].ends.length;
  return { start: bucketRange(periodKey, 0).start, end: bucketRange(periodKey, n - 1).end };
}
const rangeLabel = ({ start, end }) => (diffDays(start, end) === 0 ? fmtDay(start)
  : start.getFullYear() !== end.getFullYear() ? `${fmtDate(start)} – ${fmtDate(end)}` : `${fmtDay(start)} – ${fmtDay(end)}`);

// Empty states (hash, like the other prototypes): #state=empty — new account, nothing published, Meta Ads not
// connected; #state=range-empty — the account has posts, just none in the selected date range. Both zero the data.
const DATA_STATE = new URLSearchParams(location.hash.slice(1)).get('state');
const NO_DATA = DATA_STATE === 'empty' || DATA_STATE === 'range-empty';

function buildCells(periodKey) {
  const factor = NO_DATA ? 0 : PERIODS[periodKey].factor;
  const cells = [];
  for (const p of PLATFORMS) {
    const base = PLATFORM_BASE[p.name];
    for (const t of TYPES) {
      const basePosts = BASE_POSTS[p.name][t.name];
      if (basePosts === undefined) continue; // format doesn't exist on this platform
      const posts = Math.round(basePosts * factor);
      const avgViews = base.views * TYPE_MULT[t.name].views;
      const eng = TYPE_MULT[t.name].eng * ((ENG_TWEAK[p.name] || {})[t.name] || 1);
      cells.push({
        platform: p.name, type: t.name, posts,
        views: posts * avgViews,
        likes: posts * avgViews * base.likeRate * eng,
        comments: posts * avgViews * base.commentRate * eng,
      });
    }
  }
  return cells;
}

function sumCells(list) {
  return list.reduce((a, c) => ({
    posts: a.posts + (c.posts ?? 1), views: a.views + c.views, likes: a.likes + c.likes, comments: a.comments + c.comments,
  }), { posts: 0, views: 0, likes: 0, comments: 0 });
}
const engagementOf = (s) => (s.views ? (s.likes + s.comments) / s.views : 0);

// split an integer across buckets with fixed pseudo-random weights (largest remainder keeps the exact total)
function splitAcross(total, n, seed) {
  const w = Array.from({ length: n }, (_, i) => 0.6 + 0.8 * Math.abs(Math.sin(seed * 12.9898 + i * 78.233)));
  const sum = w.reduce((a, b) => a + b, 0);
  const raw = w.map((x) => (x / sum) * total);
  const out = raw.map(Math.floor);
  const rest = total - out.reduce((a, b) => a + b, 0);
  raw.map((x, i) => [x - Math.floor(x), i]).sort((a, b) => b[0] - a[0]).slice(0, rest).forEach(([, i]) => { out[i] += 1; });
  return out;
}
// posts per bucket for each platform — the Published Posts Over Time stacks
const platformSeries = (cells, periodKey) => PLATFORMS.map((p) => ({
  ...p, series: splitAcross(sumCells(cells.filter((c) => c.platform === p.name)).posts, PERIODS[periodKey].ends.length, platformSeed(p)),
}));

const rand = (seed) => { const x = Math.sin(seed * 12.9898 + 4.1414) * 43758.5453; return x - Math.floor(x); };

function formatCount(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, '')}K`;
  return String(Math.round(n));
}
const formatPct = (r) => `${(r * 100).toFixed(1)}%`;
const formatMoney = (n) => `$${n >= 1000 ? formatCount(n) : n.toFixed(2)}`;
const formatUSD = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });                 // $2,481.37
const formatUSDShort = (n) => (n >= 1000 ? `$${formatCount(n)}` : `$${Math.round(n).toLocaleString('en-US')}`); // $512 · $2.4K

// ── Meta Ads Spend (placeholder) — a fixed daily spend per calendar day (~$55–105), summed into each bucket, so the
//    same week shows the same amount on 30 days, 90 days and Custom. Zero in the empty states. ──
const dailySpend = (d) => 55 + 50 * rand(Math.round(new Date(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5) * 0.37);
function spendSeries(periodKey) {
  if (NO_DATA) return PERIODS[periodKey].ends.map(() => 0);
  return PERIODS[periodKey].ends.map((_, b) => {
    const { start, end } = bucketRange(periodKey, b);
    let sum = 0;
    for (let d = start; d <= end; d = addDays(d, 1)) sum += dailySpend(d);
    return sum;
  });
}

// ── Chart unit (Daily / Weekly / Monthly) — the page-wide date range stays the one source of truth; a chart only chooses
//    how finely to slice it. Weeks end on the range's last day (like the period buckets), months are calendar months;
//    both clamp to the range. On a period's own unit the buckets are identical to PERIODS[...] buckets. ──
const UNIT_LABEL = { day: 'Daily', week: 'Weekly', month: 'Monthly' };
function unitsFor(start, end) { // which units make sense for a range of this length
  const days = diffDays(start, end) + 1;
  if (days <= 14) return ['day'];
  if (days <= 62) return ['day', 'week'];
  if (days <= 180) return ['day', 'week', 'month'];
  return ['week', 'month'];
}
function unitBuckets(start, end, unit) {
  const out = [];
  if (unit === 'day') for (let d = start; d <= end; d = addDays(d, 1)) out.push({ start: d, end: d, label: fmtDay(d) });
  else if (unit === 'week') {
    const n = Math.ceil((diffDays(start, end) + 1) / 7);
    for (let i = n - 1; i >= 0; i--) { const e = addDays(end, -7 * i); const s = addDays(e, -6); out.push({ start: s < start ? start : s, end: e, label: fmtDay(e) }); }
  } else {
    for (let s = new Date(start.getFullYear(), start.getMonth(), 1); s <= end; s = new Date(s.getFullYear(), s.getMonth() + 1, 1)) {
      const e = new Date(s.getFullYear(), s.getMonth() + 1, 0);
      out.push({ start: s < start ? start : s, end: e > end ? end : e, label: fmtMonth(s) });
    }
  }
  return out;
}
const spendForBuckets = (buckets) => buckets.map(({ start, end }) => {
  if (NO_DATA) return 0;
  let sum = 0;
  for (let d = start; d <= end; d = addDays(d, 1)) sum += dailySpend(d);
  return sum;
});
// "Weekly ▾" — Controls / Filter / Select (inactive look) + Menu option list; the chosen unit always shows, nothing to clear
function buildUnitSelect(container, { units, value, onChange }) {
  container.innerHTML = '';
  if (units.length < 2) return; // nothing to choose (e.g. a ≤ 14-day range is daily only)
  const wrap = document.createElement('div');
  wrap.className = 'filter-dropdown filter-dropdown--right unit-select';
  wrap.innerHTML = `<button type="button" class="filter-select" aria-haspopup="listbox"><span class="filter-select__label">${UNIT_LABEL[value]}</span><img class="filter-select__caret" src="${ICON}caret-down-filled.svg" alt=""></button>
    <div class="context-menu context-menu--option-list" role="listbox" hidden>${units.map((u) => `
      <button type="button" class="menu-option${u === value ? ' menu-option--focused' : ''}" data-unit="${u}" role="option" aria-selected="${u === value}">
        <span class="menu-option-text"><span class="menu-option-label-row"><span class="menu-option-label">${UNIT_LABEL[u]}</span></span></span>
      </button>`).join('')}</div>`;
  const list = wrap.querySelector('.context-menu');
  wrap.querySelector('.filter-select').addEventListener('click', () => { list.hidden = !list.hidden; });
  list.addEventListener('click', (e) => { const o = e.target.closest('[data-unit]'); if (o) { list.hidden = true; onChange(o.dataset.unit); } });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) list.hidden = true; });
  container.appendChild(wrap);
}

// ── Individual posts — every cell split into posts (shares normalised so each cell still sums to its totals),
//    dated inside the same buckets as the Published Posts Over Time stacks ──
const POST_TITLES = [
  'A Day on Campus in the UK', 'Study in the UK — Applications Open', 'UK Applications — January Intake',
  'Free 1:1 Counselling, Book Anytime', 'Main Character Edits — Campus Tour', 'Scholarship Deadlines This Month',
  'Campus Café Guide — Week 1', 'IELTS Tips in 60 Seconds', 'What I Packed for London', 'Student Visa Checklist',
  'Meet Our Counsellors', 'Top 5 UK Unis for Business', 'Dorm Room Tour — Manchester', 'A Month in London: Real Costs',
  'Alumni Story: Seoul to Edinburgh', 'Open Day Highlights', 'Part-time Jobs for Students', 'Foundation vs Year 1 Entry',
  'Accommodation Q&A', 'Weekend Trips from London',
];
const POST_THUMBS = ['viral-4.png', 'viral-2.png', 'viral-3.png', 'viral-6.png', 'viral-5.png', 'viral-1.png', 'post-5.png'];

function buildPosts(periodKey, { adsConnected = false } = {}) {
  const cells = buildCells(periodKey);
  const n = PERIODS[periodKey].ends.length;
  const posts = [];
  PLATFORMS.forEach((p) => {
    const pi = platformSeed(p) - 1;
    const queues = cells.filter((c) => c.platform === p.name && c.posts > 0).map((c, ci) => {
      const seed = (pi + 1) * 1000 + ci * 100;
      // long tail — most posts land near the average, a few break out
      const wv = Array.from({ length: c.posts }, (_, k) => 0.3 + 4 * Math.pow(rand(seed + k * 1.7), 3));
      const wl = wv.map((w, k) => w * (0.7 + 0.6 * rand(seed + k + 0.5)));
      const wc = wv.map((w, k) => w * (0.6 + 0.8 * rand(seed + k + 0.25)));
      const [sv, sl, sc] = [wv, wl, wc].map((a) => a.reduce((x, y) => x + y, 0));
      return wv.map((_, k) => ({ platform: p.name, type: c.type, views: (c.views * wv[k]) / sv, likes: (c.likes * wl[k]) / sl, comments: (c.comments * wc[k]) / sc }));
    });
    // round-robin the types so each bucket gets a mix
    const ordered = [];
    while (queues.some((q) => q.length)) queues.forEach((q) => { if (q.length) ordered.push(q.shift()); });
    let idx = 0;
    splitAcross(ordered.length, n, pi + 1).forEach((count, b) => {
      const { start, end } = bucketRange(periodKey, b);
      const span = diffDays(start, end) + 1;
      for (let j = 0; j < count; j++) {
        const post = ordered[idx++];
        post.bucket = b;
        post.date = addDays(start, Math.floor(rand(pi * 31 + b * 7 + j + 0.3) * span));
        posts.push(post);
      }
    });
  });
  posts.sort((a, b) => b.date - a.date || b.views - a.views);
  posts.forEach((post, i) => {
    post.id = i;
    post.engagement = engagementOf(post);
    post.paid = false;
  });
  // Paid = a Pulse ad (Meta Ads table) delivered in the date range. Each one sits on a post of its platform (same type
  // first, published closest to the ad's start) and brings its content + spend / leads for the days inside the range,
  // so Top Performing, Published Posts and the Meta Ads Performance detail all show the same post.
  if (adsConnected) {
    const { start, end } = periodRange(periodKey);
    META_CAMPAIGNS_MOCK.filter((c) => c.spent !== null && parseISO(c.starts) <= end && parseISO(c.ends) >= start).forEach((c) => {
      const days = campaignDaily(c).filter((d) => d.date >= start && d.date <= end);
      if (!days.length) return;
      const free = posts.filter((p) => !p.paid && p.platform === c.content.platform);
      const pool = free.some((p) => p.type === c.content.type) ? free.filter((p) => p.type === c.content.type) : free;
      if (!pool.length) return;
      const anchor = parseISO(c.starts) < start ? start : parseISO(c.starts);
      const host = pool.reduce((m, p) => (Math.abs(diffDays(anchor, p.date)) < Math.abs(diffDays(anchor, m.date)) ? p : m));
      Object.assign(host, { paid: true, campaignId: c.id, title: c.content.title, img: c.content.img, type: c.content.type });
      host.spend = days.reduce((a, d) => a + d.spend, 0);
      host.leads = c.resultType === 'Reach' ? 0 : days.reduce((a, d) => a + d.results, 0); // a reach ad brings no leads
      host.cpl = host.leads ? host.spend / host.leads : null;
    });
  }
  // organic titles go out by views (Top Organic first), so the distinct titles land there and repeats ("· Part 2")
  // sink to the long tail; titles already used by an ad are skipped
  const adTitles = new Set(META_CAMPAIGNS_MOCK.map((c) => c.content.title));
  const titles = POST_TITLES.filter((t) => !adTitles.has(t));
  posts.filter((p) => !p.paid).sort((a, b) => b.views - a.views).forEach((post, i) => {
    post.title = titles[i % titles.length] + (i >= titles.length ? ` · Part ${Math.floor(i / titles.length) + 1}` : '');
    post.img = POST_THUMBS[i % POST_THUMBS.length];
  });
  return posts;
}

// ── Area line chart — Meta Ads Spend (Analytics) and Performance Over Time (Campaign). One point per value, centred in its
//    slot; null values (e.g. cost per result on a day with no results) break the line. Hover → guide, dot, Editor tooltip.
//    The frame is CSS-scaled, so pointer x is mapped back into viewBox units. ──
function niceMax(v) {
  if (v <= 0) return 1;
  const stepV = Math.pow(10, Math.floor(Math.log10(v / 4)));
  return [1, 2, 2.5, 5, 10].map((m) => m * stepV).find((sv) => sv * 4 >= v) * 4;
}
function drawAreaChart(wrap, { values, labels, tip, format = formatCount, height = 234, minLabelGap = 56 }) {
  const id = wrap.id || `chart${Math.round(rand(values.length + 1) * 1e6)}`;
  const W = wrap.clientWidth, H = height;
  const M = { l: 44, r: 8, t: 12, b: 26 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b, n = values.length, step = iw / n;
  const max = niceMax(Math.max(0, ...values.filter((v) => v !== null)));
  const x = (i) => M.l + step * (i + 0.5);
  const y = (v) => M.t + ih * (1 - v / max);
  // line + area per run of non-null values
  const runs = []; let run = [];
  values.forEach((v, i) => { if (v === null) { if (run.length) runs.push(run); run = []; } else run.push(i); });
  if (run.length) runs.push(run);
  const linePath = (r) => r.map((i, k) => `${k ? 'L' : 'M'} ${x(i)} ${y(values[i])}`).join(' ');
  const areas = runs.map((r) => `<path d="${linePath(r)} L ${x(r[r.length - 1])} ${y(0)} L ${x(r[0])} ${y(0)} Z" fill="url(#${id}Fill)"/>`).join('');
  const lines = runs.map((r) => `<path class="line-chart__line" d="${linePath(r)}"/>`).join('');
  const grid = [0, 1, 2, 3, 4].map((g) => { const v = (max / 4) * g; return `<line class="line-chart__grid" x1="${M.l}" x2="${W - M.r}" y1="${y(v)}" y2="${y(v)}"/><text class="line-chart__axis" x="${M.l - 8}" y="${y(v) + 4}" text-anchor="end">${format(v)}</text>`; }).join('');
  const every = step < minLabelGap ? Math.ceil(minLabelGap / step) : 1; // thin the x labels so they never collide
  const xLabels = labels.map((l, i) => (i % every === 0 ? `<text class="line-chart__axis" x="${x(i)}" y="${H - 6}" text-anchor="middle">${l}</text>` : '')).join('');
  const points = n <= 16 ? values.map((v, i) => (v === null ? '' : `<circle class="line-chart__point" cx="${x(i)}" cy="${y(v)}" r="3"/>`)).join('') : '';
  wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" height="${H}">
    <defs><linearGradient id="${id}Fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="line-chart__grad-top"/><stop offset="1" class="line-chart__grad-bottom"/></linearGradient></defs>
    ${grid}${xLabels}${areas}${lines}${points}
    <g class="line-chart__hover" hidden><line class="line-chart__guide" y1="${M.t}" y2="${M.t + ih}"/><circle class="line-chart__point" r="5"/></g>
    <rect class="line-chart__hit" x="${M.l}" y="${M.t}" width="${iw}" height="${ih}" fill="transparent"/>
  </svg><div class="editor-tooltip" hidden></div>`;
  wrap._chart = { values, x, y, W, n, tip };
  if (wrap._bound) return;
  wrap._bound = true;
  wrap.addEventListener('mousemove', (e) => {
    const m = wrap._chart;
    if (!m || !e.target.classList.contains('line-chart__hit')) return;
    const rect = wrap.querySelector('svg').getBoundingClientRect();
    const px = (e.clientX - rect.left) * (m.W / rect.width);
    let i = 0;
    for (let k = 1; k < m.n; k++) if (Math.abs(m.x(k) - px) < Math.abs(m.x(i) - px)) i = k;
    const hover = wrap.querySelector('.line-chart__hover'), tipEl = wrap.querySelector('.editor-tooltip');
    const v = m.values[i];
    const yy = m.y(v === null ? 0 : v);
    hover.removeAttribute('hidden');
    hover.querySelector('line').setAttribute('x1', m.x(i)); hover.querySelector('line').setAttribute('x2', m.x(i));
    hover.querySelector('circle').setAttribute('cx', m.x(i)); hover.querySelector('circle').setAttribute('cy', yy);
    hover.querySelector('circle').style.visibility = v === null ? 'hidden' : '';
    tipEl.hidden = false;
    tipEl.textContent = m.tip(i);
    tipEl.style.left = `${m.x(i)}px`; tipEl.style.top = `${yy}px`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.querySelector('.line-chart__hover')?.setAttribute('hidden', '');
    const tipEl = wrap.querySelector('.editor-tooltip'); if (tipEl) tipEl.hidden = true;
  });
}

// Meta Ads not connected — one sentence with a "Connect one" link, the same copy as Home's Top performing card.
// Replaces an empty panel's content (Meta Ads Spend / Meta Ads Performance / Top Performing on a new account).
const META_NOT_CONNECTED = 'No Meta Ads account connected for this brand. <a class="not-connected__link" href="#connect-meta">Connect one</a> to track real ad performance here.';
function showNotConnected(panel) { panel.innerHTML = `<p class="not-connected">${META_NOT_CONNECTED}</p>`; }

// ── Meta Ads table — shared by Analytics (Meta Ads Performance, 5-row scroll window) and Published Posts' Meta Ads filter
//    (full list). Only ads made in Pulse come in, and Pulse sets ads up per content (no multi-ad campaigns), so each row is
//    ONE promoted post: content first, its Meta campaign name as a sub-line (handy when cross-checking in Ads Manager). MOCK
//    data (Ads Manager reference + two live campaigns so "Active" has rows), shaped like the Meta Marketing API campaign +
//    insights fields so getMetaCampaigns() can swap to the API without touching the renderer.
//    created = when the ad was made in Pulse (the table's default order: newest first); edited = a draft's last edit (a
//    draft is listed in a range when it was last edited inside it, and Ends shows that date); content.published false =
//    the promoted post isn't live yet ("Not published" chip). ──
const META_CAMPAIGNS_MOCK = [
  { id: 'c01', created: '2026-09-30', content: { title: 'Meet Your Future Classmates', img: 'viral-4.png', platform: 'Instagram', type: 'Video' }, starts: '2026-10-01', name: 'Cardiff University - October 2026', on: true, delivery: 'Active', results: 18, resultType: 'Website Applications', costPerResult: 4.12, costType: 'Per Website Application', budget: 300, budgetType: 'Lifetime', spent: 74.16, impressions: 8940, reach: 5210, ends: '2026-10-31' },
  { id: 'c02', created: '2026-09-29', content: { title: 'Your Visa Checklist, Step by Step', img: 'post-5.png', platform: 'Facebook', type: 'Image' }, starts: '2026-10-03', name: 'India Leads — Ireland EPs — October 2026', on: true, delivery: 'Active', results: 47, resultType: 'Website Applications', costPerResult: 3.40, costType: 'Per Website Application', budget: 600, budgetType: 'Lifetime', spent: 159.80, impressions: 52310, reach: 30775, ends: '2026-11-10' },
  { id: 'c03', created: '2026-07-09', content: { title: 'A Day on Campus in the UK', img: 'viral-5.png', platform: 'Instagram', type: 'Video' }, starts: '2026-07-10', name: 'July Brand Awareness', on: false, delivery: 'Off', results: 2547158, resultType: 'Reach', costPerResult: 0.02, costType: 'Per 1,000 People Reached', budget: null, budgetType: 'Using ad set budget', spent: 59.00, impressions: 2698111, reach: 2547158, ends: '2026-08-10' },
  { id: 'c04', created: '2026-06-30', content: { title: 'Study in Germany — Private Unis', img: 'viral-2.png', platform: 'Instagram', type: 'Carousel' }, starts: '2026-07-01', name: 'Private German Unis - July 2026', on: false, delivery: 'Off', results: 21, resultType: 'Website Applications', costPerResult: 14.27, costType: 'Per Website Application', budget: 300, budgetType: 'Lifetime', spent: 299.63, impressions: 98371, reach: 55129, ends: '2026-07-29' },
  { id: 'c05', created: '2026-06-29', content: { title: 'Free 1:1 Counselling, Book Anytime', img: 'viral-6.png', platform: 'Facebook', type: 'Video' }, starts: '2026-07-08', name: 'INSTANT FORM: India Leads — Ireland EPs — July 2026', on: false, delivery: 'Off', results: 136, resultType: 'Multiple Conversions', costPerResult: 1.28, costType: 'Per Conversion', budget: 600, budgetType: 'Lifetime', spent: 173.42, impressions: 195117, reach: 125800, ends: '2026-08-10' },
  { id: 'c06', created: '2026-06-28', content: { title: 'Ireland EPs — Apply in 3 Steps', img: 'viral-3.png', platform: 'Facebook', type: 'Carousel' }, starts: '2026-07-06', name: 'CRM: India Leads — Ireland EPs — July 2026', on: false, delivery: 'Off', results: 62, resultType: 'Website Applications', costPerResult: 4.64, costType: 'Per Website Application', budget: 300, budgetType: 'Lifetime', spent: 287.86, impressions: 79508, reach: 50537, ends: '2026-08-06' },
  { id: 'c07', created: '2026-06-27', content: { title: 'Top USA Public Universities', img: 'viral-1.png', platform: 'Instagram', type: 'Image' }, starts: '2026-07-07', name: 'USA Public Unis - July 2026', on: false, delivery: 'Off', results: 94, resultType: 'Website Applications', costPerResult: 5.75, costType: 'Per Website Application', budget: 600, budgetType: 'Lifetime', spent: 540.23, impressions: 107137, reach: 60053, ends: '2026-08-07' },
  { id: 'c08', created: '2026-06-26', content: { title: 'Study Abroad Under 15 Lakh', img: 'viral-4.png', platform: 'Instagram', type: 'Video' }, starts: '2026-07-10', name: '15 Lakh - July 2026', on: false, delivery: 'Off', results: 113, resultType: 'Website Applications', costPerResult: 3.78, costType: 'Per Website Application', budget: 600, budgetType: 'Lifetime', spent: 426.58, impressions: 259068, reach: 140314, ends: '2026-08-10' },
  { id: 'c09', created: '2026-06-25', content: { title: 'Still Thinking About the USA?', img: 'viral-2.png', platform: 'Facebook', type: 'Image' }, starts: '2026-07-10', name: 'Retargeting - USA Public Unis - July 2026', on: false, delivery: 'Off', results: 21, resultType: 'Website Applications', costPerResult: 20.82, costType: 'Per Website Application', budget: 600, budgetType: 'Lifetime', spent: 437.29, impressions: 61953, reach: 14400, ends: '2026-08-10' },
  { id: 'c10', created: '2026-06-24', content: { title: 'Cardiff University — August Intake', img: 'viral-5.png', platform: 'Instagram', type: 'Video' }, starts: '2026-08-01', name: 'Cardiff University - August 2026', on: false, delivery: 'Off', results: 31, resultType: 'Website Applications', costPerResult: 3.75, costType: 'Per Website Application', budget: 300, budgetType: 'Lifetime', spent: 116.39, impressions: 10114, reach: 5900, ends: '2026-08-14' },
  { id: 'c11', created: '2026-06-23', content: { title: 'Uni of Birmingham — Open Applications', img: 'viral-3.png', platform: 'Instagram', type: 'Carousel' }, starts: '2026-07-14', name: 'Uni of Birmingham - July 2026', on: false, delivery: 'Off', results: 26, resultType: 'Website Applications', costPerResult: 4.61, costType: 'Per Website Application', budget: 300, budgetType: 'Lifetime', spent: 119.94, impressions: 43411, reach: 28739, ends: '2026-08-14' },
  { id: 'c12', created: '2025-06-20', edited: '2026-10-08', content: { title: 'India → Ireland: Book a Free Call', img: 'viral-6.png', platform: 'Facebook', type: 'Video', published: false }, starts: '2026-10-20', name: 'INSTANT FORM: India Leads — Ireland EPs — July', on: false, delivery: 'In Draft', results: null, resultType: null, costPerResult: null, costType: null, budget: 350, budgetType: 'Lifetime', spent: null, impressions: null, reach: null, ends: '2026-11-13' }, // draft: scheduled after today; its post isn't published yet ("Not published" chip)
  { id: 'c13', created: '2025-06-30', content: { title: 'Live Webinar: Study in the UK', img: 'post-5.png', platform: 'Facebook', type: 'Image' }, starts: '2025-07-03', name: '03 JULY 2026 - WEBINAR', on: false, delivery: 'Off', results: 4, resultType: 'Website Applications', costPerResult: 23.28, costType: 'Per Website Application', budget: 400, budgetType: 'Lifetime', spent: 93.12, impressions: 38168, reach: 27544, ends: '2025-07-31' },
];
// one ad's detail — campaign.html (the promoted post + its Meta campaign). Placeholder daily insights + ads, derived from the campaign's
// totals so every number on the page adds back up to the row in the table.
function getMetaCampaign(id) {
  const c = META_CAMPAIGNS_MOCK.find((x) => x.id === id) || META_CAMPAIGNS_MOCK[0];
  return Promise.resolve({ source: 'mock', campaign: c, daily: campaignDaily(c) });
}
function campaignRange(c) {
  const start = parseISO(c.starts), end = parseISO(c.ends);
  return { start, end, last: end < TODAY ? end : TODAY }; // last = last day with data (today for a live campaign)
}
// split an integer total by weights (largest remainder keeps the exact total)
function splitByWeights(total, w) {
  const sw = w.reduce((a, b) => a + b, 0), raw = w.map((x) => (x / sw) * total), out = raw.map(Math.floor);
  raw.map((x, i) => [x - Math.floor(x), i]).sort((a, b) => b[0] - a[0]).slice(0, total - out.reduce((a, b) => a + b, 0)).forEach(([, i]) => { out[i] += 1; });
  return out;
}
const campaignSeed = (c) => Number(c.id.slice(1)) * 17.3;
function campaignDaily(c) {
  if (c.spent === null) return []; // draft — nothing delivered yet
  const { start, last } = campaignRange(c);
  const n = diffDays(start, last) + 1, seed = campaignSeed(c);
  const w = Array.from({ length: n }, (_, i) => 0.55 + 0.9 * rand(seed + i * 1.3));
  const sw = w.reduce((a, b) => a + b, 0);
  const results = splitByWeights(c.results, w.map((x, i) => x * (0.4 + 1.2 * rand(seed * 3 + i * 0.7))));
  return w.map((x, i) => {
    const spend = (c.spent * x) / sw;
    return { date: addDays(start, i), spend, results: results[i], cpr: results[i] ? spend / results[i] : null };
  });
}
// ── The Meta Ads table follows the date range (2026-10-16). One ad's row for a range: results / cost / spend / impressions /
//    reach are the days inside it (impressions / reach pro-rated by spend — placeholder until the Meta insights API), while
//    budget, delivery and On / Off stay current. Listed when it delivered in the range, or — a draft — was last edited in
//    it; otherwise null (not listed). All time = lifetime totals. ──
const perKOf = (c) => (c.resultType === 'Reach' ? 1000 : 1); // Meta prices Reach per 1,000 people reached
function adRowForPeriod(c, periodKey) {
  if (NO_DATA) return null;
  if (periodKey === 'all') return c;
  const { start, end } = periodRange(periodKey);
  if (c.spent === null) { const e = parseISO(c.edited); return e && e >= start && e <= end ? c : null; } // draft
  const days = campaignDaily(c).filter((d) => d.date >= start && d.date <= end);
  const spent = days.reduce((a, d) => a + d.spend, 0);
  if (!spent) return null;
  const results = days.reduce((a, d) => a + d.results, 0), share = spent / c.spent;
  return { ...c, results, spent, costPerResult: results ? (spent / results) * perKOf(c) : null, impressions: Math.round(c.impressions * share), reach: Math.round(c.reach * share) };
}

// one organic post's daily views / likes / comments, published → today (post.html). Most of it lands in the first days and
// tails off; integer splits add back up to the post's totals in its Published Posts row.
function postDaily(post) {
  const n = diffDays(post.date, TODAY) + 1, seed = post.id * 13.7 + 5;
  const w = Array.from({ length: n }, (_, i) => Math.exp(-i / 5) * (0.6 + 0.8 * rand(seed + i * 1.1)) + 0.06 * (0.5 + rand(seed + i * 2.3)));
  const views = splitByWeights(Math.round(post.views), w);
  const likes = splitByWeights(Math.round(post.likes), w.map((x, i) => x * (0.8 + 0.4 * rand(seed * 2 + i))));
  const comments = splitByWeights(Math.round(post.comments), w.map((x, i) => x * (0.7 + 0.6 * rand(seed * 3 + i))));
  return w.map((_, i) => ({ date: addDays(post.date, i), views: views[i], likes: likes[i], comments: comments[i] }));
}

// the one seam for the integration: resolve { source: 'meta' | 'mock' | 'none', campaigns }
function getMetaCampaigns() {
  if (DATA_STATE === 'empty') return Promise.resolve({ source: 'none', campaigns: [] }); // new account: no ad account
  return Promise.resolve({ source: 'mock', campaigns: META_CAMPAIGNS_MOCK });
}

const ADS_STATUSES = ['All', 'Active', 'Off', 'In Draft'];
const DELIVERY_PRIORITY = { Active: 0, 'In Draft': 1, Off: 2 }; // highest priority first
const fmtInt = (n) => n.toLocaleString('en-US');
const fmtEnds = (iso) => { const d = parseISO(iso); return d ? `${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getFullYear()}` : '—'; };
const endsOf = (c) => (c.delivery === 'In Draft' ? c.edited : c.ends); // a draft's Ends cell = its last edit
// Sort menu per column (simplified Ads Manager column menu — Sort only, no quick filters); a sorted column adds Clear sort
const SORT_UP = 'arrow-up.svg', SORT_DOWN = 'ui-arrow-down.svg';
const SORT_NUMERIC = [{ label: 'Sort highest to lowest', dir: 'desc', icon: SORT_DOWN }, { label: 'Sort lowest to highest', dir: 'asc', icon: SORT_UP }];
const ADS_COLUMNS = [
  { key: 'check', label: '', cls: 'ads-col--check' },
  { key: 'toggle', label: 'Off / On', cls: 'ads-col--toggle' },
  { key: 'name', label: 'Promoted content', cls: 'ads-col--name', sort: (c) => c.content.title.toLowerCase(),
    menu: [{ label: 'Sort A to Z', dir: 'asc', icon: SORT_UP }, { label: 'Sort Z to A', dir: 'desc', icon: SORT_DOWN }] },
  { key: 'delivery', label: 'Delivery', cls: 'ads-col--delivery', sort: (c) => DELIVERY_PRIORITY[c.delivery],
    menu: [{ label: 'Sort highest to lowest priority', dir: 'asc', icon: SORT_DOWN }, { label: 'Sort lowest to highest priority', dir: 'desc', icon: SORT_UP }] },
  // Results mixes units (a Reach ad's result is people reached), so a Reach ad always sorts after the lead ads
  { key: 'results', label: 'Results', cls: 'ads-col--num ads-col--wide', sort: (c) => c.results, group: (c) => (c.resultType === 'Reach' ? 1 : 0), menu: SORT_NUMERIC },
  { key: 'cpr', label: 'Cost per result', cls: 'ads-col--num ads-col--wide', sort: (c) => c.costPerResult, menu: SORT_NUMERIC },
  { key: 'budget', label: 'Budget', cls: 'ads-col--num', sort: (c) => c.budget, menu: SORT_NUMERIC },
  { key: 'spent', label: 'Amount spent', cls: 'ads-col--num', sort: (c) => c.spent, menu: SORT_NUMERIC },
  { key: 'impressions', label: 'Impressions', cls: 'ads-col--num', sort: (c) => c.impressions, menu: SORT_NUMERIC },
  { key: 'reach', label: 'Reach', cls: 'ads-col--num', sort: (c) => c.reach, menu: SORT_NUMERIC },
  { key: 'ends', label: 'Ends', cls: 'ads-col--ends', sort: (c) => endsOf(c),
    menu: [{ label: 'Sort oldest to newest', dir: 'asc', icon: SORT_UP }, { label: 'Sort newest to oldest', dir: 'desc', icon: SORT_DOWN }] },
];
// several columns can be sorted at once — the first one picked sorts first; nothing sorted = newest ads first (created)
function sortAds(list, sorts) {
  const byCol = sorts.map((s) => ({ ...s, col: ADS_COLUMNS.find((c) => c.key === s.key) })).filter((s) => s.col);
  return [...list].sort((a, b) => {
    for (const { col, dir } of byCol) {
      const va = col.sort(a), vb = col.sort(b);
      if (va === null && vb === null) continue;
      if (va === null) return 1; if (vb === null) return -1; // "—" (drafts) always last
      if (col.group) { const g = col.group(a) - col.group(b); if (g) return g; }
      if (va !== vb) return (va > vb ? 1 : -1) * (dir === 'asc' ? 1 : -1);
    }
    return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
  });
}

// mount the table: { table, head, rows } elements; windowRows = visible rows before it scrolls (null = full height);
// rowData(c) = the ad's row for the page's range (null = not listed); filter(c) = extra page filters (platform / type);
// sorts = the sort it opens with ([{ key, dir }], e.g. Results ↓ from Top Performing's View all);
// onRender({ source, count, total, status }) lets the page handle its own empty / not-connected states (total = before the
// Status filter, so "nothing in this range" and "nothing with this status" can say different things)
// only = an ad id → just that row (the detail page's header), with plain column heads and no self-link
function mountAdsTable({ table, head, rows, windowRows = null, linkParams = '', only = null, rowData = (c) => c, filter = () => true, sorts = [], onRender = () => {} }) {
  const state = { status: 'All', sorts: [...sorts], data: { source: 'mock', campaigns: [] }, selected: new Set(), list: [] };
  const dash = '<span class="ads-cell ads-cell--muted">—</span>';
  let menu = null;
  const closeMenu = () => { if (!menu) return; menu.el.remove(); menu.btn.setAttribute('aria-expanded', 'false'); menu = null; };
  const sortOf = (key) => state.sorts.find((s) => s.key === key);

  function renderHead() {
    head.innerHTML = ADS_COLUMNS.map((c) => {
      if (c.key === 'check') {
        const all = state.list.length > 0 && state.list.every((x) => state.selected.has(x.id));
        return `<span class="${c.cls}"><input type="checkbox" class="checkbox" data-select="all" aria-label="Select all ads"${all ? ' checked' : ''}></span>`;
      }
      if (!c.menu || only) return `<span class="${c.cls}">${c.label}</span>`;
      const s = sortOf(c.key);
      const opt = s ? c.menu.find((o) => o.dir === s.dir) : null;
      return `<span class="${c.cls}"><button type="button" class="ads-head${s ? ' ads-head--active' : ''}" data-col="${c.key}" aria-haspopup="menu" aria-expanded="false">${c.label}${opt ? `<img class="ads-head__sort" src="${ICON}${opt.icon}" alt="">` : ''}<img class="ads-head__caret" src="${ICON}caret-down-filled.svg" alt=""></button></span>`;
    }).join('');
  }

  function render() {
    const { source, campaigns } = state.data;
    const inRange = campaigns.filter((c) => (only ? c.id === only : filter(c))).map(rowData).filter(Boolean);
    const list = sortAds(inRange.filter((c) => only || state.status === 'All' || c.delivery === state.status), state.sorts);
    state.list = list;
    renderHead();
    const lp = typeof linkParams === 'function' ? linkParams() : linkParams; // the detail opens on this range (and its breadcrumb leads back)
    rows.innerHTML = list.map((c) => {
      const dCls = c.delivery === 'Active' ? ' ads-delivery--active' : c.delivery === 'In Draft' ? ' ads-delivery--draft' : '';
      const title = only ? `<span class="ads-campaign ads-campaign--static">${c.content.title}</span>` : `<a class="ads-campaign" href="campaign.html?id=${c.id}${lp ? `&${lp}` : ''}">${c.content.title}</a>`;
      const notPublished = c.content.published === false ? '<span class="feedback-status-chip feedback-status-chip--secondary ads-content__chip">Not published</span>' : '';
      return `
      <div class="sc-list-row" data-campaign="${c.id}">
        <span class="ads-col--check"><input type="checkbox" class="checkbox" data-select="${c.id}" aria-label="Select ${c.content.title}"${state.selected.has(c.id) ? ' checked' : ''}></span>
        <span class="ads-col--toggle"><span class="field-switch${c.on ? ' on' : ''}" role="img" aria-label="${c.on ? 'On' : 'Off'}"><span class="knob"></span></span></span>
        <span class="ads-col--name ads-content"><img class="ads-content__thumb" src="${THUMB}${c.content.img}" alt=""><span class="ads-content__text"><span class="ads-content__title-row">${title}${notPublished}</span><span class="ads-sub">${c.content.platform} · ${c.content.type} · ${c.name}</span></span></span>
        <span class="ads-col--delivery"><span class="ads-delivery${dCls}"><span class="ads-delivery__dot"></span>${c.delivery}</span></span>
        <span class="ads-col--num ads-col--wide">${c.results === null ? dash : `<span class="ads-cell">${fmtInt(c.results)}</span><span class="ads-sub">${c.resultType}</span>`}</span>
        <span class="ads-col--num ads-col--wide">${c.costPerResult === null ? dash : `<span class="ads-cell">${formatUSD(c.costPerResult)}</span><span class="ads-sub">${c.costType}</span>`}</span>
        <span class="ads-col--num">${c.budget === null ? `<span class="ads-cell">${c.budgetType}</span>` : `<span class="ads-cell">${formatUSD(c.budget)}</span><span class="ads-sub">${c.budgetType}</span>`}</span>
        <span class="ads-col--num">${c.spent === null ? dash : `<span class="ads-cell">${formatUSD(c.spent)}</span>`}</span>
        <span class="ads-col--num">${c.impressions === null ? dash : `<span class="ads-cell">${fmtInt(c.impressions)}</span>`}</span>
        <span class="ads-col--num">${c.reach === null ? dash : `<span class="ads-cell">${fmtInt(c.reach)}</span>`}</span>
        <span class="ads-col--ends ads-cell">${fmtEnds(endsOf(c))}</span>
      </div>`;
    }).join('');
    // scroll window: head + the first N rows of the first render (rows vary a little — some have a sub-line), then
    // held, so sorting / filtering never changes the card's height; the rest scrolls under the sticky head
    fitWindow();
    onRender({ source, count: list.length, total: inRange.length, status: state.status, selected: state.selected.size });
  }

  // measured only once the rows have a real height — a page loaded in a background tab has no layout yet (0px), so a
  // ResizeObserver retries as soon as the rows are laid out. Fewer rows than the window (a short range) = no cap yet.
  function fitWindow() {
    if (!windowRows || state.windowH || rows.children.length < windowRows) return;
    const h = [...rows.children].slice(0, windowRows).reduce((sum, el) => sum + el.offsetHeight, 0);
    if (!h) return;
    state.windowH = head.offsetHeight + h;
    table.style.maxHeight = `${state.windowH}px`;
  }
  if (windowRows && 'ResizeObserver' in window) new ResizeObserver(fitWindow).observe(rows);

  // column Sort menu — Controls / Context Menu on .frame (so the scrolling table doesn't clip it)
  head.addEventListener('click', (e) => {
    const btn = e.target.closest('.ads-head');
    if (!btn) return;
    if (menu && menu.btn === btn) { closeMenu(); return; }
    closeMenu();
    const col = ADS_COLUMNS.find((c) => c.key === btn.dataset.col);
    const cur = sortOf(col.key);
    const frame = document.querySelector('.frame');
    const scale = frame.getBoundingClientRect().width / frame.offsetWidth;
    const fr = frame.getBoundingClientRect(), br = btn.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'context-menu ads-menu';
    el.setAttribute('role', 'menu');
    el.innerHTML = col.menu.map((o) => `
      <button type="button" class="menu-item${cur && cur.dir === o.dir ? ' menu-item--selected' : ''}" role="menuitem" data-dir="${o.dir}">
        <span class="ads-menu__label"><img src="${ICON}${o.icon}" alt="">${o.label}</span><img class="ads-menu__check" src="${ICON}panel-check.svg" alt="">
      </button>`).join('') + (cur ? `
      <button type="button" class="menu-item" role="menuitem" data-clear="1">
        <span class="ads-menu__label"><img src="${ICON}close-x.svg" alt="">Clear sort</span>
      </button>` : '');
    frame.appendChild(el);
    const left = (br.left - fr.left) / scale, top = (br.bottom - fr.top) / scale + 6;
    const alignRight = col.cls.includes('ads-col--num') || col.key === 'ends';
    el.style.top = `${top}px`;
    el.style.left = `${alignRight ? left + br.width / scale - el.offsetWidth : left}px`;
    btn.setAttribute('aria-expanded', 'true');
    menu = { el, btn };
    el.addEventListener('click', (ev) => {
      const item = ev.target.closest('.menu-item');
      if (!item) return;
      if (item.dataset.clear) state.sorts = state.sorts.filter((s) => s.key !== col.key); // back to newest first when none is left
      else if (cur) cur.dir = item.dataset.dir; // keeps its place in the sort order
      else state.sorts.push({ key: col.key, dir: item.dataset.dir });
      closeMenu(); render();
    });
  });
  document.addEventListener('click', (e) => { if (menu && !menu.el.contains(e.target) && !menu.btn.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  table.addEventListener('scroll', closeMenu);

  getMetaCampaigns().then((data) => { state.data = data; render(); });
  // checkboxes — row / select-all (current view); the selection decides what Export takes
  table.addEventListener('change', (e) => {
    const box = e.target.closest('input[data-select]');
    if (!box) return;
    if (box.dataset.select === 'all') state.list.forEach((x) => (box.checked ? state.selected.add(x.id) : state.selected.delete(x.id)));
    else if (box.checked) state.selected.add(box.dataset.select); else state.selected.delete(box.dataset.select);
    render();
  });

  return {
    setStatus(s) { state.status = s; render(); },
    render,
    // what Export takes: the checked rows if any, otherwise everything in the current view (filter + sort)
    exportSet() {
      const sel = state.list.filter((c) => state.selected.has(c.id));
      return { rows: sel.length ? sel : state.list, scope: sel.length ? 'selected' : 'view' };
    },
  };
}

// ── Filter / Select — Controls/Filter/Select (Inactive/Active) + its open option list (Menu/Item, context-menu--option-list) ──
// inactiveLabel: text for the Inactive pill when the default is selected (e.g. "Rank by: Views").
// initialValue: preselects a non-default option (e.g. from a deep link).
// viewSelect: a view choice that always has a value (Rank by, Sort by) — stays the Light pill with "Label: value", no ✕
// (chip rule 2026-10-15: only filters that narrow a list turn dark with ✕).
function buildFilter({ container, label, options, onSelect, closeToDefault = true, defaultValue = 'All', inactiveLabel = label, initialValue = null, viewSelect = false }) {
  let value = initialValue && initialValue !== defaultValue ? initialValue : null; // null = default (Inactive pill)
  const wrap = document.createElement('div');
  wrap.className = 'filter-dropdown';
  if (container.id) wrap.id = container.id;
  const btn = document.createElement('button');
  btn.type = 'button';
  const list = document.createElement('div');
  list.className = 'context-menu context-menu--option-list';
  list.hidden = true;
  list.innerHTML = options.map((o) => `
    <button type="button" class="menu-option" data-value="${o.value}">
      <span class="menu-option-text"><span class="menu-option-label-row"><span class="menu-option-label">${o.value}</span></span></span>
    </button>`).join('');

  function renderBtn() {
    if (viewSelect) {
      const current = value ?? defaultValue;
      btn.className = 'filter-select';
      btn.innerHTML = `<span class="filter-select__label">${label}: ${current}</span><img class="filter-select__caret" src="${ICON}caret-down-filled.svg" alt="">`;
      list.querySelectorAll('.menu-option').forEach((o) => o.classList.toggle('menu-option--focused', o.dataset.value === current));
    } else if (value === null) {
      btn.className = 'filter-select';
      btn.innerHTML = `<span class="filter-select__label">${inactiveLabel}</span><img class="filter-select__caret" src="${ICON}caret-down-filled.svg" alt="">`;
    } else {
      btn.className = 'filter-select filter-select--active';
      btn.innerHTML = `<img class="filter-select__close" src="${ICON}controls/button-x.svg" alt=""><span class="filter-select__label">${label}</span><span class="filter-select__divider"></span><span class="filter-select__value">${value}</span>`;
    }
  }
  renderBtn();

  btn.addEventListener('click', (e) => {
    if (e.target.closest('.filter-select__close')) {
      value = null; renderBtn(); onSelect(null); return;
    }
    list.hidden = !list.hidden;
  });
  list.addEventListener('click', (e) => {
    const opt = e.target.closest('.menu-option');
    if (!opt) return;
    const v = opt.dataset.value;
    value = (closeToDefault && v === defaultValue) ? null : v;
    renderBtn();
    list.hidden = true;
    onSelect(value);
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) list.hidden = true; });

  wrap.appendChild(btn);
  wrap.appendChild(list);
  container.replaceWith(wrap);
}

// ── Custom date range — each Input (date) opens a Date Picker (Time=Without time, View=Days|Month, date-picker.css) under it;
//    Save writes the day into the field, Apply re-runs the page with the new range ──
let openPicker = null;
function closeDatePicker() {
  if (!openPicker) return;
  openPicker.el.remove();
  openPicker.field.classList.remove('input-field--focused');
  openPicker = null;
}
// composedPath, not contains(): a day click re-renders the popover, so the clicked cell is already detached here
document.addEventListener('click', (e) => { if (openPicker && !e.composedPath().some((n) => n === openPicker.el || n === openPicker.field)) closeDatePicker(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDatePicker(); });

function openDatePicker({ field, value, min, max, onSave }) {
  closeDatePicker();
  let view = new Date(value.getFullYear(), value.getMonth(), 1);
  let picked = value;
  let mode = 'days'; // View=Days | View=Month — the "September 2026" Title Trigger opens the month grid
  const same = (a, b) => diffDays(a, b) === 0;
  const el = document.createElement('div');
  el.className = 'date-picker date-picker-popover';
  const nav = (dir, label) => `<button class="date-picker-nav-btn" type="button" data-nav="${dir}"><img src="${ICON}chevron-${dir < 0 ? 'left' : 'right'}.svg" alt="${label}"></button>`;
  const actions = `
      <div class="date-picker-actions">
        <button class="date-picker-cancel-btn" type="button" data-act="cancel">Cancel</button>
        <button class="date-picker-save-btn" type="button" data-act="save">Save</button>
      </div>`;
  function drawDays() {
    const lead = (view.getDay() + 6) % 7; // Monday-first, like the Figma weekday row
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const gridStart = addDays(view, -lead);
    const weeks = Math.ceil((lead + daysInMonth) / 7);
    const cell = (d) => {
      const off = d.getMonth() !== view.getMonth() || (min && d < min) || (max && d > max);
      const cls = off ? 'disabled' : same(d, picked) ? 'selected' : same(d, TODAY) ? 'today' : '';
      return `<span class="date-picker-day-cell ${cls}" data-date="${fmtISO(d)}">${d.getDate()}</span>`;
    };
    el.innerHTML = `
      <div class="date-picker-header">
        ${nav(-1, 'Previous month')}
        <span class="date-picker-title"><button class="date-picker-title-trigger" type="button" data-open="month">${view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</button></span>
        ${nav(1, 'Next month')}
      </div>
      <div class="date-picker-grid">
        <div class="date-picker-week">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => `<span class="date-picker-weekday-label">${w}</span>`).join('')}</div>
        ${Array.from({ length: weeks }, (_, w) => `<div class="date-picker-week">${Array.from({ length: 7 }, (_, i) => cell(addDays(gridStart, w * 7 + i))).join('')}</div>`).join('')}
      </div>${actions}`;
  }
  // View=Month — "2026" between the arrows (they step a year), 4 × 3 month grid; the month on screen is selected,
  // this month is outlined, months wholly outside min / max are disabled; picking one returns to the calendar
  function drawMonths() {
    const y = view.getFullYear();
    const cell = (m) => {
      const first = new Date(y, m, 1), last = new Date(y, m + 1, 0);
      const off = (min && last < min) || (max && first > max);
      const cls = off ? 'disabled' : m === view.getMonth() ? 'selected' : (y === TODAY.getFullYear() && m === TODAY.getMonth()) ? 'today' : '';
      return `<span class="date-picker-day-cell date-picker-day-cell--wide ${cls}" data-month="${m}">${first.toLocaleDateString('en-US', { month: 'short' })}</span>`;
    };
    el.innerHTML = `
      <div class="date-picker-header">
        ${nav(-1, 'Previous year')}
        <span class="date-picker-month-label">${y}</span>
        ${nav(1, 'Next year')}
      </div>
      <div class="date-picker-panel-grid">
        ${[0, 1, 2, 3].map((r) => `<div class="date-picker-panel-row">${[0, 1, 2].map((c) => cell(r * 3 + c)).join('')}</div>`).join('')}
      </div>${actions}`;
  }
  const draw = () => (mode === 'days' ? drawDays() : drawMonths());
  el.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    const open = e.target.closest('[data-open="month"]');
    const day = e.target.closest('.date-picker-day-cell[data-date]');
    const mon = e.target.closest('.date-picker-day-cell[data-month]');
    const act = e.target.closest('[data-act]');
    if (navBtn) { const step = Number(navBtn.dataset.nav) * (mode === 'days' ? 1 : 12); view = new Date(view.getFullYear(), view.getMonth() + step, 1); draw(); }
    else if (open) { mode = 'month'; draw(); }
    else if (mon && !mon.classList.contains('disabled')) { view = new Date(view.getFullYear(), Number(mon.dataset.month), 1); mode = 'days'; draw(); }
    else if (day && !day.classList.contains('disabled')) { picked = parseISO(day.dataset.date); draw(); }
    else if (act) { if (act.dataset.act === 'save') onSave(picked); closeDatePicker(); }
  });
  draw();
  field.classList.add('input-field--focused');
  field.parentElement.appendChild(el);
  openPicker = { el, field };
}

// fromField / toField: the two .input-field--date (each inside a position:relative .date-field); onApply runs after Apply
function bindCustomRange({ fromField, toField, applyBtn, onApply }) {
  const draft = { from: PERIODS.custom.start, to: PERIODS.custom.end };
  const show = () => {
    fromField.querySelector('.input-field__text').textContent = fmtDMY(draft.from);
    toField.querySelector('.input-field__text').textContent = fmtDMY(draft.to);
  };
  const open = (which) => {
    const field = which === 'from' ? fromField : toField;
    if (openPicker && openPicker.field === field) { closeDatePicker(); return; }
    openDatePicker({
      field, value: draft[which],
      min: which === 'to' ? draft.from : null,
      max: which === 'from' ? draft.to : TODAY, // no future dates — analytics only has what already happened
      onSave(d) { draft[which] = d; show(); },
    });
  };
  [[fromField, 'from'], [toField, 'to']].forEach(([field, which]) => {
    field.setAttribute('role', 'button');
    field.tabIndex = 0;
    field.addEventListener('click', () => open(which));
    field.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(which); } });
  });
  applyBtn.addEventListener('click', () => { closeDatePicker(); setCustomRange(draft.from, draft.to); onApply(); });
  show();
  return { reset() { draft.from = PERIODS.custom.start; draft.to = PERIODS.custom.end; show(); } };
}

// 1920×1162 프레임을 창 크기에 맞춰 축소 — 다른 화면과 같은 방식.
function fitFrameToViewport() {
  const M = 40, frame = document.querySelector('.frame');
  const scale = Math.min(1, (window.innerWidth - M * 2) / 1920, (window.innerHeight - M * 2) / 1162);
  frame.style.transform = 'scale(' + scale + ')';
  document.body.style.width = Math.round(1920 * scale) + 'px';
  document.body.style.height = Math.round(1162 * scale) + 'px';
}
window.addEventListener('resize', fitFrameToViewport);

// ── Export — Modal (shared/modal.css) shaped like Ads Manager's "Export table data": what's in the file, notices, report
//    name (Input), format (Controls / Toggles radio), Cancel / Export. .csv really downloads; .xlsx / .xls are mocked
//    with a toast until the Meta export API is wired. ──
const ADS_EXPORT_FIELDS = [
  ['Promoted content', (c) => c.content.title], ['Platform', (c) => c.content.platform], ['Content type', (c) => c.content.type],
  ['Meta campaign', (c) => c.name], ['Delivery', (c) => c.delivery], ['Results', (c) => c.results], ['Result type', (c) => c.resultType],
  ['Cost per result (USD)', (c) => (c.costPerResult === null ? '' : c.costPerResult.toFixed(2))], ['Budget (USD)', (c) => (c.budget === null ? '' : c.budget.toFixed(2))],
  ['Budget type', (c) => c.budgetType], ['Amount spent (USD)', (c) => (c.spent === null ? '' : c.spent.toFixed(2))],
  ['Impressions', (c) => c.impressions], ['Reach', (c) => c.reach], ['Starts', (c) => c.starts], ['Ends', (c) => c.ends],
];
const csvCell = (v) => { const t = v === null || v === undefined ? '' : String(v); return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
const toCSV = (header, rows) => [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\n');
const adsCSV = (ads) => toCSV(ADS_EXPORT_FIELDS.map(([h]) => h), ads.map((c) => ADS_EXPORT_FIELDS.map(([, f]) => f(c))));
function downloadText(filename, text, type = 'text/csv') {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function showToast(text) {
  const frame = document.querySelector('.frame');
  frame.querySelector('.export-toast')?.remove();
  const t = Object.assign(document.createElement('div'), { className: 'export-toast', textContent: text });
  t.setAttribute('role', 'status');
  frame.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}
const exportFileName = (name) => name.trim().replace(/[\\/:*?"<>|]+/g, '-') || 'Meta Ads export';

// title, intro, notices[] (info rows), defaultName, build(format) → { filename, text } for .csv
function openExportModal({ title, intro, notices = [], defaultName, build }) {
  const frame = document.querySelector('.frame');
  const formats = [['csv', 'Export as .csv'], ['xlsx', 'Export as .xlsx'], ['xls', 'Export as .xls']];
  let format = 'csv';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay export-overlay';
  overlay.innerHTML = `
    <div class="modal modal--form export-modal" role="dialog" aria-modal="true" aria-labelledby="exportTitle">
      <div class="modal__header-row">
        <div class="modal__content export-modal__head"><h3 class="modal__title" id="exportTitle">${title}</h3><p class="modal__body">${intro}</p></div>
        <button type="button" class="modal__close" data-act="close" aria-label="Close"><img src="${ICON}close-x.svg" alt=""></button>
      </div>
      ${notices.map((n) => `<div class="export-notice"><img src="${ICON}stat-circle-alert-20.svg" alt=""><p>${n}</p></div>`).join('')}
      <div class="export-field">
        <label class="export-field__label" for="exportName">Name your report</label>
        <div class="input-field input-field--md input-field--text export-name">
          <input id="exportName" type="text" value="${defaultName.replace(/"/g, '&quot;')}">
          <button type="button" class="export-name__clear" data-act="clear" aria-label="Clear name"><img src="${ICON}close-x.svg" alt=""></button>
        </div>
      </div>
      <div class="export-field" role="radiogroup" aria-label="Select format">
        <p class="export-field__label">Select format</p>
        ${formats.map(([v, l]) => `<label class="export-radio" data-format="${v}"><span class="ctrl-radio" role="radio" aria-checked="${v === format}"><img src="${ICON}controls/radio-${v === format}.svg" alt=""></span>${l}</label>`).join('')}
      </div>
      <div class="modal__footer export-modal__footer">
        <button type="button" class="actions-btn actions-btn--secondary" data-act="close">Cancel</button>
        <button type="button" class="actions-btn actions-btn--primary" data-act="export">Export</button>
      </div>
    </div>`;
  frame.appendChild(overlay);
  const input = overlay.querySelector('#exportName');
  const close = () => { overlay.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { close(); return; }
    const radio = e.target.closest('.export-radio');
    if (radio) {
      format = radio.dataset.format;
      overlay.querySelectorAll('.export-radio').forEach((r) => { const on = r.dataset.format === format; r.querySelector('.ctrl-radio').setAttribute('aria-checked', on); r.querySelector('img').src = `${ICON}controls/radio-${on}.svg`; });
      return;
    }
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close') close();
    if (act === 'clear') { input.value = ''; input.focus(); }
    if (act === 'export') {
      const name = exportFileName(input.value);
      if (format === 'csv') { const { text } = build(); downloadText(`${name}.csv`, text); showToast(`Exported “${name}.csv”`); }
      else showToast(`“${name}.${format}” — .${format} export is mocked in this prototype; .csv downloads.`);
      close();
    }
  });
  input.focus(); input.select();
}

// Export from the Meta Ads table (Analytics · Published Posts' Meta Ads filter) — the table follows the date range, so the
// report holds the range's figures and its name spans that range (All time = earliest ad start → today). Drafts have no
// delivery data and are left out (with a notice), like Ads Manager.
const fmtDMYlong = (d) => `${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getFullYear()}`;
function openAdsExport(table, periodKey = 'all') {
  const { rows, scope } = table.exportSet();
  const drafts = rows.filter((c) => c.spent === null), data = rows.filter((c) => c.spent !== null);
  const range = periodKey === 'all'
    ? { start: parseISO(META_CAMPAIGNS_MOCK.reduce((m, c) => (c.starts < m ? c.starts : m), META_CAMPAIGNS_MOCK[0].starts)), end: TODAY }
    : periodRange(periodKey);
  openExportModal({
    title: `Export ads table data – ${scope === 'selected' ? `${rows.length} selected` : 'current view'}`,
    intro: `This file will only contain data from your ${scope === 'selected' ? 'selected ads' : 'current view'} and will exclude ads that have not been published.`,
    notices: [
      'The Off / On column isn\'t included in the file — each ad\'s status is in the Delivery column.',
      ...(drafts.length ? [`${drafts.length} ad${drafts.length === 1 ? ' is' : 's are'} still in draft with no delivery data, so ${drafts.length === 1 ? 'it isn\'t' : 'they aren\'t'} in the file.`] : []),
    ],
    defaultName: `Formee Express, Promoted content, ${fmtDMYlong(range.start)}–${fmtDMYlong(range.end)}`,
    build: () => ({ text: adsCSV(data) }),
  });
}

