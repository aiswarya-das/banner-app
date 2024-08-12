import React, { useEffect, useState } from 'react';
import './Banner.css'; 
function Banner({ visible, description, link, timer }) {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    // console.log("Banner Visible:", visible);
    // console.log("Banner Timer:", timer);

    if (!visible || timer <= 0) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(timer);

    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      console.log("Clearing interval");
      clearInterval(countdown);
    };
  }, [visible, timer]); 

  console.log("Rendering Banner. Visible:", visible, " Time Left:", timeLeft);

  if (!visible || timeLeft === 0) return null;

  return (
    <div className="banner-container">
      <div className="banner-content">
        <h1 className="banner-title">Special Offer</h1>
        <p className="banner-description">{description}</p>
        <p className="banner-timer">Time left: {timeLeft} seconds</p>
        {link && <a href={link} className="banner-link" target="_blank" rel="noopener noreferrer">Learn More</a>}
      </div>
    </div>
  );
}

export default Banner;
