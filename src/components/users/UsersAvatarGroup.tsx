import React from "react";
import { UserData } from "../../model/User";
import { AvatarGroup, Button, Tooltip } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { useIntl } from "react-intl";

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
  const intl = useIntl();
  return (
    <Tooltip
      title={intl.formatMessage({ id: "see-gestors" })}
      placement={"left"}
    >
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
