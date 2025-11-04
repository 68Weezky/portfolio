import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const CONTACT_ENDPOINT = 'https://formspree.io/f/xrbaynqr';

export function Contact({ email }) {
  const [formRef, formInView] = useIntersectionObserver({ threshold: 0.16 });
  const [contactRef, contactInView] = useIntersectionObserver({ threshold: 0.16 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          replyTo: formData.email.trim(),
          _subject: `Portfolio message from ${formData.name.trim()}`,
        }),
      });

      if (!response.ok) throw new Error('Failed');
      setFormData({ name: '', email: '', message: '' });
      setStatus('Thanks! Your message has been sent.');
    } catch (err) {
      console.error(err);
      setStatus('Sorry, something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="alt" aria-label="Contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-sub">Have a project or role in mind? Let's talk.</p>
        <div className="contact-grid">
          <div
            ref={formRef}
            className={`form reveal ${formInView ? 'in-view' : ''}`}
            role="form"
          >
            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <input
                  className="input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder=" "
                  autoComplete="name"
                  required
                  aria-required="true"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                />
                <label className="label" htmlFor="name">
                  Name
                </label>
                <div className="error" aria-live="polite">
                  {errors.name}
                </div>
              </div>
              <div className="field">
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  required
                  aria-required="true"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                <label className="label" htmlFor="email">
                  Email
                </label>
                <div className="error" aria-live="polite">
                  {errors.email}
                </div>
              </div>
              <div className="field">
                <textarea
                  className="input"
                  id="message"
                  name="message"
                  rows="5"
                  placeholder=" "
                  required
                  aria-required="true"
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                ></textarea>
                <label className="label" htmlFor="message">
                  Message
                </label>
                <div className="error" aria-live="polite">
                  {errors.message}
                </div>
              </div>
              <button type="submit" className="btn primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
              {status && (
                <div className="success" role="status" aria-live="polite" style={{ marginTop: '10px' }}>
                  {status}
                </div>
              )}
            </form>
          </div>
          <div ref={contactRef} className={`reveal ${contactInView ? 'in-view' : ''}`}>
            <h3>Let's build something great</h3>
            <p>
              I'm available for internships, full-time and freelance projects. I'm particularly
              interested in developer tools, data‑driven apps, and delightful user interfaces.
            </p>
            <ul>
              <li>
                Email: <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>Location: Anywhere, Remote‑friendly</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
