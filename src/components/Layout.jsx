import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Github } from 'lucide-react';

const PAGE_TITLES = {
  '/':            'Dashboard',
  '/chatbot':     'AI Chatbot',
  '/movies':      'Movie Recommender',
  '/tictactoe':   'Tic Tac Toe AI',
  '/temperature': 'Temperature Converter',
};

export default function Layout({ children }) {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? 'Dashboard';

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <header className="topbar">
          <span className="topbar-title">{title}</span>
          <div className="topbar-right">
            <a
              href="https://github.com/Mosinali10/codsoft"
              target="_blank"
              rel="noreferrer"
              className="topbar-github"
              title="View source on GitHub"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <span className="topbar-divider" />
            <span className="topbar-badge">CodSoft Internship</span>
            <div className="topbar-avatar">M</div>
          </div>
        </header>
        {/* fade-in on route change */}
        <main className="app-content" key={location.pathname}>
          <div className="page-fade">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
