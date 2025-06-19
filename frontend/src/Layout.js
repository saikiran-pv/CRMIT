// Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Layout.css';
import Navbar from './components/Navbar';  // adjust path if necessary

export default function Layout({ children }) {
  const navigate = useNavigate();

  // Example logout handler if you have an API call or context for auth
  const handleLogout = () => {
    // TODO: call API to logout, clear tokens, etc
    // Then redirect to login page
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <div className="navbar">
        <Navbar />
      </div>

      {/* Container for sidebar + content */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>CRM Portal</h2>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/leads">Leads</Link>
            <Link to="/opportunities">Opportunities</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
