import React from "react";
import { Provider } from "react-redux";
import { createTransactionHistoryStore } from "./store/transactionHistoryStore";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import { ITransactionService } from "./services/transctionService";
import { IBiometricService } from "../core/services/biometricService";
import { DependencyContainer } from "../core/di/dependencyContainer";

const Stack = createStackNavigator();

export const TransactionNavigator = () => {
  const dependencyContainer = DependencyContainer.getInstance();

  return (
    <Provider
      store={createTransactionHistoryStore({
        transactionService:
          dependencyContainer.resolve<ITransactionService>(
            "transactionService"
          ),
        biometricService:
          dependencyContainer.resolve<IBiometricService>("biometricService"),
      })}
    >
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
};
