import { createAsyncThunk } from "@reduxjs/toolkit";
import Ajax from "../utils/Ajax";
import Endpoints from "./Endpoints";

/**
 * Fetches currently loged in user
 */
export const fetchCurrentUser = createAsyncThunk(
  "user/login",
  async (arg, thunkAPI) => {
    const response = await Ajax.get(Endpoints.CURRENT_USER, {
      signal: thunkAPI.signal,
    });
    return response.data;
  },
  {
    condition: (arg, { getState }) => {
      // @ts-ignore
      const currentState = getState().user.status;
      const fetchStatus = currentState.status;
      if (fetchStatus === "fulfilled" || fetchStatus === "loading") {
        return false;
      }
    },
  }
);
