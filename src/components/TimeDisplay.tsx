import React from 'react';
import DraggableElement from './DraggableElement.tsx';

const TimeDisplay = ({ time }) => {
  const formatTime = () => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div style={{ zIndex:5 }}>

    <DraggableElement>

      <h1 style={styles.timer}>{formatTime()}</h1>
    </DraggableElement>
    </div>

  );
};

const styles = {
  timer: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#c5d1ed',
    fontFamily: 'Arial, sans-serif',
    zIndex: 2, // Set z-index to a high value

  },
};

export default TimeDisplay;
