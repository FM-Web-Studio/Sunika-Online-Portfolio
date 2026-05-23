import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdArrowOutward, MdEmail,
  MdAutoStories,
} from 'react-icons/md';
import { FaInstagram, FaLinkedin, FaPaintBrush, FaPalette } from 'react-icons/fa';
import usePortfolioData from '../../hooks/usePortfolioData';
import usePolaroidPhotos from '../../hooks/usePolaroidPhotos';
import { Modal, MagneticButton, CursorGlowButton } from '../../components';
import styles from './Home.module.css';

// Photos 0..PAIRED_PHOTOS-1 sit beside the three content scenes; the rest
// gather in the album gallery near the end.
const PAIRED_PHOTOS = 3;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const itemLabel = (s) =>
  typeof s === 'string' ? s : s?.name ?? s?.title ?? String(s);

const flattenSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills.categories))
    return skills.categories.flatMap(c =>
      (c.items ?? []).map(i => ({ label: itemLabel(i), group: c.name }))
    );
  if (Array.isArray(skills.items))
    return skills.items.map(i => ({ label: itemLabel(i), group: null }));
  return Object.entries(skills)
    .filter(([, v]) => Array.isArray(v))
    .flatMap(([name, arr]) => arr.map(i => ({ label: itemLabel(i), group: name })));
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ─── Paint drop SVG ───────────────────────────────────────────────────────── */

const PaintDrop = ({ className, style }) => (
  <svg viewBox="0 0 32 40" className={className} style={style} aria-hidden="true">
    <path
      d="M16 2 C16 2 4 16 4 24 C4 31 9.4 38 16 38 C22.6 38 28 31 28 24 C28 16 16 2 16 2 Z"
      fill="currentColor"
    />
    <ellipse cx="12" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.28)" transform="rotate(-18 12 20)" />
  </svg>
);

/* ─── Drifting motes overlay (fixed) ───────────────────────────────────────── */

const MOTE_COUNT = 8;

