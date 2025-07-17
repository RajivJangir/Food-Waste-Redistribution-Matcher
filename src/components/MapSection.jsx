import React from 'react';
import { useAppContext } from '../context/AppContext';

const MapSection = () => {
    const { stats } = useAppContext();

    const handleStartRoute = () => {
        alert('Route started! Drivers would receive navigation instructions in a real app.');
    };

    return (
        <section className="map-section" id="routes">
            <div className="section-title">
                <h2>Optimized Collection Routes</h2>
                <p>Efficient paths for collecting and distributing food donations</p>
            </div>
            
            <div className="map-container">
                <div className="map-overlay">
                    <h3>Today's Route</h3>
                    <p>Driver: Sarah Johnson</p>
                    <p>Vehicle: Refrigerated Van</p>
                    
                    <div className="route-info">
                        <div className="info-item">
                            <p>Total Distance</p>
                            <p>12.4 km</p>
                        </div>
                        <div className="info-item">
                            <p>Estimated Time</p>
                            <p>48 mins</p>
                        </div>
                    </div>
                    
                    <div className="route-info">
                        <div className="info-item">
                            <p>Pickups</p>
                            <p>{stats.routePickups || 4} locations</p>
                        </div>
                        <div className="info-item">
                            <p>Food Quantity</p>
                            <p>{stats.routeQuantity || '85 kg'}</p>
                        </div>
                    </div>
                    
                    <button 
                        className="btn btn-primary" 
                        style={{ width: '100%', marginTop: '15px' }}
                        onClick={handleStartRoute}
                    >
                        Start Route
                    </button>
                </div>
                <i className="fas fa-route" style={{ fontSize: '5rem', opacity: '0.2' }}></i>
            </div>
        </section>
    );
};

export default MapSection;