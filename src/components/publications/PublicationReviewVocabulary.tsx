import React, { useMemo } from "react";
import ChangeList from "../change/ChangeList";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetVocabularyChangesQuery } from "../../api/publicationApi";
import PublicationReviewVocabularySummary from "./PublicationReviewVocabularySummary";
import { Change } from "../../model/Change";
import { createChangeListDataStructure } from "../../utils/ChangeUtils";

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

  const { data: vocabularyChanges } = useGetVocabularyChangesQuery({
    vocabularyUri: uri!,
    publicationId: publicationId!,
  });

  const changesInfo: ChangeListData = useMemo(() => {
    return createChangeListDataStructure(vocabularyChanges?.changes ?? []);
  }, [vocabularyChanges?.changes]);

  if (!vocabularyChanges) return <></>;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper>
            <Box p={3}>
              <Typography variant={"h6"}>{vocabularyChanges.label}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={8} xs={12}>
          <ChangeList changeListData={changesInfo} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper sx={{ height: "100%" }}>
            <PublicationReviewVocabularySummary changes={changesInfo} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicationReviewVocabulary;
