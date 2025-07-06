import React, { useState } from 'react';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Reach out with questions, feedback, or just to say hello.</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-box">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div>
                <h3>Email</h3>
                <p>contact@socialconnections.com</p>
              </div>
              <div>
                <h3>Office</h3>
                <p>123 Connection Street</p>
                <p>Community Plaza, Suite 456</p>
                <p>Social City, SC 10101</p>
              </div>
              <div>
                <h3>Hours</h3>
                <p>Mon–Fri: 9am–6pm</p>
                <p>Sat: 10am–4pm</p>
                <p>Sun: Closed</p>
              </div>
            </div>

            <div className="contact-form">
              {submitted ? (
                <div className="form-success">
                  <div className="icon-success">✓</div>
                  <h2>Thank You!</h2>
                  <p>Your message has been sent successfully.</p>
                  <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h2>Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required />
                    </div>
                    <Button type="submit" className="full-width">Send Message</Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {[
              {
                q: 'How is SocialConnections different from other social networks?',
                a: 'We prioritize real, meaningful connections based on shared interests, not just viral content and follower counts.',
              },
              {
                q: 'Is there a cost to join?',
                a: 'We offer a free membership with core features and premium plans for extras like enhanced matching and events.',
              },
              {
                q: 'How do you ensure member safety?',
                a: 'We verify members, provide meetup safety tips, and offer tools to report issues. Everyone agrees to community guidelines.',
              },
            ].map((item, index) => (
              <div className="faq-item" key={index}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
