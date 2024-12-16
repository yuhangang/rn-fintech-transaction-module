// src/redux/store.ts
import { combineReducers, applyMiddleware } from "redux";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./auth/authReducer";
import { BiometricService } from "../services/biometricService";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here as needed
});

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          auth: BiometricService,
        },
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
