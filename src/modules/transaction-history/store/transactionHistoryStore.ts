import {
  configureStore,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { DependencyContainer } from "../../core/di/dependencyContainer";
import { IBiometricService } from "../../core/services/biometricService";
import { ITransactionService } from "../services/transctionService";
import transactionReducer from "./slices/transactionSlice";

export const createTransactionHistoryStore = ({
  transactionService,
  biometricService,
}: {
  transactionService: ITransactionService;
  biometricService: IBiometricService;
}) => {
  return configureStore({
    reducer: {
      transactions: transactionReducer,
    },
    middleware: (getDefaultMiddleware) => {
      let dependencyContainer = DependencyContainer.getInstance();

      return getDefaultMiddleware({
        thunk: {
          extraArgument: {
            transactionService: transactionService,
            biometricService: biometricService,
          },
        },
      });
    },
  });
};

export type TransactionHistoryDispatch = ThunkDispatch<
  {
    transactions: ReturnType<typeof transactionReducer>;
  },
  {
    transactionService: ITransactionService;
    biometricService: IBiometricService;
  },
  UnknownAction
>;
