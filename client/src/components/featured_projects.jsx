import React, { useState, useEffect } from 'react';
import { 
    FaExternalLinkAlt, FaGithub, FaCode, FaGamepad, 
    FaBuilding, FaRocket, FaEye, FaStar, FaArrowRight 
} from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiUnity, SiExpress } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import './styles/featured_projects.css';
import homeContent from '../assets/text_content/home.json';

// Icon mapping for technologies
const techIconMap = {
    'React': SiReact,
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'MongoDB': SiMongodb,
    'C#': TbBrandCSharp,
    'Unity': SiUnity,
    'SQL': FaCode,
    'Game Design': FaGamepad,
    'Pixel Art': FaStar
};

// Category icons
const categoryIconMap = {
    'Full-Stack': FaCode,
    'Game Development': FaGamepad,
    'Enterprise': FaBuilding
};

const FeaturedProjects = () => {
    const { featured_projects } = homeContent;
    const [activeProject, setActiveProject] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredProject, setHoveredProject] = useState(null);

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

        const element = document.querySelector('.featured-projects-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Auto-rotate featured projects
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveProject((prev) => 
                (prev + 1) % featured_projects.projects.length
            );
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [featured_projects.projects.length]);

    const renderTechIcon = (techName) => {
        const IconComponent = techIconMap[techName];
        return IconComponent ? <IconComponent /> : <FaCode />;
    };

    const renderCategoryIcon = (category) => {
        const IconComponent = categoryIconMap[category];
        return IconComponent ? <IconComponent /> : <FaCode />;
    };

    const handleProjectClick = (index) => {
        setActiveProject(index);
    };

    const currentProject = featured_projects.projects[activeProject];

    return (
        <section className={`featured-projects-section ${isVisible ? 'visible' : ''}`}>
            <div className="featured-projects-container">
                {/* Header */}
                <div className="featured-projects-header">
                    <div className="header-icon">
                        <FaRocket className="main-icon" />
                    </div>
                    <h2 className="featured-projects-title">{featured_projects.title}</h2>
                    <p className="featured-projects-subtitle">{featured_projects.subtitle}</p>
                </div>

                {/* Main Project Display */}
                <div className="main-project-display">
                    <div className="project-showcase">
                        {/* Project Image/Preview */}
                        <div className="project-preview">
                            <div className="project-image">
                                {/* Replace placeholder with actual website preview */}
                                <div className="website-preview">
                                    <iframe 
                                        src={currentProject.url}
                                        title={`Preview of ${currentProject.title}`}
                                        className="project-iframe"
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin"
                                    />
                                    {/* Fallback overlay for interaction */}
                                    <div className="iframe-overlay" onClick={() => window.open(currentProject.url, '_blank')}>
                                        <div className="overlay-message">
                                            <FaExternalLinkAlt />
                                            <span>Hacer clic para abrir</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-overlay">
                                    <div className="overlay-content">
                                        <button 
                                            className="preview-btn"
                                            onClick={() => window.open(currentProject.url, '_blank')}
                                        >
                                            <FaEye /> Vista Previa
                                        </button>
                                        {currentProject.github && (
                                            <button 
                                                className="github-btn"
                                                onClick={() => window.open(currentProject.github, '_blank')}
                                            >
                                                <FaGithub /> Código
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="project-status">
                                <span className={`status-badge ${currentProject.status.toLowerCase()}`}>
                                    {currentProject.status}
                                </span>
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="project-info">
                            <div className="project-category">
                                {renderCategoryIcon(currentProject.category)}
                                <span>{currentProject.category}</span>
                            </div>
                            
                            <h3 className="project-title">{currentProject.title}</h3>
                            <p className="project-subtitle">{currentProject.subtitle}</p>
                            <p className="project-description">{currentProject.description}</p>

                            {/* Technologies */}
                            <div className="project-technologies">
                                <h4>Tecnologías:</h4>
                                <div className="tech-list">
                                    {currentProject.technologies.map((tech, index) => (
                                        <div key={index} className="tech-item">
                                            {renderTechIcon(tech)}
                                            <span>{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="project-highlights">
                                <h4>Características destacadas:</h4>
                                <ul>
                                    {currentProject.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="project-actions">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => window.open(currentProject.url, '_blank')}
                                >
                                    <FaExternalLinkAlt /> Ver Proyecto
                                </button>
                                {currentProject.github && (
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => window.open(currentProject.github, '_blank')}
                                    >
                                        <FaGithub /> GitHub
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Navigation */}
                <div className="project-navigation">
                    {featured_projects.projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`nav-item ${index === activeProject ? 'active' : ''} ${
                                hoveredProject === index ? 'hovered' : ''
                            }`}
                            onClick={() => handleProjectClick(index)}
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="nav-icon">
                                {renderCategoryIcon(project.category)}
                            </div>
                            <div className="nav-content">
                                <h4>{project.title}</h4>
                                <p>{project.category}</p>
                            </div>
                            <div className="nav-indicator"></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="projects-cta">
                    <button className="btn btn-outline">
                        <FaArrowRight /> {featured_projects.cta.text}
                    </button>
                    <button 
                        className="btn btn-github"
                        onClick={() => window.open('https://github.com/Brickle-Pickle', '_blank')}
                    >
                        <FaGithub /> {featured_projects.cta.github_text}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;