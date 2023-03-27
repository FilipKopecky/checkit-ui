import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) =>
    prop !== "customColor" && prop !== "customBackgroundColor",
})<{ customBackgroundColor?: string; customColor?: string }>(
  ({ customBackgroundColor, customColor }) => ({
    paddingLeft: 1,
    paddingRight: 1,
    borderStyle: "solid !important",
    borderWidth: "1px",
    color: `${customColor} !important`,
    backgroundColor: `${customBackgroundColor} !important`,
  })
);

export default StyledChip;
