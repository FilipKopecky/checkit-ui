import React from "react";
import NotificationComment from "./NotificationComment";
import PublicationNotificationItem from "./PublicationNotificationItem";
import { UserData } from "../../model/User";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

interface PublicationNotificationsProps {
  maxNumberOfNotifications?: number;
}

const PublicationNotifications: React.FC<PublicationNotificationsProps> = ({
  maxNumberOfNotifications = 3,
}) => {
  const mockedUser: UserData = {
    firstName: "Martin",
    id: "6e9d19be-b8b3-451d-8d0b-8e987dd797b4",
    lastName: "Nečaský",
  };
  return (
    <List>
      <NotificationComment />
      <Divider />
      <PublicationNotificationItem
        notificationType={"Schválil všechny změny ve slovníku"}
        description={"Datový slovník OFN číselníků"}
        user={mockedUser}
      />
    </List>
  );
};

export default PublicationNotifications;
