import React, { useState } from 'react';

const ModernButton = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ zIndex:5 }}>
    <button
      onClick={onClick}
      style={{
        ...styles.button,
        ...(hover ? styles.buttonHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
    </div>
  );
};

const styles = {
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#c5d1ed',
    color: '#0f172a',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 2,
  },
  buttonHover: {
    backgroundColor: '#94a3b8',
  },
};

export default ModernButton;
