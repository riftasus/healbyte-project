import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function runs when user clicks Login button
  async function handleLogin(event) {
    event.preventDefault(); // stop page refresh

    try {
      // Send email and password to backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const result = await response.json();

      // If login failed
      if (!response.ok || !result.token) {
        setMessage("❌ " + (result.error || "Login failed"));
        return;
      }

      // If login successful
      const user = result.user;
      const token = result.token;

      // ✅ Save token to localStorage
      localStorage.setItem('token', token);
      if (setIsLoggedIn) setIsLoggedIn(true);

      setMessage("✅ Welcome, " + user.name + "! Role: " + user.role_id);

      // Go to the user's page depending on role
      setTimeout(() => {
        if (user.role_id === 'doctor') {
          navigate('/doctor');
        } else if (user.role_id === 'coordinator') {
          navigate('/coordinator');
        } else if (user.role_id === 'test_conductor') {
          navigate('/conductor');
        } else if (user.role_id === 'deliveryman') {
          navigate('/deliveryman');
        } else if (user.role_id === 'patient') {
          navigate('/patient');
        } else {
          setMessage('Unknown role');
        }
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong while logging in.");
    }
  }

  // Example: How to use the token for an authenticated fetch
  // const token = localStorage.getItem('token');
  // fetch('/api/protected', { headers: { "token": token } })

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