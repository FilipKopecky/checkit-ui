import React from "react";
import { Comment } from "../../model/Comment";
import { UserData } from "../../model/User";
import PublicationNotificationItem from "./PublicationNotificationItem";
import { Box, Link, Typography } from "@mui/material";

const NotificationComment: React.FC = () => {
  const mockedUser: UserData = {
    firstName: "Michal",
    id: "6e9d19be-b8b3-451d-8d0b-8e987dd797b4",
    lastName: "Med",
  };
  const mockedComment: Comment = {
    author: mockedUser,
    content:
      "Tato nová definice vychází z nové vyhlášky která byla nově přijatá evropskou komisí",
    date: new Date(Date.now()),
    lastModificationDate: new Date(Date.now()),
    topic: "changeID",
  };

  const LinkToChange = (
    <Box>
      <Typography variant={"body2"}>
        Okomentoval změnu na pojmu:
        <Link href="#" underline="always">
          Budova
        </Link>
      </Typography>
    </Box>
  );
  return (
    <PublicationNotificationItem
      notificationType={LinkToChange}
      description={mockedComment.content}
      user={mockedComment.author}
    />
  );
};

export default NotificationComment;
