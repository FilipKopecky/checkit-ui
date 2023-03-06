import React from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import { ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import UserAvatar from "./UserAvatar";
import { User } from "../../model/User";

interface UserListItemProps {
  user: User;
  performAction: () => void;
  icon: React.ReactNode;
  disableAction?: boolean;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  performAction,
  icon,
  disableAction = false,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={performAction}
          disabled={disableAction}
        >
          {icon}
        </IconButton>
      }
    >
      <ListItemAvatar>
        <UserAvatar firstName={user.firstName} lastName={user.lastName} />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.firstName} ${user.lastName}`}
        secondary={user.email}
      />
    </ListItem>
  );
};

export default UserListItem;
