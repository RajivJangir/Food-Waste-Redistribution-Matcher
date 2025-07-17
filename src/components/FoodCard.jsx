import React from 'react';
import { useAppContext } from '../context/AppContext';

const FoodCard = ({ listing }) => {
    const { actions } = useAppContext();

    const daysUntilExpiry = Math.floor((new Date(listing.expiry) - new Date()) / (1000 * 60 * 60 * 24));
    const isUrgent = daysUntilExpiry <= 1;

    const handleClaim = () => {
        if (listing.available) {
            actions.addClaim({
                listingId: listing.id,
                recipient: "Food Bank",
                date: new Date().toISOString()
            });
            
            alert(`You've claimed: ${listing.name}\nA driver will contact you shortly!`);
        }
    };

    const handleDetails = () => {
        alert(`Details for ${listing.name}:\n\nDescription: ${listing.description}\nQuantity: ${listing.quantity}\nExpiry: ${listing.expiry}\nLocation: ${listing.location}\nDonor: ${listing.donor}`);
    };

    return (
        <div className="food-card">
            <div className="food-img" style={{ backgroundImage: `url('${listing.image}')` }}></div>
            <div className="food-info">
                <div className="food-title">
                    <h3>{listing.name}</h3>
                    <div className="food-quantity">{listing.quantity}</div>
                </div>
                <div className="food-location">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{listing.location}</span>
                </div>
                <p>{listing.description}</p>
                <div className="food-expiry">
                    <i className="fas fa-clock"></i>
                    <span className={isUrgent ? 'urgent' : ''}>
                        Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="food-actions">
                    <button 
                        className="btn btn-outline" 
                        onClick={handleDetails}
                    >
                        Details
                    </button>
                    <button 
                        className={`btn ${listing.available ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={handleClaim}
                        disabled={!listing.available}
                    >
                        {listing.available ? 'Claim' : 'Claimed'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;