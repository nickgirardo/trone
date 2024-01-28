import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum DelProjWarning {
  Always = "Always",
  Never = "Never",
  OnlyWithLists = "Only if it has lists",
}

export enum DelListWarning {
  Always = "Always",
  Never = "Never",
  OnlyWithCards = "Only if it has cards",
}

export enum DelCardWarning {
  Always = "Always",
  Never = "Never",
}

export type Preferences = {
  delProjWarning: DelProjWarning;
  delListWarning: DelListWarning;
  delCardWarning: DelCardWarning;
};

export const defaultPrefs: Preferences = {
  delProjWarning: DelProjWarning.OnlyWithLists,
  delListWarning: DelListWarning.OnlyWithCards,
  delCardWarning: DelCardWarning.Always,
};

// TODO maybe just a single reducer
export const preferencesSlice = createSlice({
  name: "preferences",
  initialState: defaultPrefs,
  reducers: {
    // NOTE the unweildy name for this action is meant to discourage its use outside of import
    setPrefsForImport: (_state, action: PayloadAction<typeof defaultPrefs>) =>
      action.payload,
    setDelProjWarning: (state, action: PayloadAction<DelProjWarning>) => {
      state.delProjWarning = action.payload;
    },
    setDelListWarning: (state, action: PayloadAction<DelListWarning>) => {
      state.delListWarning = action.payload;
    },
    setDelCardWarning: (state, action: PayloadAction<DelCardWarning>) => {
      state.delCardWarning = action.payload;
    },
  },
});

export const {
  setPrefsForImport,
  setDelProjWarning,
  setDelListWarning,
  setDelCardWarning,
} = preferencesSlice.actions;
