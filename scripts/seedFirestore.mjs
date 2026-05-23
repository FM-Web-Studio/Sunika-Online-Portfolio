/**
 * Firestore seed script — Sunika Lombard portfolio
 *
 * Setup (run once from the scripts/ directory):
 *   npm install
 *
 * Usage:
 *   node seedFirestore.mjs <path-to-serviceAccountKey.json>
 *
 * The service account JSON is downloaded from:
 *   Firebase Console → Project Settings → Service accounts → Generate new private key
 *
 * This script uses set() with merge:false, so re-running it safely
 * overwrites all documents with the latest data below.
 *
 * WARNING: Never commit the service account JSON file to git.
 */

import { readFileSync } from 'fs';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// ─── Args ─────────────────────────────────────────────────────────────────────

const serviceAccountPath = process.argv[2];
if (!serviceAccountPath) {
  console.error('\nUsage: node seedFirestore.mjs <path-to-serviceAccountKey.json>\n');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} catch (e) {
  console.error(`Could not read service account file: ${serviceAccountPath}`);
  console.error(e.message);
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ─── Seed data ────────────────────────────────────────────────────────────────

const PORTFOLIO_PERSONAL = {
  name:     'Sunika Lombard',
  title:    'Communication Design & Illustration Student',
  bio:      'Third-year BA student in Communication Design & Illustration at Open Window. Creative and adaptable designer with a passion for visual storytelling through painting, drawing, mixed-media art, and digital design. Proficient in the Adobe Creative Cloud suite and committed to developing innovative design solutions that blend traditional and digital techniques.',
  location: 'Irene, Centurion, South Africa',
  email:    'lombardsunika@gmail.com',
  phone:    '+27 66 253 2952',
  photoUrl: '/photos/profile.jpg',
};

const PORTFOLIO_CONTACT = {
  email:    'lombardsunika@gmail.com',
  phone:    '+27 66 253 2952',
  location: 'Irene, Centurion, Gauteng, South Africa',
};

const PORTFOLIO_SOCIAL = {
  platforms: [
    {
      key:      'instagram',
      platform: 'Instagram',
      url:      'https://www.instagram.com/sunika83/',
    },
    {
      key:      'linkedin',
      platform: 'LinkedIn',
      url:      'https://www.linkedin.com/in/sunika-lombard-5201b534b/',
    },
  ],
};

const PORTFOLIO_SKILLS = {
  categories: [
    {
      name:  'Creative',
      items: [
        'Painting (Acrylic, Watercolour, Oil)',
        'Drawing (Pencil, Charcoal, Ink)',
        'Digital Illustration',
        'Mixed-media Art',
        'Concept Art',
        'Composition & Layout',
      ],
    },
    {
      name:  'Technical',
      items: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Adobe InDesign',
        'Adobe After Effects',
        'Figma',
      ],
    },
    {
      name:  'Soft Skills',
      items: [
        'Visual Storytelling',
        'Creative Thinking',
        'Attention to Detail',
        'Adaptability',
        'Teamwork & Collaboration',
      ],
    },
  ],
};

const PORTFOLIO_INTERESTS = {
  items: [
    'Contemporary Art',
    'Visual Storytelling',
    'Sustainable Design',
    'Travel & Culture',
    'Animation',
    'Typography',
    'Photography',
  ],
};

const EDUCATION = [
  {
    id:            'open-window',
    order:         1,
    institution:   'Open Window',
    qualification: 'BA in Communication Design & Illustration',
    field:         'Communication Design & Illustration',
    start:         '2024',
    end:           null,
    period:        '2024 – Present',
    description:   'Third-year student specialising in illustration and visual communication design. Coursework includes typography, digital design, branding & identity, illustration techniques, and concept development.',
    tags:          ['Typography', 'Illustration', 'Branding', 'Digital Design', 'Visual Communication'],
  },
  {
    id:            'hoerskool-noordheuwel',
    order:         2,
    institution:   'Hoërskool Noordheuwel',
    qualification: 'National Senior Certificate (Matric)',
    field:         'Visual Arts',
    start:         '2018',
    end:           '2023',
    period:        '2018 – 2023',
    description:   'Completed Matric with distinction in Visual Arts. Served as school prefect. Subjects included Afrikaans HL, English FAL, Visual Arts, Mathematics, Geography, and Computer Applications Technology.',
    tags:          ['Visual Arts', 'Prefect', 'Matric'],
  },
];

