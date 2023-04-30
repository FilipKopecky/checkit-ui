import { PublicationVocabularyData } from "./Vocabulary";
import { Statistics } from "./Statistics";
import { CommentData } from "./CommentData";

export interface Publication {
  id: string;
  uri: string;
  label: string;
  projectContext: string;
  state: PublicationContextState;
  progress: number;
  affectedVocabularies: PublicationVocabularyData[];
  finalComment?: CommentData;
  statistics: Statistics;
}

export type PublicationContextState =
  | "CREATED"
  | "APPROVED"
  | "APPROVABLE"
  | "REJECTED"
  | "WAITING_FOR_OTHERS";

export interface PublicationContext {
  id: string;
  uri: string;
  label: string;
  projectContext: string;
  state: PublicationContextState;
  reviewable: boolean;
  statistics: Statistics;
}
