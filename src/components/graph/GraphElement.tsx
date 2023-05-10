import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NoMaxWidthTooltip from "../misc/NoMaxWidthTooltip";

interface GraphElementProps {
  displayName: string;
  uri: string;
}

const GraphElement: React.FC<GraphElementProps> = ({ displayName, uri }) => {
  return (
    <Paper>
      <Box p={2} display={"flex"} gap={1}>
        <Typography variant={"body1"}>{displayName}</Typography>
        <NoMaxWidthTooltip
          title={<Typography fontSize={16}>{uri}</Typography>}
          placement={"right"}
        >
          <HelpOutlineOutlinedIcon color={"primary"} fontSize={"small"} />
        </NoMaxWidthTooltip>
      </Box>
    </Paper>
  );
};

export default GraphElement;
