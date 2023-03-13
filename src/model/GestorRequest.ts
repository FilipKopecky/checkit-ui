import { UserData } from "./User";
import { VocabularyData } from "./Vocabulary";

export interface GestorRequest {
  id: string;
  uri: string;
  created: Date;
  applicant: UserData;
  vocabulary: VocabularyData;
}
