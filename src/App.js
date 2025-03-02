import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing necessary components from react-router-dom
import Navbar from './Components/Navbar/Navbar'; // Import the Navbar component
import LandingPage from './Components/LandingPage/LandingPage'; // Updated import
import SignUp from './Components/SignUp/SignUp'; // Updated import
import Login from './Components/Login/Login'; // Import the Login component
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';
import DoctorCard from './Components/InstantConsultationBooking/DoctorCard/DoctorCard';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Updated component name */}
          <Route path="/services" element={<h1>Services Page</h1>} /> {/* Example route for the services page */}
          <Route path="/signup" element={<SignUp />} /> {/* Updated component name */}
          <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
          <Route path="/instant-consultation" element={<InstantConsultation/>} />
          <Route path="/appointment-form" element={<AppointmentForm/>} />
          <Route path="/doctor-card" element={<DoctorCard/>} />
          <Route path="/find-doctor-search" element={<FindDoctorSearch/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;