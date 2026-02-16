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

  // ---- Photo ring pulse ----
  document.querySelectorAll('.menu-photo-ring').forEach(ring => {
    animate(ring, {
      opacity: [0.3, 1],
      scale: [0.98, 1.02],
      duration: 2000,
      loop: true,
      alternate: true,
      ease: 'inOutSine'
    });
  });

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

  // ---- Year in footer/HUD ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==================================================================
  // INTRO — counter + text reveal, then show main menu
  // ==================================================================
  const intro     = document.getElementById('intro');
  const introPct  = document.getElementById('introPct');
  const introLine = intro?.querySelector('.intro-line');
  const introLabel = intro?.querySelector('.intro-label');
  const introName = intro?.querySelector('.intro-name');

  if (intro && introPct) {
    document.body.classList.add('intro-active');

    const counter = { val: 0 };
    animate(counter, {
      val: [0, 100],
      duration: 2400,
      ease: 'inOutExpo',
      onUpdate: () => {
        introPct.textContent = Math.round(counter.val);
      },
      onComplete: () => {
        setTimeout(() => {
          intro.classList.add('is-done');
          document.body.classList.remove('intro-active');

          // Animate the active game screen in
          const activeScreen = document.querySelector('.game-screen.active');
          if (activeScreen) {
            animate(activeScreen, {
              opacity: [0, 1],
              duration: 600,
              ease: 'outExpo',
            });
          }

          // Animate shader bg + background elements
          animate('#shaderBg, .bg-canvas, .cursor-glow', {
            opacity: [0, 1],
            duration: 800,
            ease: 'outExpo',
            delay: 100,
          });

          // Animate menu elements
          animateMenuEntrance();
        }, 600);
      }
    });

    setTimeout(() => { introLine?.classList.add('is-active'); }, 100);
    setTimeout(() => { introLabel?.classList.add('is-visible'); }, 400);
    setTimeout(() => { introName?.classList.add('is-visible'); }, 800);

    // Safety: remove intro after 5s
    setTimeout(() => {
      if (!intro.classList.contains('is-done')) {
        intro.classList.add('is-done');
        document.body.classList.remove('intro-active');
      }
    }, 5000);
  }

  // ---- Menu entrance animation ----
  function animateMenuEntrance() {
    animate('.menu-eyebrow', {
      opacity: [0, 1], translateX: ['-20px', '0px'],
      duration: 600, ease: 'outExpo', delay: 100
    });
    animate('.menu-title', {
      opacity: [0, 1], translateY: ['30px', '0px'],
      duration: 800, ease: 'outExpo', delay: 200
    });
    animate('.menu-role', {
      opacity: [0, 1], translateY: ['16px', '0px'],
      duration: 600, ease: 'outExpo', delay: 400
    });
    animate('.menu-item', {
      opacity: [0, 1], translateX: ['-20px', '0px'],
      delay: stagger(80, { start: 500 }),
      duration: 600, ease: 'outExpo'
    });
    animate('.menu-photo-wrap', {
      opacity: [0, 1], scale: [0.8, 1],
      duration: 900, ease: 'outBack(1.4)', delay: 300
    });
    animate('.menu-stats', {
      opacity: [0, 1], translateY: ['16px', '0px'],
      duration: 600, ease: 'outExpo', delay: 700
    });
    animate('.hud-bar', {
      opacity: [0, 1], translateY: ['10px', '0px'],
      duration: 500, ease: 'outExpo', delay: 800
    });
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

})();
