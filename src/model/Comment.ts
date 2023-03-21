import { UserData } from "./User";

export interface Comment {
  topic: string;
  author: UserData;
  content: string;
  date: Date;
  lastModificationDate: Date;
}
