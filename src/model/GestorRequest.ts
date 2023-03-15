import { UserData } from "./User";
import { Vocabulary } from "./Vocabulary";

export interface GestorRequest {
  id: string;
  uri: string;
  created: Date;
  applicant: UserData;
  vocabulary: Vocabulary;
  state: string;
  approved?: boolean;
}
