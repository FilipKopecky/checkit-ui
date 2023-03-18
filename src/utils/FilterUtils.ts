import { Vocabulary } from "../model/Vocabulary";

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
