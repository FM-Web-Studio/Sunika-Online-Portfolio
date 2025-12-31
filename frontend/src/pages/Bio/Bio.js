import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import styles from './Bio.module.css';
import bioData from '../../information/bio.json';
import profileImage from '../../images/Profile.png';

function Bio() {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const accentColors = [
      'var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 
      'var(--accent-4)', 'var(--accent-5)', 'var(--accent-6)',
      'var(--accent-7)', 'var(--accent-8)', 'var(--accent-9)', 
      'var(--accent-10)'
    ];

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = accentColors[Math.floor(Math.random() * accentColors.length)];
    
    const newRipple = {
      x,
      y,
      color,
      id: Date.now() + Math.random()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

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
    <div className={styles.bioContainer} onClick={handleClick}>
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color
          }}
        />
      ))}
      
      <div className={styles.content}>
        {/* Hero Header */}
        <header className={styles.hero}>
          <img 
            src={profileImage} 
            alt={bioData.fullName}
            className={styles.profileImage}
          />
          <h1 className={styles.name}>{bioData.fullName}</h1>
          <p className={styles.title}>{bioData.professional.currentTitle}</p>
          <p className={styles.summary}>{bioData.summary}</p>
          
          <div className={styles.contactGrid}>
            <a href={`mailto:${bioData.contact.email}`} className={styles.contactCard}>
              <Mail size={24} className={styles.contactIcon} />
              <span className={styles.contactText}>{bioData.contact.email}</span>
            </a>
            <a href={`tel:${bioData.contact.phone}`} className={styles.contactCard}>
              <Phone size={24} className={styles.contactIcon} />
              <span className={styles.contactText}>{bioData.contact.phone}</span>
            </a>
            <div className={styles.contactCard}>
              <MapPin size={24} className={styles.contactIcon} />
              <span className={styles.contactText}>{bioData.personal.location}</span>
            </div>
            {bioData.contact.social.instagram && (
              <a href={bioData.contact.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                <Instagram size={24} className={styles.contactIcon} />
                <span className={styles.contactText}>Instagram</span>
              </a>
            )}
          </div>
        </header>

        {/* Personal Information */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Age</span>
              <span className={styles.infoValue}>{calculateAge(bioData.personal.birthDate)}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Nationality</span>
              <span className={styles.infoValue}>{bioData.personal.nationality}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>License</span>
              <span className={styles.infoValue}>{bioData.personal.drivingLicense}</span>
            </div>
          </div>
          
          <div className={styles.languagesSection}>
            <h3 className={styles.subsectionTitle}>Languages</h3>
            <div className={styles.pillContainer}>
              {bioData.personal.languages.map((lang, idx) => (
                <span key={idx} className={styles.pill}>{lang}</span>
              ))}
            </div>
          </div>

          {bioData.personal.hobbies && bioData.personal.hobbies.length > 0 && (
            <div className={styles.hobbiesSection}>
              <h3 className={styles.subsectionTitle}>Hobbies & Interests</h3>
              <div className={styles.pillContainer}>
                {bioData.personal.hobbies.map((hobby, idx) => (
                  <span key={idx} className={styles.pill}>{hobby}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Education */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {bioData.education.map((edu, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>{edu.degree || edu.level}</h3>
                  <p className={styles.cardSubtitle}>
                    {edu.institution || edu.school}
                    {edu.campus && ` • ${edu.campus}`}
                  </p>
                </div>
                <span className={styles.cardDate}>
                  {edu.startYear ? `${edu.startYear} - ${edu.status || edu.yearCompleted || 'Completed'}` : edu.yearCompleted || 'Completed'}
                </span>
              </div>
              
              {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                <div className={styles.courseworkSection}>
                  <p className={styles.courseworkLabel}>Relevant Coursework</p>
                  <div className={styles.pillContainer}>
                    {edu.relevantCoursework.map((course, idx) => (
                      <span key={idx} className={styles.pill}>{course}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {edu.subjects && edu.subjects.length > 0 && (
                <div className={styles.subjectsSection}>
                  <p className={styles.courseworkLabel}>Subjects</p>
                  <div className={styles.pillContainer}>
                    {edu.subjects.map((subject, idx) => (
                      <span key={idx} className={styles.pill}>{subject}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {edu.notes && <p className={styles.cardNote}>{edu.notes}</p>}
            </div>
          ))}
        </section>

        {/* Experience */}
        {bioData.professional_experience && bioData.professional_experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Experience</h2>
            {bioData.professional_experience.map((exp, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{exp.title}</h3>
                    <p className={styles.cardSubtitle}>
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className={styles.cardDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </span>
                </div>
                <p className={styles.cardDescription}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          
          <div className={styles.skillBlock}>
            <h3 className={styles.subsectionTitle}>Creative Skills</h3>
            <div className={styles.pillContainer}>
              {bioData.skills.creative.map((skill, idx) => (
                <span key={idx} className={`${styles.pill} ${styles.pillCreative}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.skillBlock}>
            <h3 className={styles.subsectionTitle}>Technical Skills</h3>
            <div className={styles.pillContainer}>
              {bioData.skills.technical.map((skill, idx) => (
                <span key={idx} className={`${styles.pill} ${styles.pillTechnical}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.skillBlock}>
            <h3 className={styles.subsectionTitle}>Soft Skills</h3>
            <div className={styles.pillContainer}>
              {bioData.skills.soft.map((skill, idx) => (
                <span key={idx} className={`${styles.pill} ${styles.pillSoft}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        {bioData.personal.achievements && bioData.personal.achievements.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Achievements</h2>
            <div className={styles.pillContainer}>
              {bioData.personal.achievements.map((achievement, idx) => (
                <span key={idx} className={`${styles.pill} ${styles.pillAchievement}`}>
                  {achievement}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Bio;