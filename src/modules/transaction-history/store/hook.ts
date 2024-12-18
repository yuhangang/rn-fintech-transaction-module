import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  TransactionHistoryDispatch,
  TransactionsState,
} from "./transactionHistoryStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTansactionHistoryDispatch = () =>
  useDispatch<TransactionHistoryDispatch>();
export const useTransactionHistorySelector: TypedUseSelectorHook<TransactionsState> =
  useSelector;
