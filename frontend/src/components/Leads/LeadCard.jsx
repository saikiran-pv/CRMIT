import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LeadCard.css";

export default function LeadCard({ lead}) {
  const navigate = useNavigate();
  
  return (
    <tr className="lead-card" onClick={() => navigate(`/leads/${lead.id}`)} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.status}</td>
      <td>{lead.assigned_to}</td>
      <td>
        <button onClick={(e) => { e.stopPropagation(); navigate(`/leads/${lead.id}/edit`); }}>Edit</button>
      </td>
    </tr>
  );
}
