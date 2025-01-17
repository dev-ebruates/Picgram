import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
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
    updateUserProfilePicture: builder.mutation({
      query: (credentials) => ({
        url: "/user-profilePicture",
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
    getAllUser: builder.query({
      query: () => `/users`,
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/delete`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserBioMutation, useGetProfileQuery, useGetMyProfileQuery,useGetAllUserQuery,useDeleteUserMutation,useUpdateUserProfilePictureMutation } = userApi;
