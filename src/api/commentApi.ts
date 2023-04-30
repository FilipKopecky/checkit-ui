import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";
import { CommentData } from "../model/CommentData";
import { ChangedVocabularyIdentity } from "../model/Change";
import { publicationApi } from "./publicationApi";

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
    addComment: builder.mutation<
      CommentData,
      Partial<CommentData> & ChangedVocabularyIdentity
    >({
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
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const changeUpdate = dispatch(
          publicationApi.util.updateQueryData(
            "getVocabularyChanges",
            {
              vocabularyUri: patch.vocabularyUri!,
              publicationId: patch.publicationId!,
            },
            (draft) => {
              const change = draft.changes.find(
                (change) => change.uri === patch.uri
              )!;
              Object.assign(change, {
                numberOfComments: change.numberOfComments + 1,
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          changeUpdate.undo();
        }
      },
      invalidatesTags: ["COMMENTS"],
    }),
    addRejectionChangeComment: builder.mutation<
      CommentData,
      Partial<CommentData> & ChangedVocabularyIdentity
    >({
      query(data) {
        const { topic, content } = data;
        return {
          url: Endpoints.REJECT_COMMENT_CHANGE,
          method: "POST",
          params: { changeUri: topic },
          headers: {
            "content-type": "text/plain",
          },
          body: content,
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const changeUpdate = dispatch(
          publicationApi.util.updateQueryData(
            "getVocabularyChanges",
            {
              vocabularyUri: patch.vocabularyUri!,
              publicationId: patch.publicationId!,
            },
            (draft) => {
              Object.assign(
                draft.changes.find((change) => change.uri === patch.topic)!,
                {
                  rejectionComment: {
                    uri:
                      "generated/http://rdfs.org/sioc/types#Comment_instance" +
                      Math.floor(Math.random() * 1_000_000),
                    topic: patch.topic,
                    author: patch.author,
                    content: patch.content,
                    creationDate: new Date(Date.now()).getTime(),
                    lastModificationDate: new Date(Date.now()).getTime(),
                  },
                }
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          changeUpdate.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChangeCommentsQuery,
  useAddCommentMutation,
  useAddRejectionChangeCommentMutation,
} = commentApi;
