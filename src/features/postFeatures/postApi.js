import { baseApi } from "../baseApi/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET"
      }),
      transformResponse: (response) => {
        // API yanıtını dönüştür
        return {
          data: Array.isArray(response.data) ? response.data : [],
          message: response.message
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
    getAllByUserId: builder.query({
      query: () => ({
        url: "/user-posts",
        method: "GET"
      }),
      transformResponse: (response) => {
        return {
          data: Array.isArray(response.data) ? response.data : [],
          message: response.message
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
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetAllByUserIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
