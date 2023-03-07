import { User } from "./User";

export interface Vocabulary {
  uri: string;
  label: string;
  gestors: User[];
}
