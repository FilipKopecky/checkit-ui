import React from "react";
import { Change } from "../../model/Change";
import { Box } from "@mui/material";
import ChangeLabel from "./ChangeLabel";
import ChangeObjectLabel from "./ChangeObjectLabel";
import Divider from "@mui/material/Divider";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  return (
    <Box>
      <Box mb={2}>
        <ChangeLabel
          uri={change.predicate}
          variant={"h6"}
          gutterBottom
          prependText={"Nová "}
        />
        <ChangeObjectLabel changedObject={change.newObject || change.object} />
      </Box>
      {change.state === "MODIFIED" && (
        <Box>
          <Divider />
          <Box mt={2}>
            <ChangeLabel
              uri={change.predicate}
              variant={"h6"}
              gutterBottom
              prependText={"Stará "}
            />
            <ChangeObjectLabel changedObject={change.object} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChangeBasicDetail;
