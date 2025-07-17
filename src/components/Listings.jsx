import React from 'react';
import { useAppContext } from '../context/AppContext';
import FoodCard from './FoodCard';

const Listings = () => {
    const { listings, activeFilter, actions } = useAppContext();

    const categories = [
        { key: 'all', label: 'All' },
        { key: 'vegetables', label: 'Vegetables' },
        { key: 'fruits', label: 'Fruits' },
        { key: 'bakery', label: 'Bakery' },
        { key: 'prepared', label: 'Prepared Food' },
        { key: 'dairy', label: 'Dairy' }
    ];

    const filteredListings = activeFilter === 'all' 
        ? listings 
        : listings.filter(listing => listing.category === activeFilter);

    return (
        <section className="listings" id="listings">
            <div className="section-title">
                <h2>Available Food Donations</h2>
                <p>Fresh food ready for immediate redistribution</p>
            </div>
            
            <div className="listing-filters">
                {categories.map(category => (
                    <button 
                        key={category.key}
                        className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
                        onClick={() => actions.setActiveFilter(category.key)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
            
            <div className="food-cards">
                {filteredListings.map(listing => (
                    <FoodCard key={listing.id} listing={listing} />
                ))}
            </div>
        </section>
    );
};

export default Listings;