const DriftingMotes = () => {
  const motes = useMemo(() => Array.from({ length: MOTE_COUNT }, (_, i) => ({
    i,
    left:     Math.round(Math.random() * 100),
    size:     6  + Math.round(Math.random() * 8),
    duration: 22 + Math.round(Math.random() * 18),
    delay:    -Math.round(Math.random() * 30),
    drift:    (Math.random() * 36 - 18).toFixed(1),
    opacity:  (0.35 + Math.random() * 0.35).toFixed(2),
  })), []);

  return (
    <div className={styles.moteField} aria-hidden="true">
      {motes.map(m => (
        <span
          key={m.i}
          className={styles.mote}
          style={{
            left:               `${m.left}%`,
            width:              `${m.size}px`,
            height:             `${m.size}px`,
            animationDuration:  `${m.duration}s`,
            animationDelay:     `${m.delay}s`,
            '--drift':          `${m.drift}vw`,
            '--moteOpacity':    m.opacity,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Floating paint drops overlay (fixed) ─────────────────────────────────── */

const DROP_COUNT = 9;

const FloatingPaintDrops = () => {
  const drops = useMemo(() => Array.from({ length: DROP_COUNT }, (_, i) => ({
    i,
    left:     Math.round(Math.random() * 100),
    size:     12 + Math.round(Math.random() * 14),
    duration: 18 + Math.round(Math.random() * 20),
    delay:    -Math.round(Math.random() * 35),
    drift:    (Math.random() * 30 - 15).toFixed(1),
    spin:     Math.random() > 0.5 ? 1 : -1,
    hue:      i % 3,
    opacity:  (0.40 + Math.random() * 0.30).toFixed(2),
  })), []);

  return (
    <div className={styles.leafField} aria-hidden="true">
      {drops.map(d => (
        <span
          key={d.i}
          className={`${styles.fallingLeaf} ${styles[`leafHue${d.hue}`]}`}
          style={{
            left:              `${d.left}%`,
            width:             `${d.size}px`,
            height:            `${d.size * 1.25}px`,
            animationDuration: `${d.duration}s`,
            animationDelay:    `${d.delay}s`,
            '--drift':         `${d.drift}vw`,
            '--spin':          d.spin,
            '--leafOpacity':   d.opacity,
          }}
        >
          <PaintDrop />
        </span>
      ))}
    </div>
  );
};

/* ─── Word-by-word reveal ──────────────────────────────────────────────────── */

const WordReveal = ({ text, inView, className, delay = 0 }) => {
  if (!text) return null;
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span
          key={i}
          className={`${styles.word} ${inView ? styles.wordVisible : ''}`}
          style={{ '--wi': i, '--wd': `${delay}s` }}
        >
          {w}&nbsp;
        </span>
      ))}
    </span>
  );
};

/* ─── Chapter cards data ───────────────────────────────────────────────────── */

const CHAPTERS = [
  {
    id: 'projects',
    chapter: 'I',
    title: 'The Studio',
    subtitle: 'Things I have made',
    icon: <FaPalette />,
    to: '/projects',
    accent: 'pumpkin',
    opening: 'Every studio holds finished work and work still drying.',
    excerpt:
      'Brand identities, editorial pieces, and design projects — each one a snapshot of an idea brought to life.',
    cta: 'Step into the studio',
  },
  {
    id: 'connect',
    chapter: 'II',
    title: 'An Impression',
    subtitle: 'Reach out',
    icon: <MdEmail />,
    to: '/connect',
    accent: 'honey',
    opening: 'The best work starts with a conversation.',
    excerpt:
      'A short message, a big idea, a collaboration — drop a note and it lands right here. Or find me on Instagram and LinkedIn.',
    cta: 'Make an impression',
  },
];

/* ─── Chapter illustrations (inline SVG, no external assets) ───────────────── */

const ChapterArt = ({ kind }) => {
  if (kind === 'projects') {
    /* Easel with canvas */
    return (
      <svg viewBox="0 0 200 220" className={styles.chapterArtSvg} aria-hidden="true">
        <defs>
          <linearGradient id="eas1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent-1)" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="205" rx="70" ry="7" fill="rgba(0,0,0,0.18)" />
        {/* Easel legs */}
        <line x1="100" y1="50" x2="52"  y2="200" stroke="var(--accent-3)" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="50" x2="148" y2="200" stroke="var(--accent-3)" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="50" x2="100" y2="200" stroke="var(--accent-3)" strokeWidth="4" strokeLinecap="round" />
        {/* Crossbar */}
        <line x1="64" y1="152" x2="136" y2="152" stroke="var(--accent-3)" strokeWidth="4" strokeLinecap="round" />
        {/* Canvas frame */}
        <rect x="52" y="44" width="96" height="80" rx="3" fill="var(--background-1)" stroke="var(--accent-3)" strokeWidth="3" />
        {/* Painting on canvas */}
        <rect x="58" y="50" width="84" height="68" rx="2" fill="url(#eas1)" opacity="0.85" />
        {/* Abstract paint strokes */}
        <path d="M68 90 Q86 70 104 88 Q120 106 136 82" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" />
        <path d="M68 104 Q92 88 116 100" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
        {/* Paint drop decoration */}
        <g transform="translate(160,60)">
          <path d="M0 0 C0 0 -7 8 -7 13 C-7 17 -3.9 22 0 22 C3.9 22 7 17 7 13 C7 8 0 0 0 0 Z"
            fill="var(--paint-color)" opacity="0.7" />
        </g>
      </svg>
    );
  }
  /* connect — envelope + paintbrush */
  return (
    <svg viewBox="0 0 200 220" className={styles.chapterArtSvg} aria-hidden="true">
      <defs>
        <linearGradient id="env1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="var(--background-1)" />
          <stop offset="100%" stopColor="var(--accent-2-background)" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="195" rx="76" ry="7" fill="rgba(0,0,0,0.18)" />
      {/* Envelope */}
      <rect x="30" y="70" width="140" height="100" rx="6" fill="url(#env1)" stroke="var(--accent-3)" strokeWidth="2" />
      <path d="M30 76 L100 130 L170 76" fill="none" stroke="var(--accent-3)" strokeWidth="2" />
      <path d="M30 170 L82 124" stroke="var(--accent-3)" strokeWidth="2" fill="none" />
      <path d="M170 170 L118 124" stroke="var(--accent-3)" strokeWidth="2" fill="none" />
      {/* Paint-drop wax seal */}
      <circle cx="100" cy="138" r="18" fill="var(--paint-color)" />
      <circle cx="100" cy="138" r="18" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
      <path
        d="M100 130 C100 130 95 136 95 141 C95 144 97.2 147 100 147 C102.8 147 105 144 105 141 C105 136 100 130 100 130 Z"
        fill="rgba(255,255,255,0.65)"
      />
      {/* Paintbrush */}
      <g transform="translate(152,38) rotate(35)">
        <rect x="-3" y="-52" width="6" height="44" rx="3" fill="var(--accent-2)" />
        <rect x="-3" y="-52" width="6" height="10" rx="1" fill="var(--accent-1)" />
        <path d="M-3 -8 Q0 8 3 -8 L0 12 Z" fill="var(--accent-3)" />
      </g>
      {/* Small paint drop accent */}
      <g transform="translate(42,42) rotate(-15)">
        <path d="M0 0 C0 0 -5 6 -5 10 C-5 12.8 -2.8 16 0 16 C2.8 16 5 12.8 5 10 C5 6 0 0 0 0 Z"
          fill="var(--paint-color)" opacity="0.65" />
      </g>
    </svg>
  );
};

/* ─── Coverflow chapter carousel ───────────────────────────────────────────── */

const ChapterCarousel = ({ chapters, onOpen }) => {
  const [current, setCurrent] = useState(0);
  const total = chapters.length;
  const lockRef = useRef(false);

  const goTo = useCallback((idx) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setCurrent(((idx % total) + total) % total);
    setTimeout(() => { lockRef.current = false; }, 480);
  }, [total]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(chapters[current]); }
  };

  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current == null) return;
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 38) (d > 0 ? goNext : goPrev)();
    touchX.current = null;
  };

  const slideStyle = (offset) => {
    const abs = Math.abs(offset);
    const sign = Math.sign(offset);
    if (abs > 2) return { opacity: 0, pointerEvents: 'none', visibility: 'hidden' };
    if (abs === 0) return {
      transform: 'translateX(0) scale(1) rotateY(0deg)',
      opacity: 1, zIndex: 4, filter: 'none',
    };
    if (abs === 1) return {
      transform: `translateX(${sign * 58}%) scale(0.82) rotateY(${-sign * 22}deg)`,
      opacity: 0.85, zIndex: 3,
      filter: 'brightness(0.78) saturate(0.9)',
      cursor: 'pointer',
    };
    return {
      transform: `translateX(${sign * 96}%) scale(0.66) rotateY(${-sign * 32}deg)`,
      opacity: 0.45, zIndex: 2,
      filter: 'brightness(0.6) saturate(0.7) blur(1px)',
      cursor: 'pointer',
    };
  };

  return (
    <div
      className={styles.coverflow}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Choose a chapter"
    >
      <button
        className={`${styles.coverArrow} ${styles.coverArrowPrev}`}
        onClick={goPrev}
        aria-label="Previous chapter"
        type="button"
      >‹</button>

      <div className={styles.coverStage}>
        {chapters.map((c, idx) => {
          let off = idx - current;
          if (off >  total / 2) off -= total;
          if (off < -total / 2) off += total;
          const isActive = off === 0;
          return (
            <div
              key={c.id}
              className={`${styles.coverCard} ${styles[`accent_${c.accent}`]} ${isActive ? styles.coverCardActive : ''}`}
              style={slideStyle(off)}
              onClick={() => (isActive ? onOpen(c) : goTo(idx))}
              role="group"
              aria-roledescription="slide"
              aria-label={`Chapter ${c.chapter}: ${c.title}`}
            >
              <span className={styles.coverChapter}>Ch. {c.chapter}</span>
              <span className={styles.coverIcon} aria-hidden="true">{c.icon}</span>

              <div className={styles.coverArtFrame}>
                <ChapterArt kind={c.id} />
                <div className={styles.coverArtGloss} aria-hidden="true" />
              </div>

              <div className={styles.coverMeta}>
                <h3 className={styles.coverTitle}>{c.title}</h3>
                <p className={styles.coverSubtitle}>{c.subtitle}</p>
              </div>

              {isActive && (
                <div className={styles.coverOpen}>
                  <span>Open chapter</span>
                  <MdArrowOutward aria-hidden="true" />
                </div>
              )}

              <div className={styles.coverSpine} aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <button
        className={`${styles.coverArrow} ${styles.coverArrowNext}`}
        onClick={goNext}
        aria-label="Next chapter"
        type="button"
      >›</button>

      <div className={styles.coverDots} role="tablist" aria-label="Chapter indicators">
        {chapters.map((c, idx) => (
          <button
            key={c.id}
            className={`${styles.coverDot} ${idx === current ? styles.coverDotActive : ''}`}
            onClick={() => goTo(idx)}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Go to chapter ${c.chapter}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Journey milestones ───────────────────────────────────────────────────── */

const Journey = ({ stops, onSelect }) => {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} className={`${styles.journey} ${inView ? styles.journeyVisible : ''}`}>
      <svg className={styles.journeyPath} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M 20 110 C 180 30, 280 180, 440 100 S 720 30, 880 130 S 980 80, 990 90"
          fill="none"
          stroke="var(--accent-1)"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      <ol className={styles.journeyList}>
        {stops.map((s, i) => (
          <li
            key={s.id ?? i}
            className={styles.journeyItem}
            style={{ '--ji': i }}
          >
            <button
              type="button"
              className={styles.journeyDot}
              onClick={() => onSelect(s)}
              aria-label={`${s.title} — ${s.period ?? ''}`}
            >
              <span className={styles.journeyDotInner} />
              <span className={styles.journeyDotPulse} aria-hidden="true" />
            </button>
            <div className={styles.journeyLabel}>
              <span className={styles.journeyPeriod}>{s.period ?? '—'}</span>
              <span className={styles.journeyTitle}>{s.title}</span>
              {s.subtitle && <span className={styles.journeySubtitle}>{s.subtitle}</span>}
            </div>
          </li>
        ))}
      </ol>

      {stops.length === 0 && (
        <p className={styles.journeyEmpty}>The journey is being written…</p>
      )}
    </div>
  );
};

/* ─── Side-peek polaroid ───────────────────────────────────────────────────── */

const PolaroidCard = ({ src, index, onOpen }) => {
  const rot = (((index * 13) % 11) - 5).toFixed(1);
  return (
    <button
      type="button"
      className={styles.polaroid}
      style={{ '--pr': `${rot}deg`, '--pi': index }}
      onClick={() => onOpen({ src, index })}
      aria-label={`Open memento ${index + 1}`}
    >
      <span className={styles.polaroidTape} aria-hidden="true" />
      <span className={styles.polaroidLeaf} aria-hidden="true">
        <PaintDrop />
      </span>
      <span className={styles.polaroidPhotoWrap}>
        <img
          src={src}
          alt={`Memento ${index + 1}`}
          className={styles.polaroidImg}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </span>
      <span className={styles.polaroidCaption}>No. {index + 1}</span>
    </button>
  );
};

const PolaroidSkel = ({ index }) => {
  const rot = (((index * 13) % 11) - 5).toFixed(1);
  return (
    <span
      className={`${styles.polaroid} ${styles.polaroidSkel}`}
      style={{ '--pr': `${rot}deg`, '--pi': index }}
      aria-hidden="true"
    >
      <span className={styles.polaroidTape} />
      <span className={styles.polaroidPhotoWrap}>
        <span className={styles.polaroidImgSkel} />
      </span>
      <span className={styles.polaroidCaptionSkel} />
    </span>
  );
};

const SidePolaroid = ({ src, index, side, onOpen, loading = false }) => {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`${styles.sidePolaroidWrap} ${styles[`side_${side}`]} ${inView ? styles.sidePolaroidIn : ''}`}
      aria-hidden={loading ? 'true' : undefined}
    >
      {loading
        ? <PolaroidSkel index={index} />
        : <PolaroidCard src={src} index={index} onOpen={onOpen} />
      }
    </div>
  );
};

/* ─── Skill paint chips ────────────────────────────────────────────────────── */

const SkillPile = ({ skills }) => {
  const [ref, inView] = useInView(0.10);
  if (skills.length === 0) return null;
  return (
    <div ref={ref} className={`${styles.pile} ${inView ? styles.pileVisible : ''}`}>
      {skills.map((s, i) => (
        <span
          key={i}
          className={styles.skillLeaf}
          style={{
            '--si': i,
            '--rot': `${((i * 13) % 5) - 2}deg`,
          }}
        >
          <FaPaintBrush className={styles.skillLeafIcon} aria-hidden="true" />
          {s.label}
        </span>
      ))}
    </div>
  );
};

/* ─── Helper: derive journey from experience + education ───────────────────── */

const toJourney = ({ experience = [], education = [] }) => {
  const ex = experience.map(e => ({
    id:       `exp-${e.id}`,
    title:    e.company || e.employer || e.organisation || 'Role',
    subtitle: e.role || e.position || e.title,
    period:   e.period || e.dates || (e.start ? `${e.start}${e.end ? ` – ${e.end}` : ' – Present'}` : null),
    description: e.description || e.summary,
    tags:     e.tech || e.technologies || e.stack || e.tags,
    kind:     'experience',
    order:    e.order ?? 0,
  }));
  const ed = education.map(e => ({
    id:       `edu-${e.id}`,
    title:    e.institution || e.school || e.university || 'Education',
    subtitle: [e.degree || e.qualification, e.field || e.major].filter(Boolean).join(' — '),
    period:   e.period || e.dates || (e.start ? `${e.start}${e.end ? ` – ${e.end}` : ' – Present'}` : null),
    description: e.description || e.summary,
    tags:     e.tags,
    kind:     'education',
    order:    e.order ?? 0,
  }));
  return [...ex, ...ed].sort((a, b) => a.order - b.order);
};

/* ─── Main page ───────────────────────────────────────────────────────────── */

const Home = () => {
  const { data, loading } = usePortfolioData();
  const { photos, loading: photosLoading } = usePolaroidPhotos();
  const navigate = useNavigate();
  const pageRef  = useRef(null);

  const [openChapter,   setOpenChapter]   = useState(null);
  const [openMilestone, setOpenMilestone] = useState(null);
  const [openPolaroid,  setOpenPolaroid]  = useState(null);

  const polaroidSlot = (slotIndex) => {
    const side = slotIndex % 2 === 0 ? 'right' : 'left';
    if (photosLoading && slotIndex < PAIRED_PHOTOS) {
      return <SidePolaroid key={`skel-${slotIndex}`} index={slotIndex} side={side} loading />;
    }
    if (!photosLoading && photos.length >= PAIRED_PHOTOS && photos[slotIndex]) {
      return (
        <SidePolaroid
          key={photos[slotIndex]}
          src={photos[slotIndex]}
          index={slotIndex}
          side={side}
          onOpen={setOpenPolaroid}
        />
      );
    }
    return null;
  };

  /* Cursor warm-spot */
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    if (typeof window === 'undefined') return;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const small  = window.matchMedia('(max-width: 768px)').matches;
    if (coarse || small) return;

    let raf = 0;
    let lastX = 0, lastY = 0;
    const apply = () => {
      raf = 0;
      page.style.setProperty('--cx', `${lastX}px`);
      page.style.setProperty('--cy', `${lastY}px`);
    };
    const onMove = (e) => {
      lastX = e.clientX; lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const [coverRef,   coverInView]   = useInView(0.20);
  const [chapterRef, chapterInView] = useInView(0.10);
  const [journeyRef, journeyInView] = useInView(0.10);
  const [pileSecRef, pileSecInView] = useInView(0.10);
  const [galleryRef, galleryInView] = useInView(0.10);
  const [endRef,     endInView]     = useInView(0.20);

  const personal   = data?.personal ?? {};
  const social     = data?.social   ?? [];
  const skills     = flattenSkills(data?.skills);
  const journey    = useMemo(() => toJourney(data ?? {}), [data]);
  const instagram  = social.find(s => (s.key || '').toLowerCase() === 'instagram');
  const linkedin   = social.find(s => (s.key || '').toLowerCase() === 'linkedin');
  const photoUrl   = personal.photoUrl ?? null;

  const opening = personal.bio
    ?? personal.summary
    ?? 'Welcome. Come explore the studio and see the world through my eyes.';

  return (
    <div
      ref={pageRef}
      className={styles.page}
      style={{ '--cx': '-500px', '--cy': '-500px' }}
    >
      {/* Atmospheric layers */}
      <div className={styles.warmSpot} aria-hidden="true" />
      <div className={styles.parchment} aria-hidden="true" />
      <div className={styles.coffeeStains} aria-hidden="true" />
      <DriftingMotes />
      <FloatingPaintDrops />

      {/* ── Scene 1 ── Cover ──────────────────────────────────────────── */}
      <div className={`${styles.sceneFrame} ${styles.sceneFrame_cover}`}>
      <section ref={coverRef} className={styles.cover}>

        <div className={styles.coverFlourish} aria-hidden="true">
          <FaPaintBrush />
          <span className={styles.coverFlourishLine} />
        </div>

        <p className={styles.coverEyebrow}>Welcome</p>

        <h1 className={styles.coverTitleLine}>
          <span className={styles.coverTitleSerif}>the sketchbook of</span>
          {loading
            ? <span className={`${styles.coverTitleSkel} ${styles.shimmerBar}`} aria-hidden="true" />
            : (
              <span className={styles.coverTitleScript}>
                {personal.name ?? 'an artist'}
              </span>
            )
          }
        </h1>

        {loading
          ? (
            <p className={styles.coverByline} aria-hidden="true">
              <span className={`${styles.coverBySkel} ${styles.shimmerBar}`} />
            </p>
          )
          : (
            <p className={styles.coverByline}>
              <span className={styles.coverByLabel}>a collection of chapters</span>
              {personal.title && (
                <>
                  <span className={styles.coverByDot} aria-hidden="true">·</span>
                  <span className={styles.coverByRole}>{personal.title}</span>
                </>
              )}
            </p>
          )
        }

        <div className={styles.coverDivider} aria-hidden="true">
          <PaintDrop className={styles.coverDividerLeaf} />
        </div>

        {loading
          ? (
            <div className={styles.coverOpeningSkel} aria-hidden="true">
              <span className={`${styles.openingLine} ${styles.shimmerBar}`} />
              <span className={`${styles.openingLine} ${styles.shimmerBar}`} style={{ width: '94%' }} />
              <span className={`${styles.openingLine} ${styles.shimmerBar}`} style={{ width: '78%' }} />
            </div>
          )
          : (
            <div className={styles.coverOpening}>
              <span className={styles.coverDropcap}>C</span>
              <WordReveal
                text={`ome explore the studio. ${opening}`}
                inView={coverInView}
                className={styles.coverProse}
                delay={0.2}
              />
            </div>
          )
        }

        {/* Portrait + invitation */}
        <div className={styles.coverPortraitRow}>
          {(loading || photoUrl) && (
            <div className={styles.coverPortrait}>
              {loading
                ? <span className={styles.coverPortraitSkel} />
                : (
                  <>
                    <img src={photoUrl} alt={personal.name ?? 'Profile'} className={styles.coverPortraitImg} />
                    <span className={styles.coverPortraitRing} aria-hidden="true" />
                    <span className={styles.coverPortraitLeaf} aria-hidden="true">
                      <PaintDrop />
                    </span>
                  </>
                )
              }
            </div>
          )}

          <div className={styles.coverInvite}>
            <p className={styles.coverInviteText}>
              Two chapters wait below. Pick one whenever you are ready.
            </p>
            <div className={styles.coverCtas}>
              <MagneticButton onClick={() => navigate('/projects')}>
                Browse the studio <MdAutoStories aria-hidden="true" />
              </MagneticButton>
              <CursorGlowButton onClick={() => navigate('/connect')}>
                Get in touch
              </CursorGlowButton>
            </div>

            {!loading && (instagram || linkedin) && (
              <div className={styles.coverSocials}>
                {instagram && (
                  <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={styles.coverSocialLink}>
                    <FaInstagram aria-hidden="true" />
                    Instagram
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={styles.coverSocialLink}>
                    <FaLinkedin aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

      </section>
      </div>

      {/* ── Scene 2 ── Chapter Carousel ───────────────────────────────── */}
      <div className={`${styles.sceneFrame} ${styles.sceneFrame_chapters}`}>
      <section ref={chapterRef} className={`${styles.scene} ${styles.sceneChapters} ${chapterInView ? styles.sceneVisible : ''}`}>
        <div className={styles.sceneHead}>
          <span className={styles.sceneEye}>Chapter I</span>
          <h2 className={styles.sceneTitle}>Choose your chapter</h2>
          <p className={styles.sceneLede}>
            Three covers, three short stories. Tap one to peek inside; open it to read in full.
          </p>
        </div>

        <ChapterCarousel chapters={CHAPTERS} onOpen={setOpenChapter} />
      </section>

      {polaroidSlot(0)}
      </div>

      {/* ── Scene 3 ── The Journey ────────────────────────────────────── */}
      <div className={`${styles.sceneFrame} ${styles.sceneFrame_journey}`}>
      <section ref={journeyRef} className={`${styles.scene} ${journeyInView ? styles.sceneVisible : ''}`}>
        <div className={styles.sceneHead}>
          <span className={styles.sceneEye}>Chapter II</span>
          <h2 className={styles.sceneTitle}>The journey so far</h2>
          <p className={styles.sceneLede}>
            From first brushstroke to where I am today. Press a milestone to read its story.
          </p>
        </div>

        {loading
          ? <div className={styles.journeySkel}>{[0,1,2,3].map(i =>
              <span key={i} className={styles.journeySkelDot} />
            )}</div>
          : <Journey stops={journey} onSelect={setOpenMilestone} />
        }
      </section>

      {polaroidSlot(1)}
      </div>

      {/* ── Scene 4 ── The Toolkit ────────────────────────────────────── */}
      <div className={`${styles.sceneFrame} ${styles.sceneFrame_toolkit}`}>
      {(loading || skills.length > 0) && (
        <section ref={pileSecRef} className={`${styles.scene} ${pileSecInView ? styles.sceneVisible : ''}`}>
          <div className={styles.sceneHead}>
            <span className={styles.sceneEye}>Chapter III</span>
            <h2 className={styles.sceneTitle}>The toolkit</h2>
            <p className={styles.sceneLede}>
              Skills and tools gathered along the way — pinned here like paint chips.
            </p>
          </div>

          {loading
            ? (
              <div className={styles.pile}>
                {[72, 56, 88, 64, 80, 92, 50, 68].map((w, i) => (
                  <span key={i} className={styles.skillLeafSkel} style={{ width: w }} />
                ))}
              </div>
            )
            : <SkillPile skills={skills} />
          }
        </section>
      )}

      {polaroidSlot(2)}
      </div>

      {/* The album — every remaining photo, gathered as a scrapbook spread */}
      {!photosLoading && photos.length > PAIRED_PHOTOS && (
        <section ref={galleryRef} className={`${styles.gallery} ${galleryInView ? styles.galleryVisible : ''}`}>
          <div className={styles.sceneHead}>
            <span className={styles.sceneEye}>Between the chapters</span>
            <h2 className={styles.sceneTitle}>More from the album</h2>
          </div>
          <div className={styles.galleryGrid}>
            {photos.slice(PAIRED_PHOTOS).map((src, j) => (
              <PolaroidCard
                key={src}
                src={src}
                index={j + PAIRED_PHOTOS}
                onOpen={setOpenPolaroid}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Scene 5 ── Epilogue ───────────────────────────────────────── */}
      <section ref={endRef} className={`${styles.scene} ${styles.sceneEnd} ${endInView ? styles.sceneVisible : ''}`}>
        <div className={styles.endCard}>
          <span className={styles.endOrnament} aria-hidden="true">
            <PaintDrop />
            <span className={styles.endOrnamentLine} />
            <PaintDrop />
          </span>
          <h2 className={styles.endTitle}>That is just the beginning.</h2>
          <p className={styles.endText}>
            The full story lives in the studio. Browse the work, or reach out and we will make something together.
          </p>
          <div className={styles.endCtas}>
            <MagneticButton onClick={() => navigate('/projects')}>
              <FaPalette aria-hidden="true" /> Browse the Studio
            </MagneticButton>
            <CursorGlowButton onClick={() => navigate('/connect')}>
              <MdEmail aria-hidden="true" /> Get in Touch
            </CursorGlowButton>
          </div>
        </div>
      </section>

      <div className={styles.pageFade} aria-hidden="true" />

      {/* ── Modals ───────────────────────────────────────────────────── */}
      <Modal open={!!openChapter} onClose={() => setOpenChapter(null)} title={openChapter ? `Chapter ${openChapter.chapter} · ${openChapter.title}` : ''} size="md">
        {openChapter && (
          <div className={styles.chapterModal}>
            <div className={`${styles.chapterModalArt} ${styles[`accent_${openChapter.accent}`]}`}>
              <ChapterArt kind={openChapter.id} />
            </div>
            <p className={styles.chapterModalOpening}>{openChapter.opening}</p>
            <p className={styles.chapterModalExcerpt}>{openChapter.excerpt}</p>
            <div className={styles.chapterModalActions}>
              <MagneticButton onClick={() => { setOpenChapter(null); navigate(openChapter.to); }}>
                {openChapter.cta} <MdArrowOutward aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!openMilestone} onClose={() => setOpenMilestone(null)} title={openMilestone?.title} size="md">
        {openMilestone && (
          <div className={styles.milestoneModal}>
            <span className={`${styles.milestoneKind} ${styles[`milestoneKind_${openMilestone.kind}`]}`}>
              {openMilestone.kind === 'education' ? 'Education' : 'Experience'}
            </span>
            {openMilestone.subtitle && <p className={styles.milestoneSub}>{openMilestone.subtitle}</p>}
            {openMilestone.period   && <p className={styles.milestonePeriod}>{openMilestone.period}</p>}
            {openMilestone.description && <p className={styles.milestoneDesc}>{openMilestone.description}</p>}
            {openMilestone.tags?.length > 0 && (
              <div className={styles.milestoneTags}>
                {openMilestone.tags.map((t, i) => (
                  <span key={i} className={styles.milestoneTag}>{t}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        open={!!openPolaroid}
        onClose={() => setOpenPolaroid(null)}
        title={openPolaroid ? `Memento No. ${openPolaroid.index + 1}` : ''}
        size="lg"
      >
        {openPolaroid && (
          <div className={styles.lightbox}>
            <img
              src={openPolaroid.src}
              alt={`Memento ${openPolaroid.index + 1}`}
              className={styles.lightboxImg}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
