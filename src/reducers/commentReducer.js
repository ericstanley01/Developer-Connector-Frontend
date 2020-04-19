import {
 ADD_COMMENT,
 COMMENT_LOADING,
 COMMENT_UNLOAD,
} from '../actions/types';

const initialState = {
 comment: {},
 comments: [],
 commentLoading: false,
};

export default function (state = initialState, action) {
 switch (action.type) {
  case ADD_COMMENT:
   return {
    ...state,
    posts: [action.payload, ...state.comment],
    commentLoading: false
   }
  case COMMENT_UNLOAD:
   return {
    ...state,
    postLoading: false
   }
  case COMMENT_LOADING:
   return {
    ...state,
    commentLoading: true
   }
  default:
   return state;
 }
}