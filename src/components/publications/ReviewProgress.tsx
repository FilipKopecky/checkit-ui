import React from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ProgressBar from "../misc/ProgressBar";
import { Statistics } from "../../model/Statistics";

interface ReviewProgressProps {
  gestored: boolean;
  statistics: Statistics;
}

const RoundedBox = styled(Box)(() => ({
  backgroundColor: "#EEEFFF !important",
  borderStyle: "solid !important",
  borderWidth: "1px",
  borderColor: "#415a99 !important",
  color: "#415a99 !important",
  borderRadius: 12,
  paddingLeft: 8,
  paddingRight: 8,
  display: "flex",
  alignItems: "center",
  minHeight: 30,
}));

const ReviewProgress: React.FC<ReviewProgressProps> = ({
  gestored,
  statistics,
}) => {
  const intl = useIntl();
  if (!gestored) {
    return (
      <RoundedBox>
        <Typography variant={"caption"}>
          {intl.formatMessage(
            { id: "contains-num-of-changes" },
            { num: statistics.totalChanges }
          )}
        </Typography>
      </RoundedBox>
    );
  }
  const reviewed = statistics.approvedChanges! + statistics.rejectedChanges!;
  const total = statistics.reviewableChanges ?? statistics.totalChanges;
  return (
    <RoundedBox gap={1}>
      <LocalLibraryOutlinedIcon />
      <ProgressBar width={120} resolved={reviewed} total={total} />
    </RoundedBox>
  );
};

export default ReviewProgress;
