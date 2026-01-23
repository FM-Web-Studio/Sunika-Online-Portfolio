import React from 'react';
import {
  Mail, Phone, MapPin, Instagram, Linkedin, 
  ExternalLink, Sparkles, Briefcase, ArrowRight, CheckCircle2
} from 'lucide-react';
import styles from './Connect.module.css';
import contactData from '../../information/contact.json';

// Custom icons for platforms not in lucide-react
const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.05-.95-.09-2.41.02-3.45.1-.94.65-2.75.65-2.75s-.17-.33-.17-.82c0-.77.44-1.34.99-1.34.47 0 .69.35.69.77 0 .47-.3 1.17-.45 1.82-.13.54.27.98.81.98.97 0 1.72-1.02 1.72-2.5 0-1.31-.94-2.22-2.28-2.22-1.55 0-2.46 1.16-2.46 2.36 0 .47.18.97.4 1.24a.3.3 0 0 1 .07.29c-.08.31-.25 1-.28 1.14-.04.18-.14.22-.33.13-1.22-.57-1.98-2.35-1.98-3.78 0-3.09 2.25-5.92 6.49-5.92 3.41 0 6.06 2.43 6.06 5.67 0 3.38-2.13 6.1-5.09 6.1-.99 0-1.93-.52-2.25-1.13l-.61 2.33c-.22.86-.82 1.93-1.22 2.58A12 12 0 1 0 12 0z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
  </svg>
);

function Connect() {
  // Filter out social platforms without URLs
  const activeSocial = contactData.social.filter(platform => platform.url && platform.url.trim() !== '');

  const getIcon = (iconName) => {
    const icons = {
      instagram: <Instagram size={20} />,
      linkedin: <Linkedin size={20} />,
      behance: <BehanceIcon />,
      tiktok: <TikTokIcon />,
      pinterest: <PinterestIcon />,
      dribbble: <DribbbleIcon />
    };
    return icons[iconName] || null;
  };

  return (
    <div className={styles.connectContainer}>
      {/* Animated Background Shapes */}
      <div className={styles.backgroundShapes}>
        <div className={styles.shape} data-shape="1" />
        <div className={styles.shape} data-shape="2" />
        <div className={styles.shape} data-shape="3" />
        <div className={styles.shape} data-shape="4" />
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <Sparkles size={32} />
          </div>
          <h1 className={styles.mainTitle}>Let's Connect</h1>
          <p className={styles.tagline}>{contactData.tagline}</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className={styles.contentWrapper}>
        {/* What I Offer Section */}
        <section className={styles.offeringsSection}>
          <div className={styles.offeringsHeader}>
            <Briefcase size={24} />
            <h2>What I Offer</h2>
          </div>
          <ul className={styles.offeringsList}>
            {contactData.offerings.map((offering, index) => (
              <li key={index} className={styles.offeringItem} data-index={index}>
                <CheckCircle2 size={20} />
                <span>{offering}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Cards Grid */}
        <div className={styles.contactGrid}>
          {/* Email Card */}
          <a href={`mailto:${contactData.email}`} className={styles.contactCard} data-type="email">
            <div className={styles.cardIcon}>
              <Mail size={24} />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>Email Me</span>
              <span className={styles.cardValue}>{contactData.email}</span>
            </div>
            <ArrowRight className={styles.cardArrow} size={20} />
          </a>

          {/* Phone Card */}
          <a href={`tel:${contactData.phone}`} className={styles.contactCard} data-type="phone">
            <div className={styles.cardIcon}>
              <Phone size={24} />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>Call Me</span>
              <span className={styles.cardValue}>{contactData.phone}</span>
            </div>
            <ArrowRight className={styles.cardArrow} size={20} />
          </a>

          {/* Location Card */}
          <div className={styles.contactCard} data-type="location">
            <div className={styles.cardIcon}>
              <MapPin size={24} />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>Located In</span>
              <span className={styles.cardValue}>{contactData.location.displayText}</span>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <section className={styles.socialSection}>
          <h2 className={styles.socialTitle}>Find Me Online</h2>
          <div className={styles.socialGrid}>
            {activeSocial.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                data-platform={platform.platform.toLowerCase()}
              >
                <div className={styles.socialTop}>
                  <div 
                    className={styles.socialIcon}
                    style={{ backgroundColor: platform.color }}
                  >
                    {getIcon(platform.icon)}
                  </div>
                  <ExternalLink size={18} className={styles.externalIcon} />
                </div>
                <div className={styles.socialInfo}>
                  <h3 className={styles.socialPlatform}>{platform.platform}</h3>
                  <p className={styles.socialUsername}>{platform.username}</p>
                  <p className={styles.socialDescription}>{platform.description}</p>
                </div>
                <div className={styles.socialHover}>
                  <span>Visit Profile</span>
                  <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Connect;