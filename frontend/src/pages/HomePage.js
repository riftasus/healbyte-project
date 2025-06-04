// HomePage.js
export default function HomePage({ users, message }) {
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
