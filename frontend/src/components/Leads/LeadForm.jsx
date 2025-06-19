import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Layout from '../../Layout';
import './LeadForm.css';

export default function LeadForm({ mode = 'create', lead = {} }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: lead.name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    status: lead.status || 'New',
    source: lead.source || '',
    notes: lead.notes || '',
    assigned_to: lead.assigned_to || '',
  });

  useEffect(() => {
    if (!(mode === 'create') )
      fetchLead();

  }, []);

  const fetchLead = async () => {
    try{
      console.log(lead);
      const res = await axios.get(`http://localhost:3001/api/v1/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      setFormData(res.data);
    }
    catch(err) {
      alert('Error saving lead');
    }
  };
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        const res =  await axios.post('http://localhost:3001/api/v1/leads', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        navigate(`/leads/${res.data.id}`);
      } else {
        await axios.patch(`http://localhost:3001/api/v1/leads/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        navigate(`/leads/${id}`);
      }
      // onSuccess();
    } catch (err) {
      alert('Error saving lea');
    }
  };

  return (
    <Layout>
      <form className="lead-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="form-input" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-input" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="form-input" />

        <select name="status" value={formData.status} onChange={handleChange} className="form-input">
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <input name="source" value={formData.source} onChange={handleChange} placeholder="Source" className="form-input" />
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="form-textarea" />
        <input name="assigned_to" value={formData.assigned_to} onChange={handleChange} placeholder="Assigned To" className="form-input" />

        <button type="submit" className="form-button">
          {mode === 'create' ? 'Create Lead' : 'Save Changes'}
        </button>
      </form>
    </Layout>
  );
}
