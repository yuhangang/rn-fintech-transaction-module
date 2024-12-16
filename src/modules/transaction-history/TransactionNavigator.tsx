import React from "react";
import { Provider } from "react-redux";
import { transactionHistoryStore } from "./store/transactionHistoryStore";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import TransactionHistoryRoute from "./screens/TransactionHistoryRoute";

const Stack = createStackNavigator();

export const TransactionNavigator = () => (
  <Provider store={transactionHistoryStore}>
    <Stack.Navigator
      initialRouteName="TransactionHistory"
      screenOptions={{ headerShown: false }}
    >
      <TransactionHistoryRoute Stack={Stack} />
    </Stack.Navigator>
  </Provider>
);
