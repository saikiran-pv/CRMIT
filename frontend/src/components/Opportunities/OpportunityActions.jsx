// src/components/opportunities/OpportunityActions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OpportunityActions({ opportunity, onDelete, onConvert }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/opportunities/edit/${opportunity.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete opportunity "${opportunity.title}"?`)) {
      onDelete(opportunity.id);
    }
  };

  const handleConvert = () => {
    // If your app supports converting an opportunity to something else
    if (window.confirm(`Convert opportunity "${opportunity.title}"?`)) {
      onConvert(opportunity.id);
    }
  };

  return (
    <div className="opportunity-actions">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {/* Uncomment if you have a convert feature */}
      {/* <button onClick={handleConvert}>Convert</button> */}
    </div>
  );
}
