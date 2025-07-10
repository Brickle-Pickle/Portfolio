import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppContext } from './context/app_context';
import Loading from './components/loading';
import Home from './pages/home';

function App() {
    return (
        <>
            <Loading />
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App