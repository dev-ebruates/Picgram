import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5148",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // .enhanceEndpoints({
  //   // eslint-disable-next-line no-unused-vars
  //   handleError: async (error, args, baseQueryApi) => {
  //     if (error?.status === 401) {
  //       localStorage.removeItem("authToken");
  //       window.location.href = "/login";
  //     }
  //   },
  // }),
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
  }),
});

export const { useCreateUserMutation, useUpdateUserBioMutation } = userApi;
