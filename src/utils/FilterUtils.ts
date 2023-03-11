import { Vocabulary } from "../model/Vocabulary";
import { User } from "../model/User";

export const filterVocabulariesByLabel = (
  vocabularies: Vocabulary[],
  filterText: string
): Vocabulary[] => {
  return vocabularies.filter((vocabulary) => {
    if (filterText === "") return true;
    else {
      return vocabulary.label.toLowerCase().includes(filterText.toLowerCase());
    }
  });
};

export const filterVocabulariesByGestor = (
  vocabularies: Vocabulary[],
  gestor: User
) => {
  //TODO: Maybe transform vocabulary data into a map for faster lookup
  const filteredVocabularies = [];
  for (const gestoredVocabulary of gestor.gestoredVocabularies) {
    filteredVocabularies.push(
      vocabularies.find((vocabulary) => {
        return vocabulary.uri === gestoredVocabulary;
      })
    );
  }
  return filteredVocabularies;
};
