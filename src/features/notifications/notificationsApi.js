import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  selectCurrentToken,
} from "../authFeatures/authSlice";

export const notificationsApi = createApi({
  reducerPath: "notificationApi",
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
    getAllNotificationByUserId: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
      providesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationByUserIdQuery
} = notificationsApi;
