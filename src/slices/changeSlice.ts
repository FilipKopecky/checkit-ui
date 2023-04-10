import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { publicationApi } from "../api/publicationApi";
import { RootState } from "../store/CheckItStore";
import Constants from "../utils/Constants";

interface ChangeState {
  uri: string;
  expanded: boolean;
  activeTab: string;
}

const initialState: ChangeState[] = [];

const changeSlice = createSlice({
  name: "change",
  initialState,
  reducers: {
    toggleChange: (state, action: PayloadAction<string>) => {
      let change = state.find((change) => change.uri === action.payload);
      change!.expanded = !change!.expanded;
    },
    switchTab: (state, action: PayloadAction<{ uri: string; tab: string }>) => {
      let change = state.find((change) => change.uri === action.payload.uri);
      change!.activeTab = action.payload.tab;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      publicationApi.endpoints.getVocabularyChanges.matchFulfilled,
      (state, { payload }) => {
        for (const change of payload.changes) {
          state.push({
            uri: change.uri,
            expanded:
              change.state === "NOT_REVIEWED" ||
              (change.state === "REJECTED" && !change.declineMessage),
            activeTab: Constants.CHANGE_DETAIL.TABS.BASIC,
          });
        }
      }
    );
  },
});

export const { toggleChange, switchTab } = changeSlice.actions;

export const selectChanges = (state: RootState): ChangeState[] => state.change;
export const selectChangeId = (state: RootState, id: string) => id;
export const selectChangeByUri = createSelector(
  [selectChanges, selectChangeId],
  (items, itemId) => items.find((item) => item.uri === itemId)
);
export default changeSlice.reducer;
