// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariable } from "../utils/environment";
import { getToken } from "../components/auth/utils";
import Constants from "../utils/Constants";
import { User } from "../model/User";
import Endpoints from "./Endpoints";

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
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => Endpoints.GET_ALL_USERS,
      keepUnusedDataFor: 30,
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => Endpoints.CURRENT_USER,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetAllUsersQuery, useGetCurrentUserQuery } = apiSlice;
