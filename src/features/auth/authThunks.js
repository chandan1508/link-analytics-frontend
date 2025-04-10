


import { login as loginApi } from '../../api/auth';
import { setAuthData } from './authSlice';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await loginApi(credentials);
    dispatch(setAuthData({
      user: response.user,
      token: response.token
    }));
    return response;
  } catch (error) {
    throw error;
  }
};

export const initializeAuth = () => (dispatch) => {
  const authData = localStorage.getItem('authData');
  if (authData) {
    const { user, token } = JSON.parse(authData);
    dispatch(setAuthData({ user, token }));
  }
};

export const verifyToken = () => async (dispatch, getState) => {
  const token = selectAuthToken(getState());
  if (!token) return false;
  
  try {
    // Add your token verification API call here
    // const isValid = await verifyTokenApi(token);
    // return isValid;
    return true; // Temporarily assume token is valid
  } catch (error) {
    dispatch(logout());
    return false;
  }
};