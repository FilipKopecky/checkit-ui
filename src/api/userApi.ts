import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<any, void>({
      query: () => Endpoints.CURRENT_USER,
    }),
  }),
  overrideExisting: false,
});

export const { useGetCurrentUserQuery } = userApi;
