import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './styles/Layout.css';

import AdminNavbar from './components/AdminNavbar';  // adjust path if necessary


const AdminLayout = () => {
  return (
    <div className="dashboard-layout">
      
      <div className="navbar admin-navbar">
        <AdminNavbar />
      </div>

      {/* Sidebar + Content */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <div className="sidebar admin-sidebar">
          <h2>CRM Portal</h2>
          <nav>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/profile">Profile</Link>
            <Link to="/admin/settings">Settings</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Outlet /> {/* Where nested routes will render */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
