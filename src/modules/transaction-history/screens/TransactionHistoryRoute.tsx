import { TypedNavigator } from "@react-navigation/native";
import TransactionHistoryScreen from "./TransactionHistoryScreen";

export default function TransactionHistoryRoute({
  Stack,
}: {
  Stack: TypedNavigator<any, any>;
}) {
  return (
    <Stack.Screen
      name="TransactionHistory"
      component={TransactionHistoryScreen}
      options={{ title: "Transaction History", headerShown: true }}
    />
  );
}
