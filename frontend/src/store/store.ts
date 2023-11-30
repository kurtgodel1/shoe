import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default to local storage for web
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import graphDataReducer from './slices/graphDataSlice'; // Update the path
import authReducer from './slices/authSlice'; // Update the path

// Define the root state type
export interface RootState {
  graphData: ReturnType<typeof graphDataReducer>;
  auth: ReturnType<typeof authReducer>;
}

// Combine reducers as usual
const rootReducer = combineReducers({
  graphData: graphDataReducer,
  auth: authReducer,
});

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Only persist the auth slice, add other slices if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;
