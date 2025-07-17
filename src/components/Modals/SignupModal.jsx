import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const SignupModal = () => {
    const { modals, actions } = useAppContext();
    const [formData, setFormData] = useState({
        userType: 'donor',
        name: '',
        email: '',
        password: '',
        address: ''
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
        alert('Account created! You can now list or claim food.');
        actions.hideModal('signup');
        setFormData({
            userType: 'donor',
            name: '',
            email: '',
            password: '',
            address: ''
        });
    };

    const handleShowLogin = (e) => {
        e.preventDefault();
        actions.hideModal('signup');
        actions.showModal('login');
    };

    const handleClose = () => {
        actions.hideModal('signup');
        setFormData({
            userType: 'donor',
            name: '',
            email: '',
            password: '',
            address: ''
        });
    };

    if (!modals.signup) return null;

    return (
        <div className="modal show">
            <div className="modal-content">
                <span className="modal-close" onClick={handleClose}>&times;</span>
                <h2 className="modal-title">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userType">I am a:</label>
                        <select 
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                        >
                            <option value="donor">Food Donor (Restaurant/Grocery)</option>
                            <option value="recipient">Food Recipient (Shelter/Food Bank)</option>
                            <option value="driver">Driver/Volunteer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Full Name / Organization Name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
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
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Create Account
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <a href="#" onClick={handleShowLogin}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignupModal;