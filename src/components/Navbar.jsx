import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Film, Hash, Thermometer } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Chatbot',     path: '/chatbot',     icon: <Terminal size={17} /> },
    { name: 'Movies',      path: '/movies',      icon: <Film size={17} /> },
    { name: 'Tic Tac Toe', path: '/tictactoe',   icon: <Hash size={17} /> },
    { name: 'Temperature', path: '/temperature', icon: <Thermometer size={17} /> },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">CS</span>
        CodSoft Web
      </Link>

      <div className="navbar-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
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
