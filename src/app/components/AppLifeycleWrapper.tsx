import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateUser,
  handleIdleTimeout,
  loginUser,
  setAuthenticated,
} from "../../modules/core/store/auth/authActions";
import { RootState } from "../../modules/core/store/store";
import { LoginScreen } from "./LoginScreen";

export default function AppLifeycleWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const { isAuthenticated, isLoggedIn, idleTimeout } = useSelector(
    (state: RootState) => state.auth
  );

  const appState = useRef(AppState.currentState);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      dispatch(handleIdleTimeout());
    }, idleTimeout);
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current === "active" && nextAppState === "background") {
        console.log("App went to background, locking...");
        dispatch(setAuthenticated(false)); // Lock app when going to background
      }

      if (appState.current === "background" && nextAppState === "active") {
        console.log("App came to foreground, re-authenticating...");
        dispatch(isLoggedIn ? authenticateUser() : loginUser());
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      // Cleanup subscription
      subscription.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      resetIdleTimer(); // Reset idle timer on authentication
    }
  }, [isAuthenticated, idleTimeout, dispatch]);

  useEffect(() => {
    // Authenticate user when the app is newly launched
    if (AppState.currentState === "active") {
      dispatch(isLoggedIn ? authenticateUser() : loginUser());
    }
  }, [dispatch]);

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onPress={() => {
          dispatch(loginUser());
        }}
      ></LoginScreen>
    );
  }

  return <>{children}</>; // Render app only if authenticated
}
