import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const LoginModal = () => {
    const { modals, actions } = useAppContext();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login functionality would connect to backend in a real application');
        actions.hideModal('login');
        setFormData({ email: '', password: '' });
    };

    const handleShowSignup = (e) => {
        e.preventDefault();
        actions.hideModal('login');
        actions.showModal('signup');
    };

    const handleClose = () => {
        actions.hideModal('login');
        setFormData({ email: '', password: '' });
    };

    if (!modals.login) return null;

    return (
        <div className="modal show">
            <div className="modal-content">
                <span className="modal-close" onClick={handleClose}>&times;</span>
                <h2 className="modal-title">Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Don't have an account? <a href="#" onClick={handleShowSignup}>Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;