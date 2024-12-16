import {
  SET_AUTHENTICATED,
  RESET_AUTHENTICATION,
  SET_IDLE_TIMEOUT,
  AuthAction,
  SET_IS_LOGGED_IN,
} from "./authActions";

// Define the shape of the auth state
export interface AuthState {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  idleTimeout: number;
}

// Initial state
const initialState: AuthState = {
  isLoggedIn: false,
  isAuthenticated: false,
  idleTimeout: 60 * 1000, // 1 minute default
};

// Reducer
const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload as boolean,
      };
    case RESET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_IDLE_TIMEOUT:
      return {
        ...state,
        idleTimeout: action.payload as number,
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload as boolean,
        isAuthenticated: action.payload as boolean,
      };
    default:
      return state;
  }
};

export default authReducer;
