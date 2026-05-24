import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuArrowRight, LuArrowUpRight, LuMapPin } from 'react-icons/lu';
import { usePortfolioData, useDesignProjects } from '../../hooks';
import { getProjectCover } from '../../data/projectImages';
import Loading from '../Loading';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { data, loading } = usePortfolioData();
  const { projects } = useDesignProjects();

  if (loading || !data) return <Loading />;

  const { personal } = data;
  const featured = (projects || []).slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>
            <span className={styles.wave} aria-hidden="true">✺</span> Hello, I’m
          </p>
          <h1 className={styles.name}>{personal?.name}</h1>
          <p className={styles.role}>{personal?.title}</p>
          <p className={styles.lead}>{personal?.bio}</p>

          <div className={styles.ctaRow}>
            <button className="btn-primary" type="button" onClick={() => navigate('/projects')}>
              View my work <LuArrowRight aria-hidden="true" />
            </button>
            <button type="button" onClick={() => navigate('/connect')}>
              Get in touch
            </button>
          </div>

          {personal?.location && (
            <p className={styles.location}>
              <LuMapPin aria-hidden="true" /> {personal.location}
            </p>
          )}
        </div>

        <div className={styles.heroArt}>
          <span className={`${styles.blob} ${styles.blob1}`} aria-hidden="true" />
          <span className={`${styles.blob} ${styles.blob2}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dot1}`} aria-hidden="true" />
          <span className={`${styles.dot} ${styles.dot2}`} aria-hidden="true" />
          <div className={styles.photoFrame}>
            {personal?.photoUrl && (
              <img src={personal.photoUrl} alt={personal?.name} className={styles.photo} />
            )}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className={styles.featured}>
          <header className={styles.featuredHead}>
            <h2 className={styles.featuredTitle}>Selected work</h2>
            <button className="btn-ghost" type="button" onClick={() => navigate('/projects')}>
              See all projects <LuArrowUpRight aria-hidden="true" />
            </button>
          </header>

          <div className={styles.cards}>
            {featured.map((project, i) => {
              const cover = getProjectCover(project.imageFolder);
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`${styles.card} ${styles[`accent${(i % 3) + 1}`]}`}
                  onClick={() => navigate('/projects')}
                >
                  <span className={styles.cardMedia}>
                    {cover && <img src={cover} alt={project.title} loading="lazy" />}
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardCategory}>{project.category}</span>
                    <span className={styles.cardName}>{project.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
