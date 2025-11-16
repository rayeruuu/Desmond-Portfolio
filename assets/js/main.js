// ----- Config: personalize here -----
const CONFIG = {
  name: "Desmond",
  email: "ryelnadela@gmail.com",
  github: "rayeruu",
  photo: "assets/images/picture.png", // place your photo here
};

// Sample projects. Edit or add more.
const PROJECTS = [
  {
    title: "Lucid",
    category: "Unity",
    description: "Atmospheric first-person puzzle prototype exploring light-bending mechanics and spatial memory.",
    longDescription: "Lucid Dreams plunges players into a surreal, dreamlike universe where the ordinary becomes bizarre and anything can turn hostile. Battle animated objects, explore unpredictable dreamscapes, and tackle physics-driven challenges in a world where each dream is a chaotic story of humor and surprises.",
    contribution: "Group project – Programmed enemy pathfinding and AI behaviors, player movement and animation trees, and developed UI and scoring systems.",
    featureList: [
      "Surreal dreamlike environments",
      "AI-driven enemy behaviors",
      "Physics-based interactions",
      "Player movement and animation trees",
      "Scoring and UI systems"
    ],
    techChips: ["Unity", "C#"],
    tags: ["Unity", "C#", "Puzzle"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/unity/Lucid/lucid (1).png",
    media: {
      images: [
        "assets/images/projects/unity/Lucid/lucid (1).png",
        "assets/images/projects/unity/Lucid/lucid (2).png",
        "assets/images/projects/unity/Lucid/lucid (3).png",
        "assets/images/projects/unity/Lucid/lucid (4).png",
        "assets/images/projects/unity/Lucid/lucid (5).png"
      ],
      video: "https://drive.google.com/file/d/1NBcFozqHpP69vo9QmxafhTvC09O-81e6/preview"
    },
    snippets: [
      { title: "Interactable trigger", language: "csharp", code: "void HandleTrigger(Collider other) {\n    if(!other.CompareTag(\"Player\")) return;\n    portal.Enable();\n}" }
    ]
  },
  {
    title: "MinaTamis",
    category: "Unity",
    description: "Narrative-driven Unity experience showing a stylized food cart journey with custom shaders and lighting.",
    longDescription: "MinaTamis is a 3D Filipino Dessert Simulator for PC that immerses players in the world of traditional Filipino desserts. Explore interactive shops, serve customers, and customize your culinary space while enjoying a day-night cycle that makes each gameplay session feel dynamic. The game is designed for TVL-Culinary strand students and highlights Filipino culinary culture through engaging and educational simulation mechanics.",
    contribution: "Group Capstone project – Co-programmed the entire game, implementing cooking and food preparation mechanics, NPC spawning, day-night cycle, audio, UI elements, AI pathfinding, and optimized level layouts and scripts.",
    featureList: [
      "3D interactive Filipino dessert simulation",
      "Day-night cycle influencing gameplay",
      "Customer interactions with AI behavior",
      "Customizable shop elements",
      "Optimized levels and responsive gameplay"
    ],
    techChips: ["Unity", "Maya", "C#"],
    tags: ["Unity", "Narrative", "Cinematics"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/unity/Minatamis/mina (1).png",
    media: {
      images: [
        "assets/images/projects/unity/Minatamis/mina (1).png",
        "assets/images/projects/unity/Minatamis/mina (2).png",
        "assets/images/projects/unity/Minatamis/mina (3).png",
        "assets/images/projects/unity/Minatamis/mina (4).png",
        "assets/images/projects/unity/Minatamis/mina (5).png"
      ],
      video: "https://drive.google.com/file/d/1FyTz4Chh6lSmGJ2TwW1z5zTHkbraOE50/preview"
    },
    snippets: []
  },
  {
    title: "Bricks",
    category: "Unity",
    description: "Fast-paced brick breaker prototype with responsive paddle controls and escalating waves.",
    longDescription: "Bricks is a fast-paced, touch-controlled arcade game inspired by Arkanoid. Players control a paddle to bounce a ball and break bricks across increasingly difficult levels. Grab power-ups, dodge obstacles, and master precise timing to keep the ball in play. Its simple mechanics are easy to pick up, while the escalating challenge keeps players engaged.",
    contribution: "Solo project – Designed and implemented the core game loop, paddle and ball physics, scoring system, UI polish, and difficulty tuning to maximize player satisfaction.",
    featureList: [
      "Touch-controlled paddle mechanics",
      "Dynamic brick-breaking levels",
      "Power-ups like paddle expansion",
      "Scoring system with increasing difficulty",
      "Quick-play arcade gameplay"
    ],
    techChips: ["Unity", "C#"],
    tags: ["Unity", "Arcade", "Prototype"],
    links: { demo: "https://sekiroooo.itch.io/bricks", github: "#" },
    image: "assets/images/projects/unity/Bricks/bricks (1).png",
    media: {
      images: [
        "assets/images/projects/unity/Bricks/bricks (3).png",
        "assets/images/projects/unity/Bricks/bricks (1).png",
        "assets/images/projects/unity/Bricks/bricks (2).png"
      ],
      video: "https://drive.google.com/file/d/1D1E4TB_rrxuAILsILRqQ-Wj514YwBby5/preview"
    },
    snippets: []
  },
  {
    title: "Isolation Protocol",
    category: "Unity",
    description: "Mobile FPS set in a neon training facility where defeating mannequins unlocks the boss chamber.",
    longDescription: "This Unity-made mobile first-person shooter takes place inside a futuristic sci-fi firing range designed as a combat simulation chamber. Players must navigate neon-lit corridors, collect ammo from glowing supply pads, and eliminate ten hostile training mannequins scattered across the arena. Each mannequin behaves like a lightweight enemy drone, moving, dodging, or firing back with basic energy shots. Once all ten are defeated, the sealed blast doors unlock, granting access to the boss room where the real challenge begins.",
    contribution: "Developed all game mechanics, mobile controls, and the overall core program functionality for the project.",
    featureList: [
      "Sci-fi firing range environment",
      "Ten reactive combat mannequins to eliminate",
      "Unlockable boss room after all mannequins are defeated",
      "Multiple futuristic weapons",
      "Ammo and health stations",
      "Smooth and responsive Unity FPS mobile controls",
      "Optimized performance for mobile devices",
      "Dynamic lighting and VFX for an immersive but lightweight experience"
    ],
    techChips: ["Unity", "C#", "FPS", "Mobile"],
    tags: ["Unity", "Shooter", "Mobile"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/unity/Isolation Protocol/Iso.jpg",
    media: {
      images: [
        "assets/images/projects/unity/Isolation Protocol/Iso.jpg",
        "assets/images/projects/unity/Isolation Protocol/Iso2.jpg",
        "assets/images/projects/unity/Isolation Protocol/Iso3.jpg",
        "assets/images/projects/unity/Isolation Protocol/Iso4.jpg",
        "assets/images/projects/unity/Isolation Protocol/Iso5.jpg"
      ],
      video: "https://drive.google.com/file/d/1Au0cSsMGTSm7cQOTyQjkv_Q6Ui4Ib8kS/preview"
    },
    snippets: []
  },
  {
    title: "Helicopter Animation",
    category: "3D",
    description: "Keyframed helicopter animation rendered with dramatic lighting and camera sweeps.",
    tags: ["3D", "Animation", "Maya"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/3d/helicopter/heli 1.jpg",
    media: {
      images: [
        "assets/images/projects/3d/helicopter/heli 1.jpg",
        "assets/images/projects/3d/helicopter/heli 2.jpg",
        "assets/images/projects/3d/helicopter/heli 3.jpg"
      ],
      video: "https://drive.google.com/file/d/1XNg_NEKW0zxBe3zq8Kp0ytn_Yt0xAAlX/preview"
    }
  },
  {
    title: "Ball Animation Study",
    category: "3D",
    description: "Squash-and-stretch exploration using timing charts and graph editor passes.",
    tags: ["Animation", "Practice"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/3d/ball animation/ball (1).png",
    media: {
      images: [
        "assets/images/projects/3d/ball animation/ball (1).png",
        "assets/images/projects/3d/ball animation/ball (2).png",
        "assets/images/projects/3d/ball animation/ball (3).png",
        "assets/images/projects/3d/ball animation/ball (4).png"
      ],
      video: "https://drive.google.com/file/d/1J6kfTYUM1EO41pBQI0_Zx3a0aWHg_o0L/preview"
    }
  },
  {
    title: "Bazooka Prop",
    category: "3D",
    description: "Stylized bazooka optimized for real-time engines with baked normals and hand-painted passes.",
    tags: ["3D", "Prop", "Game Ready"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/3d/bazooka/bazooka 1.jpg",
    media: {
      images: [
        "assets/images/projects/3d/bazooka/bazooka 1.jpg",
        "assets/images/projects/3d/bazooka/bazooka 2.jpg",
        "assets/images/projects/3d/bazooka/bazooka 3.jpg"
      ],
      video: null
    }
  },
  {
    title: "Galactic Force",
    category: "Unity",
    description: "Arcade shooter built in Unity featuring parallax space fields, boss waves, and power-ups.",
    longDescription: "Galactic Force is a thrilling single-player space shooter where players pilot a lone starfighter through waves of relentless enemies and hazardous space objects. Dodge attacks, manage your health, and survive to face a challenging final boss. Each stage tests skill, strategy, and reflexes, with final scores displayed to showcase mastery.",
    contribution: "Group project – Co-programmed the entire game, implementing enemy mechanics, UI, audio, optimized scripts, and level layouts.",
    featureList: [
      "Free-direction starfighter movement",
      "Enemy waves with attack patterns",
      "Randomly floating hazards",
      "Health and lives system",
      "Epic final boss battle"
    ],
    techChips: ["Unity", "C#", "Shooter"],
    tags: ["Unity", "Shooter", "Arcade"],
    links: { demo: "https://sekiroooo.itch.io/galacticforce", github: "#" },
    image: "assets/images/projects/unity/GalacticForce/galactic (1).png",
    media: {
      images: [
        "assets/images/projects/unity/GalacticForce/galactic (1).png",
        "assets/images/projects/unity/GalacticForce/galactic (2).png",
        "assets/images/projects/unity/GalacticForce/galactic (3).png"
      ],
      video: "https://drive.google.com/file/d/1bIR600Kl0BniRslWs0wincElMbsIZPyw/preview"
    },
    snippets: [
      {
        title: "GalacticForce/Game.txt",
        language: "csharp",
        path: "assets/scripts/cs/Game.txt"
      }
    ]
  },
  {
    title: "Hollow Maze",
    category: "Unity",
    description: "First-person horror maze prototype with basic enemy AI and tense atmosphere.",
    longDescription: "Hollow Maze is a mini horror game inspired by Pac-Man. Navigate randomized mazes to collect all the orbs while avoiding four aggressive ghosts. Players must strategize their movements or risk losing all lives in this tense, fast-paced arcade experience.",
    contribution: "Solo project – Designed and implemented the core game loop, AI pathfinding, scoring system, lighting, maze layout randomizer, and polished the UI for immersive gameplay.",
    featureList: [
      "Randomized maze generation",
      "Ghost AI with pathfinding",
      "Collectible orbs as objectives",
      "Tension-filled arcade horror mechanics",
      "Score tracking and UI polish"
    ],
    techChips: ["Unity", "C#", "Horror"],
    tags: ["Unity", "Horror", "Maze"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/unity/HollowMaze/hollow (1).png",
    media: {
      images: [
        "assets/images/projects/unity/HollowMaze/hollow (1).png",
        "assets/images/projects/unity/HollowMaze/hollow (2).png",
        "assets/images/projects/unity/HollowMaze/hollow (3).png",
        "assets/images/projects/unity/HollowMaze/hollow (4).png",
        "assets/images/projects/unity/HollowMaze/hollow (5).png"
      ],
      video: "https://drive.google.com/file/d/12cCn5XiL4bzTy_YICOvjLrjbY-yhCTgq/preview"
    },
    snippets: [
      {
        title: "HollowMaze/Game.txt",
        language: "csharp",
        path: "assets/scripts/cs/Game.txt"
      }
    ]
  },
  {
    title: "Hard-Surface Washer",
    category: "3D",
    description: "PBR washer/dryer study focused on edge wear and clean curvature.",
    tags: ["3D", "Hard Surface"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/3d/washing machine/washing machine(angle 1).jpg",
    media: {
      images: [
        "assets/images/projects/3d/washing machine/washing machine(angle 1).jpg",
        "assets/images/projects/3d/washing machine/washing machine (angle 2).jpg",
        "assets/images/projects/3d/washing machine/washing machine(angle 3).jpg",
        "assets/images/projects/3d/washing machine/washing machine(angle 4).jpg"
      ],
      video: null
    }
  },
  {
    title: "Heavy Weapon Kit",
    category: "3D",
    description: "Fantasy warhammer variations sculpted for cinematic close-ups.",
    tags: ["3D", "Weapon", "ZBrush"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/3d/warhammer/weapon.jpg",
    media: {
      images: [
        "assets/images/projects/3d/warhammer/weapon.jpg",
        "assets/images/projects/3d/warhammer/weapon 1.jpg",
        "assets/images/projects/3d/warhammer/weapon 2.jpg"
      ],
      video: null
    }
  },
  {
    title: "Chess Wall Diorama",
    category: "3D",
    description: "Wall-mounted chess board render experimenting with glossy materials and rim lighting.",
    tags: ["3D", "Lighting"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/3d/wall chess board/chess 3.jpg",
    media: {
      images: [
        "assets/images/projects/3d/wall chess board/chess.jpg",
        "assets/images/projects/3d/wall chess board/chess 2.jpg",
        "assets/images/projects/3d/wall chess board/chess 3.jpg",
        "assets/images/projects/3d/wall chess board/chess 4.jpg",
        "assets/images/projects/3d/wall chess board/chess 5.jpg"
      ],
      video: null
    }
  },
  {
    title: "Pixel Produce Pack",
    category: "2D",
    description: "A hand-crafted set of fruit sprites ready for platformers and cozy farming sims.",
    tags: ["2D", "Pixel Art", "UI"],
    links: { demo: "#", github: "#" },
    image: "assets/images/projects/2d/apple.png",
    media: {
      images: [
        "assets/images/projects/2d/apple.png",
        "assets/images/projects/2d/banana.png",
        "assets/images/projects/2d/orange.png",
        "assets/images/projects/2d/watermelon.png",
        "assets/images/projects/2d/trees.png",
        "assets/images/projects/2d/grass.png",
        "assets/images/projects/2d/bluebird.png"
      ],
      video: null
    }
  }
];

// ----- Runtime -----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
const snippetCache = new Map();

// Personalize text
const heroName = document.querySelector(".hero h1 span");
const resolvedName = (CONFIG.name && CONFIG.name !== "Your Name")
  ? CONFIG.name
  : (heroName?.textContent?.trim() || "Your Name");
const brand = document.querySelector(".brand");
if (brand) brand.textContent = `<${resolvedName.split(" ")[0]}'s Portfolio />`;
if (heroName) heroName.textContent = resolvedName;
const githubLink = document.getElementById("githubLink");
if (githubLink) githubLink.href = `https://github.com/${CONFIG.github}`;
const heroPhoto = document.getElementById("heroPhoto");
if (heroPhoto && CONFIG.photo) {
  heroPhoto.src = CONFIG.photo;
  heroPhoto.alt = resolvedName;
  heroPhoto.addEventListener('error', () => { heroPhoto.style.display = 'none'; });
}

// Email utilities
const displayEmail = document.getElementById("displayEmail");
const mailtoLink = document.getElementById("mailtoLink");
if (displayEmail) displayEmail.textContent = CONFIG.email;
if (mailtoLink) mailtoLink.href = `mailto:${CONFIG.email}`;

const copyEmailBtn = document.getElementById("copyEmail");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      copyEmailBtn.textContent = "Copied";
      setTimeout(() => (copyEmailBtn.textContent = "Copy"), 1200);
    } catch (e) {
      alert("Copy failed. Your email: " + CONFIG.email);
    }
  });
}

// Contact form -> mailto
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject") || `Message from ${name}`;
    const message = formData.get("message");
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    const mailto = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
  });
}

// Hard-code dark theme (no light mode toggle)
(function initTheme(){
  const root = document.documentElement;
  root.classList.remove('light');
  localStorage.removeItem('theme');
})();

// Render projects
const grid = document.getElementById("projectsGrid");
const paginationEl = document.getElementById("projectsPagination");
const filterButtons = Array.from(document.querySelectorAll(".filter"));
let activeFilter = "All";
let currentPage = 0;
const PAGE_SIZE = 6;

function renderProjects() {
  if (!grid) return;
  grid.innerHTML = "";
  const items = PROJECTS.filter(p => activeFilter === "All" || p.category === activeFilter);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  if (currentPage >= totalPages) currentPage = totalPages - 1;
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const visibleItems = items.slice(start, end);
  for (const p of visibleItems) {
    const card = document.createElement("article");
    card.className = "card is-clickable";
    const projectIndex = PROJECTS.indexOf(p);
    card.dataset.index = String(projectIndex);
    // Make whole card open the modal (and keyboard accessible)
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.setAttribute('aria-label', `Open details: ${p.title}`);
    const open = () => openProjectModal(projectIndex);
    card.addEventListener('click', (e) => {
      // Don't open when clicking interactive links inside
      if (e.target.closest('a')) return;
      playClickAnimation(card, e);
      // slight delay to let the animation register visually
      setTimeout(open, 120);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playClickAnimation(card, e); setTimeout(open, 120); }
    });

    const media = document.createElement("div");
    media.className = "card-media";
    const coverImage = p.image || (Array.isArray(p.media?.images) && p.media.images.length ? p.media.images[0] : null);
    if (coverImage) {
      const img = document.createElement("img");
      img.src = coverImage; img.alt = `${p.title} cover`;
      img.loading = "lazy"; img.decoding = "async";
      media.appendChild(img);
    } else {
      media.appendChild(createPlaceholder());
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const h3 = document.createElement("h3");
    h3.textContent = p.title;

    const desc = document.createElement("p");
    desc.textContent = p.description;

    const tags = document.createElement("div");
    tags.className = "tags";
    for (const t of p.tags ?? []) {
      const el = document.createElement("span");
      el.className = "tag"; el.textContent = t;
      tags.appendChild(el);
    }

    // No card-level actions; all actions live inside the modal for a cleaner grid
    body.append(h3, desc, tags);
    card.append(media, body);
    grid.appendChild(card);
  }

  // Render pagination buttons
  if (paginationEl) {
    paginationEl.innerHTML = "";
    if (totalPages > 1) {
      for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = String(i + 1);
        if (i === currentPage) btn.classList.add("is-active");
        btn.addEventListener("click", () => {
          currentPage = i;
          renderProjects();
        });
        paginationEl.appendChild(btn);
      }
    }
  }
}

function getPrimarySnippet(project) {
  if (!project) return null;
  const list = Array.isArray(project.snippets) ? project.snippets : [];
  return list.length ? list[0] : null;
}

async function showProjectCode(project) {
  const snippet = getPrimarySnippet(project);
  if (!snippet) return;
  try {
    await ensureSnippetLoaded(snippet);
  } catch (err) {
    if (!snippet._loadedText) {
      snippet._loadedText = `Unable to load snippet${snippet.path ? ` from ${snippet.path}` : ''}.`;
    }
  }
  openCodeOverlay(snippet);
}

async function ensureSnippetLoaded(snippet) {
  if (!snippet) return null;
  if (snippet._loadedText) return snippet._loadedText;
  if (snippet.code) {
    snippet._loadedText = snippet.code;
    return snippet._loadedText;
  }
  if (!snippet.path) {
    snippet._loadedText = 'No code provided.';
    return snippet._loadedText;
  }
  if (snippetCache.has(snippet.path)) {
    snippet._loadedText = snippetCache.get(snippet.path);
    return snippet._loadedText;
  }
  const res = await fetch(snippet.path);
  if (!res.ok) throw new Error(res.statusText || 'Failed to load snippet');
  const text = await res.text();
  snippetCache.set(snippet.path, text);
  snippet._loadedText = text;
  return text;
}

function createPlaceholder(){
  const ph = document.createElement("div");
  ph.className = "placeholder";
  return ph;
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    // a11y: update aria-selected
    filterButtons.forEach(b => b.setAttribute("aria-selected", String(b === btn)));
    activeFilter = btn.dataset.filter;
    currentPage = 0; // reset to first page on filter change
    renderProjects();
  });
});

