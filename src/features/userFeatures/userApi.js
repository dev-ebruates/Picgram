import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    updateUserBio: builder.mutation({
      query: (credentials) => ({
        url: "/user-bio",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: (username) => `/profile/${username}`,
    }),
    getMyProfile: builder.query({
      query: () => "/my-profile",
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserBioMutation, useGetProfileQuery, useGetMyProfileQuery } = userApi;
