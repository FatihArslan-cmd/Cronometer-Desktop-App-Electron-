import React from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import ModernButton from './ModernButton.tsx';

interface ControlsProps {
  isRunning: boolean;
  startStop: () => void;
  reset: () => void;
  toggleMode: () => void;
  countdownMode: boolean;
}

const Controls: React.FC<ControlsProps> = ({ isRunning, startStop, reset, toggleMode, countdownMode }) => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <ModernButton onClick={startStop}>
      {isRunning ? <FaPause /> : <FaPlay />}
      {isRunning ? ' Durdur' : ' Başlat'}
    </ModernButton>
    <ModernButton onClick={reset}>
      <FaStop /> Sıfırla
    </ModernButton>
    <ModernButton onClick={toggleMode}>
      {countdownMode ? 'Stopwatch Modu' : 'Geri Sayım Modu'}
    </ModernButton>
  </div>
);

export default Controls;
