import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Ajax from "../utils/Ajax";
import { RootState } from "../store/CheckItStore";

export interface UserState {
  status: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: string[];
}

const initialState: UserState = {
  firstName: "",
  id: "",
  lastName: "",
  roles: [],
  status: "idle",
};

export const fetchUser = createAsyncThunk("user/login", async () => {
  const response = await Ajax.get("users/current");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.roles = action.payload.roles;
        state.id = action.payload.id;
        state.status = "idle";
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
