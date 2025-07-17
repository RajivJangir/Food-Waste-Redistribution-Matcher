import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            icon: "fas fa-utensils",
            title: "List Surplus Food",
            description: "Restaurants, grocery stores, or individuals list available surplus food with details about type, quantity, and pickup time."
        },
        {
            icon: "fas fa-bell",
            title: "Instant Notification",
            description: "Nearby shelters and food banks receive instant notifications about available food donations."
        },
        {
            icon: "fas fa-hand-holding-heart",
            title: "Claim & Schedule",
            description: "Recipients claim donations and schedule a pickup time that works for both parties."
        },
        {
            icon: "fas fa-route",
            title: "Optimized Pickup",
            description: "Drivers get optimized routes for efficient food collection and distribution."
        }
    ];

    return (
        <section className="how-it-works">
            <div className="section-title">
                <h2>How It Works</h2>
                <p>Our platform makes food redistribution simple and efficient</p>
            </div>
            
            <div className="steps">
                {steps.map((step, index) => (
                    <div key={index} className="step-card">
                        <div className="step-icon">
                            <i className={step.icon}></i>
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;