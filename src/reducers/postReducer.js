import {
  POST_LOADING,
  GET_POST,
  ADD_POST,
  // UPDATE_POST,
  GET_POSTS,
  DELETE_POST,
  POST_UNLOAD,
  COMMENT_LOADING,
  COMMENT_UNLOAD,
} from '../actions/types';

const initialState = {
  post: {},
  posts: [],
  postLoading: false,
  commentLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        postLoading: false
      }
    case POST_UNLOAD:
      return {
        ...state,
        postLoading: false
      }
    case COMMENT_LOADING:
      return {
        ...state,
        commentLoading: true
      }
    case COMMENT_UNLOAD:
      return {
        ...state,
        commentLoading: false
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        postLoading: false
      }
    case POST_LOADING:
      return {
        ...state,
        postLoading: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postLoading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        postLoading: false
      }
    default:
      return state;
  }
}