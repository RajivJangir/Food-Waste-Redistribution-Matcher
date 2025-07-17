import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const DonateModal = () => {
    const { modals, actions } = useAppContext();
    const [formData, setFormData] = useState({
        foodName: '',
        foodCategory: 'vegetables',
        foodQuantity: '',
        foodDescription: '',
        expiryDate: '',
        pickupTime: ''
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
        
        if (!formData.foodName || !formData.foodQuantity || !formData.expiryDate) {
            alert('Please fill in all required fields');
            return;
        }

        // Get a random food image based on category
        const categoryImages = {
            vegetables: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
            fruits: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
            bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1052&q=80',
            prepared: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
            dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
            other: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
        };

        const newListing = {
            name: formData.foodName,
            category: formData.foodCategory,
            quantity: formData.foodQuantity,
            description: formData.foodDescription,
            expiry: formData.expiryDate,
            location: "Your Location",
            donor: "You",
            available: true,
            image: categoryImages[formData.foodCategory] || categoryImages.other
        };

        actions.addListing(newListing);
        
        alert('Food listing added successfully!');
        actions.hideModal('donate');
        setFormData({
            foodName: '',
            foodCategory: 'vegetables',
            foodQuantity: '',
            foodDescription: '',
            expiryDate: '',
            pickupTime: ''
        });
    };

    const handleClose = () => {
        actions.hideModal('donate');
        setFormData({
            foodName: '',
            foodCategory: 'vegetables',
            foodQuantity: '',
            foodDescription: '',
            expiryDate: '',
            pickupTime: ''
        });
    };

    if (!modals.donate) return null;

    return (
        <div className="modal show">
            <div className="modal-content">
                <span className="modal-close" onClick={handleClose}>&times;</span>
                <h2 className="modal-title">Donate Surplus Food</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="foodName">Food Item Name</label>
                        <input 
                            type="text" 
                            id="foodName"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleInputChange}
                            placeholder="e.g., Fresh Vegetables, Baked Goods"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodCategory">Category</label>
                        <select 
                            id="foodCategory"
                            name="foodCategory"
                            value={formData.foodCategory}
                            onChange={handleInputChange}
                        >
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="bakery">Bakery</option>
                            <option value="prepared">Prepared Food</option>
                            <option value="dairy">Dairy</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodQuantity">Quantity</label>
                        <input 
                            type="text" 
                            id="foodQuantity"
                            name="foodQuantity"
                            value={formData.foodQuantity}
                            onChange={handleInputChange}
                            placeholder="e.g., 10 kg, 25 units"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="foodDescription">Description</label>
                        <textarea 
                            id="foodDescription"
                            name="foodDescription"
                            value={formData.foodDescription}
                            onChange={handleInputChange}
                            placeholder="Describe the food items..."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input 
                            type="date" 
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pickupTime">Preferred Pickup Time</label>
                        <input 
                            type="datetime-local" 
                            id="pickupTime"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Submit Donation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DonateModal;