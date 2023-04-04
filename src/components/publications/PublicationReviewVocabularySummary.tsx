import React from "react";
import { Grid, Paper } from "@mui/material";
import ChangeListQuickAccess from "../change/ChangeListQuickAccess";
import { ChangeListData } from "./PublicationReviewVocabulary";

interface PublicationReviewVocabularySummaryProps {
  changes: ChangeListData;
}

const PublicationReviewVocabularySummary: React.FC<
  PublicationReviewVocabularySummaryProps
> = ({ changes }) => {
  return (
    <Grid item md={12} sm={6} xs={12}>
      <Paper>
        <ChangeListQuickAccess changeListData={changes} />
      </Paper>
    </Grid>
  );
};

export default PublicationReviewVocabularySummary;
