import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // adjust to your backend base URL

// Login user
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);

  // Save user and token to localStorage
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user from localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// AuthService object
const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
