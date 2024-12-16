import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  TransactionHistoryDispatch,
  TransactionHistoryState,
} from "./transactionHistoryStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TransactionHistoryDispatch>();
export const useAppSelector: TypedUseSelectorHook<TransactionHistoryState> =
  useSelector;
