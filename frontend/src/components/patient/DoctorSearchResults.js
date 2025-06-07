import React, { useState } from "react";

export default function DoctorSearchResults({ doctors, loading }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  if (loading) return <p style={{ color: "#ccc" }}>Loading...</p>;
  if (!doctors.length) return <p style={{ color: "#888" }}>No results found.</p>;

  return (
    <div
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
        border: "1px solid #444",
        color: "#fff",
      }}
    >
      <h4 style={{ color: "#fff" }}>Search Results:</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {doctors.map((doc, index) => (
          <li
            key={doc.user_id || index}
            style={{
              padding: "10px",
              borderBottom: "1px solid #333",
              marginBottom: "8px",
            }}
          >
            <strong style={{ fontSize: "1.1em" }}>{doc.name}</strong>
            <div>Rating: ⭐ {doc.rating || "N/A"}</div>
            <div>Fee: ${Number(doc.consultation_fee).toFixed(2)}</div>
            {doc.qualifications && doc.qualifications.length > 0 && (
              <div style={{ marginTop: "5px" }}>
                <em>Qualifications:</em>
                <ul style={{ marginLeft: "20px" }}>
                  {doc.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => setSelectedDoctor(doc)}
              style={{
                marginTop: "8px",
                padding: "5px 10px",
                backgroundColor: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              See Schedule
            </button>
          </li>
        ))}
      </ul>

      {/* Schedule popup modal */}
      {selectedDoctor && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "10px",
              color: "#fff",
              width: "300px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <h4>{selectedDoctor.name}'s Schedule</h4>
            <p>🕒 This is a placeholder schedule. Real data coming soon!</p>
            <button
              onClick={() => setSelectedDoctor(null)}
              style={{
                marginTop: "10px",
                backgroundColor: "#555",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
