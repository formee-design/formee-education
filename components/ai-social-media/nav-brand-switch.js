/* Nav / Navigation — brand-switch variant (design test) behaviour.
   Pair with nav-brand-switch.css. Expects the page's nav markup:
   #sideNav (.nav.nav--brand-switch[data-variant]) with #navCollapseBtn, #navBrandSelect,
   #navBrandTrigger, #navBrandList (+ #navBrandSearch / #navBrandListItems / #navBrandListEmpty)
   and #navBrandMenu (+ #navBrandMenuItems) — see voice-library.html / home.html.
   Also injects the right-hand "Nav design" switcher panel (prototype aid) and remembers the
   1안/2안 + expanded/collapsed choice across pages in localStorage.
   Consumed by: prototypes/ai-social-media/voice-library/voice-library.html,
                prototypes/ai-social-media/home/home.html */
const NAV_ICON = new URL('icons/', document.currentScript.src).href;
const NAV_TEST_PANEL_HTML = `<div class="nav-test-panel" aria-label="Nav design switcher">
  <p class="nav-test-panel__title">Nav design</p>
  <div class="nav-test-panel__group">
    <p class="nav-test-panel__label">Option</p>
    <div class="nav-test-panel__seg">
      <button type="button" class="nav-test-panel__opt" data-nav-variant="logo" onclick="setNavVariant('logo')">1안<small>With brand logo</small></button>
      <button type="button" class="nav-test-panel__opt" data-nav-variant="text" onclick="setNavVariant('text')">2안<small>No brand logo</small></button>
    </div>
  </div>
  <div class="nav-test-panel__group">
    <p class="nav-test-panel__label">State</p>
    <div class="nav-test-panel__seg nav-test-panel__seg--row">
      <button type="button" class="nav-test-panel__opt" data-nav-state="expanded" onclick="setNavCollapsed(false)">Expanded</button>
      <button type="button" class="nav-test-panel__opt" data-nav-state="collapsed" onclick="setNavCollapsed(true)">Collapsed</button>
    </div>
  </div>
</div>`;

/* ---------------- nav design test: brand switch + 1안/2안 ---------------- */
// Brands from Figma "brand list" (14591:678713). logo = icons/brand/*.svg (Brand / Logo Tile);
// no logo = Brand / Mark initials in the given avatar tone.
const NAV_BRANDS = [
  {id:'formee-express', name:'Formee Express', logo:'brand/formee-education.svg'},
  {id:'scei', name:'SCEI', logo:'brand/scei.svg'},
  {id:'sche', name:'SCHE', logo:'brand/sche.svg'},
  {id:'meridian', name:'Meridian Business', initials:'MB', tone:'rose'},
  {id:'coastline', name:'Coastline TAFE', initials:'CT', tone:'amber'},
  {id:'northbridge', name:'Northbridge College', initials:'NC', tone:'teal'},
];
let navBrandId = 'formee-express';

