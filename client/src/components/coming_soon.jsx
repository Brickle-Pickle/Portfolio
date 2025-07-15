import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/app_context';
import textContent from '../assets/text_content/coming_soon.json';
import './styles/coming_soon.css';

const ComingSoon = () => {
    const { setShowContact } = useAppContext();
    const [orbClicks, setOrbClicks] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [easterEggPhase, setEasterEggPhase] = useState(0);
    const [matrixRain, setMatrixRain] = useState([]);
    const [secretMessage, setSecretMessage] = useState('');

    // Secret messages that will be revealed
    const secretMessages = [
        " Iniciando secuencia... ",
        " Acceso concedido... ",
        " Has encontrado el portal secreto... ",
        " Diríjase a /more..."
    ];

    const handleOrbClick = () => {
        setOrbClicks(prev => prev + 1);
        
        // Easter egg después de 5 clicks
        if (orbClicks + 1 === 5) {
            setShowEasterEgg(true);
            startEasterEggSequence();
        }
    };

    const startEasterEggSequence = () => {
        // Phase 1: Matrix rain effect
        setEasterEggPhase(1);
        createMatrixRain();
        
        // Phase 2: Secret message typing effect
        setTimeout(() => {
            setEasterEggPhase(2);
            typeSecretMessage();
        }, 2000);

        // Phase 3: Portal opening effect
        setTimeout(() => {
            setEasterEggPhase(3);
        }, 5000);

        // Phase 4: Final revelation
        setTimeout(() => {
            setEasterEggPhase(4);
        }, 7000);

        // Reset after 12 seconds
        setTimeout(() => {
            setShowEasterEgg(false);
            setEasterEggPhase(0);
            setMatrixRain([]);
            setSecretMessage('');
        }, 20000);
    };

    const createMatrixRain = () => {
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const drops = [];
        
        for (let i = 0; i < 50; i++) {
            drops.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                char: characters[Math.floor(Math.random() * characters.length)],
                speed: Math.random() * 2 + 1
            });
        }
        setMatrixRain(drops);
    };

    const typeSecretMessage = () => {
        let messageIndex = 0;
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
            if (messageIndex < secretMessages.length) {
                const currentMessage = secretMessages[messageIndex];
                if (charIndex < currentMessage.length) {
                    setSecretMessage(prev => prev + currentMessage[charIndex]);
                    charIndex++;
                } else {
                    // Move to next message
                    messageIndex++;
                    charIndex = 0;
                    setSecretMessage(prev => prev + '\n');
                }
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
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

    // Update matrix rain animation
    useEffect(() => {
        if (showEasterEgg && easterEggPhase === 1) {
            const interval = setInterval(() => {
                setMatrixRain(prev => prev.map(drop => ({
                    ...drop,
                    y: (drop.y + drop.speed) % 100,
                    char: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'[
                        Math.floor(Math.random() * 71)
                    ]
                })));
            }, 100);

            return () => clearInterval(interval);
        }
    }, [showEasterEgg, easterEggPhase]);

    return (
        <div className="coming-soon">
            {/* Partículas flotantes */}
            <div className="coming-soon__particles"></div>
            
            {/* Easter Egg Overlay */}
            {showEasterEgg && (
                <div className="easter-egg-overlay">
                    {/* Matrix Rain Effect */}
                    {easterEggPhase >= 1 && (
                        <div className="matrix-rain">
                            {matrixRain.map(drop => (
                                <div
                                    key={drop.id}
                                    className="matrix-drop"
                                    style={{
                                        left: `${drop.x}%`,
                                        top: `${drop.y}%`,
                                        animationDelay: `${drop.id * 0.1}s`
                                    }}
                                >
                                    {drop.char}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Secret Terminal */}
                    {easterEggPhase >= 2 && (
                        <div className="secret-terminal">
                            <div className="terminal-header">
                                <span className="terminal-title">SISTEMA_ACCESO.exe</span>
                                <div className="terminal-controls">
                                    <span className="control minimize"></span>
                                    <span className="control maximize"></span>
                                    <span className="control close"></span>
                                </div>
                            </div>
                            <div className="terminal-body">
                                <div className="terminal-prompt">
                                    <span className="prompt-symbol">$</span>
                                    <span className="prompt-text">root@portfolio:~#</span>
                                </div>
                                <pre className="secret-text">
                                    {secretMessage}
                                    <span className="cursor-blink">_</span>
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Portal Effect */}
                    {easterEggPhase >= 3 && (
                        <div className="portal-container">
                            <div className="portal-ring ring-1"></div>
                            <div className="portal-ring ring-2"></div>
                            <div className="portal-ring ring-3"></div>
                            <div className="portal-center">
                                <div className="portal-energy"></div>
                            </div>
                        </div>
                    )}

                    {/* Final Message */}
                    {easterEggPhase >= 4 && (
                        <div className="final-message">
                            <h2 className="glitch-text" data-text="¡ACCESO CONCEDIDO!">
                                ¡ACCESO CONCEDIDO!
                            </h2>
                            <p className="revelation-text">
                                <span className="special-code">Código secreto: DEV_2025_BRICKLEPICKLE</span>
                            </p>
                        </div>
                    )}
                </div>
            )}
            
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
                        className={`coming-soon__orb ${orbClicks > 0 ? 'orb-activated' : ''}`}
                        onClick={handleOrbClick}
                        title={`¡Haz click para interactuar! (${orbClicks}/5)`}
                    >
                        {/* Click counter indicator */}
                        {orbClicks > 0 && (
                            <div className="click-counter">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div 
                                        key={i} 
                                        className={`click-dot ${i < orbClicks ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Hint for users */}
                    {orbClicks > 0 && orbClicks < 5 && (
                        <p className="click-hint">
                            {orbClicks === 1 && "Interesante... sigue haciendo click"}
                            {orbClicks === 2 && "Algo está pasando..."}
                            {orbClicks === 3 && "¡Casi lo tienes!"}
                            {orbClicks === 4 && "¡Un click más para el secreto!"}
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