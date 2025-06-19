// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../Layout';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/api/v1/dashboard", {
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

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <Layout>
      <div>
        <h2>Dashboard</h2>
        <p>{dashboardData.message}</p>
        <p>Email: {dashboardData.user.email}</p>
        <p>Full name: {dashboardData.user.name}</p>
        <p>Customers: {dashboardData.stats.customer_count}</p>
        <p>Contacts: {dashboardData.stats.contact_count}</p>
      </div>
    </Layout>
  );
}

export default Dashboard;
