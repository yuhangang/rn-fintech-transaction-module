// App.tsx
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action, AnyAction } from "redux";
import { AppState, AppStateStatus } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import store, { RootState } from "./src/modules/core/store/store";
import {
  authenticateUser,
  handleIdleTimeout,
  setAuthenticated,
} from "./src/modules/core/store/auth/authActions";
import { ServiceProvider } from "./src/context/ServiceProvider";
import AppLifeycleWrapper from "./src/app/components/AppLifeycleWrapper";

// Wrap App with Redux Provider
export default () => {
  return (
    <Provider store={store}>
      <ServiceProvider>
        <AppLifeycleWrapper>
          <AppNavigator />
        </AppLifeycleWrapper>
      </ServiceProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
