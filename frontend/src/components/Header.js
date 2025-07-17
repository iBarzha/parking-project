import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            🚗 Smart Parking System
          </Link>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/reservations" className="hover:underline">
                  My Reservations
                </Link>
                <span className="text-blue-200">
                  Hello, {user?.username}!
                </span>
                <button 
                  onClick={handleLogout}
                  className="hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;