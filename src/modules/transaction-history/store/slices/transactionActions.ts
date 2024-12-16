import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "../../models/Transaction";
import { ITransactionService } from "../../services/transctionService";
import { IBiometricService } from "../../../core/services/biometricService";
import { TransactionsState } from "./transactionSlice";

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { extra: { transactionService: ITransactionService } }
>("transactions/fetchTransactions", async (_, { extra }) => {
  const { transactionService } = extra;
  try {
    return await transactionService.fetchTransactions();
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    throw error;
  }
});

// Async thunk for revealing amounts
export const revealAmounts = createAsyncThunk<
  boolean,
  void,
  {
    state: { transactions: TransactionsState };
    extra: { biometricService: IBiometricService };
  }
>("transactions/revealAmounts", async (_, { getState, extra }) => {
  const { biometricService } = extra;
  const showAmounts = getState().transactions.showAmounts;

  if (showAmounts) {
    return false;
  } else {
    const success = await biometricService.authenticateUser();
    if (!success) {
      throw new Error("Biometric authentication failed");
    }
    return true;
  }
});
