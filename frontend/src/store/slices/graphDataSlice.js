import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    fetchGraphDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGraphDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchGraphDataFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGraphDataStart, fetchGraphDataSuccess, fetchGraphDataFail } = graphDataSlice.actions;

export default graphDataSlice.reducer;
