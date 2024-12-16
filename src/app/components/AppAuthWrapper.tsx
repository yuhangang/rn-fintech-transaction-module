import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import {
  AppState,
  AppStateStatus,
  Modal,
  View,
  StyleSheet,
} from "react-native";
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
        dispatch(setAuthenticated(false));
      }

      if (appState.current === "background" && nextAppState === "active") {
        dispatch(isLoggedIn ? authenticateUser() : loginUser());
      }

      appState.current = nextAppState;
    };

    if (isLoggedIn) {
      const subscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );

      return () => {
        subscription.remove();
      };
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isAuthenticated) {
      resetIdleTimer();
    }
  }, [isAuthenticated, idleTimeout, dispatch]);

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onPress={async () => {
          await dispatch(loginUser());
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {children}
      <Modal
        visible={isLoggedIn && !isAuthenticated}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <LoginScreen
            onPress={async () => {
              await dispatch(authenticateUser());
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
