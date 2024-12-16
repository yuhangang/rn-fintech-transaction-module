import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthDispatch, AuthState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAuthDispatch = () => useDispatch<AuthDispatch>();
export const useAuthSelector: TypedUseSelectorHook<AuthState> = useSelector;
