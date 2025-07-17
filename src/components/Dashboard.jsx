import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useAppContext } from '../context/AppContext';
import FoodCard from './FoodCard';

Chart.register(...registerables);

const Dashboard = () => {
    const { stats, listings, actions, formatNumber } = useAppContext();
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Food Donations (kg)',
                        data: [120, 190, 150, 220, 180, 300, 280, 250, 320, 350, 400, 380],
                        backgroundColor: '#4CAF50',
                        borderColor: '#388E3C',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Cleanup function
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    const recentListings = [...listings].reverse().slice(0, 3);

    return (
        <section className="dashboard" id="dashboard">
            <div className="dashboard-header">
                <h2 className="section-title">Organization Dashboard</h2>
                <button 
                    className="btn btn-secondary"
                    onClick={() => actions.showModal('donate')}
                >
                    Add Food Listing
                </button>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{stats.totalDonations || 0}</h3>
                    <p>Total Donations</p>
                </div>
                <div className="stat-card">
                    <h3>{formatNumber(stats.mealsProvided || 0)}</h3>
                    <p>Meals Provided</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.co2Reduced || 0}</h3>
                    <p>CO₂ Reduced (tons)</p>
                </div>
                <div className="stat-card">
                    <h3>{stats.activeDrivers || 0}</h3>
                    <p>Active Drivers</p>
                </div>
            </div>
            
            <div className="chart-container">
                <h3>Monthly Food Distribution</h3>
                <div style={{ position: 'relative', height: '300px' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
            
            <div className="recent-listings">
                <h3>Recent Food Listings</h3>
                <div className="food-cards">
                    {recentListings.map(listing => (
                        <FoodCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;