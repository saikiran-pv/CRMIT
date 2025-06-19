import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateContactForm from './CreateContactForm';

function ContactDetailPage() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => setContact(res.data))
    .catch(err => console.error(err));
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <CreateContactForm mode="view" contact={contact} />
  );
}

export default ContactDetailPage;
