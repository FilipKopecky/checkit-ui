import List from "@mui/material/List";
import React from "react";
import UserListItem from "./UserListItem";
import { User } from "../../model/User";

interface UsersListProps {
  users: User[];
  performAction: (user: User) => void;
  icon: React.ReactNode;
  disabled?: (user: User) => boolean | undefined;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  performAction,
  icon,
  disabled = () => undefined,
}) => {
  return (
    <List>
      {users.map((user) => {
        return (
          <UserListItem
            key={user.id}
            user={user}
            performAction={() => performAction(user)}
            icon={icon}
            disableAction={disabled(user)}
          />
        );
      })}
    </List>
  );
};

export default UsersList;
