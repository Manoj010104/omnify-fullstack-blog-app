import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Correct import path

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show a global loading indicator while authentication status is being determined
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 text-xl text-gray-700 animate-pulse">
            Loading application...
        </div>
    );
  }

  // If not authenticated, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;