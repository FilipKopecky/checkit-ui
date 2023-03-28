import { Comment } from "./Comment";
import { VocabularyData } from "./Vocabulary";

export interface Change {
  id: string;
  uri: string;
  type: "CREATED" | "MODIFIED" | "DELETED" | "ROLLBACKED";
  subject: string;
  predicate: string;
  object: string;
  newObject?: string;
  comments: Comment[];
  state: "NOT_REVIEWED" | "ACCEPTED" | "REJECTED";
  label: string;
}

export interface VocabularyChanges extends VocabularyData {
  changes: Change[];
}
