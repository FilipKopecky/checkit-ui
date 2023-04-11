import React, { useMemo } from "react";
import ChangeList from "../change/ChangeList";
import { Alert, Box, Grid, Paper, Typography } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetVocabularyChangesQuery } from "../../api/publicationApi";
import PublicationReviewVocabularySummary from "./PublicationReviewVocabularySummary";
import { Change } from "../../model/Change";
import { createChangeListDataStructure } from "../../utils/ChangeUtils";
import { useIntl } from "react-intl";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { setUpAvailableItems } from "../../slices/eventSlice";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";
import PieChart from "../charts/PieChart";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export interface ChangeListData {
  allChanges: Change[];
  headers: { uri: string; label: string }[];
  groupCounts: number[];
  lastInGroupIndexes: number[];
}

const PublicationReviewVocabulary: React.FC = () => {
  const { publicationId } = useParams();
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("vocabularyUri");
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const {
    data: vocabularyChanges,
    isLoading,
    error,
  } = useGetVocabularyChangesQuery({
    vocabularyUri: uri!,
    publicationId: publicationId!,
  });

  const changesInfo: ChangeListData = useMemo(() => {
    dispatch(setUpAvailableItems(vocabularyChanges?.changes ?? []));
    return createChangeListDataStructure(vocabularyChanges?.changes ?? []);
  }, [dispatch, vocabularyChanges?.changes]);

  const isFinished = useMemo(() => {
    return !vocabularyChanges?.changes.some(
      (change) => change.state === "NOT_REVIEWED"
    );
  }, [vocabularyChanges?.changes]);

  const summary = useMemo(() => {
    let done = 0;
    let notReviewed = 0;
    for (const change of changesInfo.allChanges) {
      if (change.state === "NOT_REVIEWED") notReviewed++;
      else done++;
    }
    return [
      { name: "pie-chart-not-reviewed", value: notReviewed },
      { name: "pie-chart-reviewed", value: done },
    ];
  }, [changesInfo.allChanges]);

  if (isLoading) return <LoadingOverlay />;
  if (error || !vocabularyChanges) return <ErrorAlert />;
  //TODO: Make this component more readable
  return (
    <Box px={2}>
      <Box py={1}>
        <Link to=".." relative="path">
          <IconButton size={"small"}>
            <ArrowBackIcon fontSize={"small"} />
          </IconButton>
        </Link>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Paper>
            <Box
              p={2}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box display={"flex"} flex={1} alignItems={"center"}>
                <Box>
                  <Typography variant={"h5"}>
                    {vocabularyChanges.label}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                {!vocabularyChanges.gestored && (
                  <Alert severity="info" sx={{ fontSize: "16px" }}>
                    {intl.formatMessage({ id: "vocabulary-review-read-only" })}
                  </Alert>
                )}
              </Box>
              <Box sx={{ marginTop: "auto" }}>
                {isFinished && (
                  <Alert severity="success" sx={{ fontSize: "16px" }}>
                    {intl.formatMessage({ id: "vocabulary-review-finished" })}
                  </Alert>
                )}
              </Box>
            </Box>
          </Paper>
          <Box pl={2} pt={1}>
            <ChangeList changeListData={changesInfo} />
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={12} sm={6} xs={12}>
              <Paper>
                <PieChart
                  data={summary}
                  label={intl.formatMessage(
                    { id: "pie-chart-changes-left" },
                    { num: summary[0].value }
                  )}
                  fullCircle={false}
                  animation={true}
                />
              </Paper>
            </Grid>
            <PublicationReviewVocabularySummary changes={changesInfo} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationReviewVocabulary;
