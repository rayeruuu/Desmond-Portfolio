/** Hero scene — a slow rotation through the featured projects. */

import { featuredProjects } from '../data/projects.js';
import { setImageSource } from '../core/images.js';
import { prefersReducedMotion, observeScrollReveals } from '../core/motion.js';

const INTERVAL = 6000;

/** Renders the featured strip in the home page's third panel. */
function buildFeatureStrip(items) {
  const strip = document.getElementById('featureStrip');
  if (!strip) return;

  strip.innerHTML = items
    .map(
      (project) => `
      <a class="feature scroll-reveal" href="#/work/${project.slug}">
        <span class="feature__art"><img alt="" decoding="async" loading="lazy" /></span>
        <span class="feature__name">${project.title}</span>
        <span class="feature__meta">${project.category} &middot; ${project.year}</span>
      </a>`,
    )
    .join('');

  strip.querySelectorAll('.feature').forEach((card, i) => {
    const img = card.querySelector('img');
    if (img) {
      img.alt = `${items[i].title} cover art`;
      setImageSource(/** @type {HTMLImageElement} */ (img), items[i].thumb, {
        immediate: true,
        fallback: items[i].cover,
      });
    }
  });
}

export function initHero() {
  const object = /** @type {HTMLImageElement} */ (document.getElementById('heroObject'));
  const indexEl = document.getElementById('heroIndex');
  const nameEl = document.getElementById('heroFeatured');
  const ticksEl = document.getElementById('heroTicks');
  const ring = document.getElementById('heroRing');
  const auto = document.getElementById('heroAuto');
  const playBtn = document.getElementById('heroPlay');

  const items = featuredProjects();
  if (!object || items.length === 0) return { onEnter() {}, onLeave() {} };

  let index = 0;
  let timer = 0;
  let paused = prefersReducedMotion();
  let visible = false;

  ticksEl.innerHTML = items
    .map((p, i) => `<span class="hero__tick${i === 0 ? ' is-on' : ''}" data-tick="${i}"></span>`)
    .join('');

  const ticks = Array.from(ticksEl.children);

  function render() {
    const project = items[index];

    object.style.opacity = '0';
    window.setTimeout(() => {
      setImageSource(object, project.cover, { immediate: true });
      object.alt = `${project.title} key art`;
      object.style.opacity = '1';
    }, prefersReducedMotion() ? 0 : 220);

    indexEl.textContent = String(index + 1).padStart(2, '0');
    if (nameEl) nameEl.textContent = project.title;
    object.parentElement?.setAttribute('href', `#/work/${project.slug}`);
    ticks.forEach((tick, i) => tick.classList.toggle('is-on', i === index));

    // Restart the ring animation from zero on every advance.
    if (ring) {
      ring.classList.remove('is-running');
      void ring.getBoundingClientRect();
      if (!paused) ring.classList.add('is-running');
    }
  }

  function advance() {
    index = (index + 1) % items.length;
    render();
  }

  function schedule() {
    window.clearInterval(timer);
    if (paused || !visible) return;
    timer = window.setInterval(advance, INTERVAL);
  }

  function setPaused(next) {
    paused = next;
    auto?.classList.toggle('is-paused', paused);
    playBtn?.classList.toggle('is-paused', !paused);
    playBtn?.setAttribute(
      'aria-label',
      paused ? 'Resume featured rotation' : 'Pause featured rotation',
    );
    if (ring) ring.classList.toggle('is-running', !paused);
    schedule();
  }

  playBtn?.addEventListener('click', () => setPaused(!paused));

  ticksEl.addEventListener('click', (event) => {
    const tick = /** @type {HTMLElement} */ (event.target).closest('[data-tick]');
    if (!tick) return;
    index = Number(tick.dataset.tick);
    render();
    schedule();
  });

  object.style.transition = 'opacity var(--d-base) var(--ease-out)';
  render();
  setPaused(paused);

  buildFeatureStrip(items);
  observeScrollReveals(document.getElementById('scene-home'));

  return {
    onEnter() {
      visible = true;
      // Coming home should always land on the hero, never mid-scroll.
      const scene = document.getElementById('scene-home');
      if (scene) scene.scrollTop = 0;
      schedule();
    },
    onLeave() {
      visible = false;
      window.clearInterval(timer);
    },
  };
}
