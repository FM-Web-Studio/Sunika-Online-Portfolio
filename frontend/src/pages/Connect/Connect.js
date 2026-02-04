import React from 'react';
import {
  Mail, Phone, MapPin, Clock, Briefcase, Instagram, Linkedin, Music2, ImageIcon
} from 'lucide-react';

// ============================================
// IMPORTS - DATA & STYLES
// ============================================

import styles from './Connect.module.css';
import contactData from '../../information/contact.json';

// ============================================
// SOCIAL MEDIA ICON MAPPING
// ============================================

const getSocialIcon = (iconName) => {
  const icons = {
    instagram: Instagram,
    linkedin: Linkedin,
    tiktok: Music2,
    pinterest: ImageIcon,
  };
  
  const IconComponent = icons[iconName.toLowerCase()] || ImageIcon;
  return <IconComponent size={24} />;
};

// ============================================
// CONNECT COMPONENT
// ============================================
// Professional, compact contact page with modern design

function Connect() {
  // ----------------------------------------
  // Data Processing
  // ----------------------------------------
  
  const activeSocial = contactData.social.filter(platform => platform.url && platform.url.trim() !== '');

  // ----------------------------------------
  // Render
  // ----------------------------------------
  
  return (
    <div className={styles.connectContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>Get in Touch</h1>
          <p className={styles.tagline}>{contactData.tagline}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Contact Information Cards */}
        <section className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <a href={`mailto:${contactData.email}`} className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <Mail size={20} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{contactData.email}</span>
              </div>
            </a>

            <a href={`tel:${contactData.phone}`} className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <Phone size={20} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>{contactData.phone}</span>
              </div>
            </a>

            <div className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <MapPin size={20} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Location</span>
                <span className={styles.contactValue}>{contactData.location.displayText}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        {contactData.offerings && contactData.offerings.length > 0 && (
          <section className={styles.offeringsSection}>
            <h2 className={styles.sectionTitle}>
              <Briefcase size={20} className={styles.titleIcon} />
              What I Offer
            </h2>
            <div className={styles.offeringsGrid}>
              {contactData.offerings.map((offering, index) => (
                <div key={index} className={styles.offeringCard}>
                  <div className={styles.offeringBullet}></div>
                  <p className={styles.offeringText}>{offering}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Column Layout for Social and Availability */}
        <div className={styles.bottomSection}>
          {/* Social Media */}
          {activeSocial.length > 0 && (
            <section className={styles.socialSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.titleText}>Connect on Social</span>
              </h2>
              
              <div className={styles.socialGrid}>
                {activeSocial.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                    title={`${platform.platform} - ${platform.username}`}
                  >
                    <div 
                      className={styles.socialCircle}
                      style={{ '--social-color': platform.color }}
                    >
                      {getSocialIcon(platform.icon)}
                    </div>
                    <div className={styles.socialInfo}>
                      <span className={styles.socialPlatform}>{platform.platform}</span>
                      <span className={styles.socialUsername}>{platform.username}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Availability & Business Hours */}
          <section className={styles.availabilitySection}>
            <h2 className={styles.sectionTitle}>
              <Clock size={20} className={styles.titleIcon} />
              Availability
            </h2>
            <div className={styles.availabilityCard}>
              <p className={styles.availabilityText}>{contactData.availability}</p>
              
              {contactData.businessHours && (
                <div className={styles.businessHours}>
                  <div className={styles.hoursRow}>
                    <Clock size={16} />
                    <span>{contactData.businessHours.availability}</span>
                  </div>
                  <div className={styles.timezone}>
                    {contactData.businessHours.timezone}
                  </div>
                </div>
              )}
              
              <div className={styles.responseTime}>
                <div className={styles.statusIndicator}></div>
                <span>{contactData.responseTime}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export default Connect;