import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken } from "../authFeatures/authSlice";

export const pictureApi = createApi({
  reducerPath: "pictureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Redux store'dan token'ı al
      const token = selectCurrentToken(getState());
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPicture: builder.mutation({
      query: (formData) => ({
        url: "/picture/upload",
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
    }),
  }),
});

export const { useCreatePictureMutation } = pictureApi;
