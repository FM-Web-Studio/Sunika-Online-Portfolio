import React, { useMemo } from 'react';
import { LuGraduationCap, LuPalette, LuHeart, LuMapPin } from 'react-icons/lu';
import { usePortfolioData } from '../../hooks';
import { ImageCarousel } from '../../components';
import { ME_PHOTOS } from '../../data/projectImages';
import Loading from '../Loading';
import styles from './Bio.module.css';

const photoLabel = (path) =>
  decodeURIComponent(path.split('/').pop().replace(/\.[^.]+$/, ''));

const Bio = () => {
  const { data, loading } = usePortfolioData();

  const photos = useMemo(
    () => ME_PHOTOS.map((p) => ({ src: encodeURI(p), alt: photoLabel(p), title: photoLabel(p) })),
    [],
  );

  if (loading || !data) return <Loading />;

  const { personal, skills, interests, education } = data;

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>About me</p>
        <h1 className={styles.title}>The artist behind the work</h1>
      </header>

      <section className={styles.intro}>
        <div className={styles.photoCol}>
          <div className={styles.photoFrame}>
            {personal?.photoUrl && (
              <img src={personal.photoUrl} alt={personal?.name} className={styles.photo} />
            )}
          </div>
          {personal?.location && (
            <p className={styles.locationChip}>
              <LuMapPin aria-hidden="true" /> {personal.location}
            </p>
          )}
        </div>

        <div className={styles.bioCol}>
          <h2 className={styles.hi}>Hi, I’m {personal?.name} 👋</h2>
          <p className={styles.bioText}>{personal?.bio}</p>
        </div>
      </section>

      {photos.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>A few moments</h2>
          <ImageCarousel items={photos} autoPlay autoPlayInterval={4500} aspectRatio="4/3" />
        </section>
      )}

      {skills?.categories?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <LuPalette aria-hidden="true" className={styles.sectionIcon} /> What I do
          </h2>
          <div className={styles.skillGrid}>
            {skills.categories.map((cat, i) => (
              <div key={cat.name} className={`${styles.skillCard} ${styles[`accent${(i % 3) + 1}`]}`}>
                <h3 className={styles.skillCatName}>{cat.name}</h3>
                <ul className={styles.chipList}>
                  {cat.items.map((item) => (
                    <li key={item} className={styles.chip}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <LuGraduationCap aria-hidden="true" className={styles.sectionIcon} /> Education
          </h2>
          <div className={styles.timeline}>
            {education.map((edu) => (
              <article key={edu.id} className={styles.eduCard}>
                <span className={styles.eduPeriod}>{edu.period}</span>
                <h3 className={styles.eduQual}>{edu.qualification}</h3>
                <p className={styles.eduInstitution}>{edu.institution}</p>
                {edu.description && <p className={styles.eduDesc}>{edu.description}</p>}
                {edu.tags?.length > 0 && (
                  <ul className={styles.chipList}>
                    {edu.tags.map((tag) => (
                      <li key={tag} className={styles.chipSoft}>{tag}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {interests?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <LuHeart aria-hidden="true" className={styles.sectionIcon} /> Beyond the studio
          </h2>
          <ul className={styles.chipList}>
            {interests.map((interest) => (
              <li key={interest} className={styles.chip}>{interest}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Bio;
