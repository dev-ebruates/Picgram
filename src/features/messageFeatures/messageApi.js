import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  selectCurrentToken
} from "../authFeatures/authSlice";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Redux store'dan token'ı al
      const token = selectCurrentToken(getState());
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // Content type header'ı ekle
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: "/conversations",
        method: "GET",
      }),
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
      providesTags: ["Conversations"],
    }),
    getRelatedMessages: builder.query({
      query: (senderUserId) => ({
        url: `/relatedMessages/${senderUserId}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
      providesTags: ["RelatedMessages"],
    }),
 
    createMessage: builder.mutation({
      query: (message) => ({
        url: "/messages",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Conversations","RelatedMessages" ]
    }),
  }),
});
export const {
  useGetConversationsQuery,
  useGetRelatedMessagesQuery,
  useCreateMessageMutation
} = messageApi;