renderProjects();

// Initialize dot meters (skill level indicators)
function initDotMeters(){
  const tiers = { 'Beginner':2, 'Intermediate':3, 'Strong':4, 'Advanced':5 };
  document.querySelectorAll('.meter.dots').forEach(m => {
    const level = Number(m.dataset.level || 0);
    // build dots
    m.innerHTML = '';
    const total = 5;
    for (let i=1;i<=total;i++){
      const dot = document.createElement('span');
      if (i>level) dot.classList.add('off');
      dot.setAttribute('aria-hidden','true');
      m.appendChild(dot);
    }
    // accessible label: derive card heading + textual tier
    const card = m.closest('.stack-item');
    const heading = card?.querySelector('h3')?.textContent?.trim() || 'Skill';
    // attempt to reverse-map numeric level to tier string
    let tierName = Object.keys(tiers).find(k => tiers[k] === level) || `${level}/5`;
    m.setAttribute('role','img');
    m.setAttribute('aria-label', `${heading} level: ${tierName} (${level} of 5)`);
  });
}
initDotMeters();

// Hero intro animation
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('hero-loaded'));
  }
});

// Scroll reveal (gentle)
const revealEls = Array.from(document.querySelectorAll('.reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in');
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
  revealEls.forEach(el => io.observe(el));
}

