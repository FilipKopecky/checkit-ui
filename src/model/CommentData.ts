import { UserData } from "./User";

export interface CommentData {
  topic: string;
  author: UserData;
  content: string;
  date: Date;
  lastModificationDate: Date;
}
