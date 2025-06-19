// src/pages/CustomerDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateCustomerForm from './CreateCustomerForm';

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => setCustomer(res.data))
    .catch(err => console.error(err));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <CreateCustomerForm mode="view" customer={customer} />
  );
}

export default CustomerDetailPage;
