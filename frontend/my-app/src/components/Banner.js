import React, { useEffect, useState } from 'react';

function Banner({ visible, description, link, timer }) {
    const [timeLeft, setTimeLeft] = useState(timer);

    useEffect(() => {
        console.log("Banner Visible:", visible);
        console.log("Banner Timer:", timer);
        console.log("Banner Time Left:", timeLeft);

        if (!visible) {
            console.log("Banner is not visible");
            return;
        }

        // Reset timeLeft whenever the timer prop changes
        setTimeLeft(timer);

        const countdown = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    console.log("Timer reached 0, clearing interval");
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

    // Additional Debugging
    console.log("Rendering Banner. Visible:", visible, " Time Left:", timeLeft);

    if (!visible || timeLeft === 0) return null;

    return (
        <div style={{ backgroundColor: '#f8d7da', padding: '30px', textAlign: 'center' }}>
            <h1>Banner</h1>
            <h2>{description}</h2>
            <p>Time left: {timeLeft} seconds</p>
            {link && <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>}
        </div>
    );
}

export default Banner;
