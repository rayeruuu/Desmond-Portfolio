/** Project detail scene — framed media carousel beside the write-up. */

import { getProject } from '../data/projects.js';
import { setImageSource, hydrate } from '../core/images.js';
import { openCodeViewer } from './code-viewer.js';

export function initProject() {
  const slides = document.getElementById('slides');
  const counter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');
  const badge = /** @type {HTMLImageElement} */ (document.getElementById('projectBadge'));
  const titleEl = document.getElementById('projectTitle');
  const categoryEl = document.getElementById('projectCategory');
  const metaEl = document.getElementById('projectMeta');
  const descEl = document.getElementById('projectDesc');
  const featuresEl = document.getElementById('projectFeatures');
  const techEl = document.getElementById('projectTech');
  const actionsEl = document.getElementById('projectActions');

  let slideIndex = 0;
  let slideCount = 0;
  /** @type {import('../data/projects.js').Project | null} */
  let project = null;

  function hydrateSlide(i) {
    const slide = slides.children[i];
    if (!slide || slide.dataset.ready === 'true') return;

    const { type, src, poster } = slide.dataset;

    if (type === 'image') {
      const img = slide.querySelector('img');
      if (img) hydrate(/** @type {HTMLImageElement} */ (img));
    } else if (type === 'local-video') {
      const video = document.createElement('video');
      video.src = src;
      video.poster = poster || '';
      video.controls = true;
      video.playsInline = true;
      // Never fetch 17MB unless the visitor actually presses play.
      video.preload = 'none';
      slide.replaceChildren(video);
    } else if (type === 'embed') {
      const frame = document.createElement('iframe');
      frame.src = src;
      frame.title = `${project?.title ?? 'Project'} gameplay video`;
      frame.allow = 'autoplay; encrypted-media';
      frame.allowFullscreen = true;
      slide.replaceChildren(frame);
    }

    slide.dataset.ready = 'true';
  }

  function showSlide(next) {
    if (slideCount === 0) return;
    slideIndex = Math.max(0, Math.min(next, slideCount - 1));
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;

    hydrateSlide(slideIndex);
    hydrateSlide(slideIndex + 1);

    if (counter) {
      counter.textContent = `${String(slideIndex + 1).padStart(2, '0')} / ${String(slideCount).padStart(2, '0')}`;
    }
    if (prevBtn) prevBtn.disabled = slideIndex === 0;
    if (nextBtn) nextBtn.disabled = slideIndex === slideCount - 1;
  }

  function buildSlides(p) {
    /** @type {string[]} */
    const markup = [];

    if (p.media.localVideo) {
      markup.push(
        `<div class="slide" data-type="local-video" data-src="${p.media.localVideo}" data-poster="${p.media.poster ?? ''}"></div>`,
      );
    }
    if (p.media.video) {
      markup.push(`<div class="slide" data-type="embed" data-src="${p.media.video}"></div>`);
    }
    for (const src of p.media.images) {
      const cover = p.category === '2D' ? '' : ' slide--cover';
      markup.push(
        `<div class="slide${cover}" data-type="image"><img alt="" loading="lazy" decoding="async" data-path="${src}" /></div>`,
      );
    }

    slides.innerHTML = markup.join('');
    slides.querySelectorAll('img[data-path]').forEach((img) => {
      const path = img.dataset.path;
      img.alt = `${p.title} screenshot`;
      delete img.dataset.path;
      setImageSource(/** @type {HTMLImageElement} */ (img), path);
    });

    slideCount = slides.children.length;
    slides.style.transform = 'translateX(0)';
    showSlide(0);
  }

  function buildActions(p) {
    /** @type {string[]} */
    const buttons = [];

    if (p.links.play) {
      buttons.push(
        `<a class="btn btn--primary" href="${p.links.play}" target="_blank" rel="noopener">Get it on Google Play</a>`,
      );
    }
    if (p.links.download) {
      buttons.push(
        `<a class="btn btn--primary" href="${p.links.download}" target="_blank" rel="noopener">Download &amp; play</a>`,
      );
    }
    if (p.links.demo) {
      buttons.push(`<a class="btn" href="${p.links.demo}" target="_blank" rel="noopener">Play the demo</a>`);
    }
    if (p.links.github) {
      buttons.push(`<a class="btn" href="${p.links.github}" target="_blank" rel="noopener">Repository</a>`);
    }
    if (p.snippets.length > 0) {
      buttons.push(`<button class="btn" type="button" data-code>View source</button>`);
    }

    actionsEl.innerHTML = buttons.join('');
    actionsEl.querySelector('[data-code]')?.addEventListener('click', () => openCodeViewer(p));
  }

  /** @param {import('../data/projects.js').Project} p */
  function render(p) {
    project = p;

    const lines = p.titleLines?.length ? p.titleLines : [p.title];
    titleEl.innerHTML = lines
      .map((line, i) =>
        i === lines.length - 1 && lines.length > 1
          ? `<span class="is-accent">${line}</span>`
          : `<span>${line}</span>`,
      )
      .join('<br />');

    setImageSource(badge, p.thumb, { immediate: true, fallback: p.cover });
    badge.alt = '';

    categoryEl.textContent = `${p.category} — ${p.status}`;

    metaEl.innerHTML = [
      ['Year', p.year],
      ['Platform', p.platform],
      ['Role', p.role],
    ]
      .map(([label, value]) => `<div><dt class="u-visually-hidden">${label}</dt><dd>${label} <b>${value}</b></dd></div>`)
      .join('');

    descEl.textContent = p.longDescription || p.summary;

    featuresEl.innerHTML = p.features.map((feature) => `<li><span>${feature}</span></li>`).join('');
    featuresEl.hidden = p.features.length === 0;

    techEl.innerHTML = p.tech.map((tech) => `<span class="chip">${tech}</span>`).join('');

    buildActions(p);
    buildSlides(p);
  }

  prevBtn?.addEventListener('click', () => showSlide(slideIndex - 1));
  nextBtn?.addEventListener('click', () => showSlide(slideIndex + 1));

  // Touch swipe
  let startX = 0;
  slides.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
  slides.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) < 40) return;
    showSlide(delta < 0 ? slideIndex + 1 : slideIndex - 1);
  }, { passive: true });

  return {
    /** @param {Record<string,string>} params */
    onEnter(params) {
      const found = getProject(params.slug);
      if (!found) return false;
      render(found);
      return true;
    },
    onLeave() {
      // Stop any playing media when the scene is left.
      slides.querySelectorAll('video').forEach((video) => video.pause());
      slides.querySelectorAll('iframe').forEach((frame) => frame.remove());
      Array.from(slides.children).forEach((slide) => {
        if (slide.dataset.type === 'embed') slide.dataset.ready = 'false';
      });
    },
    /** @param {KeyboardEvent} event */
    onKey(event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(slideIndex + 1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(slideIndex - 1); }
    },
  };
}
