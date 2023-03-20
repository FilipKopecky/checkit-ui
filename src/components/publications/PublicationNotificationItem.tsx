import React from "react";
import { UserData } from "../../model/User";
import { ListItemAvatar } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import UserAvatar from "../users/UserAvatar";
import ListItemText from "@mui/material/ListItemText";

interface PublicationNotificationItemProps {
  notificationType: React.ReactNode;
  description: string;
  user: UserData;
}

const PublicationNotificationItem: React.FC<
  PublicationNotificationItemProps
> = ({ user, notificationType, description }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar firstName={user.firstName} lastName={user.lastName} />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.firstName} ${user.lastName}`}
        secondary={notificationType}
      />
    </ListItem>
  );
};

export default PublicationNotificationItem;
