import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { DependencyContainer } from "../core/di/dependencyContainer";
import { IBiometricService } from "../core/services/biometricService";
import { ILoggerService } from "../core/services/loggerService";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import { ITransactionService } from "./services/transctionService";
import { createTransactionHistoryStore } from "./store/transactionHistoryStore";

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
        loggerService:
          dependencyContainer.resolve<ILoggerService>("loggerService"),
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
