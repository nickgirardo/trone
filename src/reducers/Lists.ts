import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type List = {
  project: string;
  name: string;
};

export type ListWithId = List & { id: string };

const initialState: { [k: string]: List } = {};

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
      state[crypto.randomUUID()] = action.payload;
    },
  },
});

export const { createList } = listsSlice.actions;
