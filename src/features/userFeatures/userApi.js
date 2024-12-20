import { baseApi } from "../baseApi/baseApi";
export const userApi = baseApi.injectEndpoints({
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
    getMyProfile: builder.query({
      query: () => "/my-profile",
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserBioMutation, useGetMyProfileQuery } = userApi;
