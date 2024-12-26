import {configureStore} from '@reduxjs/toolkit'
import featureReducer from '../features/featureSlice.js'
import { featureApi } from '../features/featureApi.js';
import { authApi } from '../features/authFeatures/authApi.js';
import { userApi } from '../features/userFeatures/userApi.js';
import { storyApi } from '../features/storyFeatures/storyApi.js';
import { postApi } from '../features/postFeatures/postApi.js';
import authReducer from '../features/authFeatures/authSlice.js';
import userReducer from '../features/userFeatures/userSlice.js';
import postReducer from '../features/postFeatures/postSlice.js';
import storyReducer from '../features/storyFeatures/storySlice.js';
import { baseApi, RESET_STATE_ACTION_TYPE } from '../features/baseApi/baseApi.js';

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = undefined;
  }
  return {
    feature: featureReducer(state?.feature, action),
    auth: authReducer(state?.auth, action),
    user: userReducer(state?.user, action),
    post: postReducer(state?.post, action),
    story: storyReducer(state?.story, action),
    [featureApi.reducerPath]: featureApi.reducer(state?.[featureApi.reducerPath], action),
    [authApi.reducerPath]: authApi.reducer(state?.[authApi.reducerPath], action),
    [userApi.reducerPath]: userApi.reducer(state?.[userApi.reducerPath], action),
    [storyApi.reducerPath]: storyApi.reducer(state?.[storyApi.reducerPath], action),
    [postApi.reducerPath]: postApi.reducer(state?.[postApi.reducerPath], action),
    [baseApi.reducerPath]: baseApi.reducer(state?.[baseApi.reducerPath], action),
  };
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      featureApi.middleware,
      authApi.middleware,
      userApi.middleware,
      storyApi.middleware,
      postApi.middleware,
      baseApi.middleware
    ),
});

export default store;