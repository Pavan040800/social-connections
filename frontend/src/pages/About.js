import React from 'react';
import Button from '../components/Button';
import './About.css';
import pavanImg from '../assets/images/pavan.jpg';
import weiImg from '../assets/images/wei.jpg';
import communityImg from '../assets/images/logo.png';

const About = () => {
  const teamMembers = [
    {
      name: 'Y. Pavan Kumar',
      title: 'Founder & Lead Developer',
      desc: 'Passionate about creating technology that brings people together in meaningful ways.',
      image: pavanImg,
    },
    {
      name: 'Wei Li',
      title: 'Supervisor & Advisor',
      desc: 'Provides strategic guidance and ensures the project aligns with its core mission.',
      image: weiImg,
    },
    {
      name: 'Our Community',
      title: 'The Heart of SocialConnections',
      desc: 'Every member contributes to making our platform a vibrant, welcoming space.',
      image: communityImg,
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>About SocialConnections</h1>
          <p>
            Our mission is to bridge the gap in today's hyper-connected yet disconnected world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section story-section">
        <div className="container narrow">
          <h2>Our Story</h2>
          <div className="text-block">
            <p>
              Founded in 2025, SocialConnections was born out of a simple observation: despite being more connected digitally than ever before, people are feeling increasingly isolated and lonely.
            </p>
            <p>
              Our platform was created by a team of passionate developers and social scientists who recognized that current social media prioritizes viral content over genuine human connection.
            </p>
            <p>
              We set out to build something different - a platform that helps people form meaningful, interest-based relationships that extend beyond the digital realm into real-world connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-vision-section">
        <div className="container grid-2">
          <div>
            <h2>Our Mission</h2>
            <p>
              To empower individuals to build authentic, interest-based communities that foster genuine connections and improve overall well-being.
            </p>
            <ul className="checklist">
              <li>Prioritize quality connections over quantity</li>
              <li>Bridge the gap between online and offline interactions</li>
              <li>Create tools that facilitate meaningful relationships</li>
            </ul>
          </div>
          <div>
            <h2>Our Vision</h2>
            <p>
              We envision a world where technology enhances rather than replaces human connection, where people can easily find their tribe based on shared passions and values.
            </p>
            <blockquote>
              <p>"In a world of hyper-connectivity, we're bringing back the human element to social networking."</p>
              <footer>— The SocialConnections Team</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <h2 className="center">Meet The Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div className="card" key={idx}>
                <div className="avatar-wrapper">
                  <img src={member.image} alt={member.name} className="avatar-image" />
                </div>
                <h3>{member.name}</h3>
                <p className="title">{member.title}</p>
                <p>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container center">
          <h2>Join Our Community</h2>
          <p>
            Become part of a movement that's redefining social connection in the digital age.
          </p>
          <Button to="/contact" size="lg" variant="white">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
