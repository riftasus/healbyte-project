import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/users');
      const result = await res.json();
      const users = result.users;

      // Find a matching user
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        alert(`✅ Welcome, ${foundUser.name}! Role: ${foundUser.role_id}`);
        // You can redirect or store login info here

        switch (foundUser.role_id) {
          case 'doctor':
            navigate('/doctor');
            break;
          case 'coordinator':
            navigate('/coordinator');
            break;
          case 'test_conductor':
            navigate('/conductor');
            break;
          case 'deliveryman':
            navigate('/deliveryman');
            break;
          case 'patient':
            navigate('/patient');
            break;
          default:
            alert('Unknown role');
        }

      } else {
        alert("❌ Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong while logging in.");
    }
  };

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
    </div>
  );
}
