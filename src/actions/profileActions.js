import axios from 'axios';
import {
  GET_PROFILE,
  // GET_PROFILES,
  PROFILE_LOADING,
  // PROFILES_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  // UNLOAD
  GET_GITHUB_REPOS,
  REPOS_LOADING,
  PROFILE_UNLOAD,
  REPOS_UNLOAD,
  CLEAR_ERRORS
} from './types';
// import { setLoading, setUnLoad } from './loadingAction';

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios.get('/api/profile')
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      dispatch({
        type: PROFILE_UNLOAD
      });
    });
}

// get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios.get(`/api/profile/handle/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
      dispatch({
        type: PROFILE_UNLOAD
      });
    });
}

// get profile by user id
export const getProfileByUserId = (userId) => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios.get(`/api/profile/user/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
      dispatch({
        type: PROFILE_UNLOAD
      });
    });
}

// create profile
export const createProfile = (profileData, history) => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios.post('/api/profile', profileData)
    .then(profile => {
      history.push('/dashboard');
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: PROFILE_UNLOAD
      });
    })
}

// profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   }
// }

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

// add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => {
      history.push('/dashboard');
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => {
      history.push('/dashboard');
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// delete experience
export const deleteExperience = (id) => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// delete education
export const deleteEducation = (id) => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// get all profiles
// export const getProfiles = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get('/api/profile/all')
//     .then(res =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data
//       }))
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: null
//       })
//     );
// }

// delete account and profile
export const deleteAccount = () => dispatch => {
  axios
    .delete('/api/profile')
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.res.data
    }));
}

export const getGithubRepos = (username) => dispatch => {
  dispatch({
    type: REPOS_LOADING
  });
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

  const uri = encodeURI(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
  );
  const headers = {
    'user-agent': 'node.js',
    Authorization: `token ${githubToken}`
  };

  axios.get(uri, { headers })
    .then(res => {
      dispatch({
        type: GET_GITHUB_REPOS,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      dispatch({
        type: REPOS_UNLOAD
      });
    });
}