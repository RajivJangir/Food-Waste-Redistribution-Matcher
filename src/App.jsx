import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Listings from './components/Listings';
import MapSection from './components/MapSection';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import DonateModal from './components/Modals/DonateModal';
import './styles/App.css';

function AppContent() {
    const { actions } = useAppContext();

    useEffect(() => {
        actions.loadListings();
        actions.loadStats();
    }, [actions]);

    return (
        <div className="App">
            <Header />
            <Hero />
            <HowItWorks />
            <Listings />
            <MapSection />
            <Dashboard />
            <Footer />
            <LoginModal />
            <SignupModal />
            <DonateModal />
        </div>
    );
}

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;