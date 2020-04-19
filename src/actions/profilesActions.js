import axios from 'axios';
import {
  GET_PROFILES,
  PROFILES_LOADING,
  PROFILES_UNLOAD,
} from './types';
// import { setLoading, setUnLoad } from './loadingAction';

// profile loading
// export const setProfileLoading = () => {
//  return {
//   type: PROFILE_LOADING
//  }
// }

// get all profiles
export const getProfiles = () => dispatch => {
  dispatch({
    type: PROFILES_LOADING
  });
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
      dispatch({
        type: PROFILES_UNLOAD
      });
    });
}