const PROJECTS = [
  {
    id:          'logos',
    order:       1,
    title:       'Logos',
    imageFolder: 'Logos',
    category:    'Branding',
    year:        '2023–2024',
    description: 'A collection of brand identities and logo designs created for various clients and personal projects. Each logo represents a unique visual identity crafted to capture the essence of the brand.',
    tags:        ['Logo Design', 'Brand Identity', 'Typography'],
  },
  {
    id:          'book-magazine',
    order:       2,
    title:       'Book & Magazine Designs',
    imageFolder: 'Book & Magazine Designs',
    category:    'Editorial Design',
    year:        '2023–2024',
    description: 'A comprehensive collection of editorial layouts, book covers, and magazine spreads showcasing typography, grid systems, and visual hierarchy.',
    tags:        ['Editorial', 'Layout', 'Typography'],
  },
  {
    id:          'sugar-packaging',
    order:       3,
    title:       'Sugar Packaging',
    imageFolder: 'Sugar Packaging',
    category:    'Package Design',
    year:        '2023',
    description: 'Product packaging design for a sugar brand, featuring label design, typography, and visual branding that demonstrates attention to consumer packaging and brand consistency.',
    tags:        ['Packaging', 'Label Design', 'Print'],
  },
  {
    id:          'nomad-magazine',
    order:       4,
    title:       'Nomad Magazine',
    imageFolder: 'Nomad Magazine',
    category:    'Editorial Design',
    year:        '2023',
    description: 'Editorial design for a nomad travel magazine, featuring layout design, typography, photography curation, and visual storytelling capturing the spirit of travel and freedom.',
    tags:        ['Magazine', 'Editorial', 'Photography'],
  },
  {
    id:          'spotify-podcast',
    order:       5,
    title:       'Spotify Podcast Album Cover',
    imageFolder: 'Spotify Podcast',
    category:    'Cover Art',
    year:        '2023',
    description: "Podcast album cover artwork designed for Spotify, focusing on bold visuals and mood-driven typography to match the music's vibe.",
    tags:        ['Cover Art', 'Spotify', 'Digital'],
  },
  {
    id:          'mural-designs',
    order:       6,
    title:       'Mural Designs',
    imageFolder: 'Mural Designs',
    category:    'Mural Art',
    year:        '2023',
    description: 'A collection of experimental mural designs exploring bold shapes, colours, and large-scale visual impact across different spaces.',
    tags:        ['Mural', 'Large Format', 'Illustration'],
  },
  {
    id:          'graffiti-art',
    order:       7,
    title:       'Graffiti Art',
    imageFolder: 'Graffiti Art',
    category:    'Street Art',
    year:        '2023',
    description: 'A series of graffiti artworks exploring lettering, street-style visuals, and expressive colour work inspired by urban environments.',
    tags:        ['Graffiti', 'Lettering', 'Street Art'],
  },
  {
    id:          'lotus-spa',
    order:       8,
    title:       'Lotus Spa',
    imageFolder: 'Lotus Spa',
    category:    'Brand Identity',
    year:        '2023',
    description: 'Luxury branding and visual design for a high-end lotus-inspired spa, focusing on elegant typography, soft colour palettes, and a calm, refined atmosphere.',
    tags:        ['Branding', 'Luxury', 'Identity'],
  },
  {
    id:          'wonders-universe',
    order:       9,
    title:       'Wonders of the Universe Magazine',
    imageFolder: 'Wonders Of The Universe Magazine',
    category:    'Editorial Design',
    year:        '2023',
    description: 'Magazine design focused on imaginative creature concepts, blending surreal illustrations with editorial layouts inspired by the mysteries of the universe.',
    tags:        ['Magazine', 'Illustration', 'Editorial'],
  },
  {
    id:          'motion-design',
    order:       10,
    title:       'Motion Design',
    imageFolder: 'Motion Design',
    category:    'Motion Graphics',
    year:        '2023–2024',
    description: 'Dynamic motion graphics and animated design work exploring movement, timing, and visual transitions — including kinetic typography, animated logos, and digital storytelling.',
    tags:        ['Motion Graphics', 'Animation', 'After Effects'],
  },
  {
    id:          'postcards',
    order:       11,
    title:       'Postcards',
    imageFolder: 'Postcards',
    category:    'Print Design',
    year:        '2023',
    description: 'Creative postcard designs combining illustration, photography, and typography. Each piece captures moments, emotions, and destinations in a compact, collectible format.',
    tags:        ['Print', 'Illustration', 'Typography'],
  },
  {
    id:          'storybook',
    order:       12,
    title:       'Storybook',
    imageFolder: 'Storybook',
    category:    'Illustration & Layout',
    year:        '2023',
    description: "Illustrated storybook design featuring narrative layouts, character illustrations, and whimsical typography — blending visual art with storytelling for children's literature.",
    tags:        ['Illustration', 'Children\'s Book', 'Layout'],
  },
  {
    id:          'sunlight',
    order:       13,
    title:       'Sunlight',
    imageFolder: 'Sunlight',
    category:    'Brand Identity',
    year:        '2023',
    description: 'A visual identity project centred around themes of light, warmth, and natural energy, exploring bright colour palettes, organic forms, and uplifting design aesthetics.',
    tags:        ['Branding', 'Identity', 'Print'],
  },
];

// ─── Write helpers ─────────────────────────────────────────────────────────────

const upsert = (col, docId, data) =>
  db.collection(col).doc(docId).set(data);

const upsertAll = (col, docs) => {
  const batch = db.batch();
  for (const { id, ...data } of docs) {
    batch.set(db.collection(col).doc(id), data);
  }
  return batch.commit();
};

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\nSeeding Firestore for sunika-project…\n');

  await Promise.all([
    upsert('portfolio', 'personal',  PORTFOLIO_PERSONAL),
    upsert('portfolio', 'contact',   PORTFOLIO_CONTACT),
    upsert('portfolio', 'social',    PORTFOLIO_SOCIAL),
    upsert('portfolio', 'skills',    PORTFOLIO_SKILLS),
    upsert('portfolio', 'interests', PORTFOLIO_INTERESTS),
  ]);
  console.log('  ✓  portfolio/personal');
  console.log('  ✓  portfolio/contact');
  console.log('  ✓  portfolio/social  (Instagram, LinkedIn)');
  console.log('  ✓  portfolio/skills  (3 categories)');
  console.log('  ✓  portfolio/interests');

  await upsertAll('education', EDUCATION);
  console.log(`  ✓  education  (${EDUCATION.length} documents)`);

  await upsertAll('projects', PROJECTS);
  console.log(`  ✓  projects   (${PROJECTS.length} documents)`);

  console.log('\nAll done. Firebase project is ready.\n');
}

seed().catch((err) => {
  console.error('\nSeed failed:', err.message ?? err);
  process.exit(1);
});
