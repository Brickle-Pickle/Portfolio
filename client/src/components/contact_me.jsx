import React, { useState, useEffect } from 'react';
import { 
    FaEnvelope, FaTimes, FaCode, FaGamepad, FaMicrochip, 
    FaRocket, FaGithub, FaExternalLinkAlt, FaCopy, FaCheck,
    FaMapMarkerAlt, FaClock, FaUser
} from 'react-icons/fa';
import contactContent from '../assets/text_content/contact_me.json';
import './styles/contact_me.css';

const ContactMe = ({ isOpen, onClose }) => {
    const { contact_modal } = contactContent;
    const [emailCopied, setEmailCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeService, setActiveService] = useState(0);

    // Icon mapping for dynamic rendering
    const iconMap = {
        FaCode,
        FaGamepad, 
        FaMicrochip,
        FaRocket,
        FaEnvelope,
        FaGithub,
        FaExternalLinkAlt
    };

    // Handle modal visibility animation
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Auto-rotate services showcase
    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                setActiveService(prev => (prev + 1) % contact_modal.services.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isOpen, contact_modal.services.length]);

    // Handle email copy to clipboard
    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contact_modal.email);
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    // Handle email client opening
    const handleEmailClick = () => {
        const subject = encodeURIComponent('Colaboración - Proyecto Web/Game Development');
        const body = encodeURIComponent(
            `Hola Antonio,\n\nMe gustaría hablar contigo sobre un proyecto.\n\n` +
            `Detalles del proyecto:\n- \n\n` +
            `Información de contacto:\n- \n\n` +
            `¡Espero tu respuesta!\n\nSaludos`
        );
        window.open(`mailto:${contact_modal.email}?subject=${subject}&body=${body}`);
    };

    // Handle external link clicks
    const handleLinkClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`contact-me contact-overlay ${isVisible ? 'visible' : ''}`}>
            <div className="contact-backdrop" onClick={onClose}></div>
            
            <div className={`contact-modal ${isVisible ? 'modal-visible' : ''}`}>
                {/* Close button */}
                <button className="contact-close" onClick={onClose}>
                    <FaTimes />
                </button>

                {/* Header section */}
                <div className="contact-header">
                    <div className="contact-avatar">
                        <img src="/1024.png" alt="logo" className='avatar-icon' />
                        <div className="avatar-glow"></div>
                    </div>
                    <h2 className="contact-title">{contact_modal.title}</h2>
                    <p className="contact-subtitle">{contact_modal.subtitle}</p>
                    <p className="contact-description">{contact_modal.description}</p>
                </div>

                {/* Availability info */}
                <div className="contact-availability">
                    <div className="availability-item">
                        <div className="status-indicator active"></div>
                        <span>{contact_modal.availability.status}</span>
                    </div>
                    <div className="availability-item">
                        <FaClock className="availability-icon" />
                        <span>{contact_modal.availability.response_time}</span>
                    </div>
                    <div className="availability-item">
                        <FaMapMarkerAlt className="availability-icon" />
                        <span>{contact_modal.availability.location}</span>
                    </div>
                </div>

                {/* Services showcase */}
                <div className="contact-services not-responsive">
                    <h3 className="services-title">Servicios Disponibles</h3>
                    <div className="services-grid">
                        {contact_modal.services.map((service, index) => {
                            const IconComponent = iconMap[service.icon];
                            return (
                                <div 
                                    key={index}
                                    className={`service-card ${
                                        index === activeService ? 'active' : ''
                                    }`}
                                    onMouseEnter={() => setActiveService(index)}
                                >
                                    <div className="service-icon">
                                        <IconComponent />
                                    </div>
                                    <h4 className="service-title">{service.title}</h4>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contact methods */}
                <div className="contact-methods">
                    <div className="primary-contact">
                        <div className="email-display">
                            <FaEnvelope className="email-icon" />
                            <span className="email-text">{contact_modal.email}</span>
                        </div>
                        
                        <div className="contact-actions">
                            <button 
                                className="btn-primary contact-btn"
                                onClick={handleEmailClick}
                            >
                                <FaEnvelope className="btn-icon" />
                                {contact_modal.cta.primary}
                            </button>
                            
                            <button 
                                className={`btn-secondary contact-btn ${
                                    emailCopied ? 'copied' : ''
                                }`}
                                onClick={handleCopyEmail}
                            >
                                {emailCopied ? (
                                    <>
                                        <FaCheck className="btn-icon" />
                                        {contact_modal.messages.email_copied}
                                    </>
                                ) : (
                                    <>
                                        <FaCopy className="btn-icon" />
                                        {contact_modal.cta.secondary}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Secondary contact methods */}
                    <div className="secondary-contacts">
                        {contact_modal.contact_methods
                            .filter(method => !method.primary)
                            .map((method, index) => {
                                const IconComponent = iconMap[method.icon];
                                return (
                                    <button
                                        key={index}
                                        className="secondary-contact-btn"
                                        onClick={() => handleLinkClick(method.value)}
                                        title={method.label}
                                    >
                                        <IconComponent className="secondary-icon" />
                                        <span>{method.label}</span>
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>

                {/* Floating particles for visual effect */}
                <div className="contact-particles">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactMe;