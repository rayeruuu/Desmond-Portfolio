/**
 * Motion helpers.
 *
 * The scene cut, element reveals and the autoplay ring all live in CSS — this
 * module only owns the things CSS cannot express: the reduced-motion query, the
 * dust field, and pausing work when the tab is hidden.
 */

const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

/** @returns {boolean} */
export function prefersReducedMotion() {
  return reduceQuery.matches;
}

/**
 * @param {(reduced: boolean) => void} handler
 */
export function onMotionPreferenceChange(handler) {
  reduceQuery.addEventListener('change', (event) => handler(event.matches));
}

/**
 * A slow drift of dust motes. Cheap: 40 particles, one canvas, paused whenever
 * the tab is hidden or the user has asked for reduced motion.
 *
 * @param {HTMLCanvasElement} canvas
 */
export function startDust(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const COUNT = 40;
  /** @type {{x:number,y:number,vy:number,r:number,life:number,max:number}[]} */
  let motes = [];
  let frame = 0;
  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn() {
    const max = 500 + Math.random() * 900;
    return {
      x: Math.random() * width,
      y: height + Math.random() * height,
      vy: 0.06 + Math.random() * 0.16,
      r: 0.5 + Math.random() * 1.1,
      life: Math.random() * max,
      max,
    };
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);

    for (const mote of motes) {
      mote.y -= mote.vy;
      mote.life += 1;

      if (mote.life > mote.max || mote.y < -10) {
        Object.assign(mote, spawn(), { y: height + 10, life: 0 });
      }

      const ratio = mote.life / mote.max;
      const alpha = Math.sin(ratio * Math.PI) * 0.34;
      ctx.beginPath();
      ctx.fillStyle = `rgba(224, 163, 78, ${alpha})`;
      ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
      ctx.fill();
    }

    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (frame || prefersReducedMotion()) return;
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = 0;
    ctx.clearRect(0, 0, width, height);
  }

  resize();
  motes = Array.from({ length: COUNT }, spawn);

  window.addEventListener('resize', () => {
    resize();
    motes = Array.from({ length: COUNT }, spawn);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  onMotionPreferenceChange((reduced) => (reduced ? stop() : start()));

  start();
}

/**
 * Assign sequential --i values so freshly rendered children stagger in.
 * @param {Element} root
 * @param {string} selector
 */
export function stagger(root, selector) {
  root.querySelectorAll(selector).forEach((el, i) => {
    el.style.setProperty('--i', String(i));
  });
}

/** @returns {boolean} True when the browser drives animations off scroll position. */
export function supportsScrollTimeline() {
  return typeof CSS !== 'undefined'
    && typeof CSS.supports === 'function'
    && CSS.supports('animation-timeline: view()');
}

/**
 * Fallback reveal for browsers without scroll-driven animations: toggle
 * `.is-inview` as elements enter and leave, so scrubbing back up replays.
 *
 * @param {Element} scroller The scrolling container.
 * @returns {IntersectionObserver | null}
 */
export function observeScrollReveals(scroller) {
  if (!scroller || supportsScrollTimeline() || typeof IntersectionObserver !== 'function') {
    return null;
  }

  const targets = scroller.querySelectorAll('.scroll-reveal');
  if (targets.length === 0) return null;

  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-inview'));
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-inview', entry.isIntersecting);
      }
    },
    { root: scroller, rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );

  targets.forEach((el) => observer.observe(el));
  return observer;
}
