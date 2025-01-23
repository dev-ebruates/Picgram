import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken } from "../authFeatures/authSlice";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
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
    getAllReports: builder.query({
      query: () => "/getAllReports",
      // transformResponse: (response) => {
      //   return Array.isArray(response.data) ? response.data : [];
      // },
    }),
  }),
});
export const { useGetAllReportsQuery } = reportsApi;
