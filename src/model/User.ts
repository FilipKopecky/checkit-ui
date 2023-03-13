export interface User extends UserData {
  admin: boolean;
  gestoredVocabularies: string[];
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}