// Analytics helpers (Plausible)
function track(event, props){
  if (typeof window.plausible === 'function') {
    window.plausible(event, { props });
  }
}

// Track project link clicks
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const card = a.closest('.card');
  if (card) {
    const title = card.querySelector('h3')?.textContent || 'Unknown';
    const kind = a.textContent?.trim().toLowerCase();
    track('Project Click', { title, kind });
  }
});

// Emoji feedback bar
(function initFeedback(){
  const bar = document.querySelector('.emoji-bar');
  const thanks = document.getElementById('feedbackThanks');
  if (!bar) return;
  const KEY = 'portfolio_feedback_given';
  const given = localStorage.getItem(KEY) === '1';
  if (given && thanks) {
    thanks.hidden = false;
  }
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.emoji');
    if (!btn) return;
    if (localStorage.getItem(KEY) === '1') return;
    const reaction = btn.dataset.reaction;
    track('Feedback', { reaction });
    localStorage.setItem(KEY, '1');
    if (thanks) thanks.hidden = false;
  });
})();

// ---------- Project Modal ----------
let currentProject = null;
let currentSlide = 0;

const modal = document.getElementById('projectModal');
const slidesEl = document.getElementById('carouselSlides');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalLinks = document.getElementById('modalLinks');
const modalLongSection = document.getElementById('modalLongSection');
const modalLongDesc = document.getElementById('modalLongDesc');
const modalContributionSection = document.getElementById('modalContributionSection');
const modalContribution = document.getElementById('modalContribution');
const modalFeaturesSection = document.getElementById('modalFeaturesSection');
const modalFeatures = document.getElementById('modalFeatures');
const modalTechChips = document.getElementById('modalTechChips');
const codeOverlay = document.getElementById('codeOverlay');
const codeOverlayPre = document.getElementById('codeOverlayPre');
const codeOverlayContent = document.getElementById('codeOverlayContent');
const codeOverlayFrame = document.getElementById('codeOverlayFrame');
const codeOverlayTitle = document.getElementById('codeOverlayTitle');

