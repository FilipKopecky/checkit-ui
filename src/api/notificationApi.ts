import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      Notification[],
      { languageTag: string; pageNumber?: number }
    >({
      query: (params) => ({
        url: Endpoints.NOTIFICATIONS,
        params: { languageTag: params.languageTag.slice(0, 2) },
      }),
      providesTags: ["ALL_NOTIFICATIONS"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationsQuery } = notificationApi;
