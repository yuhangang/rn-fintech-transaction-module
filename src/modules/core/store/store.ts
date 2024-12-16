// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, Dispatch, UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { DependencyContainer } from "../di/dependencyContainer";
import { IBiometricService } from "../services/biometricService";
import { AuthAction } from "./auth/authActions";
import authReducer from "./auth/authReducer";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here as needed
});

// Create store
const createStore = ({
  biometricService,
}: {
  biometricService: IBiometricService;
}) => {
  const dependencyContainer = DependencyContainer.getInstance();

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            biometricService: biometricService,
          },
        },
      }),
  });
};

export type AuthState = ReturnType<typeof rootReducer>;
export type AuthDispatch = ThunkDispatch<
  {
    auth: AuthState;
  },
  {
    biometricService: IBiometricService;
  },
  UnknownAction
> &
  Dispatch<AuthAction>;
export default createStore;
