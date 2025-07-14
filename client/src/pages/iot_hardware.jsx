import { useEffect } from 'react';
import ComingSoon from '../components/coming_soon';

function IotHardware() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <ComingSoon />
    );
}   

export default IotHardware;