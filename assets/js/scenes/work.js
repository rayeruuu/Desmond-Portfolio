/** Work deck — a horizontal run of portrait cards with one active at a time. */

import { PROJECTS, CATEGORY_ORDER, filterProjects } from '../data/projects.js';
import { setImageSource } from '../core/images.js';
import { stagger } from '../core/motion.js';

export function initWork() {
  const deck = document.getElementById('deck');
  const filtersEl = document.getElementById('filters');
  const counter = document.getElementById('deckCounter');
  if (!deck || !filtersEl) return { onEnter() {} };

  let filter = 'All';
  let active = 0;
  /** @type {import('../data/projects.js').Project[]} */
  let items = [];

  filtersEl.innerHTML = CATEGORY_ORDER.map(
    (name) =>
      `<button class="filter" type="button" role="tab" data-filter="${name}"
        aria-selected="${name === 'All'}">${name === 'All' ? 'All' : name}</button>`,
  ).join('');

  function renderDeck() {
    items = filterProjects(filter);
    active = 0;

    if (items.length === 0) {
      deck.innerHTML = '<p class="deck__empty">Nothing here yet.</p>';
      if (counter) counter.textContent = '00 / 00';
      return;
    }

    deck.innerHTML = items
      .map(
        (project, i) => `
        <a class="card${i === 0 ? ' is-active' : ''}${project.highlight ? ' is-highlight' : ''}"
           role="listitem"
           href="#/work/${project.slug}"
           data-card="${i}"
           aria-label="${project.title} — ${project.category}, ${project.year}, ${project.status}">
          ${project.status === 'Released' ? '<span class="card__badge">Released</span>' : ''}
          <span class="card__caret" aria-hidden="true"></span>
          <span class="card__art">
            <img alt="" decoding="async" draggable="false" />
          </span>
          <span class="card__foot">
            <span class="card__name">${project.title}</span>
            <span class="card__idx">${String(i + 1).padStart(2, '0')}</span>
          </span>
          <span class="card__bar" aria-hidden="true"></span>
        </a>`,
      )
      .join('');

    // Local thumbnails, with the full cover as a fallback. Deliberately not
    // lazy-loaded: inside this fixed, filtered, horizontally-scrolled container
    // Chrome never treats the cards as near-viewport and defers them forever.
    // All 16 thumbnails together are ~175 KB, so there is nothing to defer.
    deck.querySelectorAll('.card').forEach((card, i) => {
      const img = card.querySelector('img');
      if (img) {
        setImageSource(img, items[i].thumb, { immediate: true, fallback: items[i].cover });
      }
    });

    stagger(deck, '.card');
    setActive(0, { scroll: false });
  }

  function setActive(next, { scroll = true } = {}) {
    if (items.length === 0) return;
    active = Math.max(0, Math.min(next, items.length - 1));

    deck.querySelectorAll('.card').forEach((card, i) => {
      card.classList.toggle('is-active', i === active);
    });

    if (counter) {
      counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    }

    if (scroll) {
      const card = deck.querySelector(`[data-card="${active}"]`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  filtersEl.addEventListener('click', (event) => {
    const button = /** @type {HTMLElement} */ (event.target).closest('[data-filter]');
    if (!button) return;
    filter = button.dataset.filter;
    filtersEl.querySelectorAll('[data-filter]').forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === button));
    });
    renderDeck();
  });

  deck.addEventListener('pointerenter', (event) => {
    const card = /** @type {HTMLElement} */ (event.target).closest?.('[data-card]');
    if (card) setActive(Number(card.dataset.card), { scroll: false });
  }, true);

  deck.addEventListener('focusin', (event) => {
    const card = /** @type {HTMLElement} */ (event.target).closest('[data-card]');
    if (card) setActive(Number(card.dataset.card));
  });

  // Turn vertical wheel input into horizontal travel across the deck.
  deck.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    deck.scrollLeft += event.deltaY;
  }, { passive: false });

  /* -- Click-and-drag panning ------------------------------------------- */

  const DRAG_THRESHOLD = 6;
  let pointerDown = false;
  let panning = false;
  let suppressNextClick = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  deck.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || event.pointerType === 'touch') return;
    pointerDown = true;
    panning = false;
    // Reset here rather than on a timer: every interaction starts clean, so a
    // drag that never produced a click cannot swallow the next real one.
    suppressNextClick = false;
    dragStartX = event.clientX;
    dragStartScroll = deck.scrollLeft;
  });

  deck.addEventListener('pointermove', (event) => {
    if (!pointerDown) return;
    const dx = event.clientX - dragStartX;

    // Capture is deliberately deferred until the pointer has clearly moved.
    // Capturing on pointerdown retargets the following click to the deck, and
    // the card's link would never receive it — so a plain click did nothing.
    if (!panning) {
      if (Math.abs(dx) <= DRAG_THRESHOLD) return;
      panning = true;
      deck.classList.add('is-dragging');
      deck.setPointerCapture(event.pointerId);
    }

    deck.scrollLeft = dragStartScroll - dx;
  });

  function endDrag(event) {
    if (!pointerDown) return;
    pointerDown = false;

    if (panning) {
      suppressNextClick = true;
      if (deck.hasPointerCapture?.(event.pointerId)) {
        deck.releasePointerCapture(event.pointerId);
      }
    }

    panning = false;
    deck.classList.remove('is-dragging');
  }

  deck.addEventListener('pointerup', endDrag);
  deck.addEventListener('pointercancel', endDrag);

  // A drag ends in a click wherever the pointer landed. Swallow that one so
  // panning the deck never navigates. Capture phase, ahead of the link.
  deck.addEventListener('click', (event) => {
    if (!suppressNextClick) return;
    suppressNextClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  // Cards are links wrapping images; both have native drag behaviour.
  deck.addEventListener('dragstart', (event) => event.preventDefault());

  renderDeck();

  return {
    onEnter() {
      // The deck keeps its scroll offset between visits, which can leave the
      // active card off-screen. Bring it back without an animated jump.
      if (active === 0) {
        deck.scrollLeft = 0;
      } else {
        deck.querySelector(`[data-card="${active}"]`)
          ?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
      }
      setActive(active, { scroll: false });
    },
    /** @param {KeyboardEvent} event */
    onKey(event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActive(active + 1);
        deck.querySelector(`[data-card="${active}"]`)?.focus();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActive(active - 1);
        deck.querySelector(`[data-card="${active}"]`)?.focus();
      }
    },
  };
}

export const PROJECT_COUNT = PROJECTS.length;
