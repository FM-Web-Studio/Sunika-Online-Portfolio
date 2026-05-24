import React, { useState } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { useDesignProjects } from '../../hooks';
import { Modal } from '../../components';
import { getProjectCover, getProjectMedia } from '../../data/projectImages';
import Loading from '../Loading';
import styles from './Projects.module.css';

const Projects = () => {
  const { projects, loading } = useDesignProjects();
  const [selected, setSelected] = useState(null);

  if (loading) return <Loading />;

  const list = projects || [];
  const media = selected ? getProjectMedia(selected.imageFolder) : [];

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Portfolio</p>
        <h1 className={styles.title}>Projects &amp; design work</h1>
        <p className={styles.subtitle}>
          A selection of branding, illustration, editorial, and motion design pieces.
          Tap any project to explore the full set.
        </p>
      </header>

      <div className={styles.grid}>
        {list.map((project, i) => {
          const cover = getProjectCover(project.imageFolder);
          const count = getProjectMedia(project.imageFolder).length;
          return (
            <button
              key={project.id}
              type="button"
              className={`${styles.card} ${styles[`accent${(i % 3) + 1}`]}`}
              onClick={() => setSelected(project)}
            >
              <span className={styles.media}>
                {cover && <img src={cover} alt={project.title} loading="lazy" />}
                <span className={styles.count}>{count} {count === 1 ? 'item' : 'items'}</span>
              </span>
              <span className={styles.body}>
                <span className={styles.cardCategory}>{project.category} · {project.year}</span>
                <span className={styles.cardName}>
                  {project.title}
                  <LuArrowUpRight className={styles.cardArrow} aria-hidden="true" />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className={styles.detail}>
            <div className={styles.detailMeta}>
              <span className={styles.metaPill}>{selected.category}</span>
              <span className={styles.metaPill}>{selected.year}</span>
            </div>

            {selected.description && <p className={styles.detailDesc}>{selected.description}</p>}

            {selected.tags?.length > 0 && (
              <ul className={styles.tagList}>
                {selected.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>{tag}</li>
                ))}
              </ul>
            )}

            <div className={styles.gallery}>
              {media.map((m) =>
                m.video ? (
                  <video
                    key={m.src}
                    className={styles.galleryItem}
                    src={m.src}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    key={m.src}
                    className={styles.galleryItem}
                    src={m.src}
                    alt={selected.title}
                    loading="lazy"
                  />
                ),
              )}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Projects;
