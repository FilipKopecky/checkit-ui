import List from "@mui/material/List";
import React from "react";
import UserListItem from "./UserListItem";
import { User } from "../../model/User";

interface UsersListProps {
  users: User[];
  performAction: (user: User) => void;
  icon: React.ReactNode;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  performAction,
  icon,
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
          />
        );
      })}
    </List>
  );
};

export default UsersList;
