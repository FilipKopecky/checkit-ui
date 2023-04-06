import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";
import { CommentData } from "../model/CommentData";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChangeComments: builder.query<CommentData[], string>({
      query: (params) => ({
        url: Endpoints.CHANGE_COMMENTS,
        params: { changeUri: params },
      }),
      providesTags: (result, error, id) => [{ type: "COMMENTS", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetChangeCommentsQuery } = commentApi;
