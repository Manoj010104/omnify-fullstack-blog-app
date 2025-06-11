import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / App Name */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight hover:opacity-80 transition-opacity"
        >
          🚀 Blogify
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 font-medium text-sm">
          {user ? (
            <>
              <button
                onClick={() => navigate('/create-blog')}
                className="py-2 px-4 rounded-md bg-primary text-white hover:bg-primary/90 
                         transition-all duration-200 font-medium shadow-sm"
              >
                + Create Blog
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 hidden sm:inline">
                  Welcome, {user.username || 'User'}
                </span>
                
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary transition-colors duration-200
                           px-3 py-1 rounded-md hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary transition-colors duration-200
                         px-3 py-1 rounded-md hover:bg-gray-50"
              >
                Login
              </Link>
              
              <Link
                to="/signup"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90
                         transition-colors duration-200 shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;