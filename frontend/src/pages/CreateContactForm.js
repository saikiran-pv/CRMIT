import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateContactForm.css';
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";


function CreateContactForm({ mode = 'create', contact = {} }) {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  
  const [formData, setformData] = useState({
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    email: contact.email || '',
    customer_id: contact.customer_id || ''
  });


  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const isViewMode = mode === 'view' && !isEditing;

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {

    if (contact && mode !== 'create') {
      setformData({
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        email: contact.email || '',
        customer_id: contact.customer_id || '',
      });
    }
  }, [contact]);

  const fetchCustomers = async () => {
    const res = await axios.get(`http://localhost:3001/api/v1/customers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
    setCustomers(res.data);
  };

  const handleChange = (e) => {
      setformData({
      ...formData,          // spread the current form state
      [e.target.name]: e.target.value  // update the changed field
    });
  };

  const fetchContact = async () => {
    const res = await axios.get(`http://localhost:3001/api/v1/contacts/${contact.id}`, {
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
          const response = await axios.post('http://localhost:3001/api/v1/contacts', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`, // or however you're storing the auth token
              'Content-Type': 'application/json'
            }
          });
          setMessage('Contact created successfully!');
          setformData({ first_name: '', last_name: '', email: '', contact_id: '' });
          navigate(`/contacts/${response.data.id}`)
        } else {
          // PATCH request to update contact
          const response = await axios.patch(`http://localhost:3001/api/v1/contacts/${contact.id}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json'
            }
          });
          setMessage('Contact updated successfully!');
          setformData({ first_name: '', last_name: '', email: '', contact_id: '' });
          fetchContact();  // refetch fresh data and update form state
          setIsEditing(false); // exit edit mode
        }
      
     
    } catch (error) {
      console.error('Error creating contact:', error);
      setMessage('Error creating contact');
    }
  };

  return (
    <Layout>
      <div className="create-contact-form">
        {isViewMode ? (
          <h2>Contact Details</h2>
        ):(
          <h2> Create/Update Contact</h2>
        )}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            first_name:
            <input name="first_name" value={formData.first_name} onChange={handleChange} required readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          <label>
            last_name:
            <input name="last_name" value={formData.last_name} onChange={handleChange} required readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          <label>
            Email:
            <input name="email" type ="email" value={formData.email} onChange={handleChange} readOnly={isViewMode} className={isViewMode ? 'readonly-input' : ''}/>
          </label>
          <label>
            Customer:
            <select value={formData.customer_id} onChange={handleChange} name="customer_id" disabled={isViewMode} >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id} >
                  {customer.name}
                </option>
              ))}
            </select>
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

export default CreateContactForm;
