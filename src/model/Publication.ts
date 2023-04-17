import { PublicationVocabularyData } from "./Vocabulary";

export interface Publication {
  id: string;
  uri: string;
  label: string;
  projectContext: string;
  state: PublicationContextState;
  progress: number;
  affectedVocabularies: PublicationVocabularyData[];
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
}
