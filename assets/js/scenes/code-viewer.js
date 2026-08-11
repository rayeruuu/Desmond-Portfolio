/**
 * Source viewer.
 *
 * Prism is pulled in on first open rather than on page load — only four
 * projects ship snippets, so most visitors never pay for the highlighter.
 */

const PRISM_VERSION = '1.29.0';
const PRISM_BASE = `https://cdn.jsdelivr.net/npm/prismjs@${PRISM_VERSION}`;

/** Subresource integrity for the pinned files above. Regenerate if the version moves. */
const PRISM_SRI = Object.freeze({
  theme: 'sha384-wFjoQjtV1y5jVHbt0p35Ui8aV8GVpEZkyF99OXWqP/eNJDU93D3Ugxkoyh6Y2I4A',
  core: 'sha384-BGaNxfftg+9+TtC098wxawPFVEUpKYvaiCgbB0iqAMjK/4jDdmUY+oGxrPNvnXEf',
  csharp: 'sha384-nMKYzg6yfy0qgpaRpVhHvZp0gT5sgvmZYlFC0XAKZSp+zFUB9rE6zsdmIEiou4bV',
});

/** @type {Promise<void> | null} */
let prismReady = null;
/** @type {Map<string, string>} */
const cache = new Map();
/** @type {HTMLElement | null} */
let lastFocused = null;

function loadPrism() {
  if (prismReady) return prismReady;

  prismReady = new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${PRISM_BASE}/themes/prism-tomorrow.min.css`;
    link.integrity = PRISM_SRI.theme;
    link.crossOrigin = 'anonymous';
    document.head.append(link);

    const core = document.createElement('script');
    core.src = `${PRISM_BASE}/prism.min.js`;
    core.integrity = PRISM_SRI.core;
    core.crossOrigin = 'anonymous';
    core.onload = () => {
      const csharp = document.createElement('script');
      csharp.src = `${PRISM_BASE}/components/prism-csharp.min.js`;
      csharp.integrity = PRISM_SRI.csharp;
      csharp.crossOrigin = 'anonymous';
      // Resolve either way: without the grammar the source still renders plain.
      csharp.onload = () => resolve();
      csharp.onerror = () => resolve();
      document.head.append(csharp);
    };
    core.onerror = () => resolve();
    document.head.append(core);
  });

  return prismReady;
}

/**
 * Read a snippet off disk.
 *
 * Failures are reported with the reason rather than a bare "could not load",
 * because the overwhelmingly common cause — the page being opened straight from
 * disk — has a specific fix the visitor can act on.
 *
 * @param {string} path
 * @returns {Promise<string>}
 */
async function fetchSnippet(path) {
  if (cache.has(path)) return cache.get(path);

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`the server answered ${response.status} ${response.statusText}`);
    const text = await response.text();
    cache.set(path, text);
    return text;
  } catch (error) {
    return failureNote(path, error);
  }
}

/** @param {string} path @param {unknown} error @returns {string} */
function failureNote(path, error) {
  const url = new URL(path, window.location.href).href;
  const reason = error instanceof Error ? error.message : String(error);

  if (window.location.protocol === 'file:') {
    return [
      '// This source file could not be read.',
      '//',
      '// The page is open directly from your disk (file://), and browsers',
      '// refuse to read local files that way — there is no way around it from',
      '// inside the page.',
      '//',
      '// Fix: serve the folder over HTTP. Double-click serve.bat in the',
      '// project root, or run:  python -m http.server 8000',
      '// Then open http://localhost:8000',
      '//',
      '// On GitHub Pages this already works, with nothing extra to do.',
      '//',
      `// Tried: ${url}`,
      `// Reason: ${reason}`,
    ].join('\n');
  }

  return [
    '// This source file could not be read.',
    '//',
    `// Tried: ${url}`,
    `// Reason: ${reason}`,
  ].join('\n');
}

/** @param {import('../data/projects.js').Project} project */
export function openCodeViewer(project) {
  const overlay = document.getElementById('codeOverlay');
  const tabsEl = document.getElementById('codeTabs');
  const titleEl = document.getElementById('codeTitle');
  const codeEl = document.getElementById('codeContent');
  if (!overlay || !project.snippets.length) return;

  lastFocused = /** @type {HTMLElement} */ (document.activeElement);

  tabsEl.innerHTML = project.snippets
    .map(
      (snippet, i) =>
        `<button class="code-tab" type="button" role="tab" data-snippet="${i}"
          aria-selected="${i === 0}">${snippet.title}</button>`,
    )
    .join('');

  async function select(i) {
    const snippet = project.snippets[i];
    titleEl.textContent = `${project.title} — ${snippet.title}`;
    tabsEl.querySelectorAll('[data-snippet]').forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === i));
    });

    codeEl.textContent = 'Loading…';
    const [source] = await Promise.all([fetchSnippet(snippet.path), loadPrism()]);
    codeEl.textContent = source;
    codeEl.className = `language-${snippet.language}`;
    if (window.Prism) window.Prism.highlightElement(codeEl);
  }

  tabsEl.onclick = (event) => {
    const tab = /** @type {HTMLElement} */ (event.target).closest('[data-snippet]');
    if (tab) select(Number(tab.dataset.snippet));
  };

  overlay.classList.add('is-open');
  document.getElementById('codeClose')?.focus();
  select(0);
}

export function closeCodeViewer() {
  const overlay = document.getElementById('codeOverlay');
  if (!overlay?.classList.contains('is-open')) return false;
  overlay.classList.remove('is-open');
  lastFocused?.focus();
  return true;
}

export function isCodeViewerOpen() {
  return Boolean(document.getElementById('codeOverlay')?.classList.contains('is-open'));
}
