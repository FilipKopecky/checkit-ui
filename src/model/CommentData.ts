import { UserData } from "./User";

export interface CommentData {
  uri: string;
  topic: string;
  author: UserData;
  content: string;
  creationDate: Date;
  lastModificationDate: Date;
}
