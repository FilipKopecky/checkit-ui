import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useAuth } from "../auth/hooks";
import { useIntl } from "react-intl";

interface LogoutButtonProps {
  open: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ open }) => {
  const auth = useAuth();
  const intl = useIntl();
  return (
    <ListItem
      key={intl.formatMessage({ id: "logout" })}
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemButton
        onClick={() => auth.logout()}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <ExitToAppOutlinedIcon color={"secondary"} />
        </ListItemIcon>
        <ListItemText
          primary={intl.formatMessage({ id: "logout" })}
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default LogoutButton;
