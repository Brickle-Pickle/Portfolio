import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaExpand, FaRedo, FaGamepad, FaKeyboard, FaTrophy, FaInfo } from 'react-icons/fa';
import { SiUnity } from 'react-icons/si';
import gameContent from '../assets/text_content/game_dev.json';
import './styles/game_preview.css';

const GamePreview = () => {
    const { game_preview } = gameContent;
    const [isGameLoaded, setIsGameLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('info');
    const iframeRef = useRef(null);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.querySelector('.game_preview');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Auto-hide controls after game starts
    useEffect(() => {
        if (isPlaying) {
            const timer = setTimeout(() => {
                setShowControls(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isPlaying]);

    const handlePlayGame = () => {
        setIsPlaying(true);
        setIsGameLoaded(true);
    };

    const handleFullscreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            }
        }
    };

    const handleRestart = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src; // Reload iframe
        }
    };

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    return (
        <section className={`game_preview ${isVisible ? 'visible' : ''}`}>
            <div className="game-preview-container">
                {/* Header */}
                <div className="game-preview-header">
                    <div className="header-icon">
                        <FaGamepad className="main-icon" />
                    </div>
                    <div className="header-content">
                        <h2 className="game-title">{game_preview.title}</h2>
                        <p className="game-subtitle">{game_preview.subtitle}</p>
                        <p className="game-description">{game_preview.description}</p>
                    </div>
                    <div className="game-meta">
                        <div className="meta-item">
                            <SiUnity className="meta-icon" />
                            <span>{game_preview.engine}</span>
                        </div>
                        <div className="meta-item">
                            <span className="genre-badge">{game_preview.genre}</span>
                        </div>
                    </div>
                </div>

                {/* Game Container */}
                <div className="game-container">
                    <div className="game-frame">
                        {!isGameLoaded ? (
                            <div className="game-placeholder">
                                <div className="placeholder-content">
                                    <FaGamepad className="placeholder-icon" />
                                    <h3>¿Listo para jugar?</h3>
                                    <p>Haz clic en "Jugar Ahora" para cargar {game_preview.title}</p>
                                    <button className="play-button" onClick={handlePlayGame}>
                                        <FaPlay />
                                        <span>{game_preview.cta.play}</span>
                                    </button>
                                </div>
                                <div className="placeholder-bg"></div>
                            </div>
                        ) : (
                            <>
                                <iframe
                                    ref={iframeRef}
                                    src="/src/assets/SnakeLocaust/index.html"
                                    title={game_preview.title}
                                    className="game-iframe"
                                    allowFullScreen
                                />
                                
                                {/* Game Controls Overlay */}
                                <div className={`game-controls-overlay ${showControls ? 'visible' : ''}`}>
                                    <div className="controls-panel">
                                        <button 
                                            className="control-btn"
                                            onClick={handleFullscreen}
                                            title="Pantalla Completa"
                                        >
                                            <FaExpand />
                                        </button>
                                        <button 
                                            className="control-btn"
                                            onClick={handleRestart}
                                            title="Reiniciar"
                                        >
                                            <FaRedo />
                                        </button>
                                        <button 
                                            className="control-btn toggle-controls"
                                            onClick={toggleControls}
                                            title="Ocultar Controles"
                                        >
                                            <FaKeyboard />
                                        </button>
                                    </div>
                                </div>

                                {/* Show Controls Button (when hidden) */}
                                {!showControls && (
                                    <button 
                                        className="show-controls-btn"
                                        onClick={toggleControls}
                                        title="Mostrar Controles"
                                    >
                                        <FaKeyboard />
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Game Info Sidebar */}
                    <div className="game-info-sidebar">
                        <div className="info-tabs">
                            <button 
                                className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                                onClick={() => setActiveTab('info')}
                            >
                                <FaInfo />
                                <span>Info</span>
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'controls' ? 'active' : ''}`}
                                onClick={() => setActiveTab('controls')}
                            >
                                <FaKeyboard />
                                <span>Controles</span>
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                                onClick={() => setActiveTab('features')}
                            >
                                <FaTrophy />
                                <span>Features</span>
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'info' && (
                                <div className="info-content">
                                    <h4>Información del Juego</h4>
                                    <div className="info-item">
                                        <strong>Objetivo:</strong>
                                        <p>{game_preview.gameInfo.objective}</p>
                                    </div>
                                    <div className="info-item">
                                        <strong>Dificultad:</strong>
                                        <p>{game_preview.gameInfo.difficulty}</p>
                                    </div>
                                    <div className="info-item">
                                        <strong>Récord:</strong>
                                        <p>{game_preview.gameInfo.bestScore}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'controls' && (
                                <div className="controls-content">
                                    <h4>{game_preview.controls.title}</h4>
                                    <ul className="controls-list">
                                        {game_preview.controls.instructions.map((instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'features' && (
                                <div className="features-content">
                                    <h4>Características</h4>
                                    <ul className="features-list">
                                        {game_preview.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Game Stats */}
                <div className="game-stats">
                    <div className="stat-item">
                        <span className="stat-label">Motor</span>
                        <span className="stat-value">{game_preview.engine}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Año</span>
                        <span className="stat-value">{game_preview.year}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Estado</span>
                        <span className="stat-value">{game_preview.status}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Plataforma</span>
                        <span className="stat-value">{game_preview.platforms.join(', ')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GamePreview;