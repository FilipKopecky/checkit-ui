export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  admin: boolean;
  gestoredVocabularies: string[];
}
