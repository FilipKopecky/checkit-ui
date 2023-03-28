import React from "react";
import { Change } from "../../../model/Change";
import { useIntl } from "react-intl";
import { Box, Button, Grid } from "@mui/material";
import PredicateLabel from "../PredicateLabel";
import IconButton from "@mui/material/IconButton";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ObjectLabel from "../ObjectLabel";
import { getModificationColor } from "../../../utils/ChangeUtils";
import { styled } from "@mui/material/styles";

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
          variant={"h6"}
          sx={{ marginBottom: 2 }}
        />
        <Box>
          <IconButton onClick={() => setOpen(false)}>
            <FullscreenExitIcon />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <ModifiedObject objectUri={change.object} state={change.type} />
          </Grid>
          {change.type === "MODIFIED" && (
            <>
              <Grid item md={1} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Arrow fontSize={"large"} />
                </Box>
              </Grid>
              <Grid item md={5} xs={12}>
                <ModifiedObject
                  objectUri={change.newObject!}
                  state={"CREATED"}
                />
              </Grid>
            </>
          )}
        </Grid>
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
        borderLeft: 6,
        borderColor: getModificationColor(state),
        paddingLeft: 2,
        height: "100%",
      }}
    >
      <ObjectLabel objectUri={objectUri} variant={"body1"} />
    </Box>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    transform: "rotate(90deg)",
  },
}));

export default ChangeBasicDetail;
