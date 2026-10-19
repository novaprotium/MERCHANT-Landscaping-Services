// Simple static carousel — no autoplay, no fancy fades, just slide + infinite wrap
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length; // wraps to 0 after the last slide
    update();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length; // wraps to last slide from 0
    update();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      update();
    });
  });
});
