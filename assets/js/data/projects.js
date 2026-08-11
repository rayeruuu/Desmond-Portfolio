/**
 * Project catalogue.
 *
 * Every entry shares one shape — optional fields are present as empty arrays or
 * null rather than omitted, so renderers never have to guess.
 *
 * @typedef {'Games' | '3D' | '2D' | 'Other'} Category
 *
 * @typedef {Object} Snippet
 * @property {string} title
 * @property {string} language
 * @property {string} path
 *
 * @typedef {Object} Project
 * @property {string}      slug         URL fragment, kebab-case, unique.
 * @property {string}      title
 * @property {string[]}    titleLines   Display lockup, one entry per line.
 *                                      With two or more lines the last is
 *                                      accented; a single-word title stays
 *                                      on one line, unbroken.
 * @property {Category}    category
 * @property {string}      year
 * @property {string}      status       "Released" is reserved for genuinely
 *                                      published work; everything else is
 *                                      coursework ("School project" etc).
 * @property {string}      platform
 * @property {string}      role
 * @property {boolean}     featured     Appears in the hero rotation.
 * @property {boolean}    [highlight]   Draws a gold outline in the work deck.
 * @property {string}      summary      One line, used on cards.
 * @property {string}      longDescription
 * @property {string}      contribution
 * @property {string[]}    features
 * @property {string[]}    tech
 * @property {string[]}    tags
 * @property {{play?: string|null, demo?: string|null, github?: string|null, download?: string|null}} links
 * @property {string}      cover        Full-size key image.
 * @property {string}      thumb        Small local WebP for cards and strips.
 * @property {{images: string[], video: string|null, localVideo: string|null, poster: string|null}} media
 * @property {Snippet[]}   snippets
 */

/** @type {Record<string, Category>} */
export const Category = Object.freeze({
  Games: 'Games',
  ThreeD: '3D',
  TwoD: '2D',
  Other: 'Other',
});

export const CATEGORY_ORDER = Object.freeze([
  'All',
  Category.Games,
  Category.ThreeD,
  Category.TwoD,
  Category.Other,
]);

