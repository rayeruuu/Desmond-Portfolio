/**
 * Hash router for the scene deck.
 *
 * Routes are hash-based (`#/work/rotoblocks`) so deep links, refreshes and the
 * browser back button all work on GitHub Pages without server rewrites.
 */

/**
 * @typedef {Object} Route
 * @property {string} path      e.g. '/work' or '/work/:slug'
 * @property {string} sceneId   Element id of the scene to reveal.
 * @property {(params: Record<string,string>) => boolean | void} [onEnter]
 *           Return false to reject the route (e.g. unknown slug).
 * @property {() => void} [onLeave]
 */

/** @type {Route[]} */
let routes = [];
/** @type {Route | null} */
let current = null;

const FALLBACK = '/';

/** @param {string} hash @returns {string} */
function normalise(hash) {
  const raw = hash.replace(/^#/, '');
  if (!raw || raw === '/') return '/';
  return raw.startsWith('/') ? raw.replace(/\/+$/, '') || '/' : `/${raw}`;
}

/**
 * @param {string} pattern
 * @param {string} path
 * @returns {Record<string, string> | null}
 */
function match(pattern, path) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;

  /** @type {Record<string, string>} */
  const params = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const p = patternParts[i];
    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (p !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

/** @param {Route} route @param {Record<string,string>} params */
function activate(route, params) {
  if (current && current !== route && current.onLeave) current.onLeave();

  if (route.onEnter && route.onEnter(params) === false) {
    window.location.hash = `#${FALLBACK}`;
    return;
  }

  document.querySelectorAll('.scene').forEach((scene) => {
    const isTarget = scene.id === route.sceneId;
    scene.classList.toggle('is-active', isTarget);
    scene.setAttribute('aria-hidden', String(!isTarget));
  });

  document.querySelectorAll('[data-nav]').forEach((link) => {
    const navPath = link.getAttribute('data-nav');
    const isCurrent = navPath === route.path || (navPath !== '/' && route.path.startsWith(navPath));
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const scene = document.getElementById(route.sceneId);
  if (scene) {
    scene.tabIndex = -1;
    // Wait for the scene to become visible before moving focus, otherwise the
    // browser refuses to focus a visibility:hidden element.
    requestAnimationFrame(() => scene.focus({ preventScroll: true }));
  }

  current = route;
}

function resolve() {
  const path = normalise(window.location.hash);

  for (const route of routes) {
    const params = match(route.path, path);
    if (params) {
      activate(route, params);
      return;
    }
  }

  window.location.hash = `#${FALLBACK}`;
}

/** @param {Route[]} definitions */
export function startRouter(definitions) {
  routes = definitions;
  window.addEventListener('hashchange', resolve);
  if (!window.location.hash) window.location.replace(`#${FALLBACK}`);
  resolve();
}

/** @param {string} path */
export function go(path) {
  window.location.hash = `#${path}`;
}

/** @returns {string} */
export function currentPath() {
  return current ? current.path : FALLBACK;
}
