import {configureStore} from '@reduxjs/toolkit'
import { authApi } from '../features/authFeatures/authApi.js';
import { userApi } from '../features/userFeatures/userApi.js';
import { storyApi } from '../features/storyFeatures/storyApi.js';
import { postApi } from '../features/postFeatures/postApi.js';
import authReducer from '../features/authFeatures/authSlice.js';
import { baseApi, RESET_STATE_ACTION_TYPE, rtkQueryErrorLogger } from '../features/baseApi/baseApi.js';
import {searchApi} from '../features/searchFeatures/searchApi.js'
import {messageApi} from '../features/messageFeatures/messageApi.js'
import {notificationsApi} from '../features/notifications/notificationsApi.js'
import {reportsApi} from '../features/reportsFeatures/reportsApi.js'
import "react-toastify/dist/ReactToastify.css";
import { setupListeners } from '@reduxjs/toolkit/query';
import { SignalRService } from "../components/signalR/SignalRService.js";

const rootReducer = (state, action) => {
  
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = undefined;
  }
  return {
    // feature: featureReducer(state?.feature, action),
    auth: authReducer(state?.auth, action),
    // [featureApi.reducerPath]: featureApi.reducer(state?.[featureApi.reducerPath], action),
    [authApi.reducerPath]: authApi.reducer(state?.[authApi.reducerPath], action),
    [userApi.reducerPath]: userApi.reducer(state?.[userApi.reducerPath], action),
    [storyApi.reducerPath]: storyApi.reducer(state?.[storyApi.reducerPath], action),
    [postApi.reducerPath]: postApi.reducer(state?.[postApi.reducerPath], action),
    [baseApi.reducerPath]: baseApi.reducer(state?.[baseApi.reducerPath], action),
    [searchApi.reducerPath]: searchApi.reducer(state?.[searchApi.reducerPath], action),
    [messageApi.reducerPath]: messageApi.reducer(state?.[messageApi.reducerPath], action),
    [notificationsApi.reducerPath]: notificationsApi.reducer(state?.[notificationsApi.reducerPath], action),
    [reportsApi.reducerPath]: reportsApi.reducer(state?.[reportsApi.reducerPath], action),

  };
};

await SignalRService.getInstance().initialize();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      storyApi.middleware,
      postApi.middleware,
      baseApi.middleware,
      searchApi.middleware,
      messageApi.middleware,
      notificationsApi.middleware,
      reportsApi.middleware,
      rtkQueryErrorLogger
    );
    return middlewares;
  },
});

// Listener kurulumu
setupListeners(store.dispatch);

export default store;
export { store };