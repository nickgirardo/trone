import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type List = {
  project: string;
  // id as UUIDv4
  id: string;
  name: string;
};

const initialState = [] as Array<List>;

// TODO potential future actions
// - rename list
// - delete list
export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createList: (
      state,
      action: PayloadAction<{ project: string; name: string }>
    ) => {
      state.push({ ...action.payload, id: crypto.randomUUID() });
    },
  },
});

export const { createList } = listsSlice.actions;
