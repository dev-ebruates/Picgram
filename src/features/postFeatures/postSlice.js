import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  userPosts: [],
  selectedPost: null,
  loading: false,
  error: null
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
      state.error = null;
    },
    setUserPosts: (state, { payload }) => {
      state.userPosts = payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedPost: (state, { payload }) => {
      state.selectedPost = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
      state.userPosts.unshift(payload);
    },
    updatePost: (state, { payload }) => {
      const index = state.posts.findIndex(post => post.id === payload.id);
      if (index !== -1) {
        state.posts[index] = payload;
      }
      const userPostIndex = state.userPosts.findIndex(post => post.id === payload.id);
      if (userPostIndex !== -1) {
        state.userPosts[userPostIndex] = payload;
      }
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter(post => post.id !== payload);
      state.userPosts = state.userPosts.filter(post => post.id !== payload);
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.userPosts = [];
      state.selectedPost = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  setPosts,
  setUserPosts,
  setSelectedPost,
  addPost,
  updatePost,
  deletePost,
  setLoading,
  setError,
  clearPosts
} = postSlice.actions;

// Selectors
export const selectAllPosts = (state) => state.post.posts;
export const selectUserPosts = (state) => state.post.userPosts;
export const selectSelectedPost = (state) => state.post.selectedPost;
export const selectPostLoading = (state) => state.post.loading;
export const selectPostError = (state) => state.post.error;

export default postSlice.reducer;
