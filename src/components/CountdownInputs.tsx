import React from 'react';

interface CountdownInputsProps {
  hours: string;
  minutes: string;
  seconds: string;
  setHours: React.Dispatch<React.SetStateAction<string>>;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
  setSeconds: React.Dispatch<React.SetStateAction<string>>;
}

const CountdownInputs: React.FC<CountdownInputsProps> = ({ hours, minutes, seconds, setHours, setMinutes, setSeconds }) => (
  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
    <input
      type="number"
      value={hours}
      onChange={(e) => setHours(e.target.value || '0')}
      placeholder="Saat"
      style={{ padding: '14px', fontSize: '18px', borderRadius: '666px', width: '40px', textAlign: 'center' }}
    />
    <input
      type="number"
      value={minutes}
      onChange={(e) => setMinutes(e.target.value || '0')}
      placeholder="Dakika"
      style={{ padding: '14px', fontSize: '18px', borderRadius: '666px', width: '40px', textAlign: 'center' }}
    />
    <input
      type="number"
      value={seconds}
      onChange={(e) => setSeconds(e.target.value || '0')}
      placeholder="Saniye"
      style={{ padding: '14px', fontSize: '18px', borderRadius: '666px', width: '40px', textAlign: 'center' }}
    />
  </div>
);

export default CountdownInputs;
