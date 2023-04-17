import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";
import { CommentData } from "../model/CommentData";
import { ChangedVocabularyIdentity } from "../model/Change";

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
    addRejectionChangeComment: builder.mutation<
      CommentData,
      Partial<CommentData> & ChangedVocabularyIdentity
    >({
      query(data) {
        const { uri, content } = data;
        return {
          url: Endpoints.REJECT_COMMENT_CHANGE,
          method: "POST",
          params: { changeUri: uri },
          headers: {
            "content-type": "text/plain",
          },
          body: content,
        };
      },
      invalidatesTags: (result, error, arg) => [
        {
          type: "VOCABULARY_CHANGES",
          id: `${arg.publicationId}_${arg.vocabularyUri}`,
        },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChangeCommentsQuery,
  useAddCommentMutation,
  useAddRejectionChangeCommentMutation,
} = commentApi;
