import React from "react";
import { styled } from "@mui/material/styles";
import { Chip, ChipProps } from "@mui/material";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";

const StyledChip = styled(Chip)({
  minWidth: "110px",
  paddingLeft: 1,
  paddingRight: 1,
  borderStyle: "solid !important",
  borderWidth: "1px",
  color: "#415a99 !important",
  backgroundColor: "#EEEFFF !important",
  "& .MuiChip-icon": {
    color: "#415a99",
  },
});
const GestoredBadge: React.FC<ChipProps> = (props) => {
  return <StyledChip icon={<LocalLibraryOutlinedIcon />} {...props} />;
};

export default GestoredBadge;
