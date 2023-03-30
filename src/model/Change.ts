import { CommentData } from "./CommentData";
import { VocabularyData } from "./Vocabulary";

export type ChangeState = "NOT_REVIEWED" | "APPROVED" | "REJECTED";
export type ChangeType = "CREATED" | "MODIFIED" | "DELETED" | "ROLLBACKED";
export interface Change {
  id: string;
  uri: string;
  vocabularyUri: string;
  publicationId: string;
  type: ChangeType;
  subject: string;
  predicate: string;
  object: string;
  newObject?: string;
  comments: CommentData[];
  state: ChangeState;
  label: string;
  declineMessage?: CommentData;
}

export interface VocabularyChanges extends VocabularyData {
  changes: Change[];
}
