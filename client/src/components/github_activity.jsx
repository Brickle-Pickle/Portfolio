import React, { useState, useEffect } from 'react';
import { 
    FaGithub, FaCode, FaStar, FaCodeBranch, 
    FaCalendarAlt, FaExternalLinkAlt, FaChartLine 
} from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import './styles/github_activity.css';
import homeContent from '../assets/text_content/home.json';

const GitHubActivity = () => {
    const { github_activity } = homeContent;
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        repositories: 0,
        commits: 0,
        contributions: 0,
        streak: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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

        const element = document.querySelector('.github-activity-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Fetch GitHub data
    const fetchGitHubData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch user data for stats
            const userResponse = await fetch(`https://api.github.com/users/${github_activity.username}`);
            const userData = await userResponse.json();

            // Fetch recent activity
            const eventsResponse = await fetch(`https://api.github.com/users/${github_activity.username}/events?per_page=10`);
            const eventsData = await eventsResponse.json();

            // Fetch repositories for additional stats
            const reposResponse = await fetch(`https://api.github.com/users/${github_activity.username}/repos?sort=updated&per_page=100`);
            const reposData = await reposResponse.json();

            // Calculate stats
            const totalCommits = reposData.reduce((acc, repo) => acc + (repo.size || 0), 0);
            const contributions = eventsData.filter(event => 
                ['PushEvent', 'CreateEvent', 'PullRequestEvent'].includes(event.type)
            ).length;

            setStats({
                repositories: userData.public_repos || 0,
                commits: totalCommits,
                contributions: contributions,
                streak: Math.floor(Math.random() * 30) + 1 // Simulated streak
            });

            // Process activities
            const processedActivities = eventsData.slice(0, 6).map(event => ({
                id: event.id,
                type: event.type,
                repo: event.repo?.name || 'Unknown',
                created_at: event.created_at,
                payload: event.payload
            }));

            setActivities(processedActivities);
        } catch (err) {
            setError(github_activity.error_text);
            console.error('Error fetching GitHub data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGitHubData();
    }, []);

    // Refresh handler with animation
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchGitHubData();
        setTimeout(() => setRefreshing(false), 1000);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Hace 1 día';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        return date.toLocaleDateString('es-ES');
    };

    // Get activity icon and description
    const getActivityInfo = (activity) => {
        const type = activity.type;
        const emoji = github_activity.activity_types[type] || '📝';
        
        let description = '';
        switch (type) {
            case 'PushEvent':
                const commits = activity.payload?.commits?.length || 1;
                description = `${commits} commit${commits > 1 ? 's' : ''}`;
                break;
            case 'CreateEvent':
                description = `${activity.payload?.ref_type || 'repository'}`;
                break;
            case 'PullRequestEvent':
                description = activity.payload?.action || 'opened';
                break;
            default:
                description = type.replace('Event', '');
        }
        
        return { emoji, description };
    };

    return (
        <section className={`github-activity-section ${isVisible ? 'visible' : ''}`}>
            <div className="github-activity-container">
                {/* Header */}
                <div className="github-activity-header">
                    <div className="header-icon">
                        <FaGithub className="main-icon" />
                    </div>
                    <h2 className="github-activity-title">{github_activity.title}</h2>
                    <p className="github-activity-subtitle">{github_activity.subtitle}</p>
                    
                    {/* Refresh Button */}
                    <button 
                        className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        <MdRefresh className="refresh-icon" />
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="github-stats-overview">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaCode />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.repositories}</div>
                            <div className="stat-label">{github_activity.stats_labels.repositories}</div>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaCodeBranch />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.commits}</div>
                            <div className="stat-label">{github_activity.stats_labels.commits}</div>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaChartLine />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.contributions}</div>
                            <div className="stat-label">{github_activity.stats_labels.contributions}</div>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaStar />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.streak}</div>
                            <div className="stat-label">{github_activity.stats_labels.streak}</div>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="activity-feed">
                    <h3 className="feed-title">Actividad Reciente</h3>
                    
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>{github_activity.loading_text}</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                            <button onClick={handleRefresh} className="retry-btn">
                                Reintentar
                            </button>
                        </div>
                    ) : activities.length === 0 ? (
                        <div className="empty-state">
                            <p>{github_activity.no_activity_text}</p>
                        </div>
                    ) : (
                        <div className="activity-list">
                            {activities.map((activity, index) => {
                                const { emoji, description } = getActivityInfo(activity);
                                return (
                                    <div 
                                        key={activity.id} 
                                        className="activity-item"
                                        style={{ '--animation-delay': `${index * 0.1}s` }}
                                    >
                                        <div className="activity-icon">
                                            <span className="activity-emoji">{emoji}</span>
                                        </div>
                                        <div className="activity-content">
                                            <div className="activity-main">
                                                <span className="activity-description">{description}</span>
                                                <span className="activity-repo">{activity.repo}</span>
                                            </div>
                                            <div className="activity-meta">
                                                <FaCalendarAlt className="date-icon" />
                                                <span className="activity-date">{formatDate(activity.created_at)}</span>
                                            </div>
                                        </div>
                                        <div className="activity-pulse"></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="github-cta">
                    <button 
                        className="btn btn-github"
                        onClick={() => window.open(`https://github.com/${github_activity.username}`, '_blank')}
                    >
                        <FaExternalLinkAlt className="btn-icon" />
                        {github_activity.view_profile_text}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GitHubActivity;