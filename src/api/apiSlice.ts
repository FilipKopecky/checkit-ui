import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariable } from "../utils/environment";
import { getToken } from "../components/auth/utils";
import Constants from "../utils/Constants";
import { User } from "../model/User";
import Endpoints, {
  getAdminRoleSwitch,
  getVocabularyGestorAssign,
} from "./Endpoints";
import { createSelector } from "@reduxjs/toolkit";
import { Vocabulary } from "../model/Vocabulary";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvVariable("VITE_SERVER"),
    prepareHeaders: (headers) => {
      headers.set(Constants.HEADERS.AUTHORIZATION, getToken());
      return headers;
    },
  }),
  tagTypes: ["ALL_USERS", "ALL_VOCABULARIES"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => Endpoints.GET_ALL_USERS,
      keepUnusedDataFor: 30,
      providesTags: ["ALL_USERS"],
    }),
    getAllVocabularies: builder.query<Vocabulary[], void>({
      query: () => Endpoints.GET_ALL_VOCABULARIES,
      providesTags: ["ALL_VOCABULARIES"],
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => Endpoints.CURRENT_USER,
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
          apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
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
          apiSlice.util.updateQueryData(
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
          apiSlice.util.updateQueryData(
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
});

export const {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useModifyAdminMutation,
  useGetAllVocabulariesQuery,
  useAddGestorToVocabularyMutation,
  useRemoveGestorFromVocabularyMutation,
} = apiSlice;

//TODO: Think about these selectors, not sure if this is good way of approaching things
export const selectUsersResult = apiSlice.endpoints.getAllUsers.select();
export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? []
);
export const selectAdmins = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.admin)
);
