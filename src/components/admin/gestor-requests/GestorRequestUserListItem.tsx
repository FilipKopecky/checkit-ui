import React from "react";
import { User } from "../../../model/User";
import ListItem from "@mui/material/ListItem";
import {
  Box,
  Button,
  Chip,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@mui/material";
import UserAvatar from "../../users/UserAvatar";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface GestorRequestUserListItemProps {
  user: User;
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
        <>
          <Button
            variant="contained"
            endIcon={<CheckCircleOutlinedIcon />}
            color={"success"}
            sx={{ marginRight: 2 }}
            onClick={acceptAction}
          >
            Schválit
          </Button>
          <Button
            variant="contained"
            endIcon={<CancelOutlinedIcon />}
            color={"error"}
            onClick={declineAction}
          >
            Zamítnout
          </Button>
        </>
      );
      break;
    case "accepted":
      secondaryAction = (
        <Box sx={{ textTransform: "uppercase" }}>
          <Chip label={"Schváleno"} color="success" variant="filled" />
        </Box>
      );
      break;
    case "declined":
      secondaryAction = (
        <Box sx={{ textTransform: "uppercase" }}>
          <Chip label={"zamítnuto"} color="error" variant="filled" />
        </Box>
      );
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
