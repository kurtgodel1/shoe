import axios from 'axios';
import { fetchGraphDataStart, fetchGraphDataSuccess, fetchGraphDataFail } from '../slices/graphDataSlice'; // Adjust the path as needed
import config from '../../config'

export const fetchGraphData = () => async dispatch => {
  dispatch(fetchGraphDataStart());
  try {
    const response = await axios.get(`${config.API_URL}/api/surface-graph-data/`);
    dispatch(fetchGraphDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchGraphDataFail(error.toString()));
  }
};
