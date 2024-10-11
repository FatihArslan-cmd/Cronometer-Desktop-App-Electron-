import React, { useState } from 'react';

interface ModernButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ModernButton: React.FC<ModernButtonProps> = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        fontSize: '18px',
        cursor: 'pointer',
        borderRadius: '25px',
        backgroundColor: hover ? '#94a3b8' : '#c5d1ed',
        color: '#0f172a',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
};

export default ModernButton;
