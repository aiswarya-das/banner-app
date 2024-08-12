import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ onUpdate }) {
    const [description, setDescription] = useState('');
    const [visible, setVisible] = useState(true);
    const [timer, setTimer] = useState(30);
    const [link, setLink] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/banner')
            .then(response => {
                const { description, visible, timer, link } = response.data;
                setDescription(description);
                setVisible(!!visible); // Convert to boolean
                setTimer(timer);
                setLink(link);
            })
            .catch(error => console.error('Error fetching banner settings:', error));
    }, []);

    const updateBannerSettings = () => {
        axios.post('http://localhost:5000/api/banner', {
            description,
            visible,
            timer,
            link
        })
        .then(() => {
            alert('Banner settings updated');
            onUpdate(); // Trigger re-fetch of banner settings
        })
        .catch(error => console.error('Error updating banner settings:', error));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <div>
                <label>
                    Banner Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Banner Visibility:
                    <input type="checkbox" checked={visible} onChange={() => setVisible(!visible)} />
                </label>
            </div>
            <div>
                <label>
                    Banner Timer (seconds):
                    <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Banner Link:
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                </label>
            </div>
            <button onClick={updateBannerSettings}>Update Banner</button>
        </div>
    );
}

export default Dashboard;
