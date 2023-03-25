import React from "react";
import { Change } from "../../model/Change";
import ChangePredicateLabel from "./ChangePredicateLabel";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";

interface ChangeHeaderProps {
  change: Change;
}

// const chipBg = "#FFF9E9";
// const modifiedColor = "#FFC12C";
// const createdColor = "#33BE5A";
// const deletedColor = "#FF0000";

const ChangeHeader: React.FC<ChangeHeaderProps> = ({ change }) => {
  const intl = useIntl();
  let selectedChipColor: "success" | "warning" | "error";
  let selectedChipText;
  switch (change.state) {
    case "CREATED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-created",
      });
      selectedChipColor = "success";
      break;
    case "DELETED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-deleted",
      });
      selectedChipColor = "error";
      break;
    case "MODIFIED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-modified",
      });
      selectedChipColor = "warning";
      break;
    case "ROLLBACKED":
      selectedChipText = intl.formatMessage({
        id: "change-detail-state-rollbacked",
      });
      selectedChipColor = "warning";
      break;
  }
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <ChangePredicateLabel uri={change.predicate} variant={"body1"} />
      <Box sx={{ textTransform: "uppercase" }} mr={2}>
        <Chip label={selectedChipText} color={selectedChipColor} />
      </Box>
    </Box>
  );
};

export default ChangeHeader;
