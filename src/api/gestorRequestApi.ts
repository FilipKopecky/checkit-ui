import { apiSlice } from "./apiSlice";
import Endpoints, { getGestorRequestResolve } from "./Endpoints";
import { GestorRequest } from "../model/GestorRequest";
import { adminApi } from "./adminApi";
import { Vocabulary } from "../model/Vocabulary";

export const gestorRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGestorRequests: builder.query<GestorRequest[], void>({
      query: () => Endpoints.GET_ALL_GESTOR_REQUESTS,
      providesTags: ["ALL_GESTOR_REQUESTS"],
      transformResponse: (rawResult: GestorRequest[]) => {
        return rawResult.map((result) => {
          return { ...result, state: "pending" };
        });
      },
    }),
    getMyGestorRequests: builder.query<GestorRequest[], void>({
      query: () => Endpoints.GET_MY_GESTORING_REQUESTS,
      providesTags: ["MY_GESTORING_REQUESTS"],
    }),
    resolveGestorRequest: builder.mutation<
      GestorRequest,
      Partial<GestorRequest>
    >({
      query(data) {
        const { id, ...content } = data;
        return {
          url: getGestorRequestResolve(id!),
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: content.approved,
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        //Local update of admin panel summary
        const adminPanelSummaryupdate = dispatch(
          adminApi.util.updateQueryData(
            "getAdminPanelSummary",
            undefined,
            (draft) => {
              Object.assign(draft, {
                pendingGestoringRequestCount:
                  draft.pendingGestoringRequestCount - 1,
              });
            }
          )
        );
        //Localy update the state of the request -> used for showing the state of the request
        const allGestorRequestUpdate = dispatch(
          gestorRequestApi.util.updateQueryData(
            "getAllGestorRequests",
            undefined,
            (draft) => {
              Object.assign(
                draft.find((request) => request.id === patch.id)!,
                patch
              );
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          adminPanelSummaryupdate.undo();
          allGestorRequestUpdate.undo();
        }
      },
      invalidatesTags: [
        "ALL_VOCABULARIES",
        "MY_GESTORING_REQUESTS",
        "MY_GESTORED_VOCABULARIES",
      ],
    }),
    addGestorRequest: builder.mutation<void, Partial<Vocabulary>>({
      query(data) {
        return {
          url: Endpoints.GET_ALL_GESTOR_REQUESTS,
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: `"${data.uri}"`,
        };
      },
      invalidatesTags: [
        "ALL_GESTOR_REQUESTS",
        "MY_GESTORING_REQUESTS",
        "ADMIN_PANEL_SUMMARY",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllGestorRequestsQuery,
  useResolveGestorRequestMutation,
  useAddGestorRequestMutation,
  useGetMyGestorRequestsQuery,
} = gestorRequestApi;
