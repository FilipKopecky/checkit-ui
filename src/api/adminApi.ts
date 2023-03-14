import { apiSlice } from "./apiSlice";
import { User } from "../model/User";
import Endpoints, {
  getAdminRoleSwitch,
  getGestorRequestResolve,
  getVocabularyGestorAssign,
} from "./Endpoints";
import { Vocabulary } from "../model/Vocabulary";
import { vocabularyApi } from "./vocabularyApi";
import { GestorRequest } from "../model/GestorRequest";
import { AdminPanelSummary } from "../model/AdminPanelSummary";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => Endpoints.GET_ALL_USERS,
      keepUnusedDataFor: 30,
      providesTags: ["ALL_USERS"],
    }),
    modifyAdmin: builder.mutation<User, Partial<User>>({
      query(data) {
        const { id, ...content } = data;
        return {
          url: getAdminRoleSwitch(id!),
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: content.admin,
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        //Change the local users state
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllUsers", undefined, (draft) => {
            Object.assign(draft.find((user) => user.id === patch.id)!, patch);
          })
        );
        //Change the local admin summary state
        const patchResult2 = dispatch(
          adminApi.util.updateQueryData(
            "getAdminPanelSummary",
            undefined,
            (draft) => {
              Object.assign(draft, {
                adminCount: patch.admin
                  ? draft.adminCount + 1
                  : draft.adminCount - 1,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResult2.undo();
        }
      },
    }),
    addGestorToVocabulary: builder.mutation<Vocabulary, Partial<Vocabulary>>({
      query(data) {
        const { gestors, ...content } = data;
        const id = gestors![gestors!.length - 1].id;
        return {
          url: getVocabularyGestorAssign(id),
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: `"${content.uri}"`,
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        //Local update of vocabularies
        const patchResult = dispatch(
          vocabularyApi.util.updateQueryData(
            "getAllVocabularies",
            undefined,
            (draft) => {
              Object.assign(
                draft.find((vocabulary) => vocabulary.uri === patch.uri)!,
                patch
              );
            }
          )
        );
        //Local update of admin panel summary
        const patchResult2 = dispatch(
          adminApi.util.updateQueryData(
            "getAdminPanelSummary",
            undefined,
            (draft) => {
              Object.assign(draft, {
                vocabularyWithGestorCount:
                  patch.gestors?.length === 1
                    ? draft.vocabularyWithGestorCount + 1
                    : draft.vocabularyWithGestorCount,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResult2.undo();
        }
      },
      //TODO Invalidate in local state without the API call
      invalidatesTags: ["ALL_USERS"],
    }),
    removeGestorFromVocabulary: builder.mutation<
      Vocabulary,
      Partial<Vocabulary> & Partial<User>
    >({
      query(data) {
        const { id, ...content } = data;
        return {
          url: getVocabularyGestorAssign(id!),
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: `"${content.uri}"`,
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          vocabularyApi.util.updateQueryData(
            "getAllVocabularies",
            undefined,
            (draft) => {
              //Remove the id of the gestor from the payload
              delete patch.id;
              Object.assign(
                draft.find((vocabulary) => vocabulary.uri === patch.uri)!,
                patch
              );
            }
          )
        );
        //Local update of admin panel summary
        const patchResult2 = dispatch(
          adminApi.util.updateQueryData(
            "getAdminPanelSummary",
            undefined,
            (draft) => {
              Object.assign(draft, {
                vocabularyWithGestorCount:
                  patch.gestors?.length === 0
                    ? draft.vocabularyWithGestorCount - 1
                    : draft.vocabularyWithGestorCount,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResult2.undo();
        }
      },
    }),
    getAllGestorRequests: builder.query<GestorRequest[], void>({
      query: () => Endpoints.GET_ALL_GESTOR_REQUESTS,
      providesTags: ["ALL_GESTOR_REQUESTS"],
      transformResponse: (rawResult: GestorRequest[]) => {
        return rawResult.map((result) => {
          return { ...result, state: "pending" };
        });
      },
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
        const patchResult = dispatch(
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

        const patchResult2 = dispatch(
          adminApi.util.updateQueryData(
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
          patchResult.undo();
          patchResult2.undo();
        }
      },
      invalidatesTags: ["ALL_VOCABULARIES"],
    }),
    getAdminPanelSummary: builder.query<AdminPanelSummary, void>({
      query: () => Endpoints.GET_ADMIN_PANEL_SUMMARY,
      providesTags: ["ADMIN_PANEL_SUMMARY"],
    }),
  }),
  overrideExisting: false,
});

//TODO: INvalidate admin panel summary after manual adding of user as a gestor
//TODO: invalidate admin data panel summary when redirecting? or after some time?

export const {
  useGetAllUsersQuery,
  useAddGestorToVocabularyMutation,
  useRemoveGestorFromVocabularyMutation,
  useModifyAdminMutation,
  useGetAllGestorRequestsQuery,
  useGetAdminPanelSummaryQuery,
  useResolveGestorRequestMutation,
} = adminApi;
