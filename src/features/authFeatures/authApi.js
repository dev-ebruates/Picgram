import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5148",
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
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApi;
