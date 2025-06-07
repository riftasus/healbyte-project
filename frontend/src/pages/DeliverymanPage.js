import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeliverymanPage({setIsLoggedIn}) {
  const [deliveryman, setDeliveryman] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchDeliverymanProfile() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/deliveryman/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch deliveryman profile");
        }

        setDeliveryman(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchDeliverymanProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/login");
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!deliveryman) {
    return <p>Loading deliveryman profile...</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={handleLogout} style={{ padding: "6px 16px" }}>
          Logout
        </button>
      </div>
      <h2>Welcome Deliveryman {deliveryman.name} 👤</h2>
      <p><strong>ID:</strong> {deliveryman.user_id || deliveryman.id}</p>
      <p><strong>Email:</strong> {deliveryman.email}</p>
      <p><strong>Phone:</strong> {deliveryman.phone_no || deliveryman.phone}</p>
      <p><strong>Salary:</strong> {deliveryman.salary}</p>
      <p><strong>Hire Date:</strong> {deliveryman.hire_date}</p>
    </div>
  );
}
