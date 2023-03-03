import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
import { apiSlice } from "../api/apiSlice";

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
    builder.addMatcher(
      apiSlice.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.roles = payload.roles;
        state.id = payload.id;
        state.status = "idle";
        state.isAdmin = payload.roles.includes("ROLE_ADMIN");
        state.loggedIn = true;
      }
    );
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState): UserState => state.user;

export default userSlice.reducer;
