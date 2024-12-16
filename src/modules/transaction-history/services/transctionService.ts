// services/transactionService.ts
import { Transaction } from "../models/Transaction";

export interface ITransactionService {
  fetchTransactions(): Promise<Transaction[]>;
}

export const TransactionService: ITransactionService = {
  fetchTransactions: async (): Promise<Transaction[]> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          {
            id: "1",
            amount: 500,
            currency: "MYR",
            date: "2024-12-10",
            description: "Grocery",
            type: "debit",
            status: "completed",
          },
          {
            id: "2",
            amount: 200,
            currency: "USD",
            date: "2024-12-11",
            description: "Salary",
            type: "credit",
            status: "completed",
          },
          // Add at least 20 transactions here...
        ]);
      }, 1000)
    );
  },
};
