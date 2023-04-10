import React from "react";
import {
  Change,
  ChangeState,
  ChangeType,
  ObjectData,
} from "../../../model/Change";
import { Alert, Box, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ObjectLabel from "../ObjectLabel";
import { getModificationColor } from "../../../utils/ChangeUtils";
import { styled } from "@mui/material/styles";
import { useResolveChangeStateMutation } from "../../../api/publicationApi";
import { useAppDispatch } from "../../../hooks/ReduxHooks";
import { toggleChange } from "../../../slices/changeSlice";
import ChangeDeclineMessage from "../ChangeDeclineMessage";
import ChangeResolveAction from "../ChangeResolveAction";
import { scrollToNextAvailableItem } from "../../../slices/eventSlice";
import LanguageLabel from "../LanguageLabel";
import { useIntl } from "react-intl";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  const dispatch = useAppDispatch();
  const [resolveChangeState] = useResolveChangeStateMutation();
  const intl = useIntl();
  const handleResolution = (state: ChangeState) => {
    resolveChangeState({
      id: change.id,
      state: state,
      vocabularyUri: change.vocabularyUri,
      publicationId: change.publicationId,
    });
    if (state === "APPROVED") {
      dispatch(toggleChange(change.uri));
    }
    dispatch(scrollToNextAvailableItem(change.id));
  };
  return (
    <Box pt={1} pb={1}>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <ModifiedObject objectData={change.object} type={change.type} />
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
                  objectData={change.newObject!}
                  type={"CREATED"}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Box mt={4}>
        {change.state === "NOT_REVIEWED" && change.gestored && (
          <ChangeResolveAction
            change={change}
            handleResolution={handleResolution}
          />
        )}
        {change.state === "APPROVED" && (
          <Alert severity="success" sx={{ fontSize: "16px" }}>
            {intl.formatMessage({ id: "accepted" })}
          </Alert>
        )}
        {change.state === "REJECTED" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Alert severity="error" sx={{ fontSize: "16px" }}>
              {intl.formatMessage({ id: "declined" })}
            </Alert>
            <ChangeDeclineMessage
              state={change.state}
              declineComment={change.declineMessage}
              submitDeclineMessage={(content) => {
                console.log(`Submitted reject message ${content}`);
                dispatch(toggleChange(change.uri));
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface ModifiedObjectProps {
  objectData: ObjectData;
  type: ChangeType;
}

const ModifiedObject: React.FC<ModifiedObjectProps> = ({
  objectData,
  type,
}) => {
  return (
    <Box
      sx={{
        borderLeft: 6,
        borderColor: getModificationColor(type),
        paddingLeft: 2,
        height: "100%",
      }}
    >
      <LanguageLabel object={objectData} />
      <ObjectLabel objectUri={objectData.value} variant={"body1"} />
    </Box>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    transform: "rotate(90deg)",
  },
}));

export default ChangeBasicDetail;
