import React from "react";
import { CommentData } from "../../model/CommentData";
import { UserData } from "../../model/User";
import PublicationNotificationItem from "./PublicationNotificationItem";

const NotificationComment: React.FC = () => {
  const mockedUser: UserData = {
    firstName: "Michal",
    id: "6e9d19be-b8b3-451d-8d0b-8e987dd797b4",
    lastName: "Med",
  };
  const mockedComment: CommentData = {
    author: mockedUser,
    content:
      "Tato nová definice vychází z nové vyhlášky která byla nově přijatá evropskou komisí",
    date: new Date(Date.now()),
    lastModificationDate: new Date(Date.now()),
    topic: "changeID",
  };

  return (
    <PublicationNotificationItem
      notificationType={"Okomentoval změnu na pojmu Budova"}
      description={mockedComment.content}
      user={mockedComment.author}
    />
  );
};

export default NotificationComment;
