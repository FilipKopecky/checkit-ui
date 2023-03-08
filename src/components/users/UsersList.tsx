import React from "react";
import UserListItem from "./UserListItem";
import { User } from "../../model/User";
import { Components, Virtuoso } from "react-virtuoso";
import MuiList from "@mui/material/List";

interface UsersListProps {
  users: User[];
  performAction: (user: User) => void;
  icon: React.ReactNode;
  disabled?: (user: User) => boolean;
}

const InnerItem = React.memo(
  ({ user, disabled, performAction, icon }: any) => {
    return (
      <UserListItem
        key={user.id}
        user={user}
        performAction={() => performAction(user)}
        icon={icon}
        disableAction={disabled(user)}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.performAction === nextProps.performAction
    );
  }
);

const UsersList: React.FC<UsersListProps> = ({
  users,
  performAction,
  icon,
  disabled = () => false,
}) => {
  const itemContent = (index: any, user: any) => {
    return (
      <InnerItem
        user={user}
        disabled={disabled}
        performAction={performAction}
        icon={icon}
      />
    );
  };

  return (
    <Virtuoso
      style={{ height: 300 }}
      components={{ List }}
      data={users}
      itemContent={itemContent}
    />
  );
};

//TODO: Export this somewhere
const List: Components["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <MuiList
        style={{ padding: 0, ...style, margin: 0 }}
        component="div"
        ref={ref}
      >
        {children}
      </MuiList>
    );
  }
);
export default UsersList;
