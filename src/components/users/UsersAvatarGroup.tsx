import React from "react";
import { UserData } from "../../model/User";
import { AvatarGroup, Tooltip } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { useIntl } from "react-intl";
import IconButton from "@mui/material/IconButton";

interface UsersAvatarGroupProps {
  users: UserData[];
  maxAvatars: number;
  onClick?: () => void;
}

const smallAvatarProps = {
  width: 24,
  height: 24,
  fontSize: "12px",
};

const UsersAvatarGroup: React.FC<UsersAvatarGroupProps> = ({
  users,
  maxAvatars = 4,
  onClick,
}) => {
  const intl = useIntl();
  return (
    <Tooltip
      title={intl.formatMessage({ id: "see-gestors" })}
      placement={"left"}
    >
      <IconButton onClick={onClick}>
        <AvatarGroup
          max={maxAvatars}
          slotProps={{
            additionalAvatar: { sx: { ...smallAvatarProps } },
          }}
        >
          {users.map((user) => {
            return (
              <UserAvatar
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                sx={{ ...smallAvatarProps }}
              />
            );
          })}
        </AvatarGroup>
      </IconButton>
    </Tooltip>
  );
};

export default UsersAvatarGroup;
