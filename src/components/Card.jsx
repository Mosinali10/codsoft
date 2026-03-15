import React from 'react';

const Card = ({ children, title, subtitle, maxWidth = '100%' }) => (
  <div className="card" style={{ maxWidth }}>
    <div className="card-inner">
      {title    && <h2 className="card-title">{title}</h2>}
      {subtitle && <p  className="card-subtitle">{subtitle}</p>}
      {children}
    </div>
  </div>
);

export default Card;