/** @type {Project[]} */
export const PROJECTS = [
  {
    slug: 'rotoblocks',
    title: 'Rotoblocks',
    titleLines: ['Rotoblocks'],
    category: Category.Games,
    year: '2026',
    status: 'Released',
    platform: 'Android',
    role: 'Solo — design, programming, art, release',
    featured: true,
    highlight: true,
    summary: 'Swipe to pack blocks, match colors, and trigger chain reactions.',
    longDescription:
      'Rotoblocks is a fast-paced puzzle game where every move reshapes the board. Swipe to slam blocks together, forming groups of three or more matching colors to clear them and build massive combo chains. After each clear, the entire board rotates 90 degrees clockwise, causing blocks to re-pack, cascade, and create new opportunities for even bigger reactions. As your score rises, new blocks appear faster and the board becomes increasingly crowded, pushing your planning and adaptability to the limit. Easy to learn, difficult to master, and endlessly replayable.',
    contribution:
      'Solo project — built and shipped end to end. Designed the rotation mechanic and scoring curve, programmed the grid, matching, cascade and chain systems in Unity, produced every skin and UI asset, and handled the Play Store release and live updates.',
    features: [
      'Swipe-to-slam matching on a 6×6 grid — clear groups of three or more',
      'The whole board rotates 90° after every clear, cascading into new matches',
      'Combo chains and multipliers that reward planning several moves ahead',
      'Escalating spawn rate — the board crowds as your score climbs',
      'Coins, XP levels and a progression bar',
      'Daily goals and achievements with live progress tracking',
      'Six unlockable block skins: Classic, Pastel, Emoji, Aurora, Neon and Wood',
    ],
    tech: ['Unity', 'C#', 'Android'],
    tags: ['Games', 'Mobile', 'Puzzle', 'Released'],
    links: {
      play: 'https://play.google.com/store/apps/details?id=com.seki.rotoblocks',
      demo: null,
      github: null,
    },
    cover: 'assets/images/projects/rotoblocks/icon.png',
    thumb: 'assets/images/thumbs/rotoblocks.webp',
    media: {
      images: [
        'assets/images/projects/rotoblocks/gameplay-classic.jpg',
        'assets/images/projects/rotoblocks/gameplay-chain.jpg',
        'assets/images/projects/rotoblocks/gameplay-pixel.jpg',
        'assets/images/projects/rotoblocks/gameplay-neon.jpg',
        'assets/images/projects/rotoblocks/level-up.jpg',
        'assets/images/projects/rotoblocks/gameplay-emoji.jpg',
        'assets/images/projects/rotoblocks/gameplay-wood.jpg',
        'assets/images/projects/rotoblocks/skins.jpg',
        'assets/images/projects/rotoblocks/achievements.jpg',
        'assets/images/projects/rotoblocks/daily-goals.jpg',
      ],
      video: null,
      localVideo: 'assets/video/rotoblocks-gameplay.mp4',
      poster: 'assets/images/projects/rotoblocks/poster.jpg',
    },
    snippets: [],
  },

  {
    slug: 'minatamis',
    title: 'MinaTamis',
    titleLines: ['MinaTamis'],
    category: Category.Games,
    year: '2025',
    status: 'Capstone project',
    platform: 'PC',
    role: 'Co-programmer',
    featured: true,
    highlight: true,
    summary:
      'Narrative-driven Unity experience showing a stylized food cart journey with custom shaders and lighting.',
    longDescription:
      'MinaTamis is a 3D Filipino Dessert Simulator for PC that immerses players in the world of traditional Filipino desserts. Explore interactive shops, serve customers, and customize your culinary space while enjoying a day-night cycle that makes each gameplay session feel dynamic. The game is designed for TVL-Culinary strand students and highlights Filipino culinary culture through engaging and educational simulation mechanics.',
    contribution:
      'Group Capstone project – Co-programmed the entire game, implementing cooking and food preparation mechanics, NPC spawning, day-night cycle, audio, UI elements, AI pathfinding, and optimized level layouts and scripts.',
    features: [
      '3D interactive Filipino dessert simulation',
      'Day-night cycle influencing gameplay',
      'Customer interactions with AI behavior',
      'Customizable shop elements',
      'Optimized levels and responsive gameplay',
    ],
    tech: ['Unity', 'Maya', 'C#'],
    tags: ['Unity', 'Narrative', 'Cinematics'],
    links: {
      play: null,
      demo: null,
      github: null,
      download: 'https://drive.google.com/file/d/1gBinZ0w-ZNkuG92QCDTOwxQ3Rk6RoXxo/view?usp=sharing',
    },
    cover: 'assets/images/projects/unity/Minatamis/mina (1).png',
    thumb: 'assets/images/thumbs/minatamis.webp',
    media: {
      images: [
        'assets/images/projects/unity/Minatamis/mina (1).png',
        'assets/images/projects/unity/Minatamis/mina (2).png',
        'assets/images/projects/unity/Minatamis/mina (3).png',
        'assets/images/projects/unity/Minatamis/mina (4).png',
        'assets/images/projects/unity/Minatamis/mina (5).png',
      ],
      video: 'https://drive.google.com/file/d/1FyTz4Chh6lSmGJ2TwW1z5zTHkbraOE50/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [
      { title: 'AudioManager.cs', language: 'csharp', path: 'assets/scripts/unity/MinaTamis/AudioManager.txt' },
      { title: 'NPCSpawner.cs', language: 'csharp', path: 'assets/scripts/unity/MinaTamis/NPCSpawner.txt' },
      { title: 'ObjectInteractionHandler.cs', language: 'csharp', path: 'assets/scripts/unity/MinaTamis/ObjectInteractionHandler.txt' },
    ],
  },

  {
    slug: 'isolation-protocol',
    title: 'Isolation Protocol',
    titleLines: ['Isolation', 'Protocol'],
    category: Category.Games,
    year: '2025',
    status: 'School project',
    platform: 'Mobile',
    role: 'Lead developer',
    featured: true,
    summary:
      'Mobile FPS set in a neon training facility where defeating mannequins unlocks the boss chamber.',
    longDescription:
      'This Unity-made mobile first-person shooter takes place inside a futuristic sci-fi firing range designed as a combat simulation chamber. Players must navigate neon-lit corridors, collect ammo from glowing supply pads, and eliminate ten hostile training mannequins scattered across the arena. Each mannequin behaves like a lightweight enemy drone, moving, dodging, or firing back with basic energy shots. Once all ten are defeated, the sealed blast doors unlock, granting access to the boss room where the real challenge begins.',
    contribution:
      'Developed all game mechanics, mobile controls, and the overall core program functionality for the project.',
    features: [
      'Sci-fi firing range environment',
      'Ten reactive combat mannequins to eliminate',
      'Unlockable boss room after all mannequins are defeated',
      'Multiple futuristic weapons',
      'Ammo and health stations',
      'Smooth and responsive Unity FPS mobile controls',
      'Optimized performance for mobile devices',
      'Dynamic lighting and VFX for an immersive but lightweight experience',
    ],
    tech: ['Unity', 'C#', 'FPS', 'Mobile'],
    tags: ['Unity', 'Shooter', 'Mobile'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/unity/Isolation Protocol/Iso.jpg',
    thumb: 'assets/images/thumbs/isolation-protocol.webp',
    media: {
      images: [
        'assets/images/projects/unity/Isolation Protocol/Iso.jpg',
        'assets/images/projects/unity/Isolation Protocol/Iso2.jpg',
        'assets/images/projects/unity/Isolation Protocol/Iso3.jpg',
        'assets/images/projects/unity/Isolation Protocol/Iso4.jpg',
        'assets/images/projects/unity/Isolation Protocol/Iso5.jpg',
      ],
      video: 'https://drive.google.com/file/d/1Au0cSsMGTSm7cQOTyQjkv_Q6Ui4Ib8kS/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [
      { title: 'GameManager.cs', language: 'csharp', path: 'assets/scripts/unity/Isolation Protocol/GameManager.txt' },
    ],
  },

  {
    slug: 'lucid-dreams',
    title: 'Lucid Dreams',
    titleLines: ['Lucid', 'Dreams'],
    category: Category.Games,
    year: '2025',
    status: 'School project',
    platform: 'PC',
    role: 'AI & gameplay programmer',
    featured: true,
    summary:
      'Atmospheric first-person puzzle prototype exploring light-bending mechanics and spatial memory.',
    longDescription:
      'Lucid Dreams plunges players into a surreal, dreamlike universe where the ordinary becomes bizarre and anything can turn hostile. Battle animated objects, explore unpredictable dreamscapes, and tackle physics-driven challenges in a world where each dream is a chaotic story of humor and surprises.',
    contribution:
      'Group project – Programmed enemy pathfinding and AI behaviors, player movement and animation trees, and developed UI and scoring systems.',
    features: [
      'Surreal dreamlike environments',
      'AI-driven enemy behaviors',
      'Physics-based interactions',
      'Player movement and animation trees',
      'Scoring and UI systems',
    ],
    tech: ['Unity', 'C#'],
    tags: ['Unity', 'C#', 'Puzzle'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/unity/Lucid/lucid (1).png',
    thumb: 'assets/images/thumbs/lucid-dreams.webp',
    media: {
      images: [
        'assets/images/projects/unity/Lucid/lucid (1).png',
        'assets/images/projects/unity/Lucid/lucid (2).png',
        'assets/images/projects/unity/Lucid/lucid (3).png',
        'assets/images/projects/unity/Lucid/lucid (4).png',
        'assets/images/projects/unity/Lucid/lucid (5).png',
      ],
      video: 'https://drive.google.com/file/d/1NBcFozqHpP69vo9QmxafhTvC09O-81e6/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'galactic-force',
    title: 'Galactic Force',
    titleLines: ['Galactic', 'Force'],
    category: Category.Games,
    year: '2024',
    status: 'School project',
    platform: 'Web — itch.io',
    role: 'Co-programmer',
    featured: true,
    summary:
      'Arcade shooter built in Unity featuring parallax space fields, boss waves, and power-ups.',
    longDescription:
      'Galactic Force is a thrilling single-player space shooter where players pilot a lone starfighter through waves of relentless enemies and hazardous space objects. Dodge attacks, manage your health, and survive to face a challenging final boss. Each stage tests skill, strategy, and reflexes, with final scores displayed to showcase mastery.',
    contribution:
      'Group project – Co-programmed the entire game, implementing enemy mechanics, UI, audio, optimized scripts, and level layouts.',
    features: [
      'Free-direction starfighter movement',
      'Enemy waves with attack patterns',
      'Randomly floating hazards',
      'Health and lives system',
      'Epic final boss battle',
    ],
    tech: ['Unity', 'C#', 'Shooter'],
    tags: ['Unity', 'Shooter', 'Arcade'],
    links: { play: null, demo: 'https://sekiroooo.itch.io/galacticforce', github: null },
    cover: 'assets/images/projects/unity/GalacticForce/galactic (1).png',
    thumb: 'assets/images/thumbs/galactic-force.webp',
    media: {
      images: [
        'assets/images/projects/unity/GalacticForce/galactic (1).png',
        'assets/images/projects/unity/GalacticForce/galactic (2).png',
        'assets/images/projects/unity/GalacticForce/galactic (3).png',
      ],
      video: 'https://drive.google.com/file/d/1bIR600Kl0BniRslWs0wincElMbsIZPyw/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [
      { title: 'Game.cs', language: 'csharp', path: 'assets/scripts/cs/Game.txt' },
    ],
  },

  {
    slug: 'bricks',
    title: 'Bricks',
    titleLines: ['Bricks'],
    category: Category.Games,
    year: '2024',
    status: 'Personal project',
    platform: 'Web — itch.io',
    role: 'Solo developer',
    featured: false,
    summary:
      'Fast-paced brick breaker prototype with responsive paddle controls and escalating waves.',
    longDescription:
      'Bricks is a fast-paced, touch-controlled arcade game inspired by Arkanoid. Players control a paddle to bounce a ball and break bricks across increasingly difficult levels. Grab power-ups, dodge obstacles, and master precise timing to keep the ball in play. Its simple mechanics are easy to pick up, while the escalating challenge keeps players engaged.',
    contribution:
      'Solo project – Designed and implemented the core game loop, paddle and ball physics, scoring system, UI polish, and difficulty tuning to maximize player satisfaction.',
    features: [
      'Touch-controlled paddle mechanics',
      'Dynamic brick-breaking levels',
      'Power-ups like paddle expansion',
      'Scoring system with increasing difficulty',
      'Quick-play arcade gameplay',
    ],
    tech: ['Unity', 'C#'],
    tags: ['Unity', 'Arcade', 'Prototype'],
    links: { play: null, demo: 'https://sekiroooo.itch.io/bricks', github: null },
    cover: 'assets/images/projects/unity/Bricks/bricks (1).png',
    thumb: 'assets/images/thumbs/bricks.webp',
    media: {
      images: [
        'assets/images/projects/unity/Bricks/bricks (3).png',
        'assets/images/projects/unity/Bricks/bricks (1).png',
        'assets/images/projects/unity/Bricks/bricks (2).png',
      ],
      video: 'https://drive.google.com/file/d/1D1E4TB_rrxuAILsILRqQ-Wj514YwBby5/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'hollow-maze',
    title: 'Hollow Maze',
    titleLines: ['Hollow', 'Maze'],
    category: Category.Games,
    year: '2024',
    status: 'Personal project (unfinished)',
    platform: 'PC',
    role: 'Solo developer',
    featured: false,
    summary: 'First-person horror maze prototype with basic enemy AI and tense atmosphere.',
    longDescription:
      'Hollow Maze is a mini horror game inspired by Pac-Man. Navigate randomized mazes to collect all the orbs while avoiding four aggressive ghosts. Players must strategize their movements or risk losing all lives in this tense, fast-paced arcade experience.',
    contribution:
      'Solo project – Designed and implemented the core game loop, AI pathfinding, scoring system, lighting, maze layout randomizer, and polished the UI for immersive gameplay.',
    features: [
      'Randomized maze generation',
      'Ghost AI with pathfinding',
      'Collectible orbs as objectives',
      'Tension-filled arcade horror mechanics',
      'Score tracking and UI polish',
    ],
    tech: ['Unity', 'C#', 'Horror'],
    tags: ['Unity', 'Horror', 'Maze'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/unity/HollowMaze/hollow (1).png',
    thumb: 'assets/images/thumbs/hollow-maze.webp',
    media: {
      images: [
        'assets/images/projects/unity/HollowMaze/hollow (1).png',
        'assets/images/projects/unity/HollowMaze/hollow (2).png',
        'assets/images/projects/unity/HollowMaze/hollow (3).png',
        'assets/images/projects/unity/HollowMaze/hollow (4).png',
        'assets/images/projects/unity/HollowMaze/hollow (5).png',
      ],
      video: 'https://drive.google.com/file/d/12cCn5XiL4bzTy_YICOvjLrjbY-yhCTgq/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [
      { title: 'GhostAI.cs', language: 'csharp', path: 'assets/scripts/unity/HollowMaze/GhostAI.txt' },
    ],
  },

  {
    slug: 'helicopter-animation',
    title: 'Helicopter Animation',
    titleLines: ['Helicopter', 'Animation'],
    category: Category.ThreeD,
    year: '2024',
    status: 'School activity',
    platform: 'Maya',
    role: 'Animator',
    featured: false,
    summary: 'Keyframed helicopter animation rendered with dramatic lighting and camera sweeps.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['Maya', 'Animation'],
    tags: ['3D', 'Animation', 'Maya'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/3d/helicopter/heli 1.jpg',
    thumb: 'assets/images/thumbs/helicopter-animation.webp',
    media: {
      images: [
        'assets/images/projects/3d/helicopter/heli 1.jpg',
        'assets/images/projects/3d/helicopter/heli 2.jpg',
        'assets/images/projects/3d/helicopter/heli 3.jpg',
      ],
      video: 'https://drive.google.com/file/d/1XNg_NEKW0zxBe3zq8Kp0ytn_Yt0xAAlX/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'ball-animation-study',
    title: 'Ball Animation Study',
    titleLines: ['Ball', 'Study'],
    category: Category.ThreeD,
    year: '2024',
    status: 'School activity',
    platform: 'Maya',
    role: 'Animator',
    featured: false,
    summary: 'Squash-and-stretch exploration using timing charts and graph editor passes.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['Maya', 'Animation'],
    tags: ['Animation', 'Practice'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/3d/ball animation/ball (1).png',
    thumb: 'assets/images/thumbs/ball-animation-study.webp',
    media: {
      images: [
        'assets/images/projects/3d/ball animation/ball (1).png',
        'assets/images/projects/3d/ball animation/ball (2).png',
        'assets/images/projects/3d/ball animation/ball (3).png',
        'assets/images/projects/3d/ball animation/ball (4).png',
      ],
      video: 'https://drive.google.com/file/d/1J6kfTYUM1EO41pBQI0_Zx3a0aWHg_o0L/preview',
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'bazooka-prop',
    title: 'Bazooka Prop',
    titleLines: ['Bazooka', 'Prop'],
    category: Category.ThreeD,
    year: '2024',
    status: 'School activity',
    platform: 'Maya',
    role: '3D artist',
    featured: false,
    summary:
      'Stylized bazooka optimized for real-time engines with baked normals and hand-painted passes.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['Maya', 'Substance'],
    tags: ['3D', 'Prop', 'Game Ready'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/3d/bazooka/bazooka 1.jpg',
    thumb: 'assets/images/thumbs/bazooka-prop.webp',
    media: {
      images: [
        'assets/images/projects/3d/bazooka/bazooka 1.jpg',
        'assets/images/projects/3d/bazooka/bazooka 2.jpg',
        'assets/images/projects/3d/bazooka/bazooka 3.jpg',
      ],
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'hard-surface-washer',
    title: 'Hard-Surface Washer',
    titleLines: ['Hard', 'Surface'],
    category: Category.ThreeD,
    year: '2024',
    status: 'School activity',
    platform: 'Maya',
    role: '3D artist',
    featured: false,
    summary: 'PBR washer/dryer study focused on edge wear and clean curvature.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['Maya', 'PBR'],
    tags: ['3D', 'Hard Surface'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/3d/washing machine/washing machine(angle 1).jpg',
    thumb: 'assets/images/thumbs/hard-surface-washer.webp',
    media: {
      images: [
        'assets/images/projects/3d/washing machine/washing machine(angle 1).jpg',
        'assets/images/projects/3d/washing machine/washing machine (angle 2).jpg',
        'assets/images/projects/3d/washing machine/washing machine(angle 3).jpg',
        'assets/images/projects/3d/washing machine/washing machine(angle 4).jpg',
      ],
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'heavy-weapon-kit',
    title: 'Heavy Weapon Kit',
    titleLines: ['Heavy', 'Weapon'],
    category: Category.ThreeD,
    year: '2024',
    status: 'School activity',
    platform: 'ZBrush',
    role: '3D artist',
    featured: false,
    summary: 'Fantasy warhammer variations sculpted for cinematic close-ups.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['ZBrush', 'Maya'],
    tags: ['3D', 'Weapon', 'ZBrush'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/3d/warhammer/weapon.jpg',
    thumb: 'assets/images/thumbs/heavy-weapon-kit.webp',
    media: {
      images: [
        'assets/images/projects/3d/warhammer/weapon.jpg',
        'assets/images/projects/3d/warhammer/weapon 1.jpg',
        'assets/images/projects/3d/warhammer/weapon 2.jpg',
      ],
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'chess-wall-diorama',
    title: 'Chess Wall Diorama',
    titleLines: ['Chess', 'Diorama'],
    category: Category.ThreeD,
    year: '2024',
    status: 'School activity',
    platform: 'Maya',
    role: '3D artist',
    featured: false,
    summary:
      'Wall-mounted chess board render experimenting with glossy materials and rim lighting.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['Maya', 'Lighting'],
    tags: ['3D', 'Lighting'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/3d/wall chess board/chess 3.jpg',
    thumb: 'assets/images/thumbs/chess-wall-diorama.webp',
    media: {
      images: [
        'assets/images/projects/3d/wall chess board/chess.jpg',
        'assets/images/projects/3d/wall chess board/chess 2.jpg',
        'assets/images/projects/3d/wall chess board/chess 3.jpg',
        'assets/images/projects/3d/wall chess board/chess 4.jpg',
        'assets/images/projects/3d/wall chess board/chess 5.jpg',
      ],
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'pixel-produce-pack',
    title: 'Pixel Produce Pack',
    titleLines: ['Pixel', 'Produce'],
    category: Category.TwoD,
    year: '2024',
    status: 'Personal project',
    platform: 'Aseprite',
    role: '2D artist',
    featured: false,
    summary: 'A hand-crafted set of fruit sprites ready for platformers and cozy farming sims.',
    longDescription: '',
    contribution: '',
    features: [],
    tech: ['Pixel Art', 'Aseprite'],
    tags: ['2D', 'Pixel Art', 'UI'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/2d/apple.png',
    thumb: 'assets/images/thumbs/pixel-produce-pack.webp',
    media: {
      images: [
        'assets/images/projects/2d/apple.png',
        'assets/images/projects/2d/banana.png',
        'assets/images/projects/2d/orange.png',
        'assets/images/projects/2d/watermelon.png',
        'assets/images/projects/2d/trees.png',
        'assets/images/projects/2d/grass.png',
        'assets/images/projects/2d/bluebird.png',
      ],
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'photoshop-illustrator',
    title: 'Photoshop & Illustrator',
    titleLines: ['Graphic', 'Design'],
    category: Category.Other,
    year: '2024',
    status: 'Personal project',
    platform: 'Adobe CC',
    role: 'Sole designer',
    featured: false,
    summary:
      'Brand identity explorations, poster layouts, and logo studies created in Adobe Photoshop and Illustrator.',
    longDescription:
      'A curated collection of marketing assets ranging from esports posters to event branding. Each piece was composed from scratch—combining photo-bashing, typography hierarchies, and color grading—to deliver polished visuals ready for print and social media drops.',
    contribution:
      'Sole designer – handled concept sketches, vector cleanup, final compositing, and export prep for both digital and print deliverables.',
    features: [
      'Custom logos and iconography polished in Illustrator',
      'Poster layouts optimized for both vertical and square crops',
      'Lighting and texture paint-overs completed in Photoshop',
      'Print-ready exports with bleed and safe-area guides',
    ],
    tech: ['Photoshop', 'Illustrator', 'Branding'],
    tags: ['Other', 'Graphic Design'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/others/Photoshop & Illustrator/dynamic smash showdown.png',
    thumb: 'assets/images/thumbs/photoshop-illustrator.webp',
    media: {
      images: [
        'assets/images/projects/others/Photoshop & Illustrator/dynamic smash showdown.png',
        'assets/images/projects/others/Photoshop & Illustrator/fiesta.png',
        'assets/images/projects/others/Photoshop & Illustrator/Desmond D. Ryel.png',
        'assets/images/projects/others/Photoshop & Illustrator/Screenshot 2024-01-17 133516.jpg',
        'assets/images/projects/others/Photoshop & Illustrator/Screenshot 2024-02-27 183716.jpg',
        'assets/images/projects/others/Photoshop & Illustrator/desmond 2.jpg',
        'assets/images/projects/others/Photoshop & Illustrator/NADELA_BACKGROUND.png',
        'assets/images/projects/others/Photoshop & Illustrator/sp3 new logo.png',
      ],
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },

  {
    slug: 'photographs-lightroom',
    title: 'Photographs (Lightroom)',
    titleLines: ['Photo', 'graphs'],
    category: Category.Other,
    year: '2024',
    status: 'Hobby',
    platform: 'Lightroom',
    role: 'Solo shooter',
    featured: false,
    summary: 'Portrait and lifestyle photo set graded in Adobe Lightroom with cinematic tones.',
    longDescription:
      'A quick-hit photography reel that captures candid campus life, moody night scenes, and street portraits. Every image was shot on a mirrorless camera, then balanced inside Lightroom with custom HSL curves, selective masking, and filmic grain for cohesive storytelling.',
    contribution:
      'Solo shooter – planned the shots, handled on-location camera work, and completed the full Lightroom post-process.',
    features: [
      'Consistent filmic grade across multiple lighting conditions',
      'Skin-tone retouching using local masks',
      'Lens corrections and perspective cleanup',
      'Export presets for social and print sets',
    ],
    tech: ['Lightroom', 'Photography'],
    tags: ['Other', 'Photography'],
    links: { play: null, demo: null, github: null },
    cover: 'assets/images/projects/others/Photograps (Lightroom)/photo (1).jpg',
    thumb: 'assets/images/thumbs/photographs-lightroom.webp',
    media: {
      images: Array.from(
        { length: 12 },
        (_, i) => `assets/images/projects/others/Photograps (Lightroom)/photo (${i + 1}).jpg`,
      ),
      video: null,
      localVideo: null,
      poster: null,
    },
    snippets: [],
  },
];

/** @param {string} slug @returns {Project | undefined} */
export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

/** @param {string} filter @returns {Project[]} */
export function filterProjects(filter) {
  return filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
}

/** @returns {Project[]} */
export function featuredProjects() {
  return PROJECTS.filter((p) => p.featured);
}
