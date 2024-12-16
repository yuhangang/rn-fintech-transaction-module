import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice"; // Example slice
import { TransactionService } from "../services/transctionService";
import { BiometricService } from "../../core/services/biometricService";

export const transactionHistoryStore = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          transactionService: TransactionService,
          biometricService: BiometricService,
        },
      },
    }),
});

// TypeScript-specific: Define RootState and AppDispatch
export type TransactionHistoryState = ReturnType<
  typeof transactionHistoryStore.getState
>;
export type TransactionHistoryDispatch =
  typeof transactionHistoryStore.dispatch;
