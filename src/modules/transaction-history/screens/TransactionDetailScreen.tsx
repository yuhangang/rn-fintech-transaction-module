// screens/TransactionDetailScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Transaction } from "../models/Transaction";

const TransactionDetailScreen = ({ route }: any) => {
  const { transaction }: { transaction: Transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <Text>{transaction.date}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text>{transaction.description}</Text>

      <Text style={styles.label}>Amount:</Text>
      <Text>${transaction.amount}</Text>

      <Text style={styles.label}>Type:</Text>
      <Text>{transaction.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
});

export default TransactionDetailScreen;
