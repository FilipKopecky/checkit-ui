import React from "react";
import { Change } from "../../model/Change";
import { Box, Chip } from "@mui/material";
import ChangePredicateLabel from "./ChangePredicateLabel";
import ObjectLabel from "./ObjectLabel";
import Divider from "@mui/material/Divider";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  return (
    <Box>
      <Box mb={2}>
        <Box>
          <Chip
            color={change.state === "DELETED" ? "error" : "success"}
            label={change.state === "DELETED" ? "Smazáno" : "Nový"}
            size={"small"}
          />
          <ChangePredicateLabel
            uri={change.predicate}
            variant={"h6"}
            gutterBottom
          />
        </Box>
        <ObjectLabel objectUri={change.newObject || change.object} />
      </Box>
      {change.state === "MODIFIED" && (
        <Box>
          <Divider />
          <Box mt={2}>
            <Box>
              <Chip color={"warning"} label={"Původní"} size={"small"} />
              <ChangePredicateLabel uri={change.predicate} variant={"h6"} />
            </Box>
            <ObjectLabel objectUri={change.object} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChangeBasicDetail;
