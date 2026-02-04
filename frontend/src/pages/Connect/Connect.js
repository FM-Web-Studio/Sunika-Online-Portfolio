import React, { useEffect, useState } from 'react';
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
// Fully responsive and native-feeling across all device types

function Connect() {
  // ----------------------------------------
  // State for device detection
  // ----------------------------------------
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // ----------------------------------------
  // Effects
  // ----------------------------------------
  
  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    // Handle viewport resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setViewportWidth(window.innerWidth);
      }, 150);
    };

    checkTouchDevice();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ----------------------------------------
  // Data Processing
  // ----------------------------------------
  
  const activeSocial = contactData.social.filter(
    platform => platform.url && platform.url.trim() !== ''
  );

  // ----------------------------------------
  // Responsive icon sizes
  // ----------------------------------------
  
  const getIconSize = () => {
    if (viewportWidth < 375) return 18;
    if (viewportWidth < 768) return 20;
    return 24;
  };

  const iconSize = getIconSize();

  // ----------------------------------------
  // Helper function for mailto with better mobile support
  // ----------------------------------------
  
  const handleEmailClick = (e) => {
    // On mobile, let the default mailto: work
    // On desktop, could add analytics or other handling
    if (!isTouchDevice) {
      // Desktop: default behavior is fine
    }
  };

  const handlePhoneClick = (e) => {
    // On mobile, let the default tel: work
    // On desktop, prevent action or show copy notification
    if (!isTouchDevice && viewportWidth > 768) {
      e.preventDefault();
      // Could show a tooltip or copy to clipboard
      navigator.clipboard?.writeText(contactData.phone);
    }
  };

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
            <a 
              href={`mailto:${contactData.email}`} 
              className={styles.contactCard}
              onClick={handleEmailClick}
              aria-label={`Send email to ${contactData.email}`}
            >
              <div className={styles.iconWrapper}>
                <Mail size={iconSize} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{contactData.email}</span>
              </div>
            </a>

            <a 
              href={`tel:${contactData.phone}`} 
              className={styles.contactCard}
              onClick={handlePhoneClick}
              aria-label={`Call ${contactData.phone}`}
            >
              <div className={styles.iconWrapper}>
                <Phone size={iconSize} />
              </div>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>{contactData.phone}</span>
              </div>
            </a>

            <div 
              className={styles.contactCard}
              role="article"
              aria-label={`Location: ${contactData.location.displayText}`}
            >
              <div className={styles.iconWrapper}>
                <MapPin size={iconSize} />
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
          <section className={styles.offeringsSection} aria-labelledby="offerings-title">
            <h2 id="offerings-title" className={styles.sectionTitle}>
              <Briefcase size={iconSize} className={styles.titleIcon} />
              What I Offer
            </h2>
            <div className={styles.offeringsGrid}>
              {contactData.offerings.map((offering, index) => (
                <div 
                  key={index} 
                  className={styles.offeringCard}
                  role="listitem"
                >
                  <div className={styles.offeringBullet} aria-hidden="true"></div>
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
            <section className={styles.socialSection} aria-labelledby="social-title">
              <h2 id="social-title" className={styles.sectionTitle}>
                <span className={styles.titleText}>Connect on Social</span>
              </h2>
              
              <div className={styles.socialGrid} role="list">
                {activeSocial.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                    title={`${platform.platform} - ${platform.username}`}
                    aria-label={`Visit my ${platform.platform} profile: ${platform.username}`}
                    role="listitem"
                  >
                    <div 
                      className={styles.socialCircle}
                      style={{ '--social-color': platform.color }}
                      aria-hidden="true"
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
          <section className={styles.availabilitySection} aria-labelledby="availability-title">
            <h2 id="availability-title" className={styles.sectionTitle}>
              <Clock size={iconSize} className={styles.titleIcon} />
              Availability
            </h2>
            <div className={styles.availabilityCard}>
              <p className={styles.availabilityText}>{contactData.availability}</p>
              
              {contactData.businessHours && (
                <div className={styles.businessHours}>
                  <div className={styles.hoursRow}>
                    <Clock size={16} aria-hidden="true" />
                    <span>{contactData.businessHours.availability}</span>
                  </div>
                  <div className={styles.timezone}>
                    {contactData.businessHours.timezone}
                  </div>
                </div>
              )}
              
              <div className={styles.responseTime}>
                <div className={styles.statusIndicator} aria-hidden="true"></div>
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