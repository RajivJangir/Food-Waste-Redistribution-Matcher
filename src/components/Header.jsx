import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    const { actions } = useAppContext();

    const handleNavClick = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>
            <div className="navbar">
                <div className="logo">
                    <i className="fas fa-leaf"></i>
                    <h1>Food<span>Save</span></h1>
                </div>
                <div className="nav-links">
                    <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</a>
                    <a onClick={() => handleNavClick('listings')}>Listings</a>
                    <a onClick={() => handleNavClick('routes')}>Routes</a>
                    <a onClick={() => handleNavClick('dashboard')}>Dashboard</a>
                    <a onClick={() => handleNavClick('about')}>About</a>
                </div>
                <div className="nav-buttons">
                    <button 
                        className="btn btn-outline" 
                        onClick={() => actions.showModal('login')}
                    >
                        Login
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => actions.showModal('signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;