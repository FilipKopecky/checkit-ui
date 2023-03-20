import React from "react";
import { UserData } from "../../model/User";
import { Box, ListItemAvatar, Typography } from "@mui/material";
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
    <Box>
      <ListItem>
        <ListItemAvatar>
          <UserAvatar firstName={user.firstName} lastName={user.lastName} />
        </ListItemAvatar>
        <ListItemText
          primary={<strong>{`${user.firstName} ${user.lastName}`}</strong>}
          secondary={notificationType}
        />
      </ListItem>
      <Box px={2} pb={2}>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
};

export default PublicationNotificationItem;
