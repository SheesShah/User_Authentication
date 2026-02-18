import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';
import './App.css';
import Refreshandler from './pages/Refreshandler';

function App() {
  const [authenticated, setAuthenticated] = useState(false);


  const PrivateRoutes = ({element}) => {
   return authenticated ? element : <Navigate to="/login" />;
  }

  return (
    <div className="App">
     <Refreshandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/home' element={<PrivateRoutes element={<Home />} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
