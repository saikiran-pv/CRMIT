import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateCustomerForm.css';
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";


function CreateCustomerForm({ mode = 'create', customer = {} }) {
  const navigate = useNavigate();
  
  const [formData, setformData] = useState({
    name: customer.name || '',
    email: customer.email || '',
    phone: customer.phone || '',
    address: customer.address|| ''
  });


  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const isViewMode = mode === "view" && !isEditing;

 

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (customer && mode !== 'create') {
      setformData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || '',
      });
    }
  }, [customer]);

  const handleChange = (e) => {
      setformData({
      ...formData,          // spread the current form state
      [e.target.name]: e.target.value  // update the changed field
    });
  };

  const fetchCustomer = async (contactId) => {
    const res = await axios.get(`http://localhost:3001/api/v1/customers/${contactId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    setformData(res.data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        if (mode === 'create') {
          // POST request
          const response = await axios.post('http://localhost:3001/api/v1/customers', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`, // or however you're storing the auth token
              'Content-Type': 'application/json'
            }
          });

          setMessage('Customer created successfully!');
          const new_customer = response.data;
          setformData({ name: '', email: '', phone: '', address: '' });
          navigate(`/customers/${response.data.id}/`);
        } else {
          // PATCH request to update customer
          const response = await axios.patch(`http://localhost:3001/api/v1/customers/${customer.id}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json'
            }
          });
          setMessage('Customer updated successfully!');
          setformData({ name: '', email: '', phone: '', address: '' });
          fetchCustomer(response.data.id);
          setIsEditing(false); // exit edit mode
        }
      
    } catch (error) {
      console.error('Error creating customer:', error);
      setMessage('Error creating customer');
    }
  };

  return (
    <Layout>
      <div className="create-customer-form">
         {isViewMode ? (
          <h2>Customer Details</h2>
        ):(
          <h2> Create/Update Customer</h2>
        )}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input name="name" value={formData.name} onChange={handleChange} required readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          <label>
            Email:
            <input name="email" type="email" value={formData.email} onChange={handleChange} required readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          <label>
            Phone:
            <input name="phone" value={formData.phone} onChange={handleChange} readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          <label>
            address:
            <input name="address" value={formData.address} onChange={handleChange} readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          
          {isViewMode ? (
            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            ) : (
              <>
                <button type="submit">{mode === 'create' ? 'Create' : 'Save'}</button>
                {mode !== 'create' && (
                  <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                )}
              </>
            )}
            <button type="button" onClick={() => navigate(-1)}>Back</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCustomerForm;
