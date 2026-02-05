import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Briefcase,
  Instagram,
  Linkedin,
  Music2,
  ImageIcon
} from 'lucide-react';

import styles from './Connect.module.css';
import contactData from '../../information/contact.json';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Maps social media platform names to their Lucide icons
 */
const getSocialIcon = (iconName) => {
  const iconMap = {
    instagram: Instagram,
    linkedin: Linkedin,
    tiktok: Music2,
    pinterest: ImageIcon,
  };
  
  const IconComponent = iconMap[iconName.toLowerCase()] || ImageIcon;
  return <IconComponent className={styles.socialIcon} />;
};

// ============================================
// CONNECT COMPONENT
// ============================================

/**
 * Professional contact page with minimalistic design
 * Fully responsive across all device sizes
 */
function Connect() {
  // Filter active social platforms
  const activeSocial = contactData.social.filter(
    platform => platform.url && platform.url.trim() !== ''
  );

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  return (
    <div className={styles.connectContainer}>
      
      {/* ========== HERO SECTION ========== */}
      <section className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Get in Touch</h1>
        <p className={styles.pageSubtitle}>{contactData.tagline}</p>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <main className={styles.mainContent}>
        
        {/* ========== PRIMARY CONTACT ========== */}
        <section className={styles.section}>
          <div className={styles.contactGrid}>
            
            {/* Email Card */}
            <a 
              href={`mailto:${contactData.email}`}
              className={styles.contactCard}
              aria-label={`Email ${contactData.email}`}
            >
              <div className={styles.cardIcon}>
                <Mail />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Email</span>
                <span className={styles.cardValue}>{contactData.email}</span>
              </div>
            </a>

            {/* Phone Card */}
            <a 
              href={`tel:${contactData.phone}`}
              className={styles.contactCard}
              aria-label={`Call ${contactData.phone}`}
            >
              <div className={styles.cardIcon}>
                <Phone />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Phone</span>
                <span className={styles.cardValue}>{contactData.phone}</span>
              </div>
            </a>

            {/* Location Card */}
            <div 
              className={`${styles.contactCard} ${styles.nonInteractive}`}
              role="article"
              aria-label={`Location: ${contactData.location.displayText}`}
            >
              <div className={styles.cardIcon}>
                <MapPin />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Location</span>
                <span className={styles.cardValue}>{contactData.location.displayText}</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========== TWO COLUMN LAYOUT ========== */}
        <div className={styles.twoColumnLayout}>
          
          {/* ========== LEFT COLUMN: OFFERINGS & SOCIAL ========== */}
          <div className={styles.leftColumn}>
            
            {/* Offerings Section */}
            {contactData.offerings && contactData.offerings.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Briefcase className={styles.titleIcon} />
                  What I Offer
                </h2>
                <div className={styles.offeringsList}>
                  {contactData.offerings.map((offering, index) => (
                    <div key={index} className={styles.offeringItem}>
                      <div className={styles.offeringBullet}></div>
                      <p className={styles.offeringText}>{offering}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Social Media Section */}
            {activeSocial.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Connect on Social</h2>
                <div className={styles.socialGrid}>
                  {activeSocial.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialCard}
                      aria-label={`Visit ${platform.platform}: ${platform.username}`}
                    >
                      <div 
                        className={styles.socialIconCircle}
                        style={{ backgroundColor: platform.color }}
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

          </div>

          {/* ========== RIGHT COLUMN: AVAILABILITY ========== */}
          <div className={styles.rightColumn}>
            
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Clock className={styles.titleIcon} />
                Availability
              </h2>
              
              <div className={styles.availabilityCard}>
                
                {/* Availability Status */}
                <div className={styles.availabilityStatus}>
                  <div className={styles.statusIndicator}></div>
                  <p className={styles.availabilityText}>{contactData.availability}</p>
                </div>

                {/* Business Hours */}
                {contactData.businessHours && (
                  <div className={styles.businessHours}>
                    <div className={styles.hoursRow}>
                      <Clock size={18} />
                      <span>{contactData.businessHours.availability}</span>
                    </div>
                    <div className={styles.timezone}>
                      {contactData.businessHours.timezone}
                    </div>
                  </div>
                )}

                {/* Response Time */}
                <div className={styles.responseTime}>
                  <span className={styles.responseLabel}>Typical Response</span>
                  <span className={styles.responseValue}>{contactData.responseTime}</span>
                </div>

              </div>
            </section>

          </div>

        </div>

      </main>
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export default Connect;