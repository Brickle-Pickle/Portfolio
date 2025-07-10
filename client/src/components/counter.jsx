import React, { useState, useEffect } from 'react';
import { FaCode, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import './styles/counter.css';
import home from '../assets/text_content/home.json';

const Counter = () => {
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [totalDays, setTotalDays] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    // Parse start date from JSON (20/09/2020)
    const startDate = new Date('2020-09-20T00:00:00');

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const diff = now - startDate;

            // Calculate total days and hours for stats
            const totalDaysCalc = Math.floor(diff / (1000 * 60 * 60 * 24));
            const totalHoursCalc = Math.floor(diff / (1000 * 60 * 60));
            
            setTotalDays(totalDaysCalc);
            setTotalHours(totalHoursCalc);

            // Calculate detailed time breakdown
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeElapsed({
                years,
                months,
                days,
                hours,
                minutes,
                seconds
            });
        };

        // Calculate immediately
        calculateTime();

        // Update every second
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    const formatLargeNumber = (num) => {
        return num.toLocaleString('es-ES');
    };

    return (
        <section className="counter-section">
            <div className="counter-container">
                {/* Header */}
                <div className="counter-header">
                    <div className="counter-icon">
                        <FaCode className="header-icon" />
                    </div>
                    <h2 className="counter-title">Tiempo Programando</h2>
                    <p className="counter-subtitle">
                        Desde el 20 de Septiembre de 2020
                    </p>
                </div>

                {/* Main Counter Display */}
                <div className="counter-display">
                    <div className="time-grid">
                        <div className="time-unit">
                            <div className="time-number">{formatNumber(timeElapsed.years)}</div>
                            <div className="time-label">Años</div>
                        </div>
                        <div className="time-separator">:</div>
                        
                        <div className="time-unit">
                            <div className="time-number">{formatNumber(timeElapsed.months)}</div>
                            <div className="time-label">Meses</div>
                        </div>
                        <div className="time-separator">:</div>
                        
                        <div className="time-unit">
                            <div className="time-number">{formatNumber(timeElapsed.days)}</div>
                            <div className="time-label">Días</div>
                        </div>
                    </div>

                    <div className="time-grid secondary">
                        <div className="time-unit small">
                            <div className="time-number">{formatNumber(timeElapsed.hours)}</div>
                            <div className="time-label">Horas</div>
                        </div>
                        <div className="time-separator small">:</div>
                        
                        <div className="time-unit small">
                            <div className="time-number">{formatNumber(timeElapsed.minutes)}</div>
                            <div className="time-label">Minutos</div>
                        </div>
                        <div className="time-separator small">:</div>
                        
                        <div className="time-unit small">
                            <div className="time-number">{formatNumber(timeElapsed.seconds)}</div>
                            <div className="time-label">Segundos</div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="counter-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaCalendarAlt />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{formatLargeNumber(totalDays)}</div>
                            <div className="stat-label">Días totales</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <MdTimer />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{formatLargeNumber(totalHours)}</div>
                            <div className="stat-label">Horas totales</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaClock />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{timeElapsed.years}+</div>
                            <div className="stat-label">Años de experiencia</div>
                        </div>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="counter-progress">
                    <div className="progress-text">
                        <span>Creciendo cada segundo...</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Counter;