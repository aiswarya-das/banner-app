import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; 

function Dashboard({ onUpdate }) {
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(true);
  const [timer, setTimer] = useState(30);
  const [link, setLink] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/banner')
      .then(response => {
        const { description, visible, timer, link } = response.data;
        setDescription(description || '');
        setVisible(visible || true);
        setTimer(timer || 30);
        setLink(link || '');
      })
      .catch(error => console.error('Error fetching banner settings:', error));
  }, []);

  const updateBannerSettings = () => {
    axios.post('http://localhost:5001/api/banner', {
      description,
      visible,
      timer,
      link
    })
    .then(() => {
      alert('Banner settings updated');
      onUpdate(); 
    })
    .catch(error => console.error('Error updating banner settings:', error));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-field">
        <label className="dashboard-label">
          Banner Description:
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="dashboard-input"
          />
        </label>
      </div>
      <div className="dashboard-field">
        <label className="dashboard-label">
          Banner Visibility:
          <input 
            type="checkbox" 
            checked={visible} 
            onChange={() => setVisible(!visible)} 
            className="dashboard-checkbox"
          />
        </label>
      </div>
      <div className="dashboard-field">
        <label className="dashboard-label">
          Banner Timer (seconds):
          <input 
            type="number" 
            value={timer} 
            onChange={(e) => setTimer(e.target.value)} 
            className="dashboard-input"
          />
        </label>
      </div>
      <div className="dashboard-field">
        <label className="dashboard-label">
          Banner Link:
          <input 
            type="text" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            className="dashboard-input"
          />
        </label>
      </div>
      <button onClick={updateBannerSettings} className="dashboard-button">Update Banner</button>
    </div>
  );
}

export default Dashboard;
