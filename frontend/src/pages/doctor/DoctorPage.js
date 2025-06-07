import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorPage({ setIsLoggedIn }) {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/doctor/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch doctor profile");
        }

        setDoctor(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchDoctorProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login");
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!doctor) {
    return <p>Loading doctor profile...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={handleLogout} style={{ padding: "6px 16px" }}>
          Logout
        </button>
      </div>
      <h2>Welcome Dr. {doctor.name} 🩺</h2>
      <p><strong>ID:</strong> {doctor.user_id || doctor.id}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phone_no || doctor.phone}</p>
    </div>
  );
}