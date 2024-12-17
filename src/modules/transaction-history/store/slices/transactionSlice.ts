// src/redux/transactionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { TransactionsState } from "../transactionHistoryStore";
import { fetchTransactions, revealAmounts } from "./transactionActions";

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
    resetTransactions: (state: TransactionsState) => {
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
