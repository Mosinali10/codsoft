import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ 
        flex: 1, 
        padding: '0.5rem 1rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 57px)',
        overflow: 'auto'
      }}>
        {children}
      </main>

    </div>
  );
};

export default Layout;
