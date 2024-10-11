import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import Confetti from 'react-confetti';
import ModalComponent from './Modal.tsx';
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownMode, setCountdownMode] = useState(false);
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      if (countdownMode) {
        const totalTime = (Number(hours) * 3600000) + (Number(minutes) * 60000) + (Number(seconds) * 1000);
        intervalRef.current = setInterval(() => {
          setTime((prev) => {
            if (prev <= 0) {
              clearInterval(intervalRef.current);
              triggerConfetti(); // Trigger confetti when countdown ends
              return 0;
            }
            return prev - 10;
          });
        }, 10);
        setTime(totalTime);
      } else {
        intervalRef.current = setInterval(() => {
          setTime(Date.now() - startTime);
        }, 10);
      }
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const handleInputChange = (setFunc) => (e) => {
    const value = e.target.value;
    setFunc(value === '' ? '0' : value);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setConfettiOpacity(1);
    setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setConfettiOpacity((prev) => {
          if (prev <= 0) {
            clearInterval(fadeInterval);
            setShowConfetti(false);
            return 0;
          }
          return prev - 0.05;
        });
      }, 100);
    }, 5000);
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
        {showConfetti && <Confetti style={{ opacity: confettiOpacity }} />}
        <div style={styles.timeDisplay}>
        <DraggableElement>
          <h1 style={styles.timer}>{formatTime()}</h1>
        </DraggableElement>
        </div>
        {countdownMode && (
          <div style={styles.inputContainer}>
            <input
              type="number"
              value={hours}
              onChange={handleInputChange(setHours)}
              placeholder="Saat"
              style={styles.input}
              min="0"
            />
            <input
              type="number"
              value={minutes}
              onChange={handleInputChange(setMinutes)}
              placeholder="Dakika"
              style={styles.input}
              min="0"
            />
            <input
              type="number"
              value={seconds}
              onChange={handleInputChange(setSeconds)}
              placeholder="Saniye"
              style={styles.input}
              min="0"
            />
          </div>
        )}
        <div style={styles.buttonContainer}>
          <DraggableElement>
            <ModernButton onClick={startStop}>
              {isRunning ? <FaPause /> : <FaPlay />}
              {isRunning ? " Durdur" : " Başlat"}
            </ModernButton>
          </DraggableElement>
          <DraggableElement>
            <ModernButton onClick={reset}>
              <FaStop /> Sıfırla
            </ModernButton>
          </DraggableElement>
          <DraggableElement>
            <ModernButton onClick={() => setCountdownMode(!countdownMode)}>
              {countdownMode ? "Stopwatch Modu" : "Geri Sayım Modu"}
            </ModernButton>
          </DraggableElement>
        </div>
        <ModalComponent/>
        <MouseCircle /> {/* Render the MouseCircle */}
      </div>
    </>
  );
};

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
      onMouseDown={() => setDragging(true)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: 'grab',
      }}
    >
      {children}
    </div>
  );
};

// MouseCircle component
const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
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
  timeDisplay:{
    zIndex: 3, // Set z-index to a high value

  },
  timer: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#c5d1ed',
    fontFamily: 'Arial, sans-serif',
    zIndex: 3, // Set z-index to a high value
  },
  inputContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    zIndex: 2, // Set z-index to a high value
  },
  input: {
    padding: '14px',
    fontSize: '18px',
    borderRadius: '666px',
    border: '1px solid #c5d1ed',
    width: '40px',
    textAlign: 'center',
    zIndex: 2, // Set z-index to a high value
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    zIndex: 2, // Set z-index to a high value
  },
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
    zIndex: 2, // Set z-index to a high value
  },
  buttonHover: {
    backgroundColor: '#94a3b8',
  },
};

export default Stopwatch;