function brandAvatarHTML(b, size){
  return b.logo
    ? `<span class="brand-logo-tile brand-logo-tile--${size}"><img src="${NAV_ICON}${b.logo}" alt=""></span>`
    : `<span class="brand-mark brand-mark--${size} brand-mark--${b.tone}">${b.initials}</span>`;
}
function renderNavBrands(){
  const b = NAV_BRANDS.find(x => x.id === navBrandId);
  document.querySelectorAll('#sideNav [data-brand-logo]').forEach(el => {
    const tmp = document.createElement('span');
    tmp.innerHTML = brandAvatarHTML(b, 24);
    const fresh = tmp.firstElementChild;
    fresh.classList.add('nav-brand-logo');
    fresh.setAttribute('data-brand-logo', '');
    el.replaceWith(fresh);
  });
  document.querySelector('#sideNav [data-brand-name]').textContent = b.name;
  document.getElementById('navBrandListItems').innerHTML = NAV_BRANDS.map(x => `
    <button type="button" class="brand-list-item${x.id === navBrandId ? ' is-selected' : ''}" role="option" aria-selected="${x.id === navBrandId}" data-name="${x.name.toLowerCase()}" onclick="selectNavBrand('${x.id}')">
      <span class="brand-list-item__label">${brandAvatarHTML(x, 24)}<span class="brand-list-item__name">${x.name}</span></span>
    </button>`).join('');
  document.getElementById('navBrandMenuItems').innerHTML = NAV_BRANDS.map(x => `
    <button type="button" class="brand-switch-item${x.id === navBrandId ? ' is-selected' : ''}" role="menuitemradio" aria-checked="${x.id === navBrandId}" onclick="selectNavBrand('${x.id}')">
      ${brandAvatarHTML(x, 24)}<span class="brand-switch-item__name">${x.name}</span>
      <img class="brand-switch-item__check" src="${NAV_ICON}check-blue.svg" alt="">
    </button>`).join('');
}
function selectNavBrand(id){
  navBrandId = id;
  renderNavBrands();
  closeNavBrandPopovers();
}
function closeNavBrandPopovers(){
  document.getElementById('navBrandList').hidden = true;
  document.getElementById('navBrandMenu').hidden = true;
  document.getElementById('navBrandSelect').setAttribute('aria-expanded', 'false');
  document.getElementById('navBrandTrigger').setAttribute('aria-expanded', 'false');
}
function toggleBrandList(e){
  e.stopPropagation();
  const list = document.getElementById('navBrandList');
  const open = list.hidden;
  closeNavBrandPopovers();
  if (!open) return;
  list.hidden = false;
  document.getElementById('navBrandSelect').setAttribute('aria-expanded', 'true');
  const search = document.getElementById('navBrandSearch');
  search.value = ''; filterBrandList('');
  search.focus();
}
function filterBrandList(q){
  q = q.trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll('#navBrandListItems .brand-list-item').forEach(el => {
    const hit = !q || el.dataset.name.includes(q);
    el.hidden = !hit; if (hit) shown++;
  });
  document.getElementById('navBrandListEmpty').hidden = shown > 0;
}
function toggleBrandMenu(e){
  e.stopPropagation();
  const menu = document.getElementById('navBrandMenu');
  const trigger = document.getElementById('navBrandTrigger');
  const open = menu.hidden;
  closeNavBrandPopovers();
  if (!open) return;
  menu.style.top = trigger.offsetTop + 'px';  // align the flyout with the trigger
  menu.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#navBrandList, #navBrandMenu')) closeNavBrandPopovers();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNavBrandPopovers(); });

function syncNavTestPanel(){
  const nav = document.getElementById('sideNav');
  const collapsed = nav.classList.contains('collapsed');
  document.querySelectorAll('[data-nav-variant]').forEach(b => b.classList.toggle('is-active', b.dataset.navVariant === nav.dataset.variant));
  document.querySelectorAll('[data-nav-state]').forEach(b => b.classList.toggle('is-active', (b.dataset.navState === 'collapsed') === collapsed));
  document.getElementById('navCollapseBtn').setAttribute('aria-label', collapsed ? 'Expand navigation' : 'Collapse navigation');
  try { localStorage.setItem('navBrandSwitchTest', JSON.stringify({variant: nav.dataset.variant, collapsed})); } catch (_) {}
}
function setNavVariant(v){
  document.getElementById('sideNav').dataset.variant = v;
  closeNavBrandPopovers();
  syncNavTestPanel();
}
function setNavCollapsed(collapsed){
  document.getElementById('sideNav').classList.toggle('collapsed', collapsed);
  closeNavBrandPopovers();
  syncNavTestPanel();
}
function toggleNavCollapsed(){
  setNavCollapsed(!document.getElementById('sideNav').classList.contains('collapsed'));
}
(function initNavTest(){
  document.body.insertAdjacentHTML('beforeend', NAV_TEST_PANEL_HTML);
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('navBrandSwitchTest')); } catch (_) {}
  if (saved && (saved.variant === 'logo' || saved.variant === 'text')) document.getElementById('sideNav').dataset.variant = saved.variant;
  if (saved && saved.collapsed) document.getElementById('sideNav').classList.add('collapsed');
  renderNavBrands();
  syncNavTestPanel();
})();
