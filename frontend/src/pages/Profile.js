// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../Layout';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/api/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        navigate("/login");
      });
  }, [navigate]);

  if (!userData) return <p>Loading...</p>;

  return (
    <Layout>
      <div>
        <h2>Profile</h2>
        <p>{userData.message}</p>
        <p>Email: {userData.email}</p>
        <p>name: {userData.first_name} {userData.last_name}</p>
      </div>
    </Layout>
  );
}

export default Profile;
