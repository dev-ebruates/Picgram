import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Base API yapılandırması
export const baseApi = createApi({
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
});
// Error handling middleware
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (action?.error?.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return next(action);
};
