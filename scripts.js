/* ================================================================
   12BRAVE – Scripts
   Dependencies: GSAP, ScrollTrigger, Swiper
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  initNavbar();
  initHeroTitleAnimation();
  initHeroTestimonialRotation();
  initSectionFadeAnimations();
  initProgramAccordion();
  initFaqAccordion();
  initSwiper();
  initBookCallPopup();
  initAlumniPopup();
  initSpeakerPopup();
});

/* ================================================================
   SPEAKER POPUP
   ================================================================ */
function initSpeakerPopup() {
  const overlay = document.getElementById('popup-speaker');
  const closeBtn = document.getElementById('speaker-close');
  if (!overlay) return;

  const speakerData = {
    'Victoria Sheer': {
      image: 'assets/team/victoria.jpg',
      location: 'Amsterdam',
      tagline: '12+ years in Product Leadership (SAP, Henkel, Aldi Sud).',
      tags: ['Program Founder', 'Marketing'],
      bio: [
        '12+ years in Product Leadership (SAP, Henkel, Aldi Sud).',
        'Portfolio Career since 2019 (100+ paid mentorings, 30+ trainings, consulting practice, community builder).',
        'Expert in product strategy and organizational design.',
        'Helped 50+ startups define their product-market fit.'
      ],
      linkedin: 'https://www.linkedin.com/in/victoriasheer/'
    },
    'Ekaterina Servetnik': {
      image: 'assets/team/ekaterina.jpg',
      location: 'Dusseldorf',
      tagline: '17+ years in consulting, CX, digital & strategy.',
      tags: ['Program Founder', 'IT'],
      bio: [
        '17+ years in consulting, CX, digital & strategy.',
        'Go-to-market advisor for startups & scale-ups (SaaS, AI driven)',
        'Expert in customer experience and digital transformation.',
        'Advisor for multiple successful European startups.'
      ],
      linkedin: 'https://www.linkedin.com/in/ekaterina-servetnik/'
    },
    'Florian Klein': {
      image: 'assets/team/florian.jpg',
      location: 'Allgäu',
      tagline: 'Senior strategist guiding leaders through uncertainty with AI foresight.',
      tags: ['Expert', 'Strategy', 'AI'],
      bio: [
        'Managing Partner and Co-Founder of <a href="https://ananki.ai" target="_blank">ananki.ai</a>, world\'s first automated neural-AI foresight engine',
        'Strategist and advisor, former global head of Strategic Foresight of a Big4 firm',
        'Founder of the Deloitte Center for the Long View, <a href="https://gnosis.ai" target="_blank">Gnosis.ai</a>, and the Deloitte Futures Institute',
        'Author, lead facilitator, keynote speaker',
        'PhD Env. Economics, MBA, MA in in Development Studies'
      ],
      linkedin: 'https://www.linkedin.com/in/florianklein'
    },
    'Artem Koren': {
      image: 'assets/team/artem.jpg',
      location: 'New York City',
      tagline: 'Co-founder and Chief Product Officer at Sembly AI (2M ARR)',
      tags: ['StartUp', 'AIFounder', 'Future of Work'],
      bio: [
        'Co-founder and Chief Product Officer at Sembly AI (2M ARR)',
        'BS in Computer Science (Columbia University) and MBA (NYU Stern)',
        'Expert in AI product development and scaling SaaS businesses.',
        'Passionate about the intersection of technology and human productivity.'
      ],
      linkedin: 'https://www.linkedin.com/in/akoren/'
    },
    'Nils Stotz': {
      image: 'assets/team/nils.jpg',
      location: 'Berlin',
      tagline: 'Head of Product - Experimentation at Zalando.',
      tags: ['Expert', 'Personal Brand'],
      bio: [
        'Head of Product - Experimentation at Zalando.',
        'Published 3 Books. Created 3 Online-Courses with 1,500+ Students',
        'Expert in product-led growth and data-driven decision making.',
        'Speaker at major product management conferences.'
      ],
      linkedin: 'https://www.linkedin.com/in/nilsstotz/'
    },
    'Maria Ledentsova': {
      image: 'assets/team/maria.jpg',
      location: 'Berlin',
      tagline: 'Founding marketer at a design agency - drove 2x+ revenue growth.',
      tags: ['Expert', 'Marketing'],
      bio: [
        'Founding marketer at a design agency - drove 2x+ revenue growth.',
        'Grew LinkedIn personal brand to 18k+ followers.',
        'Expert in content strategy and organic growth.',
        'Helps founders build their authority on social media.'
      ],
      linkedin: 'https://www.linkedin.com/in/marialeden'
    },
    'Clyde Araujo': {
      image: 'assets/team/clyde.jpg',
      location: 'Koblenz',
      tagline: '15+ years global business leadership experience at Henkel, Metro, Huawei',
      tags: ['B2B', 'Executive'],
      bio: [
        '15+ years global business leadership experience at Henkel, Metro, Huawei',
        'Startup Advisor on Martech, Data Monetisation and IoT',
        'Expert in international business expansion and strategic partnerships.',
        'Mentor for early-stage B2B technology companies.'
      ],
      linkedin: 'https://www.linkedin.com/in/araujoclyde/'
    },
    'Joao Moita': {
      image: 'assets/team/joao.jpg',
      location: 'Lisbon',
      tagline: 'Community Builder and Entrepreneur',
      tags: ['Expert', 'Community Builder'],
      bio: [
        'Community Builder and Entrepreneur',
        'Founder of Product Weekend community live in 15+ countries',
        'Expert in community-led growth and event management.',
        'Passionate about connecting product people globally.'
      ],
      linkedin: 'https://www.linkedin.com/in/joaomoita/'
    },
    'Catia Nunes': {
      image: 'assets/team/catia.jpg',
      location: 'Lisbon',
      tagline: 'Growth and Performance Marketing Leader with over 10 years of experience',
      tags: ['Marketing', 'CMO'],
      bio: [
        'Growth and Performance Marketing Leader with over 10 years of experience',
        'Expert in performance marketing and acquisition strategy.',
        'Helped multiple startups scale their user base efficiently.',
        'Focused on data-driven growth experiments.'
      ],
      linkedin: 'https://www.linkedin.com/in/catiacnunes/'
    },
    'Ayushman de Lang-Talwar': {
      image: 'assets/team/ayushman.jpg',
      location: 'Amsterdam',
      tagline: 'Cofounded Hable - accessibility startup (exited)',
      tags: ['FinTech', 'Founder'],
      bio: [
        'Cofounded Hable - accessibility startup (exited)',
        'Led multiple products to +€xxM revenue',
        'Expert in product strategy and fundraising for social impact.',
        'Experienced in taking hardware and software products to market.'
      ],
      linkedin: 'https://www.linkedin.com/in/ayushmantalwar/'
    },
    'Ruzgar Zere': {
      image: 'assets/team/ruzgar.jpg',
      location: 'Tallinn',
      tagline: 'Built and scaled a B2B SaaS to 350+ paying customers',
      tags: ['Founder', 'MarTech'],
      bio: [
        'Built and scaled a B2B SaaS to 350+ paying customers',
        'Shipped and operated the product end-to-end as a solo founder',
        'Expert in lean startup methodology and bootstrapping.',
        'Hands-on experience in full-stack product development.'
      ],
      linkedin: 'https://www.linkedin.com/in/rzere/'
    },
    'Andrey Dyatlov': {
      image: 'assets/team/andrey.jpg',
      location: 'Paris',
      tagline: 'CEO and Founder of Rapid Delivery Analytics',
      tags: ['StartUp', 'ScalingUp', 'FMCG'],
      bio: [
        'CEO and Founder of Rapid Delivery Analytics',
        'His clients include PepsiCo, Unilever, Volkswagen and Ferrero.',
        'Expert in delivery analytics and supply chain optimization.',
        'Strategic consultant for global consumer goods companies.'
      ],
      linkedin: 'https://www.linkedin.com/in/thelacker/'
    },
    'Elena Zhigalina': {
      image: 'assets/team/elena.jpg',
      location: 'Madrid',
      tagline: '15+ years in B2C & B2B marketing',
      tags: ['Marketing', 'Investor', 'Advisor'],
      bio: [
        '15+ years in B2C & B2B marketing',
        'MBA in Marketing & Innovation. Angel investor and Advisor',
        'Expert in brand positioning and innovation strategy.',
        'Experienced advisor for early-stage consumer startups.'
      ],
      linkedin: 'https://www.linkedin.com/in/elena-zhigalina/'
    },
    'Leon Wisskirchen': {
      image: 'assets/team/leon.jpg',
      location: 'Berlin',
      tagline: 'Serial entrepreneur and Velsa Co-Founder & CEO',
      tags: ['Entrepreneur', 'Legal Tech', 'CEO'],
      bio: [
        'Serial entrepreneur and Velsa Co-Founder & CEO',
        'Thought Leader in Legal Tech',
        'Expert in legal technology innovation and scaling startups.',
        'Advocate for digital transformation in the legal industry.'
      ],
      linkedin: 'https://www.linkedin.com/in/leon-wisskirchen'
    }
  };

  function openPopup(name) {
    const data = speakerData[name];
    if (!data) return;

    document.getElementById('speaker-popup-img').src = data.image;
    document.getElementById('speaker-popup-name').textContent = name;
    document.getElementById('speaker-popup-loc').textContent = data.location;
    document.getElementById('speaker-popup-tagline').textContent = data.tagline;
    document.getElementById('speaker-popup-linkedin').href = data.linkedin;

    // Tags
    const tagsContainer = document.getElementById('speaker-popup-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'speaker-popup-tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    // Bio
    const bioContainer = document.getElementById('speaker-popup-bio');
    bioContainer.innerHTML = '';
    data.bio.forEach(point => {
      const li = document.createElement('li');
      li.innerHTML = point;
      bioContainer.appendChild(li);
    });

    overlay.style.display = 'flex';
    document.body.classList.add('popup-open');

    // GSAP Animation
    gsap.fromTo('.speaker-popup-card',
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }

  function closePopup() {
    gsap.to('.speaker-popup-card', {
      opacity: 0, scale: 0.8, y: 50, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        overlay.style.display = 'none';
        document.body.classList.remove('popup-open');
      }
    });
  }

  // Wire up buttons
  document.querySelectorAll('.speaker-readmore').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const speakerName = btn.getAttribute('data-speaker');
      openPopup(speakerName);
    });
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') closePopup();
  });
}

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
   HERO TESTIMONIAL ROTATION – Rotating testimonial cards
   ================================================================ */
