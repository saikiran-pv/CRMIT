import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useNavigate } from "react-router-dom";

// import { useCurrentUser } from '../contexts/UserContext';

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  // const user = useCurrentUser();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetch('http://localhost:3001/api/v1/contacts', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error('Error fetching contacts:', err));
  }, []);

  const handleClick = (id) => {
    navigate(`/contacts/${id}`);
  };

  return (
    <Layout>
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}  style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleClick(contact.id)}>
            <a>{contact.first_name} ({contact.email})</a>
          </li>
        ))}
      </ul>
      <a href="/contacts/new">create new contact</a>
    </div>
    </Layout>
  );
}

export default Contacts;
