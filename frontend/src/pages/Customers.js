import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import CreateCustomerForm from "./CreateCustomerForm";
import { useNavigate } from "react-router-dom";


function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetch('http://localhost:3001/api/v1/customers', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  const handleClick = (id) => {
    navigate(`/customers/${id}`);
  };


  return (
    <Layout>
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}  style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleClick(customer.id)}>
            <a>{customer.name} ({customer.email})</a>
          </li>
        ))}
      </ul>
      <a href="/customers/new">create new customer</a>
    </div>
    </Layout>
  );
}

export default Customers;
