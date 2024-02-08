import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetTime = moment('2024-02-10T12:00:00');
    
    const updateCountdown = () => {
        const currentTime = moment();
        const remainingTime = moment.duration(targetTime.diff(currentTime));
      
        const hours = Math.floor(remainingTime.asHours());
        const minutes = remainingTime.minutes();
        const seconds = remainingTime.seconds();
      
        const countdownString = `${hours}:${minutes}:${seconds}`;
        setCountdown(countdownString);
      };

    const interval = setInterval(updateCountdown, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);

  }, []);

  return (
    <div className='absolute top-[30vh] left-0 w-dvw'>
      <h1 className="text-5xl my-6 text-center font-r text-gray-400">
        Launch In
      </h1>
      <p className="text-6xl text-purple-400 text-center">{countdown}</p>
    </div>
  );
};

export default CountdownTimer;