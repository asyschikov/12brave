/* ================================================================
   12BRAVE – Scripts
   Dependencies: GSAP, ScrollTrigger, Swiper
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  initNavbar();
  initHeroTitleAnimation();
  initCardStackAnimation();
  initSectionFadeAnimations();
  initProgramAccordion();
  initFaqAccordion();
  initSwiper();
  initBookCallPopup();
});

/* ================================================================
   NAVBAR – Scroll background effect
   ================================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ================================================================
   HERO TITLE – Line-by-line slide-up animation
   ================================================================ */
function initHeroTitleAnimation() {
  gsap.fromTo('.line',
    { y: '100%' },
    {
      y: '0%',
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.15,
      delay: 0.3
    }
  );
}

/* ================================================================
   HERO CARD STACK – Rotating card deck animation
   ================================================================ */
function initCardStackAnimation() {
  if (window.innerWidth < 768) return;

  const cards = document.querySelectorAll('.hero-card-wrapper > .hero-card');
  if (cards.length === 0) return;

  let currentIndex = 0;
  const cfg = {
    offsetX: 28,
    offsetY: 7,
    rotation: 3,
    maxCards: 6,
    speed: 0.5,
    interval: 2500
  };

  // Set initial stack positions
  cards.forEach((card, i) => {
    const pos = Math.min(i, cfg.maxCards - 1);
    gsap.set(card, {
      x: pos * cfg.offsetX,
      y: pos * cfg.offsetY,
      rotation: pos * cfg.rotation,
      zIndex: cards.length - i,
      transformOrigin: 'center center'
    });
  });

  // Cycle top card to back
  function cycle() {
    if (window.innerWidth < 768) return;

    const topCard = cards[currentIndex];
    gsap.to(topCard, {
      duration: cfg.speed,
      x: 400, y: -50, rotation: 25, opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        const lastPos = Math.min(cards.length - 1, cfg.maxCards - 1);
        gsap.set(topCard, {
          x: lastPos * cfg.offsetX,
          y: lastPos * cfg.offsetY,
          rotation: lastPos * cfg.rotation,
          opacity: 1, zIndex: 0
        });
        currentIndex = (currentIndex + 1) % cards.length;
      }
    });

    cards.forEach((card, i) => {
      if (i === currentIndex) return;
      const curPos = (i - currentIndex + cards.length) % cards.length;
      const newPos = Math.max(0, curPos - 1);
      const stackPos = Math.min(newPos, cfg.maxCards - 1);
      gsap.to(card, {
        duration: cfg.speed,
        x: stackPos * cfg.offsetX,
        y: stackPos * cfg.offsetY,
        rotation: stackPos * cfg.rotation,
        zIndex: cards.length - newPos,
        ease: 'power2.inOut',
        delay: 0.1
      });
    });
  }

  setInterval(cycle, cfg.interval);

  // Cleanup on resize to mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      cards.forEach(card => gsap.set(card, { clearProps: 'all' }));
    }
  });
}

/* ================================================================
   SECTION FADE – ScrollTrigger fade-up for each section
   ================================================================ */
function initSectionFadeAnimations() {
  if (window.innerWidth < 768) return;

  const selectors = [
    '.hero-section',
    '.benefits-bar',
    '.what-you-section',
    '.participants-section',
    '.testimonials-section',
    '.what-you-get-section',
    '.cta-banner',
    '.slider-section',
    '.speaker-section',
    '.program-section',
    '.faq-section',
    '.community-section'
  ];

  selectors.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;

    gsap.set(el, { y: 80, opacity: 0.5, scale: 0.82 });
    gsap.to(el, {
      y: 0, opacity: 1, scale: 1,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1.2,
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Cleanup on mobile resize
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      ScrollTrigger.getAll().forEach(t => t.kill());
      selectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) gsap.set(el, { y: 0, opacity: 1, scale: 1, clearProps: 'all' });
      });
    }
  });
}

/* ================================================================
   PROGRAM ACCORDION
   ================================================================ */
function initProgramAccordion() {
  document.querySelectorAll('.program-accord-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.program-accord-item').forEach(i => i.classList.remove('active'));
      // Toggle clicked
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* ================================================================
   FAQ ACCORDION
   ================================================================ */
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Toggle clicked
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* ================================================================
   SWIPER – Side businesses slider
   ================================================================ */
function initSwiper() {
  new Swiper('.swiper.is-prime', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 16,
    allowTouchMove: true,
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev'
    },
    breakpoints: {
      480: { slidesPerView: 2 }
    }
  });
}

/* ================================================================
   BOOK A CALL POPUP
   ================================================================ */
function initBookCallPopup() {
  const overlay = document.getElementById('popup-clarity');
  const closeBtn = document.getElementById('popup-close');
  if (!overlay) return;

  const iframe = overlay.querySelector('.calendly-embed iframe');

  function openPopup() {
    // Lazy-load Calendly iframe on first open
    if (iframe && iframe.dataset.src && !iframe.getAttribute('src')) {
      iframe.src = iframe.dataset.src;
    }
    overlay.style.display = 'flex';
    document.body.classList.add('popup-open');
  }

  function closePopup() {
    overlay.style.display = 'none';
    document.body.classList.remove('popup-open');
  }

  // Wire up all buttons with data-popup="clarity"
  document.querySelectorAll('[data-popup="clarity"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Click overlay background to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') closePopup();
  });
}
