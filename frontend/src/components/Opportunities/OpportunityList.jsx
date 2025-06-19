// OpportunityList.jsx
import React, { useEffect, useState } from 'react';
import OpportunityCard from './OpportunityCard';
import OpportunityFilters from './OpportunityFilters';
import axios from 'axios';
import Layout from '../../Layout';

export default function OpportunityList() {
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState({ search: '', stage: '' });

  useEffect(() => {
    fetchOpportunities();
  }, [filters]);

  const fetchOpportunities = async () => {
    const res = await axios.get('http://localhost:3001/api/v1/opportunities', {
      params: filters,
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    });
    setOpportunities(res.data);
  };

  return (
    <Layout>
      <div>
        <h2>Opportunities</h2>
        <OpportunityFilters filters={filters} setFilters={setFilters} />
        {opportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}
      </div>
    </Layout>
  );
}
