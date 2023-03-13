import { apiSlice } from "./apiSlice";
import { Vocabulary } from "../model/Vocabulary";
import Endpoints from "./Endpoints";

export const vocabularyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVocabularies: builder.query<Vocabulary[], void>({
      query: () => Endpoints.GET_ALL_VOCABULARIES,
      providesTags: ["ALL_VOCABULARIES"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllVocabulariesQuery } = vocabularyApi;
