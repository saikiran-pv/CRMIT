import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
// import { useCurrentUser } from '../contexts/UserContext';

function Leads() {
  const [leads, setLeads] = useState([]);
  // const user = useCurrentUser();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetch('http://localhost:3001/api/v1/leads', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error('Error fetching contacts:', err));
  }, []);

  return (
    <Layout>
    <div>
      <h2>Leads List</h2>
      <ul>
        {leads.map(lead => (
          <li key={lead.id}>
            {lead.name} ({lead .email})
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
}

export default Leads;
