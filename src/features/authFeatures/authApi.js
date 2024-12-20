import { baseApi } from "../baseApi/baseApi";
export const authApi = baseApi.injectEndpoints({
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
