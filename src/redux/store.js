import {configureStore} from '@reduxjs/toolkit'
// import featureReducer from '../features/featureSlice.js'
import { authApi } from '../features/authFeatures/authApi.js';
import { userApi } from '../features/userFeatures/userApi.js';
import { storyApi } from '../features/storyFeatures/storyApi.js';
import { postApi } from '../features/postFeatures/postApi.js';
import authReducer from '../features/authFeatures/authSlice.js';
import { baseApi, RESET_STATE_ACTION_TYPE, rtkQueryErrorLogger } from '../features/baseApi/baseApi.js';
import {searchApi} from '../features/searchFeatures/searchApi.js'
import {messageApi} from '../features/messageFeatures/messageApi.js'
import {notificationsApi} from '../features/notifications/notificationsApi.js'
import { HubConnectionBuilder } from "@microsoft/signalr";
import {reportsApi} from '../features/reportsFeatures/reportsApi.js'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const connection = new HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_BASE_URL + "/notificationHub", {
      accessTokenFactory: () => {
        return localStorage.getItem("authToken"); // JWT token'ınızı buradan alın
      }
    })
    .withAutomaticReconnect()
    .build();

// Bağlantı durumu yönetimi
const startConnection = async () => {
  try {
    await connection.start();
  } catch (err) {
    console.error("SignalR bağlantı hatası:", err);
    setTimeout(startConnection, 5000);
  }
};

connection.onclose(async () => {
  await startConnection();
});

connection.onreconnecting(error => {
});

connection.onreconnected(connectionId => {
  // Yeniden bağlandıktan sonra verileri güncelle
  store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
  store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
});

startConnection();

connection.on("ReceiveNotification", (methodName, payload) => {
  if (methodName === "LikePost") {
    store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
  }
  if(methodName === "CommentPost"){
    store.dispatch(notificationsApi.util.invalidateTags(["Notifications"]));
  }
  if(methodName === "CreateMessage"){
    // store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
    store.dispatch(messageApi.util.invalidateTags(["RelatedMessages"]));
  }
  if(methodName === "CreateMessage"){
    store.dispatch(messageApi.util.invalidateTags(["Conversations"]));
  }
  if(methodName === "NewMessage"){
    toast.info(`${payload} - Yeni mesaj 📩`, {
      position: "top-right",
      autoClose: 3000,
      onClick: () => {
        window.location.href = '/messages';
      }
    });
  }
  if (methodName === "CommentPost") {
    // Yorumları güncellemek için ilgili post'u invalidate et
    store.dispatch(postApi.util.invalidateTags(["Posts"]));
    store.dispatch(postApi.util.invalidateTags(["Comments"]));
  
    // Ayrıca gönderiler listesine özel bir güncelleme yapabilirsiniz
  }
});

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

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // featureApi.middleware,
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
    ),
});



export default store;