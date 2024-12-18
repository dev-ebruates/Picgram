import {configureStore} from '@reduxjs/toolkit'
import featureReducer from '../features/featureSlice.js'
import { featureApi } from '../features/featureApi.js';
import { authApi } from '../features/authFeatures/authApi.js';
import { userApi } from '../features/userFeatures/userApi.js';


const store = configureStore({
  reducer: {
    feature: featureReducer,
    [featureApi.reducerPath]: featureApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featureApi.middleware, authApi.middleware, userApi.middleware),
})



export default store