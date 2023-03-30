import React from "react";
import { Change, ChangeState } from "../../../model/Change";
import { Box, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ObjectLabel from "../ObjectLabel";
import { getModificationColor } from "../../../utils/ChangeUtils";
import { styled } from "@mui/material/styles";
import AcceptButton from "../../buttons/AcceptButton";
import DeclineButton from "../../buttons/DeclineButton";
import { useResolveChangeStateMutation } from "../../../api/publicationApi";
import AcceptedChip from "../../chips/AcceptedChip";
import DeclinedChip from "../../chips/DeclinedChip";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  const [resolveChangeState] = useResolveChangeStateMutation();
  const handleResolution = (state: ChangeState) => {
    resolveChangeState({
      id: change.id,
      state: state,
      vocabularyUri: change.vocabularyUri,
      publicationId: change.publicationId,
    });
  };
  return (
    <Box pt={1} pb={1}>
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
        {change.state === "NOT_REVIEWED" && (
          <Box>
            <AcceptButton onClick={() => handleResolution("APPROVED")} />
            <DeclineButton onClick={() => handleResolution("REJECTED")} />
          </Box>
        )}
        {change.state === "APPROVED" && <AcceptedChip />}
        {change.state === "REJECTED" && <DeclinedChip />}
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
