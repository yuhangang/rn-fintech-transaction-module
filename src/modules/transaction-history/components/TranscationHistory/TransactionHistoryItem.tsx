import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
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
  return (
    <TouchableOpacity
      onPress={() => navigate("TransactionDetail", { transaction: item })}
    >
      <View style={{ padding: 15, borderBottomWidth: 1 }}>
        <Text>{item.date}</Text>
        <Text>{item.description}</Text>
        <Text>{showAmounts ? `$${item.amount}` : "*****"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionHistoryItem;
