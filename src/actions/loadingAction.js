// import axios from 'axios';
import {
 // GET_PROFILE,
 // GET_PROFILES,
 LOADING,
 UNLOAD,
 // PROFILE_LOADING
 // CLEAR_CURRENT_PROFILE,
 // GET_ERRORS,
 // SET_CURRENT_USER
} from './types';

// loading
export const setLoading = () => {
 return {
  type: LOADING
 }
}

export const setUnLoad = () => {
 return {
  type: UNLOAD
 }
}

