import React, { useState } from "react";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./InstantConsultationBooking/DoctorCard/DoctorCard";
import "./BookingConsultation.css"; // Import CSS for styling

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      experience: 10,
      rating: 4.7,
      image: "https://example.com/doctor1.jpg",
      careerProfile: "Cardiologist with expertise in heart-related issues.",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      experience: 8,
      rating: 4.5,
      image: "https://example.com/doctor2.jpg",
      careerProfile: "Dermatologist specializing in skin care.",
    },
  ]);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Handle search functionality
  const handleSearch = (query) => {
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="booking-consultation-container">
      <h1>Book a Consultation</h1>
      <FindDoctorSearch onSearch={handleSearch} />
      <div className="doctors-list">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default BookingConsultation;