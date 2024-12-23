import { baseApi } from "../baseApi/baseApi";
export const userApi = baseApi.injectEndpoints({
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
