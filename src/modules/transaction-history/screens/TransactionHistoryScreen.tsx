import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  fetchTransactions,
  revealAmounts,
} from "../store/slices/transactionSlice";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import TransactionHistoryItem from "../components/TranscationHistory/TransactionHistoryItem";

interface TransactionHistoryScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params: any) => void;
  };
}

const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { transactions, showAmounts, loading } = useAppSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleRevealAmounts = () => {
    dispatch(revealAmounts());
  };

  const onRefresh = () => {
    dispatch(fetchTransactions());
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Navbar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: "#f8f9fa",
          borderBottomWidth: 1,
          borderBottomColor: "#e9ecef",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 15 }}
        >
          <ChevronLeft size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>
          Transaction History
        </Text>

        <TouchableOpacity
          onPress={handleRevealAmounts}
          style={{ marginLeft: 10 }}
        >
          {showAmounts ? (
            <EyeOff size={20} color="black" />
          ) : (
            <Eye size={20} color="black" />
          )}
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <View style={{ flex: 1, padding: 10 }}>
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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default TransactionHistoryScreen;
