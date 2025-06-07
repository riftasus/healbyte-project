import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CoordinatorPage({setIsLoggedIn}) {
  const [coordinator, setCoordinator] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchCoordinatorProfile() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/coordinator/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch coordinator profile");
        }

        setCoordinator(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCoordinatorProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login");
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!coordinator) {
    return <p>Loading coordinator profile...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={handleLogout} style={{ padding: "6px 16px" }}>
          Logout
        </button>
      </div>
      <h2>Welcome Coordinator {coordinator.name} 👤</h2>
      <p><strong>ID:</strong> {coordinator.user_id || coordinator.id}</p>
      <p><strong>Email:</strong> {coordinator.email}</p>
      <p><strong>Phone:</strong> {coordinator.phone_no || coordinator.phone}</p>
      <p><strong>Salary:</strong> {coordinator.salary}</p>
      <p><strong>Hire Date:</strong> {coordinator.hire_date}</p>
    </div>
  );
}
