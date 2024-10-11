import React, { useState, useEffect } from 'react';

const MouseCircle: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y - 50,
        left: position.x - 50,
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 204, 255, 0.3)',
        pointerEvents: 'none',
        transition: 'top 0.1s, left 0.1s',
      }}
    />
  );
};

export default MouseCircle;
