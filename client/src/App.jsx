import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { useAppContext } from './context/app_context';
import Loading from './components/loading';
import Home from './pages/home';

function App() {
    return (
        <>
            <Loading />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} /> {/* Add route for /home */}
            </Routes>
        </>
    )
}

export default App