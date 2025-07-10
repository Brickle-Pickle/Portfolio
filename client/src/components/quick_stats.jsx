import React, { useState, useEffect } from 'react';
import { 
    FaCode, FaServer, FaMobile, FaGamepad, FaDatabase, 
    FaMicrochip, FaTools, FaChartLine, FaRocket, FaJava,
} from 'react-icons/fa';
import { 
    SiJavascript, SiReact, SiHtml5, SiCss3, SiTailwindcss, 
    SiVite, SiNodedotjs, SiExpress, SiPython, SiKotlin, 
    SiUnity, SiLua, SiC, SiMysql, SiMariadb, SiMongodb, 
    SiMicropython, SiArduino, SiRaspberrypi, SiGit 
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import './styles/quick_stats.css';
import homeContent from '../assets/text_content/home.json';

// Icon mapping for dynamic rendering
const iconMap = {
    FaCode, FaServer, FaMobile, FaGamepad, FaDatabase, FaMicrochip, FaTools,
    SiJavascript, SiReact, SiHtml5, SiCss3, SiTailwindcss, SiVite,
    SiNodedotjs, SiExpress, SiPython, SiKotlin, SiUnity, SiLua, SiC,
    SiMysql, SiMariadb, SiMongodb, SiMicropython, SiArduino, 
    SiRaspberrypi, FaJava, SiGit, TbBrandCSharp
};

const QuickStats = () => {
    const { quick_stats } = homeContent;
    const [activeCategory, setActiveCategory] = useState('frontend');
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredTech, setHoveredTech] = useState(null);

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

        const element = document.querySelector('.quick-stats-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Auto-rotate categories
    useEffect(() => {
        const categories = Object.keys(quick_stats.categories);
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % categories.length;
            setActiveCategory(categories[currentIndex]);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [quick_stats.categories]);

    const renderIcon = (iconName, className = '') => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    };

    const currentCategory = quick_stats.categories[activeCategory];

    return (
        <section className={`quick-stats-section ${isVisible ? 'visible' : ''}`}>
            <div className="quick-stats-container">
                {/* Header */}
                <div className="quick-stats-header">
                    <div className="header-icon">
                        <FaChartLine className="main-icon" />
                    </div>
                    <h2 className="quick-stats-title">{quick_stats.title}</h2>
                    <p className="quick-stats-subtitle">{quick_stats.subtitle}</p>
                </div>

                {/* Stats Overview */}
                <div className="stats-overview">
                    <div className="stat-item">
                        <div className="stat-number">{quick_stats.stats.projects}</div>
                        <div className="stat-label">Proyectos</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">{quick_stats.stats.technologies}</div>
                        <div className="stat-label">Tecnologías</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">{quick_stats.stats.experience}</div>
                        <div className="stat-label">Experiencia</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">{quick_stats.stats.commits}</div>
                        <div className="stat-label">Commits</div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {Object.entries(quick_stats.categories).map(([key, category]) => (
                        <button
                            key={key}
                            className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                            onClick={() => setActiveCategory(key)}
                            style={{
                                '--category-color': category.color
                            }}
                        >
                            {renderIcon(category.icon, 'tab-icon')}
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Technologies Display */}
                <div className="technologies-display">
                    <div className="category-header">
                        <div 
                            className="category-icon"
                            style={{ '--category-color': currentCategory.color }}
                        >
                            {renderIcon(currentCategory.icon)}
                        </div>
                        <h3 className="category-name">{currentCategory.name}</h3>
                    </div>

                    <div className="technologies-grid">
                        {currentCategory.technologies.map((tech, index) => (
                            <div
                                key={tech.name}
                                className={`tech-card ${hoveredTech === tech.name ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredTech(tech.name)}
                                onMouseLeave={() => setHoveredTech(null)}
                                style={{
                                    '--animation-delay': `${index * 0.1}s`,
                                    '--tech-color': currentCategory.color
                                }}
                            >
                                <div className="tech-icon">
                                    {renderIcon(tech.icon)}
                                </div>
                                <div className="tech-info">
                                    <div className="tech-name">{tech.name}</div>
                                    <div className="tech-level">
                                        <div className="level-bar">
                                            <div 
                                                className="level-fill"
                                                style={{ width: `${tech.level}%` }}
                                            ></div>
                                        </div>
                                        <span className="level-text">{tech.level}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Element */}
                <div className="interactive-element">
                    <div className="rocket-container">
                        <FaRocket className="rocket-icon" />
                        <div className="rocket-trail"></div>
                    </div>
                    <p className="interactive-text">
                        Siempre aprendiendo nuevas tecnologías
                    </p>
                </div>
            </div>
        </section>
    );
};

export default QuickStats;