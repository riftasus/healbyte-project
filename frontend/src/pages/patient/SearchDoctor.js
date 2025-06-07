import React, { useState } from "react";
import TopRatedDoctors from "../../components/patient/TopRatedDoctors";
import DoctorSearchForm from "../../components/patient/DoctorSearchForm";
import DoctorSearchResults from "../../components/patient/DoctorSearchResults";

export default function SearchDoctor() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ searchQuery, specialty, feeRange }) => {
    setLoading(true);

    let url = "http://localhost:5000/doctor/search?";
    const params = [];

    // Handle name
    if (searchQuery && searchQuery.trim() !== "") {
      params.push(`name=${encodeURIComponent(searchQuery.trim())}`);
    }

    // Handle specialty
    if (specialty && specialty.trim() !== "") {
      params.push(`specialty=${encodeURIComponent(specialty.trim())}`);
    }

    // Handle fee range
    const min = feeRange?.min;
    const max = feeRange?.max;

    if (min !== undefined && min !== "" && !isNaN(min)) {
      params.push(`minFee=${min}`);
    }

    if (max !== undefined && max !== "" && !isNaN(max)) {
      params.push(`maxFee=${max}`);
    }

    if (params.length > 0) {
      url += params.join("&");
    }

    try {
      // const res = await fetch(url);
      const token = localStorage.getItem("token");

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token, // 👈 add this
        },
      });
      const data = await res.json();
      setSearchResults(data.doctors || []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }

    setLoading(false);
  };


  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ flex: 1, borderRight: "1px solid #eee", paddingRight: 24 }}>
        <TopRatedDoctors />
      </div>
      <div style={{ flex: 2, paddingLeft: 24 }}>
        <DoctorSearchForm onSearch={handleSearch} />
        <DoctorSearchResults doctors={searchResults} loading={loading} />
      </div>
    </div>
  );
}