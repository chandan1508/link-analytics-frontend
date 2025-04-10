// import axios from 'axios';
// import { API_BASE_URL } from './url';

// export const login = async (credentials) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
//     // Store token and user data in a structured way
//     const authData = {
//       token: response.data.token,
//       user: response.data.user
//     };
//     return authData;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };

// export const getCurrentUser = () => {
//   const authData = localStorage.getItem('authData');
//   return authData ? JSON.parse(authData) : null;
// };


import axios from 'axios';
import { API_BASE_URL } from './url';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
    return {
      user: response.data.user,
      token: response.data.token
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.isValid;
  } catch (error) {
    return false;
  }
};

export const getCurrentAuthData = () => {
  const authData = localStorage.getItem('authData');
  return authData ? JSON.parse(authData) : null;
};