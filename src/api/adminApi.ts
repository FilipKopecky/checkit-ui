import { apiSlice } from "./apiSlice";
import { User } from "../model/User";
import Endpoints, {
  getAdminRoleSwitch,
  getVocabularyGestorAssign,
} from "./Endpoints";
import { Vocabulary } from "../model/Vocabulary";
import { createSelector } from "@reduxjs/toolkit";
import { vocabularyApi } from "./vocabularyApi";

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
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllUsers", undefined, (draft) => {
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
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useAddGestorToVocabularyMutation,
  useRemoveGestorFromVocabularyMutation,
  useModifyAdminMutation,
} = adminApi;

export const selectUsersResult = adminApi.endpoints.getAllUsers.select();
export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? []
);
export const selectAdmins = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.admin)
);
