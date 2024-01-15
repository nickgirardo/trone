import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Card = {
  list: string;
  name: string;
  order: number;
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
      // Order here is the length of the cards already in the list
      // This will place the card after all existing cards
      const order = Object.values(state).filter(
        (card) => card.list === action.payload.list
      ).length;
      state[crypto.randomUUID()] = {
        ...action.payload,
        order,
      };
    },
    moveCard: (
      state,
      action: PayloadAction<{ id: string; newList: string; newOrder: number }>
    ) => {
      const { id, newList, newOrder } = action.payload;

      const oldOrder = state[id].order;
      const oldList = state[id].list;

      if (oldList !== newList) {
        // Move between different lists
        for (const card of Object.values(state)) {
          // Move cards up from old list
          if (card.list === oldList && card.order > oldOrder) card.order--;
          // Move cards down in new list
          else if (card.list === newList && card.order >= newOrder)
            card.order++;
        }
      } else {
        // Move within a list
        if (oldOrder === newOrder) return;

        if (oldOrder > newOrder) {
          // Moving cards up in a list
          for (const card of Object.values(state)) {
            if (
              card.list === newList &&
              card.order < oldOrder &&
              card.order >= newOrder
            )
              card.order++;
          }
        } else {
          // Moving cards down in a list
          for (const card of Object.values(state)) {
            if (
              card.list === newList &&
              card.order > oldOrder &&
              card.order <= newOrder
            )
              card.order--;
          }
        }
      }

      state[id].list = newList;
      state[id].order = newOrder;
    },
  },
});

export const { createCard, moveCard } = cardsSlice.actions;
