import React from "react";
import { Provider } from "react-redux";
import { transactionHistoryStore } from "./store/transactionHistoryStore";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";

const Stack = createStackNavigator();

export const TransactionNavigator = () => (
  <Provider store={transactionHistoryStore}>
    <Stack.Navigator
      initialRouteName="TransactionHistory"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </Provider>
);
