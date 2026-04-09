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
   Bar Chart Animation (Efficacy Section)
   ========================================= */
const efficacyBars = document.querySelectorAll('.efficacy__bar');
if (efficacyBars.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.efficacy__bar');
        bars.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 150);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const chartWrap = document.querySelector('.efficacy__chart-wrap');
  if (chartWrap) barObserver.observe(chartWrap);
}

/* =========================================
   Page Top Button
   ========================================= */
const pageTop = document.getElementById('pageTop');
if (pageTop) {
  window.addEventListener('scroll', () => {
    pageTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  pageTop.addEventListener('click', () => {
    const start = window.scrollY;
    const duration = 900; // ms（大きいほどゆっくり）
    let startTime = null;

    // ease-in-out cubic
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - ease(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
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
