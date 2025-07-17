import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

// Database class to manage state
class Database {
    constructor() {
        this.KEY_LISTINGS = 'foodListings';
        this.KEY_USERS = 'users';
        this.KEY_STATS = 'stats';
        this.KEY_CLAIMS = 'claims';
        this.initializeData();
    }
    
    initializeData() {
        // Initialize listings if not exists
        if (!localStorage.getItem(this.KEY_LISTINGS)) {
            const listings = [
                {
                    id: 1,
                    name: "Fresh Vegetables",
                    category: "vegetables",
                    quantity: "25 kg",
                    description: "Assorted fresh vegetables including carrots, potatoes, and bell peppers.",
                    expiry: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    location: "Green Grocers, Downtown",
                    donor: "Green Grocers",
                    available: true,
                    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
                },
                {
                    id: 2,
                    name: "Bakery Items",
                    category: "bakery",
                    quantity: "50 units",
                    description: "Assorted bread, pastries, and muffins from today's baking.",
                    expiry: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
                    location: "City Bakery, West End",
                    donor: "City Bakery",
                    available: true,
                    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1052&q=80"
                },
                {
                    id: 3,
                    name: "Fresh Fruits",
                    category: "fruits",
                    quantity: "15 kg",
                    description: "Seasonal fruits including apples, bananas, and oranges.",
                    expiry: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
                    location: "Fresh Market, East Side",
                    donor: "Fresh Market",
                    available: true,
                    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
                },
                {
                    id: 4,
                    name: "Sandwiches & Wraps",
                    category: "prepared",
                    quantity: "35 units",
                    description: "Freshly prepared sandwiches and wraps from lunch service.",
                    expiry: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    location: "Cafe Central",
                    donor: "Cafe Central",
                    available: true,
                    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
                }
            ];
            localStorage.setItem(this.KEY_LISTINGS, JSON.stringify(listings));
        }
        
        // Initialize stats if not exists
        if (!localStorage.getItem(this.KEY_STATS)) {
            const stats = {
                mealsSaved: 25680,
                activeDonors: 142,
                recipients: 65,
                cities: 28,
                totalDonations: 142,
                mealsProvided: 25680,
                co2Reduced: 42.5,
                activeDrivers: 28,
                routePickups: 4,
                routeQuantity: "85 kg"
            };
            localStorage.setItem(this.KEY_STATS, JSON.stringify(stats));
        }
        
        // Initialize claims if not exists
        if (!localStorage.getItem(this.KEY_CLAIMS)) {
            localStorage.setItem(this.KEY_CLAIMS, JSON.stringify([]));
        }
    }
    
    getListings() {
        return JSON.parse(localStorage.getItem(this.KEY_LISTINGS)) || [];
    }
    
    saveListing(listing) {
        const listings = this.getListings();
        listing.id = listings.length > 0 ? Math.max(...listings.map(l => l.id)) + 1 : 1;
        listing.available = true;
        listings.push(listing);
        localStorage.setItem(this.KEY_LISTINGS, JSON.stringify(listings));
        return listing;
    }
    
    updateListing(updatedListing) {
        const listings = this.getListings();
        const index = listings.findIndex(l => l.id === updatedListing.id);
        if (index !== -1) {
            listings[index] = updatedListing;
            localStorage.setItem(this.KEY_LISTINGS, JSON.stringify(listings));
            return true;
        }
        return false;
    }
    
    getStats() {
        return JSON.parse(localStorage.getItem(this.KEY_STATS)) || {};
    }
    
    updateStats(newStats) {
        const stats = this.getStats();
        const updatedStats = {...stats, ...newStats};
        localStorage.setItem(this.KEY_STATS, JSON.stringify(updatedStats));
        return updatedStats;
    }
    
    addClaim(claim) {
        const claims = JSON.parse(localStorage.getItem(this.KEY_CLAIMS)) || [];
        claim.id = claims.length > 0 ? Math.max(...claims.map(c => c.id)) + 1 : 1;
        claims.push(claim);
        localStorage.setItem(this.KEY_CLAIMS, JSON.stringify(claims));
        
        // Update listing availability
        const listings = this.getListings();
        const listingIndex = listings.findIndex(l => l.id === claim.listingId);
        if (listingIndex !== -1) {
            listings[listingIndex].available = false;
            localStorage.setItem(this.KEY_LISTINGS, JSON.stringify(listings));
        }
        
        return claim;
    }
}

