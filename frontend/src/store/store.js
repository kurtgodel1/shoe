import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to local storage for web
import graphDataReducer from './slices/graphDataSlice'; // Update the path
import authReducer from './slices/authSlice';

// Combine reducers as usual
const rootReducer = combineReducers({
  graphData: graphDataReducer,
  auth: authReducer,
});

// Configuration object for redux-persist
const persistConfig = {
  key: 'root', // The key for the persist
  storage, // The storage to use
  whitelist: ['auth'] // Only persist the auth slice, add other slices if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;
