import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { useAppContext } from './context/app_context';
import Loading from './components/loading';
import Navbar from './components/navbar';
import Home from './pages/home';
import GameDev from './pages/game_dev';
import IotHardware from './pages/iot_hardware';
import ContactMe from './components/contact_me';

function App() {
    const { showContact, setShowContact } = useAppContext();

    return (
        <>
            <ContactMe 
                isOpen={showContact} 
                onClose={() => setShowContact(false)} 
            />
            
            <Navbar />
            <Loading />

           <div className='web'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} /> {/* Add route for /home */}
                    <Route path="/game-dev" element={<GameDev />} />
                    <Route path="/iot-hardware" element={<IotHardware />} />
                </Routes>
            </div>
        </>
    )
}

export default App