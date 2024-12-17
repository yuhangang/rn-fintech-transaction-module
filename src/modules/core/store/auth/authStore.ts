// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, Dispatch, UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IBiometricService } from "../../services/biometricService";
import { ILoggerService } from "../../services/loggerService";
import { IToastService } from "../../services/toastService";
import { AuthAction } from "./authActions";
import authReducer from "./authReducer";

export interface AuthState {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  idleTimeout: number;
}

export type AuthExtras = {
  biometricService: IBiometricService;
  toastService: IToastService;
  loggerService: ILoggerService;
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export const createAuthStore = ({
  biometricService,
  toastService,
  loggerService,
}: {
  biometricService: IBiometricService;
  toastService: IToastService;
  loggerService: ILoggerService;
}) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: <AuthExtras>{
            biometricService: biometricService,
            toastService: toastService,
            loggerService: loggerService,
          },
        },
      }),
  });
};

export type AuthDispatch = ThunkDispatch<
  {
    auth: AuthState;
  },
  AuthExtras,
  AuthAction
>;