function initHeroTestimonialRotation() {
  const cards = document.querySelectorAll('.hero-testimonial-card');
  if (cards.length === 0) return;

  let currentIndex = 0;

  function cycle() {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % cards.length;
    cards[currentIndex].classList.add('active');
  }

  setInterval(cycle, 3500);
}

/* ================================================================
   SECTION FADE – ScrollTrigger fade-up for each section
   ================================================================ */
function initSectionFadeAnimations() {
  if (window.innerWidth < 768) return;

  const selectors = [
    '.hero-section',
    '.what-you-section',
    '.why-built-section',
    '.participants-section',
    '.testimonials-section',
    '.slider-section',
    '.speaker-section',
    '.program-section',
    '.packages-section',
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
      768: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 16
      }
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

/* ================================================================
   ALUMNI REVIEWS POPUP
   ================================================================ */
function initAlumniPopup() {
  const overlay = document.getElementById('popup-alumni');
  const closeBtn = document.getElementById('alumni-close');
  const triggerBtn = document.getElementById('view-all-alumni');

  if (!overlay || !triggerBtn) return;

  // Initialize Swiper for Alumni Reviews
  const alumniSwiper = new Swiper('.alumni-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.alumni-next',
      prevEl: '.alumni-prev',
    },
    // Optional: add keyboard navigation
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  function openPopup() {
    overlay.style.display = 'flex';
    document.body.classList.add('popup-open');
    // Update swiper on open to ensure it calculates dimensions correctly
    if (alumniSwiper) {
      alumniSwiper.update();
    }
  }

  function closePopup() {
    overlay.style.display = 'none';
    document.body.classList.remove('popup-open');
  }

  // Trigger button click
  triggerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup();
  });

  // Close button click
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Click overlay background to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      closePopup();
    }
  });
}
