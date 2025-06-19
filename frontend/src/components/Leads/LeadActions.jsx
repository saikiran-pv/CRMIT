import React from 'react';

export default function LeadActions({ lead, onEdit, onDelete, onConvert }) {
  return (
    <div>
      <button onClick={() => onEdit(lead)}>Edit</button>
      <button onClick={() => onConvert(lead)}>Convert to Opportunity</button>
      <button onClick={() => onDelete(lead)}>Delete</button>
    </div>
  );
}