function lockScroll(){ document.body.style.overflow = 'hidden'; }
function unlockScroll(){
  const modalOpen = modal && modal.getAttribute('aria-hidden') === 'false';
  const overlayOpen = codeOverlay && codeOverlay.getAttribute('aria-hidden') === 'false';
  if (!modalOpen && !overlayOpen) document.body.style.overflow = '';
}

function openProjectModal(index){
  currentProject = PROJECTS[index];
  if (!currentProject || !modal) return;
  // Populate basic fields
  modalTitle.textContent = currentProject.title;
  // We no longer show the short card description or tags inside the modal body.
  // Extended description
  if (modalLongSection && modalLongDesc) {
    const longText = currentProject.longDescription || currentProject.description || '';
    modalLongDesc.textContent = longText;
    modalLongSection.hidden = !longText;
  }
  // Contribution
  if (modalContributionSection && modalContribution) {
    const contrib = currentProject.contribution || '';
    modalContribution.textContent = contrib;
    modalContributionSection.hidden = !contrib;
  }
  // Key features list
  if (modalFeaturesSection && modalFeatures) {
    modalFeatures.innerHTML = '';
    const features = Array.isArray(currentProject.featureList) ? currentProject.featureList : [];
    if (features.length) {
      for (const f of features) {
        const li = document.createElement('li');
        li.textContent = f;
        modalFeatures.appendChild(li);
      }
      modalFeaturesSection.hidden = false;
    } else {
      modalFeaturesSection.hidden = true;
    }
  }
  // Tech chips row
  if (modalTechChips) {
    modalTechChips.innerHTML = '';
    const chips = Array.isArray(currentProject.techChips) ? currentProject.techChips : [];
    for (const c of chips) {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = c;
      modalTechChips.appendChild(chip);
    }
  }

  const imgs = Array.isArray(currentProject.media?.images)
    ? [...currentProject.media.images]
    : [];
  if (!imgs.length && currentProject.image) imgs.push(currentProject.image);
  const video = currentProject.media?.video || null;
  const videoSlideIndex = video ? imgs.length : null;

  modalLinks.innerHTML = '';
  const primarySnippet = getPrimarySnippet(currentProject);
  // Show Demo (if available) and Code (if available) inside the modal
  if (currentProject.links?.demo && currentProject.links.demo !== '#') {
    const a = document.createElement('a');
    a.href = currentProject.links.demo;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'btn btn-outline';
    a.textContent = 'Demo';
    modalLinks.appendChild(a);
  }
  if (videoSlideIndex !== null) {
    const videoBtn = document.createElement('button');
    videoBtn.type = 'button';
    videoBtn.className = 'btn btn-outline';
    videoBtn.textContent = 'Video';
    videoBtn.addEventListener('click', () => {
      stopAutoplay();
      currentSlide = videoSlideIndex;
      updateCarousel();
      startAutoplay();
      track('Carousel Jump Video', { title: currentProject.title });
    });
    modalLinks.appendChild(videoBtn);
  }
  if (primarySnippet) {
    const codeBtn = document.createElement('button');
    codeBtn.type = 'button';
    codeBtn.className = 'btn btn-outline';
    codeBtn.textContent = 'Code';
    codeBtn.addEventListener('click', () => showProjectCode(currentProject));
    modalLinks.appendChild(codeBtn);
  }
  // Removed GitHub Code button to keep everything inline.

  // Build slides
  slidesEl.innerHTML = '';
  const slides = [];
  const useContain = currentProject.category === '2D';
  for (const src of imgs){
    const s = document.createElement('div'); s.className = 'slide';
    if (useContain) s.classList.add('slide-contain');
    const img = document.createElement('img'); img.src = src; img.alt = `${currentProject.title} image`; img.loading='lazy'; img.decoding='async';
    s.appendChild(img); slides.push(s);
  }
  if (video){
    const s = document.createElement('div'); s.className = 'slide';
    if (useContain) s.classList.add('slide-contain');
    const iframe = document.createElement('iframe');
    iframe.src = video;
    iframe.title = currentProject.title + ' video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    s.appendChild(iframe);
    slides.push(s);
  }
  if (slides.length === 0){
    const s = document.createElement('div'); s.className = 'slide'; const ph = document.createElement('div'); ph.className='placeholder'; ph.style.width='100%'; ph.style.height='100%'; s.appendChild(ph); slides.push(s);
  }
  for (const s of slides) slidesEl.appendChild(s);
  currentSlide = 0; updateCarousel();

  // Show modal
  modal.setAttribute('aria-hidden','false');
  lockScroll();
  track('Project Details Open', { title: currentProject.title });
  // Start autoplay after open
  startAutoplay();
}

