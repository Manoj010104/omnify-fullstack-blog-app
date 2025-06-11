import axios from 'axios';

// Base URL for your backend API. This value is sourced from frontend/.env
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include the Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Get the JWT access token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach it as a Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors, like token expiration (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If a 401 Unauthorized response is received, it might mean the token is expired or invalid
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized request or token expired. Clearing tokens and redirecting to login.');
      // Clear all authentication-related items from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      // Optionally, force a page reload to trigger login redirect
      // window.location.href = '/login'; // This might cause a full page refresh, history.push is smoother if in a component
    }
    return Promise.reject(error);
  }
);

export default api;