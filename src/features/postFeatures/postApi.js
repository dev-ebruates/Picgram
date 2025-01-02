import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrentToken, selectCurrentUsername } from "../authFeatures/authSlice";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5148",
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
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
      },
      providesTags: ["Posts"],
    }),
    getAllByUsername: builder.query({
      query: (username) => ({
        url: `/user-posts/${username}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return Array.isArray(response.data) ? response.data : [];
        // return {
        //   data: Array.isArray(response.data) ? response.data : [],
        //   message: response.message,
        // };
      },
      providesTags: ["UserPosts"],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      async onQueryStarted(post, { dispatch, queryFulfilled, getState }) {

        console.log("state", getState());
        const patchAllPosts = dispatch(
          postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            console.log("getAllPosts", post);
            draft.unshift(post);
          })
        );

        const patchUserPosts = dispatch(
          postApi.util.updateQueryData(
            "getAllByUsername",
            selectCurrentUsername(getState()),
            (draft) => {
              console.log("getAllByUsername", post);
              draft.unshift(post);
            }
          )
        );

        try {
          const { data: createdPost } = await queryFulfilled;
          // Gerçek API yanıtı ile güncelle
          dispatch(
            postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
              console.log("getAllPosts api", post);
              const index = draft.findIndex((p) => p.id === post.id);
              if (index !== -1) draft[index] = createdPost.data;
            })
          );

          dispatch(
            postApi.util.updateQueryData(
              "getAllByUsername",
              selectCurrentUsername(getState()),
              (draft) => {
                console.log("getAllByUsername api", post);
                const index = draft.findIndex((p) => p.id === post.id);
                if (index !== -1) draft[index] = createdPost.data;
              }
            )
          );
        } catch (error) {
          console.log("error", error);
          patchAllPosts.undo();
          patchUserPosts.undo();
          console.error("Gönderi oluşturulurken hata oluştu:", error);
        }
      },
    }),
    // updatePost: builder.mutation({
    //   query: ({ id, caption }) => ({
    //     url: `/posts/${id}`,
    //     method: "PUT",
    //     body: { caption },
    //   }),
    //   async onQueryStarted({ id, caption }, { dispatch, queryFulfilled }) {
    //     const patchAllPosts = dispatch(
    //       postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
    //         const post = draft.find((p) => p.id === id);
    //         if (post) post.caption = caption; // Geçici güncelleme
    //       })
    //     );

    //     const patchUserPosts = dispatch(
    //       postApi.util.updateQueryData(
    //         "getAllByUsername",
    //         undefined,
    //         (draft) => {
    //           const post = draft.find((p) => p.id === id);
    //           if (post) post.caption = caption; // Geçici güncelleme
    //         }
    //       )
    //     );

    //     try {
    //       await queryFulfilled; // Güncellemenin başarıyla tamamlanmasını bekle
    //     } catch (error) {
    //       patchAllPosts.undo();
    //       patchUserPosts.undo();
    //       console.error("Gönderi güncellenirken hata oluştu:", error);
    //     }
    //   },
    // }),
    // deletePost: builder.mutation({
    //   query: (id) => ({
    //     url: `/posts/${id}`,
    //     method: "DELETE",
    //   }),
    //   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    //     const patchAllPosts = dispatch(
    //       postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
    //         draft.data = draft.filter((post) => post.id !== id); // Geçici silme
    //       })
    //     );

    //     const patchUserPosts = dispatch(
    //       postApi.util.updateQueryData(
    //         "getAllByUsername",
    //         undefined,
    //         (draft) => {
    //           draft.data = draft.filter((post) => post.id !== id); // Geçici silme
    //         }
    //       )
    //     );

    //     try {
    //       await queryFulfilled; // Silmenin başarıyla tamamlanmasını bekle
    //     } catch (error) {
    //       patchAllPosts.undo();
    //       patchUserPosts.undo();
    //       console.error("Gönderi silinirken hata oluştu:", error);
    //     }
    //   },
    // }),
    likedPost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchAllPosts = dispatch(
          postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) {
              post.isLiked = !post.isLiked;
              if (post.isLiked) {
                post.likeCount = (post.likeCount || 0) + 1;
              } else {
                post.likeCount = (post.likeCount || 1) - 1;
              }
            }
          })
        );

        const patchUserPosts = dispatch(
          postApi.util.updateQueryData(
            "getAllByUsername",
            undefined,
            (draft) => {
              const post = draft.find((p) => p.id === id);
              if (post) {
                console.log("post", post);
                console.log("post.likes", post.likeCount);
                post.isLiked = !post.isLiked;
                post.likeCount = (post.likeCount || 0) + 1;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchAllPosts.undo();
          patchUserPosts.undo();
          console.error("Gönderi beğenilirken hata oluştu:", error);
        }
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetAllByUsernameQuery,
  // useUpdatePostMutation,
  // useDeletePostMutation,
  useLikedPostMutation,
} = postApi;
