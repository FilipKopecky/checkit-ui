import React from "react";
import { styled } from "@mui/material/styles";
import { Chip, ChipProps } from "@mui/material";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";

const StyledChip = styled(Chip)({
  minWidth: "116px",
  paddingLeft: 1,
  paddingRight: 1,
  borderStyle: "solid !important",
  borderWidth: "1px",
  color: "#FFC12C !important",
  backgroundColor: "#FFF9E9 !important",
  "& .MuiChip-icon": {
    color: "#FFC12C",
  },
});

const RequestedBadge: React.FC<ChipProps> = (props) => {
  return <StyledChip icon={<EmojiPeopleOutlinedIcon />} {...props} />;
};

export default RequestedBadge;
