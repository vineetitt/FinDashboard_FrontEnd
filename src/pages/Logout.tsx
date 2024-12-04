import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        logout(); 
        localStorage.removeItem('jwt'); 
        navigate('/'); 
    }, [logout, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow rounded-lg max-w-md w-full text-center">
                <h2 className="text-xl font-bold">Logging Out...</h2>
                <p className="text-gray-600 mt-2">You will be redirected shortly.</p>
            </div>
        </div>
    );
};

export default Logout;
