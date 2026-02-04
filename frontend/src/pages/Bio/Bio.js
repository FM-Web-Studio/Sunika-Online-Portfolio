import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Globe, Award,
  Briefcase, GraduationCap, Palette, Code, Heart,
  Languages, TrendingUp, Sparkles, BookOpen, Target
} from 'lucide-react';

// ============================================
// IMPORTS - DATA & COMPONENTS
// ============================================

import styles from './Bio.module.css';
import bioData from '../../information/bio.json';
import profileImage from './Profile.jpg';
import { LazyImage } from '../../components';

// ============================================
// BIO COMPONENT
// ============================================
// Professional biography page showcasing education,
// skills, experience, and professional journey

function Bio() {
  // ----------------------------------------
  // State Management
  // ----------------------------------------
  
  const [isVisible, setIsVisible] = useState(false);

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ----------------------------------------
  // Helper Functions
  // ----------------------------------------
  
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

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <div className={styles.bioContainer}>
      {/* Hero Section */}
      <section className={`${styles.hero} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.heroBackground}>
          <div className={styles.gridPattern} />
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.profileSection}>
            <div className={styles.profileImageWrapper}>
              <LazyImage 
                src={profileImage} 
                alt={bioData.fullName}
                className={styles.profileImage}
                threshold={0}
                rootMargin="0px"
              />
            </div>
            
            <div className={styles.profileInfo}>
              <div className={styles.badge}>
                <Sparkles size={14} />
                <span>Professional Profile</span>
              </div>
              <h1 className={styles.name}>{bioData.fullName}</h1>
              <p className={styles.title}>{bioData.professional.headline}</p>
              
              <div className={styles.quickStats}>
                <div className={styles.stat}>
                  <MapPin size={18} />
                  <span>{bioData.personal.location}</span>
                </div>
                <div className={styles.stat}>
                  <Calendar size={18} />
                  <span>{calculateAge(bioData.personal.birthDate)} years old</span>
                </div>
                <div className={styles.stat}>
                  <Globe size={18} />
                  <span>{bioData.personal.nationality}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <Target size={20} />
              <h2>Professional Summary</h2>
            </div>
            <p className={styles.summary}>{bioData.summary}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Education Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Education</h2>
              <p className={styles.sectionSubtitle}>Academic Background & Qualifications</p>
            </div>
          </div>

          <div className={styles.timelineContainer}>
            {bioData.education.map((edu, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineLine} />
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <div>
                      <h3 className={styles.itemTitle}>{edu.degree || edu.level}</h3>
                      <p className={styles.itemInstitution}>
                        {edu.institution || edu.school}
                        {edu.campus && ` • ${edu.campus}`}
                      </p>
                    </div>
                    <div className={styles.itemDate}>
                      {edu.startYear ? `${edu.startYear} - ${edu.expectedGraduation || edu.yearCompleted || 'Present'}` : edu.yearCompleted}
                    </div>
                  </div>

                  {edu.status && (
                    <div className={styles.statusBadge}>{edu.status}</div>
                  )}

                  {edu.notes && (
                    <p className={styles.itemDescription}>{edu.notes}</p>
                  )}

                  {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                    <div className={styles.detailSection}>
                      <div className={styles.detailHeader}>
                        <BookOpen size={16} />
                        <span>Key Coursework</span>
                      </div>
                      <div className={styles.chipGrid}>
                        {edu.relevantCoursework.map((course, idx) => (
                          <span key={idx} className={styles.chip}>{course}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.subjects && edu.subjects.length > 0 && (
                    <div className={styles.detailSection}>
                      <div className={styles.detailHeader}>
                        <BookOpen size={16} />
                        <span>Subjects</span>
                      </div>
                      <div className={styles.chipGrid}>
                        {edu.subjects.map((subject, idx) => (
                          <span key={idx} className={styles.chip}>{subject}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
              <p className={styles.sectionSubtitle}>Professional Competencies & Proficiency Levels</p>
            </div>
          </div>

          <div className={styles.skillsContainer}>
            {/* Creative Skills */}
            <div className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <Palette size={20} />
                <h3>Creative Skills</h3>
              </div>
              <div className={styles.skillsList}>
                {bioData.skills.creative.map((skill, idx) => (
                  <div key={idx} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{typeof skill === 'string' ? skill : skill.name}</span>
                      <span className={styles.skillLevel}>
                        {typeof skill === 'string' ? '85%' : `${skill.level}%`}
                      </span>
                    </div>
                    <div className={styles.skillBar}>
                      <div 
                        className={styles.skillFill}
                        style={{ width: typeof skill === 'string' ? '85%' : `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <Code size={20} />
                <h3>Technical Skills</h3>
              </div>
              <div className={styles.skillsList}>
                {bioData.skills.technical.map((skill, idx) => (
                  <div key={idx} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{typeof skill === 'string' ? skill : skill.name}</span>
                      <span className={styles.skillLevel}>
                        {typeof skill === 'string' ? '85%' : `${skill.level}%`}
                      </span>
                    </div>
                    <div className={styles.skillBar}>
                      <div 
                        className={styles.skillFill}
                        style={{ width: typeof skill === 'string' ? '85%' : `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className={styles.skillCategory}>
              <div className={styles.categoryHeader}>
                <Heart size={20} />
                <h3>Soft Skills</h3>
              </div>
              <div className={styles.skillsList}>
                {bioData.skills.soft.map((skill, idx) => (
                  <div key={idx} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{typeof skill === 'string' ? skill : skill.name}</span>
                      <span className={styles.skillLevel}>
                        {typeof skill === 'string' ? '85%' : `${skill.level}%`}
                      </span>
                    </div>
                    <div className={styles.skillBar}>
                      <div 
                        className={styles.skillFill}
                        style={{ width: typeof skill === 'string' ? '85%' : `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Languages & Personal Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Heart size={24} />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <p className={styles.sectionSubtitle}>Languages, Interests & Achievements</p>
            </div>
          </div>

          <div className={styles.personalGrid}>
            {/* Languages */}
            {bioData.personal.languages && bioData.personal.languages.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Languages size={20} />
                  <h3>Languages</h3>
                </div>
                <div className={styles.cardContent}>
                  {bioData.personal.languages.map((lang, idx) => (
                    <div key={idx} className={styles.listItem}>
                      <div className={styles.listDot} />
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies */}
            {bioData.personal.hobbies && bioData.personal.hobbies.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Palette size={20} />
                  <h3>Hobbies & Interests</h3>
                </div>
                <div className={styles.cardContent}>
                  {bioData.personal.hobbies.map((hobby, idx) => (
                    <div key={idx} className={styles.listItem}>
                      <div className={styles.listDot} />
                      <span>{hobby}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {bioData.interests && bioData.interests.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Sparkles size={20} />
                  <h3>Professional Interests</h3>
                </div>
                <div className={styles.cardContent}>
                  {bioData.interests.map((interest, idx) => (
                    <div key={idx} className={styles.listItem}>
                      <div className={styles.listDot} />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {bioData.personal.achievements && bioData.personal.achievements.length > 0 && (
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Award size={20} />
                  <h3>Achievements</h3>
                </div>
                <div className={styles.cardContent}>
                  {bioData.personal.achievements.map((achievement, idx) => (
                    <div key={idx} className={styles.listItem}>
                      <div className={styles.listDot} />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Experience Section (if exists) */}
        {bioData.professional_experience && bioData.professional_experience.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <Briefcase size={24} />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Professional Experience</h2>
                <p className={styles.sectionSubtitle}>Work History & Accomplishments</p>
              </div>
            </div>

            <div className={styles.timelineContainer}>
              {bioData.professional_experience.map((exp, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineLine} />
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <div>
                        <h3 className={styles.itemTitle}>{exp.title}</h3>
                        <p className={styles.itemInstitution}>
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <div className={styles.itemDate}>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </div>
                    </div>
                    
                    <p className={styles.itemDescription}>{exp.description}</p>
                    
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className={styles.detailSection}>
                        <div className={styles.detailHeader}>
                          <span>Key Responsibilities</span>
                        </div>
                        <ul className={styles.detailList}>
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className={styles.detailSection}>
                        <div className={styles.detailHeader}>
                          <span>Achievements</span>
                        </div>
                        <ul className={styles.detailList}>
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

// ============================================
// EXPORTS
// ============================================

export default Bio;