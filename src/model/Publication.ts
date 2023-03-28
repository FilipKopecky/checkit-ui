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

export type PublicationContextState =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "WAITING_FOR_OTHERS";

export interface PublicationContext {
  id: string;
  uri: string;
  label: string;
  projectContext: string;
  state: PublicationContextState;
}
