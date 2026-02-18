// React aur useState hook import kar rahe hain
import React, { useState } from 'react';

// Bootstrap CSS import kar rahe hain styling ke liye
import 'bootstrap/dist/css/bootstrap.min.css';

// React Toastify se toast aur container import
import { ToastContainer, toast } from 'react-toastify';

// React Toastify ki CSS file
import 'react-toastify/dist/ReactToastify.css';

// React Router se Link (navigation link) aur useNavigate (redirect) import
import { Link, useNavigate } from 'react-router-dom';

// Functional Component start
const Signup = () => {

  // Form ka state create kar rahe hain
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Page redirect ke liye hook
  const navigate = useNavigate();

  // Input change handle karne ka function
  const handleChange = (e) => {
    setFormData({
      ...formData, // purana data copy karo
      [e.target.name]: e.target.value // jis input ka name hai uski value update karo
    });
  };

  // Form submit handle karne ka function
  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload rokta hai

    // Agar koi field empty hai to error show karo
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    try {
      // Backend API call
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: 'POST', // request type
        headers: {
          'Content-Type': 'application/json' // JSON data bhej rahe hain
        },
        body: JSON.stringify(formData) // form data ko JSON me convert karke bhejna
      });

      // Backend se response JSON me lena
      const data = await response.json();

      // Backend se message aur success value destructure karna
      const { message, success } = data;

      // Agar signup successful hai
      if (success) {
        toast.success(message || "Signup Successful 🎉");

        // 1 second baad login page pe redirect
        setTimeout(() => {
          navigate('/login');
        }, 1000);

      } else {
        // Agar backend ne success false bheja
        toast.error(message || "Signup Failed");
      }

    } catch (error) {
      // Agar server error aaye
      console.error('Error:', error);
      toast.error("Server Error 😞");
    }
  };

  // UI Return ho raha hai
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      
      {/* Heading */}
      <h2 className="text-center mb-4">Signup</h2>

      {/* Form start */}
      <form onSubmit={handleSubmit}>

        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name} // state se value
            onChange={handleChange} // change handle
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password" // browser suggestion control
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>

        {/* Login Link */}
        <span className="d-block text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </span>

      </form>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
};

// Component export
export default Signup;
