import axios from 'axios';
import {
  CLEAR_ERRORS,
  COMMENT_LOADING,
  ADD_COMMENT,
  COMMENT_UNLOAD
} from './types';

const baseApiURL = process.env.REACT_APP_API_URL;

// add comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch({
    type: COMMENT_LOADING
  });
  axios.post(baseApiURL + `/api/posts/comment/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
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
        type: COMMENT_UNLOAD
      });
    });
}