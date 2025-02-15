import { createSlice } from '@reduxjs/toolkit';
// import { SignalRService } from '../../components/signalR/SignalRService.js';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('authToken'),
    isAuthenticated: !!localStorage.getItem('isAuthenticated'),
    role: localStorage.getItem('role')
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.role = payload.role
      localStorage.setItem('authToken', payload.token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', payload.username);
      localStorage.setItem('role', payload.role);
    },
    logout: (state) => {
      // SignalRService.getInstance().stopConnection();
      // SignalR bağlantısını kapat
     

      // Önce local storage'dan token'ı sil
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('role');

      // Sonra state'i sıfırla
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role

export default authSlice.reducer;
