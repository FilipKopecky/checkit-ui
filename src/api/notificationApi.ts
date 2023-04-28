import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";
import { Notification } from "../model/Notification";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      Notification[],
      { languageTag: string; pageNumber?: number }
    >({
      query: (params) => ({
        url: Endpoints.NOTIFICATIONS,
        params: {
          languageTag: params.languageTag.slice(0, 2),
          pageNumber: params.pageNumber,
        },
      }),
      providesTags: ["ALL_NOTIFICATIONS"],
    }),
    resolveSeenNotification: builder.mutation<
      Notification,
      Partial<Notification>
    >({
      query(data) {
        return {
          url: Endpoints.NOTIFICATIONS_SEEN,
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: `"${data.uri}"`,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationsQuery, useResolveSeenNotificationMutation } =
  notificationApi;
