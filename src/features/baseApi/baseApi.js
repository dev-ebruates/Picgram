import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../authFeatures/authSlice';

// Base API yapılandırması
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('authToken');
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      // Content type header'ı ekle
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 0, // Kullanılmayan verileri hemen temizle
});

// API middleware'i
export const baseApiMiddleware = baseApi.middleware;

// Error handling middleware
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // Token geçersizse veya süresi dolmuşsa otomatik logout
  if (action.type.endsWith('/rejected')) {
    if (action.payload?.status === 401) {
      api.dispatch(logout());
    }
  }
  return next(action);
};

// Reset state action ve reducer'ı
export const RESET_STATE_ACTION_TYPE = 'baseApi/resetApiState';

export const resetApiState = () => ({
  type: RESET_STATE_ACTION_TYPE
});
