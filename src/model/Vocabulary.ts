import { User } from "./User";

export interface Vocabulary extends VocabularyData {
  gestors: User[];
}

export interface VocabularyData {
  uri: string;
  label: string;
}
