import {
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_REJECTED,
  FETCH_USERS_LOADING,
  GET_USER_SUCCESS,
  GET_USER_REJECTED,
  GET_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_REJECTED,
  CREATE_USER_LOADING, 
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REJECTED,
  UPDATE_USER_LOADING,
  DELETE_USER_SUCCESS,
  DELETE_USER_REJECTED,
  DELETE_USER_LOADING
} from '../actions/actionTypes';

const initialState = {
  users: [],
  user: null,
  loading: false
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload }
    case FETCH_USERS_REJECTED:
      return { ...state, users: [] }

    case GET_USER_SUCCESS:
      return { ...state, user: action.payload }
    case GET_USER_REJECTED:
      return { ...state, user: null }

    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
    case CREATE_USER_REJECTED:
    case UPDATE_USER_REJECTED:
    case DELETE_USER_REJECTED:
      return state;
    
    case FETCH_USERS_LOADING:
    case GET_USER_LOADING:
    case CREATE_USER_LOADING:
    case UPDATE_USER_LOADING:
    case DELETE_USER_LOADING:
      return { ...state, loading: action.payload }
  }
  return state;
}