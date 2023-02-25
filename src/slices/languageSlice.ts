import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/CheckItStore";
import { getLocalisedMessages, saveLanguagePreference } from "../utils/IntUtil";

//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux

export interface LanguageState {
  messages: {};
  language: string;
}

const initialState: LanguageState = getLocalisedMessages();
export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      saveLanguagePreference(action.payload);
      return getLocalisedMessages();
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.language;

export default languageSlice.reducer;
