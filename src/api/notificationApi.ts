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
      transformResponse: (rawResult: Notification[], meta, arg) => {
        return rawResult.map((result) => {
          return { ...result, pageNumber: arg.pageNumber! };
        });
      },
    }),
    getUnreadNotificationsCount: builder.query<number, void>({
      query: () => Endpoints.NOTIFICATIONS_UNREAD_COUNT,
    }),
    resolveSeenNotification: builder.mutation<
      Notification,
      Partial<Notification> & { languageTag: string; pageNumber?: number }
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
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const notificationPatch = dispatch(
          notificationApi.util.updateQueryData(
            "getNotifications",
            {
              languageTag: patch.languageTag,
              pageNumber: patch.pageNumber,
            },
            (draft) => {
              Object.assign(
                draft.find((notification) => notification.uri === patch.uri)!,
                { readAt: new Date(Date.now()).getTime() }
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          notificationPatch.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useResolveSeenNotificationMutation,
  useGetUnreadNotificationsCountQuery,
} = notificationApi;
