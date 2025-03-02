import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Basic form validation
  const validateForm = () => {
    const newErrors = [];
    if (!name) newErrors.push('Name is required.');
    if (!email) newErrors.push('Email is required.');
    if (!phone) newErrors.push('Phone number is required.');
    if (!password || password.length < 6) newErrors.push('Password must be at least 6 characters.');
    return newErrors;
  };

  // Handle registration
  const register = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const json = await response.json();

      if (response.ok) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);
        navigate('/');
        window.location.reload();
      } else {
        if (json.errors) {
          setErrors(json.errors.map((error) => error.msg));
        } else {
          setErrors([json.error || 'Registration failed.']);
        }
      }
    } catch (error) {
      setErrors(['Something went wrong. Please try again later.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <h2>Create Your Account</h2>

            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Input */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Create a password"
              />
            </div>

            {/* Display Errors */}
            {errors.length > 0 && (
              <div className="error-container">
                {errors.map((error, index) => (
                  <div key={index} className="err" style={{ color: 'red' }}>
                    {error}
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn1" disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>

            {/* Already have an account? */}
            <p className="login-link">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
