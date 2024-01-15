import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
  createSelector,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Reducers/ Slices
import { projectsSlice } from "./reducers/Projects";
import { listsSlice } from "./reducers/Lists";
import { cardsSlice } from "./reducers/Cards";

// TODO any
const logger: Middleware = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    lists: listsSlice.reducer,
    cards: cardsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppSelector = createSelector.withTypes<RootState>();
