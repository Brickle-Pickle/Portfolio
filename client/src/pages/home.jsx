import React, { useEffect } from 'react'
import { useAppContext } from '../context/app_context';
import Hero from '../components/hero';
import Counter from '../components/counter';
import QuickStats from '../components/quick_stats';
import FeaturedProjects from '../components/featured_projects';
import DownloadCV from '../components/download_cv';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Hero />
            <QuickStats />
            <FeaturedProjects />
            <Counter />
            <DownloadCV />
        </>
    )
}

export default Home;