import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UserAvatar from "../users/UserAvatar";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";

interface CurrentUserProps {
  open: boolean;
}
const CurrentUserButton: React.FC<CurrentUserProps> = ({ open }) => {
  const user = useAppSelector(selectUser);

  return (
    <ListItem key={user.id} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          color: "white",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            sx={{ width: 24, height: 24, fontSize: "12px" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={`${user.firstName} ${user.lastName}`}
          sx={{ opacity: open ? 1 : 0, color: "white" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default CurrentUserButton;
