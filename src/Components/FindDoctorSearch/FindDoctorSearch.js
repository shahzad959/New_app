import React, { useState } from "react";
import "./FindDoctorSearch.css";

const FindDoctorSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Notify parent component of search query
  };

  return (
    <div className="find-doctor-search">
      <input
        type="text"
        placeholder="Search by specialty or doctor's name..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default FindDoctorSearch;