import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure 'jwt-decode' is installed via npm

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores basic user info (id, email) extracted from token
  const [token, setToken] = useState(null); // Stores the access_token string
  const [loading, setLoading] = useState(true); // Manages loading state during initial authentication check

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user'); // Also check for stored user object consistency

    if (storedAccessToken && storedUser) {
      try {
        const decodedToken = jwtDecode(storedAccessToken);
        // Check if the token is still valid (expiration time 'exp' is in seconds)
        if (decodedToken.exp * 1000 > Date.now()) {
          const currentUser = {
            id: decodedToken.user_id, // User ID from JWT payload
            email: decodedToken.email || decodedToken.username // User email from JWT payload (Django uses username as email)
          };
          setUser(currentUser);
          setToken(storedAccessToken);
        } else {
          // If token has expired, log out the user automatically
          console.log("Access token expired during app load. Logging out.");
          localStorage.clear(); // Clear all stale tokens
        }
      } catch (error) {
        // Catch errors during token decoding (e.g., malformed token)
        console.error("Failed to decode token or token is invalid on load:", error);
        localStorage.clear(); // Clear potentially corrupt tokens
      }
    }
    setLoading(false); // Authentication check completed
  }, []);

  // Handles user login: stores tokens and user data in localStorage and updates state
  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken); // Refresh token stored for potential future use
    localStorage.setItem('user', JSON.stringify(userData)); // Store basic user data directly for quicker access

    setToken(accessToken);
    setUser(userData);
  };

  // Handles user logout: clears all authentication-related data from localStorage and state
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Determines if the user is currently authenticated (has a token and user object)
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};