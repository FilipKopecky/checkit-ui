import React from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Badge, Box, Button, Paper, Popper } from "@mui/material";
import NotificationList from "./NotificationList";
import Typography from "@mui/material/Typography";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {
  useGetUnreadNotificationsCountQuery,
  useMarkNotificationsAsReadMutation,
} from "../../api/notificationApi";
import { useIntl } from "react-intl";

const NotificationBell: React.FC = () => {
  const { data: notificationsUnreadCount, refetch } =
    useGetUnreadNotificationsCountQuery();
  const [markAsRead] = useMarkNotificationsAsReadMutation();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    refetch();
    setAnchorEl(event.currentTarget);
    setOpen((prevState) => !prevState);
  };
  const handleReadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    markAsRead();
    handleClick(event);
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
            <Box px={3} pt={2}>
              <Typography variant={"h6"}>
                {intl.formatMessage({ id: "notifications" })}
              </Typography>
              <Button
                onClick={handleReadClick}
                endIcon={<MarkEmailReadIcon />}
                variant={"outlined"}
              >
                {intl.formatMessage({ id: "mark-all-as-read" })}
              </Button>
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
