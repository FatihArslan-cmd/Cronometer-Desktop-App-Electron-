import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownMode, setCountdownMode] = useState(false); // Geri sayım modunu kontrol et
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
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
      if (countdownMode) {
        // Geri sayım modunda başlat
        const totalTime = (Number(hours) * 3600000) + (Number(minutes) * 60000) + (Number(seconds) * 1000);
        intervalRef.current = setInterval(() => {
          setTime((prev) => {
            if (prev <= 0) {
              clearInterval(intervalRef.current);
              return 0;
            }
            return prev - 10;
          });
        }, 10);
        setTime(totalTime);
      } else {
        // Normal sayacı başlat
        intervalRef.current = setInterval(() => {
          setTime(Date.now() - startTime);
        }, 10);
      }
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
    const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  // Input alanındaki değişiklikleri yönet
  const handleInputChange = (setFunc) => (e) => {
    const value = e.target.value;
    setFunc(value === '' ? '0' : value); // Boş input '0' kabul edilsin
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
        
        {countdownMode && ( // Sadece geri sayım modunda inputları göster
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
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '18px',
    borderRadius: '8px',
    border: '1px solid #c5d1ed',
    width: '80px',
    textAlign: 'center',
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
