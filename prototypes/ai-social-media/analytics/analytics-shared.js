// Analytics — shared placeholder data + helpers for analytics.html and posts.html.
// One dataset (platform × content type) drives every number on both screens, so a total on Analytics
// always matches the posts listed on Post Performance. Only metrics every connected platform's API returns:
// posts, views, likes, comments (engagement = (likes + comments) ÷ views). Paid metrics (spend, leads, CPL)
// come from Meta Ads, so they exist only for Instagram / Facebook posts and only once Meta Ads is connected.

const ICON = '../../../components/ai-social-media/icons/';
const THUMB = '../trends/assets/';

// Platform series use the brand blue ramp, darkest → lightest in display order (stacks build up from the darkest).
const PLATFORMS = [
  { name: 'Instagram', color: 'var(--color-brand-primary-dark)' },
  { name: 'TikTok', color: 'var(--color-brand-primary)' },
  { name: 'Facebook', color: 'var(--color-brand-link)' },
  { name: 'REDnote', color: 'var(--color-brand-primary-mid)' },
  { name: 'LinkedIn', color: 'var(--color-brand-primary-pale)' },
];
const META_ADS_PLATFORMS = ['Instagram', 'Facebook'];
// Content types per platform (2026-10-12):
//   Instagram / TikTok / REDnote: Video · Image · Carousel
//   Facebook / LinkedIn:          Video · Image · Multi-Image Post
const TYPES = [
  { name: 'Video', color: 'var(--color-brand-primary)' },
  { name: 'Image', color: 'var(--color-brand-primary-mid)' },
  { name: 'Carousel', color: 'var(--color-brand-primary-pale)' },
  { name: 'Multi-Image Post', color: 'var(--color-brand-primary-light)' },
];
// Published posts in the last 30 days, per platform × type
const BASE_POSTS = {
  Instagram: { Video: 9, Image: 4, Carousel: 5 },
  TikTok: { Video: 18, Image: 2, Carousel: 4 },
  Facebook: { Video: 5, Image: 2, 'Multi-Image Post': 1 },
  REDnote: { Video: 1, Image: 2, Carousel: 1 },
  LinkedIn: { Video: 3, Image: 5, 'Multi-Image Post': 4 },
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
  'Multi-Image Post': { views: 0.75, eng: 1.15 },
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
// ending on `ends[i]`; `chartUnit` is the x-axis step of the Post Performance line chart.
const PERIODS = {
  '30d': { factor: 1, unit: 'week', chartUnit: 'day', ends: Array.from({ length: 5 }, (_, i) => addDays(TODAY, -7 * (4 - i))) },
  '90d': { factor: 2.7, unit: 'week', chartUnit: 'week', ends: Array.from({ length: 13 }, (_, i) => addDays(TODAY, -7 * (12 - i))) },
  all: { factor: 6.4, unit: 'month', chartUnit: 'month', ends: Array.from({ length: 12 }, (_, i) => (i === 11 ? TODAY : new Date(2025, 11 + i, 0))) },
  custom: {}, // filled by setCustomRange()
};
for (const p of Object.values(PERIODS)) if (p.ends) p.buckets = p.ends.map(p.unit === 'month' ? fmtMonth : fmtDay);

// Custom range (Date Picker · Time=Without time) → buckets: ≤ 14 days by day, ≤ 120 days by week (ending on the
// last day), longer by month. Post volume scales with the length of the range.
function setCustomRange(start, end) {
  const days = diffDays(start, end) + 1;
  const p = PERIODS.custom;
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
// query params that carry a period between Analytics and Post Performance (custom adds its dates)
const periodParams = (key) => (key === 'custom' ? { period: key, from: fmtISO(PERIODS.custom.start), to: fmtISO(PERIODS.custom.end) } : { period: key });
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
const platformSeries = (cells, periodKey) => PLATFORMS.map((p, i) => ({
  ...p, series: splitAcross(sumCells(cells.filter((c) => c.platform === p.name)).posts, PERIODS[periodKey].ends.length, i + 1),
}));

const rand = (seed) => { const x = Math.sin(seed * 12.9898 + 4.1414) * 43758.5453; return x - Math.floor(x); };

function formatCount(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(/\.0$/, '')}K`;
  return String(Math.round(n));
}
const formatPct = (r) => `${(r * 100).toFixed(1)}%`;
const formatMoney = (n) => `$${n >= 1000 ? formatCount(n) : n.toFixed(2)}`;

// ── Individual posts — every cell split into posts (shares normalised so each cell still sums to its totals),
//    dated inside the same buckets as the Published Posts Over Time stacks ──
const POST_TITLES = [
  'A Day on Campus in the UK', 'Study in the UK — Applications Open', 'UK Applications — January Intake',
  'Free 1:1 Counselling, Book Anytime', 'Main Character Edits — Campus Tour', 'Scholarship Deadlines This Month',
  'Campus Café Guide — Week 1', 'IELTS Tips in 60 Seconds', 'What I Packed for London', 'Student Visa Checklist',
  'Meet Our Counsellors', 'Top 5 UK Unis for Business', 'Dorm Room Tour — Manchester', 'A Month in London: Real Costs',
  'Alumni Story: Seoul to Edinburgh', 'Open Day Highlights', 'Part-time Jobs for Students', 'Foundation vs Year 1 Entry',
  'Accommodation Q&A', 'Weekend Trips from London',
  'How to Write a Personal Statement', 'First Week in Halls', 'Budgeting on a Student Loan', 'Graduate Visa Explained',
  'Study Spots Around King\'s Cross', 'Choosing Your Course', 'Ask a Current Student', 'Visa Interview Tips',
  'A Rainy Day in Edinburgh', 'Freshers\' Fair Highlights', 'Exam Season Survival Guide', 'Working While You Study',
  'Life in Glasgow', 'Commuting in London', 'Society Night Out', 'Library Tour — Oxford',
  'Packing List: Winter Edition', 'Masters vs PhD', 'Our Counselling Team', 'Offer Day Reactions',
];
const POST_THUMBS = ['viral-4.png', 'viral-2.png', 'viral-3.png', 'viral-6.png', 'viral-5.png', 'viral-1.png', 'post-5.png'];

function buildPosts(periodKey, { adsConnected = false } = {}) {
  const cells = buildCells(periodKey);
  const n = PERIODS[periodKey].ends.length;
  const posts = [];
  PLATFORMS.forEach((p, pi) => {
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
  // titles go out by views, so the posts people actually see in Top lists get the distinct ones
  posts.sort((a, b) => b.views - a.views).forEach((post, i) => {
    post.title = POST_TITLES[i % POST_TITLES.length]; // placeholder — real titles come from the generated content
    post.img = POST_THUMBS[i % POST_THUMBS.length];
  });
  posts.sort((a, b) => b.date - a.date || b.views - a.views);
  posts.forEach((post, i) => {
    post.id = i;
    post.engagement = engagementOf(post);
    // any ad spend in the date range → Paid. Meta Ads covers Instagram / Facebook only.
    post.paid = adsConnected && META_ADS_PLATFORMS.includes(post.platform) && rand(i * 3.3 + 0.7) < 0.35;
    if (post.paid) {
      post.spend = 40 + 360 * rand(i * 5.1 + 0.2);
      post.leads = Math.max(1, Math.round(post.spend / (6 + 22 * rand(i * 7.7 + 0.9))));
      post.cpl = post.spend / post.leads;
    }
  });
  return posts;
}

// ── Filter / Select — Controls/Filter/Select (Inactive/Active) + its open option list (Menu/Item, context-menu--option-list) ──
// inactiveLabel: text for the Inactive pill when the default is selected (e.g. "Rank by: Views").
// initialValue: preselects a non-default option (e.g. from a deep link).
function buildFilter({ container, label, options, onSelect, closeToDefault = true, defaultValue = 'All', inactiveLabel = label, initialValue = null }) {
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
    if (value === null) {
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
