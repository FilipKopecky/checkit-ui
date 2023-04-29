import React from "react";
import { Notification } from "../../model/Notification";
import ListItemText from "@mui/material/ListItemText";
import { Box, MenuItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useResolveSeenNotificationMutation } from "../../api/notificationApi";

interface NotificationItemProps {
  notification: Notification;
  langTag: string;
  closeList: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  langTag,
  closeList,
}) => {
  const navigate = useNavigate();
  const [resolveSeenNotification] = useResolveSeenNotificationMutation();
  const handleCLick = () => {
    if (!notification.readAt) {
      resolveSeenNotification({
        uri: notification.uri,
        pageNumber: notification.pageNumber,
        languageTag: langTag,
      });
    }
    navigate(notification.about);
    closeList();
  };
  return (
    <Box>
      <MenuItem style={{ whiteSpace: "normal" }} onClick={handleCLick}>
        <Box px={1} py={1}>
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                color: notification.readAt ? "gray" : "black",
              },
            }}
            primary={notification.title}
            secondary={notification.content}
          />
        </Box>
      </MenuItem>
      <Divider />
    </Box>
  );
};

export default NotificationItem;
