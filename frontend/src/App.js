import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>HealByte Users</h1>
      <p><strong>Backend says:</strong> {message}</p>
      <ul>
        {users.length === 0 ? (
          <li>No users found</li>
        ) : (
          users.map(user => (
            <li key={user.user_id}>{user.name} ({user.email || 'No Email'})</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
