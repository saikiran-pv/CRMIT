import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Customers from "./pages/Customers";
import Contacts from "./pages/Contacts";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./AdminLayout";
import CreateCustomerForm from "./pages/CreateCustomerForm";
import CustomerDetail from "./pages/CustomerDetail";
import CreateContactForm from "./pages/CreateContactForm";
import ContactDetail from "./pages/ContactDetail";

import { LeadsList, LeadDetails, LeadForm } from './components/Leads'; // adjust path

// import { UserProvider } from './contexts/UserContext';

import { Navigate } from "react-router-dom";
import Opportunities from "./pages/Opportunities";
import Leads from "./pages/Leads";


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OpportunityList from "./components/Opportunities/OpportunityList";
import OpportunityDetails from "./components/Opportunities/OpportunityDetails"
import OpportunityForm from "./components/Opportunities/OpportunityForm";

function App() {
  return (
    // <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<CreateCustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/new" element={<CreateContactForm />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          {/* <Route path="/leads" element={<Leads />} /> */}
          <Route path="/opportunities" element={<OpportunityList />} />
          <Route path="/opportunities/:id" element={<OpportunityDetails />} /> 
          <Route path="/opportunities/new" element={<OpportunityForm  mode="create"/>} />
          <Route path="/opportunities/:id/edit" element={<OpportunityForm mode="edit" />} />
          <Route path="/leads" element={<LeadsList />} />
          <Route path="/leads/new" element={<LeadForm mode="create" />} />
          <Route path="/leads/:id/edit" element={<LeadForm mode="edit" />} />
          <Route path="/leads/:id" element={<LeadDetailsWrapper />} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    // </UserProvider>
  );
}


function LeadDetailsWrapper() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLead() {
      try {
        const res = await axios.get(`http://localhost:3001/api/v1/leads/${id}`,
          {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                  }
          }
        );
        setLead(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!lead) return <p>Lead not found</p>;

  return <LeadDetails lead={lead} />;
}


export default App;