function closeProjectModal(){
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');
  unlockScroll();
  slidesEl.innerHTML='';
  currentProject = null; currentSlide = 0;
  stopAutoplay();
}

function updateCarousel(){
  const count = slidesEl.children.length;
  slidesEl.style.transform = `translateX(${-100*currentSlide}%)`;
  prevBtn.disabled = (currentSlide===0);
  nextBtn.disabled = (currentSlide>=count-1);
}

function toYouTubeEmbed(url){
  try{
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.searchParams.get('v')) return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
  }catch{}
  return url;
}

if (prevBtn) prevBtn.addEventListener('click', () => { if (currentProject){ stopAutoplay(); currentSlide=Math.max(0,currentSlide-1); updateCarousel(); startAutoplay(); track('Carousel Prev', { title: currentProject.title, slide: currentSlide }); }});
if (nextBtn) nextBtn.addEventListener('click', () => { if (currentProject){ stopAutoplay(); currentSlide=Math.min(slidesEl.children.length-1,currentSlide+1); updateCarousel(); startAutoplay(); track('Carousel Next', { title: currentProject.title, slide: currentSlide }); }});
document.addEventListener('click', (e)=>{ if (e.target && (e.target.matches('[data-close]'))){ closeProjectModal(); }});
document.addEventListener('keydown', (e)=>{
  if (e.key==='Escape') {
    if (codeOverlay && codeOverlay.getAttribute('aria-hidden') === 'false') {
      closeCodeOverlay();
      return;
    }
    closeProjectModal();
  }
});
document.querySelectorAll('[data-code-close]').forEach(btn => btn.addEventListener('click', closeCodeOverlay));

