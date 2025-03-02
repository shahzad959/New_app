import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const { name, specialty, rating, image } = doctor;

  return (
    <div className="doctor-card">
      <img src={image} alt={name} className="doctor-card-image" />
      <h3>{name}</h3>
      <p>{specialty}</p>
      <p>Rating: {rating} ⭐</p>
    </div>
  );
};

export default DoctorCard; // Ensure DoctorCard is exported