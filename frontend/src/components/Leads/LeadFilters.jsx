import React from 'react';

const statuses = ['', 'New', 'Contacted', 'Qualified', 'Lost'];

export default function LeadFilters({ filters, setFilters }) {
  const handleStatusChange = (e) => {
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <select value={filters.status} onChange={handleStatusChange}>
        {statuses.map(s => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
      </select>
      <input
        type="text"
        placeholder="Search leads..."
        value={filters.search}
        onChange={handleSearchChange}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
}
