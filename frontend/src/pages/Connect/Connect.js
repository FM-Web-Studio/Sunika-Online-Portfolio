import React, { useState } from 'react';
import { LuMail, LuPhone, LuMapPin, LuSend } from 'react-icons/lu';
import { FaInstagram, FaLinkedin, FaBehance, FaGlobe } from 'react-icons/fa';
import { usePortfolioData } from '../../hooks';
import { useToast } from '../../components';
import { submitContactForm } from '../../firebase/firestore';
import Loading from '../Loading';
import styles from './Connect.module.css';

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  behance: FaBehance,
};

const Connect = () => {
  const { data, loading } = usePortfolioData();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitContactForm(form);
      showToast('success', 'Message sent!', `Thanks ${form.name || 'there'} — I’ll get back to you soon.`);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      showToast('error', 'Could not send message', 'Please try again, or email me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !data) return <Loading />;

  const { contact, social } = data;

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Let’s connect</p>
        <h1 className={styles.title}>Get in touch</h1>
        <p className={styles.subtitle}>
          Have a project in mind, a collaboration idea, or just want to say hi? Send a message —
          I’d love to hear from you.
        </p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.info}>
          {contact?.email && (
            <a className={styles.infoItem} href={`mailto:${contact.email}`}>
              <span className={`${styles.infoIcon} ${styles.icon1}`}><LuMail aria-hidden="true" /></span>
              <span className={styles.infoText}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{contact.email}</span>
              </span>
            </a>
          )}
          {contact?.phone && (
            <a className={styles.infoItem} href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
              <span className={`${styles.infoIcon} ${styles.icon2}`}><LuPhone aria-hidden="true" /></span>
              <span className={styles.infoText}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{contact.phone}</span>
              </span>
            </a>
          )}
          {contact?.location && (
            <div className={styles.infoItem}>
              <span className={`${styles.infoIcon} ${styles.icon3}`}><LuMapPin aria-hidden="true" /></span>
              <span className={styles.infoText}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>{contact.location}</span>
              </span>
            </div>
          )}

          {social?.length > 0 && (
            <div className={styles.socialRow}>
              {social.map((s) => {
                const Icon = SOCIAL_ICONS[s.key] || FaGlobe;
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={s.platform}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          )}
        </aside>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me a little about what you have in mind…"
              rows={6}
              required
            />
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : <>Send message <LuSend aria-hidden="true" /></>}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Connect;
