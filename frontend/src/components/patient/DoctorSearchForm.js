import React, { useState } from "react";

export default function DoctorSearchForm({ onSearch }) {
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [feeRange, setFeeRange] = useState({ min: "", max: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchType, searchQuery, feeRange });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <label>
        Search by:{" "}
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="specialty">Subject/Specialty</option>
          <option value="fee">Consultation Fee</option>
        </select>
      </label>
      {searchType === "fee" ? (
        <span style={{ marginLeft: 16 }}>
          Min:{" "}
          <input
            type="number"
            value={feeRange.min}
            onChange={e => setFeeRange({ ...feeRange, min: e.target.value })}
            style={{ width: 70 }}
          />
          Max:{" "}
          <input
            type="number"
            value={feeRange.max}
            onChange={e => setFeeRange({ ...feeRange, max: e.target.value })}
            style={{ width: 70 }}
          />
        </span>
      ) : (
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={
            searchType === "name"
              ? "Enter doctor's name"
              : "Enter subject/specialty"
          }
          style={{ marginLeft: 16 }}
        />
      )}
      <button type="submit" style={{ marginLeft: 16 }}>
        Search
      </button>
    </form>
  );
}