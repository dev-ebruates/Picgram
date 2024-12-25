import { baseApi } from "../baseApi/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      transformResponse: (response) => {
        // API yanıtını dönüştür
        return {
          data: Array.isArray(response.data) ? response.data : [],
          message: response.message,
        };
      },
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts", "UserPosts"],
    }),
    getAllByUsername: builder.query({
      query: (username) => ({
        url: `/user-posts/${username}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          data: Array.isArray(response.data) ? response.data : [],
          message: response.message,
        };
      },
      providesTags: ["UserPosts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, caption }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: { caption },
      }),
      invalidatesTags: ["Posts", "UserPosts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts", "UserPosts"],
    }),
    likedPost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["Posts", "UserPosts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetAllByUsernameQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikedPostMutation,
} = postApi;
