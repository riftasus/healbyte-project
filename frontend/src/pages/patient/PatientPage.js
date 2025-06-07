import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientPage({ setIsLoggedIn }) {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchPatientProfile() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/patient/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch patient profile");
        }

        setPatient(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchPatientProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login");
  }

   function handleSearchDoctors() {
    navigate("/search-doctors");
  }


  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!patient) {
    return <p>Loading patient profile...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={handleLogout} style={{ padding: "6px 16px" }}>
          Logout
        </button>
      </div>
      <h2>Welcome Patient {patient.name} 👤</h2>
      <p><strong>ID:</strong> {patient.user_id || patient.id}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Phone:</strong> {patient.phone_no || patient.phone}</p>
      <p><strong>Allergies:</strong> {patient.allergies}</p>
      <p><strong>Blood Type:</strong> {patient.blood_type}</p>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleSearchDoctors} style={{ padding: "8px 20px", fontSize: "16px" }}>
          🔍 Search Doctors
        </button>
      </div>
    </div>
  );
}
