import React from 'react';

const Card = ({ children, title, subtitle, maxWidth = '100%' }) => {
  return (
    <div style={{
      maxWidth: maxWidth,
      width: '100%',
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)',
      margin: '0 auto'
    }}>
      {title && <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>{title}</h2>}
      {subtitle && <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', textAlign: 'center', marginBottom: '1.5rem' }}>{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;
