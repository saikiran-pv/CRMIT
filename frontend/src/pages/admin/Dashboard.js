// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from '../../AdminLayout';

function Dashboard() {
  const [users, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setDashboardData(data);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        navigate("/login");
      });
  }, [navigate]);

  if (!users) return <p>Loading...</p>;

  return (
      <div>
        <h2>Users List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      </div>
  );
}

export default Dashboard;
