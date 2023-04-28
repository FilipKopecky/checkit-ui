import React from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box, Menu } from "@mui/material";
import NotificationList from "./NotificationList";
import Typography from "@mui/material/Typography";

const NotificationBell: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box mr={2}>
      <IconButton onClick={handleClick} color={"inherit"}>
        <NotificationsOutlinedIcon color={"inherit"} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "40ch",
          },
        }}
      >
        <Box pl={3}>
          <Typography variant={"h6"}>Notifikace</Typography>
        </Box>
        <NotificationList />
      </Menu>
    </Box>
  );
};

export default NotificationBell;
