import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the graph data (adjust according to your data structure)
export interface GraphData {
  x: number[][];
  y: number[][];
  z: number[][];
}

// Define a type for the slice state
export interface GraphDataState {
  data: GraphData | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using the GraphDataState type
const initialState: GraphDataState = {
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
    fetchGraphDataSuccess(state, action: PayloadAction<GraphData>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchGraphDataFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGraphDataStart, fetchGraphDataSuccess, fetchGraphDataFail } = graphDataSlice.actions;

export default graphDataSlice.reducer;
