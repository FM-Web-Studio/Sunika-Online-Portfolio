import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowOutward, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { FaPalette, FaPaintBrush } from 'react-icons/fa';
import useDesignProjects from '../../hooks/useDesignProjects';
import { MagneticButton } from '../../components';
import styles from './Projects.module.css';

// Load all images from Graphic Design subdirectories at build time
const imageContext = require.context(
  '../../images/Graphic Design',
  true,
  /\.(png|jpe?g|gif|webp|svg)$/i
);

const buildImageMap = () => {
  const map = {};
  imageContext.keys().forEach((key) => {
    // key looks like "./Logos/1.jpeg"
    const parts = key.replace(/^\.\//, '').split('/');
    if (parts.length < 2) return;
    const folder = parts[0];
    if (!map[folder]) map[folder] = [];
    map[folder].push(imageContext(key));
  });
  return map;
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Skel = ({ w, h = '0.85rem' }) => (
  <span className={styles.skel} style={{ width: w, height: h }} />
);

const CardSkel = () => (
  <div className={styles.cardSkel}>
    <span className={styles.cardImgSkel} />
    <div className={styles.cardBodySkel}>
      <Skel w="60%" h="1.1rem" />
      <Skel w="40%" />
      <Skel w="90%" />
      <Skel w="75%" />
    </div>
  </div>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const Lightbox = ({ images, startIndex, title, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const total = images.length;

  const prev = (e) => { e.stopPropagation(); setIdx((idx - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setIdx((idx + 1) % total); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  prev(e);
    if (e.key === 'ArrowRight') next(e);
    if (e.key === 'Escape')     onClose();
  };

  return (
    <div
      className={styles.lightboxBackdrop}
      onClick={onClose}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — image ${idx + 1} of ${total}`}
    >
      <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close lightbox" type="button">
          <MdClose />
        </button>

        <div className={styles.lightboxImgWrap}>
          <img
            src={images[idx]}
            alt={`${title} — ${idx + 1} of ${total}`}
            className={styles.lightboxImg}
            draggable={false}
          />
        </div>

        {total > 1 && (
          <>
            <button className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`} onClick={prev} aria-label="Previous image" type="button">
              <MdChevronLeft />
            </button>
            <button className={`${styles.lightboxNav} ${styles.lightboxNavNext}`} onClick={next} aria-label="Next image" type="button">
              <MdChevronRight />
            </button>
            <span className={styles.lightboxCounter}>{idx + 1} / {total}</span>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Project card ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project, images, onOpenLightbox }) => {
  const cover = images?.[0] ?? null;
  const extra = images?.length > 1 ? images.length - 1 : 0;

  return (
    <article className={styles.card}>
      {cover ? (
        <button
          type="button"
          className={styles.cardImgBtn}
          onClick={() => onOpenLightbox(project, images, 0)}
          aria-label={`View ${project.title} images`}
        >
          <img
            src={cover}
            alt={project.title}
            className={styles.cardImg}
            loading="lazy"
            decoding="async"
          />
          {extra > 0 && (
            <span className={styles.cardImgOverlay}>+{extra} more</span>
          )}
        </button>
      ) : (
        <div className={styles.cardImgPlaceholder} aria-hidden="true">
          <FaPalette />
        </div>
      )}

      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          {project.category && (
            <span className={styles.cardCategory}>{project.category}</span>
          )}
          {project.year && (
            <span className={styles.cardYear}>{project.year}</span>
          )}
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>

        {project.description && (
          <p className={styles.cardDesc}>{project.description}</p>
        )}

        {project.tags?.length > 0 && (
          <div className={styles.cardTags}>
            {project.tags.map((t, i) => (
              <span key={i} className={styles.cardTag}>{t}</span>
            ))}
          </div>
        )}

        {images?.length > 0 && (
          <button
            type="button"
            className={styles.cardCta}
            onClick={() => onOpenLightbox(project, images, 0)}
          >
            View work <MdArrowOutward aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Projects = () => {
  const { projects, loading, error } = useDesignProjects();
  const navigate = useNavigate();

  const [lightbox, setLightbox] = useState(null);

  const imageMap = useMemo(() => buildImageMap(), []);

  const openLightbox = (project, images, startIndex) => {
    setLightbox({ project, images, startIndex });
  };

  const sorted = useMemo(() => {
    if (!projects) return [];
    return [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [projects]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <span className={styles.chapterEyebrow}>
            <FaPaintBrush aria-hidden="true" />
            Chapter II — The Studio
          </span>
          <h1 className={styles.pageTitle}>Design Work</h1>
          <p className={styles.pageSubtitle}>
            Brand identities, editorial layouts, packaging, and more — each project a story told through design.
          </p>
        </header>

        {/* ── Error state ── */}
        {error && (
          <div className={styles.errorBox} role="alert">
            <p>Could not load projects. Please try again later.</p>
          </div>
        )}

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {loading
            ? Array.from({ length: 6 }, (_, i) => <CardSkel key={i} />)
            : sorted.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  images={imageMap[project.imageFolder ?? project.title] ?? []}
                  onOpenLightbox={openLightbox}
                />
              ))
          }
        </div>

        {/* ── Footer CTA ── */}
        {!loading && (
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Interested in working together? Let's start a conversation.
            </p>
            <MagneticButton onClick={() => navigate('/connect')}>
              Chapter III — An Impression <MdArrowOutward aria-hidden="true" />
            </MagneticButton>
          </div>
        )}

      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          title={lightbox.project.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};

export default Projects;
