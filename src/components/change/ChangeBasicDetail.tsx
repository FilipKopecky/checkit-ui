import React from "react";
import { Change } from "../../model/Change";
import { useIntl } from "react-intl";
import { Box, Button } from "@mui/material";
import PredicateLabel from "./PredicateLabel";
import IconButton from "@mui/material/IconButton";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ObjectLabel from "./ObjectLabel";
import { getModificationColor } from "../../utils/ChangeUtils";

interface ChangeBasicDetailProps {
  change: Change;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({
  change,
  setOpen,
}) => {
  const intl = useIntl();
  return (
    <Box pt={1}>
      <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
        <PredicateLabel
          uri={change.predicate}
          variant={"h5"}
          sx={{ marginBottom: 2 }}
        />
        <Box>
          <IconButton onClick={() => setOpen(false)}>
            <FullscreenExitIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <ModifiedObject objectUri={change.object} state={change.state} />
        {change.state === "MODIFIED" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowForwardIcon fontSize={"large"} />
            <ModifiedObject objectUri={change.newObject!} state={"CREATED"} />
          </Box>
        )}
      </Box>
      <Box mt={4}>
        <Button
          size={"small"}
          variant="outlined"
          color={"success"}
          sx={{ marginRight: 2 }}
          onClick={() => console.log("Change accepted")}
        >
          {intl.formatMessage({ id: "accept" })}
        </Button>
        <Button
          size={"small"}
          variant="outlined"
          color={"error"}
          onClick={() => console.log("Change declined")}
        >
          {intl.formatMessage({ id: "decline" })}
        </Button>
      </Box>
    </Box>
  );
};

interface ModifiedObjectProps {
  objectUri: string;
  state: string;
}

const ModifiedObject: React.FC<ModifiedObjectProps> = ({
  objectUri,
  state,
}) => {
  return (
    <Box
      sx={{
        borderLeft: 4,
        borderColor: getModificationColor(state),
        paddingLeft: 2,
      }}
    >
      <ObjectLabel objectUri={objectUri} variant={"h6"} />
    </Box>
  );
};

export default ChangeBasicDetail;
