import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage';
import ConductorPage from './pages/ConductorPage';
import CoordinatorPage from './pages/CoordinatorPage';
import DeliverymanPage from './pages/DeliverymanPage';

function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        console.log('Frontend fetched data:', data);
        setMessage(data.message || "");
        setUsers(data.users || []);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        {/* Navigation links (visible on all pages) */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/signup" style={{ marginRight: '10px' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage users={users} message={message} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/coordinator" element={<CoordinatorPage />} />
          <Route path="/conductor" element={<ConductorPage />} />
          <Route path="/deliveryman" element={<DeliverymanPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
