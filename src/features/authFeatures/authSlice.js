import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('authToken'),
    isAuthenticated: !!localStorage.getItem('isAuthenticated')
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('authToken', payload.token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', payload.username);
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
