import {configureStore} from '@reduxjs/toolkit'
import featureReducer from '../features/featureSlice.js'
import { featureApi } from '../features/featureApi.js';
import { authApi } from '../features/authFeatures/authApi.js';
import { userApi } from '../features/userFeatures/userApi.js';
import { storyApi } from '../features/storyFeatures/storyApi.js';
import { postApi } from '../features/postFeatures/postApi.js';

const store = configureStore({
  reducer: {
    feature: featureReducer,
    [featureApi.reducerPath]: featureApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [storyApi.reducerPath]: storyApi.reducer,
    [postApi.reducerPath]: postApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      featureApi.middleware, 
      authApi.middleware, 
      userApi.middleware, 
      storyApi.middleware,
      postApi.middleware
    ),
})

export default store;