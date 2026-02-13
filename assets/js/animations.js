// ================================================================
// Anime.js v4  Redesigned Portfolio Animations
// Uses the UMD global `anime` from the CDN
// ================================================================

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.anim-init, .card, .page-btn, .pagination button').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const { animate, stagger, createTimeline, utils } = anime;

  // ---- Helpers ----
  function onVisible(selector, callback, opts = {}) {
    const els = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : [selector];
    if (!els.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          if (!opts.repeat) obs.unobserve(entry.target);
        }
      });
    }, { threshold: opts.threshold || 0.15, rootMargin: opts.rootMargin || '0px' });
    els.forEach(el => observer.observe(el));
  }

  // ---- Cursor Glow ----
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      cursorGlow.style.left = cx + 'px';
      cursorGlow.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  // ---- Floating background glows ----
  document.querySelectorAll('.bg-glow').forEach((glow, i) => {
    animate(glow, {
      translateX: [{ to: (i % 2 === 0 ? 40 : -40) + 'px' }, { to: '0px' }],
      translateY: [{ to: (i % 2 === 0 ? -30 : 30) + 'px' }, { to: '0px' }],
      opacity: [{ to: 0.06 + Math.random() * 0.15 }, { to: 0.18 }],
      duration: 6000 + i * 2000,
      loop: true,
      alternate: true,
      ease: 'inOutSine'
    });
  });

  // ---- Floating hero shapes ----
  document.querySelectorAll('.shape').forEach((shape, i) => {
    animate(shape, {
      translateY: [
        { to: (-15 - i * 5) + 'px' },
        { to: (15 + i * 5) + 'px' }
      ],
      translateX: [
        { to: (-8 + i * 3) + 'px' },
        { to: (8 - i * 3) + 'px' }
      ],
      rotate: { to: (i % 2 === 0 ? 180 : -180) + 'deg' },
      duration: 4000 + i * 1200,
      loop: true,
      alternate: true,
      ease: 'inOutSine'
    });
  });

  // ---- Header hide/show on scroll ----
  const header = document.getElementById('siteHeader');
  if (header) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100 && y > lastY) header.classList.add('hidden');
      else header.classList.remove('hidden');
      lastY = y;
    }, { passive: true });
  }

  // ---- Nav active indicator ----
  const navLinks = document.querySelectorAll('[data-nav]');
  const navIndicator = document.getElementById('navIndicator');
  function setNavIndicator(link) {
    if (!navIndicator || !link) return;
    const rect = link.getBoundingClientRect();
    const navRect = link.closest('.nav').getBoundingClientRect();
    navIndicator.style.opacity = '1';
    navIndicator.style.left = (rect.left - navRect.left) + 'px';
    navIndicator.style.width = rect.width + 'px';
  }
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => setNavIndicator(link));
  });
  document.querySelector('.nav-links')?.addEventListener('mouseleave', () => {
    if (navIndicator) navIndicator.style.opacity = '0';
  });

  // ---- Hero entrance timeline ----
  const heroTL = createTimeline({
    defaults: { ease: 'outExpo', duration: 900 }
  });
  heroTL
    .add('.hero-tag.anim-init', { opacity: [0, 1], translateY: ['30px', '0px'], duration: 700 }, 200)
    .add('.hero-line.anim-init', {
      opacity: [0, 1], translateY: ['40px', '0px'],
      delay: stagger(150)
    }, 400)
    .add('.hero-desc.anim-init', { opacity: [0, 1], translateY: ['20px', '0px'] }, 800)
    .add('.hero-cta.anim-init', { opacity: [0, 1], translateY: ['20px', '0px'] }, 1000)
    .add('.hero-stats.anim-init', { opacity: [0, 1], translateY: ['20px', '0px'] }, 1150)
    .add('.hero-photo-wrap.anim-init', {
      opacity: [0, 1], scale: [0.8, 1], rotate: ['8deg', '0deg'],
      duration: 1100, ease: 'outBack(1.4)'
    }, 500);

  // ---- Stat counter animation ----
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const obj = { val: 0 };
    animate(obj, {
      val: [0, target],
      duration: 1800,
      ease: 'outExpo',
      delay: 1200,
      onUpdate: () => { el.textContent = Math.round(obj.val); }
    });
  });

  // ---- Photo ring pulse ----
  document.querySelectorAll('.hero-photo-ring').forEach(ring => {
    animate(ring, {
      opacity: [0.3, 1],
      scale: [0.98, 1.02],
      duration: 2000,
      loop: true,
      alternate: true,
      ease: 'inOutSine'
    });
  });

  // ---- Section-level scroll reveals ----
  // About
  onVisible('#about', () => {
    animate('#about .section-label.anim-init', { opacity: [0, 1], translateX: ['-20px', '0px'], duration: 600, ease: 'outExpo' });
    animate('#about h2.anim-init', { opacity: [0, 1], translateY: ['24px', '0px'], duration: 700, ease: 'outExpo', delay: 100 });
    animate('#about .about-text p.anim-init', {
      opacity: [0, 1], translateY: ['20px', '0px'],
      delay: stagger(120, { start: 200 }), duration: 700, ease: 'outExpo'
    });
    animate('#about h3.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 400, ease: 'outExpo' });
    animate('#about .skill-tags.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 500, ease: 'outExpo' });
    // Animate individual tags
    animate('#about .skill-tag', {
      opacity: [0, 1], scale: [0.8, 1],
      delay: stagger(50, { start: 550 }), duration: 500, ease: 'outBack(1.6)'
    });
  });

  // Projects
  onVisible('#projects', () => {
    animate('#projects .section-label.anim-init', { opacity: [0, 1], translateX: ['-20px', '0px'], duration: 600, ease: 'outExpo' });
    animate('#projects h2.anim-init', { opacity: [0, 1], translateY: ['24px', '0px'], duration: 700, delay: 100, ease: 'outExpo' });
    animate('#projects .filters.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 200, ease: 'outExpo' });
    animateCards();
  });

  // Stack
  onVisible('#stack', () => {
    animate('#stack .section-label.anim-init', { opacity: [0, 1], translateX: ['-20px', '0px'], duration: 600, ease: 'outExpo' });
    animate('#stack h2.anim-init', { opacity: [0, 1], translateY: ['24px', '0px'], duration: 700, delay: 100, ease: 'outExpo' });
    animate('#stack .lead.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 200, ease: 'outExpo' });
    animate('#stack .stack-item.anim-init', {
      opacity: [0, 1], translateY: ['30px', '0px'], scale: [0.96, 1],
      delay: stagger(100, { start: 300 }), duration: 800, ease: 'outExpo'
    });

    // Skill dots - animate the dots that main.js already created
    setTimeout(() => {
      document.querySelectorAll('.meter.dots').forEach(meter => {
        const dots = meter.querySelectorAll('span');
        if (dots.length) {
          animate(dots, {
            scale: [0, 1], opacity: [0, 1],
            delay: stagger(80), duration: 400, ease: 'outBack(2)'
          });
        }
      });
    }, 600);
  });

  // Resume
  onVisible('#resume', () => {
    animate('#resume .section-label.anim-init', { opacity: [0, 1], translateX: ['-20px', '0px'], duration: 600, ease: 'outExpo' });
    animate('#resume h2.anim-init', { opacity: [0, 1], translateY: ['24px', '0px'], duration: 700, delay: 100, ease: 'outExpo' });
    animate('#resume .lead.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 200, ease: 'outExpo' });
    animate('#resume .resume-card.anim-init', {
      opacity: [0, 1], translateY: ['30px', '0px'], scale: [0.96, 1],
      delay: stagger(150, { start: 300 }), duration: 800, ease: 'outExpo'
    });
  });

  // Contact
  onVisible('#contact', () => {
    animate('#contact .section-label.anim-init', { opacity: [0, 1], translateX: ['-20px', '0px'], duration: 600, ease: 'outExpo' });
    animate('#contact h2.anim-init', { opacity: [0, 1], translateY: ['24px', '0px'], duration: 700, delay: 100, ease: 'outExpo' });
    animate('#contact p.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 200, ease: 'outExpo' });
    animate('#contact .reach-status.anim-init', { opacity: [0, 1], translateX: ['-20px', '0px'], duration: 700, delay: 300, ease: 'outExpo' });
    animate('#contact .contact-card.anim-init', {
      opacity: [0, 1], translateY: ['20px', '0px'],
      delay: stagger(100, { start: 400 }), duration: 700, ease: 'outExpo'
    });
    animate('#contact .social-row.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 600, ease: 'outExpo' });
    animate('#contact .social-link', {
      scale: [0, 1], opacity: [0, 1],
      delay: stagger(60, { start: 650 }), duration: 500, ease: 'outBack(1.8)'
    });
    animate('#contact .reach-cta.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, delay: 800, ease: 'outExpo' });
  });

  // Feedback
  onVisible('#projectFeedback', () => {
    animate('#projectFeedback.anim-init', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 600, ease: 'outExpo' });
    animate('.emoji', {
      scale: [0, 1], rotate: ['-30deg', '0deg'],
      delay: stagger(70, { start: 200 }), duration: 500, ease: 'outBack(2)'
    });
  });

  // Footer
  onVisible('.site-footer', () => {
    animate('.footer-content', { opacity: [0, 1], translateY: ['16px', '0px'], duration: 700, ease: 'outExpo' });
  }, { threshold: 0.3 });

  // ---- Project card entrance ----
  function animateCards() {
    const cards = document.querySelectorAll('#projectsGrid .card');
    if (!cards.length) return;
    animate(cards, {
      opacity: [0, 1], translateY: ['28px', '0px'], scale: [0.95, 1],
      delay: stagger(80, { start: 100 }),
      duration: 700, ease: 'outExpo'
    });
    // pagination
    const pageBtns = document.querySelectorAll('.pagination button, .page-btn');
    if (pageBtns.length) {
      animate(pageBtns, {
        opacity: [0, 1], scale: [0.6, 1],
        delay: stagger(50, { start: 400 }),
        duration: 500, ease: 'outBack(2)'
      });
    }
  }

  // Expose for main.js to call on filter/page change
  window._animeReanimateCards = animateCards;

  // ---- Card hover tilt effect ----
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) scale(1.01) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  document.addEventListener('mouseleave', e => {
    const card = e.target.closest?.('.card');
    if (card) card.style.transform = '';
  }, true);

  // ---- Stack item hover glow ----
  document.querySelectorAll('.stack-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,.04), var(--surface) 60%)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.background = '';
    });
  });

  // ---- Filter click ripple ----
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute; border-radius: 50%; background: rgba(0,229,255,.3);
        width: 0; height: 0; left: ${e.clientX - rect.left}px; top: ${e.clientY - rect.top}px;
        transform: translate(-50%,-50%); pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      animate(ripple, {
        width: ['0px', '120px'], height: ['0px', '120px'], opacity: [1, 0],
        duration: 500, ease: 'outExpo',
        onComplete: () => ripple.remove()
      });
    });
  });

  // ---- Modal enhance ----
  const modal = document.getElementById('projectModal');
  if (modal) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.attributeName === 'aria-hidden' && modal.getAttribute('aria-hidden') === 'false') {
          animate('.modal-dialog', {
            translateY: ['40px', '0px'], scale: [0.95, 1], opacity: [0, 1],
            duration: 500, ease: 'outExpo'
          });
          animate('.modal-header', {
            opacity: [0, 1], translateY: ['16px', '0px'],
            duration: 500, delay: 150, ease: 'outExpo'
          });
          animate('.carousel', {
            opacity: [0, 1], scale: [0.96, 1],
            duration: 600, delay: 250, ease: 'outExpo'
          });
          animate('.modal-accordion', {
            opacity: [0, 1], translateY: ['12px', '0px'],
            delay: stagger(80, { start: 350 }), duration: 500, ease: 'outExpo'
          });
        }
      });
    });
    observer.observe(modal, { attributes: true });
  }

  // ---- Smooth scroll for nav links ----
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Brand hover ----
  const brandEl = document.querySelector('.brand');
  if (brandEl) {
    brandEl.addEventListener('mouseenter', () => {
      animate('.brand-icon', {
        rotate: ['0deg', '360deg'], scale: [1, 1.2, 1],
        duration: 600, ease: 'outBack(1.5)'
      });
    });
  }

  // ---- Gradient name shimmer ----
  const gradientName = document.querySelector('.hero-name .gradient');
  if (gradientName) {
    animate(gradientName, {
      backgroundPosition: ['0% 50%', '200% 50%'],
      duration: 3000,
      loop: true,
      ease: 'linear'
    });
    gradientName.style.backgroundSize = '200% auto';
    gradientName.style.backgroundImage = 'linear-gradient(90deg, var(--primary-a), var(--primary-b), var(--primary-a))';
  }

  // ---- Button hover enhancement ----
  document.querySelectorAll('.btn-glow').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      animate(btn, {
        boxShadow: ['0 0 20px rgba(0,229,255,.2)', '0 0 40px rgba(0,229,255,.35), 0 0 80px rgba(0,229,255,.1)'],
        duration: 400, ease: 'outExpo'
      });
    });
  });

  // ---- Year in footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==================================================================
  // LOADER — hide once page is ready
  // ==================================================================
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 300);
      setTimeout(() => loader.remove(), 900);
    });
  }

  // ==================================================================
  // SCROLL PROGRESS BAR
  // ==================================================================
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ==================================================================
  // BACK TO TOP
  // ==================================================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleBTT = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', toggleBTT, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleBTT();
  }

  // ==================================================================
  // HAMBURGER (mobile nav)
  // ==================================================================
  const hamburger = document.getElementById('hamburger');
  const navDrawer  = document.getElementById('navLinks');
  if (hamburger && navDrawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !open);
      navDrawer.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    // Close on link click
    navDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
    // Close on overlay click (outside nav)
    document.addEventListener('click', (e) => {
      if (hamburger.getAttribute('aria-expanded') === 'true' &&
          !navDrawer.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        navDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // ==================================================================
  // FOCUS TRAP — modal & code overlay
  // ==================================================================
  function trapFocus(container) {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  const projectModal = document.getElementById('projectModal');
  const codeOverlay  = document.getElementById('codeOverlay');
  if (projectModal) trapFocus(projectModal);
  if (codeOverlay)  trapFocus(codeOverlay);

  // ==================================================================
  // CAROUSEL SWIPE (touch)
  // ==================================================================
  const slidesEl = document.getElementById('carouselSlides');
  if (slidesEl) {
    let startX = 0, startY = 0, diffX = 0, swiping = false;
    slidesEl.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      swiping = true;
    }, { passive: true });
    slidesEl.addEventListener('touchmove', (e) => {
      if (!swiping) return;
      diffX = e.touches[0].clientX - startX;
      const diffY = e.touches[0].clientY - startY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        e.preventDefault();
      }
    }, { passive: false });
    slidesEl.addEventListener('touchend', () => {
      if (!swiping) return;
      swiping = false;
      const threshold = 50;
      if (diffX < -threshold) {
        document.getElementById('carouselNext')?.click();
      } else if (diffX > threshold) {
        document.getElementById('carouselPrev')?.click();
      }
      diffX = 0;
    }, { passive: true });
  }

  // ==================================================================
  // Lower shader quality on mobile for performance
  // ==================================================================
  if (window.innerWidth < 768) {
    const shaderCanvas = document.querySelector('#shaderBg canvas');
    if (shaderCanvas) {
      shaderCanvas.style.imageRendering = 'auto';
    }
  }

  console.log('[anime] All animations initialized');
})();
