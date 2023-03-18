import { Vocabulary } from "./Vocabulary";

export interface Publication {
  id: string;
  uri: string;
  label: string;
  projectUri: string;
  state: string;
  affectedVocabularies: Vocabulary[];
}
