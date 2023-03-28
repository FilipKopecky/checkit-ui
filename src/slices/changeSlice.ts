import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { publicationApi } from "../api/publicationApi";
import { RootState } from "../store/CheckItStore";

interface ChangeState {
  uri: string;
  expanded: boolean;
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      publicationApi.endpoints.getVocabularyChanges.matchFulfilled,
      (state, { payload }) => {
        for (const change of payload.changes) {
          state.push({ uri: change.uri, expanded: true });
        }
      }
    );
  },
});

export const { toggleChange } = changeSlice.actions;

export const selectChanges = (state: RootState): ChangeState[] => state.change;
export const selectChangeId = (state: RootState, id: string) => id;
export const selectChangeById = createSelector(
  [selectChanges, selectChangeId],
  (items, itemId) => items.find((item) => item.uri === itemId)
);
export default changeSlice.reducer;
