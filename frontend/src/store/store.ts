import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default to local storage for web
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authReducer from './slices/authSlice'; // Update the path
import cartReducer from './slices/cartSlice'; // Update the path

// Define the root state type
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  cart: ReturnType<typeof cartReducer>;
}

// Combine reducers as usual
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'] // Only persist the auth slice, add other slices if needed
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
