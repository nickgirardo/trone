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
export const listsSlice = createSlice({
  name: "lists",
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

      // TODO this method of rearranging will leave gaps in the ordinals of both the moved card's
      // new and old list in certain cases
      // This is a problem, because the createCard method assumes that the an order of the length of
      // cards in a list will place it as the final card in a list
      // A simple compact method should be written and applied to the new and old lists after the bellow
      // However for now the buggy behaviour is acceptable
      const cardsToIncrement = Object.entries(state)
        .filter(
          ([_id, card]) => card.list === newList && card.order >= newOrder
        )
        .map(([id, _card]) => id);

      for (const card in cardsToIncrement) state[card].order++;

      state[id].list = newList;
      state[id].order = newOrder;
    },
  },
});

export const { createCard, moveCard } = listsSlice.actions;
