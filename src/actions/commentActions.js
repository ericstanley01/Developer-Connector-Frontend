import axios from 'axios';
import {
 CLEAR_ERRORS,
 COMMENT_LOADING,
 ADD_COMMENT,
 COMMENT_UNLOAD
} from './types';

// add comment
export const addComment = (postId, commentData) => dispatch => {
 dispatch({
  type: COMMENT_LOADING
 });
 axios.post(`/api/posts/comment/${postId}`, commentData)
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