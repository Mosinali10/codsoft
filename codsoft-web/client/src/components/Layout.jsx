import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ 
        flex: 1, 
        padding: '3rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        {children}
      </main>

    </div>
  );
};

export default Layout;
