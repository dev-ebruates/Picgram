import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Posts', 'UserPosts'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts', 'UserPosts'],
    }),
    getAllByUserId: builder.query({
      query: () => '/user-posts',
      providesTags: ['UserPosts'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetAllByUserIdQuery,
} = postApi;
