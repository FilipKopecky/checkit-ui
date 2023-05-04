import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
export interface PublicationsSliceState {
  activeTab: string;
}

const initialState: PublicationsSliceState = {
  activeTab: "available",
};

export const publicationsSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {
    changePublicationTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { changePublicationTab } = publicationsSlice.actions;

export const selectPublications = (state: RootState): PublicationsSliceState =>
  state.publications;

export default publicationsSlice.reducer;
