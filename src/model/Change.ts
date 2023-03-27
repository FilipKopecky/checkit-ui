import { Comment } from "./Comment";

export interface Change {
  id: string;
  uri: string;
  type: "VOCABULARY" | "TERM";
  subject: string;
  predicate: string;
  object: string;
  newObject?: string;
  comments: Comment[];
  state: "CREATED" | "MODIFIED" | "DELETED" | "ROLLBACKED";
}
