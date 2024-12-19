import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5148",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  
  }),  endpoints: (builder) => ({
    getAllStories: builder.query({
      query: () => "/stories/latest",
    }),
    createStory: builder.mutation({
      query: (credentials) => ({
        url: "/stories",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    getAllStoriesByUsername: builder.query({
      query: (username) => `/stories/${username}`,
    }),
  }),
});
export const {
  useGetAllStoriesQuery,
  useCreateStoryMutation,
  useGetAllStoriesByUsernameQuery,
} = storyApi;
