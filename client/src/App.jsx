import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { useAppContext } from './context/app_context';
import Loading from './components/loading';
import Navbar from './components/navbar';
import Home from './pages/home';
import GameDev from './pages/game_dev';

function App() {
    return (
        <>
            <Navbar />
            <Loading />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} /> {/* Add route for /home */}
                <Route path="/game-dev" element={<GameDev />} />
            </Routes>
        </>
    )
}

export default App