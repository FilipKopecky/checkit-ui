import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
import { fetchCurrentUser } from "../components/api/UserAPI";

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
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.roles = action.payload.roles;
        state.id = action.payload.id;
        state.status = "idle";
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        if (!action.meta.aborted) {
          state.status = "error";
        }
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;

export default userSlice.reducer;
