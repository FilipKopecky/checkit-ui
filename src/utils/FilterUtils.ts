import { Vocabulary } from "../model/Vocabulary";
import { UserData } from "../model/User";

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

export const filterUsersByName = (users: UserData[], filterText: string) => {
  return users.filter((user) => {
    if (filterText === "") return true;
    else {
      return (
        user.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  });
};
