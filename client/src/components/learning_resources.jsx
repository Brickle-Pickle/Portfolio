import React, { useState, useEffect } from 'react';
import { 
    FaBook, 
    FaYoutube, 
    FaCode, 
    FaCube, 
    FaTrophy, 
    FaRocket, 
    FaExternalLinkAlt,
    FaUsers,
    FaHeart,
    FaChevronRight,
    FaPlay,
    FaStar
} from 'react-icons/fa';
import gameContent from '../assets/text_content/game_dev.json';
import './styles/learning_resources.css';

const LearningResources = () => {
    const { learning_resources } = gameContent;
    const [activeCategory, setActiveCategory] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredResource, setHoveredResource] = useState(null);
    const [expandedTip, setExpandedTip] = useState(null);

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

        const element = document.querySelector('.learning_resources');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Auto-rotate categories
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCategory(prev => 
                (prev + 1) % learning_resources.categories.length
            );
        }, 8000);

        return () => clearInterval(interval);
    }, [learning_resources.categories.length]);

    const handleCategoryChange = (index) => {
        setActiveCategory(index);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'principiante': return '#10b981';
            case 'intermedio': return '#f59e0b';
            case 'avanzado': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getTypeIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'youtube': return <FaYoutube />;
            case 'curso oficial': return <FaBook />;
            case 'documentación': return <FaCode />;
            case 'game jam': return <FaTrophy />;
            default: return <FaExternalLinkAlt />;
        }
    };

    const currentCategory = learning_resources.categories[activeCategory];

    return (
        <section className={`learning_resources ${isVisible ? 'visible' : ''}`}>
            <div className="learning_resources-container">
                {/* Header */}
                <div className="learning_resources-header">
                    <div className="header-icon">
                        <FaBook className="main-icon" />
                    </div>
                    <h2 className="learning_resources-title">{learning_resources.title}</h2>
                    <p className="learning_resources-subtitle">{learning_resources.subtitle}</p>
                    <p className="learning_resources-description">{learning_resources.description}</p>
                </div>

                {/* Category Navigation */}
                <div className="category-navigation">
                    {learning_resources.categories.map((category, index) => {
                        const IconComponent = {
                            FaCube,
                            FaCode,
                            FaTrophy,
                            FaRocket
                        }[category.icon] || FaBook;

                        return (
                            <button
                                key={category.id}
                                className={`category-nav-item ${
                                    index === activeCategory ? 'active' : ''
                                }`}
                                onClick={() => handleCategoryChange(index)}
                                style={{
                                    '--category-color': category.color
                                }}
                            >
                                <div className="category-icon">
                                    <IconComponent />
                                </div>
                                <div className="category-content">
                                    <h3>{category.title}</h3>
                                    <p>{category.description}</p>
                                </div>
                                <div className="category-indicator" />
                            </button>
                        );
                    })}
                </div>

                {/* Resources Display */}
                <div className="resources-display">
                    <div className="resources-grid">
                        {currentCategory.resources.map((resource, index) => (
                            <div
                                key={index}
                                className={`resource-card ${
                                    resource.featured ? 'featured' : ''
                                }`}
                                onMouseEnter={() => setHoveredResource(index)}
                                onMouseLeave={() => setHoveredResource(null)}
                            >
                                <div className="resource-header">
                                    <div className="resource-type">
                                        {getTypeIcon(resource.type)}
                                        <span>{resource.type}</span>
                                    </div>
                                    {resource.featured && (
                                        <div className="featured-badge">
                                            <FaStar />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="resource-content">
                                    <h4>{resource.title}</h4>
                                    <p>{resource.description}</p>
                                    
                                    <div className="resource-meta">
                                        <div 
                                            className="difficulty"
                                            style={{
                                                '--difficulty-color': getDifficultyColor(resource.difficulty)
                                            }}
                                        >
                                            {resource.difficulty}
                                        </div>
                                        <div className="duration">
                                            {resource.duration}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="resource-actions">
                                    <a 
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-link"
                                    >
                                        <FaPlay />
                                        <span>Explorar</span>
                                        <FaExternalLinkAlt />
                                    </a>
                                </div>
                                
                                {hoveredResource === index && (
                                    <div className="resource-overlay">
                                        <div className="overlay-content">
                                            <FaChevronRight />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Personal Experience */}
                <div className="personal-experience">
                    <div className="experience-header">
                        <h3>{learning_resources.personal_experience.title}</h3>
                        <p>{learning_resources.personal_experience.description}</p>
                    </div>
                    
                    <div className="tips-grid">
                        {learning_resources.personal_experience.tips.map((tip, index) => {
                            const IconComponent = {
                                FaYoutube,
                                FaUsers,
                                FaCode,
                                FaHeart
                            }[tip.icon] || FaBook;

                            return (
                                <div
                                    key={index}
                                    className={`tip-card ${
                                        expandedTip === index ? 'expanded' : ''
                                    }`}
                                    onClick={() => setExpandedTip(
                                        expandedTip === index ? null : index
                                    )}
                                >
                                    <div className="tip-icon">
                                        <IconComponent />
                                    </div>
                                    <div className="tip-content">
                                        <h4>{tip.title}</h4>
                                        <p>{tip.description}</p>
                                    </div>
                                    <div className="tip-expand">
                                        <FaChevronRight />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="learning_resources-cta">
                    <button className="btn btn-primary">
                        {learning_resources.cta.primary}
                    </button>
                    <button className="btn btn-secondary">
                        {learning_resources.cta.secondary}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LearningResources;