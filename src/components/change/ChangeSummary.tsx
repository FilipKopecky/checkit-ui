import React from "react";
import { Change } from "../../model/Change";
import ChangeLabel from "./ChangeLabel";
import { styled } from "@mui/material/styles";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";

interface ChangeSummaryProps {
  change: Change;
}

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

const chipBg = "#FFF9E9";
const modifiedColor = "#FFC12C";
const createdColor = "#33BE5A";
const deletedColor = "#FF0000";

const ChangeSummary: React.FC<ChangeSummaryProps> = ({ change }) => {
  const intl = useIntl();
  let selectedChipColor;
  let selectedChipText;
  switch (change.state) {
    case "CREATED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-created",
      });
      selectedChipColor = createdColor;
      break;
    case "DELETED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-deleted",
      });
      selectedChipColor = deletedColor;
      break;
    case "MODIFIED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-modified",
      });
      selectedChipColor = modifiedColor;
      break;
    case "ROLLBACKED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-rollbacked",
      });
      selectedChipColor = modifiedColor;
      break;
  }
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        gap: 2,
      }}
    >
      <StyledChip
        customColor={selectedChipColor}
        customBackgroundColor={chipBg}
        label={selectedChipText}
      />
      <ChangeLabel uri={change.predicate} />
    </Box>
  );
};

export default ChangeSummary;
