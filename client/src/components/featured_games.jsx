import React, { useState, useEffect } from 'react';
import { 
    FaGamepad, FaDownload, FaEye, FaArrowLeft, FaArrowRight,
    FaPlay, FaStar, FaCalendarAlt, FaCog, FaExternalLinkAlt
} from 'react-icons/fa';
import { SiUnity, SiItchdotio } from 'react-icons/si';
import './styles/featured_games.css';
import gameContent from '../assets/text_content/game_dev.json';

const FeaturedGames = () => {
    const { featured_games } = gameContent;
    const [activeGame, setActiveGame] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredGame, setHoveredGame] = useState(null);
    const [imageLoaded, setImageLoaded] = useState({});

    // Early return if data is not loaded
    if (!featured_games || !featured_games.games || featured_games.games.length === 0) {
        return (
            <section className="featured-games">
                <div className="featured-games-container">
                    <div className="loading-state">
                        <FaGamepad className="loading-icon" />
                        <p>Cargando juegos...</p>
                    </div>
                </div>
            </section>
        );
    }

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

        const element = document.querySelector('.featured-games');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Auto-rotate images for active game
    useEffect(() => {
        const currentGame = featured_games.games[activeGame];
        if (currentGame && currentGame.images.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => 
                    (prev + 1) % currentGame.images.length
                );
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [activeGame, featured_games.games]);

    // Reset image index when changing games
    useEffect(() => {
        setActiveImageIndex(0);
    }, [activeGame]);

    const handleGameChange = (index) => {
        setActiveGame(index);
    };

    const handleImageNavigation = (direction) => {
        const currentGame = featured_games.games[activeGame];
        if (direction === 'next') {
            setActiveImageIndex((prev) => 
                (prev + 1) % currentGame.images.length
            );
        } else {
            setActiveImageIndex((prev) => 
                prev === 0 ? currentGame.images.length - 1 : prev - 1
            );
        }
    };

    const handleImageLoad = (gameId, imageIndex) => {
        setImageLoaded(prev => ({
            ...prev,
            [`${gameId}-${imageIndex}`]: true
        }));
    };

    const currentGame = featured_games.games[activeGame];
    const currentImage = currentGame?.images[activeImageIndex];

    return (
        <section className={`featured-games ${isVisible ? 'visible' : ''}`}>
            <div className="featured-games-container">
                {/* Header */}
                <div className="featured-games-header">
                    <div className="header-icon">
                        <FaGamepad className="main-icon" />
                    </div>
                    <h2 className="featured-games-title">{featured_games.title}</h2>
                    <p className="featured-games-subtitle">{featured_games.subtitle}</p>
                    <p className="featured-games-description">{featured_games.description}</p>
                </div>

                {/* Main Game Display */}
                <div className="main-game-display">
                    <div className="game-showcase">
                        {/* Game Gallery */}
                        <div className="game-gallery">
                            <div className="gallery-container">
                                <div className="main-image-container">
                                    {!imageLoaded[`${currentGame.id}-${activeImageIndex}`] && (
                                        <div className="image-skeleton">
                                            <FaGamepad className="skeleton-icon" />
                                        </div>
                                    )}
                                    <img 
                                        src={currentImage}
                                        alt={`${currentGame.title} - Screenshot ${activeImageIndex + 1}`}
                                        className="main-game-image"
                                        onLoad={() => handleImageLoad(currentGame.id, activeImageIndex)}
                                        style={{
                                            opacity: imageLoaded[`${currentGame.id}-${activeImageIndex}`] ? 1 : 0
                                        }}
                                    />
                                    
                                    {/* Image Navigation */}
                                    {currentGame.images.length > 1 && (
                                        <>
                                            <button 
                                                className="image-nav prev"
                                                onClick={() => handleImageNavigation('prev')}
                                                aria-label="Imagen anterior"
                                            >
                                                <FaArrowLeft />
                                            </button>
                                            <button 
                                                className="image-nav next"
                                                onClick={() => handleImageNavigation('next')}
                                                aria-label="Siguiente imagen"
                                            >
                                                <FaArrowRight />
                                            </button>
                                        </>
                                    )}
                                    
                                    {/* Image Indicators */}
                                    {currentGame.images.length > 1 && (
                                        <div className="image-indicators">
                                            {currentGame.images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`indicator ${index === activeImageIndex ? 'active' : ''}`}
                                                    onClick={() => setActiveImageIndex(index)}
                                                    aria-label={`Ver imagen ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Thumbnail Gallery */}
                                {currentGame.images.length > 1 && (
                                    <div className="thumbnail-gallery">
                                        {currentGame.images.map((image, index) => (
                                            <div 
                                                key={index}
                                                className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                                                onClick={() => setActiveImageIndex(index)}
                                            >
                                                <img 
                                                    src={image}
                                                    alt={`${currentGame.title} - Thumbnail ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="game-info">
                            <div className="game-header">
                                <div className="game-meta">
                                    <span className="game-genre">{currentGame.genre}</span>
                                    <div className="game-year">
                                        <FaCalendarAlt />
                                        <span>{currentGame.year}</span>
                                    </div>
                                </div>
                                
                                <h3 className="game-title">{currentGame.title}</h3>
                                <p className="game-subtitle">{currentGame.subtitle}</p>
                            </div>
                            
                            <p className="game-description">{currentGame.description}</p>

                            {/* Game Details */}
                            <div className="game-details">
                                <div className="detail-item">
                                    <SiUnity className="detail-icon" />
                                    <span>Motor: {currentGame.engine}</span>
                                </div>
                                <div className="detail-item">
                                    <FaCog className="detail-icon" />
                                    <span>Plataformas: {currentGame.platforms.join(', ')}</span>
                                </div>
                                <div className="detail-item">
                                    <FaStar className="detail-icon" />
                                    <span>Estado: {currentGame.status}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="game-features">
                                <h4>Características destacadas:</h4>
                                <ul>
                                    {currentGame.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="game-actions">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => window.open(currentGame.downloadUrl, '_blank')}
                                >
                                    <FaPlay /> Jugar Ahora
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => window.open(currentGame.downloadUrl, '_blank')}
                                >
                                    <FaDownload /> Descargar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Games Navigation */}
                <div className="games-navigation">
                    {featured_games.games.map((game, index) => (
                        <div
                            key={game.id}
                            className={`game-nav-item ${
                                index === activeGame ? 'active' : ''
                            } ${
                                hoveredGame === index ? 'hovered' : ''
                            }`}
                            onClick={() => handleGameChange(index)}
                            onMouseEnter={() => setHoveredGame(index)}
                            onMouseLeave={() => setHoveredGame(null)}
                        >
                            <div className="nav-image">
                                <img 
                                    src={game.mainImage}
                                    alt={game.title}
                                />
                                <div className="nav-overlay">
                                    <FaEye />
                                </div>
                            </div>
                            <div className="nav-content">
                                <h4>{game.title}</h4>
                                <p>{game.genre}</p>
                                <span className="nav-year">{game.year}</span>
                            </div>
                            <div className="nav-indicator"></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="games-cta">
                    <button 
                        className="btn btn-outline"
                        onClick={() => window.open('https://brickle-pickle.itch.io/', '_blank')}
                    >
                        <SiItchdotio /> {featured_games.cta.primary}
                    </button>
                    <button 
                        className="btn btn-github"
                        onClick={() => window.open('https://brickle-pickle.itch.io/', '_blank')}
                    >
                        <FaExternalLinkAlt /> {featured_games.cta.secondary}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedGames;