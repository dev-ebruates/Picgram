import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API yapılandırması
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5148',
    prepareHeaders: (headers) => {
      // Auth token'ı ekle
      const token = localStorage.getItem('authToken');
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
  if (action?.error?.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return next(action);
};

// Reset state action ve reducer'ı
export const RESET_STATE_ACTION_TYPE = 'baseApi/resetApiState';

export const resetApiState = () => ({
  type: RESET_STATE_ACTION_TYPE
});
