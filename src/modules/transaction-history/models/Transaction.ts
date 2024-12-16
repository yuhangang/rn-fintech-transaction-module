type TransactionType = "debit" | "credit";
type TransactionStatus = "pending" | "completed" | "failed" | "cancelled";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  date: string;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
}
