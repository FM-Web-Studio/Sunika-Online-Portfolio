import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Globe, Award,
  Briefcase, GraduationCap, Palette, Code, Heart, Star,
  Languages, TrendingUp
} from 'lucide-react';
import styles from './Bio.module.css';
import bioData from '../../information/bio.json';
import profileImage from '../../images/Me/Profile.jpg';
import { LazyImage } from '../../components';

function Bio() {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={styles.bioContainer}>
      {/* Scroll Progress Bar */}
      {scrollProgress > 0.5 && scrollProgress < 99.5 && (
        <div className={styles.scrollProgress} style={{ width: `${scrollProgress}%` }} />
      )}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb} data-orb="1" />
          <div className={styles.gradientOrb} data-orb="2" />
          <div className={styles.gradientOrb} data-orb="3" />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.profileImageWrapper}>
            <div className={styles.profileImageBorder} />
            <LazyImage 
              src={profileImage} 
              alt={bioData.fullName}
              className={styles.profileImage}
              threshold={0}
              rootMargin="0px"
            />
            <div className={styles.profileBadge}>
              <Star size={16} fill="currentColor" />
            </div>
          </div>
          
          <h1 className={styles.name}>{bioData.fullName}</h1>
          <p className={styles.title}>{bioData.professional.headline}</p>
          
          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <Calendar size={20} />
              <span>{calculateAge(bioData.personal.birthDate)} years old</span>
            </div>
            <div className={styles.stat}>
              <MapPin size={20} />
              <span>{bioData.personal.nationality}</span>
            </div>
            <div className={styles.stat}>
              <Globe size={20} />
              <span>{bioData.personal.languages.length} Languages</span>
            </div>
          </div>

          <p className={styles.summary}>{bioData.summary}</p>
        </div>
      </section>

      {/* Education Section */}
      <div className={styles.educationGrid}>
        <section 
          className={`${styles.section} ${activeSection === 'education' ? styles.sectionActive : ''}`}
          onMouseEnter={() => setActiveSection('education')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon} data-color="accent1">
              <GraduationCap size={24} />
            </div>
            <h2 className={styles.sectionTitle}>Education</h2>
          </div>

          <div className={styles.cardsContainer}>
            {bioData.education.map((edu, index) => (
              <div key={index} className={styles.timelineCard}>
                <div className={styles.timelineDot} data-color="accent1" />
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.cardTitle}>{edu.degree || edu.level}</h3>
                      <p className={styles.cardInstitution}>
                        {edu.institution || edu.school}
                        {edu.campus && ` • ${edu.campus}`}
                      </p>
                    </div>
                    <div className={styles.cardDate}>
                      {edu.startYear ? `${edu.startYear} - ${edu.status || edu.yearCompleted || 'Completed'}` : edu.yearCompleted || 'Completed'}
                    </div>
                  </div>

                  {edu.notes && (
                    <p className={styles.cardDescription}>{edu.notes}</p>
                  )}

                  {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                    <div className={styles.tagSection}>
                      <span className={styles.tagLabel}>Coursework:</span>
                      <div className={styles.tags}>
                        {edu.relevantCoursework.slice(0, 6).map((course, idx) => (
                          <span key={idx} className={styles.tag} data-color="accent1">{course}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.subjects && edu.subjects.length > 0 && (
                    <div className={styles.tagSection}>
                      <span className={styles.tagLabel}>Subjects:</span>
                      <div className={styles.tags}>
                        {edu.subjects.slice(0, 6).map((subject, idx) => (
                          <span key={idx} className={styles.tag} data-color="accent1">{subject}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Skills Section */}
      <div className={styles.skillsGridWrapper}>
        <section 
          className={`${styles.section} ${activeSection === 'skills' ? styles.sectionActive : ''}`}
          onMouseEnter={() => setActiveSection('skills')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon} data-color="accent2">
              <TrendingUp size={24} />
            </div>
            <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
          </div>

          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <Palette size={20} />
                <h3 className={styles.categoryTitle}>Creative Skills</h3>
              </div>
              <div className={styles.skillsList}>
                {bioData.skills.creative.map((skill, idx) => (
                  <div key={idx} className={styles.skillItem} data-color="accent2">
                    <span className={styles.skillName}>{typeof skill === 'string' ? skill : skill.name}</span>
                    <div className={styles.skillBar}>
                      <div 
                        className={styles.skillFill} 
                        data-color="accent2" 
                        style={{ width: typeof skill === 'string' ? '85%' : `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <Code size={20} />
                <h3 className={styles.categoryTitle}>Technical Skills</h3>
              </div>
              <div className={styles.skillsList}>
                {bioData.skills.technical.map((skill, idx) => (
                  <div key={idx} className={styles.skillItem} data-color="accent3">
                    <span className={styles.skillName}>{typeof skill === 'string' ? skill : skill.name}</span>
                    <div className={styles.skillBar}>
                      <div 
                        className={styles.skillFill} 
                        data-color="accent3" 
                        style={{ width: typeof skill === 'string' ? '85%' : `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <Heart size={20} />
                <h3 className={styles.categoryTitle}>Soft Skills</h3>
              </div>
              <div className={styles.skillsList}>
                {bioData.skills.soft.map((skill, idx) => (
                  <div key={idx} className={styles.skillItem} data-color="accent4">
                    <span className={styles.skillName}>{typeof skill === 'string' ? skill : skill.name}</span>
                    <div className={styles.skillBar}>
                      <div 
                        className={styles.skillFill} 
                        data-color="accent4" 
                        style={{ width: typeof skill === 'string' ? '85%' : `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.contentGrid}>
        {/* Personal Interests Section */}
        <section 
          className={`${styles.section} ${styles.sectionWide} ${activeSection === 'personal' ? styles.sectionActive : ''}`}
          onMouseEnter={() => setActiveSection('personal')}
          onMouseLeave={() => setActiveSection(null)}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon} data-color="accent3">
              <Heart size={24} />
            </div>
            <h2 className={styles.sectionTitle}>Personal & Interests</h2>
          </div>

          <div className={styles.interestsGrid}>
            {bioData.personal.languages && bioData.personal.languages.length > 0 && (
              <div className={styles.interestCard}>
                <div className={styles.interestHeader}>
                  <Languages size={20} />
                  <h3>Languages</h3>
                </div>
                <div className={styles.bubbles}>
                  {bioData.personal.languages.map((lang, idx) => (
                    <span key={idx} className={styles.bubble} data-color="accent1">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {bioData.personal.hobbies && bioData.personal.hobbies.length > 0 && (
              <div className={styles.interestCard}>
                <div className={styles.interestHeader}>
                  <Palette size={20} />
                  <h3>Hobbies</h3>
                </div>
                <div className={styles.bubbles}>
                  {bioData.personal.hobbies.map((hobby, idx) => (
                    <span key={idx} className={styles.bubble} data-color="accent2">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {bioData.interests && bioData.interests.length > 0 && (
              <div className={styles.interestCard}>
                <div className={styles.interestHeader}>
                  <Star size={20} />
                  <h3>Interests</h3>
                </div>
                <div className={styles.bubbles}>
                  {bioData.interests.map((interest, idx) => (
                    <span key={idx} className={styles.bubble} data-color="accent3">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {bioData.personal.achievements && bioData.personal.achievements.length > 0 && (
              <div className={styles.interestCard}>
                <div className={styles.interestHeader}>
                  <Award size={20} />
                  <h3>Achievements</h3>
                </div>
                <div className={styles.bubbles}>
                  {bioData.personal.achievements.map((achievement, idx) => (
                    <span key={idx} className={styles.bubble} data-color="accent4">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Experience Section (if exists) */}
        {bioData.professional_experience && bioData.professional_experience.length > 0 && (
          <section 
            className={`${styles.section} ${styles.sectionWide} ${activeSection === 'experience' ? styles.sectionActive : ''}`}
            onMouseEnter={() => setActiveSection('experience')}
            onMouseLeave={() => setActiveSection(null)}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon} data-color="accent4">
                <Briefcase size={24} />
              </div>
              <h2 className={styles.sectionTitle}>Professional Experience</h2>
            </div>

            <div className={styles.cardsContainer}>
              {bioData.professional_experience.map((exp, index) => (
                <div key={index} className={styles.timelineCard}>
                  <div className={styles.timelineDot} data-color="accent4" />
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <div>
                        <h3 className={styles.cardTitle}>{exp.title}</h3>
                        <p className={styles.cardInstitution}>
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <div className={styles.cardDate}>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </div>
                    </div>
                    <p className={styles.cardDescription}>{exp.description}</p>
                    
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className={styles.listSection}>
                        <span className={styles.listTitle}>Responsibilities:</span>
                        <ul className={styles.list}>
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className={styles.listSection}>
                        <span className={styles.listTitle}>Achievements:</span>
                        <ul className={styles.list}>
                          {exp.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Bio;