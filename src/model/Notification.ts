export interface Notification {
  uri: string;
  title: string;
  content: string;
  about: string;
  created: Date;
  readAt?: Date;
  pageNumber: number;
}
