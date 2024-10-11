import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState('stopwatch'); // Sayaç seçimi
  const intervalRef = useRef(null);
  const countdownRef = useRef(null);

  // Scroll engelleme ve geri açma
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  // Başlatma ve durdurma işlevi (Stopwatch)
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

  // Sıfırlama işlevi (Stopwatch)
  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  // Süreyi formatla (Stopwatch)
  const formatTime = () => {
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // Geri sayımı başlatma
  const startCountdown = () => {
    if (countdownTime > 0 && !countdownRunning) {
      countdownRef.current = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(countdownRef.current);
            setCountdownRunning(false);
            return 0;
          }
        });
      }, 1000);
      setCountdownRunning(true);
    }
  };

  // Modal aç/kapa
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Modal sayı girdisini al
  const handleInputChange = (e) => {
    setCountdownTime(parseInt(e.target.value) || 0);
  };

  // Sayaç değiştirme işlevi
  const switchTimer = (timer) => {
    setSelectedTimer(timer);
    reset(); // Kronometre sıfırlanır
    setCountdownTime(0); // Geri sayım sıfırlanır
    clearInterval(countdownRef.current);
    setCountdownRunning(false);
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
        {/* Sayaç Seçimi */}
        <div style={styles.switchContainer}>
          <ModernButton onClick={() => switchTimer('stopwatch')}>
            Kronometre
          </ModernButton>
          <ModernButton onClick={() => switchTimer('countdown')}>
            Geri Sayım
          </ModernButton>
        </div>

        {/* Stopwatch veya Countdown */}
        {selectedTimer === 'stopwatch' ? (
          <DraggableElement>
            <h1 style={styles.timer}>{formatTime()}</h1>
          </DraggableElement>
        ) : (
          <DraggableElement>
            <h1 style={styles.timer}>
              Geri Sayım: {countdownTime} saniye
            </h1>
          </DraggableElement>
        )}

        {/* Butonlar */}
        <div style={styles.buttonContainer}>
          <DraggableElement>
            {selectedTimer === 'stopwatch' ? (
              <ModernButton onClick={startStop}>
                {isRunning ? <FaPause /> : <FaPlay />}
                {isRunning ? " Durdur" : " Başlat"}
              </ModernButton>
            ) : (
              <ModernButton onClick={toggleModal}>
                Geri Sayım Ayarla
              </ModernButton>
            )}
          </DraggableElement>
          <DraggableElement>
            <ModernButton onClick={reset}>
              <FaStop /> Sıfırla
            </ModernButton>
          </DraggableElement>
        </div>
      </div>

      {/* Geri Sayım Modalı */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBackdrop} />
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Süre Girin (saniye)</h2>
            <input
              type="number"
              min="0"
              style={styles.input}
              onChange={handleInputChange}
            />
            <ModernButton onClick={() => {
              toggleModal();
              startCountdown();
            }}>
              Tamam
            </ModernButton>
          </div>
        </div>
      )}
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
  switchContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
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
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(10px)', // Arka planı bulanıklaştırır
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Hafif siyah arka plan
  },
  modalContent: {
    position: 'relative',
    zIndex: 1001,
    backgroundColor: '#fff',
    padding: '5px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)', // Modern bir gölge ekler
    animation: 'fadeIn 0.3s ease-in-out', // Yumuşak bir fade-in animasyonu
  },
  modalTitle: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#0f172a',
  },
  input: {
    fontSize: '18px',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '80%',
  },
};


export default Stopwatch;
