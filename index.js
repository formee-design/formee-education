// Prototype index — left nav behaviour, shared by every product index page (index.css has the look).
// Left nav — a click picks a section: it scrolls there, the nav item lights up and the section lifts with a shadow.
// Clicking the picked item again (or scrolling on to another section) drops the pick. Archiving opens when picked.
(() => {
  const items = [...document.querySelectorAll('.side-nav__item')];
  const byId = Object.fromEntries(items.map((a) => [a.getAttribute('href').slice(1), a]));
  const groups = Object.keys(byId).map((id) => document.getElementById(id)).filter(Boolean);
  let picked = null;
  let lockUntil = 0; // ignore scroll while the smooth scroll to a picked section runs
  const pick = (target) => {
    picked = target;
    items.forEach((a) => a.classList.toggle('is-active', !!target && a === byId[target.id]));
    groups.forEach((g) => g.classList.toggle('is-target', g === target));
  };
  items.forEach((a) => a.addEventListener('click', (e) => {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    if (target === picked) { // second click → unpick, stay where you are
      e.preventDefault();
      pick(null);
      history.replaceState(null, '', location.pathname + location.search);
      return;
    }
    if (target.tagName === 'DETAILS') target.open = true;
    pick(target);
    lockUntil = Date.now() + 1200;
  }));
  // scrolled on to another section → the pick drops (the last sections can't reach the top, so at the page bottom it
  // only drops once the picked section is off screen)
  window.addEventListener('scroll', () => {
    if (!picked || Date.now() < lockUntil) return;
    const r = picked.getBoundingClientRect();
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let current = groups[0];
    for (const g of groups) if (g.getBoundingClientRect().top <= 140) current = g;
    const stillHere = atBottom ? r.top < window.innerHeight && r.bottom > 0 : current === picked;
    if (!stillHere) pick(null);
  }, { passive: true });
})();
