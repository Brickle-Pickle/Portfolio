import React from 'react';
import { useAppContext } from '../context/app_context';
import './styles/loading.css';

const Loading = () => {
    const { isLoading } = useAppContext();

    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-container">
                {/* Main spinner with geometric design */}
                <div className="loading-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                
                {/* Loading text with animation */}
                <div className="loading-text">
                    <span>L</span>
                    <span>o</span>
                    <span>a</span>
                    <span>d</span>
                    <span>i</span>
                    <span>n</span>
                    <span>g</span>
                </div>
                
                {/* Progress bar */}
                <div className="loading-progress">
                    <div className="progress-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;