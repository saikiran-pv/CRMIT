// src/components/Navbar.js
import React from 'react';
import '../styles/Navbar.css'; // Optional CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar admin-navbar" style={{ display: 'flex', justifyContent: 'right', flex: 1 }}>
      <div className="search-box" style={{ flex: 1, display: 'flex', justifyContent: 'right' }}>
        <input type="text" placeholder="Search..." style={{ height: '30px', width: '380px' }} />
      </div>

      <div className="action-icons" style={{ display: 'flex', justifyContent: 'right', flex: 1 }}>
        <div className="pad notification-icon" style={{ paddingLeft: '15px', paddingRight: '15px' }}>🔔</div>
        <div className="pad language-icon" style={{ paddingLeft: '15px', paddingRight: '15px' }}>🌐</div>
        <div className="pad theme-icon" style={{ paddingLeft: '15px', paddingRight: '15px' }}>🌓</div>
        <div className="pad profile-dropdown" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <a href="/dashboard">User</a>
        </div>
          <div className="pad logout" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <button onClick={() => {
              if(window.confirm("Are you sure you want to log out?")) {
                // handle logout logic here
              }
            }}>Log Out</button>
          </div> 
      </div>
    </div>
  );
};

export default Navbar;
