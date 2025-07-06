import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
    const features = [
        {
            title: "Interest-Based Communities",
            description: "Connect with people who share your passions and hobbies.",
            icon: "👥",
        },
        {
            title: "Real-World Meetups",
            description: "Organize and join local events based on shared interests.",
            icon: "📍",
        },
        {
            title: "Friend Recommendations",
            description: "We help you find friends based on shared hobbies and interests.",
            icon: "🎯", // or use 🤝, 🧑‍🤝‍🧑, or 👯‍♂️
        }
    ];

    const testimonials = [
        {
            quote: "This platform helped me find my hiking group when I moved to a new city!",
            author: "Pavan, 28",
        },
        {
            quote: "Finally a place where I can connect with fellow photographers!",
            author: "NTR, 34",
        },
        {
            quote: "Made transitioning to university life so much easier.",
            author: "SRK, 19",
        },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container center">
                    <h1>Connect Through Shared Passions</h1>
                    <p>
                        Break free from superficial scrolling. Build meaningful relationships based on what truly matters to you.
                    </p>
                    <div className="hero-buttons">
                        <Button to="/contact" size="lg">Join Now</Button>
                        <Button to="/about" variant="outline-white" size="lg">Learn More</Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features">
                <div className="container">
                    <h2>How It Works</h2>
                    <div className="card-grid">
                        {features.map((feature, index) => (
                            <Card key={index} className="feature-card updated">
                                <div className="icon-circle">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-text">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section testimonials">
                <div className="container">
                    <h2>What Our Members Say</h2>
                    <div className="card-grid">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index}>
                                <blockquote>"{testimonial.quote}"</blockquote>
                                <p className="author">— {testimonial.author}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container center">
                    <h2>Ready to Make Real Connections?</h2>
                    <p>
                        Join thousands of others who are building meaningful relationships through shared interests.
                    </p>
                    <Button to="/contact" size="lg" variant="white">Get Started Today</Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
