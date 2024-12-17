import { IBiometricService } from "../../services/biometricService";
import { BiometricAuthException } from "../../model/expections/authenticationExceptions";
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IToastService } from "../../services/toastService";
import { ILoggerService } from "../../services/loggerService";
import { AuthExtras } from "./authStore";

// TODO: handle unit tests

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
export const authenticateUser = createAsyncThunk<
  boolean,
  void,
  {
    extra: AuthExtras;
  }
>("auth/authenticateUser", async (_, { dispatch, rejectWithValue, extra }) => {
  const { biometricService, toastService, loggerService } = extra;

  try {
    const authSuccess = await biometricService.authenticateUser();

    if (authSuccess) {
      dispatch(setAuthenticated(true));
      return authSuccess;
    } else {
      toastService.showErrorMsg({
        title: "Authentication Failed",
        message: "Failed to authenticate user",
      });
      return rejectWithValue("Authentication failed");
    }
  } catch (error) {
    if (error instanceof BiometricAuthException) {
      toastService.showErrorMsg({
        title: error.title,
        message: error.message,
      });
    } else {
      toastService.showErrorMsg({
        title: "Authentication Failed",
        message: "Something went wrong",
      });

      loggerService.logError({
        funName: "authActions.authenticateUser",
        message: "Authentication failed",
        error,
      });
    }
    return rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk<
  boolean,
  void,
  {
    extra: AuthExtras;
  }
>("auth/loginUser", async (_, { dispatch, rejectWithValue, extra }) => {
  const { biometricService, toastService, loggerService } = extra;

  try {
    const authSuccess = await biometricService.authenticateUser();

    if (authSuccess) {
      dispatch(setIsLogin(true));
      return authSuccess;
    } else {
      toastService.showErrorMsg({
        title: "Login Failed",
        message: "Failed to authenticate user",
      });
      return rejectWithValue("Login failed");
    }
  } catch (error) {
    if (error instanceof BiometricAuthException) {
      toastService.showErrorMsg({
        title: error.title,
        message: error.message,
      });
    } else {
      toastService.showErrorMsg({
        title: "Login Failed",
        message: "Something went wrong",
      });

      loggerService.logError({
        funName: "authActions.loginUser",
        message: "Login failed",
        error,
      });
    }

    return rejectWithValue(error);
  }
});

// Thunk for handling idle timeout
export const handleIdleTimeout = () => (dispatch: Dispatch) => {
  dispatch(setAuthenticated(false));
};
