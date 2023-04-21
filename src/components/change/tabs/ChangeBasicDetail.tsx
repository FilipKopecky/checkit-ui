import React from "react";
import {
  Change,
  ChangeState,
  ChangeType,
  ObjectData,
} from "../../../model/Change";
import { Box, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ObjectLabel from "../ObjectLabel";
import { styled } from "@mui/material/styles";
import {
  useResolveChangeClearStateMutation,
  useResolveChangeStateMutation,
} from "../../../api/publicationApi";
import { useAppDispatch } from "../../../hooks/ReduxHooks";
import { scrollToNextAvailableItem } from "../../../slices/eventSlice";
import LanguageLabel from "../LanguageLabel";
import ChangeActions from "../ChangeActions";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import ChangeBoxColored from "../ChangeBoxColored";

interface ChangeBasicDetailProps {
  change: Change;
}

const ChangeBasicDetail: React.FC<ChangeBasicDetailProps> = ({ change }) => {
  const dispatch = useAppDispatch();
  const [resolveChangeState] = useResolveChangeStateMutation();
  const [clearChangeState] = useResolveChangeClearStateMutation();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();

  const handleResolution = (state: ChangeState) => {
    resolveChangeState({
      id: change.id,
      state: state,
      vocabularyUri: change.vocabularyUri,
      publicationId: change.publicationId,
      publicationDate: change.publicationDate,
    })
      .unwrap()
      .catch(() => {
        enqueueSnackbar(intl.formatMessage({ id: "something-went-wrong" }), {
          variant: "error",
        });
      });
    dispatch(scrollToNextAvailableItem(change.id));
  };
  const handleClear = () => {
    clearChangeState({
      id: change.id,
      state: "NOT_REVIEWED",
      rejectionComment: undefined,
      vocabularyUri: change.vocabularyUri,
      publicationId: change.publicationId,
      publicationDate: change.publicationDate,
    });
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
      <ChangeActions
        change={change}
        handleResolution={handleResolution}
        handleClear={handleClear}
      />
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
    <ChangeBoxColored type={type}>
      <LanguageLabel object={objectData} />
      <ObjectLabel objectUri={objectData.value} variant={"body1"} />
    </ChangeBoxColored>
  );
};

const Arrow = styled(ArrowForwardIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    transform: "rotate(90deg)",
  },
}));

export default ChangeBasicDetail;
