import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5148',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
