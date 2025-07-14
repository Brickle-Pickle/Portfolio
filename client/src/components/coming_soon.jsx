import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/app_context';
import textContent from '../assets/text_content/coming_soon.json';
import './styles/coming_soon.css';

const ComingSoon = () => {
    const { setShowContact } = useAppContext();
    const [orbClicks, setOrbClicks] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    const handleOrbClick = () => {
        setOrbClicks(prev => prev + 1);
        
        // Easter egg después de 5 clicks
        if (orbClicks + 1 === 5) {
            setShowEasterEgg(true);
            setTimeout(() => setShowEasterEgg(false), 3000);
        }
    };

    const handleContactClick = () => {
        setShowContact(true);
    };

    useEffect(() => {
        // Crear partículas dinámicamente
        const createParticles = () => {
            const container = document.querySelector('.coming-soon__particles');
            if (!container) return;

            // Limpiar partículas existentes
            container.innerHTML = '';

            // Crear 5 partículas
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'coming-soon__particle';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(particle);
            }
        };

        createParticles();
    }, []);

    return (
        <div className="coming-soon">
            {/* Partículas flotantes */}
            <div className="coming-soon__particles"></div>
            
            <div className="coming-soon__container">
                <h1 className="coming-soon__title">
                    {textContent.title}
                </h1>
                
                <p className="coming-soon__subtitle">
                    {textContent.subtitle}
                </p>
                
                <p className="coming-soon__description">
                    {textContent.description}
                </p>
                
                {/* Elemento interactivo - Orbe */}
                <div className="coming-soon__interactive">
                    <div 
                        className="coming-soon__orb" 
                        onClick={handleOrbClick}
                        title="¡Haz click para interactuar!"
                    ></div>
                    
                    {showEasterEgg && (
                        <p style={{ 
                            color: 'var(--clr-accent)', 
                            fontFamily: 'var(--ff-mono)',
                            fontSize: '0.9rem',
                            marginTop: '1rem',
                            animation: 'fadeInUp 0.5s ease-out'
                        }}>
                            🎉 ¡Has desbloqueado un easter egg! ¡Gracias por explorar!
                        </p>
                    )}
                </div>
                
                {/* Barra de progreso */}
                <div className="coming-soon__progress">
                    <div className="coming-soon__progress-label">
                        <span>{textContent.progress.label}</span>
                        <span>{textContent.progress.percentage}%</span>
                    </div>
                    <div className="coming-soon__progress-bar">
                        <div className="coming-soon__progress-fill"></div>
                    </div>
                </div>
                
                {/* Características */}
                <div className="coming-soon__features">
                    {textContent.features.map((feature, index) => (
                        <div key={index} className="coming-soon__feature">
                            {feature}
                        </div>
                    ))}
                </div>
                
                {/* Call to Action */}
                <div className="coming-soon__cta">
                    <p style={{ 
                        marginBottom: '1rem', 
                        color: 'var(--clr-text-light)',
                        fontFamily: 'var(--ff-primary)'
                    }}>
                        {textContent.contact.message}
                    </p>
                    
                    <button 
                        className="coming-soon__button"
                        onClick={handleContactClick}
                    >
                        {textContent.contact.action}
                        <span style={{ marginLeft: '0.5rem' }}>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;