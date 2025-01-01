import { baseApi } from "../baseApi/baseApi";

export const postApi = baseApi.injectEndpoints({
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
      async onQueryStarted(post, { dispatch, queryFulfilled }) {
        const patchAllPosts = dispatch(
          postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            var oldPost = draft.find((p) => p.id === post.id);
            if (oldPost) {
              oldPost = { ...oldPost, ...post };
            } else {
              draft.unshift(post); // Tüm gönderilerine de geçici olarak ekle
            }
          })
        );

        const patchUserPosts = dispatch(
          postApi.util.updateQueryData(
            "getAllByUsername",
            post.username,
            (draft) => {
              var oldPost = draft.find((p) => p.id === post.id);
              if (oldPost) {
                oldPost = { ...oldPost, ...post };
              } else {
                draft.unshift(post); // Tüm gönderilerine de geçici olarak ekle
              }
            }
          )
        );

        try {
          const { data: createdPost } = await queryFulfilled;
          // Gerçek API yanıtı ile güncelle
          dispatch(
            postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
              const index = draft.findIndex((p) => p.id === post.id);
              if (index !== -1) draft[index] = createdPost.data;
            })
          );

          dispatch(
            postApi.util.updateQueryData(
              "getAllByUsername",
              post.username,
              (draft) => {
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
    updatePost: builder.mutation({
      query: ({ id, caption }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: { caption },
      }),
      async onQueryStarted({ id, caption }, { dispatch, queryFulfilled }) {
        const patchAllPosts = dispatch(
          postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) post.caption = caption; // Geçici güncelleme
          })
        );

        const patchUserPosts = dispatch(
          postApi.util.updateQueryData(
            "getAllByUsername",
            undefined,
            (draft) => {
              const post = draft.find((p) => p.id === id);
              if (post) post.caption = caption; // Geçici güncelleme
            }
          )
        );

        try {
          await queryFulfilled; // Güncellemenin başarıyla tamamlanmasını bekle
        } catch (error) {
          patchAllPosts.undo();
          patchUserPosts.undo();
          console.error("Gönderi güncellenirken hata oluştu:", error);
        }
      },
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchAllPosts = dispatch(
          postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            draft.data = draft.filter((post) => post.id !== id); // Geçici silme
          })
        );

        const patchUserPosts = dispatch(
          postApi.util.updateQueryData(
            "getAllByUsername",
            undefined,
            (draft) => {
              draft.data = draft.filter((post) => post.id !== id); // Geçici silme
            }
          )
        );

        try {
          await queryFulfilled; // Silmenin başarıyla tamamlanmasını bekle
        } catch (error) {
          patchAllPosts.undo();
          patchUserPosts.undo();
          console.error("Gönderi silinirken hata oluştu:", error);
        }
      },
    }),
    likedPost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "PUT",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchAllPosts = dispatch(
          postApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
            const post = draft.find((p) => p.id === id);
            if (post) post.likes = (post.likes || 0) + 1; // Beğeni sayısını geçici olarak artır
          })
        );

        const patchUserPosts = dispatch(
          postApi.util.updateQueryData(
            "getAllByUsername",
            undefined,
            (draft) => {
              const post = draft.find((p) => p.id === id);
              if (post) post.likes = (post.likes || 0) + 1; // Beğeni sayısını geçici olarak artır
            }
          )
        );

        try {
          await queryFulfilled; // Beğeninin başarıyla tamamlanmasını bekle
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
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikedPostMutation,
} = postApi;
