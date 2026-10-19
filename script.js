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



