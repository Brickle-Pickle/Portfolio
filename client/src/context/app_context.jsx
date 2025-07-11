import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const value = {
        isLoading,
        setIsLoading,
        navigate,
        showContact,
        setShowContact,
    };

    useEffect(() => {
        // Only run initial loading on first mount
        if (!hasInitialized) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setHasInitialized(true);
                // Only navigate to home if we're on the root path
                if (location.pathname === '/') {
                    navigate('/home');
                }
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // For subsequent navigations, don't show loading
            setIsLoading(false);
        }
    }, [navigate, location.pathname, hasInitialized]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}