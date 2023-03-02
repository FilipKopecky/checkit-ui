import { createAsyncThunk } from "@reduxjs/toolkit";
import Ajax from "../utils/Ajax";
import Endpoints from "./Endpoints";

/**
 * Fetches all users known to the system
 */
export const fetchAllUsers = createAsyncThunk(
  "users/all",
  async (arg, thunkAPI) => {
    const response = await Ajax.get(Endpoints.GET_ALL_USERS, {
      signal: thunkAPI.signal,
    });
    return response.data;
  },
  {
    condition: (arg, { getState }) => {
      // @ts-ignore
      const currentState = getState().users.status;
      const fetchStatus = currentState.status;
      if (fetchStatus === "fulfilled" || fetchStatus === "loading") {
        return false;
      }
    },
  }
);
