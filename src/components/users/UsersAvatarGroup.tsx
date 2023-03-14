import React from "react";
import { UserData } from "../../model/User";
import { AvatarGroup, Button, Tooltip } from "@mui/material";
import UserAvatar from "./UserAvatar";

interface UsersAvatarGroupProps {
  users: UserData[];
  maxAvatars: number;
}

const smallAvatarProps = {
  width: 24,
  height: 24,
  fontSize: "12px",
};

const UsersAvatarGroup: React.FC<UsersAvatarGroupProps> = ({
  users,
  maxAvatars = 4,
}) => {
  return (
    <Tooltip title="Zobrazit gestory">
      <Button>
        <AvatarGroup
          max={maxAvatars}
          slotProps={{
            additionalAvatar: { sx: { ...smallAvatarProps } },
          }}
        >
          {users.map((user) => {
            return (
              <UserAvatar
                firstName={user.firstName}
                lastName={user.lastName}
                sx={{ ...smallAvatarProps }}
              />
            );
          })}
        </AvatarGroup>
      </Button>
    </Tooltip>
  );
};

export default UsersAvatarGroup;
