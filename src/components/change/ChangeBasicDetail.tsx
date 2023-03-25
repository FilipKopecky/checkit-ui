import React from "react";
import { Change } from "../../model/Change";
import { Box, Chip } from "@mui/material";
import ObjectLabel from "./ObjectLabel";
import Divider from "@mui/material/Divider";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  return (
    <Box>
      <Box mb={2}>
        <Box mb={1} sx={{ textTransform: "uppercase" }}>
          <Chip
            color={change.state === "DELETED" ? "error" : "success"}
            label={change.state === "DELETED" ? "Smazáno" : "Nový"}
          />
        </Box>
        <ObjectLabel
          objectUri={change.newObject || change.object}
          variant={"body2"}
        />
      </Box>
      {change.state === "MODIFIED" && (
        <Box>
          <Divider />
          <Box mt={2}>
            <Box mb={1} sx={{ textTransform: "uppercase" }}>
              <Chip color={"warning"} label={"Původní"} />
            </Box>
            <ObjectLabel objectUri={change.object} variant={"body2"} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChangeBasicDetail;
