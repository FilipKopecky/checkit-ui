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
export interface Change extends ChangedVocabularyIdentity {
  id: string;
  uri: string;
  type: ChangeType;
  subject: string;
  subjectType: SubjectType;
  predicate: string;
  object: ObjectData;
  newObject?: ObjectData;
  comments: CommentData[];
  state: ChangeState;
  label?: string;
  rejectionComment?: CommentData;
  gestored: boolean;
  publicationDate: Date;
  numberOfComments: number;
  rejectionCommentsOfOthers?: CommentData[];
}

export interface ChangedVocabularyIdentity {
  vocabularyUri: string;
  publicationId: string;
}

export interface VocabularyChanges extends VocabularyData {
  gestored: boolean;
  publicationId: string;
  publicationLabel: string;
  changes: Change[];
  publicationLastUpdate: Date;
}
