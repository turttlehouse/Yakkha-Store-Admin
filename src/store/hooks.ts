import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Defining a custom hook for redux dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// export const useAppSelector : TypedUseSelectorHook<RootState<any, any, any>> = useSelector

// Defining a custom hook for redux selector
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector