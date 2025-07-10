import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const [isLoading, setIsLoading] = useState(true);

    const value = {
        isLoading,
        setIsLoading,
        navigate,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            navigate('/home');
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]); // Add navigate to dependencies

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}