import React from "react";
import { Avatar } from "@mui/material";

const stringToColor = (string: string): string => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (firstName: string, lastName: string) => {
  return {
    sx: {
      bgcolor: stringToColor(`${firstName} ${lastName}`),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
};

interface UserAvatarProps {
  firstName: string;
  lastName: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, lastName }) => {
  return <Avatar {...stringAvatar(firstName, lastName)} />;
};

export default UserAvatar;
