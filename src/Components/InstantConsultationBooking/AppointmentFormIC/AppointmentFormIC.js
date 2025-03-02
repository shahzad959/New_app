import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Call the onSubmit prop with the form data
    onSubmit({ name, phoneNumber, selectedSlot });

    // Reset form fields
    setName('');
    setPhoneNumber('');
    setSelectedSlot(null);
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;