import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeadCard from './LeadCard';
import LeadFilters from './LeadFilters';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import './LeadsList.css';


export default function LeadsList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    setLoading(true);
    // Add filters as query params as needed
    const res = await axios.get(`http://localhost:3001/api/v1/leads`,{
      params: filters,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    setLeads(res.data);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="leads-container">
        <h2>Leads</h2>
        <button className="create-lead-button" onClick={() => navigate('/leads/new')}>Create New Lead</button>
        <LeadFilters filters={filters} setFilters={setFilters} />
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
             {loading ? <p className="loading-message">Loading...</p> : (
                leads.length === 0 ? <p className="no-leads-message">No leads found.</p> : (
                  leads.map(lead => <LeadCard key={lead.id} lead={lead} />)
                )
              )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
