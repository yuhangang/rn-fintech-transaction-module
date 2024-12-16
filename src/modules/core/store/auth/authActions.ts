import { BiometricService } from "../../services/biometricService";
import { Dispatch } from "redux";

// Action Types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const RESET_AUTHENTICATION = "RESET_AUTHENTICATION";
export const SET_IDLE_TIMEOUT = "SET_IDLE_TIMEOUT";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";

// Action Interfaces
export interface AuthAction {
  type: string;
  payload?: boolean | number;
}

// Action Creators
export const setAuthenticated = (isAuthenticated: boolean) => ({
  type: SET_AUTHENTICATED,
  payload: isAuthenticated,
});

export const resetAuthentication = () => ({
  type: RESET_AUTHENTICATION,
});

export const setIdleTimeout = (timeout: number) => ({
  type: SET_IDLE_TIMEOUT,
  payload: timeout,
});

export const setIsLogin = (isLoggedIn: boolean) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
});

// Async Action Creator for Authentication
export const authenticateUser = () => async (dispatch: Dispatch) => {
  try {
    console.log("Authenticating user...");
    const authSuccess = await BiometricService.authenticateUser();
    dispatch(setAuthenticated(authSuccess));
    return authSuccess;
  } catch (error) {
    console.error("Authentication failed", error);
    dispatch(setAuthenticated(false));
    return false;
  }
};

export const loginUser = () => async (dispatch: Dispatch) => {
  try {
    console.log("Login user...");
    const authSuccess = await BiometricService.authenticateUser();
    dispatch(setIsLogin(authSuccess));
    return authSuccess;
  } catch (error) {
    console.error("Login failed", error);
    dispatch(setIsLogin(true));
    return false;
  }
};

// Thunk for handling idle timeout
export const handleIdleTimeout = () => (dispatch: Dispatch) => {
  console.log("App idle for too long, locking...");
  dispatch(setAuthenticated(false));
};
