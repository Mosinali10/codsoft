import React, { useState } from 'react';
import { ArrowDownUp, X, Thermometer } from 'lucide-react';

const REFS = [
  { emoji: '❄️', label: 'Freezing',  c: 0,   f: 32,    k: 273.15 },
  { emoji: '🏠', label: 'Room Temp', c: 20,  f: 68,    k: 293.15 },
  { emoji: '🌡️', label: 'Body Temp', c: 37,  f: 98.6,  k: 310.15 },
  { emoji: '🔥', label: 'Boiling',   c: 100, f: 212,   k: 373.15 },
];

const TemperatureConverter = () => {
  const [celsius,    setCelsius]    = useState('0');
  const [fahrenheit, setFahrenheit] = useState('32');
  const [kelvin,     setKelvin]     = useState('273.15');
  const [active,     setActive]     = useState('celsius');

  const fromC = (c) => ({ f: (c * 9/5 + 32).toFixed(2), k: (c + 273.15).toFixed(2) });
  const fromF = (f) => { const c = (f - 32) * 5/9; return { c: c.toFixed(2), k: (c + 273.15).toFixed(2) }; };
  const fromK = (k) => { const c = k - 273.15; return { c: c.toFixed(2), f: (c * 9/5 + 32).toFixed(2) }; };

  const handleC = (e) => {
    const v = e.target.value; setCelsius(v); setActive('celsius');
    const n = parseFloat(v);
    if (v === '' || isNaN(n)) { setFahrenheit(''); setKelvin(''); }
    else { const r = fromC(n); setFahrenheit(r.f); setKelvin(r.k); }
  };
  const handleF = (e) => {
    const v = e.target.value; setFahrenheit(v); setActive('fahrenheit');
    const n = parseFloat(v);
    if (v === '' || isNaN(n)) { setCelsius(''); setKelvin(''); }
    else { const r = fromF(n); setCelsius(r.c); setKelvin(r.k); }
  };
  const handleK = (e) => {
    const v = e.target.value; setKelvin(v); setActive('kelvin');
    const n = parseFloat(v);
    if (v === '' || isNaN(n)) { setCelsius(''); setFahrenheit(''); }
    else { const r = fromK(n); setCelsius(r.c); setFahrenheit(r.f); }
  };

  const swap = () => {
    const tmp = celsius; setCelsius(fahrenheit); setFahrenheit(tmp);
    setActive(active === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const clearAll = () => { setCelsius(''); setFahrenheit(''); setKelvin(''); setActive('celsius'); };

  const applyRef = (ref) => {
    setCelsius(String(ref.c)); setFahrenheit(String(ref.f)); setKelvin(String(ref.k));
    setActive('celsius');
  };

  return (
    <div className="temp-page">

      {/* ── Left: converter ── */}
      <div className="temp-converter-panel">
        <div className="temp-panel-header">
          <div className="temp-panel-icon"><Thermometer size={20} /></div>
          <div>
            <h2 className="temp-panel-title">Temperature Converter</h2>
            <p className="temp-panel-sub">Real-time conversion between Celsius, Fahrenheit, and Kelvin</p>
          </div>
        </div>

        <div className="temp-field">
          <label className="temp-label">Celsius <span className="unit-badge">°C</span></label>
          <input type="number" value={celsius} onChange={handleC} onFocus={() => setActive('celsius')}
            placeholder="Enter temperature" step="0.01"
            className={`temp-input${active === 'celsius' ? ' active' : ''}`} />
        </div>

        <div className="divider-row">
          <div className="divider-line" />
          <button onClick={swap} className="swap-btn" title="Swap °C ↔ °F"><ArrowDownUp size={16} /></button>
          <div className="divider-line" />
        </div>

        <div className="temp-field">
          <label className="temp-label">Fahrenheit <span className="unit-badge">°F</span></label>
          <input type="number" value={fahrenheit} onChange={handleF} onFocus={() => setActive('fahrenheit')}
            placeholder="Enter temperature" step="0.01"
            className={`temp-input${active === 'fahrenheit' ? ' active' : ''}`} />
        </div>

        <div className="temp-field" style={{ marginTop: '0.875rem' }}>
          <label className="temp-label">Kelvin <span className="unit-badge">K</span></label>
          <input type="number" value={kelvin} onChange={handleK} onFocus={() => setActive('kelvin')}
            placeholder="Enter temperature" step="0.01"
            className={`temp-input${active === 'kelvin' ? ' active' : ''}`} />
        </div>

        <button onClick={clearAll} className="btn btn-ghost" style={{ width: '100%', marginTop: '1rem' }}>
          <X size={15} /> Clear All
        </button>

        <p className="project-label" style={{ marginTop: '1.25rem' }}>
          Temperature Converter — CodSoft Internship Project
        </p>
      </div>

      {/* ── Right: reference panel ── */}
      <div className="temp-ref-panel">
        <h3 className="temp-ref-title">Reference Points</h3>
        <p className="temp-ref-sub">Click any card to apply values</p>

        <div className="temp-ref-cards">
          {REFS.map(ref => (
            <button key={ref.label} className="temp-ref-card" onClick={() => applyRef(ref)}>
              <span className="temp-ref-emoji">{ref.emoji}</span>
              <div className="temp-ref-info">
                <span className="temp-ref-label">{ref.label}</span>
                <span className="temp-ref-vals">{ref.c}°C · {ref.f}°F · {ref.k} K</span>
              </div>
            </button>
          ))}
        </div>

        {/* live display */}
        {celsius !== '' && !isNaN(parseFloat(celsius)) && (
          <div className="temp-live-card">
            <p className="temp-live-label">Current values</p>
            <div className="temp-live-row">
              <div className="temp-live-val">
                <span className="temp-live-num">{celsius}</span>
                <span className="temp-live-unit">°C</span>
              </div>
              <div className="temp-live-sep">=</div>
              <div className="temp-live-val">
                <span className="temp-live-num">{fahrenheit}</span>
                <span className="temp-live-unit">°F</span>
              </div>
              <div className="temp-live-sep">=</div>
              <div className="temp-live-val">
                <span className="temp-live-num">{kelvin}</span>
                <span className="temp-live-unit">K</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default TemperatureConverter;
