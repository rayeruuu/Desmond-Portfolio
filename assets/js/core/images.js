/**
 * Image loading.
 *
 * Everything is served straight from this repo. An earlier version routed card
 * imagery through the wsrv.nl resizing proxy, which silently broke every
 * preview whenever the site was viewed from a host the proxy could not reach
 * from the public internet — a LAN address, a machine name, any pre-deploy
 * preview. Small WebP thumbnails live in assets/images/thumbs instead, so there
 * is no third-party dependency in the render path at all.
 */

/**
 * Point an <img> at a source, deferring the network hit until `hydrate()` runs
 * unless `immediate` is set.
 *
 * @param {HTMLImageElement} img
 * @param {string} src
 * @param {{immediate?: boolean, fallback?: string | null}} [options]
 */
export function setImageSource(img, src, options = {}) {
  if (!img || !src) return;
  const { immediate = false, fallback = null } = options;

  // A missing thumbnail should degrade to the full image rather than to the
  // browser's broken-image glyph.
  if (fallback && fallback !== src) {
    img.addEventListener(
      'error',
      () => {
        if (img.dataset.fellBack === 'true') return;
        img.dataset.fellBack = 'true';
        img.src = fallback;
      },
      { once: true },
    );
  }

  if (immediate) {
    img.src = src;
  } else {
    img.dataset.src = src;
  }
}

/**
 * Promote a deferred <img> to a real request.
 * @param {HTMLImageElement} img
 */
export function hydrate(img) {
  if (!img || !img.dataset.src) return;
  img.src = img.dataset.src;
  delete img.dataset.src;
}

/**
 * Hydrate deferred images as they approach the viewport.
 * @param {Element} root
 * @returns {IntersectionObserver | null}
 */
export function observeLazyImages(root) {
  if (!root || typeof IntersectionObserver !== 'function') return null;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        hydrate(/** @type {HTMLImageElement} */ (entry.target));
        observer.unobserve(entry.target);
      }
    },
    { root, threshold: 0.2 },
  );

  root.querySelectorAll('img[data-src]').forEach((img) => observer.observe(img));
  return observer;
}
