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

export const filterByGestorPresence = (vocabularies: Vocabulary[]) => {
  return vocabularies.filter((vocabulary) => vocabulary.gestors.length === 0);
};

export const filterVocabulariesByGestor = (
  vocabularies: Vocabulary[],
  gestor: User
): Vocabulary[] => {
  //TODO: Maybe transform vocabulary data into a map for faster lookup
  const filteredVocabularies: Vocabulary[] = [];
  for (const gestoredVocabulary of gestor.gestoredVocabularies) {
    const result = vocabularies.find((vocabulary) => {
      return vocabulary.uri === gestoredVocabulary;
    });
    if (result !== undefined) {
      filteredVocabularies.push(result);
    }
  }
  return filteredVocabularies;
};
