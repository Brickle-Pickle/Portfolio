import React from 'react'
import { useAppContext } from '../context/app_context';
import Hero from '../components/hero';
import Counter from '../components/counter';
import QuickStats from '../components/quick_stats';
import FeaturedProjects from '../components/featured_projects';

const Home = () => {
    return (
        <>
            <Hero />
            <QuickStats />
            <FeaturedProjects />
            <Counter />
        </>
    )
}

export default Home;