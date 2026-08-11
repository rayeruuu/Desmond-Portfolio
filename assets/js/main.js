/** Application bootstrap. */

import { CONFIG, whatsappLink } from './core/config.js';
import { PROJECTS } from './data/projects.js';
import { startRouter } from './core/router.js';
import { startDust, prefersReducedMotion } from './core/motion.js';
import { initHero } from './scenes/hero.js';
import { initWork } from './scenes/work.js';
import { initProject } from './scenes/project.js';
import { closeCodeViewer, isCodeViewerOpen } from './scenes/code-viewer.js';

/* -- Boot loader ---------------------------------------------------------- */

function runBoot() {
  const boot = document.getElementById('boot');
  const fill = document.getElementById('bootFill');
  const pct = document.getElementById('bootPct');
  const label = document.getElementById('bootLabel');
  if (!boot) return;

  const finish = () => {
    boot.classList.add('is-done');
    document.body.classList.remove('is-booting');
    document.documentElement.dataset.booted = 'true';
  };

  if (prefersReducedMotion()) {
    finish();
    return;
  }

  const DURATION = 1600;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / DURATION, 1);
    const value = Math.round(progress * 100);
    if (fill) fill.style.width = `${value}%`;
    if (pct) pct.textContent = `${value}%`;
    if (label && value > 60) label.textContent = 'Systems online';

    if (progress < 1) requestAnimationFrame(step);
    else window.setTimeout(finish, 240);
  };

  requestAnimationFrame(step);
  // Safety net: never trap the visitor behind the loader.
  window.setTimeout(finish, DURATION + 2000);
}

/* -- Static content ------------------------------------------------------- */

function fillStaticContent() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const stat = document.getElementById('statProjects');
  if (stat) stat.textContent = String(PROJECTS.length);

  // Only genuinely published work counts here — everything else is coursework.
  const releasedEl = document.getElementById('statReleased');
  if (releasedEl) {
    const released = PROJECTS.filter((project) => project.status === 'Released');
    releasedEl.textContent = released.length === 1
      ? released[0].title
      : String(released.length);
  }

  const email = document.getElementById('displayEmail');
  if (email) email.textContent = CONFIG.email;

  const phone = document.getElementById('displayPhone');
  if (phone) phone.textContent = CONFIG.phone;

  const availability = document.getElementById('availability');
  if (availability) availability.textContent = CONFIG.availability;

  const emailLink = document.getElementById('emailLink');
  if (emailLink) emailLink.href = `mailto:${CONFIG.email}`;

  const whatsapp = document.getElementById('whatsappLink');
  if (whatsapp) whatsapp.href = whatsappLink();

  const copy = document.getElementById('copyEmail');
  copy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      const original = copy.textContent;
      copy.textContent = 'Copied';
      window.setTimeout(() => { copy.textContent = original; }, 1400);
    } catch {
      copy.textContent = 'Copy failed';
    }
  });
}

/* -- Wiring --------------------------------------------------------------- */

function main() {
  // Tells the watchdog in index.html that every module resolved, so a later
  // failure is reported as a script error rather than a file:// problem.
  document.documentElement.dataset.modules = 'ok';

  runBoot();
  fillStaticContent();
  startDust(/** @type {HTMLCanvasElement} */ (document.getElementById('dust')));

  const hero = initHero();
  const work = initWork();
  const project = initProject();

  /** @type {Record<string, {onKey?: (e: KeyboardEvent) => void}>} */
  const keyHandlers = {
    '/work': work,
    '/work/:slug': project,
  };
  let activePath = '/';

  startRouter([
    {
      path: '/',
      sceneId: 'scene-home',
      onEnter: () => { activePath = '/'; hero.onEnter(); },
      onLeave: () => hero.onLeave(),
    },
    {
      path: '/work',
      sceneId: 'scene-work',
      onEnter: () => { activePath = '/work'; work.onEnter(); },
    },
    {
      path: '/work/:slug',
      sceneId: 'scene-project',
      onEnter: (params) => {
        const ok = project.onEnter(params);
        if (ok !== false) activePath = '/work/:slug';
        return ok;
      },
      onLeave: () => project.onLeave(),
    },
    { path: '/about', sceneId: 'scene-about', onEnter: () => { activePath = '/about'; } },
    { path: '/resume', sceneId: 'scene-resume', onEnter: () => { activePath = '/resume'; } },
    { path: '/contact', sceneId: 'scene-contact', onEnter: () => { activePath = '/contact'; } },
  ]);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (closeCodeViewer()) return;
      if (activePath === '/work/:slug') window.location.hash = '#/work';
      else if (activePath !== '/') window.location.hash = '#/';
      return;
    }

    if (isCodeViewerOpen()) return;
    keyHandlers[activePath]?.onKey?.(event);
  });

  document.getElementById('codeClose')?.addEventListener('click', closeCodeViewer);
  document.getElementById('codeOverlay')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closeCodeViewer();
  });
}

try {
  main();
} catch (error) {
  // A crash must not leave the visitor staring at the loader.
  document.getElementById('boot')?.classList.add('is-done');
  document.body.classList.remove('is-booting');
  document.documentElement.dataset.booted = 'true';
  throw error;
}
