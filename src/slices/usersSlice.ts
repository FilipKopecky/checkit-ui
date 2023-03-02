import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/CheckItStore";
import { fetchAllUsers } from "../api/UsersAPI";
import { User } from "../model/User";

interface UserMap {
  [key: string]: User;
}
export const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState({ status: "idle" });

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearAllUsers: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        const byId = action.payload.reduce((byId: UserMap, user: User) => {
          byId[user.id] = user;
          return byId;
        }, {});
        state.entities = byId;
        state.ids = Object.keys(byId);
        state.status = "idle";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        if (!action.meta.aborted) {
          state.status = "error";
        }
      });
  },
});

export const { clearAllUsers } = usersSlice.actions;

export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(
  (state: RootState) => state.users
);
export const selectUsersStatus = (state: RootState) => state.user.status;

export default usersSlice.reducer;
