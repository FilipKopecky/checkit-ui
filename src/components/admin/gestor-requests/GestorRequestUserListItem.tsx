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
import { useIntl } from "react-intl";

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
  const intl = useIntl();
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
            {intl.formatMessage({ id: "accept" })}
          </Button>
          <Button
            variant="contained"
            endIcon={<CancelOutlinedIcon />}
            color={"error"}
            onClick={declineAction}
          >
            {intl.formatMessage({ id: "decline" })}
          </Button>
        </>
      );
      break;
    case "accepted":
      secondaryAction = (
        <Box sx={{ textTransform: "uppercase" }}>
          <Chip
            label={intl.formatMessage({ id: "accepted" })}
            color="success"
            variant="filled"
          />
        </Box>
      );
      break;
    case "declined":
      secondaryAction = (
        <Box sx={{ textTransform: "uppercase" }}>
          <Chip
            label={intl.formatMessage({ id: "declined" })}
            color="error"
            variant="filled"
          />
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
