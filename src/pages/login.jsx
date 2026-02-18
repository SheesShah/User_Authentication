import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Navigation hook
  const navigate = useNavigate();

  // Input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      const { message, success, token } = data; // JWT token backend se

      if (success) {
        // Toast message
        toast.success(message || "Login Successful 🎉");

        // JWT token localStorage me save
        if(token) {
          localStorage.setItem('jwtToken', token);
        }

        // Redirect after 1 second
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        toast.error(message || "Invalid Credentials");
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error("Server Error 😞");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit}>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        {/* Signup Link */}
        <span className="d-block text-center mt-3">
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>

      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
