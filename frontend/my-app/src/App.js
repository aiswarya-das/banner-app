import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';

function App() {
    const [bannerSettings, setBannerSettings] = useState({
        description: '',
        visible: false,
        timer: 0,
        link: ''
    });

    const fetchBannerSettings = () => {
        axios.get('http://localhost:5001/api/banner')
            .then(response => {
                const settings = response.data;
                settings.visible = !!settings.visible; 
                setBannerSettings(settings);
            })
            .catch(error => console.error('Error fetching banner settings:', error));
    };

    useEffect(() => {
        fetchBannerSettings();
    }, []);

    return (
        <div>
            <Banner 
                visible={bannerSettings.visible}
                description={bannerSettings.description}
                link={bannerSettings.link}
                timer={bannerSettings.timer}
            />
            <Dashboard onUpdate={fetchBannerSettings} />
        </div>
    );
}

export default App;
