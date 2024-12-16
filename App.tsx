// App.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import AppAuthWrapper from "./src/app/components/AppAuthWrapper";
import { ServiceProvider } from "./src/context/ServiceProvider";
import store from "./src/modules/core/store/store";
import AppNavigator from "./src/navigation/AppNavigator";

// Wrap App with Redux Provider
export default () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ServiceProvider>
          <AppAuthWrapper>
            <AppNavigator />
          </AppAuthWrapper>
        </ServiceProvider>
      </SafeAreaProvider>
      <Toast />
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
