import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './styles/cute-dark.css';


import SignupPage from './pages/intro/SignupPage';
import LoginPage from './pages/intro/LoginPage';
import HomePage from './pages/intro/HomePage';
import DoctorPage from './pages/doctor/DoctorPage';
import PatientPage from './pages/patient/PatientPage';
import ConductorPage from './pages/conductor/ConductorPage';
import CoordinatorPage from './pages/coordinator/CoordinatorPage';
import DeliverymanPage from './pages/deliveryman/DeliverymanPage';

function App() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || "");
        setUsers(data.users || []);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  // Listen for login/logout and update isLoggedIn state
  useEffect(() => {
    function handleStorage() {
      setIsLoggedIn(!!localStorage.getItem('token'));
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        {/* Hide nav links if user is logged in */}
        {!isLoggedIn && (
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/intro/signup" style={{ marginRight: '10px' }}>Signup</Link>
            <Link to="/intro/login">Login</Link>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<HomePage users={users} message={message} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/doctor" element={<DoctorPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/patient" element={<PatientPage setIsLoggedIn = {setIsLoggedIn}/>} />
          <Route path="/coordinator" element={<CoordinatorPage setIsLoggedIn = {setIsLoggedIn}/>} />
          <Route path="/conductor" element={<ConductorPage setIsLoggedIn = {setIsLoggedIn}/>} />
          <Route path="/deliveryman" element={<DeliverymanPage setIsLoggedIn = {setIsLoggedIn}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;