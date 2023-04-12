import { createSlice } from "@reduxjs/toolkit";
import { publicationApi } from "../api/publicationApi";
import { RootState } from "../store/CheckItStore";

export interface LabelCacheState {
  [key: string]: string;
}

const initialState: LabelCacheState = {};

const labelCacheSlice = createSlice({
  name: "labelCache",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      publicationApi.endpoints.getPublicationById.matchFulfilled,
      (state, { payload }) => {
        if (!state[payload.uri]) {
          state[payload.id] = payload.label;
          for (const vocabulary of payload.affectedVocabularies) {
            if (!state[vocabulary.uri]) {
              state[vocabulary.uri] = vocabulary.label;
            }
          }
        }
      }
    );
    builder.addMatcher(
      publicationApi.endpoints.getVocabularyChanges.matchFulfilled,
      (state, { payload }) => {
        //TODO: Add publicationId and its label after server is modified
        if (!state[payload.uri]) {
          state[payload.uri] = payload.label;
        }
      }
    );
  },
});

export const selectLabelCache = (state: RootState) => state.labelCache;

export default labelCacheSlice.reducer;
