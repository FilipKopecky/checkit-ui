import { apiSlice } from "./apiSlice";
import Endpoints from "./Endpoints";
import { PublicationContext } from "../model/Publication";

export const publicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelevantPublications: builder.query<PublicationContext[], void>({
      query: () => Endpoints.GET_ALL_RELEVANT_PUBLICATIONS,
      providesTags: ["ALL_RELEVANT_PUBLICATIONS"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRelevantPublicationsQuery } = publicationApi;
