import { baseApi } from "../baseApi/baseApi";
export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({  
    search: builder.query({
      query: (searchParameter) => ({
        url: `/search/${searchParameter}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSearchQuery } = searchApi;