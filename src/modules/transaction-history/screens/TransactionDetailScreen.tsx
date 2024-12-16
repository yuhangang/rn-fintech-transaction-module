import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Transaction } from "../models/Transaction";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

const TransactionDetailScreen = ({ route, navigation }: any) => {
  const { transaction }: { transaction: Transaction } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Transaction Details</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{transaction.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{transaction.description}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount</Text>
          <Text
            style={[
              styles.value,
              {
                color: transaction.type === "debit" ? "green" : "red",
                fontWeight: "bold",
              },
            ]}
          >
            {transaction.type === "debit" ? "+" : "-"}
            {`${transaction.currency} `}
            {transaction.amount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{transaction.type}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  label: {
    fontWeight: "600",
    color: "#495057",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#212529",
  },
});

export default TransactionDetailScreen;
