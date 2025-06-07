import React, { useState } from "react";

export default function DoctorSearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [feeRange, setFeeRange] = useState({ min: "", max: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchQuery: searchQuery.trim(),
      specialty: specialty.trim(),
      feeRange: {
        min: feeRange.min,
        max: feeRange.max
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div>
        <label>
          Name:{" "}
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Enter doctor's name"
            style={{ width: 160 }}
          />
        </label>
      </div>
      <div>
        <label>
          Specialty:{" "}
          <input
            type="text"
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            placeholder="Enter specialty"
            style={{ width: 140 }}
          />
        </label>
      </div>
      <div>
        <label>
          Min Fee:{" "}
          <input
            type="number"
            value={feeRange.min}
            onChange={e => setFeeRange({ ...feeRange, min: e.target.value })}
            style={{ width: 80 }}
            min={0}
          />
        </label>
      </div>
      <div>
        <label>
          Max Fee:{" "}
          <input
            type="number"
            value={feeRange.max}
            onChange={e => setFeeRange({ ...feeRange, max: e.target.value })}
            style={{ width: 80 }}
            min={0}
          />
        </label>
      </div>
      <button type="submit" style={{ marginLeft: 8 }}>
        Search
      </button>
    </form>
  );
}