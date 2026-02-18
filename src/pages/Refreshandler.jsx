import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Refreshandler = ({ setAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // correct token key
        if(token){
            setAuthenticated(true);

            // agar user login/signup page pe hai, redirect to /home
            if(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'){
                navigate('/home', { replace: true });
            }
        } else {
            setAuthenticated(false);
        }
    }, [location, navigate, setAuthenticated]);

    return null;
}

export default Refreshandler;
