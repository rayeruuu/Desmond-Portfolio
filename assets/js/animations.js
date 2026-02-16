// ================================================================
// Anime.js v4 — Game UI Animations
// Uses the UMD global `anime` from the CDN
// ================================================================

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Show all screens immediately for reduced-motion users
    document.querySelectorAll('.game-screen.active').forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
    return;
  }

  const { animate, stagger, createTimeline } = anime;

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

  // ---- Year in footer/HUD ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==================================================================
  // INTRO — BF2042 tactical boot sequence
  // ==================================================================
  const intro      = document.getElementById('intro');
  const introPct   = document.getElementById('introPct');
  const introBar   = document.querySelector('.intro-bar__fill');
  const introLogo  = document.querySelector('.intro-logo-mark');
  const introStatus = document.querySelector('.intro-status');
  const introBarWrap = document.querySelector('.intro-bar-wrap');
  const introChecks = document.querySelectorAll('.intro-check');
  const introLabel  = document.getElementById('introLabel');

  if (intro && introPct) {
    document.body.classList.add('intro-active');

    // Stagger element reveals
    setTimeout(() => { introLogo?.classList.add('is-visible'); }, 100);
    setTimeout(() => { introStatus?.classList.add('is-visible'); }, 400);
    setTimeout(() => { introBarWrap?.classList.add('is-visible'); }, 600);

    // Show system checks at their data-delay times
    introChecks.forEach(check => {
      const d = Number(check.dataset.delay) || 0;
      setTimeout(() => { check.classList.add('is-visible'); }, 700 + d);
    });

    // Animate counter + bar fill
    const counter = { val: 0 };
    animate(counter, {
      val: [0, 100],
      duration: 2600,
      ease: 'inOutExpo',
      onUpdate: () => {
        const v = Math.round(counter.val);
        introPct.textContent = v + '%';
        if (introBar) introBar.style.width = v + '%';
      },
      onComplete: () => {
        // Update label
        if (introLabel) introLabel.textContent = 'SYSTEMS ONLINE';

        setTimeout(() => {
          intro.classList.add('is-done');
          document.body.classList.remove('intro-active');
          document.body.classList.add('title-active');

          // Show title screen instead of going straight to menu
          const titleScreen = document.getElementById('titleScreen');
          if (titleScreen) {
            // Small delay so the intro fade-out completes first
            setTimeout(() => {
              titleScreen.classList.add('is-visible');
              titleScreen.setAttribute('aria-hidden', 'false');
              initTitleBgCycle();
            }, 200);
          }
        }, 600);
      }
    });

    // Safety: remove intro after 5s
    setTimeout(() => {
      if (!intro.classList.contains('is-done')) {
        intro.classList.add('is-done');
        document.body.classList.remove('intro-active');
        document.body.classList.add('title-active');
        const ts = document.getElementById('titleScreen');
        if (ts && !ts.classList.contains('is-visible')) {
          setTimeout(() => {
            ts.classList.add('is-visible');
            ts.setAttribute('aria-hidden', 'false');
            initTitleBgCycle();
          }, 200);
        }
      }
    }, 5000);
  }

  // ---- Title background image cycling ----
  let titleCycleTimer = null;
  function initTitleBgCycle() {
    const bgA = document.getElementById('titleBgA');
    const bgB = document.getElementById('titleBgB');
    if (!bgA || !bgB || typeof PROJECTS === 'undefined' || !PROJECTS.length) return;

    // Collect all unique project images
    const images = PROJECTS.map(p => p.image).filter(Boolean);
    if (images.length === 0) return;

    let currentIdx = 0;
    let showingA = true;

    // Preload images for smooth transitions
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Set initial image on layer A
    bgA.style.backgroundImage = `url('${images[0]}')`;
    bgA.style.animation = 'titleZoom 8s ease-out forwards';

    function cycleBg() {
      currentIdx = (currentIdx + 1) % images.length;
      const nextSrc = `url('${images[currentIdx]}')`;

      if (showingA) {
        // Load next on B, fade B in (A out)
        bgB.style.backgroundImage = nextSrc;
        bgB.style.animation = 'none';
        void bgB.offsetWidth;  // force reflow
        bgB.style.animation = 'titleZoom 8s ease-out forwards';
        bgA.classList.add('is-fading');
        bgB.classList.add('is-fading');
      } else {
        // Load next on A, fade A in (B out)
        bgA.style.backgroundImage = nextSrc;
        bgA.style.animation = 'none';
        void bgA.offsetWidth;
        bgA.style.animation = 'titleZoom 8s ease-out forwards';
        bgA.classList.remove('is-fading');
        bgB.classList.remove('is-fading');
      }
      showingA = !showingA;
    }

    titleCycleTimer = setInterval(cycleBg, 5000);
  }

  function stopTitleBgCycle() {
    if (titleCycleTimer) {
      clearInterval(titleCycleTimer);
      titleCycleTimer = null;
    }
  }

  // ---- Title screen → enter main menu ----
  const titleScreen = document.getElementById('titleScreen');
  const titleEnter = document.getElementById('titleEnter');
  function enterFromTitle() {
    if (!titleScreen || titleScreen.classList.contains('is-done')) return;

    stopTitleBgCycle();
    titleScreen.classList.add('is-exiting');

    // Wait for the fade-out animation, then clean up and show menu
    setTimeout(() => {
      titleScreen.classList.add('is-done');
      titleScreen.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('title-active');

      // Animate the active game screen in
      const activeScreen = document.querySelector('.game-screen.active');
      if (activeScreen) {
        animate(activeScreen, {
          opacity: [0, 1],
          duration: 800,
          ease: 'outExpo',
        });
      }

      // Animate shader bg + background elements
      animate('#shaderBg, .bg-canvas, .cursor-glow', {
        opacity: [0, 1],
        duration: 1000,
        ease: 'outExpo',
        delay: 100,
      });

      // Animate menu elements
      animateMenuEntrance();
    }, 1000);
  }
  if (titleScreen) {
    titleScreen.addEventListener('click', enterFromTitle);
  }
  // Also allow Enter / Space to proceed
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && titleScreen && titleScreen.classList.contains('is-visible') && !titleScreen.classList.contains('is-done') && !titleScreen.classList.contains('is-exiting')) {
      e.preventDefault();
      enterFromTitle();
    }
  });

  // ---- Menu entrance animation (BF2042-style) ----
  function animateMenuEntrance() {
    animate('.bf-topnav', {
      opacity: [0, 1], translateY: ['-10px', '0px'],
      duration: 500, ease: 'outExpo', delay: 50
    });
    animate('.bf-hero__title', {
      opacity: [0, 1], translateY: ['18px', '0px'],
      duration: 700, ease: 'outExpo', delay: 250
    });
    animate('.bf-hero__desc, .bf-hero__creator, .bf-hero__divider', {
      opacity: [0, 1], translateX: ['-10px', '0px'],
      duration: 500, ease: 'outExpo', delay: 450
    });
    animate('.bf-panel', {
      opacity: [0, 1], translateX: ['16px', '0px'],
      duration: 600, ease: 'outExpo', delay: 350
    });
    animate('.bf-subnav-item', {
      opacity: [0, 1], translateX: ['-10px', '0px'],
      delay: stagger(50, { start: 500 }),
      duration: 400, ease: 'outExpo'
    });
    animate('.bf-bcard', {
      opacity: [0, 1], translateY: ['18px', '0px'], scale: [0.96, 1],
      delay: stagger(80, { start: 550 }),
      duration: 600, ease: 'outExpo'
    });
    animate('#screenMenu .hud-bar', {
      opacity: [0, 1], translateY: ['10px', '0px'],
      duration: 500, ease: 'outExpo', delay: 900
    });

    // Animate stats bars filling
    if (typeof window._animateStatsBars === 'function') {
      window._animateStatsBars();
    }
  }

  // Expose menu entrance for screen navigation
  window._animeMenuEntrance = animateMenuEntrance;

  // ---- Screen transition animation ----
  window._animeScreenTransition = function(screen) {
    if (!screen) return;

    // Animate screen header
    const header = screen.querySelector('.screen-header');
    if (header) {
      animate(header, {
        opacity: [0, 1], translateY: ['-10px', '0px'],
        duration: 500, ease: 'outExpo', delay: 100
      });
    }

    // Animate screen body content
    const body = screen.querySelector('.screen-body');
    if (body) {
      animate(body, {
        opacity: [0, 1], translateY: ['16px', '0px'],
        duration: 600, ease: 'outExpo', delay: 200
      });
    }

    // Animate HUD bar
    const hud = screen.querySelector('.hud-bar');
    if (hud) {
      animate(hud, {
        opacity: [0, 1], translateY: ['10px', '0px'],
        duration: 500, ease: 'outExpo', delay: 300
      });
    }

    // Animate war cards if present
    const warCards = screen.querySelectorAll('.war-card');
    if (warCards.length) {
      animate(warCards, {
        opacity: [0, 1],
        translateY: ['24px', '0px'],
        scale: [0.95, 1],
        delay: stagger(60, { start: 250 }),
        duration: 600,
        ease: 'outExpo'
      });
    }

    // Animate loadout cards if present
    const loadoutCards = screen.querySelectorAll('.loadout-card');
    if (loadoutCards.length) {
      animate(loadoutCards, {
        opacity: [0, 1],
        translateY: ['20px', '0px'],
        scale: [0.96, 1],
        delay: stagger(80, { start: 300 }),
        duration: 700,
        ease: 'outExpo'
      });
    }

    // Animate resume panels
    const resumePanels = screen.querySelectorAll('.resume-panel');
    if (resumePanels.length) {
      animate(resumePanels, {
        opacity: [0, 1],
        translateY: ['20px', '0px'],
        delay: stagger(120, { start: 250 }),
        duration: 700,
        ease: 'outExpo'
      });
    }

    // Animate contact elements
    const contactStatus = screen.querySelector('.contact-status');
    if (contactStatus) {
      animate(contactStatus, {
        opacity: [0, 1], translateX: ['-20px', '0px'],
        duration: 600, ease: 'outExpo', delay: 200
      });
    }
    const contactCards = screen.querySelectorAll('.contact-card');
    if (contactCards.length) {
      animate(contactCards, {
        opacity: [0, 1], translateY: ['16px', '0px'],
        delay: stagger(80, { start: 300 }),
        duration: 600, ease: 'outExpo'
      });
    }
    const contactSocial = screen.querySelector('.contact-social');
    if (contactSocial) {
      animate(contactSocial, {
        opacity: [0, 1], translateY: ['12px', '0px'],
        duration: 500, ease: 'outExpo', delay: 450
      });
    }
    const contactCta = screen.querySelector('.contact-cta');
    if (contactCta) {
      animate(contactCta, {
        opacity: [0, 1], translateY: ['12px', '0px'],
        duration: 500, ease: 'outExpo', delay: 550
      });
    }

    // Animate skill tags
    const skillTags = screen.querySelectorAll('.skill-tag');
    if (skillTags.length) {
      animate(skillTags, {
        opacity: [0, 1], scale: [0.8, 1],
        delay: stagger(40, { start: 400 }),
        duration: 400, ease: 'outBack(1.6)'
      });
    }

    // Animate panel text
    const panelPs = screen.querySelectorAll('.panel-main p');
    if (panelPs.length) {
      animate(panelPs, {
        opacity: [0, 1], translateY: ['16px', '0px'],
        delay: stagger(100, { start: 200 }),
        duration: 600, ease: 'outExpo'
      });
    }
  };

  // ---- Re-animate war cards (called after filter/render) ----
  window._animeReanimateCards = function() {
    const warCards = document.querySelectorAll('.war-card');
    if (!warCards.length) return;
    animate(warCards, {
      opacity: [0, 1],
      translateY: ['20px', '0px'],
      scale: [0.95, 1],
      delay: stagger(50, { start: 50 }),
      duration: 500,
      ease: 'outExpo'
    });
  };

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

  // ---- Focus trap for modal & code overlay ----
  function trapFocus(container) {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    container.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  if (modal) trapFocus(modal);
  const codeOverlay = document.getElementById('codeOverlay');
  if (codeOverlay) trapFocus(codeOverlay);

  // ---- Carousel touch swipe ----
  const slidesEl = document.getElementById('carouselSlides');
  if (slidesEl) {
    let startX = 0, startY = 0, swiping = false;
    slidesEl.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      swiping = true;
    }, { passive: true });
    slidesEl.addEventListener('touchend', e => {
      if (!swiping) return;
      swiping = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) document.getElementById('carouselNext')?.click();
      else document.getElementById('carouselPrev')?.click();
    }, { passive: true });
  }

  // ---- Reduce shader quality on mobile ----
  if (window.innerWidth < 640 && window._shaderSetQuality) {
    window._shaderSetQuality(0.5);
  }

  // ---- Button hover glow ----
  document.querySelectorAll('.btn-glow').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      animate(btn, {
        boxShadow: ['0 0 20px rgba(0,229,255,.2)', '0 0 40px rgba(0,229,255,.35), 0 0 80px rgba(0,229,255,.1)'],
        duration: 400, ease: 'outExpo'
      });
    });
  });

  // ================================================================
  //  FLOATING PARTICLES — ambient dust/ember on menu & screens
  // ================================================================
  (function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const PARTICLE_COUNT = 40;
    const particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.35 + 0.05,
        life: 0,
        maxLife: Math.random() * 600 + 300,
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife; // stagger initial positions
      particles.push(p);
    }

    function drawParticles() {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in then fade out
        const progress = p.life / p.maxLife;
        let alpha = p.alpha;
        if (progress < 0.1) alpha *= progress / 0.1;
        else if (progress > 0.8) alpha *= (1 - progress) / 0.2;

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle();
          particles[i].y = canvas.height + 5;
          continue;
        }

        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx2d.fill();
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  })();

  // ================================================================
  //  ANIMATED STATS BARS — fill on menu entrance
  // ================================================================
  (function initStatsBars() {
    const bars = document.querySelectorAll('.bf-stat-row__bar span');
    if (!bars.length) return;

    // Store target widths, set to 0 initially
    const targets = [];
    bars.forEach(bar => {
      targets.push(bar.style.width || '0%');
      bar.style.width = '0%';
    });

    // Expose function to animate bars
    window._animateStatsBars = function () {
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = targets[i];
        }, 600 + i * 120);
      });
    };
  })();

})();
