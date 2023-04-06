import { CommentData } from "./CommentData";
import { VocabularyData } from "./Vocabulary";

export type ChangeState = "NOT_REVIEWED" | "APPROVED" | "REJECTED";
export type ChangeType = "CREATED" | "MODIFIED" | "REMOVED" | "ROLLBACKED";
export interface ObjectData {
  value: string;
  type?: string;
  languageTag?: string;
}
export interface Change {
  id: string;
  uri: string;
  vocabularyUri: string;
  publicationId: string;
  type: ChangeType;
  subject: string;
  predicate: string;
  object: ObjectData;
  newObject?: ObjectData;
  comments: CommentData[];
  state: ChangeState;
  label: string;
  declineMessage?: CommentData;
  gestored: boolean;
}

export interface VocabularyChanges extends VocabularyData {
  gestored: boolean;
  changes: Change[];
}
