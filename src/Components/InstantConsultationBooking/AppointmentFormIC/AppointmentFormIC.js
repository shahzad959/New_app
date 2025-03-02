import React, { useState } from "react";
import "./AppointmentFormIC.css";

const AppointmentFormIC = ({ onClose, doctorName, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    appointmentTime: "",
    timeSlot: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    }
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Appointment time is required";
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = "Time slot is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(); // Notify parent component of successful submission
      alert("Appointment booked successfully!");
      onClose(); // Close the form
    }
  };

  return (
    <div className="appointment-form-overlay">
      <div className="appointment-form">
        <h2>Book Appointment with {doctorName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
            />
            {errors.patientName && (
              <span className="error">{errors.patientName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Appointment Date:</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
            />
            {errors.appointmentDate && (
              <span className="error">{errors.appointmentDate}</span>
            )}
          </div>
          <div className="form-group">
            <label>Appointment Time:</label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
            />
            {errors.appointmentTime && (
              <span className="error">{errors.appointmentTime}</span>
            )}
          </div>
          <div className="form-group">
            <label>Time Slot:</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
            >
              <option value="">Select a time slot</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
              <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
            </select>
            {errors.timeSlot && (
              <span className="error">{errors.timeSlot}</span>
            )}
          </div>
          <div className="form-actions">
            <button type="submit">Book Appointment</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormIC;