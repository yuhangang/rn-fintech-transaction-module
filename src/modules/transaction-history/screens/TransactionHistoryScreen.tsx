import { Eye, EyeOff } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TransactionHistoryItem from "../components/TranscationHistory/TransactionHistoryItem";
import {
  useTansactionHistoryDispatch,
  useTransactionHistorySelector,
} from "../store/hook";
import {
  fetchTransactions,
  revealAmounts,
} from "../store/slices/transactionActions";

interface TransactionHistoryScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params: any) => void;
  };
}

const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({
  navigation,
}) => {
  const dispatch = useTansactionHistoryDispatch();
  const transactions = useTransactionHistorySelector(
    (state) => state.transactions
  );
  const showAmounts = useTransactionHistorySelector(
    (state) => state.showAmounts
  );
  const loading = useTransactionHistorySelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleRevealAmounts = () => {
    dispatch(revealAmounts());
  };

  const onRefresh = () => {
    dispatch(fetchTransactions());
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TransactionHistoryAppBar handleRevealAmounts={handleRevealAmounts} />

      <View style={styles.listContainer}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionHistoryItem
              item={item}
              navigate={navigation.navigate}
              showAmounts={showAmounts}
            />
          )}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              colors={["#007bff"]}
              tintColor="#007bff"
            />
          }
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

function TransactionHistoryAppBar({
  handleRevealAmounts,
}: {
  handleRevealAmounts: () => void;
}) {
  const insets = useSafeAreaInsets();
  const showAmounts = useTransactionHistorySelector(
    (state) => state.showAmounts
  );

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Transaction History</Text>

      <TouchableOpacity
        onPress={handleRevealAmounts}
        style={styles.visibilityToggle}
      >
        {showAmounts ? (
          <EyeOff size={20} color="#333" />
        ) : (
          <Eye size={20} color="#333" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    textAlign: "center",
    flex: 1,
  },
  visibilityToggle: {
    padding: 5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
  },
});

export default TransactionHistoryScreen;
