import React from "react";
import { UserData } from "../../../model/User";
import ListItem from "@mui/material/ListItem";
import { Box, ListItemAvatar, ListItemSecondaryAction } from "@mui/material";
import UserAvatar from "../../users/UserAvatar";
import ListItemText from "@mui/material/ListItemText";
import AcceptedChip from "../../chips/AcceptedChip";
import DeclinedChip from "../../chips/DeclinedChip";
import AcceptButton from "../../buttons/AcceptButton";
import DeclineButton from "../../buttons/DeclineButton";

interface GestorRequestUserListItemProps {
  user: UserData;
  status: string;
  acceptAction: () => void;
  declineAction: () => void;
}
const GestorRequestUserListItem: React.FC<GestorRequestUserListItemProps> = ({
  user,
  status,
  acceptAction,
  declineAction,
}) => {
  let secondaryAction;
  switch (status) {
    case "pending":
      secondaryAction = (
        <Box>
          <AcceptButton onClick={acceptAction} />
          <DeclineButton onClick={declineAction} />
        </Box>
      );
      break;
    case "accepted":
      secondaryAction = <AcceptedChip />;
      break;
    case "declined":
      secondaryAction = <DeclinedChip />;
      break;
    default:
      secondaryAction = <></>;
  }

  return (
    <ListItem sx={{ paddingRight: 37 }}>
      <ListItemAvatar>
        <UserAvatar firstName={user.firstName} lastName={user.lastName} />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.firstName} ${user.lastName}`}
        secondary={user.email}
      />
      <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
    </ListItem>
  );
};

export default GestorRequestUserListItem;
