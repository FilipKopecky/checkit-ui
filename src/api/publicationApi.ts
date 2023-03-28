import { apiSlice } from "./apiSlice";
import Endpoints, { getPublication } from "./Endpoints";
import { Publication, PublicationContext } from "../model/Publication";

export const publicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelevantPublications: builder.query<PublicationContext[], void>({
      query: () => Endpoints.GET_ALL_RELEVANT_PUBLICATIONS,
      providesTags: ["ALL_RELEVANT_PUBLICATIONS"],
    }),
    getPublicationById: builder.query<Publication, string>({
      query: (id) => getPublication(id),
      providesTags: (result, error, id) => [{ type: "PUBLICATIONS", id }],
      //TODO: Remove transform after server returns gestors
      transformResponse: (rawResult: Publication) => {
        for (let i = 0; i < rawResult.affectedVocabularies.length; i++) {
          rawResult.affectedVocabularies[i].gestors = [];
        }
        return rawResult;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetRelevantPublicationsQuery, useGetPublicationByIdQuery } =
  publicationApi;
