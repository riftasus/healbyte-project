import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple JWT decoder
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // 🔁 Redirect logged-in users away from login page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        const role = decoded.user?.role;
        if (role === 'doctor') navigate('/doctor');
        else if (role === 'coordinator') navigate('/coordinator');
        else if (role === 'test_conductor') navigate('/conductor');
        else if (role === 'deliveryman') navigate('/deliveryman');
        else if (role === 'patient') navigate('/patient');
        else navigate('/');
      } else {
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok || !result.token) {
        setMessage("❌ " + (result.error || "Login failed"));
        return;
      }

      const user = result.user;
      const token = result.token;

      localStorage.setItem('token', token);
      if (setIsLoggedIn) setIsLoggedIn(true);

      setMessage("✅ Welcome, " + user.name + "! Role: " + user.role_id);

      setTimeout(() => {
        if (user.role_id === 'doctor') navigate('/doctor');
        else if (user.role_id === 'coordinator') navigate('/coordinator');
        else if (user.role_id === 'test_conductor') navigate('/conductor');
        else if (user.role_id === 'deliveryman') navigate('/deliveryman');
        else if (user.role_id === 'patient') navigate('/patient');
        else setMessage('Unknown role');
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong while logging in.");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '15px' }}>Login</button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
}
