// App.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import AppAuthWrapper from "./src/app/components/AppAuthWrapper";
import AppNavigator from "./src/navigation/AppNavigator";
import AppProvider from "./src/app/AppProvider";

// Wrap App with Redux Provider
export default () => {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <AppAuthWrapper>
          <AppNavigator />
        </AppAuthWrapper>
      </SafeAreaProvider>
      <Toast />
    </AppProvider>
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
