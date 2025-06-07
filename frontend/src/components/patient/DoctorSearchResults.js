import React from "react";

export default function DoctorSearchResults({ doctors, loading }) {
  if (loading) return <p>Loading...</p>;
  if (!doctors.length) return <p style={{ color: "#888" }}>No results found.</p>;
  return (
    <div>
      <h4>Search Results:</h4>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.id}>
            <strong>{doc.name}</strong> ({doc.specialty}) — Rating: {doc.rating} — Fee: ${doc.fee}
          </li>
        ))}
      </ul>
    </div>
  );
}