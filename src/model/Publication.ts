import { Vocabulary } from "./Vocabulary";

export interface Publication {
  id: string;
  uri: string;
  label: string;
  projectUri: string;
  state: "IN_PROGRESS" | "ACCEPTED" | "DECLINED";
  progress: number;
  affectedVocabularies: Vocabulary[];
}
