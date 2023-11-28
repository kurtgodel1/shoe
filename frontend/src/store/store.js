import { configureStore } from '@reduxjs/toolkit';
import graphDataReducer from './slices/graphDataSlice'; // Update the path
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    graphData: graphDataReducer,
    auth: authReducer,
  },
});


export default store;
