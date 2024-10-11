import React, { useState, useEffect, } from 'react';

const MouseCircle = () => {
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
      position: 'fixed',
      top: position.y - 376,
      left: position.x - 376,
      width: '777px',
      height: '777px',
      borderRadius: '50%',
      backgroundImage: 'radial-gradient(circle, #111f43 0%, #0f172a 66%)',
      pointerEvents: 'none', // This ensures the circle doesn't block clicks
      zIndex: 1, // Set z-index to a high value
    }}
  />
  );
};

export default MouseCircle;
