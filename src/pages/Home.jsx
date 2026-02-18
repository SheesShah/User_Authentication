import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  
  const [loggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    // Check if JWT token exists in localStorage
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
    setTimeout(() => {
      navigate('/login');
    }
    
    , 1000);
  };
  
  return (
   <>
    <div className='container w-50 d-flex flex-column align-items-center justify-content-center mt-5 p-4 border rounded'>
      <div>{loggedIn ? "Welcome to Home Page!" : "Please login to access Home Page."}</div>
    <button onClick={handleLogout} className="btn btn-primary w-100 mt-2">Logout</button>
    <ToastContainer position="top-center" />
    </div>
   </>
  )
}

export default Home