import React from 'react';

interface TimeDisplayProps {
  time: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
  const formatTime = () => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return <h1 style={{ fontSize: '48px', color: '#c5d1ed' }}>{formatTime()}</h1>;
};

export default TimeDisplay;
