import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
import { Change } from "../model/Change";

interface EventSliceState {
  changeScrollIndex: number;
  changeScrollDate: number;
  availableItems: { id: string; index: number }[];
}

const initialState: EventSliceState = {
  changeScrollIndex: 0,
  changeScrollDate: Date.now(),
  availableItems: [],
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
    setUpAvailableItems: (state, action: PayloadAction<Change[]>) => {
      const arr = [];
      for (let i = 0; i < action.payload.length; i++) {
        const change = action.payload[i];
        if (
          change.state === "NOT_REVIEWED" ||
          (change.state === "REJECTED" && !change.rejectionComment)
        ) {
          arr.push({ id: change.id, index: i });
        }
      }
      state.availableItems = arr;
    },
    scrollToNextAvailableItem: (state, action: PayloadAction<string>) => {
      const calledFrom = state.availableItems.findIndex(
        (item) => item.id === action.payload
      );
      if (state.availableItems.length === 1) {
        state.changeScrollIndex = 0;
      } else if (calledFrom === state.availableItems.length - 1) {
        state.changeScrollIndex = state.availableItems[0].index;
      } else {
        state.changeScrollIndex = state.availableItems[calledFrom + 1].index;
      }
      state.changeScrollDate = Date.now();
    },
  },
});

export const {
  scrollInChangeList,
  setUpAvailableItems,
  scrollToNextAvailableItem,
} = eventSlice.actions;

export const selectEvent = (state: RootState): EventSliceState => state.event;
export default eventSlice.reducer;
