export interface User extends UserData {
  email?: string;
  admin: boolean;
  gestoredVocabularies: string[];
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
}
