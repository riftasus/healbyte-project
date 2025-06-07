import React, { useEffect, useState } from "react";

export default function TopRatedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace URL with your actual endpoint
    fetch("http://localhost:5000/api/doctors/top-rated")
      .then(res => res.json())
      .then(data => {
        setDoctors(data.doctors || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading top rated doctors...</p>;

  return (
    <div>
      <h3>Top Rated Doctors</h3>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.id}>
            <strong>{doc.name}</strong>
            <div>Specialty: {doc.specialty}</div>
            <div>Rating: {doc.rating} ⭐</div>
            <div>Fee: ${doc.fee}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}