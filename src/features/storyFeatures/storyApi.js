import { baseApi } from "../baseApi/baseApi";
export const storyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStories: builder.query({
      query: () => "/stories/latest",
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
    }),
  }),
});
export const {
  useGetAllStoriesQuery,
  useCreateStoryMutation,
  useGetAllStoriesByUsernameQuery,
} = storyApi;
