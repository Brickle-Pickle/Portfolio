import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/app_context';
import { FaHome, FaUser, FaGamepad, FaMicrochip, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import navbarData from '../assets/text_content/navbar.json';
import './styles/navbar.css';

const Navbar = () => {
    const { navigate, setShowContact } = useAppContext();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Icon mapping for dynamic rendering
    const iconMap = {
        FaHome,
        FaUser,
        FaGamepad,
        FaMicrochip
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleContact = () => {
        // Scroll to contact section or open contact modal
        setShowContact(true);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Particles background */}
            <div className="navbar-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}></div>
                ))}
            </div>

            <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Logo Section */}
                    <div className="navbar-brand" onClick={() => handleNavigation('/home')}>
                        <div className="logo-container">
                            <img 
                                src="/src/assets/images/BricklePickleLogo_act2025.png" 
                                alt="Brickle Pickle Logo" 
                                className="logo-image"
                            />
                            <div className="logo-glow"></div>
                        </div>
                        <div className="brand-text">
                            <h1 className="brand-name">{navbarData.brand.name}</h1>
                            <span className="brand-tagline">{navbarData.brand.tagline}</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="navbar-nav desktop-nav">
                        {navbarData.navigation.map((item) => {
                            const IconComponent = iconMap[item.icon];
                            const isActive = location.pathname === item.path;
                            
                            return (
                                <button
                                    key={item.id}
                                    className={`nav-item ${isActive ? 'active' : ''}`}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    <IconComponent className="nav-icon" />
                                    <span className="nav-label">{item.label}</span>
                                    <div className="nav-indicator"></div>
                                </button>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <button className="navbar-cta desktop-nav" onClick={handleContact}>
                        <FaEnvelope className="cta-icon" />
                        <span>{navbarData.cta.label}</span>
                        <div className="cta-glow"></div>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                        <div className="toggle-glow"></div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}>
                    <div className="mobile-nav-content">
                        {navbarData.navigation.map((item) => {
                            const IconComponent = iconMap[item.icon];
                            const isActive = location.pathname === item.path;
                            
                            return (
                                <button
                                    key={item.id}
                                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    <IconComponent className="mobile-nav-icon" />
                                    <span className="mobile-nav-label">{item.label}</span>
                                </button>
                            );
                        })}
                        
                        <button className="mobile-nav-cta" onClick={handleContact}>
                            <FaEnvelope className="mobile-nav-icon" />
                            <span>{navbarData.cta.label}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Overlay */}
                {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>}
            </nav>
        </>
    );
};

export default Navbar;