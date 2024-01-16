import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Card = {
  list: string;
  name: string;
  index: number;
};

const initialState: { [k: string]: Card } = {};

// TODO potential future actions
// - rename card
// - delete card
export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    createCard: (
      state,
      action: PayloadAction<{ list: string; name: string }>
    ) => {
      // Index here is the length of the cards already in the list
      // This will place the card after all existing cards
      const index = Object.values(state).filter(
        (card) => card.list === action.payload.list
      ).length;
      state[crypto.randomUUID()] = {
        ...action.payload,
        index,
      };
    },
    moveCard: (
      state,
      action: PayloadAction<{ id: string; newList: string; newIndex: number }>
    ) => {
      const { id, newList, newIndex } = action.payload;

      const oldIndex = state[id].index;
      const oldList = state[id].list;

      if (oldList !== newList) {
        // Move between different lists
        for (const card of Object.values(state)) {
          // Move cards up from old list
          if (card.list === oldList && card.index > oldIndex) card.index--;
          // Move cards down in new list
          else if (card.list === newList && card.index >= newIndex)
            card.index++;
        }
      } else {
        // Move within a list
        if (oldIndex === newIndex) return;

        if (oldIndex > newIndex) {
          // Moving cards up in a list
          for (const card of Object.values(state)) {
            if (
              card.list === newList &&
              card.index < oldIndex &&
              card.index >= newIndex
            )
              card.index++;
          }
        } else {
          // Moving cards down in a list
          for (const card of Object.values(state)) {
            if (
              card.list === newList &&
              card.index > oldIndex &&
              card.index <= newIndex
            )
              card.index--;
          }
        }
      }

      state[id].list = newList;
      state[id].index = newIndex;
    },
  },
});

export const { createCard, moveCard } = cardsSlice.actions;
