import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Geçen süreyi tutar
  const [isRunning, setIsRunning] = useState(false); // Kronometre çalışıyor mu?
  const intervalRef = useRef(null); // setInterval referansı

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
    <div style={styles.container}>
      <h1 style={styles.timer}>{formatTime()}</h1>
      <div style={styles.buttonContainer}>
        <button onClick={startStop} style={styles.button}>
          {isRunning ? "Durdur" : "Başlat"}
        </button>
        <button onClick={reset} style={styles.button}>Sıfırla</button>
      </div>
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
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  timer: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default Stopwatch;
