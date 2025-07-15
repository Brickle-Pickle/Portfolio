import React, { useState, useEffect, useRef } from 'react';
import textContent from '../assets/text_content/easter_egg.json';
import './styles/easter_egg.css';

const EasterEgg = ({ isVisible, onClose }) => {
    const [codeInput, setCodeInput] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showError, setShowError] = useState(false);
    const [terminalLines, setTerminalLines] = useState([]);
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [matrixMode, setMatrixMode] = useState(false);
    const [timeTravel, setTimeTravel] = useState(false);
    const [debugMode, setDebugMode] = useState(false);
    const terminalRef = useRef(null);

    const SECRET_CODE = 'DEV_2025_BRICKLEPICKLE';

    // Handle code input submission
    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (codeInput.toUpperCase() === SECRET_CODE) {
            setIsUnlocked(true);
            startUnlockSequence();
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            setCodeInput('');
        }
    };

    // Start unlock sequence with terminal animation
    const startUnlockSequence = () => {
        const sequence = [
            'Verificando credenciales...',
            'Acceso autorizado detectado.',
            'Cargando módulos secretos...',
            'Inicializando laboratorio de desarrollo...',
            'Sistema desbloqueado exitosamente.',
            textContent.codeInput.success
        ];

        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < sequence.length) {
                addTerminalLine(sequence[index]);
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 800);
    };

    // Add line to terminal with timestamp
    const addTerminalLine = (text) => {
        setTerminalLines(prev => [...prev, { 
            text, 
            timestamp: new Date().toLocaleTimeString(),
            id: Date.now() + Math.random()
        }]);
    };

    // Execute secret command with special effects
    const executeCommand = (command) => {
        setSelectedCommand(command);
        addTerminalLine(`> ${command.command}`);
        
        setTimeout(() => {
            addTerminalLine(command.result);
            
            // Activate special effects based on command
            if (command.command.includes('matrix')) {
                setMatrixMode(true);
                setTimeout(() => setMatrixMode(false), 5000);
            } else if (command.command.includes('time')) {
                setTimeTravel(true);
                setTimeout(() => setTimeTravel(false), 4000);
            } else if (command.command.includes('debug')) {
                setDebugMode(true);
                setTimeout(() => setDebugMode(false), 6000);
            }
            
            setSelectedCommand(null);
        }, 1500);
    };

    // Auto-scroll terminal to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalLines]);

    // Reset component state when visibility changes
    useEffect(() => {
        if (isVisible) {
            setCodeInput('');
            setIsUnlocked(false);
            setShowError(false);
            setTerminalLines([]);
            setSelectedCommand(null);
            setMatrixMode(false);
            setTimeTravel(false);
            setDebugMode(false);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className={`easter-egg ${matrixMode ? 'matrix-active' : ''} ${timeTravel ? 'time-travel-active' : ''} ${debugMode ? 'debug-active' : ''}`}>
            {/* Background overlay */}
            <div className="easter-egg__overlay" onClick={onClose}></div>
            
            {/* Main modal container */}
            <div className="easter-egg__modal">
                {/* Close button */}
                <button className="easter-egg__close" onClick={onClose}>×</button>

                {!isUnlocked ? (
                    /* Code input screen */
                    <div className="easter-egg__code-screen">
                        <div className="easter-egg__security-header">
                            <h2 className="easter-egg__security-title">ACCESO RESTRINGIDO</h2>
                            <div className="easter-egg__security-grid"></div>
                        </div>
                        
                        <form onSubmit={handleCodeSubmit} className="easter-egg__code-form">
                            <div className="easter-egg__input-container">
                                <input
                                    type="text"
                                    value={codeInput}
                                    onChange={(e) => setCodeInput(e.target.value)}
                                    placeholder={textContent.codeInput.placeholder}
                                    className={`easter-egg__code-input ${showError ? 'error' : ''}`}
                                    autoComplete="off"
                                    autoFocus
                                />
                                <div className="easter-egg__input-scanner"></div>
                            </div>
                            
                            {showError && (
                                <p className="easter-egg__error-message">{textContent.codeInput.error}</p>
                            )}
                            
                            <button type="submit" className="easter-egg__access-button">
                                VERIFICAR ACCESO
                            </button>
                        </form>
                        
                        <div className="easter-egg__hint-section">
                            <p className="easter-egg__hint"></p>
                        </div>
                    </div>
                ) : (
                    /* Unlocked developer lab */
                    <div className="easter-egg__lab-content">
                        {/* Header section */}
                        <div className="easter-egg__lab-header">
                            <h1 className="easter-egg__lab-title">{textContent.title}</h1>
                            <p className="easter-egg__lab-subtitle">{textContent.subtitle}</p>
                            <p className="easter-egg__lab-description">{textContent.description}</p>
                        </div>

                        {/* Terminal section */}
                        <div className="easter-egg__terminal" ref={terminalRef}>
                            <div className="easter-egg__terminal-header">
                                <span className="easter-egg__terminal-title">developer_console.exe</span>
                                <div className="easter-egg__terminal-controls">
                                    <span className="easter-egg__control minimize"></span>
                                    <span className="easter-egg__control maximize"></span>
                                    <span className="easter-egg__control close"></span>
                                </div>
                            </div>
                            <div className="easter-egg__terminal-body">
                                {terminalLines.map((line) => (
                                    <div key={line.id} className="easter-egg__terminal-line">
                                        <span className="easter-egg__timestamp">[{line.timestamp}]</span>
                                        <span className="easter-egg__line-text">{line.text}</span>
                                    </div>
                                ))}
                                <div className="easter-egg__cursor-line">
                                    <span className="easter-egg__prompt">dev@portfolio:~$</span>
                                    <span className="easter-egg__cursor">_</span>
                                </div>
                            </div>
                        </div>

                        {/* Features grid */}
                        <div className="easter-egg__features-grid">
                            {textContent.features.map((feature, index) => (
                                <div key={index} className="easter-egg__feature-card">
                                    <div className="easter-egg__feature-header">
                                        <div className="easter-egg__feature-icon">{feature.icon}</div>
                                        <h3 className="easter-egg__feature-title">{feature.title}</h3>
                                    </div>
                                    <p className="easter-egg__feature-description">{feature.description}</p>
                                    <div className="easter-egg__feature-stats">
                                        {Object.entries(feature.stats).map(([key, value]) => (
                                            <div key={key} className="easter-egg__stat">
                                                <span className="easter-egg__stat-label">{key}:</span>
                                                <span className="easter-egg__stat-value">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Secret commands */}
                        <div className="easter-egg__commands-section">
                            <h3 className="easter-egg__commands-title">Comandos Secretos</h3>
                            <div className="easter-egg__commands-grid">
                                {textContent.secretCommands.map((command, index) => (
                                    <button
                                        key={index}
                                        className="easter-egg__command-button"
                                        onClick={() => executeCommand(command)}
                                        disabled={selectedCommand === command}
                                    >
                                        <code className="easter-egg__command-code">{command.command}</code>
                                        <span className="easter-egg__command-description">{command.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="easter-egg__achievements-section">
                            <h3 className="easter-egg__achievements-title">Logros Desbloqueados</h3>
                            <div className="easter-egg__achievements-list">
                                {textContent.achievements.map((achievement, index) => (
                                    <div 
                                        key={index} 
                                        className="easter-egg__achievement"
                                        style={{animationDelay: `${index * 0.2}s`}}
                                    >
                                        {achievement}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Welcome message */}
                        <div className="easter-egg__welcome-message">
                            <p>{textContent.messages.welcome}</p>
                            <p>{textContent.messages.developer}</p>
                            <p className="easter-egg__closing-message">{textContent.messages.closing}</p>
                        </div>
                    </div>
                )}

                {/* Special effects overlays */}
                {matrixMode && <div className="easter-egg__matrix-overlay"></div>}
                {timeTravel && <div className="easter-egg__time-travel-overlay"></div>}
                {debugMode && <div className="easter-egg__debug-overlay"></div>}
            </div>
        </div>
    );
};

export default EasterEgg;