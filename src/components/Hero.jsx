import React from 'react';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
    const { stats, actions, formatNumber } = useAppContext();

    const handleClaimClick = () => {
        alert('Please log in to claim food donations');
        actions.showModal('login');
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <h2>Connecting Surplus Food With Those In Need</h2>
                <p>
                    Join our platform to reduce food waste and fight hunger in your community. 
                    Restaurants, grocery stores, and individuals can donate surplus food that 
                    shelters and food banks can claim instantly.
                </p>
                <div>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => actions.showModal('donate')}
                        style={{ marginRight: '10px' }}
                    >
                        Donate Food
                    </button>
                    <button 
                        className="btn btn-outline" 
                        onClick={handleClaimClick}
                    >
                        Claim Food
                    </button>
                </div>
                
                <div className="stats">
                    <div className="stat-item">
                        <h3>{formatNumber(stats.mealsSaved || 0)}+</h3>
                        <p>Meals Saved</p>
                    </div>
                    <div className="stat-item">
                        <h3>{formatNumber(stats.activeDonors || 0)}+</h3>
                        <p>Active Donors</p>
                    </div>
                    <div className="stat-item">
                        <h3>{formatNumber(stats.recipients || 0)}+</h3>
                        <p>Recipient Organizations</p>
                    </div>
                    <div className="stat-item">
                        <h3>{formatNumber(stats.cities || 0)}+</h3>
                        <p>Cities</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;