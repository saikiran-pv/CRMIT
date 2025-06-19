// src/components/opportunities/OpportunityForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Layout';

export default function OpportunityForm({ mode = 'create', opportunity = {} }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: opportunity.title || '',
    amount: opportunity.amount ||'',
    stage: opportunity.stage ||'Qualification',
    close_date: opportunity.close_date ||'',
    customer_id: opportunity.customer_id ||'',
    lead_id: opportunity.lead_id ||'',
    notes: opportunity.notes ||'',
    assigned_to: opportunity.assigned_to ||'',
    contact_id: opportunity.contact_id ||'',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!(mode === 'create') )
      fetchOpportunity();
  }, []);

  const fetchOpportunity = async () => {
    try{
      const res = await axios.get(`http://localhost:3001/api/v1/opportunities/${id}`, {
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'create') {
        await axios.post('http://localhost:3001/api/v1/opportunities', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        });
      } else {
        await axios.put(`http://localhost:3001/api/v1/opportunities/${id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        });
      }
      setLoading(false);
      navigate('/opportunities');
    } catch (err) {
      setError('Failed to save opportunity.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h2>{mode === 'create' ? 'Create Opportunity' : 'Edit Opportunity'}</h2>

        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Stage:
          <select name="stage" value={formData.stage} onChange={handleChange}>
            <option>Qualification</option>
            <option>Proposal</option>
            <option>Negotiation</option>
            <option>Closed Won</option>
            <option>Closed Lost</option>
          </select>
        </label>

        <label>
          Close Date:
          <input type="date" name="close_date" value={formData.close_date} onChange={handleChange} />
        </label>

        <label>
          Customer ID:
          <input name="customer_id" value={formData.customer_id} onChange={handleChange} />
        </label>

        <label>
          Lead ID:
          <input name="lead_id" value={formData.lead_id} onChange={handleChange} />
        </label>

        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <label>
          Assigned To:
          <input name="assigned_to" value={formData.assigned_to} onChange={handleChange} />
        </label>

        <label>
          Contact ID:
          <input name="contact_id" value={formData.contact_id} onChange={handleChange} />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : mode === 'create' ? 'Create Opportunity' : 'Save Changes'}
        </button>
      </form>
    </Layout>
  );
}
