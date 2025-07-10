import React from 'react';
import { FaGithub, FaGamepad, FaCode, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiUnity } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import './styles/hero.css';
import heroContent from '../assets/text_content/home.json';
import links from '../assets/text_content/links.json';

const Hero = () => {
    const { hero } = heroContent;

    return (
        <section className="hero">
            {/* Background grid pattern */}
            <div className="hero-grid"></div>
            
            <div className="hero-container">
                {/* Main content */}
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="hero-greeting">{hero.greeting}</p>
                        <h1 className="hero-name">
                            {hero.name}
                            <span className="hero-brand">{hero.brand}</span>
                        </h1>
                        <h2 className="hero-title">{hero.title}</h2>
                        
                        <div className="hero-location">
                            <FaMapMarkerAlt className="location-icon" />
                            <span>{hero.location}</span>
                        </div>
                        
                        <p className="hero-description">{hero.description}</p>
                        
                        {/* Tech highlights */}
                        <div className="hero-highlights">
                            <div className="highlight-item">
                                <SiReact className="tech-icon" />
                                <span>React & Node.js</span>
                            </div>
                            <div className="highlight-item">
                                <FaGamepad className="tech-icon" />
                                <span>Game Development</span>
                            </div>
                            <div className="highlight-item">
                                <TbBrandCSharp className="tech-icon" />
                                <span>C# & Unity</span>
                            </div>
                            <div className="highlight-item">
                                <FaCode className="tech-icon" />
                                <span>IoT & Hardware</span>
                            </div>
                        </div>
                        
                        {/* Status badge */}
                        <div className="hero-status">
                            <div className="status-indicator"></div>
                            <span>{hero.status}</span>
                        </div>
                        
                        {/* CTA buttons */}
                        <div className="hero-cta">
                            <button className="btn btn-primary">
                                <FaRocket className="btn-icon" />
                                {hero.cta.primary}
                            </button>
                            <button className="btn btn-secondary"
                                onClick={() => {
                                    window.open(links.github, '_blank');
                                }}
                            >
                                <FaGithub className="btn-icon" />
                                {hero.cta.secondary}
                            </button>
                        </div>
                    </div>
                    
                    {/* Visual element */}
                    <div className="hero-visual">
                        <div className="visual-container">
                            <div className="floating-element element-1">
                                <SiReact className="floating-icon" />
                            </div>
                            <div className="floating-element element-2">
                                <SiNodedotjs className="floating-icon" />
                            </div>
                            <div className="floating-element element-3">
                                <SiUnity className="floating-icon" />
                            </div>
                            <div className="floating-element element-4">
                                <FaGamepad className="floating-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Scroll indicator */}
                <div className="scroll-indicator not-responsive">
                    <div className="scroll-line"></div>
                    <span className="scroll-text">Scroll</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;