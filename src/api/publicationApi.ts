import { apiSlice } from "./apiSlice";
import Endpoints, {
  getChangeResolve,
  getPublication,
  getPublicationVocabularyChanges,
} from "./Endpoints";
import { Publication, PublicationContext } from "../model/Publication";
import { Change, VocabularyChanges } from "../model/Change";

export const publicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelevantPublications: builder.query<PublicationContext[], void>({
      query: () => Endpoints.GET_ALL_RELEVANT_PUBLICATIONS,
      providesTags: ["ALL_RELEVANT_PUBLICATIONS"],
    }),
    getPublicationById: builder.query<Publication, string>({
      query: (id) => getPublication(id),
      providesTags: (result, error, id) => [{ type: "PUBLICATIONS", id }],
    }),
    getVocabularyChanges: builder.query<
      VocabularyChanges,
      { vocabularyUri: string; publicationId: string }
    >({
      query: (params) => ({
        url: getPublicationVocabularyChanges(params.publicationId),
        params: { vocabularyUri: params.vocabularyUri },
      }),
      //Adds vocabulary uri + publication id to each change -> needed for optimistic updates
      transformResponse: (rawResult: VocabularyChanges, meta, arg) => {
        for (let i = 0; i < rawResult.changes.length; i++) {
          rawResult.changes[i].vocabularyUri = rawResult.uri;
          rawResult.changes[i].publicationId = arg.publicationId;
        }
        return rawResult;
      },
    }),
    resolveChangeState: builder.mutation<Change, Partial<Change>>({
      query(data) {
        return {
          url: getChangeResolve(data.id!, data.state!),
          method: "POST",
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        //Local update of vocabulary changes
        const vocabularyChangesPatch = dispatch(
          publicationApi.util.updateQueryData(
            "getVocabularyChanges",
            {
              vocabularyUri: patch.vocabularyUri!,
              publicationId: patch.publicationId!,
            },
            (draft) => {
              Object.assign(
                draft.changes.find((change) => change.id === patch.id)!,
                patch
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          vocabularyChangesPatch.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRelevantPublicationsQuery,
  useGetPublicationByIdQuery,
  useGetVocabularyChangesQuery,
  useResolveChangeStateMutation,
} = publicationApi;
