import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  GET_USERS,
  REGISTER_SUCCESS,
  USER_ORGANIZATION,
} from "../actions/types";

const initialState = {
  organization: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  users: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_LOADED:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoading: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
