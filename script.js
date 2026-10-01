// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
     links.classList.remove('open');
 toggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ: only one open at a time
const faqs = document.querySelectorAll('.faq-list details');
faqs.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) faqs.forEach(other => { if (other !== item) other.open = false; });
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Phone auto-format (240) 707-5433
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', () => {
  const d = phoneInput.value.replace(/\D/g, '').slice(0, 10);
  let out = d;
  if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
  else if (d.length > 0) out = `(${d}`;
  phoneInput.value = out;
});

// Estimate form -> Netlify Forms
const form = document.getElementById('estimate-form');
const statusEl = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = `form-status ${type}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

  const name = form.name.value.trim();
  const phoneDigits = form.phone.value.replace(/\D/g, '');
  const email = form.email.value.trim();
  const errors = [];

  if (!name) {
    errors.push('your name');
    form.name.classList.add('invalid');
  }
  if (phoneDigits.length < 10) {
    errors.push('a 10 digit phone number');
    form.phone.classList.add('invalid');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('a valid email');
    form.email.classList.add('invalid');
  }

  if (errors.length) {
    showStatus(`Please add ${errors.join(' and ')}.`, 'err');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  showStatus('', '');

  try {
    const body = new URLSearchParams(new FormData(form)).toString();
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    if (!res.ok) throw new Error("Couldn't send right now.");

    showStatus("Got it! We'll reach out soon about your free estimate.", 'ok');
    form.reset();
  } catch (err) {
    showStatus(`${err.message} You can also call (240) 707-5433.`, 'err');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Get My Free Estimate';
  }
});
