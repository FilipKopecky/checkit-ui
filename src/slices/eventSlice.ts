import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";

interface EventSliceState {
  changeScrollIndex: number;
  changeScrollDate: number;
}

const initialState: EventSliceState = {
  changeScrollIndex: 0,
  changeScrollDate: Date.now(),
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    scrollInChangeList: (
      state,
      action: PayloadAction<{ date: number; index: number }>
    ) => {
      state.changeScrollIndex = action.payload.index;
      state.changeScrollDate = action.payload.date;
    },
  },
});

export const { scrollInChangeList } = eventSlice.actions;

export const selectEvent = (state: RootState): EventSliceState => state.event;
export default eventSlice.reducer;
