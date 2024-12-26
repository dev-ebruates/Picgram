import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  followers: [],
  following: [],
  posts: [],
  stories: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
      state.error = null;
    },
    setFollowers: (state, { payload }) => {
      state.followers = payload;
    },
    setFollowing: (state, { payload }) => {
      state.following = payload;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setStories: (state, { payload }) => {
      state.stories = payload;
    },
    updateBio: (state, { payload }) => {
      if (state.profile) {
        state.profile.bio = payload;
      }
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearUserData: () => initialState
  }
});

export const {
  setProfile,
  setFollowers,
  setFollowing,
  setPosts,
  setStories,
  updateBio,
  setLoading,
  setError,
  clearUserData
} = userSlice.actions;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectUserFollowers = (state) => state.user.followers;
export const selectUserFollowing = (state) => state.user.following;
export const selectUserPosts = (state) => state.user.posts;
export const selectUserStories = (state) => state.user.stories;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
