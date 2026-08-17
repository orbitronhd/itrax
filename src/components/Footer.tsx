import type React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';

const WEB3FORMS_ACCESS_KEY = '4df57676-1515-4ec0-9c92-9e1bfe0760d3';

interface ContactPerson {
  label: string;
  name: string;
  phone: string;
  phoneDisplay: string;
}

const keyContacts: ContactPerson[] = [
  {
    label: 'TEACHER INCHARGE',
    name: 'Ms. Bency Wilson',
    phone: '+919447513374',
    phoneDisplay: '+91 9447513374',
  },
  {
    label: 'CHAIRMAN',
    name: 'Justin Joven Malakkaran',
    phone: '+917428519729',
    phoneDisplay: '+91 7428519729',
  },
  {
    label: 'TECH LEAD',
    name: 'Freddie Scaria Jose',
    phone: '+916238431271',
    phoneDisplay: '+91 6238431271',
  },
];

export function Footer(): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage('Sending...');

    const formData = new FormData(formRef.current);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setStatusMessage('Message sent successfully!');
        formRef.current.reset();
      } else {
        setStatusMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      setStatusMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  return (
    <footer className="footer-container" id="footer" aria-label="Site Footer">
      <div className="footer-content">
        {/* Left Column: Address & Key Contacts */}
        <div className="footer-col-left">
          <h3 className="footer-col-heading">Contact &amp; Location</h3>
          <p className="footer-address">
            Rajagiri School of Engineering &amp; Technology
            <br />
            Rajagiri Valley, Kakkanad, Kochi, Kerala 682039
          </p>

          <div className="footer-contacts-list">
            {keyContacts.map((contact) => (
              <div key={contact.label} className="footer-contact-item">
                <span className="contact-role">{contact.label}</span>
                <span className="contact-name">{contact.name}</span>
                <a href={`tel:${contact.phone}`} className="contact-phone">
                  {contact.phoneDisplay}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="footer-col-middle">
          <h3 className="footer-col-heading">Quick Links</h3>
          <nav className="footer-nav-links" aria-label="Footer Navigation">
            <Link to="/" className="footer-nav-link">
              Home
            </Link>
            <Link to="/#about" className="footer-nav-link">
              About
            </Link>
            <Link to="/execom" className="footer-nav-link">
              Execom
            </Link>
            <Link to="/events" className="footer-nav-link">
              Events
            </Link>
            <Link to="/gallery" className="footer-nav-link">
              Gallery
            </Link>
          </nav>
        </div>

        {/* Right Column: Send a Message Form */}
        <div className="footer-col-right">
          <h3 className="footer-col-heading">Send a Message</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="footer-contact-form">
            <div className="footer-form-row">
              <div className="footer-input-group">
                <label htmlFor="footer-name" className="footer-field-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="footer-name"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="footer-input"
                />
              </div>

              <div className="footer-input-group">
                <label htmlFor="footer-email" className="footer-field-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="footer-email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  className="footer-input"
                />
              </div>
            </div>

            <div className="footer-input-group">
              <label htmlFor="footer-message" className="footer-field-label">
                Message
              </label>
              <textarea
                id="footer-message"
                name="message"
                placeholder="Tell us about your query, suggestion, or collaboration..."
                required
                rows={3}
                className="footer-textarea"
              />
            </div>

            <div className="footer-form-action">
              <button type="submit" disabled={isSubmitting} className="footer-submit-btn">
                <span className="footer-btn-text">
                  {isSubmitting ? 'Sending...' : 'Send Message →'}
                </span>
              </button>

              {statusMessage && (
                <p
                  className={`footer-status-msg ${statusMessage.includes('successfully') ? 'success' : 'error'
                    }`}
                  role="status"
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; iTrax. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
