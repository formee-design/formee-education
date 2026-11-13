/* Contact form states for the prototype (11/13).
   Nothing is sent. Sending → Sent after a short wait.
   Add ?send=fail to the URL to see the Not sent state. */
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const sent = document.getElementById('contactSent');
  const alertBox = form.querySelector('.form-alert');
  const btn = form.querySelector('.contact-send');
  const label = btn.querySelector('span');
  const f = { name: form.elements.name, email: form.elements.email, message: form.elements.message };
  const fail = new URLSearchParams(location.search).get('send') === 'fail';
  let failedOnce = false;

  const setErr = (el, msg) => {
    const box = el.closest('.field'), err = box.querySelector('.err');
    box.classList.toggle('invalid', !!msg);
    err.hidden = !msg; err.textContent = msg || '';
  };
  const validate = () => {
    let ok = true;
    const email = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr(f.email, email ? 'Enter a valid email address.' : 'Enter your email address.'); ok = false; } else setErr(f.email);
    if (!f.message.value.trim()) { setErr(f.message, 'Enter a message.'); ok = false; } else setErr(f.message);
    return ok;
  };
  Object.values(f).forEach(el => el.addEventListener('input', () => { if (el.closest('.field').classList.contains('invalid')) validate(); }));

  const busy = on => {
    form.classList.toggle('sending', on);
    Object.values(f).forEach(el => el.disabled = on);
    btn.disabled = on;
    label.textContent = on ? 'Sending' : (failedOnce ? 'Try again' : 'Send message');
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    alertBox.hidden = true;
    if (!validate()) { form.querySelector('.invalid input, .invalid textarea')?.focus(); return; }
    busy(true);
    setTimeout(() => {
      if (fail && !failedOnce) { failedOnce = true; busy(false); alertBox.hidden = false; return; }
      busy(false);
      const first = f.name.value.trim().split(/\s+/)[0];
      document.getElementById('sentText').textContent =
        `Thanks${first ? ', ' + first : ''}. We will reply to ${f.email.value.trim()} within 2 business days.`;
      form.hidden = true; sent.hidden = false;
    }, 1400);
  });

  document.getElementById('sendAnother').addEventListener('click', () => {
    form.reset(); failedOnce = false; label.textContent = 'Send message';
    Object.values(f).forEach(el => setErr(el));
    sent.hidden = true; form.hidden = false; f.name.focus();
  });
})();
