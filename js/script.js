/* =========================================
   Scroll Animation (Intersection Observer)
   ========================================= */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* =========================================
   Header: Scrolled Class
   ========================================= */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* =========================================
   FAQ Accordion
   ========================================= */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');

    // 他を閉じる
    document.querySelectorAll('.faq__item.open').forEach(el => {
      if (el !== item) {
        el.classList.remove('open');
        el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

/* =========================================
   Fixed CTA: ヒーロー内は非表示
   ========================================= */
const fixedCta = document.getElementById('fixedCta');
const hero = document.getElementById('hero');

if (fixedCta && hero) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      fixedCta.style.display = entry.isIntersecting ? 'none' : 'flex';
    });
  }, { threshold: 0.1 });
  heroObserver.observe(hero);
}

/* =========================================
   Smooth Scroll for Anchor Links
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('header')?.offsetHeight || 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});
