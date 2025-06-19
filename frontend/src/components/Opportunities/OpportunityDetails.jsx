// src/components/opportunities/OpportunityDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';

export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/api/v1/opportunities/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      setOpportunity(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load opportunity');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading opportunity details...</p>;
  if (error) return <p>{error}</p>;
  if (!opportunity) return <p>No opportunity found.</p>;

  return (
    <Layout>
      <div>
        <h2>{opportunity.title}</h2>
        <p><strong>Stage:</strong> {opportunity.stage}</p>
        <p><strong>Amount:</strong> ${opportunity.amount}</p>
        <p><strong>Close Date:</strong> {opportunity.close_date}</p>
        <p><strong>Customer ID:</strong> {opportunity.customer_id}</p>
        <p><strong>Lead ID:</strong> {opportunity.lead_id}</p>
        <p><strong>Notes:</strong> {opportunity.notes}</p>
        <p><strong>Assigned To:</strong> {opportunity.assigned_to}</p>
        <p><strong>Contact ID:</strong> {opportunity.contact_id}</p>

        <button onClick={() => navigate(`/opportunities/${id}/edit`)}>Edit Opportunity</button>
        <button onClick={() => navigate('/opportunities')}>Back to List</button>
      </div>
    </Layout>
  );
}
