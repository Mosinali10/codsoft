import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Film, Hash, Thermometer } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Chatbot', path: '/chatbot', icon: <Terminal size={20} /> },
    { name: 'Movies', path: '/movies', icon: <Film size={20} /> },
    { name: 'Tic Tac Toe', path: '/tictactoe', icon: <Hash size={20} /> },
    { name: 'Temperature', path: '/temperature', icon: <Thermometer size={20} /> },
  ];

  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      padding: '0.75rem 1.5rem',
      backgroundColor: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <Link to="/" style={{ 
        textDecoration: 'none', 
        fontSize: '1.25rem', 
        fontWeight: 700, 
        color: 'var(--text)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '4px', borderRadius: '6px' }}>CS</div>
        CodSoft Web
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: location.pathname === item.path ? 'var(--accent)' : 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.2s'
            }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
