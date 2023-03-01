import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
import Constants from "../utils/Constants";
export interface AdminPanelSliceState {
  activeTab: string;
}

const initialState: AdminPanelSliceState = {
  activeTab: Constants.ADMIN.PANEL.REQUESTS,
};

export const adminPanelSlice = createSlice({
  name: "admin.panel",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { changeTab } = adminPanelSlice.actions;

export const selectAdminPanel = (state: RootState): AdminPanelSliceState =>
  state.adminPanel;

export default adminPanelSlice.reducer;
