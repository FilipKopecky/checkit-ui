import React from "react";
import { Box, BoxProps, LinearProgress, Typography } from "@mui/material";
import { useIntl } from "react-intl";

interface ProgressBarProps {
  resolved: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps & BoxProps> = ({
  resolved,
  total,
  ...props
}) => {
  const intl = useIntl();
  const progress = Math.trunc((resolved / total) * 100);
  return (
    <Box width={150} pb={1} {...props}>
      <Typography variant="caption" color="text.secondary">
        {intl.formatMessage(
          { id: "publication-progress" },
          {
            reviewed: resolved,
            total: total,
          }
        )}
      </Typography>
      <LinearProgress
        variant={"determinate"}
        value={progress}
        color={"success"}
      />
    </Box>
  );
};

export default ProgressBar;
