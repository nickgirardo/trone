import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type List = {
  project: string;
  name: string;
  index: number;
};

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
      // Index here is the number of the lists already in the project
      // This will place the new list after all existing lists
      const index = Object.values(state).filter(
        (list) => list.project === action.payload.project
      ).length;
      state[crypto.randomUUID()] = { index, ...action.payload };
    },
    moveList: (
      state,
      action: PayloadAction<{ id: string; newIndex: number }>
    ) => {
      const { id, newIndex } = action.payload;

      const project = state[id].project;
      const oldIndex = state[id].index;

      if (oldIndex === newIndex) return;

      if (oldIndex > newIndex) {
        // Moving list up among lists of the project
        for (const list of Object.values(state)) {
          if (
            list.project === project &&
            list.index < oldIndex &&
            list.index >= newIndex
          )
            list.index++;
        }
      } else {
        // Moving list up among lists of the project
        for (const list of Object.values(state)) {
          if (
            list.project === project &&
            list.index > oldIndex &&
            list.index <= newIndex
          )
            list.index--;
        }
      }

      state[id].index = newIndex;
    },
  },
});

export const { createList, moveList } = listsSlice.actions;