// Autoplay
let autoplayTimer = null;
const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function startAutoplay(){
  if (prefersReduced) return; // respect user preference
  stopAutoplay();
  const count = slidesEl?.children?.length || 0;
  if (!modal || modal.getAttribute('aria-hidden') === 'true' || count < 2) return;
  autoplayTimer = setInterval(() => {
    if (!currentProject) return;
    currentSlide = (currentSlide + 1) % count;
    updateCarousel();
  }, 5000);
}
function stopAutoplay(){ if (autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } }

// Pause on hover
const modalMedia = document.querySelector('.modal-media');
if (modalMedia){
  modalMedia.addEventListener('mouseenter', stopAutoplay);
  modalMedia.addEventListener('mouseleave', startAutoplay);
}

// Click animation helper
function playClickAnimation(card, e){
  try{
    card.classList.add('pressed');
    setTimeout(()=> card.classList.remove('pressed'), 160);
    const rect = card.getBoundingClientRect();
    const x = (e && e.clientX) ? e.clientX - rect.left : rect.width/2;
    const y = (e && e.clientY) ? e.clientY - rect.top : rect.height/2;
    const el = document.createElement('span');
    el.className = 'ripple';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    card.appendChild(el);
    el.addEventListener('animationend', ()=> el.remove(), { once: true });
  }catch{}
}

