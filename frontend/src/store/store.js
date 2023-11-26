import { configureStore } from '@reduxjs/toolkit';
import graphDataReducer from './slices/graphDataSlice'; // Update the path

export const store = configureStore({
  reducer: {
    graphData: graphDataReducer,
    // ... other reducers
  },
});


export default store;
