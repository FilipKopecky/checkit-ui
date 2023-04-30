import React from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, Box, Paper, Popper } from "@mui/material";
import NotificationList from "./NotificationList";
import Typography from "@mui/material/Typography";
import { useGetUnreadNotificationsCountQuery } from "../../api/notificationApi";

const NotificationBell: React.FC = () => {
  const { data: notificationsUnreadCount } =
    useGetUnreadNotificationsCountQuery();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevState) => !prevState);
  };
  return (
    <Box mr={2}>
      <IconButton onClick={handleClick} color={"inherit"}>
        <Badge badgeContent={notificationsUnreadCount ?? 0} color="error">
          <NotificationsOutlinedIcon color={"inherit"} />
        </Badge>
      </IconButton>
      <Popper
        anchorEl={anchorEl}
        open={open}
        sx={{ height: 400 }}
        disablePortal={true}
      >
        <Paper>
          <Box width={400}>
            <Box pl={3} pt={2}>
              <Typography variant={"h6"}>Notifikace</Typography>
            </Box>
            <Box py={2} my={2}>
              <NotificationList
                closeList={() => setOpen((prevState) => !prevState)}
              />
            </Box>
          </Box>
        </Paper>
      </Popper>
    </Box>
  );
};

export default NotificationBell;
