/* ==================================================
   メディカルダイエットLP - JavaScript
   うらおか内科・内視鏡クリニック
================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------
     1. スクロールフェードイン（Intersection Observer）
  -------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // 一度発火したら解除
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // IntersectionObserver 非対応ブラウザはすべて表示
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* --------------------------------------------------
     2. FAQアコーディオン
  -------------------------------------------------- */
  const faqBtns = document.querySelectorAll('.faq-item__btn');

  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const body = btn.nextElementSibling;

      // すべて閉じる（1つだけ開くスタイル）
      faqBtns.forEach(function (otherBtn) {
        const otherBody = otherBtn.nextElementSibling;
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBody.classList.remove('is-open');
        otherBody.style.maxHeight = null;
      });

      // クリックしたものが閉じていた場合は開く
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        body.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* --------------------------------------------------
     3. スムーススクロール（アンカーリンク）
  -------------------------------------------------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 16;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  /* --------------------------------------------------
     4. 固定フッターCTAのスクロール制御
        （ページ上部では非表示、少しスクロールしたら表示）
  -------------------------------------------------- */
  const fixedCta = document.getElementById('fixedCta');

  if (fixedCta) {
    // 初期は非表示（CSS display:noneの上にJSで制御）
    function handleScroll() {
      if (window.scrollY > 300) {
        fixedCta.style.display = 'block';
      } else {
        fixedCta.style.display = 'none';
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期実行
  }

  /* --------------------------------------------------
     5. フェードインの遅延（子要素ごとにずらす）
  -------------------------------------------------- */
  const delayEls = document.querySelectorAll('[data-delay]');
  delayEls.forEach(function (el) {
    const delay = el.getAttribute('data-delay') || '0';
    el.style.transitionDelay = delay + 'ms';
  });

});
