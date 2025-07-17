import React from 'react';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
    const { actions } = useAppContext();

    const handleNavClick = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="about">
            <div className="footer-content">
                <div className="footer-col">
                    <h3>FoodSave</h3>
                    <p>Connecting surplus food with communities in need to reduce waste and fight hunger.</p>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</a></li>
                        <li><a onClick={() => handleNavClick('about')}>About Us</a></li>
                        <li><a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>How It Works</a></li>
                        <li><a onClick={() => handleNavClick('listings')}>Listings</a></li>
                        <li><a onClick={() => handleNavClick('routes')}>Routes</a></li>
                    </ul>
                </div>
                
                <div className="footer-col">
                    <h3>For Donors</h3>
                    <ul className="footer-links">
                        <li><a onClick={() => actions.showModal('donate')}>Register as Donor</a></li>
                        <li><a href="#">Food Safety Guidelines</a></li>
                        <li><a href="#">Donation Impact</a></li>
                        <li><a href="#">Tax Benefits</a></li>
                    </ul>
                </div>
                
                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <ul className="footer-links">
                        <li><i className="fas fa-map-marker-alt"></i> 123 Green St, Eco City</li>
                        <li><i className="fas fa-phone"></i> (123) 456-7890</li>
                        <li><i className="fas fa-envelope"></i> info@foodsave.org</li>
                    </ul>
                </div>
            </div>
            
            <div className="copyright">
                <p>&copy; 2023 FoodSave. All rights reserved. Reducing food waste, feeding communities.</p>
            </div>
        </footer>
    );
};

export default Footer;