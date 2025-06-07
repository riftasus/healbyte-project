import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConductorPage({setIsLoggedIn}) {
  const [conductor, setConductor] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchConductorProfile() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/conductor/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch conductor profile");
        }

        setConductor(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchConductorProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login");
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!conductor) {
    return <p>Loading conductor profile...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={handleLogout} style={{ padding: "6px 16px" }}>
          Logout
        </button>
      </div>
      <h2>Welcome Conductor {conductor.name} 👤</h2>
      <p><strong>ID:</strong> {conductor.user_id || conductor.id}</p>
      <p><strong>Email:</strong> {conductor.email}</p>
      <p><strong>Phone:</strong> {conductor.phone_no || conductor.phone}</p>
      <p><strong>Salary:</strong> {conductor.salary}</p>
      <p><strong>Hire Date:</strong> {conductor.hire_date}</p>
    </div>
  );
}
