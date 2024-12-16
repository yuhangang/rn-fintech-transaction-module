// src/redux/transactionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "../../models/Transaction";
import { ITransactionService } from "../../services/transctionService";
import { IBiometricService } from "../../../core/services/biometricService";

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

// Interface for Transactions State
interface TransactionsState {
  transactions: Transaction[];
  showAmounts: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TransactionsState = {
  transactions: [],
  showAmounts: false,
  loading: false,
  error: null,
};

// Create transactions slice
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
      state.showAmounts = false;
    },
  },
  extraReducers: (builder) => {
    builder;
    // Fetch Transactions
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch transactions";
    });

    // Reveal Amounts
    builder.addCase(revealAmounts.fulfilled, (state, action) => {
      state.showAmounts = action.payload;
    });

    builder.addCase(revealAmounts.rejected, (state) => {
      state.error = "Biometric authentication failed";
    });
  },
});

export const { resetTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
