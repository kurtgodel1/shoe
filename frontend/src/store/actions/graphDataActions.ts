import axios from 'axios';
import { Dispatch } from 'redux';
import {
  fetchGraphDataStart,
  fetchGraphDataSuccess,
  fetchGraphDataFail,
  GraphData
} from '../slices/graphDataSlice'; // Adjust the path as needed
import config from '../../config'; // Adjust the path as needed

export const fetchGraphData = () => async (dispatch: Dispatch) => {
  dispatch(fetchGraphDataStart());

  try {
    const response = await axios.get<GraphData>(`${config.API_URL}/api/surface_graph_data/`);
    dispatch(fetchGraphDataSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchGraphDataFail(error.toString()));
  } else {
      dispatch(fetchGraphDataFail('An unknown error occurred'));
  }  }
};
