import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Scroll engelleme ve geri açma
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  // Başlatma ve durdurma işlevi
  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  // Sıfırlama işlevi
  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  // Süreyi formatla
  const formatTime = () => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}</style>
      <div style={styles.container}>
        <DraggableElement>
          <h1 style={styles.timer}>{formatTime()}</h1>
        </DraggableElement>
        <div style={styles.buttonContainer}>
          <DraggableElement>
            <ModernButton onClick={startStop}>
              {isRunning ? "Durdur" : "Başlat"}
            </ModernButton>
          </DraggableElement>
          <DraggableElement>
            <ModernButton onClick={reset}>
              Sıfırla
            </ModernButton>
          </DraggableElement>
        </div>
      </div>
    </>
  );
};

// Modern Buton bileşeni
const ModernButton = ({ onClick, children }) => {
  const [hover, setHover] = useState(false);

  return (
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
  );
};

// Draggable bileşeni
const DraggableElement = ({ children }) => {
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
      onMouseDown={() => setDragging(true)} // Sürükleme başlat
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`, // Konumu uygula
        cursor: 'grab',
      }}
    >
      {children}
    </div>
  );
};

// Basit stiller
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    height: '100vh',
    width: '100vw', 
  },
  timer: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#c5d1ed',
    fontFamily: 'Arial, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#c5d1ed',
    color: '#0f172a',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    fontFamily: 'open-sans, sans-serif',
    position: 'relative',
  },
  buttonHover: {
    color:'#c5d1ed',
    backgroundColor: '#2563eb',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
  },
};

export default Stopwatch;
