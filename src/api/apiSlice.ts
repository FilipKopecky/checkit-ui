// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariable } from "../utils/environment";
import { getToken } from "../components/auth/utils";
import Constants from "../utils/Constants";
import { User } from "../model/User";
import Endpoints, { getAdminRoleSwitch } from "./Endpoints";
// Define our single API slice object
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
    modifyAdmin: builder.mutation({
      query: (user) => ({
        url: getAdminRoleSwitch(user.id),
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: !user.admin,
      }),
      invalidatesTags: ["ALL_USERS"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useModifyAdminMutation,
} = apiSlice;
