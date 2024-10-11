import React from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import DraggableElement from './DraggableElement.tsx';
import ModernButton from './ModernButton.tsx';

const ButtonContainer = ({ isRunning, countdownMode, startStop, reset, setCountdownMode }) => {
  return (
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
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
};

export default ButtonContainer;
