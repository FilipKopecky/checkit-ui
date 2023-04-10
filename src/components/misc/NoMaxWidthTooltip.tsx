import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React from "react";

export const NoMaxWidthTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      children={props.children}
    />
  )
)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

export default NoMaxWidthTooltip;
