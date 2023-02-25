import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/CheckItStore";

/**
 * These are custom TS Redux hooks. It is not required to define state type for each useSelector
 * and Dispatcher has all middleware type already loaded
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