// Action types
const ACTION_TYPES = {
    LOAD_LISTINGS: 'LOAD_LISTINGS',
    ADD_LISTING: 'ADD_LISTING',
    UPDATE_LISTING: 'UPDATE_LISTING',
    LOAD_STATS: 'LOAD_STATS',
    UPDATE_STATS: 'UPDATE_STATS',
    ADD_CLAIM: 'ADD_CLAIM',
    SET_ACTIVE_FILTER: 'SET_ACTIVE_FILTER',
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL'
};

// Initial state
const initialState = {
    listings: [],
    stats: {},
    claims: [],
    activeFilter: 'all',
    modals: {
        login: false,
        signup: false,
        donate: false
    },
    currentUser: null
};

// Reducer
function appReducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.LOAD_LISTINGS:
            return {
                ...state,
                listings: action.payload
            };
        
        case ACTION_TYPES.ADD_LISTING:
            return {
                ...state,
                listings: [...state.listings, action.payload]
            };
        
        case ACTION_TYPES.UPDATE_LISTING:
            return {
                ...state,
                listings: state.listings.map(listing =>
                    listing.id === action.payload.id ? action.payload : listing
                )
            };
        
        case ACTION_TYPES.LOAD_STATS:
            return {
                ...state,
                stats: action.payload
            };
        
        case ACTION_TYPES.UPDATE_STATS:
            return {
                ...state,
                stats: action.payload
            };
        
        case ACTION_TYPES.ADD_CLAIM:
            return {
                ...state,
                claims: [...state.claims, action.payload],
                listings: state.listings.map(listing =>
                    listing.id === action.payload.listingId
                        ? { ...listing, available: false }
                        : listing
                )
            };
        
        case ACTION_TYPES.SET_ACTIVE_FILTER:
            return {
                ...state,
                activeFilter: action.payload
            };
        
        case ACTION_TYPES.SHOW_MODAL:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload]: true
                }
            };
        
        case ACTION_TYPES.HIDE_MODAL:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload]: false
                }
            };
        
        default:
            return state;
    }
}

// Context Provider
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const db = new Database();

    // Helper functions
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };

    // Actions
    const actions = {
        loadListings: () => {
            const listings = db.getListings();
            dispatch({ type: ACTION_TYPES.LOAD_LISTINGS, payload: listings });
        },

        addListing: (listing) => {
            const newListing = db.saveListing(listing);
            dispatch({ type: ACTION_TYPES.ADD_LISTING, payload: newListing });
            
            // Update stats
            const stats = db.getStats();
            stats.totalDonations = (stats.totalDonations || 0) + 1;
            const updatedStats = db.updateStats(stats);
            dispatch({ type: ACTION_TYPES.UPDATE_STATS, payload: updatedStats });
        },

        updateListing: (listing) => {
            if (db.updateListing(listing)) {
                dispatch({ type: ACTION_TYPES.UPDATE_LISTING, payload: listing });
            }
        },

        loadStats: () => {
            const stats = db.getStats();
            dispatch({ type: ACTION_TYPES.LOAD_STATS, payload: stats });
        },

        updateStats: (newStats) => {
            const updatedStats = db.updateStats(newStats);
            dispatch({ type: ACTION_TYPES.UPDATE_STATS, payload: updatedStats });
        },

        addClaim: (claim) => {
            const newClaim = db.addClaim(claim);
            dispatch({ type: ACTION_TYPES.ADD_CLAIM, payload: newClaim });
            
            // Update stats
            const stats = db.getStats();
            stats.mealsProvided = (stats.mealsProvided || 0) + 100;
            const updatedStats = db.updateStats(stats);
            dispatch({ type: ACTION_TYPES.UPDATE_STATS, payload: updatedStats });
        },

        setActiveFilter: (filter) => {
            dispatch({ type: ACTION_TYPES.SET_ACTIVE_FILTER, payload: filter });
        },

        showModal: (modalName) => {
            dispatch({ type: ACTION_TYPES.SHOW_MODAL, payload: modalName });
        },

        hideModal: (modalName) => {
            dispatch({ type: ACTION_TYPES.HIDE_MODAL, payload: modalName });
        }
    };

    const value = {
        ...state,
        actions,
        formatNumber
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};