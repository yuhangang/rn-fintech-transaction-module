import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useRef } from "react";
import {
  AppState,
  AppStateStatus,
  Modal,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateUser,
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
  const { isAuthenticated, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const appState = useRef(AppState.currentState);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    idleTimeoutRef.current = setTimeout(() => {
      dispatch(setAuthenticated(false));
    }, 60000);
  }, [dispatch]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        if (isLoggedIn && isAuthenticated) {
          resetIdleTimer();
        }
        return false;
      },
      onMoveShouldSetPanResponder: () => {
        if (isLoggedIn && isAuthenticated) {
          resetIdleTimer();
        }
        return false;
      },
    })
  ).current;

  // App state change handler
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current === "background" && nextAppState === "active") {
        if (!isAuthenticated || !isLoggedIn) {
          dispatch(isLoggedIn ? authenticateUser() : loginUser());
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();

      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [dispatch, isLoggedIn, isAuthenticated]);

  // Idle timer setup
  useEffect(() => {
    if (isLoggedIn && isAuthenticated) {
      resetIdleTimer();
    }
  }, [isLoggedIn, isAuthenticated, resetIdleTimer]);

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
    <View style={styles.container} {...panResponder.panHandlers}>
      {children}
      <Modal
        visible={isLoggedIn && !isAuthenticated}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <LoginScreen
            onPress={async () => {
              dispatch(authenticateUser());
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
