import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariable } from "../utils/environment";
import { getToken } from "../components/auth/utils";
import Constants from "../utils/Constants";
import { User } from "../model/User";
import Endpoints, { getAdminRoleSwitch } from "./Endpoints";
import { createSelector } from "@reduxjs/toolkit";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvVariable("VITE_SERVER"),
    prepareHeaders: (headers) => {
      headers.set(Constants.HEADERS.AUTHORIZATION, getToken());
      return headers;
    },
  }),
  tagTypes: ["ALL_USERS"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => Endpoints.GET_ALL_USERS,
      keepUnusedDataFor: 30,
      providesTags: ["ALL_USERS"],
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => Endpoints.CURRENT_USER,
    }),
    modifyAdmin: builder.mutation<User, Partial<User>>({
      query(data) {
        const { id, ...content } = data;
        const modifiedPayload = content.admin;
        return {
          url: getAdminRoleSwitch(id!),
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: modifiedPayload,
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
            Object.assign(draft.find((user) => user.id === patch.id)!, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      //invalidatesTags: ["ALL_USERS"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useModifyAdminMutation,
} = apiSlice;

export const selectUsersResult = apiSlice.endpoints.getAllUsers.select();
export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? []
);
export const selectAdmins = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.admin)
);
