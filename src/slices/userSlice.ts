import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
import { fetchCurrentUser } from "../api/UserAPI";

export interface UserState {
  status: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: string[];
  isAdmin: boolean;
  loggedIn: boolean;
}

const initialState: UserState = {
  firstName: "",
  id: "",
  lastName: "",
  roles: [],
  status: "idle",
  isAdmin: false,
  loggedIn: false,
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
        state.isAdmin = action.payload.roles.includes("ROLE_ADMIN");
        state.loggedIn = true;
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
