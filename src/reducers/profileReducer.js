import {
  GET_PROFILE,
  // GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_GITHUB_REPOS,
  REPOS_LOADING,
  PROFILE_UNLOAD,
  REPOS_UNLOAD
} from '../actions/types';

const initialState = {
  profile: null,
  repos: null,
  // profiles: null,
  profileLoading: false,
  reposLoading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true
      }
    case PROFILE_UNLOAD:
      return {
        ...state,
        profileLoading: false
      }
    case REPOS_LOADING:
      return {
        ...state,
        reposLoading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        profileLoading: false
      }
    // case GET_PROFILES:
    //   return {
    //     ...state,
    //     profiles: action.payload,
    //     loading: false
    //   }
    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: action.payload,
        reposLoading: false
      }
    case REPOS_UNLOAD:
      return {
        ...state,
        reposLoading: false
      }
    default:
      return state;
  }
}