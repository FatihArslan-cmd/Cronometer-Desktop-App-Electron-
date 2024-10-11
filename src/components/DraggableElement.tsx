import React, { useState, useEffect,FC,ReactNode } from 'react';

interface DraggableElementProps {
    children: ReactNode;
  }
  
  const DraggableElement: FC<DraggableElementProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setPosition((prev) => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY,
        }));
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      onMouseDown={() => setDragging(true)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: 'grab',
        zIndex:5
      }}
    >
      {children}
    </div>
  );
};

export default DraggableElement;
