import React, { useMemo } from "react";
import ChangeList from "../change/ChangeList";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetVocabularyChangesQuery } from "../../api/publicationApi";
import PublicationReviewVocabularySummary from "./PublicationReviewVocabularySummary";
import { Change } from "../../model/Change";
import { createChangeListDataStructure } from "../../utils/ChangeUtils";
import { useIntl } from "react-intl";
import { useAppDispatch } from "../../hooks/ReduxHooks";
import { setUpAvailableItems } from "../../slices/eventSlice";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";

export interface ChangeListData {
  allChanges: Change[];
  headers: string[];
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

  if (isLoading) return <LoadingOverlay />;
  if (error || !vocabularyChanges) return <ErrorAlert />;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper>
            <Box p={3}>
              <Typography variant={"h6"}>{vocabularyChanges.label}</Typography>
              {!vocabularyChanges.gestored && (
                <Typography variant={"body1"} color="text.secondary">
                  {intl.formatMessage({ id: "vocabulary-review-read-only" })}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item md={10} xs={12}>
          <ChangeList changeListData={changesInfo} />
        </Grid>
        <Grid container item md={2} xs={12} spacing={1}>
          <PublicationReviewVocabularySummary changes={changesInfo} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationReviewVocabulary;
