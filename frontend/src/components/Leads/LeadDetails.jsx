import React from 'react';
import LeadActions from './LeadActions';  // adjust path if needed
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import './LeadDetails.css';
import axios from 'axios';


export default function LeadDetails({ lead }) {
  const navigate = useNavigate();
  const handleEdit = (lead) => {
    navigate(`/leads/${lead.id}/edit`)
  };

  const handleDelete = async (lead) => {
    
  };

  const handleConvert = async (lead) => {
    const res =  await axios.post(`http://localhost:3001/api/v1/leads/${lead.id}/convert`, lead, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  };

  if (!lead) return <p>No lead selected</p>;

  return (
    <Layout>
      <div className="lead-details">
        <h2 className="lead-name">{lead.name}</h2>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Phone:</strong> {lead.phone}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Source:</strong> {lead.source}</p>
        <p><strong>Notes:</strong> {lead.notes}</p>
        <p><strong>Assigned to:</strong> {lead.assigned_to}</p>
        
        <div className="lead-actions">
          <LeadActions lead={lead} onEdit={handleEdit} onDelete={handleDelete} onConvert={handleConvert} />
        </div>
      </div>
    </Layout>
  );
}
