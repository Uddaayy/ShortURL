import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9fafb',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#ffffff',
      padding: '24px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '24px',
      color: '#2563eb', // blue-600
    },
    navLink: {
      display: 'block',
      color: '#374151', // gray-700
      textDecoration: 'none',
      marginBottom: '12px',
      fontSize: '16px',
    },
    navLinkHover: {
      color: '#2563eb', // blue-600
    },
    content: {
      flex: 1,
      padding: '32px',
      backgroundColor: '#f3f4f6', // gray-100
      overflowY: 'auto',
    },
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h1 style={styles.title}>Link Dashboard</h1>
        <nav>
          <Link
            to="/create"
            style={styles.navLink}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            Create Link
          </Link>
          <Link
            to="/analytics"
            style={styles.navLink}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
