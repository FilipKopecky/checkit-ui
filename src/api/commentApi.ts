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
      transformResponse: (rawResult: CommentData[]) => {
        return rawResult.sort((a, b) => {
          return (
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
          );
        });
      },
      providesTags: (result, error, id) => [{ type: "COMMENTS", id }],
    }),
    addComment: builder.mutation<CommentData, Partial<CommentData>>({
      query(data) {
        const { uri, content } = data;
        return {
          url: Endpoints.COMMENTS,
          method: "POST",
          params: { changeUri: uri },
          headers: {
            "content-type": "text/plain",
          },
          body: content,
        };
      },
      invalidatesTags: ["COMMENTS"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetChangeCommentsQuery, useAddCommentMutation } = commentApi;
