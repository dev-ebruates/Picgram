import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken } from "../authFeatures/authSlice";

export const searchApi = createApi({
  reducerPath: "searchApi",
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
    search: builder.query({
      query: (searchParameter) => ({
        url: `/search/${searchParameter}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => {
        if (!response || !response.data) return [];
        return Array.isArray(response.data) ? response.data : [];
      },
    }),
  }),
});

export const { useSearchQuery } = searchApi;