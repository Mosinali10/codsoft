import React, { useState } from 'react';
import Card from '../components/Card';
import { ArrowDownUp, X } from 'lucide-react';

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('0');
  const [fahrenheit, setFahrenheit] = useState('32');
  const [kelvin, setKelvin] = useState('273.15');
  const [activeInput, setActiveInput] = useState('celsius');

  const handleCelsiusChange = (e) => {
    const val = e.target.value;
    setCelsius(val);
    setActiveInput('celsius');
    if (val === '') {
      setFahrenheit('');
      setKelvin('');
    } else {
      const num = parseFloat(val);
      if (isNaN(num)) {
        setFahrenheit('');
        setKelvin('');
      } else {
        const f = (num * 9/5) + 32;
        const k = num + 273.15;
        setFahrenheit(f.toFixed(2));
        setKelvin(k.toFixed(2));
      }
    }
  };

  const handleFahrenheitChange = (e) => {
    const val = e.target.value;
    setFahrenheit(val);
    setActiveInput('fahrenheit');
    if (val === '') {
      setCelsius('');
      setKelvin('');
    } else {
      const num = parseFloat(val);
      if (isNaN(num)) {
        setCelsius('');
        setKelvin('');
      } else {
        const c = (num - 32) * 5/9;
        const k = c + 273.15;
        setCelsius(c.toFixed(2));
        setKelvin(k.toFixed(2));
      }
    }
  };

  const handleKelvinChange = (e) => {
    const val = e.target.value;
    setKelvin(val);
    setActiveInput('kelvin');
    if (val === '') {
      setCelsius('');
      setFahrenheit('');
    } else {
      const num = parseFloat(val);
      if (isNaN(num)) {
        setCelsius('');
        setFahrenheit('');
      } else {
        const c = num - 273.15;
        const f = (c * 9/5) + 32;
        setCelsius(c.toFixed(2));
        setFahrenheit(f.toFixed(2));
      }
    }
  };

  const swapCelsiusFahrenheit = () => {
    const temp = celsius;
    setCelsius(fahrenheit);
    setFahrenheit(temp);
    setActiveInput(activeInput === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const clearAll = () => {
    setCelsius('');
    setFahrenheit('');
    setKelvin('');
    setActiveInput('celsius');
  };

  const getInputStyle = (isActive) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '10px',
    border: `2px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
    fontSize: '1.125rem',
    fontWeight: isActive ? '600' : '400',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: isActive ? 'var(--surface)' : 'var(--card-bg)',
    boxShadow: isActive ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
  });

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: '0.5rem'
  };

  const containerStyle = {
    position: 'relative',
    marginBottom: '0.75rem'
  };

  return (
    <Card 
      title="Temperature Converter" 
      subtitle="Real-time conversion between Celsius, Fahrenheit, and Kelvin"
      maxWidth="500px"
    >
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(180deg); }
        }
        .swap-btn:hover svg {
          animation: rotate 0.3s ease-in-out;
        }
      `}</style>

      <div style={containerStyle}>
        <label style={labelStyle}>Celsius (°C)</label>
        <input 
          type="number" 
          value={celsius} 
          onChange={handleCelsiusChange}
          onFocus={() => setActiveInput('celsius')}
          placeholder="Enter temperature"
          style={getInputStyle(activeInput === 'celsius')}
          step="0.01"
        />
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '0.75rem',
        margin: '0.5rem 0'
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        <button
          onClick={swapCelsiusFahrenheit}
          className="swap-btn"
          style={{
            padding: '0.5rem',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--accent)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--surface)';
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Swap Celsius and Fahrenheit"
        >
          <ArrowDownUp size={18} />
        </button>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
      </div>

      <div style={containerStyle}>
        <label style={labelStyle}>Fahrenheit (°F)</label>
        <input 
          type="number" 
          value={fahrenheit} 
          onChange={handleFahrenheitChange}
          onFocus={() => setActiveInput('fahrenheit')}
          placeholder="Enter temperature"
          style={getInputStyle(activeInput === 'fahrenheit')}
          step="0.01"
        />
      </div>

      <div style={containerStyle}>
        <label style={labelStyle}>Kelvin (K)</label>
        <input 
          type="number" 
          value={kelvin} 
          onChange={handleKelvinChange}
          onFocus={() => setActiveInput('kelvin')}
          placeholder="Enter temperature"
          style={getInputStyle(activeInput === 'kelvin')}
          step="0.01"
        />
      </div>

      <button
        onClick={clearAll}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginTop: '0.5rem',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--border)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--surface)';
        }}
      >
        <X size={16} />
        Clear All
      </button>

      <div style={{ 
        marginTop: '1rem', 
        padding: '0.875rem', 
        backgroundColor: 'var(--surface)', 
        borderRadius: '12px', 
        border: '1px solid var(--border)' 
      }}>
        <h4 style={{ 
          fontSize: '0.875rem', 
          color: 'var(--text)', 
          marginBottom: '0.5rem',
          fontWeight: 600
        }}>
          Common Reference Points:
        </h4>
        <ul style={{ 
          fontSize: '0.8125rem', 
          color: 'var(--muted)', 
          listStyle: 'none', 
          padding: 0,
          lineHeight: '1.8'
        }}>
          <li>❄️ 0°C = 32°F = 273.15K (Freezing)</li>
          <li>🏠 20°C = 68°F = 293.15K (Room Temp)</li>
          <li>🌡️ 37°C = 98.6°F = 310.15K (Body Temp)</li>
          <li>🔥 100°C = 212°F = 373.15K (Boiling)</li>
        </ul>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--muted)',
        marginTop: '1rem',
        letterSpacing: '0.02em'
      }}>
        Temperature Intelligence Tool — CodSoft Internship Project
      </p>
    </Card>
  );
};

export default TemperatureConverter;