function openCodeOverlay(sn){
  if (!codeOverlay) return;
  const title = sn?.title || sn?.path || 'Code';
  codeOverlayTitle.textContent = title;
  const inlineText = sn?._loadedText || sn?.code || null;
  if (inlineText){
    if (codeOverlayPre) codeOverlayPre.hidden = false;
    if (codeOverlayFrame) codeOverlayFrame.hidden = true;
    if (codeOverlayContent) codeOverlayContent.textContent = inlineText;
  } else if (sn?.path){
    if (codeOverlayPre) codeOverlayPre.hidden = true;
    if (codeOverlayFrame) {
      codeOverlayFrame.hidden = false;
      codeOverlayFrame.src = sn.path;
    }
  } else {
    if (codeOverlayPre) codeOverlayPre.hidden = false;
    if (codeOverlayFrame) codeOverlayFrame.hidden = true;
    if (codeOverlayContent) codeOverlayContent.textContent = 'No code provided.';
  }
  codeOverlay.setAttribute('aria-hidden','false');
  lockScroll();
}

function closeCodeOverlay(){
  if (!codeOverlay) return;
  codeOverlay.setAttribute('aria-hidden','true');
  if (codeOverlayFrame) {
    codeOverlayFrame.src = '';
    codeOverlayFrame.hidden = true;
  }
  unlockScroll();
}
