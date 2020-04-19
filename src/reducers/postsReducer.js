import {
  POSTS_LOADING,
  GET_POSTS
} from '../actions/types';

const initialState = {
  posts: [],
  postsLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true
      }
    default:
      return state;
  }
}
