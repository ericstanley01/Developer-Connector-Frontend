import { GET_PROFILES, PROFILES_LOADING, PROFILES_UNLOAD } from '../actions/types';

const initialState = {
  profiles: null,
  profilesLoading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILES_LOADING:
      return {
        ...state,
        profilesLoading: true
      }
    case PROFILES_UNLOAD:
      return {
        ...state,
        profilesLoading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        profilesLoading: false
      }
    default:
      return state;
  }
}