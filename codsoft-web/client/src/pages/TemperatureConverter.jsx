import React, { useState } from 'react';
import Card from '../components/Card';

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('0');
  const [fahrenheit, setFahrenheit] = useState('32');

  const handleCelsiusChange = (e) => {
    const val = e.target.value;
    setCelsius(val);
    if (val === '') {
      setFahrenheit('');
    } else {
      const converted = (parseFloat(val) * 9/5) + 32;
      setFahrenheit(converted.toFixed(1));
    }
  };

  const handleFahrenheitChange = (e) => {
    const val = e.target.value;
    setFahrenheit(val);
    if (val === '') {
      setCelsius('');
    } else {
      const converted = (parseFloat(val) - 32) * 5/9;
      setCelsius(converted.toFixed(1));
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '1rem',
    marginTop: '0.5rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--muted)',
    marginTop: '1.25rem'
  };

  return (
    <Card 
      title="Temperature Converter" 
      subtitle="Instant client-side conversion between Celsius and Fahrenheit"
      maxWidth="500px"
    >
      <div>
        <label style={labelStyle}>Celsius (°C)</label>
        <input 
          type="number" 
          value={celsius} 
          onChange={handleCelsiusChange}
          placeholder="0.0"
          style={inputStyle}
          autoFocus
        />
      </div>

      <div style={{ textAlign: 'center', margin: '1.5rem 0', color: 'var(--muted)' }}>
        ⇅
      </div>

      <div>
        <label style={labelStyle}>Fahrenheit (°F)</label>
        <input 
          type="number" 
          value={fahrenheit} 
          onChange={handleFahrenheitChange}
          placeholder="32.0"
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.5rem' }}>Common Points:</h4>
        <ul style={{ fontSize: '0.875rem', color: 'var(--muted)', listStyle: 'none', padding: 0 }}>
          <li>❄️ 0°C = 32°F (Freezing)</li>
          <li>🏠 20°C = 68°F (Room Temp)</li>
          <li>🌡️ 37°C = 98.6°F (Body Temp)</li>
          <li>🔥 100°C = 212°F (Boiling)</li>
        </ul>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--muted)',
        marginTop: '1.5rem',
        letterSpacing: '0.02em'
      }}>
        Temperature Intelligence Tool — CodSoft Internship Project
      </p>
    </Card>
  );
};

export default TemperatureConverter;
