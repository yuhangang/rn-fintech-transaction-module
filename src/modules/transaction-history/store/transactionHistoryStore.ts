import {
  combineReducers,
  configureStore,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { IBiometricService } from "../../core/services/biometricService";
import { ILoggerService } from "../../core/services/loggerService";
import { Transaction } from "../models/Transaction";
import { ITransactionService } from "../services/transctionService";
import transactionReducer from "./slices/transactionSlice";

export type TransactionsState = {
  transactions: Transaction[];
  showAmounts: boolean;
  loading: boolean;
  error: string | null;
};

export type TransactionExtra = {
  transactionService: ITransactionService;
  biometricService: IBiometricService;
  loggerService: ILoggerService;
};

export const createTransactionHistoryStore = ({
  transactionService,
  biometricService,
  loggerService,
}: TransactionExtra) => {
  return configureStore({
    reducer: transactionReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: <TransactionExtra>{
            transactionService: transactionService,
            biometricService: biometricService,
            loggerService: loggerService,
          },
        },
      }),
  });
};

export type TransactionHistoryDispatch = ThunkDispatch<
  TransactionsState,
  TransactionExtra,
  UnknownAction
>;
