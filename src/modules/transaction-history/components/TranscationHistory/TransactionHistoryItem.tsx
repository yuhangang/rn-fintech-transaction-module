import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Transaction } from "../../models/Transaction";

interface TransactionHistoryItemProps {
  item: Transaction;
  navigate: (screen: string, params: any) => void;
  showAmounts: boolean;
}

const TransactionHistoryItem: React.FC<TransactionHistoryItemProps> = ({
  item,
  navigate,
  showAmounts,
}) => {
  // Determine transaction type color and sign
  const isIncome = item.type === "debit";
  const amountColor = isIncome ? "#28a745" : "#dc3545";
  const amountSign = isIncome ? "+" : "-";

  return (
    <TouchableOpacity
      onPress={() => navigate("TransactionDetail", { transaction: item })}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {/* Left section - Transaction details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.descriptionText} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {/* Right section - Amount and chevron */}
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amountText,
              { color: showAmounts ? amountColor : "#6c757d" },
            ]}
          >
            {showAmounts
              ? `${amountSign}${item.currency} ${item.amount}`
              : "*****"}
          </Text>
          <ChevronRight size={20} color="#adb5bd" style={styles.chevronIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#6c757d",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
    minWidth: 100,
    textAlign: "right",
  },
  chevronIcon: {
    marginLeft: 5,
  },
});

export default TransactionHistoryItem;
