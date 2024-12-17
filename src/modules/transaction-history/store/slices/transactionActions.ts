import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "../../models/Transaction";
import {
  TransactionExtra,
  TransactionsState,
} from "../transactionHistoryStore";

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  {
    extra: TransactionExtra;
  }
>("transactions/fetchTransactions", async (_, { extra }) => {
  const { transactionService, loggerService } = extra;
  try {
    console.log("fetchTransactions");
    return await transactionService.fetchTransactions();
  } catch (error) {
    loggerService.logError({
      funName: "fetchTransactions",
      message: "Failed to fetch transactions",
      error: error,
    });

    return [];
  }
});

// Async thunk for revealing amounts
export const revealAmounts = createAsyncThunk<
  boolean,
  void,
  {
    state: TransactionsState;
    extra: TransactionExtra;
  }
>("transactions/revealAmounts", async (_, { getState, extra }) => {
  const { biometricService, loggerService } = extra;
  const showAmounts = getState().showAmounts;

  if (showAmounts) {
    return false;
  } else {
    try {
      const success = await biometricService.authenticateUser();
      return success;
    } catch (e) {
      loggerService.logError({
        funName: "revealAmounts",
        message: "Failed to authenticate user",
        error: e,
      });

      return false;
    }
  }
});
