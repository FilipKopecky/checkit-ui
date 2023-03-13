import { apiSlice } from "./apiSlice";
import { User } from "../model/User";
import Endpoints, {
  getAdminRoleSwitch,
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
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
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
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getAllGestorRequests: builder.query<
      { [key: string]: GestorRequest[] },
      void
    >({
      query: () => Endpoints.GET_ALL_GESTOR_REQUESTS,
      providesTags: ["ALL_GESTOR_REQUESTS"],
      transformResponse: (rawResult: GestorRequest[]) => {
        //Group requests by vocabulary
        return rawResult.reduce<{
          [key: string]: GestorRequest[];
        }>(function (r, a) {
          r[a.vocabulary.uri] = r[a.vocabulary.uri] || [];
          r[a.vocabulary.uri].push(a);
          return r;
        }, Object.create(null));
      },
    }),
    getAdminPanelSummary: builder.query<AdminPanelSummary, void>({
      query: () => Endpoints.GET_ADMIN_PANEL_SUMMARY,
      providesTags: ["ADMIN_PANEL_SUMMARY"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useAddGestorToVocabularyMutation,
  useRemoveGestorFromVocabularyMutation,
  useModifyAdminMutation,
  useGetAllGestorRequestsQuery,
  useGetAdminPanelSummaryQuery,
} = adminApi;
