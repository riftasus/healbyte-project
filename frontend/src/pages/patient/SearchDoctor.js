import React, { useState } from "react";
import TopRatedDoctors from "../../components/patient/TopRatedDoctors";
import DoctorSearchForm from "../../components/patient/DoctorSearchForm";
import DoctorSearchResults from "../../components/patient/DoctorSearchResults";

export default function SearchDoctor() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ searchType, searchQuery, feeRange }) => {
    setLoading(true);
    let url = "http://localhost:5000/api/doctors/search?";
    if (searchType === "name") {
      url += `name=${encodeURIComponent(searchQuery)}`;
    } else if (searchType === "specialty") {
      url += `specialty=${encodeURIComponent(searchQuery)}`;
    } else if (searchType === "fee") {
      url += `minFee=${feeRange.min}&maxFee=${feeRange.max}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      setSearchResults(data.doctors || []);
    } catch {
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