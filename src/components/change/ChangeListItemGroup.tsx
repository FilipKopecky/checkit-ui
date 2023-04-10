import React from "react";
import ObjectLabel from "./ObjectLabel";
import { Box, Paper, Typography } from "@mui/material";
import NoMaxWidthTooltip from "../misc/NoMaxWidthTooltip";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

interface ChangeGroupHeaderProps {
  data: { uri: string; label: string };
}

const ChangeListItemGroup: React.FC<ChangeGroupHeaderProps> = ({ data }) => {
  return (
    <Box pr={1}>
      <Paper elevation={1}>
        <Box p={2} display={"flex"} alignItems={"center"} gap={1}>
          <ObjectLabel objectUri={data.label} variant={"h5"} />
          {data.uri !== data.label && (
            <NoMaxWidthTooltip
              title={<Typography fontSize={16}>{data.uri}</Typography>}
              placement={"right"}
            >
              <HelpOutlineOutlinedIcon color={"primary"} fontSize={"small"} />
            </NoMaxWidthTooltip>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeListItemGroup;
