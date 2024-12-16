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
          {
            id: "3",
            amount: 150,
            currency: "EUR",
            date: "2024-12-12",
            description: "Book Purchase",
            type: "debit",
            status: "completed",
          },
          {
            id: "4",
            amount: 300,
            currency: "GBP",
            date: "2024-12-13",
            description: "Freelance Work",
            type: "credit",
            status: "completed",
          },
          {
            id: "5",
            amount: 50,
            currency: "JPY",
            date: "2024-12-14",
            description: "Coffee",
            type: "debit",
            status: "completed",
          },
          {
            id: "6",
            amount: 1000,
            currency: "AUD",
            date: "2024-12-15",
            description: "Rent",
            type: "debit",
            status: "completed",
          },
          {
            id: "7",
            amount: 75,
            currency: "CAD",
            date: "2024-12-16",
            description: "Gym Membership",
            type: "debit",
            status: "completed",
          },
          {
            id: "8",
            amount: 600,
            currency: "CHF",
            date: "2024-12-17",
            description: "Consulting Fee",
            type: "credit",
            status: "completed",
          },
          {
            id: "9",
            amount: 120,
            currency: "CNY",
            date: "2024-12-18",
            description: "Dinner",
            type: "debit",
            status: "completed",
          },
          {
            id: "10",
            amount: 250,
            currency: "INR",
            date: "2024-12-19",
            description: "Gift",
            type: "debit",
            status: "completed",
          },
          {
            id: "11",
            amount: 400,
            currency: "SGD",
            date: "2024-12-20",
            description: "Bonus",
            type: "credit",
            status: "completed",
          },
          {
            id: "12",
            amount: 90,
            currency: "HKD",
            date: "2024-12-21",
            description: "Taxi",
            type: "debit",
            status: "completed",
          },
          {
            id: "13",
            amount: 220,
            currency: "NZD",
            date: "2024-12-22",
            description: "Electronics",
            type: "debit",
            status: "completed",
          },
          {
            id: "14",
            amount: 130,
            currency: "KRW",
            date: "2024-12-23",
            description: "Clothing",
            type: "debit",
            status: "completed",
          },
          {
            id: "15",
            amount: 500,
            currency: "THB",
            date: "2024-12-24",
            description: "Travel",
            type: "debit",
            status: "completed",
          },
          {
            id: "16",
            amount: 700,
            currency: "MYR",
            date: "2024-12-25",
            description: "Investment",
            type: "credit",
            status: "completed",
          },
        ]);
      }, 1000)
    );
  },
};
