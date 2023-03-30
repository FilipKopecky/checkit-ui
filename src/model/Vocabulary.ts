import { UserData } from "./User";

export interface Vocabulary extends VocabularyData {
  gestors: UserData[];
}

export interface VocabularyData {
  uri: string;
  label: string;
}

export interface PublicationVocabularyData extends VocabularyData {
  gestored: boolean;
  gestors: UserData[];
}
