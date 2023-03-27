import React from "react";
import { Change } from "../../model/Change";
import PredicateLabel from "./PredicateLabel";
import { Box, Chip } from "@mui/material";
import { useIntl } from "react-intl";

interface ChangeHeaderProps {
  change: Change;
}

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
      <PredicateLabel uri={change.predicate} variant={"subtitle1"} />
      <Box mr={2}>
        <Chip
          label={selectedChipText}
          color={selectedChipColor}
          size={"small"}
        />
      </Box>
    </Box>
  );
};

export default ChangeHeader;
