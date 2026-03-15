import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Terminal, Film, Hash, Thermometer } from 'lucide-react';

const navItems = [
  { name: 'Dashboard',   path: '/',            icon: <LayoutDashboard size={17} /> },
  { name: 'Chatbot',     path: '/chatbot',     icon: <Terminal size={17} /> },
  { name: 'Movies',      path: '/movies',      icon: <Film size={17} /> },
  { name: 'Tic Tac Toe', path: '/tictactoe',   icon: <Hash size={17} /> },
  { name: 'Temperature', path: '/temperature', icon: <Thermometer size={17} /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <span className="sidebar-logo">CS</span>
        <div>
          <div className="sidebar-brand-name">CodSoft Web</div>
          <div className="sidebar-brand-sub">Internship Projects</div>
        </div>
      </div>

      {/* Nav */}
      <div className="sidebar-nav-label">Navigation</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link${isActive ? ' active' : ''}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-name">Mosin Ali</div>
        <div className="sidebar-footer-sub">CodSoft · 2024</div>
      </div>
    </aside>
  );
}
