import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Geçen süreyi tutar
  const [isRunning, setIsRunning] = useState(false); // Kronometre çalışıyor mu?
  const intervalRef = useRef(null); // setInterval referansı

  // Scroll engelleme ve geri açma
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Scroll'u engelle
    
    return () => {
      document.body.style.overflow = 'auto'; // Bileşen unmount olduğunda geri aç
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
      }, 10); // 10 milisaniyede bir güncelleme
    }
    setIsRunning(!isRunning); // Durum değişimi
  };

  // Sıfırlama işlevi
  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  // Süreyi formatla (dakika:saniye:salise)
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
        <h1 style={styles.timer}>{formatTime()}</h1>
        <div style={styles.buttonContainer}>
          <ModernButton onClick={startStop}>
            {isRunning ? "Durdur" : "Başlat"}
          </ModernButton>
          <ModernButton onClick={reset}>
            Sıfırla
          </ModernButton>
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
    borderRadius: '25px', // Yuvarlatılmış köşeler
    border: 'none',
    backgroundColor: '#c5d1ed', // Buton rengi
    color: '#0f172a', // Yazı rengi değiştirildi
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Gölgeler
    transition: 'all 0.3s ease', // Geçiş animasyonu
    fontFamily: 'open-sans, sans-serif',
  },
  buttonHover: {
    color:'#c5d1ed',
    backgroundColor: '#2563eb', // Hover durumundaki renk
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
  },
};

export default Stopwatch;
