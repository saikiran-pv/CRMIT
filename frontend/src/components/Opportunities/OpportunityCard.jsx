import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OpportunityCard.css'; // Optional for custom styles

export default function OpportunityCard({ opportunity }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/opportunities/${opportunity.id}`);
  };

  return (
      <div className="opportunity-card" onClick={handleClick}>
        {console.log(opportunity)}
        <h3>{opportunity.title}</h3>
        <p><strong>Stage:</strong> {opportunity.stage}</p>
        <p><strong>Amount:</strong> ${opportunity.amount}</p>
        <p><strong>Close Date:</strong> {opportunity.close_date}</p>
      </div>
  );
}
