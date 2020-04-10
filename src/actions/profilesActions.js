import axios from 'axios';
import {
  GET_PROFILES,
  //  PROFILE_LOADING
  // UNLOAD
} from './types';
import { setLoading, setUnLoad } from './loadingAction';

// profile loading
// export const setProfileLoading = () => {
//  return {
//   type: PROFILE_LOADING
//  }
// }

// get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
      dispatch(setUnLoad());
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
      dispatch(setUnLoad());
    });
}
