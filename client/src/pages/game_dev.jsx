import React, { useEffect } from 'react'
import FeaturedGames from '../components/featured_games';
import GamePreview from '../components/game_preview';
import LearningResources from '../components/learning_resources';

const GameDev = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <FeaturedGames />
            <GamePreview />
            <LearningResources />
        </>
    )
}

export default GameDev;