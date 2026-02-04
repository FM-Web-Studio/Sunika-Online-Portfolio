import React from 'react';
import {
  Mail, Phone, MapPin, ExternalLink
} from 'lucide-react';

// ============================================
// IMPORTS - DATA & STYLES
// ============================================

import styles from './Connect.module.css';
import contactData from '../../information/contact.json';

// ============================================
// CONNECT COMPONENT
// ============================================
// Minimalistic contact page with professional design

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
        {/* Contact Information */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          
          <div className={styles.contactGrid}>
            <a href={`mailto:${contactData.email}`} className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{contactData.email}</span>
              </div>
            </a>

            <a href={`tel:${contactData.phone}`} className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <Phone size={24} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>{contactData.phone}</span>
              </div>
            </a>

            <div className={styles.contactCard}>
              <div className={styles.iconWrapper}>
                <MapPin size={24} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Location</span>
                <span className={styles.contactValue}>{contactData.location.displayText}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        {activeSocial.length > 0 && (
          <section className={styles.socialSection}>
            <h2 className={styles.sectionTitle}>Connect on Social Media</h2>
            
            <div className={styles.socialGrid}>
              {activeSocial.map((platform, index) => (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCard}
                >
                  <div className={styles.socialHeader}>
                    <span className={styles.socialPlatform}>{platform.platform}</span>
                    <ExternalLink size={16} className={styles.externalIcon} />
                  </div>
                  <p className={styles.socialUsername}>{platform.username}</p>
                  <p className={styles.socialDescription}>{platform.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Availability */}
        <section className={styles.availabilitySection}>
          <div className={styles.availabilityCard}>
            <h3 className={styles.availabilityTitle}>Availability</h3>
            <p className={styles.availabilityText}>{contactData.availability}</p>
            <p className={styles.availabilityNote}>{contactData.responseTime}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export default Connect;
