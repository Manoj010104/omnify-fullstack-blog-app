// frontend/src/services/authService.js
import api from '../utils/api';
import { jwtDecode } from 'jwt-decode';

// Helper function to extract a readable error message from Axios error
const getErrorMessage = (error) => {
  let errorMessage = 'An unexpected error occurred.';
  if (error.response && error.response.data) {
    if (typeof error.response.data === 'string') {
      errorMessage = error.response.data; // e.g., "Not found."
    } else if (error.response.data.detail) {
      errorMessage = error.response.data.detail; // Most common for DRF generic errors ("Authentication credentials were not provided.")
    } else if (error.response.data.messages && Array.isArray(error.response.data.messages)) {
      errorMessage = error.response.data.messages.map(msg => msg.message).join('; '); // Simple JWT messages
    } else if (typeof error.response.data === 'object' && Object.keys(error.response.data).length > 0) {
      // For field-specific validation errors (e.g., {"username": ["This field is required."]})
      errorMessage = Object.values(error.response.data).flat().filter(Boolean).join('; ');
    } else {
      errorMessage = 'An unknown error occurred from the server.'; // Fallback for unhandled empty objects
    }
  } else if (error.message) {
    errorMessage = error.message; // Network errors from Axios (e.g., "Network Error")
  }
  return errorMessage;
};

const register = async (email, password) => {
  try {
    const response = await api.post('/auth/register/', { username: email, email, password });
    return response.data;
  } catch (error) {
    console.error("Registration error details:", error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post('/token/', { username: email, password });
    const { access: accessToken, refresh: refreshToken } = response.data;

    const decodedToken = jwtDecode(accessToken);
    const user = {
      id: decodedToken.user_id,
      // Use email or username from token. UserSerializer sets username = email.
      email: decodedToken.email || decodedToken.username
    };

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error("Login error details:", error.response?.data || error.message || error);
    throw getErrorMessage(error); // Throw the extracted string
  }
};

const authService = {
  register,
  login,
};

export default authService;