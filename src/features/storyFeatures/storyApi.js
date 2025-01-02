import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken } from "../authFeatures/authSlice";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5148",
    prepareHeaders: (headers, { getState }) => {
      // Redux store'dan token'ı al
      const token = selectCurrentToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      // Content type header'ı ekle
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllStories: builder.query({
      query: () => "/stories/latest",
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
    }),
    createStory: builder.mutation({
      query: (credentials) => ({
        url: "/stories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),
    getAllStoriesByUsername: builder.query({
      query: (username) => `/stories/${username}`,
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
    }),
  }),
});
export const {
  useGetAllStoriesQuery,
  useCreateStoryMutation,
  useGetAllStoriesByUsernameQuery,
} = storyApi;
