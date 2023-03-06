import List from "@mui/material/List";
import React from "react";
import UserListItem from "./UserListItem";
import { User } from "../../model/User";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectUser } from "../../slices/userSlice";

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
  const currentUser = useAppSelector(selectUser);
  return (
    <List>
      {users.map((user) => {
        return (
          <UserListItem
            key={user.id}
            user={user}
            performAction={() => performAction(user)}
            icon={icon}
            disableAction={currentUser.id === user.id}
          />
        );
      })}
    </List>
  );
};

export default UsersList;
