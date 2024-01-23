import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
  createSelector,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { dbMiddleware } from "./dbMiddleware";

// Reducers/ Slices
import { Project, projectsSlice } from "./reducers/Projects";
import { List, listsSlice } from "./reducers/Lists";
import { Card, cardsSlice } from "./reducers/Cards";

// NOTE defining this manually rather than using `ReturnType<typeof store.getState>` to avoid
// circular references in the type system :(
export type RootState = {
  projects: {
    currentProject: string | null;
    projects: Record<string, Project>;
  };
  lists: Record<string, List>;
  cards: Record<string, Card>;
};

// TODO any
const logger: Middleware = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const store = (preloadedState: RootState) =>
  configureStore({
    reducer: {
      projects: projectsSlice.reducer,
      lists: listsSlice.reducer,
      cards: cardsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dbMiddleware).concat(logger),
    preloadedState,
  });

export type AppDispatch = ReturnType<typeof store>["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppSelector = createSelector.withTypes<RootState>();
