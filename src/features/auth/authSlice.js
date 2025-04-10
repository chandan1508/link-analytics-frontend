



import { createSlice } from '@reduxjs/toolkit';

// Helper function to load initial state from localStorage
const loadInitialState = () => {
  const authData = localStorage.getItem('authData');
  if (authData) {
    const { user, token } = JSON.parse(authData);
    return {
      user,
      token,
      status: 'idle',
      error: null
    };
  }
  return {
    user: null,
    token: null,
    status: 'idle',
    error: null
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('authData');
    },
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('authData', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token
      }));
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { logout, setAuthData, clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;