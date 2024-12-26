import {configureStore} from '@reduxjs/toolkit'
import featureReducer from '../features/featureSlice.js'
import { featureApi } from '../features/featureApi.js';
import { authApi } from '../features/authFeatures/authApi.js';
import { userApi } from '../features/userFeatures/userApi.js';
import { postApi } from '../features/postFeatures/postApi.js';
import { baseApi, RESET_STATE_ACTION_TYPE } from '../features/baseApi/baseApi.js';

const rootReducer = (state, action) => {
  // Eğer state tanımsızsa, initial state'i oluştur
  if (!state) {
    return {
      feature: {
        value: 0
      },
      auth: {
        user: null,
        token: localStorage.getItem('authToken'),
        isAuthenticated: !!localStorage.getItem('authToken')
      },
      user: {
        profile: null,
        followers: [],
        following: [],
        posts: [],
        stories: [],
        loading: false,
        error: null
      },
      post: {
        posts: [],
        loading: false,
        error: null
      },
      story: {
        stories: [],
        loading: false,
        error: null
      },
      [baseApi.reducerPath]: baseApi.reducer,
      [featureApi.reducerPath]: featureApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [postApi.reducerPath]: postApi.reducer
    };
  }

  // Reset state action
  if (action.type === RESET_STATE_ACTION_TYPE) {
    return rootReducer(undefined, { type: 'INIT' });
  }

  // Diğer action'lar
  switch (action.type) {
    case 'setCredentials':
      localStorage.setItem('authToken', action.payload.token);
      return {
        ...state,
        auth: {
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true
        }
      };
    case 'logout':
      localStorage.removeItem('authToken');
      return {
        ...state,
        auth: {
          user: null,
          token: null,
          isAuthenticated: false
        }
      };
    case 'SET_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
          loading: false,
          error: null
        }
      };
    case 'SET_POSTS':
      return {
        ...state,
        user: {
          ...state.user,
          posts: action.payload
        }
      };
    case 'SET_LOADING':
      return {
        ...state,
        user: {
          ...state.user,
          loading: action.payload
        }
      };
    case 'setStories':
      return {
        ...state,
        story: {
          ...state.story,
          stories: action.payload,
          loading: false,
          error: null
        }
      };
    case 'setLoading':
      return {
        ...state,
        story: {
          ...state.story,
          loading: action.payload
        }
      };
    case 'setError':
      return {
        ...state,
        story: {
          ...state.story,
          error: action.payload,
          loading: false
        }
      };
    case 'SET_POSTS_DATA':
      return {
        ...state,
        post: {
          ...state.post,
          posts: action.payload.data,
          loading: false,
          error: null
        }
      };
    case 'UPDATE_POST':
      return {
        ...state,
        post: {
          ...state.post,
          posts: state.post.posts.map(post => 
            post.id === action.payload.id ? action.payload : post
          )
        }
      };
    case 'DELETE_POST':
      return {
        ...state,
        post: {
          ...state.post,
          posts: state.post.posts.filter(post => post.id !== action.payload)
        }
      };
    case 'SET_FEATURE_VALUE':
      return {
        ...state,
        feature: action.payload
      };
    default:
      return {
        ...state,
        [baseApi.reducerPath]: baseApi.reducer(state[baseApi.reducerPath], action),
        [featureApi.reducerPath]: featureApi.reducer(state[featureApi.reducerPath], action),
        [authApi.reducerPath]: authApi.reducer(state[authApi.reducerPath], action),
        [userApi.reducerPath]: userApi.reducer(state[userApi.reducerPath], action),
        [postApi.reducerPath]: postApi.reducer(state[postApi.reducerPath], action)
      };
  }
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      baseApi.middleware,
      featureApi.middleware,
      authApi.middleware,
      userApi.middleware,
      postApi.middleware
    ),
});

export default store;