import { CommentData } from "./CommentData";
import { VocabularyData } from "./Vocabulary";
import { Restriction } from "./Restriction";

export type ChangeState = "NOT_REVIEWED" | "APPROVED" | "REJECTED";
export type ChangeType = "CREATED" | "MODIFIED" | "REMOVED" | "ROLLBACKED";
export type SubjectType = "TERM" | "VOCABULARY" | "BLANK_NODE";
export interface ObjectData {
  value: string;
  type?: string;
  languageTag?: string;
  restriction?: Restriction;
}
export interface Change {
  id: string;
  uri: string;
  vocabularyUri: string;
  publicationId: string;
  type: ChangeType;
  subject: string;
  subjectType: SubjectType;
  predicate: string;
  object: ObjectData;
  newObject?: ObjectData;
  comments: CommentData[];
  state: ChangeState;
  label?: string;
  declineMessage?: CommentData;
  gestored: boolean;
}

export interface VocabularyChanges extends VocabularyData {
  gestored: boolean;
  changes: Change[];
}
