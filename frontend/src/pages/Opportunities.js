import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
// import { useCurrentUser } from '../contexts/UserContext';

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  // const user = useCurrentUser();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetch('http://localhost:3001/api/v1/opportunities', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => setOpportunities(data))
      .catch(err => console.error('Error fetching contacts:', err));
  }, []);

  return (
    <Layout>
    <div>
      <h2>Opportunities List</h2>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id}>
            {opportunity.name} ({opportunity .email})
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
}

export default Opportunities;
