// src/components/opportunities/OpportunityFilters.jsx
import React from 'react';

export default function OpportunityFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="opportunity-filters">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search opportunities..."
      />

      <select name="stage" value={filters.stage} onChange={handleChange}>
        <option value="">All Stages</option>
        <option value="Qualification">Qualification</option>
        <option value="Proposal">Proposal</option>
        <option value="Negotiation">Negotiation</option>
        <option value="Closed Won">Closed Won</option>
        <option value="Closed Lost">Closed Lost</option>
      </select>
    </div>
  );
}
