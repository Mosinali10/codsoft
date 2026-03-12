import React from 'react';

const Card = ({ children, title, subtitle, maxWidth = '100%' }) => {
  return (
    <div style={{
      maxWidth: maxWidth,
      width: '100%',
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      padding: '1.25rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      margin: '0 auto'
    }}>
      {title && <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.25rem', textAlign: 'center' }}>{title}</h2>}
      {subtitle && <p style={{ color: 'var(--muted)', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;
