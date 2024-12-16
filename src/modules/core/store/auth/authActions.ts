import Toast from "react-native-toast-message";
import { IBiometricService } from "../../services/biometricService";
import { BiometricAuthException } from "../../model/expections/authenticationExceptions";
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

// TODO: handle error logging,and refactor toast service

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
    extra: { biometricService: IBiometricService };
  }
>("auth/authenticateUser", async (_, { dispatch, rejectWithValue, extra }) => {
  try {
    const { biometricService } = extra;
    const authSuccess = await biometricService.authenticateUser();

    if (authSuccess) {
      dispatch(setAuthenticated(true));
      return authSuccess;
    } else {
      Toast.show({
        type: "error",
        text1: "Authentication Failed",
        text2: "Failed to authenticate user",
        visibilityTime: 3000,
        position: "bottom",
      });
      return rejectWithValue("Authentication failed");
    }
  } catch (error) {
    if (error instanceof BiometricAuthException) {
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.message,
        visibilityTime: 3000,
        position: "bottom",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Authentication Failed",
        text2: "Something went wrong",
        visibilityTime: 3000,
        position: "bottom",
      });
    }
    return rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk<
  boolean,
  void,
  {
    extra: { biometricService: IBiometricService };
  }
>("auth/loginUser", async (_, { dispatch, rejectWithValue, extra }) => {
  try {
    const { biometricService } = extra;
    const authSuccess = await biometricService.authenticateUser();

    if (authSuccess) {
      dispatch(setIsLogin(true));
      return authSuccess;
    } else {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Failed to authenticate user",
        visibilityTime: 3000,
        position: "bottom",
      });
      return rejectWithValue("Login failed");
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Login Failed",
      text2: "Something went wrong",
      visibilityTime: 3000,
      position: "bottom",
    });
    return rejectWithValue(error);
  }
});

// Thunk for handling idle timeout
export const handleIdleTimeout = () => (dispatch: Dispatch) => {
  dispatch(setAuthenticated(false));
};
