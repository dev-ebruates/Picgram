import {configureStore} from '@reduxjs/toolkit'
import featureReducer from '../features/featureSlice.js'
import { featureApi } from '../features/featureApi.js';


const store = configureStore({
  reducer: {
    feature: featureReducer,
    [featureApi.reducerPath]: featureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featureApi.middleware),
})



export default store