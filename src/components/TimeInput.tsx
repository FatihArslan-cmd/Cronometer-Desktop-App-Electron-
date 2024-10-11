import React from 'react';

const TimeInput = ({ hours, minutes, seconds, setHours, setMinutes, setSeconds }) => {
  const handleInputChange = (setFunc) => (e) => {
    const value = e.target.value;
    setFunc(value === '' ? '0' : value);
  };

  return (
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
  );
};

const styles = {
  inputContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    zIndex: 2,
  },
  input: {
    padding: '14px',
    fontSize: '18px',
    borderRadius: '666px',
    border: '1px solid #c5d1ed',
    width: '40px',
    textAlign: 'center',
  },
};

export default TimeInput;
