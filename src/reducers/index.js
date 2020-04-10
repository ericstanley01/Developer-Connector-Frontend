import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import profilesReducer from './profilesReducer';
import loading from './loadingReducer';

export default combineReducers({
 auth: authReducer,
 errors: errorReducer,
 profile: profileReducer,
 profiles: profilesReducer,
 loading: loading
});