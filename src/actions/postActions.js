import axios from 'axios';
import {
   GET_POST,
   ADD_POST,
   // UPDATE_POST,
   DELETE_POST,
   GET_ERRORS,
   POST_LOADING,
   GET_POSTS,
   POST_UNLOAD,
   CLEAR_ERRORS,
   COMMENT_LOADING,
   COMMENT_UNLOAD
} from './types';

// add post
export const addPost = postData => dispatch => {
   dispatch({
      type: POST_LOADING
   });
   axios.post('/api/posts', postData)
      .then(res => {
         dispatch({
            type: ADD_POST,
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
            type: POST_UNLOAD
         });
      });
}

// get posts
export const getPosts = () => dispatch => {
   dispatch({
      type: POST_LOADING
   });
   axios.get('/api/posts')
      .then(res =>
         dispatch({
            type: GET_POSTS,
            payload: res.data
         }))
      .catch(err =>
         dispatch({
            type: GET_POSTS,
            payload: null
         }));
}

// get post by postId
export const getPost = (postId) => dispatch => {
   dispatch({
      type: POST_LOADING
   });
   axios.get(`/api/posts/${postId}`)
      .then(res => {
         dispatch({
            type: GET_POST,
            payload: res.data
         });
      })
      .catch(err => {
         dispatch({
            type: GET_POST,
            payload: null
         });
         dispatch({
            type: POST_UNLOAD
         });
      });
}

// delete post
export const deletePost = postId => dispatch => {
   dispatch({
      type: POST_LOADING
   });
   axios.delete(`/api/posts/${postId}`)
      .then(res => {
         dispatch({
            type: DELETE_POST,
            payload: postId
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
            type: POST_UNLOAD
         });
      });
}

// add like
export const addLike = postId => dispatch => {
   axios.post(`/api/posts/like/${postId}`)
      .then(res => {
         dispatch(getPosts());
         dispatch({
            type: CLEAR_ERRORS
         });
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         }));
}

// remove like
export const removeLike = postId => dispatch => {
   axios.post(`/api/posts/unlike/${postId}`)
      .then(res => {
         dispatch(getPosts());
         dispatch({
            type: CLEAR_ERRORS
         });
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         }));
}

// add comment
export const addComment = (postId, commentData) => dispatch => {
   dispatch({
      type: COMMENT_LOADING
   });
   axios.post(`/api/posts/comment/${postId}`, commentData)
      .then(res => {
         dispatch({
            type: GET_POST,
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

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
   dispatch({
      type: COMMENT_LOADING
   });
   axios.delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res => {
         dispatch({
            type: GET_POST,
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