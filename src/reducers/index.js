import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import profilesReducer from './profilesReducer';
// import loading from './loadingReducer';
import postReducer from './postReducer';
// import commentReducer from './commentReducer';
// import postsReducer from './postsReducer';

export default combineReducers({
 auth: authReducer,
 errors: errorReducer,
 profile: profileReducer,
 profiles: profilesReducer,
 post: postReducer,
 // comment: commentReducer
 // posts: postsReducer,
 // loading: loading
});